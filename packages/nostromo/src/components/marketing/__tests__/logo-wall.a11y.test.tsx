import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { toHaveNoViolations } from 'jest-axe';
import { LogoWall } from '../logo-wall';

expect.extend(toHaveNoViolations);

describe('LogoWall Accessibility', () => {
  const mockLogos = [
    { id: '1', src: 'logo1.jpg', alt: 'Company 1' },
    { id: '2', src: 'logo2.jpg', alt: 'Company 2' },
    { id: '3', src: 'logo3.jpg', alt: 'Company 3' },
  ];

  it('should not have accessibility violations', async () => {
    const { container } = render(<LogoWall logos={mockLogos} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper alt text on images', () => {
    const { container } = render(<LogoWall logos={mockLogos} />);
    const images = container.querySelectorAll('img');
    images.forEach((img, index) => {
      expect(img).toHaveAttribute('alt', mockLogos[index].alt);
    });
  });

  it('should render all logos', () => {
    const { container } = render(<LogoWall logos={mockLogos} />);
    const images = container.querySelectorAll('img');
    expect(images.length).toBe(mockLogos.length);
  });
});

