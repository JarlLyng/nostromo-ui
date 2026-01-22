import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { toHaveNoViolations } from 'jest-axe';
import { Gallery } from '../gallery';

expect.extend(toHaveNoViolations);

describe('Gallery Accessibility', () => {
  const mockImages = [
    { id: '1', src: 'image1.jpg', alt: 'Image 1' },
    { id: '2', src: 'image2.jpg', alt: 'Image 2' },
    { id: '3', src: 'image3.jpg', alt: 'Image 3' },
  ];

  it('should not have accessibility violations', async () => {
    const { container } = render(<Gallery images={mockImages} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper alt text on images', () => {
    const { container } = render(<Gallery images={mockImages} />);
    const images = container.querySelectorAll('img');
    images.forEach((img, index) => {
      expect(img).toHaveAttribute('alt', mockImages[index].alt);
    });
  });

  it('should render all images', () => {
    const { container } = render(<Gallery images={mockImages} />);
    const images = container.querySelectorAll('img');
    expect(images.length).toBe(mockImages.length);
  });
});

