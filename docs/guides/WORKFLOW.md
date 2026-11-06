# Development Workflow

How a change gets from a branch to a release in this repository. Publishing
itself, and what to do when a release stalls, is in
[PUBLISHING.md](PUBLISHING.md).

## Overview

Every change reaches `main` through a pull request, including documentation and
one-line fixes. `main` is protected: the required CI checks have to pass, and the
branch has to be up to date with `main`, before a pull request can merge. Changes
that users of the package will notice carry a changeset, and changesets are what
produce a release.

## Issue Management

Work is tracked in GitHub issues and in the **IAMJARL** project. Open issues from
the templates (bug report, feature request, documentation, support), which set
the title prefix and the label for the kind of work. Then:

1. Assign the issue to `@JarlLyng`.
2. Add it to the IAMJARL project, where new issues start in **Backlog**.
3. Add a priority label: `priority:high`, `priority:medium` or `priority:low`.

The project's statuses, in order, are **Backlog**, **To Do**, **In Progress**,
**On Hold** and **Done**. An issue moves to In Progress when work on it starts,
to On Hold when it is blocked or waiting for a decision, and to Done when the
pull request that resolves it has merged.

## Making a Change

1. Branch from an up-to-date `main`. Name the branch with the same prefix the
   commit will use, for example `fix/calendar-focus`, `feat/data-table` or
   `docs/workflow`.
2. Make the change, with tests. A new component also needs a docs page and an
   entry in that section's `_meta.ts`, and a changed one needs its docs page
   brought up to date.
3. Run what CI runs:

   ```bash
   pnpm lint
   pnpm type-check
   pnpm test:run
   pnpm build
   ```

   For a component change, run the accessibility suite as well:

   ```bash
   pnpm --filter @jarllyng/nostromo test:a11y
   ```

4. Add a changeset if users will notice the change (see below).
5. Open a pull request against `main`. The
   [pull request template](../../.github/pull_request_template.md) asks for a
   description and the issue it resolves.

## Changesets

A changeset is a short Markdown file in `.changeset/` that says how the next
version should change and what the changelog should say. Add one for anything a
user of the package would notice: a new component or prop, a bug fix, a changed
default, a raised minimum version of a dependency. Leave it out for
documentation, tests, CI and refactors that do not change behavior.

```bash
pnpm changeset
```

Pick `@jarllyng/nostromo` and the size of the change:

- **patch** for a fix, or anything else that leaves existing code working
- **minor** for new components, props and features
- **major** for anything that can break existing code. See
  [What counts as a breaking change](PUBLISHING.md#what-counts-as-a-breaking-change).

Then write the description for someone reading the changelog: what changed, and
what they may notice. It goes into `packages/nostromo/CHANGELOG.md` as written.

```markdown
---
"@jarllyng/nostromo": minor
---

Add a `DataTable` component with sorting, filtering and pagination.
```

## Releases

Versions, tags and GitHub releases come from the publish workflow, not from
anyone's machine.

1. When a pull request with a changeset merges, the workflow opens a pull request
   titled **"chore: version packages"**, or updates the one already open. It
   raises the version, writes the changelog and removes the changesets it used.
2. When that pull request merges, the workflow publishes to npm with provenance
   and creates the tag and GitHub release, both named
   `@jarllyng/nostromo@<version>`.

Merging the version pull request is the step that publishes. Nothing before it
touches npm, so several changes can collect in one release.

If the version pull request does not appear, or cannot merge,
[PUBLISHING.md](PUBLISHING.md#troubleshooting) lists the causes, including an
expired `RELEASE_PAT`, which stops the run at Checkout. It also covers publishing
by hand when the workflow is unavailable.

## Commit Messages

Commits follow [Conventional Commits](https://www.conventionalcommits.org/):
`feat`, `fix`, `docs`, `test`, `ci`, `refactor` and `chore`, with a scope where one
fits, such as `fix(calendar):` or `chore(deps):`. Pull requests are
squash-merged, so the pull request title becomes the commit on `main` and should
follow the same form.

## Roadmap

What is planned is in [ROADMAP.md](ROADMAP.md).
