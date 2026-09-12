import * as React from "react";
import { Calendar } from "@jarllyng/nostromo";

/**
 * Weekday alignment is geometry.
 *
 * The audit behind #240 measured September 1 and the "Mon" heading at the same
 * x-coordinate with `showOutsideDays={false}`, in both Chromium and WebKit. A
 * column index is not something jsdom can answer; a bounding box is.
 *
 * `?case=calendar&month=...&first=...&outside=...` so one fixture covers the
 * months with different start weekdays the issue asks for.
 */
export function CalendarCase() {
  const params = new URLSearchParams(window.location.search);
  const month = params.get("month") ?? "2026-09";
  const first = params.get("first") === "0" ? 0 : 1;
  const outside = params.get("outside") === "true";
  const disabled = params.get("disabledDays");

  const [year, monthNumber] = month.split("-").map(Number);
  const value = new Date(year!, monthNumber! - 1, 14);

  return (
    <div style={{ padding: 24 }}>
      <Calendar
        value={value}
        showOutsideDays={outside}
        firstDayOfWeek={first}
        {...(disabled ? { disabledDays: disabled.split(",").map(Number) } : {})}
      />
    </div>
  );
}
