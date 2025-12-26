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
 * Measures actual render/commit time using React's performance API
 */
export function usePerformanceMonitor(
  componentName: string,
  options: PerformanceOptions = {}
) {
  const {
    enabled = typeof window !== 'undefined' && window.location?.hostname === 'localhost',
    logToConsole = true,
    onMetric,
    threshold = 0,
  } = options;

  const renderCount = React.useRef<number>(0);
  const markName = React.useRef<string>(`${componentName}-render-${Date.now()}`);

  React.useEffect(() => {
    if (!enabled || typeof window === 'undefined' || !window.performance) return;

    renderCount.current += 1;
    const currentMark = `${markName.current}-${renderCount.current}`;
    
    // Mark start of render
    performance.mark(`${currentMark}-start`);

    return () => {
      // Mark end of render
      performance.mark(`${currentMark}-end`);
      
      try {
        // Measure the time between marks
        performance.measure(
          `${currentMark}-measure`,
          `${currentMark}-start`,
          `${currentMark}-end`
        );

        const measure = performance.getEntriesByName(`${currentMark}-measure`)[0];
        const renderTime = measure ? measure.duration : 0;

        // Clean up marks and measures
        performance.clearMarks(`${currentMark}-start`);
        performance.clearMarks(`${currentMark}-end`);
        performance.clearMeasures(`${currentMark}-measure`);
        
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
      } catch (error) {
        // Silently fail if performance API is not available
        if (logToConsole && enabled) {
          console.warn(`[Performance] Failed to measure ${componentName}:`, error);
        }
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
  const WrappedComponent = React.forwardRef<unknown, P>((props, ref) => {
    const name = componentName || Component.displayName || Component.name || 'Unknown';
    usePerformanceMonitor(name, options);
    
    return React.createElement(Component, { ...(props as P), ref } as P & { ref?: React.Ref<unknown> });
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
    if (typeof window === 'undefined' || window.location?.hostname !== 'localhost') return;
    if (typeof window === 'undefined' || !('memory' in performance)) return;

    const updateMemoryInfo = () => {
      const memory = (performance as Performance & { memory?: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
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
  debounce: <T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  /**
   * Throttle function for performance optimization
   */
  throttle: <T extends (...args: unknown[]) => unknown>(
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
  memoize: <T extends (...args: unknown[]) => unknown>(fn: T): T => {
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
