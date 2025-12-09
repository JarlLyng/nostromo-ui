import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast, ToastProvider, useToastNotification } from '../toast';
import { Button } from '../button';

// Wrapper component for stories (unused but kept for reference)
// const _ToastWrapper = ({ children }: { children: React.ReactNode }) => (
//   <ToastProvider>{children}</ToastProvider>
// );

const ToastDemo = () => {
  const toast = useToastNotification();

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={() => toast.success('Operation completed successfully!')}>
          Success Toast
        </Button>
        <Button onClick={() => toast.error('Something went wrong!')}>
          Error Toast
        </Button>
        <Button onClick={() => toast.warning('Please check your input!')}>
          Warning Toast
        </Button>
        <Button onClick={() => toast.info('Here is some information!')}>
          Info Toast
        </Button>
      </div>
      
      <div className="flex gap-2">
        <Button 
          onClick={() => toast.custom({
            title: 'Custom Toast',
            description: 'This is a custom toast with action',
            variant: 'default',
            action: {
              label: 'Undo',
              onClick: () => console.log('Undo clicked')
            }
          })}
        >
          Custom Toast
        </Button>
        
        <Button 
          onClick={() => toast.custom({
            title: 'Persistent Toast',
            description: 'This toast will not auto-dismiss',
            variant: 'info',
            duration: 0
          })}
        >
          Persistent Toast
        </Button>
      </div>
    </div>
  );
};

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible toast notification system with auto-dismiss, positioning, and accessibility features.'
      }
    }
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    )
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info']
    },
    position: {
      control: 'select',
      options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right']
    },
    duration: {
      control: { type: 'number', min: 0, max: 10000, step: 1000 }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    title: 'Default Toast',
    description: 'This is a default toast notification',
    variant: 'default',
    position: 'top-right'
  }
};

export const Success: Story = {
  args: {
    title: 'Success!',
    description: 'Your operation completed successfully',
    variant: 'success',
    position: 'top-right'
  }
};

export const Error: Story = {
  args: {
    title: 'Error',
    description: 'Something went wrong. Please try again.',
    variant: 'error',
    position: 'top-right'
  }
};

export const Warning: Story = {
  args: {
    title: 'Warning',
    description: 'Please check your input before proceeding.',
    variant: 'warning',
    position: 'top-right'
  }
};

export const Info: Story = {
  args: {
    title: 'Information',
    description: 'Here is some useful information for you.',
    variant: 'info',
    position: 'top-right'
  }
};

export const WithAction: Story = {
  args: {
    title: 'Action Required',
    description: 'You have a new message waiting.',
    variant: 'info',
    position: 'top-right',
    action: {
      label: 'View',
      onClick: () => console.log('Action clicked')
    }
  }
};

export const Persistent: Story = {
  args: {
    title: 'Persistent Toast',
    description: 'This toast will not auto-dismiss',
    variant: 'warning',
    position: 'top-right',
    duration: 0
  }
};

export const LongContent: Story = {
  args: {
    title: 'Long Content Toast',
    description: 'This is a toast with a very long description that might wrap to multiple lines and should still look good in the interface.',
    variant: 'info',
    position: 'top-right'
  }
};

export const TopLeft: Story = {
  args: {
    title: 'Top Left',
    description: 'Positioned at top left',
    variant: 'success',
    position: 'top-left'
  }
};

export const TopCenter: Story = {
  args: {
    title: 'Top Center',
    description: 'Positioned at top center',
    variant: 'info',
    position: 'top-center'
  }
};

export const BottomLeft: Story = {
  args: {
    title: 'Bottom Left',
    description: 'Positioned at bottom left',
    variant: 'warning',
    position: 'bottom-left'
  }
};

export const BottomCenter: Story = {
  args: {
    title: 'Bottom Center',
    description: 'Positioned at bottom center',
    variant: 'error',
    position: 'bottom-center'
  }
};

export const BottomRight: Story = {
  args: {
    title: 'Bottom Right',
    description: 'Positioned at bottom right',
    variant: 'success',
    position: 'bottom-right'
  }
};

export const InteractiveDemo: Story = {
  render: () => <ToastDemo />
};

export const MultipleToasts: Story = {
  render: () => {
    const MultipleToastDemo = () => {
      const toast = useToastNotification();

      const showMultiple = () => {
        toast.success('First toast');
        setTimeout(() => toast.info('Second toast'), 200);
        setTimeout(() => toast.warning('Third toast'), 400);
        setTimeout(() => toast.error('Fourth toast'), 600);
      };

      return (
        <div className="space-y-4">
          <Button onClick={showMultiple}>
            Show Multiple Toasts
          </Button>
          <p className="text-sm text-gray-600">
            Click the button to see multiple toasts stack up
          </p>
        </div>
      );
    };

    return <MultipleToastDemo />;
  }
};

export const CustomDuration: Story = {
  args: {
    title: 'Custom Duration',
    description: 'This toast will auto-dismiss in 2 seconds',
    variant: 'info',
    position: 'top-right',
    duration: 2000
  }
};

export const WithoutTitle: Story = {
  args: {
    description: 'This toast has no title, just a description',
    variant: 'default',
    position: 'top-right'
  }
};

export const WithoutDescription: Story = {
  args: {
    title: 'Title Only',
    variant: 'success',
    position: 'top-right'
  }
};

export const InteractivePlayground: Story = {
  render: () => {
    const PlaygroundDemo = () => {
      const toast = useToastNotification();
      const [selectedVariant, setSelectedVariant] = React.useState<'default' | 'success' | 'error' | 'warning' | 'info'>('default');
      const [selectedPosition, setSelectedPosition] = React.useState<'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'>('top-right');
      const [duration, setDuration] = React.useState(5000);
      const [title, setTitle] = React.useState('Toast Title');
      const [description, setDescription] = React.useState('Toast description goes here');

      const showToast = () => {
        toast.custom({
          title,
          description,
          variant: selectedVariant,
          position: selectedPosition,
          duration
        });
      };

      return (
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium mb-2">Variant</label>
            <select
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value as 'default' | 'destructive')}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="default">Default</option>
              <option value="success">Success</option>
              <option value="error">Error</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Position</label>
            <select
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value as 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center')}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="top-left">Top Left</option>
              <option value="top-center">Top Center</option>
              <option value="top-right">Top Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="bottom-center">Bottom Center</option>
              <option value="bottom-right">Bottom Right</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Duration (ms)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2"
              min="0"
              step="1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows={3}
            />
          </div>

          <Button onClick={showToast} className="w-full">
            Show Toast
          </Button>
        </div>
      );
    };

    return <PlaygroundDemo />;
  }
};
