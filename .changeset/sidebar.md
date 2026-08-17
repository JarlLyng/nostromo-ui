---
"@jarllyng/nostromo": minor
---

Sidebar, and with it the shadcn gap is closed.

An application sidebar: a collapsible navigation column with 23 parts. Mostly
layout, and three things in it are worth knowing.

**The phone form is a different tree, not different classes.** Below 768px a
`Sidebar` is a `Sheet` - a modal panel over the page. Above it, a fixed column
beside the page. Different elements with different semantics, so the branch is in
JS. Two consequences: `SidebarTrigger` has to go in the inset rather than in the
sidebar, because on a phone the sidebar is a closed dialog and everything in it is
unrendered; and the open state is two states, `open` for the column and
`openMobile` for the sheet, with `toggleSidebar` picking the one that applies.

**The state cookie only works if your server reads it back.** Collapsing writes
`sidebar_state`, which is what stops the sidebar flashing open on every navigation
in a server-rendered app - but only when the server passes it in as `defaultOpen`.
Nothing in the component can do that for you, so the docs page shows the Next.js
layout that does. A test asserts the cookie is written, because if it stopped being
written nothing else would fail.

**Sidebar colours are a new token family**: `--nostromo-color-sidebar` and its
`-foreground`, `-border`, `-accent`, `-accent-foreground` and `-ring`, bridged to
`bg-sidebar`, `text-sidebar-foreground`, `border-sidebar-border`,
`bg-sidebar-accent` and `ring-sidebar-ring`. A sidebar can now be a different
surface from a card.

Every theme's defaults are that theme's own card, accent, border and ring values,
copied per colour scheme, so nothing looks different until you override
something - and the defaults are pairs the contrast tests have already seen rather
than colours invented for this release.

Three deliberate differences from shadcn's version:

- `SidebarMenuSkeleton` derives its bar width from `useId` rather than
  `Math.random()`. Random renders one width on the server and another on the
  client, which is a hydration mismatch. There is also a `width` prop.
- `SidebarMenuButton` sets `aria-current="page"` alongside `data-active`.
  Highlighting the current item is not the same as telling a screen reader which
  one it is.
- The classes stay within Tailwind 4.0 syntax - `w-[var(--sidebar-width)]` rather
  than the 4.1 shorthand `w-(--sidebar-width)`, and literal lengths rather than
  `--spacing()`. The package declares `tailwindcss ^4.0.0`, and a consumer on 4.0
  would otherwise get a sidebar with no width.

Also new and exported: `useIsMobile` and `MOBILE_BREAKPOINT`, the hook `Sidebar`
branches on, so a layout of your own can use the same breakpoint rather than
picking its own number. It reads `matchMedia` through `useSyncExternalStore`, so
the first render already has the right answer instead of rendering desktop and
correcting.
