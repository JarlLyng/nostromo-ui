# Nostromo UI

Et open source UI-bibliotek bygget med **React**, **Vue**, **TypeScript** og **Tailwind CSS**.\
Målet er at levere et sæt komponenter, der **virker ud af boksen**, men som også er nemme at tilpasse via temaer (farver, typografi, radius).

Biblioteket opdeles i to områder:

1. **Core** – produkt- og app-komponenter (knapper, inputs, dialoger osv.).
2. **Marketing** – blokke til marketing-sites (hero-sektioner, testimonials, gallerier, citater osv.).

Navnet er inspireret af rumskibet *USCSS Nostromo* fra filmen **Alien** (1979).

---

## 🚀 Quick Start

### Installation
```bash
# React eller Vue projekt
npm install @nostromo/ui-core @nostromo/ui-marketing @nostromo/ui-tw
# eller
yarn add @nostromo/ui-core @nostromo/ui-marketing @nostromo/ui-tw
# eller
pnpm add @nostromo/ui-core @nostromo/ui-marketing @nostromo/ui-tw
```

### Opsætning af Tailwind
```js
// tailwind.config.js
const nostromoPreset = require("@nostromo/ui-tw/tailwind.preset.js");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,vue,mdx}",
    "./node_modules/@nostromo/**/*.{js,ts,jsx,tsx,vue}"
  ],
  presets: [nostromoPreset],
};
```

### Import af base CSS
```ts
// I din entry-fil (fx main.tsx eller main.ts i Vue)
import "@nostromo/ui-tw/styles/base.css";
import "@nostromo/ui-tw/themes/nostromo.css"; // vælg eller tilpas tema
```

### Brug i React
```tsx
import { Button, Avatar, AvatarImage, AvatarFallback } from "@nostromo/ui-core";

export default function Example() {
  return (
    <div className="flex items-center gap-4">
      <Button variant="primary">Start mission</Button>
      
      {/* Compound Component API (anbefalet) */}
      <Avatar size="lg">
        <AvatarImage src="/user.jpg" alt="User avatar" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      
      {/* Eller simpel prop API */}
      <Avatar src="/user.jpg" alt="User avatar" fallback="JD" size="md" />
    </div>
  );
}
```

### Brug i Vue 3
```vue
<script setup lang="ts">
import { NButton, NAvatar, NAvatarImage, NAvatarFallback } from "@nostromo/ui-core/vue";
</script>

<template>
  <div class="flex items-center gap-4">
    <NButton variant="primary">Start mission</NButton>
    
    <!-- Compound Component API (anbefalet) -->
    <NAvatar size="lg">
      <NAvatarImage src="/user.jpg" alt="User avatar" />
      <NAvatarFallback>JD</NAvatarFallback>
    </NAvatar>
    
    <!-- Eller simpel prop API -->
    <NAvatar src="/user.jpg" alt="User avatar" fallback="JD" size="md" />
  </div>
</template>
```

---

## 📊 Projekt Status

### ✅ **Færdige Features**
- **Monorepo Setup** - pnpm workspaces + Turborepo
- **Theming System** - CSS variables med HSL farver
- **Tailwind Preset** - Komplet preset med Nostromo tema
- **Button Component** - React + Vue med alle variants
- **Input Component** - React + Vue med validation states
- **Dialog Component** - React + Vue med accessibility og focus management
- **Card Component** - React + Vue med variants og subkomponenter
- **Badge Component** - React + Vue med status og label variants
- **Avatar Component** - React + Vue med compound component API, image support og fallbacks
- **Test Infrastructure** - Vitest + Testing Library + axe-core (89.6% accessibility test coverage)
- **Storybook Setup** - React + Vue med dark theme og separate namespaces
- **Build System** - tsup med ESM + CJS output og type definitions

### 🚧 **I Udvikling**
- **Form Components** - Label, HelperText, Error states

### 🎯 **Seneste Forbedringer**
- **Avatar Component** - Ny compound component API med `AvatarImage` og `AvatarFallback`
- **Vue Badge** - Forbedret `asChild` funktionalitet med multiple children support
- **Accessibility Tests** - 89.6% test coverage med axe-core integration
- **Storybook** - Separate namespaces for React og Vue komponenter
- **Test Infrastructure** - Skiftet til `@testing-library/vue` for bedre Vue test support

### 📋 **Planlagt**
- **Marketing Components** - Hero, testimonials, galleries
- **Advanced Components** - DataTable, Calendar, Charts
- **Documentation Site** - Next.js med live playground

**Nuværende Progress: ~85% af MVP**

---

## 📚 Dokumentation

### Hoveddokumenter
- **[Arkitektur](ARCHITECTURE.md)** - Monorepo struktur, build system og pakke-organisation
- **[Theming](THEMING.md)** - Komplet theming guide med CSS-variabler og custom temaer
- **[Component API](COMPONENT_API.md)** - API design, variant system og komponent patterns
- **[Development](DEVELOPMENT.md)** - Setup, build process, testing og contribution guidelines

### Tekniske Specifikationer
- **[Technical Setup](TECHNICAL_SETUP.md)** - Dybere tekniske beslutninger og implementation details

### Projekt Filer
- **[Roadmap](ROADMAP.md)** - Detaljeret projektplan og milestones
- **[Contributing](CONTRIBUTING.md)** - Hvordan du bidrager til projektet
- **[Security](SECURITY.md)** - Sikkerhedspolitik og sårbarhedsrapportering
- **[Changelog](CHANGELOG.md)** - Historik over alle ændringer

---

## 🎯 Vision

- Giv udviklere et **moderne, tilgængeligt og Tailwind-first** komponentbibliotek.
- Gør det **enkelt at vælge et tema** (eller definere sit eget).
- Lever både **små primitives** og **store blokke**, så man kan bygge alt fra SaaS-dashboards til landingssider.
- Inspireret af shadcn/ui, men med en **klar todeling** (produkt vs marketing).
- Understøtter både **React og Vue** for bredere adoption.

---

## 🏗️ Arkitektur (Overblik)

Projektet organiseres som et **monorepo** (pnpm + Turborepo):

- **`@nostromo/ui-core`**\
  Produkt- og app-komponenter: Button, Input, Form, Dialog, Popover, Tabs, Table osv.

- **`@nostromo/ui-marketing`**\
  Marketing-komponenter: Hero, Feature-sektion, Testimonial, Gallery, CTA-sektioner, Pricing, FAQ.

- **`@nostromo/ui-tw`**\
  Tailwind preset + `base.css` + tema-variabler (CSS vars).

- **`apps/docs`**\
  Dokumentationssite (Next.js) med eksempler, live playground og tema-switcher.

> 📖 **Læs mere**: [Arkitektur dokumentation](ARCHITECTURE.md)

---

## 🎨 Theming (Overblik)

Theming baseres på **CSS-variabler i HSL**, som integreres direkte i Tailwind-konfigurationen.

- Default tokens (`--color-brand-500`, `--radius-sm`, `--font-heading`, osv.).
- Light/dark mode via `[data-theme]` attribut.
- Flere prædefinerede temaer (fx *Nostromo*, *Mother*, *LV-426*, *Sulaco*).
- Brugere kan definere egne tema-vars for at matche deres brand.

**Eksempel:**
```css
[data-theme="mybrand"] {
  --color-brand-500: 262 84% 52%;
  --radius-sm: 8px;
  --font-heading: "General Sans";
  --font-body: "Inter";
}
```

> 🎨 **Læs mere**: [Komplet theming guide](THEMING.md)

---

## 🧩 Komponentområder

### Core
- **Primitives**: Button, Input, Label, Form, Select, Checkbox, Radio.
- **Navigation**: Tabs, Dropdown, Popover, Dialog, Sheet.
- **Feedback**: Toast, Alert, Skeleton, Spinner.
- **Data**: Table, Badge, Card, List, Avatar.

### Marketing
- **Hero** (headline, media, CTA).
- **Features** (grid med ikoner + tekst).
- **Testimonials/Quotes**.
- **Image Gallery**.
- **Pricing Table**.
- **Logo Wall**.
- **FAQ Section**.
- **CTA/Signup Block**.

> 🔧 **Læs mere**: [Component API dokumentation](COMPONENT_API.md)

---

## 🗺️ Roadmap

### **MVP (0.1.0)** ✅ **70% Complete**
- ✅ Opsætning af monorepo (pnpm + Turborepo).
- ✅ `@nostromo/ui-tw`: Tailwind preset, base.css, Nostromo tema.
- ✅ `@nostromo/ui-core`: Button, Input, Dialog, Card, Badge, Avatar.
- 🚧 `@nostromo/ui-marketing`: Hero, Features, Testimonial.
- 🚧 Apps/docs-site med eksempler.

### **0.2.0 – Flere Core-komponenter**
- Form primitives (Label, HelperText, Error).
- Table, Skeleton, Toast.
- Dark mode support.

### **0.3.0 – Flere Marketing-blokke**
- Gallery, Pricing Table, Logo Wall.
- Flere prædefinerede temaer (*Mother*, *LV-426*, *Sulaco*).

### **0.4.0 – Playground & Theming Tool**
- Live theme editor (vælg farver/typografi → generér CSS-vars).
- Download/eksporér custom tema.

### **1.0.0 – Stabil release**
- Fuldt dækkende docs.
- A11y-audit.
- Semver stabilitet og changelog.

---

## 🤝 Contributing & Release

- **Repo**: GitHub (MIT-licens).
- **CI**: GitHub Actions (lint, test, build, release).
- **Release**: Changesets til semver.
- **Tests**: Vitest + RTL for core, Playwright/Storybook for visuelle regressioner.

> 🛠️ **Læs mere**: [Development guide](DEVELOPMENT.md)

---

## 📖 Læs Mere

### Dokumentation
- **[Arkitektur](ARCHITECTURE.md)** - Detaljeret monorepo og pakke-struktur
- **[Theming](THEMING.md)** - Komplet theming guide og eksempler  
- **[Component API](COMPONENT_API.md)** - API design og variant system
- **[Development](DEVELOPMENT.md)** - Setup, workflow og contribution guidelines
- **[Technical Setup](TECHNICAL_SETUP.md)** - Tekniske beslutninger og implementation details

### Projekt Information
- **[Roadmap](ROADMAP.md)** - Detaljeret projektplan og milestones
- **[Contributing](CONTRIBUTING.md)** - Hvordan du bidrager til projektet
- **[Security](SECURITY.md)** - Sikkerhedspolitik og sårbarhedsrapportering
- **[Changelog](CHANGELOG.md)** - Historik over alle ændringer
- **[AI Handover](AI_HANDOVER.md)** - Guide til AI-overtagelse af projektet

---

## 📄 Licens

MIT License - se [LICENSE](LICENSE) filen for detaljer.

---

**Nostromo UI** - *"In space, no one can hear you scream... but everyone can see your beautiful UI"* 🚀