import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { NButton } from '../button';

describe('NButton (Vue)', () => {
  it('renders with correct text', () => {
    render(NButton, {
      slots: {
        default: 'Click me',
      },
    });
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(NButton, {
      props: {
        onClick: handleClick,
      },
      slots: {
        default: 'Click me',
      },
    });
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct variant classes', () => {
    render(NButton, {
      props: {
        variant: 'primary',
      },
      slots: {
        default: 'Primary',
      },
    });
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-brand-500', 'text-neutral-50');
  });

  it('applies correct size classes', () => {
    render(NButton, {
      props: {
        size: 'lg',
      },
      slots: {
        default: 'Large',
      },
    });
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-12', 'px-8', 'text-base');
  });

  it('shows loading state', () => {
    render(NButton, {
      props: {
        loading: true,
      },
      slots: {
        default: 'Loading',
      },
    });
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
    expect(screen.getByRole('button')).toContainHTML('svg');
  });

  it('is disabled when loading', () => {
    render(NButton, {
      props: {
        loading: true,
      },
      slots: {
        default: 'Loading',
      },
    });
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when disabled prop is true', () => {
    render(NButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'Disabled',
      },
    });
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies custom class', () => {
    render(NButton, {
      props: {
        class: 'custom-class',
      },
      slots: {
        default: 'Button',
      },
    });
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  describe('variants', () => {
    it('renders primary variant', () => {
      render(NButton, {
        props: {
          variant: 'primary',
        },
        slots: {
          default: 'Primary',
        },
      });
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-brand-500', 'text-neutral-50');
    });

    it('renders secondary variant', () => {
      render(NButton, {
        props: {
          variant: 'secondary',
        },
        slots: {
          default: 'Secondary',
        },
      });
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-neutral-200', 'text-neutral-900');
    });

    it('renders ghost variant', () => {
      render(NButton, {
        props: {
          variant: 'ghost',
        },
        slots: {
          default: 'Ghost',
        },
      });
      const button = screen.getByRole('button');
      expect(button).toHaveClass('hover:bg-neutral-100');
    });

    it('renders destructive variant', () => {
      render(NButton, {
        props: {
          variant: 'destructive',
        },
        slots: {
          default: 'Destructive',
        },
      });
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-error-500', 'text-neutral-50');
    });

    it('renders outline variant', () => {
      render(NButton, {
        props: {
          variant: 'outline',
        },
        slots: {
          default: 'Outline',
        },
      });
      const button = screen.getByRole('button');
      expect(button).toHaveClass('border', 'border-neutral-300');
    });

    it('renders link variant', () => {
      render(NButton, {
        props: {
          variant: 'link',
        },
        slots: {
          default: 'Link',
        },
      });
      const button = screen.getByRole('button');
      expect(button).toHaveClass('text-brand-500', 'underline-offset-4');
    });
  });

  describe('sizes', () => {
    it('renders small size', () => {
      render(NButton, {
        props: {
          size: 'sm',
        },
        slots: {
          default: 'Small',
        },
      });
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-8', 'px-3', 'text-xs');
    });

    it('renders medium size (default)', () => {
      render(NButton, {
        slots: {
          default: 'Medium',
        },
      });
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-10', 'px-4', 'py-2');
    });

    it('renders large size', () => {
      render(NButton, {
        props: {
          size: 'lg',
        },
        slots: {
          default: 'Large',
        },
      });
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-12', 'px-8', 'text-base');
    });

    it('renders icon size', () => {
      render(NButton, {
        props: {
          size: 'icon',
        },
        slots: {
          default: 'Icon',
        },
      });
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-10', 'w-10');
    });
  });

  describe('accessibility', () => {
    it('has correct role', () => {
      render(NButton, {
        slots: {
          default: 'Button',
        },
      });
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(NButton, {
        props: {
          onClick: handleClick,
        },
        slots: {
          default: 'Button',
        },
      });
      
      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
      
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('has proper focus styles', () => {
      render(NButton, {
        slots: {
          default: 'Button',
        },
      });
      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus-visible:outline-none', 'focus-visible:ring-2');
    });
  });
});
