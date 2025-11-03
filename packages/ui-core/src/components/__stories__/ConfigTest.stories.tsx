import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Debug/ConfigTest',
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

export const Litmus: Story = {
  render: () => (
    <div className="__tw-config-loaded bg-brand-500 text-white p-3 rounded-md">
      config + brand OK
    </div>
  ),
};

export const ArbitraryValue: Story = {
  render: () => (
    <div className="bg-[hsl(var(--color-brand-500))] text-white p-3 rounded-md">
      arb OK
    </div>
  ),
};

export const ConfigLoaded: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="__tw-config-loaded p-4 border">
        <h3 className="text-lg font-semibold">Config Test</h3>
        <p>Hvis du ser lime-grøn outline, er Tailwind config aktiv</p>
      </div>
      
      <div className="bg-brand-500 text-white p-4 rounded">
        <h3 className="text-lg font-semibold">Brand Color Test</h3>
        <p>Hvis du ser lilla baggrund, virker preset og brand farver</p>
      </div>
      
      <div className="bg-[hsl(var(--color-brand-500))] text-white p-4 rounded">
        <h3 className="text-lg font-semibold">CSS Variable Test</h3>
        <p>Hvis du ser lilla baggrund, virker CSS variabler</p>
      </div>
    </div>
  ),
};
