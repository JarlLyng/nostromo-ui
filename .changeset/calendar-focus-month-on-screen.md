---
"@jarllyng/nostromo": patch
---

Calendar: when the selected date is disabled, focus now opens on a day in the
month on screen.

It fell back to today wherever today was. With a disabled selection in one month
and today in another, focus went to a day that was not rendered, and the grid had
no tab stop, so a keyboard user could not reach any date. When today was one of
the next month's days shown at the edge of the grid, focus went there instead.

The order is unchanged otherwise: the selected date, then today, then the first
enabled day of the month on screen. Today is simply skipped when it is not in that
month.
