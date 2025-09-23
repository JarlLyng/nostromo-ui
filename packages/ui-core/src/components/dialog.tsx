import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const dialogVariants = cva(
  "fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background shadow-lg duration-300 transition-all",
  {
    variants: {
      variant: {
        default: "border-neutral-200 shadow-lg hover:shadow-xl",
        elevated: "border-neutral-200 shadow-xl hover:shadow-2xl",
        outlined: "border-2 border-neutral-300 shadow-md hover:border-brand-500 hover:shadow-lg",
        filled: "border-neutral-100 bg-neutral-50 shadow-md hover:shadow-lg",
        destructive: "border-error-200 bg-error-50 shadow-lg hover:shadow-xl",
      },
      size: {
        default: "max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl",
        sm: "max-w-sm sm:max-w-md",
        lg: "max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl",
        xl: "max-w-4xl sm:max-w-5xl md:max-w-6xl lg:max-w-7xl",
        full: "max-w-[95vw] sm:max-w-[90vw]",
      },
      animation: {
        default: "animate-in fade-in-0 zoom-in-95 duration-300",
        slide: "animate-in slide-in-from-bottom-4 duration-300",
        scale: "animate-in zoom-in-95 duration-300",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "default",
    },
  }
);

const backdropVariants = cva(
  "fixed inset-0 z-40 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-black/50 backdrop-blur-sm",
        subtle: "bg-black/30 backdrop-blur-none",
        strong: "bg-black/70 backdrop-blur-md",
        colored: "bg-brand-500/20 backdrop-blur-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  backdropVariant?: VariantProps<typeof backdropVariants>['variant'];
}

export interface DialogContentProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dialogVariants> {
  onClose?: () => void;
}

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children, backdropVariant = "default" }) => {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange?.(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={cn(backdropVariants({ variant: backdropVariant }))}
        onClick={() => onOpenChange?.(false)}
      />
      <div className="relative z-50 w-full">
        {children}
      </div>
    </div>
  );
};

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, onClose, variant, size, animation, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        dialogVariants({ variant, size, animation }),
        "p-4 sm:p-6 sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <button
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        onClick={onClose}
      >
        <span className="sr-only">Close</span>
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  )
);
DialogContent.displayName = "DialogContent";

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className
      )}
      {...props}
    />
  )
);
DialogHeader.displayName = "DialogHeader";

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  )
);
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);
DialogDescription.displayName = "DialogDescription";

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, dialogVariants, backdropVariants };
