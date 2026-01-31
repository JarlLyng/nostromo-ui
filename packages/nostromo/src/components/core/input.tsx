import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const inputVariants = cva(
  // Base styles with improved spacing and transitions
  "flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
  {
    variants: {
      variant: {
        // Enhanced default with better focus
        default: [
          "border-border shadow-sm",
          "hover:border-border hover:shadow-sm",
          "focus-visible:ring-ring/20 focus-visible:border-ring",
          "focus-visible:shadow-md",
        ],
        // Enhanced error with better feedback
        error: [
          "border-destructive shadow-sm",
          "hover:border-destructive/80 hover:shadow-sm",
          "focus-visible:ring-destructive/20 focus-visible:border-destructive",
          "focus-visible:shadow-md",
        ],
        // Enhanced success with better feedback
        success: [
          "border-success-500 shadow-sm",
          "hover:border-success-600 hover:shadow-sm",
          "focus-visible:ring-success-500/20 focus-visible:border-success-500",
          "focus-visible:shadow-md",
        ],
        // Subtle variant for less prominent inputs
        subtle: [
          "border-border bg-muted/50",
          "hover:border-border hover:bg-muted/80",
          "focus-visible:ring-ring/10 focus-visible:border-ring",
          "focus-visible:bg-background",
        ],
      },
      inputSize: {
        // Improved spacing for consistency
        sm: "h-8 px-2.5 text-xs",
        default: "h-10 px-3 text-sm",
        lg: "h-11 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  },
);

export interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  error?: boolean;
  success?: boolean;
  helperText?: string;
  label?: string;
}

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      error,
      success,
      helperText,
      label,
      id,
      variant,
      inputSize,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const helperTextId = helperText ? `${inputId}-helper` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    // Determine variant based on state
    const inputVariant = error
      ? "error"
      : success
        ? "success"
        : variant || "default";

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
            inputVariants({ variant: inputVariant, inputSize, className }),
          )}
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
              error && "text-destructive",
              success && "text-success",
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
InputComponent.displayName = "Input";

// Memoize Input for performance optimization
const Input = React.memo(InputComponent) as typeof InputComponent;

export { Input, inputVariants };
