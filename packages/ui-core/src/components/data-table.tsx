import React, { useState, useMemo, useCallback } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Table, TableColumn, TableProps } from './table';
import { Input } from './input';

// Filter types
export type FilterType = 'text' | 'select' | 'number' | 'date' | 'boolean';

export interface ColumnFilter<T = Record<string, unknown>> {
  key: string;
  type: FilterType;
  options?: Array<{ label: string; value: string | number }>;
  placeholder?: string;
  filterFn?: (value: unknown, record: T) => boolean;
}

export interface DataTableProps<T = Record<string, unknown>> 
  extends Omit<TableProps<T>, 'data' | 'onSort' | 'sortColumn' | 'sortDirection'> {
  data: T[];
  columns: TableColumn<T>[];
  
  // Search
  searchable?: boolean;
  searchPlaceholder?: string;
  searchKeys?: Array<keyof T | string>;
  onSearch?: (searchTerm: string, filteredData: T[]) => void;
  
  // Filtering
  filterable?: boolean;
  filters?: ColumnFilter<T>[];
  onFilter?: (filters: Record<string, unknown>, filteredData: T[]) => void;
  
  // Sorting (enhanced)
  defaultSortColumn?: string;
  defaultSortDirection?: 'asc' | 'desc';
  
  // Pagination (enhanced)
  defaultPageSize?: number;
  showPagination?: boolean;
  
  // UI
  showSearch?: boolean;
  showFilters?: boolean;
  filterBarClassName?: string;
  searchBarClassName?: string;
}

// Filter bar component
const filterBarVariants = cva(
  'flex flex-wrap items-center gap-2 p-4 bg-neutral-50 border-b border-neutral-200',
  {
    variants: {
      variant: {
        default: 'bg-neutral-50',
        compact: 'p-2 bg-white',
        minimal: 'p-2 bg-transparent border-0'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export function DataTable<T extends Record<string, unknown> = Record<string, unknown>>({
  data: initialData,
  columns,
  searchable = true,
  searchPlaceholder = 'Search...',
  searchKeys,
  onSearch,
  filterable = false,
  filters = [],
  onFilter,
  defaultSortColumn,
  defaultSortDirection = 'asc',
  defaultPageSize = 10,
  showPagination = true,
  showSearch = true,
  showFilters = true,
  filterBarClassName,
  searchBarClassName,
  rowKey = 'id',
  emptyText = 'No data found',
  ...tableProps
}: DataTableProps<T>) {
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter state
  const [columnFilters, setColumnFilters] = useState<Record<string, unknown>>({});
  
  // Sort state
  const [sortColumn, setSortColumn] = useState<string | undefined>(defaultSortColumn);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(defaultSortDirection);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  
  // Apply search
  const searchFilteredData = useMemo(() => {
    if (!searchable || !searchTerm.trim()) {
      return initialData;
    }
    
    const term = searchTerm.toLowerCase();
    const keys = searchKeys || columns.map(col => col.dataIndex || col.key).filter(Boolean);
    
    return initialData.filter(record => {
      return keys.some(key => {
        const value = typeof key === 'string' 
          ? (record as Record<string, unknown>)[key]
          : record[key as keyof T];
        
        if (value === null || value === undefined) return false;
        
        return String(value).toLowerCase().includes(term);
      });
    });
  }, [initialData, searchTerm, searchable, searchKeys, columns]);
  
  // Apply column filters
  const filterFilteredData = useMemo(() => {
    if (!filterable || filters.length === 0 || Object.keys(columnFilters).length === 0) {
      return searchFilteredData;
    }
    
    return searchFilteredData.filter(record => {
      return filters.every(filter => {
        const filterValue = columnFilters[filter.key];
        
        // Skip if no filter value
        if (filterValue === undefined || filterValue === null || filterValue === '') {
          return true;
        }
        
        // Use custom filter function if provided
        if (filter.filterFn) {
          return filter.filterFn(filterValue, record);
        }
        
        // Default filtering logic
        const recordValue = (record as Record<string, unknown>)[filter.key];
        
        switch (filter.type) {
          case 'text':
            return String(recordValue).toLowerCase().includes(String(filterValue).toLowerCase());
          case 'number':
            return Number(recordValue) === Number(filterValue);
          case 'boolean':
            return Boolean(recordValue) === Boolean(filterValue);
          case 'select':
            return String(recordValue) === String(filterValue);
          default:
            return String(recordValue).includes(String(filterValue));
        }
      });
    });
  }, [searchFilteredData, columnFilters, filterable, filters]);
  
  // Apply sorting
  const sortedData = useMemo(() => {
    if (!sortColumn) {
      return filterFilteredData;
    }
    
    const sorted = [...filterFilteredData];
    const column = columns.find(col => col.key === sortColumn);
    
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
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    
    return sorted;
  }, [filterFilteredData, sortColumn, sortDirection, columns]);
  
  // Apply pagination
  const paginatedData = useMemo(() => {
    if (!showPagination) {
      return sortedData;
    }
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize, showPagination]);
  
  // Callbacks
  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page on search
  }, []);
  
  const handleFilterChange = useCallback((key: string, value: unknown) => {
    setColumnFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1); // Reset to first page on filter
  }, []);
  
  const handleSort = useCallback((column: TableColumn<T>, direction: 'asc' | 'desc') => {
    setSortColumn(column.key);
    setSortDirection(direction);
  }, []);
  
  const handlePageChange = useCallback((page: number, newPageSize: number) => {
    setCurrentPage(page);
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);
      setCurrentPage(1); // Reset to first page when page size changes
    }
  }, [pageSize]);
  
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
            <div className={cn('flex-1 min-w-[200px]', searchBarClassName)}>
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
              {filters.map(filter => {
                const filterValue = columnFilters[filter.key];
                
                if (filter.type === 'select' && filter.options) {
                  return (
                    <select
                      key={filter.key}
                      value={String(filterValue || '')}
                      onChange={(e) => handleFilterChange(filter.key, e.target.value || undefined)}
                      className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                      aria-label={`Filter by ${filter.key}`}
                    >
                      <option value="">All {filter.key}</option>
                      {filter.options.map(option => (
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
                    type={filter.type === 'number' ? 'number' : 'text'}
                    placeholder={filter.placeholder || `Filter ${filter.key}...`}
                    value={String(filterValue || '')}
                    onChange={(e) => handleFilterChange(
                      filter.key, 
                      filter.type === 'number' ? Number(e.target.value) : e.target.value
                    )}
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
                  className="px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 underline"
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
            total: sortedData.length,
            onChange: handlePageChange,
            showSizeChanger: true
          }
        })}
      />
      
      {/* Results Summary */}
      {showPagination && sortedData.length > 0 && (
        <div className="mt-2 px-4 py-2 text-sm text-neutral-600">
          Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} results
          {searchTerm && ` (filtered from ${initialData.length} total)`}
        </div>
      )}
    </div>
  );
}

DataTable.displayName = 'DataTable';

