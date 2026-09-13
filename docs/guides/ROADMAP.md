# Roadmap

What is done, what is next, and what is not planned.

This file used to describe a plan to reach 1.0.0 and publish to npm, with
"create the npm organization" as the next focus, while the package was several
major versions past that and installable from the registry. It also carried a
"Last reviewed July 2026" beside a "Next review February 2025", two
incompatible phase numberings, and counts of components and tests that no longer
matched the repository. Those claims are gone rather than corrected in place: a
roadmap that reports finished work as pending is worse than none, because it
sends you to look at the wrong thing.

The rule that replaces them: nothing here restates a number that is recorded
somewhere else. Versions, component counts and test counts move every release,
and a copy of them in this file is a copy that goes stale between one release
and the next. Where a canonical source exists, this links to it.

---

## Where the project is

Published on npm as [`@jarllyng/nostromo`](https://www.npmjs.com/package/@jarllyng/nostromo),
built and released from CI with npm provenance, so every version on the registry
is traceable to the commit and workflow that produced it.

|                                     |                                                                                                  |
| ----------------------------------- | ------------------------------------------------------------------------------------------------ |
| Current version and install size    | [npm](https://www.npmjs.com/package/@jarllyng/nostromo)                                          |
| What changed in each release        | [CHANGELOG.md](https://github.com/JarlLyng/nostromo-ui/blob/main/packages/nostromo/CHANGELOG.md) |
| Every component, with live examples | [the components index](https://jarllyng.github.io/nostromo-ui/components)                        |
| What currently passes               | [CI on main](https://github.com/JarlLyng/nostromo-ui/actions)                                    |

Shipped and not expected to change shape:

- Components covering the shadcn/ui surface, each with a documentation page and
  editable in-page examples.
- Four themes (Nostromo, Mother, LV-426, Sulaco), switchable at runtime through
  `[data-theme]` with a separate light and dark scheme. The token layer is
  bridged with Tailwind v4's `@theme inline`, which is what makes a theme change
  re-colour the page without rebuilding the stylesheet.
- CSS-first theming. There is no JavaScript preset and no `tailwind.config.js`
  to extend.
- Accessibility tests alongside the unit tests, and WCAG 2.1 AA contrast
  verified for every theme and scheme by `pnpm audit:contrast`.
- A browser suite in Chromium and WebKit for the things jsdom cannot answer:
  layout, the real cascade, pointer physics, `:focus-visible`, media queries.
- Releases through Changesets, published with OIDC trusted publishing.

---

## What is next

The backlog is the issue tracker, not this file. Anything here without a link is
an idea rather than a plan.

- [Performance benchmarks in CI](https://github.com/JarlLyng/nostromo-ui/issues/85).
  Bundle size is already enforced by size-limit; render performance is not
  measured at all.
- [A CLI for project setup](https://github.com/JarlLyng/nostromo-ui/issues/87).
- [Vue support](https://github.com/JarlLyng/nostromo-ui/issues/86). The largest
  of the three by some distance, and the one most likely to stay open: the
  themes and tokens port cleanly, the components do not.

[Open issues](https://github.com/JarlLyng/nostromo-ui/issues) is the current
list, and it is shorter than this file used to imply.

---

## Community feedback: not started

The repository has no external users. An earlier version of this file described
a completed beta with ten or more testers, twenty or more issues of feedback and
confirmed API stability. None of that happened.

Being published is the prerequisite, and that is now true. The rest is not:

- [ ] Confirm the documented setup works in a project nobody here wrote
- [ ] Any feedback from someone who did not write the library
- [ ] Decide whether the API is stable enough to ask people to build on

---

## Not planned

Listed because they were once listed as future work, and leaving them there
implies an intent that does not exist:

- A plugin system, theme marketplace or extension API.
- Enterprise tiers, priority support or SLAs. This is one person's library.
- React Native, Solid and Svelte ports. Vue is the only other framework with an
  issue, and even that is not committed.
- A rich text editor. Out of scope for a component library of this shape.

---

_Written against the repository rather than from memory. If something here
disagrees with the code, the code is right and this is a bug._
