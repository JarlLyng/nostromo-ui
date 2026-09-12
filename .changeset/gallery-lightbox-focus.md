---
"@jarllyng/nostromo": patch
---

Gallery: the lightbox is a real modal now, not one that said so.

It carried `aria-modal="true"` and implemented none of it (#244). Opening it left
focus on the gallery item behind the overlay, so `document.activeElement` was
still "View image 1"; Escape and the arrow keys were bound to the overlay, which
never had focus, so pressing Escape did nothing; and everything behind the overlay
stayed reachable by Tab.

It is a Radix Dialog now, which brings initial focus, focus containment, Escape,
scroll locking and aria-hiding the rest of the page in one piece. Hand-rolling
those is how the original came to claim all of them and do none.

Focus returns to the gallery item that opened the lightbox. That part is explicit
rather than left to the primitive: Radix restores focus to whatever was focused
when the dialog mounted, and in this tree it came back to `document.body` instead,
measured rather than assumed.

The dialog is also named per instance, from the image's `title` falling back to
its `alt`. It used to point at a fixed `lightbox-title` id, which collided as soon
as a page had two galleries.
