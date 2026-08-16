---
"@jarllyng/nostromo": minor
---

Add `Slider`, `Menubar` and `NavigationMenu`.

**`Slider`** picks a value by dragging: volume, price, opacity. One thumb is
rendered per entry in `value`, so a range slider is the same component with two
numbers rather than a separate one. `thumbLabel` takes a string or an array, so a
range announces "Minimum" and "Maximum" instead of "slider" twice.

**`Menubar`** is the application menu bar. Its own component rather than a row of
`DropdownMenu`s, because the bar behaves as one control: once a menu is open,
moving the pointer to a neighbouring trigger switches to it without a click, and
the arrow keys move between menus as well as within them. It is the third
component reading from the shared menu styling, after `DropdownMenu` and
`ContextMenu`, so all three cannot drift apart.

**`NavigationMenu`** is site navigation with panels. Not a menu despite the name:
a `DropdownMenu` runs commands and uses menu roles, while this is a `<nav>` full
of links and Radix keeps it that way. A screen reader user gets a navigation
landmark and a list of links rather than a menu they are expected to act on, and
a test asserts there is no `menu` role in it.
