import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';
import axe from 'axe-core';
import { Badge } from '../badge';

expect.extend(toHaveNoViolations);

const runAxe = async (container: HTMLElement) => {
  const results = await axe.run(container);
  return results;
};

describe('Badge Accessibility', () => {
  it('should not have accessibility violations with basic badge', async () => {
    const { container } = render(<Badge>Basic Badge</Badge>);

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with different variants', async () => {
    const variants = ['default', 'secondary', 'destructive', 'outline', 'success', 'warning', 'info'] as const;

    for (const variant of variants) {
      const { container } = render(
        <Badge variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)} Badge
        </Badge>
      );

      const results = await runAxe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should not have accessibility violations with different sizes', async () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    for (const size of sizes) {
      const { container } = render(
        <Badge size={size}>
          {size.toUpperCase()} Badge
        </Badge>
      );

      const results = await runAxe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should not have accessibility violations with asChild button', async () => {
    const { container } = render(
      <Badge asChild>
        <button>Badge Button</button>
      </Badge>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with asChild link', async () => {
    const { container } = render(
      <Badge asChild>
        <a href="#test">Badge Link</a>
      </Badge>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with asChild span', async () => {
    const { container } = render(
      <Badge asChild>
        <span>Badge Span</span>
      </Badge>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with icon and text', async () => {
    const { container } = render(
      <Badge>
        <span aria-hidden="true">🔔</span>
        <span>Notifications</span>
      </Badge>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with number badge', async () => {
    const { container } = render(<Badge>42</Badge>);

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with status badge', async () => {
    const { container } = render(
      <Badge variant="success" role="status" aria-label="Success status">
        Success
      </Badge>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with error badge', async () => {
    const { container } = render(
      <Badge variant="destructive" role="alert" aria-label="Error status">
        Error
      </Badge>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with warning badge', async () => {
    const { container } = render(
      <Badge variant="warning" role="alert" aria-label="Warning status">
        Warning
      </Badge>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with info badge', async () => {
    const { container } = render(
      <Badge variant="info" role="status" aria-label="Information">
        Info
      </Badge>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with multiple badges', async () => {
    const { container } = render(
      <div>
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="info">Info</Badge>
      </div>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges in different sizes', async () => {
    const { container } = render(
      <div>
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </div>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges containing emojis', async () => {
    const { container } = render(
      <div>
        <Badge>🚀 Rocket</Badge>
        <Badge>⭐ Star</Badge>
        <Badge>🔥 Fire</Badge>
        <Badge>💎 Diamond</Badge>
      </div>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges containing special characters', async () => {
    const { container } = render(
      <div>
        <Badge>@username</Badge>
        <Badge>#hashtag</Badge>
        <Badge>$price</Badge>
        <Badge>%discount</Badge>
      </div>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges in a list', async () => {
    const { container } = render(
      <ul>
        <li>
          <Badge variant="success">Completed</Badge>
          <span>Task 1</span>
        </li>
        <li>
          <Badge variant="warning">In Progress</Badge>
          <span>Task 2</span>
        </li>
        <li>
          <Badge variant="destructive">Failed</Badge>
          <span>Task 3</span>
        </li>
      </ul>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges in a table', async () => {
    const { container } = render(
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td><Badge variant="success">Active</Badge></td>
            <td><Badge variant="warning">High</Badge></td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td><Badge variant="secondary">Inactive</Badge></td>
            <td><Badge variant="info">Low</Badge></td>
          </tr>
        </tbody>
      </table>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges in a form', async () => {
    const { container } = render(
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" />
          <Badge variant="info">Required</Badge>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" />
          <Badge variant="warning">Must be 8+ characters</Badge>
        </div>
        <button type="submit">Submit</button>
      </form>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges in a card', async () => {
    const { container } = render(
      <div className="card">
        <div className="card-header">
          <h3>Project Status</h3>
          <Badge variant="success">On Track</Badge>
        </div>
        <div className="card-content">
          <p>Project is progressing well</p>
          <div>
            <Badge variant="info">Frontend</Badge>
            <Badge variant="info">Backend</Badge>
            <Badge variant="warning">Testing</Badge>
          </div>
        </div>
      </div>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges containing long text', async () => {
    const { container } = render(
      <Badge>
        This is a very long badge text that should be accessible
      </Badge>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges containing mixed content', async () => {
    const { container } = render(
      <Badge>
        <span aria-hidden="true">🔔</span>
        <span>New notifications</span>
        <span aria-hidden="true">(3)</span>
      </Badge>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges containing numbers', async () => {
    const { container } = render(
      <div>
        <Badge>1</Badge>
        <Badge>42</Badge>
        <Badge>999+</Badge>
        <Badge>1,000</Badge>
      </div>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges containing symbols', async () => {
    const { container } = render(
      <div>
        <Badge>@</Badge>
        <Badge>#</Badge>
        <Badge>$</Badge>
        <Badge>%</Badge>
        <Badge>&</Badge>
        <Badge>*</Badge>
        <Badge>+</Badge>
        <Badge>-</Badge>
      </div>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges containing HTML entities', async () => {
    const { container } = render(
      <div>
        <Badge>&amp;</Badge>
        <Badge>&lt;</Badge>
        <Badge>&gt;</Badge>
        <Badge>&quot;</Badge>
        <Badge>&apos;</Badge>
      </div>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges containing unicode characters', async () => {
    const { container } = render(
      <div>
        <Badge>α</Badge>
        <Badge>β</Badge>
        <Badge>γ</Badge>
        <Badge>δ</Badge>
        <Badge>ε</Badge>
      </div>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges containing mixed languages', async () => {
    const { container } = render(
      <div>
        <Badge>English</Badge>
        <Badge>中文</Badge>
        <Badge>日本語</Badge>
        <Badge>한국어</Badge>
        <Badge>العربية</Badge>
      </div>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });
});
