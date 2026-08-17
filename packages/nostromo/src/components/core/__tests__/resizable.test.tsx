import { render, screen } from "@testing-library/react";
import * as React from "react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../resizable";

/**
 * Dragging is not tested here, and cannot be: react-resizable-panels turns a
 * pointer delta into a percentage of the group's measured width, and every
 * element in jsdom is 0 wide. A drag test would divide by nothing and assert
 * whatever came out.
 *
 * What is tested is everything the wrapper is responsible for: the roles and
 * ARIA the library emits, the styling hooks those drive, and the two facts about
 * v4 that the wrapper is shaped around - the group's inline styles, and which
 * way `aria-orientation` points.
 */

function setup(orientation: "horizontal" | "vertical" = "horizontal") {
  return render(
    <ResizablePanelGroup orientation={orientation}>
      <ResizablePanel defaultSize="50">Left</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="50">Right</ResizablePanel>
    </ResizablePanelGroup>,
  );
}

const group = () => document.querySelector("[data-group]") as HTMLElement;

describe("Resizable", () => {
  it("renders the panels and one divider", () => {
    setup();
    expect(screen.getByText("Left")).toBeInTheDocument();
    expect(screen.getByText("Right")).toBeInTheDocument();
    expect(screen.getAllByRole("separator")).toHaveLength(1);
  });

  // The divider is keyboard-operable, which is the whole reason to use the
  // library rather than a div with a mousedown handler.
  it("gives the divider a value and a tab stop", () => {
    setup();
    const handle = screen.getByRole("separator");
    expect(handle).toHaveAttribute("tabindex", "0");
    expect(handle).toHaveAttribute("aria-valuenow");
    expect(handle).toHaveAttribute("aria-valuemin");
    expect(handle).toHaveAttribute("aria-valuemax");
    expect(handle).toHaveAttribute("aria-controls");
  });

  // aria-orientation describes the divider, not the group: panels side by side
  // are separated by a vertical line. Every `aria-[orientation=horizontal]`
  // class in the component depends on it reading this way round.
  it("reports the divider's own axis, opposite the group's", () => {
    setup("horizontal");
    expect(screen.getByRole("separator")).toHaveAttribute(
      "aria-orientation",
      "vertical",
    );

    setup("vertical");
    const handles = screen.getAllByRole("separator");
    expect(handles[1]).toHaveAttribute("aria-orientation", "horizontal");
  });

  it("draws a grip only when asked", () => {
    const { container, unmount } = setup();
    expect(
      container.querySelector("[role='separator'] svg"),
    ).toBeInTheDocument();
    unmount();

    render(
      <ResizablePanelGroup>
        <ResizablePanel>a</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>b</ResizablePanel>
      </ResizablePanelGroup>,
    );
    expect(
      document.querySelector("[role='separator'] svg"),
    ).not.toBeInTheDocument();
  });

  /**
   * This is the trap the component's doc comment is about, pinned down so it
   * cannot change quietly. The library writes display, flex-direction, width and
   * height as inline styles, which beat any class. If a future version stops
   * doing that, the guidance in the docs page becomes wrong and this fails.
   */
  it("sizes itself inline, which is why a height class cannot win", () => {
    render(
      <ResizablePanelGroup className="h-96">
        <ResizablePanel>a</ResizablePanel>
      </ResizablePanelGroup>,
    );
    const el = group();
    expect(el).toHaveClass("h-96");
    expect(el.style.height).toBe("100%");
    expect(el.style.width).toBe("100%");
    expect(el.style.display).toBe("flex");
  });

  it("takes a height through style, which merges", () => {
    render(
      <ResizablePanelGroup style={{ height: "24rem" }}>
        <ResizablePanel>a</ResizablePanel>
      </ResizablePanelGroup>,
    );
    expect(group().style.height).toBe("24rem");
    expect(group().style.display).toBe("flex");
  });

  it("switches flex direction from orientation", () => {
    setup("horizontal");
    expect(group().style.flexDirection).toBe("row");
    setup("vertical");
    const groups = document.querySelectorAll("[data-group]");
    expect((groups[1] as HTMLElement).style.flexDirection).toBe("column");
  });

  it("forwards a ref to the group element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <ResizablePanelGroup ref={ref}>
        <ResizablePanel>a</ResizablePanel>
      </ResizablePanelGroup>,
    );
    expect(ref.current).toBe(group());
  });

  it("has no accessibility violations", async () => {
    const { container } = setup();
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
