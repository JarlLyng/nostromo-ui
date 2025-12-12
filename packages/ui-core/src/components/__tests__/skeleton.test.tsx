import React from 'react';
import { render, screen } from '@testing-library/react';
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonButton, SkeletonCard, SkeletonTable, SkeletonList } from '../skeleton';

describe('Skeleton', () => {
  it('renders skeleton with default props', () => {
    render(<Skeleton className="w-64 h-4" />);
    
    const skeleton = screen.getByLabelText('Loading content');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('animate-pulse', 'rounded-md', 'bg-muted');
  });

  it('renders with custom variant', () => {
    const { rerender } = render(<Skeleton variant="primary" className="w-64 h-4" />);
    expect(screen.getByLabelText('Loading content')).toHaveClass('bg-primary/10');

    rerender(<Skeleton variant="success" className="w-64 h-4" />);
    expect(screen.getByLabelText('Loading content')).toHaveClass('bg-success-200');

    rerender(<Skeleton variant="warning" className="w-64 h-4" />);
    expect(screen.getByLabelText('Loading content')).toHaveClass('bg-warning-200');

    rerender(<Skeleton variant="error" className="w-64 h-4" />);
    expect(screen.getByLabelText('Loading content')).toHaveClass('bg-error-200');
  });

  it('renders with custom size', () => {
    const { rerender } = render(<Skeleton size="sm" className="w-64" />);
    expect(screen.getByLabelText('Loading content')).toHaveClass('h-3');

    rerender(<Skeleton size="lg" className="w-64" />);
    expect(screen.getByLabelText('Loading content')).toHaveClass('h-6');

    rerender(<Skeleton size="xl" className="w-64" />);
    expect(screen.getByLabelText('Loading content')).toHaveClass('h-8');
  });

  it('renders with custom shape', () => {
    const { rerender } = render(<Skeleton shape="circle" className="w-16 h-16" />);
    expect(screen.getByLabelText('Loading content')).toHaveClass('rounded-full');

    rerender(<Skeleton shape="square" className="w-16 h-16" />);
    expect(screen.getByLabelText('Loading content')).toHaveClass('rounded-lg');

    rerender(<Skeleton shape="pill" className="w-32 h-8" />);
    expect(screen.getByLabelText('Loading content')).toHaveClass('rounded-full');
  });

  it('renders with custom animation', () => {
    const { rerender } = render(<Skeleton animation="wave" className="w-64 h-4" />);
    expect(screen.getByLabelText('Loading content')).toHaveClass('animate-wave');

    rerender(<Skeleton animation="none" className="w-64 h-4" />);
    expect(screen.getByLabelText('Loading content')).toHaveClass('animate-none');
  });

  it('applies custom width and height', () => {
    render(<Skeleton width="200px" height="20px" />);
    
    const skeleton = screen.getByLabelText('Loading content');
    expect(skeleton).toHaveStyle({ width: '200px', height: '20px' });
  });

  it('applies custom className', () => {
    render(<Skeleton className="custom-skeleton w-64 h-4" />);
    
    const skeleton = screen.getByLabelText('Loading content');
    expect(skeleton).toHaveClass('custom-skeleton');
  });

  it('renders children when loading is false', () => {
    render(
      <Skeleton loading={false}>
        <div>Loaded content</div>
      </Skeleton>
    );
    
    expect(screen.getByText('Loaded content')).toBeInTheDocument();
    expect(screen.queryByLabelText('Loading content')).not.toBeInTheDocument();
  });

  it('has proper ARIA attributes', () => {
    render(<Skeleton className="w-64 h-4" />);
    
    const skeleton = screen.getByLabelText('Loading content');
    expect(skeleton).toHaveAttribute('role', 'status');
  });
});

describe('SkeletonText', () => {
  it('renders default text skeleton with 3 lines', () => {
    render(<SkeletonText />);
    
    const container = screen.getByLabelText('Loading text content');
    expect(container).toBeInTheDocument();
    
    const lines = container.querySelectorAll('div');
    expect(lines).toHaveLength(3);
  });

  it('renders with custom number of lines', () => {
    render(<SkeletonText lines={5} />);
    
    const container = screen.getByLabelText('Loading text content');
    const lines = container.querySelectorAll('div');
    expect(lines).toHaveLength(5);
  });

  it('renders with custom last line width', () => {
    render(<SkeletonText lastLineWidth="50%" />);
    
    const container = screen.getByLabelText('Loading text content');
    const lines = container.querySelectorAll('div');
    const lastLine = lines[lines.length - 1];
    expect(lastLine).toHaveStyle({ width: '50%' });
  });

  it('renders with custom spacing', () => {
    const { rerender } = render(<SkeletonText spacing="sm" />);
    expect(screen.getByLabelText('Loading text content')).toHaveClass('space-y-1');

    rerender(<SkeletonText spacing="lg" />);
    expect(screen.getByLabelText('Loading text content')).toHaveClass('space-y-3');
  });

  it('does not render when loading is false', () => {
    render(<SkeletonText loading={false} />);
    
    expect(screen.queryByLabelText('Loading text content')).not.toBeInTheDocument();
  });
});

describe('SkeletonAvatar', () => {
  it('renders avatar skeleton with default size', () => {
    render(<SkeletonAvatar />);
    
    const avatar = screen.getByLabelText('Loading avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass('rounded-full', 'h-10', 'w-10');
  });

  it('renders with custom size', () => {
    const { rerender } = render(<SkeletonAvatar size="sm" />);
    expect(screen.getByLabelText('Loading avatar')).toHaveClass('h-8', 'w-8');

    rerender(<SkeletonAvatar size="lg" />);
    expect(screen.getByLabelText('Loading avatar')).toHaveClass('h-12', 'w-12');

    rerender(<SkeletonAvatar size="xl" />);
    expect(screen.getByLabelText('Loading avatar')).toHaveClass('h-16', 'w-16');
  });

  it('renders with custom variant', () => {
    render(<SkeletonAvatar variant="primary" />);
    expect(screen.getByLabelText('Loading avatar')).toHaveClass('bg-primary/10');
  });

  it('does not render when loading is false', () => {
    render(<SkeletonAvatar loading={false} />);
    expect(screen.queryByLabelText('Loading avatar')).not.toBeInTheDocument();
  });
});

describe('SkeletonButton', () => {
  it('renders button skeleton with default size', () => {
    render(<SkeletonButton />);
    
    const button = screen.getByLabelText('Loading button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('rounded-md', 'h-10', 'px-4');
  });

  it('renders with custom size', () => {
    const { rerender } = render(<SkeletonButton size="sm" />);
    expect(screen.getByLabelText('Loading button')).toHaveClass('h-8', 'px-3');

    rerender(<SkeletonButton size="lg" />);
    expect(screen.getByLabelText('Loading button')).toHaveClass('h-12', 'px-6');
  });

  it('renders with custom variant', () => {
    const { rerender } = render(<SkeletonButton variant="primary" />);
    expect(screen.getByLabelText('Loading button')).toHaveClass('bg-primary/10');

    rerender(<SkeletonButton variant="outline" />);
    expect(screen.getByLabelText('Loading button')).toHaveClass('bg-muted', 'border', 'border-border');
  });

  it('does not render when loading is false', () => {
    render(<SkeletonButton loading={false} />);
    expect(screen.queryByLabelText('Loading button')).not.toBeInTheDocument();
  });
});

describe('SkeletonCard', () => {
  it('renders card skeleton with default props', () => {
    render(<SkeletonCard />);
    
    const card = screen.getByLabelText('Loading card content');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('p-6', 'border', 'border-border', 'rounded-lg', 'bg-card');
  });

  it('renders without avatar when showAvatar is false', () => {
    render(<SkeletonCard showAvatar={false} />);
    
    const card = screen.getByLabelText('Loading card content');
    expect(card).toBeInTheDocument();
    
    // Should not have avatar skeleton
    expect(screen.queryByLabelText('Loading avatar')).not.toBeInTheDocument();
  });

  it('renders without actions when showActions is false', () => {
    render(<SkeletonCard showActions={false} />);
    
    const card = screen.getByLabelText('Loading card content');
    expect(card).toBeInTheDocument();
    
    // Should not have button skeletons
    expect(screen.queryByLabelText('Loading button')).not.toBeInTheDocument();
  });

  it('does not render when loading is false', () => {
    render(<SkeletonCard loading={false} />);
    expect(screen.queryByLabelText('Loading card content')).not.toBeInTheDocument();
  });
});

describe('SkeletonTable', () => {
  it('renders table skeleton', () => {
    render(<SkeletonTable />);
    
    const table = screen.getByLabelText('Loading table content');
    expect(table).toBeInTheDocument();
    
    // Should have header and 5 rows
    const skeletons = table.querySelectorAll('[aria-label="Loading content"]');
    expect(skeletons).toHaveLength(24); // 4 header + 20 cells (5 rows × 4 columns)
  });

  it('does not render when loading is false', () => {
    render(<SkeletonTable loading={false} />);
    expect(screen.queryByLabelText('Loading table content')).not.toBeInTheDocument();
  });
});

describe('SkeletonList', () => {
  it('renders list skeleton with default items', () => {
    render(<SkeletonList />);
    
    const list = screen.getByLabelText('Loading list content');
    expect(list).toBeInTheDocument();
    
    // Should have 5 avatar skeletons (default items)
    const avatars = screen.getAllByLabelText('Loading avatar');
    expect(avatars).toHaveLength(5);
  });

  it('renders with custom number of items', () => {
    render(<SkeletonList items={3} />);
    
    const avatars = screen.getAllByLabelText('Loading avatar');
    expect(avatars).toHaveLength(3);
  });

  it('renders with custom variant', () => {
    render(<SkeletonList variant="primary" />);
    
    const avatars = screen.getAllByLabelText('Loading avatar');
    avatars.forEach(avatar => {
      expect(avatar).toHaveClass('bg-primary/10');
    });
  });

  it('does not render when loading is false', () => {
    render(<SkeletonList loading={false} />);
    expect(screen.queryByLabelText('Loading list content')).not.toBeInTheDocument();
  });
});
