import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Toast, ToastProvider, useToastNotification } from '../toast';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

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
    </div>
  );
};

describe('Toast Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(
      <Toast
        title="Test Title"
        description="Test Description"
        variant="default"
        position="top-right"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', async () => {
    render(
      <Toast
        title="Test Title"
        description="Test Description"
        variant="default"
        position="top-right"
      />
    );
    
    // Wait for toast to be visible
    await screen.findByText('Test Title');
    
    // Check for close button accessibility
    const closeButton = screen.getByLabelText('Close notification');
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute('aria-label', 'Close notification');
  });

  it('should have accessible action button', async () => {
    render(
      <Toast
        title="Test Title"
        description="Test Description"
        action={{
          label: 'Action',
          onClick: () => {}
        }}
        position="top-right"
      />
    );
    
    // Wait for toast to be visible
    await screen.findByText('Test Title');
    
    const actionButton = screen.getByText('Action');
    expect(actionButton).toBeInTheDocument();
    expect(actionButton).toHaveAttribute('type', 'button');
  });

  it('should have proper focus management', async () => {
    render(
      <Toast
        title="Test Title"
        description="Test Description"
        position="top-right"
      />
    );
    
    // Wait for toast to be visible
    await screen.findByText('Test Title');
    
    const closeButton = screen.getByLabelText('Close notification');
    expect(closeButton).toBeInTheDocument();
    
    // Check that interactive elements are focusable
    expect(closeButton).toHaveAttribute('type', 'button');
  });

  it('should have proper contrast for different variants', async () => {
    const variants = ['default', 'success', 'error', 'warning', 'info'] as const;
    
    for (const variant of variants) {
      const { container } = render(
        <Toast
          title="Test Title"
          description="Test Description"
          variant={variant}
          position="top-right"
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should have accessible success toast', async () => {
    const { container } = render(
      <Toast
        title="Success"
        description="Operation completed successfully"
        variant="success"
        position="top-right"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible error toast', async () => {
    const { container } = render(
      <Toast
        title="Error"
        description="Something went wrong"
        variant="error"
        position="top-right"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible warning toast', async () => {
    const { container } = render(
      <Toast
        title="Warning"
        description="Please check your input"
        variant="warning"
        position="top-right"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible info toast', async () => {
    const { container } = render(
      <Toast
        title="Information"
        description="Here is some information"
        variant="info"
        position="top-right"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible toast with action', async () => {
    const { container } = render(
      <Toast
        title="Action Required"
        description="You have a new message"
        action={{
          label: 'View',
          onClick: () => {}
        }}
        position="top-right"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible toast without title', async () => {
    const { container } = render(
      <Toast
        description="This is a description-only toast"
        variant="default"
        position="top-right"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible toast without description', async () => {
    const { container } = render(
      <Toast
        title="Title Only"
        variant="success"
        position="top-right"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible toast with custom content', async () => {
    const { container } = render(
      <Toast
        title="Custom Content"
        position="top-right"
      >
        <div>
          <p>This is custom content inside the toast</p>
          <button>Custom Action</button>
        </div>
      </Toast>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible toast provider', async () => {
    const { container } = render(
      <TestWrapper>
        <ToastTestComponent />
      </TestWrapper>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper keyboard navigation', async () => {
    render(
      <Toast
        title="Test Title"
        description="Test Description"
        position="top-right"
      />
    );
    
    // Wait for toast to be visible
    await screen.findByText('Test Title');
    
    const closeButton = screen.getByLabelText('Close notification');
    expect(closeButton).toBeInTheDocument();
    
    // Check that button is keyboard accessible
    expect(closeButton).toHaveAttribute('type', 'button');
  });

  it('should have proper semantic structure', async () => {
    render(
      <Toast
        title="Test Title"
        description="Test Description"
        position="top-right"
      />
    );
    
    // Wait for toast to be visible
    await screen.findByText('Test Title');
    
    // Check that the toast has proper structure
    const toast = screen.getByText('Test Title').closest('div');
    expect(toast).toBeInTheDocument();
    
    // Check for title and description
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('should have accessible persistent toast', async () => {
    const { container } = render(
      <Toast
        title="Persistent Toast"
        description="This toast will not auto-dismiss"
        duration={0}
        position="top-right"
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible toast in different positions', async () => {
    const positions = [
      'top-left',
      'top-center', 
      'top-right',
      'bottom-left',
      'bottom-center',
      'bottom-right'
    ] as const;
    
    for (const position of positions) {
      const { container } = render(
        <Toast
          title="Test Title"
          description="Test Description"
          position={position}
        />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });
});
