# Nostromo UI

> **🚧 BETA VERSION** - This library is currently in beta testing phase. We're actively seeking feedback and testing from the community. Please report any issues or suggestions!

An open source UI library built with **React**, **TypeScript** and **Tailwind CSS**.\
The goal is to deliver a set of components that **work out of the box**, but are also easy to customize via themes (colors, typography, radius).

The library is divided into two areas:

1. **Core** – product and app components (buttons, inputs, dialogs, etc.).
2. **Marketing** – blocks for marketing sites (hero sections, testimonials, galleries, quotes, etc.).

The name is inspired by the spaceship *USCSS Nostromo* from the movie **Alien** (1979).

## 📚 Documentation

**Live documentation**: [https://jarllyng.github.io/nostromo-ui/](https://jarllyng.github.io/nostromo-ui/) (GitHub Pages)

We have a modern Nextra-based documentation site with all 27 components, interactive Storybook examples, live previews and complete API documentation. The documentation is built with Next.js and Nextra for optimal performance and developer experience.

> **Note**: Documentation is automatically deployed via GitHub Pages when changes are pushed to the main branch.

---

## 🚀 Quick Start

### Installation
```bash
# React project
npm install @nostromo/ui-core @nostromo/ui-marketing @nostromo/ui-tw
# or
yarn add @nostromo/ui-core @nostromo/ui-marketing @nostromo/ui-tw
# or
pnpm add @nostromo/ui-core @nostromo/ui-marketing @nostromo/ui-tw
```

> **Note**: We recommend using `pnpm` for best performance in our monorepo setup.

### Tailwind Setup
```js
// tailwind.config.js
const nostromoPreset = require("@nostromo/ui-tw/tailwind.preset.js");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nostromo/**/*.{js,ts,jsx,tsx}"
  ],
  presets: [nostromoPreset],
};
```

### Import Base CSS
```ts
// In your entry file (e.g. main.tsx)
import "@nostromo/ui-tw/styles/base.css";
import "@nostromo/ui-tw/themes/nostromo.css"; // choose or customize theme
```

### Bundle Size & Performance
```tsx
// ✅ Recommended: Per-component imports (smallest bundle)
import { Button } from '@nostromo/ui-core/button';
import { Input } from '@nostromo/ui-core/input';

// ✅ Also OK: Barrel imports
import { Button, Input } from '@nostromo/ui-core';

// ❌ Avoid: Full library import
import * as Nostromo from '@nostromo/ui-core';
```

**Performance Benefits:**
- **Zero runtime overhead** - CSS variables only, no JavaScript
- **Tree shaking** - Only used components included
- **CSS-only theming** - No runtime theme switching
- **Optimized bundle** - Minimal JavaScript footprint

### Using in React
```tsx
import { Button, Avatar, AvatarImage, AvatarFallback } from "@nostromo/ui-core";

export default function Example() {
  return (
    <div className="flex items-center gap-4">
      <Button variant="default">Start mission</Button>
      
      {/* Compound Component API (recommended) */}
      <Avatar size="lg">
        <AvatarImage src="/user.jpg" alt="User avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      
      {/* Or simple prop API */}
      <Avatar src="/user.jpg" alt="User avatar" fallback="JD" size="md" />
    </div>
  );
}
```

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
- **[Component API](COMPONENT_API.md)** - API design, variant system and component patterns
- **[Development](docs/guides/DEVELOPMENT.md)** - Setup, build process, testing and contribution guidelines
- **[Technical Setup](TECHNICAL_SETUP.md)** - Deeper technical decisions and implementation details
- **[Deployment](docs/guides/DEPLOYMENT.md)** - Deployment guide for GitHub Pages

### 📋 **Project Management**
- **[Roadmap](docs/guides/ROADMAP.md)** - Detailed project plan and milestones
- **[Contributing](CONTRIBUTING.md)** - How to contribute to the project
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

## 🏗️ Architecture (Overview)

The project is organized as a **monorepo** (pnpm + Turborepo):

- **`@nostromo/ui-core`**\
  Product and app components: Button, Input, Form, Dialog, Popover, Tabs, Table etc.

- **`@nostromo/ui-marketing`**\
  Marketing components: Hero, Feature section, Testimonial, Gallery, CTA sections, Pricing, FAQ.

- **`@nostromo/ui-tw`**\
  Tailwind preset + `base.css` + theme variables (CSS vars).

- **`docs/`**\
  Modern Nextra-based documentation site with all 27 components, interactive Storybook examples, live previews and complete API documentation. Runs locally on http://localhost:3000.

> 📖 **Read more**: [Architecture documentation](docs/guides/ARCHITECTURE.md)

---

## 🎨 Theming & Design Tokens

Theming is based on **CSS variables in HSL**, which integrate directly into the Tailwind configuration. This gives you maximum flexibility without runtime overhead.

### **Design Tokens**
- **Colors**: HSL-based with semantic naming (`--color-brand-500`, `--color-neutral-900`)
- **Spacing**: Consistent scale (`--spacing-sm`, `--spacing-md`, `--spacing-lg`)
- **Typography**: Font families and sizes (`--font-heading`, `--text-lg`)
- **Shadows**: Layered shadow system (`--shadow-sm`, `--shadow-lg`)
- **Radius**: Border radius tokens (`--radius-md`, `--radius-lg`)

### **Predefined Themes**
- **Nostromo** (Default) - Purple brand, dark aesthetic
- **Mother** - Cyan brand, clinical dashboard style  
- **LV-426** - Orange brand, warm marketing feel
- **Sulaco** - Blue brand, professional military look

### **Custom Theming**
```css
[data-theme="mybrand"] {
  /* Brand colors - only change what you need */
  --color-brand-500: 220 100% 50%;  /* Your brand blue */
  --color-brand-600: 220 100% 40%;  /* Darker variant */
  
  /* Typography */
  --font-heading: "Poppins", sans-serif;
  --font-body: "Inter", sans-serif;
  
  /* Styling */
  --radius-md: 0.75rem;
}
```

### **Dark Mode Support**
```css
[data-theme="nostromo"][data-color-scheme="dark"] {
  --color-neutral-50: 0 0% 9%;     /* Dark background */
  --color-neutral-900: 0 0% 98%;   /* Light text */
  --color-brand-500: 262 84% 60%;  /* Lighter brand for contrast */
}
```

### **Accessibility**
- **WCAG 2.1 AA compliance** - All colors tested for contrast ratios
- **Focus states** - Automatic focus indicators
- **Keyboard navigation** - Full keyboard support

> 🎨 **Read more**: [Complete theming guide](docs/guides/THEMING.md)

---

## 🧩 Component Areas

### Core
- **Primitives**: Button, Input, Label, Form, Select, Checkbox, Radio.
- **Navigation**: Tabs, Dropdown, Popover, Dialog, Sheet.
- **Feedback**: Toast, Alert, Skeleton, Spinner.
- **Data**: Table, Badge, Card, List, Avatar.

### Marketing
- **Hero** (headline, media, CTA).
- **Features** (grid med ikoner + tekst).
- **Testimonials/Quotes**.
- **Image Gallery**.
- **Pricing Table**.
- **Logo Wall**.
- **FAQ Section**.
- **CTA/Signup Block**.

> 🔧 **Read more**: [Component API documentation](COMPONENT_API.md)

---

## 🗺️ Roadmap

### **MVP (0.1.0)** ✅ **90% Complete**
- ✅ Monorepo setup (pnpm + Turborepo).
- ✅ `@nostromo/ui-tw`: Tailwind preset, base.css, Nostromo theme.
- ✅ `@nostromo/ui-core`: Button, Input, Dialog, Card, Badge, Avatar.
- ✅ `@nostromo/docs`: Modern Nextra-based documentation site with all 27 components and interactive features.
- 🚧 `@nostromo/ui-marketing`: Hero, Features, Testimonial.

### **0.2.0 – More Core Components**
- Form primitives (Label, HelperText, Error).
- Table, Skeleton, Toast.
- Dark mode support.

### **0.3.0 – More Marketing Blocks**
- Gallery, Pricing Table, Logo Wall.
- More predefined themes (*Mother*, *LV-426*, *Sulaco*).

### **0.4.0 – Playground & Theming Tool**
- Live theme editor (choose colors/typography → generate CSS variables).
- Download/export custom theme.

### **1.0.0 – Stable Release**
- Complete documentation coverage.
- A11y audit.
- Semver stability and changelog.

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
- **[Component API](COMPONENT_API.md)** - API design and variant system
- **[Development](docs/guides/DEVELOPMENT.md)** - Setup, workflow and contribution guidelines
- **[Technical Setup](TECHNICAL_SETUP.md)** - Technical decisions and implementation details
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
