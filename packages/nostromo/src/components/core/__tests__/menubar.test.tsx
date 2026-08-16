import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "../menubar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../navigation-menu";
import { menuItem, menuSurface } from "../menu-styles";

function MenubarExample({ onNew }: { onNew?: () => void }) {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onSelect={onNew}>
            New
            <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem destructive>Delete</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

describe("Menubar", () => {
  it("renders its triggers without opening anything", () => {
    render(<MenubarExample />);
    expect(screen.getByText("File")).toBeInTheDocument();
    expect(screen.queryByText("New")).not.toBeInTheDocument();
  });

  it("opens a menu from its trigger", async () => {
    const user = userEvent.setup();
    render(<MenubarExample />);

    await user.click(screen.getByText("File"));
    expect(await screen.findByText("New")).toBeInTheDocument();
  });

  it("runs an item's action", async () => {
    const onNew = vi.fn();
    const user = userEvent.setup();
    render(<MenubarExample onNew={onNew} />);

    await user.click(screen.getByText("File"));
    await user.click(await screen.findByText("New"));
    expect(onNew).toHaveBeenCalledTimes(1);
  });

  // The reason this is not a row of DropdownMenus: the bar behaves as one
  // control, so once a menu is open, moving the pointer to a neighbouring
  // trigger switches to it without a click. Verified that it is hover and not
  // click that does this - a click on the sibling closes the open menu instead.
  it("switches menus on hover, without a click", async () => {
    const user = userEvent.setup();
    render(<MenubarExample />);

    await user.click(screen.getByText("File"));
    await screen.findByText("New");

    await user.hover(screen.getByText("Edit"));
    expect(await screen.findByText("Undo")).toBeInTheDocument();
    expect(screen.queryByText("New")).not.toBeInTheDocument();
  });

  // Third component reading from menu-styles, after DropdownMenu and
  // ContextMenu. All three must look like the same menu.
  it("draws from the shared menu styling", async () => {
    const user = userEvent.setup();
    render(<MenubarExample />);

    await user.click(screen.getByText("File"));
    const item = await screen.findByText("New");
    expect(item.className).toContain(menuItem.split(" ")[0]!);
    expect(item.closest("[role='menu']")?.className).toContain(
      menuSurface.split(" ")[0]!,
    );
  });

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    render(<MenubarExample />);
    await user.click(screen.getByText("File"));
    await screen.findByText("New");

    const results = await axe(document.body, {
      rules: { region: { enabled: false } },
    });
    expect(results.violations).toHaveLength(0);
  });
});

function NavExample() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="#components">
              Components
            </NavigationMenuLink>
            <NavigationMenuLink href="#themes">Themes</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#pricing">Pricing</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

describe("NavigationMenu", () => {
  // Not a menu, despite the name. It is a nav full of links, and a screen reader
  // should get a navigation landmark rather than a menu to act on.
  it("is a navigation landmark, not a menu", () => {
    render(<NavExample />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("renders top-level links without opening a panel", () => {
    render(<NavExample />);
    expect(screen.getByRole("link", { name: "Pricing" })).toBeInTheDocument();
    expect(screen.queryByText("Components")).not.toBeInTheDocument();
  });

  it("opens a panel from its trigger", async () => {
    const user = userEvent.setup();
    render(<NavExample />);

    await user.click(screen.getByText("Products"));
    expect(
      await screen.findByRole("link", { name: "Components" }),
    ).toBeInTheDocument();
  });

  it("marks the trigger's expanded state", async () => {
    const user = userEvent.setup();
    render(<NavExample />);
    const trigger = screen.getByText("Products");

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("has no accessibility violations with a panel open", async () => {
    const user = userEvent.setup();
    render(<NavExample />);
    await user.click(screen.getByText("Products"));
    await screen.findByRole("link", { name: "Components" });

    const results = await axe(document.body, {
      rules: { region: { enabled: false } },
    });
    expect(results.violations).toHaveLength(0);
  });
});
