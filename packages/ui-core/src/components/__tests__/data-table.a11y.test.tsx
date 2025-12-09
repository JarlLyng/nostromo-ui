import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { DataTable, TableColumn, ColumnFilter } from '../data-table';

expect.extend(toHaveNoViolations);

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 28, department: 'Engineering', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 32, department: 'Marketing', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 45, department: 'Sales', status: 'Inactive' }
];

const columns: TableColumn[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
  { key: 'department', title: 'Department', dataIndex: 'department' }
];

describe('DataTable Accessibility', () => {
  it('has no accessibility violations with basic table', async () => {
    const { container } = render(
      <DataTable data={sampleData} columns={columns} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with search enabled', async () => {
    const { container } = render(
      <DataTable data={sampleData} columns={columns} searchable={true} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with filters enabled', async () => {
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
    
    const { container } = render(
      <DataTable 
        data={sampleData} 
        columns={columns} 
        filterable={true}
        filters={filters}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with pagination', async () => {
    const { container } = render(
      <DataTable 
        data={sampleData} 
        columns={columns} 
        showPagination={true}
        defaultPageSize={2}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with all features enabled', async () => {
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
    
    const { container } = render(
      <DataTable 
        data={sampleData} 
        columns={columns} 
        searchable={true}
        filterable={true}
        filters={filters}
        showPagination={true}
        defaultPageSize={10}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has proper ARIA labels for search input', async () => {
    const { container } = render(
      <DataTable data={sampleData} columns={columns} searchable={true} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    // Verify search input has aria-label
    const searchInput = container.querySelector('input[aria-label="Search table"]');
    expect(searchInput).toBeInTheDocument();
  });

  it('has proper ARIA labels for filter inputs', async () => {
    const filters: ColumnFilter[] = [
      {
        key: 'department',
        type: 'select',
        options: [{ label: 'Engineering', value: 'Engineering' }]
      }
    ];
    
    const { container } = render(
      <DataTable 
        data={sampleData} 
        columns={columns} 
        filterable={true}
        filters={filters}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    // Verify filter has aria-label
    const filterSelect = container.querySelector('select[aria-label*="Filter by"]');
    expect(filterSelect).toBeInTheDocument();
  });
});

