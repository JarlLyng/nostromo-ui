import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from '../button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants and sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'destructive', 'outline', 'link'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'icon'],
      description: 'The size of the button',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the button is in a loading state',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
    },
    children: {
      control: { type: 'text' },
      description: 'The content of the button',
    },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: 'Button',
  },
};

// Variants
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link Button',
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const Icon: Story = {
  args: {
    size: 'icon',
    children: '⚙️',
  },
};

// States
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

// Interactive examples
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button variants displayed together.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">⚙️</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button sizes displayed together.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button>
        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Item
      </Button>
      <Button variant="outline">
        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Delete
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with icons for better visual context.',
      },
    },
  },
};

export const Accessibility: Story = {
  render: () => (
    <div className="space-y-4">
      <Button aria-label="Close dialog">×</Button>
      <Button title="Click to submit the form">Submit</Button>
      <div>
        <Button aria-describedby="button-help">Submit</Button>
        <div id="button-help" className="text-sm text-gray-600">
          This will submit the form
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with proper accessibility attributes.',
      },
    },
  },
};
