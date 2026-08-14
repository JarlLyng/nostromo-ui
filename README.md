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

### Core Components

- **Button** - Interactive buttons with loading states and variants
- **Input** - Text input fields with validation and form integration
- **Dialog** - Modal dialogs with accessibility and focus management
- **Badge** - Status indicators and labels
- **Card** - Container components for content
- **Avatar** - User profile images with fallback support
- **Tabs** - Tab navigation with keyboard accessibility
- **Select** - Dropdown selects with search and multi-select
- **Label** - Form labels with accessibility features
- **HelperText** - Helper text for form fields
- **ErrorMessage** - Error messages for validation
- **Icon** - SVG icons with customizable styling
- **Table** - Data tables with sortable columns, pagination and responsive design
- **DataTable** - Advanced tables with search, filtering, sorting, and pagination
- **Toast** - Notification system with auto-dismiss and positioning
- **Tooltip** - Contextual information with positioning and triggers
- **Accordion** - Collapsible sections with keyboard navigation
- **Skeleton** - Loading states with animations and specialized components
- **Progress** - Progress indicators with variants and accessibility
- **Alert** - Notification alerts with variants and dismiss functionality
- **Checkbox** - Form checkboxes with accessibility and validation
- **RadioGroup** - Radio button groups with keyboard navigation
- **Switch** - Toggle switches with accessibility and variants
- **Textarea** - Multi-line text input with validation and resize
- **Breadcrumb** - Navigation breadcrumbs with accessibility
- **Pagination** - Page navigation with keyboard accessibility
- **Separator** - Visual separators with horizontal and vertical variants
- **Calendar** - Date picker with single, range, and multiple selection modes (uses `date-fns` for robust date handling)
- **Charts** - Data visualization with line, bar, area, and pie charts (also
  available as a lazy-loaded entry point for deferring `recharts`)
- **ErrorBoundary** - Catches render errors in a subtree and shows a fallback

### Marketing Components

- **Hero** - Hero sections with customizable layouts and call-to-action buttons
- **Testimonials** - Customer testimonials with ratings, avatars and responsive grids
- **Features** - Feature showcase grids with icons and hover effects
- **Pricing** - Pricing tables with yearly/monthly toggle and popular plan highlighting
- **Gallery** - Image galleries with lightbox functionality and responsive grids
- **Logo Wall** - Client logos with hover effects and responsive layouts

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

| Metric                   | Status | Details                                                                                                             |
| ------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------- |
| **Core Components**      | ✅     | 30 components (Charts also has a lazy-loading entry point)                                                          |
| **Marketing Components** | ✅     | 6 components implemented                                                                                            |
| **Themes**               | ✅     | 4 themes (Nostromo, Mother, LV-426, Sulaco)                                                                         |
| **Total Tests**          | ✅     | 1169 unit + accessibility (473 of them accessibility), plus 17 consumer smoke tests                                 |
| **Test Coverage**        | ✅     | 84.4% lines, 78.3% branches, 86.6% functions, 83.0% statements                                                      |
| **TypeScript**           | ✅     | Zero errors, strict mode enabled                                                                                    |
| **Linting**              | ✅     | 0 errors, 0 warnings (`eslint --max-warnings=0`)                                                                    |
| **CI/CD**                | ✅     | All critical checks passing (parallelized)                                                                          |
| **Documentation**        | ✅     | 15 guides, plus a page per component with live examples                                                             |
| **Distribution**         | ✅     | Published on npm as [`@jarllyng/nostromo`](https://www.npmjs.com/package/@jarllyng/nostromo), with build provenance |
| **Bundle Size**          | ✅     | 222.88 kB full barrel, minified + brotlied (limit 420 kB); single components from 8.73 kB                           |

> **Note**: Every release is published through GitHub Actions with npm Trusted Publishing, so tarballs carry build provenance. See [Publishing Guide](docs/guides/PUBLISHING.md).

### What is actually true

- **Tested** - 1169 unit and accessibility tests, of which 473 live in 36
  dedicated accessibility test files using `jest-axe`, plus 17 consumer smoke
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
- **30 Core Components** - Button, Input, Dialog, Badge, Card, Avatar, Tabs, Select, Label, HelperText, ErrorMessage, Icon, Table, DataTable, Toast, Tooltip, Accordion, Skeleton, Progress, Alert, Checkbox, RadioGroup, Switch, Textarea, Breadcrumb, Pagination, Separator, Calendar, Charts
- **6 Marketing Components** - Hero, Testimonials, Features, Pricing, Gallery, Logo Wall with full design system integration
- **Form Components** - Complete set of form-related components
- **Navigation Components** - Tabs and Select with keyboard accessibility
- **Data Components** - Table with sortable columns, pagination and responsive design; DataTable with search, filtering, sorting, and server-side support (controlled mode); Charts with line, bar, area, and pie visualizations
- **Feedback Components** - Toast, Tooltip, Progress with accessibility
- **Layout Components** - Accordion, Skeleton with animations
- **Test Infrastructure** - Vitest + Testing Library + axe-core (1169 unit and
  accessibility tests, plus 17 consumer smoke tests against the built package)
- **Build System** - tsup with ESM + CJS output and type definitions
- **Nextra Documentation Site** - Modern documentation with a page for each of the 36 components and live, editable previews
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
- **Accessibility** - Comprehensive accessibility testing with axe-core integration (473 of the 1169 tests)
- **Performance** - Bundle size monitoring and optimization (222.88 kB full barrel, tree-shakeable down to single components)
- **Dependency Management** - Dependabot configured for automated dependency updates, pre-commit hooks with Husky

**Current Progress: 100% of MVP - Production Ready! 🎉**

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
- **[Changelog](CHANGELOG.md)** - Version history

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Nostromo UI** - _"In space, no one can hear you scream... but everyone can see your beautiful UI"_ 🚀
