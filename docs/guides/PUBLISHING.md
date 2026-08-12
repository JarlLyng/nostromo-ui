# Publishing Guide

This guide explains how to publish Nostromo UI packages to npm.

## Prerequisites

1. **npm scope**: Ensure you can publish under the `@jarllyng` scope on npm
2. **2FA**: Enable two-factor authentication on your npm account
3. **NPM_TOKEN**: Create an npm access token with publish permissions (or use Trusted Publishing - recommended)
4. **GitHub Secret**: Add `NPM_TOKEN` as a secret in GitHub repository settings
5. **RELEASE_PAT**: Add a fine-grained personal access token as a secret - see below

### Why RELEASE_PAT is required

`main` requires status checks to pass before merging. GitHub deliberately does
not fire workflows for events caused by `GITHUB_TOKEN`, so a release PR opened
with it never gets a CI run - and a PR with no CI run can never satisfy a
required check. The release PR would sit unmergeable forever.

A PAT acts as an ordinary user, so its PR triggers CI normally.

Create it at **Settings → Developer settings → Personal access tokens →
Fine-grained tokens**, scoped to this repository only, with:

| Permission    | Access         |
| ------------- | -------------- |
| Contents      | Read and write |
| Pull requests | Read and write |
| Workflows     | Read and write |

Then add it as the repository secret `RELEASE_PAT`. `publish.yml` falls back to
`GITHUB_TOKEN` when the secret is absent, so the workflow still runs without it -
it just cannot produce a mergeable release PR.

Fine-grained tokens expire. When releases start failing with a 403 on the PR
creation call, an expired `RELEASE_PAT` is the first thing to check.

### Option 1: Trusted Publishing (Recommended for CI/CD)

Trusted Publishing is the most secure method for automated publishing from GitHub
Actions: npm trusts this repository's workflow directly, so no long-lived token
is involved.

Where the setting lives depends on whether `@jarllyng` is an npm organization or
a personal scope:

- **Organization**: https://www.npmjs.com/org/jarllyng → "Automation" or
  "Trusted Publishers"
- **Personal scope**: it is configured per package, so the package has to exist
  before you can set it up - publish once with a token first, then switch

If you can reach the setting:

1. Click "Add Trusted Publisher"
2. Select "GitHub Actions"
3. Enter:
   - **Organization or user**: `JarlLyng` - **type the casing exactly**. npm
     compares case-sensitively and shows back whatever was entered, so a
     lowercased owner produces a config that looks right and never matches. This
     is what blocked 3.1.1.
   - **Repository**: `nostromo-ui`
   - **Workflow filename**: `publish.yml` (just the filename, not the full path)
   - **Environment name**: leave empty. If you set one, the job in `publish.yml`
     must declare a matching `environment:`.
4. Under **Allowed actions**, tick **`Allow npm publish`** only. `npm stage
publish` is npm's staging flow, which this project does not use.
5. Click "Set up connection"

3.1.1 was the first release published this way, so anything from 3.1.1 onwards
carries `dist.attestations` from a real OIDC exchange.

**Benefits:**

- No token management needed
- More secure (no long-lived tokens)
- No 2FA warnings
- Automatically scoped to your repository

**The client side has to support it too, and this bit is easy to miss.** Setting
up the Trusted Publisher on npm.com does nothing on its own - the publishing
client has to perform the OIDC exchange, and only recent versions can:

- **npm** needs 11.5.1 or newer. Node 20 bundles npm 10.9, so `publish.yml`
  installs `npm@latest` explicitly.
- **pnpm** needs 10.12 or newer. This workspace is pinned to 9.15.9, which is why
  `pnpm release` publishes via `scripts/publish-package.mjs` (npm) instead of
  `changeset publish` (which would pick pnpm).

With too old a client there is no error - the exchange simply never happens and
npm falls back to `NPM_TOKEN`. Every release before 3.1.1 went out this way, so a
successful release is not evidence that Trusted Publishing is working. The check
that actually distinguishes them: delete the `NPM_TOKEN` secret and release. If
it still publishes, the OIDC path is live. Provenance attestations do **not**
distinguish them - `--provenance` attaches those on the token path too.

**If Trusted Publishing is not available**, use Option 2 below.

### Option 2: Granular Access Token (Alternative)

If you prefer using a token instead:

1. Go to https://www.npmjs.com/settings/~/tokens (or your account menu → "Access
   Tokens")
2. Click "Generate New Token" → "Granular Access Token"
3. Configure:
   - **Token name**: `nostromo-ui-github-actions`
   - **Expiration**: 90 days or longer - note that publishing breaks silently
     when it lapses
   - **Packages and scopes**: "Read and write", limited to the `@jarllyng` scope
   - **Organizations**: "Read and write", only if `@jarllyng` is an npm
     organization rather than a personal scope
4. Generate the token and copy it
5. Add it as the `NPM_TOKEN` secret in GitHub

Because the token publishes from CI, generate it as an automation token so npm
does not demand a 2FA prompt no one is there to answer.

## Publishing Workflow

### Automated Publishing (Recommended)

`publish.yml` runs on pushes to `main` that touch `.changeset/**/*.md`,
`packages/**/package.json` or the workflow itself. What it does depends on
whether any changesets are pending:

1. **Create a changeset**: `pnpm changeset`, pick the bump, describe the change
2. **Merge it to main**: the workflow runs `changeset version`, which applies the
   bump, writes `CHANGELOG.md` and deletes the changeset file. It commits that to
   a `changeset-release/main` branch and opens a **"chore: version packages"** PR
3. **Merge that PR**: with no changesets left, the next run calls `pnpm release`,
   which publishes to npm; `changesets/action` then creates the git tag and
   GitHub release

Step 3 is the point of no return - merging the version PR is what publishes.
Nothing before it touches npm.

Two things that make this stall rather than fail loudly:

- The release PR must be authored by `RELEASE_PAT`, not `GITHUB_TOKEN`, or it
  never gets a CI run and can never satisfy `main`'s required checks. See
  [Why RELEASE_PAT is required](#why-release_pat-is-required).
- GitHub has to be allowed to open PRs at all: **Settings → Actions → General →
  Workflow permissions → "Allow GitHub Actions to create and approve pull
  requests"**. Without it the run dies after the branch has already been pushed,
  complaining that Actions is not permitted to create pull requests.

### Manual Publishing

There is one publishable package, so no workspace dependency rewriting is needed -
the only `workspace:*` consumer is the docs site, which is private and never
published.

```bash
# Apply pending changesets: bumps the version, writes CHANGELOG.md,
# and deletes the consumed changeset files
pnpm changeset version

# Publish. prepublishOnly runs type-check, lint, tests and build first,
# so a broken tree cannot reach npm
pnpm release

# pnpm release creates the tag but does not push it
git push --follow-tags
```

Tags are `@jarllyng/nostromo@<version>` - the format changesets uses for a
workspace. The older `v3.1.0` tag predates this and was made by hand.

Run this from a clean checkout of `main`. `pnpm release` skips versions already on
the registry, so it is safe to re-run if the network drops partway.

## Package Configuration

`packages/nostromo` is the only publishable package. It sets:

- `publishConfig.access: "public"` - scoped packages default to restricted, which
  fails the publish on a free account
- `prepublishOnly` - runs type-check, lint, tests and build
- `exports` - per-component entry points for ESM/CJS, plus the CSS entries
- `files: ["dist"]` - nothing else ships
- `sideEffects` - lists the CSS so bundlers do not tree-shake it away

Adding a component means adding its `exports` entry too. `pnpm validate:exports`
checks that the map matches what is actually in `src/components`.

## Verification

After publishing, check the package is on the registry and that the entry points
resolve:

```bash
npm view @jarllyng/nostromo version
npm view @jarllyng/nostromo exports
```

The CSS entry points matter as much as the JS ones - `tailwind.css`, `tokens.css`
and `themes/*.css` are what consumers import, and they are copied into `dist/`
by a tsup plugin rather than emitted by the bundler, so a build change can drop
them without failing.

## Troubleshooting

### "Package not found" after publishing

- Wait a few minutes for npm registry propagation
- Check npm organization permissions
- Verify `publishConfig.access: "public"` is set

### The release PR never appears

- Check the run log. If it ends by complaining that Actions is not permitted to
  create pull requests, the branch was pushed but the PR was not. Enable the
  setting under Settings → Actions → General, or open the PR by hand from the
  `changeset-release/main` branch
- If the workflow did not run at all, the push probably did not touch any of its
  trigger paths. `gh workflow run publish.yml` dispatches it manually

### The release PR exists but cannot be merged

- Required checks show as pending and never start: the PR was authored by
  `GITHUB_TOKEN`, which does not trigger workflows. Add `RELEASE_PAT` and let the
  workflow recreate the PR
- "This branch is out-of-date with the base branch": `main` requires branches to
  be current. Use "Update branch" and let the checks re-run

### `Could not find task` from turbo

The root `package.json` script exists but the task is not declared in
`turbo.json`. Both files need the entry.

### `ENEEDAUTH` with no NPM_TOKEN set

The Trusted Publishing exchange was refused. npm gives no reason at the default
loglevel - every failure path in `npm/lib/utils/oidc.js` is
`log.verbose('oidc', ...)` followed by `return undefined`, so a rejected exchange
is indistinguishable from no exchange at all, and you get a bare "This command
requires you to be logged in". `scripts/publish-package.mjs` passes
`--loglevel verbose` for exactly this reason. Look for:

```
npm http fetch POST 404 https://registry.npmjs.org/-/npm/v1/oidc/token/exchange/package/@jarllyng%2fnostromo
npm verbose oidc Failed token exchange request with body message: OIDC token exchange error - package not found
```

**"package not found" does not mean the package is missing, and it does not mean
no Trusted Publisher is configured.** The exchange endpoint is per-package, and
the registry answers this whenever it cannot match the run to a publisher config.
It names neither what it received nor what it expected, so a config that looks
right cannot be checked by inspection.

The `Show the OIDC identity npm is asked to trust` step prints the claims GitHub
actually mints. The Trusted Publisher must agree with those exactly:

```
repository             JarlLyng/nostromo-ui
repository_owner       JarlLyng
workflow_ref           JarlLyng/nostromo-ui/.github/workflows/publish.yml@refs/heads/main
environment            (not set)
```

**What it was, the one time this happened here: owner casing.** The Trusted
Publisher had been entered as `jarllyng/nostromo-ui`. npm compares
case-sensitively, GitHub mints the canonical `JarlLyng`, and the settings page
displays what was typed - so the config looked correct and never matched.
Deleting the entry and re-adding it with `JarlLyng` fixed it, and the proof is
the same endpoint answering `201` instead of `404`:

```
npm http fetch POST 201 https://registry.npmjs.org/-/npm/v1/oidc/token/exchange/package/@jarllyng%2fnostromo
npm verbose oidc Successfully retrieved and set token
```

Other causes reported for this same error, worth checking in this order:

- **Environment mismatch.** If the publisher sets an Environment name, the job
  must declare a matching `environment:`; if the job declares none, the publisher
  field must be empty. ([npm/cli#8678](https://github.com/npm/cli/issues/8678))
- **`registry-url` on `actions/setup-node`.** Covered above - it writes a
  placeholder token that npm prefers over OIDC.
  ([npm/cli#8730](https://github.com/npm/cli/issues/8730),
  [actions/setup-node#1477](https://github.com/actions/setup-node/pull/1477))
- **`contents: read` in `permissions`.** Narrows the job token even when repo
  settings allow writing, and breaks tagging after the publish.
  ([npm/cli#8678](https://github.com/npm/cli/issues/8678))
- **Provenance on a private repo.** npm refuses, and the real 422 is usually
  masked. Not applicable here - the repo is public.
  ([npm/cli#8976](https://github.com/npm/cli/issues/8976))

**Not a cause: the `git+` prefix on `repository.url`.**
[npm/cli#8976](https://github.com/npm/cli/issues/8976) suggests stripping it. It
was stripped here and the exchange still failed; and the registry stored
`git+https://github.com/JarlLyng/nostromo-ui.git` for 3.1.1 regardless, because
npm normalizes the field on publish. The prefix cannot influence matching when
npm puts it back itself.

### Authentication errors

- Ensure the `NPM_TOKEN` secret is set and has not expired
- Verify the token covers the `@jarllyng` scope with read-and-write
- Use an automation token; an interactive one will block on a 2FA prompt in CI

### `E404 Not Found - PUT .../@jarllyng%2fnostromo`

Almost never a missing package. npm answers 404 rather than 403 when a token
authenticates but is not allowed to write the package, so the error names the
wrong problem - this is what stalled 3.1.1. The token is read-only, or scoped to
packages that do not include this one. Open it at
https://www.npmjs.com/settings/~/tokens and set **Permissions** to
**Read and write** for the `@jarllyng` scope.

The `Verify npm credentials` step now checks this up front with
`npm access list packages @jarllyng`, so the log should say so before the publish
is attempted.

Two other settings can produce the same 404:

- The package's **Settings → Publishing access** on npm.com. If it is set to
  require 2FA and disallow tokens, no token can publish; it must permit
  "granular access tokens with bypass 2FA enabled".
- A token created before the package existed and limited to _selected packages_
  rather than the whole scope - there was nothing to select at the time.
