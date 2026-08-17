import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { axe } from "jest-axe";
import { beforeAll, describe, expect, it, vi } from "vitest";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../command";

// cmdk scrolls the active item into view on every selection change, and jsdom
// implements no scrollIntoView at all. A no-op is the whole of what is missing:
// there is no viewport to scroll.
beforeAll(() => {
  if (typeof Element.prototype.scrollIntoView !== "function") {
    Element.prototype.scrollIntoView = function scrollIntoView() {};
  }
});

function Palette({ onSelect }: { onSelect?: (value: string) => void } = {}) {
  return (
    <Command label="Commands">
      <CommandInput placeholder="Type a command" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Files">
          <CommandItem value="new-file" onSelect={onSelect}>
            New file
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem value="open-file" onSelect={onSelect}>
            Open file
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Account">
          <CommandItem value="sign-out" onSelect={onSelect}>
            Sign out
          </CommandItem>
          <CommandItem value="billing" disabled onSelect={onSelect}>
            Billing
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

const options = () => screen.queryAllByRole("option");
const selected = () =>
  document.querySelector('[aria-selected="true"]')?.textContent;

describe("Command", () => {
  // The reason to use this rather than a filtered DropdownMenu: a screen reader
  // hears a combobox over a listbox, so a list that narrows as you type is
  // something it can describe.
  it("is a combobox over a listbox, not a menu", () => {
    render(<Palette />);
    const input = screen.getByPlaceholderText("Type a command");
    expect(input).toHaveAttribute("role", "combobox");
    expect(input).toHaveAttribute("aria-expanded", "true");
    expect(input.getAttribute("aria-controls")).toBeTruthy();
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(options()).toHaveLength(4);
  });

  it("narrows the list as you type", async () => {
    const user = userEvent.setup();
    render(<Palette />);
    await user.type(screen.getByPlaceholderText("Type a command"), "open");

    expect(screen.getByText("Open file")).toBeInTheDocument();
    expect(screen.queryByText("New file")).not.toBeInTheDocument();
    expect(screen.queryByText("Sign out")).not.toBeInTheDocument();
  });

  // Not substring matching. This is the behaviour people are surprised by, so it
  // is pinned rather than described.
  it("matches on a fuzzy score, not a substring", async () => {
    const user = userEvent.setup();
    render(<Palette />);
    await user.type(screen.getByPlaceholderText("Type a command"), "nf");
    expect(screen.getByText("New file")).toBeInTheDocument();
  });

  // cmdk hides the group with the `hidden` attribute rather than unmounting it,
  // so the assertion is on the attribute. getByText finds hidden text.
  it("hides a group whose items all filter out", async () => {
    const user = userEvent.setup();
    render(<Palette />);
    const group = (heading: string) =>
      screen.getByText(heading).closest("[cmdk-group]")!;
    expect(group("Account")).not.toHaveAttribute("hidden");

    await user.type(screen.getByPlaceholderText("Type a command"), "file");
    expect(group("Files")).not.toHaveAttribute("hidden");
    expect(group("Account")).toHaveAttribute("hidden");
  });

  // A listbox may only contain options and groups, so cmdk's role="separator"
  // makes the list itself an aria-required-children violation. cmdk writes role
  // after the prop spread, so aria-hidden is the lever that exists.
  it("keeps the separator out of the accessibility tree", () => {
    render(<Palette />);
    expect(document.querySelector("[cmdk-separator]")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(screen.queryByRole("separator")).toBeNull();
  });

  it("shows the empty state only when a query matches nothing", async () => {
    const user = userEvent.setup();
    render(<Palette />);
    expect(screen.queryByText("No results found.")).not.toBeInTheDocument();

    await user.type(screen.getByPlaceholderText("Type a command"), "zzzz");
    expect(screen.getByText("No results found.")).toBeInTheDocument();
    expect(options()).toHaveLength(0);
  });

  it("moves the selection with the arrow keys", async () => {
    const user = userEvent.setup();
    render(<Palette />);
    await user.click(screen.getByPlaceholderText("Type a command"));
    expect(selected()).toContain("New file");

    await user.keyboard("{ArrowDown}");
    expect(selected()).toContain("Open file");
    await user.keyboard("{ArrowUp}");
    expect(selected()).toContain("New file");
  });

  it("runs the selected item on Enter", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<Palette onSelect={onSelect} />);
    await user.click(screen.getByPlaceholderText("Type a command"));
    await user.keyboard("{ArrowDown}{Enter}");
    expect(onSelect).toHaveBeenCalledWith("open-file");
  });

  it("skips a disabled item", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(<Palette onSelect={onSelect} />);
    const billing = screen.getByText("Billing");
    expect(billing).toHaveAttribute("data-disabled", "true");
    await user.click(billing);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("hides the keyboard hint from a screen reader", () => {
    render(<Palette />);
    expect(screen.getByText("⌘N")).toHaveAttribute("aria-hidden", "true");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Palette />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});

describe("CommandDialog", () => {
  function Dlg() {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>Open palette</button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandItem value="one">One</CommandItem>
          </CommandList>
        </CommandDialog>
      </>
    );
  }

  // A palette shows a search field rather than a heading, so without a hidden
  // title the dialog is announced as "dialog" and nothing else.
  it("has an accessible name and description, both hidden", async () => {
    const user = userEvent.setup();
    render(<Dlg />);
    await user.click(screen.getByRole("button", { name: "Open palette" }));

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAccessibleName("Command palette");
    // Hidden by the sr-only class. jsdom loads no stylesheet, so the class is
    // the most this can check - toBeVisible would pass or fail for the wrong
    // reason.
    expect(screen.getByText("Command palette").parentElement).toHaveClass(
      "sr-only",
    );
    expect(screen.getByText("Search for a command to run")).toBeInTheDocument();
  });

  it("takes a title and description of its own", async () => {
    const user = userEvent.setup();
    render(
      <CommandDialog defaultOpen title="Kommandopalet" description="Søg">
        <CommandInput placeholder="Søg" />
        <CommandList>
          <CommandItem value="one">En</CommandItem>
        </CommandList>
      </CommandDialog>,
    );
    void user;
    expect(await screen.findByRole("dialog")).toHaveAccessibleName(
      "Kommandopalet",
    );
  });

  // The corner button is positioned where the search field is, so it would sit
  // on top of it.
  it("leaves out the corner close button", async () => {
    const user = userEvent.setup();
    render(<Dlg />);
    await user.click(screen.getByRole("button", { name: "Open palette" }));
    await screen.findByRole("dialog");
    expect(screen.queryByRole("button", { name: "Close" })).toBeNull();
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<Dlg />);
    await user.click(screen.getByRole("button", { name: "Open palette" }));
    await screen.findByRole("dialog");

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  it("has no accessibility violations when open", async () => {
    const { container } = render(
      <CommandDialog defaultOpen>
        <CommandInput placeholder="Type a command" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandItem value="one">One</CommandItem>
        </CommandList>
      </CommandDialog>,
    );
    await screen.findByRole("dialog");
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
