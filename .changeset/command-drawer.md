---
"@jarllyng/nostromo": minor
---

Two components: Command and Drawer. That closes the shadcn gap apart from
Sidebar.

**Command** wraps [cmdk](https://cmdk.paco.me/): a searchable list of things to
do, as a panel or as a `CommandDialog` palette.

It is deliberately not a filtered `DropdownMenu`. A menu is `role="menu"` with
items you activate and no typing; this is a combobox over a listbox, which is what
a screen reader needs in order to describe a list that narrows as you type.
Filtering a menu leaves a screen reader announcing a menu whose contents change
underneath it.

Two things about it are worth knowing before you use it. Filtering is a fuzzy
score, not a substring match, so `nf` finds "New file" and the best match sorts
first; and `shouldFilter={false}` is what you want when the results arrive from a
server already filtered, or they get filtered twice.

`CommandSeparator` is `aria-hidden`. A `listbox` may only contain `option` and
`group` children, and cmdk gives its separator `role="separator"`, which makes the
_list_ an `aria-required-children` violation - so the axe failure points at the
wrong element. `role` cannot be overridden, because cmdk writes it after the prop
spread. The line is decoration anyway; the group headings convey the split.

**Drawer** wraps [vaul](https://vaul.emilkowal.ski/): a panel that slides in from
an edge and can be dragged shut, with snap points and a grabber.

`Sheet` already existed and looks the same, so the docs page leads with the
choice. `Sheet` is a dialog anchored to an edge and nothing more, which is the
right thing on a desktop-first surface. `Drawer` adds the touch model, and costs
the dependency. If you would not use the drag, use `Sheet`.

The grabber is vaul's own `Handle`, not a decorative div: it carries a hit area
larger than the bar you see, and it is `aria-hidden` because dragging is not the
only way out. It is drawn for a drawer from the top or bottom and hidden for one
from the side, where a horizontal bar would suggest the wrong direction.

One difference from `Sheet` worth stating: vaul does not set `aria-modal`. It
aria-hides the rest of the page instead, which confines a screen reader the same
way. Both are valid, and a test pins it so it cannot become neither.

`DialogContent` takes a new `showCloseButton` prop, default `true`, so nothing
changes unless you pass it. `CommandDialog` needs it: the corner close button is
absolutely positioned at the top right, which is exactly where a command palette
puts its search field.
