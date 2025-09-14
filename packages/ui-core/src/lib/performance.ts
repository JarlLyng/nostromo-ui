import * as React from 'react';

interface PerformanceMetrics {
  renderTime: number;
  componentName: string;
  timestamp: number;
}

interface PerformanceOptions {
  enabled?: boolean;
  logToConsole?: boolean;
  onMetric?: (metric: PerformanceMetrics) => void;
  threshold?: number; // Log only if render time exceeds threshold (ms)
}

/**
 * Hook for monitoring component render performance
 */
export function usePerformanceMonitor(
  componentName: string,
  options: PerformanceOptions = {}
) {
  const {
    enabled = process.env.NODE_ENV === 'development',
    logToConsole = true,
    onMetric,
    threshold = 0,
  } = options;

  const renderStartTime = React.useRef<number>(0);
  const renderCount = React.useRef<number>(0);

  React.useEffect(() => {
    if (!enabled) return;

    renderStartTime.current = performance.now();
    renderCount.current += 1;

    return () => {
      const renderTime = performance.now() - renderStartTime.current;
      
      if (renderTime > threshold) {
        const metric: PerformanceMetrics = {
          renderTime,
          componentName,
          timestamp: Date.now(),
        };

        if (logToConsole) {
          console.log(`[Performance] ${componentName}: ${renderTime.toFixed(2)}ms (render #${renderCount.current})`);
        }

        onMetric?.(metric);
      }
    };
  });

  return {
    renderCount: renderCount.current,
    isMonitoring: enabled,
  };
}

/**
 * Higher-order component for performance monitoring
 */
export function withPerformanceMonitoring<P extends object>(
  Component: React.ComponentType<P>,
  componentName?: string,
  options?: PerformanceOptions
) {
  const WrappedComponent = React.forwardRef<any, P>((props, ref) => {
    const name = componentName || Component.displayName || Component.name || 'Unknown';
    usePerformanceMonitor(name, options);
    
    return React.createElement(Component, { ...(props as any), ref });
  });
  
  WrappedComponent.displayName = `withPerformanceMonitoring(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

/**
 * Hook for measuring bundle size impact
 */
export function useBundleSize() {
  const [bundleSize, setBundleSize] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // This is a simplified approach - in a real app you'd use webpack-bundle-analyzer
      const scripts = Array.from(document.scripts);
      const totalSize = scripts.reduce((acc, script) => {
        if (script.src) {
          // This is just an estimate - actual bundle analysis would be more accurate
          return acc + (script.src.includes('nostromo') ? 10000 : 0);
        }
        return acc;
      }, 0);
      
      setBundleSize(totalSize);
    }
  }, []);

  return bundleSize;
}

/**
 * Hook for monitoring memory usage (development only)
 */
export function useMemoryMonitor() {
  const [memoryInfo, setMemoryInfo] = React.useState<{
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  } | null>(null);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    if (typeof window === 'undefined' || !('memory' in performance)) return;

    const updateMemoryInfo = () => {
      const memory = (performance as any).memory;
      if (memory) {
        setMemoryInfo({
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
        });
      }
    };

    updateMemoryInfo();
    const interval = setInterval(updateMemoryInfo, 5000);

    return () => clearInterval(interval);
  }, []);

  return memoryInfo;
}

/**
 * Performance optimization utilities
 */
export const performanceUtils = {
  /**
   * Debounce function for performance optimization
   */
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  /**
   * Throttle function for performance optimization
   */
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  /**
   * Memoize expensive calculations
   */
  memoize: <T extends (...args: any[]) => any>(fn: T): T => {
    const cache = new Map();
    return ((...args: Parameters<T>) => {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = fn(...args);
      cache.set(key, result);
      return result;
    }) as T;
  },
};
