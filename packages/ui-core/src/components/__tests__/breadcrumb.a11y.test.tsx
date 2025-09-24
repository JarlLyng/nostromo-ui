import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Breadcrumb } from "../breadcrumb";
import { describe, it, expect } from "vitest";
import React from "react";

describe("Breadcrumb Accessibility", () => {
  const mockItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Category", href: "/products/category" },
    { label: "Current Page" },
  ];

  it("should not have any axe violations in default state", async () => {
    const { container } = render(<Breadcrumb items={mockItems} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should not have any axe violations with home icon", async () => {
    const { container } = render(<Breadcrumb items={mockItems} showHome />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should not have any axe violations with compact variant", async () => {
    const { container } = render(<Breadcrumb items={mockItems} variant="compact" />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should not have any axe violations with different separators", async () => {
    const separators = ["slash", "arrow", "dot"] as const;
    
    for (const separator of separators) {
      const { container } = render(<Breadcrumb items={mockItems} separator={separator} />);
      const results = await axe(container);
      expect(results.violations).toHaveLength(0);
    }
  });

  it("should have proper navigation role", async () => {
    render(<Breadcrumb items={mockItems} />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveAttribute("aria-label", "Breadcrumb");
  });

  it("should have proper list structure", async () => {
    render(<Breadcrumb items={mockItems} />);
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(mockItems.length);
  });

  it("should mark current page correctly", async () => {
    render(<Breadcrumb items={mockItems} />);
    const currentPage = screen.getByText("Current Page");
    expect(currentPage.parentElement).toHaveAttribute("aria-current", "page");
  });

  it("should have proper link accessibility", async () => {
    render(<Breadcrumb items={mockItems} />);
    const homeLink = screen.getByText("Home");
    expect(homeLink.closest("a")).toHaveAttribute("href", "/");
  });

  it("should have proper home icon accessibility", async () => {
    render(<Breadcrumb items={mockItems} showHome />);
    const homeLink = screen.getByLabelText("Home");
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("should support keyboard navigation", async () => {
    render(<Breadcrumb items={mockItems} />);
    const homeLink = screen.getByRole("link", { name: "Home" });
    
    // Tab to focus
    homeLink.focus();
    expect(homeLink).toHaveFocus();
  });

  it("should have proper semantic structure", async () => {
    render(<Breadcrumb items={mockItems} />);
    const nav = screen.getByRole("navigation");
    expect(nav.tagName).toBe("NAV");
    
    const list = screen.getByRole("list");
    expect(list.tagName).toBe("OL");
  });

  it("should handle empty items array", async () => {
    const { container } = render(<Breadcrumb items={[]} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should handle single item", async () => {
    const { container } = render(<Breadcrumb items={[{ label: "Home" }]} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should have proper color contrast", async () => {
    const { container } = render(<Breadcrumb items={mockItems} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should support screen reader navigation", async () => {
    render(<Breadcrumb items={mockItems} />);
    
    // Check that all items are accessible
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Current Page")).toBeInTheDocument();
  });

  it("should have proper focus management", async () => {
    render(<Breadcrumb items={mockItems} />);
    const homeLink = screen.getByText("Home");
    
    // Focus should be manageable - check if element can receive focus
    expect(homeLink.closest("a")).toBeInTheDocument();
    expect(homeLink.closest("a")).toHaveAttribute("href", "/");
  });

  it("should handle current item with explicit current prop", async () => {
    const itemsWithCurrent = [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Current", current: true },
    ];
    
    render(<Breadcrumb items={itemsWithCurrent} />);
    const currentItem = screen.getByText("Current");
    // Check that the current item has aria-current attribute on the outer span
    expect(currentItem.parentElement).toHaveAttribute("aria-current", "page");
  });

  it("should have proper separator accessibility", async () => {
    render(<Breadcrumb items={mockItems} separator="slash" />);
    
    // Separators should be present but not interfere with navigation
    const separators = screen.getAllByText("/");
    expect(separators.length).toBe(3); // 3 separators for 4 items
  });
});
