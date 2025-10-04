import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  // Base - forbedret med bedre spacing og transitions
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Forbedret default med bedre depth
        default: [
          "bg-brand-500 text-white shadow-md hover:bg-brand-600 hover:shadow-lg",
          "active:scale-[0.98] active:shadow-sm",
          "border border-brand-400/20"
        ],
        // Forbedret secondary med bedre kontrast
        secondary: [
          "bg-neutral-100 text-neutral-900 border border-neutral-200",
          "hover:bg-neutral-200 hover:border-neutral-300 hover:shadow-sm",
          "active:scale-[0.98]"
        ],
        // Forbedret outline med bedre focus
        outline: [
          "border-2 border-neutral-300 bg-transparent text-neutral-900",
          "hover:bg-neutral-50 hover:border-brand-500 hover:text-brand-600",
          "focus-visible:ring-brand-500/20 focus-visible:border-brand-500",
          "active:scale-[0.98]"
        ],
        // Forbedret ghost med bedre hover
        ghost: [
          "text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900",
          "active:bg-neutral-200 active:scale-[0.98]"
        ],
        // Forbedret destructive med bedre feedback
        destructive: [
          "bg-error-500 text-white shadow-md hover:bg-error-600 hover:shadow-lg",
          "active:scale-[0.98] active:shadow-sm",
          "border border-error-400/20"
        ],
        // Ny: Subtle variant for mindre vigtige actions
        subtle: [
          "bg-neutral-50 text-neutral-700 border border-neutral-200",
          "hover:bg-neutral-100 hover:border-neutral-300",
          "active:scale-[0.98]"
        ],
        // Behold link variant
        link: "text-brand-500 underline-offset-4 hover:underline",
      },
      size: {
        // Forbedret spacing - mere konsistent
        sm: "h-8 px-3 text-xs rounded-sm",
        default: "h-10 px-4 text-sm rounded-md", 
        lg: "h-11 px-6 text-base rounded-lg",
        xl: "h-12 px-8 text-lg rounded-lg",
        icon: "h-10 w-10 rounded-md"
      },
      // Ny: State variants for bedre feedback
      state: {
        default: "",
        loading: "cursor-wait",
        success: "bg-success-500 hover:bg-success-600 text-white",
        error: "bg-error-500 hover:bg-error-600 text-white"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Whether the button is in a loading state
   * @default false
   */
  loading?: boolean;
  /**
   * The loading text to display when loading is true
   * @default undefined
   */
  loadingText?: string;
  /**
   * The visual state of the button
   * @default "default"
   */
  state?: "default" | "loading" | "success" | "error";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    state = "default",
    loading = false, 
    loadingText,
    children, 
    disabled, 
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading;
    
    // Determine final state based on loading prop
    const finalState = loading ? "loading" : state;
    
    return (
      <button
        className={cn(buttonVariants({ variant, size, state: finalState, className }))}
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
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
