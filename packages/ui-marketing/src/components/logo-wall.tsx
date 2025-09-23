import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@nostromo/ui-core';

const logoWallVariants = cva(
  'grid gap-8 items-center',
  {
    variants: {
      columns: {
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
        5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
        6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
      },
      spacing: {
        sm: 'gap-4',
        md: 'gap-6',
        lg: 'gap-8',
        xl: 'gap-12',
      },
      alignment: {
        center: 'justify-items-center',
        start: 'justify-items-start',
        end: 'justify-items-end',
      },
    },
    defaultVariants: {
      columns: 4,
      spacing: 'md',
      alignment: 'center',
    },
  }
);

const logoItemVariants = cva(
  'flex items-center justify-center p-4 rounded-lg transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-muted/30 hover:bg-muted/50',
        ghost: 'hover:bg-muted/30',
        outline: 'border border-border hover:border-border/80',
        filled: 'bg-muted hover:bg-muted/80',
      },
      hover: {
        none: '',
        scale: 'hover:scale-105',
        lift: 'hover:-translate-y-1',
        glow: 'hover:shadow-lg hover:shadow-primary/20',
      },
      size: {
        sm: 'h-16',
        md: 'h-20',
        lg: 'h-24',
        xl: 'h-28',
      },
    },
    defaultVariants: {
      variant: 'default',
      hover: 'scale',
      size: 'md',
    },
  }
);

const logoImageVariants = cva(
  'max-w-full max-h-full object-contain',
  {
    variants: {
      filter: {
        none: '',
        grayscale: 'grayscale hover:grayscale-0 transition-all duration-300',
        opacity: 'opacity-60 hover:opacity-100 transition-opacity duration-300',
        blur: 'blur-sm hover:blur-0 transition-all duration-300',
      },
    },
    defaultVariants: {
      filter: 'grayscale',
    },
  }
);

export interface LogoItem {
  id: string;
  name: string;
  logo: string;
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface LogoWallProps extends VariantProps<typeof logoWallVariants> {
  logos: LogoItem[];
  title?: string;
  subtitle?: string;
  className?: string;
  itemClassName?: string;
  showTitle?: boolean;
  itemVariant?: VariantProps<typeof logoItemVariants>['variant'];
  itemHover?: VariantProps<typeof logoItemVariants>['hover'];
  itemSize?: VariantProps<typeof logoItemVariants>['size'];
  imageFilter?: VariantProps<typeof logoImageVariants>['filter'];
  onLogoClick?: (logo: LogoItem) => void;
  showCount?: boolean;
  maxLogos?: number;
}

export const LogoWall: React.FC<LogoWallProps> = ({
  logos,
  title = "Trusted by",
  subtitle,
  className,
  itemClassName,
  columns = 4,
  spacing = 'md',
  alignment = 'center',
  showTitle = true,
  itemVariant = 'default',
  itemHover = 'scale',
  itemSize = 'md',
  imageFilter = 'grayscale',
  onLogoClick,
  showCount = false,
  maxLogos,
  ...props
}) => {
  const displayLogos = maxLogos ? logos.slice(0, maxLogos) : logos;

  const handleLogoClick = (logo: LogoItem) => {
    if (logo.url) {
      window.open(logo.url, '_blank', 'noopener,noreferrer');
    }
    onLogoClick?.(logo);
  };

  return (
    <section className={cn('py-12 md:py-16', className)} {...props}>
      {showTitle && (
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground text-lg">
              {subtitle}
            </p>
          )}
          {showCount && (
            <p className="text-sm text-muted-foreground mt-2">
              {displayLogos.length} {displayLogos.length === 1 ? 'partner' : 'partners'}
            </p>
          )}
        </div>
      )}

      <div 
        className={cn(
          logoWallVariants({ 
            columns, 
            spacing, 
            alignment 
          })
        )}
      >
        {displayLogos.map((logo) => (
          <div
            key={logo.id}
            className={cn(
              logoItemVariants({ 
                variant: itemVariant, 
                hover: itemHover, 
                size: itemSize 
              }),
              itemClassName
            )}
            role={logo.url ? "link" : "img"}
            tabIndex={logo.url ? 0 : undefined}
            onClick={() => handleLogoClick(logo)}
            onKeyDown={(e) => {
              if (logo.url && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                handleLogoClick(logo);
              }
            }}
            aria-label={logo.url ? `Visit ${logo.name} website` : `Logo of ${logo.name}`}
            title={logo.name}
          >
            <img
              src={logo.logo}
              alt={logo.alt || `${logo.name} logo`}
              className={cn(logoImageVariants({ filter: imageFilter }))}
              width={logo.width}
              height={logo.height}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {maxLogos && logos.length > maxLogos && (
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            +{logos.length - maxLogos} more partners
          </p>
        </div>
      )}
    </section>
  );
};

export default LogoWall;
