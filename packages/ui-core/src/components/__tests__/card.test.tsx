import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card';

describe('Card Components', () => {
  describe('Card', () => {
    it('renders with default props', () => {
      render(<Card>Card content</Card>);
      const card = screen.getByText('Card content');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('rounded-lg', 'border', 'bg-white', 'shadow-sm');
    });

    it('applies custom className', () => {
      render(<Card className="custom-class">Custom card</Card>);
      const card = screen.getByText('Custom card');
      expect(card).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = { current: null };
      render(<Card ref={ref}>Ref test</Card>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('CardHeader', () => {
    it('renders with correct classes', () => {
      render(
        <Card>
          <CardHeader>Header content</CardHeader>
        </Card>
      );
      const header = screen.getByText('Header content');
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-4', 'sm:p-6');
    });
  });

  describe('CardTitle', () => {
    it('renders as h3 with correct classes', () => {
      render(
        <Card>
          <CardTitle>Card Title</CardTitle>
        </Card>
      );
      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toHaveTextContent('Card Title');
      expect(title).toHaveClass('text-xl', 'sm:text-2xl', 'font-semibold');
    });
  });

  describe('CardDescription', () => {
    it('renders with correct classes', () => {
      render(
        <Card>
          <CardDescription>Card description</CardDescription>
        </Card>
      );
      const description = screen.getByText('Card description');
      expect(description).toHaveClass('text-sm', 'text-muted-foreground');
    });
  });

  describe('CardContent', () => {
    it('renders with correct classes', () => {
      render(
        <Card>
          <CardContent>Card content</CardContent>
        </Card>
      );
      const content = screen.getByText('Card content');
      expect(content).toHaveClass('p-4', 'sm:p-6', 'pt-0');
    });
  });

  describe('CardFooter', () => {
    it('renders with correct classes', () => {
      render(
        <Card>
          <CardFooter>Footer content</CardFooter>
        </Card>
      );
      const footer = screen.getByText('Footer content');
      expect(footer).toHaveClass('flex', 'items-center', 'p-4', 'sm:p-6', 'pt-3');
    });
  });

  describe('Complete Card Structure', () => {
    it('renders a complete card with all components', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Card</CardTitle>
            <CardDescription>This is a test card</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the card content</p>
          </CardContent>
          <CardFooter>
            <button>Action</button>
          </CardFooter>
        </Card>
      );

      expect(screen.getByRole('heading', { name: 'Test Card' })).toBeInTheDocument();
      expect(screen.getByText('This is a test card')).toBeInTheDocument();
      expect(screen.getByText('This is the card content')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });
  });
});
