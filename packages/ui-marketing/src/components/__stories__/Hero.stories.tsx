import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Hero } from '../hero';
import { Button } from '@jarllyng/ui-core';

const meta: Meta<typeof Hero> = {
  title: 'Components/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Hero component for landing pages with customizable layouts and call-to-action buttons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the hero section',
    },
    variant: {
      control: 'select',
      options: ['default', 'muted', 'accent'],
      description: 'Visual variant',
    },
    contentAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Content alignment',
    },
    titleSize: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Size of the title text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  args: {
    title: 'Welcome to Nostromo UI',
    subtitle: 'A comprehensive UI library built with React, TypeScript and Tailwind CSS',
    cta: (
      <div className="flex gap-4">
        <Button>Get Started</Button>
        <Button variant="outline">Learn More</Button>
      </div>
    ),
  },
};

export const WithLabel: Story = {
  args: {
    title: 'Build Amazing UIs',
    subtitle: 'Production-ready components with accessibility built-in',
    size: 'lg',
    variant: 'default',
    contentAlign: 'center',
    cta: <Button size="lg">Start Building</Button>,
  },
};

export const AccentVariant: Story = {
  args: {
    title: 'Accent Hero',
    subtitle: 'Hero with accent variant styling',
    size: 'lg',
    variant: 'accent',
    contentAlign: 'left',
    cta: <Button variant="outline">Learn More</Button>,
  },
};

export const LeftAligned: Story = {
  args: {
    title: 'Left Aligned Hero',
    subtitle: 'Content aligned to the left for a different look',
    contentAlign: 'left',
    cta: <Button>Get Started</Button>,
  },
};

export const SmallSize: Story = {
  args: {
    title: 'Small Hero',
    subtitle: 'Compact hero section for smaller spaces',
    size: 'sm',
    cta: <Button size="sm">Get Started</Button>,
  },
};

export const ExtraLarge: Story = {
  args: {
    title: 'Extra Large Hero',
    subtitle: 'Bold and impactful hero section',
    size: 'xl',
    titleSize: '2xl',
    cta: (
      <div className="flex gap-4">
        <Button size="lg">Get Started</Button>
        <Button variant="outline" size="lg">Learn More</Button>
      </div>
    ),
  },
};

