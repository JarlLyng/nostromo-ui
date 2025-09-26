import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorMessage } from '../error-message';

const meta: Meta<typeof ErrorMessage> = {
  title: 'Components/Form/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'inline'],
      description: 'The visual variant of the error message',
    },
    children: {
      control: 'text',
      description: 'The error message content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This field is required.',
    variant: 'default',
  },
};

export const Inline: Story = {
  args: {
    children: 'Invalid email format',
    variant: 'inline',
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Something went wrong. Please try again.',
    variant: 'default',
  },
  render: (args) => (
    <ErrorMessage {...args}>
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
      {args.children}
    </ErrorMessage>
  ),
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
          className="w-full px-3 py-2 border border-destructive rounded-md focus:outline-none focus:ring-2 focus:ring-destructive"
          defaultValue="invalid-email"
        />
        <ErrorMessage variant="default">
          Please enter a valid email address.
        </ErrorMessage>
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
        <ErrorMessage variant="inline">
          Password must be at least 8 characters.
        </ErrorMessage>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="username" className="text-sm font-medium">
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          className="w-full px-3 py-2 border border-destructive rounded-md focus:outline-none focus:ring-2 focus:ring-destructive"
          defaultValue="admin"
        />
        <ErrorMessage variant="default">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          Username is already taken.
        </ErrorMessage>
      </div>
    </div>
  ),
};
