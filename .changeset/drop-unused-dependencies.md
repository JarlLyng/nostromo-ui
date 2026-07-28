---
"@jarllyng/nostromo": patch
---

Drop 34 unused runtime dependencies

Only five Radix packages were ever imported - `popover`, `select`, `slot`,
`switch` and `tabs`. The remaining 29, plus three `@floating-ui/*` packages, were
declared but never referenced, and npm installs declared dependencies whether or
not they are imported.

Bundle size is unchanged, because tree-shaking already excluded them. What
changes is install size: the dependency closure drops from 123 packages to 100.

No API change - nothing imported these, so nothing can break by their absence.
