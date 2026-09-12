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

/**
 * The three Calendar findings of the 2026-09-12 audit: #240 dates rendered under
 * the wrong weekday when outside days are hidden, #241 roving focus that could
 * leave the grid with no tab stop, and #242 a `locale` that only reached the
 * month heading.
 *
 * All three passed straight through the 20 tests above.
 */

const open = async () => {
  fireEvent.click(
    screen.getByRole("button", { name: /open calendar|select date/i }),
  );
  await screen.findByRole("button", { name: /previous month|forrige/i });
};

/** The date buttons, in grid order, excluding the spacers. */
const dayButtons = () =>
  Array.from(
    document.querySelectorAll<HTMLButtonElement>(
      '[aria-label*="20"][aria-selected]',
    ),
  );

const placeholders = () =>
  document.querySelectorAll("[data-calendar-placeholder]");

describe("Calendar grid alignment", () => {
  // 2026-09-01 is a Tuesday. Monday-first puts it in column two, so one column
  // has to be held open ahead of it. Hiding the outside dates used to remove the
  // cell as well, and every date in the month shifted one heading to the left.
  it("keeps the first of the month under its weekday without outside days", async () => {
    render(
      <Calendar
        value={new Date(2026, 8, 14)}
        showOutsideDays={false}
        firstDayOfWeek={1}
      />,
    );
    await open();

    expect(placeholders()).toHaveLength(1);
    // The spacer comes first, so the 1st is the second cell in the grid.
    const grid = document.querySelector('[aria-label="Calendar"]')!;
    const cells = Array.from(
      grid.querySelectorAll(
        "[data-calendar-placeholder], button[aria-selected]",
      ),
    );
    expect(cells[0]).toHaveAttribute("data-calendar-placeholder");
    expect(cells[1]).toHaveTextContent("1");
  });

  it("holds two columns open when the week starts on Sunday", async () => {
    render(
      <Calendar
        value={new Date(2026, 8, 14)}
        showOutsideDays={false}
        firstDayOfWeek={0}
      />,
    );
    await open();

    expect(placeholders()).toHaveLength(2);
  });

  it("uses real outside dates when they are shown", async () => {
    render(
      <Calendar
        value={new Date(2026, 8, 14)}
        showOutsideDays
        firstDayOfWeek={1}
      />,
    );
    await open();

    expect(placeholders()).toHaveLength(0);
  });

  // A spacer is not a control and must not be announced as an empty one.
  it("keeps the spacers out of the tab order and the accessibility tree", async () => {
    render(
      <Calendar
        value={new Date(2026, 8, 14)}
        showOutsideDays={false}
        firstDayOfWeek={1}
      />,
    );
    await open();

    const spacer = placeholders()[0]!;
    expect(spacer.tagName).toBe("DIV");
    expect(spacer).toHaveAttribute("aria-hidden", "true");
  });
});

describe("Calendar focus", () => {
  // Opening used to land on the current month whatever was selected, which for a
  // date in 2020 meant paging back through six years.
  it("opens on the month of the selected date", async () => {
    render(<Calendar value={new Date(2020, 0, 15)} />);
    await open();

    expect(screen.getByText(/january 2020/i)).toBeInTheDocument();
  });

  // The reported failure: focus a Monday with Tuesdays disabled, press
  // ArrowRight, and the only tabIndex=0 in the grid ends up on a disabled button
  // that cannot take focus. There was then no reachable date at all.
  it("steps over a disabled day rather than landing on it", async () => {
    render(<Calendar value={new Date(2026, 8, 14)} disabledDays={[2]} />);
    await open();

    const monday = screen.getByLabelText(/monday, september 14, 2026/i);
    fireEvent.keyDown(monday, { key: "ArrowRight" });

    // Tuesday the 15th is disabled, so focus goes to Wednesday the 16th.
    const wednesday = screen.getByLabelText(/wednesday, september 16, 2026/i);
    expect(wednesday).toHaveAttribute("tabindex", "0");
    expect(
      screen.getByLabelText(/tuesday, september 15, 2026/i),
    ).toHaveAttribute("tabindex", "-1");
  });

  it("always leaves exactly one tab stop, and never on a disabled date", async () => {
    render(<Calendar value={new Date(2026, 8, 14)} disabledDays={[2]} />);
    await open();

    const stops = dayButtons().filter(
      (button) => button.getAttribute("tabindex") === "0",
    );
    expect(stops).toHaveLength(1);
    expect(stops[0]).not.toBeDisabled();
  });

  it("opens on an enabled date when the selected one is disabled", async () => {
    render(
      <Calendar
        value={new Date(2026, 8, 15)}
        disabledDates={[new Date(2026, 8, 15)]}
      />,
    );
    await open();

    const stops = dayButtons().filter(
      (button) => button.getAttribute("tabindex") === "0",
    );
    expect(stops).toHaveLength(1);
    expect(stops[0]).not.toBeDisabled();
  });

  // Every date disabled is a legitimate configuration, and the search for an
  // enabled one has to stop. Without a bound it walked forward forever.
  it("survives a month with nothing enabled", async () => {
    render(
      <Calendar
        value={new Date(2026, 8, 14)}
        disabledDays={[0, 1, 2, 3, 4, 5, 6]}
      />,
    );
    await open();

    const stops = dayButtons().filter(
      (button) => button.getAttribute("tabindex") === "0",
    );
    expect(stops).toHaveLength(0);
    expect(screen.getByText(/september 2026/i)).toBeInTheDocument();
  });

  // `new Date(y, m + 1, 31)` from 31 March is 1 May, so a month step from the end
  // of a long month skipped the short month entirely.
  it("clamps a month step to the length of the target month", async () => {
    render(<Calendar value={new Date(2026, 2, 31)} />);
    await open();

    const lastOfMarch = screen.getByLabelText(/march 31, 2026/i);
    fireEvent.keyDown(lastOfMarch, { key: "PageDown" });

    expect(screen.getByText(/april 2026/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/april 30, 2026/i)).toHaveAttribute(
      "tabindex",
      "0",
    );
  });

  // The header buttons moved the grid and left focus behind on a date that was
  // no longer rendered.
  it("brings focus along when the month buttons are used", async () => {
    render(<Calendar value={new Date(2026, 8, 14)} />);
    await open();

    fireEvent.click(screen.getByRole("button", { name: /next month/i }));
    expect(screen.getByText(/october 2026/i)).toBeInTheDocument();

    const stops = dayButtons().filter(
      (button) => button.getAttribute("tabindex") === "0",
    );
    expect(stops).toHaveLength(1);
    // "Wednesday, October 14, 2026" - the month with a date in it, not a heading.
    expect(stops[0]!.getAttribute("aria-label")).toMatch(/october \d+, 2026/i);
  });
});

describe("Calendar locale", () => {
  // `locale` reached the month heading and the day aria-labels and nothing else,
  // so a Danish calendar showed "Sep 14, 2026" over "Mon Tue Wed".
  it("formats the selected date in the given locale", () => {
    const { rerender } = render(
      <Calendar value={new Date(2026, 8, 14)} locale="en-US" />,
    );
    expect(screen.getByText("Sep 14, 2026")).toBeInTheDocument();

    rerender(<Calendar value={new Date(2026, 8, 14)} locale="da-DK" />);
    expect(screen.getByText("14. sep. 2026")).toBeInTheDocument();
  });

  it("names the weekdays in the given locale", async () => {
    render(<Calendar value={new Date(2026, 8, 14)} locale="da-DK" />);
    await open();

    expect(screen.getByText("man.")).toBeInTheDocument();
    expect(screen.getByText("tirs.")).toBeInTheDocument();
    expect(screen.queryByText("Mon")).not.toBeInTheDocument();
  });

  it("keeps the weekday order the first day of the week asks for", async () => {
    render(
      <Calendar
        value={new Date(2026, 8, 14)}
        locale="en-US"
        firstDayOfWeek={0}
      />,
    );
    await open();

    const grid = document.querySelector('[aria-label="Calendar"]')!;
    const headings = Array.from(grid.querySelectorAll("div")).filter(
      (el) => el.textContent === "Sun" || el.textContent === "Mon",
    );
    expect(headings[0]).toHaveTextContent("Sun");
  });

  // A locale moves the dates; it cannot translate "Today".
  it("takes translations for the words it says itself", async () => {
    render(
      <Calendar
        locale="da-DK"
        labels={{
          openCalendar: "Åbn kalender",
          placeholder: "Vælg dato...",
          previousMonth: "Forrige måned",
          nextMonth: "Næste måned",
          today: "I dag",
        }}
      />,
    );

    expect(screen.getByText("Vælg dato...")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Åbn kalender" }));
    await screen.findByRole("button", { name: "Forrige måned" });

    expect(
      screen.getByRole("button", { name: "Næste måned" }),
    ).toBeInTheDocument();
    expect(screen.getByText("I dag")).toBeInTheDocument();
  });

  it("lets the placeholder prop win over the label", () => {
    render(
      <Calendar placeholder="Pick one" labels={{ placeholder: "Ignored" }} />,
    );
    expect(screen.getByText("Pick one")).toBeInTheDocument();
  });

  it("counts multiple dates through a label", () => {
    render(
      <Calendar
        mode="multiple"
        value={[new Date(2026, 8, 14), new Date(2026, 8, 15)]}
        labels={{ multipleSelected: (count) => `${count} datoer valgt` }}
      />,
    );
    expect(screen.getByText("2 datoer valgt")).toBeInTheDocument();
  });
});
