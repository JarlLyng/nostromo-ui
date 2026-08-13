---
"@jarllyng/nostromo": patch
---

Fix three of the four themes producing no colour at all, and bring every
theme/scheme combination up to WCAG AA.

`mother`, `lv-426` and `sulaco` declared their semantic tokens as
`--nostromo-color-card: hsl(var(--nostromo-color-neutral-50))`, but `tokens.css`
wraps them again - `hsl(var(--nostromo-color-card))`. The result is
`hsl(hsl(0 0% 95%))`, which is invalid, so the declaration was dropped and the
colour computed to `rgba(0, 0, 0, 0)`. 138 declarations were affected across the
three themes: background, foreground, card, popover, primary, secondary, border,
input, destructive and the status colours. Only `nostromo` used bare channels,
which is why the default theme worked and the other three had gone unnoticed. The
tokens now hold channels, as the convention requires, and alpha modifiers such as
`bg-card/50` work with them again.

Fixing that revealed contrast problems the invalid CSS had been masking. All are
resolved, and no brand hue changed:

- `nostromo` dark mode had light surfaces: `card` and `popover` at 85% and
  `secondary` at 75% against a 9% background, so a card was a light grey panel
  carrying 95% text at 1.26:1. Now 15%, 15% and 20%.
- `nostromo` `primary-foreground` was dark on a mid purple (3.41:1), now light.
- `destructive` was too light for its own light text in every theme, and moves one
  step darker - keeping white on red rather than switching to dark text.
- `mother`, `lv-426` and `sulaco` used white text on bright cyan, orange and blue
  primaries, as low as 2.12:1. Those carry dark text now; `sulaco` also moves to
  `brand-600`, because `brand-500` failed against both light and dark text.
- `mother` dark mode had a 38% muted foreground on a 15% surface (1.39:1),
  now 65%.
- The status foregrounds referenced the neutral scale, which inverts between
  schemes - while `success-500` and friends do not. Light text therefore landed on
  light yellow in dark mode at 1.91:1. They are fixed values now, dark on
  green/yellow/blue and light on red.
- `--color-error` maps to `error-600` rather than `error-500`, because a saturated
  red at 50% lightness clears 4.5:1 against neither black nor white. `error-500`
  remains available for borders and tints.

Also removes an `@media (prefers-color-scheme: dark)` block in `nostromo` that had
the same specificity as the base rule but came later in the file, so on a dark-OS
machine it overrode an explicit `data-color-scheme="light"` and the light scheme
could not be selected at all. OS preference still applies as a default, now
guarded by `:not([data-color-scheme])`.

The contrast test used to check one theme - with a comment calling `mother` the
default, which it is not - and resolved tokens with an extractor that fell back to
hardcoded values, so an unreadable token was silently compared against the
fallback instead. It now covers all four themes in both schemes across the twelve
pairs components actually render together: 96 assertions, up from 6. Resolution is
shared with `pnpm validate:theme-contrasts` instead of duplicated, since the
duplication is why both copies carried the same bug, and it throws rather than
guessing.
