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
```bash
# Clone repository
git clone https://github.com/your-org/nostromo-ui.git
cd nostromo-ui

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

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
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
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

### GitHub Actions
```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm type-check
      - run: pnpm test
      - run: pnpm build
```

### Release Workflow
```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm build
      - run: pnpm changeset publish
```

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
