# @jarllyng/nostromo

Accessible React component library with CSS-first Tailwind v4 theming.

36 components — 30 for products and apps, 6 for marketing pages — themed entirely
through CSS custom properties. No `tailwind.config.js`, no plugin to register.

The name comes from the _USCSS Nostromo_ in **Alien** (1979).

## Install

```bash
pnpm add @jarllyng/nostromo
```

Peer dependencies: React 18.2+ or 19, and Tailwind CSS 4.

## Setup

Two CSS imports and one attribute:

```css
/* your main stylesheet */
@import "@jarllyng/nostromo/tailwind.css";
@import "@jarllyng/nostromo/themes/nostromo.css";
```

```html
<html data-theme="nostromo" data-color-scheme="light"></html>
```

```tsx
import { Button } from "@jarllyng/nostromo";

export function Example() {
  return <Button variant="default">Click me</Button>;
}
```

`tailwind.css` pulls in Tailwind itself plus the design tokens, so it replaces
your `@import "tailwindcss"` rather than sitting next to it.

## Theming

Tokens are plain CSS custom properties, so a theme is a stylesheet — nothing is
compiled. Four ship with the package:

| Theme      | Import                                   |
| ---------- | ---------------------------------------- |
| `nostromo` | `@jarllyng/nostromo/themes/nostromo.css` |
| `mother`   | `@jarllyng/nostromo/themes/mother.css`   |
| `lv-426`   | `@jarllyng/nostromo/themes/lv-426.css`   |
| `sulaco`   | `@jarllyng/nostromo/themes/sulaco.css`   |

Override any token to make your own. Colour tokens hold bare HSL channels rather
than a finished colour - the library wraps them in `hsl()` itself:

```css
[data-theme="mine"] {
  --nostromo-color-brand-500: 262 84% 52%; /* h s% l% - no hsl() */
  --nostromo-radius-md: 0.5rem;
}
```

Colour families are `brand`, `neutral`, `success`, `warning`, `error` and `info`,
each in steps from 50 to 950.

Switch theme and colour scheme independently with `data-theme` and
`data-color-scheme` on `<html>`.

## Components

**Core** — accordion, alert, avatar, badge, breadcrumb, button, calendar, card,
charts, checkbox, data-table, dialog, error-boundary, error-message,
helper-text, icon, input, label, pagination, progress, radio-group, select,
separator, skeleton, switch, table, tabs, textarea, toast, tooltip

**Marketing** — hero, features, pricing, gallery, logo-wall, testimonials

`charts` also has a `charts-lazy` entry point that code-splits the charting
library out of your main bundle.

Every component is also a separate entry point, so you can import just one:

```tsx
import { Button } from "@jarllyng/nostromo/components/core/button";
```

## Documentation

- [Component docs and live examples](https://jarllyng.github.io/nostromo-ui/)
- [Source and issues](https://github.com/JarlLyng/nostromo-ui)

## License

MIT
