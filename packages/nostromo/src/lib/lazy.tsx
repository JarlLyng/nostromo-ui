import * as React from 'react';
import { ErrorBoundary } from '../components/core/error-boundary';

interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ComponentType | undefined;
  errorFallback?: React.ComponentType<{ error: Error; retry: () => void }> | undefined;
}

/**
 * Lazy loading wrapper component with error boundary and loading fallback
 */
export function LazyComponent({ 
  children, 
  fallback: Fallback,
  errorFallback: ErrorFallback 
}: LazyComponentProps) {
  return (
    <ErrorBoundary
      fallback={ErrorFallback ? ({ error, resetError }) => {
        if (!error) return null;
        return <ErrorFallback error={error} retry={resetError} />;
      } : undefined}
    >
      <React.Suspense fallback={Fallback ? <Fallback /> : <DefaultLoadingFallback />}>
        {children}
      </React.Suspense>
    </ErrorBoundary>
  );
}

/**
 * Default loading fallback component
 */
function DefaultLoadingFallback() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}

/**
 * Higher-order component for lazy loading with error boundary
 */
export function withLazyLoading<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    fallback?: React.ComponentType;
    errorFallback?: React.ComponentType<{ error: Error; retry: () => void }>;
  }
) {
  const WrappedComponent = React.forwardRef<unknown, P>((props, _ref) => (
    <LazyComponent
      fallback={options?.fallback}
      errorFallback={options?.errorFallback}
    >
      {React.createElement(Component, props as P & { ref?: React.Ref<unknown> })}
    </LazyComponent>
  ));
  
  WrappedComponent.displayName = `withLazyLoading(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

/**
 * Hook for lazy loading with intersection observer
 */
export function useLazyLoading(options?: {
  rootMargin?: string;
  threshold?: number;
}) {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: options?.rootMargin || '50px',
        threshold: options?.threshold || 0.1,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [options?.rootMargin, options?.threshold]);

  return { ref, isVisible };
}

/**
 * Lazy loading component that only renders when in viewport
 */
export function LazyInView({ 
  children, 
  fallback,
  ...options 
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
} & Parameters<typeof useLazyLoading>[0]) {
  const { ref, isVisible } = useLazyLoading(options);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      {isVisible ? children : (fallback || <DefaultLoadingFallback />)}
    </div>
  );
}
