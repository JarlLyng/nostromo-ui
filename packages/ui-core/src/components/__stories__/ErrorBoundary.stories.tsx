import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorBoundary } from '../error-boundary';

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('This is a test error for ErrorBoundary');
  }
  return <div>No error - component rendered successfully</div>;
};

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Components/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ErrorBoundary component that catches JavaScript errors in child components and displays a fallback UI.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Child components to wrap',
    },
    fallback: {
      control: false,
      description: 'Custom fallback component',
    },
    onError: {
      control: false,
      description: 'Error handler callback',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorBoundary>;

export const Default: Story = {
  render: () => (
    <ErrorBoundary>
      <ThrowError shouldThrow={false} />
    </ErrorBoundary>
  ),
};

export const WithError: Story = {
  render: () => (
    <ErrorBoundary>
      <ThrowError shouldThrow={true} />
    </ErrorBoundary>
  ),
};

export const CustomFallback: Story = {
  render: () => {
    const CustomFallback = ({ error, resetError }: { error: Error | undefined; resetError: () => void }) => (
      <div className="p-4 border border-red-500 rounded-lg bg-red-50 dark:bg-red-900/20">
        <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">Custom Error Fallback</h3>
        <p className="text-red-700 dark:text-red-300 mb-4">{error?.message || 'An error occurred'}</p>
        <button
          onClick={resetError}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Reset
        </button>
      </div>
    );

    return (
      <ErrorBoundary fallback={CustomFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
  },
};

export const WithErrorHandler: Story = {
  render: () => (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        console.log('Error caught:', error);
        console.log('Error info:', errorInfo);
      }}
    >
      <ThrowError shouldThrow={true} />
    </ErrorBoundary>
  ),
};

