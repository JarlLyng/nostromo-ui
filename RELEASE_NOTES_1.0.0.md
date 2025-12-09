# Nostromo UI 1.0.0 - Release Notes

## 🎉 Stable Release - First Production Version

This is the first stable release of Nostromo UI. After extensive beta testing and community feedback, we're proud to announce version 1.0.0 with a complete, production-ready component library.

## Highlights

- **27 Core Components** - Complete set of production-ready components
- **6 Marketing Components** - Hero, Features, Testimonials, Pricing, Gallery, Logo Wall
- **4 Complete Themes** - Nostromo (default), Mother, LV-426, Sulaco
- **100% Test Coverage** - 691/691 tests passing
- **WCAG 2.1 AA Compliant** - Full accessibility support
- **TypeScript First** - Complete type safety
- **Production Ready** - Stable API, comprehensive documentation, and extensive testing

## What's Included

### Core Components (27)
**Primitives:** Button, Badge, Avatar, Icon, Separator

**Forms:** Input, Textarea, Select, Checkbox, RadioGroup, Switch, Label, HelperText, ErrorMessage

**Navigation:** Tabs, Breadcrumb, Pagination

**Feedback:** Alert, Toast, Tooltip, Progress, Skeleton

**Data Display:** Table, Card, Accordion

**Overlays:** Dialog, ErrorBoundary

### Marketing Components (6)
Hero, Features, Testimonials, Pricing, Gallery, Logo Wall

### Themes (4)
- **Nostromo** (default) - Modern, clean design
- **Mother** - Warm, inviting palette
- **LV-426** - Dark, mysterious theme
- **Sulaco** - Professional, corporate style

## Installation

```bash
# npm
npm install @nostromo/ui-core @nostromo/ui-marketing @nostromo/ui-tw

# pnpm
pnpm add @nostromo/ui-core @nostromo/ui-marketing @nostromo/ui-tw

# yarn
yarn add @nostromo/ui-core @nostromo/ui-marketing @nostromo/ui-tw
```

## Quick Start

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

## Documentation

- **Live Documentation**: https://jarllyng.github.io/nostromo-ui/
- **Storybook**: https://jarllyng.github.io/nostromo-ui/storybook-static/
- **Getting Started**: https://jarllyng.github.io/nostromo-ui/getting-started
- **Theming Guide**: https://jarllyng.github.io/nostromo-ui/theming

## Breaking Changes

None! This is our first stable release. All APIs are stable and ready for production use.

## Migration from Beta

If you were using the beta version (0.1.0), simply update your dependencies:

```bash
pnpm add @nostromo/ui-core@^1.0.0 @nostromo/ui-marketing@^1.0.0 @nostromo/ui-tw@^1.0.0
```

No code changes required - the API is fully compatible.

## What's Next

We're already working on version 1.1.0 with:
- Advanced components (DataTable, Calendar, Charts)
- Search functionality in documentation
- Performance optimizations
- Additional themes

## Thank You

Thank you to everyone who tested the beta version and provided feedback. Your contributions made this release possible!

---

**Full Changelog**: See [CHANGELOG.md](https://github.com/JarlLyng/nostromo-ui/blob/main/CHANGELOG.md)

