import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Input } from '../input';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('Input Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(
      <Input
        label="Email"
        placeholder="Enter your email"
        helperText="We'll never share your email"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with error state', async () => {
    const { container } = render(
      <Input
        label="Email"
        placeholder="Enter your email"
        error={true}
        helperText="Email is required"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations when disabled', async () => {
    const { container } = render(
      <Input
        label="Email"
        placeholder="Enter your email"
        disabled={true}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with different variants', async () => {
    const { container } = render(
      <div>
        <Input variant="default" label="Default" />
        <Input variant="error" label="Error" />
        <Input variant="success" label="Success" />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with different sizes', async () => {
    const { container } = render(
      <div>
        <Input inputSize="sm" label="Small" />
        <Input inputSize="default" label="Default" />
        <Input inputSize="lg" label="Large" />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper label association', () => {
    render(
      <Input
        label="Email"
        placeholder="Enter your email"
        helperText="We'll never share your email"
      />
    );
    
    const input = screen.getByRole('textbox');
    const label = screen.getByText('Email');
    
    expect(input).toHaveAttribute('id');
    expect(label).toHaveAttribute('for', input.getAttribute('id'));
  });

  it('should have proper ARIA attributes for error state', () => {
    render(
      <Input
        label="Email"
        error={true}
        helperText="Email is required"
      />
    );
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });

  it('should have proper ARIA attributes for helper text', () => {
    render(
      <Input
        label="Email"
        helperText="We'll never share your email"
      />
    );
    
    const input = screen.getByRole('textbox');
    const helperText = screen.getByText("We'll never share your email");
    
    expect(input).toHaveAttribute('aria-describedby');
    expect(helperText).toHaveAttribute('id');
  });

  it('should be focusable and keyboard accessible', () => {
    render(
      <Input
        label="Email"
        placeholder="Enter your email"
      />
    );
    
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).not.toHaveAttribute('tabindex', '-1');
  });

  it('should have proper contrast for different variants', async () => {
    const variants = ['default', 'error', 'success'] as const;
    
    for (const variant of variants) {
      const { container } = render(
        <Input
          label="Test Input"
          variant={variant}
          placeholder="Test placeholder"
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });
});
