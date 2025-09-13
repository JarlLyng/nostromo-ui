import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarImage, AvatarFallback } from '../avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
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
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic avatar
export const Default: Story = {
  render: () => <Avatar>JD</Avatar>,
};

// Different sizes
export const Small: Story = {
  render: () => <Avatar size="sm">JD</Avatar>,
};

export const Medium: Story = {
  render: () => <Avatar size="md">JD</Avatar>,
};

export const Large: Story = {
  render: () => <Avatar size="lg">JD</Avatar>,
};

export const ExtraLarge: Story = {
  render: () => <Avatar size="xl">JD</Avatar>,
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm">JD</Avatar>
      <Avatar size="md">JD</Avatar>
      <Avatar size="lg">JD</Avatar>
      <Avatar size="xl">JD</Avatar>
    </div>
  ),
};

// With images
export const WithImage: Story = {
  render: () => (
    <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="User avatar">
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const WithImageLarge: Story = {
  render: () => (
    <Avatar size="lg" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="User avatar">
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

// With fallback
export const WithFallback: Story = {
  render: () => <Avatar fallback="AB">JD</Avatar>,
};

export const WithCustomFallback: Story = {
  render: () => <Avatar fallback="🚀">JD</Avatar>,
};

// Different content types
export const WithInitials: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Avatar>JD</Avatar>
      <Avatar>AB</Avatar>
      <Avatar>XY</Avatar>
      <Avatar>ZZ</Avatar>
    </div>
  ),
};

export const WithSingleLetter: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Avatar>J</Avatar>
      <Avatar>A</Avatar>
      <Avatar>B</Avatar>
      <Avatar>X</Avatar>
    </div>
  ),
};

export const WithEmojis: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Avatar>😀</Avatar>
      <Avatar>🚀</Avatar>
      <Avatar>⭐</Avatar>
      <Avatar>🔥</Avatar>
    </div>
  ),
};

export const WithNumbers: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Avatar>1</Avatar>
      <Avatar>42</Avatar>
      <Avatar>99</Avatar>
      <Avatar>1K</Avatar>
    </div>
  ),
};

export const WithSpecialCharacters: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Avatar>@</Avatar>
      <Avatar>#</Avatar>
      <Avatar>$</Avatar>
      <Avatar>%</Avatar>
    </div>
  ),
};

// User profiles
export const UserProfiles: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Avatar size="lg">JD</Avatar>
        <div>
          <h3 className="font-semibold">John Doe</h3>
          <p className="text-sm text-neutral-600">Software Developer</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Avatar size="lg">JS</Avatar>
        <div>
          <h3 className="font-semibold">Jane Smith</h3>
          <p className="text-sm text-neutral-600">Designer</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Avatar size="lg">BJ</Avatar>
        <div>
          <h3 className="font-semibold">Bob Johnson</h3>
          <p className="text-sm text-neutral-600">Product Manager</p>
        </div>
      </div>
    </div>
  ),
};

// Team members
export const TeamMembers: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex items-center gap-3">
        <Avatar>JD</Avatar>
        <div>
          <h4 className="font-medium">John Doe</h4>
          <p className="text-sm text-neutral-600">Frontend</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Avatar>JS</Avatar>
        <div>
          <h4 className="font-medium">Jane Smith</h4>
          <p className="text-sm text-neutral-600">Backend</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Avatar>BJ</Avatar>
        <div>
          <h4 className="font-medium">Bob Johnson</h4>
          <p className="text-sm text-neutral-600">DevOps</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Avatar>AL</Avatar>
        <div>
          <h4 className="font-medium">Alice Lee</h4>
          <p className="text-sm text-neutral-600">Design</p>
        </div>
      </div>
    </div>
  ),
};

// Chat interface
export const ChatInterface: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Avatar>JD</Avatar>
        <div className="flex-1">
          <div className="bg-neutral-100 rounded-lg p-3">
            <p>Hello, how are you doing today?</p>
          </div>
          <p className="text-xs text-neutral-500 mt-1">John Doe • 2:30 PM</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Avatar>JS</Avatar>
        <div className="flex-1">
          <div className="bg-neutral-100 rounded-lg p-3">
            <p>I'm doing great! Thanks for asking. How about you?</p>
          </div>
          <p className="text-xs text-neutral-500 mt-1">Jane Smith • 2:32 PM</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Avatar>BJ</Avatar>
        <div className="flex-1">
          <div className="bg-neutral-100 rounded-lg p-3">
            <p>Same here! Ready for the meeting later?</p>
          </div>
          <p className="text-xs text-neutral-500 mt-1">Bob Johnson • 2:35 PM</p>
        </div>
      </div>
    </div>
  ),
};

// User list
export const UserList: Story = {
  render: () => (
    <div className="space-y-2">
      <div className="flex items-center gap-3 p-2 hover:bg-neutral-50 rounded">
        <Avatar>JD</Avatar>
        <div className="flex-1">
          <h4 className="font-medium">John Doe</h4>
          <p className="text-sm text-neutral-600">john.doe@example.com</p>
        </div>
        <span className="text-xs text-green-600">Online</span>
      </div>
      <div className="flex items-center gap-3 p-2 hover:bg-neutral-50 rounded">
        <Avatar>JS</Avatar>
        <div className="flex-1">
          <h4 className="font-medium">Jane Smith</h4>
          <p className="text-sm text-neutral-600">jane.smith@example.com</p>
        </div>
        <span className="text-xs text-yellow-600">Away</span>
      </div>
      <div className="flex items-center gap-3 p-2 hover:bg-neutral-50 rounded">
        <Avatar>BJ</Avatar>
        <div className="flex-1">
          <h4 className="font-medium">Bob Johnson</h4>
          <p className="text-sm text-neutral-600">bob.johnson@example.com</p>
        </div>
        <span className="text-xs text-neutral-600">Offline</span>
      </div>
    </div>
  ),
};

// Notifications
export const Notifications: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Avatar>JD</Avatar>
        <div className="flex-1">
          <p><span className="font-medium">John Doe</span> commented on your post</p>
          <p className="text-sm text-neutral-600">5 minutes ago</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Avatar>JS</Avatar>
        <div className="flex-1">
          <p><span className="font-medium">Jane Smith</span> liked your photo</p>
          <p className="text-sm text-neutral-600">10 minutes ago</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Avatar>BJ</Avatar>
        <div className="flex-1">
          <p><span className="font-medium">Bob Johnson</span> shared your article</p>
          <p className="text-sm text-neutral-600">1 hour ago</p>
        </div>
      </div>
    </div>
  ),
};

// Comments
export const Comments: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Avatar>JD</Avatar>
        <div className="flex-1">
          <div className="bg-neutral-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">John Doe</span>
              <span className="text-xs text-neutral-500">2 hours ago</span>
            </div>
            <p>Great article! Thanks for sharing this valuable information.</p>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <Avatar>JS</Avatar>
        <div className="flex-1">
          <div className="bg-neutral-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">Jane Smith</span>
              <span className="text-xs text-neutral-500">1 hour ago</span>
            </div>
            <p>I agree, very informative. Looking forward to more content like this.</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Avatar groups
export const AvatarGroups: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex -space-x-2">
        <Avatar size="sm">JD</Avatar>
        <Avatar size="sm">JS</Avatar>
        <Avatar size="sm">BJ</Avatar>
        <Avatar size="sm">AL</Avatar>
        <Avatar size="sm">+5</Avatar>
      </div>
      <div className="flex -space-x-2">
        <Avatar size="md">JD</Avatar>
        <Avatar size="md">JS</Avatar>
        <Avatar size="md">BJ</Avatar>
        <Avatar size="md">AL</Avatar>
        <Avatar size="md">+3</Avatar>
      </div>
    </div>
  ),
};

// Different image sources
export const DifferentImageSources: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="User 1">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="User 2">
        <AvatarFallback>JS</AvatarFallback>
      </Avatar>
      <Avatar src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" alt="User 3">
        <AvatarFallback>BJ</AvatarFallback>
      </Avatar>
      <Avatar src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" alt="User 4">
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
    </div>
  ),
};

// Custom styling
export const CustomStyled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Avatar className="ring-2 ring-brand-500">JD</Avatar>
      <Avatar className="ring-2 ring-green-500">JS</Avatar>
      <Avatar className="ring-2 ring-blue-500">BJ</Avatar>
      <Avatar className="ring-2 ring-purple-500">AL</Avatar>
    </div>
  ),
};

// Interactive avatars
export const InteractiveAvatars: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Avatar className="cursor-pointer hover:ring-2 hover:ring-brand-500 transition-all">JD</Avatar>
      <Avatar className="cursor-pointer hover:ring-2 hover:ring-green-500 transition-all">JS</Avatar>
      <Avatar className="cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">BJ</Avatar>
      <Avatar className="cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all">AL</Avatar>
    </div>
  ),
};

// Avatar with status
export const AvatarWithStatus: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <div className="relative">
        <Avatar>JD</Avatar>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
      </div>
      <div className="relative">
        <Avatar>JS</Avatar>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white"></div>
      </div>
      <div className="relative">
        <Avatar>BJ</Avatar>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-neutral-400 rounded-full border-2 border-white"></div>
      </div>
      <div className="relative">
        <Avatar>AL</Avatar>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
      </div>
    </div>
  ),
};
