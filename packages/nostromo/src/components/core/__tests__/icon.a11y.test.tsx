import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Icon } from '../icon';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('Icon Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(
      <Icon name="user" size="md" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with different sizes', async () => {
    const { container } = render(
      <div>
        <Icon name="user" size="xs" />
        <Icon name="user" size="sm" />
        <Icon name="user" size="md" />
        <Icon name="user" size="lg" />
        <Icon name="user" size="xl" />
        <Icon name="user" size="2xl" />
        <Icon name="user" size="3xl" />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with different weights', async () => {
    const { container } = render(
      <div>
        <Icon name="user" weight="thin" />
        <Icon name="user" weight="light" />
        <Icon name="user" weight="regular" />
        <Icon name="user" weight="bold" />
        <Icon name="user" weight="fill" />
        <Icon name="user" weight="duotone" />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with different colors', async () => {
    const { container } = render(
      <div>
        <Icon name="user" color="current" />
        <Icon name="user" color="primary" />
        <Icon name="user" color="secondary" />
        <Icon name="user" color="success" />
        <Icon name="user" color="warning" />
        <Icon name="user" color="error" />
        <Icon name="user" color="muted" />
      </div>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes when used as decorative', () => {
    const { container } = render(
      <Icon name="user" aria-hidden="true" />
    );
    
    const icon = container.querySelector('svg');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('should have proper ARIA attributes when used as informative', () => {
    const { container } = render(
      <Icon name="user" aria-label="User icon" />
    );
    
    const icon = container.querySelector('svg');
    expect(icon).toHaveAttribute('aria-label', 'User icon');
  });

  it('should support different icon types', async () => {
    const iconNames = [
      'user', 'settings', 'search', 'menu', 'x',
      'plus', 'minus', 'check', 'trash', 'edit',
      'mail', 'phone', 'bell', 'play', 'pause',
      'file', 'folder', 'clock', 'calendar'
    ];
    
    for (const iconName of iconNames) {
      const { container } = render(
        <Icon name={iconName} size="md" />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should have proper contrast for different colors', async () => {
    const colors = ['primary', 'secondary', 'success', 'warning', 'error'] as const;
    
    for (const color of colors) {
      const { container } = render(
        <Icon name="user" color={color} size="lg" />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should be accessible when used in buttons', async () => {
    const { container } = render(
      <button aria-label="User settings">
        <Icon name="user" aria-hidden="true" />
        <Icon name="settings" aria-hidden="true" />
      </button>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'User settings');
  });

  it('should be accessible when used in links', async () => {
    const { container } = render(
      <a href="/profile" aria-label="View profile">
        <Icon name="user" aria-hidden="true" />
        Profile
      </a>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/profile');
    expect(link).toHaveAttribute('aria-label', 'View profile');
  });

  it('should support custom ARIA attributes', () => {
    const { container } = render(
      <Icon 
        name="user" 
        aria-label="Current user"
        aria-describedby="user-description"
        role="img"
      />
    );
    
    const icon = container.querySelector('svg');
    expect(icon).toHaveAttribute('aria-label', 'Current user');
    expect(icon).toHaveAttribute('aria-describedby', 'user-description');
  });

  it('should handle missing icons gracefully', async () => {
    const { container } = render(
      <Icon name="nonexistent-icon" size="md" />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should be keyboard accessible when interactive', async () => {
    const { container } = render(
      <Icon 
        name="user" 
        tabIndex={0}
        role="button"
        aria-label="User menu"
        onClick={() => {}}
      />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    
    const icon = screen.getByRole('button');
    expect(icon).toHaveAttribute('aria-label', 'User menu');
  });
});
