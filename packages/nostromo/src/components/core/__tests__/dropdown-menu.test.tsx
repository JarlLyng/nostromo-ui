import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../dropdown-menu";

function Example({ onDelete }: { onDelete?: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Row</DropdownMenuLabel>
        <DropdownMenuItem>
          Edit
          <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive onSelect={onDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

describe("DropdownMenu", () => {
  it("stays closed until the trigger is used", () => {
    render(<Example />);
    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
  });

  it("opens on click and exposes items with menu semantics", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByText("Actions"));
    expect(await screen.findByRole("menu")).toBeInTheDocument();
    expect(screen.getAllByRole("menuitem")).toHaveLength(3);
  });

  it("runs the item's action on select", async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();
    render(<Example onDelete={onDelete} />);

    await user.click(screen.getByText("Actions"));
    await user.click(await screen.findByText("Delete"));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByText("Actions"));
    await screen.findByRole("menu");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens from the keyboard and moves focus into the menu", async () => {
    const user = userEvent.setup();
    render(<Example />);

    screen.getByText("Actions").focus();
    await user.keyboard("{Enter}");

    const items = await screen.findAllByRole("menuitem");
    expect(items[0]).toHaveFocus();
  });

  it("marks a disabled item so it cannot be selected", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByText("Actions"));
    const duplicate = await screen.findByText("Duplicate");
    expect(duplicate).toHaveAttribute("data-disabled");
  });

  it("styles a destructive item apart from the rest", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByText("Actions"));
    const remove = await screen.findByText("Delete");
    expect(remove.className).toContain("text-destructive");
  });

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByText("Actions"));
    await screen.findByRole("menu");

    // Portalled, so audit the document rather than the render container.
    // `region` is disabled deliberately, and only here. It is a page-level rule -
    // "all content should be contained by landmarks" - so it fires on any
    // component fixture that is not wrapped in a <main>, and says nothing about
    // the component. Every rule that is about this component stays on.
    const results = await axe(document.body, {
      rules: { region: { enabled: false } },
    });
    expect(results.violations).toHaveLength(0);
  });
});
