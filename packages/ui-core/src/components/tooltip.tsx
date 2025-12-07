import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

// Tooltip variants
const tooltipVariants = cva(
  'absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md shadow-lg transition-opacity duration-200',
  {
    variants: {
      variant: {
        default: 'bg-gray-900 text-white',
        light: 'bg-white text-gray-900 border border-gray-200',
        dark: 'bg-gray-900 text-white',
        success: 'bg-green-600 text-white',
        warning: 'bg-yellow-500 text-white',
        error: 'bg-red-600 text-white',
        info: 'bg-blue-600 text-white'
      },
      size: {
        sm: 'text-xs px-2 py-1',
        md: 'text-sm px-3 py-2',
        lg: 'text-base px-4 py-3'
      },
      placement: {
        'top': 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        'top-start': 'bottom-full left-0 mb-2',
        'top-end': 'bottom-full right-0 mb-2',
        'bottom': 'top-full left-1/2 -translate-x-1/2 mt-2',
        'bottom-start': 'top-full left-0 mt-2',
        'bottom-end': 'top-full right-0 mt-2',
        'left': 'right-full top-1/2 -translate-y-1/2 mr-2',
        'left-start': 'right-full top-0 mr-2',
        'left-end': 'right-full bottom-0 mr-2',
        'right': 'left-full top-1/2 -translate-y-1/2 ml-2',
        'right-start': 'left-full top-0 ml-2',
        'right-end': 'left-full bottom-0 ml-2'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      placement: 'top'
    }
  }
);

const arrowVariants = cva(
  'absolute w-2 h-2 rotate-45',
  {
    variants: {
      variant: {
        default: 'bg-gray-900',
        light: 'bg-white border border-gray-200',
        dark: 'bg-gray-900',
        success: 'bg-green-600',
        warning: 'bg-yellow-500',
        error: 'bg-red-600',
        info: 'bg-blue-600'
      },
      placement: {
        'top': 'top-full left-1/2 -translate-x-1/2 -translate-y-1/2',
        'top-start': 'top-full left-4 -translate-y-1/2',
        'top-end': 'top-full right-4 -translate-y-1/2',
        'bottom': 'bottom-full left-1/2 -translate-x-1/2 translate-y-1/2',
        'bottom-start': 'bottom-full left-4 translate-y-1/2',
        'bottom-end': 'bottom-full right-4 translate-y-1/2',
        'left': 'left-full top-1/2 -translate-x-1/2 -translate-y-1/2',
        'left-start': 'left-full top-4 -translate-x-1/2',
        'left-end': 'left-full bottom-4 -translate-x-1/2',
        'right': 'right-full top-1/2 translate-x-1/2 -translate-y-1/2',
        'right-start': 'right-full top-4 translate-x-1/2',
        'right-end': 'right-full bottom-4 translate-x-1/2'
      }
    },
    defaultVariants: {
      variant: 'default',
      placement: 'top'
    }
  }
);

// Types
export interface TooltipProps extends VariantProps<typeof tooltipVariants> {
  children: React.ReactNode;
  content: React.ReactNode;
  trigger?: 'hover' | 'click' | 'focus' | 'manual';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
  skipDelayDuration?: number;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  sideOffset?: number;
  alignOffset?: number;
  avoidCollisions?: boolean;
  collisionBoundary?: Element | null;
  collisionPadding?: number;
  hideWhenDetached?: boolean;
  sticky?: 'partial' | 'always';
  updatePositionDeps?: React.DependencyList;
  closeOnBlur?: boolean;
}

export interface TooltipContentProps extends VariantProps<typeof tooltipVariants> {
  children: React.ReactNode;
  className?: string;
  sideOffset?: number;
  alignOffset?: number;
  avoidCollisions?: boolean;
  collisionBoundary?: Element | null;
  collisionPadding?: number;
  hideWhenDetached?: boolean;
  sticky?: 'partial' | 'always';
  updatePositionDeps?: React.DependencyList;
}

export interface TooltipTriggerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

// Tooltip Context
interface TooltipContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  trigger: 'hover' | 'click' | 'focus' | 'manual';
  delayDuration: number;
  skipDelayDuration: number;
  openNow: () => void;
  closeNow: () => void;
  openWithDelay: () => void;
  closeWithDelay: () => void;
  toggleWithDelay: () => void;
  toggleNow: () => void;
  closeOnBlur: boolean;
}

const TooltipContext = React.createContext<TooltipContextType | undefined>(undefined);

const useTooltipContext = () => {
  const context = React.useContext(TooltipContext);
  if (!context) {
    throw new Error('Tooltip components must be used within a Tooltip');
  }
  return context;
};

// Main Tooltip Component
export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({
    children,
    content,
    trigger = 'hover',
    open: controlledOpen,
    onOpenChange,
    delayDuration = 700,
    skipDelayDuration = 300,
    disabled = false,
    className,
    contentClassName,
    sideOffset = 4,
    alignOffset = 0,
    avoidCollisions = true,
    collisionBoundary,
    collisionPadding = 8,
    hideWhenDetached = false,
    sticky = 'partial',
    updatePositionDeps,
    closeOnBlur = true,
    ...props
  }, ref) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const delayTimerRef = useRef<number | ReturnType<typeof setTimeout> | null>(null);
    const skipDelayTimerRef = useRef<number | ReturnType<typeof setTimeout> | null>(null);
    
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;
    
    const setOpen = useCallback((newOpen: boolean) => {
      if (disabled) return;
      
      if (isControlled) {
        onOpenChange?.(newOpen);
      } else {
        setInternalOpen(newOpen);
        onOpenChange?.(newOpen); // notify i uncontrolled
      }
    }, [disabled, isControlled, onOpenChange]);

    // --- Tooltip open/close/toggle helpers ---
    const clearTimers = useCallback(() => {
      if (delayTimerRef.current != null) {
        clearTimeout(delayTimerRef.current);
        delayTimerRef.current = null;
      }
      if (skipDelayTimerRef.current != null) {
        clearTimeout(skipDelayTimerRef.current);
        skipDelayTimerRef.current = null;
      }
    }, []);

    const openNow = useCallback(() => {
      clearTimers();
      setOpen(true);
    }, [clearTimers, setOpen]);

    const closeNow = useCallback(() => {
      clearTimers();
      setOpen(false);
    }, [clearTimers, setOpen]);

    const openWithDelay = useCallback(() => {
      clearTimers();
      if (disabled) return;
      if (delayDuration > 0) {
        delayTimerRef.current = window.setTimeout(() => {
          setOpen(true);
        }, delayDuration);
      } else {
        setOpen(true);
      }
    }, [clearTimers, disabled, delayDuration, setOpen]);

    const closeWithDelay = useCallback(() => {
      clearTimers();
      if (skipDelayDuration > 0) {
        skipDelayTimerRef.current = window.setTimeout(() => {
          setOpen(false);
        }, skipDelayDuration);
      } else {
        setOpen(false);
      }
    }, [clearTimers, skipDelayDuration, setOpen]);

    const toggleWithDelay = useCallback(() => {
      if (open) {
        closeWithDelay();
      } else {
        openWithDelay();
      }
    }, [open, openWithDelay, closeWithDelay]);

    const toggleNow = useCallback(() => {
      if (open) closeNow();
      else openNow();
    }, [open, openNow, closeNow]);

    // Cleanup timers on unmount
    useEffect(() => {
      return () => {
        clearTimers();
      };
    }, [clearTimers]);

    const contextValue: TooltipContextType = {
      open,
      setOpen,
      trigger,
      delayDuration,
      skipDelayDuration,
      openNow,
      closeNow,
      openWithDelay,
      closeWithDelay,
      toggleWithDelay,
      toggleNow,
      closeOnBlur,
    };

    // Only render the TooltipContent when open is true (and no pending close timer),
    // to help guard against duplicate tooltips in StrictMode/rapid toggles.
    const shouldRenderContent = open === true;

    return (
      <TooltipContext.Provider value={contextValue}>
        <div ref={ref} className={cn('relative inline-block', className)} data-open={open} {...props}>
          {children}
          {shouldRenderContent ? (
            <TooltipContent
              className={contentClassName || ''}
              sideOffset={sideOffset}
              alignOffset={alignOffset}
              avoidCollisions={avoidCollisions}
              collisionBoundary={collisionBoundary || null}
              collisionPadding={collisionPadding}
              hideWhenDetached={hideWhenDetached}
              sticky={sticky}
              updatePositionDeps={updatePositionDeps || []}
              variant={props.variant}
              size={props.size}
              placement={props.placement}
            >
              {content}
            </TooltipContent>
          ) : null}
        </div>
      </TooltipContext.Provider>
    );
  }
);

Tooltip.displayName = 'Tooltip';

// Tooltip Trigger Component
export const TooltipTrigger = React.forwardRef<HTMLElement, TooltipTriggerProps>(
  ({ children, asChild = true, className, ...props }, ref) => {
    const {
      trigger,
      openNow,
      closeNow,
      openWithDelay,
      closeWithDelay,
      toggleNow,
      closeOnBlur,
    } = useTooltipContext();
    const triggerRef = useRef<HTMLElement>(null);

    const triggerProps = {
      ref: (node: HTMLElement) => {
        triggerRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLElement>).current = node;
        }
      },
      className: cn(className),
      'data-tooltip-trigger': true,
      onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
        // Call external handler first
        props.onMouseEnter?.(e as React.MouseEvent<HTMLElement>);
        if (trigger === 'hover') {
          openWithDelay();
        }
      },
      onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
        props.onMouseLeave?.(e as React.MouseEvent<HTMLElement>);
        if (trigger === 'hover') closeWithDelay();
      },
      onPointerEnter: (e: React.PointerEvent) => {
        // @ts-expect-error - Event handler type compatibility
        props.onPointerEnter?.(e);
        if (trigger === 'hover') openWithDelay();
      },
      onPointerLeave: (e: React.PointerEvent) => {
        // @ts-expect-error - Event handler type compatibility
        props.onPointerLeave?.(e);
        if (trigger === 'hover') closeWithDelay();
      },
      onClick: (e: React.MouseEvent) => {
        // @ts-expect-error - Event handler type compatibility
        props.onClick?.(e);
        if (trigger === 'click') toggleNow();
      },
      onFocus: (e: React.FocusEvent) => {
        // @ts-expect-error - Event handler type compatibility
        props.onFocus?.(e);
        if (trigger === 'focus') openNow();
      },
      onBlur: (e: React.FocusEvent) => {
        // @ts-expect-error - Event handler type compatibility
        props.onBlur?.(e);
        if (closeOnBlur) closeNow();
      },
      onKeyDown: (e: React.KeyboardEvent) => {
        // @ts-expect-error - Event handler type compatibility
        props.onKeyDown?.(e);
        if (e.key === 'Escape') closeNow();
      }
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...(children.props || {}),
        ...triggerProps
      });
    }

    return (
      <span
        {...triggerProps}
        tabIndex={trigger === 'focus' ? 0 : undefined}
        role={trigger === 'click' ? 'button' : undefined}
      >
        {children}
      </span>
    );
  }
);

TooltipTrigger.displayName = 'TooltipTrigger';

// Tooltip Content Component
export const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({
    children,
    variant = 'default',
    size = 'md',
    placement = 'top',
    className,
    sideOffset = 4,
    alignOffset: _alignOffset = 0,
    avoidCollisions = true,
    collisionBoundary: _collisionBoundary,
    collisionPadding = 8,
    hideWhenDetached: _hideWhenDetached = false,
    sticky: _sticky = 'partial',
    updatePositionDeps,
    ...props
  }, ref) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const updatePosition = useCallback(() => {
      if (!contentRef.current) return;

      const content = contentRef.current;
      const trigger = content.parentElement?.querySelector('[data-tooltip-trigger]') as HTMLElement;
      
      if (!trigger) return;

      const triggerRect = trigger.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      };

      let top = 0;
      let left = 0;

      // Calculate position based on placement
      switch (placement) {
        case 'top':
          top = triggerRect.top - contentRect.height - sideOffset;
          left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
          break;
        case 'top-start':
          top = triggerRect.top - contentRect.height - sideOffset;
          left = triggerRect.left;
          break;
        case 'top-end':
          top = triggerRect.top - contentRect.height - sideOffset;
          left = triggerRect.right - contentRect.width;
          break;
        case 'bottom':
          top = triggerRect.bottom + sideOffset;
          left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
          break;
        case 'bottom-start':
          top = triggerRect.bottom + sideOffset;
          left = triggerRect.left;
          break;
        case 'bottom-end':
          top = triggerRect.bottom + sideOffset;
          left = triggerRect.right - contentRect.width;
          break;
        case 'left':
          top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
          left = triggerRect.left - contentRect.width - sideOffset;
          break;
        case 'left-start':
          top = triggerRect.top;
          left = triggerRect.left - contentRect.width - sideOffset;
          break;
        case 'left-end':
          top = triggerRect.bottom - contentRect.height;
          left = triggerRect.left - contentRect.width - sideOffset;
          break;
        case 'right':
          top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
          left = triggerRect.right + sideOffset;
          break;
        case 'right-start':
          top = triggerRect.top;
          left = triggerRect.right + sideOffset;
          break;
        case 'right-end':
          top = triggerRect.bottom - contentRect.height;
          left = triggerRect.right + sideOffset;
          break;
      }

      // Apply collision detection if enabled
      if (avoidCollisions) {
        // Horizontal collision detection
        if (left < collisionPadding) {
          left = collisionPadding;
        } else if (left + contentRect.width > viewport.width - collisionPadding) {
          left = viewport.width - contentRect.width - collisionPadding;
        }

        // Vertical collision detection
        if (top < collisionPadding) {
          top = collisionPadding;
        } else if (top + contentRect.height > viewport.height - collisionPadding) {
          top = viewport.height - contentRect.height - collisionPadding;
        }
      }

      setPosition({ top, left });
    }, [placement, sideOffset, avoidCollisions, collisionPadding]);

    useEffect(() => {
      updatePosition();
      
      const handleResize = () => updatePosition();
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleResize);
      };
    }, [updatePosition, updatePositionDeps]);

    return (
      <div
        ref={(node) => {
          contentRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        role="tooltip"
        data-tooltip-instance="nostromo"
        className={cn(
          tooltipVariants({ variant, size, placement }),
          className
        )}
        style={{
          position: 'fixed',
          top: position.top,
          left: position.left,
          zIndex: 50
        }}
        {...props}
      >
        {children}
        <div
          className={cn(
            arrowVariants({ variant, placement })
          )}
        />
      </div>
    );
  }
);

TooltipContent.displayName = 'TooltipContent';

// Tooltip Provider for global configuration
export interface TooltipProviderProps {
  children: React.ReactNode;
  delayDuration?: number;
  skipDelayDuration?: number;
  defaultOpen?: boolean;
}

export const TooltipProvider: React.FC<TooltipProviderProps> = ({
  children,
  delayDuration: _delayDuration = 700,
  skipDelayDuration: _skipDelayDuration = 300,
  defaultOpen: _defaultOpen = false
}) => {
  return (
    <div data-tooltip-provider>
      {children}
    </div>
  );
};

// Export variants for external use
export { tooltipVariants, arrowVariants };
