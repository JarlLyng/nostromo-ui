import LiveCode from '../components/LiveCode'

# Performance Guide

This guide covers performance optimization strategies for Nostromo UI, including bundle size optimization, runtime performance, and best practices.

## 📋 Contents

- [Bundle Size Optimization](#bundle-size-optimization)
- [Runtime Performance](#runtime-performance)
- [Lazy Loading](#lazy-loading)
- [Performance Monitoring](#performance-monitoring)
- [Best Practices](#best-practices)

## Bundle Size Optimization

### Individual Component Imports

Always use individual component imports for optimal tree-shaking:

```tsx
// ✅ Recommended: Individual imports
import { Button } from "@jarllyng/nostromo/button";
import { Input } from "@jarllyng/nostromo/input";

// ✅ Also OK: Barrel imports (still tree-shakeable)
import { Button, Input } from "@jarllyng/nostromo";

// ❌ Avoid: Full library import
import * as Nostromo from "@jarllyng/nostromo";
```

### Bundle Size Limits

Every entry point has a budget, in the `size-limit` field of
`packages/nostromo/package.json`, and CI fails the build when one is exceeded.
For the current sizes, ask the tool rather than this page:

```bash
pnpm --filter @jarllyng/nostromo build
pnpm --filter @jarllyng/nostromo size
```

This page used to list them, and the list drifted: it gave the full barrel as
222.88 kB when the tool was measuring 278.53. The heavy entries are heavy for a
reason worth knowing, though: `Calendar` includes date-fns, `Icon` the Phosphor
icon set, and `Charts` recharts.

### Why the numbers moved in size-limit 14

size-limit 14 measures with rolldown where 13 used esbuild. Rolldown minifies
more aggressively, so the same files measure 3 to 10 percent smaller - the full
barrel went from 278.53 kB to 254.87 kB without a byte of the build changing.

The budgets were rescaled to match, each by the ratio its own file moved, so
every entry keeps the headroom it had. They had been set close on purpose:
5 percent over the actual size for `Icon`, 11 percent at the median. Leaving
them alone would have roughly doubled what a regression could add before CI
noticed, which is a policy change nobody had made.

**Note**: These sizes are measured with all dependencies, minified and brotlied. Individual component imports enable tree-shaking for optimal bundle sizes.

### Analyzing Bundle Size

```bash
# Check bundle sizes
pnpm size

# Analyze bundle composition
pnpm analyze:bundle

# Build with analysis
pnpm analyze
```

## Runtime Performance

### React.memo Optimization

All components are optimized with `React.memo` to prevent unnecessary re-renders:

<LiveCode code={`import { Button, Input, Card } from '@jarllyng/nostromo'
import { useState } from 'react'

const MemoizedComponents = () => {
const [count, setCount] = useState(0)

return (
<div className="space-y-4">
<div>
<p className="text-sm text-muted-foreground mb-2">
Count: {count} - These components are memoized and won't re-render unnecessarily
</p>
<button
onClick={() => setCount(count + 1)}
className="px-4 py-2 bg-primary text-primary-foreground rounded-md" >
Increment Count
</button>
</div>

      <div className="space-y-2">
        <Button>Memoized Button</Button>
        <Input placeholder="Memoized Input" />
        <Card className="p-4">
          <p>Memoized Card - Only re-renders when props change</p>
        </Card>
      </div>
    </div>

)
}

render(<MemoizedComponents />)
`} noInline={true} />

**How it works:**

- Components automatically memoized
- Only re-renders when props actually change
- Prevents unnecessary DOM updates

### Performance Benchmarks

Components are tested to render within 16ms (60fps threshold):

```bash
# Run performance tests
pnpm test:performance
```

### Optimizing Expensive Components

For components with expensive calculations:

<LiveCode code={`import { useMemo, useState } from 'react'
import { Chart } from '@jarllyng/nostromo'

const OptimizedChart = () => {
const [rawData] = useState([
{ name: 'Jan', value: 100 },
{ name: 'Feb', value: 200 },
{ name: 'Mar', value: 150 },
])

// Memoize expensive calculations
const processedData = useMemo(() => {
return rawData.map(item => ({
...item,
calculated: item.value * 2, // Simulated expensive calculation
formatted: \`\${item.name}: \${item.value}\`
}))
}, [rawData])

return (
<div className="space-y-4">
<p className="text-sm text-muted-foreground">
Data is memoized and only recalculates when rawData changes
</p>
<Chart
type="line"
data={processedData}
dataKeys={['value', 'calculated']}
size="sm"
/>
</div>
)
}

render(<OptimizedChart />)
`} noInline={true} />

## Code Splitting

### Automatic Code Splitting

With code splitting enabled in tsup config, heavy dependencies are automatically split into separate chunks:

- **recharts** (used by Charts) → separate chunk
- **phosphor-react** (used by Icon) → separate chunk
- Shared dependencies → vendor chunk

This means:

- Initial bundle size is smaller
- Heavy components load on-demand
- Better caching (chunks update independently)

### Verifying Code Splitting

After building, check the `dist/` folder for chunk files:

```bash
ls dist/chunk-*.js
```

Each chunk represents shared code that multiple components use.

## Lazy Loading

### Heavy Components

Heavy components (Charts, DataTable, Calendar) should be lazy-loaded for optimal code splitting:

#### Option 1: Using LazyChart Component (Recommended)

<LiveCode code={`import { LazyChart, Skeleton } from '@jarllyng/nostromo'

const LazyChartExample = () => {
const data = [
{ name: 'Jan', sales: 4000, revenue: 2400 },
{ name: 'Feb', sales: 3000, revenue: 1398 },
{ name: 'Mar', sales: 2000, revenue: 9800 },
{ name: 'Apr', sales: 2780, revenue: 3908 },
{ name: 'May', sales: 1890, revenue: 4800 },
]

return (
<LazyChart
type="line"
data={data}
dataKeys={['sales', 'revenue']}
fallback={<Skeleton className="h-64 w-full" />}
/>
)
}

render(<LazyChartExample />)
`} noInline={true} />

#### Option 2: Manual Lazy Loading

```tsx
import { lazy, Suspense } from "react";
import { Skeleton } from "@jarllyng/nostromo";

// Lazy load Chart component
const Chart = lazy(() =>
  import("@jarllyng/nostromo/charts").then((m) => ({ default: m.Chart })),
);

function Dashboard() {
  return (
    <Suspense fallback={<Skeleton className="h-64" />}>
      <Chart type="line" data={data} />
    </Suspense>
  );
}
```

### Using LazyInView Component

For components that should only load when visible:

```tsx
import { LazyInView } from "@jarllyng/nostromo";
import { Chart } from "@jarllyng/nostromo/charts";

function Dashboard() {
  return (
    <LazyInView fallback={<Skeleton className="h-64" />}>
      <Chart type="bar" data={data} />
    </LazyInView>
  );
}
```

## Performance Monitoring

### usePerformanceMonitor Hook

Monitor component render performance in development:

<LiveCode code={`import { usePerformanceMonitor } from '@jarllyng/nostromo'
import { Button } from '@jarllyng/nostromo'
import { useState } from 'react'

const PerformanceMonitorExample = () => {
// Monitor render performance (only logs in development)
usePerformanceMonitor('PerformanceMonitorExample', {
threshold: 16, // ms (60fps)
logSlowRenders: true
})

const [count, setCount] = useState(0)

return (
<div className="space-y-4">
<p className="text-sm text-muted-foreground">
Check browser console to see performance metrics (development only)
</p>
<Button onClick={() => setCount(count + 1)}>
Render Count: {count}
</Button>
</div>
)
}

render(<PerformanceMonitorExample />)
`} noInline={true} />

### useMemoryMonitor Hook

Monitor memory usage (development only):

<LiveCode code={`import { useMemoryMonitor } from '@jarllyng/nostromo'
import { Card } from '@jarllyng/nostromo'

const MemoryMonitorExample = () => {
const memoryInfo = useMemoryMonitor()

return (
<Card className="p-4">
<h3 className="font-semibold mb-2">Memory Usage</h3>
{memoryInfo ? (
<div className="space-y-1 text-sm">
<p>Used: {(memoryInfo.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB</p>
<p>Total: {(memoryInfo.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB</p>
<p>Limit: {(memoryInfo.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB</p>
</div>
) : (
<p className="text-sm text-muted-foreground">
Memory API not available (check browser console)
</p>
)}
</Card>
)
}

render(<MemoryMonitorExample />)
`} noInline={true} />

## Memory Optimization

### Preventing Memory Leaks

All components are designed to prevent memory leaks by properly cleaning up resources:

#### ✅ Properly Cleaned Up Resources

1. **Timeouts & Intervals**
   - Toast component cleans up all timeouts on unmount
   - Tooltip component cleans up delay timers
   - All `setTimeout` calls have corresponding `clearTimeout`

2. **Event Listeners**
   - Dialog component removes keyboard event listeners
   - TooltipContent removes resize/scroll listeners
   - All `addEventListener` calls have corresponding `removeEventListener`

3. **DOM References**
   - Refs are properly cleaned up on unmount
   - No lingering references to DOM nodes

#### Example: Proper Cleanup Pattern

```tsx
useEffect(() => {
  const timer = setTimeout(() => {
    // Do something
  }, 1000);

  return () => {
    clearTimeout(timer); // ✅ Cleanup
  };
}, []);
```

#### Example: Event Listener Cleanup

```tsx
useEffect(() => {
  const handleResize = () => {
    // Handle resize
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize); // ✅ Cleanup
  };
}, []);
```

### Memory Leak Detection

Run memory leak tests:

```bash
pnpm test memory-leaks
```

These tests verify:

- Timeouts are cleaned up on unmount
- Event listeners are removed on unmount
- DOM references are cleared
- No lingering subscriptions

## Best Practices

### 1. Use Semantic HTML

Semantic HTML is faster to render and parse:

```tsx
// ✅ Good
<button type="button">Click me</button>

// ❌ Avoid
<div role="button" onClick={handleClick}>Click me</div>
```

### 2. Minimize Re-renders

Use React.memo, useMemo, and useCallback appropriately:

```tsx
import { useCallback, useMemo } from "react";

function Form({ onSubmit }) {
  // Memoize callbacks
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit(data);
    },
    [onSubmit, data],
  );

  // Memoize expensive calculations
  const processedData = useMemo(() => {
    return expensiveCalculation(data);
  }, [data]);

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### 3. Optimize Images and Assets

- Use appropriate image formats (WebP, AVIF)
- Implement lazy loading for images
- Use responsive images with srcset

### 4. Code Splitting

Split your application into smaller chunks:

```tsx
// Route-based code splitting
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));
```

### 5. Avoid Unnecessary State Updates

Only update state when necessary:

```tsx
// ✅ Good: Only update when value actually changes
const [value, setValue] = useState("");

const handleChange = (e) => {
  const newValue = e.target.value;
  if (newValue !== value) {
    setValue(newValue);
  }
};

// ❌ Avoid: Updating state on every render
useEffect(() => {
  setValue(processedValue); // Only if processedValue changed
}, [processedValue]);
```

## Performance Targets

### Bundle Size Targets

- **Core components**: < 30KB gzipped per component
- **Total library**: < 100KB gzipped (with tree-shaking)
- **Heavy components**: < 80KB gzipped (Charts, DataTable)

### Runtime Performance Targets

- **Component render**: < 16ms (60fps)
- **First paint**: < 100ms
- **Time to interactive**: < 200ms

### Memory Usage Targets

- **Baseline memory**: < 10MB
- **Memory growth**: < 1MB/hour
- **Memory leaks**: 0

## Troubleshooting

### Bundle Size Too Large

1. Check individual component imports
2. Verify tree-shaking is working
3. Use bundle analyzer to identify large dependencies
4. Consider lazy loading heavy components

### Slow Component Rendering

1. Check performance monitor logs
2. Use React DevTools Profiler
3. Verify React.memo is working correctly
4. Check for unnecessary re-renders

### Memory Leaks

1. Use memory monitor hook
2. Check for missing cleanup in useEffect
3. Verify event listeners are removed
4. Check for circular references

## Additional Resources

- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Web Vitals](https://web.dev/vitals/)
- [Bundle Size Analysis](https://bundlephobia.com/)

---

**Last Updated**: January 2025
