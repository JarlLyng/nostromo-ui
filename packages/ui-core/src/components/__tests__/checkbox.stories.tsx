import React from 'react';
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A checkbox component with variants, sizes, and accessibility features.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "error", "success"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "default", "lg"],
    },
    error: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    required: {
      control: { type: "boolean" },
    },
    defaultChecked: {
      control: { type: "boolean" },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "Accept terms and conditions",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Subscribe to newsletter",
    helperText: "We'll send you updates about new features and products.",
  },
};

export const Required: Story = {
  args: {
    label: "I agree to the terms",
    required: true,
  },
};

export const Error: Story = {
  args: {
    label: "Accept terms and conditions",
    error: true,
    helperText: "You must accept the terms to continue.",
  },
};

export const Success: Story = {
  args: {
    label: "Email verified",
    variant: "success",
    defaultChecked: true,
    helperText: "Your email has been verified.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled checkbox",
    disabled: true,
  },
};

export const Checked: Story = {
  args: {
    label: "Pre-checked option",
    defaultChecked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox label="Small checkbox" size="sm" />
      <Checkbox label="Default checkbox" size="default" />
      <Checkbox label="Large checkbox" size="lg" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox label="Default variant" variant="default" />
      <Checkbox label="Error variant" variant="error" />
      <Checkbox label="Success variant" variant="success" />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form className="space-y-4">
      <div>
        <Checkbox 
          label="I agree to the Terms of Service" 
          required 
        />
      </div>
      <div>
        <Checkbox 
          label="I agree to the Privacy Policy" 
          required 
        />
      </div>
      <div>
        <Checkbox 
          label="Send me marketing emails" 
          helperText="You can unsubscribe at any time" 
        />
      </div>
    </form>
  ),
};

export const ErrorStates: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox 
        label="Required field" 
        error 
        helperText="This field is required" 
      />
      <Checkbox 
        label="Invalid selection" 
        variant="error" 
        helperText="Please select a valid option" 
      />
    </div>
  ),
};
