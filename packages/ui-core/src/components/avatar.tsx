import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full transition-all duration-200 shadow-avatar hover:shadow-avatar-hover",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        default: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
      },
      variant: {
        default: "shadow-avatar hover:shadow-avatar-hover",
        elevated: "shadow-lg hover:shadow-xl",
        outline: "border-2 border-neutral-300 shadow-sm hover:border-brand-500 hover:shadow-avatar",
        filled: "bg-neutral-100 shadow-sm hover:shadow-avatar",
        interactive: "shadow-avatar hover:shadow-avatar-hover cursor-pointer hover:scale-105",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
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

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, variant, src, alt, fallback, children, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);
    
    // Reset image error when src changes
    React.useEffect(() => {
      setImageError(false);
    }, [src]);
    
    // If using compound component API (children), render children
    if (children) {
      return (
        <div
          ref={ref}
          className={cn(avatarVariants({ size, variant }), className)}
          {...props}
        >
          {children}
        </div>
      );
    }
    
    // If using simple prop API
    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, variant }), className)}
        {...props}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt}
            className="aspect-square h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-neutral-100 text-sm font-medium text-neutral-600">
            {fallback}
          </div>
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-neutral-100 text-sm font-medium text-neutral-600",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback, avatarVariants };
