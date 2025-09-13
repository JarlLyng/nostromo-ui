import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A small status and label component for displaying information, status, or categories.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'outline', 'success', 'warning', 'info'],
      description: 'Visual variant of the badge',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the badge',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic badge
export const Default: Story = {
  render: () => <Badge>Default Badge</Badge>,
};

// Different variants
export const Secondary: Story = {
  render: () => <Badge variant="secondary">Secondary Badge</Badge>,
};

export const Destructive: Story = {
  render: () => <Badge variant="destructive">Destructive Badge</Badge>,
};

export const Outline: Story = {
  render: () => <Badge variant="outline">Outline Badge</Badge>,
};

export const Success: Story = {
  render: () => <Badge variant="success">Success Badge</Badge>,
};

export const Warning: Story = {
  render: () => <Badge variant="warning">Warning Badge</Badge>,
};

export const Info: Story = {
  render: () => <Badge variant="info">Info Badge</Badge>,
};

// Different sizes
export const Small: Story = {
  render: () => <Badge size="sm">Small Badge</Badge>,
};

export const Medium: Story = {
  render: () => <Badge size="md">Medium Badge</Badge>,
};

export const Large: Story = {
  render: () => <Badge size="lg">Large Badge</Badge>,
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>
        <span>🔔</span>
        <span>Notifications</span>
      </Badge>
      <Badge variant="success">
        <span>✅</span>
        <span>Completed</span>
      </Badge>
      <Badge variant="warning">
        <span>⚠️</span>
        <span>Warning</span>
      </Badge>
      <Badge variant="destructive">
        <span>❌</span>
        <span>Error</span>
      </Badge>
    </div>
  ),
};

// With numbers
export const WithNumbers: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>1</Badge>
      <Badge variant="secondary">42</Badge>
      <Badge variant="success">99+</Badge>
      <Badge variant="warning">1,000</Badge>
    </div>
  ),
};

// Status badges
export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">Active</Badge>
      <Badge variant="secondary">Inactive</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="destructive">Failed</Badge>
      <Badge variant="info">Processing</Badge>
    </div>
  ),
};

// Priority badges
export const PriorityBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="destructive">High</Badge>
      <Badge variant="warning">Medium</Badge>
      <Badge variant="info">Low</Badge>
    </div>
  ),
};

// Category badges
export const CategoryBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline">Frontend</Badge>
      <Badge variant="outline">Backend</Badge>
      <Badge variant="outline">Database</Badge>
      <Badge variant="outline">DevOps</Badge>
      <Badge variant="outline">Design</Badge>
    </div>
  ),
};

// Technology badges
export const TechnologyBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="info">React</Badge>
      <Badge variant="info">Vue</Badge>
      <Badge variant="info">TypeScript</Badge>
      <Badge variant="info">Node.js</Badge>
      <Badge variant="info">Python</Badge>
    </div>
  ),
};

// User badges
export const UserBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">@username</Badge>
      <Badge variant="secondary">#hashtag</Badge>
      <Badge variant="outline">$price</Badge>
      <Badge variant="info">%discount</Badge>
    </div>
  ),
};

// Interactive badges
export const InteractiveBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge asChild>
        <button>Clickable Badge</button>
      </Badge>
      <Badge asChild>
        <a href="#test">Link Badge</a>
      </Badge>
      <Badge asChild>
        <span>Span Badge</span>
      </Badge>
    </div>
  ),
};

// Long text badges
export const LongTextBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>This is a very long badge text</Badge>
      <Badge variant="secondary">Another long badge with more text</Badge>
      <Badge variant="outline">Short</Badge>
    </div>
  ),
};

// Mixed content badges
export const MixedContentBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>
        <span>🔔</span>
        <span> </span>
        <span>New</span>
        <span> </span>
        <span>(3)</span>
      </Badge>
      <Badge variant="success">
        <span>✅</span>
        <span> </span>
        <span>Done</span>
        <span> </span>
        <span>✓</span>
      </Badge>
      <Badge variant="warning">
        <span>⚠️</span>
        <span> </span>
        <span>Alert</span>
        <span> </span>
        <span>!</span>
      </Badge>
    </div>
  ),
};

// Emoji badges
export const EmojiBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>🚀</Badge>
      <Badge variant="secondary">⭐</Badge>
      <Badge variant="success">🔥</Badge>
      <Badge variant="warning">💎</Badge>
      <Badge variant="info">🎯</Badge>
    </div>
  ),
};

// Special characters badges
export const SpecialCharactersBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>@</Badge>
      <Badge variant="secondary">#</Badge>
      <Badge variant="success">$</Badge>
      <Badge variant="warning">%</Badge>
      <Badge variant="info">&</Badge>
      <Badge variant="outline">*</Badge>
    </div>
  ),
};

// Unicode badges
export const UnicodeBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>α</Badge>
      <Badge variant="secondary">β</Badge>
      <Badge variant="success">γ</Badge>
      <Badge variant="warning">δ</Badge>
      <Badge variant="info">ε</Badge>
    </div>
  ),
};

// Multilingual badges
export const MultilingualBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>English</Badge>
      <Badge variant="secondary">中文</Badge>
      <Badge variant="success">日本語</Badge>
      <Badge variant="warning">한국어</Badge>
      <Badge variant="info">العربية</Badge>
    </div>
  ),
};

// Badge combinations
export const BadgeCombinations: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Badge variant="success" size="sm">Small Success</Badge>
        <Badge variant="warning" size="md">Medium Warning</Badge>
        <Badge variant="destructive" size="lg">Large Destructive</Badge>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge variant="info" size="sm">Small Info</Badge>
        <Badge variant="outline" size="md">Medium Outline</Badge>
        <Badge variant="secondary" size="lg">Large Secondary</Badge>
      </div>
    </div>
  ),
};

// Badge in context
export const BadgeInContext: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span>Project Status:</span>
        <Badge variant="success">On Track</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>Priority:</span>
        <Badge variant="destructive">High</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>Category:</span>
        <Badge variant="outline">Frontend</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>Technology:</span>
        <Badge variant="info">React</Badge>
      </div>
    </div>
  ),
};

// Badge with custom styling
export const CustomStyledBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-purple-500 text-white hover:bg-purple-600">
        Custom Purple
      </Badge>
      <Badge className="bg-pink-500 text-white hover:bg-pink-600">
        Custom Pink
      </Badge>
      <Badge className="bg-indigo-500 text-white hover:bg-indigo-600">
        Custom Indigo
      </Badge>
    </div>
  ),
};
