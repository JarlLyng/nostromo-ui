import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

// Skeleton variants
const skeletonVariants = cva(
  'animate-pulse rounded-md bg-gray-200',
  {
    variants: {
      variant: {
        default: 'bg-gray-200',
        light: 'bg-gray-100',
        dark: 'bg-gray-300',
        primary: 'bg-blue-200',
        success: 'bg-green-200',
        warning: 'bg-yellow-200',
        error: 'bg-red-200'
      },
      size: {
        xs: 'h-2',
        sm: 'h-3',
        md: 'h-4',
        lg: 'h-6',
        xl: 'h-8',
        '2xl': 'h-12',
        '3xl': 'h-16'
      },
      shape: {
        rectangle: 'rounded-md',
        circle: 'rounded-full',
        square: 'rounded-lg',
        pill: 'rounded-full'
      },
      animation: {
        pulse: 'animate-pulse',
        wave: 'animate-wave',
        none: 'animate-none'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      shape: 'rectangle',
      animation: 'pulse'
    }
  }
);

// Types
export interface SkeletonProps extends VariantProps<typeof skeletonVariants> {
  className?: string;
  children?: React.ReactNode;
  width?: string | number;
  height?: string | number;
  lines?: number;
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export interface SkeletonTextProps extends Omit<SkeletonProps, 'shape' | 'size'> {
  lines?: number;
  lastLineWidth?: string | number;
}

export interface SkeletonAvatarProps extends Omit<SkeletonProps, 'shape' | 'size'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export interface SkeletonButtonProps extends Omit<SkeletonProps, 'shape' | 'size' | 'variant'> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost';
}

export interface SkeletonCardProps extends Omit<SkeletonProps, 'shape' | 'size'> {
  showAvatar?: boolean;
  showActions?: boolean;
}

// Main Skeleton Component
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({
    className,
    children,
    width,
    height,
    variant = 'default',
    size = 'md',
    shape = 'rectangle',
    animation = 'pulse',
    loading = true,
    ...props
  }, ref) => {
    if (!loading && children) {
      return <>{children}</>;
    }

    const style = {
      width: width || undefined,
      height: height || undefined,
    };

    return (
      <div
        ref={ref}
        className={cn(
          skeletonVariants({ variant, size, shape, animation }),
          className
        )}
        style={style}
        aria-label="Loading content"
        role="status"
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

// Skeleton Text Component
export const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({
    className,
    lines = 3,
    lastLineWidth = '75%',
    spacing = 'md',
    variant = 'default',
    animation = 'pulse',
    loading = true,
    ...props
  }, ref) => {
    if (!loading) {
      return null;
    }

    const spacingClasses = {
      none: 'space-y-0',
      sm: 'space-y-1',
      md: 'space-y-2',
      lg: 'space-y-3'
    };

    return (
      <div
        ref={ref}
        className={cn('space-y-2', spacingClasses[spacing], className)}
        aria-label="Loading text content"
        role="status"
        {...props}
      >
        {Array.from({ length: lines }, (_, index) => (
          <div
            key={index}
            className={cn(
              skeletonVariants({ variant, animation }),
              'h-4 rounded-md',
              index === lines - 1 && 'w-3/4'
            )}
            style={{
              width: index === lines - 1 ? lastLineWidth : '100%'
            }}
          />
        ))}
      </div>
    );
  }
);

SkeletonText.displayName = 'SkeletonText';

// Skeleton Avatar Component
export const SkeletonAvatar = React.forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({
    className,
    size = 'md',
    variant = 'default',
    animation = 'pulse',
    loading = true,
    ...props
  }, ref) => {
    if (!loading) {
      return null;
    }

    const sizeClasses = {
      xs: 'h-6 w-6',
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16',
      '2xl': 'h-20 w-20'
    };

    return (
      <div
        ref={ref}
        className={cn(
          skeletonVariants({ variant, animation }),
          'rounded-full',
          sizeClasses[size],
          className
        )}
        aria-label="Loading avatar"
        role="status"
        {...props}
      />
    );
  }
);

SkeletonAvatar.displayName = 'SkeletonAvatar';

// Skeleton Button Component
export const SkeletonButton = React.forwardRef<HTMLDivElement, SkeletonButtonProps>(
  ({
    className,
    size = 'md',
    variant = 'default',
    animation = 'pulse',
    loading = true,
    ...props
  }, ref) => {
    if (!loading) {
      return null;
    }

    const sizeClasses = {
      sm: 'h-8 px-3',
      md: 'h-10 px-4',
      lg: 'h-12 px-6'
    };

    const variantClasses = {
      default: 'bg-gray-200',
      primary: 'bg-blue-200',
      secondary: 'bg-gray-300',
      outline: 'bg-gray-100 border border-gray-300',
      ghost: 'bg-gray-100'
    };

    const finalVariant = variant || 'default';

    return (
      <div
        ref={ref}
        className={cn(
          skeletonVariants({ animation }),
          'rounded-md',
          sizeClasses[size],
          variantClasses[finalVariant],
          className
        )}
        aria-label="Loading button"
        role="status"
        {...props}
      />
    );
  }
);

SkeletonButton.displayName = 'SkeletonButton';

// Skeleton Card Component
export const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonCardProps>(
  ({
    className,
    showAvatar = true,
    showActions = true,
    variant = 'default',
    animation = 'pulse',
    loading = true,
    ...props
  }, ref) => {
    if (!loading) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          'p-6 border border-gray-200 rounded-lg bg-white',
          className
        )}
        aria-label="Loading card content"
        role="status"
        {...props}
      >
        <div className="space-y-4">
          {/* Header with avatar and title */}
          <div className="flex items-center space-x-3">
            {showAvatar && (
              <SkeletonAvatar size="md" variant={variant} animation={animation} />
            )}
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" variant={variant} animation={animation} />
              <Skeleton className="h-3 w-1/2" variant={variant} animation={animation} />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" variant={variant} animation={animation} />
            <Skeleton className="h-4 w-5/6" variant={variant} animation={animation} />
            <Skeleton className="h-4 w-4/5" variant={variant} animation={animation} />
          </div>

          {/* Actions */}
          {showActions && (
            <div className="flex space-x-2 pt-4">
              <SkeletonButton size="sm" animation={animation} />
              <SkeletonButton size="sm" animation={animation} />
            </div>
          )}
        </div>
      </div>
    );
  }
);

SkeletonCard.displayName = 'SkeletonCard';

// Skeleton Table Component
export const SkeletonTable = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({
    className,
    variant = 'default',
    animation = 'pulse',
    loading = true,
    ...props
  }, ref) => {
    if (!loading) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn('space-y-3', className)}
        aria-label="Loading table content"
        role="status"
        {...props}
      >
        {/* Header */}
        <div className="grid grid-cols-4 gap-4">
          <Skeleton className="h-4" variant={variant} animation={animation} />
          <Skeleton className="h-4" variant={variant} animation={animation} />
          <Skeleton className="h-4" variant={variant} animation={animation} />
          <Skeleton className="h-4" variant={variant} animation={animation} />
        </div>

        {/* Rows */}
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="grid grid-cols-4 gap-4">
            <Skeleton className="h-4" variant={variant} animation={animation} />
            <Skeleton className="h-4" variant={variant} animation={animation} />
            <Skeleton className="h-4" variant={variant} animation={animation} />
            <Skeleton className="h-4" variant={variant} animation={animation} />
          </div>
        ))}
      </div>
    );
  }
);

SkeletonTable.displayName = 'SkeletonTable';

// Skeleton List Component
export const SkeletonList = React.forwardRef<HTMLDivElement, SkeletonProps & { items?: number }>(
  ({
    className,
    items = 5,
    variant = 'default',
    animation = 'pulse',
    loading = true,
    ...props
  }, ref) => {
    if (!loading) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn('space-y-3', className)}
        aria-label="Loading list content"
        role="status"
        {...props}
      >
        {Array.from({ length: items }, (_, index) => (
          <div key={index} className="flex items-center space-x-3">
            <SkeletonAvatar size="sm" variant={variant} animation={animation} />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" variant={variant} animation={animation} />
              <Skeleton className="h-3 w-1/2" variant={variant} animation={animation} />
            </div>
          </div>
        ))}
      </div>
    );
  }
);

SkeletonList.displayName = 'SkeletonList';

// Export variants for external use
export { skeletonVariants };
