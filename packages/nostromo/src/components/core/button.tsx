import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { memo } from "../../lib/memo";

const buttonVariants = cva(
  // Base styles with improved spacing and transitions
  // `aria-disabled:` alongside `disabled:` because `asChild` renders whatever the
  // caller passed - an anchor, usually - and `:disabled` matches only real form
  // controls. Without it a disabled link looked entirely enabled.
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:opacity-50 aria-disabled:cursor-not-allowed",
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

    /**
     * Stops a disabled `asChild` button from doing anything.
     *
     * `disabled` is a form-control attribute. Put it on an anchor - which is what
     * `asChild` usually renders - and the browser ignores it, so
     * `<Button asChild disabled><a href="/checkout">` navigated, ran the caller's
     * onClick, and ran the anchor's own onClick. `aria-disabled` announced a
     * disabled state that nothing implemented.
     *
     * The guards are *capture* handlers, and the phase is the whole point. Radix
     * Slot merges its props with the child's by calling the child's handler
     * first, with no check for `defaultPrevented` - measured, not assumed:
     *
     *     child capture -> parent capture -> child onClick -> parent onClick
     *
     * So a bubble-phase handler here would run last, after both onClicks had
     * already fired. From the capture phase, `stopPropagation` reaches the bubble
     * phase before either of them does, and `preventDefault` cancels the
     * navigation.
     *
     * The one thing it cannot intercept is a capture handler on the child itself,
     * which runs before this one. That is rare enough to document rather than
     * design around.
     */
    const blockActivation = (event: React.SyntheticEvent) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const disabledGuards =
      asChild && isDisabled
        ? {
            onClickCapture: blockActivation,
            onKeyDownCapture: (event: React.KeyboardEvent) => {
              // The two keys that activate a link or a button.
              if (event.key === "Enter" || event.key === " ") {
                blockActivation(event);
              }
            },
          }
        : {};

    /**
     * `disabled` goes on elements that have it.
     *
     * On an anchor React renders a literal `disabled=""` that means nothing and
     * does nothing. A slotted `<button>` is a different matter, and still gets
     * the real thing.
     */
    const NATIVE_DISABLEABLE = [
      "button",
      "input",
      "select",
      "textarea",
      "fieldset",
      "optgroup",
      "option",
    ];
    const slottedIsNativeControl =
      React.isValidElement(children) &&
      typeof children.type === "string" &&
      NATIVE_DISABLEABLE.includes(children.type);
    const passNativeDisabled = !asChild || slottedIsNativeControl;

    // Determine final state: loading prop takes precedence over state prop
    const finalState = loading ? "loading" : state;

    const label = loading && loadingText ? loadingText : children;
    // With `asChild` the caller's element is what actually renders, so
    // loadingText has to replace the content *inside* it - swapping the element
    // itself for a string would leave Slot with nothing to clone.
    const slotted =
      asChild && label !== children && React.isValidElement(children)
        ? React.cloneElement(children, undefined, label)
        : label;

    return (
      <Component
        className={cn(
          buttonVariants({ variant, size, state: finalState, className }),
        )}
        ref={ref}
        {...(passNativeDisabled ? { disabled: isDisabled } : {})}
        aria-disabled={isDisabled}
        {...props}
        // After the spread: a caller's own capture handler does not get to
        // re-enable a disabled button.
        {...disabledGuards}
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
        {/* Slottable marks the target element for `asChild`, so the spinner can
            sit alongside it. Without it, Slot sees more than one child (the
            falsy spinner expression counts too) and throws Children.only. */}
        <Slottable>{slotted}</Slottable>
      </Component>
    );
  },
);
ButtonComponent.displayName = "Button";

// Memoize Button for performance optimization
const Button = memo(ButtonComponent) as typeof ButtonComponent;

export { Button, buttonVariants };
