import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { toHaveNoViolations } from 'jest-axe';
import { Features } from '../features';

expect.extend(toHaveNoViolations);

describe('Features Accessibility', () => {
  const mockFeatures = [
    { id: '1', title: 'Feature 1', description: 'Description 1' },
    { id: '2', title: 'Feature 2', description: 'Description 2' },
    { id: '3', title: 'Feature 3', description: 'Description 3' },
  ];

  it('should not have accessibility violations', async () => {
    const { container } = render(<Features features={mockFeatures} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with icons', async () => {
    const featuresWithIcons = mockFeatures.map(f => ({ ...f, icon: '⭐' }));
    const { container } = render(<Features features={featuresWithIcons} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should render all features', () => {
    const { container } = render(<Features features={mockFeatures} />);
    mockFeatures.forEach(feature => {
      expect(container).toHaveTextContent(feature.title);
      expect(container).toHaveTextContent(feature.description);
    });
  });
});

