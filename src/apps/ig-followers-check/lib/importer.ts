import JSZip from "jszip";

import { db, type InstagramRecord } from "@ig-followers-check/db";

// Bit flags used while parsing; a Map<string, number> is far lighter than
// building full record objects or several sets.
const FOLLOWS_YOU = 1;
const YOU_FOLLOW = 2;
const PENDING = 4;

const MB = 1024 * 1024;
/** Followers/following exports are small; full exports with media are not. */
const MAX_ZIP_BYTES = 512 * MB;
const MAX_JSON_BYTES = 50 * MB;

type FileKind = "followers" | "following" | "pending";

interface SourceFile {
  path: string;
  kind: FileKind;
  size?: number;
  read: () => Promise<string>;
}

const FILE_PATTERN =
  /^(followers(?:_\d+)?|following(?:_\d+)?|pending_follow_requests(?:_\d+)?)\.json$/i;

function fileKind(path: string): FileKind | null {
  const filename = path.split("/").pop() ?? "";
  const match = filename.match(FILE_PATTERN);
  if (!match) return null;

  const name = match[1].toLowerCase();
  if (name.startsWith("followers")) return "followers";
  if (name.startsWith("following")) return "following";
  return "pending";
}

function normalizeUsername(value: unknown): string | null {
  if (typeof value !== "string") return null;

  const username = value.trim().replace(/^@/, "").toLowerCase();

  if (
    username.includes("__deleted__") ||
    !/^[a-z0-9._]{1,30}$/.test(username)
  ) {
    return null;
  }

  return username;
}

function usernameFromUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;

  try {
    const url = new URL(value);

    if (
      url.hostname !== "www.instagram.com" &&
      url.hostname !== "instagram.com"
    ) {
      return null;
    }

    const parts = url.pathname.split("/").filter(Boolean);
    const isLegacyUrl = parts[0] === "_u";

    if (parts.length !== (isLegacyUrl ? 2 : 1)) return null;

    return normalizeUsername(decodeURIComponent(parts[isLegacyUrl ? 1 : 0]));
  } catch {
    return null;
  }
}

interface ExportEntry {
  title?: unknown;
  string_list_data?: Array<{ value?: unknown; href?: unknown }>;
  label_values?: Array<{ label?: unknown; value?: unknown; href?: unknown }>;
}

function extractUsername(entry: unknown, kind: FileKind): string | null {
  if (!entry || typeof entry !== "object") return null;

  const item = entry as ExportEntry;
  const first = Array.isArray(item.string_list_data)
    ? item.string_list_data[0]
    : undefined;
  const labels = Array.isArray(item.label_values) ? item.label_values : [];

  const labeledUsername = labels.find(
    (label) =>
      typeof label.label === "string" && /user[\s_-]*name/i.test(label.label),
  )?.value;

  // Instagram's export format differs between versions: newer "following"
  // files keep the username in `title`, followers keep it in the value.
  const candidates =
    kind === "following"
      ? [item.title, labeledUsername, first?.value]
      : [labeledUsername, first?.value, item.title];

  for (const candidate of candidates) {
    const username = normalizeUsername(candidate);
    if (username) return username;
  }

  // Fall back to profile URLs.
  const fromEntry = usernameFromUrl(first?.href);
  if (fromEntry) return fromEntry;

  for (const label of labels) {
    const username =
      usernameFromUrl(label.href) ?? usernameFromUrl(label.value);
    if (username) return username;
  }

  return null;
}

function getEntries(payload: unknown, kind: FileKind): unknown[] {
  if (Array.isArray(payload)) return payload;

  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid Instagram JSON structure.");
  }

  const data = payload as Record<string, unknown>;
  const keys =
    kind === "followers"
      ? ["relationships_followers"]
      : kind === "following"
        ? ["relationships_following"]
        : [
            "relationships_follow_requests_sent",
            "relationships_pending_follow_requests",
            "pending_follow_requests",
          ];

  for (const key of keys) {
    const value = data[key];
    if (Array.isArray(value)) return value as unknown[];
  }

  throw new Error(`Unsupported Instagram ${kind} file format.`);
}

function isZip(file: File) {
  return /\.zip$/i.test(file.name);
}

function isJson(file: File) {
  return /\.json$/i.test(file.name);
}

async function sourcesFromZip(file: File): Promise<SourceFile[]> {
  if (file.size > MAX_ZIP_BYTES) {
    throw new Error(
      `${file.name} is larger than ${MAX_ZIP_BYTES / MB} MB. ` +
        "Export only Followers and following to keep the file small.",
    );
  }

  let zip: JSZip;
  try {
    zip = await JSZip.loadAsync(file);
  } catch {
    throw new Error(`${file.name} is not a valid ZIP file.`);
  }

  return Object.values(zip.files).flatMap((entry) => {
    if (entry.dir) return [];

    const path = entry.name.replace(/\\/g, "/");
    const kind = fileKind(path);
    if (!kind) return [];

    return [{ path, kind, read: () => entry.async("string") }];
  });
}

function sourceFromJson(file: File): SourceFile[] {
  const path = (file.webkitRelativePath || file.name).replace(/\\/g, "/");
  const kind = fileKind(path);
  if (!kind) return [];

  return [{ path, kind, size: file.size, read: () => file.text() }];
}

/**
 * Reads followers, following and pending-request files from an Instagram
 * export (a ZIP, or the JSON files themselves) entirely in the browser.
 * Returns username → relationship bit flags.
 */
export async function parseInstagramFiles(
  files: File[],
): Promise<Map<string, number>> {
  if (files.length === 0) throw new Error("No file selected.");

  const unsupported = files.find((file) => !isZip(file) && !isJson(file));
  if (unsupported) {
    throw new Error(
      `${unsupported.name} is not supported. Select a .zip or .json file.`,
    );
  }

  const sources: SourceFile[] = [];
  for (const file of files) {
    sources.push(
      ...(isZip(file) ? await sourcesFromZip(file) : sourceFromJson(file)),
    );
  }

  // Prefer Instagram's connections folder so similarly named files elsewhere
  // in the export (for example Threads) are not mixed in.
  const instagramSources = sources.filter(({ path }) =>
    path.toLowerCase().split("/").includes("followers_and_following"),
  );
  const selected = instagramSources.length > 0 ? instagramSources : sources;

  if (
    !selected.some((source) => source.kind === "followers") ||
    !selected.some((source) => source.kind === "following")
  ) {
    throw new Error(
      "Couldn't find both followers and following files. Export " +
        '"Followers and following" from Instagram in JSON format.',
    );
  }

  selected.sort((a, b) =>
    a.path.localeCompare(b.path, undefined, { numeric: true }),
  );

  const records = new Map<string, number>();

  // Read one file at a time to limit peak memory use.
  for (const source of selected) {
    const filename = source.path.split("/").pop();

    if (source.size !== undefined && source.size > MAX_JSON_BYTES) {
      throw new Error(`${filename} is larger than ${MAX_JSON_BYTES / MB} MB.`);
    }

    const text = await source.read();
    if (text.length > MAX_JSON_BYTES) {
      throw new Error(`${filename} is larger than ${MAX_JSON_BYTES / MB} MB.`);
    }

    let payload: unknown;
    try {
      payload = JSON.parse(text);
    } catch {
      throw new Error(`${filename} is not valid JSON.`);
    }

    const list = getEntries(payload, source.kind);
    const flag =
      source.kind === "followers"
        ? FOLLOWS_YOU
        : source.kind === "following"
          ? YOU_FOLLOW
          : PENDING;

    let recognized = 0;
    for (const item of list) {
      const username = extractUsername(item, source.kind);
      if (!username) continue;

      records.set(username, (records.get(username) ?? 0) | flag);
      recognized++;
    }

    // Stop if the format changed, rather than silently producing a wrong
    // comparison.
    if (list.length > 0 && recognized === 0) {
      throw new Error(`Couldn't read usernames from ${filename}.`);
    }
  }

  if (records.size === 0) {
    throw new Error("No accounts were found in the selected files.");
  }

  return records;
}

/**
 * Replaces all relationship data with the parsed export, keeping the tags of
 * accounts that are still present. Runs in one transaction, so a failed write
 * leaves the previous data intact.
 */
export async function saveInstagramRecords(
  parsed: Map<string, number>,
): Promise<void> {
  await db.transaction("rw", db.records, async () => {
    const existing = await db.records.toArray();
    const previous = new Map(
      existing.map((record) => [record.username, record]),
    );

    const records: InstagramRecord[] = Array.from(
      parsed,
      ([username, flags]) => {
        const old = previous.get(username);

        return {
          username,
          followsYou: Boolean(flags & FOLLOWS_YOU),
          youFollow: Boolean(flags & YOU_FOLLOW),
          pendingRequest: Boolean(flags & PENDING),
          greenTag: old?.greenTag ?? false,
          orangeTag: old?.orangeTag ?? false,
          redTag: old?.redTag ?? false,
        };
      },
    );

    await db.records.clear();
    await db.records.bulkPut(records);
  });
}
