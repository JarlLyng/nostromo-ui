import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('Card Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content goes here</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with different variants', async () => {
    const { container } = render(
      <div>
        <Card variant="default">
          <CardContent>Default card</CardContent>
        </Card>
        <Card variant="outlined">
          <CardContent>Outlined card</CardContent>
        </Card>
        <Card variant="elevated">
          <CardContent>Elevated card</CardContent>
        </Card>
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper semantic structure', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content goes here</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    );
    
    // Check for proper heading structure
    const title = screen.getByRole('heading');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Card Title');
    
    // Check for content
    const content = screen.getByText('Card content goes here');
    expect(content).toBeInTheDocument();
  });

  it('should have proper heading hierarchy', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Main Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>
          <h3>Subheading</h3>
          <p>Content</p>
        </CardContent>
      </Card>
    );
    
    const headings = screen.getAllByRole('heading');
    const mainTitle = headings[0];
    const subheading = headings[1];
    
    expect(mainTitle).toHaveTextContent('Main Title');
    expect(subheading).toHaveTextContent('Subheading');
  });

  it('should be keyboard accessible', () => {
    render(
      <Card>
        <CardContent>
          <button>Clickable button</button>
          <a href="#test">Link</a>
        </CardContent>
      </Card>
    );
    
    const button = screen.getByRole('button');
    const link = screen.getByRole('link');
    
    expect(button).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#test');
  });

  it('should have proper contrast for different variants', async () => {
    const variants = ['default', 'outlined', 'elevated'] as const;
    
    for (const variant of variants) {
      const { container } = render(
        <Card variant={variant}>
          <CardContent>
            <p>Test content with sufficient contrast</p>
          </CardContent>
        </Card>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should support interactive content', async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
        </CardHeader>
        <CardContent>
          <button>Button 1</button>
          <button>Button 2</button>
          <input type="text" placeholder="Input field" />
        </CardContent>
        <CardFooter>
          <button>Footer Button</button>
        </CardFooter>
      </Card>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    // Check that interactive elements are accessible
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('should handle empty states gracefully', async () => {
    const { container } = render(
      <Card>
        <CardContent>
          {/* Empty content */}
        </CardContent>
      </Card>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should support custom content without accessibility issues', async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Custom Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div role="region" aria-label="Custom region">
            <p>Custom content with proper ARIA labels</p>
            <button aria-describedby="help-text">Action</button>
            <div id="help-text">This button does something</div>
          </div>
        </CardContent>
      </Card>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
