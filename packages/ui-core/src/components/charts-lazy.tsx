import React, { Suspense } from 'react';
import { Skeleton } from './skeleton';

/**
 * Lazy-loaded Chart component wrapper
 * Use this for better code splitting when Charts are not immediately needed
 * 
 * @example
 * ```tsx
 * import { LazyChart } from '@jarllyng/ui-core/charts-lazy';
 * 
 * function Dashboard() {
 *   return (
 *     <LazyChart
 *       type="line"
 *       data={data}
 *       dataKeys={['sales', 'revenue']}
 *     />
 *   );
 * }
 * ```
 */

// Dynamic import for Chart component with recharts
const ChartLazy = React.lazy(() => 
  import('./charts').then(module => ({ 
    default: module.Chart 
  }))
);

export interface LazyChartProps extends React.ComponentProps<typeof ChartLazy> {
  fallback?: React.ReactNode;
}

export const LazyChart: React.FC<LazyChartProps> = ({ 
  fallback = <Skeleton className="h-64 w-full" />,
  ...props 
}) => {
  return (
    <Suspense fallback={fallback}>
      <ChartLazy {...props} />
    </Suspense>
  );
};

LazyChart.displayName = 'LazyChart';

