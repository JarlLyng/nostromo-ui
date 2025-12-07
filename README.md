# Nostromo UI

> **🚧 BETA VERSION** - This library is currently in beta testing phase. We're actively seeking feedback and testing from the community. Please report any issues or suggestions!

![Human in the Loop](https://jarllyng.github.io/madebyhuman/badges/loop-white.svg)

An open source UI library built with **React**, **TypeScript** and **Tailwind CSS**.\
The goal is to deliver a set of components that **work out of the box**, but are also easy to customize via themes (colors, typography, radius).

The library is divided into two areas:

1. **Core** – product and app components (buttons, inputs, dialogs, etc.).
2. **Marketing** – blocks for marketing sites (hero sections, testimonials, galleries, quotes, etc.).

The name is inspired by the spaceship *USCSS Nostromo* from the movie **Alien** (1979).

## 📚 Documentation

**Live documentation**: [https://jarllyng.github.io/nostromo-ui/](https://jarllyng.github.io/nostromo-ui/) (GitHub Pages)

We have a modern Nextra-based documentation site with all 27 components, interactive Storybook examples, live code previews, and complete API documentation. The documentation features:

- **🔍 Search functionality** - Quick search across all documentation
- **📝 Live code examples** - Interactive examples with react-live
- **📚 Categorized navigation** - Components organized by category (Primitives, Forms, Navigation, Feedback, Data Display, Marketing)
- **🎨 Storybook integration** - Embedded Storybook examples directly in docs
- **🌙 Dark mode support** - Automatic dark mode detection
- **📱 Responsive design** - Works perfectly on all devices

The documentation is built with Next.js and Nextra for optimal performance and developer experience.

> **Note**: Documentation is automatically deployed via GitHub Pages when changes are pushed to the main branch.

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

**Current Phase**: Beta Testing (0.1.0)
**Next Milestone**: Stable Release (1.0.0)
**Current Focus**: Community feedback and testing

### 🧪 **Beta Testing**
We're actively seeking feedback from the community! Please help us by:
- **Testing components** in your projects
- **Reporting issues** via GitHub Issues
- **Suggesting improvements** via GitHub Discussions
- **Sharing feedback** on component APIs and design

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

### 🚀 **Start Here**
- **[📚 Live Documentation](https://jarllyng.github.io/nostromo-ui/)** - **START HERE** - Live documentation site with all 27 components
- **[🎨 Live Storybook](https://jarllyng.github.io/nostromo-ui/storybook-static/)** - Interactive component examples

### 📖 **Main Documents**
- **[Architecture](docs/guides/ARCHITECTURE.md)** - Monorepo structure, build system and package organization
- **[Theming](docs/guides/THEMING.md)** - Complete theming guide with CSS variables and custom themes
- **[API Reference](docs/guides/API_REFERENCE.md)** - Complete API reference for all components
- **[Development](docs/guides/DEVELOPMENT.md)** - Setup, build process, testing and contribution guidelines
- **[Deployment](docs/guides/DEPLOYMENT.md)** - Deployment guide for GitHub Pages

### 📋 **Project Management**
- **[Roadmap](docs/guides/ROADMAP.md)** - Detailed project plan and milestones
- **[Contributing](CONTRIBUTING.md)** - How to contribute to the project
- **[Code Review Guide](docs/guides/CODE_REVIEW.md)** - Guide for reviewing code
- **[Security](SECURITY.md)** - Security policy and vulnerability reporting
- **[Changelog](CHANGELOG.md)** - History of all changes

---

## 🎯 Vision

- Give developers a **modern, accessible and Tailwind-first** component library.
- Make it **easy to choose a theme** (or define your own).
- Deliver both **small primitives** and **large blocks**, so you can build everything from SaaS dashboards to landing pages.
- Inspired by shadcn/ui, but with a **clear division** (product vs marketing).
- Focuses on **React** for optimal performance and developer experience.

---

## 🏗️ Architecture

The project is organized as a **monorepo** (pnpm + Turborepo) with three main packages:

- **`@nostromo/ui-core`** - Product and app components (Button, Input, Dialog, etc.)
- **`@nostromo/ui-marketing`** - Marketing components (Hero, Features, Pricing, etc.)
- **`@nostromo/ui-tw`** - Tailwind preset and theme system

> 📖 **Read more**: [Architecture documentation](docs/guides/ARCHITECTURE.md)

---

## 🎨 Theming

Nostromo UI uses **CSS variables in HSL format** for theming, providing maximum flexibility without runtime overhead. Includes 4 predefined themes (Nostromo, Mother, LV-426, Sulaco) and full support for custom themes and dark mode.

> 🎨 **Read more**: [Complete theming guide](docs/guides/THEMING.md)

---

## 🧩 Components

**27 Core Components**: Button, Input, Dialog, Badge, Card, Avatar, Tabs, Select, Label, HelperText, ErrorMessage, Icon, Table, Toast, Tooltip, Accordion, Skeleton, Progress, Alert, Checkbox, RadioGroup, Switch, Textarea, Breadcrumb, Pagination, Separator, ErrorBoundary

**6 Marketing Components**: Hero, Testimonials, Features, Pricing, Gallery, Logo Wall

> 🔧 **Read more**: [Complete API Reference](docs/guides/API_REFERENCE.md)

---

## 🗺️ Roadmap

**Current Status**: Beta (0.1.0) - Production Ready! 🎉

- ✅ **27 Core Components** - Complete set of product components
- ✅ **6 Marketing Components** - Hero, Features, Testimonials, Pricing, Gallery, Logo Wall
- ✅ **4 Predefined Themes** - Nostromo, Mother, LV-426, Sulaco
- ✅ **Full Documentation** - Nextra-based site with live examples
- ✅ **100% Test Coverage** - 691 tests including accessibility

> 📋 **Read more**: [Detailed roadmap](docs/guides/ROADMAP.md)

---

## 🤝 Contributing & Release

- **Repo**: GitHub (MIT-licens).
- **CI**: GitHub Actions (lint, test, build, release).
- **Release**: Changesets til semver.
- **Tests**: Vitest + RTL for core, Playwright/Storybook for visuelle regressioner.

> 🛠️ **Read more**: [Development guide](docs/guides/DEVELOPMENT.md)

---

## 📖 Read More

### 🚀 **Quick Start**
- **[📚 Live Documentation](https://jarllyng.github.io/nostromo-ui/)** - **START HERE** - Live documentation site with all 27 components
- **[🎨 Live Storybook](https://jarllyng.github.io/nostromo-ui/storybook-static/)** - Interactive component examples

### 📚 **Complete Documentation**
- **[Architecture](docs/guides/ARCHITECTURE.md)** - Detailed monorepo and package structure
- **[Theming](docs/guides/THEMING.md)** - Complete theming guide and examples  
- **[API Reference](docs/guides/API_REFERENCE.md)** - Complete API reference for all components
- **[Best Practices](docs/guides/BEST_PRACTICES.md)** - Component composition and usage patterns
- **[Development](docs/guides/DEVELOPMENT.md)** - Setup, workflow and contribution guidelines
- **[Code Review](docs/guides/CODE_REVIEW.md)** - Guide for reviewing code
- **[Deployment](docs/guides/DEPLOYMENT.md)** - GitHub Pages deployment guide

### 📋 **Project Information**
- **[Roadmap](docs/guides/ROADMAP.md)** - Detailed project plan and milestones
- **[Contributing](CONTRIBUTING.md)** - How to contribute to the project
- **[Security](SECURITY.md)** - Security policy and vulnerability reporting
- **[Changelog](CHANGELOG.md)** - History of all changes

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Nostromo UI** - *"In space, no one can hear you scream... but everyone can see your beautiful UI"* 🚀# Trigger deployment
