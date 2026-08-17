# @jarllyng/nostromo

## 3.10.0

### Minor Changes

- d55555b: Add `Form`, tying `react-hook-form` to this library's `Label`, `HelperText` and
  `ErrorMessage`.

  Those three have always existed separately, and connecting them was left to the
  caller: an id on the input, a matching `htmlFor`, an `aria-describedby` listing
  the description and the error, and `aria-invalid` toggled by hand. Four things per
  field, and the failure is silent - a form that looks correct and tells a screen
  reader nothing. `FormField` generates one id per field and `FormControl` applies
  the wiring to whatever it wraps.

  `react-hook-form` is an **optional peer dependency**, and `Form` is **not
  exported from the package barrel**. It is around 25kB and most consumers of a
  component library do not want it forced on them. A bundler has to resolve every
  import in a module before it can tree-shake anything, so a barrel that
  re-exported this would fail to build for anyone without the peer installed, even
  if all they wanted was `Button`. Import it from its own entry point:

  ```tsx
  import { Form, FormField } from "@jarllyng/nostromo/components/core/form";
  ```

  The `react-compat` CI job asserts `Form` stays out of the barrel, in a project
  that installs only react, react-dom and the tarball. That turns the guarantee
  from a property the job happened to have into one it checks.

  `aria-describedby` lists the description **and** the message, because a field can
  have guidance and an error at once. `FormMessage` renders nothing when there is
  no error rather than an empty element that still occupies space. Nested names like
  `address.city` find their error by walking the error object. `useFormField` throws
  outside a `FormField`, because the quiet alternative is a label whose `htmlFor`
  points at nothing.

  Two things this surfaced, both fixed here.

  **Every documented subpath import was wrong.** Thirty-six component pages tell you
  `import { Button } from "@jarllyng/nostromo/button"`, and that path did not exist:
  the only real one was `@jarllyng/nostromo/components/core/button`. A reader copying
  the documented line got a module-not-found error. The short form is the nicer API
  and the one the docs have promised all along, so it exists now - 52 aliases added,
  and the long paths keep working.

  **`RadioGroupItem` was only in the barrel.** `radio-group.tsx` exported
  `RadioItem`, and the barrel aliased it, so `@jarllyng/nostromo` and
  `@jarllyng/nostromo/radio-group` disagreed about the name of the same component
  and the documented subpath import did not resolve. Both names are exported from
  the file now.

  Both were found by making the docs-import guard resolve each name against the
  module it is imported from, rather than checking everything against the barrel.
  `validate:exports` could not see either one: it checks that component files have
  entries in the exports map, not that the paths the documentation advertises exist.

## 3.9.0

### Minor Changes

- 5a26f33: Add `Slider`, `Menubar` and `NavigationMenu`.

  **`Slider`** picks a value by dragging: volume, price, opacity. One thumb is
  rendered per entry in `value`, so a range slider is the same component with two
  numbers rather than a separate one. `thumbLabel` takes a string or an array, so a
  range announces "Minimum" and "Maximum" instead of "slider" twice.

  **`Menubar`** is the application menu bar. Its own component rather than a row of
  `DropdownMenu`s, because the bar behaves as one control: once a menu is open,
  moving the pointer to a neighbouring trigger switches to it without a click, and
  the arrow keys move between menus as well as within them. It is the third
  component reading from the shared menu styling, after `DropdownMenu` and
  `ContextMenu`, so all three cannot drift apart.

  **`NavigationMenu`** is site navigation with panels. Not a menu despite the name:
  a `DropdownMenu` runs commands and uses menu roles, while this is a `<nav>` full
  of links and Radix keeps it that way. A screen reader user gets a navigation
  landmark and a list of links rather than a menu they are expected to act on, and
  a test asserts there is no `menu` role in it.

## 3.8.0

### Minor Changes

- 9e38e69: Add `ContextMenu`, `HoverCard` and `ScrollArea`.

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

## 3.7.0

### Minor Changes

- 48cf6ff: Add `AlertDialog`, `Toggle`, `ToggleGroup` and `AspectRatio`.

  **`AlertDialog`** interrupts to confirm something consequential. Not a `Dialog`
  variant: it is announced as `role="alertdialog"`, clicking outside does nothing
  so a confirmation cannot be lost by missing the button, and focus starts on
  Cancel so a reflexive Enter cancels rather than deletes. Escape does close it,
  which is correct rather than a gap, since a modal a keyboard user cannot leave is
  a trap and cancelling is the safe outcome. `AlertDialogAction` defaults to the
  destructive button, because most confirmations are.

  **`Toggle`** is a button that stays pressed: bold in a toolbar, a filter chip, a
  view mode. Distinct from `Switch`, which is a form control that belongs next to a
  label. A toggle announces `aria-pressed` and lives in a toolbar.

  **`ToggleGroup`** takes `type="single"` or `type="multiple"`. Its `variant` and
  `size` reach items through context rather than by cloning children, so an item
  keeps the group's styling when it is wrapped in your own markup, and can still
  override either.

  **`AspectRatio`** holds a box at a fixed ratio. It sets the CSS `aspect-ratio`
  property and takes **no dependency**: `@radix-ui/react-aspect-ratio` exists for
  the padding-bottom trick browsers needed before that property, and every browser
  this library supports has had it for years. `Gallery` already relies on it
  through Tailwind's `aspect-[3/4]`.

## 3.6.0

### Minor Changes

- 5760772: Add `DropdownMenu` and `Sheet`.

  **`DropdownMenu`** — the menu that hangs off a button: row actions, account
  menus, overflow. Items, checkbox items, radio groups, labels, separators,
  shortcuts and submenus. `destructive` and `inset` on `DropdownMenuItem`. Radix
  owns roving focus, typeahead, submenu timing and pointer-versus-keyboard intent.

  `Select` is the neighbouring component and a different thing: it edits a form
  value and has a selected state. A dropdown menu runs commands.

  Portalled by default, because an un-portalled menu is clipped by any ancestor
  with `overflow: hidden` — in practice every card and table it gets used in.

  **`Sheet`** — a dialog anchored to an edge, for mobile navigation, filter drawers
  and detail panes. `side` takes `top`, `right`, `bottom` or `left`; right is the
  default.

  Built on `@radix-ui/react-dialog` rather than on this package's own `Dialog`.
  They are the same primitive underneath, but ours is hand-rolled around a centred
  box, and bending it into an edge-anchored panel would mean two layout modes in
  one component and a `variant` that quietly changes what every other prop means.

  `SheetTitle` is the dialog's accessible name and is not decorative — without one,
  Radix warns and axe reports `aria-dialog-name`. When the design has no room for a
  heading, `<SheetTitle srOnly>` keeps the name for assistive technology and
  removes it visually.

  Both ship with the enter and exit animations added in 3.5.0, so they actually
  animate rather than carrying inert class names.

## 3.5.0

### Minor Changes

- fe789fb: Add `Popover` and `Collapsible`, and make the enter/exit animations exist at all.

  **The animations were never real.** `Dialog`, `Calendar` and `Toast` have carried
  `animate-in`, `fade-in-0`, `zoom-in-95` and `slide-in-from-*` in their class lists
  since they were written, and none of those utilities was ever defined:
  `tailwindcss-animate` is a Tailwind v3 plugin, this package is CSS-first on v4
  with no plugin to register, and nothing in the stylesheets declared them. They
  were inert strings, so those three components have never animated in or out.

  `styles/animations.css` defines them, written out rather than pulled from
  `tw-animate-css` so the published stylesheet stays self-contained — a consumer
  imports our CSS from their project, and a bare `@import "tw-animate-css"` would
  have to resolve from their bundler against our node_modules. Duration comes from a
  new `--nostromo-animate-duration` token, declared in all four themes, and every
  animation is disabled under `prefers-reduced-motion`.

  **`Popover`** — `@radix-ui/react-popover` was already a dependency, because
  Calendar mounts its month grid in one, but was never exposed: a consumer wanting a
  popover had to add the package a second time and theme it themselves. Portalled by
  default, so it is not clipped by a card's `overflow: hidden`.

  `PopoverContent` **requires** `aria-label` or `aria-labelledby` at the type level.
  Radix gives it `role="dialog"`, and a nameless dialog is an `aria-dialog-name`
  violation — a screen reader announces "dialog" and nothing else. A generic default
  label would be worse than useless, so the type asks for one instead, turning an
  audit finding into a compile error.

  **`Collapsible`** — the single-region case `Accordion` does not cover. The height
  transition needs `--radix-collapsible-content-height`, which exists only on the
  content element, so the animation is built into `CollapsibleContent` rather than
  left for each caller to rediscover.

  The consumer CSS contract test now asserts every animation utility produces real
  CSS and is backed by real keyframes, so this cannot quietly become decorative
  again.

## 3.4.0

### Minor Changes

- f565a10: Add a composable chart API alongside `Chart`, and fix multi-line imports in the
  documentation previews.

  `<Chart type="..." />` renders one series type from a `dataKeys` array. That shape
  cannot express a stacked bar, a bar and a line together, a second axis, or a
  reference line - and no additional `type` string fixes it, because the limitation
  is that the chart is one prop rather than a tree.

  ```tsx
  <ChartContainer data={data} height={320} ariaLabel="Visitors against target">
    <ChartGrid />
    <ChartXAxis dataKey="month" />
    <ChartYAxis />
    <ChartTooltip />
    <ChartLegend />
    <ChartBar dataKey="desktop" stackId="devices" />
    <ChartBar dataKey="mobile" stackId="devices" />
    <ChartLine dataKey="target" />
  </ChartContainer>
  ```

  New exports: `ChartContainer`, `ChartGrid`, `ChartXAxis`, `ChartYAxis`,
  `ChartTooltip`, `ChartLegend`, `ChartBar`, `ChartLine`, `ChartArea`,
  `ChartReferenceLine`, and `chartPalette`. Also available as
  `@jarllyng/nostromo/components/core/chart-composable`.

  **`Chart` is unchanged and stays supported.** This is additive, which is why it is
  a minor rather than the breaking rewrite it was originally scoped as.

  Each series takes its colour from the container's palette in tree order, keyed by
  `dataKey` rather than by a render counter - so adding a series does not recolour
  the ones already there, and StrictMode's double invoke cannot shuffle them. Pass
  `color` on a series or `colors` on the container to override.

  Also fixes a transform bug this surfaced: `LiveCode` stripped import _lines_
  rather than import _statements_, so an example whose import wrapped across lines
  left `ChartContainer,` and `} from '@jarllyng/nostromo'` behind as loose tokens
  and the preview threw a SyntaxError. Any documentation example with a wrapped
  import was affected, not only the new ones.

## 3.3.1

### Patch Changes

- a0cde99: Make `Tooltip`'s `content` optional, and stop the composed form rendering a
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

## 3.3.0

### Minor Changes

- 1f5dd42: Fix four components that threw as soon as you followed their own documentation.

  - **`RadioGroupItem` was never exported.** The component exists as `RadioItem`,
    but every example - and shadcn's convention - uses `RadioGroupItem`, so the
    RadioGroup page threw a ReferenceError. Exported under both names.
  - **`useToast` was never re-exported.** It existed in `toast.tsx`; `index.ts`
    exported `useToastNotification` and not the hook the docs called for.
  - **`DialogTrigger` did not exist at all.** `Dialog` was controlled-only and
    returned `null` while closed, so a trigger nested inside it was unmounted
    exactly when you needed to click it. `Dialog` now holds the open state on
    context and always renders its children; the overlay moved to `DialogContent`,
    which is the part that knows it is being shown. Works controlled (`open` +
    `onOpenChange`) as before, or uncontrolled via `defaultOpen` and a trigger.
  - **`Breadcrumb` required an `items` array.** The sub-components
    (`BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, …) were exported from the
    start but unused by `Breadcrumb` itself, so the composable form every example
    showed threw on `items.map`. `items` is optional now and children render when it
    is absent; the data-driven form is unchanged.

  `DialogContent` also gained `role="dialog"`, `aria-modal` and an `aria-labelledby`
  wired to `DialogTitle`. Adding the role surfaced that the dialog had no accessible
  name - axe's `aria-dialog-name` rule caught it immediately, which is why the role
  is worth having.

### Patch Changes

- a9626fb: Stop `Calendar` flickering when a date is picked, and make multi-series charts
  distinguishable.

  `Calendar`'s trigger had both `onClick` and `onFocus` opening the popover. Radix
  returns focus to the trigger when the popover closes, so selecting a date closed it
  and the focus handler reopened it immediately - the flicker. Opening on focus also
  popped the calendar open when tabbing past the field, so it is gone; the click
  handler covers mouse and keyboard alike.

  Picking a day outside the current month also deferred the selection with
  `setTimeout(..., 0)`, which rendered the new month in one frame and the selection in
  the next. Both updates are applied together now.

  `Chart`'s default palette opened with `brand-500` followed by `brand-600` - two
  neighbouring shades of the same purple - so a two-series chart drew two nearly
  identical lines. Reordered so distinct hues come first and brand variants last.
  Bars also get rounded tops.

- 1f5dd42: Fix components that ignored the theme and rendered raw Tailwind palette colours.

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

- 0f95811: Fix a permanently visible tooltip, an invisible vertical separator, and a skeleton
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

- c2a44a3: Add `code`, `terminal`, `palette` and `accessibility` to the icon map, plus `home`
  as an alias for `house`.

  `Icon` resolves its `name` through a lookup and only `console.warn`s on a miss, so
  an unknown name renders nothing and the page simply looks empty. The Features
  example asked for code, accessibility and palette - none of which existed - and the
  Icon documentation page itself shipped `<Icon name="home" />` against a map that
  only had `house`. `home` is the name people reach for first, so it is an alias
  rather than a correction.

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
