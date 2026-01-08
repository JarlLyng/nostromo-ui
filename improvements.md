# Project Review & Recommendations: Nostromo UI

After reviewing the `nostromo-ui` project, I have compiled a list of observations and recommendations. Overall, the project demonstrates a high level of quality, especially regarding accessibility and modern tooling standards.

## 🟢 Strengths

1.  **Accessibility First**: The explicit focus on accessibility (A11y) is excellent.
    - Utilization of `@radix-ui` primitives ensures a solid accessible foundation.
    - Integration of `axe-core` and `storybook-addon-a11y` in the testing pipeline is a best practice.
    - `CONTRIBUTING.md` explicitly mentions WCAG 2.1 AA standards.
2.  **Modern Tooling**:
    - **Monorepo**: Using `pnpm` workspaces with `turbo` is the current gold standard for strict and fast monorepo management.
    - **Testing**: `vitest` is significantly faster than Jest and integrates well with the Vite ecosystem.
    - **Component Dev**: `Storybook` is correctly set up for component isolation.
3.  **Documentation**:
    - `CONTRIBUTING.md` is thorough and clear, setting good expectations for contributors.
    - Clear branching and versioning strategies.

## 🟡 Areas for Improvement

### 1. Dependency Management (Clean Up)

The root `package.json` contains dependencies that appear to be misplaced or duplicated.

- **Issue**: `dependencies` in the root `package.json` includes libraries that should likely be `devDependencies` (e.g., `chai`, `vitest`, `@changesets/cli`) or are dependencies of specific packages (e.g., `@radix-ui/*`, `@floating-ui/*`).
- **Recommendation**:
  - Move build/test tools (`vitest`, `chai`, `eslint`, etc.) to `devDependencies`.
  - Remove package-specific runtime dependencies (like `@radix-ui`) from the root unless they are truly shared across **all** workspace packages and you are using hoisting intentionally (which makes strict boundary checks harder). Ideally, each package in `packages/*` should declare its own dependencies.
  - **Why**: This improves the correctness of the dependency graph and ensures that `pnpm`'s strict mode can catch missing peer dependencies or phantom dependencies.

**Status**: ✅ **FIXED** - All test/build tools moved to `devDependencies`. Removed package-specific runtime dependencies (`@radix-ui/*`, `@floating-ui/*`) from root as they are already declared in `ui-core` package.

### 2. Pre-commit Hooks (Husky)

I did not observe a `.husky` directory or a `prepare` script in `package.json`.

- **Recommendation**: Install `husky` and `lint-staged`.
- **Why**: To enforce the quality standards (Linting, Testing, Commit Message format) automatically before code is committed. This prevents bad code from entering the repo and reduces CI failures.

```bash
pnpm add -D husky lint-staged
npx husky init
```

**Status**: ✅ **FIXED** - Installed `husky` and `lint-staged`. Configured pre-commit hook to run lint-staged. Added `prepare` script to automatically set up husky on install. Lint-staged configured to run ESLint and Prettier on staged files.

### 3. Tailwind CSS v4 Transition

You are using `@tailwindcss/vite` ^4.1.18, which indicates you are on the bleeding edge using Tailwind v4 (beta/alpha or early release).

- **Recommendation**: Ensure that `packages/ui-tw` is fully compatible with v4. Tailwind v4 brings significant changes to the engine. Verify that the `peerDependencies` in `ui-tw` (`tailwindcss: ^3.0.0 || ^4.0.0`) are actually compatible with the code shipped in that package, as plugins and configuration formats have changed.

**Status**: ✅ **VERIFIED** - Created verification script (`pnpm verify:tailwind-v4`) to check Tailwind v4 compatibility. Preset uses v3/v4 compatible syntax (`<alpha-value>` placeholder, Config type, plugins array). `ui-core` uses Tailwind v4.1.18 and `@tailwindcss/vite` v4.1.18. Builds and tests pass successfully. Preset is compatible with both Tailwind v3 and v4.

### 4. Component Exports Strategy

In `packages/ui-core/package.json`, there is a very long list of manual `exports`.

- **Recommendation**: While explicit exports are good for tree-shaking and API surface control, they are error-prone to maintain manually.
  - Consider automated generation of these exports during the build step or using a wildcard export `"./*": "./dist/*.js"` if your build output structure supports it and you want to expose everything.
  - Alternatively, write a small script to validate that all files in `dist/components` are exported in `package.json` to prevent "missing export" bugs.

**Status**: ✅ **FIXED** - Created validation script (`pnpm validate:exports`) to check that all component files in `src/components` are exported in `package.json`. Script compares source files with exports map and reports missing or extra exports. Fixed 3 missing exports (calendar, charts, data-table). Can be run manually or integrated into CI/CD pipeline to prevent "missing export" bugs.

### 5. Consolidated Configuration

- **ESLint**: You have `eslint` config in root and in packages. Ensure you are using a shared config (e.g., `@nostromo/eslint-config` workspace package) to avoid duplicating rules and ensure consistency across the monorepo.
- **TSConfig**: You have `tsconfig.base.json`, which is good. Ensure all packages extend it.

**Status**: ⚠️ **PARTIALLY ADDRESSED** - TSConfig is properly shared via `tsconfig.base.json` (all packages extend it). ESLint configs are duplicated across packages (`ui-core`, `ui-marketing`, `ui-tw`). Each package has similar but slightly different configs. Consider creating a shared `@nostromo/eslint-config` workspace package in the future to reduce duplication, but current setup works well for now.

## 🚀 Summary

The project is in very good shape. The foundation is solid. The recommendations above are mostly "housekeeping" items to ensure scalability and maintainability as the project grows.

**Immediate Next Step suggestion**: Clean up the root `package.json` to separate `dependencies` from `devDependencies`.
