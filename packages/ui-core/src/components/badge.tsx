import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const badgeVariants = cva(
  [
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-1 shadow-sm',
    'relative overflow-hidden',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-transparent bg-brand-500 text-white shadow-brand-500/25',
          'hover:bg-brand-600 hover:shadow-brand-500/40 hover:scale-105',
          'focus:ring-brand-500/50'
        ],
        secondary: [
          'border-neutral-200 bg-neutral-100 text-neutral-700 shadow-neutral-200/25',
          'hover:bg-neutral-200 hover:shadow-neutral-300/40 hover:scale-105',
          'focus:ring-neutral-500/50'
        ],
        destructive: [
          'border-transparent bg-error-500 text-white shadow-error-500/25',
          'hover:bg-error-600 hover:shadow-error-500/40 hover:scale-105',
          'focus:ring-error-500/50'
        ],
        outline: [
          'text-neutral-700 border-neutral-300 bg-white/80 backdrop-blur-sm',
          'hover:bg-neutral-50 hover:border-neutral-400 hover:shadow-neutral-300/40',
          'focus:ring-neutral-500/50'
        ],
        success: [
          'border-transparent bg-success-500 text-white shadow-success-500/25',
          'hover:bg-success-600 hover:shadow-success-500/40 hover:scale-105',
          'focus:ring-success-500/50'
        ],
        warning: [
          'border-transparent bg-warning-500 text-white shadow-warning-500/25',
          'hover:bg-warning-600 hover:shadow-warning-500/40 hover:scale-105',
          'focus:ring-warning-500/50'
        ],
        info: [
          'border-transparent bg-info-500 text-white shadow-info-500/25',
          'hover:bg-info-600 hover:shadow-info-500/40 hover:scale-105',
          'focus:ring-info-500/50'
        ],
      },
      size: {
        sm: 'px-2 py-0.5 text-xs rounded-md',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

function Badge({ className, variant, size, asChild = false, children, ...props }: BadgeProps) {
  if (asChild) {
    return (
      <React.Fragment>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              className: cn(badgeVariants({ variant, size }), className),
            } as any);
          }
          return child;
        })}
      </React.Fragment>
    );
  }

  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
