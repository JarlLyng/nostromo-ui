---
"@jarllyng/nostromo": minor
---

Add `Popover` and `Collapsible`, and make the enter/exit animations exist at all.

**The animations were never real.** `Dialog`, `Calendar` and `Toast` have carried
`animate-in`, `fade-in-0`, `zoom-in-95` and `slide-in-from-*` in their class lists
since they were written, and none of those utilities was ever defined:
`tailwindcss-animate` is a Tailwind v3 plugin, this package is CSS-first on v4
with no plugin to register, and nothing in the stylesheets declared them. They
were inert strings, so those three components have never animated in or out.

`styles/animations.css` defines them, written out rather than pulled from
`tw-animate-css` so the published stylesheet stays self-contained — a consumer
imports our CSS from their project, and a bare `@import "tw-animate-css"` would
have to resolve from their bundler against our node_modules. Duration comes from a
new `--nostromo-animate-duration` token, declared in all four themes, and every
animation is disabled under `prefers-reduced-motion`.

**`Popover`** — `@radix-ui/react-popover` was already a dependency, because
Calendar mounts its month grid in one, but was never exposed: a consumer wanting a
popover had to add the package a second time and theme it themselves. Portalled by
default, so it is not clipped by a card's `overflow: hidden`.

`PopoverContent` **requires** `aria-label` or `aria-labelledby` at the type level.
Radix gives it `role="dialog"`, and a nameless dialog is an `aria-dialog-name`
violation — a screen reader announces "dialog" and nothing else. A generic default
label would be worse than useless, so the type asks for one instead, turning an
audit finding into a compile error.

**`Collapsible`** — the single-region case `Accordion` does not cover. The height
transition needs `--radix-collapsible-content-height`, which exists only on the
content element, so the animation is built into `CollapsibleContent` rather than
left for each caller to rediscover.

The consumer CSS contract test now asserts every animation utility produces real
CSS and is backed by real keyframes, so this cannot quietly become decorative
again.
