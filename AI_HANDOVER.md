# AI Handover Guide

Denne guide er designet til at hjælpe en ny AI med at forstå og overtage Nostromo UI projektet effektivt.

## 🎯 Projekt Oversigt

**Nostromo UI** er et open source UI-bibliotek bygget med React, Vue, TypeScript og Tailwind CSS. Projektet er inspireret af rumskibet USCSS Nostromo fra filmen Alien (1979).

### Nuværende Status
- **Progress**: ~45% af MVP (Phase 1)
- **Komponenter**: Button (React + Vue) færdig
- **Infrastructure**: Monorepo, testing, Storybook, theming system
- **Næste skridt**: Input komponent

## 📚 Vigtige Dokumenter

### Hoveddokumenter (Læs disse først)
1. **[README.md](README.md)** - Projekt oversigt og quick start
2. **[ROADMAP.md](ROADMAP.md)** - Detaljeret projektplan og milestones
3. **[ARCHITECTURE.md](ARCHITECTURE.md)** - Teknisk arkitektur og monorepo struktur
4. **[DEVELOPMENT.md](DEVELOPMENT.md)** - Setup, build, testing og workflow

### Tekniske Specifikationer
5. **[THEMING.md](THEMING.md)** - Theming system og CSS variables
6. **[COMPONENT_API.md](COMPONENT_API.md)** - API design og variant system
7. **[TECHNICAL_SETUP.md](TECHNICAL_SETUP.md)** - Tekniske beslutninger

### Projekt Management
8. **[CHANGELOG.md](CHANGELOG.md)** - Historik over alle ændringer
9. **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines
10. **[SECURITY.md](SECURITY.md)** - Sikkerhedspolitik

## 🏗️ Projekt Struktur

```
nostromo-ui/
├── packages/
│   ├── ui-core/              # Core komponenter (React + Vue)
│   │   ├── src/
│   │   │   ├── components/   # React komponenter
│   │   │   ├── vue/         # Vue komponenter
│   │   │   ├── lib/         # Utility funktioner
│   │   │   └── test/        # Test setup
│   │   ├── .storybook/      # React Storybook
│   │   ├── .storybook-vue/  # Vue Storybook
│   │   └── package.json
│   ├── ui-marketing/         # Marketing komponenter (fremtidig)
│   └── ui-tw/               # Tailwind preset og themes
├── .cursor/                  # Cursor AI rules
└── docs/                     # Dokumentation
```

## 🚀 Quick Start for AI

### 1. Forstå Projektet
```bash
# Læs disse dokumenter i rækkefølge:
# 1. README.md - Projekt oversigt
# 2. ROADMAP.md - Nuværende status og planer
# 3. ARCHITECTURE.md - Teknisk struktur
# 4. DEVELOPMENT.md - Setup og workflow
```

### 2. Setup Development Environment
```bash
# Clone og setup
git clone <repository>
cd nostromo-ui
pnpm install

# Start development
cd packages/ui-core
pnpm dev
```

### 3. Test Infrastructure
```bash
# Kør tests
pnpm test:run

# Start Storybook
pnpm storybook        # React: http://localhost:6006
pnpm storybook:vue    # Vue: http://localhost:6008
```

## 🎨 Theming System

### CSS Variables (HSL Format)
```css
[data-theme="nostromo"] {
  --color-brand-500: 262 84% 52%;
  --color-neutral-50: 0 0% 98%;
  --spacing-md: 1rem;
  --radius-md: 0.5rem;
}
```

### Tailwind Integration
```js
// tailwind.config.js
const nostromoPreset = require("@nostromo/ui-tw/tailwind.preset.js");
module.exports = { presets: [nostromoPreset] };
```

## 🧪 Testing Strategy

### Unit Tests (Vitest + Testing Library)
- **React**: `@testing-library/react`
- **Vue**: `@testing-library/vue`
- **Accessibility**: `axe-core`

### Test Commands
```bash
pnpm test              # Watch mode
pnpm test:run          # Single run
pnpm test:coverage     # With coverage
```

### Test Structure
```
src/
├── components/
│   ├── button.tsx
│   └── __tests__/
│       ├── button.test.tsx
│       └── button.a11y.test.tsx
└── vue/
    ├── button.ts
    └── __tests__/
        ├── button.test.ts
        └── button.a11y.test.ts
```

## 📖 Storybook Setup

### React Storybook
- **Port**: 6006
- **Config**: `.storybook/main.ts`
- **Stories**: `src/**/*.stories.tsx`

### Vue Storybook
- **Port**: 6008
- **Config**: `.storybook-vue/main.ts`
- **Stories**: `src/vue/**/*.stories.ts`

### Story Structure
```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  // ... config
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary' },
};
```

## 🔧 Build System

### tsup Configuration
```ts
// tsup.config.ts
export default {
  entry: ['src/index.ts', 'src/vue/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  external: ['react', 'react-dom', 'vue'],
};
```

### Package Structure
- **ESM**: `dist/index.mjs`
- **CJS**: `dist/index.js`
- **Types**: `dist/index.d.ts`
- **Vue**: `dist/vue/index.*`

## 🎯 Næste Skridt

### Umiddelbare Opgaver
1. **Input Component** - Form input med validation
2. **Dialog Component** - Modal dialog med accessibility
3. **Card Component** - Content container

### Development Workflow
1. **Læs eksisterende Button komponent** som reference
2. **Følg component development patterns** fra `.cursor/rules/`
3. **Skriv tests først** (TDD approach)
4. **Opret Storybook stories**
5. **Opdater dokumentation**

## 🚨 Vigtige Regler

### Fra `.cursor/rules/nostromo-ui.mdc`
- **ALDRIG deploy til GitHub** uden tilladelse
- **ALDRIG force push** eller rewrite git history
- **SPØRG altid** før destructive changes
- **OPDATER dokumentation** når du laver ændringer
- **FØLG etablerede patterns** fra eksisterende kode

### Code Standards
- **TypeScript strict mode** - Ingen `any` types
- **Accessibility first** - WCAG 2.1 AA compliance
- **Tailwind-first** approach med utility classes
- **CSS variables** for theming (ikke CSS-in-JS)

## 🔍 Debugging Tips

### Storybook Issues
```bash
# Clear cache
rm -rf .storybook/cache
rm -rf .storybook-vue/cache

# Restart
pnpm storybook
pnpm storybook:vue
```

### Test Issues
```bash
# Clear test cache
rm -rf node_modules/.vitest
pnpm test:run
```

### Build Issues
```bash
# Clean build
pnpm clean
pnpm build
```

## 📞 Support Resources

### Dokumentation
- **Cursor Rules**: `.cursor/rules/` - AI guidelines
- **Component Patterns**: Se eksisterende Button komponent
- **Test Examples**: Se `__tests__/` directories

### Når du er i tvivl
1. **Læs eksisterende kode** som reference
2. **Tjek `.cursor/rules/`** for guidelines
3. **Følg etablerede patterns**
4. **Spørg brugeren** for clarification

## 🎉 Success Criteria

Et vellykket AI-overtagelse betyder:
- ✅ Kan køre alle tests (`pnpm test:run`)
- ✅ Kan starte Storybook (React + Vue)
- ✅ Forstår theming system
- ✅ Kan følge development workflow
- ✅ Kan implementere nye komponenter
- ✅ Opdaterer dokumentation korrekt

---

**Held og lykke med Nostromo UI! 🚀**

*"In space, no one can hear you scream... but everyone can see your beautiful UI"*
