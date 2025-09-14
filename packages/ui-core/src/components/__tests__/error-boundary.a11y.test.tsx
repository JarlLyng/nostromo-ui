import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ErrorBoundary } from '../error-boundary';

expect.extend(toHaveNoViolations);

// Component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

describe('ErrorBoundary Accessibility', () => {
  it('should not have accessibility violations when no error occurs', async () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with default error fallback', async () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with custom fallback', async () => {
    const CustomFallback = ({ error, resetError }: { error?: Error; resetError: () => void }) => (
      <div role="alert" aria-live="polite">
        <h2>Custom Error</h2>
        <p>An error occurred: {error?.message}</p>
        <button onClick={resetError} aria-label="Retry operation">
          Try Again
        </button>
      </div>
    );

    const { container } = render(
      <ErrorBoundary fallback={CustomFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with accessible error fallback', async () => {
    const AccessibleFallback = ({ error, resetError }: { error?: Error; resetError: () => void }) => (
      <div 
        role="alert" 
        aria-live="assertive" 
        aria-labelledby="error-title"
        aria-describedby="error-description"
      >
        <h2 id="error-title">Something went wrong</h2>
        <p id="error-description">
          An unexpected error occurred. Please try again or contact support if the problem persists.
        </p>
        <div>
          <button onClick={resetError} aria-label="Retry the operation">
            Try Again
          </button>
          <button onClick={() => window.location.reload()} aria-label="Reload the page">
            Reload Page
          </button>
        </div>
      </div>
    );

    const { container } = render(
      <ErrorBoundary fallback={AccessibleFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with form in error fallback', async () => {
    const FormFallback = ({ error, resetError }: { error?: Error; resetError: () => void }) => (
      <div role="alert">
        <h2>Error Report</h2>
        <p>An error occurred: {error?.message}</p>
        <form>
          <div>
            <label htmlFor="error-description">Describe what you were doing:</label>
            <textarea 
              id="error-description" 
              rows={3}
              aria-describedby="error-description-help"
            ></textarea>
            <p id="error-description-help">
              This information will help us fix the issue.
            </p>
          </div>
          <div>
            <button type="button" onClick={resetError}>
              Try Again
            </button>
            <button type="submit">
              Report Error
            </button>
          </div>
        </form>
      </div>
    );

    const { container } = render(
      <ErrorBoundary fallback={FormFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with multiple error boundaries', async () => {
    const { container } = render(
      <div>
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
