---
"@jarllyng/nostromo": minor
---

Calendar: dates under the right weekday, focus that can always move, and a locale
that reaches everything.

Three findings from the 2026-09-12 audit, all of which 20 existing tests passed
straight through.

**Hiding the outside days moved every date one column left (#240).** The leading
cells were only added when the neighbouring months' dates were shown, so with
`showOutsideDays={false}` the 1st started in the first column whatever weekday it
was. September 2026 begins on a Tuesday and rendered under Monday, and so did the
rest of the month. The cells are always there now; with outside days hidden they
are empty spacers, `aria-hidden` and not controls.

**Roving focus could leave the grid with no tab stop (#241).** Arrow keys stepped
one day without checking whether that day was disabled. The cell they landed on
got the grid's only `tabIndex=0` while being a disabled button, which cannot take
focus - so a calendar with Tuesdays disabled had no reachable date and ArrowRight
could not get past Monday. Movement now continues in the same direction until it
finds a date that can hold focus, and stops looking rather than searching forever
when nothing is enabled.

Three related fixes came with it. Opening a calendar with a value now shows that
value's month, where `value={new Date(2020, 0, 15)}` used to open the current one.
Focus starts on the selected date, or today, or the first enabled day on screen,
rather than unconditionally on today, which could itself be disabled. The month
buttons bring focus with them instead of leaving it on a date no longer rendered.
And a month step is clamped to the target month's length: Page Down from 31 March
is 30 April, not 1 May.

**`locale` only reached the month heading (#242).** The selected value and the
weekday headings were English whatever it was set to, because the formatter
ignored the argument and the weekday names were a hardcoded array. Both go through
`Intl` now, so `locale="da-DK"` gives `14. sep. 2026` over `søn. man. tirs.` with
nothing to import.

A locale cannot translate "Today", so there is a new `labels` prop for the words
the calendar says on its own behalf: the trigger's accessible name, the
placeholder, the month buttons, Today, the range hint, and the count in multiple
mode. Anything left out keeps its English default, and the `placeholder` prop
still wins over `labels.placeholder`. `CalendarLabels` is exported.
