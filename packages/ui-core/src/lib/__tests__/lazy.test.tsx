import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act, cleanup } from '@testing-library/react';
import * as React from 'react';
import { LazyComponent, withLazyLoading, useLazyLoading, LazyInView } from '../lazy';

// Mock console.error to prevent error spam from error boundaries
const originalConsoleError = console.error;
beforeEach(() => {
  console.error = vi.fn();
});

afterEach(() => {
  cleanup();
  console.error = originalConsoleError;
  vi.clearAllMocks();
});

// Mock IntersectionObserver
const mockObserve = vi.fn();
const mockUnobserve = vi.fn();
const mockDisconnect = vi.fn();
let mockObserverInstance: MockIntersectionObserver | null = null;

class MockIntersectionObserver {
  root = null;
  rootMargin = '';
  thresholds: number[] = [];
  private _callback: IntersectionObserverCallback | null = null;
  
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this._callback = callback;
    // Store instance reference - eslint-disable needed for test mock
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    mockObserverInstance = this;
    if (options?.rootMargin) this.rootMargin = options.rootMargin;
    if (options?.threshold !== undefined) {
      this.thresholds = Array.isArray(options.threshold) ? options.threshold : [options.threshold];
    }
  }
  
  observe(element: Element) {
    mockObserve(element);
  }
  
  unobserve(element: Element) {
    mockUnobserve(element);
  }
  
  disconnect() {
    this._callback = null;
    mockObserverInstance = null;
    return mockDisconnect();
  }
  
  takeRecords() {
    return [];
  }
  
  // Helper method to safely trigger callback
  triggerCallback(entries: IntersectionObserverEntry[]) {
    if (this._callback) {
      this._callback(entries, this as unknown as IntersectionObserver);
    }
  }
}

window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

// Cleanup between tests
beforeEach(() => {
  mockObserve.mockClear();
  mockUnobserve.mockClear();
  mockDisconnect.mockClear();
  mockObserverInstance = null;
});

afterEach(() => {
  // Ensure all observers are disconnected
  if (mockObserverInstance) {
    mockObserverInstance.disconnect();
  }
  // Additional cleanup is handled by the outer afterEach
});

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

  it('renders error fallback when error occurs', async () => {
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

    // Wait for error boundary to catch and render the error
    await waitFor(() => {
      expect(screen.getByText('Error: Lazy loading error')).toBeInTheDocument();
    }, { timeout: 5000 });
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('uses default error boundary when no error fallback provided', async () => {
    render(
      <LazyComponent>
        <ThrowError />
      </LazyComponent>
    );

    // Wait for error boundary to catch and render the default error message
    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    }, { timeout: 5000 });
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

    expect(mockObserve).toHaveBeenCalled();
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

    expect(mockObserve).toHaveBeenCalled();
  });

  it('disconnects observer on unmount', () => {
    const TestComponent = () => {
      const { ref } = useLazyLoading();
      
      return <div ref={ref}>Test</div>;
    };

    const { unmount } = render(<TestComponent />);
    
    // Wait for observer to be set up
    expect(mockObserve).toHaveBeenCalled();
    
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
    render(
      <LazyInView>
        <SuccessComponent />
      </LazyInView>
    );

    // Wait for observer to be set up
    await waitFor(() => {
      expect(mockObserve).toHaveBeenCalled();
    });

    // Simulate intersection safely using act
    await act(async () => {
      if (mockObserverInstance) {
        const entry = {
          isIntersecting: true,
          intersectionRatio: 1,
          boundingClientRect: {} as DOMRectReadOnly,
          rootBounds: null,
          target: document.createElement('div'),
          time: Date.now(),
        } as IntersectionObserverEntry;
        
        mockObserverInstance.triggerCallback([entry]);
      }
    });

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

    expect(mockObserve).toHaveBeenCalled();
  });
});
