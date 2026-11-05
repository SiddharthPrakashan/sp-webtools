import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@ui/button";
import {
  PAGE_SIZES,
  isPageSize,
  type PageSize,
} from "@ig-followers-check/stores/settings";

interface GridPaginationProps {
  /** Zero-based current page. */
  page: number;
  totalPages: number;
  rowCount: number;
  pageSize: PageSize;
  onPageSizeChange: (pageSize: PageSize) => void;
  onPrevious: () => void;
  onNext: () => void;
}

/** Compact pager that fits a phone screen: "25 ▾ | 1–25 of 100 | ‹ ›". */
export function GridPagination({
  page,
  totalPages,
  rowCount,
  pageSize,
  onPageSizeChange,
  onPrevious,
  onNext,
}: GridPaginationProps) {
  const from = rowCount === 0 ? 0 : page * pageSize + 1;
  const to = Math.min((page + 1) * pageSize, rowCount);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-end gap-3 text-sm"
    >
      <select
        aria-label="Rows per page"
        value={pageSize}
        onChange={(event) => {
          const value = Number(event.target.value);
          if (isPageSize(value)) onPageSizeChange(value);
        }}
        className="h-8 rounded-md border bg-background px-2 tabular-nums outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        {PAGE_SIZES.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      <span className="h-5 w-px bg-border" aria-hidden="true" />

      <p aria-live="polite" className="tabular-nums whitespace-nowrap">
        {from.toLocaleString()}–{to.toLocaleString()} of{" "}
        {rowCount.toLocaleString()}
      </p>

      <span className="h-5 w-px bg-border" aria-hidden="true" />

      <div className="flex gap-1">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-8"
          aria-label="Previous page"
          disabled={page <= 0}
          onClick={onPrevious}
        >
          <ChevronLeft aria-hidden="true" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-8"
          aria-label="Next page"
          disabled={page >= totalPages - 1}
          onClick={onNext}
        >
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
    </nav>
  );
}
