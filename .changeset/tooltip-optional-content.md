---
"@jarllyng/nostromo": patch
---

Make `Tooltip`'s `content` optional, and stop the composed form rendering a
second, empty bubble.

`TooltipTrigger` and `TooltipContent` are both exported, and composing them is
the form the documentation shows:

```tsx
<Tooltip>
  <TooltipTrigger>Hover me</TooltipTrigger>
  <TooltipContent>Tip text</TooltipContent>
</Tooltip>
```

That did not type-check. `content` was a required prop, so every composed usage
was a `TS2741`. Worse, it did not work properly either: opening the tooltip also
rendered the shorthand slot with `undefined` inside it, so a second, empty bubble
appeared next to the real one.

`content` is now optional and the shorthand slot only renders when it is actually
given, which makes the two forms mutually exclusive - as they always looked from
the outside. Passing `content` still behaves exactly as before, so nothing that
compiled before stops compiling.

Found by the new docs-example type-checker rather than by reading the code.
