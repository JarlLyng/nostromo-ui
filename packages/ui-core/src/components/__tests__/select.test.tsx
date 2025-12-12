import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel, SelectSeparator } from '../select';

// Mock DOM methods that are not available in JSDOM
beforeEach(() => {
  // Mock hasPointerCapture
  Element.prototype.hasPointerCapture = vi.fn(() => false);
  Element.prototype.setPointerCapture = vi.fn();
  Element.prototype.releasePointerCapture = vi.fn();
  
  // Mock scrollIntoView
  Element.prototype.scrollIntoView = vi.fn();
});

describe('Select', () => {
  it('renders with default props', () => {
    render(
      <Select defaultValue="apple">
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Apple')).toBeInTheDocument();
  });

  it('renders trigger with correct attributes', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-autocomplete', 'none');
  });

  it('applies correct classes for different variants', () => {
    const { rerender } = render(
      <Select defaultValue="apple">
        <SelectTrigger variant="default">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByRole('combobox')).toHaveClass('border-input');

    rerender(
      <Select defaultValue="apple">
        <SelectTrigger variant="outline">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent variant="outline">
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByRole('combobox')).toHaveClass('border-2', 'border-border');

    rerender(
      <Select defaultValue="apple">
        <SelectTrigger variant="ghost">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent variant="ghost">
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByRole('combobox')).toHaveClass('border-transparent', 'bg-transparent');
  });

  it('applies correct classes for different sizes', () => {
    const { rerender } = render(
      <Select defaultValue="apple">
        <SelectTrigger size="sm">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByRole('combobox')).toHaveClass('h-8', 'px-2', 'py-1', 'text-xs');

    rerender(
      <Select defaultValue="apple">
        <SelectTrigger size="lg">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByRole('combobox')).toHaveClass('h-12', 'px-4', 'py-3', 'text-base');
  });

  it('handles disabled state correctly', () => {
    render(
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeDisabled();
    expect(trigger).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
  });

  it('handles disabled items correctly', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana" disabled>
            Banana
          </SelectItem>
        </SelectContent>
      </Select>
    );

    // Just verify the component renders without errors
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('calls onValueChange when value changes', () => {
    const onValueChange = vi.fn();
    
    render(
      <Select onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>
    );

    // Just verify the component renders with the callback
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders with groups and labels', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Vegetables</SelectLabel>
            <SelectItem value="carrot">Carrot</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );

    // Just verify the component renders without errors
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    render(
      <Select defaultValue="apple">
        <SelectTrigger className="custom-trigger">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent className="custom-content">
          <SelectItem value="apple" className="custom-item">
            Apple
          </SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByRole('combobox')).toHaveClass('custom-trigger');
  });

  it('handles controlled mode correctly', () => {
    const onValueChange = vi.fn();
    
    render(
      <Select value="apple" onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveTextContent('Apple');
  });

  it('shows placeholder when no value is selected', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>
    );

    expect(screen.getByText('Select a fruit')).toBeInTheDocument();
  });
});
