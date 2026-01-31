import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { Calendar } from "../calendar";

describe("Calendar", () => {
  it("renders calendar button", () => {
    render(<Calendar />);

    const button = screen.getByRole("button", {
      name: /open calendar|select date/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("opens calendar popover when button is clicked", async () => {
    render(<Calendar />);

    const button = screen.getByRole("button", {
      name: /open calendar|select date/i,
    });
    fireEvent.click(button);

    await waitFor(
      () => {
        expect(
          screen.getByRole("button", { name: /previous month/i }),
        ).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });

  it("displays current month and year", async () => {
    render(<Calendar />);

    const button = screen.getByRole("button", {
      name: /open calendar|select date/i,
    });
    fireEvent.click(button);

    await waitFor(() => {
      const today = new Date();
      const monthYear = today.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
      expect(screen.getByText(monthYear)).toBeInTheDocument();
    });
  });

  it("selects a date in single mode", async () => {
    const onChange = vi.fn();
    render(<Calendar mode="single" onChange={onChange} />);

    const button = screen.getByRole("button", {
      name: /open calendar|select date/i,
    });
    fireEvent.click(button);

    await waitFor(
      () => {
        // Find today's date button
        const today = new Date();
        const todayLabel = today.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        const todayButton = screen.getByLabelText(todayLabel);
        fireEvent.click(todayButton);
      },
      { timeout: 5000 },
    );

    await waitFor(
      () => {
        expect(onChange).toHaveBeenCalled();
      },
      { timeout: 5000 },
    );
  });

  it("selects date range in range mode", async () => {
    const onChange = vi.fn();
    render(<Calendar mode="range" onChange={onChange} />);

    const button = screen.getByRole("button", {
      name: /open calendar|select date/i,
    });
    fireEvent.click(button);

    await waitFor(() => {
      const today = new Date();
      const todayLabel = today.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const todayButton = screen.getByLabelText(todayLabel);
      fireEvent.click(todayButton);
    });

    await waitFor(
      () => {
        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({ from: expect.any(Date) }),
        );
      },
      { timeout: 5000 },
    );
  });

  it("selects multiple dates in multiple mode", async () => {
    const onChange = vi.fn();
    render(<Calendar mode="multiple" onChange={onChange} />);

    const button = screen.getByRole("button", {
      name: /open calendar|select date/i,
    });
    fireEvent.click(button);

    await waitFor(
      () => {
        const today = new Date();
        const todayLabel = today.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        const todayButton = screen.getByLabelText(todayLabel);
        fireEvent.click(todayButton);
      },
      { timeout: 5000 },
    );

    await waitFor(
      () => {
        expect(onChange).toHaveBeenCalledWith(
          expect.arrayContaining([expect.any(Date)]),
        );
      },
      { timeout: 5000 },
    );
  });

  it("navigates to previous month", async () => {
    render(<Calendar />);

    const button = screen.getByRole("button", {
      name: /open calendar|select date/i,
    });
    fireEvent.click(button);

    // Wait for calendar to open
    await waitFor(
      () => {
        expect(
          screen.getByRole("button", { name: /previous month/i }),
        ).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    // Verify current month is displayed using testid
    const monthYearElement = screen.getByTestId("calendar-month-year");
    expect(monthYearElement).toBeInTheDocument();

    // Calculate expected previous month based on current date
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Calculate previous month
    const prevMonth = new Date(currentYear, currentMonth - 1, 1);
    const expectedMonthYear = prevMonth.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    // Click previous month button
    const prevButton = screen.getByRole("button", { name: /previous month/i });
    fireEvent.click(prevButton);

    // Wait for the month display to change to previous month using testid
    await waitFor(
      () => {
        const updatedMonthYearElement = screen.getByTestId(
          "calendar-month-year",
        );
        expect(updatedMonthYearElement).toHaveTextContent(expectedMonthYear);
      },
      { timeout: 5000 },
    );
  });

  it("navigates to next month", async () => {
    render(<Calendar />);

    const button = screen.getByRole("button", {
      name: /open calendar|select date/i,
    });
    fireEvent.click(button);

    // Wait for calendar to open
    await waitFor(
      () => {
        expect(
          screen.getByRole("button", { name: /next month/i }),
        ).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    // Calculate expected next month based on current date
    const currentDate = new Date();
    const nextMonthExpected = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1,
    );
    const expectedMonthYear = nextMonthExpected.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    // Click next month button
    const nextButton = screen.getByRole("button", { name: /next month/i });
    fireEvent.click(nextButton);

    // Wait for the month display to change to next month using testid
    await waitFor(
      () => {
        const updatedMonthYearElement = screen.getByTestId(
          "calendar-month-year",
        );
        expect(updatedMonthYearElement).toHaveTextContent(expectedMonthYear);
      },
      { timeout: 5000 },
    );
  });

  it("navigates to today when Today button is clicked", async () => {
    render(<Calendar />);

    const button = screen.getByRole("button", {
      name: /open calendar|select date/i,
    });
    fireEvent.click(button);

    // Wait for calendar to open
    await waitFor(
      () => {
        expect(
          screen.getByRole("button", { name: /next month/i }),
        ).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    // Navigate away from current month
    const nextButton = screen.getByRole("button", { name: /next month/i });
    fireEvent.click(nextButton);

    // Click Today button
    const todayButton = screen.getByRole("button", { name: /today/i });
    fireEvent.click(todayButton);

    // Should be back to current month
    await waitFor(
      () => {
        const today = new Date();
        const expectedMonthYear = today.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        });
        const updatedMonthYearElement = screen.getByTestId(
          "calendar-month-year",
        );
        expect(updatedMonthYearElement).toHaveTextContent(expectedMonthYear);
      },
      { timeout: 5000 },
    );
  });

  it("disables dates before minDate", async () => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 5); // 5 days from now

    render(<Calendar minDate={minDate} />);

    const button = screen.getByRole("button", {
      name: /open calendar|select date/i,
    });
    fireEvent.click(button);

    await waitFor(
      () => {
        const today = new Date();
        const todayLabel = today.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        const todayButton = screen.getByLabelText(todayLabel);
        expect(todayButton).toBeDisabled();
      },
      { timeout: 5000 },
    );
  });

  it("disables dates after maxDate", async () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() - 5); // 5 days ago

    render(<Calendar maxDate={maxDate} />);

    const button = screen.getByRole("button", {
      name: /open calendar|select date/i,
    });
    fireEvent.click(button);

    await waitFor(
      () => {
        const today = new Date();
        const todayLabel = today.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        const todayButton = screen.getByLabelText(todayLabel);
        expect(todayButton).toBeDisabled();
      },
      { timeout: 5000 },
    );
  });

  it("displays custom placeholder", () => {
    render(<Calendar placeholder="Choose a date" />);

    expect(screen.getByText("Choose a date")).toBeInTheDocument();
  });

  it("displays label when provided", () => {
    render(<Calendar label="Birth Date" />);

    expect(screen.getByText("Birth Date")).toBeInTheDocument();
  });

  it("displays helper text when provided", () => {
    render(<Calendar helperText="Select your birth date" />);

    expect(screen.getByText("Select your birth date")).toBeInTheDocument();
  });

  it("shows error state", () => {
    render(<Calendar error={true} helperText="Date is required" />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-invalid", "true");
  });
});
