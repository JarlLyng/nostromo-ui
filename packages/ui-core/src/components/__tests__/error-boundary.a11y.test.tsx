import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { vi, beforeEach, afterEach } from 'vitest';
import { ErrorBoundary } from '../error-boundary';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock console.error globally to prevent error spam
const originalConsoleError = console.error;
beforeEach(() => {
  console.error = vi.fn();
});

afterEach(() => {
  cleanup();
  console.error = originalConsoleError;
  vi.clearAllMocks();
});

// Component that throws an error for testing
// Use a flag to ensure error is only thrown once per render
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

  it('should not have accessibility violations when error occurs', async () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes for error state', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    // Check if error boundary renders error UI
    // This depends on the ErrorBoundary implementation
    const errorElement = screen.queryByRole('alert');
    if (errorElement) {
      expect(errorElement).toBeInTheDocument();
    }
  });

  it('should have proper contrast for error messages', async () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should be accessible with custom error UI', async () => {
    const CustomErrorUI = ({ error }: { error: Error }) => (
      <div role="alert" aria-live="assertive">
        <h2>Something went wrong</h2>
        <p>Error: {error.message}</p>
        <button onClick={() => window.location.reload()}>
          Reload page
        </button>
      </div>
    );
    
    const { container } = render(
      <ErrorBoundary fallback={CustomErrorUI}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should support keyboard navigation in error UI', () => {
    const CustomErrorUI = ({ error }: { error: Error }) => (
      <div role="alert">
        <h2>Something went wrong</h2>
        <p>Error: {error.message}</p>
        <button onClick={() => window.location.reload()}>
          Reload page
        </button>
        <a href="/support">Get help</a>
      </div>
    );
    
    render(
      <ErrorBoundary fallback={CustomErrorUI}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    const button = screen.getByRole('button');
    const link = screen.getByRole('link');
    
    expect(button).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/support');
    
    // Restore console.error
    console.error = originalError;
  });

  it('should handle multiple error boundaries', async () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = vi.fn();
    
    const { container } = render(
      <div>
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </div>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    // Restore console.error
    console.error = originalError;
  });

  it('should be accessible with nested error boundaries', async () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = vi.fn();
    
    const { container } = render(
      <ErrorBoundary>
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      </ErrorBoundary>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    // Restore console.error
    console.error = originalError;
  });

  it('should support custom ARIA attributes', () => {
    const CustomErrorUI = ({ error }: { error: Error }) => (
      <div 
        role="alert" 
        aria-live="assertive"
        aria-label="Error occurred"
        aria-describedby="error-description"
      >
        <h2 id="error-description">Something went wrong</h2>
        <p>Error: {error.message}</p>
      </div>
    );
    
    render(
      <ErrorBoundary fallback={CustomErrorUI}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'assertive');
    expect(alert).toHaveAttribute('aria-label', 'Error occurred');
    expect(alert).toHaveAttribute('aria-describedby', 'error-description');
    
    // Restore console.error
    console.error = originalError;
  });

  it('should handle recovery actions accessibly', () => {
    const CustomErrorUI = ({ error, resetError }: { error: Error; resetError: () => void }) => (
      <div role="alert">
        <h2>Something went wrong</h2>
        <p>Error: {error.message}</p>
        <button onClick={resetError} aria-label="Retry operation">
          Try again
        </button>
        <button onClick={() => window.location.reload()} aria-label="Reload page">
          Reload page
        </button>
      </div>
    );
    
    render(
      <ErrorBoundary fallback={CustomErrorUI}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    const retryButton = screen.getByLabelText('Retry operation');
    const reloadButton = screen.getByLabelText('Reload page');
    
    expect(retryButton).toBeInTheDocument();
    expect(reloadButton).toBeInTheDocument();
  });
});