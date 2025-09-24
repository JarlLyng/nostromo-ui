import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { CaretRight, House } from "phosphor-react";

const breadcrumbVariants = cva(
  "flex items-center space-x-1 text-sm text-muted-foreground",
  {
    variants: {
      variant: {
        default: "text-muted-foreground",
        compact: "text-xs",
      },
      separator: {
        default: "",
        slash: "",
        arrow: "",
        dot: "",
      },
    },
    defaultVariants: {
      variant: "default",
      separator: "default",
    },
  }
);

const breadcrumbItemVariants = cva(
  "flex items-center",
  {
    variants: {
      variant: {
        default: "",
        current: "text-foreground font-medium",
        link: "hover:text-foreground transition-colors",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const breadcrumbSeparatorVariants = cva(
  "flex-shrink-0 text-muted-foreground",
  {
    variants: {
      variant: {
        default: "mx-1",
        compact: "mx-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BreadcrumbEntry {
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbVariants> {
  items: BreadcrumbEntry[];
  separator?: "default" | "slash" | "arrow" | "dot";
  showHome?: boolean;
  homeHref?: string;
  onItemClick?: (item: BreadcrumbEntry, index: number) => void;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      className,
      variant,
      separator = "default",
      items,
      showHome = false,
      homeHref = "/",
      onItemClick,
      ...props
    },
    ref
  ) => {
    const getSeparator = () => {
      switch (separator) {
        case "slash":
          return "/";
        case "arrow":
          return "→";
        case "dot":
          return "•";
        default:
          return <CaretRight className="h-4 w-4" />;
      }
    };

    const handleItemClick = (item: BreadcrumbEntry, index: number) => {
      if (onItemClick) {
        onItemClick(item, index);
      }
    };

    const renderItem = (item: BreadcrumbEntry, index: number, isLast: boolean) => {
      const isCurrent = item.current || isLast;
      const itemContent = (
        <span
          className={cn(
            breadcrumbItemVariants({
              variant: isCurrent ? "current" : item.href ? "link" : "default",
            })
          )}
        >
          {item.label}
        </span>
      );

      if (item.href && !isCurrent) {
        return (
          <a
            href={item.href}
            className="hover:text-foreground transition-colors"
            onClick={() => handleItemClick(item, index)}
          >
            {itemContent}
          </a>
        );
      }

      if (item.href && isCurrent) {
        return (
          <a
            href={item.href}
            aria-current="page"
            aria-disabled="true"
            tabIndex={-1}
            className="hover:text-foreground transition-colors pointer-events-none"
          >
            {itemContent}
          </a>
        );
      }

      return (
        <span
          aria-current={isCurrent ? "page" : undefined}
          className={isCurrent ? "text-foreground font-medium" : ""}
        >
          {itemContent}
        </span>
      );
    };

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn(breadcrumbVariants({ variant, separator }), className)}
        {...props}
      >
        <ol className="flex items-center space-x-1">
          {showHome && (
            <>
              <li>
                <a
                  href={homeHref}
                  className="hover:text-foreground transition-colors"
                  aria-label="Home"
                >
                  <House className="h-4 w-4" />
                </a>
              </li>
              <li>
                <span role="presentation" aria-hidden="true" className={cn(breadcrumbSeparatorVariants({ variant }))}>
                  {getSeparator()}
                </span>
              </li>
            </>
          )}
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center">
                {renderItem(item, index, isLast)}
                {!isLast && (
                  <span role="presentation" aria-hidden="true" className={cn(breadcrumbSeparatorVariants({ variant }))}>
                    {getSeparator()}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);
Breadcrumb.displayName = "Breadcrumb";

// Individual components for more flexibility
const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn("flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5", className)}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : "a";
  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <span className="sr-only">More</span>
    <span>⋯</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  breadcrumbVariants,
  breadcrumbItemVariants,
  breadcrumbSeparatorVariants,
};
