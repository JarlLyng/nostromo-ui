import React from 'react';
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "../textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "The controlled value of the textarea.",
    },
    defaultValue: {
      control: "text",
      description: "The default value of the textarea when uncontrolled.",
    },
    disabled: {
      control: "boolean",
      description: "Whether the textarea is disabled.",
    },
    required: {
      control: "boolean",
      description: "Whether the textarea is required.",
    },
    label: {
      control: "text",
      description: "The label for the textarea.",
    },
    helperText: {
      control: "text",
      description: "Helper text displayed below the textarea.",
    },
    error: {
      control: "boolean",
      description: "Applies error styling and aria-invalid attribute.",
    },
    variant: {
      control: "select",
      options: ["default", "error", "success"],
      description: "The visual variant of the textarea.",
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      description: "The size of the textarea.",
    },
    autoResize: {
      control: "boolean",
      description: "Whether the textarea should auto-resize based on content.",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the textarea.",
    },
    rows: {
      control: "number",
      description: "Number of visible text lines.",
    },
    onChange: {
      action: "change",
      description: "Event handler for when the value changes.",
    },
    onInput: {
      action: "input",
      description: "Event handler for when the user types.",
    },
  },
  args: {
    label: "Message",
    placeholder: "Enter your message...",
    autoResize: true,
    disabled: false,
    required: false,
    error: false,
    variant: "default",
    size: "default",
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {},
};

export const WithValue: Story = {
  args: {
    defaultValue: "This is a default message.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "This textarea is disabled.",
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: "Please provide a detailed message.",
  },
};

export const ErrorState: Story = {
  args: {
    error: true,
    helperText: "This field is required.",
  },
};

export const Required: Story = {
  args: {
    required: true,
    label: "Required Message",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    label: "Small textarea",
    placeholder: "Short message...",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    label: "Large textarea",
    placeholder: "Long message...",
  },
};

export const SuccessState: Story = {
  args: {
    variant: "success",
    helperText: "Message saved successfully.",
    defaultValue: "Your message has been saved.",
  },
};

export const NoAutoResize: Story = {
  args: {
    autoResize: false,
    label: "Fixed height textarea",
    rows: 4,
  },
};

export const CustomId: Story = {
  args: {
    id: "custom-textarea-id",
    label: "Textarea with custom ID",
  },
  render: (args) => (
    <div className="flex flex-col space-y-4">
      <Textarea {...args} />
      <label htmlFor="custom-textarea-id" className="text-sm text-muted-foreground">
        This label is explicitly linked to the custom ID.
      </label>
    </div>
  ),
};

export const Controlled: Story = {
  args: {
    label: "Controlled textarea",
    value: "",
  },
  render: (args) => {
    const [value, setValue] = React.useState("");
    return (
      <div className="flex flex-col space-y-4">
        <Textarea 
          {...args} 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
        />
        <p className="text-sm text-muted-foreground">
          Character count: {value.length}
        </p>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Contact Form</h3>
      <div className="space-y-3">
        <Textarea 
          label="Subject" 
          placeholder="What is this about?"
          size="sm"
        />
        <Textarea 
          label="Message" 
          placeholder="Please describe your inquiry in detail..."
          helperText="Be as specific as possible to help us assist you better."
          rows={6}
        />
        <Textarea 
          label="Additional Notes" 
          placeholder="Any additional information..."
          variant="success"
          helperText="Optional field"
        />
      </div>
    </div>
  ),
};
