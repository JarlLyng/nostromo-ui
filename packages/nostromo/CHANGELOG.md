# @jarllyng/nostromo

## 3.1.0

### Minor Changes

- 9ed10a1: Refresh dependency resolutions and remove `useBundleSize`

  All in-range dependency resolutions updated (Radix, recharts, date-fns and the
  rest), clearing the bulk of the open security advisories - including `next`
  16.2.12 for the docs site.

  `useBundleSize` is removed. It did not measure anything: it counted script tags
  containing "nostromo" and multiplied by 10000. An API that returns fabricated
  data is worse than no API. Nothing has been published yet, so no consumer can be
  depending on it. Real bundle numbers live in the size-limit budgets enforced in
  CI.

- 1b7870f: Support React 19, and stop blocking React 18.3

  `peerDependencies` shipped as an exact pin - `react: "18.2.0"` - so `npm install`
  failed outright with `ERESOLVE` for anyone not on that precise version. That
  included React 18.3.1 and all of React 19, i.e. most of the ecosystem:

  ```
  npm error Found: react@19.2.8
  npm error Could not resolve dependency:
  npm error peer react@"18.2.0" from @jarllyng/nostromo@3.0.0
  ```

  The range is now `^18.2.0 || ^19.0.0`. Nothing in the code needed changing - the
  Radix primitives underneath already support React 16.8 through 19, so the
  restriction was entirely self-imposed.

  Verified by installing the packed tarball into a clean project on React 18.2.0,
  18.3.1 and 19.2.8 and server-rendering a cross-section of components: 11/11 render
  on all three. That check now runs in CI, because the workspace pins React 18.2.0
  via pnpm overrides and therefore cannot notice this class of problem on its own.

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
