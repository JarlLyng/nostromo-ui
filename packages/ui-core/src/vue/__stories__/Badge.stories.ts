import type { Meta, StoryObj } from '@storybook/vue3';
import { NBadge } from '../badge';

const meta: Meta<typeof NBadge> = {
  title: 'Vue/Badge',
  component: NBadge,
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
    class: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic badge
export const Default: Story = {
  render: () => ({
    components: { NBadge },
    template: `<NBadge>Default Badge</NBadge>`,
  }),
};

// Different variants
export const Secondary: Story = {
  render: () => ({
    components: { NBadge },
    template: `<NBadge variant="secondary">Secondary Badge</NBadge>`,
  }),
};

export const Destructive: Story = {
  render: () => ({
    components: { NBadge },
    template: `<NBadge variant="destructive">Destructive Badge</NBadge>`,
  }),
};

export const Outline: Story = {
  render: () => ({
    components: { NBadge },
    template: `<NBadge variant="outline">Outline Badge</NBadge>`,
  }),
};

export const Success: Story = {
  render: () => ({
    components: { NBadge },
    template: `<NBadge variant="success">Success Badge</NBadge>`,
  }),
};

export const Warning: Story = {
  render: () => ({
    components: { NBadge },
    template: `<NBadge variant="warning">Warning Badge</NBadge>`,
  }),
};

export const Info: Story = {
  render: () => ({
    components: { NBadge },
    template: `<NBadge variant="info">Info Badge</NBadge>`,
  }),
};

// Different sizes
export const Small: Story = {
  render: () => ({
    components: { NBadge },
    template: `<NBadge size="sm">Small Badge</NBadge>`,
  }),
};

export const Medium: Story = {
  render: () => ({
    components: { NBadge },
    template: `<NBadge size="md">Medium Badge</NBadge>`,
  }),
};

export const Large: Story = {
  render: () => ({
    components: { NBadge },
    template: `<NBadge size="lg">Large Badge</NBadge>`,
  }),
};

// All variants
export const AllVariants: Story = {
  render: () => ({
    components: { NBadge },
    template: `
      <div class="flex flex-wrap gap-2">
        <NBadge variant="default">Default</NBadge>
        <NBadge variant="secondary">Secondary</NBadge>
        <NBadge variant="destructive">Destructive</NBadge>
        <NBadge variant="outline">Outline</NBadge>
        <NBadge variant="success">Success</NBadge>
        <NBadge variant="warning">Warning</NBadge>
        <NBadge variant="info">Info</NBadge>
      </div>
    `,
  }),
};

// All sizes
export const AllSizes: Story = {
  render: () => ({
    components: { NBadge },
    template: `
      <div class="flex items-center gap-2">
        <NBadge size="sm">Small</NBadge>
        <NBadge size="md">Medium</NBadge>
        <NBadge size="lg">Large</NBadge>
      </div>
    `,
  }),
};

// With icons
export const WithIcons: Story = {
  render: () => ({
    components: { NBadge },
    template: `
      <div class="flex flex-wrap gap-2">
        <NBadge>
          <span>🔔</span>
          <span>Notifications</span>
        </NBadge>
        <NBadge variant="success">
          <span>✅</span>
          <span>Completed</span>
        </NBadge>
        <NBadge variant="warning">
          <span>⚠️</span>
          <span>Warning</span>
        </NBadge>
        <NBadge variant="destructive">
          <span>❌</span>
          <span>Error</span>
        </NBadge>
      </div>
    `,
  }),
};

// With numbers
export const WithNumbers: Story = {
  render: () => ({
    components: { NBadge },
    template: `
      <div class="flex flex-wrap gap-2">
        <NBadge>1</NBadge>
        <NBadge variant="secondary">42</NBadge>
        <NBadge variant="success">99+</NBadge>
        <NBadge variant="warning">1,000</NBadge>
      </div>
    `,
  }),
};

// Status badges
export const StatusBadges: Story = {
  render: () => ({
    components: { NBadge },
    template: `
      <div class="flex flex-wrap gap-2">
        <NBadge variant="success">Active</NBadge>
        <NBadge variant="secondary">Inactive</NBadge>
        <NBadge variant="warning">Pending</NBadge>
        <NBadge variant="destructive">Failed</NBadge>
        <NBadge variant="info">Processing</NBadge>
      </div>
    `,
  }),
};

// Priority badges
export const PriorityBadges: Story = {
  render: () => ({
    components: { NBadge },
    template: `
      <div class="flex flex-wrap gap-2">
        <NBadge variant="destructive">High</NBadge>
        <NBadge variant="warning">Medium</NBadge>
        <NBadge variant="info">Low</NBadge>
      </div>
    `,
  }),
};

// Category badges
export const CategoryBadges: Story = {
  render: () => ({
    components: { NBadge },
    template: `
      <div class="flex flex-wrap gap-2">
        <NBadge variant="outline">Frontend</NBadge>
        <NBadge variant="outline">Backend</NBadge>
        <NBadge variant="outline">Database</NBadge>
        <NBadge variant="outline">DevOps</NBadge>
        <NBadge variant="outline">Design</NBadge>
      </div>
    `,
  }),
};

// Technology badges
export const TechnologyBadges: Story = {
  render: () => ({
    components: { NBadge },
    template: `
      <div class="flex flex-wrap gap-2">
        <NBadge variant="info">React</NBadge>
        <NBadge variant="info">Vue</NBadge>
        <NBadge variant="info">TypeScript</NBadge>
        <NBadge variant="info">Node.js</NBadge>
        <NBadge variant="info">Python</NBadge>
      </div>
    `,
  }),
};

// User badges
export const UserBadges: Story = {
  render: () => ({
    components: { NBadge },
    template: `
      <div class="flex flex-wrap gap-2">
        <NBadge variant="default">@username</NBadge>
        <NBadge variant="secondary">#hashtag</NBadge>
        <NBadge variant="outline">$price</NBadge>
        <NBadge variant="info">%discount</NBadge>
      </div>
    `,
  }),
};

// Interactive badges
export const InteractiveBadges: Story = {
  render: () => ({
    components: { NBadge },
    template: `
      <div class="flex flex-wrap gap-2">
        <NBadge asChild>
          <button>Clickable Badge</button>
        </NBadge>
        <NBadge asChild>
          <a href="#test">Link Badge</a>
        </NBadge>
        <NBadge asChild>
          <span>Span Badge</span>
        </NBadge>
      </div>
    `,
  }),
};

// Long text badges
export const LongTextBadges: Story = {
  render: () => ({
    components: { NBadge },
    template: `
      <div class="flex flex-wrap gap-2">
        <NBadge>This is a very long badge text</NBadge>
        <NBadge variant="secondary">Another long badge with more text</NBadge>
        <NBadge variant="outline">Short</NBadge>
      </div>
    `,
  }),
};

// Mixed content badges
export const MixedContentBadges: Story = {
  render: () => ({
    components: { NBadge },
    template: `
      <div class="flex flex-wrap gap-2">
        <NBadge>
          <span>🔔</span>
          <span> </span>
          <span>New</span>
          <span> </span>
          <span>(3)</span>
        </NBadge>
        <NBadge variant="success">
          <span>✅</span>
          <span> </span>
          <span>Done</span>
          <span> </span>
          <span>✓</span>
        </NBadge>
        <NBadge variant="warning">
          <span>⚠️</span>
          <span> </span>
          <span>Alert</span>
          <span> </span>
          <span>!</span>
        </NBadge>
      </div>
    `,
  }),
};

// Emoji badges
export const EmojiBadges: Story = {
  render: () => ({
    components: { NBadge },
    template: `
      <div class="flex flex-wrap gap-2">
        <NBadge>🚀</NBadge>
        <NBadge variant="secondary">⭐</NBadge>
        <NBadge variant="success">🔥</NBadge>
        <NBadge variant="warning">💎</NBadge>
        <NBadge variant="info">🎯</NBadge>
      </div>
    `,
  }),
};

// Special characters badges
export const SpecialCharactersBadges: Story = {
  render: () => ({
    components: { NBadge },
    template: `
      <div class="flex flex-wrap gap-2">
        <NBadge>@</NBadge>
        <NBadge variant="secondary">#</NBadge>
        <NBadge variant="success">$</NBadge>
        <NBadge variant="warning">%</NBadge>
        <NBadge variant="info">&</NBadge>
        <NBadge variant="outline">*</NBadge>
      </div>
    `,
  }),
};

// Unicode badges
export const UnicodeBadges: Story = {
  render: () => ({
    components: { NBadge },
    template: `
      <div class="flex flex-wrap gap-2">
        <NBadge>α</NBadge>
        <NBadge variant="secondary">β</NBadge>
        <NBadge variant="success">γ</NBadge>
        <NBadge variant="warning">δ</NBadge>
        <NBadge variant="info">ε</NBadge>
      </div>
    `,
  }),
};

// Multilingual badges
export const MultilingualBadges: Story = {
  render: () => ({
    components: { NBadge },
    template: `
      <div class="flex flex-wrap gap-2">
        <NBadge>English</NBadge>
        <NBadge variant="secondary">中文</NBadge>
        <NBadge variant="success">日本語</NBadge>
        <NBadge variant="warning">한국어</NBadge>
        <NBadge variant="info">العربية</NBadge>
      </div>
    `,
  }),
};

// Badge combinations
export const BadgeCombinations: Story = {
  render: () => ({
    components: { NBadge },
    template: `
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <NBadge variant="success" size="sm">Small Success</NBadge>
          <NBadge variant="warning" size="md">Medium Warning</NBadge>
          <NBadge variant="destructive" size="lg">Large Destructive</NBadge>
        </div>
        <div class="flex flex-wrap gap-2">
          <NBadge variant="info" size="sm">Small Info</NBadge>
          <NBadge variant="outline" size="md">Medium Outline</NBadge>
          <NBadge variant="secondary" size="lg">Large Secondary</NBadge>
        </div>
      </div>
    `,
  }),
};

// Badge in context
export const BadgeInContext: Story = {
  render: () => ({
    components: { NBadge },
    template: `
      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <span>Project Status:</span>
          <NBadge variant="success">On Track</NBadge>
        </div>
        <div class="flex items-center gap-2">
          <span>Priority:</span>
          <NBadge variant="destructive">High</NBadge>
        </div>
        <div class="flex items-center gap-2">
          <span>Category:</span>
          <NBadge variant="outline">Frontend</NBadge>
        </div>
        <div class="flex items-center gap-2">
          <span>Technology:</span>
          <NBadge variant="info">React</NBadge>
        </div>
      </div>
    `,
  }),
};

// Badge with custom styling
export const CustomStyledBadges: Story = {
  render: () => ({
    components: { NBadge },
    template: `
      <div class="flex flex-wrap gap-2">
        <NBadge class="bg-purple-500 text-white hover:bg-purple-600">
          Custom Purple
        </NBadge>
        <NBadge class="bg-pink-500 text-white hover:bg-pink-600">
          Custom Pink
        </NBadge>
        <NBadge class="bg-indigo-500 text-white hover:bg-indigo-600">
          Custom Indigo
        </NBadge>
      </div>
    `,
  }),
};
