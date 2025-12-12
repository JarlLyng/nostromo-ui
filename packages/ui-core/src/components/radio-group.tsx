import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const radioGroupVariants = cva(
  "grid gap-2",
  {
    variants: {
      orientation: {
        vertical: "grid-cols-1",
        horizontal: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
);

const radioItemVariants = cva(
  "peer h-4 w-4 shrink-0 rounded-full border border-border shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-border hover:border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary",
        error: "border-destructive focus-visible:ring-destructive data-[state=checked]:bg-destructive data-[state=checked]:border-destructive",
        success: "border-success-500 focus-visible:ring-success-500 data-[state=checked]:bg-success-500 data-[state=checked]:border-success-500",
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
  }
);

export interface RadioGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof radioGroupVariants> {
  /**
   * Whether the radio group is in an error state
   * @default false
   */
  error?: boolean;
  /**
   * Helper text to display below the radio group
   */
  helperText?: string;
  /**
   * Label text for the radio group
   */
  label?: string;
  /**
   * Whether the radio group is required
   * @default false
   */
  required?: boolean;
  /**
   * The name attribute for all radio buttons in the group
   */
  name?: string;
  /**
   * The default value of the radio group
   */
  defaultValue?: string;
  /**
   * The controlled value of the radio group
   */
  value?: string;
  /**
   * Callback fired when the value changes
   */
  onValueChange?: (value: string) => void;
  /**
   * Whether the radio group is disabled
   * @default false
   */
  disabled?: boolean;
}

export interface RadioItemProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof radioItemVariants> {
  /**
   * The value of the radio item
   */
  value: string;
  /**
   * The label for the radio item
   */
  label?: string;
  /**
   * Whether the radio item is disabled
   * @default false
   */
  disabled?: boolean;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ 
    className, 
    error, 
    helperText, 
    label, 
    required, 
    orientation,
    name,
    defaultValue,
    value,
    onValueChange,
    disabled,
    children,
    ...props 
  }, ref) => {
    const radioGroupId = React.useId();
    const labelId = label ? `${radioGroupId}-label` : undefined;
    const helperTextId = helperText ? `${radioGroupId}-helper` : undefined;
    const errorId = error ? `${radioGroupId}-error` : undefined;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onValueChange) {
        onValueChange(event.target.value);
      }
    };

    return (
      <div className="space-y-2">
        {label && (
          <label 
            id={labelId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}
        <div
          ref={ref}
          className={cn(radioGroupVariants({ orientation, className }))}
          role="radiogroup"
          aria-labelledby={labelId}
          aria-describedby={cn(
            helperTextId,
            errorId
          ) || undefined}
          aria-invalid={error}
          {...props}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement<RadioItemProps>(child)) {
              // Use controlled mode if value is provided, otherwise use uncontrolled
              const isControlled = value !== undefined;
              
              const childProps: Partial<RadioItemProps> = {
                name,
                disabled: Boolean(disabled ?? child.props.disabled),
                variant: error ? "error" : child.props.variant,
                ...(isControlled 
                  ? { checked: value === child.props.value }
                  : { defaultChecked: defaultValue === child.props.value }
                ),
                onChange: handleChange,
              };
              
              return React.cloneElement(child, childProps);
            }
            return child;
          })}
        </div>
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
RadioGroup.displayName = "RadioGroup";

const RadioItem = React.forwardRef<HTMLInputElement, RadioItemProps>(
  ({ 
    className, 
    variant, 
    size: radioSize, 
    value,
    label,
    disabled,
    id,
    onChange,
    ...props 
  }, ref) => {
    const radioId = id || React.useId();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }
    };

    return (
      <div className="flex items-center space-x-2">
        <input
          type="radio"
          className={cn(radioItemVariants({ variant, size: radioSize, className }))}
          ref={ref}
          id={radioId}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          {...props}
        />
        {label && (
          <label
            htmlFor={radioId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
RadioItem.displayName = "RadioItem";

export { RadioGroup, RadioItem, radioGroupVariants, radioItemVariants };
