import Dexie, { type EntityTable } from "dexie";

/**
 * One row per Instagram account found in the export. Relationship categories
 * (not following back, mutual, ...) are derived from the flags, not stored.
 */
export interface InstagramRecord {
  username: string;

  followsYou: boolean;
  youFollow: boolean;
  pendingRequest: boolean;

  /** Manual tags set by the user; preserved across re-imports. */
  greenTag: boolean;
  orangeTag: boolean;
  redTag: boolean;
}

export type TagField = "greenTag" | "orangeTag" | "redTag";

export const db = new Dexie("ig-followers-check") as Dexie & {
  records: EntityTable<InstagramRecord, "username">;
};

// Bump the version for every schema change; never edit an existing version.
db.version(1).stores({
  records: "&username",
});

export const profileUrl = (username: string) =>
  `https://www.instagram.com/${encodeURIComponent(username)}/`;
