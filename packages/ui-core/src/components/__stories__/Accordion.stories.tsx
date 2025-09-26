import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A collapsible content component with keyboard navigation and accessibility features.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled', 'ghost']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    type: {
      control: 'select',
      options: ['single', 'multiple']
    },
    collapsible: {
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Nostromo UI?</AccordionTrigger>
        <AccordionContent>
          Nostromo UI is an open-source UI library built with React, TypeScript, and Tailwind CSS. 
          It provides a comprehensive set of accessible components for building modern web applications.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-2">
        <AccordionTrigger>How do I install it?</AccordionTrigger>
        <AccordionContent>
          You can install Nostromo UI using npm, yarn, or pnpm:
          <pre className="mt-2 p-2 bg-gray-100 rounded text-sm">
            npm install @nostromo/ui-core
          </pre>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes! All components are built with accessibility in mind, following WCAG 2.1 AA guidelines 
          and including proper ARIA attributes, keyboard navigation, and screen reader support.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple">
      <AccordionItem value="item-1">
        <AccordionTrigger>Component Features</AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-2">
            <li>• Fully accessible</li>
            <li>• TypeScript support</li>
            <li>• Customizable themes</li>
            <li>• Tree-shakeable</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-2">
        <AccordionTrigger>Installation</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <p>Install the core package:</p>
            <pre className="p-2 bg-gray-100 rounded text-sm">
              npm install @nostromo/ui-core
            </pre>
          </div>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-3">
        <AccordionTrigger>Usage</AccordionTrigger>
        <AccordionContent>
          <p>Import and use components in your React application:</p>
          <pre className="mt-2 p-2 bg-gray-100 rounded text-sm">
{`import { Button } from '@nostromo/ui-core';

function App() {
  return <Button>Click me</Button>;
}`}
          </pre>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
};

export const Outlined: Story = {
  render: () => (
    <Accordion variant="outlined">
      <AccordionItem value="item-1">
        <AccordionTrigger>Outlined Style</AccordionTrigger>
        <AccordionContent>
          This accordion uses the outlined variant with a thicker border.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-2">
        <AccordionTrigger>Another Item</AccordionTrigger>
        <AccordionContent>
          The outlined variant provides a more prominent visual separation.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
};

export const Filled: Story = {
  render: () => (
    <Accordion variant="filled">
      <AccordionItem value="item-1">
        <AccordionTrigger>Filled Style</AccordionTrigger>
        <AccordionContent>
          This accordion uses the filled variant with a subtle background color.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-2">
        <AccordionTrigger>Another Item</AccordionTrigger>
        <AccordionContent>
          The filled variant provides a softer visual appearance.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
};

export const Ghost: Story = {
  render: () => (
    <Accordion variant="ghost">
      <AccordionItem value="item-1">
        <AccordionTrigger>Ghost Style</AccordionTrigger>
        <AccordionContent>
          This accordion uses the ghost variant with no borders or background.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-2">
        <AccordionTrigger>Another Item</AccordionTrigger>
        <AccordionContent>
          The ghost variant provides a minimal, clean appearance.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
};

export const Small: Story = {
  render: () => (
    <Accordion size="sm">
      <AccordionItem value="item-1">
        <AccordionTrigger>Small Size</AccordionTrigger>
        <AccordionContent>
          This accordion uses the small size variant with reduced padding and text size.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-2">
        <AccordionTrigger>Compact Design</AccordionTrigger>
        <AccordionContent>
          Perfect for dense layouts where space is at a premium.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
};

export const Large: Story = {
  render: () => (
    <Accordion size="lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>Large Size</AccordionTrigger>
        <AccordionContent>
          This accordion uses the large size variant with increased padding and text size.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-2">
        <AccordionTrigger>Spacious Design</AccordionTrigger>
        <AccordionContent>
          Great for touch interfaces and when you want to emphasize the content.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
};

export const Disabled: Story = {
  render: () => (
    <Accordion>
      <AccordionItem value="item-1">
        <AccordionTrigger>Enabled Item</AccordionTrigger>
        <AccordionContent>
          This item is enabled and can be opened.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled Item</AccordionTrigger>
        <AccordionContent>
          This item is disabled and cannot be opened.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-3">
        <AccordionTrigger>Another Enabled Item</AccordionTrigger>
        <AccordionContent>
          This item is also enabled.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
};

export const RichContent: Story = {
  render: () => (
    <Accordion>
      <AccordionItem value="item-1">
        <AccordionTrigger>Rich Content Example</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Component Features</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Fully accessible
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                TypeScript support
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Customizable themes
              </li>
            </ul>
            <div className="bg-blue-50 p-3 rounded">
              <p className="text-blue-800 text-sm">
                💡 Tip: Use keyboard navigation (Arrow keys, Enter, Space) to navigate between items.
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-2">
        <AccordionTrigger>Code Example</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">Here's how to use the Accordion component:</p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto">
{`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@nostromo/ui-core';

function FAQ() {
  return (
    <Accordion>
      <AccordionItem value="item-1">
        <AccordionTrigger>Question 1</AccordionTrigger>
        <AccordionContent>
          Answer 1
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`}
            </pre>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('item-1');
    
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button 
            onClick={() => setValue('item-1')}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
          >
            Open Item 1
          </button>
          <button 
            onClick={() => setValue('item-2')}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
          >
            Open Item 2
          </button>
          <button 
            onClick={() => setValue('')}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
          >
            Close All
          </button>
        </div>
        
        <Accordion value={value} onValueChange={setValue}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Controlled Item 1</AccordionTrigger>
            <AccordionContent>
              This item is controlled by external state.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>Controlled Item 2</AccordionTrigger>
            <AccordionContent>
              You can programmatically control which items are open.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }
};

export const InteractivePlayground: Story = {
  render: () => {
    const [selectedVariant, setSelectedVariant] = React.useState<'default' | 'outlined' | 'filled' | 'ghost'>('default');
    const [selectedSize, setSelectedSize] = React.useState<'sm' | 'md' | 'lg'>('md');
    const [selectedType, setSelectedType] = React.useState<'single' | 'multiple'>('single');
    const [collapsible, setCollapsible] = React.useState(true);

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
              <option value="outlined">Outlined</option>
              <option value="filled">Filled</option>
              <option value="ghost">Ghost</option>
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
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="single">Single</option>
              <option value="multiple">Multiple</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Collapsible</label>
            <input
              type="checkbox"
              checked={collapsible}
              onChange={(e) => setCollapsible(e.target.checked)}
              className="mt-1"
            />
          </div>
        </div>

        <Accordion
          variant={selectedVariant}
          size={selectedSize}
          type={selectedType}
          collapsible={collapsible}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>First Item</AccordionTrigger>
            <AccordionContent>
              This is the first accordion item with {selectedVariant} variant and {selectedSize} size.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>Second Item</AccordionTrigger>
            <AccordionContent>
              This is the second accordion item. Type is set to {selectedType}.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger>Third Item</AccordionTrigger>
            <AccordionContent>
              This is the third accordion item. Collapsible is {collapsible ? 'enabled' : 'disabled'}.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }
};
