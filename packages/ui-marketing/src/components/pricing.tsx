import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@nostromo/ui-core';

const pricingVariants = cva(
  'py-16 md:py-24',
  {
    variants: {
      variant: {
        default: 'bg-background',
        muted: 'bg-muted/30',
        accent: 'bg-accent/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const pricingGridVariants = cva(
  'grid gap-8',
  {
    variants: {
      columns: {
        1: 'grid-cols-1 max-w-md mx-auto',
        2: 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto',
      },
    },
    defaultVariants: {
      columns: 3,
    },
  }
);

const pricingCardVariants = cva(
  'relative p-8 rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-border',
        accent: 'border-accent/20 bg-accent/5',
        popular: 'border-primary/20 bg-primary/5 ring-2 ring-primary/10',
        muted: 'border-muted bg-muted/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const pricingBadgeVariants = cva(
  'absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        accent: 'bg-accent text-accent-foreground',
        success: 'bg-success-100 text-success-800',
        warning: 'bg-warning-100 text-warning-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface PricingFeature {
  id: string;
  name: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  description?: string;
  price: {
    monthly: number;
    yearly?: number;
  };
  currency?: string;
  period?: string;
  features: PricingFeature[];
  cta: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  badge?: {
    text: string;
    variant?: VariantProps<typeof pricingBadgeVariants>['variant'];
  };
  popular?: boolean;
}

export interface PricingProps extends VariantProps<typeof pricingVariants> {
  plans: PricingPlan[];
  title?: string;
  subtitle?: string;
  columns?: VariantProps<typeof pricingGridVariants>['columns'];
  className?: string;
  showYearly?: boolean;
  onToggleBilling?: (yearly: boolean) => void;
}

export const Pricing: React.FC<PricingProps> = ({
  plans,
  title,
  subtitle,
  columns,
  variant,
  className,
  showYearly = false,
  onToggleBilling,
  ...props
}) => {
  const formatPrice = (price: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className={cn(pricingVariants({ variant }), className)} {...props}>
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                {subtitle}
              </p>
            )}
            
            {onToggleBilling && (
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className={cn('text-sm', !showYearly && 'text-foreground font-medium')}>
                  Monthly
                </span>
                <button
                  onClick={() => onToggleBilling(!showYearly)}
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <span
                    className={cn(
                      'inline-block h-4 w-4 transform rounded-full bg-background transition-transform',
                      showYearly ? 'translate-x-6' : 'translate-x-1'
                    )}
                  />
                </button>
                <span className={cn('text-sm', showYearly && 'text-foreground font-medium')}>
                  Yearly
                  <span className="ml-1 text-xs text-success-600">
                    (Save 20%)
                  </span>
                </span>
              </div>
            )}
          </div>
        )}
        
        <div className={cn(pricingGridVariants({ columns }))}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                pricingCardVariants({ 
                  variant: plan.popular ? 'popular' : 'default' 
                }),
                plan.popular && 'scale-105'
              )}
            >
              {plan.badge && (
                <div className={cn(pricingBadgeVariants({ variant: plan.badge.variant }))}>
                  {plan.badge.text}
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                {plan.description && (
                  <p className="text-muted-foreground text-sm mb-4">
                    {plan.description}
                  </p>
                )}
                <div className="mb-4">
                  <span className="text-4xl font-bold">
                    {formatPrice(
                      showYearly && plan.price.yearly 
                        ? plan.price.yearly 
                        : plan.price.monthly,
                      plan.currency
                    )}
                  </span>
                  <span className="text-muted-foreground ml-1">
                    /{plan.period || (showYearly ? 'year' : 'month')}
                  </span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature.id} className="flex items-center gap-3">
                    <span
                      className={cn(
                        'w-5 h-5 rounded-full flex items-center justify-center text-xs',
                        feature.included
                          ? 'bg-success-100 text-success-600'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {feature.included ? '✓' : '✗'}
                    </span>
                    <span className={cn(
                      'text-sm',
                      !feature.included && 'text-muted-foreground line-through'
                    )}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
              
              <button
                className={cn(
                  'w-full py-3 px-4 rounded-lg font-medium transition-colors',
                  plan.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
                onClick={plan.cta.onClick}
              >
                {plan.cta.text}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
