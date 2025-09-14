import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile input component with label, helper text, and error states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'Input type',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text',
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Error state',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    error: true,
    helperText: 'Please enter a valid email address',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This is disabled',
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Input placeholder="Default input" />
      <Input label="With Label" placeholder="Enter text" />
      <Input 
        label="With Helper Text" 
        placeholder="Enter text" 
        helperText="This is helper text" 
      />
      <Input 
        label="With Error" 
        placeholder="Enter text" 
        error 
        helperText="This is an error message" 
      />
      <Input 
        label="Disabled" 
        placeholder="Disabled input" 
        disabled 
      />
    </div>
  ),
};
