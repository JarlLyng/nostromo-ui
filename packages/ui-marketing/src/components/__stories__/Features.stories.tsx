import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Features } from '../features';
import { Icon } from '@nostromo/ui-core';

const sampleFeatures = [
  {
    id: '1',
    title: 'TypeScript First',
    description: 'Full TypeScript support with strict type checking',
    icon: <Icon name="Code" className="w-6 h-6" />,
    iconVariant: 'default' as const,
  },
  {
    id: '2',
    title: 'Accessible',
    description: 'WCAG 2.1 AA compliant components out of the box',
    icon: <Icon name="Accessibility" className="w-6 h-6" />,
    iconVariant: 'success' as const,
  },
  {
    id: '3',
    title: 'Customizable',
    description: 'CSS variables and Tailwind for easy theming',
    icon: <Icon name="Palette" className="w-6 h-6" />,
    iconVariant: 'accent' as const,
  },
];

const meta: Meta<typeof Features> = {
  title: 'Components/Features',
  component: Features,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Feature showcase sections for landing pages with icons and descriptions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'accent'],
      description: 'Visual variant',
    },
    columns: {
      control: 'select',
      options: [1, 2, 3, 4],
      description: 'Number of columns in grid',
    },
    cardVariant: {
      control: 'select',
      options: ['default', 'accent', 'muted'],
      description: 'Card variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Features>;

export const Default: Story = {
  args: {
    title: 'Why Choose Nostromo UI?',
    subtitle: 'Built with modern web standards and best practices',
    features: sampleFeatures,
    columns: 3,
  },
};

export const TwoColumns: Story = {
  args: {
    title: 'Key Features',
    subtitle: 'Everything you need to build amazing products',
    features: sampleFeatures,
    columns: 2,
  },
};

export const FourColumns: Story = {
  args: {
    title: 'Our Features',
    features: [
      ...sampleFeatures,
      {
        id: '4',
        title: 'Well Documented',
        description: 'Comprehensive documentation and examples',
        icon: <Icon name="Book" className="w-6 h-6" />,
        iconVariant: 'default' as const,
      },
    ],
    columns: 4,
  },
};

export const AccentVariant: Story = {
  args: {
    title: 'Features',
    variant: 'accent',
    features: sampleFeatures,
    columns: 3,
  },
};

export const MutedVariant: Story = {
  args: {
    title: 'Features',
    variant: 'muted',
    features: sampleFeatures,
    columns: 3,
  },
};

