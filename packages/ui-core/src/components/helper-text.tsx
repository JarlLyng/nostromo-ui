import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const helperTextVariants = cva(
  'text-sm text-muted-foreground',
  {
    variants: {
      variant: {
        default: 'text-muted-foreground',
        error: 'text-destructive',
        success: 'text-green-600',
        warning: 'text-yellow-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface HelperTextProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof helperTextVariants> {}

const HelperText = React.forwardRef<HTMLDivElement, HelperTextProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(helperTextVariants({ variant }), className)}
      {...props}
    />
  )
);
HelperText.displayName = 'HelperText';

export { HelperText, helperTextVariants };
