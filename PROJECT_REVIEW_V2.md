# Projektreview (v2) – Nostromo UI

## Kort overblik
- Monorepo med tre biblioteker (`ui-core`, `ui-marketing`, `ui-tw`) og Nextra-baseret docs.
- React/TypeScript/Tailwind + Radix; tsup-bundling med ESM/CJS output; pnpm + Turborepo.
- Review fokuserer på API-overflade, DX, bundling og et par komponenter (table, toast, performance).

## Styrker
- Klar opdeling i core/marketing/theme-pakker; eksport via root `index.ts` for nem import.
- God dokumentation og arkitektur-guide; test-setup (Vitest + Testing Library + axe).
- Konsistent styling via `class-variance-authority` og CSS-variabler i `ui-tw`.

## Kritiske fund (blokere produktionsmodenhed)
- **Manglende subpath-eksporter**: `packages/ui-core/package.json` eksporterer kun et fåtal af komponenter (fx `button`, `badge`, …) og udelader mange dokumenterede moduler som `icon`, `progress`, `table`, `toast`, `tooltip`, `accordion`, `skeleton` m.fl. Importer som `@nostromo/ui-core/table` fejler, og tree-shaking forværres. Tilsvarende i `packages/ui-marketing/package.json` mangler `gallery` og `logo-wall`.  
- **`ui-tw` + `sideEffects`**: `packages/ui-tw/package.json` har `"sideEffects": false`, men pakken eksporterer CSS (`base.css`, temaer). Bundlere kan tree-shake CSS væk, så basestyles/temaer aldrig loader.
- **Kontrollerbar sortering mangler**: `packages/ui-core/src/components/table.tsx:145` ignorerer `sortColumn`/`sortDirection`-props og bruger kun intern state. Udefrakontrolleret sortering kan ikke implementeres og UI’et kan være “out of sync” med data-kilden.

## Høj prioritet
- **Toast stacking og cleanup**: `packages/ui-core/src/components/toast.tsx:95` sætter timeouts uden cleanup; på unmount kan der kaldes `setState` efter unmount. Alle toasts deler container (`fixed inset-0`) og får position-klasser på toasten selv, så flere toasts på samme position overlapper. Gruppér per position, tilføj offset/stack og ryd timeouts i `useEffect` cleanup (brug refs).
- **Performance-hook er misvisende**: `packages/ui-core/src/lib/performance.ts:19` måler tiden mellem effekt-cleanup og næste render (ikke real render/commit). Logger kan støje og give falsk signal; overvej at fjerne hooken eller måle med `performance.mark/measure` omkring render/commit eller React Profiler.
- **Lint-støj / typesikkerhed**: `lint-output.txt` viser 46 TS-advarsler (`any`) i stories/tests og enkelte komponenter (`table`, `tooltip`, `icon`, `accordion`, `lazy`, `performance`). Det slører reelle problemer og svækker DX.
- **Postinstall på root**: Root `package.json` kører `postinstall: turbo run build --filter=@nostromo/ui-tw`. Selv om repo er private, er det usædvanligt og kan bremse contributorer (og vil fejle uden Turborepo-cache). Overvej at fjerne eller gøre opt-in.
- **Platform-script i `ui-tw`**: Build-script bruger `cp` (Unix). På Windows vil `pnpm build` fejle. Brug `cpy`/`copyfiles`/Node fs for cross-platform support.

## Medium prioritet
- **Toast container pointer-events**: Container er `pointer-events-none`, men toasts er `pointer-events-auto`. Det virker, men kan give uventet fokus/scroll-issues; valider a11y/fokus-håndtering når stacking ændres.
- **`LazyComponent` fallback-typer**: `errorFallback` uses `error!` (non-null assertion). Små, men kan forbedres med bedre typer/null-checks.
- **Docs vs. kode**: README lover 27 core + 6 marketing komponenter og 4 temaer; sørg for at eksport-kort og pakke-output matcher dokumentation for at undgå brudte imports hos brugere.

## Anbefalede handlinger (prioriteret)
1. Udbyg eksport-kort i `ui-core` og `ui-marketing` så alle dokumenterede komponenter/temaer kan importeres via subpaths.
2. Marker CSS som side effects i `ui-tw` (fx `"sideEffects": ["./dist/*.css", "./dist/themes/*.css"]`) eller fjern `sideEffects:false`.
3. Gør `Table` sortering kontrollerbar: init state fra props, sync ved prop-ændringer, og brug intern fallback kun hvis props er `undefined`.
4. Refaktorer `ToastProvider`: track timeouts i refs med cleanup, grupper toasts per position og stack dem (fx CSS translate/spacing).
5. Gør build-scripts robuste: fjern root `postinstall`; erstat `cp` med cross-platform kopi i `ui-tw`.
6. Fjern lint-advarsler (`any` mv.) og strenggør typer i komponenter (`table`, `tooltip`, `icon`, `accordion`), så API-signal og DX styrkes.
7. Revider `usePerformanceMonitor`: enten gør metrikken meningsfuld eller fjern hooken for at undgå støj.

## Teststatus
- Ikke kørt her. Kør `pnpm lint` og `pnpm test` på monorepoet efter ovenstående rettelser.
