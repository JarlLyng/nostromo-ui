import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { Toast, ToastProvider, useToast, useToastNotification } from "../toast";

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ToastProvider>{children}</ToastProvider>
);

const ToastTestComponent = () => {
  const toast = useToastNotification();

  return (
    <div>
      <button onClick={() => toast.success("Success message")}>
        Show Success
      </button>
      <button onClick={() => toast.error("Error message")}>Show Error</button>
      <button onClick={() => toast.warning("Warning message")}>
        Show Warning
      </button>
      <button onClick={() => toast.info("Info message")}>Show Info</button>
      <button
        onClick={() =>
          toast.custom({
            title: "Custom Toast",
            description: "Custom message",
            variant: "default",
          })
        }
      >
        Show Custom
      </button>
      <button onClick={() => toast.clear()}>Clear All</button>
    </div>
  );
};

describe("Toast", () => {
  it("renders toast with title and description", () => {
    render(
      <Toast
        title="Test Title"
        description="Test Description"
        variant="default"
        position="top-right"
        appearDelay={0}
      />,
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders toast without title", () => {
    render(
      <Toast
        description="Test Description"
        variant="default"
        position="top-right"
        appearDelay={0}
      />,
    );

    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("renders toast without description", () => {
    render(
      <Toast
        title="Test Title"
        variant="default"
        position="top-right"
        appearDelay={0}
      />,
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("applies correct variant classes", () => {
    const { rerender } = render(
      <Toast
        title="Test"
        variant="success"
        position="top-right"
        appearDelay={0}
      />,
    );
    const title1 = screen.getByText("Test");
    const toastRoot1 = title1.closest("[data-visible][data-leaving]")!;
    expect(toastRoot1).toHaveClass(
      "border-success-200",
      "bg-success-50",
      "text-success-900",
    );

    rerender(
      <Toast
        title="Test"
        variant="error"
        position="top-right"
        appearDelay={0}
      />,
    );
    const title2 = screen.getByText("Test");
    const toastRoot2 = title2.closest("[data-visible][data-leaving]")!;
    expect(toastRoot2).toHaveClass(
      "border-destructive/20",
      "bg-destructive/10",
      "text-destructive",
    );

    rerender(
      <Toast
        title="Test"
        variant="warning"
        position="top-right"
        appearDelay={0}
      />,
    );
    const title3 = screen.getByText("Test");
    const toastRoot3 = title3.closest("[data-visible][data-leaving]")!;
    expect(toastRoot3).toHaveClass(
      "border-warning-200",
      "bg-warning-50",
      "text-warning-900",
    );

    rerender(
      <Toast
        title="Test"
        variant="info"
        position="top-right"
        appearDelay={0}
      />,
    );
    const title4 = screen.getByText("Test");
    const toastRoot4 = title4.closest("[data-visible][data-leaving]")!;
    expect(toastRoot4).toHaveClass(
      "border-info-200",
      "bg-info-50",
      "text-info-900",
    );
  });

  it("applies correct position classes", () => {
    const { rerender } = render(
      <Toast title="Test" position="top-left" appearDelay={0} />,
    );
    const title1 = screen.getByText("Test");
    const toastRoot1 = title1.closest("[data-visible][data-leaving]")!;
    expect(toastRoot1).toHaveClass("fixed", "top-4", "left-4");

    rerender(<Toast title="Test" position="top-center" appearDelay={0} />);
    const title2 = screen.getByText("Test");
    const toastRoot2 = title2.closest("[data-visible][data-leaving]")!;
    expect(toastRoot2).toHaveClass(
      "fixed",
      "top-4",
      "left-1/2",
      "-translate-x-1/2",
    );

    rerender(<Toast title="Test" position="bottom-right" appearDelay={0} />);
    const title3 = screen.getByText("Test");
    const toastRoot3 = title3.closest("[data-visible][data-leaving]")!;
    expect(toastRoot3).toHaveClass("fixed", "bottom-4", "right-4");
  });

  it("renders action button when provided", () => {
    const actionClick = vi.fn();
    render(
      <Toast
        title="Test"
        action={{
          label: "Action",
          onClick: actionClick,
        }}
        position="top-right"
        appearDelay={0}
      />,
    );

    const actionButton = screen.getByText("Action");
    expect(actionButton).toBeInTheDocument();

    fireEvent.click(actionButton);
    expect(actionClick).toHaveBeenCalled();
  });

  it("renders close button", () => {
    render(<Toast title="Test" position="top-right" appearDelay={0} />);

    const closeButton = screen.getByLabelText("Close notification");
    expect(closeButton).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const onClose = vi.fn();
    render(
      <Toast
        title="Test"
        onClose={onClose}
        position="top-right"
        appearDelay={0}
        animationMs={0}
      />,
    );

    const closeButton = screen.getByLabelText("Close notification");
    fireEvent.click(closeButton);

    await waitFor(
      () => {
        expect(onClose).toHaveBeenCalled();
      },
      { timeout: 5000 },
    );
  });

  it("auto-closes after duration", async () => {
    const onClose = vi.fn();
    render(
      <Toast
        title="Test"
        duration={100}
        onClose={onClose}
        position="top-right"
        appearDelay={0}
        animationMs={0}
      />,
    );

    expect(screen.getByText("Test")).toBeInTheDocument();

    await waitFor(
      () => {
        expect(onClose).toHaveBeenCalled();
      },
      { timeout: 200 },
    );
  });

  it("does not auto-close when duration is 0", async () => {
    const onClose = vi.fn();
    render(
      <Toast
        title="Test"
        duration={0}
        onClose={onClose}
        position="top-right"
        appearDelay={0}
      />,
    );

    expect(screen.getByText("Test")).toBeInTheDocument();

    // Wait a bit to ensure it doesn't auto-close
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("renders correct icons for each variant", () => {
    const { rerender } = render(
      <Toast
        title="Success"
        variant="success"
        position="top-right"
        appearDelay={0}
      />,
    );
    const title1 = screen.getByText("Success");
    const toastRoot1 = title1.closest("[data-visible][data-leaving]")!;
    const icon1 = toastRoot1.querySelector("svg")!;
    expect(icon1).toHaveClass("text-success-600");

    rerender(
      <Toast
        title="Error"
        variant="error"
        position="top-right"
        appearDelay={0}
      />,
    );
    const title2 = screen.getByText("Error");
    const toastRoot2 = title2.closest("[data-visible][data-leaving]")!;
    const icon2 = toastRoot2.querySelector("svg")!;
    expect(icon2).toHaveClass("text-destructive");

    rerender(
      <Toast
        title="Warning"
        variant="warning"
        position="top-right"
        appearDelay={0}
      />,
    );
    const title3 = screen.getByText("Warning");
    const toastRoot3 = title3.closest("[data-visible][data-leaving]")!;
    const icon3 = toastRoot3.querySelector("svg")!;
    expect(icon3).toHaveClass("text-warning-600");

    rerender(
      <Toast
        title="Info"
        variant="info"
        position="top-right"
        appearDelay={0}
      />,
    );
    const title4 = screen.getByText("Info");
    const toastRoot4 = title4.closest("[data-visible][data-leaving]")!;
    const icon4 = toastRoot4.querySelector("svg")!;
    expect(icon4).toHaveClass("text-info-600");
  });

  it("applies custom className", () => {
    render(
      <Toast
        title="Test"
        className="custom-toast"
        position="top-right"
        appearDelay={0}
      />,
    );

    const title = screen.getByText("Test");
    const toastRoot = title.closest("[data-visible][data-leaving]")!;
    expect(toastRoot).toHaveClass("custom-toast");
  });

  it("renders children when provided", () => {
    render(
      <Toast title="Test" position="top-right" appearDelay={0}>
        <div data-testid="custom-content">Custom content</div>
      </Toast>,
    );

    expect(screen.getByTestId("custom-content")).toBeInTheDocument();
  });
});

describe("ToastProvider and useToastNotification", () => {
  it("provides toast context", () => {
    render(
      <TestWrapper>
        <ToastTestComponent />
      </TestWrapper>,
    );

    expect(screen.getByText("Show Success")).toBeInTheDocument();
  });

  it("adds and removes toasts", async () => {
    render(
      <TestWrapper>
        <ToastTestComponent />
      </TestWrapper>,
    );

    const successButton = screen.getByText("Show Success");
    fireEvent.click(successButton);

    await waitFor(
      () => {
        expect(screen.getByText("Success message")).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });

  it("shows multiple toasts", async () => {
    render(
      <TestWrapper>
        <ToastTestComponent />
      </TestWrapper>,
    );

    fireEvent.click(screen.getByText("Show Success"));
    fireEvent.click(screen.getByText("Show Error"));

    await waitFor(() => {
      expect(screen.getByText("Success message")).toBeInTheDocument();
      expect(screen.getByText("Error message")).toBeInTheDocument();
    });
  });

  it("clears all toasts", async () => {
    render(
      <TestWrapper>
        <ToastTestComponent />
      </TestWrapper>,
    );

    fireEvent.click(screen.getByText("Show Success"));
    fireEvent.click(screen.getByText("Show Error"));

    await waitFor(
      () => {
        expect(screen.getByText("Success message")).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    fireEvent.click(screen.getByText("Clear All"));

    await waitFor(
      () => {
        expect(screen.queryByText("Success message")).not.toBeInTheDocument();
        expect(screen.queryByText("Error message")).not.toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });

  it("provides convenience methods", async () => {
    render(
      <TestWrapper>
        <ToastTestComponent />
      </TestWrapper>,
    );

    fireEvent.click(screen.getByText("Show Success"));
    await waitFor(
      () => {
        expect(screen.getByText("Success message")).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    fireEvent.click(screen.getByText("Show Error"));
    await waitFor(
      () => {
        expect(screen.getByText("Error message")).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    fireEvent.click(screen.getByText("Show Warning"));
    await waitFor(
      () => {
        expect(screen.getByText("Warning message")).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    fireEvent.click(screen.getByText("Show Info"));
    await waitFor(
      () => {
        expect(screen.getByText("Info message")).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });
});

/**
 * The three things a 2026-09-12 audit found, each of which the suite above
 * passed straight through: notifications that covered each other and ran off the
 * left edge (#248), dismissals that never left the provider's state (#249), and
 * no way for a screen reader to hear a notification arrive (#250).
 *
 * Geometry is not answerable here, so the stacking half of #248 is a browser
 * test. What is checked below is the structure that makes it possible.
 */

const ToastStateProbe = ({
  duration = 0,
  variant = "default",
}: {
  duration?: number;
  variant?: "default" | "error";
}) => {
  const { toasts, addToast, removeToast, clearToasts } = useToast();
  return (
    <div>
      <span data-testid="count">{toasts.length}</span>
      <button
        onClick={() =>
          addToast({ title: "Persistent", duration, variant } as never)
        }
      >
        Add
      </button>
      <button onClick={() => toasts[0]?.id && removeToast(toasts[0].id)}>
        Dismiss first
      </button>
      <button onClick={() => clearToasts()}>Clear</button>
    </div>
  );
};

describe("ToastProvider lifecycle", () => {
  // #249. Dismissing used to unmount the toast and leave the entry behind, so a
  // consumer reading `toasts.length` counted notifications nobody could see.
  it("removes a dismissed persistent toast from state", async () => {
    render(
      <ToastProvider>
        <ToastStateProbe />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByText("Add"));
    await screen.findByText("Persistent");
    expect(screen.getByTestId("count")).toHaveTextContent("1");

    fireEvent.click(screen.getByLabelText("Close notification"));

    await waitFor(() =>
      expect(screen.getByTestId("count")).toHaveTextContent("0"),
    );
    expect(screen.queryByText("Persistent")).not.toBeInTheDocument();
  });

  it("does not accumulate invisible entries over repeated dismissals", async () => {
    render(
      <ToastProvider>
        <ToastStateProbe />
      </ToastProvider>,
    );

    for (let i = 0; i < 3; i++) {
      fireEvent.click(screen.getByText("Add"));
      await screen.findByText("Persistent");
      fireEvent.click(screen.getByLabelText("Close notification"));
      await waitFor(() =>
        expect(screen.getByTestId("count")).toHaveTextContent("0"),
      );
    }
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("fires onClose once however hard the button is clicked", async () => {
    const onClose = vi.fn();
    const Probe = () => {
      const { addToast } = useToast();
      return (
        <button
          onClick={() => addToast({ title: "Once", duration: 0, onClose })}
        >
          Add
        </button>
      );
    };
    render(
      <ToastProvider>
        <Probe />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByText("Add"));
    await screen.findByText("Once");

    const close = screen.getByLabelText("Close notification");
    fireEvent.click(close);
    fireEvent.click(close);
    fireEvent.click(close);

    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
    // And it stays at one after the animation window has fully elapsed.
    await new Promise((resolve) => setTimeout(resolve, 250));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("removes a timed toast from state when its time is up", async () => {
    render(
      <ToastProvider>
        <ToastStateProbe duration={50} />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByText("Add"));
    await screen.findByText("Persistent");
    expect(screen.getByTestId("count")).toHaveTextContent("1");

    await waitFor(
      () => expect(screen.getByTestId("count")).toHaveTextContent("0"),
      { timeout: 2000 },
    );
  });

  // dismiss(id) and clear() are the programmatic routes, and they go through the
  // same exit as a click rather than cutting the toast out of the DOM.
  it("takes the same path for a programmatic dismiss", async () => {
    render(
      <ToastProvider>
        <ToastStateProbe />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByText("Add"));
    const toast = await screen.findByText("Persistent");
    const root = toast.closest("[data-leaving]")!;
    expect(root).toHaveAttribute("data-leaving", "false");

    fireEvent.click(screen.getByText("Dismiss first"));
    await waitFor(() =>
      expect(screen.getByTestId("count")).toHaveTextContent("0"),
    );
  });

  it("clears everything, and the state agrees", async () => {
    render(
      <ToastProvider>
        <ToastStateProbe />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByText("Add"));
    fireEvent.click(screen.getByText("Add"));
    await waitFor(() =>
      expect(screen.getByTestId("count")).toHaveTextContent("2"),
    );

    fireEvent.click(screen.getByText("Clear"));
    await waitFor(() =>
      expect(screen.getByTestId("count")).toHaveTextContent("0"),
    );
    expect(screen.queryByText("Persistent")).not.toBeInTheDocument();
  });
});

describe("Toast announcement", () => {
  // #250. There was no role and no aria-live anywhere, so a notification that
  // appeared on its own was never announced.
  it("is a polite status by default", async () => {
    render(
      <ToastProvider>
        <ToastStateProbe />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText("Add"));

    const toast = await screen.findByRole("status");
    expect(toast).toHaveAttribute("aria-live", "polite");
    expect(toast).toHaveAttribute("aria-atomic", "true");
    expect(toast).toHaveTextContent("Persistent");
  });

  // An error is the one variant worth interrupting for.
  it("is an assertive alert for an error", async () => {
    render(
      <ToastProvider>
        <ToastStateProbe variant="error" />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText("Add"));

    const toast = await screen.findByRole("alert");
    expect(toast).toHaveAttribute("aria-live", "assertive");
  });

  it("lets the caller override both", () => {
    render(
      <Toast
        title="Mine"
        appearDelay={0}
        role="alert"
        aria-live="assertive"
        aria-atomic={false}
      />,
    );
    const toast = screen.getByRole("alert");
    expect(toast).toHaveAttribute("aria-live", "assertive");
    expect(toast).toHaveAttribute("aria-atomic", "false");
  });

  // Announcing must not mean stealing the caret from whatever the reader was
  // doing. The close button is reachable by Tab instead.
  it("does not move focus", async () => {
    render(
      <ToastProvider>
        <ToastStateProbe />
      </ToastProvider>,
    );
    const add = screen.getByText("Add");
    add.focus();
    fireEvent.click(add);
    await screen.findByRole("status");

    expect(document.activeElement).toBe(add);
  });
});

describe("Toast viewport", () => {
  // #248. Each toast used to position itself with `fixed right-4 w-full` and
  // stack by `translateY(index * 8px)`. Now one bounded column per position
  // stacks them in normal flow, and the toasts inside it are ordinary blocks.
  it("groups toasts into one bounded column per position", async () => {
    const Probe = () => {
      const { addToast } = useToast();
      return (
        <button
          onClick={() => {
            addToast({ title: "First", duration: 0 });
            addToast({ title: "Second", duration: 0 });
            addToast({
              title: "Elsewhere",
              duration: 0,
              position: "bottom-left",
            });
          }}
        >
          Add three
        </button>
      );
    };
    render(
      <ToastProvider>
        <Probe />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText("Add three"));
    await screen.findByText("Second");

    const viewports = document.querySelectorAll("[data-toast-viewport]");
    expect(viewports).toHaveLength(2);

    const topRight = document.querySelector(
      '[data-toast-viewport="top-right"]',
    )!;
    expect(topRight).toHaveClass("fixed", "flex", "max-w-sm", "gap-2");
    expect(topRight.querySelectorAll("[data-leaving]")).toHaveLength(2);

    // Bottom edges stack upwards, so the newest sits nearest the edge.
    const bottomLeft = document.querySelector(
      '[data-toast-viewport="bottom-left"]',
    )!;
    expect(bottomLeft).toHaveClass("flex-col-reverse");
  });

  it("leaves positioning to the column for a contained toast", async () => {
    render(
      <ToastProvider>
        <ToastStateProbe />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText("Add"));
    const toast = (await screen.findByText("Persistent")).closest(
      "[data-leaving]",
    )!;

    // The classes that made it a full-viewport box hanging off the left edge.
    expect(toast).not.toHaveClass("fixed");
    expect(toast).not.toHaveClass("top-4");
    expect(toast).toHaveClass("w-full");
  });

  // A standalone <Toast position> is still a supported way to use it, and still
  // positions itself - now with a width that cannot run off the screen.
  it("keeps a standalone toast positioning itself, within the viewport", () => {
    render(<Toast title="Alone" position="top-right" appearDelay={0} />);
    const toast = screen.getByText("Alone").closest("[data-leaving]")!;
    expect(toast).toHaveClass("fixed", "top-4", "right-4");
    expect(toast).toHaveClass("max-w-sm");
    expect(toast).not.toHaveClass("w-full");
  });
});
