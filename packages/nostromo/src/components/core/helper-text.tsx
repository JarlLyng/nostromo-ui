import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const helperTextVariants = cva(
  'text-sm transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'text-muted-foreground',
        error: 'text-destructive',
        success: 'text-success-600',
        warning: 'text-warning-600',
        info: 'text-info-600',
      },
      size: {
        sm: 'text-xs',
        default: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface HelperTextProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof helperTextVariants> {}

const HelperText = React.forwardRef<HTMLDivElement, HelperTextProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(helperTextVariants({ variant, size }), className)}
      {...props}
    />
  )
);
HelperText.displayName = 'HelperText';

export { HelperText, helperTextVariants };
