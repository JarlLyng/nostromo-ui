import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonButton, SkeletonCard, SkeletonTable, SkeletonList } from '../skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A loading placeholder component with animations and accessibility features.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'light', 'dark', 'primary', 'success', 'warning', 'error']
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']
    },
    shape: {
      control: 'select',
      options: ['rectangle', 'circle', 'square', 'pill']
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none']
    },
    loading: {
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    className: 'w-64 h-4'
  }
};

export const Circle: Story = {
  args: {
    shape: 'circle',
    size: 'lg',
    className: 'w-16 h-16'
  }
};

export const Square: Story = {
  args: {
    shape: 'square',
    size: 'lg',
    className: 'w-16 h-16'
  }
};

export const Pill: Story = {
  args: {
    shape: 'pill',
    size: 'lg',
    className: 'w-32 h-8'
  }
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    className: 'w-64 h-4'
  }
};

export const Success: Story = {
  args: {
    variant: 'success',
    className: 'w-64 h-4'
  }
};

export const Warning: Story = {
  args: 'warning',
  args: {
    variant: 'warning',
    className: 'w-64 h-4'
  }
};

export const Error: Story = {
  args: {
    variant: 'error',
    className: 'w-64 h-4'
  }
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Extra Small</h3>
        <Skeleton size="xs" className="w-32" />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Small</h3>
        <Skeleton size="sm" className="w-32" />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Medium</h3>
        <Skeleton size="md" className="w-32" />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Large</h3>
        <Skeleton size="lg" className="w-32" />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Extra Large</h3>
        <Skeleton size="xl" className="w-32" />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">2X Large</h3>
        <Skeleton size="2xl" className="w-32" />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">3X Large</h3>
        <Skeleton size="3xl" className="w-32" />
      </div>
    </div>
  )
};

export const Animations: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Pulse (Default)</h3>
        <Skeleton animation="pulse" className="w-64 h-4" />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Wave</h3>
        <Skeleton animation="wave" className="w-64 h-4" />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">None</h3>
        <Skeleton animation="none" className="w-64 h-4" />
      </div>
    </div>
  )
};

export const WithContent: Story = {
  render: () => (
    <Skeleton loading={false}>
      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900">Loaded Content</h3>
        <p className="text-blue-700">This content is shown when loading is false.</p>
      </div>
    </Skeleton>
  )
};

export const TextSkeleton: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Default Text (3 lines)</h3>
        <SkeletonText />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Custom Text (5 lines)</h3>
        <SkeletonText lines={5} lastLineWidth="50%" />
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Primary Variant</h3>
        <SkeletonText variant="primary" lines={4} />
      </div>
    </div>
  )
};

export const AvatarSkeleton: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <SkeletonAvatar size="xs" />
        <SkeletonAvatar size="sm" />
        <SkeletonAvatar size="md" />
        <SkeletonAvatar size="lg" />
        <SkeletonAvatar size="xl" />
        <SkeletonAvatar size="2xl" />
      </div>
      <div className="flex items-center space-x-4">
        <SkeletonAvatar variant="primary" />
        <SkeletonAvatar variant="success" />
        <SkeletonAvatar variant="warning" />
        <SkeletonAvatar variant="error" />
      </div>
    </div>
  )
};

export const ButtonSkeleton: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <SkeletonButton size="sm" />
        <SkeletonButton size="md" />
        <SkeletonButton size="lg" />
      </div>
      <div className="flex items-center space-x-4">
        <SkeletonButton variant="default" />
        <SkeletonButton variant="primary" />
        <SkeletonButton variant="secondary" />
        <SkeletonButton variant="outline" />
        <SkeletonButton variant="ghost" />
      </div>
    </div>
  )
};

export const CardSkeleton: Story = {
  render: () => (
    <div className="space-y-4">
      <SkeletonCard />
      <SkeletonCard showAvatar={false} />
      <SkeletonCard showActions={false} />
      <SkeletonCard showAvatar={false} showActions={false} />
    </div>
  )
};

export const TableSkeleton: Story = {
  render: () => (
    <div className="space-y-4">
      <SkeletonTable />
    </div>
  )
};

export const ListSkeleton: Story = {
  render: () => (
    <div className="space-y-4">
      <SkeletonList items={3} />
      <SkeletonList items={5} variant="primary" />
    </div>
  )
};

export const RealWorldExample: Story = {
  render: () => (
    <div className="max-w-2xl space-y-6">
      {/* User Profile Skeleton */}
      <div className="p-6 border border-gray-200 rounded-lg">
        <div className="flex items-center space-x-4 mb-4">
          <SkeletonAvatar size="lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <SkeletonText lines={3} />
      </div>

      {/* Article Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <SkeletonText lines={4} />
        <div className="flex space-x-2">
          <SkeletonButton size="sm" />
          <SkeletonButton size="sm" />
        </div>
      </div>

      {/* Dashboard Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  )
};

export const InteractivePlayground: Story = {
  render: () => {
    const [selectedVariant, setSelectedVariant] = React.useState<'default' | 'light' | 'dark' | 'primary' | 'success' | 'warning' | 'error'>('default');
    const [selectedSize, setSelectedSize] = React.useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'>('md');
    const [selectedShape, setSelectedShape] = React.useState<'rectangle' | 'circle' | 'square' | 'pill'>('rectangle');
    const [selectedAnimation, setSelectedAnimation] = React.useState<'pulse' | 'wave' | 'none'>('pulse');
    const [loading, setLoading] = React.useState(true);

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
              <option value="primary">Primary</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Size</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value as any)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="xs">Extra Small</option>
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
              <option value="xl">Extra Large</option>
              <option value="2xl">2X Large</option>
              <option value="3xl">3X Large</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Shape</label>
            <select
              value={selectedShape}
              onChange={(e) => setSelectedShape(e.target.value as any)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="rectangle">Rectangle</option>
              <option value="circle">Circle</option>
              <option value="square">Square</option>
              <option value="pill">Pill</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Animation</label>
            <select
              value={selectedAnimation}
              onChange={(e) => setSelectedAnimation(e.target.value as any)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="pulse">Pulse</option>
              <option value="wave">Wave</option>
              <option value="none">None</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={loading}
                onChange={(e) => setLoading(e.target.checked)}
              />
              <span className="text-sm font-medium">Loading</span>
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Preview</h3>
          <Skeleton
            variant={selectedVariant}
            size={selectedSize}
            shape={selectedShape}
            animation={selectedAnimation}
            loading={loading}
            className="w-64"
          />
        </div>
      </div>
    );
  }
};
