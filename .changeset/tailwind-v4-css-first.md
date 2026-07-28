---
"@jarllyng/nostromo": major
---

Migrate theming to Tailwind v4 (CSS-first)

The package declared `tailwindcss: ^4` as a peer dependency but shipped a v3
setup, so none of the semantic colour utilities were ever generated. Theming is
now registered in CSS:

```css
@import "@jarllyng/nostromo/tailwind.css";
@import "@jarllyng/nostromo/themes/nostromo.css";
```

**Breaking changes**

- `base.css` is no longer the entry point - import `tailwind.css`, which pulls in
  Tailwind, the token bridge and the base layer in the right order. `base.css`
  is still exported for anyone composing the layers by hand.
- The `./preset` and `./plugin` exports are gone, along with the
  `nostromoPreset` / `nostromoPlugin` named exports. Tailwind v4 reads neither;
  there is nothing to register and no `tailwind.config.js` to keep.
- Theme tokens moved to a private `--nostromo-*` namespace. Custom themes need
  renaming: `--color-primary` becomes `--nostromo-color-primary`. The values are
  unchanged - still bare HSL channels.
- Named spacing utilities (`p-md`, `gap-lg`, …) are no longer generated. On v4 a
  named spacing key doubles as a width key and shadowed `--container-*`, which
  turned `max-w-2xl` into 48px. The `--nostromo-spacing-*` tokens remain
  available via `var()`.

Also fixes `<Button asChild>`, which threw `React.Children.only` unconditionally,
and drops the phantom `./plugin.css` export that pointed at a file the build
never produced.
