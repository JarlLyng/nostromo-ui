---
"@jarllyng/nostromo": patch
---

Declare a license, and add the metadata npm needs

The published package had no `license` field, so npm showed **License: none** on
the package page. That is not cosmetic: compliance tooling blocks dependencies
without a declared license, so the library was effectively unusable inside any
company that checks. `LICENSE` existed in the repository root but npm only
auto-includes it from the package directory, so it never shipped either - it is
now copied into the package and appears in the tarball.

Also adds `repository` (with `directory`, so the monorepo path resolves),
`homepage`, `bugs`, `author` and `keywords` - the npm page had no link back to
the source or the docs, and the package was invisible in npm search.

The description said "A Tailwind CSS plugin and React component library". The
plugin was removed in the Tailwind v4 migration; theming is CSS-first now.
