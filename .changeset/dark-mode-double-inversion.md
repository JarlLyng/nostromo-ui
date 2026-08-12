---
"@jarllyng/nostromo": patch
---

Fix dark mode inverting twice, so `base.css` no longer produces light backgrounds
with light text.

The theme files already flip the neutral scale for dark mode - `neutral-50` is 98%
in light and 9% in dark, `neutral-900` is 9% in light and 95% in dark. So
`background: neutral-50; color: neutral-900` is correct in both modes with no
extra rules. `base.css` nevertheless carried two blocks,
`@media (prefers-color-scheme: dark)` and `[data-color-scheme="dark"]`, that
swapped which token was used - inverting an already-inverted scale and landing
back on light. In dark mode `body` came out with a 95% background and 9% text.

Both blocks are removed. The `@media` one was doubly wrong: it keyed off the OS
preference while the tokens key off `data-color-scheme`, so toggling the theme
without changing the OS setting produced a mismatch of its own.

Also derives the internal `onInput` handler type in `Textarea` from the prop
instead of naming `React.FormEvent` outright. `@types/react` 18 declares that
handler as `FormEvent` and 19 as `InputEvent`, so the hardcoded name failed the
declaration build against React 19's types.
