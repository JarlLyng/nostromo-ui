---
"@jarllyng/nostromo": minor
---

Add `AlertDialog`, `Toggle`, `ToggleGroup` and `AspectRatio`.

**`AlertDialog`** interrupts to confirm something consequential. Not a `Dialog`
variant: it is announced as `role="alertdialog"`, clicking outside does nothing
so a confirmation cannot be lost by missing the button, and focus starts on
Cancel so a reflexive Enter cancels rather than deletes. Escape does close it,
which is correct rather than a gap, since a modal a keyboard user cannot leave is
a trap and cancelling is the safe outcome. `AlertDialogAction` defaults to the
destructive button, because most confirmations are.

**`Toggle`** is a button that stays pressed: bold in a toolbar, a filter chip, a
view mode. Distinct from `Switch`, which is a form control that belongs next to a
label. A toggle announces `aria-pressed` and lives in a toolbar.

**`ToggleGroup`** takes `type="single"` or `type="multiple"`. Its `variant` and
`size` reach items through context rather than by cloning children, so an item
keeps the group's styling when it is wrapped in your own markup, and can still
override either.

**`AspectRatio`** holds a box at a fixed ratio. It sets the CSS `aspect-ratio`
property and takes **no dependency**: `@radix-ui/react-aspect-ratio` exists for
the padding-bottom trick browsers needed before that property, and every browser
this library supports has had it for years. `Gallery` already relies on it
through Tailwind's `aspect-[3/4]`.
