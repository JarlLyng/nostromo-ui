import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const buttonVariants = cva(
  // Base styles with modern aesthetics
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden',
  {
    variants: {
      variant: {
        primary: [
          'bg-brand-500 text-neutral-50 shadow-button',
          'hover:bg-brand-600 hover:shadow-button-hover hover:-translate-y-0.5',
          'active:translate-y-0 active:shadow-button',
          'focus-visible:ring-brand-500/50',
          'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-500 hover:before:translate-x-[100%]'
        ],
        secondary: [
          'bg-neutral-100 text-neutral-900 shadow-button border border-neutral-200',
          'hover:bg-neutral-200 hover:shadow-button-hover hover:-translate-y-0.5',
          'active:translate-y-0 active:shadow-button',
          'focus-visible:ring-neutral-500/50'
        ],
        ghost: [
          'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900',
          'focus-visible:ring-neutral-500/50',
          'hover:shadow-sm'
        ],
        destructive: [
          'bg-error-500 text-neutral-50 shadow-button',
          'hover:bg-error-600 hover:shadow-button-hover hover:-translate-y-0.5',
          'active:translate-y-0 active:shadow-button',
          'focus-visible:ring-error-500/50'
        ],
        outline: [
          'border border-neutral-300 bg-transparent text-neutral-700 shadow-input',
          'hover:bg-neutral-50 hover:border-neutral-400 hover:shadow-button-hover hover:-translate-y-0.5',
          'active:translate-y-0 active:shadow-input',
          'focus-visible:ring-neutral-500/50'
        ],
        link: [
          'text-brand-500 underline-offset-4 hover:underline',
          'focus-visible:ring-brand-500/50',
          'hover:text-brand-600'
        ],
      },
      size: {
        sm: 'h-8 px-3 text-xs rounded-md',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
