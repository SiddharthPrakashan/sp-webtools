import type { InstagramRecord, TagField } from "@ig-followers-check/db";

export type RelationshipFilter = "nonFollowers" | "notFollowing" | "pending";

export type TagFilter = TagField | "untagged";

export const relationshipOptions: {
  value: RelationshipFilter;
  label: string;
}[] = [
  { value: "nonFollowers", label: "Not following you back" },
  { value: "notFollowing", label: "You don't follow back" },
  { value: "pending", label: "Pending requests" },
];

export function isRelationshipFilter(
  value: unknown,
): value is RelationshipFilter {
  return relationshipOptions.some((option) => option.value === value);
}

/** Colour of each tag's icon; the name is for screen readers only. */
export const tagStyles: Record<TagField, { name: string; icon: string }> = {
  greenTag: {
    name: "Green tag",
    icon: "text-green-600 fill-green-500/25 dark:text-green-400",
  },
  orangeTag: {
    name: "Orange tag",
    icon: "text-orange-600 fill-orange-500/25 dark:text-orange-400",
  },
  redTag: {
    name: "Red tag",
    icon: "text-red-600 fill-red-500/25 dark:text-red-400",
  },
};

export const tagFields: TagField[] = ["greenTag", "orangeTag", "redTag"];

export function isTagField(value: unknown): value is TagField {
  return value === "greenTag" || value === "orangeTag" || value === "redTag";
}

export function matchesRelationship(
  record: InstagramRecord,
  filter: RelationshipFilter,
): boolean {
  switch (filter) {
    case "nonFollowers":
      return record.youFollow && !record.followsYou;
    case "notFollowing":
      return record.followsYou && !record.youFollow;
    case "pending":
      return record.pendingRequest;
  }
}

/** OR logic: passes if the record matches any selected tag. */
export function matchesTags(
  record: InstagramRecord,
  filters: TagFilter[],
): boolean {
  if (filters.length === 0) return true;

  return filters.some((tag) =>
    tag === "untagged"
      ? !record.greenTag && !record.orangeTag && !record.redTag
      : record[tag],
  );
}

export type RelationshipStats = Record<RelationshipFilter, number> & {
  followers: number;
  following: number;
};

export function computeStats(records: InstagramRecord[]): RelationshipStats {
  const totals: RelationshipStats = {
    followers: 0,
    following: 0,
    nonFollowers: 0,
    notFollowing: 0,
    pending: 0,
  };

  for (const record of records) {
    if (record.followsYou) totals.followers++;
    if (record.youFollow) totals.following++;
    if (record.pendingRequest) totals.pending++;

    if (record.youFollow && !record.followsYou) totals.nonFollowers++;
    else if (record.followsYou && !record.youFollow) totals.notFollowing++;
  }

  return totals;
}
