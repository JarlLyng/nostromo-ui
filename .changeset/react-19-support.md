---
"@jarllyng/nostromo": minor
---

Support React 19, and stop blocking React 18.3

`peerDependencies` shipped as an exact pin - `react: "18.2.0"` - so `npm install`
failed outright with `ERESOLVE` for anyone not on that precise version. That
included React 18.3.1 and all of React 19, i.e. most of the ecosystem:

```
npm error Found: react@19.2.8
npm error Could not resolve dependency:
npm error peer react@"18.2.0" from @jarllyng/nostromo@3.0.0
```

The range is now `^18.2.0 || ^19.0.0`. Nothing in the code needed changing - the
Radix primitives underneath already support React 16.8 through 19, so the
restriction was entirely self-imposed.

Verified by installing the packed tarball into a clean project on React 18.2.0,
18.3.1 and 19.2.8 and server-rendering a cross-section of components: 11/11 render
on all three. That check now runs in CI, because the workspace pins React 18.2.0
via pnpm overrides and therefore cannot notice this class of problem on its own.
