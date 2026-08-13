---
"@jarllyng/nostromo": patch
---

Fix components that ignored the theme and rendered raw Tailwind palette colours.

`Table`, `Icon` and `Toast` carried hardcoded `gray-*` and `blue-*` classes, so
they did not follow the active theme, did not respond to the dark-mode switch, and
looked off-brand next to the components that did. Measured in the browser: table
rows rendered `border-gray-200 hover:bg-gray-50` rather than any token.

- **`Icon`'s `color` prop was wrong at the API level.** `color="primary"` produced
  Tailwind blue instead of the brand colour, `success` produced Tailwind green
  rather than the theme's, and so on. All seven now map to semantic tokens.
- **`Table`'s `striped` variant did nothing.** It was doubly broken: `TableRow`
  never accepted a variant, and the `even:bg-muted/50` modifier sat on the _cell_
  variant - where `even:` selects the even cell within a row, so it would have
  striped columns rather than rows. There is a row-level variant now, and rows are
  themed.
- `Table`'s sort indicators, selection checkbox, loading spinner, empty state and
  pagination buttons all used fixed greys and blues; they use tokens now.
- `Toast`'s focus ring and close-button hover were fixed blue and grey.

Left alone deliberately: `Progress`'s `energy`, `health` and `alien` variants are
two-colour decorative gradients that no single token can express, and
`Testimonials`' gold rating stars are a convention rather than a theme colour.
