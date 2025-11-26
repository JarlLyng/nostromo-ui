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
```bash
# Install packages
pnpm add @nostromo/ui-core @nostromo/ui-marketing @nostromo/ui-tw

# Or with npm/yarn
npm install @nostromo/ui-core @nostromo/ui-marketing @nostromo/ui-tw
yarn add @nostromo/ui-core @nostromo/ui-marketing @nostromo/ui-tw
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

```
nostromo-ui/
├── packages/
│   ├── ui-core/              # Core components
│   │   ├── src/
│   │   │   ├── components/   # React components
│   │   │   └── index.ts     # Exports
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── ui-marketing/         # Marketing components
│   │   ├── src/
│   │   │   ├── components/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── ui-tw/               # Tailwind preset & themes
│       ├── src/
│       │   ├── preset.ts    # Tailwind preset
│       │   ├── base.css     # Base styles
│       │   └── themes/      # Theme files
│       ├── package.json
│       └── tsconfig.json
├── docs/                   # Nextra documentation site
│   ├── pages/             # Next.js Pages Router
│   ├── components/        # React components
│   ├── styles/           # CSS files
│   └── package.json
├── apps/
│   └── playground/         # Development playground
│       ├── src/
│       ├── package.json
│       └── vite.config.ts
├── tools/
│   ├── eslint-config/      # Shared ESLint config
│   └── tsconfig/          # Shared TypeScript configs
├── .github/
│   └── workflows/         # CI/CD
├── package.json           # Root package.json
├── pnpm-workspace.yaml    # pnpm workspace config
├── turbo.json            # Turborepo config
└── changeset.config.js   # Changesets config
```

## Development Commands

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

### tsup Konfiguration
```ts
// packages/ui-core/tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  treeshake: true,
});
```

### Package.json Setup
```json
{
  "name": "@nostromo/ui-core",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./button": {
      "import": "./dist/button.mjs",
      "require": "./dist/button.js",
      "types": "./dist/button.d.ts"
    }
  },
  "sideEffects": false,
  "files": ["dist"],
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  }
}
```

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

### Unit Tests
```tsx
// src/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct variant classes', () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-brand-500');
  });
});
```

### Accessibility Tests
```tsx
// src/components/Button.a11y.test.tsx
import { render } from '@testing-library/react';
import { Button } from './Button';

// Custom axe helper
const runAxe = async (container: HTMLElement) => {
  const axe = require('axe-core');
  return new Promise((resolve) => {
    axe.run(container, (err: any, results: any) => {
      if (err) throw err;
      resolve(results);
    });
  });
};

describe('Button Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('supports keyboard navigation', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('tabindex', '0');
  });
});
```

### E2E Tests
```ts
// tests/e2e/button.spec.ts
import { test, expect } from '@playwright/test';

test('Button component works correctly', async ({ page }) => {
  await page.goto('/playground');
  
  const button = page.getByRole('button', { name: 'Click me' });
  await expect(button).toBeVisible();
  
  await button.click();
  await expect(page.getByText('Button clicked!')).toBeVisible();
});
```

## Linting & Formatting

### ESLint Konfiguration
```js
// tools/eslint-config/index.js
module.exports = {
  extends: [
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
```

### Prettier Konfiguration
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

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


### Storybook Konfiguration

#### React Storybook (.storybook/main.ts)
```ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    // 1) React dedupe og ESM/browser bias + symlink strategy
    config.resolve = {
      ...config.resolve,
      dedupe: ['react', 'react-dom'],
      conditions: ['browser', 'module', 'import', 'default'],
      preserveSymlinks: false
    };

    // 2) Tailwind v4 Vite plugin
    const tailwindVite = (await import('@tailwindcss/vite')).default;
    config.plugins = [...(config.plugins ?? []), tailwindVite()];

    // 3) optimizeDeps: workspace packages are included (force prebundle)
    config.optimizeDeps = {
      ...(config.optimizeDeps ?? {}),
      force: true,
      include: [
        'react', 'react-dom',
        'react-dom/client',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'aria-hidden', 'react-remove-scroll',
        '@floating-ui/core', '@floating-ui/dom', '@floating-ui/react-dom',
        'phosphor-react',
        'tailwind-merge',
        'class-variance-authority', 'clsx',
        // Radix packages used in stories
        '@radix-ui/react-accordion',
        '@radix-ui/react-avatar',
        '@radix-ui/react-checkbox',
        '@radix-ui/react-label',
        '@radix-ui/react-radio-group',
        '@radix-ui/react-select',
        '@radix-ui/react-switch',
        '@radix-ui/react-toggle'
      ],
      entries: [
        '../src/**/*.stories.{ts,tsx,mdx}',
        '../src/**/*.tsx',
      ],
      esbuildOptions: {
        mainFields: ['module', 'browser', 'exports', 'main'],
        platform: 'browser',
      },
    };

    return config;
  },
};
```


### Story Eksempel
```tsx
// src/components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'destructive'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};
```

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

You can simulate the CI workflow locally using the provided script:

```bash
# Run all CI checks locally
./test-ci-locally.sh

# Or test individual steps
pnpm install --frozen-lockfile
pnpm lint
pnpm type-check
cd packages/ui-core && pnpm test:run
pnpm build
cd packages/ui-core && pnpm size
cd packages/ui-core && pnpm test:a11y
```

### Debugging CI Failures

If CI fails, error logs are automatically uploaded as artifacts. See [SHARE_ERRORS.md](../../.docs/SHARE_ERRORS.md) for detailed instructions on sharing error information.

## Contribution Guidelines

### Development Workflow
1. **Fork repository**
2. **Create feature branch**: `git checkout -b feature/button-component`
3. **Make changes**: Implement feature/fix
4. **Add tests**: Unit tests + accessibility tests
5. **Update documentation**: Update relevant .md files
6. **Create changeset**: `pnpm changeset`
7. **Submit PR**: GitHub pull request

### Code Standards
- **TypeScript**: Strict mode, no `any` types
- **Accessibility**: WCAG 2.1 AA compliance
- **Testing**: Minimum 80% code coverage
- **Documentation**: JSDoc for all public APIs
- **Performance**: No runtime overhead

### PR Requirements
- [ ] All tests pass
- [ ] No linting errors
- [ ] TypeScript compilation succeeds
- [ ] Accessibility tests pass
- [ ] Documentation updated
- [ ] Changeset created
- [ ] Storybook stories added

### Commit Convention
```
type(scope): description

feat(button): add loading state
fix(dialog): resolve focus trap issue
docs(readme): update installation guide
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

#### Test Failures
```bash
# Run tests with verbose output
pnpm test --verbose
```

#### Storybook Issues
```bash
# Clear Storybook cache
rm -rf .storybook/cache
pnpm storybook
```

### Performance Issues
- **Bundle size**: Check bundle analyzer output
- **Build time**: Use Turborepo caching
- **Test time**: Run tests in parallel

### Getting Help
- **GitHub Issues**: Bug reports and feature requests
- **Discussions**: General questions and discussions
- **Discord**: Real-time community support

## 📚 Nextra Dokumentation

### Development Server
```bash
# Start Nextra development server
cd docs
npm run dev

# Build statiske sider
npm run build

# Preview build
npm run start
```

### Struktur
- **`pages/`** - Next.js Pages Router med MDX filer
- **`components/`** - React komponenter til dokumentation (StorybookEmbed)
- **`styles/`** - CSS filer (globals.css, Tailwind config)

### Tilføj Ny Komponent Dokumentation
1. Opret `pages/components/[component].mdx`
2. Tilføj StorybookEmbed hvis nødvendigt
3. Test med `npm run dev`

### Storybook Integration
- **Storybook**: Kører på http://localhost:6006
- **Embed**: Brug `<StorybookEmbed story="components-[name]--[story]" />`
- **Port**: Konfigureret til port 6006 i StorybookEmbed komponenten

Denne guide giver dig alt du behøver for at udvikle med Nostromo UI effektivt og bidrage til projektet.
