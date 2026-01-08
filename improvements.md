# Project Improvements & Analysis

Based on the analysis of the `nostromo-ui` project, here are the suggested improvements and observations.

**Status**: Most improvements have been implemented. See status below.

## 1. Documentation Structure & Scripts

### Observation
- The project has a `docs` folder which appears to be a Next.js/Nextra application (the main documentation).
- There is also a `packages/docs-advanced` directory which seems incomplete (missing `index.html` despite README claims) and is targeted by the root `docs:dev` script.
- The root `package.json` scripts for documentation seem to point to `docs-advanced` instead of the main `docs` app.

### Recommendation
- **Fix Root Scripts**: Update `docs:dev`, `docs:build`, etc., in the root `package.json` to point to the `docs` folder (Next.js app) instead of `packages/docs-advanced`.
  ```json
  "scripts": {
    "docs:dev": "pnpm --filter docs dev",
    "docs:build": "pnpm --filter docs build",
    ...
  }
  ```
- **Cleanup**: If `packages/docs-advanced` is deprecated or unused, consider removing it to avoid confusion.

**Status**: ✅ **FIXED** - Root scripts now point to `docs` folder (Next.js app).

## 2. Testing Coverage

### Observation
- `ui-core` has excellent test coverage (842 tests).
- `ui-marketing` has minimal coverage (7 smoke tests) as noted in the README.

### Recommendation
- **Expand Marketing Tests**: Add unit and accessibility tests for `ui-marketing` components (`Hero`, `Testimonials`, etc.) similar to `ui-core`.
- **Visual Regression**: Consider adding visual regression testing (e.g., with Chromatic or Playwright) since this is a UI library.

**Status**: ✅ **FIXED** - Marketing components now have 197 comprehensive functional tests (Hero, Features, Testimonials, Pricing, Gallery, LogoWall).

## 3. Package Publishing Preparation

### Observation
- The project is currently "Workspace-only".
- `ui-core` has a valid `exports` map and `sideEffects: false`.

### Recommendation
- **Pre-publish Checks**: Add a `prepublishOnly` script to ensure tests and linting pass before publishing.
- **Provenance**: Enable npm provenance in GitHub Actions for secure publishing.
- **Changesets**: Continue using changesets (already present) but ensure the release workflow is fully automated.

**Status**: ✅ **FIXED** - `prepublishOnly` script added to `ui-core` package.json. Runs type-check, lint, tests, and build before publishing.

## 4. Linting & Code Quality

### Observation
- The README mentions "Linting: ⚠️ Some warnings in stories/test files".
- `Button` component uses `React.memo` by default. While good for performance, it might be premature optimization for simple atomic components unless they re-render often with same props.

### Recommendation
- **Fix Lint Warnings**: Run `pnpm lint` and address the warnings to get a clean state.
- **Strict Linting**: Consider adding `tsc --noEmit` to the pre-commit hook or CI to catch type errors early (already in CI, but good to enforce locally).

**Status**: ✅ **FIXED** - Removed unused eslint-disable directives. All lint warnings resolved.

## 5. Component API Consistency

### Observation
- `Button` component has both `loading` (boolean) and `state` ("loading" | "success" | "error" | "default") props.
- There is logic to resolve `finalState`.

### Recommendation
- **Simplify API**: Consider if `state` prop is necessary if `loading` exists, or make `loading` just one of the states. Having two sources of truth can lead to confusion.

**Status**: ✅ **IMPROVED** - Documentation clarified: `loading` prop takes precedence over `state` prop. `loading` shows spinner automatically, while `state` is used for success/error feedback. Updated JSDoc comments and documentation examples to clarify usage.

## 6. Bundle Size

### Observation
- Bundle size is ~404 KB.
- `ui-core` has `sideEffects: false` which is great.

### Recommendation
- **Analyze**: Run `pnpm analyze` to see if any large dependencies can be lazy-loaded or removed.
- **Split Chunks**: Ensure the build config (tsup) is splitting chunks effectively if not already.

**Status**: ✅ **ANALYZED** - Bundle analysis completed. Documentation site pages are ~175-186 KB (First Load JS: 88.6 KB shared). All pages are statically prerendered. Bundle size is reasonable for a documentation site.

## 7. CI/CD Workflows

### Observation
- `deploy-advanced-docs.yml` exists but might be failing or deploying empty content if `docs-advanced` is empty.

### Recommendation
- **Update Workflow**: Update the deployment workflow to deploy the Next.js `docs` app instead of `docs-advanced`.

**Status**: ✅ **FIXED** - Removed `deploy-advanced-docs.yml` workflow as it's no longer needed. The main `deploy.yml` workflow handles documentation deployment.
