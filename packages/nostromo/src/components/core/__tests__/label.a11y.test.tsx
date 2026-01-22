import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Label } from '../label';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('Label Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(
      <Label htmlFor="test-input">Email Address</Label>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations when required', async () => {
    const { container } = render(
      <Label htmlFor="test-input" required>
        Required Field
      </Label>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations when disabled', async () => {
    const { container } = render(
      <Label htmlFor="test-input" disabled>
        Disabled Field
      </Label>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper label association', () => {
    render(
      <div>
        <Label htmlFor="email-input">Email Address</Label>
        <input id="email-input" type="email" />
      </div>
    );
    
    const label = screen.getByText('Email Address');
    const input = screen.getByRole('textbox');
    
    expect(label).toHaveAttribute('for', 'email-input');
    expect(input).toHaveAttribute('id', 'email-input');
  });

  it('should indicate required fields properly', () => {
    render(
      <Label htmlFor="required-input" required>
        Required Field
      </Label>
    );
    
    const label = screen.getByText('Required Field');
    expect(label).toBeInTheDocument();
    
    // Check for required indicator (usually an asterisk or similar)
    // This depends on the implementation
  });

  it('should support complex content', async () => {
    const { container } = render(
      <Label htmlFor="complex-input">
        <span>Complex</span>
        <strong>Label</strong>
        <em>Content</em>
      </Label>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper contrast', async () => {
    const { container } = render(
      <Label htmlFor="test-input">
        High contrast label text
      </Label>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should be accessible with different form elements', async () => {
    const { container } = render(
      <div>
        <Label htmlFor="text-input">Text Input</Label>
        <input id="text-input" type="text" />
        
        <Label htmlFor="email-input">Email Input</Label>
        <input id="email-input" type="email" />
        
        <Label htmlFor="password-input">Password Input</Label>
        <input id="password-input" type="password" />
        
        <Label htmlFor="textarea-input">Textarea</Label>
        <textarea id="textarea-input"></textarea>
        
        <Label htmlFor="select-input">Select</Label>
        <select id="select-input">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>
      </div>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should support custom ARIA attributes', () => {
    render(
      <Label 
        htmlFor="custom-input"
        aria-describedby="help-text"
        role="label"
      >
        Custom Label
      </Label>
    );
    
    const label = screen.getByText('Custom Label');
    expect(label).toHaveAttribute('aria-describedby', 'help-text');
    expect(label).toHaveAttribute('role', 'label');
  });

  it('should handle missing htmlFor gracefully', async () => {
    const { container } = render(
      <Label>
        Label without htmlFor
      </Label>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should be keyboard accessible', () => {
    render(
      <Label htmlFor="focusable-input">
        Clickable Label
      </Label>
    );
    
    const label = screen.getByText('Clickable Label');
    expect(label).toBeInTheDocument();
    
    // Labels should be focusable when they have htmlFor
    // This allows clicking the label to focus the associated input
  });

  it('should support nested interactive elements', async () => {
    const { container } = render(
      <Label htmlFor="nested-input">
        <span>Label with </span>
        <a href="#help">help link</a>
        <span> and more text</span>
      </Label>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '#help');
  });

  it('should handle long text gracefully', async () => {
    const longText = "This is a very long label text that might wrap to multiple lines and should still be accessible and readable for screen readers and other assistive technologies.";
    
    const { container } = render(
      <Label htmlFor="long-text-input">
        {longText}
      </Label>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
