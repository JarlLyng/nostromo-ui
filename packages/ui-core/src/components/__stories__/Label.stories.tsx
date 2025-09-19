import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '../label';

const meta: Meta<typeof Label> = {
  title: 'Components/Form/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'The label text',
    },
    htmlFor: {
      control: 'text',
      description: 'Associates the label with a form control',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Email address',
    htmlFor: 'email',
  },
};

export const Required: Story = {
  args: {
    children: 'Password',
    htmlFor: 'password',
  },
  render: (args) => (
    <Label {...args}>
      {args.children} <span className="text-destructive">*</span>
    </Label>
  ),
};

export const WithDescription: Story = {
  args: {
    children: 'Username',
    htmlFor: 'username',
  },
  render: (args) => (
    <div className="space-y-1">
      <Label {...args} />
      <p className="text-sm text-muted-foreground">
        This will be your public display name.
      </p>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'Disabled field',
    htmlFor: 'disabled',
    className: 'opacity-50 cursor-not-allowed',
  },
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">
          Password <span className="text-destructive">*</span>
        </Label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
    </div>
  ),
};
