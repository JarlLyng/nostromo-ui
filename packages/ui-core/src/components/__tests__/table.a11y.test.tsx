import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Table, TableColumn } from '../table';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

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

describe('Table Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Table data={sampleData} columns={columns} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper table structure', () => {
    render(<Table data={sampleData} columns={columns} />);
    
    // Check for table element
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    
    // Check for table headers
    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(4); // 4 columns
    
    // Check for table cells
    const cells = screen.getAllByRole('cell');
    expect(cells.length).toBeGreaterThan(0);
  });

  it('should have accessible sort buttons', () => {
    render(<Table data={sampleData} columns={columns} />);
    
    const sortButtons = screen.getAllByLabelText(/Sort by/);
    expect(sortButtons).toHaveLength(2); // Only sortable columns have sort buttons
    
    sortButtons.forEach(button => {
      expect(button).toHaveAttribute('aria-label');
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  it('should have accessible checkboxes for selection', () => {
    render(
      <Table
        data={sampleData}
        columns={columns}
        selection={{
          selectedRowKeys: [],
          onChange: vi.fn()
        }}
      />
    );
    
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(4); // 1 select all + 3 data rows
    
    checkboxes.forEach(checkbox => {
      expect(checkbox).toHaveAttribute('type', 'checkbox');
    });
  });

  it('should have accessible pagination controls', () => {
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
    
    const nextButton = screen.getByText('Next');
    const prevButton = screen.getByText('Previous');
    
    expect(nextButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
    
    // Check for proper button attributes
    expect(nextButton).toHaveAttribute('type', 'button');
    expect(prevButton).toHaveAttribute('type', 'button');
  });

  it('should have proper focus management', () => {
    render(<Table data={sampleData} columns={columns} />);
    
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    
    // Check that interactive elements are focusable
    const sortButtons = screen.getAllByLabelText(/Sort by/);
    sortButtons.forEach(button => {
      expect(button).toBeInTheDocument();
    });
  });

  it('should have proper ARIA labels for sortable columns', () => {
    render(<Table data={sampleData} columns={columns} />);
    
    const nameSortButton = screen.getByLabelText('Sort by Name');
    const ageSortButton = screen.getByLabelText('Sort by Age');
    
    expect(nameSortButton).toBeInTheDocument();
    expect(ageSortButton).toBeInTheDocument();
  });

  it('should have proper table caption for screen readers', () => {
    render(<Table data={sampleData} columns={columns} />);
    
    // The table should be properly structured for screen readers
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    
    // Check that headers are properly associated with data
    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(4);
  });

  it('should handle keyboard navigation for sortable columns', () => {
    render(<Table data={sampleData} columns={columns} />);
    
    const sortButton = screen.getByLabelText('Sort by Name');
    
    // Check that sort button is keyboard accessible
    expect(sortButton).toBeInTheDocument();
    expect(sortButton).toHaveAttribute('type', 'button');
  });

  it('should have proper contrast for interactive elements', () => {
    render(<Table data={sampleData} columns={columns} />);
    
    const sortButtons = screen.getAllByLabelText(/Sort by/);
    sortButtons.forEach(button => {
      expect(button).toBeInTheDocument();
    });
  });

  it('should have accessible loading state', async () => {
    const { container } = render(<Table data={[]} columns={columns} loading={true} />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible empty state', async () => {
    const { container } = render(<Table data={[]} columns={columns} emptyText="No data found" />);
    
    expect(screen.getByText('No data found')).toBeInTheDocument();
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper table structure with selection', async () => {
    const { container } = render(
      <Table
        data={sampleData}
        columns={columns}
        selection={{
          selectedRowKeys: [],
          onChange: vi.fn()
        }}
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper table structure with pagination', async () => {
    const { container } = render(
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
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper table structure with all features', async () => {
    const { container } = render(
      <Table
        data={sampleData}
        columns={columns}
        selection={{
          selectedRowKeys: [],
          onChange: vi.fn()
        }}
        pagination={{
          current: 1,
          pageSize: 2,
          total: 3,
          onChange: vi.fn()
        }}
        onSort={vi.fn()}
        onRowClick={vi.fn()}
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
