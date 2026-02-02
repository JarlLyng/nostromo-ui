import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

// Chart container variants
const chartContainerVariants = cva("w-full", {
  variants: {
    variant: {
      default: "",
      minimal: "",
      detailed: "",
    },
    size: {
      sm: "h-48",
      md: "h-64",
      lg: "h-96",
      xl: "h-[500px]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export type ChartType = "line" | "bar" | "pie" | "area";

export interface ChartDataPoint {
  name: string;
  [key: string]: string | number;
}

export interface ChartProps extends VariantProps<
  typeof chartContainerVariants
> {
  type: ChartType;
  data: ChartDataPoint[];
  dataKeys: string[];
  xAxisKey?: string;
  colors?: (string | undefined)[];
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  title?: string;
  description?: string;
  className?: string;
  height?: number;
  // Accessibility
  ariaLabel?: string;
  ariaLabelledBy?: string;
  // Styling
  strokeWidth?: number;
  fillOpacity?: number;
}

// Default color palette matching Nostromo theme
const defaultColors = [
  "hsl(var(--color-brand-500))",
  "hsl(var(--color-brand-600))",
  "hsl(var(--color-success-500))",
  "hsl(var(--color-warning-500))",
  "hsl(var(--color-error-500))",
  "hsl(var(--color-info-500))",
  "hsl(var(--color-brand-400))",
  "hsl(var(--color-brand-700))",
];

// Custom tooltip component with Tailwind styling
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: number | string;
    color?: string;
  }>;
  label?: string | number;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-popover p-3 shadow-lg">
        <p className="mb-2 font-semibold text-popover-foreground">
          {String(label ?? "")}
        </p>
        {payload.map((entry, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name ?? ""}: ${entry.value ?? ""}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom legend component with Tailwind styling
interface CustomLegendProps {
  payload?: Array<{
    value?: string;
    color?: string;
  }>;
}

const CustomLegend = ({ payload }: CustomLegendProps) => {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-4">
      {payload?.map((entry, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded"
            style={{ backgroundColor: entry.color }}
            aria-hidden="true"
          />
          <span className="text-sm text-popover-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const ChartComponent = React.forwardRef<HTMLDivElement, ChartProps>(
  (
    {
      type,
      data,
      dataKeys,
      xAxisKey = "name",
      colors = defaultColors,
      showGrid = true,
      showLegend = true,
      showTooltip = true,
      title,
      description,
      className,
      variant,
      size,
      height,
      ariaLabel,
      ariaLabelledBy,
      strokeWidth = 2,
      fillOpacity = 0.6,
      ...props
    },
    ref,
  ) => {
    const chartHeight =
      height ||
      (size === "sm" ? 192 : size === "lg" ? 384 : size === "xl" ? 500 : 256);

    const renderChart = () => {
      // SSR guard: recharts requires browser environment
      if (typeof window === "undefined") {
        return (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>Chart loading...</p>
          </div>
        );
      }

      const commonProps = {
        data,
        margin: { top: 5, right: 5, left: 5, bottom: 5 },
      };

      switch (type) {
        case "line":
          return (
            <LineChart {...commonProps}>
              {showGrid && (
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--color-neutral-300))"
                />
              )}
              <XAxis
                dataKey={xAxisKey}
                stroke="hsl(var(--color-neutral-600))"
                tick={{ fill: "hsl(var(--color-neutral-700))", fontSize: 12 }}
              />
              <YAxis
                stroke="hsl(var(--color-neutral-600))"
                tick={{ fill: "hsl(var(--color-neutral-700))", fontSize: 12 }}
              />
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              {dataKeys.map((key, index) => {
                const colorIndex = index % colors.length;
                const color = (colors[colorIndex] ??
                  defaultColors[colorIndex % defaultColors.length]) as string;
                return (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    dot={{ r: 4, fill: color }}
                    activeDot={{ r: 6 }}
                  />
                );
              })}
              {showLegend && <Legend content={<CustomLegend />} />}
            </LineChart>
          );

        case "bar":
          return (
            <BarChart {...commonProps}>
              {showGrid && (
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--color-neutral-300))"
                />
              )}
              <XAxis
                dataKey={xAxisKey}
                stroke="hsl(var(--color-neutral-600))"
                tick={{ fill: "hsl(var(--color-neutral-700))", fontSize: 12 }}
              />
              <YAxis
                stroke="hsl(var(--color-neutral-600))"
                tick={{ fill: "hsl(var(--color-neutral-700))", fontSize: 12 }}
              />
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              {dataKeys.map((key, index) => {
                const colorIndex = index % colors.length;
                const color = (colors[colorIndex] ??
                  defaultColors[colorIndex % defaultColors.length]) as string;
                return <Bar key={key} dataKey={key} fill={color} />;
              })}
              {showLegend && <Legend content={<CustomLegend />} />}
            </BarChart>
          );

        case "area":
          return (
            <AreaChart {...commonProps}>
              {showGrid && (
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--color-neutral-300))"
                />
              )}
              <XAxis
                dataKey={xAxisKey}
                stroke="hsl(var(--color-neutral-600))"
                tick={{ fill: "hsl(var(--color-neutral-700))", fontSize: 12 }}
              />
              <YAxis
                stroke="hsl(var(--color-neutral-600))"
                tick={{ fill: "hsl(var(--color-neutral-700))", fontSize: 12 }}
              />
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              {dataKeys.map((key, index) => {
                const colorIndex = index % colors.length;
                const color = (colors[colorIndex] ??
                  defaultColors[colorIndex % defaultColors.length]) as string;
                return (
                  <Area
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={color}
                    fill={color}
                    fillOpacity={fillOpacity}
                    strokeWidth={strokeWidth}
                  />
                );
              })}
              {showLegend && <Legend content={<CustomLegend />} />}
            </AreaChart>
          );

        case "pie": {
          const pieDataKey = dataKeys[0] || "value";
          return (
            <PieChart>
              <Pie
                data={data}
                dataKey={pieDataKey}
                nameKey={xAxisKey}
                cx="50%"
                cy="50%"
                outerRadius={chartHeight / 4}
                label={(props: { name?: string; percent?: number }) =>
                  `${props.name ?? ""}: ${((props.percent ?? 0) * 100).toFixed(0)}%`
                }
              >
                {data.map((entry, index) => {
                  const fillColor =
                    colors[index % colors.length] ||
                    defaultColors[index % defaultColors.length];
                  return (
                    <Cell key={`cell-${index}`} fill={fillColor ?? "#8884d8"} />
                  );
                })}
              </Pie>
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              {showLegend && <Legend content={<CustomLegend />} />}
            </PieChart>
          );
        }

        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(chartContainerVariants({ variant, size }), className)}
        role="img"
        aria-label={ariaLabel || title || `${type} chart`}
        aria-labelledby={ariaLabelledBy}
        {...props}
      >
        {title && (
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            {title}
          </h3>
        )}
        {description && (
          <p className="mb-4 text-sm text-muted-foreground">{description}</p>
        )}
        <ResponsiveContainer width="100%" height={chartHeight}>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    );
  },
);

ChartComponent.displayName = "Chart";

// Memoize Chart component for performance optimization
// Charts are expensive to render, so memoization helps prevent unnecessary re-renders
export const Chart = React.memo(ChartComponent) as any as typeof ChartComponent;

export { chartContainerVariants };
