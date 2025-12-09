import React from 'react';
import { render, screen } from '@testing-library/react';
import { Chart } from '../charts';

const sampleData = [
  { name: 'Jan', value: 400, sales: 240 },
  { name: 'Feb', value: 300, sales: 139 },
  { name: 'Mar', value: 200, sales: 980 },
  { name: 'Apr', value: 278, sales: 390 },
  { name: 'May', value: 189, sales: 480 }
];

describe('Chart', () => {
  it('renders line chart', () => {
    render(
      <Chart
        type="line"
        data={sampleData}
        dataKeys={['value']}
      />
    );
    
    const chart = screen.getByRole('img');
    expect(chart).toBeInTheDocument();
  });

  it('renders bar chart', () => {
    render(
      <Chart
        type="bar"
        data={sampleData}
        dataKeys={['value']}
      />
    );
    
    const chart = screen.getByRole('img');
    expect(chart).toBeInTheDocument();
  });

  it('renders area chart', () => {
    render(
      <Chart
        type="area"
        data={sampleData}
        dataKeys={['value']}
      />
    );
    
    const chart = screen.getByRole('img');
    expect(chart).toBeInTheDocument();
  });

  it('renders pie chart', () => {
    render(
      <Chart
        type="pie"
        data={sampleData}
        dataKeys={['value']}
      />
    );
    
    const chart = screen.getByRole('img');
    expect(chart).toBeInTheDocument();
  });

  it('displays title when provided', () => {
    render(
      <Chart
        type="line"
        data={sampleData}
        dataKeys={['value']}
        title="Sales Chart"
      />
    );
    
    expect(screen.getByText('Sales Chart')).toBeInTheDocument();
  });

  it('displays description when provided', () => {
    render(
      <Chart
        type="line"
        data={sampleData}
        dataKeys={['value']}
        description="Monthly sales data"
      />
    );
    
    expect(screen.getByText('Monthly sales data')).toBeInTheDocument();
  });

  it('uses custom aria-label when provided', () => {
    render(
      <Chart
        type="line"
        data={sampleData}
        dataKeys={['value']}
        ariaLabel="Custom chart label"
      />
    );
    
    const chart = screen.getByRole('img');
    expect(chart).toHaveAttribute('aria-label', 'Custom chart label');
  });

  it('uses default aria-label when title is provided', () => {
    render(
      <Chart
        type="line"
        data={sampleData}
        dataKeys={['value']}
        title="Sales Chart"
      />
    );
    
    const chart = screen.getByRole('img');
    expect(chart).toHaveAttribute('aria-label', 'Sales Chart');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Chart
        type="line"
        data={sampleData}
        dataKeys={['value']}
        className="custom-class"
      />
    );
    
    const chart = container.querySelector('.custom-class');
    expect(chart).toBeInTheDocument();
  });

  it('renders with multiple data keys', () => {
    render(
      <Chart
        type="line"
        data={sampleData}
        dataKeys={['value', 'sales']}
      />
    );
    
    const chart = screen.getByRole('img');
    expect(chart).toBeInTheDocument();
  });

  it('uses custom colors when provided', () => {
    const customColors = ['#ff0000', '#00ff00'];
    render(
      <Chart
        type="line"
        data={sampleData}
        dataKeys={['value', 'sales']}
        colors={customColors}
      />
    );
    
    const chart = screen.getByRole('img');
    expect(chart).toBeInTheDocument();
  });

  it('hides grid when showGrid is false', () => {
    render(
      <Chart
        type="line"
        data={sampleData}
        dataKeys={['value']}
        showGrid={false}
      />
    );
    
    const chart = screen.getByRole('img');
    expect(chart).toBeInTheDocument();
  });

  it('hides legend when showLegend is false', () => {
    render(
      <Chart
        type="line"
        data={sampleData}
        dataKeys={['value']}
        showLegend={false}
      />
    );
    
    const chart = screen.getByRole('img');
    expect(chart).toBeInTheDocument();
  });

  it('hides tooltip when showTooltip is false', () => {
    render(
      <Chart
        type="line"
        data={sampleData}
        dataKeys={['value']}
        showTooltip={false}
      />
    );
    
    const chart = screen.getByRole('img');
    expect(chart).toBeInTheDocument();
  });
});

