import * as React from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "../../lib/utils";

/**
 * A composable chart, alongside the single-shot `<Chart type="..." />`.
 *
 * `Chart` renders one series type from a `dataKeys` array. That shape cannot
 * express a stacked bar, a bar and a line together, a second axis, or a
 * reference line - no amount of new `type` strings fixes it, because the
 * limitation is that a chart is one prop rather than a tree.
 *
 * These pieces are thin wrappers over recharts with the theme applied, so a
 * chart is written the way the rest of the library is:
 *
 *     <ChartContainer data={data}>
 *       <ChartGrid />
 *       <ChartXAxis dataKey="month" />
 *       <ChartYAxis />
 *       <ChartTooltip />
 *       <ChartLegend />
 *       <ChartBar dataKey="desktop" stackId="devices" />
 *       <ChartBar dataKey="mobile" stackId="devices" />
 *       <ChartLine dataKey="target" />
 *     </ChartContainer>
 *
 * Wrapping recharts' own components works here, which is worth stating because
 * it did not use to: recharts 2 matched children by identity and silently
 * dropped anything it did not recognise, which is why most wrappers around it
 * re-export the primitives instead. recharts 3 resolves wrapped children -
 * verified by rendering a wrapped Bar and counting `.recharts-bar` nodes - so
 * these can carry defaults rather than making every caller repeat them.
 *
 * `Chart` is untouched and stays supported. This is additive.
 */

/**
 * Ordered for distinguishability, same as `Chart`'s: distinct hues first, brand
 * variants last, so a two-series chart is not two neighbouring purples.
 */
export const chartPalette = [
  "hsl(var(--nostromo-color-brand-500))",
  "hsl(var(--nostromo-color-info-500))",
  "hsl(var(--nostromo-color-success-500))",
  "hsl(var(--nostromo-color-warning-500))",
  "hsl(var(--nostromo-color-error-500))",
  "hsl(var(--nostromo-color-brand-300))",
  "hsl(var(--nostromo-color-info-700))",
  "hsl(var(--nostromo-color-success-700))",
] as const;

const AXIS_STROKE = "hsl(var(--nostromo-color-neutral-600))";
const TICK_FILL = "hsl(var(--nostromo-color-neutral-700))";
const GRID_STROKE = "hsl(var(--nostromo-color-neutral-300))";

interface ChartContextValue {
  /** dataKey -> colour, assigned in the order series appear in the tree. */
  colorFor: (dataKey: string) => string;
}

const ChartContext = React.createContext<ChartContextValue | null>(null);

/**
 * Colour is resolved by dataKey rather than by a render-order counter.
 *
 * A counter incremented during render gives a different answer on a re-render
 * and a different one again under StrictMode's double invoke, so a series can
 * change colour for no reason. Walking the tree once per render and mapping
 * dataKey to palette slot is stable: the same chart always assigns the same
 * colours, and a series keeps its colour when a sibling is added after it.
 *
 * Exported so the assignment can be tested directly. recharts draws no geometry
 * under jsdom - the series groups appear but carry no fill - so scraping the SVG
 * for colours asserts nothing, however convincing the selector looks.
 */
export function buildColorMap(
  children: React.ReactNode,
  palette: readonly string[],
): Map<string, string> {
  const keys: string[] = [];

  const walk = (nodes: React.ReactNode) => {
    React.Children.forEach(nodes, (child) => {
      if (!React.isValidElement(child)) return;
      const type = child.type;
      if (type === ChartBar || type === ChartLine || type === ChartArea) {
        const key = (child.props as { dataKey?: string }).dataKey;
        if (typeof key === "string" && !keys.includes(key)) keys.push(key);
      }
      const nested = (child.props as { children?: React.ReactNode }).children;
      if (nested) walk(nested);
    });
  };
  walk(children);

  return new Map(
    keys.map((k, i) => [k, palette[i % palette.length] as string]),
  );
}

/**
 * An explicit `color` wins; otherwise the container's slot; otherwise the first
 * palette entry, so a series rendered outside a ChartContainer still gets a
 * themed colour rather than recharts' off-theme default.
 *
 * Pulled out of the hook so it can be tested without a render - the same reason
 * buildColorMap is exported.
 */
export function resolveSeriesColor(
  explicit: string | undefined,
  fromContainer: string | undefined,
): string {
  return explicit ?? fromContainer ?? (chartPalette[0] as string);
}

function useSeriesColor(dataKey: string, explicit?: string): string {
  const ctx = React.useContext(ChartContext);
  return resolveSeriesColor(explicit, ctx?.colorFor(dataKey));
}

export interface ChartContainerProps {
  data: ReadonlyArray<Record<string, unknown>>;
  children: React.ReactNode;
  /** Pixel height of the plotting area. */
  height?: number;
  /**
   * Width of the plotting area. Responsive by default; give it a number for a
   * fixed-width chart, or to get real geometry in a jsdom test - recharts lays
   * out at zero there otherwise, and every query for rendered SVG comes back
   * empty while the series groups still exist.
   */
  width?: number | `${number}%`;
  /** Override the series palette. Series without an explicit colour draw from it in tree order. */
  colors?: readonly string[];
  className?: string;
  ariaLabel?: string;
}

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  ChartContainerProps
>(function ChartContainer(
  {
    data,
    children,
    height = 300,
    width = "100%",
    colors = chartPalette,
    className,
    ariaLabel,
  },
  ref,
) {
  const colorMap = React.useMemo(
    () => buildColorMap(children, colors),
    [children, colors],
  );
  const value = React.useMemo<ChartContextValue>(
    () => ({
      colorFor: (key) => colorMap.get(key) ?? (colors[0] as string),
    }),
    [colorMap, colors],
  );

  return (
    <ChartContext.Provider value={value}>
      <div
        ref={ref}
        className={cn("w-full", className)}
        style={{ height }}
        role="img"
        aria-label={ariaLabel}
      >
        <ResponsiveContainer width={width} height={height}>
          <ComposedChart
            data={data as Record<string, unknown>[]}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            {children}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});

export type ChartGridProps = React.ComponentProps<typeof CartesianGrid>;

export function ChartGrid(props: ChartGridProps) {
  return (
    <CartesianGrid strokeDasharray="3 3" stroke={GRID_STROKE} {...props} />
  );
}

export type ChartXAxisProps = React.ComponentProps<typeof XAxis>;

export function ChartXAxis(props: ChartXAxisProps) {
  return (
    <XAxis
      stroke={AXIS_STROKE}
      tick={{ fill: TICK_FILL, fontSize: 12 }}
      {...props}
    />
  );
}

export type ChartYAxisProps = React.ComponentProps<typeof YAxis>;

export function ChartYAxis(props: ChartYAxisProps) {
  return (
    <YAxis
      stroke={AXIS_STROKE}
      tick={{ fill: TICK_FILL, fontSize: 12 }}
      {...props}
    />
  );
}

export type ChartTooltipProps = React.ComponentProps<typeof Tooltip>;

export function ChartTooltip(props: ChartTooltipProps) {
  return (
    <Tooltip
      cursor={{ fill: GRID_STROKE, fillOpacity: 0.3 }}
      contentStyle={{
        background: "hsl(var(--nostromo-color-neutral-50))",
        border: "1px solid hsl(var(--nostromo-color-neutral-300))",
        borderRadius: 8,
        color: "hsl(var(--nostromo-color-neutral-900))",
        fontSize: 12,
      }}
      {...props}
    />
  );
}

export type ChartLegendProps = React.ComponentProps<typeof Legend>;

export function ChartLegend(props: ChartLegendProps) {
  return <Legend wrapperStyle={{ fontSize: 12 }} {...props} />;
}

export interface ChartBarProps extends Omit<
  React.ComponentProps<typeof Bar>,
  "fill"
> {
  dataKey: string;
  /** Overrides the palette slot this series would otherwise get. */
  color?: string;
}

export function ChartBar({ dataKey, color, ...props }: ChartBarProps) {
  const fill = useSeriesColor(dataKey, color);
  // Rounded top only, and only when unstacked: rounding every bar in a stack
  // puts a notch between the segments.
  const radius: [number, number, number, number] = props.stackId
    ? [0, 0, 0, 0]
    : [4, 4, 0, 0];
  return <Bar dataKey={dataKey} fill={fill} radius={radius} {...props} />;
}

export interface ChartLineProps extends Omit<
  React.ComponentProps<typeof Line>,
  "stroke"
> {
  dataKey: string;
  color?: string;
}

export function ChartLine({ dataKey, color, ...props }: ChartLineProps) {
  const stroke = useSeriesColor(dataKey, color);
  return (
    <Line
      dataKey={dataKey}
      stroke={stroke}
      strokeWidth={2}
      dot={false}
      {...props}
    />
  );
}

export interface ChartAreaProps extends Omit<
  React.ComponentProps<typeof Area>,
  "stroke" | "fill"
> {
  dataKey: string;
  color?: string;
}

export function ChartArea({ dataKey, color, ...props }: ChartAreaProps) {
  const paint = useSeriesColor(dataKey, color);
  return (
    <Area
      dataKey={dataKey}
      stroke={paint}
      fill={paint}
      fillOpacity={0.6}
      strokeWidth={2}
      {...props}
    />
  );
}

export type ChartReferenceLineProps = React.ComponentProps<
  typeof ReferenceLine
>;

export function ChartReferenceLine(props: ChartReferenceLineProps) {
  return (
    <ReferenceLine
      stroke="hsl(var(--nostromo-color-neutral-600))"
      strokeDasharray="4 4"
      {...props}
    />
  );
}
