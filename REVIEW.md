# Projektreview for Nostromo UI

## Styrker
- Klar komponentstruktur i `packages/ui-core` med cva/variant-patterns og Radix som fundament for tilgængelighed.
- Grundigt testsæt for core-komponenterne (unit + a11y) med Vitest/Testing Library.
- Dokumentationssite med live-kode (`docs/components/LiveCode.tsx`) og Storybook-embed giver god demo-oplevelse.
- CI-workflow kører både lint/test og en separat a11y-job i `.github/workflows/ci.yml`.

## Højeste prioritet (ret før næste release)
- Justér marketing- og themepakkerne: `packages/ui-marketing` og `packages/ui-tw` har kun placeholder-tests (`--passWithNoTests` og `src/index.test.ts`), men README/ROADMAP lover 100% dækning og 800+ tests. Enten tilføj reelle tests eller nedton claims i `README.md` og `docs/guides/ROADMAP.md`.
- Ryd op i overdrevne/ukorrekte status-udsagn: Roadmap refererer til filer der ikke findes (fx `SEMVER_STABILITY.md`, `PERFORMANCE_AUDIT.md`) og fase-metrics der ikke er dokumenteret. Opdatér så de matcher den faktiske kodebase og udgivelser.
- Lint-advarsler bør lukkes for at undgå støj i CI (46 advarsler i `lint-output.txt`, bl.a. mange `any`-typer og en manglende afhængighed i `packages/ui-core/src/components/toast.tsx`).
- Bekræft publicerings-strategi: Installationsinstruktionerne (`pnpm add @nostromo/...`) forudsætter publicering på npm, men repoet er privat og der er ingen `publishConfig`. Afklar i dokumentationen hvordan pakkerne distribueres (npm, GitHub Packages eller lokal linking).

## Kode & komponenter
- `packages/ui-core/src/components/data-table.tsx`: Props som `virtualized` og `multiSort` er eksponeret men ingen logik implementeret. Fjern props eller implementér funktionaliteten for at undgå falske forventninger.
- `packages/ui-core/src/components/calendar.tsx`: Når `showOutsideDays` er true, renderes dage fra nabo-måneder men de sættes som `disabled={!day.isCurrentMonth}`, så brugeren kan ikke vælge dem. Afklar ønsket UX og enten tillad navigation/valg eller skjul dagene.
- `packages/ui-core/src/lib/performance.ts`: `usePerformanceMonitor` bruger `useLayoutEffect` og browser-APIs; på SSR kan det give advarsler. Overvej `useEffect` eller guards, eller dokumentér at hooken kun er til client-side.
- Storybook dækker kun core-komponenter (`packages/ui-core/.storybook`). Marketing-komponenter mangler stories og kontroller – overvej en separat Storybook eller inklusion af marketing-pakken, så designblokke kan testes visuelt.
- `packages/ui-core/.storybook/preview.tsx` logger tema-vars til konsollen på hver story-render; fjern/flag til debug for at holde Storybook ren for forbrugere.

## Tests & kvalitet
- Marketing- og Tailwind-pakkerne har ingen reelle tests. Tilføj mindst smoke-tests for exports og snapshots for tema-CSS i `packages/ui-tw`.
- CI accepterer lint-warnings og fortsætter på fejl (se `continue-on-error: true` i `.github/workflows/ci.yml`). Overvej at skærpe til fail-fast på lint/type-check/test, når advarslerne er ryddet.
- Overvej at tilføje regression-tests for nye avancerede komponenter (DataTable, Calendar, Charts) omkring edge cases (sortering med null-værdier, keyboard-nav igennem popovers, aria-attributter i Recharts).

## Dokumentation & docs-site
- Flere statements er ikke underbygget: 100% testdækning, 803 tests, månedlige sikkerhedsaudits mv. i `README.md`, `docs/pages/index.mdx` og `docs/guides/ROADMAP.md`. Trim teksten til verificerbare fakta (fx “core-pakken har omfattende tests”).
- `docs/guides/ARCHITECTURE.md` nævner `apps/playground/`, men mappen findes ikke. Opdatér strukturen så den afspejler repoet.
- `SECURITY.md` siger først “DO NOT create a public GitHub issue” og derefter “Create a GitHub issue with the security label” – retret så rapporteringsflowet er entydigt (fx privat mail eller Security Advisory).
- Dokumentér Storybook-dækning: `docs/pages/storybook.mdx` lover “All our components have stories”, men marketing-komponenter mangler. Tilføj enten stories eller justér teksten.
- Overvej at notere versions-krav i docs-site til Tailwind v4 og Next 14, så brugere på Tailwind v3 ikke rammes af presets der ikke virker.

## Storybook
- Udvid addons (Controls, Actions, Interactions) så forbrugere kan tweake props uden at læse koden.
- Sørg for mørk/lys tema-toggle i preview i stedet for hardcodet `data-theme="nostromo"` i `packages/ui-core/.storybook/preview.tsx`.
- Automatisér deploy af Storybook sammen med docs (samme commit) for at undgå at `StorybookEmbed` peger på en forældet build.

## Release & distribution
- Tilføj `publishConfig` og evt. `files`-whitelists pr. pakke, hvis npm-publicering er målet. Alternativt dokumentér pnpm workspace-installation for interne forbrugere.
- Overvej at versionere pakkerne synkront med changesets eller fjerne ubrugte scripts (`postinstall:ui-tw` kører build ved install og kan overraske).

## Hurtige next steps
1) Opdatér README og ROADMAP til faktiske tal/status, og ret SECURITY.md for en klar privat rapporteringsvej.  
2) Tilføj mindst smoke-tests i `packages/ui-marketing` og `packages/ui-tw`; fjern `--passWithNoTests`.  
3) Luk lint-advarslerne (primært `any`-typer og hook-deps) og gør lint til et hårdt krav i CI.  
4) Få marketing-komponenterne ind i Storybook og dokumentér hvad der dækkes på docs-sitet.  
5) Afklar installationsvejledning/publish-strategi, så `pnpm add @nostromo/...` matcher virkeligheden.
