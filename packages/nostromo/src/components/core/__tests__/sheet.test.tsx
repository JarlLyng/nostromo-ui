import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../sheet";

function Example({
  side,
  srOnlyTitle,
}: {
  side?: "top" | "bottom" | "left" | "right";
  srOnlyTitle?: boolean;
}) {
  return (
    <Sheet>
      <SheetTrigger>Open navigation</SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle srOnly={srOnlyTitle}>Navigation</SheetTitle>
          <SheetDescription>Jump to a section</SheetDescription>
        </SheetHeader>
        <a href="#components">Components</a>
        <SheetClose>Close</SheetClose>
      </SheetContent>
    </Sheet>
  );
}

describe("Sheet", () => {
  it("stays closed until the trigger is used", () => {
    render(<Example />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens on click", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByText("Open navigation"));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  it("closes on Escape and from SheetClose", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByText("Open navigation"));
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByText("Open navigation"));
    await user.click(await screen.findByText("Close"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  // The title is the dialog's accessible name. Without one, Radix warns and axe
  // reports aria-dialog-name - a screen reader announces "dialog" and stops.
  it("takes its accessible name from SheetTitle", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByText("Open navigation"));
    expect(
      await screen.findByRole("dialog", { name: "Navigation" }),
    ).toBeInTheDocument();
  });

  it("keeps the accessible name when the title is visually hidden", async () => {
    const user = userEvent.setup();
    render(<Example srOnlyTitle />);

    await user.click(screen.getByText("Open navigation"));
    const dialog = await screen.findByRole("dialog", { name: "Navigation" });
    expect(dialog).toBeInTheDocument();
    // Present for assistive tech, clipped away visually.
    expect(screen.getByText("Navigation").className).toContain(
      "[clip:rect(0,0,0,0)]",
    );
  });

  it("anchors to the requested edge", async () => {
    const user = userEvent.setup();
    render(<Example side="left" />);

    await user.click(screen.getByText("Open navigation"));
    const dialog = await screen.findByRole("dialog");
    expect(dialog.className).toContain("left-0");
    expect(dialog.className).toContain("inset-y-0");
  });

  it("defaults to the right edge", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByText("Open navigation"));
    expect((await screen.findByRole("dialog")).className).toContain("right-0");
  });

  it("moves focus into the sheet when it opens", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByText("Open navigation"));
    const dialog = await screen.findByRole("dialog");
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByText("Open navigation"));
    await screen.findByRole("dialog");

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
