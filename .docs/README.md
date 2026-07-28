# Internal Documentation

Reference material for maintainers. Not part of the user-facing documentation in
`docs/`.

## Contents

- `SEMVER_STABILITY.md` - versioning policy and what counts as a breaking change

## Note

Anything in here that states a measurement will rot. Living numbers belong in the
tooling that produces them:

- **Bundle sizes** - `pnpm size` in `packages/nostromo`, with budgets enforced in
  CI by `size-limit`
- **Coverage** - `pnpm test:coverage`, with thresholds enforced in CI
- **What the published package actually does** - the consumer smoke test in
  `test-app/`

A `PERFORMANCE_AUDIT.md` and a `TAILWIND_STYLING_ISSUE.md` used to live here. Both
were removed: the audit quoted measurements against package names that no longer
exist, and the styling issue described a problem in the pre-merge `ui-tw` package
that the Tailwind v4 migration resolved.
