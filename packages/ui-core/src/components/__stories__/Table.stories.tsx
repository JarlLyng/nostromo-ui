import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table, TableColumn } from '../table';

// Sample data
const sampleData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    age: 28,
    department: 'Engineering',
    status: 'Active',
    salary: 75000
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    age: 32,
    department: 'Marketing',
    status: 'Active',
    salary: 68000
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    age: 45,
    department: 'Sales',
    status: 'Inactive',
    salary: 82000
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    age: 29,
    department: 'Engineering',
    status: 'Active',
    salary: 78000
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    age: 38,
    department: 'HR',
    status: 'Active',
    salary: 65000
  }
];

const columns: TableColumn[] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sortable: true,
    width: '200px'
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sortable: true
  },
  {
    key: 'age',
    title: 'Age',
    dataIndex: 'age',
    sortable: true,
    align: 'center',
    width: '80px'
  },
  {
    key: 'department',
    title: 'Department',
    dataIndex: 'department',
    sortable: true
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    render: (value: string) => (
      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
        value === 'Active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {value}
      </span>
    )
  },
  {
    key: 'salary',
    title: 'Salary',
    dataIndex: 'salary',
    sortable: true,
    align: 'right',
    render: (value: number) => '$' + value.toLocaleString()
  }
];

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible and accessible table component with sorting, pagination, and selection features.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'striped', 'bordered', 'hover']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    loading: {
      control: 'boolean'
    },
    emptyText: {
      control: 'text'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    data: sampleData,
    columns,
    variant: 'default',
    size: 'md'
  }
};

export const Striped: Story = {
  args: {
    data: sampleData,
    columns,
    variant: 'striped',
    size: 'md'
  }
};

export const Bordered: Story = {
  args: {
    data: sampleData,
    columns,
    variant: 'bordered',
    size: 'md'
  }
};

export const Hover: Story = {
  args: {
    data: sampleData,
    columns,
    variant: 'hover',
    size: 'md'
  }
};

export const Small: Story = {
  args: {
    data: sampleData,
    columns,
    variant: 'default',
    size: 'sm'
  }
};

export const Large: Story = {
  args: {
    data: sampleData,
    columns,
    variant: 'default',
    size: 'lg'
  }
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
    variant: 'default',
    size: 'md'
  }
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
    emptyText: 'No employees found',
    variant: 'default',
    size: 'md'
  }
};

export const WithSelection: Story = {
  args: {
    data: sampleData,
    columns,
    variant: 'default',
    size: 'md',
    selection: {
      selectedRowKeys: [1, 3],
      onChange: (selectedRowKeys, selectedRows) => {
        console.log('Selected keys:', selectedRowKeys);
        console.log('Selected rows:', selectedRows);
      }
    }
  }
};

export const WithPagination: Story = {
  args: {
    data: sampleData,
    columns,
    variant: 'default',
    size: 'md',
    pagination: {
      current: 1,
      pageSize: 3,
      total: 5,
      onChange: (page, pageSize) => {
        console.log('Page changed:', page, 'Page size:', pageSize);
      },
      showSizeChanger: true
    }
  }
};

export const WithRowClick: Story = {
  args: {
    data: sampleData,
    columns,
    variant: 'default',
    size: 'md',
    onRowClick: (record, index) => {
      console.log('Row clicked:', record, 'Index:', index);
    }
  }
};

export const WithSorting: Story = {
  args: {
    data: sampleData,
    columns,
    variant: 'default',
    size: 'md',
    onSort: (column, direction) => {
      console.log('Sort by:', column.title, 'Direction:', direction);
    }
  }
};

export const ComplexExample: Story = {
  args: {
    data: sampleData,
    columns,
    variant: 'striped',
    size: 'md',
    selection: {
      selectedRowKeys: [],
      onChange: (selectedRowKeys, selectedRows) => {
        console.log('Selected:', selectedRowKeys, selectedRows);
      }
    },
    pagination: {
      current: 1,
      pageSize: 10,
      total: 5,
      onChange: (page, pageSize) => {
        console.log('Pagination:', page, pageSize);
      },
      showSizeChanger: true
    },
    onRowClick: (record, _index) => {
      console.log('Row clicked:', record);
    },
    onSort: (column, direction) => {
      console.log('Sort:', column.title, direction);
    }
  }
};

export const InteractivePlayground: Story = {
  args: {
    data: sampleData,
    columns,
    variant: 'default',
    size: 'md'
  },
  render: (args) => {
    const [selectedVariant, setSelectedVariant] = React.useState(args.variant as 'default' | 'striped' | 'bordered' | 'hover');
    const [selectedSize, setSelectedSize] = React.useState(args.size as 'sm' | 'md' | 'lg');
    const [selectedRowKeys, setSelectedRowKeys] = React.useState<number[]>([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(3);

    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Variant</label>
            <select
              value={selectedVariant}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedVariant(e.target.value as 'default' | 'striped' | 'bordered' | 'hover')}
              className="border border-gray-300 rounded px-3 py-1"
            >
              <option value="default">Default</option>
              <option value="striped">Striped</option>
              <option value="bordered">Bordered</option>
              <option value="hover">Hover</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Size</label>
            <select
              value={selectedSize}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedSize(e.target.value as 'sm' | 'md' | 'lg')}
              className="border border-gray-300 rounded px-3 py-1"
            >
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
            </select>
          </div>
        </div>
        
        <Table
          {...args}
          variant={selectedVariant}
          size={selectedSize}
          selection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys
          }}
          pagination={{
            current: currentPage,
            pageSize,
            total: sampleData.length,
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            },
            showSizeChanger: true
          }}
        />
      </div>
    );
  }
};
