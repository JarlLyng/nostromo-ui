import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const dialogVariants = cva(
  "fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background shadow-lg duration-300 transition-all",
  {
    variants: {
      variant: {
        default: "border-border shadow-lg hover:shadow-xl",
        elevated: "border-border shadow-xl hover:shadow-2xl",
        outlined:
          "border-2 border-border shadow-md hover:border-primary hover:shadow-lg",
        filled: "border-border bg-muted shadow-md hover:shadow-lg",
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
  },
);

const backdropVariants = cva("fixed inset-0 z-40 transition-all duration-300", {
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
});

export interface DialogProps {
  open?: boolean;
  /** Uncontrolled initial state, for when a DialogTrigger owns the opening. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  backdropVariant?: VariantProps<typeof backdropVariants>["variant"];
}

export interface DialogContentProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dialogVariants> {
  onClose?: () => void;
  /**
   * Draw the corner close button.
   *
   * Defaults to true. Turn it off when the content owns its own top edge - the
   * button is absolutely positioned at the top right, so over a search field or
   * a toolbar it lands on top of the content. `CommandDialog` is the case that
   * needed it. Escape and the backdrop still close the dialog either way.
   */
  showCloseButton?: boolean;
}

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  /**
   * Ties `DialogContent`'s `aria-labelledby` to whatever `DialogTitle` renders.
   * Adding `role="dialog"` without this fails axe's aria-dialog-name rule - the
   * role only means something to a screen reader if the node has a name.
   */
  titleId: string;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

function useDialogContext(component: string): DialogContextValue {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error(`${component} must be used inside <Dialog>`);
  }
  return context;
}

/**
 * Dialog root.
 *
 * Renders its children whether or not it is open, and puts the open state on
 * context. It used to return `null` while closed and draw the overlay itself,
 * which made `DialogTrigger` impossible: a trigger nested in the dialog was
 * unmounted exactly when you needed to click it. The overlay moved to
 * `DialogContent`, which is what actually knows it is being shown.
 *
 * Works controlled (`open` + `onOpenChange`) or uncontrolled (`defaultOpen`).
 */
const Dialog: React.FC<DialogProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
  backdropVariant = "default",
}) => {
  const titleId = React.useId();
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  React.useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [open, setOpen]);

  const context = React.useMemo(
    () => ({ open, setOpen, titleId }),
    [open, setOpen, titleId],
  );

  return (
    <DialogContext.Provider value={context}>
      {children}
      {open && (
        <div
          className={cn(backdropVariants({ variant: backdropVariant }))}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </DialogContext.Provider>
  );
};

export interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render the child element instead of a button, forwarding the click. */
  asChild?: boolean;
}

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ asChild, children, onClick, ...props }, ref) => {
    const { open, setOpen } = useDialogContext("DialogTrigger");

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (!event.defaultPrevented) setOpen(true);
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(
        children as React.ReactElement<{
          onClick?: React.MouseEventHandler;
          "aria-expanded"?: boolean;
        }>,
        { onClick: handleClick, "aria-expanded": open },
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  },
);

DialogTrigger.displayName = "DialogTrigger";

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  (
    {
      className,
      children,
      onClose,
      variant,
      size,
      animation,
      showCloseButton = true,
      ...props
    },
    ref,
  ) => {
    const { open, setOpen, titleId } = useDialogContext("DialogContent");

    if (!open) return null;

    // A caller-supplied name wins; otherwise point at the DialogTitle.
    const hasOwnLabel =
      props["aria-label"] !== undefined ||
      props["aria-labelledby"] !== undefined;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby={hasOwnLabel ? undefined : titleId}
          className={cn(
            dialogVariants({ variant, size, animation }),
            "pointer-events-auto p-4 sm:p-6 sm:rounded-lg",
            className,
          )}
          {...props}
        >
          {children}
          {showCloseButton && (
            <button
              type="button"
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
              onClick={onClose ?? (() => setOpen(false))}
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
          )}
        </div>
      </div>
    );
  },
);
DialogContent.displayName = "DialogContent";

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className,
      )}
      {...props}
    />
  ),
);
DialogHeader.displayName = "DialogHeader";

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, id, ...props }, ref) => {
    const { titleId } = useDialogContext("DialogTitle");

    return (
      <h2
        ref={ref}
        // Falls back to the shared id so DialogContent's aria-labelledby resolves.
        id={id ?? titleId}
        className={cn(
          "text-lg font-semibold leading-none tracking-tight",
          className,
        )}
        {...props}
      />
    );
  },
);
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  dialogVariants,
  backdropVariants,
};
