import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

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
        outline:
          "border-2 border-border shadow-sm hover:border-primary hover:shadow-avatar",
        filled: "bg-muted shadow-sm hover:shadow-avatar",
        interactive:
          "shadow-avatar hover:shadow-avatar-hover cursor-pointer hover:scale-105",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  },
);

export interface AvatarProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
}

const AvatarComponent = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    { className, size, variant, src, alt, fallback, children, ...props },
    ref,
  ) => {
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
          <div className="flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
            {fallback}
          </div>
        )}
      </div>
    );
  },
);
AvatarComponent.displayName = "Avatar";

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
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";

// Memoize Avatar for performance optimization (after all subcomponents are defined)
const Avatar = React.memo(AvatarComponent) as any as typeof AvatarComponent & {
  Image: typeof AvatarImage;
  Fallback: typeof AvatarFallback;
};

// Attach subcomponents to Avatar for compound component pattern
Avatar.Image = AvatarImage;
Avatar.Fallback = AvatarFallback;

export { Avatar, AvatarImage, AvatarFallback, avatarVariants };
