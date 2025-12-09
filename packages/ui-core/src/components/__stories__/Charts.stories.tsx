import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chart } from '../charts';

// Sample data
const monthlyData = [
  { name: 'Jan', sales: 4000, revenue: 2400, profit: 2400 },
  { name: 'Feb', sales: 3000, revenue: 1398, profit: 2210 },
  { name: 'Mar', sales: 2000, revenue: 9800, profit: 2290 },
  { name: 'Apr', sales: 2780, revenue: 3908, profit: 2000 },
  { name: 'May', sales: 1890, revenue: 4800, profit: 2181 },
  { name: 'Jun', sales: 2390, revenue: 3800, profit: 2500 },
  { name: 'Jul', sales: 3490, revenue: 4300, profit: 2100 }
];

const categoryData = [
  { name: 'Electronics', value: 400 },
  { name: 'Clothing', value: 300 },
  { name: 'Food', value: 200 },
  { name: 'Books', value: 278 },
  { name: 'Toys', value: 189 }
];

const meta: Meta<typeof Chart> = {
  title: 'Components/Charts',
  component: Chart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible chart component built on Recharts. Supports line, bar, area, and pie charts with full accessibility and customization options.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['line', 'bar', 'area', 'pie'],
      description: 'Chart type'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl']
    },
    showGrid: {
      control: 'boolean'
    },
    showLegend: {
      control: 'boolean'
    },
    showTooltip: {
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Chart>;

export const LineChart: Story = {
  args: {
    type: 'line',
    data: monthlyData,
    dataKeys: ['sales'],
    title: 'Monthly Sales',
    description: 'Sales data for the first 7 months'
  }
};

export const LineChartMultiple: Story = {
  args: {
    type: 'line',
    data: monthlyData,
    dataKeys: ['sales', 'revenue', 'profit'],
    title: 'Sales, Revenue & Profit',
    description: 'Multiple metrics over time'
  }
};

export const BarChart: Story = {
  args: {
    type: 'bar',
    data: monthlyData,
    dataKeys: ['sales'],
    title: 'Monthly Sales (Bar)',
    description: 'Sales data displayed as bars'
  }
};

export const BarChartMultiple: Story = {
  args: {
    type: 'bar',
    data: monthlyData,
    dataKeys: ['sales', 'revenue'],
    title: 'Sales & Revenue Comparison',
    description: 'Side-by-side comparison'
  }
};

export const AreaChart: Story = {
  args: {
    type: 'area',
    data: monthlyData,
    dataKeys: ['sales'],
    title: 'Sales Trend (Area)',
    description: 'Area chart showing sales trend'
  }
};

export const AreaChartMultiple: Story = {
  args: {
    type: 'area',
    data: monthlyData,
    dataKeys: ['sales', 'revenue'],
    title: 'Sales & Revenue Trends',
    description: 'Stacked area chart'
  }
};

export const PieChart: Story = {
  args: {
    type: 'pie',
    data: categoryData,
    dataKeys: ['value'],
    title: 'Category Distribution',
    description: 'Sales by category'
  }
};

export const Small: Story = {
  args: {
    type: 'line',
    data: monthlyData,
    dataKeys: ['sales'],
    size: 'sm',
    title: 'Small Chart'
  }
};

export const Large: Story = {
  args: {
    type: 'line',
    data: monthlyData,
    dataKeys: ['sales'],
    size: 'lg',
    title: 'Large Chart'
  }
};

export const WithoutGrid: Story = {
  args: {
    type: 'line',
    data: monthlyData,
    dataKeys: ['sales'],
    showGrid: false,
    title: 'Chart Without Grid'
  }
};

export const WithoutLegend: Story = {
  args: {
    type: 'line',
    data: monthlyData,
    dataKeys: ['sales', 'revenue'],
    showLegend: false,
    title: 'Chart Without Legend'
  }
};

export const WithoutTooltip: Story = {
  args: {
    type: 'line',
    data: monthlyData,
    dataKeys: ['sales'],
    showTooltip: false,
    title: 'Chart Without Tooltip'
  }
};

export const CustomColors: Story = {
  args: {
    type: 'bar',
    data: monthlyData,
    dataKeys: ['sales', 'revenue', 'profit'],
    colors: ['#ef4444', '#10b981', '#3b82f6'],
    title: 'Custom Colors',
    description: 'Chart with custom color palette'
  }
};

export const Minimal: Story = {
  args: {
    type: 'line',
    data: monthlyData,
    dataKeys: ['sales'],
    showGrid: false,
    showLegend: false,
    showTooltip: false,
    variant: 'minimal'
  }
};

export const InteractivePlayground: Story = {
  args: {
    type: 'line',
    data: monthlyData,
    dataKeys: ['sales'],
    title: 'Interactive Chart'
  },
  render: (args) => {
    const [chartType, setChartType] = React.useState<'line' | 'bar' | 'area' | 'pie'>('line');
    const [selectedKeys, setSelectedKeys] = React.useState<string[]>(['sales']);
    
    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Chart Type</label>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value as 'line' | 'bar' | 'pie' | 'area')}
              className="border border-neutral-300 rounded px-3 py-1"
            >
              <option value="line">Line</option>
              <option value="bar">Bar</option>
              <option value="area">Area</option>
              <option value="pie">Pie</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Data Keys</label>
            <div className="flex gap-2">
              {['sales', 'revenue', 'profit'].map((key) => (
                <label key={key} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={selectedKeys.includes(key)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedKeys([...selectedKeys, key]);
                      } else {
                        setSelectedKeys(selectedKeys.filter(k => k !== key));
                      }
                    }}
                  />
                  <span className="text-sm">{key}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <Chart
          {...args}
          type={chartType}
          dataKeys={selectedKeys.length > 0 ? selectedKeys : ['sales']}
          data={chartType === 'pie' ? categoryData : monthlyData}
        />
      </div>
    );
  }
};

