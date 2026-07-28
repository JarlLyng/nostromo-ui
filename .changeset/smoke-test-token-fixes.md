---
"@jarllyng/nostromo": patch
---

Fix shadow, colour and border tokens that resolved to nothing

Several components referenced tokens that no theme defined, so the classes were
silently no-ops:

- `shadow-badge`, `shadow-avatar`, `shadow-toast` and their `-hover` variants
  (36 uses across Badge, Avatar and Toast) now use the generic shadow scale,
  which is theme-controlled and already carries the same values
- Select used `shadow-input-hover`, which does not exist; it now matches Input's
  `shadow-sm` / `shadow-md` pair
- Progress used `bg-primary-400`, but `primary` has no scale - every sibling
  variant uses the `-400` step of a real scale, so this is `bg-brand-400`
- Calendar used `hover:border-border-medium`; there is no such token, so this is
  `hover:border-primary`, matching the outline button

**Badge, Avatar, Toast and Select therefore look slightly different**: the
shadows those classes were meant to draw were never drawn before.

Found by a new consumer smoke test that compiles the published stylesheet and
asserts that every token-backed class the components reference actually produces
CSS. The library's own suite could not see any of this - it runs against source
in jsdom and never compiles CSS.
