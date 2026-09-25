---
"@jarllyng/nostromo": patch
---

Raise the minimum versions of two runtime dependencies to releases the library
is tested against: `react-resizable-panels` to 4.13.3 and `tailwind-merge` to
3.7.0.

If you installed recently you may already have both. The old ranges were
`^4.12.4` and `^3.6.0`, which resolve to these releases on a fresh install. The
floor now guarantees them, and the test suites, including the browser tests for
dragging, keyboard resizing, minimum sizes and the inline-height behaviour, ran
against exactly these versions rather than the ones they replace.

One change you may notice comes from `react-resizable-panels` 4.13.2: a
`ResizableHandle` no longer keeps focus after it is dragged with a pointer.
Keyboard resizing is unchanged, including the focus ring. The same range also
fixes panels mapping to the wrong constraints after their keys are reordered,
and restores a group's default layout when it starts hidden.

`tailwind-merge` 3.7.0 is a set of fixes to how some classes are grouped when
they conflict. None of the affected classes appear in this library's own
components, and `cn()` uses the default configuration, so what the components
render is unchanged. Your own `className` overrides go through the same `cn()`
and get the fixes, for example `px-*` now correctly overriding `ps-*`.
