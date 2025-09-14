import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { HelperText } from '../helper-text';

describe('HelperText', () => {
  it('renders correctly', () => {
    render(<HelperText>Helper text content</HelperText>);
    expect(screen.getByText('Helper text content')).toBeInTheDocument();
  });

  it('applies default variant styles', () => {
    render(<HelperText>Helper text content</HelperText>);
    const helperText = screen.getByText('Helper text content');
    expect(helperText).toHaveClass('text-sm', 'text-muted-foreground');
  });

  it('applies error variant styles', () => {
    render(<HelperText variant="error">Error message</HelperText>);
    const helperText = screen.getByText('Error message');
    expect(helperText).toHaveClass('text-destructive');
  });

  it('applies success variant styles', () => {
    render(<HelperText variant="success">Success message</HelperText>);
    const helperText = screen.getByText('Success message');
    expect(helperText).toHaveClass('text-green-600');
  });

  it('applies warning variant styles', () => {
    render(<HelperText variant="warning">Warning message</HelperText>);
    const helperText = screen.getByText('Warning message');
    expect(helperText).toHaveClass('text-yellow-600');
  });

  it('applies custom className', () => {
    render(<HelperText className="custom-class">Helper text content</HelperText>);
    const helperText = screen.getByText('Helper text content');
    expect(helperText).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<HelperText ref={ref}>Helper text content</HelperText>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
