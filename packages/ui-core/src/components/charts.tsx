import React from 'react';
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
  Cell
} from 'recharts';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

// Chart container variants
const chartContainerVariants = cva(
  'w-full',
  {
    variants: {
      variant: {
        default: '',
        minimal: '',
        detailed: ''
      },
      size: {
        sm: 'h-48',
        md: 'h-64',
        lg: 'h-96',
        xl: 'h-[500px]'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
);

export type ChartType = 'line' | 'bar' | 'pie' | 'area';

export interface ChartDataPoint {
  name: string;
  [key: string]: string | number;
}

export interface ChartProps extends VariantProps<typeof chartContainerVariants> {
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
  'hsl(var(--color-brand-500))',
  'hsl(var(--color-brand-600))',
  'hsl(var(--color-success-500))',
  'hsl(var(--color-warning-500))',
  'hsl(var(--color-error-500))',
  'hsl(var(--color-info-500))',
  'hsl(var(--color-brand-400))',
  'hsl(var(--color-brand-700))'
];

// Custom tooltip component with Tailwind styling
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-neutral-200 bg-white p-3 shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
        <p className="mb-2 font-semibold text-neutral-900 dark:text-neutral-100">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p
            key={index}
            className="text-sm"
            style={{ color: entry.color }}
          >
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom legend component with Tailwind styling
const CustomLegend = ({ payload }: any) => {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-4">
      {payload?.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded"
            style={{ backgroundColor: entry.color }}
            aria-hidden="true"
          />
          <span className="text-sm text-neutral-700 dark:text-neutral-300">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  (
    {
      type,
      data,
      dataKeys,
      xAxisKey = 'name',
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
    ref
  ) => {
    const chartHeight = height || (size === 'sm' ? 192 : size === 'lg' ? 384 : size === 'xl' ? 500 : 256);

    const renderChart = () => {
      const commonProps = {
        data,
        margin: { top: 5, right: 5, left: 5, bottom: 5 }
      };

      switch (type) {
        case 'line':
          return (
            <LineChart {...commonProps}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-neutral-300))" />}
              <XAxis
                dataKey={xAxisKey}
                stroke="hsl(var(--color-neutral-600))"
                tick={{ fill: 'hsl(var(--color-neutral-700))', fontSize: 12 }}
              />
              <YAxis
                stroke="hsl(var(--color-neutral-600))"
                tick={{ fill: 'hsl(var(--color-neutral-700))', fontSize: 12 }}
              />
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              {dataKeys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  strokeWidth={strokeWidth}
                  dot={{ r: 4, fill: colors[index % colors.length] }}
                  activeDot={{ r: 6 }}
                />
              ))}
              {showLegend && <Legend content={<CustomLegend />} />}
            </LineChart>
          );

        case 'bar':
          return (
            <BarChart {...commonProps}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-neutral-300))" />}
              <XAxis
                dataKey={xAxisKey}
                stroke="hsl(var(--color-neutral-600))"
                tick={{ fill: 'hsl(var(--color-neutral-700))', fontSize: 12 }}
              />
              <YAxis
                stroke="hsl(var(--color-neutral-600))"
                tick={{ fill: 'hsl(var(--color-neutral-700))', fontSize: 12 }}
              />
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              {dataKeys.map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={colors[index % colors.length]}
                />
              ))}
              {showLegend && <Legend content={<CustomLegend />} />}
            </BarChart>
          );

        case 'area':
          return (
            <AreaChart {...commonProps}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-neutral-300))" />}
              <XAxis
                dataKey={xAxisKey}
                stroke="hsl(var(--color-neutral-600))"
                tick={{ fill: 'hsl(var(--color-neutral-700))', fontSize: 12 }}
              />
              <YAxis
                stroke="hsl(var(--color-neutral-600))"
                tick={{ fill: 'hsl(var(--color-neutral-700))', fontSize: 12 }}
              />
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              {dataKeys.map((key, index) => {
                const colorIndex = index % colors.length;
                const color = (colors[colorIndex] ?? defaultColors[colorIndex % defaultColors.length]) as string;
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

        case 'pie':
          const pieDataKey = dataKeys[0] || 'value';
          return (
            <PieChart>
              <Pie
                data={data}
                dataKey={pieDataKey}
                nameKey={xAxisKey}
                cx="50%"
                cy="50%"
                outerRadius={chartHeight / 4}
                label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length] || defaultColors[index % defaultColors.length]}
                  />
                ))}
              </Pie>
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              {showLegend && <Legend content={<CustomLegend />} />}
            </PieChart>
          );

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
          <h3 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {title}
          </h3>
        )}
        {description && (
          <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        )}
        <ResponsiveContainer width="100%" height={chartHeight}>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    );
  }
);

Chart.displayName = 'Chart';

export { chartContainerVariants };

