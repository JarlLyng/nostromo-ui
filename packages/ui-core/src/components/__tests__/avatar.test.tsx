import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Avatar, AvatarImage, AvatarFallback } from '../avatar';

// Mock image loading
const mockImage = {
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  src: '',
  onload: null as any,
  onerror: null as any,
};

// Mock Image constructor
global.Image = vi.fn(() => mockImage) as any;

describe('Avatar', () => {
  it('renders correctly', () => {
    render(<Avatar>JD</Avatar>);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders with fallback text', () => {
    render(<Avatar fallback="AB">JD</Avatar>);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('supports different sizes', () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach((size) => {
      const { rerender } = render(
        <Avatar size={size}>Test</Avatar>
      );

      const avatar = screen.getByText('Test').closest('div');
      expect(avatar).toHaveClass('relative', 'flex', 'shrink-0', 'overflow-hidden', 'rounded-full');

      if (size === 'sm') {
        expect(avatar).toHaveClass('h-8', 'w-8', 'text-xs');
      } else if (size === 'md') {
        expect(avatar).toHaveClass('h-10', 'w-10', 'text-sm');
      } else if (size === 'lg') {
        expect(avatar).toHaveClass('h-12', 'w-12', 'text-base');
      } else if (size === 'xl') {
        expect(avatar).toHaveClass('h-16', 'w-16', 'text-lg');
      }

      rerender(<div />); // Clear for next iteration
    });
  });

  it('renders with custom className', () => {
    render(<Avatar className="custom-avatar">Test</Avatar>);
    const avatar = screen.getByText('Test').closest('div');
    expect(avatar).toHaveClass('custom-avatar');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Avatar ref={ref}>Test</Avatar>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('renders with image when src is provided', async () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="User avatar">JD</Avatar>);
    
    // Initially should show fallback while image loads
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('shows fallback when image fails to load', async () => {
    render(<Avatar src="https://invalid-url.com/avatar.jpg" alt="User avatar">JD</Avatar>);
    
    // Should show fallback when image fails
    await waitFor(() => {
      expect(screen.getByText('JD')).toBeInTheDocument();
    });
  });

  it('renders with default fallback when no children provided', () => {
    render(<Avatar />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('renders with custom fallback prop', () => {
    render(<Avatar fallback="AB" />);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('forwards attributes correctly', () => {
    render(<Avatar data-testid="avatar">Test</Avatar>);
    const avatar = screen.getByTestId('avatar');
    expect(avatar).toBeInTheDocument();
  });

  it('applies focus styles correctly', () => {
    render(<Avatar tabIndex={0}>Test</Avatar>);
    const avatar = screen.getByText('Test').closest('div');
    expect(avatar).toHaveAttribute('tabIndex', '0');
  });

  it('renders with initials', () => {
    render(<Avatar>JD</Avatar>);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders with single character', () => {
    render(<Avatar>J</Avatar>);
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('renders with emoji', () => {
    render(<Avatar>😀</Avatar>);
    expect(screen.getByText('😀')).toBeInTheDocument();
  });

  it('renders with special characters', () => {
    render(<Avatar>@#$</Avatar>);
    expect(screen.getByText('@#$')).toBeInTheDocument();
  });

  it('renders with numbers', () => {
    render(<Avatar>123</Avatar>);
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  it('renders with long text', () => {
    render(<Avatar>Very Long Name</Avatar>);
    expect(screen.getByText('Very Long Name')).toBeInTheDocument();
  });

  it('renders with mixed content', () => {
    render(<Avatar>J.D.</Avatar>);
    expect(screen.getByText('J.D.')).toBeInTheDocument();
  });

  it('renders with custom size and fallback combination', () => {
    render(
      <Avatar size="lg" fallback="AB">
        CD
      </Avatar>
    );

    const avatar = screen.getByText('AB').closest('div');
    expect(avatar).toHaveClass('h-12', 'w-12', 'text-base');
  });

  it('renders with small size and custom fallback', () => {
    render(
      <Avatar size="sm" fallback="X">
        Y
      </Avatar>
    );

    const avatar = screen.getByText('X').closest('div');
    expect(avatar).toHaveClass('h-8', 'w-8', 'text-xs');
  });

  it('renders with extra large size and default fallback', () => {
    render(<Avatar size="xl" />);

    const avatar = screen.getByText('?').closest('div');
    expect(avatar).toHaveClass('h-16', 'w-16', 'text-lg');
  });

  it('renders with medium size and emoji fallback', () => {
    render(<Avatar size="md" fallback="🚀" />);

    const avatar = screen.getByText('🚀').closest('div');
    expect(avatar).toHaveClass('h-10', 'w-10', 'text-sm');
  });
});

describe('AvatarImage', () => {
  it('renders correctly', () => {
    render(<AvatarImage src="https://example.com/avatar.jpg" alt="User avatar" />);
    const image = screen.getByAltText('User avatar');
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass('aspect-square', 'h-full', 'w-full', 'object-cover');
  });

  it('renders with custom className', () => {
    render(
      <AvatarImage 
        src="https://example.com/avatar.jpg" 
        alt="User avatar" 
        className="custom-image"
      />
    );
    const image = screen.getByAltText('User avatar');
    expect(image).toHaveClass('custom-image');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(
      <AvatarImage 
        ref={ref}
        src="https://example.com/avatar.jpg" 
        alt="User avatar" 
      />
    );
    expect(ref.current).toBeInstanceOf(HTMLImageElement);
  });

  it('forwards attributes correctly', () => {
    render(
      <AvatarImage 
        src="https://example.com/avatar.jpg" 
        alt="User avatar"
        data-testid="avatar-image"
      />
    );
    const image = screen.getByTestId('avatar-image');
    expect(image).toBeInTheDocument();
  });

  it('renders with different image sources', () => {
    const sources = [
      'https://example.com/avatar1.jpg',
      'https://example.com/avatar2.png',
      'https://example.com/avatar3.webp',
    ];

    sources.forEach((src) => {
      const { rerender } = render(
        <AvatarImage src={src} alt="User avatar" />
      );

      const image = screen.getByAltText('User avatar');
      expect(image).toHaveAttribute('src', src);

      rerender(<div />); // Clear for next iteration
    });
  });

  it('renders with different alt texts', () => {
    const altTexts = [
      'User avatar',
      'Profile picture',
      'User photo',
      'Avatar image',
    ];

    altTexts.forEach((alt) => {
      const { rerender } = render(
        <AvatarImage src="https://example.com/avatar.jpg" alt={alt} />
      );

      const image = screen.getByAltText(alt);
      expect(image).toBeInTheDocument();

      rerender(<div />); // Clear for next iteration
    });
  });
});

describe('AvatarFallback', () => {
  it('renders correctly', () => {
    render(<AvatarFallback>JD</AvatarFallback>);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(<AvatarFallback className="custom-fallback">JD</AvatarFallback>);
    const fallback = screen.getByText('JD');
    expect(fallback).toHaveClass('custom-fallback');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<AvatarFallback ref={ref}>JD</AvatarFallback>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('forwards attributes correctly', () => {
    render(<AvatarFallback data-testid="fallback">JD</AvatarFallback>);
    const fallback = screen.getByTestId('fallback');
    expect(fallback).toBeInTheDocument();
  });

  it('renders with different content types', () => {
    const contents = [
      'JD',
      'AB',
      'X',
      '123',
      '😀',
      '@#$',
      'Very Long Name',
    ];

    contents.forEach((content) => {
      const { rerender } = render(
        <AvatarFallback>{content}</AvatarFallback>
      );

      expect(screen.getByText(content)).toBeInTheDocument();

      rerender(<div />); // Clear for next iteration
    });
  });

  it('renders with complex children', () => {
    render(
      <AvatarFallback>
        <span>J</span>
        <span>D</span>
      </AvatarFallback>
    );

    expect(screen.getByText('J')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    render(<AvatarFallback>JD</AvatarFallback>);
    const fallback = screen.getByText('JD');
    expect(fallback).toHaveClass(
      'flex',
      'h-full',
      'w-full',
      'items-center',
      'justify-center',
      'rounded-full',
      'bg-neutral-100',
      'font-medium',
      'text-neutral-600'
    );
  });
});

describe('Avatar Integration', () => {
  it('renders complete avatar structure', () => {
    render(
      <Avatar size="lg" src="https://example.com/avatar.jpg" alt="User avatar">
        <AvatarImage src="https://example.com/avatar.jpg" alt="User avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByAltText('User avatar')).toBeInTheDocument();
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('handles image loading states correctly', async () => {
    render(
      <Avatar src="https://example.com/avatar.jpg" alt="User avatar">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );

    // Should show fallback initially
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('handles multiple avatars correctly', () => {
    render(
      <div>
        <Avatar size="sm">A</Avatar>
        <Avatar size="md">B</Avatar>
        <Avatar size="lg">C</Avatar>
        <Avatar size="xl">D</Avatar>
      </div>
    );

    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
  });

  it('handles nested content correctly', () => {
    render(
      <Avatar>
        <AvatarFallback>
          <span>J</span>
          <span>D</span>
        </AvatarFallback>
      </Avatar>
    );

    expect(screen.getByText('J')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
  });
});
