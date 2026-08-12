---
"@jarllyng/nostromo": minor
---

Ship `"use client"` directives, so the package can be imported from a React
Server Component.

Until now it could not be used in the Next.js App Router at all. Server
Components are the default there, and importing any component that uses hooks
failed the consumer's build outright:

```
You're importing a module that depends on `useState` into a React Server
Component module. This API is only available in Client Components.
```

The directive is added by a post-build step rather than written into the source
files, because neither of the obvious placements survives: esbuild strips
top-level directives from source, and tsup's `banner` option is removed by the
minifier - both confirmed by building and inspecting `dist`. It is applied to
every emitted module including the shared chunks, since the per-component entry
files are thin re-exports and marking only those would leave the actual component
code unmarked.

A consumer-side test now asserts the contract against the built package, so the
directive cannot go missing without a test failing.

One consequence worth knowing: this marks the whole bundle as a client boundary,
so `cn` from `./themes/utils` is client-bound too and cannot be called from a
server component. A dedicated server-safe entry point for the utilities would be
a separate change.
