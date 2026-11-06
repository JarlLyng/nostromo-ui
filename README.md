# Nostromo UI

> **Status** - Published on npm as
> [`@jarllyng/nostromo`](https://www.npmjs.com/package/@jarllyng/nostromo).
> Version numbers live in `packages/nostromo/package.json` and nowhere else, so
> nothing here can drift out of date.

![Human in the Loop](https://jarllyng.github.io/madebyhuman/badges/loop-white.svg)

An open source UI library built with **React**, **TypeScript** and **Tailwind CSS**.\
The goal is to deliver a set of components that **work out of the box**, but are also easy to customize via themes (colors, typography, radius).

The library is divided into two areas:

1. **Core** – product and app components (buttons, inputs, dialogs, etc.).
2. **Marketing** – blocks for marketing sites (hero sections, testimonials, galleries, quotes, etc.).

The name is inspired by the spaceship _USCSS Nostromo_ from the movie **Alien** (1979).

---

## 🚀 Quick Start

### Installation

```bash
pnpm add @jarllyng/nostromo
```

Peer dependencies: React 18.2+ or 19, and Tailwind CSS 4.

To work on the library itself instead, see the
[Development Guide](docs/guides/DEVELOPMENT.md):

```bash
git clone https://github.com/JarlLyng/nostromo-ui.git
cd nostromo-ui
pnpm install
```

### Setup

1. **Import CSS** - One import for Tailwind + tokens, one for the theme
2. **Set the theme attribute** - `data-theme` on `<html>`
3. **Start using components** - Import and use components

Theming is CSS-first on Tailwind v4, so there is no `tailwind.config.js` and no
preset to register.

```css
/* Your main stylesheet */
@import "@jarllyng/nostromo/tailwind.css";
@import "@jarllyng/nostromo/themes/nostromo.css";
```

```tsx
// index.html / layout
<html data-theme="nostromo" data-color-scheme="light">

// Component usage
import { Button } from "@jarllyng/nostromo";
<Button variant="default">Click me</Button>;
```

> 📖 **Read more**: [Complete setup guide](docs/guides/DEVELOPMENT.md)

## 🧩 Available Components

The [components index](https://jarllyng.github.io/nostromo-ui/components) has
every component, each on its own page with live examples you can edit in place.
A list here would only repeat it and fall behind.

Most of them are the usual pieces of an application: form controls, overlays such
as Dialog, Sheet, Drawer and Popover, menus and navigation, data display with
Table, DataTable, Calendar and Charts, and feedback such as Toast and Progress.
The marketing blocks for landing pages are Hero, Features, Testimonials, Pricing,
Gallery and Logo Wall.

All components are built with:

- ♿ **WCAG 2.1 AA compliance**
- 🎯 **TypeScript** with full type safety
- 🎨 **Tailwind CSS** with custom themes
- 📱 **Responsive design**
- 🌙 **Dark mode support**

---

## 📊 Project Status

**Current focus**: hardening the API. The library is published, builds
reproducibly, is tested against its own published entry points, and has no known
broken components.

### 📋 Factual Status Table

| Metric                   | Status | Details                                                                                                                                                                                        |
| ------------------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core Components**      | ✅     | 50 components (Charts also has a lazy-loading entry point)                                                                                                                                     |
| **Marketing Components** | ✅     | 6 components implemented                                                                                                                                                                       |
| **Themes**               | ✅     | 4 themes (Nostromo, Mother, LV-426, Sulaco)                                                                                                                                                    |
| **Total Tests**          | ✅     | 1442 unit + accessibility (473 in dedicated accessibility files), 138 browser tests in Chromium and WebKit, 19 consumer smoke tests, and 119 type-checked / 125 mounted documentation examples |
| **Test Coverage**        | ✅     | 87.0% lines, 78.7% branches, 85.3% functions, 85.9% statements                                                                                                                                 |
| **TypeScript**           | ✅     | Zero errors, strict mode enabled                                                                                                                                                               |
| **Linting**              | ✅     | 0 errors, 0 warnings (`eslint --max-warnings=0`)                                                                                                                                               |
| **CI/CD**                | ✅     | All critical checks passing (parallelized)                                                                                                                                                     |
| **Documentation**        | ✅     | Guides, plus a page per component with live examples                                                                                                                                           |
| **Distribution**         | ✅     | Published on npm as [`@jarllyng/nostromo`](https://www.npmjs.com/package/@jarllyng/nostromo), with build provenance                                                                            |
| **Bundle Size**          | ✅     | Budgeted per entry point and enforced in CI; `pnpm --filter @jarllyng/nostromo size` reports the current sizes                                                                                 |

> **Note**: Every release is published through GitHub Actions with npm Trusted Publishing, so tarballs carry build provenance. See [Publishing Guide](docs/guides/PUBLISHING.md).

### What is actually true

- **Tested** - 1442 unit and accessibility tests, of which 473 live in 36
  dedicated accessibility test files using `jest-axe`, plus 19 consumer smoke
  tests that compile the published stylesheet and mount components from `dist`
- **Accessible** - built on Radix primitives, with contrast validated against
  WCAG 2.1 AA in the test suite
- **Tree-shakeable** - per-component entry points with enforced size budgets
- **Themeable** - four themes, switchable at runtime via `data-theme`

### What is not

- **No production users that we know of.** The API has not been through the kind
  of external use that would justify calling it battle-tested
- **The API is not frozen.** Migrating theming to Tailwind v4 was a breaking
  change, and others may follow before things settle

### ✅ **Completed Features**

- **Monorepo Setup** - pnpm workspaces + Turborepo
- **Theming System** - CSS variables with HSL colors and 4 complete themes
- **Tailwind v4 Bridge** - design tokens registered in CSS via `@theme`, no JS preset
- **Core Components** - covering the shadcn/ui surface, each with a documentation page and live examples. [The components index](https://jarllyng.github.io/nostromo-ui/components) is the list, and CI checks that it links every component page.
- **6 Marketing Components** - Hero, Testimonials, Features, Pricing, Gallery, Logo Wall with full design system integration
- **Form Components** - Complete set of form-related components
- **Navigation Components** - Tabs and Select with keyboard accessibility
- **Data Components** - Table with sortable columns, pagination and responsive design; DataTable with search, filtering, sorting, and server-side support (controlled mode); Charts with line, bar, area, and pie visualizations
- **Feedback Components** - Toast, Tooltip, Progress with accessibility
- **Layout Components** - Accordion, Skeleton with animations
- **Test Infrastructure** - Vitest + Testing Library + axe-core, consumer smoke
  tests against the built package, and a Playwright suite in Chromium and WebKit
  for what jsdom cannot answer. [CI on main](https://github.com/JarlLyng/nostromo-ui/actions)
  reports the counts.
- **Build System** - tsup with ESM + CJS output and type definitions
- **Nextra Documentation Site** - a page for every component with live, editable previews, and every example type-checked against the published types in CI
- **Complete Theme System** - 4 themes: Nostromo, Mother, LV-426, Sulaco
- **Code Quality** - TypeScript strict mode, CI/CD pipeline, zero lint errors/warnings

### 🎯 **Latest Improvements**

- **WCAG AA Compliance** - All components optimized for WCAG 2.1 AA contrast requirements in both light and dark modes
- **Semantic Color Tokens** - Complete refactoring to semantic color tokens (background, foreground, muted, primary, etc.) for better theming and accessibility
- **Advanced Components** - DataTable, Calendar, and Charts components fully implemented and tested
- **Calendar Date Logic** - Replaced custom date manipulation with `date-fns` library for robust date handling (leap years, timezones, edge cases)
- **DataTable Controlled Mode** - Added server-side pagination/sorting/filtering support with controlled mode props
- **Code Quality** - TypeScript errors resolved, bundle size optimized
- **CI/CD** - Parallelized workflow (lint, type-check, test run in parallel), improved lint error detection, all checks passing
- **Live Examples** - Every component documentation page includes multiple live, editable examples, rendered in place rather than embedded from an external tool
- **Accessibility** - axe-core assertions alongside the unit tests, and WCAG 2.1 AA contrast verified for every theme and colour scheme by `pnpm audit:contrast`
- **Performance** - bundle size enforced in CI by size-limit, tree-shakeable down to single components
- **Dependency Management** - Dependabot configured for automated dependency updates, pre-commit hooks with Husky

Published on npm with provenance, and released from CI through Changesets. It
has no external users yet; [the roadmap](docs/guides/ROADMAP.md) says what that
would take.

---

## 📚 Documentation

**Live documentation**: [https://jarllyng.github.io/nostromo-ui/](https://jarllyng.github.io/nostromo-ui/)

### Main Guides

- **[Architecture](docs/guides/ARCHITECTURE.md)** - Monorepo structure and build system
- **[Theming](docs/guides/THEMING.md)** - CSS variables and custom themes
- **[API Reference](docs/guides/API_REFERENCE.md)** - Complete component API
- **[Development](docs/guides/DEVELOPMENT.md)** - Setup and contribution guidelines
- **[Workflow](docs/guides/WORKFLOW.md)** - Development workflow and branching strategy
- **[Best Practices](docs/guides/BEST_PRACTICES.md)** - Component patterns and optimization
- **[Troubleshooting](docs/guides/TROUBLESHOOTING.md)** - Common issues and solutions

### Project Info

- **[Roadmap](docs/guides/ROADMAP.md)** - Project milestones and plans
- **[Contributing](CONTRIBUTING.md)** - How to contribute
- **[Code Review](docs/guides/CODE_REVIEW.md)** - Review guidelines
- **[Security](SECURITY.md)** - Security policy
- **[Changelog](packages/nostromo/CHANGELOG.md)** - Version history, written by Changesets on every release

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Nostromo UI** - _"In space, no one can hear you scream... but everyone can see your beautiful UI"_ 🚀
