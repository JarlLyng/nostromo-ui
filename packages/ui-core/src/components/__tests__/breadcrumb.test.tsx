import { render, screen, fireEvent } from "@testing-library/react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "../breadcrumb";
import { describe, it, expect, vi } from "vitest";
import React from "react";

describe("Breadcrumb", () => {
  const mockItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Category", href: "/products/category" },
    { label: "Current Page" },
  ];

  it("renders without crashing", () => {
    render(<Breadcrumb items={mockItems} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders all breadcrumb items", () => {
    render(<Breadcrumb items={mockItems} />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Current Page")).toBeInTheDocument();
  });

  it("renders with home icon when showHome is true", () => {
    render(<Breadcrumb items={mockItems} showHome />);
    expect(screen.getByLabelText("Home")).toBeInTheDocument();
  });

  it("does not render home icon when showHome is false", () => {
    render(<Breadcrumb items={mockItems} showHome={false} />);
    expect(screen.queryByLabelText("Home")).not.toBeInTheDocument();
  });

  it("renders with custom home href", () => {
    render(<Breadcrumb items={mockItems} showHome homeHref="/custom-home" />);
    const homeLink = screen.getByLabelText("Home");
    expect(homeLink).toHaveAttribute("href", "/custom-home");
  });

  it("renders with different separators", () => {
    const { rerender } = render(<Breadcrumb items={mockItems} separator="slash" />);
    expect(screen.getAllByText("/")).toHaveLength(3); // 3 separators for 4 items

    rerender(<Breadcrumb items={mockItems} separator="arrow" />);
    expect(screen.getAllByText("→")).toHaveLength(3);

    rerender(<Breadcrumb items={mockItems} separator="dot" />);
    expect(screen.getAllByText("•")).toHaveLength(3);
  });

  it("renders with compact variant", () => {
    render(<Breadcrumb items={mockItems} variant="compact" />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("text-xs");
  });

  it("applies custom className", () => {
    render(<Breadcrumb items={mockItems} className="custom-class" />);
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("custom-class");
  });

  it("calls onItemClick when item is clicked", () => {
    const handleItemClick = vi.fn();
    render(<Breadcrumb items={mockItems} onItemClick={handleItemClick} />);
    
    const homeLink = screen.getByText("Home");
    fireEvent.click(homeLink);
    
    expect(handleItemClick).toHaveBeenCalledWith(mockItems[0], 0);
  });

  it("marks last item as current page", () => {
    render(<Breadcrumb items={mockItems} />);
    const lastItem = screen.getByText("Current Page");
    expect(lastItem.parentElement).toHaveAttribute("aria-current", "page");
  });

  it("marks item as current when current prop is true", () => {
    const itemsWithCurrent = [
      { label: "Home", href: "/" },
      { label: "Current", current: true },
    ];
    render(<Breadcrumb items={itemsWithCurrent} />);
    const currentItem = screen.getByText("Current");
    expect(currentItem.parentElement).toHaveAttribute("aria-current", "page");
  });

  it("renders links for items with href", () => {
    render(<Breadcrumb items={mockItems} />);
    const homeLink = screen.getByText("Home");
    expect(homeLink.closest("a")).toHaveAttribute("href", "/");
  });

  it("renders spans for items without href", () => {
    const itemsWithoutHref = [
      { label: "Home" },
      { label: "Current" },
    ];
    render(<Breadcrumb items={itemsWithoutHref} />);
    const homeSpan = screen.getByText("Home");
    expect(homeSpan.closest("a")).not.toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Breadcrumb items={mockItems} ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});

describe("BreadcrumbList", () => {
  it("renders without crashing", () => {
    render(<BreadcrumbList />);
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<BreadcrumbList className="custom-class" />);
    expect(screen.getByRole("list")).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLOListElement>();
    render(<BreadcrumbList ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLOListElement);
  });
});

describe("BreadcrumbItem", () => {
  it("renders without crashing", () => {
    render(
      <BreadcrumbList>
        <BreadcrumbItem>Item</BreadcrumbItem>
      </BreadcrumbList>
    );
    expect(screen.getByText("Item")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <BreadcrumbList>
        <BreadcrumbItem className="custom-class">Item</BreadcrumbItem>
      </BreadcrumbList>
    );
    expect(screen.getByText("Item").closest("li")).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLLIElement>();
    render(
      <BreadcrumbList>
        <BreadcrumbItem ref={ref}>Item</BreadcrumbItem>
      </BreadcrumbList>
    );
    expect(ref.current).toBeInstanceOf(HTMLLIElement);
  });
});

describe("BreadcrumbLink", () => {
  it("renders without crashing", () => {
    render(<BreadcrumbLink href="/test">Link</BreadcrumbLink>);
    expect(screen.getByText("Link")).toBeInTheDocument();
  });

  it("renders as anchor by default", () => {
    render(<BreadcrumbLink href="/test">Link</BreadcrumbLink>);
    expect(screen.getByText("Link").closest("a")).toHaveAttribute("href", "/test");
  });

  it("applies custom className", () => {
    render(<BreadcrumbLink href="/test" className="custom-class">Link</BreadcrumbLink>);
    expect(screen.getByText("Link").closest("a")).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(<BreadcrumbLink href="/test" ref={ref}>Link</BreadcrumbLink>);
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });
});

describe("BreadcrumbPage", () => {
  it("renders without crashing", () => {
    render(<BreadcrumbPage>Current Page</BreadcrumbPage>);
    expect(screen.getByText("Current Page")).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<BreadcrumbPage>Current Page</BreadcrumbPage>);
    const page = screen.getByText("Current Page");
    expect(page).toHaveAttribute("aria-current", "page");
    expect(page).toHaveAttribute("aria-disabled", "true");
  });

  it("applies custom className", () => {
    render(<BreadcrumbPage className="custom-class">Current Page</BreadcrumbPage>);
    expect(screen.getByText("Current Page")).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<BreadcrumbPage ref={ref}>Current Page</BreadcrumbPage>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});

describe("BreadcrumbSeparator", () => {
  it("renders without crashing", () => {
    render(<BreadcrumbSeparator>/</BreadcrumbSeparator>);
    expect(screen.getByText("/")).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<BreadcrumbSeparator>/</BreadcrumbSeparator>);
    const separator = screen.getByText("/");
    expect(separator.closest("li")).toHaveAttribute("role", "presentation");
    expect(separator.closest("li")).toHaveAttribute("aria-hidden", "true");
  });

  it("applies custom className", () => {
    render(<BreadcrumbSeparator className="custom-class">/</BreadcrumbSeparator>);
    expect(screen.getByText("/").closest("li")).toHaveClass("custom-class");
  });
});
