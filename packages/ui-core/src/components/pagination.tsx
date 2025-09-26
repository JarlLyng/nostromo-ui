import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { CaretLeft, CaretRight, DotsThree } from "phosphor-react";

const paginationVariants = cva(
  "flex items-center justify-center space-x-1",
  {
    variants: {
      variant: {
        default: "",
        compact: "space-x-0.5",
      },
      size: {
        default: "h-9",
        sm: "h-8",
        lg: "h-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const paginationItemVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 w-9",
        sm: "h-8 w-8 text-xs",
        lg: "h-10 w-10",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface PaginationProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof paginationVariants> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
  disabled?: boolean;
}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      className,
      currentPage,
      totalPages,
      onPageChange,
      showFirstLast = true,
      showPrevNext = true,
      maxVisiblePages = 5,
      disabled = false,
      variant,
      size,
      ...props
    },
    ref
  ) => {
    const handlePageChange = (page: number) => {
      if (disabled || page < 1 || page > totalPages || page === currentPage) {
        return;
      }
      onPageChange(page);
    };

    const getVisiblePages = () => {
      if (totalPages <= maxVisiblePages) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      const half = Math.floor(maxVisiblePages / 2);
      let start = Math.max(1, currentPage - half);
      let end = Math.min(totalPages, start + maxVisiblePages - 1);

      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const visiblePages = getVisiblePages();
    const showStartEllipsis = visiblePages[0]! > 1;
    const showEndEllipsis = visiblePages[visiblePages.length - 1]! < totalPages;

    return (
      <nav
        ref={ref}
        aria-label="Pagination"
        className={cn(paginationVariants({ variant, size }), className)}
        {...props}
      >
        <ul className="flex items-center space-x-1">
          {showFirstLast && (
            <li>
              <button
                onClick={() => handlePageChange(1)}
                disabled={disabled || currentPage === 1}
                className={cn(paginationItemVariants({ variant: "outline", size }))}
                aria-label="Go to first page"
              >
                <span className="sr-only">First</span>
                <CaretLeft className="h-4 w-4" />
                <CaretLeft className="h-4 w-4 -ml-1" />
              </button>
            </li>
          )}

          {showPrevNext && (
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={disabled || currentPage === 1}
                className={cn(paginationItemVariants({ variant: "outline", size }))}
                aria-label="Go to previous page"
              >
                <span className="sr-only">Previous</span>
                <CaretLeft className="h-4 w-4" />
              </button>
            </li>
          )}

          {showStartEllipsis && (
            <li>
              <span className="flex items-center justify-center h-9 w-9 text-sm text-muted-foreground">
                <DotsThree className="h-4 w-4" />
                <span className="sr-only">More pages before</span>
              </span>
            </li>
          )}

          {visiblePages.map((page) => (
            <li key={page}>
              <button
                onClick={() => handlePageChange(page)}
                disabled={disabled}
                className={cn(
                  paginationItemVariants({
                    variant: page === currentPage ? "default" : "outline",
                    size,
                  }),
                  page === currentPage && "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
                aria-label={`Go to page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            </li>
          ))}

          {showEndEllipsis && (
            <li>
              <span className="flex items-center justify-center h-9 w-9 text-sm text-muted-foreground">
                <DotsThree className="h-4 w-4" />
                <span className="sr-only">More pages after</span>
              </span>
            </li>
          )}

          {showPrevNext && (
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={disabled || currentPage === totalPages}
                className={cn(paginationItemVariants({ variant: "outline", size }))}
                aria-label="Go to next page"
              >
                <span className="sr-only">Next</span>
                <CaretRight className="h-4 w-4" />
              </button>
            </li>
          )}

          {showFirstLast && (
            <li>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={disabled || currentPage === totalPages}
                className={cn(paginationItemVariants({ variant: "outline", size }))}
                aria-label="Go to last page"
              >
                <span className="sr-only">Last</span>
                <CaretRight className="h-4 w-4" />
                <CaretRight className="h-4 w-4 -ml-1" />
              </button>
            </li>
          )}
        </ul>
      </nav>
    );
  }
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentPropsWithoutRef<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

const PaginationLink = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button"> & {
    isActive?: boolean;
  }
>(({ className, isActive, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      paginationItemVariants({
        variant: isActive ? "default" : "outline",
        size: "default",
      }),
      isActive && "bg-primary text-primary-foreground hover:bg-primary/90",
      className
    )}
    aria-current={isActive ? "page" : undefined}
    {...props}
  />
));
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(paginationItemVariants({ variant: "outline", size: "default" }), className)}
    aria-label="Go to previous page"
    {...props}
  >
    <CaretLeft className="h-4 w-4" />
    <span className="sr-only">Previous</span>
  </button>
));
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(paginationItemVariants({ variant: "outline", size: "default" }), className)}
    aria-label="Go to next page"
    {...props}
  >
    <CaretRight className="h-4 w-4" />
    <span className="sr-only">Next</span>
  </button>
));
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <DotsThree className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
));
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  paginationVariants,
  paginationItemVariants,
};
