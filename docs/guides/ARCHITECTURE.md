# Architecture

This file describes the technical architecture for Nostromo UI, including monorepo structure, build system and package organization.

## 📋 Contents

- [Monorepo Structure](#monorepo-structure)
- [Package Descriptions](#package-descriptions)
- [Build System](#build-system)
- [TypeScript Configuration](#typescript-configuration)
- [Dependencies](#dependencies)
- [Monorepo Tools](#monorepo-tools)
- [Performance Considerations](#performance-considerations)
- [Development Workflow](#development-workflow)
- [CI/CD Pipeline](#cicd-pipeline)
- [Scaling](#scaling)

## Monorepo Structure

```
nostromo-ui/
├── packages/
│   └── nostromo/         # Unified package (Core + Marketing + Themes)
├── docs/                 # Nextra documentation site
├── tools/                # Shared configs
└── .github/              # CI/CD workflows
```

## Package Descriptions

### @jarllyng/nostromo

**Unified UI Library** containing all components and themes.

**Components:**

- **Core**: Primitives (Button, Input, Form), Navigation (Tabs, Dialog), Feedback (Toast, Skeleton), Data (Table, Calendar, Charts)
- **Marketing**: Hero, Features, Testimonials, Gallery, Pricing, Logo Wall

**Theming:**

- Tailwind preset with Nostromo tokens
- 4 complete themes (Nostromo, Mother, LV-426, Sulaco)
- CSS variable system for custom theming

**API:**

```tsx
import { Button } from "@jarllyng/nostromo";
import { Hero } from "@jarllyng/nostromo";
```

**Tailwind Setup:**

```js
// tailwind.config.mjs
import nostromoPreset from "@jarllyng/nostromo/preset";

export default {
  presets: [nostromoPreset],
};
```

## Build System

### Library Packages

- **Build tool**: tsup (esbuild-based)
- **Output**: ESM + CJS + .d.ts
- **Tree shaking**: `sideEffects: false`
- **TypeScript**: Strict mode, bundler resolution

### Documentation

- **Framework**: Nextra (Next.js + MDX)
- **Features**: Storybook integration, live previews, interactive examples
- **Development**: Local server at http://localhost:3000

## TypeScript Configuration

### Base Config (`tsconfig.base.json`)

```json
{
  "compilerOptions": {
    "strict": true,
    "moduleResolution": "bundler",
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  }
}
```

### Package-specific Configs

Each package has its own `tsconfig.json` that `extends` base config and defines:

- `outDir` for build output
- `include`/`exclude` patterns
- Package-specific compiler options

## Dependencies

### Peer Dependencies

- **React packages**: `react`, `react-dom`
- **Headless primitives**: `@radix-ui/*` (React)

### Dev Dependencies (Shared)

- **Build**: `tsup`, `typescript`
- **Linting**: `eslint`, `prettier`
- **Testing**: `vitest`, `@testing-library/*`, `@playwright/test`
- **Docs**: `nextra`, `nextra-theme-docs`
- **Release**: `@changesets/cli`

## Monorepo Tools

### pnpm Workspaces

- **Fast install**: Shared dependencies cached
- **Hoisting**: Optimal node_modules structure
- **Workspace protocol**: Internal package dependencies

### Turborepo

- **Build caching**: Incremental builds
- **Task orchestration**: Parallel execution
- **Remote caching**: Team-wide build cache

### Changesets

- **Version management**: Independent versioning per package
- **Changelog**: Automatic changelog generation
- **Release**: Semver-compliant releases

## Performance Considerations

### Bundle Optimization

- **ESM-first**: Modern bundler support
- **Tree shaking**: Dead code elimination
- **Code splitting**: Lazy loading for heavy components
- **CSS optimization**: Critical CSS inlining

### Runtime Performance

- **SSR compatibility**: No window/document dependencies
- **Hydration**: Consistent IDs via Radix/Ark patterns
- **Memory**: Minimal runtime overhead

## Development Workflow

### Local Development

1. **Clone repo**: `git clone <repo>`
2. **Install dependencies**: `pnpm install`
3. **Start dev server**: `pnpm dev`
4. **Build packages**: `pnpm build`

### Package Development

1. **Create feature branch**: `git checkout -b feature/button-component`
2. **Develop in packages/**: Make changes to relevant packages
3. **Test locally**: `pnpm test`
4. **Create changeset**: `pnpm changeset`
5. **Submit PR**: GitHub pull request

### Release Process

1. **Merge PR**: Changes merged to main
2. **Version bump**: Changesets creates version PR
3. **Publish**: Automated npm publish
4. **Documentation**: Nextra-based documentation site with all 27 components and Storybook integration

## CI/CD Pipeline

### GitHub Actions Workflow

The CI pipeline runs on every push and pull request to `main` and `develop` branches. It uses a parallelized workflow for faster feedback:

#### Parallel Jobs

- **Setup Job**: Shared dependency installation (cached)
- **Lint Job**: ESLint checks (runs in parallel)
- **Type-check Job**: TypeScript validation (runs in parallel)
- **Test Job**: Unit tests with Vitest + coverage reporting (runs in parallel)
  - Coverage thresholds: 80% lines/functions/statements, 75% branches
  - Coverage reports generated and uploaded as artifacts
- **Build Job**: Compiles all packages (runs after all checks pass)
- **Accessibility Job**: axe-core tests (runs independently)

#### Workflow Benefits

- **Faster feedback**: Parallel execution reduces CI time significantly
- **Better error isolation**: Each job has separate error logs
- **Cache optimization**: Dependencies cached between runs
- **Quality gates**: All checks must pass before build

### Quality Gates

- **Type checking**: TypeScript strict mode
- **Linting**: ESLint (0 errors, warnings acceptable)
  - Root-level `eslint.config.js` for pre-commit hooks
  - Package-specific configs for specialized rules
- **Test coverage**: Coverage thresholds enforced in CI
  - 80% lines, 80% functions, 80% statements, 75% branches
  - Coverage reports generated and uploaded as artifacts
- **Accessibility**: axe-core automated testing
- **Bundle size**: Size limit monitoring (calendar.js: 40 KB, index.js: 420 KB)
- **Pre-commit hooks**: Husky + lint-staged for code quality

## Scaling

### Future Considerations

- **Additional packages**: Charts, Data visualization, Mobile components
- **Platform support**: React Native, Solid.js
- **Internationalization**: i18n utilities
- **Advanced theming**: Design token system

## CSS Variable Structure

We use CSS variables with namespacing, in HSL format to support Tailwind's `hsl(var(--...))` pattern.

```css
[data-theme="nostromo"] {
  --color-brand-50: 262 84% 95%;
  --color-brand-500: 262 84% 52%;
  --color-brand-900: 262 84% 15%;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  --font-heading: "Inter", sans-serif;
  --font-body: "Inter", sans-serif;
}
```

### Theme Implementation

- **HSL format** for all colors to support Tailwind's `hsl(var(--...))` pattern
- **Semantic naming** (brand, neutral, success, warning, error)
- **Consistent scale** (50, 100, 200... 900, 950)
- **Dark mode support** via `[data-color-scheme="dark"]`

## Component API Design

### Standard Props

All components support these standard props:

```tsx
interface BaseComponentProps {
  // Styling
  className?: string;

  // Accessibility
  id?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;

  // State
  disabled?: boolean;
  loading?: boolean;
}
```

### Variant System

```tsx
// Size variants
type Size = "sm" | "md" | "lg";

// Color variants
type Variant = "primary" | "secondary" | "ghost" | "destructive";

// State variants
type State = "default" | "loading" | "disabled";
```

This architecture is designed to scale with the project's growth and support both small and large teams.
