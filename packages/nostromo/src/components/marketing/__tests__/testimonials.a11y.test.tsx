import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { toHaveNoViolations } from 'jest-axe';
import { Testimonials } from '../testimonials';

expect.extend(toHaveNoViolations);

describe('Testimonials Accessibility', () => {
  const mockTestimonials = [
    { id: '1', content: 'Great product!', name: 'John Doe', role: 'CEO' },
    { id: '2', content: 'Amazing service!', name: 'Jane Smith', role: 'CTO' },
  ];

  it('should not have accessibility violations', async () => {
    const { container } = render(<Testimonials testimonials={mockTestimonials} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with ratings', async () => {
    const testimonialsWithRatings = mockTestimonials.map(t => ({ ...t, rating: 5 }));
    const { container } = render(<Testimonials testimonials={testimonialsWithRatings} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should render all testimonials', () => {
    const { container } = render(<Testimonials testimonials={mockTestimonials} />);
    mockTestimonials.forEach(testimonial => {
      expect(container).toHaveTextContent(testimonial.content);
      expect(container).toHaveTextContent(testimonial.name);
    });
  });
});

