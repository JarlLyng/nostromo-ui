import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@nostromo/ui-core';

const heroVariants = cva(
  'relative overflow-hidden bg-gradient-to-br from-background to-muted/20',
  {
    variants: {
      size: {
        sm: 'py-16 md:py-20',
        md: 'py-20 md:py-28',
        lg: 'py-24 md:py-32',
        xl: 'py-32 md:py-40',
      },
      variant: {
        default: 'text-foreground',
        muted: 'text-muted-foreground',
        accent: 'text-accent-foreground bg-accent/10',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

const heroContentVariants = cva(
  'container mx-auto px-4 text-center',
  {
    variants: {
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      align: 'center',
    },
  }
);

const heroTitleVariants = cva(
  'font-bold tracking-tight',
  {
    variants: {
      size: {
        sm: 'text-3xl md:text-4xl lg:text-5xl',
        md: 'text-4xl md:text-5xl lg:text-6xl',
        lg: 'text-5xl md:text-6xl lg:text-7xl',
        xl: 'text-6xl md:text-7xl lg:text-8xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const heroSubtitleVariants = cva(
  'mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto',
  {
    variants: {
      size: {
        sm: 'text-base md:text-lg',
        md: 'text-lg md:text-xl',
        lg: 'text-xl md:text-2xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface HeroProps extends VariantProps<typeof heroVariants> {
  title: string;
  subtitle?: string;
  cta?: React.ReactNode;
  className?: string;
  contentAlign?: VariantProps<typeof heroContentVariants>['align'];
  titleSize?: VariantProps<typeof heroTitleVariants>['size'];
  subtitleSize?: VariantProps<typeof heroSubtitleVariants>['size'];
  backgroundImage?: string;
  overlay?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ 
  title, 
  subtitle, 
  cta, 
  className,
  size,
  variant,
  contentAlign,
  titleSize,
  subtitleSize,
  backgroundImage,
  overlay = false,
  ...props 
}) => {
  return (
    <section 
      className={cn(heroVariants({ size, variant }), className)}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
      {...props}
    >
      {overlay && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      )}
      <div className={cn(heroContentVariants({ align: contentAlign }), overlay && 'relative z-10')}>
        <h1 className={cn(heroTitleVariants({ size: titleSize }))}>
          {title}
        </h1>
        {subtitle && (
          <p className={cn(heroSubtitleVariants({ size: subtitleSize }))}>
            {subtitle}
          </p>
        )}
        {cta && (
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            {cta}
          </div>
        )}
      </div>
    </section>
  );
};
