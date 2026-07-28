import { describe, it, expect } from "vitest";
import { cleanup, render } from "@testing-library/react";
import React from "react";
import { Button } from "../button";
import { Input } from "../input";
import { Card } from "../card";
import { Badge } from "../badge";

/**
 * Performance Test Suite
 *
 * Guards against pathological render cost - a component that suddenly takes an
 * order of magnitude longer than its peers. It is not a benchmark; wall-clock
 * numbers from a shared CI runner are far too noisy to track small changes
 * (see issue #85 for real benchmarking).
 */

describe("Component Performance", () => {
  // Deliberately generous. The point is catching a 10x regression, not policing
  // single-digit milliseconds.
  const PERFORMANCE_THRESHOLD = process.env.CI ? 50 : 30;

  const SAMPLE_COUNT = 5;

  /**
   * Median of several samples, after a discarded warm-up render.
   *
   * A single sample is not a usable signal. The first render in the file also
   * pays for React and JSDOM warm-up, so whichever test ran first was measuring
   * something different from the rest - that is what made this suite flaky
   * enough to fail on an unrelated docs change. The warm-up removes that bias
   * and the median absorbs the odd GC pause or descheduled runner.
   */
  const measureRenderTime = (component: React.ReactElement): number => {
    cleanup();
    render(component);
    cleanup();

    const samples: number[] = [];
    for (let i = 0; i < SAMPLE_COUNT; i += 1) {
      const start = performance.now();
      render(component);
      samples.push(performance.now() - start);
      cleanup();
    }

    samples.sort((a, b) => a - b);
    return samples[Math.floor(SAMPLE_COUNT / 2)]!;
  };

  describe("Button Component", () => {
    it("should render within performance threshold", () => {
      const renderTime = measureRenderTime(<Button>Click me</Button>);
      expect(renderTime).toBeLessThan(PERFORMANCE_THRESHOLD);
    });

    it("should render with variants within threshold", () => {
      const renderTime = measureRenderTime(
        <Button variant="destructive" size="lg">
          Delete
        </Button>,
      );
      expect(renderTime).toBeLessThan(PERFORMANCE_THRESHOLD);
    });

    it("should render loading state efficiently", () => {
      const renderTime = measureRenderTime(
        <Button loading loadingText="Loading...">
          Submit
        </Button>,
      );
      expect(renderTime).toBeLessThan(PERFORMANCE_THRESHOLD);
    });
  });

  describe("Input Component", () => {
    it("should render within performance threshold", () => {
      const renderTime = measureRenderTime(<Input placeholder="Enter text" />);
      expect(renderTime).toBeLessThan(PERFORMANCE_THRESHOLD);
    });

    it("should render with error state efficiently", () => {
      const renderTime = measureRenderTime(
        <Input placeholder="Email" aria-invalid="true" />,
      );
      expect(renderTime).toBeLessThan(PERFORMANCE_THRESHOLD);
    });
  });

  describe("Card Component", () => {
    it("should render within performance threshold", () => {
      const renderTime = measureRenderTime(
        <Card>
          <Card.Header>
            <Card.Title>Title</Card.Title>
          </Card.Header>
          <Card.Content>Content</Card.Content>
        </Card>,
      );
      expect(renderTime).toBeLessThan(PERFORMANCE_THRESHOLD);
    });
  });

  describe("Badge Component", () => {
    it("should render within performance threshold", () => {
      const renderTime = measureRenderTime(<Badge>New</Badge>);
      expect(renderTime).toBeLessThan(PERFORMANCE_THRESHOLD);
    });

    it("should render with variants efficiently", () => {
      const renderTime = measureRenderTime(
        <Badge variant="destructive">Error</Badge>,
      );
      expect(renderTime).toBeLessThan(PERFORMANCE_THRESHOLD);
    });
  });

  describe("React.memo Optimization", () => {
    it("should prevent unnecessary re-renders", () => {
      let renderCount = 0;

      const TestComponent = React.memo(() => {
        renderCount++;
        return <div>Test</div>;
      });
      TestComponent.displayName = "TestComponent";

      const { rerender } = render(<TestComponent />);
      expect(renderCount).toBe(1);

      // Re-render with same props should not trigger re-render
      rerender(<TestComponent />);
      expect(renderCount).toBe(1);
    });

    it("should re-render when props change", () => {
      let renderCount = 0;

      const TestComponent = React.memo<{ value: number }>(({ value }) => {
        renderCount++;
        return <div>{value}</div>;
      });
      TestComponent.displayName = "TestComponent";

      const { rerender } = render(<TestComponent value={1} />);
      expect(renderCount).toBe(1);

      // Re-render with different props should trigger re-render
      rerender(<TestComponent value={2} />);
      expect(renderCount).toBe(2);
    });
  });

  describe("Bundle Size Impact", () => {
    it("should use individual imports for tree-shaking", () => {
      // This test verifies that individual component imports work
      // In a real scenario, you'd use bundle analysis tools
      expect(Button).toBeDefined();
      expect(Input).toBeDefined();
      expect(Card).toBeDefined();
      expect(Badge).toBeDefined();
    });
  });
});
