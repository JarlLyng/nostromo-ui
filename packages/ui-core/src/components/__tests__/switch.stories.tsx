import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "../switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Whether the switch is checked.",
    },
    defaultChecked: {
      control: "boolean",
      description: "The default checked state when uncontrolled.",
    },
    disabled: {
      control: "boolean",
      description: "Whether the switch is disabled.",
    },
    required: {
      control: "boolean",
      description: "Whether the switch is required.",
    },
    label: {
      control: "text",
      description: "The label for the switch.",
    },
    helperText: {
      control: "text",
      description: "Helper text displayed below the switch.",
    },
    error: {
      control: "boolean",
      description: "Applies error styling and aria-invalid attribute.",
    },
    variant: {
      control: "select",
      options: ["default", "error", "success"],
      description: "The visual variant of the switch.",
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      description: "The size of the switch.",
    },
    onCheckedChange: {
      action: "checkedChange",
      description: "Event handler for when the checked state changes.",
    },
  },
  args: {
    label: "Enable notifications",
    defaultChecked: false,
    disabled: false,
    required: false,
    error: false,
    variant: "default",
    size: "default",
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: "Receive notifications about important updates.",
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
    label: "I agree to the terms",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    label: "Small switch",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    label: "Large switch",
  },
};

export const SuccessState: Story = {
  args: {
    variant: "success",
    helperText: "Successfully enabled.",
    defaultChecked: true,
  },
};

export const CustomId: Story = {
  args: {
    id: "custom-switch-id",
    label: "Switch with custom ID",
  },
  render: (args) => (
    <div className="flex flex-col space-y-4">
      <Switch {...args} />
      <label htmlFor="custom-switch-id" className="text-sm text-muted-foreground">
        This label is explicitly linked to the custom ID.
      </label>
    </div>
  ),
};

export const Controlled: Story = {
  args: {
    label: "Controlled switch",
    checked: false,
  },
  render: (args) => {
    const [checked, setChecked] = React.useState(false);
    return (
      <div className="flex flex-col space-y-4">
        <Switch 
          {...args} 
          checked={checked} 
          onCheckedChange={setChecked} 
        />
        <p className="text-sm text-muted-foreground">
          Current state: {checked ? "On" : "Off"}
        </p>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Notification Settings</h3>
      <div className="space-y-3">
        <Switch 
          label="Email notifications" 
          helperText="Receive updates via email"
          defaultChecked 
        />
        <Switch 
          label="Push notifications" 
          helperText="Receive push notifications on your device"
        />
        <Switch 
          label="SMS notifications" 
          helperText="Receive updates via SMS"
          disabled 
        />
      </div>
    </div>
  ),
};
