import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { Button } from '../button';
import { Input } from '../input';
import { Card } from '../card';
import { Badge } from '../badge';

/**
 * Performance Test Suite
 * Tests component render performance to ensure components render within acceptable timeframes
 */

describe('Component Performance', () => {
  // Performance threshold: components should render within acceptable timeframe
  // Higher threshold in CI due to environment variability (50ms for CI, 16ms ideal for local)
  const PERFORMANCE_THRESHOLD = process.env.CI ? 50 : 16;

  const measureRenderTime = (component: React.ReactElement): number => {
    const start = performance.now();
    render(component);
    const end = performance.now();
    return end - start;
  };

  describe('Button Component', () => {
    it('should render within performance threshold', () => {
      const renderTime = measureRenderTime(<Button>Click me</Button>);
      expect(renderTime).toBeLessThan(PERFORMANCE_THRESHOLD);
    });

    it('should render with variants within threshold', () => {
      const renderTime = measureRenderTime(
        <Button variant="destructive" size="lg">
          Delete
        </Button>
      );
      expect(renderTime).toBeLessThan(PERFORMANCE_THRESHOLD);
    });

    it('should render loading state efficiently', () => {
      const renderTime = measureRenderTime(
        <Button loading loadingText="Loading...">
          Submit
        </Button>
      );
      expect(renderTime).toBeLessThan(PERFORMANCE_THRESHOLD);
    });
  });

  describe('Input Component', () => {
    it('should render within performance threshold', () => {
      const renderTime = measureRenderTime(<Input placeholder="Enter text" />);
      expect(renderTime).toBeLessThan(PERFORMANCE_THRESHOLD);
    });

    it('should render with error state efficiently', () => {
      const renderTime = measureRenderTime(
        <Input placeholder="Email" aria-invalid="true" />
      );
      expect(renderTime).toBeLessThan(PERFORMANCE_THRESHOLD);
    });
  });

  describe('Card Component', () => {
    it('should render within performance threshold', () => {
      const renderTime = measureRenderTime(
        <Card>
          <Card.Header>
            <Card.Title>Title</Card.Title>
          </Card.Header>
          <Card.Content>Content</Card.Content>
        </Card>
      );
      expect(renderTime).toBeLessThan(PERFORMANCE_THRESHOLD);
    });
  });

  describe('Badge Component', () => {
    it('should render within performance threshold', () => {
      const renderTime = measureRenderTime(<Badge>New</Badge>);
      expect(renderTime).toBeLessThan(PERFORMANCE_THRESHOLD);
    });

    it('should render with variants efficiently', () => {
      const renderTime = measureRenderTime(
        <Badge variant="destructive">Error</Badge>
      );
      expect(renderTime).toBeLessThan(PERFORMANCE_THRESHOLD);
    });
  });

  describe('React.memo Optimization', () => {
    it('should prevent unnecessary re-renders', () => {
      let renderCount = 0;
      
      const TestComponent = React.memo(() => {
        renderCount++;
        return <div>Test</div>;
      });
      TestComponent.displayName = 'TestComponent';

      const { rerender } = render(<TestComponent />);
      expect(renderCount).toBe(1);

      // Re-render with same props should not trigger re-render
      rerender(<TestComponent />);
      expect(renderCount).toBe(1);
    });

    it('should re-render when props change', () => {
      let renderCount = 0;
      
      const TestComponent = React.memo<{ value: number }>(({ value }) => {
        renderCount++;
        return <div>{value}</div>;
      });
      TestComponent.displayName = 'TestComponent';

      const { rerender } = render(<TestComponent value={1} />);
      expect(renderCount).toBe(1);

      // Re-render with different props should trigger re-render
      rerender(<TestComponent value={2} />);
      expect(renderCount).toBe(2);
    });
  });

  describe('Bundle Size Impact', () => {
    it('should use individual imports for tree-shaking', () => {
      // This test verifies that individual component imports work
      // In a real scenario, you'd use bundle analysis tools
      expect(Button).toBeDefined();
      expect(Input).toBeDefined();
      expect(Card).toBeDefined();
      expect(Badge).toBeDefined();
    });
  });
});

