# Arkitektur

Denne fil beskriver den tekniske arkitektur for Nostromo UI, inklusive monorepo-struktur, build system og pakke-organisation.

## 📋 Indhold

- [Monorepo Struktur](#monorepo-struktur)
- [Pakke Beskrivelser](#pakke-beskrivelser)
- [Build System](#build-system)
- [TypeScript Konfiguration](#typescript-konfiguration)
- [Dependencies](#dependencies)
- [Monorepo Tools](#monorepo-tools)
- [Performance Overvejelser](#performance-overvejelser)
- [Development Workflow](#development-workflow)
- [CI/CD Pipeline](#cicd-pipeline)
- [Skalering](#skalering)

## Monorepo Struktur

```
nostromo-ui/
├── packages/
│   ├── ui-core/           # Produkt- og app-komponenter
│   ├── ui-marketing/      # Marketing-komponenter
│   └── ui-tw/            # Tailwind preset + temaer
├── docs-advanced/        # Avanceret dokumentationssite (HTML)
├── apps/
│   └── playground/       # Development playground
├── tools/
│   ├── eslint-config/    # Shared ESLint config
│   └── tsconfig/         # Shared TypeScript configs
└── .github/              # CI/CD workflows
```

## Pakke Beskrivelser

### @nostromo/ui-core
**Produkt- og app-komponenter** til interne applikationer og dashboards.

**Komponenter:**
- **Primitives**: Button, Input, Label, Form, Select, Checkbox, Radio
- **Navigation**: Tabs, Dropdown, Popover, Dialog, Sheet
- **Feedback**: Toast, Alert, Skeleton, Spinner, Progress, Tooltip
- **Data**: Table, Badge, Card, List, Accordion
- **Layout**: Skeleton, Progress, Accordion

**API:**
```tsx
import { Button } from "@nostromo/ui-core"
// eller
import { Button } from "@nostromo/ui-core/button"
```

### @nostromo/ui-marketing
**Marketing-komponenter** til landingssider og marketing-sites.

**Komponenter:**
- **Hero** (headline, media, CTA)
- **Features** (grid med ikoner + tekst)
- **Testimonials/Quotes**
- **Gallery** (image grid med lightbox)
- **Pricing Table**
- **Logo Wall** (client logos med hover effects)

**API:**
```tsx
import { Hero } from "@nostromo/ui-marketing"
// eller
import { Hero } from "@nostromo/ui-marketing/hero"
```

### @nostromo/ui-tw
**Tailwind preset og theming system**.

**Indhold:**
- Tailwind preset med Nostromo tokens
- Base CSS med reset og utility classes
- Prædefinerede temaer (Nostromo, Mother, LV-426, Sulaco) - 4 komplette themes
- CSS variabel system for custom theming

**API:**
```js
// tailwind.config.js
const nostromoPreset = require("@nostromo/ui-tw/tailwind.preset");

module.exports = {
  presets: [nostromoPreset],
};
```

## Build System

### Bibliotekspakker
- **Build tool**: tsup (esbuild-baseret)
- **Output**: ESM + CJS + .d.ts
- **Tree shaking**: `sideEffects: false`
- **TypeScript**: Strict mode, bundler resolution

### Dokumentation
- **Framework**: HTML + CSS + JavaScript (avanceret dokumentationssite)
- **Features**: Live playground, tema-switcher, eksempler
- **Deployment**: Vercel/Netlify

## TypeScript Konfiguration

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

### Pakke-specifikke Configs
Hver pakke har sin egen `tsconfig.json` der `extends` base config og definerer:
- `outDir` for build output
- `include`/`exclude` patterns
- Pakke-specifikke compiler options

## Dependencies

### Peer Dependencies
- **React pakker**: `react`, `react-dom`
- **Headless primitives**: `@radix-ui/*` (React)

### Dev Dependencies (Shared)
- **Build**: `tsup`, `typescript`
- **Linting**: `eslint`, `prettier`
- **Testing**: `vitest`, `@testing-library/*`, `@playwright/test`
- **Docs**: `next`, `@next/mdx`
- **Release**: `@changesets/cli`

## Monorepo Tools

### pnpm Workspaces
- **Hurtig install**: Shared dependencies cached
- **Hoisting**: Optimal node_modules struktur
- **Workspace protocol**: Interne pakke-afhængigheder

### Turborepo
- **Build caching**: Incremental builds
- **Task orchestration**: Parallel execution
- **Remote caching**: Team-wide build cache

### Changesets
- **Version management**: Uafhængig versioning per pakke
- **Changelog**: Automatisk changelog generation
- **Release**: Semver-compliant releases

## Performance Overvejelser

### Bundle Optimization
- **ESM-first**: Modern bundler support
- **Tree shaking**: Dead code elimination
- **Code splitting**: Lazy loading for tunge komponenter
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
4. **Documentation**: Avanceret HTML-baseret dokumentationssite med alle 15 komponenter

## CI/CD Pipeline

### GitHub Actions
- **Lint**: ESLint + Prettier checks
- **Test**: Unit tests (Vitest) + E2E (Playwright)
- **Build**: All packages built and tested
- **Release**: Automated publishing to npm

### Quality Gates
- **Type checking**: TypeScript strict mode
- **Accessibility**: axe-core automated testing
- **Visual regression**: Storybook + Chromatic
- **Bundle size**: Size limit monitoring

## Skalering

### Fremtidige Overvejelser
- **Additional packages**: Charts, Data visualization, Mobile components
- **Platform support**: React Native, Solid.js
- **Internationalization**: i18n utilities
- **Advanced theming**: Design token system

Denne arkitektur er designet til at skale med projektets vækst og understøtte både små og store teams.
