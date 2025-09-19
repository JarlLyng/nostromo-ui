import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel, SelectSeparator } from '../select';

expect.extend(toHaveNoViolations);

// Mock DOM methods that are not available in JSDOM
beforeEach(() => {
  // Mock hasPointerCapture
  Element.prototype.hasPointerCapture = vi.fn(() => false);
  Element.prototype.setPointerCapture = vi.fn();
  Element.prototype.releasePointerCapture = vi.fn();
  
  // Mock scrollIntoView
  Element.prototype.scrollIntoView = vi.fn();
});

describe('Select Accessibility', () => {
  it('should not have accessibility violations with default select', async () => {
    const { container } = render(
      <Select defaultValue="apple">
        <SelectTrigger aria-label="Select a fruit">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with outline variant', async () => {
    const { container } = render(
      <Select defaultValue="apple">
        <SelectTrigger variant="outline" aria-label="Select a fruit">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent variant="outline">
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with ghost variant', async () => {
    const { container } = render(
      <Select defaultValue="apple">
        <SelectTrigger variant="ghost" aria-label="Select a fruit">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent variant="ghost">
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with disabled select', async () => {
    const { container } = render(
      <Select disabled>
        <SelectTrigger aria-label="Select a fruit">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with disabled items', async () => {
    const { container } = render(
      <Select defaultValue="apple">
        <SelectTrigger aria-label="Select a fruit">
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

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with different sizes', async () => {
    const { container } = render(
      <Select defaultValue="apple">
        <SelectTrigger size="lg" aria-label="Select a fruit">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with groups and labels', async () => {
    const { container } = render(
      <Select defaultValue="apple">
        <SelectTrigger aria-label="Select a fruit">
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

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with icons in items', async () => {
    const { container } = render(
      <Select defaultValue="apple">
        <SelectTrigger aria-label="Select a fruit">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Apple
            </div>
          </SelectItem>
          <SelectItem value="banana">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Banana
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
