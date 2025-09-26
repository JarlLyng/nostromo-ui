import React from 'react';
import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "../separator";

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "The orientation of the separator.",
    },
    variant: {
      control: "select",
      options: ["default", "muted", "subtle"],
      description: "The visual variant of the separator.",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "The size of the separator.",
    },
    decorative: {
      control: "boolean",
      description: "Whether the separator is decorative (not announced by screen readers).",
    },
  },
  args: {
    orientation: "horizontal",
    variant: "default",
    size: "default",
    decorative: true,
  },
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  args: {},
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <div className="flex h-20 items-center space-x-4">
      <div>Content</div>
      <Separator {...args} />
      <div>Content</div>
    </div>
  ),
};

export const Muted: Story = {
  args: {
    variant: "muted",
  },
};

export const Subtle: Story = {
  args: {
    variant: "subtle",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const NonDecorative: Story = {
  args: {
    decorative: false,
  },
};

export const InContext: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">Section 1</div>
      <div className="space-y-2">
        <p>Content in section 1</p>
        <p>More content in section 1</p>
      </div>
      <Separator />
      <div className="text-sm text-muted-foreground">Section 2</div>
      <div className="space-y-2">
        <p>Content in section 2</p>
        <p>More content in section 2</p>
      </div>
    </div>
  ),
};

export const VerticalInContext: Story = {
  render: () => (
    <div className="flex h-32 items-center space-x-4">
      <div className="space-y-2">
        <p>Left content</p>
        <p>More left content</p>
      </div>
      <Separator orientation="vertical" />
      <div className="space-y-2">
        <p>Right content</p>
        <p>More right content</p>
      </div>
    </div>
  ),
};

export const MultipleVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">Default separator</div>
      <Separator />
      
      <div className="text-sm text-muted-foreground">Muted separator</div>
      <Separator variant="muted" />
      
      <div className="text-sm text-muted-foreground">Subtle separator</div>
      <Separator variant="subtle" />
      
      <div className="text-sm text-muted-foreground">Small separator</div>
      <Separator size="sm" />
      
      <div className="text-sm text-muted-foreground">Large separator</div>
      <Separator size="lg" />
    </div>
  ),
};

export const AccessibilityExample: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Section 1</h3>
        <p>This is the first section of content.</p>
      </div>
      
      <Separator decorative={false} />
      
      <div>
        <h3 className="text-lg font-semibold">Section 2</h3>
        <p>This is the second section of content, separated by a non-decorative separator.</p>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-semibold">Section 3</h3>
        <p>This is the third section of content, separated by a decorative separator.</p>
      </div>
    </div>
  ),
};
