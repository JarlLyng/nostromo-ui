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
import { Button } from '@nostromo/ui-core/button';
import { Input } from '@nostromo/ui-core/input';

// ✅ Also OK: Barrel imports (still tree-shakeable)
import { Button, Input } from '@nostromo/ui-core';

// ❌ Avoid: Full library import
import * as Nostromo from '@nostromo/ui-core';
```

### Bundle Size Limits

We monitor bundle sizes with size-limit. Current sizes (minified + brotlied):

- **Button**: 8.5 KB (limit: 10 KB)
- **Input**: 8.27 KB (limit: 10 KB)
- **Dialog**: 8.61 KB (limit: 12 KB)
- **Select**: 31.29 KB (limit: 35 KB)
- **Charts**: 104.71 KB (limit: 105 KB, includes recharts library)
- **DataTable**: 11.73 KB (limit: 25 KB)
- **Calendar**: 34.61 KB (limit: 35 KB, includes date-fns library)
- **Icon**: 50.59 KB (limit: 51 KB, includes Phosphor icon library)
- **Main bundle (index.js)**: 204.08 KB (limit: 420 KB, with tree-shaking)

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

<LiveCode code={`import { Button, Input, Card } from '@nostromo/ui-core'
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
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
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
import { Chart } from '@nostromo/ui-core'

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

<LiveCode code={`import { LazyChart, Skeleton } from '@nostromo/ui-core'

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
import { lazy, Suspense } from 'react';
import { Skeleton } from '@nostromo/ui-core';

// Lazy load Chart component
const Chart = lazy(() => import('@nostromo/ui-core/charts').then(m => ({ default: m.Chart })));

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
import { LazyInView } from '@nostromo/ui-core';
import { Chart } from '@nostromo/ui-core/charts';

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

<LiveCode code={`import { usePerformanceMonitor } from '@nostromo/ui-core'
import { Button } from '@nostromo/ui-core'
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

<LiveCode code={`import { useMemoryMonitor } from '@nostromo/ui-core'
import { Card } from '@nostromo/ui-core'

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

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize); // ✅ Cleanup
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
import { useCallback, useMemo } from 'react';

function Form({ onSubmit }) {
  // Memoize callbacks
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSubmit(data);
  }, [onSubmit, data]);

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
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
```

### 5. Avoid Unnecessary State Updates

Only update state when necessary:

```tsx
// ✅ Good: Only update when value actually changes
const [value, setValue] = useState('');

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

