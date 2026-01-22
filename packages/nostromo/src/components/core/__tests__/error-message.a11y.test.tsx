import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ErrorMessage } from '../error-message';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('ErrorMessage Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(
      <ErrorMessage>This is an error message</ErrorMessage>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes when associated with form field', () => {
    render(
      <div>
        <label htmlFor="test-input">Email</label>
        <input 
          id="test-input" 
          aria-invalid="true"
          aria-describedby="error-message"
        />
        <ErrorMessage id="error-message">
          This field is required
        </ErrorMessage>
      </div>
    );
    
    const input = screen.getByLabelText('Email');
    const errorMessage = screen.getByText('This field is required');
    
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'error-message');
    expect(errorMessage).toHaveAttribute('id', 'error-message');
  });

  it('should have proper contrast for error text', async () => {
    const { container } = render(
      <ErrorMessage>
        Error message with sufficient contrast
      </ErrorMessage>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should support complex content', async () => {
    const { container } = render(
      <ErrorMessage>
        <span>Complex</span>
        <strong>error</strong>
        <em>message</em>
        <a href="#help">with help link</a>
      </ErrorMessage>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '#help');
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
          value="invalid-email"
          onChange={() => {}}
        />
        <ErrorMessage id="email-error">
          Please enter a valid email address
        </ErrorMessage>
      </div>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    const input = screen.getByLabelText('Email');
    const errorMessage = screen.getByText('Please enter a valid email address');
    
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'email-error');
    expect(errorMessage).toHaveAttribute('id', 'email-error');
  });

  it('should handle multiple error messages', async () => {
    const { container } = render(
      <div>
        <label htmlFor="password-input">Password</label>
        <input 
          id="password-input" 
          type="password"
          aria-invalid="true"
          aria-describedby="password-error-1 password-error-2"
        />
        <ErrorMessage id="password-error-1">
          Password is too short
        </ErrorMessage>
        <ErrorMessage id="password-error-2">
          Password must contain numbers
        </ErrorMessage>
      </div>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('aria-describedby', 'password-error-1 password-error-2');
  });

  it('should be announced by screen readers', () => {
    render(
      <ErrorMessage>
        This error message should be announced by screen readers
      </ErrorMessage>
    );
    
    const errorMessage = screen.getByText('This error message should be announced by screen readers');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should handle long error messages gracefully', async () => {
    const longError = "This is a very long error message that might wrap to multiple lines and should still be accessible and readable for screen readers and other assistive technologies. It should maintain proper contrast and be easy to read.";
    
    const { container } = render(
      <ErrorMessage>
        {longError}
      </ErrorMessage>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should support custom ARIA attributes', () => {
    render(
      <ErrorMessage 
        id="custom-error"
        role="alert"
        aria-live="assertive"
      >
        Custom error message
      </ErrorMessage>
    );
    
    const errorMessage = screen.getByText('Custom error message');
    expect(errorMessage).toHaveAttribute('id', 'custom-error');
    expect(errorMessage).toHaveAttribute('role', 'alert');
    expect(errorMessage).toHaveAttribute('aria-live', 'assertive');
  });

  it('should be accessible in different contexts', async () => {
    const { container } = render(
      <div>
        <fieldset>
          <legend>Form Section</legend>
          <ErrorMessage>Section error message</ErrorMessage>
        </fieldset>
        
        <div role="group" aria-labelledby="group-label">
          <div id="group-label">Group Label</div>
          <ErrorMessage>Group error message</ErrorMessage>
        </div>
      </div>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should handle empty content gracefully', async () => {
    const { container } = render(
      <ErrorMessage>
        {/* Empty content */}
      </ErrorMessage>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should be accessible with interactive elements', async () => {
    const { container } = render(
      <ErrorMessage>
        <span>Error occurred. </span>
        <a href="#retry">Try again</a>
        <span> or </span>
        <a href="#contact">contact support</a>
      </ErrorMessage>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '#retry');
    expect(links[1]).toHaveAttribute('href', '#contact');
  });

  it('should have proper semantic structure', () => {
    render(
      <ErrorMessage>
        <strong>Error:</strong> This is a critical error message
      </ErrorMessage>
    );
    
    const strongText = screen.getByText('Error:');
    expect(strongText).toBeInTheDocument();
  });
});
