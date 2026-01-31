import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// Table variants
const tableVariants = cva(
  "w-full border-collapse transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border border-border shadow-sm hover:shadow-md",
        striped: "border border-border shadow-sm hover:shadow-md",
        bordered: "border-2 border-border shadow-md hover:shadow-lg",
        hover: "border border-border shadow-sm hover:shadow-md",
        elevated: "border border-border shadow-lg hover:shadow-xl",
        interactive:
          "border border-border shadow-sm hover:shadow-md hover:border-primary",
      },
      size: {
        sm: "text-xs sm:text-sm",
        md: "text-sm sm:text-base",
        lg: "text-base sm:text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

const tableHeaderVariants = cva(
  "font-medium text-left transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-muted text-foreground hover:bg-muted/80",
        striped: "bg-muted text-foreground hover:bg-muted/80",
        bordered: "bg-muted text-foreground hover:bg-muted/80",
        hover: "bg-muted text-foreground hover:bg-muted/80",
        elevated: "bg-muted text-foreground hover:bg-muted/80",
        interactive:
          "bg-muted text-foreground hover:bg-primary/10 hover:text-primary",
      },
      size: {
        sm: "px-2 py-1 sm:px-3 sm:py-2",
        md: "px-3 py-2 sm:px-4 sm:py-3",
        lg: "px-4 py-3 sm:px-6 sm:py-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

const tableCellVariants = cva("border-border transition-all duration-200", {
  variants: {
    variant: {
      default: "border-b border-border hover:bg-muted/50",
      striped: "border-b border-border even:bg-muted/50 hover:bg-muted/80",
      bordered: "border border-border hover:bg-muted/50",
      hover: "border-b border-border hover:bg-muted/50",
      elevated: "border-b border-border hover:bg-muted/80",
      interactive:
        "border-b border-border hover:bg-primary/10 hover:text-primary",
    },
    size: {
      sm: "px-2 py-1 sm:px-3 sm:py-2",
      md: "px-3 py-2 sm:px-4 sm:py-3",
      lg: "px-4 py-3 sm:px-6 sm:py-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

// Types
export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: "left" | "center" | "right";
  className?: string;
}

export interface TableProps<T = Record<string, unknown>> extends VariantProps<
  typeof tableVariants
> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  emptyText?: string;
  caption?: string;
  className?: string;
  rowKey?: keyof T | ((record: T) => string | number);
  onRowClick?: (record: T, index: number) => void;
  onSort?: (column: TableColumn<T>, direction: "asc" | "desc") => void;
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
    showSizeChanger?: boolean;
    showQuickJumper?: boolean;
  };
  selection?: {
    selectedRowKeys: (string | number)[];
    onChange: (selectedRowKeys: (string | number)[], selectedRows: T[]) => void;
    getCheckboxProps?: (record: T) => { disabled?: boolean };
  };
}

export interface TableHeaderProps extends VariantProps<
  typeof tableHeaderVariants
> {
  className?: string;
  children: React.ReactNode;
}

export interface TableBodyProps {
  className?: string;
  children: React.ReactNode;
}

export interface TableRowProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
}

export interface TableCellProps extends VariantProps<typeof tableCellVariants> {
  className?: string;
  children: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
}

// Table Components
function TableComponent<
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  {
    data,
    columns,
    loading = false,
    emptyText = "No data",
    className,
    variant,
    size,
    rowKey = "id",
    onRowClick,
    onSort,
    sortColumn: controlledSortColumn,
    sortDirection: controlledSortDirection,
    pagination,
    selection,
    caption,
    ...props
  }: TableProps<T>,
  ref: React.Ref<HTMLTableElement>,
) {
  // Use controlled props if provided, otherwise use internal state
  const [internalSortState, setInternalSortState] = useState<{
    column: string;
    direction: "asc" | "desc";
  } | null>(null);

  // Determine current sort state (controlled takes precedence)
  const isControlled = controlledSortColumn !== undefined;
  const sortState =
    isControlled && controlledSortColumn
      ? {
          column: controlledSortColumn,
          direction: controlledSortDirection || "asc",
        }
      : internalSortState;

  // Sync internal state with controlled props when they change
  // Sync internal state with controlled props when they change
  // Note: unneeded re-render caused by resetting state. We derive sortState above so stale internal state is ignored.
  /* 
  useEffect(() => {
    if (isControlled && controlledSortColumn) {
      setInternalSortState(null);
    }
  }, [isControlled, controlledSortColumn]); 
  */

  const handleSort = (column: TableColumn<T>) => {
    if (!column.sortable) return;

    const newDirection =
      sortState?.column === column.key && sortState?.direction === "asc"
        ? "desc"
        : "asc";

    // Only update internal state if not controlled
    if (!isControlled) {
      setInternalSortState({ column: column.key, direction: newDirection });
    }

    // Always call onSort callback for controlled usage
    onSort?.(column, newDirection);
  };

  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === "function") {
      return rowKey(record);
    }
    return (record[rowKey] as string | number) || index;
  };

  const isRowSelected = (record: T, index: number): boolean => {
    if (!selection) return false;
    const key = getRowKey(record, index);
    return selection.selectedRowKeys.includes(key);
  };

  const handleRowSelection = (
    record: T,
    index: number,
    checked: boolean,
  ): void => {
    if (!selection) return;

    const key = getRowKey(record, index);
    const newSelectedKeys = checked
      ? [...selection.selectedRowKeys, key]
      : selection.selectedRowKeys.filter((k) => k !== key);

    const newSelectedRows = data.filter((_, i) =>
      newSelectedKeys.includes(getRowKey(_, i)),
    );

    selection.onChange(newSelectedKeys, newSelectedRows);
  };

  const handleSelectAll = (checked: boolean) => {
    if (!selection) return;

    const allKeys = data.map((record, index) => getRowKey(record, index));
    const newSelectedKeys = checked ? allKeys : [];
    const newSelectedRows = checked ? data : [];

    selection.onChange(newSelectedKeys, newSelectedRows);
  };

  const isAllSelected =
    selection &&
    data.length > 0 &&
    selection.selectedRowKeys.length === data.length;

  const isIndeterminate =
    selection &&
    selection.selectedRowKeys.length > 0 &&
    selection.selectedRowKeys.length < data.length;

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-full">
        <table
          ref={ref}
          className={cn(tableVariants({ variant, size }), className)}
          {...props}
        >
          {caption && <caption className="sr-only">{caption}</caption>}
          <TableHeader>
            <TableRow>
              {selection && (
                <th
                  className={cn(tableCellVariants({ variant, size }))}
                  scope="col"
                  role="columnheader"
                >
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = isIndeterminate || false;
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    tableCellVariants({ variant, size }),
                    column.className,
                    column.align === "center" && "text-center",
                    column.align === "right" && "text-right",
                  )}
                  scope="col"
                  role="columnheader"
                  {...(column.width && { style: { width: column.width } })}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.title}</span>
                    {column.sortable && (
                      <button
                        type="button"
                        onClick={() => handleSort(column)}
                        className="flex flex-col text-gray-400 hover:text-gray-600"
                        aria-label={`Sort by ${column.title}`}
                      >
                        <svg
                          className={cn(
                            "w-3 h-3",
                            sortState?.column === column.key &&
                              sortState?.direction === "asc"
                              ? "text-blue-600"
                              : "text-gray-400",
                          )}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M5 8l5-5 5 5H5z" />
                        </svg>
                        <svg
                          className={cn(
                            "w-3 h-3 -mt-1",
                            sortState?.column === column.key &&
                              sortState?.direction === "desc"
                              ? "text-blue-600"
                              : "text-gray-400",
                          )}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M5 12l5 5 5-5H5z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (selection ? 1 : 0)}
                  variant={variant}
                  size={size}
                  className="text-center py-8"
                >
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span>Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (selection ? 1 : 0)}
                  variant={variant}
                  size={size}
                  className="text-center py-8 text-gray-500"
                >
                  {emptyText}
                </TableCell>
              </TableRow>
            ) : (
              data.map((record, index) => (
                <TableRow
                  key={getRowKey(record, index)}
                  onClick={() => onRowClick?.(record, index)}
                  selected={isRowSelected(record, index)}
                  className={cn(
                    onRowClick && "cursor-pointer hover:bg-gray-50",
                    isRowSelected(record, index) && "bg-blue-50",
                  )}
                >
                  {selection && (
                    <TableCell variant={variant} size={size}>
                      <input
                        type="checkbox"
                        checked={isRowSelected(record, index)}
                        onChange={(e) =>
                          handleRowSelection(record, index, e.target.checked)
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        aria-label={`Select row ${index + 1}`}
                        {...selection.getCheckboxProps?.(record)}
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      variant={variant}
                      size={size}
                      className={cn(
                        column.className,
                        column.align === "center" && "text-center",
                        column.align === "right" && "text-right",
                      )}
                    >
                      {column.render
                        ? column.render(
                            column.dataIndex
                              ? record[column.dataIndex]
                              : record,
                            record,
                            index,
                          )
                        : column.dataIndex
                          ? (record[column.dataIndex] as React.ReactNode)
                          : ((record as Record<string, unknown>)[
                              column.key
                            ] as React.ReactNode)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </table>
      </div>

      {pagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 px-2 sm:px-4 py-3 bg-card border-t border-border gap-2 sm:gap-0">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Showing {(pagination.current - 1) * pagination.pageSize + 1} to{" "}
              {Math.min(
                pagination.current * pagination.pageSize,
                pagination.total,
              )}{" "}
              of {pagination.total} results
            </span>
          </div>

          <div className="flex items-center gap-2">
            {pagination.showSizeChanger && (
              <select
                value={pagination.pageSize}
                onChange={(e) => pagination.onChange(1, Number(e.target.value))}
                className="rounded border-gray-300 text-sm"
                aria-label="Select page size"
              >
                <option value={10}>10 / page</option>
                <option value={20}>20 / page</option>
                <option value={50}>50 / page</option>
                <option value={100}>100 / page</option>
              </select>
            )}

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() =>
                  pagination.onChange(
                    pagination.current - 1,
                    pagination.pageSize,
                  )
                }
                disabled={pagination.current <= 1}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Go to previous page"
              >
                Previous
              </button>

              <span className="px-3 py-1 text-sm">
                Page {pagination.current} of{" "}
                {Math.ceil(pagination.total / pagination.pageSize)}
              </span>

              <button
                type="button"
                onClick={() =>
                  pagination.onChange(
                    pagination.current + 1,
                    pagination.pageSize,
                  )
                }
                disabled={
                  pagination.current >=
                  Math.ceil(pagination.total / pagination.pageSize)
                }
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Go to next page"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const TableForwardRef = React.forwardRef(TableComponent) as <
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  props: TableProps<T> & { ref?: React.Ref<HTMLTableElement> },
) => React.ReactElement;

(
  TableForwardRef as React.ComponentType<TableProps<unknown>> & {
    displayName?: string;
  }
).displayName = "Table";

export const Table = TableForwardRef;

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ className, variant, size, children, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(tableHeaderVariants({ variant, size }), className)}
    {...props}
  >
    {children}
  </thead>
));

TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>(({ className, children, ...props }, ref) => (
  <tbody ref={ref} className={cn(className)} {...props}>
    {children}
  </tbody>
));

TableBody.displayName = "TableBody";

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, children, onClick, selected, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b border-gray-200",
        selected && "bg-blue-50",
        onClick && "cursor-pointer hover:bg-gray-50",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </tr>
  ),
);

TableRow.displayName = "TableRow";

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, children, variant, size, colSpan, rowSpan, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(tableCellVariants({ variant, size }), className)}
      colSpan={colSpan}
      rowSpan={rowSpan}
      {...props}
    >
      {children}
    </td>
  ),
);

TableCell.displayName = "TableCell";

export const TableHead = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, children, variant, size, colSpan, rowSpan, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        tableCellVariants({ variant, size }),
        "font-medium",
        className,
      )}
      colSpan={colSpan}
      rowSpan={rowSpan}
      {...props}
    >
      {children}
    </th>
  ),
);

TableHead.displayName = "TableHead";

// Export variants for external use
export { tableVariants, tableHeaderVariants, tableCellVariants };
