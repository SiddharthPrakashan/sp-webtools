IndexedDB record structure
```
export interface InstagramRecord {
  username: string;

  followsYou: boolean;
  youFollow: boolean;
  pendingRequest: boolean;

  greenTag: boolean;
  orangeTag: boolean;
  redTag: boolean;
}
```

There is no need to store nonFollowers, notFollowing, or mutual as separate datasets.

These can be derived:
Category	                Condition
Not following you back	    youFollow && !followsYou
You don't follow back	    followsYou && !youFollow
Mutual followers	        followsYou && youFollow
Pending requests	        pendingRequest

One consolidated dataset avoids unnecessary duplication and makes filtering straightforward.

We can also generate profile URLs directly from the username:
```
const profileUrl = (username: string) => `https://www.instagram.com/${encodeURIComponent(username)}/`;
```

```
import Dexie, { type EntityTable } from "dexie";

export interface InstagramRecord {
  username: string;

  followsYou: boolean;
  youFollow: boolean;
  pendingRequest: boolean;

  greenTag: boolean;
  orangeTag: boolean;
  redTag: boolean;
}

export const db = new Dexie("InstagramCheckerDB") as Dexie & {
  records: EntityTable<InstagramRecord, "username">;
};

db.version(1).stores({
  records: "&username",
});
```
The primary key &username guarantees uniqueness and supports efficient updates.

We'll use three bits while processing:
Bit	Meaning
001	Follows you
010	You follow
100	Pending request


A Map<string, number> is more memory-efficient during processing than creating full record objects or multiple arrays and sets.
```
import JSZip from "jszip";
import { db, type InstagramRecord } from "../db/instagramDb";

const FOLLOWS_YOU = 1;
const YOU_FOLLOW = 2;
const PENDING = 4;

type FileKind = "followers" | "following" | "pending";

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
    const username = parts[isLegacyUrl ? 1 : 0];

    if (parts.length !== (isLegacyUrl ? 2 : 1)) {
      return null;
    }

    return normalizeUsername(decodeURIComponent(username));
  } catch {
    return null;
  }
}

function extractUsername(
  entry: unknown,
  kind: FileKind
): string | null {
  if (!entry || typeof entry !== "object") return null;

  const item = entry as {
    title?: unknown;
    string_list_data?: Array<{
      value?: unknown;
      href?: unknown;
    }>;
    label_values?: Array<{
      label?: unknown;
      value?: unknown;
      href?: unknown;
    }>;
  };

  const first = item.string_list_data?.[0];
  const labels = item.label_values ?? [];

  const labeledUsername = labels.find(
    (item) =>
      typeof item.label === "string" &&
      /user[\s_-]*name/i.test(item.label)
  )?.value;

  // Instagram formats differ between export versions.
  const candidates =
    kind === "following"
      ? [item.title, labeledUsername, first?.value]
      : [labeledUsername, first?.value, item.title];

  for (const candidate of candidates) {
    const username = normalizeUsername(candidate);
    if (username) return username;
  }

  // Fallback to Instagram profile URLs.
  const fromEntry = usernameFromUrl(first?.href);
  if (fromEntry) return fromEntry;

  for (const label of labels) {
    const username =
      usernameFromUrl(label.href) ??
      usernameFromUrl(label.value);

    if (username) return username;
  }

  return null;
}

function getEntries(
  payload: unknown,
  kind: FileKind
): unknown[] {
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
    if (Array.isArray(data[key])) {
      return data[key] as unknown[];
    }
  }

  throw new Error(`Unsupported Instagram ${kind} format.`);
}

export async function parseInstagramZip(
  file: File
): Promise<Map<string, number>> {
  const zip = await JSZip.loadAsync(file);
  const records = new Map<string, number>();

  const matchedFiles = Object.values(zip.files)
    .filter((entry) => !entry.dir)
    .flatMap((entry) => {
      const path = entry.name.replace(/\\/g, "/");
      const filename = path.split("/").pop() ?? "";

      const match = filename.match(
        /^(followers(?:_\d+)?|following(?:_\d+)?|pending_follow_requests(?:_\d+)?)\.json$/i
      );

      if (!match) return [];

      const name = match[1].toLowerCase();

      const kind: FileKind = name.startsWith("followers")
        ? "followers"
        : name.startsWith("following")
          ? "following"
          : "pending";

      return [{ entry, path, kind }];
    });

  // Prefer the Instagram connections directory.
  // Avoid accidentally reading similarly named Threads files.
  const instagramFiles = matchedFiles.filter(({ path }) =>
    path.toLowerCase().split("/").includes("followers_and_following")
  );

  const selectedFiles =
    instagramFiles.length > 0 ? instagramFiles : matchedFiles;

  if (
    !selectedFiles.some((file) => file.kind === "followers") ||
    !selectedFiles.some((file) => file.kind === "following")
  ) {
    throw new Error(
      "Missing followers or following JSON files. " +
      "Export Followers and following in JSON format."
    );
  }

  // Sequential decompression limits peak memory usage.
  selectedFiles.sort((a, b) =>
    a.path.localeCompare(b.path, undefined, { numeric: true })
  );

  for (const { entry, kind } of selectedFiles) {
    const payload: unknown = JSON.parse(
      await entry.async("string")
    );

    const list = getEntries(payload, kind);

    const flag =
      kind === "followers"
        ? FOLLOWS_YOU
        : kind === "following"
          ? YOU_FOLLOW
          : PENDING;

    let recognized = 0;

    for (const item of list) {
      const username = extractUsername(item, kind);
      if (!username) continue;

      records.set(
        username,
        (records.get(username) ?? 0) | flag
      );

      recognized++;
    }

    // Prevent a changed JSON format from silently producing
    // an incorrect follower comparison.
    if (list.length > 0 && recognized === 0) {
      throw new Error(
        `Could not read usernames from ${entry.name}`
      );
    }
  }

  return records;
}

export async function saveInstagramRecords(
  parsedRecords: Map<string, number>
): Promise<void> {
  await db.transaction("rw", db.records, async () => {
    const existing = await db.records.toArray();

    const previous = new Map(
      existing.map((record) => [record.username, record])
    );

    const records: InstagramRecord[] = Array.from(
      parsedRecords,
      ([username, flags]) => {
        const old = previous.get(username);

        return {
          username,
          followsYou: Boolean(flags & FOLLOWS_YOU),
          youFollow: Boolean(flags & YOU_FOLLOW),
          pendingRequest: Boolean(flags & PENDING),

          // Preserve manually assigned tags.
          greenTag: old?.greenTag ?? false,
          orangeTag: old?.orangeTag ?? false,
          redTag: old?.redTag ?? false,
        };
      }
    );

    // Atomic replacement: if writing fails, the old
    // records remain intact.
    await db.records.clear();
    await db.records.bulkPut(records);
  });
}
```


## React + AG Grid implementation
For the grid, we'll provide:
- Username search.
- Relationship category filtering.
- Multi-select tag filtering.
- Three editable boolean tag columns.
- Automatically persisted tag changes.
- Import and clear-data buttons.
- Sorting and pagination.

AG Grid supports boolean checkbox editors, external filtering, and quick text filtering directly. We can use these instead of maintaining additional filtered arrays in React.

```
import { useCallback, useMemo, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { AgGridProvider, AgGridReact } from "ag-grid-react";

import {
  AllCommunityModule,
  type ColDef,
  type IRowNode,
  type GetRowIdParams,
  type CellEditRequestEvent,
  type ICellRendererParams,
} from "ag-grid-community";

import { db, type InstagramRecord } from "../db/instagramDb";

import {
  parseInstagramZip,
  saveInstagramRecords,
} from "../services/instagramImporter";

const modules = [AllCommunityModule];

type RelationshipFilter =
  | "all"
  | "nonFollowers"
  | "notFollowing"
  | "mutual"
  | "pending";

type TagField = "greenTag" | "orangeTag" | "redTag";
type TagFilter = TagField | "untagged";

function isTagField(value: unknown): value is TagField {
  return (
    value === "greenTag" ||
    value === "orangeTag" ||
    value === "redTag"
  );
}

function getRelationship(record: InstagramRecord): string {
  if (record.pendingRequest) return "Pending Request";

  if (record.youFollow && record.followsYou) {
    return "Mutual";
  }

  if (record.youFollow) return "Not Following You";

  if (record.followsYou) return "You Don't Follow";

  return "Unknown";
}

function errorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "An unexpected error occurred.";
}

export default function InstagramChecker() {
  const records = useLiveQuery(
    () => db.records.toArray(),
    [],
    []
  );

  const [search, setSearch] = useState("");
  const [relationship, setRelationship] =
    useState<RelationshipFilter>("nonFollowers");

  const [tagFilters, setTagFilters] = useState<TagFilter[]>([]);

  const [importing, setImporting] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  // Import ZIP and replace relationship data.
  const handleImport = async (file: File) => {
    setImporting(true);
    setError("");

    try {
      setStatus("Reading Instagram export...");

      const parsed = await parseInstagramZip(file);

      setStatus("Saving records...");

      await saveInstagramRecords(parsed);

      setStatus(`Imported ${parsed.size} unique accounts.`);
    } catch (err) {
      setError(errorMessage(err));
      setStatus("");
    } finally {
      setImporting(false);
    }
  };

  // Only delete when the user requests it.
  const handleClear = async () => {
    if (!window.confirm("Delete all records and tags?")) {
      return;
    }

    try {
      await db.records.clear();
      setStatus("All records cleared.");
      setError("");
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  // Persist tag edits directly to IndexedDB.
  const onTagEdit = useCallback(
    (event: CellEditRequestEvent<InstagramRecord>) => {
      if (!event.data) return;

      const field = event.colDef.field;
      if (!isTagField(field)) return;

      void db.records
        .update(event.data.username, {
          [field]: event.newValue === true,
        })
        .catch((err: unknown) => {
          setError(errorMessage(err));
        });
    },
    []
  );

  // Stable row IDs allow efficient updates.
  const getRowId = useCallback(
    (params: GetRowIdParams<InstagramRecord>) =>
      params.data.username,
    []
  );

  const defaultColDef = useMemo<ColDef<InstagramRecord>>(
    () => ({
      sortable: true,
      resizable: true,
      getQuickFilterText: () => "",
    }),
    []
  );

  const columnDefs = useMemo<ColDef<InstagramRecord>[]>(
    () => [
      {
        headerName: "Username",
        field: "username",
        flex: 2,
        minWidth: 190,

        cellRenderer: (
          params: ICellRendererParams<InstagramRecord, string>
        ) =>
          params.value ? (
            <a
              href={`https://www.instagram.com/${encodeURIComponent(
                params.value
              )}/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              @{params.value}
            </a>
          ) : null,

        // Only search usernames, not relationship/tag columns.
        getQuickFilterText: (params) =>
          params.data?.username ?? "",
      },
      {
        headerName: "Relationship",
        colId: "relationship",
        minWidth: 190,
        flex: 1,

        valueGetter: (params) =>
          params.data
            ? getRelationship(params.data)
            : "",
      },
      {
        headerName: "🟢 Green",
        field: "greenTag",
        cellDataType: "boolean",
        editable: true,
        width: 115,
      },
      {
        headerName: "🟠 Orange",
        field: "orangeTag",
        cellDataType: "boolean",
        editable: true,
        width: 125,
      },
      {
        headerName: "🔴 Red",
        field: "redTag",
        cellDataType: "boolean",
        editable: true,
        width: 110,
      },
    ],
    []
  );

  const toggleTagFilter = (tag: TagFilter) => {
    setTagFilters((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag]
    );
  };

  // Relationship + tag filtering inside AG Grid.
  const isExternalFilterPresent = useCallback(
    () => relationship !== "all" || tagFilters.length > 0,
    [relationship, tagFilters]
  );

  const doesExternalFilterPass = useCallback(
    (node: IRowNode<InstagramRecord>): boolean => {
      const record = node.data;
      if (!record) return false;

      let relationshipMatches = true;

      switch (relationship) {
        case "nonFollowers":
          relationshipMatches =
            record.youFollow && !record.followsYou;
          break;

        case "notFollowing":
          relationshipMatches =
            record.followsYou && !record.youFollow;
          break;

        case "mutual":
          relationshipMatches =
            record.youFollow && record.followsYou;
          break;

        case "pending":
          relationshipMatches = record.pendingRequest;
          break;
      }

      if (!relationshipMatches) return false;

      if (tagFilters.length === 0) return true;

      // OR logic: match any selected tag.
      return tagFilters.some((tag) => {
        if (tag === "untagged") {
          return (
            !record.greenTag &&
            !record.orangeTag &&
            !record.redTag
          );
        }

        return record[tag];
      });
    },
    [relationship, tagFilters]
  );

  // Calculate summary statistics in one traversal.
  const stats = useMemo(() => {
    const totals = {
      followers: 0,
      following: 0,
      nonFollowers: 0,
      notFollowing: 0,
      mutual: 0,
      pending: 0,
    };

    for (const record of records) {
      if (record.followsYou) totals.followers++;
      if (record.youFollow) totals.following++;
      if (record.pendingRequest) totals.pending++;

      if (record.youFollow && record.followsYou) {
        totals.mutual++;
      } else if (record.youFollow) {
        totals.nonFollowers++;
      } else if (record.followsYou) {
        totals.notFollowing++;
      }
    }

    return totals;
  }, [records]);

  return (
    <AgGridProvider modules={modules}>
      <section>
        <h2>Instagram Followers Checker</h2>

        <div>
          <input
            type="file"
            accept=".zip,application/zip"
            disabled={importing}
            onChange={(event) => {
              const file = event.currentTarget.files?.[0];

              // Release the input's reference to the File.
              event.currentTarget.value = "";

              if (file) void handleImport(file);
            }}
          />

          <button
            type="button"
            onClick={() => void handleClear()}
            disabled={importing || records.length === 0}
          >
            Clear Data
          </button>
        </div>

        {status && <p role="status">{status}</p>}
        {error && <p role="alert">{error}</p>}

        <p>
          Followers: {stats.followers} | Following:{" "}
          {stats.following} | Not Following You:{" "}
          {stats.nonFollowers} | You Don't Follow:{" "}
          {stats.notFollowing} | Mutual: {stats.mutual} |
          Pending: {stats.pending}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <input
            type="search"
            placeholder="Search username..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={relationship}
            onChange={(event) =>
              setRelationship(
                event.target.value as RelationshipFilter
              )
            }
          >
            <option value="all">All Accounts</option>
            <option value="nonFollowers">
              Not Following You
            </option>
            <option value="notFollowing">
              You Don't Follow
            </option>
            <option value="mutual">Mutual Followers</option>
            <option value="pending">Pending Requests</option>
          </select>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 12,
          }}
        >
          {(
            [
              ["greenTag", "🟢 Green"],
              ["orangeTag", "🟠 Orange"],
              ["redTag", "🔴 Red"],
              ["untagged", "Untagged"],
            ] as const
          ).map(([tag, label]) => (
            <label key={tag}>
              <input
                type="checkbox"
                checked={tagFilters.includes(tag)}
                onChange={() => toggleTagFilter(tag)}
              />
              {label}
            </label>
          ))}
        </div>

        <div style={{ width: "100%", height: 580 }}>
          <AgGridReact<InstagramRecord>
            rowData={records}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            getRowId={getRowId}
            quickFilterText={search.trim().replace(/^@/, "")}
            cacheQuickFilter={true}
            isExternalFilterPresent={isExternalFilterPresent}
            doesExternalFilterPass={doesExternalFilterPass}
            readOnlyEdit={true}
            singleClickEdit={true}
            onCellEditRequest={onTagEdit}
            pagination={true}
            paginationPageSize={100}
            paginationPageSizeSelector={[50, 100, 250]}
            animateRows={false}
          />
        </div>
      </section>
    </AgGridProvider>
  );
}
```


The search and tag filters work together. If Green and Red are selected, the grid shows accounts with either tag (OR logic). If neither is selected, no tag restriction applies.

The grid uses readOnlyEdit so Dexie remains the source of truth. When a checkbox is edited, AG Grid emits onCellEditRequest, which saves the changed boolean to IndexedDB. The Dexie live query then refreshes the grid.