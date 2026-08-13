---
"@jarllyng/nostromo": patch
---

Stop `Calendar` flickering when a date is picked, and make multi-series charts
distinguishable.

`Calendar`'s trigger had both `onClick` and `onFocus` opening the popover. Radix
returns focus to the trigger when the popover closes, so selecting a date closed it
and the focus handler reopened it immediately - the flicker. Opening on focus also
popped the calendar open when tabbing past the field, so it is gone; the click
handler covers mouse and keyboard alike.

Picking a day outside the current month also deferred the selection with
`setTimeout(..., 0)`, which rendered the new month in one frame and the selection in
the next. Both updates are applied together now.

`Chart`'s default palette opened with `brand-500` followed by `brand-600` - two
neighbouring shades of the same purple - so a two-series chart drew two nearly
identical lines. Reordered so distinct hues come first and brand variants last.
Bars also get rounded tops.
