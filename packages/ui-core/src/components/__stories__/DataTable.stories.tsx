import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTable, TableColumn, ColumnFilter } from '../data-table';

// Extended sample data
const sampleData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    age: 28,
    department: 'Engineering',
    status: 'Active',
    salary: 75000,
    joinDate: '2020-01-15'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    age: 32,
    department: 'Marketing',
    status: 'Active',
    salary: 68000,
    joinDate: '2019-03-20'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    age: 45,
    department: 'Sales',
    status: 'Inactive',
    salary: 82000,
    joinDate: '2018-06-10'
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    age: 29,
    department: 'Engineering',
    status: 'Active',
    salary: 78000,
    joinDate: '2021-02-14'
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    age: 38,
    department: 'HR',
    status: 'Active',
    salary: 65000,
    joinDate: '2020-09-05'
  },
  {
    id: 6,
    name: 'Diana Prince',
    email: 'diana@example.com',
    age: 35,
    department: 'Marketing',
    status: 'Active',
    salary: 72000,
    joinDate: '2019-11-18'
  },
  {
    id: 7,
    name: 'Eve Adams',
    email: 'eve@example.com',
    age: 27,
    department: 'Engineering',
    status: 'Inactive',
    salary: 69000,
    joinDate: '2022-01-08'
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
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
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

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'An advanced table component with built-in search, filtering, sorting, and pagination. Built on top of the Table component with enhanced data management capabilities.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    searchable: {
      control: 'boolean',
      description: 'Enable global search functionality'
    },
    filterable: {
      control: 'boolean',
      description: 'Enable column filtering'
    },
    showPagination: {
      control: 'boolean',
      description: 'Show pagination controls'
    },
    defaultPageSize: {
      control: 'number',
      description: 'Default number of items per page'
    }
  }
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  args: {
    data: sampleData,
    columns,
    searchable: true,
    showPagination: true,
    defaultPageSize: 10
  }
};

export const WithSearch: Story = {
  args: {
    data: sampleData,
    columns,
    searchable: true,
    searchPlaceholder: 'Search employees...',
    showPagination: true,
    defaultPageSize: 10
  }
};

export const WithFilters: Story = {
  args: {
    data: sampleData,
    columns,
    searchable: true,
    filterable: true,
    filters: [
      {
        key: 'department',
        type: 'select',
        options: [
          { label: 'Engineering', value: 'Engineering' },
          { label: 'Marketing', value: 'Marketing' },
          { label: 'Sales', value: 'Sales' },
          { label: 'HR', value: 'HR' }
        ]
      },
      {
        key: 'status',
        type: 'select',
        options: [
          { label: 'Active', value: 'Active' },
          { label: 'Inactive', value: 'Inactive' }
        ]
      }
    ] as ColumnFilter[],
    showPagination: true,
    defaultPageSize: 10
  }
};

export const WithTextFilter: Story = {
  args: {
    data: sampleData,
    columns,
    searchable: true,
    filterable: true,
    filters: [
      {
        key: 'name',
        type: 'text',
        placeholder: 'Filter by name...'
      },
      {
        key: 'email',
        type: 'text',
        placeholder: 'Filter by email...'
      }
    ] as ColumnFilter[],
    showPagination: true,
    defaultPageSize: 10
  }
};

export const WithPagination: Story = {
  args: {
    data: sampleData,
    columns,
    searchable: true,
    showPagination: true,
    defaultPageSize: 3,
    pageSizeOptions: [3, 5, 10, 20]
  }
};

export const WithoutPagination: Story = {
  args: {
    data: sampleData,
    columns,
    searchable: true,
    showPagination: false
  }
};

export const WithDefaultSort: Story = {
  args: {
    data: sampleData,
    columns,
    searchable: true,
    defaultSortColumn: 'name',
    defaultSortDirection: 'asc',
    showPagination: true,
    defaultPageSize: 10
  }
};

export const WithCustomSearchKeys: Story = {
  args: {
    data: sampleData,
    columns,
    searchable: true,
    searchKeys: ['name', 'email'],
    searchPlaceholder: 'Search by name or email...',
    showPagination: true,
    defaultPageSize: 10
  }
};

export const ComplexExample: Story = {
  args: {
    data: sampleData,
    columns,
    searchable: true,
    filterable: true,
    filters: [
      {
        key: 'department',
        type: 'select',
        options: [
          { label: 'Engineering', value: 'Engineering' },
          { label: 'Marketing', value: 'Marketing' },
          { label: 'Sales', value: 'Sales' },
          { label: 'HR', value: 'HR' }
        ]
      },
      {
        key: 'status',
        type: 'select',
        options: [
          { label: 'Active', value: 'Active' },
          { label: 'Inactive', value: 'Inactive' }
        ]
      }
    ] as ColumnFilter[],
    defaultSortColumn: 'name',
    defaultSortDirection: 'asc',
    showPagination: true,
    defaultPageSize: 5,
    pageSizeOptions: [5, 10, 20, 50]
  }
};

export const InteractivePlayground: Story = {
  args: {
    data: sampleData,
    columns,
    searchable: true,
    filterable: true,
    filters: [
      {
        key: 'department',
        type: 'select',
        options: [
          { label: 'Engineering', value: 'Engineering' },
          { label: 'Marketing', value: 'Marketing' },
          { label: 'Sales', value: 'Sales' },
          { label: 'HR', value: 'HR' }
        ]
      }
    ] as ColumnFilter[],
    showPagination: true,
    defaultPageSize: 5
  },
  render: (args) => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filteredCount, setFilteredCount] = React.useState(0);

    return (
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-900 dark:text-blue-200">
            <strong>Search term:</strong> {searchTerm || '(none)'}
          </p>
          <p className="text-sm text-blue-900 dark:text-blue-200">
            <strong>Filtered results:</strong> {filteredCount}
          </p>
        </div>
        
        <DataTable
          {...args}
          onSearch={(term, filteredData) => {
            setSearchTerm(term);
            setFilteredCount(filteredData.length);
          }}
        />
      </div>
    );
  }
};

