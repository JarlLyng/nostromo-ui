# @jarllyng/nostromo

## 3.0.0

### Major Changes

- 11226a5: Migrate theming to Tailwind v4 (CSS-first)

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

### Patch Changes

- 99cd141: Drop 34 unused runtime dependencies

  Only five Radix packages were ever imported - `popover`, `select`, `slot`,
  `switch` and `tabs`. The remaining 29, plus three `@floating-ui/*` packages, were
  declared but never referenced, and npm installs declared dependencies whether or
  not they are imported.

  Bundle size is unchanged, because tree-shaking already excluded them. What
  changes is install size: the dependency closure drops from 123 packages to 100.

  No API change - nothing imported these, so nothing can break by their absence.

- 088dc73: Fix shadow, colour and border tokens that resolved to nothing

  Several components referenced tokens that no theme defined, so the classes were
  silently no-ops:
  - `shadow-badge`, `shadow-avatar`, `shadow-toast` and their `-hover` variants
    (36 uses across Badge, Avatar and Toast) now use the generic shadow scale,
    which is theme-controlled and already carries the same values
  - Select used `shadow-input-hover`, which does not exist; it now matches Input's
    `shadow-sm` / `shadow-md` pair
  - Progress used `bg-primary-400`, but `primary` has no scale - every sibling
    variant uses the `-400` step of a real scale, so this is `bg-brand-400`
  - Calendar used `hover:border-border-medium`; there is no such token, so this is
    `hover:border-primary`, matching the outline button

  **Badge, Avatar, Toast and Select therefore look slightly different**: the
  shadows those classes were meant to draw were never drawn before.

  Found by a new consumer smoke test that compiles the published stylesheet and
  asserts that every token-backed class the components reference actually produces
  CSS. The library's own suite could not see any of this - it runs against source
  in jsdom and never compiles CSS.
