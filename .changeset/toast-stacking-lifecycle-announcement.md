---
"@jarllyng/nostromo": minor
---

Toast: notifications stack, dismissals actually dismiss, and a screen reader
hears them.

Three issues from the 2026-09-12 audit, all in the same component.

**They covered each other and ran off the screen (#248).** Every toast positioned
itself with `fixed right-4` plus `w-full`, and stacked by
`translateY(index * 8px)`. Measured in a 1200px window that gave two boxes 1200px
wide starting at `x=-16`, 94px tall, 8px apart: the second hid all but 8 pixels of
the first, and both hung off the left edge.

`ToastProvider` now renders one bounded column per position - `w-[calc(100vw-2rem)]
max-w-sm` - and stacks its children in normal flow with a gap. Columns at the
bottom stack upwards so the newest is nearest the edge. A standalone
`<Toast position>` still positions itself, now with the same width bound.

**Dismissing left the notification in state (#249).** The toast unmounted itself
and never told the provider, so `toasts.length` counted notifications nobody could
see, and a persistent toast dismissed ten times left ten invisible entries behind.
There were also two timers per toast, and the provider's could remove one before
its own exit finished.

Every route now goes through one path: the close button, the timeout,
`dismiss(id)` and `clear()` all start the exit, and the entry leaves `toasts` when
the animation ends. `onClose` fires exactly once per notification however many
times the button is clicked. One timer per toast: the provider's inside a
provider, the toast's own when standalone.

**Nothing was announced (#250).** There was no `role` and no `aria-live` anywhere,
so a message that appeared on its own was never read out. A toast is now
`role="status"` with `aria-live="polite"`, or `role="alert"` with
`aria-live="assertive"` for the error variant, and `aria-atomic` so the title and
description are read as one message. Both are overridable per toast. Focus is
deliberately not moved.

Also: ids come from a counter rather than `Math.random()`, which would have
differed between a server render and the client that hydrates it. `ToastPosition`
is exported.
