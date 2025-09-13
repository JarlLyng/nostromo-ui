import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../badge';

describe('Badge', () => {
  it('renders correctly', () => {
    render(<Badge>Badge content</Badge>);
    expect(screen.getByText('Badge content')).toBeInTheDocument();
  });

  it('renders with default variant and size', () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText('Default Badge');
    expect(badge).toHaveClass('bg-brand-500', 'text-white', 'px-2.5', 'py-0.5', 'text-xs');
  });

  it('supports different variants', () => {
    const variants = ['default', 'secondary', 'destructive', 'outline', 'success', 'warning', 'info'] as const;

    variants.forEach((variant) => {
      const { rerender } = render(
        <Badge variant={variant}>Test Badge</Badge>
      );

      const badge = screen.getByText('Test Badge');
      expect(badge).toHaveClass('inline-flex', 'items-center', 'rounded-full', 'border');

      if (variant === 'default') {
        expect(badge).toHaveClass('bg-brand-500', 'text-white');
      } else if (variant === 'secondary') {
        expect(badge).toHaveClass('bg-neutral-100', 'text-neutral-900');
      } else if (variant === 'destructive') {
        expect(badge).toHaveClass('bg-red-500', 'text-white');
      } else if (variant === 'outline') {
        expect(badge).toHaveClass('text-neutral-950', 'border-neutral-200');
      } else if (variant === 'success') {
        expect(badge).toHaveClass('bg-green-500', 'text-white');
      } else if (variant === 'warning') {
        expect(badge).toHaveClass('bg-yellow-500', 'text-white');
      } else if (variant === 'info') {
        expect(badge).toHaveClass('bg-blue-500', 'text-white');
      }

      rerender(<div />); // Clear for next iteration
    });
  });

  it('supports different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      const { rerender } = render(
        <Badge size={size}>Test Badge</Badge>
      );

      const badge = screen.getByText('Test Badge');
      if (size === 'sm') {
        expect(badge).toHaveClass('px-2', 'py-0.5', 'text-xs');
      } else if (size === 'md') {
        expect(badge).toHaveClass('px-2.5', 'py-0.5', 'text-xs');
      } else if (size === 'lg') {
        expect(badge).toHaveClass('px-3', 'py-1', 'text-sm');
      }

      rerender(<div />); // Clear for next iteration
    });
  });

  it('renders with custom className', () => {
    render(<Badge className="custom-badge">Test Badge</Badge>);
    const badge = screen.getByText('Test Badge');
    expect(badge).toHaveClass('custom-badge');
  });

  it('forwards attributes correctly', () => {
    render(<Badge data-testid="badge">Test Badge</Badge>);
    const badge = screen.getByTestId('badge');
    expect(badge).toBeInTheDocument();
  });

  it('supports asChild prop with button', () => {
    render(
      <Badge asChild>
        <button>Badge Button</button>
      </Badge>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Badge Button');
    expect(button).toHaveClass('bg-brand-500', 'text-white');
  });

  it('supports asChild prop with link', () => {
    render(
      <Badge asChild>
        <a href="#test">Badge Link</a>
      </Badge>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveTextContent('Badge Link');
    expect(link).toHaveClass('bg-brand-500', 'text-white');
  });

  it('supports asChild prop with custom element', () => {
    render(
      <Badge asChild>
        <span>Badge Span</span>
      </Badge>
    );

    const span = screen.getByText('Badge Span');
    expect(span).toHaveClass('bg-brand-500', 'text-white');
  });

  it('handles multiple children with asChild', () => {
    render(
      <Badge asChild>
        <div>First</div>
        <div>Second</div>
      </Badge>
    );

    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('applies focus styles correctly', () => {
    render(<Badge>Focusable Badge</Badge>);
    const badge = screen.getByText('Focusable Badge');
    expect(badge).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-ring', 'focus:ring-offset-2');
  });

  it('applies hover styles correctly', () => {
    render(<Badge variant="default">Hover Badge</Badge>);
    const badge = screen.getByText('Hover Badge');
    expect(badge).toHaveClass('hover:bg-brand-600');
  });

  it('renders with icon and text', () => {
    render(
      <Badge>
        <span>🔔</span>
        <span>Notifications</span>
      </Badge>
    );

    expect(screen.getByText('🔔')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
  });

  it('renders with only icon', () => {
    render(
      <Badge>
        <span>⭐</span>
      </Badge>
    );

    expect(screen.getByText('⭐')).toBeInTheDocument();
  });

  it('renders with number', () => {
    render(<Badge>42</Badge>);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders with long text', () => {
    render(<Badge>This is a very long badge text that should wrap</Badge>);
    expect(screen.getByText('This is a very long badge text that should wrap')).toBeInTheDocument();
  });

  it('renders with special characters', () => {
    render(<Badge>Badge with @#$%^&*()</Badge>);
    expect(screen.getByText('Badge with @#$%^&*()')).toBeInTheDocument();
  });

  it('renders with emoji', () => {
    render(<Badge>🚀 Rocket Badge</Badge>);
    expect(screen.getByText('🚀 Rocket Badge')).toBeInTheDocument();
  });

  it('renders with HTML entities', () => {
    render(<Badge>Badge &amp; HTML</Badge>);
    expect(screen.getByText('Badge & HTML')).toBeInTheDocument();
  });

  it('renders with mixed content', () => {
    render(
      <Badge>
        <span>🔔</span>
        <span> </span>
        <span>New</span>
        <span> </span>
        <span>(3)</span>
      </Badge>
    );

    expect(screen.getByText('🔔')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('(3)')).toBeInTheDocument();
  });

  it('renders with custom variant and size combination', () => {
    render(
      <Badge variant="success" size="lg">
        Success Badge
      </Badge>
    );

    const badge = screen.getByText('Success Badge');
    expect(badge).toHaveClass('bg-green-500', 'text-white', 'px-3', 'py-1', 'text-sm');
  });

  it('renders with outline variant and small size', () => {
    render(
      <Badge variant="outline" size="sm">
        Outline Badge
      </Badge>
    );

    const badge = screen.getByText('Outline Badge');
    expect(badge).toHaveClass('text-neutral-950', 'border-neutral-200', 'px-2', 'py-0.5', 'text-xs');
  });

  it('renders with destructive variant and large size', () => {
    render(
      <Badge variant="destructive" size="lg">
        Destructive Badge
      </Badge>
    );

    const badge = screen.getByText('Destructive Badge');
    expect(badge).toHaveClass('bg-red-500', 'text-white', 'px-3', 'py-1', 'text-sm');
  });

  it('renders with warning variant and medium size', () => {
    render(
      <Badge variant="warning" size="md">
        Warning Badge
      </Badge>
    );

    const badge = screen.getByText('Warning Badge');
    expect(badge).toHaveClass('bg-yellow-500', 'text-white', 'px-2.5', 'py-0.5', 'text-xs');
  });

  it('renders with info variant and small size', () => {
    render(
      <Badge variant="info" size="sm">
        Info Badge
      </Badge>
    );

    const badge = screen.getByText('Info Badge');
    expect(badge).toHaveClass('bg-blue-500', 'text-white', 'px-2', 'py-0.5', 'text-xs');
  });

  it('renders with secondary variant and large size', () => {
    render(
      <Badge variant="secondary" size="lg">
        Secondary Badge
      </Badge>
    );

    const badge = screen.getByText('Secondary Badge');
    expect(badge).toHaveClass('bg-neutral-100', 'text-neutral-900', 'px-3', 'py-1', 'text-sm');
  });
});
