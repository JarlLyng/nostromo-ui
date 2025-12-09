# Projektreview (efter rettelser)

## Styrker og forbedringer siden sidst
- Marketing- og Tailwind-pakkerne har nu mindst smoke-tests (`packages/ui-marketing/src/index.test.ts`, `packages/ui-tw/src/index.test.ts`).
- Security-rapporteringen er mere klar (mail + Security Advisory) i `SECURITY.md`.
- Core-komponenterne står fortsat med solid struktur, Radix-integration og et stort test-suite i `packages/ui-core`.

## Højeste prioritet (blokér før kommunikation/release)
- **Overdrevne/ukorrekte status-claims**: `README.md` og `docs/guides/ROADMAP.md` lover “829 tests”, “100% complete”, “Performance audit completed”, m.m. men repoet har stadig 46 lint-advarsler (se `lint-output.txt`) og kun smoke-tests uden a11y/coverage for marketing/ui-tw. Trim tal/konklusioner til det, der faktisk er målt, ellers undermineres tillid.
- **Roadmap er datomæssigt og faktuelt misvisende**: Datostempling “Last Updated: January 2025” og beta-tidslinje i fremtiden, plus metrics på 803+ tests og 100% dækning, som ikke kan bekræftes. Opdatér med reelle milepæle, nuværende fase og faktiske aktiviteter.
- **Storybook-dækning**: Dokumentation (fx `README.md` og `docs/pages/storybook.mdx`) insinuerer fuld dækning, men Storybook i `packages/ui-core/.storybook` viser kun core-komponenter. Marketing-komponenter har stadig ingen stories. Tilføj stories eller justér tekst for at undgå misforståelser.
- **Publicering/distribution**: Installationssnippets (`pnpm add @nostromo/...`) antager npm-publicering, men der er ingen `publishConfig` eller dokumenteret registreringsvej. Afklar om pakker er offentlige, private eller kun til workspace-konsumption.

## Kode og funktionelle risici
- `packages/ui-core/src/components/data-table.tsx`: Props som `virtualized` og `multiSort` eksponeres uden implementeret funktionalitet. Fjern dem eller implementér for at undgå falske forventninger.
- `packages/ui-core/src/components/calendar.tsx`: Når `showOutsideDays` er true, renderes nabomåneds-dage men de er `disabled` (pga. `!day.isCurrentMonth`). Afklar UX: enten gør dem navigerbare/valgbare eller skjul dem.
- `packages/ui-core/src/lib/performance.ts`: Bruger `useLayoutEffect` + `window.performance`; kan give SSR-advarsler. Overvej guard eller `useEffect` for SSR-kompatibilitet.

## Kvalitet, tests og CI
- Lint-advarslerne fra `lint-output.txt` (primært `any`-typer og en manglende hook-dependency i `packages/ui-core/src/components/toast.tsx`) er stadig ikke adresseret. Ryd op og lad CI fejle på advarsler for at matche “production-ready”-budskabet.
- Marketing- og Tailwind-tests er kun smoke; ingen a11y-/snapshot- eller rendertests for CSS themes. Udbyg testdækning eller nedton “comprehensive testing”-claims.
- CI (`.github/workflows/ci.yml`) kører med `continue-on-error: true` og accepterer warnings. Når advarsler er ryddet, bør lint/type-check/test være hårde gates.

## Dokumentation
- `docs/guides/ROADMAP.md` og `README.md` gentager avancerede komponenter som “Planned”, selv om de er implementeret, og angiver 100% test-/dokumentationsstatus uden henvisning til rapporter. Saml en kort, verificerbar statussektion (f.eks. “core: X tests, marketing: smoke-tests, ui-tw: smoke-tests”).
- `SECURITY.md`: Kontakt-sektionen nævner stadig GitHub Issues for sikkerhed, hvilket strider mod øverste afsnit (“DO NOT create a public issue”). Gør rapporteringsvejen helt ens (mail/Security Advisory) og fjern issue-sporet.
- Storybook-siden (`docs/pages/storybook.mdx`) bør nævne, at hosted Storybook kun dækker core, indtil marketing-stories er tilføjet.

## Anbefalede næste skridt
1) Opdatér README + ROADMAP til fakta (tal, dækning, datoer) og ret SECURITY til ét konsistent rapporteringsflow.  
2) Ryd lint-advarslerne og gør lint/type-check/test til hårde gates i CI.  
3) Implementér eller fjern ubrugte DataTable-props og afklar Calendar-UX for outside days.  
4) Tilføj marketing-stories eller præcisér Storybook-dækning; overvej Controls/Actions addons.  
5) Afklar publiceringsmodel (npm/GitHub Packages/workspace-only) og dokumentér den sammen med versionskrav (Tailwind v4, Next 14) på docs-sitet.
