import React, { useState, useEffect, useCallback, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { memo } from "../../lib/memo";

/**
 * Notifications, and the provider that owns them.
 *
 * Three things about this component are worth reading before changing it.
 *
 * ## The viewport positions, the toast does not
 *
 * A `ToastProvider` renders one `ToastViewport` per position: a fixed, bounded
 * column that stacks its children in normal flex flow with a gap. The toasts
 * inside it are ordinary block elements.
 *
 * Every toast used to position itself instead, with `fixed right-4` plus `w-full`
 * and a `translateY(index * 8px)` for stacking. Both halves were wrong. `w-full`
 * against a fixed right offset made a 1200px-wide box starting at x=-16, so the
 * notification ran off the left edge of the window; and 8px of offset for a box
 * about 94px tall meant the second notification covered nearly all of the first.
 *
 * A standalone `<Toast position="top-right">` still positions itself, because
 * that is a supported way to use it. `ToastViewportContext` is how a toast knows
 * which of the two it is in.
 *
 * ## One dismissal path
 *
 * Closing a toast used to leave it in the provider's `toasts` array forever: the
 * component unmounted itself and nothing told the provider. A persistent toast
 * dismissed ten times left ten invisible entries behind.
 *
 * Now every route - the close button, the timeout, `dismiss(id)`, `clear()` -
 * goes through the same two steps. `removeToast` marks the toast as dismissing,
 * which starts its exit animation; when the animation ends the toast reports back
 * and the provider drops it from state. `onClose` fires exactly once, guarded by
 * a ref, whichever route was taken.
 *
 * There is also exactly one timer per toast. Inside a viewport the provider owns
 * it; standalone, the toast owns its own. Previously both ran, and the provider's
 * could remove a toast before its own exit finished.
 *
 * ## Announcement is the default, not an opt-in
 *
 * A toast carries `role="status"` and `aria-live="polite"`, or `role="alert"` and
 * `aria-live="assertive"` for the error variant, so a message that appears
 * without warning is announced without the caller arranging anything. It is also
 * `aria-atomic`, so the title and description are read as one message rather than
 * as two arrivals. Pass `role` or `aria-live` to override either.
 *
 * Focus is deliberately not moved. A notification that steals focus interrupts
 * whatever the reader was doing, which is worse than the problem it solves; the
 * close button and any action stay reachable by Tab.
 */

// Toast variants
const toastVariants = cva(
  "relative flex items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all duration-300",
  {
    variants: {
      variant: {
        default:
          "border-border bg-card text-card-foreground shadow-lg hover:shadow-xl",
        success:
          "border-success-200 bg-success-50 text-success-900 shadow-lg hover:shadow-xl",
        error:
          "border-destructive/20 bg-destructive/10 text-destructive shadow-lg hover:shadow-xl",
        warning:
          "border-warning-200 bg-warning-50 text-warning-900 shadow-lg hover:shadow-xl",
        info: "border-info-200 bg-info-50 text-info-900 shadow-lg hover:shadow-xl",
      },
      // Only applied when the toast is positioning itself. Inside a viewport the
      // column owns the position and the toast just fills its width.
      //
      // The width bound is the fix for the clipping: `w-full` next to a fixed
      // right offset is a full-viewport box pushed 16px off the left edge.
      position: {
        "top-left": "fixed top-4 left-4 z-50 w-[calc(100vw-2rem)] max-w-sm",
        "top-center":
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100vw-2rem)] max-w-sm",
        "top-right": "fixed top-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm",
        "bottom-left":
          "fixed bottom-4 left-4 z-50 w-[calc(100vw-2rem)] max-w-sm",
        "bottom-center":
          "fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100vw-2rem)] max-w-sm",
        "bottom-right":
          "fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm",
      },
      animation: {
        default: "animate-in slide-in-from-right-full duration-300",
        slide: "animate-in slide-in-from-bottom-4 duration-300",
        fade: "animate-in fade-in-0 duration-300",
        scale: "animate-in zoom-in-95 duration-300",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "top-right",
      animation: "default",
    },
  },
);

const toastIconVariants = cva(
  "flex-shrink-0 w-5 h-5 transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "text-muted-foreground",
        success: "text-success-600",
        error: "text-destructive",
        warning: "text-warning-600",
        info: "text-info-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

// Types
export interface ToastProps
  extends
    VariantProps<typeof toastVariants>,
    React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  title?: string;
  description?: string;
  duration?: number;
  onClose?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  children?: React.ReactNode;
  appearDelay?: number; // time in ms before first render becomes visible; default 10
  animationMs?: number; // exit animation duration; default 150
  /**
   * Internal. Set by the viewport to start the exit animation, so that a
   * programmatic `dismiss(id)` animates out like a click on the close button
   * rather than vanishing.
   */
  dismissing?: boolean;
  /** Internal. Told to the provider when the exit animation has finished. */
  onExited?: () => void;
}

export interface ToastContextType {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, "id">) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

// Toast Context
const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined,
);

/**
 * True inside a `ToastViewport`.
 *
 * A contained toast does not position itself and does not run its own
 * auto-dismiss timer, because the viewport does the first and the provider does
 * the second. Both used to happen twice.
 */
const ToastViewportContext = React.createContext(false);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

/**
 * Ids are a counter, not `Math.random()`.
 *
 * Random ids differ between a server render and the client that hydrates it,
 * which is a hydration mismatch waiting for the first server-rendered toast. A
 * counter is stable for a given sequence of calls, and these ids are only ever
 * used to address a toast within one provider.
 */
let toastSequence = 0;
const nextToastId = () => `toast-${++toastSequence}`;

// Toast Provider
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  // Toasts whose exit animation is running. They are still in `toasts` - and so
  // still rendered - until the animation reports back.
  const [dismissing, setDismissing] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const timeoutRefs = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  const clearTimer = useCallback((id: string) => {
    const timeoutId = timeoutRefs.current.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutRefs.current.delete(id);
    }
  }, []);

  /** Starts the exit. The toast leaves the array in `finalize`, not here. */
  const removeToast = useCallback(
    (id: string) => {
      clearTimer(id);
      setDismissing((prev) => {
        if (prev.has(id)) return prev;
        const next = new Set(prev);
        next.add(id);
        return next;
      });
    },
    [clearTimer],
  );

  /** The exit has finished: drop it. */
  const finalize = useCallback(
    (id: string) => {
      clearTimer(id);
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
      setDismissing((prev) => {
        if (!prev.has(id)) return prev;
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    },
    [clearTimer],
  );

  const removeToastRef = useRef(removeToast);
  useEffect(() => {
    removeToastRef.current = removeToast;
  }, [removeToast]);

  const addToast = useCallback((toast: Omit<ToastProps, "id">) => {
    const id = nextToastId();
    const newToast = { ...toast, id };

    setToasts((prev) => [...prev, newToast]);

    // The provider owns the timer for a toast it renders, and it starts the same
    // exit a click on the close button would. The toast's own timer is disabled
    // inside a viewport, so this is the only one.
    if (toast.duration !== 0) {
      const timeoutId = setTimeout(() => {
        removeToastRef.current(id);
      }, toast.duration || 5000);
      timeoutRefs.current.set(id, timeoutId);
    }

    return id;
  }, []);

  const clearToasts = useCallback(() => {
    timeoutRefs.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutRefs.current.clear();
    // Animate them all out rather than cutting to nothing, so `clear()` looks
    // like dismissing each one.
    setToasts((prev) => {
      setDismissing(new Set(prev.map((toast) => toast.id!)));
      return prev;
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    const refs = timeoutRefs.current;
    return () => {
      refs.forEach((timeoutId) => clearTimeout(timeoutId));
      refs.clear();
    };
  }, []);

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, clearToasts }}
    >
      {children}
      <ToastContainer
        toasts={toasts}
        dismissing={dismissing}
        onExited={finalize}
      />
    </ToastContext.Provider>
  );
};

const VIEWPORT_POSITIONS: Record<ToastPosition, string> = {
  // Bottom edges stack upwards, so the newest is nearest the edge and the older
  // ones move away from it. Reversing the column is what does that.
  "top-left": "top-4 left-4 flex-col",
  "top-center": "top-4 left-1/2 -translate-x-1/2 flex-col",
  "top-right": "top-4 right-4 flex-col",
  "bottom-left": "bottom-4 left-4 flex-col-reverse",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 flex-col-reverse",
  "bottom-right": "bottom-4 right-4 flex-col-reverse",
};

/**
 * One bounded column per position.
 *
 * `w-[calc(100vw-2rem)] max-w-sm` is the pair that keeps it on screen: full width
 * minus the 16px inset on each side, up to a readable maximum. The column is
 * `pointer-events-none` so it does not swallow clicks on the page underneath it,
 * and each toast turns pointer events back on for itself.
 */
const ToastViewport: React.FC<{
  position: ToastPosition;
  children: React.ReactNode;
}> = ({ position, children }) => (
  <ToastViewportContext.Provider value={true}>
    <ol
      data-toast-viewport={position}
      className={cn(
        "pointer-events-none fixed z-50 flex w-[calc(100vw-2rem)] max-w-sm gap-2 m-0 list-none p-0",
        VIEWPORT_POSITIONS[position],
      )}
    >
      {children}
    </ol>
  </ToastViewportContext.Provider>
);

// Toast Container
const ToastContainer: React.FC<{
  toasts: ToastProps[];
  dismissing: ReadonlySet<string>;
  onExited: (id: string) => void;
}> = ({ toasts, dismissing, onExited }) => {
  if (toasts.length === 0) return null;

  const toastsByPosition = toasts.reduce(
    (acc, toast) => {
      const position = (toast.position ?? "top-right") as ToastPosition;
      (acc[position] ??= []).push(toast);
      return acc;
    },
    {} as Record<ToastPosition, ToastProps[]>,
  );

  return (
    <>
      {(
        Object.entries(toastsByPosition) as [ToastPosition, ToastProps[]][]
      ).map(([position, positionToasts]) => (
        <ToastViewport key={position} position={position}>
          {positionToasts.map((toast) => (
            <li key={toast.id} className="contents">
              <Toast
                {...toast}
                dismissing={dismissing.has(toast.id!)}
                onExited={() => onExited(toast.id!)}
              />
            </li>
          ))}
        </ToastViewport>
      ))}
    </>
  );
};

// Individual Toast Component
const ToastComponent = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      id: _id,
      title,
      description,
      variant = "default",
      position = "top-right",
      animation = "default",
      duration = 5000,
      onClose,
      action,
      className,
      children,
      appearDelay = 10,
      animationMs = 150,
      dismissing = false,
      onExited,
      ...props
    },
    ref,
  ) => {
    const contained = React.useContext(ToastViewportContext);
    const [isVisible, setIsVisible] = useState(appearDelay <= 0);
    const [isLeaving, setIsLeaving] = useState(false);

    useEffect(() => {
      if (appearDelay <= 0) {
        return;
      }
      const timer = window.setTimeout(() => setIsVisible(true), appearDelay);
      return () => clearTimeout(timer);
    }, [appearDelay]);

    // `onClose` fires once, whichever route got here: the close button, the
    // timeout, `dismiss(id)` or `clear()`. Without the guard, a second click
    // during the exit animation fired it twice.
    const closedRef = useRef(false);
    const onCloseRef = useRef(onClose);
    const onExitedRef = useRef(onExited);
    useEffect(() => {
      onCloseRef.current = onClose;
      onExitedRef.current = onExited;
    }, [onClose, onExited]);

    const handleClose = useCallback(() => {
      if (closedRef.current) return;
      closedRef.current = true;
      setIsLeaving(true);
      window.setTimeout(() => {
        onCloseRef.current?.();
        setIsVisible(false);
        // The provider drops it from state here, after the animation, so the
        // array and the screen agree.
        onExitedRef.current?.();
      }, animationMs);
    }, [animationMs]);

    // Started from outside: `dismiss(id)`, `clear()`, or the provider's timeout.
    useEffect(() => {
      if (dismissing) handleClose();
    }, [dismissing, handleClose]);

    // Auto close after duration.
    //
    // Only when standalone. Inside a viewport the provider owns this timer, and
    // running both meant a toast could be removed from state while its own exit
    // was still going.
    useEffect(() => {
      if (contained) return undefined;
      if (duration > 0) {
        const timer = window.setTimeout(handleClose, duration);
        return () => clearTimeout(timer);
      }
      return undefined;
    }, [contained, duration, handleClose]);

    const getIcon = () => {
      switch (variant) {
        case "success":
          return (
            <svg
              className={toastIconVariants({ variant })}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          );
        case "error":
          return (
            <svg
              className={toastIconVariants({ variant })}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          );
        case "warning":
          return (
            <svg
              className={toastIconVariants({ variant })}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          );
        case "info":
          return (
            <svg
              className={toastIconVariants({ variant })}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          );
        default:
          return null;
      }
    };

    if (!isVisible) return null;

    // An error is the one variant a reader should be interrupted for. Everything
    // else waits for a pause. A caller who knows better can pass either.
    const isUrgent = variant === "error";
    const { style: callerStyle, ...restProps } = props;

    return (
      <div
        ref={ref}
        role={props.role ?? (isUrgent ? "alert" : "status")}
        aria-live={props["aria-live"] ?? (isUrgent ? "assertive" : "polite")}
        // Read the title and the description as one message rather than as two
        // separate arrivals.
        aria-atomic={props["aria-atomic"] ?? true}
        className={cn(
          toastVariants({
            variant,
            // Inside a viewport the column positions it; on its own it has to.
            position: contained ? null : position,
            animation,
          }),
          contained && "w-full",
          isLeaving ? "opacity-0" : "opacity-100",
          "pointer-events-auto",
          className,
        )}
        data-visible={isVisible ? "true" : "false"}
        data-leaving={isLeaving ? "true" : "false"}
        {...restProps}
        style={{
          transition: `all ${animationMs}ms ease-in-out`,
          ...callerStyle,
          // Last, so the exit is not silently overridden by a caller's transform.
          // It used to be first, and the container passed a transform on every
          // toast, so the exit animation never ran for a toast in a provider.
          transform: isLeaving
            ? "translateX(100%)"
            : (callerStyle?.transform ?? "translateX(0)"),
        }}
      >
        <div className="flex items-start space-x-3">
          {getIcon()}
          <div className="flex-1 min-w-0">
            {title && <div className="text-sm font-medium">{title}</div>}
            {description && (
              <div className="mt-1 text-sm opacity-90">{description}</div>
            )}
            {children}
          </div>
        </div>

        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className="ml-4 text-sm font-medium underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
          >
            {action.label}
          </button>
        )}

        <button
          type="button"
          onClick={handleClose}
          className="absolute top-2 right-2 p-1 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
          aria-label="Close notification"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    );
  },
);

ToastComponent.displayName = "Toast";

// Memoize Toast for performance optimization
export const Toast = memo(ToastComponent) as typeof ToastComponent;

// Toast Hook for easy usage
export const useToastNotification = () => {
  const { addToast, removeToast, clearToasts } = useToast();

  const toast = {
    success: (
      message: string,
      options?: Omit<ToastProps, "variant" | "title">,
    ) =>
      addToast({
        variant: "success",
        title: "Success",
        description: message,
        ...options,
      }),

    error: (message: string, options?: Omit<ToastProps, "variant" | "title">) =>
      addToast({
        variant: "error",
        title: "Error",
        description: message,
        ...options,
      }),

    warning: (
      message: string,
      options?: Omit<ToastProps, "variant" | "title">,
    ) =>
      addToast({
        variant: "warning",
        title: "Warning",
        description: message,
        ...options,
      }),

    info: (message: string, options?: Omit<ToastProps, "variant" | "title">) =>
      addToast({
        variant: "info",
        title: "Info",
        description: message,
        ...options,
      }),

    custom: (toast: Omit<ToastProps, "id">) => addToast(toast),

    dismiss: removeToast,
    clear: clearToasts,
  };

  return toast;
};

// Export variants for external use
export { toastVariants, toastIconVariants };
