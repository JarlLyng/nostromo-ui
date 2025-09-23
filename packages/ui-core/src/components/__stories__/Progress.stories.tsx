import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress, CircularProgress } from '../progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible progress component with sci-fi styling and multiple variants. Perfect for loading states, system status, and Nostromo-themed interfaces.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The current progress value',
    },
    max: {
      control: { type: 'number' },
      description: 'The maximum progress value',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'The size of the progress bar',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'energy', 'health', 'alien'],
      description: 'The visual variant of the progress bar',
    },
    showLabel: {
      control: 'boolean',
      description: 'Whether to show the progress label',
    },
    label: {
      control: 'text',
      description: 'Custom label for the progress bar',
    },
    animated: {
      control: 'boolean',
      description: 'Whether to animate the progress bar',
    },
    glow: {
      control: 'boolean',
      description: 'Whether to add a glow effect (sci-fi styling)',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether to show an indeterminate progress state',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Progress Stories
export const Default: Story = {
  args: {
    value: 50,
    showLabel: true,
  },
};

export const WithLabel: Story = {
  args: {
    value: 75,
    showLabel: true,
    label: 'System Status',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <Progress value={60} size="sm" showLabel label="Small" />
      <Progress value={60} size="md" showLabel label="Medium" />
      <Progress value={60} size="lg" showLabel label="Large" />
      <Progress value={60} size="xl" showLabel label="Extra Large" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <Progress value={80} variant="default" showLabel label="Default" />
      <Progress value={80} variant="primary" showLabel label="Primary" />
      <Progress value={80} variant="success" showLabel label="Success" />
      <Progress value={80} variant="warning" showLabel label="Warning" />
      <Progress value={80} variant="error" showLabel label="Error" />
    </div>
  ),
};

export const SciFiVariants: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <Progress value={85} variant="energy" showLabel label="Energy Core" glow />
      <Progress value={92} variant="health" showLabel label="Life Support" glow />
      <Progress value={67} variant="alien" showLabel label="Xenomorph Detection" glow />
    </div>
  ),
};

export const Animated: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <Progress value={75} variant="energy" animated glow showLabel label="Charging" />
      <Progress value={90} variant="health" animated glow showLabel label="Healing" />
      <Progress value={45} variant="alien" animated glow showLabel label="Scanning" />
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <Progress value={0} indeterminate variant="primary" showLabel label="Loading..." />
      <Progress value={0} indeterminate variant="energy" animated glow showLabel label="Processing..." />
    </div>
  ),
};

// Circular Progress Stories
export const CircularDefault: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <CircularProgress value={50} showLabel />
      <CircularProgress value={75} showLabel label="75%" />
    </div>
  ),
};

export const CircularSizes: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <CircularProgress value={60} size="sm" showLabel />
      <CircularProgress value={60} size="md" showLabel />
      <CircularProgress value={60} size="lg" showLabel />
      <CircularProgress value={60} size="xl" showLabel />
    </div>
  ),
};

export const CircularVariants: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <CircularProgress value={80} variant="primary" showLabel />
      <CircularProgress value={80} variant="success" showLabel />
      <CircularProgress value={80} variant="warning" showLabel />
      <CircularProgress value={80} variant="error" showLabel />
    </div>
  ),
};

export const CircularSciFi: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <CircularProgress value={85} variant="energy" showLabel glow />
      <CircularProgress value={92} variant="health" showLabel glow />
      <CircularProgress value={67} variant="alien" showLabel glow />
    </div>
  ),
};

export const CircularAnimated: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <CircularProgress value={75} variant="energy" animated glow showLabel />
      <CircularProgress value={90} variant="health" animated glow showLabel />
      <CircularProgress value={45} variant="alien" animated glow showLabel />
    </div>
  ),
};

// Nostromo System Status Example
export const NostromoSystemStatus: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-neutral-900 rounded-lg border border-neutral-700">
      <h3 className="text-lg font-semibold text-white">USCSS Nostromo - System Status</h3>
      <div className="space-y-4">
        <Progress 
          value={95} 
          variant="energy" 
          showLabel 
          label="Main Power" 
          glow 
          animated 
        />
        <Progress 
          value={88} 
          variant="health" 
          showLabel 
          label="Life Support" 
          glow 
        />
        <Progress 
          value={72} 
          variant="primary" 
          showLabel 
          label="Navigation" 
        />
        <Progress 
          value={45} 
          variant="warning" 
          showLabel 
          label="Fuel Reserves" 
        />
        <Progress 
          value={12} 
          variant="alien" 
          showLabel 
          label="Xenomorph Activity" 
          glow 
          animated 
        />
      </div>
    </div>
  ),
};

// Interactive Demo
export const InteractiveDemo: Story = {
  render: () => {
    const [value, setValue] = React.useState(50);
    const [variant, setVariant] = React.useState<'default' | 'primary' | 'success' | 'warning' | 'error' | 'energy' | 'health' | 'alien'>('primary');
    const [glow, setGlow] = React.useState(false);
    const [animated, setAnimated] = React.useState(false);

    return (
      <div className="space-y-6 p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Progress Value: {value}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Variant</label>
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value as typeof variant)}
              className="w-full p-2 border rounded"
            >
              <option value="default">Default</option>
              <option value="primary">Primary</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="energy">Energy</option>
              <option value="health">Health</option>
              <option value="alien">Alien</option>
            </select>
          </div>
          
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={glow}
                onChange={(e) => setGlow(e.target.checked)}
                className="mr-2"
              />
              Glow Effect
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={animated}
                onChange={(e) => setAnimated(e.target.checked)}
                className="mr-2"
              />
              Animated
            </label>
          </div>
        </div>
        
        <div className="space-y-4">
          <Progress
            value={value}
            variant={variant}
            showLabel
            label="Interactive Progress"
            glow={glow}
            animated={animated}
          />
          <div className="flex justify-center">
            <CircularProgress
              value={value}
              variant={variant}
              showLabel
              glow={glow}
              animated={animated}
            />
          </div>
        </div>
      </div>
    );
  },
};
