import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "../pagination";
import { describe, it, expect, vi } from "vitest";
import React from "react";

describe("Pagination", () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    onPageChange: vi.fn(),
  };

  it("renders without crashing", () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByLabelText("Pagination")).toBeInTheDocument();
  });

  it("renders correct number of page buttons", () => {
    render(<Pagination {...defaultProps} maxVisiblePages={5} />);
    // Should show 5 page buttons (1, 2, 3, 4, 5)
    const pageButtons = screen.getAllByRole("button", { name: /Go to page/ });
    expect(pageButtons).toHaveLength(5);
  });

  it("highlights current page", () => {
    render(<Pagination {...defaultProps} currentPage={3} />);
    const currentPageButton = screen.getByRole("button", { name: "Go to page 3" });
    expect(currentPageButton).toHaveAttribute("aria-current", "page");
  });

  it("calls onPageChange when page is clicked", () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaultProps} onPageChange={onPageChange} />);
    
    const pageButton = screen.getByRole("button", { name: "Go to page 2" });
    fireEvent.click(pageButton);
    
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("does not call onPageChange for current page", () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaultProps} currentPage={2} onPageChange={onPageChange} />);
    
    const currentPageButton = screen.getByRole("button", { name: "Go to page 2" });
    fireEvent.click(currentPageButton);
    
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("shows first/last buttons when enabled", () => {
    render(<Pagination {...defaultProps} showFirstLast />);
    expect(screen.getByLabelText("Go to first page")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to last page")).toBeInTheDocument();
  });

  it("shows prev/next buttons when enabled", () => {
    render(<Pagination {...defaultProps} showPrevNext />);
    expect(screen.getByLabelText("Go to previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to next page")).toBeInTheDocument();
  });

  it("disables prev button on first page", () => {
    render(<Pagination {...defaultProps} currentPage={1} showPrevNext />);
    const prevButton = screen.getByLabelText("Go to previous page");
    expect(prevButton).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(<Pagination {...defaultProps} currentPage={10} showPrevNext />);
    const nextButton = screen.getByLabelText("Go to next page");
    expect(nextButton).toBeDisabled();
  });

  it("shows ellipsis when needed", () => {
    render(<Pagination {...defaultProps} currentPage={5} maxVisiblePages={3} />);
    // Check for ellipsis elements by their sr-only text
    const ellipsisElements = screen.getAllByText(/More pages/);
    expect(ellipsisElements.length).toBeGreaterThan(0);
  });

  it("handles disabled state", () => {
    render(<Pagination {...defaultProps} disabled />);
    const pageButtons = screen.getAllByRole("button", { name: /Go to page/ });
    pageButtons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it("handles edge case with currentPage at start", () => {
    render(<Pagination {...defaultProps} currentPage={1} maxVisiblePages={3} />);
    const pageButtons = screen.getAllByRole("button", { name: /Go to page/ });
    expect(pageButtons).toHaveLength(3);
    expect(screen.getByRole("button", { name: "Go to page 1" })).toHaveAttribute("aria-current", "page");
  });

  it("renders with compact variant", () => {
    render(<Pagination {...defaultProps} variant="compact" />);
    const nav = screen.getByLabelText("Pagination");
    expect(nav).toHaveClass("space-x-0.5");
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<Pagination {...defaultProps} size="sm" />);
    const nav = screen.getByLabelText("Pagination");
    expect(nav).toHaveClass("h-8");

    rerender(<Pagination {...defaultProps} size="lg" />);
    const navLg = screen.getByLabelText("Pagination");
    expect(navLg).toHaveClass("h-10");
  });

  it("handles single page", () => {
    render(<Pagination {...defaultProps} totalPages={1} />);
    const pageButton = screen.getByRole("button", { name: "Go to page 1" });
    expect(pageButton).toBeInTheDocument();
    expect(pageButton).toHaveAttribute("aria-current", "page");
  });

  it("handles edge case with currentPage at end", () => {
    render(<Pagination {...defaultProps} currentPage={10} maxVisiblePages={3} />);
    const pageButtons = screen.getAllByRole("button", { name: /Go to page/ });
    expect(pageButtons).toHaveLength(3);
    expect(screen.getByRole("button", { name: "Go to page 10" })).toHaveAttribute("aria-current", "page");
  });

  it("calls onPageChange with correct page for navigation buttons", () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaultProps} currentPage={5} onPageChange={onPageChange} showPrevNext />);
    
    const prevButton = screen.getByLabelText("Go to previous page");
    const nextButton = screen.getByLabelText("Go to next page");
    
    fireEvent.click(prevButton);
    expect(onPageChange).toHaveBeenCalledWith(4);
    
    fireEvent.click(nextButton);
    expect(onPageChange).toHaveBeenCalledWith(6);
  });

  it("renders with custom className", () => {
    render(<Pagination {...defaultProps} className="custom-pagination" />);
    expect(screen.getByLabelText("Pagination")).toHaveClass("custom-pagination");
  });
});
