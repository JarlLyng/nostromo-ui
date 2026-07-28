import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { App } from "../app/App";

/**
 * Mounts the whole consumer surface from `dist`.
 *
 * The library's own suite covers component behaviour in far more depth; this is
 * only here to catch the case where the published entry points are broken or a
 * component throws on ordinary usage. `<Button asChild>` did exactly that -
 * unconditionally - while 1089 unit tests passed, because nothing exercised the
 * prop and nothing rendered against dist.
 */
describe("consumer app", () => {
  it("mounts without throwing", () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it("renders components from the package root export", () => {
    render(<App />);
    expect(screen.getByText("Card")).toBeInTheDocument();
    expect(screen.getByText("Badge")).toBeInTheDocument();
    expect(screen.getByText("Careful.")).toBeInTheDocument();
  });

  it("renders components from per-component entry points", () => {
    render(<App />);
    expect(
      screen.getByRole("button", { name: "Primary" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Smoke test")).toBeInTheDocument();
  });

  it("renders asChild as the child element, not a button", () => {
    render(<App />);
    const link = screen.getByRole("link", { name: "As child" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/somewhere");
    // The button styling has to be merged onto the child, or asChild is
    // technically working but useless.
    expect(link.className).toContain("inline-flex");
  });
});
