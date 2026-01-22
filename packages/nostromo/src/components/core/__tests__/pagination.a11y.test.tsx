import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Pagination } from "../pagination";
import { describe, it, expect } from "vitest";
import React from "react";

const defaultProps = {
  currentPage: 1,
  totalPages: 10,
  onPageChange: () => {},
};

describe("Pagination Accessibility", () => {
  it("should not have any axe violations in default state", async () => {
    const { container } = render(<Pagination {...defaultProps} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should not have any axe violations with navigation buttons", async () => {
    const { container } = render(
      <Pagination {...defaultProps} showFirstLast showPrevNext />
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should not have any axe violations with ellipsis", async () => {
    const { container } = render(
      <Pagination {...defaultProps} currentPage={5} maxVisiblePages={3} />
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should have proper navigation role", () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByRole("navigation")).toHaveAttribute("aria-label", "Pagination");
  });

  it("should have proper list structure", () => {
    render(<Pagination {...defaultProps} />);
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    
    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBeGreaterThan(0);
  });

  it("should mark current page correctly", () => {
    render(<Pagination {...defaultProps} currentPage={3} />);
    const currentPageButton = screen.getByRole("button", { name: "Go to page 3" });
    expect(currentPageButton).toHaveAttribute("aria-current", "page");
  });

  it("should have proper button accessibility", () => {
    render(<Pagination {...defaultProps} showPrevNext />);
    
    const prevButton = screen.getByLabelText("Go to previous page");
    const nextButton = screen.getByLabelText("Go to next page");
    
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it("should have proper first/last button accessibility", () => {
    render(<Pagination {...defaultProps} showFirstLast />);
    
    const firstButton = screen.getByLabelText("Go to first page");
    const lastButton = screen.getByLabelText("Go to last page");
    
    expect(firstButton).toBeInTheDocument();
    expect(lastButton).toBeInTheDocument();
  });

  it("should have proper ellipsis accessibility", () => {
    render(<Pagination {...defaultProps} currentPage={5} maxVisiblePages={3} />);
    
    const ellipsisElements = screen.getAllByText(/More pages/);
    expect(ellipsisElements.length).toBeGreaterThan(0);
    
    ellipsisElements.forEach(element => {
      expect(element).toHaveClass("sr-only");
    });
  });

  it("should support keyboard navigation", () => {
    render(<Pagination {...defaultProps} />);
    const pageButtons = screen.getAllByRole("button", { name: /Go to page/ });
    
    // All page buttons should be focusable
    pageButtons.forEach(button => {
      expect(button).not.toHaveAttribute("tabIndex", "-1");
    });
  });

  it("should have proper semantic structure", () => {
    render(<Pagination {...defaultProps} />);
    const nav = screen.getByRole("navigation");
    expect(nav.tagName).toBe("NAV");
    
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
  });

  it("should handle disabled state accessibility", () => {
    render(<Pagination {...defaultProps} disabled />);
    const pageButtons = screen.getAllByRole("button", { name: /Go to page/ });
    
    pageButtons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it("should handle edge case accessibility", async () => {
    const { container } = render(<Pagination {...defaultProps} currentPage={1} maxVisiblePages={3} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should have proper color contrast", async () => {
    const { container } = render(<Pagination {...defaultProps} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });

  it("should support screen reader navigation", () => {
    render(<Pagination {...defaultProps} showPrevNext />);
    
    // Screen readers should be able to identify navigation buttons
    expect(screen.getByLabelText("Go to previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to next page")).toBeInTheDocument();
  });

  it("should have proper focus management", () => {
    render(<Pagination {...defaultProps} />);
    const pageButtons = screen.getAllByRole("button", { name: /Go to page/ });
    
    // First page button should be focusable
    const firstButton = pageButtons[0];
    expect(firstButton).toBeInTheDocument();
    expect(firstButton).not.toHaveAttribute("tabIndex", "-1");
  });

  it("should handle single page accessibility", async () => {
    const { container } = render(<Pagination {...defaultProps} totalPages={1} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
    
    const pageButton = screen.getByRole("button", { name: "Go to page 1" });
    expect(pageButton).toHaveAttribute("aria-current", "page");
  });

  it("should have proper separator accessibility", async () => {
    render(<Pagination {...defaultProps} currentPage={5} maxVisiblePages={3} />);
    
    // Ellipsis should be properly labeled for screen readers
    const ellipsisElements = screen.getAllByText(/More pages/);
    expect(ellipsisElements.length).toBeGreaterThan(0);
  });
});
