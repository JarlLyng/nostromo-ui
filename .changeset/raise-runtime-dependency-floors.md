---
"@jarllyng/nostromo": patch
---

Raise the minimum versions of the runtime dependencies to the releases the
library is now tested against: the Radix packages to their current releases (for
example `@radix-ui/react-dialog` 1.3.1 and `@radix-ui/react-select` 2.4.1), and
`react-resizable-panels` to 4.19.1.

If you installed recently you may already have them. Every range is a caret
range, so a fresh install resolves to these releases. The floors now guarantee
them, and the unit, smoke and browser suites ran against exactly these versions.

The changes you may notice come from upstream. A non-modal `Popover` inside a
modal `Dialog` is now usable, where the dialog's focus trap used to take focus
back from it. `Select` no longer runs its own selection logic for a disabled
`SelectItem`, and setting its value from code inside a `<form>` no longer fires a
click on ancestor elements. `PopoverTrigger` no longer sets `aria-controls` while
the popover is closed. Optional props accept an explicit `undefined`, which
matters if you compile with `exactOptionalPropertyTypes`.

For `Resizable`, a drag interrupted by switching windows now ends and keeps the
layout instead of staying active. Separators follow the pointer under CSS `zoom`
or a scale transform. When a small window forces a panel down to its minimum
size, the layout you asked for comes back once there is room again. The newer
`react-resizable-panels` also brings more code with it, so `Resizable` is somewhat
larger in a bundle.
