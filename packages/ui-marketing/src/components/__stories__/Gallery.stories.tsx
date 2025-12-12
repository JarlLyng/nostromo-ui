import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Gallery } from '../gallery';

const sampleImages = [
  {
    id: '1',
    src: 'https://via.placeholder.com/400x300?text=Image+1',
    alt: 'Image 1',
    title: 'Image 1',
    description: 'Description for image 1',
  },
  {
    id: '2',
    src: 'https://via.placeholder.com/400x300?text=Image+2',
    alt: 'Image 2',
    title: 'Image 2',
    description: 'Description for image 2',
  },
  {
    id: '3',
    src: 'https://via.placeholder.com/400x300?text=Image+3',
    alt: 'Image 3',
    title: 'Image 3',
    description: 'Description for image 3',
  },
  {
    id: '4',
    src: 'https://via.placeholder.com/400x300?text=Image+4',
    alt: 'Image 4',
    title: 'Image 4',
    description: 'Description for image 4',
  },
  {
    id: '5',
    src: 'https://via.placeholder.com/400x300?text=Image+5',
    alt: 'Image 5',
    title: 'Image 5',
    description: 'Description for image 5',
  },
  {
    id: '6',
    src: 'https://via.placeholder.com/400x300?text=Image+6',
    alt: 'Image 6',
    title: 'Image 6',
    description: 'Description for image 6',
  },
];

const meta: Meta<typeof Gallery> = {
  title: 'Components/Gallery',
  component: Gallery,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Image galleries with lightbox functionality and responsive grids.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'Number of columns in grid',
    },
    spacing: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Spacing between items',
    },
    itemAspectRatio: {
      control: 'select',
      options: ['square', 'video', 'portrait', 'landscape', 'wide'],
      description: 'Aspect ratio for gallery items',
    },
    itemHover: {
      control: 'select',
      options: ['none', 'scale', 'zoom', 'lift'],
      description: 'Hover effect for items',
    },
    showLightbox: {
      control: 'boolean',
      description: 'Enable lightbox on click',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Gallery>;

export const Default: Story = {
  args: {
    images: sampleImages,
    columns: 3,
    itemAspectRatio: 'square',
  },
};

export const TwoColumns: Story = {
  args: {
    images: sampleImages,
    columns: 2,
    itemAspectRatio: 'landscape',
  },
};

export const FourColumns: Story = {
  args: {
    images: sampleImages,
    columns: 4,
    itemAspectRatio: 'square',
  },
};

export const WithoutLightbox: Story = {
  args: {
    images: sampleImages,
    columns: 3,
    showLightbox: false,
    onImageClick: (image) => console.log('Image clicked:', image),
  },
};

export const PortraitAspectRatio: Story = {
  args: {
    images: sampleImages,
    columns: 3,
    itemAspectRatio: 'portrait',
  },
};

export const ZoomHover: Story = {
  args: {
    images: sampleImages,
    columns: 3,
    itemHover: 'zoom',
  },
};

