import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const progressVariants = cva(
  'relative overflow-hidden rounded-full bg-muted',
  {
    variants: {
      size: {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
        xl: 'h-4',
      },
      variant: {
        default: 'bg-muted',
        primary: 'bg-primary/10',
        success: 'bg-success-100',
        warning: 'bg-warning-100',
        error: 'bg-error-100',
        energy: 'bg-gradient-to-r from-cyan-100 to-blue-100',
        health: 'bg-gradient-to-r from-green-100 to-emerald-100',
        alien: 'bg-gradient-to-r from-purple-100 to-pink-100',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

const progressBarVariants = cva(
  'h-full transition-all duration-500 ease-out rounded-full',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        primary: 'bg-primary',
        success: 'bg-success-600',
        warning: 'bg-warning-600',
        error: 'bg-error-600',
        energy: 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/25',
        health: 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/25',
        alien: 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25',
      },
      animated: {
        true: 'animate-pulse',
        false: '',
      },
      glow: {
        true: 'shadow-lg',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      animated: false,
      glow: false,
    },
  }
);

const progressLabelVariants = cva(
  'text-sm font-medium transition-colors duration-200',
  {
    variants: {
      variant: {
        default: 'text-muted-foreground',
        primary: 'text-primary',
        success: 'text-success-700',
        warning: 'text-warning-700',
        error: 'text-error-700',
        energy: 'text-cyan-700',
        health: 'text-green-700',
        alien: 'text-purple-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value: number;
  max?: number;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  glow?: boolean;
  indeterminate?: boolean;
}

const ProgressComponent = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value,
      max = 100,
      showLabel = false,
      label,
      size,
      variant,
      animated = false,
      glow = false,
      indeterminate = false,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const displayLabel = label || `${Math.round(percentage)}%`;

    return (
      <div className="w-full">
        {(showLabel || label) && (
          <div className="mb-2 flex justify-between items-center">
            <span className={cn(progressLabelVariants({ variant }))}>
              {label || 'Progress'}
            </span>
            {showLabel && (
              <span className={cn(progressLabelVariants({ variant }))}>
                {displayLabel}
              </span>
            )}
          </div>
        )}
        
        <div
          ref={ref}
          className={cn(progressVariants({ size, variant }), className)}
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label || 'Progress'}
          {...props}
        >
          <div
            className={cn(
              progressBarVariants({ variant, animated, glow }),
              indeterminate && 'animate-pulse w-1/3 absolute left-0'
            )}
            style={
              indeterminate
                ? {}
                : {
                    width: `${percentage}%`,
                    transition: 'width 0.5s ease-out',
                  }
            }
          />
          
          {/* Sci-fi glow effect */}
          {glow && (
            <div
              className={cn(
                'absolute inset-0 rounded-full opacity-30 blur-sm',
                variant === 'energy' && 'bg-gradient-to-r from-cyan-400 to-blue-400',
                variant === 'health' && 'bg-gradient-to-r from-green-400 to-emerald-400',
                variant === 'alien' && 'bg-gradient-to-r from-purple-400 to-pink-400',
                variant === 'primary' && 'bg-primary-400',
                variant === 'success' && 'bg-success-400',
                variant === 'warning' && 'bg-warning-400',
                variant === 'error' && 'bg-error-400'
              )}
              style={{
                width: `${percentage}%`,
                transition: 'width 0.5s ease-out',
              }}
            />
          )}
        </div>
      </div>
    );
  }
);

ProgressComponent.displayName = 'Progress';

// Memoize Progress for performance optimization
const Progress = React.memo(ProgressComponent) as typeof ProgressComponent;

// Circular Progress Component
const circularProgressVariants = cva(
  'relative inline-flex items-center justify-center',
  {
    variants: {
      size: {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-20 h-20',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const circularProgressSvgVariants = cva(
  'transform -rotate-90',
  {
    variants: {
      size: {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-20 h-20',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface CircularProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof circularProgressVariants> {
  value: number;
  max?: number;
  showLabel?: boolean;
  label?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'energy' | 'health' | 'alien';
  animated?: boolean;
  glow?: boolean;
  strokeWidth?: number;
}

const CircularProgressComponent = React.forwardRef<HTMLDivElement, CircularProgressProps>(
  (
    {
      className,
      value,
      max = 100,
      showLabel = false,
      label,
      size,
      variant = 'default',
      animated = false,
      glow = false,
      strokeWidth = 2,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const radius = size === 'sm' ? 14 : size === 'md' ? 20 : size === 'lg' ? 28 : 36;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const getStrokeColor = () => {
      switch (variant) {
        case 'primary':
          return 'stroke-primary';
        case 'success':
          return 'stroke-success';
        case 'warning':
          return 'stroke-warning';
        case 'error':
          return 'stroke-error';
        case 'energy':
          return 'stroke-cyan-500';
        case 'health':
          return 'stroke-green-500';
        case 'alien':
          return 'stroke-purple-500';
        default:
          return 'stroke-primary';
      }
    };

    const getGlowFilter = () => {
      if (!glow) return '';
      switch (variant) {
        case 'energy':
          return 'drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]';
        case 'health':
          return 'drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]';
        case 'alien':
          return 'drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]';
        default:
          return 'drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]';
      }
    };

    return (
      <div
        ref={ref}
        className={cn(circularProgressVariants({ size }), className)}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || 'Circular progress'}
        {...props}
      >
        <svg
          className={cn(circularProgressSvgVariants({ size }))}
          viewBox={`0 0 ${radius * 2 + strokeWidth * 2} ${radius * 2 + strokeWidth * 2}`}
        >
          {/* Background circle */}
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-muted"
          />
          
          {/* Progress circle */}
          <circle
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={cn(
              getStrokeColor(),
              getGlowFilter(),
              animated && 'animate-pulse',
              'transition-all duration-500 ease-out'
            )}
          />
        </svg>
        
        {/* Center label */}
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn(
              'text-xs font-medium',
              size === 'sm' && 'text-xs',
              size === 'md' && 'text-sm',
              size === 'lg' && 'text-base',
              size === 'xl' && 'text-lg',
              progressLabelVariants({ variant })
            )}>
              {label || `${Math.round(percentage)}%`}
            </span>
          </div>
        )}
      </div>
    );
  }
);

CircularProgressComponent.displayName = 'CircularProgress';

// Memoize CircularProgress for performance optimization
const CircularProgress = React.memo(CircularProgressComponent) as typeof CircularProgressComponent;

export { Progress, CircularProgress, progressVariants, progressBarVariants, progressLabelVariants };
