---
"@jarllyng/nostromo": minor
---

Add `Form`, tying `react-hook-form` to this library's `Label`, `HelperText` and
`ErrorMessage`.

Those three have always existed separately, and connecting them was left to the
caller: an id on the input, a matching `htmlFor`, an `aria-describedby` listing
the description and the error, and `aria-invalid` toggled by hand. Four things per
field, and the failure is silent - a form that looks correct and tells a screen
reader nothing. `FormField` generates one id per field and `FormControl` applies
the wiring to whatever it wraps.

`react-hook-form` is an **optional peer dependency**, and `Form` is **not
exported from the package barrel**. It is around 25kB and most consumers of a
component library do not want it forced on them. A bundler has to resolve every
import in a module before it can tree-shake anything, so a barrel that
re-exported this would fail to build for anyone without the peer installed, even
if all they wanted was `Button`. Import it from its own entry point:

```tsx
import { Form, FormField } from "@jarllyng/nostromo/components/core/form";
```

The `react-compat` CI job asserts `Form` stays out of the barrel, in a project
that installs only react, react-dom and the tarball. That turns the guarantee
from a property the job happened to have into one it checks.

`aria-describedby` lists the description **and** the message, because a field can
have guidance and an error at once. `FormMessage` renders nothing when there is
no error rather than an empty element that still occupies space. Nested names like
`address.city` find their error by walking the error object. `useFormField` throws
outside a `FormField`, because the quiet alternative is a label whose `htmlFor`
points at nothing.

Two things this surfaced, both fixed here.

**Every documented subpath import was wrong.** Thirty-six component pages tell you
`import { Button } from "@jarllyng/nostromo/button"`, and that path did not exist:
the only real one was `@jarllyng/nostromo/components/core/button`. A reader copying
the documented line got a module-not-found error. The short form is the nicer API
and the one the docs have promised all along, so it exists now - 52 aliases added,
and the long paths keep working.

**`RadioGroupItem` was only in the barrel.** `radio-group.tsx` exported
`RadioItem`, and the barrel aliased it, so `@jarllyng/nostromo` and
`@jarllyng/nostromo/radio-group` disagreed about the name of the same component
and the documented subpath import did not resolve. Both names are exported from
the file now.

Both were found by making the docs-import guard resolve each name against the
module it is imported from, rather than checking everything against the barrel.
`validate:exports` could not see either one: it checks that component files have
entries in the exports map, not that the paths the documentation advertises exist.
