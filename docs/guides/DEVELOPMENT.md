# Development Guide

This file describes how to set up Nostromo UI for development, including installation, build process, testing and contribution guidelines.

## 📋 Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Development Commands](#development-commands)
- [Build System](#build-system)
- [Testing](#testing)
- [Linting & Formatting](#linting--formatting)
- [Storybook](#storybook)
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
# pnpm add @nostromo/ui-core @nostromo/ui-marketing @nostromo/ui-tw
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

1. **Configure Tailwind** - Add Nostromo preset to `tailwind.config.js`:
```js
const nostromoPreset = require("@nostromo/ui-tw/tailwind.preset.js");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nostromo/**/*.{js,ts,jsx,tsx}"
  ],
  presets: [nostromoPreset],
};
```

2. **Import CSS** - Add base styles and theme in your entry file:
```ts
// In your entry file (e.g. main.tsx or _app.tsx)
import "@nostromo/ui-tw/styles/base.css";
import "@nostromo/ui-tw/themes/nostromo.css"; // Choose theme: nostromo, mother, lv-426, or sulaco
```

3. **Use Components**:
```tsx
import { Button } from "@nostromo/ui-core";

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
│   ├── ui-core/          # Core components
│   ├── ui-marketing/     # Marketing components
│   └── ui-tw/            # Tailwind preset & themes
├── docs/                 # Nextra documentation site
├── tools/                # Shared configs
└── .github/              # CI/CD workflows
```

## Development Commands

### Test Results
- **Core Package**: 842 tests passing (unit + accessibility) - 100% pass rate
- **Marketing Package**: 7 smoke tests (export + render verification)
- **Theme Package**: 3 smoke tests (preset structure validation)

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
pnpm --filter @nostromo/ui-core build

# Test specific package
pnpm --filter @nostromo/ui-core test

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
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
```

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

We use **ESLint** for linting and **Prettier** for formatting. Configuration is shared via `tools/eslint-config/`.

Run `pnpm lint` to check code quality and `pnpm lint:fix` to auto-fix issues.

## Storybook

### Storybook Setup

Nostromo UI har to separate Storybook instanser:

#### React Storybook
```bash
# Start React Storybook
cd packages/ui-core
pnpm storybook
# Kører på http://localhost:6006
```


### Storybook Configuration

Storybook uses React + Vite with Tailwind CSS v4. Configuration is in `packages/ui-core/.storybook/`.

For Storybook issues, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md#storybook-issues).

## Analytics (Umami)

- Provider: Umami (`https://umami-iamjarl.vercel.app/script.js`)
- Helper: `docs/lib/analytics.ts` exposes `track(event, data?)` (no-op on SSR)
- Events implemented on docs site:
  - `theme_change`: fired when `data-theme` or `data-color-scheme` changes (payload: `{ theme, colorScheme }`)
  - `cta_get_started`: `/getting-started` hero CTA (payload: `{ placement: 'hero' }`)
  - `cta_storybook`: Storybook hero CTA (payload: `{ placement: 'hero' }`)
  - `cta_view_components`: “View All Components” link (payload: `{ placement: 'components_list' }`)
- How to emit custom events:
  - Import `track` and call `track('event_name', { optional: 'data' })` inside client-side handlers.

## CI/CD Pipeline

### GitHub Actions CI Workflow

The CI pipeline runs on every push and pull request to `main` and `develop` branches. It includes two parallel jobs:

#### 1. Lint and Test Job
- **Linting**: Checks code quality (warnings are acceptable, errors fail CI)
- **Type Checking**: Validates TypeScript types
- **Unit Tests**: Runs all Vitest tests
- **Build**: Compiles all packages
- **Bundle Size**: Checks bundle sizes against limits

#### 2. Accessibility Job
- **Accessibility Tests**: Runs axe-core tests in parallel

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
  lint-and-test:
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
      
      - name: Run linter
        continue-on-error: true
        run: |
          # Linter allows warnings, only fails on actual errors
          pnpm lint 2>&1 | tee lint-output.txt
          # ... error detection logic
      
      - name: Run type check
        continue-on-error: true
        run: pnpm type-check
      
      - name: Run tests
        continue-on-error: true
        run: |
          cd packages/ui-core
          pnpm test:run
      
      - name: Build packages
        continue-on-error: true
        run: pnpm build
      
      - name: Check bundle sizes
        continue-on-error: true
        run: |
          cd packages/ui-core
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
            packages/ui-core/size-output.txt

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
          cd packages/ui-core
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

# Clear Storybook cache
rm -rf .storybook/cache && pnpm storybook
```

For more help, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) or open a [GitHub Issue](https://github.com/JarlLyng/nostromo-ui/issues).
