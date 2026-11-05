import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AgGridReact, type CustomHeaderProps } from "ag-grid-react";
import type {
  CellClickedEvent,
  CellEditRequestEvent,
  ColDef,
  GridApi,
  GetRowIdParams,
  ICellRendererParams,
  IRowNode,
} from "ag-grid-community";
import { Tag } from "lucide-react";

import { gridTheme } from "@lib/agGrid";
import { cn } from "@lib/utils";
import {
  profileUrl,
  type InstagramRecord,
  type TagField,
} from "@ig-followers-check/db";
import { GridPagination } from "@ig-followers-check/components/GridPagination";
import {
  isTagField,
  matchesRelationship,
  matchesTags,
  tagFields,
  tagStyles,
  type RelationshipFilter,
  type TagFilter,
} from "@ig-followers-check/lib/relationships";
import { useIgSettingsStore } from "@ig-followers-check/stores/settings";

interface RecordsGridProps {
  records: InstagramRecord[];
  search: string;
  relationship: RelationshipFilter;
  tagFilters: TagFilter[];
  onTagChange: (username: string, field: TagField, value: boolean) => void;
}

function UsernameCell({ value }: ICellRendererParams<InstagramRecord, string>) {
  if (!value) return null;

  return (
    <a
      href={profileUrl(value)}
      target="_blank"
      rel="noopener noreferrer"
      className="block truncate font-medium underline-offset-4 hover:underline"
    >
      @{value}
    </a>
  );
}

const getRowId = (params: GetRowIdParams<InstagramRecord>) =>
  params.data.username;

const defaultColDef: ColDef<InstagramRecord> = {
  sortable: true,
  resizable: true,
  // Quick filter searches usernames only (set on that column).
  getQuickFilterText: () => "",
};

function TagHeader({ column }: CustomHeaderProps<InstagramRecord>) {
  const field = column.getColDef().field;
  if (!isTagField(field)) return null;

  return (
    <span className="flex w-full justify-center">
      <Tag className={cn("size-4", tagStyles[field].icon)} aria-hidden="true" />
      <span className="sr-only">{tagStyles[field].name}</span>
    </span>
  );
}

// Narrow, icon-only tag columns so Username and all three tags fit on a
// phone screen without horizontal scrolling.
//
// The columns are not "editable", so AG Grid never swaps the checkbox for its
// (differently laid out) editor. The renderer stays enabled via `disabled:
// false`; its clicks and Space key go through setDataValue, which raises
// onCellEditRequest because of readOnlyEdit.
const tagColumn = (field: TagField): ColDef<InstagramRecord> => ({
  field,
  headerName: tagStyles[field].name,
  headerComponent: TagHeader,
  headerClass: "px-0!",
  cellDataType: "boolean",
  cellClass: "cursor-pointer px-0! [&_.ag-checkbox-cell]:justify-center!",
  cellRendererParams: { disabled: false },
  editable: false,
  sortable: false,
  resizable: false,
  suppressMovable: true,
  width: 48,
  minWidth: 48,
  maxWidth: 64,
});

const columnDefs: ColDef<InstagramRecord>[] = [
  {
    headerName: "Username",
    field: "username",
    flex: 1,
    minWidth: 120,
    cellRenderer: UsernameCell,
    getQuickFilterText: (params) => params.data?.username ?? "",
  },
  ...tagFields.map(tagColumn),
];

export function RecordsGrid({
  records,
  search,
  relationship,
  tagFilters,
  onTagChange,
}: RecordsGridProps) {
  const gridRef = useRef<AgGridReact<InstagramRecord>>(null);

  const isExternalFilterPresent = useCallback(() => true, []);

  const doesExternalFilterPass = useCallback(
    (node: IRowNode<InstagramRecord>) =>
      !!node.data &&
      matchesRelationship(node.data, relationship) &&
      matchesTags(node.data, tagFilters),
    [relationship, tagFilters],
  );

  // External filters aren't re-applied automatically when they change.
  useEffect(() => {
    gridRef.current?.api?.onFilterChanged();
  }, [relationship, tagFilters, records]);

  // readOnlyEdit: Dexie stays the source of truth; the live query refreshes
  // the grid after the update is saved.
  const onCellEditRequest = useCallback(
    (event: CellEditRequestEvent<InstagramRecord>) => {
      const field = event.colDef.field;
      if (!event.data || !isTagField(field)) return;
      onTagChange(event.data.username, field, event.newValue === true);
    },
    [onTagChange],
  );

  // Tapping anywhere in a tag cell toggles it, not just the small checkbox.
  // Clicks on the checkbox itself are handled by the renderer and never reach
  // this event.
  const onCellClicked = useCallback(
    (event: CellClickedEvent<InstagramRecord>) => {
      const field = event.colDef.field;
      if (!event.data || !isTagField(field)) return;
      onTagChange(event.data.username, field, !event.data[field]);
    },
    [onTagChange],
  );

  const pageSize = useIgSettingsStore((state) => state.pageSize);
  const setPageSize = useIgSettingsStore((state) => state.setPageSize);
  const [pager, setPager] = useState({ page: 0, totalPages: 0, rowCount: 0 });

  const syncPager = useCallback(
    ({ api }: { api: GridApi<InstagramRecord> }) => {
      setPager({
        page: api.paginationGetCurrentPage(),
        totalPages: api.paginationGetTotalPages(),
        rowCount: api.paginationGetRowCount(),
      });
    },
    [],
  );

  const quickFilterText = useMemo(
    () => search.trim().replace(/^@/, ""),
    [search],
  );

  return (
    <div className="space-y-3">
      <div className="h-[70svh] min-h-[420px] w-full">
        <AgGridReact<InstagramRecord>
          ref={gridRef}
          theme={gridTheme}
          rowData={records}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          getRowId={getRowId}
          quickFilterText={quickFilterText}
          cacheQuickFilter
          isExternalFilterPresent={isExternalFilterPresent}
          doesExternalFilterPass={doesExternalFilterPass}
          readOnlyEdit
          onCellEditRequest={onCellEditRequest}
          onCellClicked={onCellClicked}
          pagination
          paginationPageSize={pageSize}
          paginationPageSizeSelector={false}
          suppressPaginationPanel
          onGridReady={syncPager}
          onPaginationChanged={syncPager}
          animateRows={false}
        />
      </div>

      <GridPagination
        page={pager.page}
        totalPages={pager.totalPages}
        rowCount={pager.rowCount}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        onPrevious={() => gridRef.current?.api.paginationGoToPreviousPage()}
        onNext={() => gridRef.current?.api.paginationGoToNextPage()}
      />
    </div>
  );
}
