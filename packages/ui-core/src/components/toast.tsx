import React, { useState, useEffect, useCallback, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

// Toast variants
const toastVariants = cva(
  'relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'border-border bg-card text-card-foreground shadow-toast hover:shadow-toast-hover',
        success: 'border-success-200 bg-success-50 text-success-900 shadow-toast hover:shadow-toast-hover',
        error: 'border-destructive/20 bg-destructive/10 text-destructive shadow-toast hover:shadow-toast-hover',
        warning: 'border-warning-200 bg-warning-50 text-warning-900 shadow-toast hover:shadow-toast-hover',
        info: 'border-info-200 bg-info-50 text-info-900 shadow-toast hover:shadow-toast-hover'
      },
      position: {
        'top-left': 'fixed top-4 left-4 z-50',
        'top-center': 'fixed top-4 left-1/2 -translate-x-1/2 z-50',
        'top-right': 'fixed top-4 right-4 z-50',
        'bottom-left': 'fixed bottom-4 left-4 z-50',
        'bottom-center': 'fixed bottom-4 left-1/2 -translate-x-1/2 z-50',
        'bottom-right': 'fixed bottom-4 right-4 z-50'
      },
      animation: {
        default: 'animate-in slide-in-from-right-full duration-300',
        slide: 'animate-in slide-in-from-bottom-4 duration-300',
        fade: 'animate-in fade-in-0 duration-300',
        scale: 'animate-in zoom-in-95 duration-300',
        none: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      position: 'top-right',
      animation: 'default'
    }
  }
);

const toastIconVariants = cva(
  'flex-shrink-0 w-5 h-5 transition-colors duration-200',
  {
    variants: {
      variant: {
        default: 'text-muted-foreground',
        success: 'text-success-600',
        error: 'text-destructive',
        warning: 'text-warning-600',
        info: 'text-info-600'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

// Types
export interface ToastProps extends VariantProps<typeof toastVariants>, React.HTMLAttributes<HTMLDivElement> {
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
}

export interface ToastContextType {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, 'id'>) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

// Toast Context
const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast Provider
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  const timeoutRefs = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const removeToast = useCallback((id: string) => {
    // Clear timeout if it exists
    const timeoutId = timeoutRefs.current.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutRefs.current.delete(id);
    }
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const removeToastRef = useRef(removeToast);
  removeToastRef.current = removeToast;

  const addToast = useCallback((toast: Omit<ToastProps, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove toast after duration
    if (toast.duration !== 0) {
      const timeoutId = setTimeout(() => {
        removeToastRef.current(id);
        timeoutRefs.current.delete(id);
      }, toast.duration || 5000);
      timeoutRefs.current.set(id, timeoutId);
    }
    
      return id;
  }, []);

  const clearToasts = useCallback(() => {
    // Clear all timeouts
    timeoutRefs.current.forEach(timeoutId => clearTimeout(timeoutId));
    timeoutRefs.current.clear();
    setToasts([]);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    const refs = timeoutRefs.current;
    return () => {
      refs.forEach(timeoutId => clearTimeout(timeoutId));
      refs.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

// Toast Container
const ToastContainer: React.FC<{ toasts: ToastProps[] }> = ({ toasts }) => {
  if (toasts.length === 0) return null;

  // Group toasts by position for stacking
  const toastsByPosition = toasts.reduce((acc, toast) => {
    const position = toast.position || 'top-right';
    if (!acc[position]) {
      acc[position] = [];
    }
    acc[position].push(toast);
    return acc;
  }, {} as Record<string, ToastProps[]>);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
        <div key={position} className="pointer-events-none">
          {positionToasts.map((toast, index) => {
            const { style: toastStyle, ...toastProps } = toast;
            return (
              <Toast 
                key={toast.id} 
                {...toastProps}
                style={{
                  ...toastStyle,
                  // Stack toasts with offset
                  transform: `translateY(${index * 8}px) ${toastStyle?.transform || ''}`,
                  marginBottom: index < positionToasts.length - 1 ? '8px' : '0',
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

// Individual Toast Component
export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({
    id: _id,
    title,
    description,
    variant = 'default',
    position = 'top-right',
    animation = 'default',
    duration = 5000,
    onClose,
    action,
    className,
    children,
    appearDelay = 10,
    animationMs = 150,
    ...props
  }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);

    useEffect(() => {
      if (appearDelay <= 0) {
        // Render immediately in tests or when animations are disabled
        setIsVisible(true);
        return;
      }
      const timer = window.setTimeout(() => setIsVisible(true), appearDelay);
      return () => clearTimeout(timer);
    }, [appearDelay]);

    const handleClose = useCallback(() => {
      setIsLeaving(true);
      window.setTimeout(() => {
        onClose?.();
        setIsVisible(false);
      }, animationMs);
    }, [onClose, animationMs]);

    // Auto close after duration
    useEffect(() => {
      if (duration > 0) {
        const timer = window.setTimeout(handleClose, duration);
        return () => clearTimeout(timer);
      }
      return undefined;
    }, [duration, handleClose]);

    const getIcon = () => {
      switch (variant) {
        case 'success':
          return (
            <svg className={toastIconVariants({ variant })} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          );
        case 'error':
          return (
            <svg className={toastIconVariants({ variant })} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          );
        case 'warning':
          return (
            <svg className={toastIconVariants({ variant })} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          );
        case 'info':
          return (
            <svg className={toastIconVariants({ variant })} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          );
        default:
          return null;
      }
    };

    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        className={cn(
          toastVariants({ variant, position, animation }),
          isLeaving ? 'opacity-0' : 'opacity-100',
          'pointer-events-auto',
          className
        )}
        data-visible={isVisible ? 'true' : 'false'}
        data-leaving={isLeaving ? 'true' : 'false'}
        style={{
          transition: `all ${animationMs}ms ease-in-out`,
          transform: isLeaving ? 'translateX(100%)' : (props.style?.transform || 'translateX(0)'),
          ...props.style,
        }}
        {...props}
      >
        <div className="flex items-start space-x-3">
          {getIcon()}
          <div className="flex-1 min-w-0">
            {title && (
              <div className="text-sm font-medium">
                {title}
              </div>
            )}
            {description && (
              <div className="mt-1 text-sm opacity-90">
                {description}
              </div>
            )}
            {children}
          </div>
        </div>
        
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className="ml-4 text-sm font-medium underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {action.label}
          </button>
        )}
        
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-2 right-2 p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label="Close notification"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    );
  }
);

Toast.displayName = 'Toast';

// Toast Hook for easy usage
export const useToastNotification = () => {
  const { addToast, removeToast, clearToasts } = useToast();

  const toast = {
    success: (message: string, options?: Omit<ToastProps, 'variant' | 'title'>) =>
      addToast({ variant: 'success', title: 'Success', description: message, ...options }),
    
    error: (message: string, options?: Omit<ToastProps, 'variant' | 'title'>) =>
      addToast({ variant: 'error', title: 'Error', description: message, ...options }),
    
    warning: (message: string, options?: Omit<ToastProps, 'variant' | 'title'>) =>
      addToast({ variant: 'warning', title: 'Warning', description: message, ...options }),
    
    info: (message: string, options?: Omit<ToastProps, 'variant' | 'title'>) =>
      addToast({ variant: 'info', title: 'Info', description: message, ...options }),
    
    custom: (toast: Omit<ToastProps, 'id'>) => addToast(toast),
    
    dismiss: removeToast,
    clear: clearToasts
  };

  return toast;
};

// Export variants for external use
export { toastVariants, toastIconVariants };
