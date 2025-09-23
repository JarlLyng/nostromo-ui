# Changelog

Alle bemærkelsesværdige ændringer til dette projekt vil blive dokumenteret i denne fil.

Formatet er baseret på [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
og dette projekt følger [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Table Component med sortable columns, pagination, responsive design og accessibility
- Toast Component med auto-dismiss, positioning, variants og accessibility
- Tooltip Component med positioning, triggers og accessibility
- Accordion Component med collapsible sections, keyboard navigation og accessibility
- Skeleton Component med loading states, animations og accessibility
- Gallery Component med image grid, lightbox functionality, responsive design og accessibility
- Logo Wall Component med client logos, hover effects, responsive grid og accessibility
- Mother Theme med cold, clinical AI aesthetic, dashboard-focused design og dark mode support
- LV-426 Theme med warm, rusty atmosphere, marketing-focused design og gradient effects
- Sulaco Theme med modern, military-inspired aesthetic, professional design og status indicators
- Responsive design implementation (sm:, md:, lg: breakpoints)
- Accessibility improvements (Table accessibility, ARIA attributes)
- Accordion component tests (ARIA attributes og state management problemer)

### Changed
- Updated all components with responsive design breakpoints
- Improved accessibility across all components
- Enhanced ARIA attributes for better screen reader support
- Updated test coverage and accessibility testing

### Fixed
- Table accessibility issues (columnheader role, pagination buttons)
- Accordion state management and ARIA attributes
- Responsive design tests updated for new CSS classes
- Jest to Vitest migration in test files

### Added (Previous)
- Initial project setup
- Documentation structure
- Cursor rules configuration
- Security policy
- Contributing guidelines
- Monorepo setup with pnpm + Turborepo
- `@nostromo/ui-tw` package with Tailwind preset
- Nostromo theme implementation
- Theme switching utilities
- Base CSS with reset and component styles
- CSS variable system with HSL colors
- Dark mode support (system and manual)
- Button component (React + Vue)
- Input component (React + Vue)
- Dialog component (React + Vue)
- Card component (React + Vue)
- Badge component (React + Vue)
- Avatar component (React + Vue) with compound component API
- Test infrastructure (Vitest + Testing Library)
- Accessibility testing (axe-core) with 89.6% coverage
- Storybook setup with separate React/Vue namespaces
- Build system with ESM/CJS output and type definitions
- Avanceret dokumentationssite (HTML) med alle 15 komponenter og GitHub Pages deployment
- Interactive code editor with real-time preview
- Component pages with API documentation
- PWA support with manifest and icons

### Enhanced
- Documentation site now includes live playground with real-time code editing
- Component pages feature comprehensive API documentation with props tables
- PWA support added with manifest.json and icon files
- Avatar component now supports both compound component API (`AvatarImage`, `AvatarFallback`) and simple prop API
- Vue Badge `asChild` functionality now properly handles multiple children
- Vue accessibility tests migrated to `@testing-library/vue` for better compatibility
- Storybook stories organized with separate namespaces (`Components/` for React, `Vue/` for Vue)
- Test coverage improved to 89.6% for accessibility tests
- Build system enhanced with proper TypeScript declarations
- Storybook setup (React + Vue)
- Build system (tsup)
- Vue Storybook configuration and setup
- Component stories and documentation
- Vue Storybook running on port 6008 with separate configuration

### Changed
- Updated Vite plugins to latest versions
- Removed deprecated @types/vue dependency (Vue 3 has built-in types)

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
