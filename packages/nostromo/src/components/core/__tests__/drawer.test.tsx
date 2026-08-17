import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { axe } from "jest-axe";
import { beforeAll, describe, expect, it, vi } from "vitest";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../drawer";

/**
 * Dragging is not tested here. vaul turns a pointer delta into a transform on the
 * content, measured against the viewport, and jsdom has neither pointer physics
 * nor a viewport. What is tested is what vaul is a Radix Dialog underneath for:
 * the modal semantics, the labelling, and the direction attribute the styling
 * hangs off.
 */

function Example({
  direction,
  onOpenChange,
  ...props
}: {
  direction?: "top" | "bottom" | "left" | "right";
  onOpenChange?: (open: boolean) => void;
} & Record<string, unknown>) {
  return (
    <Drawer direction={direction} onOpenChange={onOpenChange} {...props}>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>Change your name and photo.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>Cancel</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

// jsdom implements no pointer capture, and vaul calls it on pointerdown to
// follow a drag. Without this, every click on a trigger prints
// "event.target.setPointerCapture is not a function". Local to this file, after
// what a global elementFromPoint stub did to five other suites.
beforeAll(() => {
  for (const name of ["setPointerCapture", "releasePointerCapture"] as const) {
    if (typeof Element.prototype[name] !== "function") {
      (Element.prototype as unknown as Record<string, () => void>)[name] =
        () => {};
    }
  }
});

const content = () => screen.queryByRole("dialog");

describe("Drawer", () => {
  it("renders nothing until it is opened", () => {
    render(<Example />);
    expect(content()).not.toBeInTheDocument();
    expect(screen.getByText("Open")).toBeInTheDocument();
  });

  it("opens from the trigger", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByText("Open"));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Edit profile")).toBeInTheDocument();
  });

  // The title and description are what name and describe it, wired by vaul
  // through Radix.
  it("is named and described by its title and description", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByText("Open"));

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAccessibleName("Edit profile");
    expect(dialog).toHaveAccessibleDescription("Change your name and photo.");
  });

  // How vaul makes it modal for a screen reader: it aria-hides the rest of the
  // page rather than setting aria-modal on the dialog. Worth pinning, because
  // the two are alternatives and only one of them is in the DOM here.
  it("aria-hides the rest of the page rather than setting aria-modal", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByText("Open"));
    const dialog = await screen.findByRole("dialog");

    expect(dialog).not.toHaveAttribute("aria-modal");
    const outside = Array.from(document.body.children).filter(
      (el) => !el.contains(dialog),
    );
    expect(outside.length).toBeGreaterThan(0);
    for (const el of outside) {
      expect(el).toHaveAttribute("aria-hidden", "true");
    }
  });

  // The direction is a prop on the root, and vaul writes it onto the content.
  // Every position style in the component reads that attribute, so if it stopped
  // being emitted the drawer would render unpositioned.
  it("puts the direction on the content, defaulting to bottom", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Example />);
    await user.click(screen.getByText("Open"));
    expect(await screen.findByRole("dialog")).toHaveAttribute(
      "data-vaul-drawer-direction",
      "bottom",
    );
    unmount();

    render(<Example direction="right" />);
    await user.click(screen.getByText("Open"));
    expect(await screen.findByRole("dialog")).toHaveAttribute(
      "data-vaul-drawer-direction",
      "right",
    );
  });

  it("draws the grabber, and leaves it out on request", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Example />);
    await user.click(screen.getByText("Open"));
    await screen.findByRole("dialog");
    // vaul's own handle, which carries a hit area larger than the visible bar.
    expect(document.querySelector("[data-vaul-handle]")).toBeInTheDocument();
    expect(
      document.querySelector("[data-vaul-handle-hitarea]"),
    ).toBeInTheDocument();
    unmount();

    render(
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent withHandle={false}>
          <DrawerTitle>Title</DrawerTitle>
          <DrawerDescription>Desc</DrawerDescription>
        </DrawerContent>
      </Drawer>,
    );
    await user.click(screen.getByText("Open"));
    await screen.findByRole("dialog");
    expect(document.querySelector("[data-vaul-handle]")).toBeNull();
  });

  // The grabber says "drag me", which is not the only way out, so it should not
  // be announced.
  it("hides the grabber from a screen reader", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByText("Open"));
    await screen.findByRole("dialog");
    expect(document.querySelector("[data-vaul-handle]")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("closes on Escape and from DrawerClose", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByText("Open"));
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(content()).not.toBeInTheDocument());

    await user.click(screen.getByText("Open"));
    await screen.findByRole("dialog");
    await user.click(screen.getByText("Cancel"));
    await waitFor(() => expect(content()).not.toBeInTheDocument());
  });

  it("reports open state changes", async () => {
    const onOpenChange = vi.fn();
    const user = userEvent.setup();
    render(<Example onOpenChange={onOpenChange} />);

    await user.click(screen.getByText("Open"));
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(true));
    await user.keyboard("{Escape}");
    await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(false));
  });

  // dismissible={false} is how a drawer that must be answered is built, and it
  // has to hold against Escape as well as the overlay.
  it("stays open when it is not dismissible", async () => {
    const user = userEvent.setup();
    render(<Example dismissible={false} defaultOpen />);
    await screen.findByRole("dialog");

    await user.keyboard("{Escape}");
    await new Promise((r) => setTimeout(r, 50));
    expect(content()).toBeInTheDocument();
  });

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    const { container } = render(<Example />);
    await user.click(screen.getByText("Open"));
    await screen.findByRole("dialog");

    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
