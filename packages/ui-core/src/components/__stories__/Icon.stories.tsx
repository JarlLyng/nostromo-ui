import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from '../icon';
import { iconNames } from '../icon';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible icon component using Phosphor Icons with multiple sizes, weights, and colors.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'select',
      options: iconNames.slice(0, 50), // Show first 50 icons for performance
      description: 'The name of the icon to display',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'The size of the icon',
    },
    weight: {
      control: 'select',
      options: ['thin', 'light', 'regular', 'bold', 'fill', 'duotone'],
      description: 'The weight/style of the icon',
    },
    color: {
      control: 'select',
      options: ['current', 'primary', 'secondary', 'success', 'warning', 'error', 'muted'],
      description: 'The color of the icon',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    name: 'heart',
    size: 'md',
    weight: 'regular',
    color: 'current',
  },
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="heart" size="xs" />
      <Icon name="heart" size="sm" />
      <Icon name="heart" size="md" />
      <Icon name="heart" size="lg" />
      <Icon name="heart" size="xl" />
      <Icon name="heart" size="2xl" />
      <Icon name="heart" size="3xl" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different sizes available for icons.',
      },
    },
  },
};

// Weight variants
export const Weights: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="heart" weight="thin" />
      <Icon name="heart" weight="light" />
      <Icon name="heart" weight="regular" />
      <Icon name="heart" weight="bold" />
      <Icon name="heart" weight="fill" />
      <Icon name="heart" weight="duotone" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different weights/styles available for icons.',
      },
    },
  },
};

// Color variants
export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="heart" color="current" />
      <Icon name="heart" color="primary" />
      <Icon name="heart" color="secondary" />
      <Icon name="heart" color="success" />
      <Icon name="heart" color="warning" />
      <Icon name="heart" color="error" />
      <Icon name="heart" color="muted" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different colors available for icons.',
      },
    },
  },
};

// Navigation icons
export const Navigation: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-4">
      <Icon name="house" />
      <Icon name="user" />
      <Icon name="settings" />
      <Icon name="search" />
      <Icon name="menu" />
      <Icon name="x" />
      <Icon name="chevron-left" />
      <Icon name="chevron-right" />
      <Icon name="chevron-up" />
      <Icon name="chevron-down" />
      <Icon name="arrow-left" />
      <Icon name="arrow-right" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common navigation icons.',
      },
    },
  },
};

// Action icons
export const Actions: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-4">
      <Icon name="plus" />
      <Icon name="minus" />
      <Icon name="check" />
      <Icon name="x-icon" />
      <Icon name="trash" />
      <Icon name="edit" />
      <Icon name="copy" />
      <Icon name="download" />
      <Icon name="upload" />
      <Icon name="share" />
      <Icon name="heart" />
      <Icon name="star" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common action icons.',
      },
    },
  },
};

// Status icons
export const Status: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-4">
      <Icon name="check-circle" color="success" />
      <Icon name="x-circle" color="error" />
      <Icon name="warning" color="warning" />
      <Icon name="info" color="primary" />
      <Icon name="question" />
      <Icon name="lock" />
      <Icon name="lock-open" />
      <Icon name="eye" />
      <Icon name="eye-slash" />
      <Icon name="shield" />
      <Icon name="shield-check" />
      <Icon name="bell" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Status and feedback icons with appropriate colors.',
      },
    },
  },
};

// Nostromo themed icons
export const NostromoThemed: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-4">
      <Icon name="alien" />
      <Icon name="spaceship" />
      <Icon name="satellite" />
      <Icon name="telescope" />
      <Icon name="microscope" />
      <Icon name="atom" />
      <Icon name="flask" />
      <Icon name="beaker" />
      <Icon name="test-tube" />
      <Icon name="rocket" />
      <Icon name="planet" />
      <Icon name="crystal" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Nostromo-themed icons perfect for the UI library.',
      },
    },
  },
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [selectedIcon, setSelectedIcon] = React.useState('heart');
    const [selectedSize, setSelectedSize] = React.useState('md');
    const [selectedWeight, setSelectedWeight] = React.useState('regular');
    const [selectedColor, setSelectedColor] = React.useState('current');

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
          <Icon 
            name={selectedIcon as keyof typeof iconNames} 
            size={selectedSize as 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'}
            weight={selectedWeight as 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'}
            color={selectedColor as 'current' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'muted'}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Icon</label>
            <select 
              value={selectedIcon} 
              onChange={(e) => setSelectedIcon(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {iconNames.slice(0, 20).map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Size</label>
            <select 
              value={selectedSize} 
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="xs">XS</option>
              <option value="sm">SM</option>
              <option value="md">MD</option>
              <option value="lg">LG</option>
              <option value="xl">XL</option>
              <option value="2xl">2XL</option>
              <option value="3xl">3XL</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Weight</label>
            <select 
              value={selectedWeight} 
              onChange={(e) => setSelectedWeight(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="thin">Thin</option>
              <option value="light">Light</option>
              <option value="regular">Regular</option>
              <option value="bold">Bold</option>
              <option value="fill">Fill</option>
              <option value="duotone">Duotone</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Color</label>
            <select 
              value={selectedColor} 
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="current">Current</option>
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="muted">Muted</option>
            </select>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example to test different icon properties.',
      },
    },
  },
};
