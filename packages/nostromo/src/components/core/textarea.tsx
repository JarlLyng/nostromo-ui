import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "border-border focus-visible:ring-ring focus-visible:ring-offset-background",
        error:
          "border-destructive focus-visible:ring-destructive focus-visible:ring-offset-background",
        success:
          "border-success focus-visible:ring-success focus-visible:ring-offset-background",
      },
      size: {
        sm: "min-h-[60px] px-2 py-1 text-xs",
        default: "min-h-[80px] px-3 py-2 text-sm",
        lg: "min-h-[120px] px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  helperText?: string;
  error?: boolean;
  required?: boolean;
  autoResize?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      required,
      variant,
      size,
      autoResize = true,
      id,
      ...props
    },
    ref
  ) => {
    const textareaId = id || React.useId();
    const helperTextId = helperText ? `${textareaId}-helper` : undefined;
    const errorId = error ? `${textareaId}-error` : undefined;

    const textareaVariant = error ? "error" : variant || "default";

    // Auto-resize functionality
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const combinedRef = React.useMemo(() => {
      if (typeof ref === "function") {
        return (node: HTMLTextAreaElement | null) => {
          textareaRef.current = node;
          ref(node);
        };
      } else if (ref) {
        return (node: HTMLTextAreaElement | null) => {
          textareaRef.current = node;
          ref.current = node;
        };
      }
      return (node: HTMLTextAreaElement | null) => {
        textareaRef.current = node;
      };
    }, [ref]);

    const adjustHeight = React.useCallback(() => {
      if (textareaRef.current && autoResize) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [autoResize]);

    React.useEffect(() => {
      adjustHeight();
    }, [adjustHeight]);

    const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
      adjustHeight();
      if (props.onInput) {
        props.onInput(event);
      }
    };

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={combinedRef}
          id={textareaId}
          className={cn(
            textareaVariants({ variant: textareaVariant, size }),
            autoResize && "resize-none",
            className
          )}
          aria-describedby={cn(helperTextId, errorId) || undefined}
          aria-invalid={error}
          aria-required={required}
          onInput={handleInput}
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
Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
