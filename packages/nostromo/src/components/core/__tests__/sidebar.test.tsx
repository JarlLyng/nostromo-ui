import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { axe } from "jest-axe";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "../sidebar";
import { MOBILE_BREAKPOINT } from "../../../hooks/use-is-mobile";

/**
 * The shared test setup mocks matchMedia with `matches: false`, which means every
 * test here is a desktop unless it says otherwise. `viewport()` replaces the mock
 * with one that answers a max-width query honestly, which is how the phone branch
 * gets exercised.
 */
type Listener = () => void;
const listeners = new Set<Listener>();

function viewport(width: number) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: (query: string) => {
      const max = /max-width:\s*(\d+)px/.exec(query);
      return {
        matches: max ? width <= Number(max[1]) : false,
        media: query,
        onchange: null,
        addEventListener: (_: string, fn: Listener) => listeners.add(fn),
        removeEventListener: (_: string, fn: Listener) => listeners.delete(fn),
        addListener: (fn: Listener) => listeners.add(fn),
        removeListener: (fn: Listener) => listeners.delete(fn),
        dispatchEvent: () => false,
      };
    },
  });
}

beforeEach(() => {
  listeners.clear();
  document.cookie = "sidebar_state=; path=/; max-age=0";
});
afterEach(() => {
  viewport(1280);
});

function Layout({
  collapsible,
  ...props
}: {
  collapsible?: "offcanvas" | "icon" | "none";
} & React.ComponentProps<typeof SidebarProvider>) {
  return (
    <SidebarProvider {...props}>
      <Sidebar collapsible={collapsible}>
        <SidebarHeader>
          <span>Acme</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive tooltip="Home">
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Inbox">
                  <span>Inbox</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarRail />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        {/* The trigger belongs beside the sidebar, not inside it: on a phone the
            sidebar is a closed dialog and anything in it is unrendered, so a
            trigger in there could never be reached. */}
        <SidebarTrigger />
        <p>Page content</p>
      </SidebarInset>
    </SidebarProvider>
  );
}

const shell = () => document.querySelector('[data-slot="sidebar"]');

/**
 * By slot, not by name: `SidebarRail` deliberately carries the same accessible
 * name as the trigger, because it is the same action.
 */
const trigger = () =>
  document.querySelector('[data-slot="sidebar-trigger"]') as HTMLElement;

describe("Sidebar", () => {
  it("renders the navigation and the page beside it", () => {
    render(<Layout />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveTextContent("Page content");
  });

  it("starts expanded, and collapses from the trigger", async () => {
    const user = userEvent.setup();
    render(<Layout />);
    expect(shell()).toHaveAttribute("data-state", "expanded");

    await user.click(trigger());
    expect(shell()).toHaveAttribute("data-state", "collapsed");
  });

  // Highlighting the active item is not the same as telling a screen reader
  // which one it is.
  it("marks the active item for a screen reader too", () => {
    render(<Layout />);
    const active = screen.getByText("Home").closest("button")!;
    expect(active).toHaveAttribute("data-active", "true");
    expect(active).toHaveAttribute("aria-current", "page");

    const other = screen.getByText("Inbox").closest("button")!;
    expect(other).toHaveAttribute("data-active", "false");
    expect(other).not.toHaveAttribute("aria-current");
  });

  it("says whether the trigger opens or closes", async () => {
    const user = userEvent.setup();
    render(<Layout />);
    const button = trigger();
    expect(button).toHaveAttribute("aria-expanded", "true");

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("takes defaultOpen, so a server can render it collapsed", () => {
    render(<Layout defaultOpen={false} />);
    expect(shell()).toHaveAttribute("data-state", "collapsed");
    expect(shell()).toHaveAttribute("data-collapsible", "offcanvas");
  });

  it("works controlled", async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    render(<Layout open onOpenChange={onOpenChange} />);

    await user.click(trigger());
    expect(onOpenChange).toHaveBeenCalledWith(false);
    // Still open: the parent owns the state and has not changed it.
    expect(shell()).toHaveAttribute("data-state", "expanded");
  });

  // The cookie is the whole point of defaultOpen. If it stopped being written,
  // a server-rendered app would flash the sidebar open on every navigation and
  // nothing else would fail.
  it("writes the state to a cookie", async () => {
    const user = userEvent.setup();
    render(<Layout />);
    expect(document.cookie).not.toContain("sidebar_state=false");

    await user.click(trigger());
    expect(document.cookie).toContain("sidebar_state=false");

    await user.click(trigger());
    expect(document.cookie).toContain("sidebar_state=true");
  });

  it("toggles on the keyboard shortcut, and gives it up on request", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Layout />);
    await user.keyboard("{Meta>}b{/Meta}");
    expect(shell()).toHaveAttribute("data-state", "collapsed");
    unmount();

    render(<Layout keyboardShortcut={false} />);
    await user.keyboard("{Meta>}b{/Meta}");
    expect(shell()).toHaveAttribute("data-state", "expanded");
  });

  // Two tab stops for one action is worse than one, so the rail is a pointer
  // shortcut and the trigger is the keyboard route.
  it("keeps the rail out of the tab order but names it", () => {
    render(<Layout />);
    const rail = document.querySelector('[data-slot="sidebar-rail"]')!;
    expect(rail).toHaveAttribute("tabindex", "-1");
    expect(rail).toHaveAttribute("aria-label", "Toggle sidebar");
  });

  it("collapses to a plain column when collapsible is none", () => {
    render(<Layout collapsible="none" />);
    const el = shell()!;
    expect(el).not.toHaveAttribute("data-state");
    expect(document.querySelector('[data-slot="sidebar-gap"]')).toBeNull();
  });

  it("throws when a part is used outside a provider", () => {
    function Orphan() {
      useSidebar();
      return null;
    }
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Orphan />)).toThrow(
      /must be used inside a <SidebarProvider>/,
    );
    spy.mockRestore();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Layout />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});

describe("Sidebar on a phone", () => {
  beforeEach(() => viewport(375));

  // A different tree, not different classes: a modal Sheet rather than a fixed
  // column. That is why the branch is in JS.
  it("becomes a dialog, closed to begin with", async () => {
    const user = userEvent.setup();
    render(<Layout />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.querySelector('[data-slot="sidebar-gap"]')).toBeNull();

    await user.click(trigger());
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAttribute("data-mobile", "true");
  });

  // A sidebar has no visible heading, so without a hidden title the sheet is
  // announced as "dialog" and nothing else.
  it("names the sheet, hidden", async () => {
    const user = userEvent.setup();
    render(<Layout />);
    await user.click(trigger());

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAccessibleName("Sidebar");
    expect(screen.getByText("Sidebar").parentElement).toHaveClass("sr-only");
  });

  it("takes a title and description of its own", async () => {
    const user = userEvent.setup();
    render(
      <SidebarProvider>
        <Sidebar title="Navigation" description="Hovedmenu">
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarTrigger />
      </SidebarProvider>,
    );
    await user.click(trigger());
    expect(await screen.findByRole("dialog")).toHaveAccessibleName(
      "Navigation",
    );
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<Layout />);
    await user.click(trigger());
    await screen.findByRole("dialog");

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  // The desktop cookie is about the column's width, which does not exist here.
  it("does not write the desktop cookie when toggling the sheet", async () => {
    const user = userEvent.setup();
    render(<Layout />);
    await user.click(trigger());
    await screen.findByRole("dialog");
    expect(document.cookie).not.toContain("sidebar_state=");
  });

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    const { container } = render(<Layout />);
    await user.click(trigger());
    await screen.findByRole("dialog");

    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});

describe("SidebarMenuSkeleton", () => {
  // shadcn calls Math.random() for the width, which renders one number on the
  // server and a different one on the client. This has to be stable.
  it("picks a width that does not change between renders", () => {
    const { container, rerender } = render(<SidebarMenuSkeleton />);
    const read = () =>
      (container
        .querySelector('[data-sidebar="menu-skeleton"] > div')
        ?.getAttribute("style") ?? "") as string;
    const first = read();
    expect(first).toMatch(/width:\s*\d+%/);

    rerender(<SidebarMenuSkeleton />);
    expect(read()).toBe(first);
  });

  it("takes an explicit width", () => {
    const { container } = render(<SidebarMenuSkeleton width={75} />);
    expect(
      container.querySelector('[data-sidebar="menu-skeleton"] > div'),
    ).toHaveStyle({ width: "75%" });
  });

  it("draws an icon placeholder only when asked", () => {
    const { container, unmount } = render(<SidebarMenuSkeleton showIcon />);
    expect(
      container.querySelectorAll('[data-sidebar="menu-skeleton"] > div'),
    ).toHaveLength(2);
    unmount();

    const second = render(<SidebarMenuSkeleton />);
    expect(
      second.container.querySelectorAll('[data-sidebar="menu-skeleton"] > div'),
    ).toHaveLength(1);
  });
});

describe("MOBILE_BREAKPOINT", () => {
  // The JS branch and the md: classes have to agree about where the break is.
  it("matches Tailwind's md", () => {
    expect(MOBILE_BREAKPOINT).toBe(768);
  });
});
