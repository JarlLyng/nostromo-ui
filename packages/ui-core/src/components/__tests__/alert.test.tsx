import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Alert, AlertTitle, AlertDescription } from "../alert";
import { describe, it, expect, vi } from "vitest";
import React from "react";

describe("Alert", () => {
  it("renders without crashing", () => {
    render(<Alert />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders with title", () => {
    render(<Alert title="Alert Title" />);
    expect(screen.getByText("Alert Title")).toBeInTheDocument();
  });

  it("renders with description", () => {
    render(<Alert description="Alert description" />);
    expect(screen.getByText("Alert description")).toBeInTheDocument();
  });

  it("renders with both title and description", () => {
    render(<Alert title="Alert Title" description="Alert description" />);
    expect(screen.getByText("Alert Title")).toBeInTheDocument();
    expect(screen.getByText("Alert description")).toBeInTheDocument();
  });

  it("renders with children", () => {
    render(
      <Alert>
        <p>Custom content</p>
      </Alert>
    );
    expect(screen.getByText("Custom content")).toBeInTheDocument();
  });

  it("renders with dismissible button when dismissible is true", () => {
    render(<Alert dismissible />);
    expect(screen.getByLabelText("Dismiss alert")).toBeInTheDocument();
  });

  it("does not render dismissible button when dismissible is false", () => {
    render(<Alert dismissible={false} />);
    expect(screen.queryByLabelText("Dismiss alert")).not.toBeInTheDocument();
  });

  it("calls onDismiss when dismiss button is clicked", async () => {
    const handleDismiss = vi.fn();
    render(<Alert dismissible onDismiss={handleDismiss} />);
    const dismissButton = screen.getByLabelText("Dismiss alert");
    fireEvent.click(dismissButton);
    await waitFor(() => expect(handleDismiss).toHaveBeenCalledTimes(1));
  });

  it("hides alert when dismiss button is clicked", async () => {
    render(<Alert dismissible />);
    const alert = screen.getByRole("alert");
    const dismissButton = screen.getByLabelText("Dismiss alert");
    fireEvent.click(dismissButton);
    await waitFor(() => expect(alert).not.toBeInTheDocument());
  });

  it("applies correct variant styling", () => {
    const { rerender } = render(<Alert variant="default" />);
    expect(screen.getByRole("alert")).toHaveClass("bg-background");

    rerender(<Alert variant="success" />);
    expect(screen.getByRole("alert")).toHaveClass("bg-success-50");

    rerender(<Alert variant="warning" />);
    expect(screen.getByRole("alert")).toHaveClass("bg-warning-50");

    rerender(<Alert variant="error" />);
    expect(screen.getByRole("alert")).toHaveClass("bg-error-50");

    rerender(<Alert variant="info" />);
    expect(screen.getByRole("alert")).toHaveClass("bg-info-50");
  });

  it("applies correct size styling", () => {
    const { rerender } = render(<Alert size="sm" />);
    expect(screen.getByRole("alert")).toHaveClass("p-3");

    rerender(<Alert size="default" />);
    expect(screen.getByRole("alert")).toHaveClass("p-4");

    rerender(<Alert size="lg" />);
    expect(screen.getByRole("alert")).toHaveClass("p-6");
  });

  it("applies custom className", () => {
    render(<Alert className="custom-class" />);
    expect(screen.getByRole("alert")).toHaveClass("custom-class");
  });

  it("renders with custom icon", () => {
    render(<Alert icon={<span data-testid="custom-icon">Custom Icon</span>} />);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("renders with default icon for success variant", () => {
    render(<Alert variant="success" />);
    // Check for CheckCircle icon (default success icon)
    expect(screen.getByRole("alert").querySelector("svg")).toBeInTheDocument();
  });

  it("renders with default icon for warning variant", () => {
    render(<Alert variant="warning" />);
    // Check for AlertTriangle icon (default warning icon)
    expect(screen.getByRole("alert").querySelector("svg")).toBeInTheDocument();
  });

  it("renders with default icon for error variant", () => {
    render(<Alert variant="error" />);
    // Check for AlertCircle icon (default error icon)
    expect(screen.getByRole("alert").querySelector("svg")).toBeInTheDocument();
  });

  it("renders with default icon for info variant", () => {
    render(<Alert variant="info" />);
    // Check for Info icon (default info icon)
    expect(screen.getByRole("alert").querySelector("svg")).toBeInTheDocument();
  });

  it("does not render icon when icon is null", () => {
    render(<Alert icon={null} />);
    expect(screen.getByRole("alert").querySelector("svg")).not.toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Alert ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe("AlertTitle", () => {
  it("renders without crashing", () => {
    render(<AlertTitle>Title</AlertTitle>);
    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<AlertTitle className="custom-class">Title</AlertTitle>);
    expect(screen.getByText("Title")).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLHeadingElement>();
    render(<AlertTitle ref={ref}>Title</AlertTitle>);
    expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
  });
});

describe("AlertDescription", () => {
  it("renders without crashing", () => {
    render(<AlertDescription>Description</AlertDescription>);
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<AlertDescription className="custom-class">Description</AlertDescription>);
    expect(screen.getByText("Description")).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<AlertDescription ref={ref}>Description</AlertDescription>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
