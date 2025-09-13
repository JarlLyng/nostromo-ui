import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const avatarVariants = cva(
  [
    'relative flex shrink-0 overflow-hidden rounded-full',
    'bg-neutral-100 text-neutral-600',
    'transition-colors duration-200',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const avatarImageVariants = cva(
  'aspect-square h-full w-full object-cover'
);

const avatarFallbackVariants = cva(
  'flex h-full w-full items-center justify-center rounded-full bg-neutral-100 font-medium text-neutral-600',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const avatarFallbackInlineVariants = cva(
  'flex items-center justify-center rounded-full bg-neutral-100 font-medium text-neutral-600',
  {
    variants: {
      size: {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
}

export interface AvatarImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {}

export interface AvatarFallbackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarFallbackVariants> {
  children?: React.ReactNode;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, src, alt, fallback, children, ...props }, ref) => {
    // If using compound component API (has children), ignore src/fallback props
    if (children && !fallback) {
      return (
        <div
          ref={ref}
          className={cn(avatarVariants({ size }), className)}
          {...props}
        >
          {children}
        </div>
      );
    }

    // If using the old API (src/fallback props), render the old way
    if (src || fallback !== undefined) {
      const [imageError, setImageError] = React.useState(false);
      const [imageLoaded, setImageLoaded] = React.useState(false);

      const handleImageError = () => {
        setImageError(true);
      };

      const handleImageLoad = () => {
        setImageLoaded(true);
      };

      return (
        <div
          ref={ref}
          className={cn(avatarVariants({ size }), className)}
          {...props}
        >
          {src && !imageError && (
            <img
              src={src}
              alt={alt}
              className={avatarImageVariants()}
              onError={handleImageError}
              onLoad={handleImageLoad}
              style={{ display: imageLoaded ? 'block' : 'none' }}
            />
          )}
          {(imageError || !src || !imageLoaded) && (
            <div className={avatarFallbackInlineVariants({ size })}>
              {fallback || children || '?'}
            </div>
          )}
        </div>
      );
    }

    // If no children and no src/fallback, show default fallback
    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        {...props}
      >
        <div className={avatarFallbackInlineVariants({ size })}>?</div>
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, alt, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);
    const [imageLoaded, setImageLoaded] = React.useState(false);

    const handleImageError = () => {
      setImageError(true);
    };

    const handleImageLoad = () => {
      setImageLoaded(true);
    };

    if (imageError || !src) {
      return null;
    }

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn(avatarImageVariants(), className)}
        onError={handleImageError}
        onLoad={handleImageLoad}
        style={{ display: imageLoaded ? 'block' : 'none' }}
        {...props}
      />
    );
  }
);
AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(avatarFallbackVariants({ size }), className)}
        {...props}
      >
        {children || '?'}
      </div>
    );
  }
);
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback, avatarVariants };
