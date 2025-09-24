import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertTitle, AlertDescription } from "../alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error", "info"],
      description: "The visual variant of the alert.",
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      description: "The size of the alert.",
    },
    title: {
      control: "text",
      description: "The title of the alert.",
    },
    description: {
      control: "text",
      description: "The description of the alert.",
    },
    dismissible: {
      control: "boolean",
      description: "Whether the alert can be dismissed.",
    },
    onDismiss: {
      action: "dismiss",
      description: "Event handler for when the alert is dismissed.",
    },
    icon: {
      control: false,
      description: "Custom icon to display in the alert.",
    },
  },
  args: {
    title: "Alert Title",
    description: "This is an alert description.",
    dismissible: false,
    variant: "default",
    size: "default",
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {},
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Success!",
    description: "Your action was completed successfully.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    description: "Please review your input before proceeding.",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "Error",
    description: "Something went wrong. Please try again.",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    title: "Information",
    description: "Here's some additional information for you.",
  },
};

export const Dismissible: Story = {
  args: {
    dismissible: true,
    title: "Dismissible Alert",
    description: "This alert can be dismissed by clicking the X button.",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    title: "Small Alert",
    description: "This is a small alert.",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    title: "Large Alert",
    description: "This is a large alert with more prominent styling.",
  },
};

export const WithoutTitle: Story = {
  args: {
    description: "This alert has no title, only a description.",
  },
};

export const WithoutDescription: Story = {
  args: {
    title: "Title Only",
  },
};

export const CustomIcon: Story = {
  args: {
    title: "Custom Icon Alert",
    description: "This alert has a custom icon.",
    icon: <span className="text-2xl">🚀</span>,
  },
};

export const NoIcon: Story = {
  args: {
    title: "No Icon Alert",
    description: "This alert has no icon.",
    icon: null,
  },
};

export const WithChildren: Story = {
  args: {
    title: "Alert with Children",
    children: (
      <div className="mt-2">
        <p>This alert contains custom children content.</p>
        <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm">
          Action Button
        </button>
      </div>
    ),
  },
};

export const Controlled: Story = {
  args: {
    title: "Controlled Alert",
    description: "This alert's visibility is controlled by state.",
    dismissible: true,
  },
  render: (args) => {
    const [isVisible, setIsVisible] = React.useState(true);
    
    if (!isVisible) {
      return (
        <div className="p-4 border rounded-lg bg-gray-50">
          <p className="text-sm text-gray-600">Alert has been dismissed.</p>
          <button 
            onClick={() => setIsVisible(true)}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
          >
            Show Alert Again
          </button>
        </div>
      );
    }
    
    return (
      <Alert 
        {...args} 
        onDismiss={() => setIsVisible(false)}
      />
    );
  },
};

export const AlertExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Alert Examples</h3>
      <div className="space-y-3">
        <Alert variant="success" title="Success" description="Operation completed successfully." />
        <Alert variant="warning" title="Warning" description="Please review your input." />
        <Alert variant="error" title="Error" description="Something went wrong." />
        <Alert variant="info" title="Info" description="Additional information available." />
        <Alert 
          variant="default" 
          title="Dismissible Alert" 
          description="This alert can be dismissed." 
          dismissible 
        />
      </div>
    </div>
  ),
};

export const AlertComponents: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Alert Components</h3>
      <Alert variant="success">
        <AlertTitle>Success Alert</AlertTitle>
        <AlertDescription>
          This alert uses the separate AlertTitle and AlertDescription components.
        </AlertDescription>
      </Alert>
      
      <Alert variant="warning">
        <AlertTitle>Warning Alert</AlertTitle>
        <AlertDescription>
          You can also mix and match with custom content.
        </AlertDescription>
        <div className="mt-2">
          <button className="px-3 py-1 bg-yellow-500 text-white rounded text-sm">
            Take Action
          </button>
        </div>
      </Alert>
    </div>
  ),
};
