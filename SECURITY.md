# Security Policy

## 🛡️ Supported versions

Security fixes go into the current release of `@jarllyng/nostromo` and are
published as a new version. There are no maintenance branches: the library is
one package released through Changesets, and a fix reaches you by upgrading.

| Version         | Supported          |
| --------------- | ------------------ |
| Current release | :white_check_mark: |
| Anything older  | :x:                |

The current release is whatever
[npm](https://www.npmjs.com/package/@jarllyng/nostromo) reports, so this file
does not carry a version number that would go stale between releases.

## 🚨 Reporting a vulnerability

**Please do not open a public issue for a security problem.**

Report it privately through GitHub:

1. Go to the repository's [Security tab](https://github.com/JarlLyng/nostromo-ui/security)
2. Click "Report a vulnerability"
3. Fill out the security advisory form

The report is visible only to the maintainers until an advisory is published,
and the thread stays private while a fix is prepared.

Include what you have: a description, steps to reproduce, the impact you think
it has, and a suggested fix if you have one. A partial report is worth sending.

### What to expect

This library is maintained by one person in their own time, so the honest
answer is that there is no response-time guarantee. What you can expect:

- An acknowledgement when the report is read, not within a fixed window
- A say in the timing of disclosure
- Credit in the published advisory, unless you would rather not be named

A stated deadline that is then missed is worse than no deadline, because it
stops you escalating elsewhere while you wait for it.

## 🔒 What this library does and does not protect against

A component library is a small part of an application's security surface. Being
specific about which part is more useful than a general assurance.

### What it does

- **No dynamic code execution.** The published bundle contains no `eval()` and
  no `new Function()`. Verified against `dist`, not asserted.
- **Published with provenance.** Releases are built and published from CI with
  npm's trusted publishing, so every version on the registry is traceable to the
  commit and workflow that produced it. `npm audit signatures` checks it.
- **Tree-shakeable.** Every component has its own entry point, so importing one
  does not pull the rest in. Less code shipped is less code to attack.
- **No network access.** The library issues no requests of its own. Verified:
  no `fetch` and no `XMLHttpRequest` anywhere in the components.

### One thing it does store

`Sidebar` writes a cookie so a server-rendered app can paint the right width on
the first request, which is the only reason the value is a cookie rather than
local storage:

```
sidebar_state=<true|false>; path=/; max-age=604800; SameSite=Lax
```

It holds a boolean, nothing identifying, and it is the only thing the library
persists. Two things worth knowing if you are writing a policy around it: it is
set without the `Secure` attribute, so it travels over plain HTTP if your site
is served that way, and `path=/` means it is sent with every request to the
origin. Neither matters for a collapse state, and neither is a reason to send it
anywhere it should not go.

### What it does not

- **Input validation.** The form components are controlled inputs. They carry
  your value and report changes; they do not validate, sanitise or escape
  anything. Validate on the server.
- **XSS.** React escapes interpolated values, and that protection is React's
  rather than this library's. It does not extend to `dangerouslySetInnerHTML`,
  to a `href` you build from user input, or to anything you pass through as raw
  HTML.
- **CSRF.** The library sends no requests, so it has no CSRF surface and no
  token to manage. That belongs to whatever does your fetching.

### Content Security Policy

No `eval()` or `new Function()`, so a strict `script-src` is fine.

`style-src` needs thought. Some components set inline styles, because the value
is computed at runtime and cannot be expressed as a class: a progress bar's
width, a panel's size after a drag, an aspect ratio. Under a strict `style-src`
without `'unsafe-inline'` or a nonce, those will not render correctly.
Everything else is class-based and unaffected.

At the time of writing that is `AspectRatio`, `Charts`, `ChartComposable`,
`Hero`, `Progress`, `Resizable`, `Sidebar`, `Skeleton`, `Toast` and `Tooltip`.
Rather than trust a list in a file to stay current, ask the source:

```bash
grep -rl "style={" packages/nostromo/src/components --include="*.tsx" \
  | grep -v __tests__
```

## 🛠️ What runs on every change

The tooling that actually runs, rather than a list of products:

- **CodeQL**, through GitHub's default setup, on JavaScript, TypeScript and the
  workflow files, weekly and on pull requests
- **Dependabot**, for the npm ecosystem and GitHub Actions, with a guard
  (`pnpm validate:dependabot`) that fails the build when a package is both
  pinned in `pnpm.overrides` and a direct dependency, a combination Dependabot
  cannot update without breaking the lockfile
- **size-limit** in CI, which fails the build when the bundle grows past budget
- **Unit, accessibility and browser tests**, with the published `dist` rather
  than `src` as the thing under test in the smoke and browser suites

## 📦 Installing safely

```bash
# Install the current version
pnpm add @jarllyng/nostromo

# Check the registry's own audit, and that the release came from this repo's CI
pnpm audit
npm audit signatures
```

## 🧑‍💻 For contributors

- Publishing uses npm Trusted Publishing over OIDC, and no `NPM_TOKEN` is
  configured, so there is no registry credential in the repository to leak. The
  workflow keeps a token path for the case where OIDC is unavailable; leaving
  the secret unset is what makes npm perform the OIDC exchange at all.
- One repository secret exists, `RELEASE_PAT`, so that the release PR is
  authored by a real user. GitHub deliberately does not run workflows on events
  raised by `GITHUB_TOKEN`, which is why it cannot be used there.
- Treat anything a component receives as untrusted, and do not interpolate it
  into HTML.
- A change that adds an inline style adds one to the CSP list above, so say so.

## 📞 Contact

Security reports go through
[GitHub Security Advisories](https://github.com/JarlLyng/nostromo-ui/security/advisories/new)
only.

For anything that is not a vulnerability, use
[Discussions](https://github.com/JarlLyng/nostromo-ui/discussions).
