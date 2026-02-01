import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  // Base styles with improved spacing and transitions
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Enhanced default with better depth
        default: [
          "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg",
          "active:scale-[0.98] active:shadow-sm",
          "border border-primary/20",
        ],
        // Enhanced secondary with better contrast
        secondary: [
          "bg-secondary text-secondary-foreground border border-border",
          "hover:bg-secondary/80 hover:border-border hover:shadow-sm",
          "active:scale-[0.98]",
        ],
        // Enhanced outline with better focus
        outline: [
          "border-2 border-border bg-transparent text-foreground",
          "hover:bg-muted hover:border-primary hover:text-primary",
          "focus-visible:ring-ring/20 focus-visible:border-primary",
          "active:scale-[0.98]",
        ],
        // Enhanced ghost with better hover
        ghost: [
          "text-foreground hover:bg-muted hover:text-foreground",
          "active:bg-muted/80 active:scale-[0.98]",
        ],
        // Enhanced destructive with better feedback
        destructive: [
          "bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90 hover:shadow-lg",
          "active:scale-[0.98] active:shadow-sm",
          "border border-destructive/20",
        ],
        // Subtle variant for less prominent actions
        subtle: [
          "bg-muted text-muted-foreground border border-border",
          "hover:bg-muted/80 hover:border-border",
          "active:scale-[0.98]",
        ],
        // Link variant
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // Improved spacing for consistency
        sm: "h-8 px-3 text-xs rounded-sm",
        default: "h-10 px-4 text-sm rounded-md",
        lg: "h-11 px-6 text-base rounded-lg",
        xl: "h-12 px-8 text-lg rounded-lg",
        icon: "h-10 w-10 rounded-md",
      },
      // State variants for better feedback
      state: {
        default: "",
        loading: "cursor-wait",
        success: "bg-success hover:bg-success-600 text-success-foreground",
        error:
          "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Whether to render the button as a separate component (e.g. for Link)
   * @default false
   */
  asChild?: boolean;
  /**
   * Whether the button is in a loading state.
   * When true, automatically sets state to "loading" and shows a spinner.
   * @default false
   */
  loading?: boolean;
  /**
   * The loading text to display when loading is true.
   * If not provided, the button's children will be shown.
   * @default undefined
   */
  loadingText?: string;
  /**
   * The visual state of the button.
   * Note: If `loading` is true, this prop is ignored and state becomes "loading".
   * Use `state="success"` or `state="error"` for post-action feedback.
   * @default "default"
   */
  state?: "default" | "loading" | "success" | "error";
}

const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      state = "default",
      loading = false,
      loadingText,
      asChild = false,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    // Determine final state: loading prop takes precedence over state prop
    const finalState = loading ? "loading" : state;

    return (
      <Component
        className={cn(
          buttonVariants({ variant, size, state: finalState, className }),
        )}
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
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
        {loading && loadingText ? loadingText : children}
      </Component>
    );
  },
);
ButtonComponent.displayName = "Button";

// Memoize Button for performance optimization
const Button = React.memo(ButtonComponent) as typeof ButtonComponent;

export { Button, buttonVariants };
