import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Sidebar as SidebarIcon } from "phosphor-react";

import { useIsMobile } from "../../hooks/use-is-mobile";
import { cn } from "../../lib/utils";
import { Input } from "./input";
import { Separator } from "./separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./sheet";
import { Skeleton } from "./skeleton";
import { Tooltip } from "./tooltip";

/**
 * An application sidebar: a collapsible navigation column, with a phone form and
 * a desktop form.
 *
 * The largest component here, and mostly layout. Three things are worth reading
 * before using it.
 *
 * ## The phone form is a different tree, not different classes
 *
 * Below 768px a `Sidebar` is a `Sheet` - a modal panel over the page. Above it,
 * a fixed column beside the page. Those are different elements with different
 * semantics, so the branch is in JS (`useIsMobile`) rather than in CSS. It also
 * means the open state is two states: `open` for the column, `openMobile` for the
 * sheet, and `toggleSidebar` picks the one that applies.
 *
 * ## State goes in a cookie, and the server has to read it
 *
 * Collapsing the sidebar writes `sidebar_state`. That is what stops it flashing
 * open on every navigation in a server-rendered app - but only if the server
 * passes it back in as `defaultOpen`. Nothing here can do that for you; read the
 * cookie in your layout. Left alone, the cookie is written and never read, and
 * the sidebar starts expanded every time.
 *
 * ## Sidebar colours are their own token family
 *
 * `bg-sidebar`, `text-sidebar-foreground`, `border-sidebar-border`,
 * `bg-sidebar-accent` and `ring-sidebar-ring`, so a sidebar can be a different
 * surface from a card. Every theme defaults them to that theme's card, accent,
 * border and ring, so nothing changes until you override them.
 *
 * ## Tailwind 4.0 syntax only
 *
 * The package declares `tailwindcss ^4.0.0`, so the classes below stick to what
 * 4.0 understands: `w-[var(--sidebar-width)]` rather than the 4.1 shorthand
 * `w-(--sidebar-width)`, and literal lengths rather than `--spacing()`.
 * A consumer on 4.0 would otherwise get a sidebar with no width.
 */

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

interface SidebarContextValue {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar(): SidebarContextValue {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used inside a <SidebarProvider>.");
  }
  return context;
}

export interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the desktop sidebar starts expanded.
   *
   * Pass the `sidebar_state` cookie's value here on the server, or the sidebar
   * will flash open on every page load for anyone who collapsed it.
   */
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * Install the ⌘B / Ctrl+B shortcut. Defaults to true. Turn it off if the key
   * is already taken by something in your app.
   */
  keyboardShortcut?: boolean;
}

const SidebarProvider = React.forwardRef<HTMLDivElement, SidebarProviderProps>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange,
      keyboardShortcut = true,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
    const open = openProp ?? uncontrolledOpen;

    const setOpen = React.useCallback(
      (value: boolean | ((current: boolean) => boolean)) => {
        const next = typeof value === "function" ? value(open) : value;
        if (openProp === undefined) setUncontrolledOpen(next);
        onOpenChange?.(next);
        // Persisted so a server-rendered app can render the right width on the
        // first paint. It is only useful if the server reads it back.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${next}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}; SameSite=Lax`;
      },
      [open, openProp, onOpenChange],
    );

    const toggleSidebar = React.useCallback(() => {
      if (isMobile) setOpenMobile((current) => !current);
      else setOpen((current) => !current);
    }, [isMobile, setOpen]);

    React.useEffect(() => {
      if (!keyboardShortcut) return;
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault();
          toggleSidebar();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [keyboardShortcut, toggleSidebar]);

    const state = open ? "expanded" : "collapsed";

    const value = React.useMemo<SidebarContextValue>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, toggleSidebar],
    );

    return (
      <SidebarContext.Provider value={value}>
        <div
          ref={ref}
          data-slot="sidebar-wrapper"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    );
  },
);
SidebarProvider.displayName = "SidebarProvider";

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  /**
   * What collapsing does. `offcanvas` slides it off the edge, `icon` shrinks it
   * to a strip of icons, `none` makes it a plain fixed column.
   */
  collapsible?: "offcanvas" | "icon" | "none";
  /** Accessible name for the phone sheet. */
  title?: string;
  /** Description for the phone sheet, announced after the title. */
  description?: string;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      title = "Sidebar",
      description = "Site navigation",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === "none") {
      return (
        <div
          ref={ref}
          data-slot="sidebar"
          className={cn(
            "flex h-full w-[var(--sidebar-width)] flex-col bg-sidebar text-sidebar-foreground",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      );
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetContent
            ref={ref}
            data-sidebar="sidebar"
            data-slot="sidebar"
            data-mobile="true"
            side={side}
            className="w-[var(--sidebar-width)] bg-sidebar p-0 text-sidebar-foreground"
            style={
              { "--sidebar-width": SIDEBAR_WIDTH_MOBILE } as React.CSSProperties
            }
          >
            {/* A sidebar has no visible heading, and a dialog with no name is
                announced as "dialog". Hidden rather than absent. */}
            <SheetHeader className="sr-only">
              <SheetTitle>{title}</SheetTitle>
              <SheetDescription>{description}</SheetDescription>
            </SheetHeader>
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <div
        ref={ref}
        className="group peer hidden text-sidebar-foreground md:block"
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
        data-slot="sidebar"
      >
        {/* Holds the space the fixed column occupies, so the page content is not
            underneath it. The column itself is position: fixed and takes no
            room. */}
        <div
          data-slot="sidebar-gap"
          className={cn(
            "relative w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear",
            "group-data-[collapsible=offcanvas]:w-0",
            "group-data-[side=right]:rotate-180",
            variant === "floating" || variant === "inset"
              ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem)]"
              : "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]",
          )}
        />
        <div
          data-slot="sidebar-container"
          className={cn(
            "fixed inset-y-0 z-10 hidden h-svh w-[var(--sidebar-width)] transition-[left,right,width] duration-200 ease-linear md:flex",
            side === "left"
              ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
              : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
            variant === "floating" || variant === "inset"
              ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem+2px)]"
              : "group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[side=left]:border-r group-data-[side=right]:border-l group-data-[side=left]:border-sidebar-border group-data-[side=right]:border-sidebar-border",
            className,
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            data-slot="sidebar-inner"
            className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-md"
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);
Sidebar.displayName = "Sidebar";

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { label?: string }
>(({ className, onClick, label = "Toggle sidebar", ...props }, ref) => {
  const { toggleSidebar, open, isMobile, openMobile } = useSidebar();
  return (
    <button
      ref={ref}
      type="button"
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      // Announces the state, not just the action, so a screen reader user knows
      // whether pressing it opens or closes.
      aria-expanded={isMobile ? openMobile : open}
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-md text-sidebar-foreground transition-colors",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) toggleSidebar();
      }}
      {...props}
    >
      <SidebarIcon className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

/**
 * The thin strip along the sidebar's edge that toggles it.
 *
 * `tabIndex={-1}` on purpose: it does the same thing as `SidebarTrigger`, and two
 * tab stops for one action is worse than one. It is a mouse shortcut, and the
 * button is the keyboard route.
 */
const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { label?: string }
>(({ className, label = "Toggle sidebar", ...props }, ref) => {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      ref={ref}
      type="button"
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label={label}
      title={label}
      tabIndex={-1}
      onClick={toggleSidebar}
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear sm:flex",
        "group-data-[side=left]:-right-4 group-data-[side=right]:left-0",
        "after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border",
        "group-data-[side=left]:cursor-w-resize group-data-[side=right]:cursor-e-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar",
        className,
      )}
      {...props}
    />
  );
});
SidebarRail.displayName = "SidebarRail";

/** The page beside the sidebar. A `<main>`, so it is a landmark. */
const SidebarInset = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <main
    ref={ref}
    data-slot="sidebar-inset"
    className={cn(
      "relative flex w-full flex-1 flex-col bg-background",
      "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-md",
      "md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
      className,
    )}
    {...props}
  />
));
SidebarInset.displayName = "SidebarInset";

const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentPropsWithoutRef<typeof Input>
>(({ className, ...props }, ref) => (
  <Input
    ref={ref}
    data-sidebar="input"
    className={cn("h-8 w-full bg-background shadow-none", className)}
    {...props}
  />
));
SidebarInput.displayName = "SidebarInput";

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="header"
    className={cn("flex flex-col gap-2 p-2", className)}
    {...props}
  />
));
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="footer"
    className={cn("mt-auto flex flex-col gap-2 p-2", className)}
    {...props}
  />
));
SidebarFooter.displayName = "SidebarFooter";

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator
    ref={ref}
    data-sidebar="separator"
    className={cn("mx-2 w-auto bg-sidebar-border", className)}
    {...props}
  />
));
SidebarSeparator.displayName = "SidebarSeparator";

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="content"
    className={cn(
      "flex min-h-0 flex-1 flex-col gap-2 overflow-auto",
      // Hidden rather than scrolled when the sidebar is a strip of icons: a
      // scrollbar in a 3rem column is not usable.
      "group-data-[collapsible=icon]:overflow-hidden",
      className,
    )}
    {...props}
  />
));
SidebarContent.displayName = "SidebarContent";

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group"
    className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
    {...props}
  />
));
SidebarGroup.displayName = "SidebarGroup";

export interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  SidebarGroupLabelProps
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 transition-[margin,opacity] duration-200 ease-linear",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        "[&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className,
      )}
      {...props}
    />
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

export interface SidebarGroupActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  SidebarGroupActionProps
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground transition-transform",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        "[&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0",
        // A 20px target is under the 24px minimum, so the hit area is grown
        // where there is no cursor to aim with.
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarGroupAction.displayName = "SidebarGroupAction";

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("w-full text-sm", className)}
    {...props}
  />
));
SidebarGroupContent.displayName = "SidebarGroupContent";

/** The navigation list. A real `<ul>`, so it is announced with a length. */
const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn("flex w-full min-w-0 flex-col gap-1", className)}
    {...props}
  />
));
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("group/menu-item relative", className)}
    {...props}
  />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm transition-[width,height,padding] " +
    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring " +
    "active:bg-sidebar-accent active:text-sidebar-accent-foreground " +
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 " +
    "data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground " +
    "data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground " +
    "group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 " +
    "group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 " +
    "[&>span:last-child]:truncate [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--nostromo-color-sidebar-border))] hover:shadow-[0_0_0_1px_hsl(var(--nostromo-color-sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface SidebarMenuButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean;
  /**
   * Marks the current page. Sets `data-active`, and `aria-current="page"` -
   * highlighting the current item is not the same as telling a screen reader
   * which one it is.
   */
  isActive?: boolean;
  /**
   * Label to show while the sidebar is collapsed to icons, where the text is
   * hidden. Ignored when it is expanded, and on a phone where it is never
   * collapsed.
   */
  tooltip?: string;
}

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(
  (
    {
      asChild = false,
      isActive = false,
      variant,
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref,
  ) => {
    const { isMobile, state } = useSidebar();
    const Comp = asChild ? Slot : "button";

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        aria-current={isActive ? "page" : undefined}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    );

    // Only useful when the label is hidden. A tooltip repeating text that is
    // already on screen is noise.
    if (!tooltip || state !== "collapsed" || isMobile) return button;

    return (
      <Tooltip content={tooltip} placement="right">
        {button}
      </Tooltip>
    );
  },
);
SidebarMenuButton.displayName = "SidebarMenuButton";

export interface SidebarMenuActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  /** Only show it on hover or focus within the item. */
  showOnHover?: boolean;
}

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuActionProps
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground transition-transform",
        "peer-hover/menu-button:text-sidebar-accent-foreground",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        "[&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0",
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        // Focus-within as well as hover, or it would be unreachable by keyboard.
        showOnHover &&
          "md:opacity-0 group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";

const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground",
      "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      className,
    )}
    {...props}
  />
));
SidebarMenuBadge.displayName = "SidebarMenuBadge";

export interface SidebarMenuSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  showIcon?: boolean;
  /**
   * Width of the text bar, as a percentage between 40 and 90.
   *
   * Varying it makes a loading list look like a list of names rather than a
   * stack of identical bars. Left out, it is derived from React's own id for
   * this element, which is stable between the server and the client - shadcn's
   * version calls Math.random() here, which renders one width on the server and
   * a different one on the client and so trips hydration.
   */
  width?: number;
}

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  SidebarMenuSkeletonProps
>(({ className, showIcon = false, width, ...props }, ref) => {
  const id = React.useId();
  const derived = React.useMemo(() => {
    if (width !== undefined) return width;
    let hash = 0;
    for (let i = 0; i < id.length; i++)
      hash = (hash * 31 + id.charCodeAt(i)) | 0;
    return 40 + (Math.abs(hash) % 51);
  }, [id, width]);

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && <Skeleton className="h-4 w-4 shrink-0 rounded-md" />}
      {/* Width through Skeleton's own prop rather than a style: it does not take
          arbitrary DOM attributes. */}
      <Skeleton className="h-4" width={`${derived}%`} />
    </div>
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
      "group-data-[collapsible=icon]:hidden",
      className,
    )}
    {...props}
  />
));
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-sub-item"
    className={cn("group/menu-sub-item relative", className)}
    {...props}
  />
));
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

export interface SidebarMenuSubButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
  size?: "sm" | "md";
  isActive?: boolean;
}

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  SidebarMenuSubButtonProps
>(
  (
    { asChild = false, size = "md", isActive = false, className, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "a";
    return (
      <Comp
        ref={ref}
        data-sidebar="menu-sub-button"
        data-size={size}
        data-active={isActive}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground",
          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
          "active:bg-sidebar-accent active:text-sidebar-accent-foreground",
          "aria-disabled:pointer-events-none aria-disabled:opacity-50",
          "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
          "[&>span:last-child]:truncate [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0",
          size === "sm" && "text-xs",
          size === "md" && "text-sm",
          "group-data-[collapsible=icon]:hidden",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarRail,
  SidebarInset,
  SidebarInput,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  sidebarMenuButtonVariants,
  useSidebar,
};
