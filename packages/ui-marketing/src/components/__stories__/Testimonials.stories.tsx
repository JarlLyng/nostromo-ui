import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Testimonials } from '../testimonials';

const sampleTestimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Frontend Developer',
    company: 'TechCorp',
    content: 'Nostromo UI has transformed our development workflow. The components are beautiful and easy to use.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Mike Chen',
    role: 'Product Manager',
    company: 'StartupXYZ',
    content: 'The accessibility features are outstanding. Our users love the improved experience.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Alex Thompson',
    role: 'CTO',
    company: 'TechStart',
    content: 'The best UI library we\'ve used. It saved us weeks of development time.',
    rating: 5,
  },
];

const meta: Meta<typeof Testimonials> = {
  title: 'Components/Testimonials',
  component: Testimonials,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Customer testimonials and reviews with ratings, avatars and responsive grids.',
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
    cardVariant: {
      control: 'select',
      options: ['default', 'accent', 'muted'],
      description: 'Card variant',
    },
    showRatings: {
      control: 'boolean',
      description: 'Show star ratings',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Testimonials>;

export const Default: Story = {
  args: {
    title: 'What Our Customers Say',
    testimonials: sampleTestimonials,
    columns: 3,
    showRatings: true,
  },
};

export const TwoColumns: Story = {
  args: {
    title: 'Customer Reviews',
    testimonials: sampleTestimonials,
    columns: 2,
    showRatings: true,
  },
};

export const WithoutRatings: Story = {
  args: {
    title: 'Testimonials',
    testimonials: sampleTestimonials,
    columns: 3,
    showRatings: false,
  },
};

export const AccentVariant: Story = {
  args: {
    title: 'What People Say',
    variant: 'accent',
    testimonials: sampleTestimonials,
    columns: 3,
    showRatings: true,
  },
};

export const SingleColumn: Story = {
  args: {
    title: 'Customer Feedback',
    subtitle: 'Read what our customers have to say',
    testimonials: sampleTestimonials,
    columns: 1,
    showRatings: true,
  },
};

