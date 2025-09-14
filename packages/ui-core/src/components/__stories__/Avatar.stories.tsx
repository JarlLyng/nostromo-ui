import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarImage, AvatarFallback } from '../avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile avatar component with image support and fallbacks.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'Size of the avatar',
    },
    src: {
      control: { type: 'text' },
      description: 'Image source URL',
    },
    alt: {
      control: { type: 'text' },
      description: 'Alt text for image',
    },
    fallback: {
      control: { type: 'text' },
      description: 'Fallback text when image fails to load',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fallback: 'JD',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    alt: 'User avatar',
    fallback: 'JD',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    fallback: 'AB',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    fallback: 'CD',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    fallback: 'EF',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm" fallback="SM" />
      <Avatar size="default" fallback="MD" />
      <Avatar size="lg" fallback="LG" />
      <Avatar size="xl" fallback="XL" />
    </div>
  ),
};

export const CompoundComponent: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="lg">
        <AvatarImage 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
          alt="User avatar" 
        />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      
      <Avatar size="lg">
        <AvatarImage 
          src="https://invalid-url.com/image.jpg" 
          alt="User avatar" 
        />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const WithImages: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar 
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        alt="User 1"
        fallback="U1"
      />
      <Avatar 
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        alt="User 2"
        fallback="U2"
      />
      <Avatar 
        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
        alt="User 3"
        fallback="U3"
      />
    </div>
  ),
};
