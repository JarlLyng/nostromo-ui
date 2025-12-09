import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Chart } from '../charts';

expect.extend(toHaveNoViolations);

const sampleData = [
  { name: 'Jan', value: 400, sales: 240 },
  { name: 'Feb', value: 300, sales: 139 },
  { name: 'Mar', value: 200, sales: 980 }
];

describe('Chart Accessibility', () => {
  it('has no accessibility violations with line chart', async () => {
    const { container } = render(
      <Chart
        type="line"
        data={sampleData}
        dataKeys={['value']}
        title="Line Chart"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with bar chart', async () => {
    const { container } = render(
      <Chart
        type="bar"
        data={sampleData}
        dataKeys={['value']}
        title="Bar Chart"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with area chart', async () => {
    const { container } = render(
      <Chart
        type="area"
        data={sampleData}
        dataKeys={['value']}
        title="Area Chart"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with pie chart', async () => {
    const { container } = render(
      <Chart
        type="pie"
        data={sampleData}
        dataKeys={['value']}
        title="Pie Chart"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has proper ARIA label', () => {
    const { container } = render(
      <Chart
        type="line"
        data={sampleData}
        dataKeys={['value']}
        ariaLabel="Sales data visualization"
      />
    );
    
    const chart = container.querySelector('[role="img"]');
    expect(chart).toHaveAttribute('aria-label', 'Sales data visualization');
  });

  it('uses title as aria-label when no ariaLabel provided', () => {
    const { container } = render(
      <Chart
        type="line"
        data={sampleData}
        dataKeys={['value']}
        title="Sales Chart"
      />
    );
    
    const chart = container.querySelector('[role="img"]');
    expect(chart).toHaveAttribute('aria-label', 'Sales Chart');
  });

  it('has proper role attribute', () => {
    const { container } = render(
      <Chart
        type="line"
        data={sampleData}
        dataKeys={['value']}
      />
    );
    
    const chart = container.querySelector('[role="img"]');
    expect(chart).toBeInTheDocument();
  });
});

