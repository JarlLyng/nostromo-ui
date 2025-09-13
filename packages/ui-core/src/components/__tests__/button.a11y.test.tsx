import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Button } from '../button';

// Import axe-core dynamically
const axe = require('axe-core');

// Helper function to run axe
const runAxe = (container: HTMLElement) => {
  return new Promise((resolve) => {
    axe.run(container, (err: any, results: any) => {
      if (err) throw err;
      resolve(results);
    });
  });
};

describe('Button Accessibility', () => {
  it('has no accessibility violations for primary button', async () => {
    const { container } = render(<Button variant="primary">Primary Button</Button>);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for secondary button', async () => {
    const { container } = render(<Button variant="secondary">Secondary Button</Button>);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for ghost button', async () => {
    const { container } = render(<Button variant="ghost">Ghost Button</Button>);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for destructive button', async () => {
    const { container } = render(<Button variant="destructive">Delete</Button>);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for outline button', async () => {
    const { container } = render(<Button variant="outline">Outline Button</Button>);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for link button', async () => {
    const { container } = render(<Button variant="link">Link Button</Button>);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for small button', async () => {
    const { container } = render(<Button size="sm">Small Button</Button>);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for large button', async () => {
    const { container } = render(<Button size="lg">Large Button</Button>);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for icon button', async () => {
    const { container } = render(<Button size="icon">⚙️</Button>);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for loading button', async () => {
    const { container } = render(<Button loading>Loading...</Button>);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for disabled button', async () => {
    const { container } = render(<Button disabled>Disabled Button</Button>);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for button with custom className', async () => {
    const { container } = render(<Button className="custom-class">Custom Button</Button>);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for button with aria-label', async () => {
    const { container } = render(
      <Button aria-label="Close dialog">×</Button>
    );
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for button with aria-describedby', async () => {
    const { container } = render(
      <div>
        <Button aria-describedby="button-help">Submit</Button>
        <div id="button-help">This will submit the form</div>
      </div>
    );
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for button with title', async () => {
    const { container } = render(
      <Button title="Click to submit the form">Submit</Button>
    );
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });
});
