import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const inputVariants = cva(
  'flex w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-neutral-300 focus:ring-brand-500 focus:border-brand-500',
        error: 'border-error-500 focus:ring-error-500 focus:border-error-500',
        success: 'border-success-500 focus:ring-success-500 focus:border-success-500',
      },
      size: {
        sm: 'h-8 px-2 text-xs',
        md: 'h-10 px-3 py-2 text-sm',
        lg: 'h-12 px-4 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  error?: string;
  success?: string;
  label?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, error, success, label, helperText, id, ...props }, ref) => {
    const inputId = id || React.useId();
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    const describedBy = [errorId, helperId].filter(Boolean).join(' ');

    // Determine variant based on error/success states
    const inputVariant = error ? 'error' : success ? 'success' : variant;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          className={cn(inputVariants({ variant: inputVariant, size, className }))}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={describedBy || undefined}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1 text-sm text-error-600" role="alert">
            {error}
          </p>
        )}
        {success && !error && (
          <p id={helperId} className="mt-1 text-sm text-success-600">
            {success}
          </p>
        )}
        {helperText && !error && !success && (
          <p id={helperId} className="mt-1 text-sm text-neutral-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };
