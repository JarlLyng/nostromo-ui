import type { Meta, StoryObj } from '@storybook/vue3';
import { fn } from '@storybook/test';
import { NInput } from '../input';

const meta: Meta<typeof NInput> = {
  title: 'Vue/Input',
  component: NInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile Vue input component with multiple variants, sizes, and validation states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error', 'success'],
      description: 'Visual variant of the input',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'HTML input type',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text for the input',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
    error: {
      control: { type: 'text' },
      description: 'Error message to display',
    },
    success: {
      control: { type: 'text' },
      description: 'Success message to display',
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text to display',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the input is required',
    },
    class: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

// With label
export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
  },
};

// With helper text
export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters long',
  },
};

// Error state
export const Error: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
    error: 'Please enter a valid email address',
    value: 'invalid-email',
  },
};

// Success state
export const Success: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
    success: 'Email address is valid',
    value: 'user@example.com',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
    value: 'Cannot edit this',
  },
};

// Required field
export const Required: Story = {
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
  },
};

// Different sizes
export const Small: Story = {
  args: {
    label: 'Small Input',
    placeholder: 'Small size',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium Input',
    placeholder: 'Medium size (default)',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Input',
    placeholder: 'Large size',
    size: 'lg',
  },
};

// Different types
export const Email: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'user@example.com',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
  },
};

export const Number: Story = {
  args: {
    label: 'Age',
    type: 'number',
    placeholder: 'Enter your age',
    min: 0,
    max: 120,
  },
};

export const Tel: Story = {
  args: {
    label: 'Phone Number',
    type: 'tel',
    placeholder: '+1 (555) 123-4567',
  },
};

export const Url: Story = {
  args: {
    label: 'Website',
    type: 'url',
    placeholder: 'https://example.com',
  },
};

// Variants
export const DefaultVariant: Story = {
  args: {
    label: 'Default Variant',
    placeholder: 'Default styling',
    variant: 'default',
  },
};

export const ErrorVariant: Story = {
  args: {
    label: 'Error Variant',
    placeholder: 'Error styling',
    variant: 'error',
  },
};

export const SuccessVariant: Story = {
  args: {
    label: 'Success Variant',
    placeholder: 'Success styling',
    variant: 'success',
  },
};

// Form example
export const FormExample: Story = {
  render: () => ({
    components: { NInput },
    template: `
      <div class="space-y-4 w-80">
        <NInput
          label="Full Name"
          placeholder="Enter your full name"
          :required="true"
        />
        <NInput
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          :required="true"
          helperText="We'll never share your email"
        />
        <NInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          :required="true"
          helperText="Must be at least 8 characters"
        />
        <NInput
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 123-4567"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Example of multiple inputs in a form layout.',
      },
    },
  },
};

// Validation states example
export const ValidationStates: Story = {
  render: () => ({
    components: { NInput },
    template: `
      <div class="space-y-4 w-80">
        <NInput
          label="Valid Input"
          placeholder="This input is valid"
          success="Input is valid"
          value="valid@example.com"
        />
        <NInput
          label="Invalid Input"
          placeholder="This input has an error"
          error="This field is required"
          value=""
        />
        <NInput
          label="Helper Text"
          placeholder="This input has helper text"
          helperText="This is helpful information"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Different validation states and messages.',
      },
    },
  },
};

// All sizes comparison
export const SizeComparison: Story = {
  render: () => ({
    components: { NInput },
    template: `
      <div class="space-y-4 w-80">
        <NInput
          label="Small Size"
          placeholder="Small input"
          size="sm"
        />
        <NInput
          label="Medium Size (Default)"
          placeholder="Medium input"
          size="md"
        />
        <NInput
          label="Large Size"
          placeholder="Large input"
          size="lg"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of different input sizes.',
      },
    },
  },
};

// Interactive example
export const Interactive: Story = {
  render: () => ({
    components: { NInput },
    data() {
      return {
        value: '',
        error: '',
        success: '',
      };
    },
    methods: {
      handleChange(newValue: string) {
        this.value = newValue;
        
        // Simple email validation
        if (newValue && !newValue.includes('@')) {
          this.error = 'Please enter a valid email address';
          this.success = '';
        } else if (newValue && newValue.includes('@')) {
          this.error = '';
          this.success = 'Email address looks good!';
        } else {
          this.error = '';
          this.success = '';
        }
      },
    },
    template: `
      <div class="w-80">
        <NInput
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          :value="value"
          @change="handleChange"
          :error="error"
          :success="success"
        />
        <div class="mt-2 text-sm text-neutral-500">
          Current value: {{ value || '(empty)' }}
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Interactive input with real-time validation.',
      },
    },
  },
};
