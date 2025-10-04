# Nostromo UI – Technical Setup

This file describes the deeper technical decisions for Nostromo UI. The purpose is to provide a clear foundation for implementation in Cursor and ensure consistency across packages.

⸻

## Architecture & Setup

### Monorepo Tools
- **Choice**: pnpm workspaces + Turborepo (established).
- **Rationale**: Fast install, caching and simple setup of build pipelines. Known from many modern UI libraries.
- **Alternatives**: Nx, Lerna etc. are rejected initially to keep complexity low.

### Build System
- **Library packages** (@nostromo/ui-core, @nostromo/ui-marketing, @nostromo/ui-tw):
- **Built with**: tsup (based on esbuild).
- **Output**: ESM + CJS + .d.ts.
- **sideEffects**: false in package.json for optimal tree-shaking.
- **Docs**:
- **Nextra-based documentation site** with all 27 components.
- **Nextra-based documentation site** with Storybook integration.

### TypeScript Configuration
- **Shared tsconfig.base.json** in root: strict: true, moduleResolution: "bundler".
- **Per-package tsconfig.json** that extends base and defines specific outDir/include.

⸻

## Radix UI / Ark UI Integration
- **React**: Wrap Radix UI primitives (e.g. Dialog, Dropdown) in Nostromo components.
→ Radix provides a11y + logic, Nostromo provides Tailwind classes and API.
- **Headless primitives** work seamlessly with Tailwind-first approach, as styling is controlled via Nostromo.

⸻

## CSS Variable Structure

We use CSS variables with namespacing, in HSL format to support Tailwind's hsl(var(--...)) pattern.

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

- **Predefined themes**: Nostromo, Mother, LV-426, Sulaco.
- **Custom themes**: Users can define their own [data-theme="brand"] selectors and override vars.
- **Dark mode**: Supports both system-based (prefers-color-scheme) and manual toggle via data-theme.

⸻

## Component API & Variants
- **Props structure**:
- variant: primary | secondary | ghost | destructive
- size: sm | md | lg
- state: default | loading | disabled
- **Implementation**:
- **Standard** = class-variance-authority (cva) to define variants and combine Tailwind classes.
- **API** is kept consistent across all components.
- **All components** can be imported both collectively and per component:
- import { Button } from "@nostromo/ui-core"
- import { Button } from "@nostromo/ui-core/button"

⸻

## Performance
- **SSR compatibility**: No dependency on window/document without guards. Tested in React SSR environments.
- **Hydration**: Consistent IDs via Radix/Ark patterns. Avoid runtime randomization.
- **CSS loading**: base.css and theme vars loaded critically in <head>.
- **Bundle optimization**: ESM-first output, sideEffects disabled, lazy-load heavy components (e.g. Charts, Gallery).

⸻

## Development Workflow
- **Hot reload**: Turborepo + pnpm workspaces enables instant updates of core/marketing in docs.
- **Shared devDependencies** in root (tsup, eslint, prettier, vitest, playwright, storybook).
- **Playground**: docs app functions as central development and test environment (Nextra-based documentation site with live components).

⸻

## Breaking Changes Strategy
- **Independent versioning** per package via Changesets.
- **If @nostromo/ui-tw** changes tokens that affect ui-core, version is bumped in both packages.
- **Release notes** always document breaking changes clearly.

⸻

## Release & Distribution
- **Public npm packages** from start (access: public).
- **Exports** ESM + CJS + types.
- **sideEffects**: false in package.json.
- **CI/CD**: GitHub Actions for lint, test, build, release.
- **Changesets** for semver and changelog.

⸻

## Bootstrap / Setup

# Requirements: Node >= 20, pnpm >= 9

# Create new repo
mkdir nostromo-ui && cd nostromo-ui

# Initialize pnpm workspace + Turborepo
pnpm init -y
pnpm dlx create-turbo@latest .

# Create packages
mkdir -p packages/ui-core packages/ui-marketing packages/ui-tw docs

# Add build tooling
pnpm add -D typescript tsup vite @vitejs/plugin-react tailwindcss postcss autoprefixer \
  eslint prettier vitest @testing-library/react @playwright/test @changesets/cli

# Init TypeScript
pnpm tsc --init

# Init Changesets
pnpm changeset init