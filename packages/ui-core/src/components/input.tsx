import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const inputVariants = cva(
  // Base - forbedret med bedre spacing og transitions
  "flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
  {
    variants: {
      variant: {
        // Forbedret default med bedre focus
        default: [
          "border-neutral-300 shadow-sm",
          "hover:border-neutral-400 hover:shadow-sm",
          "focus-visible:ring-brand-500/20 focus-visible:border-brand-500",
          "focus-visible:shadow-md"
        ],
        // Forbedret error med bedre feedback
        error: [
          "border-error-500 shadow-sm",
          "hover:border-error-600 hover:shadow-sm",
          "focus-visible:ring-error-500/20 focus-visible:border-error-500",
          "focus-visible:shadow-md"
        ],
        // Forbedret success med bedre feedback
        success: [
          "border-success-500 shadow-sm",
          "hover:border-success-600 hover:shadow-sm",
          "focus-visible:ring-success-500/20 focus-visible:border-success-500",
          "focus-visible:shadow-md"
        ],
        // Ny: Subtle variant for mindre vigtige inputs
        subtle: [
          "border-neutral-200 bg-neutral-50/50",
          "hover:border-neutral-300 hover:bg-neutral-50/80",
          "focus-visible:ring-brand-500/10 focus-visible:border-brand-500",
          "focus-visible:bg-white"
        ]
      },
      inputSize: {
        // Forbedret spacing - mere konsistent
        sm: "h-8 px-2.5 text-xs",
        default: "h-10 px-3 text-sm",
        lg: "h-11 px-4 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default"
    }
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  error?: boolean;
  success?: boolean;
  helperText?: string;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, success, helperText, label, id, variant, inputSize, ...props }, ref) => {
    const inputId = id || React.useId();
    const helperTextId = helperText ? `${inputId}-helper` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    // Bestem variant baseret på state
    const inputVariant = error ? "error" : success ? "success" : variant || "default";

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
          className={cn(inputVariants({ variant: inputVariant, inputSize, className }))}
          ref={ref}
          id={inputId}
          aria-describedby={cn(helperTextId, errorId) || undefined}
          aria-invalid={error}
          {...props}
        />
        {helperText && (
          <p
            id={helperTextId}
            className={cn(
              "text-sm text-muted-foreground",
              error && "text-error-600",
              success && "text-success-600"
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
