import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const inputVariants = cva(
  "flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-neutral-300 shadow-input hover:border-neutral-400 focus-visible:ring-brand-500 focus-visible:border-brand-500 focus-visible:shadow-input-focus",
        error: "border-error-500 shadow-input focus-visible:ring-error-500 focus-visible:border-error-500 focus-visible:shadow-input-focus",
        success: "border-success-500 shadow-input focus-visible:ring-success-500 focus-visible:border-success-500 focus-visible:shadow-input-focus",
      },
      inputSize: {
        default: "h-9 sm:h-10 px-3 sm:px-4 py-2",
        sm: "h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm",
        lg: "h-10 sm:h-11 px-4 sm:px-5 text-sm sm:text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  error?: boolean;
  helperText?: string;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, helperText, label, id, variant, inputSize, ...props }, ref) => {
    const inputId = id || React.useId();
    const helperTextId = helperText ? `${inputId}-helper` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    // Determine variant based on error state
    const inputVariant = error ? "error" : variant || "default";

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            inputVariants({ variant: inputVariant, inputSize, className })
          )}
          ref={ref}
          id={inputId}
          aria-describedby={cn(
            helperTextId,
            errorId
          ) || undefined}
          aria-invalid={error}
          {...props}
        />
        {helperText && (
          <p
            id={helperTextId}
            className={cn(
              "text-sm text-muted-foreground",
              error && "text-destructive"
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
