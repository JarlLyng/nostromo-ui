import { render, screen, act } from "@testing-library/react";
import * as React from "react";
import { afterEach, describe, expect, it } from "vitest";

import { MOBILE_BREAKPOINT, useIsMobile } from "../use-is-mobile";

type Listener = () => void;

/**
 * A matchMedia that answers a max-width query against a width we control, and
 * keeps its listeners so a resize can be simulated.
 */
function viewport(width: number) {
  const listeners = new Set<Listener>();
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
  return {
    resize(next: number) {
      width = next;
      act(() => {
        for (const fn of listeners) fn();
      });
    },
    listenerCount: () => listeners.size,
  };
}

function Probe({ breakpoint }: { breakpoint?: number } = {}) {
  const isMobile = useIsMobile(breakpoint);
  return <span data-testid="out">{isMobile ? "mobile" : "desktop"}</span>;
}

const read = () => screen.getByTestId("out").textContent;

afterEach(() => {
  viewport(1280);
});

describe("useIsMobile", () => {
  it("is the md breakpoint", () => {
    expect(MOBILE_BREAKPOINT).toBe(768);
  });

  // The boundary belongs to the desktop side: the query is max-width 767px, so
  // 768 itself is not mobile. That is the same edge Tailwind's md: uses.
  it("treats the breakpoint itself as desktop", () => {
    viewport(768);
    render(<Probe />);
    expect(read()).toBe("desktop");
  });

  it("is mobile one pixel below", () => {
    viewport(767);
    render(<Probe />);
    expect(read()).toBe("mobile");
  });

  // The reason for useSyncExternalStore rather than an effect: the first render
  // already has the right answer, instead of rendering desktop and correcting.
  it("is correct on the first render, with no second pass", () => {
    viewport(375);
    const renders: string[] = [];
    function Counting() {
      const isMobile = useIsMobile();
      renders.push(isMobile ? "mobile" : "desktop");
      return null;
    }
    render(<Counting />);
    expect(renders[0]).toBe("mobile");
  });

  it("follows a resize", () => {
    const vp = viewport(1280);
    render(<Probe />);
    expect(read()).toBe("desktop");

    vp.resize(375);
    expect(read()).toBe("mobile");

    vp.resize(1280);
    expect(read()).toBe("desktop");
  });

  it("takes a breakpoint of its own", () => {
    viewport(900);
    render(<Probe breakpoint={1024} />);
    expect(read()).toBe("mobile");
  });

  it("removes its listener on unmount", () => {
    const vp = viewport(1280);
    const { unmount } = render(<Probe />);
    expect(vp.listenerCount()).toBeGreaterThan(0);
    unmount();
    expect(vp.listenerCount()).toBe(0);
  });

  // Server-side, and in any environment without matchMedia, rather than
  // throwing. Desktop is the safer guess: the mobile branch is a portalled
  // dialog.
  it("answers desktop when there is no matchMedia", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: undefined,
    });
    render(<Probe />);
    expect(read()).toBe("desktop");
  });
});
