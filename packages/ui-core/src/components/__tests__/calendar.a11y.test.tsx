import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Calendar } from '../calendar';

expect.extend(toHaveNoViolations);

describe('Calendar Accessibility', () => {
  it('has no accessibility violations with basic calendar', async () => {
    const { container } = render(<Calendar />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with label', async () => {
    const { container } = render(<Calendar label="Select Date" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations with error state', async () => {
    const { container } = render(
      <Calendar error={true} helperText="Date is required" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations in single mode', async () => {
    const { container } = render(<Calendar mode="single" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations in range mode', async () => {
    const { container } = render(<Calendar mode="range" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has no accessibility violations in multiple mode', async () => {
    const { container } = render(<Calendar mode="multiple" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has proper ARIA labels for navigation buttons', async () => {
    const { container } = render(<Calendar />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    // Verify navigation buttons have aria-labels
    const input = container.querySelector('input');
    if (input) {
      input.click();
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const prevButton = container.querySelector('button[aria-label*="Previous"]');
      const nextButton = container.querySelector('button[aria-label*="Next"]');
      
      expect(prevButton || nextButton).toBeTruthy();
    }
  });

  it('has proper ARIA labels for date buttons', async () => {
    const { container } = render(<Calendar />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    // Verify date buttons have aria-labels
    const input = container.querySelector('input');
    if (input) {
      input.click();
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const dateButtons = container.querySelectorAll('button[aria-label]');
      expect(dateButtons.length).toBeGreaterThan(0);
    }
  });
});

