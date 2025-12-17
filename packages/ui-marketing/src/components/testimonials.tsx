import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@nostromo/ui-core';

const testimonialsVariants = cva(
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

const testimonialsGridVariants = cva(
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

const testimonialCardVariants = cva(
  'relative p-6 rounded-lg border bg-card text-card-foreground shadow-sm',
  {
    variants: {
      variant: {
        default: 'border-border',
        accent: 'border-accent/20 bg-accent/5',
        muted: 'border-muted bg-muted/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  avatar?: string;
  rating?: number;
}

export interface TestimonialsProps extends VariantProps<typeof testimonialsVariants> {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
  columns?: VariantProps<typeof testimonialsGridVariants>['columns'];
  cardVariant?: VariantProps<typeof testimonialCardVariants>['variant'];
  className?: string;
  showRatings?: boolean;
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials,
  title,
  subtitle,
  columns,
  cardVariant,
  variant,
  className,
  showRatings = true,
  ...props
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={cn(
          'text-lg',
          i < rating ? 'text-yellow-400' : 'text-muted-foreground/30'
        )}
      >
        ★
      </span>
    ));
  };

  return (
    <section className={cn(testimonialsVariants({ variant }), className)} {...props}>
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        <div className={cn(testimonialsGridVariants({ columns }))}>
          {testimonials.map((testimonial, idx) => (
            <div
              key={testimonial.id || idx}
              className={cn(testimonialCardVariants({ variant: cardVariant }))}
            >
              {showRatings && testimonial.rating && (
                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>
              )}
              
              <blockquote className="text-muted-foreground mb-6">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>
              
              <div className="flex items-center gap-3">
                {testimonial.avatar && (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                    {testimonial.company && ` at ${testimonial.company}`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
