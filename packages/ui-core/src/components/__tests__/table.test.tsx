import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Table, TableColumn } from '../table';

// Sample data for testing
const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 28, department: 'Engineering' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 32, department: 'Marketing' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 45, department: 'Sales' }
];

const columns: TableColumn[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true, align: 'center' },
  { key: 'department', title: 'Department', dataIndex: 'department' }
];

describe('Table', () => {
  it('renders table with data', () => {
    render(<Table data={sampleData} columns={columns} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
  });

  it('renders table headers', () => {
    render(<Table data={sampleData} columns={columns} />);
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('Department')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    render(<Table data={[]} columns={columns} loading={true} />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(<Table data={[]} columns={columns} emptyText="No data found" />);
    
    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(<Table data={sampleData} columns={columns} variant="striped" />);
    expect(screen.getByRole('table')).toHaveClass('border', 'border-neutral-200');

    rerender(<Table data={sampleData} columns={columns} variant="bordered" />);
    const table = screen.getByRole('table');
    expect(table).toHaveClass('border-2', 'border-neutral-300');
    // "bordered" should not have the thin border
    expect(table).not.toHaveClass('border', 'border-neutral-200');
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Table data={sampleData} columns={columns} size="sm" />);
    expect(screen.getByRole('table')).toHaveClass('text-xs', 'sm:text-sm');

    rerender(<Table data={sampleData} columns={columns} size="lg" />);
    expect(screen.getByRole('table')).toHaveClass('text-base', 'sm:text-lg');
  });

  it('handles row click', () => {
    const onRowClick = vi.fn();
    render(<Table data={sampleData} columns={columns} onRowClick={onRowClick} />);
    
    fireEvent.click(screen.getByText('John Doe').closest('tr')!);
    expect(onRowClick).toHaveBeenCalledWith(sampleData[0], 0);
  });

  it('handles sorting', () => {
    const onSort = vi.fn();
    render(<Table data={sampleData} columns={columns} onSort={onSort} />);
    
    const sortButton = screen.getByLabelText('Sort by Name');
    fireEvent.click(sortButton);
    
    expect(onSort).toHaveBeenCalledWith(columns[0], 'asc');
  });

  it('handles selection', () => {
    const onChange = vi.fn();
    render(
      <Table
        data={sampleData}
        columns={columns}
        selection={{
          selectedRowKeys: [],
          onChange
        }}
      />
    );
    
    const checkbox = screen.getAllByRole('checkbox')[1]; // First data row checkbox
    fireEvent.click(checkbox);
    
    expect(onChange).toHaveBeenCalledWith([1], [sampleData[0]]);
  });

  it('handles select all', () => {
    const onChange = vi.fn();
    render(
      <Table
        data={sampleData}
        columns={columns}
        selection={{
          selectedRowKeys: [],
          onChange
        }}
      />
    );
    
    const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(selectAllCheckbox);
    
    expect(onChange).toHaveBeenCalledWith([1, 2, 3], sampleData);
  });

  it('renders pagination', () => {
    render(
      <Table
        data={sampleData}
        columns={columns}
        pagination={{
          current: 1,
          pageSize: 2,
          total: 3,
          onChange: vi.fn()
        }}
      />
    );
    
    expect(screen.getByText('Showing 1 to 2 of 3 results')).toBeInTheDocument();
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
  });

  it('handles pagination change', () => {
    const onChange = vi.fn();
    render(
      <Table
        data={sampleData}
        columns={columns}
        pagination={{
          current: 1,
          pageSize: 2,
          total: 3,
          onChange
        }}
      />
    );
    
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    expect(onChange).toHaveBeenCalledWith(2, 2);
  });

  it('renders custom cell content', () => {
    const customColumns: TableColumn[] = [
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        render: (value) => <strong>{value}</strong>
      }
    ];
    
    render(<Table data={sampleData} columns={customColumns} />);
    
    expect(screen.getByText('John Doe').closest('strong')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Table data={sampleData} columns={columns} className="custom-table" />);
    
    expect(screen.getByRole('table')).toHaveClass('custom-table');
  });

  it('handles disabled selection', () => {
    const onChange = vi.fn();
    render(
      <Table
        data={sampleData}
        columns={columns}
        selection={{
          selectedRowKeys: [],
          onChange,
          getCheckboxProps: (record) => ({
            disabled: record.id === 1
          })
        }}
      />
    );
    
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[1]).toBeDisabled(); // First data row should be disabled
    expect(checkboxes[2]).not.toBeDisabled(); // Second data row should be enabled
  });

  it('shows indeterminate state for select all', () => {
    render(
      <Table
        data={sampleData}
        columns={columns}
        selection={{
          selectedRowKeys: [1],
          onChange: vi.fn()
        }}
      />
    );
    
    const selectAllCheckbox = screen.getAllByRole('checkbox')[0] as HTMLInputElement;
    expect(selectAllCheckbox.indeterminate).toBe(true);
  });

  it('renders with different row keys', () => {
    const customData = [
      { customId: 'a', name: 'John' },
      { customId: 'b', name: 'Jane' }
    ];
    
    render(
      <Table
        data={customData}
        columns={[{ key: 'name', title: 'Name', dataIndex: 'name' }]}
        rowKey="customId"
      />
    );
    
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });

  it('renders with function row key', () => {
    render(
      <Table
        data={sampleData}
        columns={columns}
        rowKey={(record) => `row-${record.id}`}
      />
    );
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
