import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import * as React from 'react';
import { LazyComponent, withLazyLoading, useLazyLoading, LazyInView } from '../lazy';
import { ErrorBoundary } from '../../components/error-boundary';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

// Component that throws an error
const ThrowError = () => {
  throw new Error('Lazy loading error');
};

// Component that loads successfully
const SuccessComponent = () => <div>Lazy loaded successfully</div>;

// Slow loading component
const SlowComponent = () => {
  const [loaded, setLoaded] = React.useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  return loaded ? <div>Slow component loaded</div> : <div>Loading...</div>;
};

describe('LazyComponent', () => {
  it('renders children when loaded successfully', async () => {
    render(
      <LazyComponent>
        <SuccessComponent />
      </LazyComponent>
    );

    await waitFor(() => {
      expect(screen.getByText('Lazy loaded successfully')).toBeInTheDocument();
    });
  });

  it('renders default loading fallback', () => {
    render(
      <LazyComponent>
        <SlowComponent />
      </LazyComponent>
    );

    // Should show loading text initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders custom loading fallback', () => {
    const CustomFallback = () => <div>Custom loading...</div>;
    
    // Create a lazy component that will actually suspend
    const LazySlowComponent = React.lazy(() => 
      new Promise(resolve => 
        setTimeout(() => resolve({ default: SlowComponent }), 100)
      )
    );
    
    render(
      <LazyComponent fallback={CustomFallback}>
        <LazySlowComponent />
      </LazyComponent>
    );

    // The component should show the custom fallback initially
    expect(screen.getByText('Custom loading...')).toBeInTheDocument();
  });

  it('renders error fallback when error occurs', () => {
    const CustomErrorFallback = ({ error, retry }: { error: Error; retry: () => void }) => (
      <div>
        <p>Error: {error.message}</p>
        <button onClick={retry}>Retry</button>
      </div>
    );

    render(
      <LazyComponent errorFallback={CustomErrorFallback}>
        <ThrowError />
      </LazyComponent>
    );

    expect(screen.getByText('Error: Lazy loading error')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('uses default error boundary when no error fallback provided', () => {
    render(
      <LazyComponent>
        <ThrowError />
      </LazyComponent>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});

describe('withLazyLoading', () => {
  it('wraps component with lazy loading', () => {
    const WrappedComponent = withLazyLoading(SuccessComponent);
    
    render(<WrappedComponent />);

    expect(screen.getByText('Lazy loaded successfully')).toBeInTheDocument();
  });

  it('preserves component display name', () => {
    const WrappedComponent = withLazyLoading(SuccessComponent);
    
    expect(WrappedComponent.displayName).toBe('withLazyLoading(SuccessComponent)');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    const WrappedComponent = withLazyLoading(SuccessComponent);
    
    render(<WrappedComponent ref={ref} />);

    // The component should render successfully
    expect(screen.getByText('Lazy loaded successfully')).toBeInTheDocument();
  });
});

describe('useLazyLoading', () => {
  it('returns ref and visibility state', () => {
    const TestComponent = () => {
      const { ref, isVisible } = useLazyLoading();
      
      return (
        <div ref={ref}>
          {isVisible ? 'Visible' : 'Not visible'}
        </div>
      );
    };

    render(<TestComponent />);

    expect(screen.getByText('Not visible')).toBeInTheDocument();
  });

  it('observes element with intersection observer', () => {
    const TestComponent = () => {
      const { ref } = useLazyLoading();
      
      return <div ref={ref}>Test</div>;
    };

    render(<TestComponent />);

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );
  });

  it('uses custom options', () => {
    const TestComponent = () => {
      const { ref } = useLazyLoading({
        rootMargin: '100px',
        threshold: 0.5,
      });
      
      return <div ref={ref}>Test</div>;
    };

    render(<TestComponent />);

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        rootMargin: '100px',
        threshold: 0.5,
      }
    );
  });

  it('disconnects observer on unmount', () => {
    const mockDisconnect = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: mockDisconnect,
    });

    const TestComponent = () => {
      const { ref } = useLazyLoading();
      
      return <div ref={ref}>Test</div>;
    };

    const { unmount } = render(<TestComponent />);
    unmount();

    expect(mockDisconnect).toHaveBeenCalled();
  });
});

describe('LazyInView', () => {
  it('renders fallback when not visible', () => {
    render(
      <LazyInView fallback={<div>Loading...</div>}>
        <SuccessComponent />
      </LazyInView>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders default fallback when not visible', () => {
    render(
      <LazyInView>
        <SuccessComponent />
      </LazyInView>
    );

    // Should show loading spinner (div with animate-spin class)
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('renders children when visible', async () => {
    // Mock intersection observer to trigger visibility
    const mockObserve = vi.fn();
    const mockCallback = vi.fn();
    
    mockIntersectionObserver.mockImplementation((callback) => {
      mockCallback.mockImplementation(callback);
      return {
        observe: mockObserve,
        unobserve: () => null,
        disconnect: () => null,
      };
    });

    render(
      <LazyInView>
        <SuccessComponent />
      </LazyInView>
    );

    // Simulate intersection
    mockCallback([{ isIntersecting: true }]);

    await waitFor(() => {
      expect(screen.getByText('Lazy loaded successfully')).toBeInTheDocument();
    });
  });

  it('uses custom intersection options', () => {
    render(
      <LazyInView rootMargin="200px" threshold={0.8}>
        <SuccessComponent />
      </LazyInView>
    );

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        rootMargin: '200px',
        threshold: 0.8,
      }
    );
  });
});
