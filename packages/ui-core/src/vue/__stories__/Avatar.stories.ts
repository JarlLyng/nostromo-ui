import type { Meta, StoryObj } from '@storybook/vue3';
import { NAvatar, NAvatarImage, NAvatarFallback } from '../avatar';

const meta: Meta<typeof NAvatar> = {
  title: 'Vue/Avatar',
  component: NAvatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An avatar component for displaying user profile images with fallback support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the avatar',
    },
    src: {
      control: { type: 'text' },
      description: 'Image source URL',
    },
    alt: {
      control: { type: 'text' },
      description: 'Alt text for the image',
    },
    fallback: {
      control: { type: 'text' },
      description: 'Fallback text when image fails to load',
    },
    class: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic avatar
export const Default: Story = {
  render: () => ({
    components: { NAvatar },
    template: `<NAvatar>JD</NAvatar>`,
  }),
};

// Different sizes
export const Small: Story = {
  render: () => ({
    components: { NAvatar },
    template: `<NAvatar size="sm">JD</NAvatar>`,
  }),
};

export const Medium: Story = {
  render: () => ({
    components: { NAvatar },
    template: `<NAvatar size="md">JD</NAvatar>`,
  }),
};

export const Large: Story = {
  render: () => ({
    components: { NAvatar },
    template: `<NAvatar size="lg">JD</NAvatar>`,
  }),
};

export const ExtraLarge: Story = {
  render: () => ({
    components: { NAvatar },
    template: `<NAvatar size="xl">JD</NAvatar>`,
  }),
};

// All sizes
export const AllSizes: Story = {
  render: () => ({
    components: { NAvatar },
    template: `
      <div class="flex items-center gap-4">
        <NAvatar size="sm">JD</NAvatar>
        <NAvatar size="md">JD</NAvatar>
        <NAvatar size="lg">JD</NAvatar>
        <NAvatar size="xl">JD</NAvatar>
      </div>
    `,
  }),
};

// With images
export const WithImage: Story = {
  render: () => ({
    components: { NAvatar, NAvatarFallback },
    template: `
      <NAvatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="User avatar">
        <NAvatarFallback>JD</NAvatarFallback>
      </NAvatar>
    `,
  }),
};

export const WithImageLarge: Story = {
  render: () => ({
    components: { NAvatar, NAvatarFallback },
    template: `
      <NAvatar size="lg" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="User avatar">
        <NAvatarFallback>JD</NAvatarFallback>
      </NAvatar>
    `,
  }),
};

// With fallback
export const WithFallback: Story = {
  render: () => ({
    components: { NAvatar },
    template: `<NAvatar fallback="AB">JD</NAvatar>`,
  }),
};

export const WithCustomFallback: Story = {
  render: () => ({
    components: { NAvatar },
    template: `<NAvatar fallback="🚀">JD</NAvatar>`,
  }),
};

// Different content types
export const WithInitials: Story = {
  render: () => ({
    components: { NAvatar },
    template: `
      <div class="flex flex-wrap gap-2">
        <NAvatar>JD</NAvatar>
        <NAvatar>AB</NAvatar>
        <NAvatar>XY</NAvatar>
        <NAvatar>ZZ</NAvatar>
      </div>
    `,
  }),
};

export const WithSingleLetter: Story = {
  render: () => ({
    components: { NAvatar },
    template: `
      <div class="flex flex-wrap gap-2">
        <NAvatar>J</NAvatar>
        <NAvatar>A</NAvatar>
        <NAvatar>B</NAvatar>
        <NAvatar>X</NAvatar>
      </div>
    `,
  }),
};

export const WithEmojis: Story = {
  render: () => ({
    components: { NAvatar },
    template: `
      <div class="flex flex-wrap gap-2">
        <NAvatar>😀</NAvatar>
        <NAvatar>🚀</NAvatar>
        <NAvatar>⭐</NAvatar>
        <NAvatar>🔥</NAvatar>
      </div>
    `,
  }),
};

export const WithNumbers: Story = {
  render: () => ({
    components: { NAvatar },
    template: `
      <div class="flex flex-wrap gap-2">
        <NAvatar>1</NAvatar>
        <NAvatar>42</NAvatar>
        <NAvatar>99</NAvatar>
        <NAvatar>1K</NAvatar>
      </div>
    `,
  }),
};

export const WithSpecialCharacters: Story = {
  render: () => ({
    components: { NAvatar },
    template: `
      <div class="flex flex-wrap gap-2">
        <NAvatar>@</NAvatar>
        <NAvatar>#</NAvatar>
        <NAvatar>$</NAvatar>
        <NAvatar>%</NAvatar>
      </div>
    `,
  }),
};

// User profiles
export const UserProfiles: Story = {
  render: () => ({
    components: { NAvatar },
    template: `
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <NAvatar size="lg">JD</NAvatar>
          <div>
            <h3 class="font-semibold">John Doe</h3>
            <p class="text-sm text-neutral-600">Software Developer</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <NAvatar size="lg">JS</NAvatar>
          <div>
            <h3 class="font-semibold">Jane Smith</h3>
            <p class="text-sm text-neutral-600">Designer</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <NAvatar size="lg">BJ</NAvatar>
          <div>
            <h3 class="font-semibold">Bob Johnson</h3>
            <p class="text-sm text-neutral-600">Product Manager</p>
          </div>
        </div>
      </div>
    `,
  }),
};

// Team members
export const TeamMembers: Story = {
  render: () => ({
    components: { NAvatar },
    template: `
      <div class="grid grid-cols-2 gap-4">
        <div class="flex items-center gap-3">
          <NAvatar>JD</NAvatar>
          <div>
            <h4 class="font-medium">John Doe</h4>
            <p class="text-sm text-neutral-600">Frontend</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <NAvatar>JS</NAvatar>
          <div>
            <h4 class="font-medium">Jane Smith</h4>
            <p class="text-sm text-neutral-600">Backend</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <NAvatar>BJ</NAvatar>
          <div>
            <h4 class="font-medium">Bob Johnson</h4>
            <p class="text-sm text-neutral-600">DevOps</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <NAvatar>AL</NAvatar>
          <div>
            <h4 class="font-medium">Alice Lee</h4>
            <p class="text-sm text-neutral-600">Design</p>
          </div>
        </div>
      </div>
    `,
  }),
};

// Chat interface
export const ChatInterface: Story = {
  render: () => ({
    components: { NAvatar },
    template: `
      <div class="space-y-4">
        <div class="flex gap-3">
          <NAvatar>JD</NAvatar>
          <div class="flex-1">
            <div class="bg-neutral-100 rounded-lg p-3">
              <p>Hello, how are you doing today?</p>
            </div>
            <p class="text-xs text-neutral-500 mt-1">John Doe • 2:30 PM</p>
          </div>
        </div>
        <div class="flex gap-3">
          <NAvatar>JS</NAvatar>
          <div class="flex-1">
            <div class="bg-neutral-100 rounded-lg p-3">
              <p>I'm doing great! Thanks for asking. How about you?</p>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Jane Smith • 2:32 PM</p>
          </div>
        </div>
        <div class="flex gap-3">
          <NAvatar>BJ</NAvatar>
          <div class="flex-1">
            <div class="bg-neutral-100 rounded-lg p-3">
              <p>Same here! Ready for the meeting later?</p>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Bob Johnson • 2:35 PM</p>
          </div>
        </div>
      </div>
    `,
  }),
};

// User list
export const UserList: Story = {
  render: () => ({
    components: { NAvatar },
    template: `
      <div class="space-y-2">
        <div class="flex items-center gap-3 p-2 hover:bg-neutral-50 rounded">
          <NAvatar>JD</NAvatar>
          <div class="flex-1">
            <h4 class="font-medium">John Doe</h4>
            <p class="text-sm text-neutral-600">john.doe@example.com</p>
          </div>
          <span class="text-xs text-green-600">Online</span>
        </div>
        <div class="flex items-center gap-3 p-2 hover:bg-neutral-50 rounded">
          <NAvatar>JS</NAvatar>
          <div class="flex-1">
            <h4 class="font-medium">Jane Smith</h4>
            <p class="text-sm text-neutral-600">jane.smith@example.com</p>
          </div>
          <span class="text-xs text-yellow-600">Away</span>
        </div>
        <div class="flex items-center gap-3 p-2 hover:bg-neutral-50 rounded">
          <NAvatar>BJ</NAvatar>
          <div class="flex-1">
            <h4 class="font-medium">Bob Johnson</h4>
            <p class="text-sm text-neutral-600">bob.johnson@example.com</p>
          </div>
          <span class="text-xs text-neutral-600">Offline</span>
        </div>
      </div>
    `,
  }),
};

// Notifications
export const Notifications: Story = {
  render: () => ({
    components: { NAvatar },
    template: `
      <div class="space-y-3">
        <div class="flex gap-3">
          <NAvatar>JD</NAvatar>
          <div class="flex-1">
            <p><span class="font-medium">John Doe</span> commented on your post</p>
            <p class="text-sm text-neutral-600">5 minutes ago</p>
          </div>
        </div>
        <div class="flex gap-3">
          <NAvatar>JS</NAvatar>
          <div class="flex-1">
            <p><span class="font-medium">Jane Smith</span> liked your photo</p>
            <p class="text-sm text-neutral-600">10 minutes ago</p>
          </div>
        </div>
        <div class="flex gap-3">
          <NAvatar>BJ</NAvatar>
          <div class="flex-1">
            <p><span class="font-medium">Bob Johnson</span> shared your article</p>
            <p class="text-sm text-neutral-600">1 hour ago</p>
          </div>
        </div>
      </div>
    `,
  }),
};

// Comments
export const Comments: Story = {
  render: () => ({
    components: { NAvatar },
    template: `
      <div class="space-y-4">
        <div class="flex gap-3">
          <NAvatar>JD</NAvatar>
          <div class="flex-1">
            <div class="bg-neutral-50 rounded-lg p-3">
              <div class="flex items-center gap-2 mb-2">
                <span class="font-medium">John Doe</span>
                <span class="text-xs text-neutral-500">2 hours ago</span>
              </div>
              <p>Great article! Thanks for sharing this valuable information.</p>
            </div>
          </div>
        </div>
        <div class="flex gap-3">
          <NAvatar>JS</NAvatar>
          <div class="flex-1">
            <div class="bg-neutral-50 rounded-lg p-3">
              <div class="flex items-center gap-2 mb-2">
                <span class="font-medium">Jane Smith</span>
                <span class="text-xs text-neutral-500">1 hour ago</span>
              </div>
              <p>I agree, very informative. Looking forward to more content like this.</p>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

// Avatar groups
export const AvatarGroups: Story = {
  render: () => ({
    components: { NAvatar },
    template: `
      <div class="space-y-4">
        <div class="flex -space-x-2">
          <NAvatar size="sm">JD</NAvatar>
          <NAvatar size="sm">JS</NAvatar>
          <NAvatar size="sm">BJ</NAvatar>
          <NAvatar size="sm">AL</NAvatar>
          <NAvatar size="sm">+5</NAvatar>
        </div>
        <div class="flex -space-x-2">
          <NAvatar size="md">JD</NAvatar>
          <NAvatar size="md">JS</NAvatar>
          <NAvatar size="md">BJ</NAvatar>
          <NAvatar size="md">AL</NAvatar>
          <NAvatar size="md">+3</NAvatar>
        </div>
      </div>
    `,
  }),
};

// Different image sources
export const DifferentImageSources: Story = {
  render: () => ({
    components: { NAvatar, NAvatarFallback },
    template: `
      <div class="flex flex-wrap gap-4">
        <NAvatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="User 1">
          <NAvatarFallback>JD</NAvatarFallback>
        </NAvatar>
        <NAvatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="User 2">
          <NAvatarFallback>JS</NAvatarFallback>
        </NAvatar>
        <NAvatar src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" alt="User 3">
          <NAvatarFallback>BJ</NAvatarFallback>
        </NAvatar>
        <NAvatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" alt="User 4">
          <NAvatarFallback>AL</NAvatarFallback>
        </NAvatar>
      </div>
    `,
  }),
};

// Custom styling
export const CustomStyled: Story = {
  render: () => ({
    components: { NAvatar },
    template: `
      <div class="flex flex-wrap gap-4">
        <NAvatar class="ring-2 ring-brand-500">JD</NAvatar>
        <NAvatar class="ring-2 ring-green-500">JS</NAvatar>
        <NAvatar class="ring-2 ring-blue-500">BJ</NAvatar>
        <NAvatar class="ring-2 ring-purple-500">AL</NAvatar>
      </div>
    `,
  }),
};

// Interactive avatars
export const InteractiveAvatars: Story = {
  render: () => ({
    components: { NAvatar },
    template: `
      <div class="flex flex-wrap gap-4">
        <NAvatar class="cursor-pointer hover:ring-2 hover:ring-brand-500 transition-all">JD</NAvatar>
        <NAvatar class="cursor-pointer hover:ring-2 hover:ring-green-500 transition-all">JS</NAvatar>
        <NAvatar class="cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">BJ</NAvatar>
        <NAvatar class="cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all">AL</NAvatar>
      </div>
    `,
  }),
};

// Avatar with status
export const AvatarWithStatus: Story = {
  render: () => ({
    components: { NAvatar },
    template: `
      <div class="flex flex-wrap gap-4">
        <div class="relative">
          <NAvatar>JD</NAvatar>
          <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <div class="relative">
          <NAvatar>JS</NAvatar>
          <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white"></div>
        </div>
        <div class="relative">
          <NAvatar>BJ</NAvatar>
          <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-neutral-400 rounded-full border-2 border-white"></div>
        </div>
        <div class="relative">
          <NAvatar>AL</NAvatar>
          <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
        </div>
      </div>
    `,
  }),
};
