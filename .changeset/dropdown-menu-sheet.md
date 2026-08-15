---
"@jarllyng/nostromo": minor
---

Add `DropdownMenu` and `Sheet`.

**`DropdownMenu`** — the menu that hangs off a button: row actions, account
menus, overflow. Items, checkbox items, radio groups, labels, separators,
shortcuts and submenus. `destructive` and `inset` on `DropdownMenuItem`. Radix
owns roving focus, typeahead, submenu timing and pointer-versus-keyboard intent.

`Select` is the neighbouring component and a different thing: it edits a form
value and has a selected state. A dropdown menu runs commands.

Portalled by default, because an un-portalled menu is clipped by any ancestor
with `overflow: hidden` — in practice every card and table it gets used in.

**`Sheet`** — a dialog anchored to an edge, for mobile navigation, filter drawers
and detail panes. `side` takes `top`, `right`, `bottom` or `left`; right is the
default.

Built on `@radix-ui/react-dialog` rather than on this package's own `Dialog`.
They are the same primitive underneath, but ours is hand-rolled around a centred
box, and bending it into an edge-anchored panel would mean two layout modes in
one component and a `variant` that quietly changes what every other prop means.

`SheetTitle` is the dialog's accessible name and is not decorative — without one,
Radix warns and axe reports `aria-dialog-name`. When the design has no room for a
heading, `<SheetTitle srOnly>` keeps the name for assistive technology and
removes it visually.

Both ship with the enter and exit animations added in 3.5.0, so they actually
animate rather than carrying inert class names.
