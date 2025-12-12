import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pricing } from '../pricing';

const samplePlans = [
  {
    id: '1',
    name: 'Starter',
    description: 'Perfect for small projects',
    price: {
      monthly: 9,
      yearly: 90,
    },
    currency: 'USD',
    period: 'month',
    features: [
      { id: '1', name: 'Up to 5 projects', included: true },
      { id: '2', name: 'Basic support', included: true },
      { id: '3', name: '1GB storage', included: true },
    ],
    cta: {
      text: 'Get Started',
      onClick: () => console.log('Starter plan clicked'),
    },
  },
  {
    id: '2',
    name: 'Pro',
    description: 'For growing teams',
    price: {
      monthly: 29,
      yearly: 290,
    },
    currency: 'USD',
    period: 'month',
    features: [
      { id: '1', name: 'Unlimited projects', included: true },
      { id: '2', name: 'Priority support', included: true },
      { id: '3', name: '10GB storage', included: true },
      { id: '4', name: 'Advanced features', included: true },
    ],
    cta: {
      text: 'Start Free Trial',
      onClick: () => console.log('Pro plan clicked'),
    },
    popular: true,
    badge: {
      text: 'Most Popular',
      variant: 'default' as const,
    },
  },
  {
    id: '3',
    name: 'Enterprise',
    description: 'For large organizations',
    price: {
      monthly: 99,
      yearly: 990,
    },
    currency: 'USD',
    period: 'month',
    features: [
      { id: '1', name: 'Everything in Pro', included: true },
      { id: '2', name: 'Dedicated support', included: true },
      { id: '3', name: 'Custom integrations', included: true },
      { id: '4', name: 'SLA guarantee', included: true },
    ],
    cta: {
      text: 'Contact Sales',
      onClick: () => console.log('Enterprise plan clicked'),
    },
  },
];

const meta: Meta<typeof Pricing> = {
  title: 'Components/Pricing',
  component: Pricing,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Pricing tables and plans with yearly/monthly toggle and popular plan highlighting.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'accent'],
      description: 'Visual variant',
    },
    columns: {
      control: 'select',
      options: [1, 2, 3, 4],
      description: 'Number of columns in grid',
    },
    showYearly: {
      control: 'boolean',
      description: 'Show yearly billing toggle',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pricing>;

export const Default: Story = {
  args: {
    title: 'Choose Your Plan',
    subtitle: 'Flexible pricing for teams of all sizes',
    plans: samplePlans,
    columns: 3,
  },
};

export const WithYearlyToggle: Story = {
  args: {
    title: 'Pricing Plans',
    subtitle: 'Save 20% with yearly billing',
    plans: samplePlans,
    columns: 3,
    showYearly: true,
    onToggleBilling: (yearly) => console.log('Billing toggled:', yearly),
  },
};

export const TwoColumns: Story = {
  args: {
    title: 'Simple Pricing',
    plans: samplePlans.slice(0, 2),
    columns: 2,
  },
};

export const AccentVariant: Story = {
  args: {
    title: 'Pricing',
    variant: 'accent',
    plans: samplePlans,
    columns: 3,
  },
};

export const SinglePlan: Story = {
  args: {
    title: 'Get Started Today',
    plans: [samplePlans[1]],
    columns: 1,
  },
};

