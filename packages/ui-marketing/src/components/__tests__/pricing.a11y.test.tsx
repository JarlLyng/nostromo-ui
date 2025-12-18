import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { toHaveNoViolations } from 'jest-axe';
import { Pricing } from '../pricing';

expect.extend(toHaveNoViolations);

describe('Pricing Accessibility', () => {
  const mockPlans = [
    { 
      id: '1', 
      name: 'Basic', 
      price: { monthly: 10 }, 
      description: 'Basic plan', 
      features: [
        { id: '1', name: 'Feature 1', included: true },
        { id: '2', name: 'Feature 2', included: true }
      ],
      cta: { text: 'Get Started' }
    },
    { 
      id: '2', 
      name: 'Pro', 
      price: { monthly: 20 }, 
      description: 'Pro plan', 
      features: [
        { id: '1', name: 'Feature 1', included: true },
        { id: '2', name: 'Feature 2', included: true },
        { id: '3', name: 'Feature 3', included: true }
      ],
      cta: { text: 'Get Started' }
    },
  ];

  it('should not have accessibility violations', async () => {
    const { container } = render(<Pricing plans={mockPlans} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with popular plan', async () => {
    const plansWithPopular = mockPlans.map((p, i) => ({ ...p, popular: i === 1 }));
    const { container } = render(<Pricing plans={plansWithPopular} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible buttons with text', () => {
    const { container } = render(<Pricing plans={mockPlans} />);
    const buttons = container.querySelectorAll('button');
    buttons.forEach(button => {
      expect(button).toHaveTextContent(/.+/); // Button should have text
    });
  });

  it('should have proper heading structure', () => {
    const { container } = render(<Pricing plans={mockPlans} />);
    const headings = container.querySelectorAll('h2, h3');
    expect(headings.length).toBeGreaterThan(0);
  });
});

