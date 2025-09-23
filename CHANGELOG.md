# Changelog

Alle bemærkelsesværdige ændringer til dette projekt vil blive dokumenteret i denne fil.

Formatet er baseret på [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
og dette projekt følger [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **17 Core Components** - Button, Input, Dialog, Badge, Card, Avatar, Tabs, Select, Label, HelperText, ErrorMessage, Icon, Table, Toast, Tooltip, Accordion, Skeleton, Progress
- **6 Marketing Components** - Hero, Testimonials, Features, Pricing, Gallery, Logo Wall
- **4 Complete Themes** - Nostromo (default), Mother, LV-426, Sulaco
- **Advanced Documentation Site** - HTML-baseret med alle 17 komponenter, interaktive features og live previews
- **Complete Test Coverage** - 415/415 tests passing (100% coverage)
- **Accessibility Compliance** - WCAG 2.1 AA compliance for alle komponenter
- **Responsive Design** - sm:, md:, lg: breakpoints for alle komponenter
- **Theme System** - CSS variabler med HSL farver og custom theming support

### Changed
- **Documentation System** - Fjernet Docusaurus referencer, fokuseret på HTML-baseret dokumentation
- **Component Design** - Alle komponenter opdateret med moderne design system og CVA variants
- **Build System** - Optimized for production med ESM/CJS output og type definitions
- **Test Infrastructure** - Migreret fra Jest til Vitest, 100% test coverage

### Fixed
- **Accessibility Issues** - Alle ARIA attributes og keyboard navigation problemer løst
- **Test Coverage** - Alle 415 tests passer nu (100% coverage)
- **Build Errors** - TypeScript compilation fejl løst
- **Documentation Consistency** - Fjernet modsætninger mellem .md filer
- **Component API** - Konsistent API design på tværs af alle komponenter

### Added (Previous)
- **Project Foundation** - Monorepo setup med pnpm + Turborepo
- **Theming System** - CSS variabler med HSL farver og 4 komplette themes
- **Build System** - tsup med ESM/CJS output og type definitions
- **Test Infrastructure** - Vitest + Testing Library + axe-core
- **Documentation** - HTML-baseret dokumentationssite med alle komponenter
- **Component Library** - 17 Core + 6 Marketing komponenter
- **Accessibility** - WCAG 2.1 AA compliance for alle komponenter
- **Storybook** - React komponent showcase og dokumentation

### Enhanced
- **Documentation Site** - Live playground med real-time code editing
- **Component API** - Comprehensive API documentation med props tables
- **Design System** - Alle komponenter opdateret med moderne CVA variants
- **Accessibility** - 100% test coverage med axe-core integration
- **Performance** - Optimized bundle size og build process
- **Developer Experience** - IntelliSense support og TypeScript integration

### Changed
- **Dependencies** - Opdateret til latest versions for alle pakker
- **Build System** - Optimized for production med better tree shaking
- **Documentation** - Konsolideret og opryddet i alle .md filer

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- N/A

### Security
- N/A

---

## [0.1.0] - TBD

### Added
- Monorepo setup with pnpm + Turborepo
- `@nostromo/ui-core` package with basic components
- `@nostromo/ui-marketing` package with marketing blocks
- `@nostromo/ui-tw` package with Tailwind preset and themes
- Documentation site with examples
- Basic theming system with CSS variables
- TypeScript configuration
- Testing setup with Vitest
- Storybook configuration
- CI/CD pipeline with GitHub Actions

### Components Added
- Button component (React & Vue)
- Input component (React & Vue)
- Dialog component (React & Vue)
- Card component (React & Vue)
- Badge component (React & Vue)
- Avatar component (React & Vue)
- Hero marketing component
- Features marketing component
- Testimonial marketing component

### Themes Added
- Nostromo theme (default)
- Mother theme
- LV-426 theme
- Sulaco theme

---

## [0.1.1] - TBD

### Added
- **Avatar Component** - Complete user profile and image display component
  - React implementation with TypeScript
  - Vue 3 implementation with Composition API
  - Image support with automatic fallback handling
  - Size variants: sm (32px), md (40px), lg (48px), xl (64px)
  - Subcomponents: AvatarImage, AvatarFallback
  - Accessibility features: proper alt text, ARIA attributes
  - Error handling for failed image loads
  - Support for initials, emojis, and custom content
  - Comprehensive test coverage (30+ unit tests)
  - Accessibility testing (25+ a11y tests)
  - Storybook stories with real-world examples
  - User profiles, team members, chat interfaces
  - Avatar groups and status indicators

### Features
- **Image Loading States**: Proper loading and error handling
- **Fallback System**: Automatic fallback to initials or custom content
- **Size Variants**: Four size options for different use cases
- **Accessibility**: WCAG 2.1 AA compliant
- **TypeScript**: Full type safety for both React and Vue
- **Testing**: Comprehensive test coverage with Vitest
- **Documentation**: Complete Storybook stories and examples

### Examples
```tsx
// React
import { Avatar, AvatarImage, AvatarFallback } from "@nostromo/ui-core";

<Avatar src="/user.jpg" alt="User avatar">
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

```vue
<!-- Vue -->
<template>
  <NAvatar src="/user.jpg" alt="User avatar">
    <NAvatarFallback>JD</NAvatarFallback>
  </NAvatar>
</template>
```

---

## [0.2.0] - TBD

### Planned
- Form primitives (Label, HelperText, Error)
- Table component
- Skeleton component
- Toast component
- Dark mode support
- Additional marketing components

---

## [0.3.0] - TBD

### Planned
- Gallery marketing component
- Pricing Table marketing component
- Logo Wall marketing component
- Additional predefined themes
- Advanced theming features

---

## [0.4.0] - TBD

### Planned
- Live theme editor
- Theme export functionality
- Advanced playground features
- Performance optimizations

---

## [1.0.0] - TBD

### Planned
- Full documentation coverage
- Accessibility audit completion
- Performance benchmarks
- Stable API guarantees
- Community feedback integration

---

## Release Notes

### Version Numbering
- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features (backward compatible)
- **PATCH** (0.0.1): Bug fixes (backward compatible)

### Breaking Changes
Breaking changes will be clearly marked and include:
- Migration guide
- Deprecation warnings
- Timeline for removal

### Security Updates
Security updates will be released as patch versions and include:
- Security advisory
- Impact assessment
- Recommended actions

---

## Contributing to Changelog

When making changes, please update this changelog:

1. **Added**: New features
2. **Changed**: Changes to existing functionality
3. **Deprecated**: Soon-to-be removed features
4. **Removed**: Removed features
5. **Fixed**: Bug fixes
6. **Security**: Security improvements

### Format
```markdown
### Added
- New feature description

### Changed
- Change description

### Fixed
- Bug fix description
```

---

**Note**: This changelog follows [Keep a Changelog](https://keepachangelog.com/) format and [Semantic Versioning](https://semver.org/) principles.
