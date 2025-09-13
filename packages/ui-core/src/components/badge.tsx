import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const badgeVariants = cva(
  [
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  ],
  {
    variants: {
      variant: {
        default: 'border-transparent bg-brand-500 text-white hover:bg-brand-600',
        secondary: 'border-transparent bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
        destructive: 'border-transparent bg-red-500 text-white hover:bg-red-600',
        outline: 'text-neutral-950 border-neutral-200',
        success: 'border-transparent bg-green-500 text-white hover:bg-green-600',
        warning: 'border-transparent bg-yellow-500 text-white hover:bg-yellow-600',
        info: 'border-transparent bg-blue-500 text-white hover:bg-blue-600',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
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
