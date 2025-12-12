import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'text-foreground',
        muted: 'text-muted-foreground',
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
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      weight: 'medium',
    },
  }
);

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, variant, size, weight, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(labelVariants({ variant, size, weight }), className)}
      {...props}
    />
  )
);
Label.displayName = 'Label';

export { Label, labelVariants };
