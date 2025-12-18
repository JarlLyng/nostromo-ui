# Project Review – Nostromo UI

## Snapshot (facts, not claims)
- Tests in repo: 59 Vitest files in `packages/ui-core/src/components/__tests__`; 0 tests in `packages/ui-marketing`. No coverage reports checked in.
- Lint status: `pnpm lint` produces 46 warnings (see `lint-output.txt`), including missing hook deps in `packages/ui-core/src/components/toast.tsx` and many `any` types across stories, table, tooltip, and helper libs.
- Documentation/files repeatedly assert “842 tests”, “WCAG AA across all components”, “completed performance audit”, and future-dated milestones (e.g. October 2025 in `docs/guides/ROADMAP.md`) that are not evidenced in the repo.
- Packages are referenced as published (`pnpm add @nostromo/...`), but there is no publish config or npm metadata beyond workspace versions; installation paths in `README.md` use `@nostromo/ui-tw/styles/base.css`, which does not exist (actual export is `@nostromo/ui-tw/base.css`).

## Key risks & gaps
1) **Overstated status** – README, `PROJECT_REVIEW.md`, `docs/guides/ROADMAP.md`, and `docs/guides/DEVELOPMENT.md` market full WCAG AA compliance, 842+ tests, and completed audits that are not supported by the codebase or CI logs. This erodes trust and makes it hard to plan real work.  
2) **Documentation drift** – The API reference in `docs/pages/api-reference.mdx` covers only a subset of props and diverges from actual components (e.g. `Button` lacks `state`, `size` options, etc.). The Markdown API reference (`docs/guides/API_REFERENCE.md`) is also inflated and includes props/features not present in code.  
3) **Testing coverage** – Marketing components have zero tests; core has only unit/a11y smoke coverage and no coverage reporting. Claims of broad accessibility testing and 338+ a11y cases are unverified.  
4) **Bundle size concerns** – `packages/ui-core/src/components/icon.tsx` imports ~170 Phosphor icons eagerly into a static map, guaranteeing all icons are bundled even when unused. Charts rely on `recharts` without lazy loading, which can bloat consumers and break SSR if not dynamically imported.  
5) **CI leniency** – `.github/workflows/ci.yml` allows lint warnings and continues on error for accessibility checks. This conflicts with “production ready” messaging and lets regressions ship.  
6) **Doc site accuracy** – `docs/pages/index.mdx` and component pages promise Storybook coverage for all components and live embeds, but Storybook is only configured for core. If the hosted Storybook is stale/missing, embeds will show the fallback “Unavailable” state.  
7) **Distribution ambiguity** – No publish process or registry is documented. Install snippets assume npm, but the repo is private and lacks `publishConfig`. Consumers cannot rely on versioned artifacts.

## Documentation review
- Consolidate and de-duplicate: `PROJECT_REVIEW.md`, `README.md`, and `docs/guides/ROADMAP.md` repeat the same marketing copy with differing numbers. Replace with a single, factual status table (tests per package, lint status, CI status, release status).
- Fix incorrect paths and instructions: `README.md` should import `@nostromo/ui-tw/base.css` (not `styles/base.css`). Clarify that packages are workspace-only until published.
- API references should be regenerated from source types or pared back to what exists. Example misalignments: `Button` supports `state` and `loadingText`; `Input` supports `helperText`/`label`; marketing components are missing entirely from `docs/pages/api-reference.mdx`.
- Roadmap timelines in `docs/guides/ROADMAP.md` (Beta Oct 2025, Phase 2.6 complete, etc.) are future-dated and unverifiable. Replace with current quarter milestones and real checkboxes.

## Codebase review (robustness & maintainability)
- **Icon component** (`packages/ui-core/src/components/icon.tsx`): Massive static import map pulls the entire Phosphor bundle. Recommend tree-shaking by importing icons on demand (`lazy` + `Suspense` or a small curated set) or exposing a passthrough to let consumers bring their own icons.
- **Charts** (`packages/ui-core/src/components/charts.tsx`): Uses `recharts` synchronously. For Next/SSR, wrap in `dynamic(() => import('./charts'), { ssr: false })` or guard for `window` to avoid hydration errors. Consider optional lazy loading to cut bundle weight for consumers not using charts.
- **Toast** (`packages/ui-core/src/components/toast.tsx`): Lint warns about missing `removeToast` in `useCallback` deps. Fix to ensure timers clean up consistently and to align with CI strictness.
- **Table/DataTable**: Good feature surface, but pagination, filtering, and search are entirely client-side with no virtualization. Document limits (e.g., not suited for very large datasets) or add hooks for server-side pagination.
- **Theme package**: Tailwind preset and four CSS themes are present, but there are no regression tests for token output. Add snapshot tests for generated CSS or at least smoke tests that import each theme file.

## Testing & CI
- Enforce lint as an error: remove the “warnings allowed” logic in `.github/workflows/ci.yml` once warnings are cleared. Same for accessibility job (currently `continue-on-error: true`).
- Add marketing component tests (render + minimal a11y) to back the claims in docs. Even a handful of RTL snapshots would lift confidence.
- Produce a real test count/coverage badge in docs after running `pnpm test:coverage` in `packages/ui-core` (and similar for other packages once tests exist).

## Documentation site
- Component docs (`docs/pages/components/*.mdx`) rely on `StorybookEmbed`. Verify the hosted Storybook is updated from current stories or switch to local MDX-powered examples to avoid broken embeds.
- `docs/pages/api-reference.mdx` should be either autogenerated from TS types or removed in favor of `docs/guides/API_REFERENCE.md` after that file is corrected. Avoid maintaining two divergent API sources.
- Consider adding a brief “Release & Install” page clarifying current distribution (workspace-only vs npm), supported React/Next/Tailwind versions, and how to consume the CSS bundles (`@nostromo/ui-tw/base.css`, `@nostromo/ui-tw/themes/*`).

## Recommended next steps (ordered)
1) Rewrite README, ROADMAP, and API docs to remove inflated metrics and align with actual counts/paths. Add a single status table with real numbers (tests per package, lint warnings outstanding, CI gates).  
2) Resolve the 46 lint warnings and make lint/type-check/tests hard-fail in CI to match the “production ready” positioning.  
3) Add minimal test coverage for marketing components and theme CSS imports; publish real test counts/coverage in docs instead of placeholders.  
4) Refactor `Icon` to a tree-shakeable/lazy-loading strategy and gate `charts` usage behind dynamic import for SSR safety and bundle size control.  
5) Decide and document distribution: if npm publishing is planned, add `publishConfig`, tighten the export surface, and create a release checklist; if workspace-only, state that plainly in README and docs.
