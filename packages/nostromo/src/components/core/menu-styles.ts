/**
 * Class strings shared by `DropdownMenu` and `ContextMenu`.
 *
 * The two components wrap different Radix primitives, because a context menu
 * opens on right-click at the pointer and a dropdown opens from a trigger, and
 * Radix models those separately. But they are the same menu to look at, and a
 * user who learns one should recognise the other.
 *
 * These lived inside dropdown-menu.tsx. Copying them into context-menu.tsx
 * would have worked exactly until the first time someone adjusted the focus
 * colour in one file and not the other, which is the kind of drift nobody
 * notices in review and everybody notices on the page.
 */

export const menuSurface =
  "z-50 min-w-[8rem] overflow-hidden rounded-lg border border-border bg-background p-1 text-foreground shadow-lg " +
  "data-[state=open]:animate-in data-[state=closed]:animate-out " +
  "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 " +
  "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 " +
  "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 " +
  "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2";

export const menuItem =
  "relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none " +
  "transition-colors focus:bg-muted focus:text-foreground " +
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

/** Indent for items that sit beside checkbox or radio indicators. */
export const menuItemInset = "pl-8";

export const menuLabel =
  "px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground";

export const menuSeparator = "-mx-1 my-1 h-px bg-border";

export const menuShortcut =
  "ml-auto text-xs tracking-widest text-muted-foreground";

export const menuDestructive =
  "text-destructive focus:bg-destructive/10 focus:text-destructive";
