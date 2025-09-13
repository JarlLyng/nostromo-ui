import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import { NDialog, NDialogContent, NDialogHeader, NDialogTitle, NDialogDescription, NDialogFooter, NDialogClose } from '../dialog';
import { NButton } from '../button';

const meta: Meta<typeof NDialog> = {
  title: 'Vue/Dialog',
  component: NDialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A Vue modal dialog component with backdrop, focus management, and accessibility features.',
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
  render: () => ({
    components: { NDialog, NDialogContent, NDialogHeader, NDialogTitle, NDialogDescription, NDialogFooter, NButton },
    template: `
      <NDialog :open="true">
        <NDialogContent>
          <NDialogHeader>
            <NDialogTitle>Dialog Title</NDialogTitle>
            <NDialogDescription>
              This is a basic dialog with a title and description.
            </NDialogDescription>
          </NDialogHeader>
          <NDialogFooter>
            <NButton variant="outline">Cancel</NButton>
            <NButton>Continue</NButton>
          </NDialogFooter>
        </NDialogContent>
      </NDialog>
    `,
  }),
};

// Dialog with close button
export const WithCloseButton: Story = {
  args: {
    open: true,
  },
  render: () => ({
    components: { NDialog, NDialogContent, NDialogClose, NDialogHeader, NDialogTitle, NDialogDescription, NDialogFooter, NButton },
    template: `
      <NDialog :open="true">
        <NDialogContent>
          <NDialogClose>×</NDialogClose>
          <NDialogHeader>
            <NDialogTitle>Dialog with Close Button</NDialogTitle>
            <NDialogDescription>
              This dialog has a close button in the top-right corner.
            </NDialogDescription>
          </NDialogHeader>
          <NDialogFooter>
            <NButton variant="outline">Cancel</NButton>
            <NButton>Save</NButton>
          </NDialogFooter>
        </NDialogContent>
      </NDialog>
    `,
  }),
};

// Confirmation dialog
export const Confirmation: Story = {
  args: {
    open: true,
  },
  render: () => ({
    components: { NDialog, NDialogContent, NDialogHeader, NDialogTitle, NDialogDescription, NDialogFooter, NButton },
    template: `
      <NDialog :open="true">
        <NDialogContent>
          <NDialogHeader>
            <NDialogTitle>Confirm Action</NDialogTitle>
            <NDialogDescription>
              Are you sure you want to delete this item? This action cannot be undone.
            </NDialogDescription>
          </NDialogHeader>
          <NDialogFooter>
            <NButton variant="outline">Cancel</NButton>
            <NButton variant="destructive">Delete</NButton>
          </NDialogFooter>
        </NDialogContent>
      </NDialog>
    `,
  }),
};

// Form dialog
export const FormDialog: Story = {
  args: {
    open: true,
  },
  render: () => ({
    components: { NDialog, NDialogContent, NDialogHeader, NDialogTitle, NDialogDescription, NDialogFooter, NButton },
    template: `
      <NDialog :open="true">
        <NDialogContent size="lg">
          <NDialogHeader>
            <NDialogTitle>Create Account</NDialogTitle>
            <NDialogDescription>
              Fill out the form below to create your account.
            </NDialogDescription>
          </NDialogHeader>
          <form class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-neutral-700">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                class="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-neutral-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                class="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-neutral-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                class="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2"
                placeholder="Enter your password"
              />
            </div>
          </form>
          <NDialogFooter>
            <NButton variant="outline">Cancel</NButton>
            <NButton>Create Account</NButton>
          </NDialogFooter>
        </NDialogContent>
      </NDialog>
    `,
  }),
};

// Different sizes
export const Small: Story = {
  args: {
    open: true,
    size: 'sm',
  },
  render: () => ({
    components: { NDialog, NDialogContent, NDialogHeader, NDialogTitle, NDialogDescription, NDialogFooter, NButton },
    template: `
      <NDialog :open="true" size="sm">
        <NDialogContent size="sm">
          <NDialogHeader>
            <NDialogTitle>Small Dialog</NDialogTitle>
            <NDialogDescription>
              This is a small dialog with minimal content.
            </NDialogDescription>
          </NDialogHeader>
          <NDialogFooter>
            <NButton variant="outline">Cancel</NButton>
            <NButton>OK</NButton>
          </NDialogFooter>
        </NDialogContent>
      </NDialog>
    `,
  }),
};

export const Large: Story = {
  args: {
    open: true,
    size: 'lg',
  },
  render: () => ({
    components: { NDialog, NDialogContent, NDialogHeader, NDialogTitle, NDialogDescription, NDialogFooter, NButton },
    template: `
      <NDialog :open="true" size="lg">
        <NDialogContent size="lg">
          <NDialogHeader>
            <NDialogTitle>Large Dialog</NDialogTitle>
            <NDialogDescription>
              This is a large dialog with more content space.
            </NDialogDescription>
          </NDialogHeader>
          <div class="space-y-4">
            <p>This dialog has more space for content.</p>
            <p>You can include more detailed information here.</p>
          </div>
          <NDialogFooter>
            <NButton variant="outline">Cancel</NButton>
            <NButton>Continue</NButton>
          </NDialogFooter>
        </NDialogContent>
      </NDialog>
    `,
  }),
};

export const ExtraLarge: Story = {
  args: {
    open: true,
    size: 'xl',
  },
  render: () => ({
    components: { NDialog, NDialogContent, NDialogHeader, NDialogTitle, NDialogDescription, NDialogFooter, NButton },
    template: `
      <NDialog :open="true" size="xl">
        <NDialogContent size="2xl">
          <NDialogHeader>
            <NDialogTitle>Extra Large Dialog</NDialogTitle>
            <NDialogDescription>
              This is an extra large dialog for complex content.
            </NDialogDescription>
          </NDialogHeader>
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <h3 class="font-medium">Section 1</h3>
                <p class="text-sm text-neutral-600">Content for section 1</p>
              </div>
              <div>
                <h3 class="font-medium">Section 2</h3>
                <p class="text-sm text-neutral-600">Content for section 2</p>
              </div>
            </div>
          </div>
          <NDialogFooter>
            <NButton variant="outline">Cancel</NButton>
            <NButton>Save Changes</NButton>
          </NDialogFooter>
        </NDialogContent>
      </NDialog>
    `,
  }),
};

// Settings dialog
export const Settings: Story = {
  args: {
    open: true,
  },
  render: () => ({
    components: { NDialog, NDialogContent, NDialogHeader, NDialogTitle, NDialogDescription, NDialogFooter, NButton },
    template: `
      <NDialog :open="true">
        <NDialogContent size="lg">
          <NDialogHeader>
            <NDialogTitle>Settings</NDialogTitle>
            <NDialogDescription>
              Configure your application settings.
            </NDialogDescription>
          </NDialogHeader>
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium">General</h3>
              <div class="mt-4 space-y-4">
                <div>
                  <label for="theme" class="block text-sm font-medium text-neutral-700">
                    Theme
                  </label>
                  <select
                    id="theme"
                    class="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
                <div>
                  <label for="language" class="block text-sm font-medium text-neutral-700">
                    Language
                  </label>
                  <select
                    id="language"
                    class="mt-1 block w-full rounded-md border border-neutral-300 px-3 py-2"
                  >
                    <option value="en">English</option>
                    <option value="da">Danish</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <NDialogFooter>
            <NButton variant="outline">Reset</NButton>
            <NButton>Save Settings</NButton>
          </NDialogFooter>
        </NDialogContent>
      </NDialog>
    `,
  }),
};

// Interactive example
export const Interactive: Story = {
  render: () => ({
    components: { NDialog, NDialogContent, NDialogHeader, NDialogTitle, NDialogDescription, NDialogFooter, NButton },
    data() {
      return {
        open: false,
      };
    },
    methods: {
      openDialog() {
        this.open = true;
      },
      closeDialog() {
        this.open = false;
      },
    },
    template: `
      <div>
        <NButton @click="openDialog">Open Dialog</NButton>
        <NDialog v-model="open">
          <NDialogContent>
            <NDialogHeader>
              <NDialogTitle>Interactive Dialog</NDialogTitle>
              <NDialogDescription>
                This dialog can be opened and closed interactively.
              </NDialogDescription>
            </NDialogHeader>
            <div class="space-y-4">
              <p>Current state: {{ open ? 'Open' : 'Closed' }}</p>
              <NButton @click="closeDialog">Close Dialog</NButton>
            </div>
            <NDialogFooter>
              <NButton variant="outline" @click="closeDialog">
                Cancel
              </NButton>
              <NButton @click="closeDialog">Confirm</NButton>
            </NDialogFooter>
          </NDialogContent>
        </NDialog>
      </div>
    `,
  }),
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
  render: () => ({
    components: { NDialog, NDialogContent, NDialogHeader, NDialogTitle, NDialogDescription, NDialogFooter, NButton },
    template: `
      <NDialog :open="true">
        <NDialogContent>
          <NDialogHeader>
            <NDialogTitle>Multiple Actions</NDialogTitle>
            <NDialogDescription>
              Choose one of the following actions.
            </NDialogDescription>
          </NDialogHeader>
          <NDialogFooter>
            <NButton variant="outline">Cancel</NButton>
            <NButton variant="outline">Save Draft</NButton>
            <NButton>Publish</NButton>
          </NDialogFooter>
        </NDialogContent>
      </NDialog>
    `,
  }),
};

// Long content
export const LongContent: Story = {
  args: {
    open: true,
  },
  render: () => ({
    components: { NDialog, NDialogContent, NDialogHeader, NDialogTitle, NDialogDescription, NDialogFooter, NButton },
    template: `
      <NDialog :open="true">
        <NDialogContent size="lg">
          <NDialogHeader>
            <NDialogTitle>Long Content</NDialogTitle>
            <NDialogDescription>
              This dialog contains a lot of content to demonstrate scrolling.
            </NDialogDescription>
          </NDialogHeader>
          <div class="max-h-96 overflow-y-auto space-y-4">
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
          <NDialogFooter>
            <NButton variant="outline">Cancel</NButton>
            <NButton>Continue</NButton>
          </NDialogFooter>
        </NDialogContent>
      </NDialog>
    `,
  }),
};
