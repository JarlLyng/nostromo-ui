import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const selectTriggerVariants = cva(
  'flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 shadow-input hover:shadow-input-hover',
  {
    variants: {
      variant: {
        default: 'border-border hover:border-border focus:border-ring',
        outline: 'border-2 border-border hover:border-border focus:border-ring',
        ghost: 'border-transparent bg-transparent hover:bg-muted',
        error: 'border-destructive hover:border-destructive/80 focus:border-destructive focus:ring-destructive',
        success: 'border-success-500 hover:border-success-600 focus:border-success-500 focus:ring-success-500',
      },
      size: {
        default: 'h-10 px-3 py-2 text-sm',
        sm: 'h-8 px-2 py-1 text-xs',
        lg: 'h-12 px-4 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const selectContentVariants = cva(
  'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-border shadow-lg hover:shadow-xl',
        outline: 'border-2 border-border shadow-lg hover:shadow-xl',
        ghost: 'border-transparent shadow-xl hover:shadow-2xl',
        error: 'border-destructive/20 shadow-lg hover:shadow-xl',
        success: 'border-success-200 shadow-lg hover:shadow-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const selectItemVariants = cva(
  'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'focus:bg-accent focus:text-accent-foreground hover:bg-muted',
        highlight: 'focus:bg-primary/10 focus:text-primary hover:bg-primary/5',
        error: 'focus:bg-destructive/10 focus:text-destructive hover:bg-destructive/5',
        success: 'focus:bg-success-100 focus:text-success-900 hover:bg-success-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Select Root
export interface SelectProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {}

const Select = SelectPrimitive.Root;

// Select Group
export interface SelectGroupProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Group> {}

const SelectGroup = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Group>,
  SelectGroupProps
>(({ ...props }, _ref) => <SelectPrimitive.Group {...props} />);
SelectGroup.displayName = 'SelectGroup';

// Select Value
export interface SelectValueProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value> {}

const SelectValue = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Value>,
  SelectValueProps
>(({ ...props }, _ref) => <SelectPrimitive.Value {...props} />);
SelectValue.displayName = 'SelectValue';

// Select Trigger
export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, variant, size, children, ...props }, _ref) => (
  <SelectPrimitive.Trigger
    ref={_ref}
    className={cn(selectTriggerVariants({ variant, size }), className)}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <svg
        className="h-4 w-4 opacity-50"
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
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = 'SelectPrimitive.Trigger';

// Select Content
export interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>,
    VariantProps<typeof selectContentVariants> {}

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ className, variant, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        selectContentVariants({ variant }),
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = 'SelectPrimitive.Content';

// Select Label
export interface SelectLabelProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> {}

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  SelectLabelProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
));
SelectLabel.displayName = 'SelectPrimitive.Label';

// Select Item
export interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>,
    VariantProps<typeof selectItemVariants> {}

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, variant, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(selectItemVariants({ variant }), className)}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = 'SelectPrimitive.Item';

// Select Separator
export interface SelectSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> {}

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  SelectSeparatorProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
SelectSeparator.displayName = 'SelectPrimitive.Separator';

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  selectTriggerVariants,
  selectContentVariants,
  selectItemVariants,
};
