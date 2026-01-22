import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Badge } from '../badge';

expect.extend(toHaveNoViolations);

describe('Badge Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Badge>Accessible badge</Badge>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with different variants', async () => {
    const { container } = render(
      <div>
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with custom attributes', async () => {
    const { container } = render(
      <Badge aria-label="Status badge" role="status">
        Active
      </Badge>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
