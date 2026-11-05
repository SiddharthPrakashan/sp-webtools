import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  isRelationshipFilter,
  type RelationshipFilter,
  type TagFilter,
} from "@ig-followers-check/lib/relationships";

export const PAGE_SIZES = [10, 20, 50, 100, 250] as const;
export type PageSize = (typeof PAGE_SIZES)[number];

export function isPageSize(value: unknown): value is PageSize {
  return PAGE_SIZES.includes(value as PageSize);
}

interface IgSettingsState {
  relationship: RelationshipFilter;
  tagFilters: TagFilter[];
  pageSize: PageSize;
  setPageSize: (pageSize: PageSize) => void;
  setRelationship: (relationship: RelationshipFilter) => void;
  toggleTagFilter: (tag: TagFilter) => void;
}

/** Filter preferences only; account records live in IndexedDB (db.ts). */
export const useIgSettingsStore = create<IgSettingsState>()(
  persist(
    (set) => ({
      relationship: "nonFollowers",
      tagFilters: [],
      pageSize: 100,
      setPageSize: (pageSize) => set({ pageSize }),
      setRelationship: (relationship) => set({ relationship }),
      toggleTagFilter: (tag) =>
        set((state) => ({
          tagFilters: state.tagFilters.includes(tag)
            ? state.tagFilters.filter((item) => item !== tag)
            : [...state.tagFilters, tag],
        })),
    }),
    {
      name: "ig-followers-check:settings",
      // v2 removed the "all" and "mutual" views.
      version: 2,
      storage: createJSONStorage(() => localStorage),
      migrate: (persisted) => {
        const state = (persisted ?? {}) as Partial<IgSettingsState>;
        return {
          relationship: isRelationshipFilter(state.relationship)
            ? state.relationship
            : "nonFollowers",
          tagFilters: Array.isArray(state.tagFilters) ? state.tagFilters : [],
          pageSize: isPageSize(state.pageSize) ? state.pageSize : 100,
        } as IgSettingsState;
      },
      partialize: (state) => ({
        relationship: state.relationship,
        tagFilters: state.tagFilters,
        pageSize: state.pageSize,
      }),
    },
  ),
);
