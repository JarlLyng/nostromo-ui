import React, { useState, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

// Accordion variants
const accordionVariants = cva(
  'border border-gray-200 rounded-md overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-white',
        outlined: 'border-2 border-gray-300',
        filled: 'bg-gray-50',
        ghost: 'border-transparent bg-transparent'
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
);

const accordionItemVariants = cva(
  'border-b border-gray-200 last:border-b-0',
  {
    variants: {
      variant: {
        default: '',
        outlined: 'border-gray-300',
        filled: 'border-gray-300',
        ghost: 'border-transparent'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

const accordionTriggerVariants = cva(
  'flex w-full items-center justify-between py-4 px-6 text-left font-medium transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'text-gray-900',
        outlined: 'text-gray-900',
        filled: 'text-gray-900',
        ghost: 'text-gray-900'
      },
      size: {
        sm: 'py-3 px-4 text-sm',
        md: 'py-4 px-6 text-base',
        lg: 'py-5 px-8 text-lg'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
);

const accordionContentVariants = cva(
  'overflow-hidden transition-all duration-200 ease-in-out',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg'
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
);

const accordionChevronVariants = cva(
  'h-4 w-4 shrink-0 transition-transform duration-200',
  {
    variants: {
      open: {
        true: 'rotate-180',
        false: 'rotate-0'
      }
    },
    defaultVariants: {
      open: false
    }
  }
);

// Types
export interface AccordionProps extends VariantProps<typeof accordionVariants> {
  children: React.ReactNode;
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  className?: string;
}

export interface AccordionItemProps extends VariantProps<typeof accordionItemVariants> {
  value: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export interface AccordionTriggerProps extends VariantProps<typeof accordionTriggerVariants> {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export interface AccordionContentProps extends VariantProps<typeof accordionContentVariants> {
  children: React.ReactNode;
  className?: string;
}

// Accordion Context
interface AccordionContextType {
  type: 'single' | 'multiple';
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
  variant: 'default' | 'outlined' | 'filled' | 'ghost';
  size: 'sm' | 'md' | 'lg';
}

// Accordion Item Context
interface AccordionItemContextType {
  open: boolean;
  toggle: () => void;
  triggerId: string;
  contentId: string;
  value: string;
  disabled: boolean;
}

const AccordionContext = React.createContext<AccordionContextType | undefined>(undefined);
const AccordionItemContext = React.createContext<AccordionItemContextType | null>(null);

const useAccordionContext = () => {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion');
  }
  return context;
};

const useAccordionItemContext = () => {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error('Accordion components must be used within an AccordionItem');
  }
  return context;
};

// Main Accordion Component
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({
    children,
    type = 'single',
    collapsible: _collapsible = true,
    value: controlledValue,
    defaultValue,
    onValueChange,
    variant = 'default',
    size = 'md',
    className,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = useState<string | string[]>(() => {
      if (defaultValue !== undefined) {
        return defaultValue;
      }
      return type === 'single' ? '' : [];
    });
    
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;
    
    const handleValueChange = useCallback((newValue: string | string[]) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    }, [isControlled, onValueChange]);

    const contextValue: AccordionContextType = {
      type,
      value,
      onValueChange: handleValueChange,
      variant: variant || 'default',
      size: size || 'md'
    };

    return (
      <AccordionContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(accordionVariants({ variant, size }), className)}
          data-accordion-root="true"
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = 'Accordion';

// Accordion Item Component
export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({
    value,
    children,
    variant = 'default',
    className,
    disabled = false,
    ...props
  }, ref) => {
    const { variant: contextVariant, value: accordionValue, type, onValueChange } = useAccordionContext();
    const finalVariant = variant === 'default' ? contextVariant : variant;
    
    // Stable IDs using useId
    const baseId = React.useId();
    const triggerId = `accordion-trigger-${value}-${baseId}`;
    const contentId = `accordion-content-${value}-${baseId}`;
    
    // Determine if this item is open
    const isOpen = type === 'single' 
      ? accordionValue === value 
      : Array.isArray(accordionValue) && accordionValue.includes(value);
    
    
    const handleToggle = useCallback(() => {
      if (disabled) return;
      
      if (type === 'single') {
        // Toggle: if currently open, close it; if closed, open it
        onValueChange(isOpen ? '' : value);
      } else {
        const currentValue = Array.isArray(accordionValue) ? accordionValue : [];
        if (isOpen) {
          onValueChange(currentValue.filter(v => v !== value));
        } else {
          onValueChange([...currentValue, value]);
        }
      }
    }, [disabled, isOpen, type, value, accordionValue, onValueChange]);

    const itemContextValue: AccordionItemContextType = {
      open: isOpen,
      toggle: handleToggle,
      triggerId,
      contentId,
      value,
      disabled
    };

    return (
      <AccordionItemContext.Provider value={itemContextValue}>
        <div
          ref={ref}
          className={cn(
            accordionItemVariants({ variant: finalVariant }),
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          data-value={value}
          data-disabled={disabled}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';

// Accordion Trigger Component
export const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({
    children,
    variant = 'default',
    size = 'md',
    className,
    disabled = false,
    ...props
  }, ref) => {
    const { open, toggle, triggerId, contentId, disabled: itemDisabled } = useAccordionItemContext();
    const { variant: contextVariant, size: contextSize } = useAccordionContext();
    
    const finalVariant = variant === 'default' ? contextVariant : variant || 'default';
    const finalSize = size === 'md' ? contextSize : size || 'md';
    const finalDisabled = itemDisabled || disabled || false;

    return (
      <button
        {...props}
        ref={ref}
        type="button"
        id={triggerId}
        aria-controls={contentId}
        aria-expanded={open}
        aria-disabled={finalDisabled}
        disabled={finalDisabled}
        data-state={open ? 'open' : 'closed'}
        data-accordion-trigger="true"
        onClick={(e) => {
          if ('onClick' in props && props.onClick) (props.onClick as any)(e);
          if (finalDisabled) return;
          toggle();
        }}
        onKeyDown={(e) => {
          if ('onKeyDown' in props && props.onKeyDown) (props.onKeyDown as any)(e);
          if (finalDisabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            toggle();
            return;
          }
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Home' || e.key === 'End') {
            e.preventDefault();
            const root = (e.currentTarget as HTMLElement).closest('[data-accordion-root="true"]');
            if (!root) return;
            const triggers = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-accordion-trigger="true"]'));
            const enabled = triggers.filter(btn => !btn.disabled);
            const current = e.currentTarget as HTMLButtonElement;
            const idx = enabled.indexOf(current);
            if (idx === -1) return;
            
            let nextIdx: number;
            if (e.key === 'ArrowDown') {
              nextIdx = (idx + 1) % enabled.length;
            } else if (e.key === 'ArrowUp') {
              nextIdx = (idx - 1 + enabled.length) % enabled.length;
            } else if (e.key === 'Home') {
              nextIdx = 0;
            } else if (e.key === 'End') {
              nextIdx = enabled.length - 1;
            } else {
              return;
            }
            
            enabled[nextIdx]?.focus();
          }
        }}
        className={cn(
          accordionTriggerVariants({ variant: finalVariant, size: finalSize }),
          finalDisabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <span className="flex-1">{children}</span>
        <svg
          className={cn(accordionChevronVariants({ open }))}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    );
  }
);

AccordionTrigger.displayName = 'AccordionTrigger';

// Accordion Content Component
export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({
    children,
    size = 'md',
    className,
    ...props
  }, ref) => {
    const { open, contentId, triggerId } = useAccordionItemContext();
    const { size: contextSize } = useAccordionContext();
    
    const finalSize = size === 'md' ? contextSize : size;

    return (
      <div
        {...props}
        ref={ref}
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!open}
        data-state={open ? 'open' : 'closed'}
        className={cn(
          accordionContentVariants({ size: finalSize }), 
          'overflow-hidden transition-all duration-200 ease-in-out',
          className
        )}
      >
        <div className="px-6 py-4">
          {children}
        </div>
      </div>
    );
  }
);

AccordionContent.displayName = 'AccordionContent';

// Export variants for external use
export { accordionVariants, accordionItemVariants, accordionTriggerVariants, accordionContentVariants, accordionChevronVariants };