import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Toast, ToastProvider, useToastNotification } from '../toast';

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ToastProvider>{children}</ToastProvider>
);

const ToastTestComponent = () => {
  const toast = useToastNotification();

  return (
    <div>
      <button onClick={() => toast.success('Success message')}>
        Show Success
      </button>
      <button onClick={() => toast.error('Error message')}>
        Show Error
      </button>
      <button onClick={() => toast.warning('Warning message')}>
        Show Warning
      </button>
      <button onClick={() => toast.info('Info message')}>
        Show Info
      </button>
      <button onClick={() => toast.custom({
        title: 'Custom Toast',
        description: 'Custom message',
        variant: 'default'
      })}>
        Show Custom
      </button>
      <button onClick={() => toast.clear()}>
        Clear All
      </button>
    </div>
  );
};

describe('Toast', () => {
  it('renders toast with title and description', () => {
    render(
      <Toast
        title="Test Title"
        description="Test Description"
        variant="default"
        position="top-right"
        appearDelay={0}
      />
    );
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders toast without title', () => {
    render(
      <Toast
        description="Test Description"
        variant="default"
        position="top-right"
        appearDelay={0}
      />
    );
    
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders toast without description', () => {
    render(
      <Toast
        title="Test Title"
        variant="default"
        position="top-right"
        appearDelay={0}
      />
    );
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(
      <Toast
        title="Test"
        variant="success"
        position="top-right"
        appearDelay={0}
      />
    );
    const title1 = screen.getByText('Test');
    const toastRoot1 = title1.closest('[data-visible][data-leaving]')!;
    expect(toastRoot1).toHaveClass('border-green-200', 'bg-green-50', 'text-green-900');

    rerender(
      <Toast
        title="Test"
        variant="error"
        position="top-right"
        appearDelay={0}
      />
    );
    const title2 = screen.getByText('Test');
    const toastRoot2 = title2.closest('[data-visible][data-leaving]')!;
    expect(toastRoot2).toHaveClass('border-red-200', 'bg-red-50', 'text-red-900');

    rerender(
      <Toast
        title="Test"
        variant="warning"
        position="top-right"
        appearDelay={0}
      />
    );
    const title3 = screen.getByText('Test');
    const toastRoot3 = title3.closest('[data-visible][data-leaving]')!;
    expect(toastRoot3).toHaveClass('border-yellow-200', 'bg-yellow-50', 'text-yellow-900');

    rerender(
      <Toast
        title="Test"
        variant="info"
        position="top-right"
        appearDelay={0}
      />
    );
    const title4 = screen.getByText('Test');
    const toastRoot4 = title4.closest('[data-visible][data-leaving]')!;
    expect(toastRoot4).toHaveClass('border-blue-200', 'bg-blue-50', 'text-blue-900');
  });

  it('applies correct position classes', () => {
    const { rerender } = render(
      <Toast
        title="Test"
        position="top-left"
        appearDelay={0}
      />
    );
    const title1 = screen.getByText('Test');
    const toastRoot1 = title1.closest('[data-visible][data-leaving]')!;
    expect(toastRoot1).toHaveClass('fixed', 'top-4', 'left-4');

    rerender(
      <Toast
        title="Test"
        position="top-center"
        appearDelay={0}
      />
    );
    const title2 = screen.getByText('Test');
    const toastRoot2 = title2.closest('[data-visible][data-leaving]')!;
    expect(toastRoot2).toHaveClass('fixed', 'top-4', 'left-1/2', '-translate-x-1/2');

    rerender(
      <Toast
        title="Test"
        position="bottom-right"
        appearDelay={0}
      />
    );
    const title3 = screen.getByText('Test');
    const toastRoot3 = title3.closest('[data-visible][data-leaving]')!;
    expect(toastRoot3).toHaveClass('fixed', 'bottom-4', 'right-4');
  });

  it('renders action button when provided', () => {
    const actionClick = vi.fn();
    render(
      <Toast
        title="Test"
        action={{
          label: 'Action',
          onClick: actionClick
        }}
        position="top-right"
        appearDelay={0}
      />
    );
    
    const actionButton = screen.getByText('Action');
    expect(actionButton).toBeInTheDocument();
    
    fireEvent.click(actionButton);
    expect(actionClick).toHaveBeenCalled();
  });

  it('renders close button', () => {
    render(
      <Toast
        title="Test"
        position="top-right"
        appearDelay={0}
      />
    );
    
    const closeButton = screen.getByLabelText('Close notification');
    expect(closeButton).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    render(
      <Toast
        title="Test"
        onClose={onClose}
        position="top-right"
        appearDelay={0}
        animationMs={0}
      />
    );
    
    const closeButton = screen.getByLabelText('Close notification');
    fireEvent.click(closeButton);
    
    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('auto-closes after duration', async () => {
    const onClose = vi.fn();
    render(
      <Toast
        title="Test"
        duration={100}
        onClose={onClose}
        position="top-right"
        appearDelay={0}
        animationMs={0}
      />
    );
    
    expect(screen.getByText('Test')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    }, { timeout: 200 });
  });

  it('does not auto-close when duration is 0', async () => {
    const onClose = vi.fn();
    render(
      <Toast
        title="Test"
        duration={0}
        onClose={onClose}
        position="top-right"
        appearDelay={0}
      />
    );
    
    expect(screen.getByText('Test')).toBeInTheDocument();
    
    // Wait a bit to ensure it doesn't auto-close
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders correct icons for each variant', () => {
    const { rerender } = render(
      <Toast
        title="Success"
        variant="success"
        position="top-right"
        appearDelay={0}
      />
    );
    const title1 = screen.getByText('Success');
    const toastRoot1 = title1.closest('[data-visible][data-leaving]')!;
    const icon1 = toastRoot1.querySelector('svg')!;
    expect(icon1).toHaveClass('text-green-500');

    rerender(
      <Toast
        title="Error"
        variant="error"
        position="top-right"
        appearDelay={0}
      />
    );
    const title2 = screen.getByText('Error');
    const toastRoot2 = title2.closest('[data-visible][data-leaving]')!;
    const icon2 = toastRoot2.querySelector('svg')!;
    expect(icon2).toHaveClass('text-red-500');

    rerender(
      <Toast
        title="Warning"
        variant="warning"
        position="top-right"
        appearDelay={0}
      />
    );
    const title3 = screen.getByText('Warning');
    const toastRoot3 = title3.closest('[data-visible][data-leaving]')!;
    const icon3 = toastRoot3.querySelector('svg')!;
    expect(icon3).toHaveClass('text-yellow-500');

    rerender(
      <Toast
        title="Info"
        variant="info"
        position="top-right"
        appearDelay={0}
      />
    );
    const title4 = screen.getByText('Info');
    const toastRoot4 = title4.closest('[data-visible][data-leaving]')!;
    const icon4 = toastRoot4.querySelector('svg')!;
    expect(icon4).toHaveClass('text-blue-500');
  });

  it('applies custom className', () => {
    render(
      <Toast
        title="Test"
        className="custom-toast"
        position="top-right"
        appearDelay={0}
      />
    );
    
    const title = screen.getByText('Test');
    const toastRoot = title.closest('[data-visible][data-leaving]')!;
    expect(toastRoot).toHaveClass('custom-toast');
  });

  it('renders children when provided', () => {
    render(
      <Toast
        title="Test"
        position="top-right"
        appearDelay={0}
      >
        <div data-testid="custom-content">Custom content</div>
      </Toast>
    );
    
    expect(screen.getByTestId('custom-content')).toBeInTheDocument();
  });
});

describe('ToastProvider and useToastNotification', () => {
  it('provides toast context', () => {
    render(
      <TestWrapper>
        <ToastTestComponent />
      </TestWrapper>
    );
    
    expect(screen.getByText('Show Success')).toBeInTheDocument();
  });

  it('adds and removes toasts', async () => {
    render(
      <TestWrapper>
        <ToastTestComponent />
      </TestWrapper>
    );
    
    const successButton = screen.getByText('Show Success');
    fireEvent.click(successButton);
    
    await waitFor(() => {
      expect(screen.getByText('Success message')).toBeInTheDocument();
    });
  });

  it('shows multiple toasts', async () => {
    render(
      <TestWrapper>
        <ToastTestComponent />
      </TestWrapper>
    );
    
    fireEvent.click(screen.getByText('Show Success'));
    fireEvent.click(screen.getByText('Show Error'));
    
    await waitFor(() => {
      expect(screen.getByText('Success message')).toBeInTheDocument();
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });
  });

  it('clears all toasts', async () => {
    render(
      <TestWrapper>
        <ToastTestComponent />
      </TestWrapper>
    );
    
    fireEvent.click(screen.getByText('Show Success'));
    fireEvent.click(screen.getByText('Show Error'));
    
    await waitFor(() => {
      expect(screen.getByText('Success message')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Clear All'));
    
    await waitFor(() => {
      expect(screen.queryByText('Success message')).not.toBeInTheDocument();
      expect(screen.queryByText('Error message')).not.toBeInTheDocument();
    });
  });

  it('provides convenience methods', async () => {
    render(
      <TestWrapper>
        <ToastTestComponent />
      </TestWrapper>
    );
    
    fireEvent.click(screen.getByText('Show Success'));
    await waitFor(() => {
      expect(screen.getByText('Success message')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Show Error'));
    await waitFor(() => {
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Show Warning'));
    await waitFor(() => {
      expect(screen.getByText('Warning message')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Show Info'));
    await waitFor(() => {
      expect(screen.getByText('Info message')).toBeInTheDocument();
    });
  });
});
