import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const dialogVariants = cva(
  [
    'fixed inset-0 z-50 flex items-center justify-center',
    'bg-black/50 backdrop-blur-sm',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  ],
  {
    variants: {
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-12',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const dialogContentVariants = cva(
  [
    'relative bg-white rounded-lg shadow-lg',
    'w-full max-w-lg mx-auto',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
    'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
    'border border-neutral-200',
  ],
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        '7xl': 'max-w-7xl',
        full: 'max-w-full mx-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface DialogProps extends VariantProps<typeof dialogVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export interface DialogContentProps extends VariantProps<typeof dialogContentVariants> {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

export interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

export interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

// Simple Dialog implementation without Radix UI for now
export const Dialog: React.FC<DialogProps> = ({
  open = false,
  onOpenChange,
  children,
  className,
  size,
}) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onOpenChange?.(false);
    }
  };

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onOpenChange?.(false);
    }
  };

  React.useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={cn(dialogVariants({ size }), className)}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  );
};

export const DialogContent: React.FC<DialogContentProps> = ({
  children,
  className,
  size,
  onClose,
}) => {
  return (
    <div
      className={cn(dialogContentVariants({ size }), className)}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

export const DialogHeader: React.FC<DialogHeaderProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6 pb-0', className)}>
      {children}
    </div>
  );
};

export const DialogTitle: React.FC<DialogTitleProps> = ({
  children,
  className,
}) => {
  return (
    <h2 className={cn('text-lg font-semibold leading-none tracking-tight', className)}>
      {children}
    </h2>
  );
};

export const DialogDescription: React.FC<DialogDescriptionProps> = ({
  children,
  className,
}) => {
  return (
    <p className={cn('text-sm text-neutral-500', className)}>
      {children}
    </p>
  );
};

export const DialogFooter: React.FC<DialogFooterProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-0', className)}>
      {children}
    </div>
  );
};

export const DialogClose: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className, onClick }) => {
  return (
    <button
      type="button"
      className={cn(
        'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity',
        'hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
        'disabled:pointer-events-none',
        className
      )}
      onClick={onClick}
      aria-label="Close dialog"
    >
      {children}
    </button>
  );
};
