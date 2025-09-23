import React from 'react';
import { render, screen } from '@testing-library/react';
import { Progress, CircularProgress } from '../progress';

describe('Progress', () => {
  it('renders with default props', () => {
    render(<Progress value={50} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });

  it('renders with custom max value', () => {
    render(<Progress value={25} max={50} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '25');
    expect(progressBar).toHaveAttribute('aria-valuemax', '50');
  });

  it('renders with label when showLabel is true', () => {
    render(<Progress value={75} showLabel />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    render(<Progress value={60} label="Custom Progress" showLabel />);
    expect(screen.getAllByText('Custom Progress')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Custom Progress')).toHaveLength(2); // Label appears twice
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Progress value={50} size="sm" />);
    expect(screen.getByRole('progressbar')).toHaveClass('h-1');

    rerender(<Progress value={50} size="md" />);
    expect(screen.getByRole('progressbar')).toHaveClass('h-2');

    rerender(<Progress value={50} size="lg" />);
    expect(screen.getByRole('progressbar')).toHaveClass('h-3');

    rerender(<Progress value={50} size="xl" />);
    expect(screen.getByRole('progressbar')).toHaveClass('h-4');
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(<Progress value={50} variant="primary" />);
    expect(screen.getByRole('progressbar')).toHaveClass('bg-primary-100');

    rerender(<Progress value={50} variant="success" />);
    expect(screen.getByRole('progressbar')).toHaveClass('bg-success-100');

    rerender(<Progress value={50} variant="energy" />);
    expect(screen.getByRole('progressbar')).toHaveClass('bg-gradient-to-r');
  });

  it('handles indeterminate state', () => {
    render(<Progress value={0} indeterminate />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).not.toHaveAttribute('aria-valuenow');
  });

  it('clamps value between 0 and max', () => {
    const { rerender } = render(<Progress value={150} max={100} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '150');

    rerender(<Progress value={-10} max={100} />);
    expect(progressBar).toHaveAttribute('aria-valuenow', '-10');
  });

  it('applies custom className', () => {
    render(<Progress value={50} className="custom-class" />);
    expect(screen.getByRole('progressbar')).toHaveClass('custom-class');
  });
});

describe('CircularProgress', () => {
  it('renders with default props', () => {
    render(<CircularProgress value={50} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });

  it('renders with custom max value', () => {
    render(<CircularProgress value={25} max={50} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '25');
    expect(progressBar).toHaveAttribute('aria-valuemax', '50');
  });

  it('renders with label when showLabel is true', () => {
    render(<CircularProgress value={75} showLabel />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    render(<CircularProgress value={60} label="Custom" showLabel />);
    expect(screen.getByText('Custom')).toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<CircularProgress value={50} size="sm" />);
    expect(screen.getByRole('progressbar')).toHaveClass('w-8', 'h-8');

    rerender(<CircularProgress value={50} size="md" />);
    expect(screen.getByRole('progressbar')).toHaveClass('w-12', 'h-12');

    rerender(<CircularProgress value={50} size="lg" />);
    expect(screen.getByRole('progressbar')).toHaveClass('w-16', 'h-16');

    rerender(<CircularProgress value={50} size="xl" />);
    expect(screen.getByRole('progressbar')).toHaveClass('w-20', 'h-20');
  });

  it('applies custom className', () => {
    render(<CircularProgress value={50} className="custom-class" />);
    expect(screen.getByRole('progressbar')).toHaveClass('custom-class');
  });

  it('renders SVG with correct attributes', () => {
    render(<CircularProgress value={50} size="md" />);
    const svg = screen.getByRole('progressbar').querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('transform', '-rotate-90');
  });
});

describe('Progress Accessibility', () => {
  it('has proper ARIA attributes', () => {
    render(<Progress value={75} label="System Status" />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '75');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    expect(progressBar).toHaveAttribute('aria-label', 'System Status');
  });

  it('has proper ARIA attributes for circular progress', () => {
    render(<CircularProgress value={60} label="Loading" />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '60');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    expect(progressBar).toHaveAttribute('aria-label', 'Loading');
  });

  it('uses default aria-label when no label provided', () => {
    render(<Progress value={50} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-label', 'Progress');
  });
});
