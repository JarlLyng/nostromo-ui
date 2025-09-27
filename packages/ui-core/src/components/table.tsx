import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

// Table variants
const tableVariants = cva(
  'w-full border-collapse transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border border-neutral-200 shadow-sm hover:shadow-md',
        striped: 'border border-neutral-200 shadow-sm hover:shadow-md',
        bordered: 'border-2 border-neutral-300 shadow-md hover:shadow-lg',
        hover: 'border border-neutral-200 shadow-sm hover:shadow-md',
        elevated: 'border border-neutral-200 shadow-lg hover:shadow-xl',
        interactive: 'border border-neutral-200 shadow-sm hover:shadow-md hover:border-brand-500'
      },
      size: {
        sm: 'text-xs sm:text-sm',
        md: 'text-sm sm:text-base',
        lg: 'text-base sm:text-lg'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
);

const tableHeaderVariants = cva(
  'font-medium text-left transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-neutral-50 text-neutral-900 hover:bg-neutral-100',
        striped: 'bg-neutral-50 text-neutral-900 hover:bg-neutral-100',
        bordered: 'bg-neutral-50 text-neutral-900 hover:bg-neutral-100',
        hover: 'bg-neutral-50 text-neutral-900 hover:bg-neutral-100',
        elevated: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
        interactive: 'bg-neutral-50 text-neutral-900 hover:bg-brand-50 hover:text-brand-900'
      },
      size: {
        sm: 'px-2 py-1 sm:px-3 sm:py-2',
        md: 'px-3 py-2 sm:px-4 sm:py-3',
        lg: 'px-4 py-3 sm:px-6 sm:py-4'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
);

const tableCellVariants = cva(
  'border-neutral-200 transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-b border-neutral-200 hover:bg-neutral-50',
        striped: 'border-b border-neutral-200 even:bg-neutral-50 hover:bg-neutral-100',
        bordered: 'border border-neutral-200 hover:bg-neutral-50',
        hover: 'border-b border-neutral-200 hover:bg-neutral-50',
        elevated: 'border-b border-neutral-200 hover:bg-neutral-100',
        interactive: 'border-b border-neutral-200 hover:bg-brand-50 hover:text-brand-900'
      },
      size: {
        sm: 'px-2 py-1 sm:px-3 sm:py-2',
        md: 'px-3 py-2 sm:px-4 sm:py-3',
        lg: 'px-4 py-3 sm:px-6 sm:py-4'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
);

// Types
export interface TableColumn<T = any> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export interface TableProps<T = any> extends VariantProps<typeof tableVariants> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  emptyText?: string;
  caption?: string;
  className?: string;
  rowKey?: keyof T | ((record: T) => string | number);
  onRowClick?: (record: T, index: number) => void;
  onSort?: (column: TableColumn<T>, direction: 'asc' | 'desc') => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
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

export interface TableHeaderProps extends VariantProps<typeof tableHeaderVariants> {
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
export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({
    data,
    columns,
    loading = false,
    emptyText = 'No data',
    className,
    variant,
    size,
    rowKey = 'id',
    onRowClick,
    onSort,
    sortColumn: _sortColumn,
    sortDirection: _sortDirection,
    pagination,
    selection,
    caption,
    ...props
  }, ref) => {
    const [sortState, setSortState] = useState<{
      column: string;
      direction: 'asc' | 'desc';
    } | null>(null);

    const handleSort = (column: TableColumn) => {
      if (!column.sortable) return;
      
      const newDirection = 
        sortState?.column === column.key && sortState?.direction === 'asc' 
          ? 'desc' 
          : 'asc';
      
      setSortState({ column: column.key, direction: newDirection });
      onSort?.(column, newDirection);
    };

    const getRowKey = (record: any, index: number) => {
      if (typeof rowKey === 'function') {
        return rowKey(record);
      }
      return record[rowKey] || index;
    };

    const isRowSelected = (record: any, index: number) => {
      if (!selection) return false;
      const key = getRowKey(record, index);
      return selection.selectedRowKeys.includes(key);
    };

    const handleRowSelection = (record: any, index: number, checked: boolean) => {
      if (!selection) return;
      
      const key = getRowKey(record, index);
      const newSelectedKeys = checked
        ? [...selection.selectedRowKeys, key]
        : selection.selectedRowKeys.filter(k => k !== key);
      
      const newSelectedRows = data.filter((_, i) => 
        newSelectedKeys.includes(getRowKey(_, i))
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

    const isAllSelected = selection && 
      data.length > 0 && 
      selection.selectedRowKeys.length === data.length;

    const isIndeterminate = selection && 
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
            {caption && (
              <caption className="sr-only">{caption}</caption>
            )}
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
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right'
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
                            'w-3 h-3',
                            sortState?.column === column.key && sortState?.direction === 'asc'
                              ? 'text-blue-600'
                              : 'text-gray-400'
                          )}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M5 8l5-5 5 5H5z" />
                        </svg>
                        <svg
                          className={cn(
                            'w-3 h-3 -mt-1',
                            sortState?.column === column.key && sortState?.direction === 'desc'
                              ? 'text-blue-600'
                              : 'text-gray-400'
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
                    onRowClick && 'cursor-pointer hover:bg-gray-50',
                    isRowSelected(record, index) && 'bg-blue-50'
                  )}
                >
                  {selection && (
                    <TableCell variant={variant} size={size}>
                      <input
                        type="checkbox"
                        checked={isRowSelected(record, index)}
                        onChange={(e) => handleRowSelection(record, index, e.target.checked)}
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
                        column.align === 'center' && 'text-center',
                        column.align === 'right' && 'text-right'
                      )}
                    >
                      {column.render
                        ? column.render(
                            column.dataIndex ? record[column.dataIndex] : record,
                            record,
                            index
                          )
                        : column.dataIndex
                        ? record[column.dataIndex]
                        : record[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </table>
        </div>
        
        {pagination && (
          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 px-2 sm:px-4 py-3 bg-white border-t border-gray-200 gap-2 sm:gap-0">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">
                Showing {((pagination.current - 1) * pagination.pageSize) + 1} to{' '}
                {Math.min(pagination.current * pagination.pageSize, pagination.total)} of{' '}
                {pagination.total} results
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
                  onClick={() => pagination.onChange(pagination.current - 1, pagination.pageSize)}
                  disabled={pagination.current <= 1}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Go to previous page"
                >
                  Previous
                </button>
                
                <span className="px-3 py-1 text-sm">
                  Page {pagination.current} of {Math.ceil(pagination.total / pagination.pageSize)}
                </span>
                
                <button
                  type="button"
                  onClick={() => pagination.onChange(pagination.current + 1, pagination.pageSize)}
                  disabled={pagination.current >= Math.ceil(pagination.total / pagination.pageSize)}
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
);

Table.displayName = 'Table';

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn(tableHeaderVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </thead>
  )
);

TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn(className)}
      {...props}
    >
      {children}
    </tbody>
  )
);

TableBody.displayName = 'TableBody';

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, children, onClick, selected, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b border-gray-200',
        selected && 'bg-blue-50',
        onClick && 'cursor-pointer hover:bg-gray-50',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </tr>
  )
);

TableRow.displayName = 'TableRow';

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
  )
);

TableCell.displayName = 'TableCell';

export const TableHead = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, children, variant, size, colSpan, rowSpan, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(tableCellVariants({ variant, size }), 'font-medium', className)}
      colSpan={colSpan}
      rowSpan={rowSpan}
      {...props}
    >
      {children}
    </th>
  )
);

TableHead.displayName = 'TableHead';

// Export variants for external use
export { tableVariants, tableHeaderVariants, tableCellVariants };
