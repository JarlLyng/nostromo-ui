import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import { NButton } from '../button';

const meta: Meta<typeof NButton> = {
  title: 'Components/Vue/Button',
  component: NButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile Vue button component with multiple variants and sizes.',
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
    default: 'Button',
  },
};

// Variants
export const Primary: Story = {
  args: {
    variant: 'primary',
    default: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    default: 'Secondary Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    default: 'Ghost Button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    default: 'Delete',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    default: 'Outline Button',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    default: 'Link Button',
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: 'sm',
    default: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    default: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    default: 'Large Button',
  },
};

export const Icon: Story = {
  args: {
    size: 'icon',
    default: '⚙️',
  },
};

// States
export const Loading: Story = {
  args: {
    loading: true,
    default: 'Loading...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    default: 'Disabled Button',
  },
};

// Interactive examples
export const AllVariants: Story = {
  render: () => ({
    components: { NButton },
    template: `
      <div class="flex flex-wrap gap-4">
        <NButton variant="primary">Primary</NButton>
        <NButton variant="secondary">Secondary</NButton>
        <NButton variant="ghost">Ghost</NButton>
        <NButton variant="destructive">Destructive</NButton>
        <NButton variant="outline">Outline</NButton>
        <NButton variant="link">Link</NButton>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'All button variants displayed together.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => ({
    components: { NButton },
    template: `
      <div class="flex items-center gap-4">
        <NButton size="sm">Small</NButton>
        <NButton size="md">Medium</NButton>
        <NButton size="lg">Large</NButton>
        <NButton size="icon">⚙️</NButton>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'All button sizes displayed together.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => ({
    components: { NButton },
    template: `
      <div class="flex gap-4">
        <NButton>
          <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Item
        </NButton>
        <NButton variant="outline">
          <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </NButton>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with icons for better visual context.',
      },
    },
  },
};

export const Accessibility: Story = {
  render: () => ({
    components: { NButton },
    template: `
      <div class="space-y-4">
        <NButton aria-label="Close dialog">×</NButton>
        <NButton title="Click to submit the form">Submit</NButton>
        <div>
          <NButton aria-describedby="button-help">Submit</NButton>
          <div id="button-help" class="text-sm text-gray-600">
            This will submit the form
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with proper accessibility attributes.',
      },
    },
  },
};
