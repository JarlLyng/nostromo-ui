import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@jarllyng/ui-core';

const featuresVariants = cva(
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

const featuresGridVariants = cva(
  'grid gap-8',
  {
    variants: {
      columns: {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      },
    },
    defaultVariants: {
      columns: 3,
    },
  }
);

const featureCardVariants = cva(
  'relative p-6 rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md',
  {
    variants: {
      variant: {
        default: 'border-border hover:border-accent/20',
        accent: 'border-accent/20 bg-accent/5 hover:bg-accent/10',
        muted: 'border-muted bg-muted/20 hover:bg-muted/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const featureIconVariants = cva(
  'w-12 h-12 rounded-lg flex items-center justify-center mb-4',
  {
    variants: {
      variant: {
        default: 'bg-primary/10 text-primary',
        accent: 'bg-accent/20 text-accent-foreground',
        muted: 'bg-muted text-muted-foreground',
        success: 'bg-success-100 text-success-600',
        warning: 'bg-warning-100 text-warning-600',
        error: 'bg-error-100 text-error-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  iconVariant?: VariantProps<typeof featureIconVariants>['variant'];
}

export interface FeaturesProps extends VariantProps<typeof featuresVariants> {
  features: Feature[];
  title?: string;
  subtitle?: string;
  columns?: VariantProps<typeof featuresGridVariants>['columns'];
  cardVariant?: VariantProps<typeof featureCardVariants>['variant'];
  className?: string;
  centered?: boolean;
}

export const Features: React.FC<FeaturesProps> = ({
  features,
  title,
  subtitle,
  columns,
  cardVariant,
  variant,
  className,
  centered = true,
  ...props
}) => {
  return (
    <section className={cn(featuresVariants({ variant }), className)} {...props}>
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className={cn('mb-12', centered && 'text-center')}>
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={cn(
                'text-lg text-muted-foreground',
                centered && 'max-w-2xl mx-auto'
              )}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        <div className={cn(featuresGridVariants({ columns }))}>
          {features.map((feature, idx) => (
            <div
              key={feature.id || idx}
              className={cn(featureCardVariants({ variant: cardVariant }))}
            >
              {feature.icon && (
                <div className={cn(featureIconVariants({ variant: feature.iconVariant }))}>
                  {feature.icon}
                </div>
              )}
              
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
