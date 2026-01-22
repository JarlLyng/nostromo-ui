import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar, AvatarImage, AvatarFallback } from '../avatar';

describe('Avatar', () => {
  it('renders with default props', () => {
    render(<Avatar fallback="JD" />);
    const avatar = screen.getByText('JD');
    expect(avatar).toBeInTheDocument();
    expect(avatar.parentElement).toHaveClass('relative', 'flex', 'shrink-0');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Avatar size="sm" fallback="SM" />);
    expect(screen.getByText('SM').parentElement).toHaveClass('h-8', 'w-8');

    rerender(<Avatar size="lg" fallback="LG" />);
    expect(screen.getByText('LG').parentElement).toHaveClass('h-12', 'w-12');

    rerender(<Avatar size="xl" fallback="XL" />);
    expect(screen.getByText('XL').parentElement).toHaveClass('h-16', 'w-16');
  });

  it('renders image when src is provided', () => {
    render(<Avatar src="/test-image.jpg" alt="Test user" fallback="TU" />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test user');
  });

  it('shows fallback when image fails to load', () => {
    render(<Avatar src="/broken-image.jpg" fallback="BF" />);
    const image = screen.getByRole('img');
    
    // Simulate image error
    fireEvent.error(image);
    
    expect(screen.getByText('BF')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('resets image error when src changes', () => {
    const { rerender } = render(<Avatar src="/broken-image.jpg" fallback="BF" />);
    const image = screen.getByRole('img');
    
    // Simulate image error
    fireEvent.error(image);
    expect(screen.getByText('BF')).toBeInTheDocument();
    
    // Change src
    rerender(<Avatar src="/new-image.jpg" fallback="BF" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.queryByText('BF')).not.toBeInTheDocument();
  });

  it('renders with compound component API', () => {
    render(
      <Avatar>
        <AvatarImage src="/test.jpg" alt="Test" />
        <AvatarFallback>TF</AvatarFallback>
      </Avatar>
    );
    
    const image = screen.getByRole('img');
    const fallback = screen.getByText('TF');
    
    expect(image).toBeInTheDocument();
    expect(fallback).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Avatar className="custom-class" fallback="CC" />);
    const avatar = screen.getByText('CC').parentElement;
    expect(avatar).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Avatar ref={ref} fallback="RF" />);
    expect(ref).toHaveBeenCalled();
  });
});

describe('AvatarImage', () => {
  it('renders with correct classes', () => {
    render(
      <Avatar>
        <AvatarImage src="/test.jpg" alt="Test" />
      </Avatar>
    );
    const image = screen.getByRole('img');
    expect(image).toHaveClass('aspect-square', 'h-full', 'w-full', 'object-cover');
  });

  it('applies custom className', () => {
    render(
      <Avatar>
        <AvatarImage src="/test.jpg" alt="Test" className="custom-img" />
      </Avatar>
    );
    const image = screen.getByRole('img');
    expect(image).toHaveClass('custom-img');
  });
});

describe('AvatarFallback', () => {
  it('renders with correct classes', () => {
    render(
      <Avatar>
        <AvatarFallback>AF</AvatarFallback>
      </Avatar>
    );
    const fallback = screen.getByText('AF');
    expect(fallback).toHaveClass('flex', 'h-full', 'w-full', 'items-center', 'justify-center');
  });

  it('applies custom className', () => {
    render(
      <Avatar>
        <AvatarFallback className="custom-fallback">CF</AvatarFallback>
      </Avatar>
    );
    const fallback = screen.getByText('CF');
    expect(fallback).toHaveClass('custom-fallback');
  });
});
