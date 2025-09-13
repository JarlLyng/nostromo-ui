import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const inputVariants = cva(
  'flex w-full rounded-lg border bg-neutral-50/50 px-3 py-2 text-sm placeholder:text-neutral-400 transition-input focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 shadow-input',
  {
    variants: {
      variant: {
        default: [
          'border-neutral-200 bg-neutral-50/50',
          'hover:border-neutral-300 hover:bg-neutral-50',
          'focus:ring-brand-500/50 focus:border-brand-500 focus:bg-white focus:shadow-input-focus',
          'focus-within:shadow-input-focus'
        ],
        error: [
          'border-error-300 bg-error-50/50',
          'hover:border-error-400 hover:bg-error-50',
          'focus:ring-error-500/50 focus:border-error-500 focus:bg-white focus:shadow-input-focus',
          'focus-within:shadow-input-focus'
        ],
        success: [
          'border-success-300 bg-success-50/50',
          'hover:border-success-400 hover:bg-success-50',
          'focus:ring-success-500/50 focus:border-success-500 focus:bg-white focus:shadow-input-focus',
          'focus-within:shadow-input-focus'
        ],
      },
      size: {
        sm: 'h-8 px-2 text-xs rounded-md',
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
