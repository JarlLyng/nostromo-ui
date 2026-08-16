import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../context-menu";
import { menuItem, menuSurface } from "../menu-styles";

function Example({ onDelete }: { onDelete?: () => void }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>Right click me</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>File</ContextMenuLabel>
        <ContextMenuItem>Open</ContextMenuItem>
        <ContextMenuItem disabled>Rename</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem destructive onSelect={onDelete}>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

/** Radix opens on contextmenu, which userEvent does not have a verb for. */
function rightClick(el: Element) {
  fireEvent.contextMenu(el);
}

describe("ContextMenu", () => {
  it("stays closed until the trigger is right-clicked", () => {
    render(<Example />);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens on right click with menu semantics", async () => {
    render(<Example />);
    rightClick(screen.getByText("Right click me"));

    expect(await screen.findByRole("menu")).toBeInTheDocument();
    expect(screen.getAllByRole("menuitem")).toHaveLength(3);
  });

  it("runs the item's action on select", async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();
    render(<Example onDelete={onDelete} />);

    rightClick(screen.getByText("Right click me"));
    await user.click(await screen.findByText("Delete"));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<Example />);

    rightClick(screen.getByText("Right click me"));
    await screen.findByRole("menu");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("marks a disabled item so it cannot be selected", async () => {
    render(<Example />);
    rightClick(screen.getByText("Right click me"));
    expect(await screen.findByText("Rename")).toHaveAttribute("data-disabled");
  });

  // The two menus wrap different Radix primitives but must look identical. A
  // copied class string would drift the first time one was adjusted and the
  // other was not, so both read from menu-styles.
  it("draws from the shared menu styling", async () => {
    render(<Example />);
    rightClick(screen.getByText("Right click me"));

    const menu = await screen.findByRole("menu");
    const surfaceClass = menuSurface.split(" ")[0]!;
    expect(menu.className).toContain(surfaceClass);
    expect(screen.getByText("Open").className).toContain(
      menuItem.split(" ")[0]!,
    );
  });

  it("has no accessibility violations when open", async () => {
    render(<Example />);
    rightClick(screen.getByText("Right click me"));
    await screen.findByRole("menu");

    // `region` is a page-level landmark rule, not a component concern.
    const results = await axe(document.body, {
      rules: { region: { enabled: false } },
    });
    expect(results.violations).toHaveLength(0);
  });
});
