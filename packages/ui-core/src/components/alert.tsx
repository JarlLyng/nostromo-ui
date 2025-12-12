import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { X, CheckCircle, Warning, Info, XCircle } from "phosphor-react";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        success:
          "bg-success-50 text-success-900 border-success-200 [&>svg]:text-success-600",
        warning:
          "bg-warning-50 text-warning-900 border-warning-200 [&>svg]:text-warning-600",
        error:
          "bg-error-50 text-error-900 border-error-200 [&>svg]:text-error-600",
        info:
          "bg-info-50 text-info-900 border-info-200 [&>svg]:text-info-600",
      },
      size: {
        sm: "p-3 text-sm [&>svg]:h-4 [&>svg]:w-4",
        default: "p-4 text-sm [&>svg]:h-5 [&>svg]:w-5",
        lg: "p-6 text-base [&>svg]:h-6 [&>svg]:w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const alertTitleVariants = cva("mb-1 font-medium leading-none tracking-tight");

const alertDescriptionVariants = cva("text-sm [&_p]:leading-relaxed");

const alertCloseVariants = cva(
  "absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
  {
    variants: {
      size: {
        sm: "h-6 w-6",
        default: "h-7 w-7",
        lg: "h-8 w-8",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  description?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant,
      size,
      title,
      description,
      dismissible = false,
      onDismiss,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);

    const handleDismiss = React.useCallback(() => {
      setIsVisible(false);
      if (onDismiss) {
        onDismiss();
      }
    }, [onDismiss]);

    const getDefaultIcon = () => {
      switch (variant) {
        case "success":
          return <CheckCircle className="h-5 w-5" />;
        case "warning":
          return <Warning className="h-5 w-5" />;
        case "error":
          return <XCircle className="h-5 w-5" />;
        case "info":
          return <Info className="h-5 w-5" />;
        default:
          return null;
      }
    };

    if (!isVisible) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, size }), className)}
        {...props}
      >
        {icon !== null && (icon || getDefaultIcon())}
        {dismissible && (
          <button
            type="button"
            className={cn(alertCloseVariants({ size }))}
            onClick={handleDismiss}
            aria-label="Dismiss alert"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {title && (
          <div className={cn(alertTitleVariants())}>
            {title}
          </div>
        )}
        {description && (
          <div className={cn(alertDescriptionVariants())}>
            {description}
          </div>
        )}
        {children}
      </div>
    );
  }
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(alertTitleVariants(), className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(alertDescriptionVariants(), className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { 
  Alert, 
  AlertTitle, 
  AlertDescription, 
  alertVariants, 
  alertTitleVariants, 
  alertDescriptionVariants,
  alertCloseVariants 
};
