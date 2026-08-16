---
"@jarllyng/nostromo": minor
---

Add `ContextMenu`, `HoverCard` and `ScrollArea`.

**`ContextMenu`** is the right-click menu. A separate component from
`DropdownMenu` rather than a prop on it, because the two are genuinely different:
this one has no visible trigger, opens at the pointer, and on touch opens on
long-press. They now share their class strings through an internal
`menu-styles` module, so the two cannot drift apart the first time someone
adjusts a focus colour in one file and not the other.

A context menu should never be the only way to reach an action. Nothing on screen
says it is there, it is awkward on touch, and a keyboard user reaches it only
through the context-menu key. The docs page says so.

**`HoverCard`** is a preview on hover: a user card behind a mention, a repository
summary behind a link. Not a `Tooltip`, which labels in a few words and is
announced as a description. It opens on hover and on keyboard focus, but never on
touch, and Radix marks the content `aria-hidden` so a screen reader will not see
it. Everything inside one has to exist elsewhere too.

**`ScrollArea`** gives a region scrollbars that look the same everywhere. Native
scrollbars differ per platform and, with macOS overlay scrollbars on, are
invisible until you scroll, which inside a panel reads as "there is nothing more
here". Radix keeps native scrolling and native keyboard behaviour and replaces
only the appearance, so wheel, trackpad, touch, Page Up and Home all still work.
`orientation` takes `vertical`, `horizontal` or `both`.
