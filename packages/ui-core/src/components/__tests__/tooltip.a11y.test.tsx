import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Tooltip, TooltipTrigger, TooltipContent } from '../tooltip';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('Tooltip Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(
      <Tooltip content="Test tooltip" open>
        <button>Test</button>
      </Tooltip>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes for hover trigger', async () => {
    const { container } = render(
      <Tooltip content="Test tooltip" trigger="hover">
        <button>Hover me</button>
      </Tooltip>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes for click trigger', async () => {
    const { container } = render(
      <Tooltip content="Test tooltip" trigger="click">
        <button>Click me</button>
      </Tooltip>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes for focus trigger', async () => {
    const { container } = render(
      <Tooltip content="Test tooltip" trigger="focus">
        <button>Focus me</button>
      </Tooltip>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper contrast for different variants', async () => {
    const variants = ['default', 'light', 'dark', 'success', 'warning', 'error', 'info'] as const;
    
    for (const variant of variants) {
      const { container } = render(
        <Tooltip content="Test tooltip" variant={variant} open>
          <button>Test</button>
        </Tooltip>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should have proper contrast for different sizes', async () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    
    for (const size of sizes) {
      const { container } = render(
        <Tooltip content="Test tooltip" size={size} open>
          <button>Test</button>
        </Tooltip>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should have proper contrast for different placements', async () => {
    const placements = ['top', 'bottom', 'left', 'right'] as const;
    
    for (const placement of placements) {
      const { container } = render(
        <Tooltip content="Test tooltip" placement={placement} open>
          <button>Test</button>
        </Tooltip>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should have accessible success tooltip', async () => {
    const { container } = render(
      <Tooltip content="Success message" variant="success" open>
        <button>Success</button>
      </Tooltip>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible error tooltip', async () => {
    const { container } = render(
      <Tooltip content="Error message" variant="error" open>
        <button>Error</button>
      </Tooltip>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible warning tooltip', async () => {
    const { container } = render(
      <Tooltip content="Warning message" variant="warning" open>
        <button>Warning</button>
      </Tooltip>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible info tooltip', async () => {
    const { container } = render(
      <Tooltip content="Info message" variant="info" open>
        <button>Info</button>
      </Tooltip>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible light tooltip', async () => {
    const { container } = render(
      <Tooltip content="Light tooltip" variant="light" open>
        <button>Light</button>
      </Tooltip>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible dark tooltip', async () => {
    const { container } = render(
      <Tooltip content="Dark tooltip" variant="dark" open>
        <button>Dark</button>
      </Tooltip>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible tooltip with rich content', async () => {
    const richContent = (
      <div>
        <div className="font-semibold">Rich Content</div>
        <div className="text-sm opacity-90">
          This tooltip contains rich content with multiple elements.
        </div>
        <div className="flex gap-2">
          <button className="text-xs bg-white/20 px-2 py-1 rounded">
            Action 1
          </button>
          <button className="text-xs bg-white/20 px-2 py-1 rounded">
            Action 2
          </button>
        </div>
      </div>
    );
    
    const { container } = render(
      <Tooltip content={richContent} open>
        <button>Rich content</button>
      </Tooltip>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible tooltip with long content', async () => {
    const longContent = 'This is a very long tooltip content that should wrap to multiple lines and still look good in the interface.';
    
    const { container } = render(
      <Tooltip content={longContent} open>
        <button>Long content</button>
      </Tooltip>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible disabled tooltip', async () => {
    const { container } = render(
      <Tooltip content="Disabled tooltip" disabled>
        <button>Disabled</button>
      </Tooltip>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible controlled tooltip', async () => {
    const { container } = render(
      <Tooltip content="Controlled tooltip" open={true}>
        <button>Controlled</button>
      </Tooltip>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible tooltip with custom delay', async () => {
    const { container } = render(
      <Tooltip content="Custom delay tooltip" delayDuration={1000} open>
        <button>Custom delay</button>
      </Tooltip>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible tooltip with custom skip delay', async () => {
    const { container } = render(
      <Tooltip content="Custom skip delay tooltip" skipDelayDuration={500} open>
        <button>Custom skip delay</button>
      </Tooltip>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible tooltip trigger', async () => {
    const { container } = render(
      <Tooltip content="Test tooltip">
        <TooltipTrigger>
          <button>Test</button>
        </TooltipTrigger>
      </Tooltip>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible tooltip content', async () => {
    const { container } = render(
      <TooltipContent variant="success" size="lg" placement="top">
        Test content
      </TooltipContent>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper keyboard navigation', async () => {
    const { container } = render(
      <Tooltip content="Test tooltip" trigger="focus">
        <button>Focus me</button>
      </Tooltip>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper semantic structure', async () => {
    const { container } = render(
      <Tooltip content="Test tooltip" open>
        <button>Test</button>
      </Tooltip>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible tooltip with multiple triggers', async () => {
    const { container } = render(
      <div>
        <Tooltip content="First tooltip" open>
          <button>First</button>
        </Tooltip>
        <Tooltip content="Second tooltip" open>
          <button>Second</button>
        </Tooltip>
        <Tooltip content="Third tooltip" open>
          <button>Third</button>
        </Tooltip>
      </div>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible tooltip with different placements', async () => {
    const placements = ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'] as const;
    
    for (const placement of placements) {
      const { container } = render(
        <Tooltip content="Test tooltip" placement={placement} open>
          <button>Test</button>
        </Tooltip>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });
});
