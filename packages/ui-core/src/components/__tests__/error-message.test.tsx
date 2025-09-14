import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorMessage } from '../error-message';

describe('ErrorMessage', () => {
  it('renders correctly', () => {
    render(<ErrorMessage>Error message content</ErrorMessage>);
    expect(screen.getByText('Error message content')).toBeInTheDocument();
  });

  it('applies default variant styles', () => {
    render(<ErrorMessage>Error message content</ErrorMessage>);
    const errorMessage = screen.getByText('Error message content');
    expect(errorMessage).toHaveClass('text-sm', 'text-destructive', 'flex', 'items-center', 'gap-2');
  });

  it('applies inline variant styles', () => {
    render(<ErrorMessage variant="inline">Inline error</ErrorMessage>);
    const errorMessage = screen.getByText('Inline error');
    expect(errorMessage).toHaveClass('text-xs', 'text-destructive');
  });

  it('applies custom className', () => {
    render(<ErrorMessage className="custom-class">Error message content</ErrorMessage>);
    const errorMessage = screen.getByText('Error message content');
    expect(errorMessage).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ErrorMessage ref={ref}>Error message content</ErrorMessage>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has proper accessibility attributes', () => {
    render(<ErrorMessage>Error message content</ErrorMessage>);
    const errorMessage = screen.getByText('Error message content');
    expect(errorMessage).toHaveAttribute('role', 'alert');
    expect(errorMessage).toHaveAttribute('aria-live', 'polite');
  });
});
