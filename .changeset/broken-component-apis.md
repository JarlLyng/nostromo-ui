---
"@jarllyng/nostromo": minor
---

Fix four components that threw as soon as you followed their own documentation.

- **`RadioGroupItem` was never exported.** The component exists as `RadioItem`,
  but every example - and shadcn's convention - uses `RadioGroupItem`, so the
  RadioGroup page threw a ReferenceError. Exported under both names.
- **`useToast` was never re-exported.** It existed in `toast.tsx`; `index.ts`
  exported `useToastNotification` and not the hook the docs called for.
- **`DialogTrigger` did not exist at all.** `Dialog` was controlled-only and
  returned `null` while closed, so a trigger nested inside it was unmounted
  exactly when you needed to click it. `Dialog` now holds the open state on
  context and always renders its children; the overlay moved to `DialogContent`,
  which is the part that knows it is being shown. Works controlled (`open` +
  `onOpenChange`) as before, or uncontrolled via `defaultOpen` and a trigger.
- **`Breadcrumb` required an `items` array.** The sub-components
  (`BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, …) were exported from the
  start but unused by `Breadcrumb` itself, so the composable form every example
  showed threw on `items.map`. `items` is optional now and children render when it
  is absent; the data-driven form is unchanged.

`DialogContent` also gained `role="dialog"`, `aria-modal` and an `aria-labelledby`
wired to `DialogTitle`. Adding the role surfaced that the dialog had no accessible
name - axe's `aria-dialog-name` rule caught it immediately, which is why the role
is worth having.
