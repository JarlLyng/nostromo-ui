import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { HelperText } from '../helper-text';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('HelperText Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(
      <HelperText>This is helper text</HelperText>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with different variants', async () => {
    const { container } = render(
      <div>
        <HelperText variant="default">Default helper text</HelperText>
        <HelperText variant="error">Error helper text</HelperText>
        <HelperText variant="success">Success helper text</HelperText>
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes when associated with form field', () => {
    render(
      <div>
        <label htmlFor="test-input">Email</label>
        <input id="test-input" aria-describedby="helper-text" />
        <HelperText id="helper-text">
          We&apos;ll never share your email
        </HelperText>
      </div>
    );
    
    const input = screen.getByLabelText('Email');
    const helperText = screen.getByText("We'll never share your email");
    
    expect(input).toHaveAttribute('aria-describedby', 'helper-text');
    expect(helperText).toHaveAttribute('id', 'helper-text');
  });

  it('should have proper contrast for different variants', async () => {
    const variants = ['default', 'error', 'success'] as const;
    
    for (const variant of variants) {
      const { container } = render(
        <HelperText variant={variant}>
          Helper text with {variant} variant
        </HelperText>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should support complex content', async () => {
    const { container } = render(
      <HelperText>
        <span>Complex</span>
        <strong>helper</strong>
        <em>text</em>
        <a href="#more-info">with links</a>
      </HelperText>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '#more-info');
  });

  it('should be accessible with form validation', async () => {
    const { container } = render(
      <div>
        <label htmlFor="email-input">Email</label>
        <input 
          id="email-input" 
          type="email"
          aria-invalid="true"
          aria-describedby="email-error"
        />
        <HelperText id="email-error" variant="error">
          Please enter a valid email address
        </HelperText>
      </div>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    const input = screen.getByLabelText('Email');
    const errorText = screen.getByText('Please enter a valid email address');
    
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'email-error');
    expect(errorText).toHaveAttribute('id', 'email-error');
  });

  it('should handle empty content gracefully', async () => {
    const { container } = render(
      <HelperText>
        {/* Empty content */}
      </HelperText>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should support multiple helper texts for one field', async () => {
    const { container } = render(
      <div>
        <label htmlFor="password-input">Password</label>
        <input 
          id="password-input" 
          type="password"
          aria-describedby="password-help password-requirements"
        />
        <HelperText id="password-help">
          Choose a strong password
        </HelperText>
        <HelperText id="password-requirements">
          Must be at least 8 characters long
        </HelperText>
      </div>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('aria-describedby', 'password-help password-requirements');
  });

  it('should be accessible with screen readers', () => {
    render(
      <HelperText>
        This helper text should be announced by screen readers
      </HelperText>
    );
    
    const helperText = screen.getByText('This helper text should be announced by screen readers');
    expect(helperText).toBeInTheDocument();
  });

  it('should handle long text gracefully', async () => {
    const longText = "This is a very long helper text that might wrap to multiple lines and should still be accessible and readable for screen readers and other assistive technologies. It should maintain proper contrast and be easy to read.";
    
    const { container } = render(
      <HelperText>
        {longText}
      </HelperText>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should support custom ARIA attributes', () => {
    render(
      <HelperText 
        id="custom-helper"
        role="note"
        aria-live="polite"
      >
        Custom helper text
      </HelperText>
    );
    
    const helperText = screen.getByText('Custom helper text');
    expect(helperText).toHaveAttribute('id', 'custom-helper');
    expect(helperText).toHaveAttribute('role', 'note');
    expect(helperText).toHaveAttribute('aria-live', 'polite');
  });

  it('should be accessible in different contexts', async () => {
    const { container } = render(
      <div>
        <fieldset>
          <legend>Form Section</legend>
          <HelperText>Section helper text</HelperText>
        </fieldset>
        
        <div role="group" aria-labelledby="group-label">
          <div id="group-label">Group Label</div>
          <HelperText>Group helper text</HelperText>
        </div>
      </div>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
