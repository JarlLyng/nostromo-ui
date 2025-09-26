Nostromo UI – Technical Setup

Denne fil beskriver de dybere tekniske beslutninger for Nostromo UI. Formålet er at give et klart grundlag for implementering i Cursor og sikre konsistens på tværs af pakker.

⸻

Arkitektur & Setup

Monorepo-værktøj
	•	Valg: pnpm workspaces + Turborepo (fastlagt).
	•	Begrundelse: Hurtig install, caching og enkel opsætning af build-pipelines. Kendt fra mange moderne UI-libs.
	•	Alternativer: Nx, Lerna m.fl. fravælges i første omgang for at holde kompleksitet lav.

Build system
	•	Bibliotekspakker (@nostromo/ui-core, @nostromo/ui-marketing, @nostromo/ui-tw):
	•	Bygges med tsup (baseret på esbuild).
	•	Output: ESM + CJS + .d.ts.
	•	sideEffects: false i package.json for optimal tree-shaking.
	•	Docs:
	•	Nextra-baseret dokumentationssite med alle 27 komponenter.
	•	Nextra-baseret dokumentationssite med Storybook integration.

TypeScript-konfiguration
	•	Fælles tsconfig.base.json i roden: strict: true, moduleResolution: "bundler".
	•	Per-pakke tsconfig.json der extends base og definerer specifikke outDir/include.

⸻

Radix UI / Ark UI Integration
	•	React: Wrap Radix UI primitives (fx Dialog, Dropdown) i Nostromo-komponenter.
→ Radix leverer a11y + logik, Nostromo leverer Tailwind-klasser og API.
	•	Headless primitives fungerer problemfrit med Tailwind-first tilgang, da styling styres via Nostromo.

⸻

CSS Variabel Struktur

Vi bruger CSS-variabler med navnerum, i HSL-format for at understøtte Tailwinds hsl(var(--...)) pattern.

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

	•	Prædefinerede temaer: Nostromo, Mother, LV-426, Sulaco.
	•	Custom temaer: Brugere kan definere egne [data-theme="brand"] selectors og overskrive vars.
	•	Dark mode: Understøtter både system-baseret (prefers-color-scheme) og manuel toggle via data-theme.

⸻

Komponent API & Variants
	•	Props-struktur:
	•	variant: primary | secondary | ghost | destructive
	•	size: sm | md | lg
	•	state: default | loading | disabled
	•	Implementation:
	•	Standard = class-variance-authority (cva) til at definere varianter og kombinere Tailwind-klasser.
	•	API'et holdes konsistent på tværs af alle komponenter.
	•	Alle komponenter kan importeres både samlet og pr. komponent:
	•	import { Button } from "@nostromo/ui-core"
	•	import { Button } from "@nostromo/ui-core/button"

⸻

Performance
	•	SSR-kompatibilitet: Ingen afhængighed af window/document uden guards. Testes i React SSR miljøer.
	•	Hydration: Konsistente id’er via Radix/Ark patterns. Undgå runtime-randomization.
	•	CSS-loading: base.css og tema-vars indlæses kritisk i <head>.
	•	Bundle-optimering: ESM-first output, sideEffects disabled, lazy-load tunge komponenter (fx Charts, Gallery).

⸻

Development Workflow
	•	Hot reload: Turborepo + pnpm workspaces muliggør øjeblikkelig opdatering af core/marketing i docs.
	•	Shared devDependencies i roden (tsup, eslint, prettier, vitest, playwright, storybook).
	•	Playground: docs-appen fungerer som central udviklings- og testmiljø (Nextra-baseret dokumentationssite med live komponenter).

⸻

Breaking Changes-strategi
	•	Uafhængig versionering pr. pakke via Changesets.
	•	Hvis @nostromo/ui-tw ændrer tokens der påvirker ui-core, bumpes version i begge pakker.
	•	Release-notes dokumenterer altid breaking changes tydeligt.

⸻

Release & Distribution
	•	Public npm-pakker fra start (access: public).
	•	Eksporterer ESM + CJS + types.
	•	sideEffects:false i package.json.
	•	CI/CD: GitHub Actions til lint, test, build, release.
	•	Changesets til semver og changelog.

⸻

Bootstrap / Setup

# Krav: Node >= 20, pnpm >= 9

# Opret nyt repo
mkdir nostromo-ui && cd nostromo-ui

# Initier pnpm workspace + Turborepo
pnpm init -y
pnpm dlx create-turbo@latest .

# Opret pakker
mkdir -p packages/ui-core packages/ui-marketing packages/ui-tw docs

# Tilføj build tooling
pnpm add -D typescript tsup vite @vitejs/plugin-react tailwindcss postcss autoprefixer \
  eslint prettier vitest @testing-library/react @playwright/test @changesets/cli

# Init TypeScript
pnpm tsc --init

# Init Changesets
pnpm changeset init