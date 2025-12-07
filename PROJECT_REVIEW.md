# Projektreview for Nostromo UI

## Overblik
- Gennemgang af monorepoet (`ui-core`, `ui-marketing`, `ui-tw`, docs) med fokus på API-overflade, pakkekonfiguration og udvalgte komponenter.
- Test-/lint-kommandoer blev ikke kørt her; seneste lint-log (`lint-output.txt`) viser advarsler men ingen fejl.

## Styrker
- Klar monorepo-struktur (pnpm + Turborepo) med adskillelse mellem kerne-, marketing- og Tailwind-pakke.
- God dokumentation (Nextra, guides) og omfattende komponentdækning i `ui-core`.
- Konsekvent brug af `class-variance-authority` og Tailwind-tokens giver enkel theming.

## Fund og risici
- `packages/ui-core/package.json`: eksport-kortet mangler størstedelen af komponenterne (fx `icon`, `progress`, `table`, `toast`, `tooltip`, `accordion`, `skeleton`). Subpath-importer, som README lover, vil fejle for disse, og tree-shaking bliver dårligere når alt skal tages via root-entréen.
- `packages/ui-marketing/package.json`: samme problem – `gallery` og `logo-wall` eksporteres ikke, selv om de findes og nævnes i README. Importer som `@nostromo/ui-marketing/gallery` virker derfor ikke.
- `packages/ui-core/src/components/table.tsx:145`: komponenten tilbyder `sortColumn`/`sortDirection`-props men ignorerer dem fuldstændigt og holder intern sorterings-state. Ekstern kontrolleret sortering kan derfor ikke implementeres, og UI’et kan vise en anden sortering end data-kilden tror.
- `packages/ui-core/src/components/toast.tsx:130`: alle toasts renderes med `position`-klasser på selve toasten + containeren er `fixed inset-0`. Ved flere toasts på samme position overlapper de oven i hinanden i stedet for at stacke.
- `packages/ui-core/src/components/toast.tsx:95`: `addToast` sætter `setTimeout` uden cleanup; hvis provideren unmountes kan der kaldes `setState` efter unmount. Brug refs og cleanup på unmount.
- `packages/ui-core/src/lib/performance.ts:19`: `usePerformanceMonitor` måler tid mellem effekter (tid siden sidste render), ikke faktisk render-/commit-tid. Metri kken er misvisende og kan støje i konsol/logs.
- `packages/ui-tw/package.json`: `"sideEffects": false` samtidig med, at CSS-filer eksporteres som entrypoints (`base.css`, temaer). Webpack/Rollup kan tree-shake rene CSS-importer væk som “ubrugte”, så basestyles kan mangle hos forbrugere. Marker CSS-filer som side effects eller fjern flaget.
- `lint-output.txt`: 46 TypeScript-advarsler (primært `any`) i `ui-core` stories/tests og enkelte komponenter (`accordion`, `icon`, `table`, `tooltip`, `lazy`, `performance`). Forringer typesikkerheden og API-signalerne.

## Anbefalede næste skridt
1. Opdater eksport-kortene i `packages/ui-core/package.json` og `packages/ui-marketing/package.json`, så alle dokumenterede komponenter kan importeres som subpaths.
2. Gør `Table`’s sortering kontrollerbar: init state fra `sortColumn`/`sortDirection`, sync ved prop-ændringer, og lad intern state kun være fallback.
3. Tilføj stacking-logik til toasts (grupper per position + offset) og ryd tidsouts på unmount (`useRef` + `useEffect` cleanup).
4. Justér `usePerformanceMonitor` til at måle commit-tid korrekt (fx `useLayoutEffect` + `performance.mark/measure` eller React profiler) eller fjern hooken, hvis den ikke bruges.
5. Fjern `"sideEffects": false` eller angiv en eksplicit liste, så CSS-entrypoints ikke tree-shakes væk.
6. Ryd TypeScript-advarslerne og tilføj typer, især i komponentimplementeringerne (`table`, `tooltip`, `icon`) for bedre DX/API-signal.

## Teststatus
- Ikke kørt i denne gennemgang. Kør mindst `pnpm lint` og `pnpm test` i monorepoet efter ovenstående ændringer.
