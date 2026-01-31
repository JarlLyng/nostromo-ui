import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const checkboxVariants = cva(
  "peer h-4 w-4 shrink-0 rounded-sm border border-border shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "border-border hover:border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary",
        error:
          "border-destructive focus-visible:ring-destructive data-[state=checked]:bg-destructive data-[state=checked]:border-destructive",
        success:
          "border-success-500 focus-visible:ring-success-500 data-[state=checked]:bg-success-500 data-[state=checked]:border-success-500",
      },
      size: {
        default: "h-4 w-4",
        sm: "h-3 w-3",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface CheckboxProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof checkboxVariants> {
  /**
   * Whether the checkbox is in an error state
   * @default false
   */
  error?: boolean;
  /**
   * Helper text to display below the checkbox
   */
  helperText?: string;
  /**
   * Label text for the checkbox
   */
  label?: string;
  /**
   * Whether the checkbox is required
   * @default false
   */
  required?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      error,
      helperText,
      label,
      required,
      id,
      variant,
      size,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;
    const helperTextId = helperText ? `${checkboxId}-helper` : undefined;
    const errorId = error ? `${checkboxId}-error` : undefined;

    // Determine variant based on error state
    const checkboxVariant = error ? "error" : variant || "default";

    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            className={cn(
              checkboxVariants({ variant: checkboxVariant, size, className }),
            )}
            ref={ref}
            id={checkboxId}
            aria-describedby={cn(helperTextId, errorId) || undefined}
            aria-invalid={error}
            required={required}
            {...props}
          />
          {label && (
            <label
              htmlFor={checkboxId}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
              {required && <span className="text-error-500 ml-1">*</span>}
            </label>
          )}
        </div>
        {helperText && (
          <p
            id={helperTextId}
            className={cn(
              "text-sm text-muted-foreground",
              error && "text-destructive",
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";

export { Checkbox, checkboxVariants };
