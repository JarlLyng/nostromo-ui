import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { HelperText } from '../helper-text';

const meta: Meta<typeof HelperText> = {
  title: 'Components/Form/HelperText',
  component: HelperText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success', 'warning'],
      description: 'The visual variant of the helper text',
    },
    children: {
      control: 'text',
      description: 'The helper text content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is helpful information about the field.',
    variant: 'default',
  },
};

export const Error: Story = {
  args: {
    children: 'This field is required.',
    variant: 'error',
  },
};

export const Success: Story = {
  args: {
    children: 'Password meets all requirements.',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'This action cannot be undone.',
    variant: 'warning',
  },
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <HelperText variant="default">
          We&apos;ll never share your email with anyone else.
        </HelperText>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          className="w-full px-3 py-2 border border-destructive rounded-md focus:outline-none focus:ring-2 focus:ring-destructive"
        />
        <HelperText variant="error">
          Password must be at least 8 characters long.
        </HelperText>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="confirm-password" className="text-sm font-medium">
          Confirm Password
        </label>
        <input
          id="confirm-password"
          type="password"
          placeholder="Confirm your password"
          className="w-full px-3 py-2 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <HelperText variant="success">
          Passwords match!
        </HelperText>
      </div>
    </div>
  ),
};
