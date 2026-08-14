# Development Guide

This file describes how to set up Nostromo UI for development, including installation, build process, testing and contribution guidelines.

## 📋 Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Development Commands](#development-commands)
- [Build System](#build-system)
- [Testing](#testing)
- [Linting & Formatting](#linting--formatting)
- [Documentation Site](#documentation-site)
- [CI/CD Pipeline](#cicd-pipeline)
- [Contribution Guidelines](#contribution-guidelines)
- [Troubleshooting](#troubleshooting)

## Quick Start

### Prerequisites

- **Node.js**: >= 20.0.0
- **pnpm**: >= 9.0.0
- **Git**: Latest version

### Installation

#### For Using Nostromo UI in Your Project

> **⚠️ Note**: Packages are currently workspace-only. npm publishing is planned for future release. For now, use the workspace setup below.

```bash
# Future npm installation (planned)
# pnpm add @jarllyng/nostromo @jarllyng/nostromo @jarllyng/nostromo
```

#### For Developing Nostromo UI

```bash
# Clone repository
git clone https://github.com/JarlLyng/nostromo-ui.git
cd nostromo-ui

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Setup in Your Project

1. **Import the CSS** - no `tailwind.config.js` is needed on Tailwind v4; the
   tokens are registered via `@theme` and the library declares its own
   `@source`:

```css
@import "@jarllyng/nostromo/tailwind.css";
@import "@jarllyng/nostromo/themes/nostromo.css";
```

2. **Import CSS** - Add base styles and theme in your entry file:

```ts
// In your entry file (e.g. main.tsx or _app.tsx)
import "@jarllyng/nostromo/base.css";
import "@jarllyng/nostromo/themes/nostromo.css"; // Choose theme: nostromo, mother, lv-426, or sulaco
```

3. **Use Components**:

```tsx
import { Button } from "@jarllyng/nostromo";

export default function App() {
  return <Button variant="default">Click me</Button>;
}
```

> 🎨 **For theming customization, see [Theming Guide](THEMING.md)**

## Project Structure

For detailed architecture, see [ARCHITECTURE.md](./ARCHITECTURE.md).

```
nostromo-ui/
├── packages/
│   └── nostromo/         # Unified package (Core + Marketing + Themes)
├── docs/                 # Nextra documentation site
├── tools/                # Shared configs
└── .github/              # CI/CD workflows
```

## Development Commands

### Test Results

- **Tests**: 1169 passing (unit + accessibility, 473 of them accessibility), plus 17 consumer smoke tests - 100% pass rate
- **Coverage**: 84.4% lines, 78.3% branches, 86.6% functions, 83.0% statements

### Root Commands

```bash
# Install dependencies
pnpm install

# Start all development servers
pnpm dev

# Build all packages
pnpm build

# Run tests
pnpm test

# Run linting
pnpm lint

# Run type checking
pnpm type-check

# Clean build artifacts
pnpm clean
```

### Package-specific Commands

```bash
# Build specific package
pnpm --filter @jarllyng/nostromo build

# Test specific package
pnpm --filter @jarllyng/nostromo test

# Start dev server for docs
cd docs && npm run dev

# Start playground
pnpm --filter playground dev
```

## Build System

For detailed build system information, see [ARCHITECTURE.md](./ARCHITECTURE.md#build-system).

Packages use **tsup** for building with ESM + CJS output and TypeScript definitions. All packages are tree-shakeable with `sideEffects: false`.

## Testing

### Test Setup

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.d.ts",
        "**/*.stories.*",
        "**/*.test.*",
        "dist/**",
      ],
      // Coverage thresholds - enforced in CI
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75, // Branches are harder to cover
        statements: 80,
      },
    },
  },
});
```

**Coverage Requirements:**

- **Minimum**: 80% lines, 80% functions, 80% statements, 75% branches
- **CI**: Coverage is automatically checked in CI pipeline
- **Reports**: Coverage reports (text, json, html, lcov) are generated and uploaded as CI artifacts

### Test Commands

```bash
# Kør alle tests
pnpm test

# Kør tests med UI
pnpm test:ui

# Kør tests en gang
pnpm test:run

# Kør tests med coverage
pnpm test:coverage
```

### Test Examples

For detailed testing examples and strategies, see [BEST_PRACTICES.md](./BEST_PRACTICES.md#testing-strategies).

**Unit Tests**: Use Vitest + Testing Library for component testing  
**Accessibility Tests**: Use axe-core for automated a11y testing  
**E2E Tests**: Use Playwright for end-to-end testing

## Linting & Formatting

We use **ESLint** for linting and **Prettier** for formatting.

### ESLint Configuration

- **Root config**: `eslint.config.js` (ESLint v9 flat config format)
- **Package configs**: Each package may have its own `eslint.config.js` for package-specific rules
- **Pre-commit hooks**: ESLint runs automatically via Husky + lint-staged before commits

### Commands

```bash
# Run linting
pnpm lint

# Auto-fix linting issues
pnpm lint:fix
```

**Note**: Pre-commit hooks will automatically run ESLint on staged files. If you need to bypass (not recommended), use `git commit --no-verify`.

## Documentation Site

The docs site is how you look at a component while working on it. There is no
separate component explorer - Storybook was removed, and every example now lives
on the component's own page.

```bash
# Nextra dev server, on http://localhost:3000
pnpm docs:dev

# Full static export, exactly as CI builds it
pnpm docs:build
```

`docs:dev` consumes the library through its `exports` map, so a component change
needs a `pnpm --filter @jarllyng/nostromo build` before the page picks it up.

Pages live in `docs/content/`, and the sidebar order comes from the `_meta.ts`
file in each directory. Examples are written with the `LiveCode` component,
which compiles the snippet in the browser and renders it under the code. Those
snippets are **not** type-checked - see [CONTRIBUTING.md](../../CONTRIBUTING.md#documentation-pages).

## Analytics (Umami)

- Provider: Umami (`https://umami-iamjarl.vercel.app/script.js`)
- Helper: `docs/lib/analytics.ts` exposes `track(event, data?)` (no-op on SSR)
- Events implemented on docs site:
  - `theme_change`: fired when `data-theme` or `data-color-scheme` changes (payload: `{ theme, colorScheme }`)
  - `cta_get_started`: `/getting-started` hero CTA (payload: `{ placement: 'hero' }`)
  - `cta_view_components`: “View All Components” link (payload: `{ placement: 'components_list' }`)
- How to emit custom events:
  - Import `track` and call `track('event_name', { optional: 'data' })` inside client-side handlers.

## CI/CD Pipeline

### GitHub Actions CI Workflow

The CI pipeline runs on every push and pull request to `main` and `develop` branches. It uses a **parallelized workflow** for faster feedback:

#### Parallel Jobs

1. **Setup Job**: Shared dependency installation (cached for reuse)
2. **Lint Job**: ESLint checks (runs in parallel, warnings acceptable, errors fail)
3. **Type-check Job**: TypeScript validation (runs in parallel)
4. **Test Job**: Unit tests with Vitest + coverage reporting (runs in parallel)
   - Coverage thresholds enforced: 80% lines/functions/statements, 75% branches
   - Coverage reports generated (text, json, html, lcov)
   - Coverage artifacts uploaded (30 days retention)
5. **Build Job**: Compiles all packages (runs after all checks pass)
6. **Accessibility Job**: axe-core tests (runs independently)

#### Workflow Benefits

- **Faster feedback**: Parallel execution reduces CI time significantly
- **Better error isolation**: Each job has separate error log artifacts
- **Cache optimization**: Dependencies cached between runs
- **Quality gates**: All checks must pass before build

#### CI Configuration

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  setup:
    runs-on: ubuntu-latest
    steps:
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Cache dependencies
        uses: actions/cache@v4
        # ... cache configuration

  lint:
    runs-on: ubuntu-latest
    needs: setup
    steps:
      - name: Run linter
        run: |
          pnpm lint 2>&1 | tee lint-output.txt || true
          # Check for actual errors (not warnings)
          if grep -E "✖ [0-9]+ problems \([1-9][0-9]* errors" lint-output.txt; then
            exit 1
          fi

  type-check:
    runs-on: ubuntu-latest
    needs: setup
    # ... runs in parallel with lint

  test:
    runs-on: ubuntu-latest
    needs: setup
    # ... runs in parallel with lint and type-check

  build:
    runs-on: ubuntu-latest
    needs: [lint, type-check, test]
    # ... runs after all checks pass

      - name: Check bundle sizes
        continue-on-error: true
        run: |
          cd packages/nostromo
          pnpm size

      - name: Upload error logs
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: ci-error-logs
          path: |
            lint-output.txt
            typecheck-output.txt
            test-output.txt
            build-output.txt
            packages/nostromo/size-output.txt

  accessibility:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          package_json_path: package.json

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run accessibility tests
        continue-on-error: true
        run: |
          cd packages/nostromo
          pnpm test:a11y
```

### Key Features

- **pnpm Version Management**: Uses `package_json_path` to read pnpm version from `package.json`, ensuring consistency
- **Error Handling**: All steps use `continue-on-error: true` to capture all outputs, then fail if needed
- **Artifact Uploads**: Error logs are automatically uploaded for debugging
- **Parallel Jobs**: Lint/test and accessibility tests run in parallel for faster CI
- **Warning Tolerance**: Linter accepts warnings, only fails on actual errors

### Testing CI Locally

Run `./test-ci-locally.sh` to simulate the CI workflow locally.

For debugging CI failures, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).

## Contribution Guidelines

For detailed contribution guidelines, see [CONTRIBUTING.md](../../CONTRIBUTING.md) and [CODE_REVIEW.md](./CODE_REVIEW.md).

### Quick Workflow

1. Fork repository and create feature branch
2. Make changes with tests and documentation
3. Create changeset: `pnpm changeset`
4. Submit PR with all checks passing

## Troubleshooting

For detailed troubleshooting, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).

### Quick Fixes

```bash
# Clear cache and reinstall
pnpm clean && rm -rf node_modules && pnpm install

# Regenerate types
pnpm type-check && pnpm build

# Rebuild the docs site from scratch
rm -rf docs/.next docs/out && pnpm docs:build
```

For more help, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) or open a [GitHub Issue](https://github.com/JarlLyng/nostromo-ui/issues).
