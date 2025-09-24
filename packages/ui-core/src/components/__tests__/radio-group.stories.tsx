import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioItem } from "../radio-group";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A radio group component with variants, sizes, and accessibility features.",
      },
    },
  },
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["vertical", "horizontal"],
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
    defaultValue: {
      control: { type: "text" },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    label: "Choose an option",
    children: (
      <>
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
        <RadioItem value="option3" label="Option 3" />
      </>
    ),
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Select your preference",
    helperText: "Choose the option that best describes your needs.",
    children: (
      <>
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
        <RadioItem value="option3" label="Option 3" />
      </>
    ),
  },
};

export const Required: Story = {
  args: {
    label: "Required selection",
    required: true,
    children: (
      <>
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
        <RadioItem value="option3" label="Option 3" />
      </>
    ),
  },
};

export const Error: Story = {
  args: {
    label: "Choose an option",
    error: true,
    helperText: "Please select an option to continue.",
    children: (
      <>
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
        <RadioItem value="option3" label="Option 3" />
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled radio group",
    disabled: true,
    children: (
      <>
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
        <RadioItem value="option3" label="Option 3" />
      </>
    ),
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: "Choose an option",
    defaultValue: "option2",
    children: (
      <>
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
        <RadioItem value="option3" label="Option 3" />
      </>
    ),
  },
};

export const Horizontal: Story = {
  args: {
    label: "Choose an option",
    orientation: "horizontal",
    children: (
      <>
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
        <RadioItem value="option3" label="Option 3" />
        <RadioItem value="option4" label="Option 4" />
      </>
    ),
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <RadioGroup label="Small size">
        <RadioItem value="option1" label="Option 1" size="sm" />
        <RadioItem value="option2" label="Option 2" size="sm" />
      </RadioGroup>
      <RadioGroup label="Default size">
        <RadioItem value="option1" label="Option 1" size="default" />
        <RadioItem value="option2" label="Option 2" size="default" />
      </RadioGroup>
      <RadioGroup label="Large size">
        <RadioItem value="option1" label="Option 1" size="lg" />
        <RadioItem value="option2" label="Option 2" size="lg" />
      </RadioGroup>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <RadioGroup label="Default variant">
        <RadioItem value="option1" label="Option 1" variant="default" />
        <RadioItem value="option2" label="Option 2" variant="default" />
      </RadioGroup>
      <RadioGroup label="Error variant">
        <RadioItem value="option1" label="Option 1" variant="error" />
        <RadioItem value="option2" label="Option 2" variant="error" />
      </RadioGroup>
      <RadioGroup label="Success variant">
        <RadioItem value="option1" label="Option 1" variant="success" />
        <RadioItem value="option2" label="Option 2" variant="success" />
      </RadioGroup>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form className="space-y-6">
      <RadioGroup label="What is your preferred contact method?" required>
        <RadioItem value="email" label="Email" />
        <RadioItem value="phone" label="Phone" />
        <RadioItem value="sms" label="SMS" />
      </RadioGroup>
      
      <RadioGroup label="How did you hear about us?" helperText="Select all that apply">
        <RadioItem value="social" label="Social Media" />
        <RadioItem value="search" label="Search Engine" />
        <RadioItem value="referral" label="Friend Referral" />
        <RadioItem value="ad" label="Advertisement" />
      </RadioGroup>
    </form>
  ),
};

export const ErrorStates: Story = {
  render: () => (
    <div className="space-y-4">
      <RadioGroup 
        label="Required field" 
        error 
        helperText="This field is required" 
      >
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
      </RadioGroup>
      
      <RadioGroup 
        label="Invalid selection" 
        error 
        helperText="Please select a valid option" 
      >
        <RadioItem value="option1" label="Option 1" />
        <RadioItem value="option2" label="Option 2" />
      </RadioGroup>
    </div>
  ),
};
