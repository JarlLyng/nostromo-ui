import { render } from '@testing-library/react';
import { Input } from '../input';

// Custom axe helper
const runAxe = async (container: HTMLElement) => {
  const axe = require('axe-core');
  return new Promise((resolve) => {
    axe.run(container, (err: any, results: any) => {
      if (err) throw err;
      resolve(results);
    });
  });
};

describe('Input Accessibility', () => {
  it('has no accessibility violations for default input', async () => {
    const { container } = render(<Input placeholder="Enter text" />);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for input with label', async () => {
    const { container } = render(<Input label="Email Address" />);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for input with error', async () => {
    const { container } = render(<Input label="Email" error="This field is required" />);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for input with success message', async () => {
    const { container } = render(<Input label="Email" success="Email is valid" />);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for input with helper text', async () => {
    const { container } = render(<Input label="Email" helperText="Enter your email address" />);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for disabled input', async () => {
    const { container } = render(<Input label="Email" disabled />);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for required input', async () => {
    const { container } = render(<Input label="Email" required />);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for input with all props', async () => {
    const { container } = render(
      <Input
        label="Email Address"
        placeholder="Enter your email"
        helperText="We'll never share your email"
        required
        type="email"
      />
    );
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for small input', async () => {
    const { container } = render(<Input label="Email" size="sm" />);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for large input', async () => {
    const { container } = render(<Input label="Email" size="lg" />);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for error variant input', async () => {
    const { container } = render(<Input label="Email" variant="error" />);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for success variant input', async () => {
    const { container } = render(<Input label="Email" variant="success" />);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for password input', async () => {
    const { container } = render(<Input label="Password" type="password" />);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for number input', async () => {
    const { container } = render(<Input label="Age" type="number" />);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for email input', async () => {
    const { container } = render(<Input label="Email" type="email" />);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for input with custom className', async () => {
    const { container } = render(<Input label="Email" className="custom-class" />);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });
});
