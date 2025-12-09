# Nostromo UI

> **🎉 STABLE RELEASE** - Version 1.0.0 is now available! Production-ready component library with 27 core components, 6 marketing components, and 4 complete themes.

![Human in the Loop](https://jarllyng.github.io/madebyhuman/badges/loop-white.svg)

An open source UI library built with **React**, **TypeScript** and **Tailwind CSS**.\
The goal is to deliver a set of components that **work out of the box**, but are also easy to customize via themes (colors, typography, radius).

The library is divided into two areas:

1. **Core** – product and app components (buttons, inputs, dialogs, etc.).
2. **Marketing** – blocks for marketing sites (hero sections, testimonials, galleries, quotes, etc.).

The name is inspired by the spaceship *USCSS Nostromo* from the movie **Alien** (1979).

---

## 🚀 Quick Start

### Installation
```bash
pnpm add @nostromo/ui-core @nostromo/ui-marketing @nostromo/ui-tw
```

### Setup
1. **Configure Tailwind** - Add Nostromo preset to `tailwind.config.js`
2. **Import CSS** - Add base styles and theme in your entry file
3. **Start using components** - Import and use components

```tsx
// tailwind.config.js
const nostromoPreset = require("@nostromo/ui-tw/tailwind.preset.js");
module.exports = {
  presets: [nostromoPreset],
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@nostromo/**/*.{js,ts,jsx,tsx}"]
};

// main.tsx
import "@nostromo/ui-tw/styles/base.css";
import "@nostromo/ui-tw/themes/nostromo.css";

// Component usage
import { Button } from "@nostromo/ui-core";
<Button variant="default">Click me</Button>
```

> 📖 **Read more**: [Complete setup guide](docs/guides/DEVELOPMENT.md)

## 🧩 Available Components

### Core Components (27 components)
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

### Marketing Components (6 components)
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

**Current Phase**: Stable Release (1.0.0) 🎉
**Next Milestone**: Advanced Features (1.1.0)
**Current Focus**: Production use and community growth

### 🎉 **Stable Release**
Nostromo UI 1.0.0 is now production-ready! After extensive testing and community feedback, we're proud to offer a complete, stable component library.

**What's New in 1.0.0:**
- ✅ **Stable API** - No breaking changes planned
- ✅ **Production Ready** - Fully tested and documented
- ✅ **Complete Component Set** - 27 core + 6 marketing components
- ✅ **100% Test Coverage** - 691/691 tests passing
- ✅ **WCAG 2.1 AA Compliant** - Full accessibility support

### ✅ **Completed Features**
- **Monorepo Setup** - pnpm workspaces + Turborepo
- **Theming System** - CSS variables with HSL colors and 4 complete themes
- **Tailwind Preset** - Complete preset with Nostromo theme
- **27 Core Components** - Button, Input, Dialog, Badge, Card, Avatar, Tabs, Select, Label, HelperText, ErrorMessage, Icon, Table, Toast, Tooltip, Accordion, Skeleton, Progress, Alert, Checkbox, RadioGroup, Switch, Textarea, Breadcrumb, Pagination, Separator
- **6 Marketing Components** - Hero, Testimonials, Features, Pricing, Gallery, Logo Wall with full design system integration
- **Form Components** - Complete set of form-related components
- **Navigation Components** - Tabs and Select with keyboard accessibility
- **Data Components** - Table with sortable columns, pagination and responsive design
- **Feedback Components** - Toast, Tooltip, Progress with accessibility
- **Layout Components** - Accordion, Skeleton with animations
- **Test Infrastructure** - Vitest + Testing Library + axe-core (100% test coverage - 691/691 tests)
- **Storybook Setup** - React with dark theme
- **Build System** - tsup with ESM + CJS output and type definitions
- **Nextra Documentation Site** - Modern documentation with all 27 components, interactive Storybook examples and live previews
- **Complete Theme System** - 4 themes: Nostromo, Mother, LV-426, Sulaco

### 🎯 **Latest Improvements**
- **Marketing Components** - Hero, Testimonials, Features, Pricing with CVA variants and responsive design
- **Nextra Documentation** - Modern documentation site with all 27 components, interactive Storybook examples and live previews
- **Form Components** - Label, HelperText, ErrorMessage with accessibility features
- **Navigation Components** - Tabs and Select with Radix UI integration
- **Accessibility Tests** - 100% test coverage with axe-core integration
- **Storybook** - React components with dark theme
- **Test Infrastructure** - Vitest + Testing Library for React

### 📋 **Planned**
- **Advanced Components** - DataTable, Calendar, Charts
- **Search Functionality** - Component search in documentation site
- **Performance Optimization** - Bundle size optimization and performance monitoring

**Current Progress: 100% of MVP - Production Ready! 🎉**

---

## 📚 Documentation

**Live documentation**: [https://jarllyng.github.io/nostromo-ui/](https://jarllyng.github.io/nostromo-ui/) | **Storybook**: [https://jarllyng.github.io/nostromo-ui/storybook-static/](https://jarllyng.github.io/nostromo-ui/storybook-static/)

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
- **[Stability Test Plan](STABILITY_TEST_PLAN.md)** - Comprehensive testing strategy for releases
- **[Changelog](CHANGELOG.md)** - Version history

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Nostromo UI** - *"In space, no one can hear you scream... but everyone can see your beautiful UI"* 🚀
