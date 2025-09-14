# AI Handover Guide

Denne fil er designet til at hjælpe AI-assistenter med at forstå og arbejde effektivt med Nostromo UI projektet.

## 📋 Indhold

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Development Guidelines](#development-guidelines)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

## Project Overview

### What is Nostromo UI?
Nostromo UI er et open source UI-bibliotek bygget med React, Vue, TypeScript og Tailwind CSS. Det er inspireret af rumskibet USCSS Nostromo fra filmen Alien (1979).

### Key Features
- **Dual Framework Support**: React og Vue 3
- **Tailwind-first**: CSS variables med HSL farver
- **Accessibility**: WCAG 2.1 AA compliance
- **Theming**: Fleksibelt theming system
- **Monorepo**: pnpm workspaces + Turborepo

### Project Structure
```
nostromo-ui/
├── packages/
│   ├── ui-core/           # Core komponenter (Button, Input, etc.)
│   ├── ui-marketing/      # Marketing komponenter
│   └── ui-tw/            # Tailwind preset & temaer
├── docs/                 # Dokumentationssite
└── tools/                # Shared tooling
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

## Key Files to Know

### Configuration Files
- `package.json`: Root package configuration
- `pnpm-workspace.yaml`: Workspace configuration
- `turbo.json`: Turborepo configuration
- `tsconfig.base.json`: Base TypeScript config

### Documentation Files
- `README.md`: Main project documentation
- `ROADMAP.md`: Project roadmap and milestones
- `CHANGELOG.md`: Version history
- `ARCHITECTURE.md`: Technical architecture
- `THEMING.md`: Theming system guide

### Component Files
- `packages/ui-core/src/components/`: React components
- `packages/ui-core/src/vue/`: Vue components
- `packages/ui-core/src/lib/`: Shared utilities

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