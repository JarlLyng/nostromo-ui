import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { DataTable, TableColumn, ColumnFilter } from '../data-table';

// Sample data for testing
const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 28, department: 'Engineering', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 32, department: 'Marketing', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 45, department: 'Sales', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 29, department: 'Engineering', status: 'Active' }
];

const columns: TableColumn[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true, align: 'center' },
  { key: 'department', title: 'Department', dataIndex: 'department', sortable: true },
  { key: 'status', title: 'Status', dataIndex: 'status' }
];

describe('DataTable', () => {
  it('renders table with data', () => {
    render(<DataTable data={sampleData} columns={columns} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('renders search input when searchable is true', () => {
    render(<DataTable data={sampleData} columns={columns} searchable={true} />);
    
    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toBeInTheDocument();
  });

  it('filters data by search term', async () => {
    render(<DataTable data={sampleData} columns={columns} searchable={true} />);
    
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'John' } });
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it('searches across multiple columns', async () => {
    render(<DataTable data={sampleData} columns={columns} searchable={true} />);
    
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Engineering' } });
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Alice Brown')).toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it('applies column filters', async () => {
    const filters: ColumnFilter[] = [
      {
        key: 'department',
        type: 'select',
        options: [
          { label: 'Engineering', value: 'Engineering' },
          { label: 'Marketing', value: 'Marketing' },
          { label: 'Sales', value: 'Sales' }
        ]
      }
    ];
    
    render(
      <DataTable 
        data={sampleData} 
        columns={columns} 
        filterable={true}
        filters={filters}
      />
    );
    
    const filterSelect = screen.getByLabelText('Filter by department');
    fireEvent.change(filterSelect, { target: { value: 'Engineering' } });
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Alice Brown')).toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it('sorts data when column header is clicked', async () => {
    render(<DataTable data={sampleData} columns={columns} />);
    
    const nameHeader = screen.getByText('Name').closest('th');
    const sortButton = nameHeader?.querySelector('button');
    
    if (sortButton) {
      fireEvent.click(sortButton);
      
      await waitFor(() => {
        const rows = screen.getAllByRole('row');
        // First data row should be sorted
        expect(rows[1]).toHaveTextContent('Alice Brown');
      }, { timeout: 5000 });
    }
  });

  it('paginates data correctly', async () => {
    render(
      <DataTable 
        data={sampleData} 
        columns={columns} 
        defaultPageSize={2}
        showPagination={true}
      />
    );
    
    // Should show first 2 items
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.queryByText('Bob Johnson')).not.toBeInTheDocument();
    
    // Click next page
    const nextButton = screen.getByLabelText('Go to next page');
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
      expect(screen.getByText('Alice Brown')).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it('calls onSearch callback when search term changes', async () => {
    const onSearch = vi.fn();
    
    render(
      <DataTable 
        data={sampleData} 
        columns={columns} 
        searchable={true}
        onSearch={onSearch}
      />
    );
    
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'John' } });
    
    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith('John', expect.any(Array));
    }, { timeout: 5000 });
  });

  it('calls onFilter callback when filter changes', async () => {
    const onFilter = vi.fn();
    const filters: ColumnFilter[] = [
      {
        key: 'status',
        type: 'select',
        options: [
          { label: 'Active', value: 'Active' },
          { label: 'Inactive', value: 'Inactive' }
        ]
      }
    ];
    
    render(
      <DataTable 
        data={sampleData} 
        columns={columns} 
        filterable={true}
        filters={filters}
        onFilter={onFilter}
      />
    );
    
    const filterSelect = screen.getByLabelText('Filter by status');
    fireEvent.change(filterSelect, { target: { value: 'Active' } });
    
    await waitFor(() => {
      expect(onFilter).toHaveBeenCalledWith(
        { status: 'Active' },
        expect.any(Array)
      );
    }, { timeout: 5000 });
  });

  it('hides search bar when showSearch is false', () => {
    render(
      <DataTable 
        data={sampleData} 
        columns={columns} 
        searchable={true}
        showSearch={false}
      />
    );
    
    expect(screen.queryByPlaceholderText('Search...')).not.toBeInTheDocument();
  });

  it('hides filters when showFilters is false', () => {
    const filters: ColumnFilter[] = [
      {
        key: 'department',
        type: 'select',
        options: [{ label: 'Engineering', value: 'Engineering' }]
      }
    ];
    
    render(
      <DataTable 
        data={sampleData} 
        columns={columns} 
        filterable={true}
        filters={filters}
        showFilters={false}
      />
    );
    
    expect(screen.queryByLabelText('Filter by department')).not.toBeInTheDocument();
  });

  it('shows results summary', () => {
    render(
      <DataTable 
        data={sampleData} 
        columns={columns} 
        showPagination={true}
        defaultPageSize={10}
      />
    );
    
    // Check for results summary text (may appear multiple times)
    const summaries = screen.getAllByText(/Showing 1 to 4 of 4 results/);
    expect(summaries.length).toBeGreaterThan(0);
  });

  it('resets to first page when search changes', async () => {
    render(
      <DataTable 
        data={sampleData} 
        columns={columns} 
        searchable={true}
        defaultPageSize={2}
        showPagination={true}
      />
    );
    
    // Go to page 2
    const nextButton = screen.getByLabelText('Go to next page');
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Search should reset to page 1
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'John' } });
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      // Should be on page 1
      expect(screen.getByText(/Page 1 of/)).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it('clears filters when clear button is clicked', async () => {
    const filters: ColumnFilter[] = [
      {
        key: 'department',
        type: 'select',
        options: [
          { label: 'Engineering', value: 'Engineering' },
          { label: 'Marketing', value: 'Marketing' }
        ]
      }
    ];
    
    render(
      <DataTable 
        data={sampleData} 
        columns={columns} 
        filterable={true}
        filters={filters}
      />
    );
    
    // Apply filter
    const filterSelect = screen.getByLabelText('Filter by department');
    fireEvent.change(filterSelect, { target: { value: 'Engineering' } });
    
    await waitFor(() => {
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Clear filters
    const clearButton = screen.getByText('Clear filters');
    fireEvent.click(clearButton);
    
    await waitFor(() => {
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    }, { timeout: 5000 });
  });
});

