import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const errorMessageVariants = cva(
  'text-sm flex items-center gap-2 transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'text-destructive',
        inline: 'text-destructive text-xs',
        subtle: 'text-destructive/80',
        strong: 'text-destructive font-semibold',
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

export interface ErrorMessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof errorMessageVariants> {}

const ErrorMessage = React.forwardRef<HTMLDivElement, ErrorMessageProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(errorMessageVariants({ variant, size }), className)}
      role="alert"
      aria-live="polite"
      {...props}
    >
      {children}
    </div>
  )
);
ErrorMessage.displayName = 'ErrorMessage';

export { ErrorMessage, errorMessageVariants };
