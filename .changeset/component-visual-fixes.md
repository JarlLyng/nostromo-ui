---
"@jarllyng/nostromo": patch
---

Fix a permanently visible tooltip, an invisible vertical separator, and a skeleton
you could not see in light mode.

- **`Tooltip` was always showing.** `TooltipContent` never read the open state -
  `data-open` was written on the wrapper and nothing acted on it, no CSS, no
  conditional render. So every tooltip rendered on page load, sitting on top of its
  own trigger. It now binds to the context's open state through opacity, which is
  what the `transition-opacity` in the variants was always for, and sets
  `data-state` plus `aria-hidden`. Reading the context is optional, so
  `TooltipContent` still works rendered on its own.
- **`Separator orientation="vertical"` rendered nothing.** It was `h-full w-[1px]`,
  and `height: 100%` against an auto-height flex row resolves to nothing - with the
  usual `items-center` the item does not stretch either, so it came out 1px wide
  and 0px tall. It stretches along the cross axis now.
- **`Skeleton` was invisible in light mode.** `bg-muted` is 96% lightness against a
  98% background: two points apart. It uses `neutral-200`, which is 90% in light and
  25% in dark, so it reads against both.
- **`Checkbox`** had no surface of its own, so the box inherited whatever was behind
  it and the border disappeared on muted backgrounds. It has an explicit
  `bg-background` and uses the form-control border token.
