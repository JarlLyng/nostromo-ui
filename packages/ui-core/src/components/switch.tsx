import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const switchVariants = cva(
  "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-brand-500 data-[state=unchecked]:bg-neutral-200",
  {
    variants: {
      variant: {
        default:
          "data-[state=checked]:bg-brand-500 data-[state=unchecked]:bg-neutral-200 focus-visible:ring-brand-500",
        error:
          "data-[state=checked]:bg-error-500 data-[state=unchecked]:bg-error-100 focus-visible:ring-error-500",
        success:
          "data-[state=checked]:bg-success-500 data-[state=unchecked]:bg-success-100 focus-visible:ring-success-500",
      },
      size: {
        sm: "h-4 w-7",
        default: "h-6 w-11",
        lg: "h-8 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const switchThumbVariants = cva(
  "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
  {
    variants: {
      size: {
        sm: "h-3 w-3 data-[state=checked]:translate-x-3",
        default: "h-5 w-5 data-[state=checked]:translate-x-5",
        lg: "h-7 w-7 data-[state=checked]:translate-x-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {
  label?: string;
  helperText?: string;
  error?: boolean;
  required?: boolean;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(
  (
    {
      className,
      children: _children,
      label,
      helperText,
      error,
      required,
      variant,
      size,
      id,
      ...props
    },
    ref
  ) => {
    const switchId = id || React.useId();
    const helperTextId = helperText ? `${switchId}-helper` : undefined;
    const errorId = error ? `${switchId}-error` : undefined;

    const switchVariant = error ? "error" : variant || "default";

    return (
      <div className="flex items-center space-x-2">
        <SwitchPrimitive.Root
          ref={ref}
          id={switchId}
          className={cn(switchVariants({ variant: switchVariant, size }), className)}
          aria-describedby={cn(helperTextId, errorId) || undefined}
          aria-invalid={error}
          aria-required={required}
          {...props}
        >
          <SwitchPrimitive.Thumb
            className={cn(switchThumbVariants({ size }))}
          />
        </SwitchPrimitive.Root>
        <div className="grid gap-1.5 leading-none">
          {label && (
            <label
              htmlFor={switchId}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
              {required && <span className="text-error-500 ml-1">*</span>}
            </label>
          )}
          {helperText && (
            <p
              id={helperTextId}
              className={cn(
                "text-sm text-muted-foreground",
                error && "text-error-500"
              )}
            >
              {helperText}
            </p>
          )}
        </div>
      </div>
    );
  }
);
Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch, switchVariants, switchThumbVariants };
