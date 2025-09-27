import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from '../tooltip';
import { Button } from '../button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible tooltip component with positioning, triggers, and accessibility features.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'light', 'dark', 'success', 'warning', 'error', 'info']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    placement: {
      control: 'select',
      options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'focus', 'manual']
    },
    delayDuration: {
      control: { type: 'number', min: 0, max: 2000, step: 100 }
    },
    skipDelayDuration: {
      control: { type: 'number', min: 0, max: 1000, step: 100 }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'This is a default tooltip',
    trigger: 'hover',
    placement: 'top'
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  )
};

export const Light: Story = {
  args: {
    content: 'This is a light tooltip',
    variant: 'light',
    trigger: 'hover',
    placement: 'top'
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  )
};

export const Success: Story = {
  args: {
    content: 'Success message',
    variant: 'success',
    trigger: 'hover',
    placement: 'top'
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Success tooltip</Button>
    </Tooltip>
  )
};

export const Warning: Story = {
  args: {
    content: 'Warning message',
    variant: 'warning',
    trigger: 'hover',
    placement: 'top'
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Warning tooltip</Button>
    </Tooltip>
  )
};

export const Error: Story = {
  args: {
    content: 'Error message',
    variant: 'error',
    trigger: 'hover',
    placement: 'top'
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Error tooltip</Button>
    </Tooltip>
  )
};

export const Info: Story = {
  args: {
    content: 'Information message',
    variant: 'info',
    trigger: 'hover',
    placement: 'top'
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Info tooltip</Button>
    </Tooltip>
  )
};

export const Small: Story = {
  args: {
    content: 'Small tooltip',
    size: 'sm',
    trigger: 'hover',
    placement: 'top'
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Small tooltip</Button>
    </Tooltip>
  )
};

export const Large: Story = {
  args: {
    content: 'Large tooltip with more content',
    size: 'lg',
    trigger: 'hover',
    placement: 'top'
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Large tooltip</Button>
    </Tooltip>
  )
};

export const ClickTrigger: Story = {
  args: {
    content: 'Click to toggle tooltip',
    trigger: 'click',
    placement: 'top'
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Click me</Button>
    </Tooltip>
  )
};

export const FocusTrigger: Story = {
  args: {
    content: 'Focus to show tooltip',
    trigger: 'focus',
    placement: 'top'
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Focus me</Button>
    </Tooltip>
  )
};

export const TopPlacement: Story = {
  args: {
    content: 'Tooltip on top',
    placement: 'top',
    trigger: 'hover'
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Top tooltip</Button>
    </Tooltip>
  )
};

export const BottomPlacement: Story = {
  args: {
    content: 'Tooltip on bottom',
    placement: 'bottom',
    trigger: 'hover'
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Bottom tooltip</Button>
    </Tooltip>
  )
};

export const LeftPlacement: Story = {
  args: {
    content: 'Tooltip on left',
    placement: 'left',
    trigger: 'hover'
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Left tooltip</Button>
    </Tooltip>
  )
};

export const RightPlacement: Story = {
  args: {
    content: 'Tooltip on right',
    placement: 'right',
    trigger: 'hover'
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Right tooltip</Button>
    </Tooltip>
  )
};

export const LongContent: Story = {
  args: {
    content: 'This is a very long tooltip content that should wrap to multiple lines and still look good in the interface.',
    trigger: 'hover',
    placement: 'top'
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Long content tooltip</Button>
    </Tooltip>
  )
};

export const CustomDelay: Story = {
  args: {
    content: 'Tooltip with custom delay',
    trigger: 'hover',
    placement: 'top',
    delayDuration: 1000,
    skipDelayDuration: 500
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Custom delay tooltip</Button>
    </Tooltip>
  )
};

export const Disabled: Story = {
  args: {
    content: 'This tooltip is disabled',
    trigger: 'hover',
    placement: 'top',
    disabled: true
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Disabled tooltip</Button>
    </Tooltip>
  )
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => setOpen(!open)}>
            Toggle Tooltip
          </Button>
          <Button onClick={() => setOpen(false)}>
            Close Tooltip
          </Button>
        </div>
        
        <Tooltip
          content="This is a controlled tooltip"
          trigger="manual"
          open={open}
          onOpenChange={setOpen}
          placement="top"
        >
          <Button>Controlled tooltip</Button>
        </Tooltip>
      </div>
    );
  }
};

export const MultipleTooltips: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="First tooltip" placement="top">
        <Button>First</Button>
      </Tooltip>
      
      <Tooltip content="Second tooltip" placement="bottom">
        <Button>Second</Button>
      </Tooltip>
      
      <Tooltip content="Third tooltip" placement="left">
        <Button>Third</Button>
      </Tooltip>
      
      <Tooltip content="Fourth tooltip" placement="right">
        <Button>Fourth</Button>
      </Tooltip>
    </div>
  )
};

export const RichContent: Story = {
  args: {
    content: (
      <div className="space-y-2">
        <div className="font-semibold">Rich Content</div>
        <div className="text-sm opacity-90">
          This tooltip contains rich content with multiple elements.
        </div>
        <div className="flex gap-2">
          <button className="text-xs bg-white/20 px-2 py-1 rounded">
            Action 1
          </button>
          <button className="text-xs bg-white/20 px-2 py-1 rounded">
            Action 2
          </button>
        </div>
      </div>
    ),
    trigger: 'hover',
    placement: 'top',
    size: 'lg'
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Rich content tooltip</Button>
    </Tooltip>
  )
};

export const InteractivePlayground: Story = {
  render: () => {
    const [selectedVariant, setSelectedVariant] = React.useState<'default' | 'light' | 'dark' | 'success' | 'warning' | 'error' | 'info'>('default');
    const [selectedSize, setSelectedSize] = React.useState<'sm' | 'md' | 'lg'>('md');
    const [selectedPlacement, setSelectedPlacement] = React.useState<'top' | 'bottom' | 'left' | 'right'>('top');
    const [selectedTrigger, setSelectedTrigger] = React.useState<'hover' | 'click' | 'focus'>('hover');
    const [delayDuration, setDelayDuration] = React.useState(700);
    const [skipDelayDuration, setSkipDelayDuration] = React.useState(300);

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <div>
            <label className="block text-sm font-medium mb-2">Variant</label>
            <select
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value as any)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="default">Default</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="info">Info</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Size</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value as any)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Placement</label>
            <select
              value={selectedPlacement}
              onChange={(e) => setSelectedPlacement(e.target.value as any)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Trigger</label>
            <select
              value={selectedTrigger}
              onChange={(e) => setSelectedTrigger(e.target.value as any)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="hover">Hover</option>
              <option value="click">Click</option>
              <option value="focus">Focus</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Delay Duration (ms)</label>
            <input
              type="number"
              value={delayDuration}
              onChange={(e) => setDelayDuration(Number(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2"
              min="0"
              step="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Skip Delay Duration (ms)</label>
            <input
              type="number"
              value={skipDelayDuration}
              onChange={(e) => setSkipDelayDuration(Number(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-2"
              min="0"
              step="100"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Tooltip
            content={`${selectedVariant} ${selectedSize} tooltip on ${selectedPlacement}`}
            variant={selectedVariant}
            size={selectedSize}
            placement={selectedPlacement}
            trigger={selectedTrigger}
            delayDuration={delayDuration}
            skipDelayDuration={skipDelayDuration}
          >
            <Button>
              Interactive Tooltip
            </Button>
          </Tooltip>
        </div>
      </div>
    );
  }
};
