# @jarllyng/nostromo

## 3.2.0

### Minor Changes

- bcae0a5: Ship `"use client"` directives, so the package can be imported from a React
  Server Component.

  Until now it could not be used in the Next.js App Router at all. Server
  Components are the default there, and importing any component that uses hooks
  failed the consumer's build outright:

  ```
  You're importing a module that depends on `useState` into a React Server
  Component module. This API is only available in Client Components.
  ```

  The directive is added by a post-build step rather than written into the source
  files, because neither of the obvious placements survives: esbuild strips
  top-level directives from source, and tsup's `banner` option is removed by the
  minifier - both confirmed by building and inspecting `dist`. It is applied to
  every emitted module including the shared chunks, since the per-component entry
  files are thin re-exports and marking only those would leave the actual component
  code unmarked.

  A consumer-side test now asserts the contract against the built package, so the
  directive cannot go missing without a test failing.

  One consequence worth knowing: this marks the whole bundle as a client boundary,
  so `cn` from `./themes/utils` is client-bound too and cannot be called from a
  server component. A dedicated server-safe entry point for the utilities would be
  a separate change.

### Patch Changes

- be5be89: Fix dark mode inverting twice, so `base.css` no longer produces light backgrounds
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

- b32d914: Fix three of the four themes producing no colour at all, and bring every
  theme/scheme combination up to WCAG AA.

  `mother`, `lv-426` and `sulaco` declared their semantic tokens as
  `--nostromo-color-card: hsl(var(--nostromo-color-neutral-50))`, but `tokens.css`
  wraps them again - `hsl(var(--nostromo-color-card))`. The result is
  `hsl(hsl(0 0% 95%))`, which is invalid, so the declaration was dropped and the
  colour computed to `rgba(0, 0, 0, 0)`. 138 declarations were affected across the
  three themes: background, foreground, card, popover, primary, secondary, border,
  input, destructive and the status colours. Only `nostromo` used bare channels,
  which is why the default theme worked and the other three had gone unnoticed. The
  tokens now hold channels, as the convention requires, and alpha modifiers such as
  `bg-card/50` work with them again.

  Fixing that revealed contrast problems the invalid CSS had been masking. All are
  resolved, and no brand hue changed:

  - `nostromo` dark mode had light surfaces: `card` and `popover` at 85% and
    `secondary` at 75% against a 9% background, so a card was a light grey panel
    carrying 95% text at 1.26:1. Now 15%, 15% and 20%.
  - `nostromo` `primary-foreground` was dark on a mid purple (3.41:1), now light.
  - `destructive` was too light for its own light text in every theme, and moves one
    step darker - keeping white on red rather than switching to dark text.
  - `mother`, `lv-426` and `sulaco` used white text on bright cyan, orange and blue
    primaries, as low as 2.12:1. Those carry dark text now; `sulaco` also moves to
    `brand-600`, because `brand-500` failed against both light and dark text.
  - `mother` dark mode had a 38% muted foreground on a 15% surface (1.39:1),
    now 65%.
  - The status foregrounds referenced the neutral scale, which inverts between
    schemes - while `success-500` and friends do not. Light text therefore landed on
    light yellow in dark mode at 1.91:1. They are fixed values now, dark on
    green/yellow/blue and light on red.
  - `--color-error` maps to `error-600` rather than `error-500`, because a saturated
    red at 50% lightness clears 4.5:1 against neither black nor white. `error-500`
    remains available for borders and tints.

  Also removes an `@media (prefers-color-scheme: dark)` block in `nostromo` that had
  the same specificity as the base rule but came later in the file, so on a dark-OS
  machine it overrode an explicit `data-color-scheme="light"` and the light scheme
  could not be selected at all. OS preference still applies as a default, now
  guarded by `:not([data-color-scheme])`.

  The contrast test used to check one theme - with a comment calling `mother` the
  default, which it is not - and resolved tokens with an extractor that fell back to
  hardcoded values, so an unreadable token was silently compared against the
  fallback instead. It now covers all four themes in both schemes across the twelve
  pairs components actually render together: 96 assertions, up from 6. Resolution is
  shared with `pnpm validate:theme-contrasts` instead of duplicated, since the
  duplication is why both copies carried the same bug, and it throws rather than
  guessing.

## 3.1.1

### Patch Changes

- 221a680: Declare a license, and add the metadata npm needs

  The published package had no `license` field, so npm showed **License: none** on
  the package page. That is not cosmetic: compliance tooling blocks dependencies
  without a declared license, so the library was effectively unusable inside any
  company that checks. `LICENSE` existed in the repository root but npm only
  auto-includes it from the package directory, so it never shipped either - it is
  now copied into the package and appears in the tarball.

  Also adds `repository` (with `directory`, so the monorepo path resolves),
  `homepage`, `bugs`, `author` and `keywords` - the npm page had no link back to
  the source or the docs, and the package was invisible in npm search.

  The description said "A Tailwind CSS plugin and React component library". The
  plugin was removed in the Tailwind v4 migration; theming is CSS-first now.

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
