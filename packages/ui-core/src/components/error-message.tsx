import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const errorMessageVariants = cva(
  'text-sm text-destructive flex items-center gap-2',
  {
    variants: {
      variant: {
        default: 'text-destructive',
        inline: 'text-destructive text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ErrorMessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof errorMessageVariants> {}

const ErrorMessage = React.forwardRef<HTMLDivElement, ErrorMessageProps>(
  ({ className, variant, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(errorMessageVariants({ variant }), className)}
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
