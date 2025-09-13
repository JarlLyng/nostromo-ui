import type { Meta, StoryObj } from '@storybook/vue3';
import { NCard, NCardHeader, NCardTitle, NCardDescription, NCardContent, NCardFooter } from '../card';
import { NButton } from '../button';

const meta: Meta<typeof NCard> = {
  title: 'Vue/Card',
  component: NCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible card component for displaying content with header, body, and footer sections.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined', 'elevated', 'ghost'],
      description: 'Visual variant of the card',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the card',
    },
    class: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic card
export const Default: Story = {
  render: () => ({
    components: { NCard, NCardHeader, NCardTitle, NCardDescription, NCardContent, NCardFooter, NButton },
    template: `
      <NCard>
        <NCardHeader>
          <NCardTitle>Card Title</NCardTitle>
          <NCardDescription>Card description</NCardDescription>
        </NCardHeader>
        <NCardContent>
          <p>Card content goes here.</p>
        </NCardContent>
        <NCardFooter>
          <NButton>Action</NButton>
        </NCardFooter>
      </NCard>
    `,
  }),
};

// Card with only content
export const ContentOnly: Story = {
  render: () => ({
    components: { NCard, NCardContent },
    template: `
      <NCard>
        <NCardContent>
          <p>This card only has content, no header or footer.</p>
        </NCardContent>
      </NCard>
    `,
  }),
};

// Different variants
export const Outlined: Story = {
  render: () => ({
    components: { NCard, NCardHeader, NCardTitle, NCardDescription, NCardContent, NCardFooter, NButton },
    template: `
      <NCard variant="outlined">
        <NCardHeader>
          <NCardTitle>Outlined Card</NCardTitle>
          <NCardDescription>This card has an outlined border</NCardDescription>
        </NCardHeader>
        <NCardContent>
          <p>Content for outlined card.</p>
        </NCardContent>
        <NCardFooter>
          <NButton variant="outline">Action</NButton>
        </NCardFooter>
      </NCard>
    `,
  }),
};

export const Elevated: Story = {
  render: () => ({
    components: { NCard, NCardHeader, NCardTitle, NCardDescription, NCardContent, NCardFooter, NButton },
    template: `
      <NCard variant="elevated">
        <NCardHeader>
          <NCardTitle>Elevated Card</NCardTitle>
          <NCardDescription>This card has an elevated shadow</NCardDescription>
        </NCardHeader>
        <NCardContent>
          <p>Content for elevated card.</p>
        </NCardContent>
        <NCardFooter>
          <NButton>Action</NButton>
        </NCardFooter>
      </NCard>
    `,
  }),
};

export const Ghost: Story = {
  render: () => ({
    components: { NCard, NCardHeader, NCardTitle, NCardDescription, NCardContent, NCardFooter, NButton },
    template: `
      <NCard variant="ghost">
        <NCardHeader>
          <NCardTitle>Ghost Card</NCardTitle>
          <NCardDescription>This card has no border or shadow</NCardDescription>
        </NCardHeader>
        <NCardContent>
          <p>Content for ghost card.</p>
        </NCardContent>
        <NCardFooter>
          <NButton variant="ghost">Action</NButton>
        </NCardFooter>
      </NCard>
    `,
  }),
};

// Different sizes
export const Small: Story = {
  render: () => ({
    components: { NCard, NCardHeader, NCardTitle, NCardDescription, NCardContent, NCardFooter, NButton },
    template: `
      <NCard size="sm">
        <NCardHeader size="sm">
          <NCardTitle size="sm">Small Card</NCardTitle>
          <NCardDescription size="sm">This is a small card</NCardDescription>
        </NCardHeader>
        <NCardContent size="sm">
          <p>Content for small card.</p>
        </NCardContent>
        <NCardFooter size="sm">
          <NButton size="sm">Action</NButton>
        </NCardFooter>
      </NCard>
    `,
  }),
};

export const Large: Story = {
  render: () => ({
    components: { NCard, NCardHeader, NCardTitle, NCardDescription, NCardContent, NCardFooter, NButton },
    template: `
      <NCard size="lg">
        <NCardHeader size="lg">
          <NCardTitle size="lg">Large Card</NCardTitle>
          <NCardDescription size="lg">This is a large card with more padding</NCardDescription>
        </NCardHeader>
        <NCardContent size="lg">
          <p>Content for large card with more space.</p>
        </NCardContent>
        <NCardFooter size="lg">
          <NButton size="lg">Action</NButton>
        </NCardFooter>
      </NCard>
    `,
  }),
};

// Product card example
export const ProductCard: Story = {
  render: () => ({
    components: { NCard, NCardHeader, NCardTitle, NCardDescription, NCardContent, NCardFooter, NButton },
    template: `
      <NCard class="w-80">
        <NCardHeader>
          <NCardTitle>Wireless Headphones</NCardTitle>
          <NCardDescription>Premium quality wireless headphones</NCardDescription>
        </NCardHeader>
        <NCardContent>
          <div class="space-y-2">
            <div class="h-48 bg-neutral-100 rounded-md flex items-center justify-center">
              <span class="text-neutral-500">Product Image</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-2xl font-bold">$199.99</span>
              <div class="flex items-center">
                <span class="text-yellow-500">★★★★★</span>
                <span class="text-sm text-neutral-500 ml-1">(4.8)</span>
              </div>
            </div>
            <p class="text-sm text-neutral-600">
              High-quality wireless headphones with noise cancellation and 30-hour battery life.
            </p>
          </div>
        </NCardContent>
        <NCardFooter class="flex-col space-y-2">
          <NButton class="w-full">Add to Cart</NButton>
          <NButton variant="outline" class="w-full">Add to Wishlist</NButton>
        </NCardFooter>
      </NCard>
    `,
  }),
};

// User profile card
export const UserProfile: Story = {
  render: () => ({
    components: { NCard, NCardHeader, NCardTitle, NCardDescription, NCardContent, NCardFooter, NButton },
    template: `
      <NCard class="w-80">
        <NCardHeader class="text-center">
          <div class="w-20 h-20 bg-neutral-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span class="text-neutral-500">Avatar</span>
          </div>
          <NCardTitle>John Doe</NCardTitle>
          <NCardDescription>Software Developer</NCardDescription>
        </NCardHeader>
        <NCardContent>
          <div class="space-y-3">
            <div>
              <span class="text-sm font-medium">Email:</span>
              <p class="text-sm text-neutral-600">john.doe@example.com</p>
            </div>
            <div>
              <span class="text-sm font-medium">Location:</span>
              <p class="text-sm text-neutral-600">San Francisco, CA</p>
            </div>
            <div>
              <span class="text-sm font-medium">Bio:</span>
              <p class="text-sm text-neutral-600">
                Passionate developer with 5+ years of experience in React and Node.js.
              </p>
            </div>
          </div>
        </NCardContent>
        <NCardFooter>
          <NButton class="w-full">Contact</NButton>
        </NCardFooter>
      </NCard>
    `,
  }),
};

// Statistics card
export const Statistics: Story = {
  render: () => ({
    components: { NCard, NCardHeader, NCardTitle, NCardContent },
    template: `
      <div class="grid grid-cols-3 gap-4">
        <NCard>
          <NCardHeader class="pb-2">
            <NCardTitle class="text-sm font-medium">Total Users</NCardTitle>
          </NCardHeader>
          <NCardContent>
            <div class="text-2xl font-bold">2,350</div>
            <p class="text-xs text-green-600">+20.1% from last month</p>
          </NCardContent>
        </NCard>
        <NCard>
          <NCardHeader class="pb-2">
            <NCardTitle class="text-sm font-medium">Revenue</NCardTitle>
          </NCardHeader>
          <NCardContent>
            <div class="text-2xl font-bold">$45,231</div>
            <p class="text-xs text-green-600">+15.3% from last month</p>
          </NCardContent>
        </NCard>
        <NCard>
          <NCardHeader class="pb-2">
            <NCardTitle class="text-sm font-medium">Orders</NCardTitle>
          </NCardHeader>
          <NCardContent>
            <div class="text-2xl font-bold">1,234</div>
            <p class="text-xs text-red-600">-5.2% from last month</p>
          </NCardContent>
        </NCard>
      </div>
    `,
  }),
};

// Form card
export const FormCard: Story = {
  render: () => ({
    components: { NCard, NCardHeader, NCardTitle, NCardDescription, NCardContent, NCardFooter, NButton },
    template: `
      <NCard class="w-96">
        <NCardHeader>
          <NCardTitle>Contact Form</NCardTitle>
          <NCardDescription>Send us a message and we'll get back to you</NCardDescription>
        </NCardHeader>
        <NCardContent>
          <form class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-neutral-700 mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                class="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-neutral-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                class="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label for="message" class="block text-sm font-medium text-neutral-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                class="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="Your message"
              />
            </div>
          </form>
        </NCardContent>
        <NCardFooter>
          <NButton class="w-full">Send Message</NButton>
        </NCardFooter>
      </NCard>
    `,
  }),
};

// Blog post card
export const BlogPost: Story = {
  render: () => ({
    components: { NCard, NCardHeader, NCardTitle, NCardDescription, NCardContent, NCardFooter, NButton },
    template: `
      <NCard class="w-96">
        <NCardHeader>
          <div class="h-48 bg-neutral-100 rounded-md mb-4 flex items-center justify-center">
            <span class="text-neutral-500">Blog Image</span>
          </div>
          <NCardTitle>Getting Started with React</NCardTitle>
          <NCardDescription>Learn the basics of React development</NCardDescription>
        </NCardHeader>
        <NCardContent>
          <p class="text-sm text-neutral-600 mb-4">
            React is a JavaScript library for building user interfaces. In this guide, we'll cover the fundamentals
            and help you get started with your first React application.
          </p>
          <div class="flex items-center justify-between text-xs text-neutral-500">
            <span>By John Doe</span>
            <span>Dec 15, 2024</span>
          </div>
        </NCardContent>
        <NCardFooter>
          <NButton variant="outline" class="w-full">Read More</NButton>
        </NCardFooter>
      </NCard>
    `,
  }),
};

// Settings card
export const SettingsCard: Story = {
  render: () => ({
    components: { NCard, NCardHeader, NCardTitle, NCardDescription, NCardContent, NCardFooter, NButton },
    template: `
      <NCard class="w-96">
        <NCardHeader>
          <NCardTitle>Account Settings</NCardTitle>
          <NCardDescription>Manage your account preferences</NCardDescription>
        </NCardHeader>
        <NCardContent>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium">Email Notifications</p>
                <p class="text-xs text-neutral-500">Receive email updates</p>
              </div>
              <input type="checkbox" checked />
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium">SMS Notifications</p>
                <p class="text-xs text-neutral-500">Receive SMS updates</p>
              </div>
              <input type="checkbox" />
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium">Two-Factor Authentication</p>
                <p class="text-xs text-neutral-500">Add extra security</p>
              </div>
              <input type="checkbox" />
            </div>
          </div>
        </NCardContent>
        <NCardFooter>
          <NButton class="w-full">Save Changes</NButton>
        </NCardFooter>
      </NCard>
    `,
  }),
};

// Card with asChild props
export const CustomElements: Story = {
  render: () => ({
    components: { NCard, NCardHeader, NCardTitle, NCardDescription, NCardContent, NCardFooter, NButton },
    template: `
      <NCard>
        <NCardHeader>
          <NCardTitle asChild>
            <h1>Custom Title Element</h1>
          </NCardTitle>
          <NCardDescription asChild>
            <span>Custom description element</span>
          </NCardDescription>
        </NCardHeader>
        <NCardContent>
          <p>This card uses custom HTML elements for the title and description.</p>
        </NCardContent>
        <NCardFooter>
          <NButton>Action</NButton>
        </NCardFooter>
      </NCard>
    `,
  }),
};

// Multiple cards grid
export const CardGrid: Story = {
  render: () => ({
    components: { NCard, NCardHeader, NCardTitle, NCardDescription, NCardContent, NCardFooter, NButton },
    template: `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NCard>
          <NCardHeader>
            <NCardTitle>Feature 1</NCardTitle>
            <NCardDescription>Description for feature 1</NCardDescription>
          </NCardHeader>
          <NCardContent>
            <p>Content for feature 1</p>
          </NCardContent>
          <NCardFooter>
            <NButton>Learn More</NButton>
          </NCardFooter>
        </NCard>
        <NCard>
          <NCardHeader>
            <NCardTitle>Feature 2</NCardTitle>
            <NCardDescription>Description for feature 2</NCardDescription>
          </NCardHeader>
          <NCardContent>
            <p>Content for feature 2</p>
          </NCardContent>
          <NCardFooter>
            <NButton>Learn More</NButton>
          </NCardFooter>
        </NCard>
        <NCard>
          <NCardHeader>
            <NCardTitle>Feature 3</NCardTitle>
            <NCardDescription>Description for feature 3</NCardDescription>
          </NCardHeader>
          <NCardContent>
            <p>Content for feature 3</p>
          </NCardContent>
          <NCardFooter>
            <NButton>Learn More</NButton>
          </NCardFooter>
        </NCard>
      </div>
    `,
  }),
};
