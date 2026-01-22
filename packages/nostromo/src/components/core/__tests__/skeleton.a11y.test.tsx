import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonButton, SkeletonCard, SkeletonTable, SkeletonList } from '../skeleton';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('Skeleton Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(
      <Skeleton className="w-64 h-4" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', async () => {
    const { container } = render(
      <Skeleton className="w-64 h-4" />
    );
    
    const skeleton = screen.getByLabelText('Loading content');
    expect(skeleton).toHaveAttribute('role', 'status');
    expect(skeleton).toHaveAttribute('aria-label', 'Loading content');
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper contrast for different variants', async () => {
    const variants = ['default', 'light', 'dark', 'primary', 'success', 'warning', 'error'] as const;
    
    for (const variant of variants) {
      const { container } = render(
        <Skeleton variant={variant} className="w-64 h-4" />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should have proper contrast for different sizes', async () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;
    
    for (const size of sizes) {
      const { container } = render(
        <Skeleton size={size} className="w-64" />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should have proper contrast for different shapes', async () => {
    const shapes = ['rectangle', 'circle', 'square', 'pill'] as const;
    
    for (const shape of shapes) {
      const { container } = render(
        <Skeleton shape={shape} className="w-16 h-16" />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should have proper contrast for different animations', async () => {
    const animations = ['pulse', 'wave', 'none'] as const;
    
    for (const animation of animations) {
      const { container } = render(
        <Skeleton animation={animation} className="w-64 h-4" />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should have accessible skeleton with custom dimensions', async () => {
    const { container } = render(
      <Skeleton width="200px" height="20px" />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible skeleton with custom className', async () => {
    const { container } = render(
      <Skeleton className="custom-skeleton w-64 h-4" />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible skeleton with children when loading is false', async () => {
    const { container } = render(
      <Skeleton loading={false}>
        <div>Loaded content</div>
      </Skeleton>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible SkeletonText', async () => {
    const { container } = render(
      <SkeletonText />
    );
    
    const textSkeleton = screen.getByLabelText('Loading text content');
    expect(textSkeleton).toHaveAttribute('role', 'status');
    expect(textSkeleton).toHaveAttribute('aria-label', 'Loading text content');
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible SkeletonText with custom props', async () => {
    const { container } = render(
      <SkeletonText lines={5} lastLineWidth="50%" spacing="lg" variant="primary" />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible SkeletonAvatar', async () => {
    const { container } = render(
      <SkeletonAvatar />
    );
    
    const avatar = screen.getByLabelText('Loading avatar');
    expect(avatar).toHaveAttribute('role', 'status');
    expect(avatar).toHaveAttribute('aria-label', 'Loading avatar');
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible SkeletonAvatar with different sizes', async () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
    
    for (const size of sizes) {
      const { container } = render(
        <SkeletonAvatar size={size} />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should have accessible SkeletonButton', async () => {
    const { container } = render(
      <SkeletonButton />
    );
    
    const button = screen.getByLabelText('Loading button');
    expect(button).toHaveAttribute('role', 'status');
    expect(button).toHaveAttribute('aria-label', 'Loading button');
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible SkeletonButton with different variants', async () => {
    const variants = ['default', 'primary', 'secondary', 'outline', 'ghost'] as const;
    
    for (const variant of variants) {
      const { container } = render(
        <SkeletonButton variant={variant} />
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should have accessible SkeletonCard', async () => {
    const { container } = render(
      <SkeletonCard />
    );
    
    const card = screen.getByLabelText('Loading card content');
    expect(card).toHaveAttribute('role', 'status');
    expect(card).toHaveAttribute('aria-label', 'Loading card content');
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible SkeletonCard without avatar', async () => {
    const { container } = render(
      <SkeletonCard showAvatar={false} />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible SkeletonCard without actions', async () => {
    const { container } = render(
      <SkeletonCard showActions={false} />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible SkeletonTable', async () => {
    const { container } = render(
      <SkeletonTable />
    );
    
    const table = screen.getByLabelText('Loading table content');
    expect(table).toHaveAttribute('role', 'status');
    expect(table).toHaveAttribute('aria-label', 'Loading table content');
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible SkeletonList', async () => {
    const { container } = render(
      <SkeletonList />
    );
    
    const list = screen.getByLabelText('Loading list content');
    expect(list).toHaveAttribute('role', 'status');
    expect(list).toHaveAttribute('aria-label', 'Loading list content');
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible SkeletonList with custom items', async () => {
    const { container } = render(
      <SkeletonList items={3} variant="primary" />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible complex skeleton layout', async () => {
    const { container } = render(
      <div className="max-w-2xl space-y-6">
        {/* User Profile Skeleton */}
        <div className="p-6 border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-4 mb-4">
            <SkeletonAvatar size="lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <SkeletonText lines={3} />
        </div>

        {/* Article Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <SkeletonText lines={4} />
          <div className="flex space-x-2">
            <SkeletonButton size="sm" />
            <SkeletonButton size="sm" />
          </div>
        </div>

        {/* Dashboard Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible skeleton with loading state control', async () => {
    const { container } = render(
      <div>
        <Skeleton loading={true} className="w-64 h-4" />
        <Skeleton loading={false} className="w-64 h-4">
          <div>Loaded content</div>
        </Skeleton>
      </div>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible skeleton with custom animations', async () => {
    const { container } = render(
      <div className="space-y-4">
        <Skeleton animation="pulse" className="w-64 h-4" />
        <Skeleton animation="wave" className="w-64 h-4" />
        <Skeleton animation="none" className="w-64 h-4" />
      </div>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible skeleton with different shapes', async () => {
    const { container } = render(
      <div className="space-y-4">
        <Skeleton shape="rectangle" className="w-64 h-4" />
        <Skeleton shape="circle" className="w-16 h-16" />
        <Skeleton shape="square" className="w-16 h-16" />
        <Skeleton shape="pill" className="w-32 h-8" />
      </div>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have accessible skeleton with mixed content', async () => {
    const { container } = render(
      <div className="space-y-4">
        <SkeletonText lines={3} />
        <div className="flex space-x-4">
          <SkeletonAvatar size="md" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
        <div className="flex space-x-2">
          <SkeletonButton size="sm" />
          <SkeletonButton size="sm" />
        </div>
      </div>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
