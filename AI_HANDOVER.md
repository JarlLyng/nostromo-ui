# 🤖 AI Handover Guide - Nostromo UI

Denne fil er designet til at hjælpe AI-assistenter med at forstå og arbejde effektivt med Nostromo UI projektet. Den indeholder alt nødvendigt information for en problemfri overtagelse.

## 📋 Indhold

- [🚀 Quick Start for AI](#quick-start-for-ai)
- [📊 Project Status](#project-status)
- [🏗️ Architecture](#architecture)
- [💻 Development Guidelines](#development-guidelines)
- [🔧 Common Tasks](#common-tasks)
- [🛠️ Troubleshooting](#troubleshooting)
- [⭐ Best Practices](#best-practices)
- [📁 Key Files & Structure](#key-files--structure)
- [🎯 Current Priorities](#current-priorities)
- [🔮 Future Roadmap](#future-roadmap)

## 🚀 Quick Start for AI

### **Første Skridt (5 minutter)**
1. **Læs denne guide** - Du er her! ✅
2. **Check projekt status** - [ROADMAP.md - Current Status](ROADMAP.md#current-status)
3. **Forstå arkitekturen** - [ARCHITECTURE.md - Monorepo Struktur](ARCHITECTURE.md#monorepo-struktur)
4. **Se test status** - Kør `pnpm test` for at se nuværende test coverage

### **Vigtige Commands**
```bash
# Check projekt status
pnpm test                    # Se test status (98.4% success rate)
pnpm build                   # Build alle pakker
pnpm dev                     # Start development servers

# Specifikke pakker
pnpm --filter @nostromo/ui-core test    # Test core komponenter
pnpm --filter docs dev                  # Start dokumentationssite
```

## 📊 Project Status

### **Nuværende Status (December 2024)**
- **Phase**: Foundation Setup (MVP 0.1.0)
- **Progress**: 90% af MVP færdig
- **Test Coverage**: 98.4% success rate (120/122 tests)
- **Komponenter**: 6/6 core komponenter færdige
- **Accessibility**: 100% compliance med axe-core

### **✅ Færdige Features**
- **Monorepo Setup** - pnpm workspaces + Turborepo
- **Theming System** - CSS variables med HSL farver
- **Core Komponenter** - Button, Input, Dialog, Card, Badge, Avatar
- **Test Infrastructure** - Vitest + Testing Library + axe-core
- **Build System** - tsup med ESM + CJS output
- **Documentation Site** - Next.js med live playground
- **Performance Optimizations** - Lazy loading, performance monitoring

### **🚧 I Udvikling**
- **Form Components** - Label, HelperText, Error states
- **Marketing Components** - Hero, Features, Testimonials

### **❌ Kendte Problemer**
- **2 tests fejler** - ErrorBoundary reset og Performance callback (ikke kritiske)
- **Dokumentation** - Kan optimeres for bedre AI overtagelse

## Project Overview

### What is Nostromo UI?
Nostromo UI er et open source UI-bibliotek bygget med React, TypeScript og Tailwind CSS. Det er inspireret af rumskibet USCSS Nostromo fra filmen Alien (1979).

### Key Features
- **React-First**: Optimized for React med TypeScript
- **Tailwind-first**: CSS variables med HSL farver
- **Accessibility**: WCAG 2.1 AA compliance (100% test coverage)
- **Theming**: Fleksibelt theming system med 4 prædefinerede temaer
- **Monorepo**: pnpm workspaces + Turborepo
- **Performance**: Tree-shakeable, lazy loading, performance monitoring

### Project Structure
```
nostromo-ui/
├── packages/
│   ├── ui-core/           # Core komponenter (Button, Input, etc.)
│   │   ├── src/components/    # React komponenter
│   │   ├── src/lib/          # Utilities (lazy loading, performance)
│   │   └── src/test/         # Test setup
│   ├── ui-marketing/      # Marketing komponenter
│   └── ui-tw/            # Tailwind preset & temaer
├── packages/docs/         # Dokumentationssite (Next.js)
├── tools/                # Shared tooling (eslint, tsconfig)
└── .github/              # CI/CD workflows
```

## Architecture

### Monorepo Setup
- **Package Manager**: pnpm workspaces
- **Build Tool**: Turborepo for caching
- **Build System**: tsup for ESM/CJS output
- **Testing**: Vitest + Testing Library

### Component Architecture
- **React**: Radix UI primitives + custom styling
- **Vue**: Ark UI primitives + custom styling
- **Styling**: Tailwind CSS + CSS variables
- **Variants**: class-variance-authority (CVA)

### Theming System
```css
[data-theme="nostromo"] {
  --color-brand-500: 262 84% 52%;
  --radius-md: 0.5rem;
  --font-heading: "Inter", sans-serif;
}
```

## Development Guidelines

### Code Standards
- **TypeScript**: Strict mode, no `any` types
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Tree-shakeable, minimal bundle
- **Testing**: 80%+ coverage, accessibility tests

### Component Patterns
```tsx
// React component pattern
export const Button = ({ variant = 'default', size = 'md', children, ...props }) => {
  return (
    <button 
      className={cn(buttonVariants({ variant, size }))}
      {...props}
    >
      {children}
    </button>
  );
};
```

```ts
// Vue component pattern
export const NButton = defineComponent({
  name: 'NButton',
  props: {
    variant: { type: String, default: 'default' },
    size: { type: String, default: 'md' },
  },
  setup(props, { slots }) {
    // Implementation
  },
});
```

### File Organization
- **Components**: `src/components/` (React), `src/vue/` (Vue)
- **Tests**: `src/components/__tests__/`, `src/vue/__tests__/`
- **Stories**: `src/components/__stories__/`, `src/vue/__stories__/`
- **Utils**: `src/lib/` (shared utilities)

## Common Tasks

### Adding a New Component

1. **Create React Component**
```bash
# Create component file
touch packages/ui-core/src/components/new-component.tsx

# Create test file
touch packages/ui-core/src/components/__tests__/new-component.test.tsx

# Create story file
touch packages/ui-core/src/components/__stories__/NewComponent.stories.tsx
```

2. **Create Vue Component**
```bash
# Create Vue component file
touch packages/ui-core/src/vue/new-component.ts

# Create Vue test file
touch packages/ui-core/src/vue/__tests__/new-component.test.ts

# Create Vue story file
touch packages/ui-core/src/vue/__stories__/NewComponent.stories.ts
```

3. **Update Exports**
```ts
// packages/ui-core/src/index.ts
export { NewComponent } from './components/new-component';

// packages/ui-core/src/vue/index.ts
export { NNewComponent } from './new-component';
```

### Running Tests
```bash
# All tests
pnpm test

# Specific package
pnpm --filter @nostromo/ui-core test

# With coverage
pnpm test --coverage
```

### Running Storybook
```bash
# React Storybook (port 6006)
cd packages/ui-core && pnpm storybook

# Vue Storybook (port 6008)
cd packages/ui-core && pnpm storybook:vue
```

### Building Packages
```bash
# All packages
pnpm build

# Specific package
pnpm --filter @nostromo/ui-core build
```

## Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear cache and reinstall
pnpm clean
rm -rf node_modules
pnpm install
```

#### TypeScript Errors
```bash
# Regenerate types
pnpm type-check
pnpm build
```

#### Storybook Issues
```bash
# Clear Storybook cache
rm -rf .storybook/cache
rm -rf .storybook-vue/cache
pnpm storybook
```

#### Test Failures
```bash
# Run tests with verbose output
pnpm test --verbose
```

### Performance Issues
- **Bundle size**: Check bundle analyzer output
- **Build time**: Use Turborepo caching
- **Test time**: Run tests in parallel

## Best Practices

### When Working with Components
1. **Start with React**: Implement React version first
2. **Match APIs**: Keep React og Vue APIs consistent
3. **Test both**: Write tests for both frameworks
4. **Document**: Update Storybook stories

### When Updating Documentation
1. **Update README**: Keep installation examples current
2. **Update ROADMAP**: Mark completed items
3. **Update CHANGELOG**: Document significant changes
4. **Cross-reference**: Update related documentation

### When Debugging
1. **Check console**: Look for error messages
2. **Check tests**: Run relevant tests
3. **Check Storybook**: Verify component rendering
4. **Check build**: Ensure packages build correctly

### Communication Style
- **Use Danish**: Respond in Danish as requested
- **Be thorough**: Provide complete information
- **Explain reasoning**: Help understand decisions
- **Ask questions**: Ensure understanding
- **Suggest alternatives**: Offer different approaches

## 📁 Key Files & Structure

### **Configuration Files (Vigtige)**
- `package.json` - Root package configuration med scripts
- `pnpm-workspace.yaml` - Workspace configuration
- `turbo.json` - Turborepo configuration for caching
- `tsconfig.base.json` - Base TypeScript config (strict mode)
- `changeset.config.js` - Version management

### **Documentation Files (Læs disse først)**
- `DOCUMENTATION_INDEX.md` - **START HER** - Centralt indeks
- `README.md` - Main project documentation
- `ROADMAP.md` - Project roadmap og milestones
- `ARCHITECTURE.md` - Technical architecture
- `THEMING.md` - Theming system guide
- `COMPONENT_API.md` - Component API design
- `DEVELOPMENT.md` - Development setup og guidelines

### **Component Files (Core arbejde)**
- `packages/ui-core/src/components/` - React komponenter
- `packages/ui-core/src/lib/` - Utilities (lazy loading, performance)
- `packages/ui-core/src/test/` - Test setup
- `packages/ui-core/src/components/__tests__/` - Unit tests
- `packages/ui-core/src/components/__stories__/` - Storybook stories

### **Build & Test Files**
- `packages/ui-core/tsup.config.ts` - Build configuration
- `packages/ui-core/vitest.config.ts` - Test configuration
- `packages/ui-core/package.json` - Package configuration

## 🎯 Current Priorities

### **Højeste Prioritet (Gør disse først)**
1. **Færdiggør MVP 0.1.0** - 90% færdig, mangler kun små ting
2. **Ret de 2 fejlende tests** - ErrorBoundary og Performance callback
3. **Forbedre dokumentation** - Gør det nemmere for næste AI

### **Medium Prioritet**
1. **Tilføj flere komponenter** - Form primitives, Table, Toast
2. **Marketing komponenter** - Hero, Features, Testimonials
3. **Performance optimering** - Bundle size, lazy loading

### **Lav Prioritet**
1. **Vue support** - Implementer Vue versioner
2. **Advanced features** - Charts, Data visualization
3. **Mobile support** - React Native komponenter

## 🔮 Future Roadmap

### **Version 0.2.0 (Næste)**
- Form primitives (Label, HelperText, Error)
- Table komponent
- Toast/Notification system
- Dark mode support

### **Version 0.3.0**
- Marketing komponenter (Hero, Features, Testimonials)
- Flere prædefinerede temaer
- Advanced theming tools

### **Version 1.0.0 (Stabil)**
- Fuldt dækkende dokumentation
- A11y audit
- Semver stabilitet
- Production ready

### **Fremtidige Overvejelser**
- Vue 3 support
- React Native support
- Advanced data visualization
- Internationalization (i18n)

## Getting Help

### Resources
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions
- **Documentation**: Comprehensive guides in project

### When to Ask for Help
- **Unclear requirements**: Ask for clarification
- **Technical decisions**: Discuss approach
- **Breaking changes**: Coordinate with team
- **Performance issues**: Get optimization advice

---

**Remember**: This is a collaborative project. Always communicate clearly, ask questions when uncertain, and prioritize code quality and user experience over speed.