import type { Meta, StoryObj } from '@storybook/react-vite';
import { LogoWall } from '../logo-wall';

const sampleLogos = [
  {
    id: '1',
    name: 'Company 1',
    logo: 'https://via.placeholder.com/150x80?text=Company+1',
    alt: 'Company 1',
    url: 'https://example.com',
  },
  {
    id: '2',
    name: 'Company 2',
    logo: 'https://via.placeholder.com/150x80?text=Company+2',
    alt: 'Company 2',
    url: 'https://example.com',
  },
  {
    id: '3',
    name: 'Company 3',
    logo: 'https://via.placeholder.com/150x80?text=Company+3',
    alt: 'Company 3',
    url: 'https://example.com',
  },
  {
    id: '4',
    name: 'Company 4',
    logo: 'https://via.placeholder.com/150x80?text=Company+4',
    alt: 'Company 4',
    url: 'https://example.com',
  },
  {
    id: '5',
    name: 'Company 5',
    logo: 'https://via.placeholder.com/150x80?text=Company+5',
    alt: 'Company 5',
    url: 'https://example.com',
  },
  {
    id: '6',
    name: 'Company 6',
    logo: 'https://via.placeholder.com/150x80?text=Company+6',
    alt: 'Company 6',
    url: 'https://example.com',
  },
];

const meta: Meta<typeof LogoWall> = {
  title: 'Components/LogoWall',
  component: LogoWall,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Client logos with hover effects and responsive layouts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'select',
      options: [2, 3, 4, 5, 6],
      description: 'Number of columns in grid',
    },
    spacing: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Spacing between items',
    },
    itemVariant: {
      control: 'select',
      options: ['default', 'ghost', 'outline', 'filled'],
      description: 'Visual variant for logo items',
    },
    itemHover: {
      control: 'select',
      options: ['none', 'scale', 'lift', 'glow'],
      description: 'Hover effect for items',
    },
    itemSize: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of logo items',
    },
    imageFilter: {
      control: 'select',
      options: ['none', 'grayscale', 'opacity', 'blur'],
      description: 'Image filter effect',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LogoWall>;

export const Default: Story = {
  args: {
    title: 'Trusted by leading companies',
    logos: sampleLogos,
    columns: 4,
  },
};

export const ThreeColumns: Story = {
  args: {
    title: 'Our Partners',
    logos: sampleLogos,
    columns: 3,
  },
};

export const SixColumns: Story = {
  args: {
    title: 'Trusted by',
    logos: sampleLogos,
    columns: 6,
  },
};

export const WithoutFilter: Story = {
  args: {
    title: 'Our Clients',
    logos: sampleLogos,
    columns: 4,
    imageFilter: 'none',
  },
};

export const GhostVariant: Story = {
  args: {
    title: 'Partners',
    logos: sampleLogos,
    columns: 4,
    itemVariant: 'ghost',
  },
};

export const OutlineVariant: Story = {
  args: {
    title: 'Trusted by',
    logos: sampleLogos,
    columns: 4,
    itemVariant: 'outline',
  },
};

export const WithCount: Story = {
  args: {
    title: 'Our Partners',
    subtitle: 'We work with industry leaders',
    logos: sampleLogos,
    columns: 4,
    showCount: true,
  },
};

