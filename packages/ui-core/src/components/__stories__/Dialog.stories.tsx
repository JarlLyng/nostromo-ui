import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '../dialog';
import { Button } from '../button';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A modal dialog component with backdrop, focus management, and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: { type: 'boolean' },
      description: 'Whether the dialog is open',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the dialog backdrop padding',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Callback when dialog open state changes',
    },
  },
  args: {
    onOpenChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic dialog
export const Default: Story = {
  args: {
    open: true,
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a basic dialog with a title and description.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Dialog with close button
export const WithCloseButton: Story = {
  args: {
    open: true,
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogContent>
        <DialogClose>×</DialogClose>
        <DialogHeader>
          <DialogTitle>Dialog with Close Button</DialogTitle>
          <DialogDescription>
            This dialog has a close button in the top-right corner.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Confirmation dialog
export const Confirmation: Story = {
  args: {
    open: true,
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this item? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Form dialog
export const FormDialog: Story = {
  args: {
    open: true,
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>Create Account</DialogTitle>
          <DialogDescription>
            Fill out the form below to create your account.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2"
              placeholder="Enter your password"
            />
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Create Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Different sizes
export const Small: Story = {
  args: {
    open: true,
    size: 'sm',
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>Small Dialog</DialogTitle>
          <DialogDescription>
            This is a small dialog with minimal content.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Large: Story = {
  args: {
    open: true,
    size: 'lg',
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>Large Dialog</DialogTitle>
          <DialogDescription>
            This is a large dialog with more content space.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p>This dialog has more space for content.</p>
          <p>You can include more detailed information here.</p>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const ExtraLarge: Story = {
  args: {
    open: true,
    size: 'xl',
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogContent size="2xl">
        <DialogHeader>
          <DialogTitle>Extra Large Dialog</DialogTitle>
          <DialogDescription>
            This is an extra large dialog for complex content.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Section 1</h3>
              <p className="text-sm text-neutral-600">Content for section 1</p>
            </div>
            <div>
              <h3 className="font-medium">Section 2</h3>
              <p className="text-sm text-neutral-600">Content for section 2</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Settings dialog
export const Settings: Story = {
  args: {
    open: true,
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Configure your application settings.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">General</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="theme" className="block text-sm font-medium text-neutral-700">
                  Theme
                </label>
                <select
                  id="theme"
                  className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-neutral-700">
                  Language
                </label>
                <select
                  id="language"
                  className="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2"
                >
                  <option value="en">English</option>
                  <option value="da">Danish</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Reset</Button>
          <Button>Save Settings</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Interactive Dialog</DialogTitle>
              <DialogDescription>
                This dialog can be opened and closed interactively.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p>Current state: {open ? 'Open' : 'Closed'}</p>
              <Button onClick={() => setOpen(false)}>Close Dialog</Button>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive dialog that can be opened and closed.',
      },
    },
  },
};

// Multiple actions
export const MultipleActions: Story = {
  args: {
    open: true,
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Multiple Actions</DialogTitle>
          <DialogDescription>
            Choose one of the following actions.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="outline">Save Draft</Button>
          <Button>Publish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// Long content
export const LongContent: Story = {
  args: {
    open: true,
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>Long Content</DialogTitle>
          <DialogDescription>
            This dialog contains a lot of content to demonstrate scrolling.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-96 overflow-y-auto space-y-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo.
          </p>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
            consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
