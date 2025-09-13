import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/vue';
import { toHaveNoViolations } from 'jest-axe';
import axe from 'axe-core';
import { NBadge } from '../badge';

expect.extend(toHaveNoViolations);

const runAxe = (container: HTMLElement) => {
  return new Promise((resolve, reject) => {
    axe.run(container, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

describe('Vue Badge Accessibility', () => {
  it('should not have accessibility violations with basic badge', async () => {
    const { container } = render(NBadge, {
      slots: { default: 'Basic Badge' },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with different variants', async () => {
    const variants = ['default', 'secondary', 'destructive', 'outline', 'success', 'warning', 'info'] as const;

    for (const variant of variants) {
      const { container } = render(NBadge, {
        props: { variant },
        slots: { default: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Badge` },
      });

      const results = await runAxe(container);
      expect(results).toHaveNoViolations();
      
      
    }
  });

  it('should not have accessibility violations with different sizes', async () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    for (const size of sizes) {
      const { container } = render(NBadge, {
        props: { size },
        slots: { default: `${size.toUpperCase()} Badge` },
      });

      const results = await runAxe(container);
      expect(results).toHaveNoViolations();
      
      
    }
  });

  it('should not have accessibility violations with asChild button', async () => {
    const { container } = render(NBadge, {
      props: { asChild: true },
      slots: {
        default: () => 'Badge Button',
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with asChild link', async () => {
    const { container } = render(NBadge, {
      props: { asChild: true },
      slots: {
        default: () => 'Badge Link',
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with asChild span', async () => {
    const { container } = render(NBadge, {
      props: { asChild: true },
      slots: {
        default: () => 'Badge Span',
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with icon and text', async () => {
    const { container } = render(NBadge, {
      slots: {
        default: [
          '🔔',
          'Notifications',
        ],
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with number badge', async () => {
    const { container } = render(NBadge, {
      slots: { default: '42' },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with status badge', async () => {
    const { container } = render(NBadge, {
      props: { variant: 'success' },
      attrs: { role: 'status', 'aria-label': 'Success status' },
      slots: { default: 'Success' },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with error badge', async () => {
    const { container } = render(NBadge, {
      props: { variant: 'destructive' },
      attrs: { role: 'alert', 'aria-label': 'Error status' },
      slots: { default: 'Error' },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with warning badge', async () => {
    const { container } = render(NBadge, {
      props: { variant: 'warning' },
      attrs: { role: 'alert', 'aria-label': 'Warning status' },
      slots: { default: 'Warning' },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with info badge', async () => {
    const { container } = render(NBadge, {
      props: { variant: 'info' },
      attrs: { role: 'status', 'aria-label': 'Information' },
      slots: { default: 'Info' },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with multiple badges', async () => {
    const { container } = render({
      template: `
        <div>
          <NBadge variant="default">Default</NBadge>
          <NBadge variant="secondary">Secondary</NBadge>
          <NBadge variant="destructive">Destructive</NBadge>
          <NBadge variant="outline">Outline</NBadge>
          <NBadge variant="success">Success</NBadge>
          <NBadge variant="warning">Warning</NBadge>
          <NBadge variant="info">Info</NBadge>
        </div>
      `,
      components: {
        NBadge,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges in different sizes', async () => {
    const { container } = render({
      template: `
        <div>
          <NBadge size="sm">Small</NBadge>
          <NBadge size="md">Medium</NBadge>
          <NBadge size="lg">Large</NBadge>
        </div>
      `,
      components: {
        NBadge,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges containing emojis', async () => {
    const { container } = render({
      template: `
        <div>
          <NBadge>🚀 Rocket</NBadge>
          <NBadge>⭐ Star</NBadge>
          <NBadge>🔥 Fire</NBadge>
          <NBadge>💎 Diamond</NBadge>
        </div>
      `,
      components: {
        NBadge,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges containing special characters', async () => {
    const { container } = render({
      template: `
        <div>
          <NBadge>@username</NBadge>
          <NBadge>#hashtag</NBadge>
          <NBadge>$price</NBadge>
          <NBadge>%discount</NBadge>
        </div>
      `,
      components: {
        NBadge,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges in a list', async () => {
    const { container } = render({
      template: `
        <ul>
          <li>
            <NBadge variant="success">Completed</NBadge>
            <span>Task 1</span>
          </li>
          <li>
            <NBadge variant="warning">In Progress</NBadge>
            <span>Task 2</span>
          </li>
          <li>
            <NBadge variant="destructive">Failed</NBadge>
            <span>Task 3</span>
          </li>
        </ul>
      `,
      components: {
        NBadge,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges in a table', async () => {
    const { container } = render({
      template: `
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
              <td><NBadge variant="success">Active</NBadge></td>
              <td><NBadge variant="warning">High</NBadge></td>
            </tr>
            <tr>
              <td>Jane Smith</td>
              <td><NBadge variant="secondary">Inactive</NBadge></td>
              <td><NBadge variant="info">Low</NBadge></td>
            </tr>
          </tbody>
        </table>
      `,
      components: {
        NBadge,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges in a form', async () => {
    const { container } = render({
      template: `
        <form>
          <div>
            <label for="email">Email</label>
            <input id="email" type="email" />
            <NBadge variant="info">Required</NBadge>
          </div>
          <div>
            <label for="password">Password</label>
            <input id="password" type="password" />
            <NBadge variant="warning">Must be 8+ characters</NBadge>
          </div>
          <button type="submit">Submit</button>
        </form>
      `,
      components: {
        NBadge,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges in a card', async () => {
    const { container } = render({
      template: `
        <div class="card">
          <div class="card-header">
            <h3>Project Status</h3>
            <NBadge variant="success">On Track</NBadge>
          </div>
          <div class="card-content">
            <p>Project is progressing well</p>
            <div>
              <NBadge variant="info">Frontend</NBadge>
              <NBadge variant="info">Backend</NBadge>
              <NBadge variant="warning">Testing</NBadge>
            </div>
          </div>
        </div>
      `,
      components: {
        NBadge,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges containing long text', async () => {
    const { container } = render(NBadge, {
      slots: { default: 'This is a very long badge text that should be accessible' },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges containing mixed content', async () => {
    const { container } = render(NBadge, {
      slots: {
        default: [
          '🔔',
          'New notifications',
          '(3)',
        ],
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges containing numbers', async () => {
    const { container } = render({
      template: `
        <div>
          <NBadge>1</NBadge>
          <NBadge>42</NBadge>
          <NBadge>999+</NBadge>
          <NBadge>1,000</NBadge>
        </div>
      `,
      components: {
        NBadge,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges containing symbols', async () => {
    const { container } = render({
      template: `
        <div>
          <NBadge>@</NBadge>
          <NBadge>#</NBadge>
          <NBadge>$</NBadge>
          <NBadge>%</NBadge>
          <NBadge>&</NBadge>
          <NBadge>*</NBadge>
          <NBadge>+</NBadge>
          <NBadge>-</NBadge>
        </div>
      `,
      components: {
        NBadge,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges containing HTML entities', async () => {
    const { container } = render({
      template: `
        <div>
          <NBadge>&amp;</NBadge>
          <NBadge>&lt;</NBadge>
          <NBadge>&gt;</NBadge>
          <NBadge>&quot;</NBadge>
          <NBadge>&apos;</NBadge>
        </div>
      `,
      components: {
        NBadge,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges containing unicode characters', async () => {
    const { container } = render({
      template: `
        <div>
          <NBadge>α</NBadge>
          <NBadge>β</NBadge>
          <NBadge>γ</NBadge>
          <NBadge>δ</NBadge>
          <NBadge>ε</NBadge>
        </div>
      `,
      components: {
        NBadge,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with badges containing mixed languages', async () => {
    const { container } = render({
      template: `
        <div>
          <NBadge>English</NBadge>
          <NBadge>中文</NBadge>
          <NBadge>日本語</NBadge>
          <NBadge>한국어</NBadge>
          <NBadge>العربية</NBadge>
        </div>
      `,
      components: {
        NBadge,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });
});
