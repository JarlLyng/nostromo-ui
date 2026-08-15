import { render } from "@testing-library/react";
import * as React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import {
  ChartArea,
  ChartBar,
  ChartContainer,
  ChartGrid,
  ChartLegend,
  ChartLine,
  ChartReferenceLine,
  ChartTooltip,
  ChartXAxis,
  ChartYAxis,
  buildColorMap,
  chartPalette,
  resolveSeriesColor,
} from "../chart-composable";

const data = [
  { month: "Jan", desktop: 120, mobile: 80, target: 150 },
  { month: "Feb", desktop: 140, mobile: 95, target: 150 },
  { month: "Mar", desktop: 110, mobile: 120, target: 150 },
];

/**
 * ResponsiveContainer sizes itself from a ResizeObserver, and the global mock in
 * src/test/setup.ts is a no-op that never fires - so in jsdom the chart lays out
 * at 0x0 and draws nothing.
 *
 * This matters more than it looks: every assertion below queries for rendered
 * SVG, so without a size they would all find zero elements and the only tests
 * that could pass are the ones asserting absence. The existing charts.test.tsx
 * asserts `toBeInTheDocument()` and nothing else, which is exactly the shape of
 * test that survives a chart rendering nothing at all.
 */
class SizedResizeObserver implements ResizeObserver {
  constructor(private callback: ResizeObserverCallback) {}
  observe(target: Element) {
    const rect = {
      width: 600,
      height: 400,
      top: 0,
      left: 0,
      bottom: 400,
      right: 600,
      x: 0,
      y: 0,
    };
    this.callback(
      [{ target, contentRect: rect } as unknown as ResizeObserverEntry],
      this,
    );
  }
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  vi.stubGlobal("ResizeObserver", SizedResizeObserver);
  for (const prop of ["offsetWidth", "clientWidth"]) {
    Object.defineProperty(HTMLElement.prototype, prop, {
      configurable: true,
      value: 600,
    });
  }
  for (const prop of ["offsetHeight", "clientHeight"]) {
    Object.defineProperty(HTMLElement.prototype, prop, {
      configurable: true,
      value: 400,
    });
  }
});

afterAll(() => {
  vi.unstubAllGlobals();
});

function renderChart(ui: React.ReactElement) {
  return render(<div style={{ width: 600, height: 400 }}>{ui}</div>);
}

describe("composable chart", () => {
  it("renders a bar series", () => {
    const { container } = renderChart(
      <ChartContainer data={data} width={600}>
        <ChartXAxis dataKey="month" />
        <ChartBar dataKey="desktop" />
      </ChartContainer>,
    );
    expect(container.querySelectorAll(".recharts-bar").length).toBe(1);
  });

  // The whole reason this exists. `<Chart type="bar" />` renders one series type
  // from a dataKeys array; it cannot put a line on top of a stack, and no new
  // `type` string would let it.
  it("composes a stacked bar and a line in one chart", () => {
    const { container } = renderChart(
      <ChartContainer data={data} width={600}>
        <ChartGrid />
        <ChartXAxis dataKey="month" />
        <ChartYAxis />
        <ChartTooltip />
        <ChartLegend />
        <ChartBar dataKey="desktop" stackId="devices" />
        <ChartBar dataKey="mobile" stackId="devices" />
        <ChartLine dataKey="target" />
      </ChartContainer>,
    );
    expect(container.querySelectorAll(".recharts-bar").length).toBe(2);
    expect(container.querySelectorAll(".recharts-line").length).toBe(1);
  });

  it("renders an area series", () => {
    const { container } = renderChart(
      <ChartContainer data={data} width={600}>
        <ChartXAxis dataKey="month" />
        <ChartYAxis />
        <ChartArea dataKey="desktop" />
        <ChartReferenceLine y={150} />
      </ChartContainer>,
    );
    expect(container.querySelectorAll(".recharts-area").length).toBe(1);
  });

  // Colour assignment is asserted on the map rather than on rendered SVG.
  // recharts draws no geometry under jsdom - the series groups exist but carry
  // no fill - so a DOM assertion here would pass on an empty chart, which is the
  // shape of test this suite exists to avoid.
  describe("series colours", () => {
    it("assigns palette slots in tree order", () => {
      const map = buildColorMap(
        <>
          <ChartBar dataKey="desktop" />
          <ChartBar dataKey="mobile" />
          <ChartLine dataKey="target" />
        </>,
        chartPalette,
      );
      expect(map.get("desktop")).toBe(chartPalette[0]);
      expect(map.get("mobile")).toBe(chartPalette[1]);
      expect(map.get("target")).toBe(chartPalette[2]);
      expect(new Set(map.values()).size).toBe(3);
    });

    it("ignores non-series children when numbering", () => {
      const map = buildColorMap(
        <>
          <ChartGrid />
          <ChartXAxis dataKey="month" />
          <ChartTooltip />
          <ChartBar dataKey="desktop" />
        </>,
        chartPalette,
      );
      expect(map.get("desktop")).toBe(chartPalette[0]);
    });

    it("keeps a series' slot when another is appended after it", () => {
      const before = buildColorMap(
        <ChartBar dataKey="desktop" />,
        chartPalette,
      );
      const after = buildColorMap(
        <>
          <ChartBar dataKey="desktop" />
          <ChartBar dataKey="mobile" />
        </>,
        chartPalette,
      );
      expect(after.get("desktop")).toBe(before.get("desktop"));
    });

    it("lets an explicit colour win over the container's slot", () => {
      expect(resolveSeriesColor("rgb(1, 2, 3)", chartPalette[4])).toBe(
        "rgb(1, 2, 3)",
      );
    });

    it("falls back to the first palette entry outside a container", () => {
      expect(resolveSeriesColor(undefined, undefined)).toBe(chartPalette[0]);
    });

    it("wraps around a palette shorter than the series count", () => {
      const map = buildColorMap(
        <>
          <ChartBar dataKey="a" />
          <ChartBar dataKey="b" />
          <ChartBar dataKey="c" />
        </>,
        ["red", "blue"],
      );
      expect([map.get("a"), map.get("b"), map.get("c")]).toEqual([
        "red",
        "blue",
        "red",
      ]);
    });
  });

  it("exposes an accessible name on the container", () => {
    const { getByRole } = renderChart(
      <ChartContainer data={data} width={600} ariaLabel="Visitors by month">
        <ChartXAxis dataKey="month" />
        <ChartBar dataKey="desktop" />
      </ChartContainer>,
    );
    expect(getByRole("img", { name: "Visitors by month" })).toBeInTheDocument();
  });
});
