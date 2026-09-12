import React, { useState, useMemo, useCallback } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { memo } from "../../lib/memo";
import { Table, TableColumn, TableProps } from "./table";
import { Input } from "./input";

// Filter types
export type FilterType = "text" | "select" | "number" | "date" | "boolean";

export interface ColumnFilter<T = Record<string, unknown>> {
  key: string;
  type: FilterType;
  options?: Array<{ label: string; value: string | number }>;
  placeholder?: string;
  filterFn?: (value: unknown, record: T) => boolean;
}

export interface DataTableProps<T = Record<string, unknown>> extends Omit<
  TableProps<T>,
  "data" | "onSort" | "sortColumn" | "sortDirection"
> {
  data: T[];
  columns: TableColumn<T>[];

  // Search
  searchable?: boolean;
  searchPlaceholder?: string;
  searchKeys?: Array<keyof T | string>;
  onSearch?: (searchTerm: string, filteredData: T[]) => void;

  // Controlled search (for server-side filtering)
  searchTerm?: string;
  onSearchTermChange?: (searchTerm: string) => void;

  // Filtering
  filterable?: boolean;
  filters?: ColumnFilter<T>[];
  onFilter?: (filters: Record<string, unknown>, filteredData: T[]) => void;

  // Controlled filters (for server-side filtering)
  columnFilters?: Record<string, unknown>;
  onColumnFiltersChange?: (filters: Record<string, unknown>) => void;

  // Sorting (enhanced)
  defaultSortColumn?: string;
  defaultSortDirection?: "asc" | "desc";

  // Controlled sorting (for server-side sorting)
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
  onSortChange?: (column: string, direction: "asc" | "desc") => void;

  // Pagination (enhanced)
  defaultPageSize?: number;
  showPagination?: boolean;

  // Controlled pagination (for server-side pagination)
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  totalItems?: number; // Required for server-side pagination

  /**
   * Who does the work.
   *
   * Passing `searchTerm`, `columnFilters` or `sortColumn` makes DataTable
   * controlled - it stops owning that piece of state - but it kept filtering and
   * sorting the rows you gave it anyway. For a server-backed table that is
   * actively wrong: a server searching without accent distinctions returns
   * `{ name: "José" }` for the query `jose`, and the local substring filter then
   * threw the row away while `totalItems` still counted it. Controlled sorting
   * likewise reordered the page the server had already ordered.
   *
   * Controlled state and processing ownership are separate questions now. Set
   * these when the rows arriving in `data` are already searched, filtered or
   * sorted; the callbacks still fire so you know what the user asked for.
   *
   * Pagination has always worked this way, under a different name: it is manual
   * when `currentPage` and `totalItems` are both given.
   */
  manualSearch?: boolean;
  manualFiltering?: boolean;
  manualSorting?: boolean;

  // UI
  showSearch?: boolean;
  showFilters?: boolean;
  filterBarClassName?: string;
  searchBarClassName?: string;
}

/**
 * What a boolean filter value means, from a control or from a consumer.
 *
 * The select below emits real booleans, but a controlled `columnFilters` may hold
 * whatever the consumer put there, and "false" arriving as a string used to mean
 * true.
 */
function asBoolean(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value !== "false" && value !== "";
  return Boolean(value);
}

/** Empty for a value that is absent, and "0" or "false" when that is the value. */
function inputValue(value: unknown): string {
  return value === undefined || value === null ? "" : String(value);
}

// Filter bar component
const filterBarVariants = cva(
  "flex flex-wrap items-center gap-2 p-4 bg-muted border-b border-border",
  {
    variants: {
      variant: {
        default: "bg-muted",
        compact: "p-2 bg-card",
        minimal: "p-2 bg-transparent border-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function DataTable<
  T extends Record<string, unknown> = Record<string, unknown>,
>({
  data: initialData,
  columns,
  searchable = true,
  searchPlaceholder = "Search...",
  searchKeys,
  onSearch,
  searchTerm: controlledSearchTerm,
  onSearchTermChange,
  filterable = false,
  manualSearch = false,
  manualFiltering = false,
  manualSorting = false,
  filters = [],
  onFilter,
  columnFilters: controlledColumnFilters,
  onColumnFiltersChange,
  defaultSortColumn,
  defaultSortDirection = "asc",
  sortColumn: controlledSortColumn,
  sortDirection: controlledSortDirection,
  onSortChange,
  defaultPageSize = 10,
  showPagination = true,
  currentPage: controlledCurrentPage,
  pageSize: controlledPageSize,
  onPageChange,
  onPageSizeChange,
  totalItems,
  showSearch = true,
  showFilters = true,
  filterBarClassName,
  searchBarClassName,
  rowKey = "id",
  emptyText = "No data found",
  ...tableProps
}: DataTableProps<T>) {
  // Determine if component is in controlled mode
  const isControlledSearch = controlledSearchTerm !== undefined;
  const isControlledFilters = controlledColumnFilters !== undefined;
  const isControlledSort = controlledSortColumn !== undefined;
  const isControlledPagination = controlledCurrentPage !== undefined;

  // Search state (controlled or uncontrolled)
  const [internalSearchTerm, setInternalSearchTerm] = useState("");
  const searchTerm = isControlledSearch
    ? controlledSearchTerm
    : internalSearchTerm;
  const setSearchTerm = useMemo(
    () =>
      isControlledSearch
        ? (value: string) => onSearchTermChange?.(value)
        : setInternalSearchTerm,
    [isControlledSearch, onSearchTermChange],
  );

  // Filter state (controlled or uncontrolled)
  const [internalColumnFilters, setInternalColumnFilters] = useState<
    Record<string, unknown>
  >({});
  const columnFilters = isControlledFilters
    ? controlledColumnFilters
    : internalColumnFilters;
  const setColumnFilters = useMemo(
    () =>
      isControlledFilters
        ? (filters: Record<string, unknown>) => onColumnFiltersChange?.(filters)
        : setInternalColumnFilters,
    [isControlledFilters, onColumnFiltersChange],
  );

  // Sort state (controlled or uncontrolled)
  const [internalSortColumn, setInternalSortColumn] = useState<
    string | undefined
  >(defaultSortColumn);
  const [internalSortDirection, setInternalSortDirection] = useState<
    "asc" | "desc"
  >(defaultSortDirection);
  const sortColumn = isControlledSort
    ? controlledSortColumn
    : internalSortColumn;
  const sortDirection = isControlledSort
    ? controlledSortDirection
    : internalSortDirection;
  // Only the uncontrolled path uses these. A controlled table goes through
  // `handleSort`, which emits both values at once - see the comment there for
  // what the controlled versions of these used to do.
  const setSortColumn = setInternalSortColumn;
  const setSortDirection = setInternalSortDirection;

  // Pagination state (controlled or uncontrolled)
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  const [internalPageSize, setInternalPageSize] = useState(defaultPageSize);
  const currentPage = isControlledPagination
    ? controlledCurrentPage
    : internalCurrentPage;
  const pageSize =
    controlledPageSize !== undefined ? controlledPageSize : internalPageSize;
  const setCurrentPage = useMemo(
    () =>
      isControlledPagination
        ? (page: number) => onPageChange?.(page)
        : setInternalCurrentPage,
    [isControlledPagination, onPageChange],
  );
  const setPageSize = useMemo(
    () =>
      onPageSizeChange
        ? (size: number) => onPageSizeChange(size)
        : setInternalPageSize,
    [onPageSizeChange],
  );

  // Apply search
  const searchFilteredData = useMemo(() => {
    // The rows already are the search result; searching them again would only
    // remove what the server decided to include.
    if (manualSearch) return initialData;
    if (!searchable || !searchTerm.trim()) {
      return initialData;
    }

    const term = searchTerm.toLowerCase();
    const keys =
      searchKeys ||
      columns.map((col) => col.dataIndex || col.key).filter(Boolean);

    return initialData.filter((record) => {
      return keys.some((key) => {
        const value =
          typeof key === "string"
            ? (record as Record<string, unknown>)[key]
            : record[key as keyof T];

        if (value === null || value === undefined) return false;

        return String(value).toLowerCase().includes(term);
      });
    });
  }, [initialData, searchTerm, searchable, searchKeys, columns, manualSearch]);

  // Apply column filters
  const filterFilteredData = useMemo(() => {
    if (manualFiltering) return searchFilteredData;
    if (
      !filterable ||
      filters.length === 0 ||
      Object.keys(columnFilters).length === 0
    ) {
      return searchFilteredData;
    }

    return searchFilteredData.filter((record) => {
      return filters.every((filter) => {
        const filterValue = columnFilters[filter.key];

        // Skip if no filter value
        if (
          filterValue === undefined ||
          filterValue === null ||
          filterValue === ""
        ) {
          return true;
        }

        // Use custom filter function if provided
        if (filter.filterFn) {
          return filter.filterFn(filterValue, record);
        }

        // Default filtering logic
        const recordValue = (record as Record<string, unknown>)[filter.key];

        switch (filter.type) {
          case "text":
            return String(recordValue)
              .toLowerCase()
              .includes(String(filterValue).toLowerCase());
          case "number": {
            // A filter value that is not a number matches nothing rather than
            // matching zero. `Number("")` is 0, which is how a cleared input used
            // to leave only the zero-valued rows on screen.
            const wanted = Number(filterValue);
            if (Number.isNaN(wanted)) return true;
            return Number(recordValue) === wanted;
          }
          case "boolean":
            // Not `Boolean(filterValue)`. The control used to be a text input, so
            // typing "false" gave the string "false", and `Boolean("false")` is
            // true - the filter selected exactly the records it was asked to
            // exclude.
            return Boolean(recordValue) === asBoolean(filterValue);
          case "select":
            return String(recordValue) === String(filterValue);
          default:
            return String(recordValue).includes(String(filterValue));
        }
      });
    });
  }, [searchFilteredData, columnFilters, filterable, filters, manualFiltering]);

  // Apply sorting
  const sortedData = useMemo(() => {
    // Keep the order the server sent. Re-sorting a page it has already ordered
    // produces a different order, not the same one.
    if (manualSorting) return filterFilteredData;
    if (!sortColumn) {
      return filterFilteredData;
    }

    const sorted = [...filterFilteredData];
    const column = columns.find((col) => col.key === sortColumn);

    if (!column || !column.sortable) {
      return sorted;
    }

    sorted.sort((a, b) => {
      const aValue = column.dataIndex
        ? a[column.dataIndex]
        : (a as Record<string, unknown>)[column.key];
      const bValue = column.dataIndex
        ? b[column.dataIndex]
        : (b as Record<string, unknown>)[column.key];

      // Handle null/undefined
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      // Compare values
      let comparison = 0;
      if (typeof aValue === "number" && typeof bValue === "number") {
        comparison = aValue - bValue;
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [filterFilteredData, sortColumn, sortDirection, columns, manualSorting]);

  // Apply pagination
  // In controlled mode with server-side pagination, use provided data directly
  // In uncontrolled mode, slice the data client-side
  const paginatedData = useMemo(() => {
    if (!showPagination) {
      return sortedData;
    }

    // If in controlled pagination mode with totalItems, assume data is already paginated
    if (isControlledPagination && totalItems !== undefined) {
      return sortedData; // Data is already paginated server-side
    }

    // Client-side pagination
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return sortedData.slice(startIndex, endIndex);
  }, [
    sortedData,
    currentPage,
    pageSize,
    showPagination,
    isControlledPagination,
    totalItems,
  ]);

  // Calculate total pages for pagination display
  // Note: Currently not used but kept for future pagination UI enhancements
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _totalPages = useMemo(() => {
    if (!showPagination) return 1;
    if (isControlledPagination && totalItems !== undefined) {
      return Math.ceil(totalItems / pageSize);
    }
    return Math.ceil(sortedData.length / pageSize);
  }, [
    showPagination,
    isControlledPagination,
    totalItems,
    pageSize,
    sortedData.length,
  ]);

  // Callbacks
  const handleSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);
      if (!isControlledPagination) {
        setCurrentPage(1); // Reset to first page on search (only in uncontrolled mode)
      }
    },
    [setSearchTerm, setCurrentPage, isControlledPagination],
  );

  const handleFilterChange = useCallback(
    (key: string, value: unknown) => {
      const newFilters = {
        ...columnFilters,
        [key]: value,
      };
      setColumnFilters(newFilters);
      if (!isControlledPagination) {
        setCurrentPage(1); // Reset to first page on filter (only in uncontrolled mode)
      }
    },
    [columnFilters, setColumnFilters, setCurrentPage, isControlledPagination],
  );

  /**
   * One callback per click, carrying both new values.
   *
   * The controlled setters each emitted `onSortChange` on their own, and each one
   * read the *other* value from the render it was created in. Clicking "Age" on a
   * table sorted by name descending produced `("age", "desc")` immediately
   * followed by `("name", "asc")` - two requests, the second of which put the old
   * column back. A consumer writing both values from the callback, which is what
   * the docs show, ended up where it started.
   *
   * It also never fired at all for a controlled table that started unsorted,
   * because the setter guarded on an existing column and direction.
   */
  const handleSort = useCallback(
    (column: TableColumn<T>, direction: "asc" | "desc") => {
      if (isControlledSort) {
        onSortChange?.(column.key, direction);
        return;
      }
      setSortColumn(column.key);
      setSortDirection(direction);
    },
    [isControlledSort, onSortChange, setSortColumn, setSortDirection],
  );

  const handlePageChange = useCallback(
    (page: number, newPageSize: number) => {
      setCurrentPage(page);
      if (newPageSize !== pageSize) {
        setPageSize(newPageSize);
        setCurrentPage(1); // Reset to first page when page size changes
      }
    },
    [pageSize, setCurrentPage, setPageSize],
  );

  // Notify callbacks
  React.useEffect(() => {
    if (onSearch) {
      onSearch(searchTerm, searchFilteredData);
    }
  }, [searchTerm, searchFilteredData, onSearch]);

  React.useEffect(() => {
    if (onFilter) {
      onFilter(columnFilters, filterFilteredData);
    }
  }, [columnFilters, filterFilteredData, onFilter]);

  return (
    <div className="w-full">
      {/* Search and Filter Bar */}
      {(showSearch || (showFilters && filterable && filters.length > 0)) && (
        <div className={cn(filterBarVariants(), filterBarClassName)}>
          {/* Search */}
          {showSearch && searchable && (
            <div className={cn("flex-1 min-w-[200px]", searchBarClassName)}>
              <Input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full"
                aria-label="Search table"
              />
            </div>
          )}

          {/* Column Filters */}
          {showFilters && filterable && filters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {filters.map((filter) => {
                const filterValue = columnFilters[filter.key];

                // A boolean needs three states - either value, or no filter -
                // which a text box cannot express. It used to be one, and typing
                // "false" selected the records where the value was true.
                if (filter.type === "boolean") {
                  return (
                    <select
                      key={filter.key}
                      value={
                        filterValue === undefined || filterValue === null
                          ? ""
                          : asBoolean(filterValue)
                            ? "true"
                            : "false"
                      }
                      onChange={(e) =>
                        handleFilterChange(
                          filter.key,
                          e.target.value === ""
                            ? undefined
                            : e.target.value === "true",
                        )
                      }
                      className="rounded-md border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary"
                      aria-label={`Filter by ${filter.key}`}
                    >
                      <option value="">All {filter.key}</option>
                      <option value="true">
                        {filter.placeholder
                          ? `${filter.placeholder}: yes`
                          : "Yes"}
                      </option>
                      <option value="false">
                        {filter.placeholder
                          ? `${filter.placeholder}: no`
                          : "No"}
                      </option>
                    </select>
                  );
                }

                if (filter.type === "select" && filter.options) {
                  return (
                    <select
                      key={filter.key}
                      value={inputValue(filterValue)}
                      onChange={(e) =>
                        handleFilterChange(
                          filter.key,
                          e.target.value || undefined,
                        )
                      }
                      className="rounded-md border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary"
                      aria-label={`Filter by ${filter.key}`}
                    >
                      <option value="">All {filter.key}</option>
                      {filter.options.map((option) => (
                        <option key={option.value} value={String(option.value)}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  );
                }

                return (
                  <Input
                    key={filter.key}
                    type={filter.type === "number" ? "number" : "text"}
                    placeholder={
                      filter.placeholder || `Filter ${filter.key}...`
                    }
                    // `String(filterValue || "")` blanked a legitimate 0 and a
                    // legitimate false, so the box disagreed with the filter it
                    // was showing.
                    value={inputValue(filterValue)}
                    onChange={(e) =>
                      handleFilterChange(
                        filter.key,
                        // An emptied box is no filter. `Number("")` is 0, which
                        // used to leave only the zero-valued rows behind.
                        e.target.value === ""
                          ? undefined
                          : filter.type === "number"
                            ? Number(e.target.value)
                            : e.target.value,
                      )
                    }
                    className="min-w-[150px]"
                    aria-label={`Filter by ${filter.key}`}
                  />
                );
              })}

              {/* Clear Filters */}
              {Object.keys(columnFilters).length > 0 && (
                <button
                  type="button"
                  onClick={() => setColumnFilters({})}
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground underline"
                  aria-label="Clear all filters"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <Table
        {...tableProps}
        data={paginatedData}
        columns={columns}
        rowKey={rowKey}
        emptyText={emptyText}
        {...(sortColumn && {
          sortColumn,
          sortDirection,
        })}
        onSort={handleSort}
        {...(showPagination && {
          pagination: {
            current: currentPage,
            pageSize: pageSize,
            total:
              isControlledPagination && totalItems !== undefined
                ? totalItems
                : sortedData.length,
            onChange: handlePageChange,
            showSizeChanger: true,
          },
        })}
      />

      {/* Results Summary */}
      {showPagination &&
        (isControlledPagination && totalItems !== undefined
          ? totalItems > 0
          : sortedData.length > 0) && (
          <div className="mt-2 px-4 py-2 text-sm text-muted-foreground">
            {isControlledPagination && totalItems !== undefined ? (
              <>
                Showing {(currentPage - 1) * pageSize + 1} to{" "}
                {Math.min(currentPage * pageSize, totalItems)} of {totalItems}{" "}
                results
                {searchTerm && " (filtered)"}
              </>
            ) : (
              <>
                Showing {(currentPage - 1) * pageSize + 1} to{" "}
                {Math.min(currentPage * pageSize, sortedData.length)} of{" "}
                {sortedData.length} results
                {searchTerm && ` (filtered from ${initialData.length} total)`}
              </>
            )}
          </div>
        )}
    </div>
  );
}

DataTable.displayName = "DataTable";

// Memoize DataTable for performance optimization
// DataTable is a complex component with filtering, sorting, and pagination
export const DataTableMemoized = memo(DataTable) as typeof DataTable;
