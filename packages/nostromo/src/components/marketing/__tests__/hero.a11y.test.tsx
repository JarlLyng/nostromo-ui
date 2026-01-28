import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { toHaveNoViolations } from 'jest-axe';
import { Hero } from '../hero';
import { Button } from '../../core/button';

expect.extend(toHaveNoViolations);

describe('Hero Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(
      <Hero title="Test Hero" subtitle="Test subtitle" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with CTA', async () => {
    const { container } = render(
      <Hero 
        title="Test Hero" 
        subtitle="Test subtitle"
        cta={<Button>Get Started</Button>}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with different variants', async () => {
    const { container } = render(
      <div>
        <Hero title="Default" variant="default" />
        <Hero title="Muted" variant="muted" />
        <Hero title="Accent" variant="accent" />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper heading structure', () => {
    const { container } = render(
      <Hero title="Test Hero Title" subtitle="Test subtitle" />
    );
    
    const heading = container.querySelector('h1');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test Hero Title');
  });
});

