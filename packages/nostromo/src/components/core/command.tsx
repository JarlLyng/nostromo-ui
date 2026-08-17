import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { MagnifyingGlass } from "phosphor-react";

import { cn } from "../../lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";

/**
 * A searchable list of things to do: a command palette, or the list inside a
 * combobox.
 *
 * Built on [cmdk](https://cmdk.paco.me/), which owns the filtering, the scoring
 * and the keyboard model.
 *
 * ## Not a DropdownMenu
 *
 * A `DropdownMenu` is a menu: `role="menu"`, items you activate, no typing. This
 * is a combobox over a listbox - the input is `role="combobox"` and the items are
 * `role="option"` - which is what a screen reader needs to hear when the list
 * narrows as you type. Filtering a menu would leave a screen reader announcing a
 * menu whose contents silently change underneath it.
 *
 * So: choosing from a short fixed set of commands is `DropdownMenu`; searching is
 * this.
 *
 * ## Filtering is cmdk's, and is not substring matching
 *
 * cmdk scores each item against the query with a fuzzy match, so "gh" finds
 * "GitHub" and the best match sorts first. Items are matched on their `value`,
 * which defaults to their text. Give `value` explicitly when the text is not what
 * someone would type, or add `keywords` for synonyms.
 *
 * Pass `shouldFilter={false}` on `Command` when the list comes from a server and
 * is already filtered, otherwise cmdk filters the results a second time.
 */

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-lg bg-popover text-popover-foreground",
      className,
    )}
    {...props}
  />
));
Command.displayName = "Command";

export interface CommandDialogProps extends React.ComponentPropsWithoutRef<
  typeof Dialog
> {
  /**
   * The dialog's accessible name. Rendered visually hidden, because a command
   * palette shows a search field rather than a heading, and a dialog with no
   * name is announced as just "dialog".
   */
  title?: string;
  /** Visually hidden description, announced after the title. */
  description?: string;
  className?: string;
}

/**
 * The palette form: the same `Command`, in a dialog.
 *
 * The title and description are real elements, visually hidden, and they live
 * *inside* `DialogContent` where the labelling can resolve. The corner close
 * button is turned off: it is positioned at the top right, which is where the
 * search field is.
 */
const CommandDialog = ({
  title = "Command palette",
  description = "Search for a command to run",
  children,
  className,
  ...props
}: CommandDialogProps) => (
  <Dialog {...props}>
    <DialogContent
      className={cn("overflow-hidden p-0", className)}
      showCloseButton={false}
      size="sm"
    >
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <Command>{children}</Command>
    </DialogContent>
  </Dialog>
);
CommandDialog.displayName = "CommandDialog";

/**
 * The search field.
 *
 * Wrapped in a row with the icon, so the icon is a sibling rather than a
 * background image and can be sized with the text.
 */
const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center gap-2 border-b border-border px-3">
    <MagnifyingGlass
      className="h-4 w-4 shrink-0 text-muted-foreground"
      aria-hidden="true"
    />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
));
CommandInput.displayName = "CommandInput";

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn(
      "max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden",
      className,
    )}
    {...props}
  />
));
CommandList.displayName = "CommandList";

/**
 * What to show when nothing matches.
 *
 * cmdk renders it only when the query has no results, so it is not a fallback
 * for an empty list - an empty `Command` with no query shows nothing.
 */
const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={cn("py-6 text-center text-sm text-muted-foreground", className)}
    {...props}
  />
));
CommandEmpty.displayName = "CommandEmpty";

/**
 * A named section. Hides itself when the query filters all of its items out, so
 * you do not get a heading over nothing.
 */
const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground",
      "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className,
    )}
    {...props}
  />
));
CommandGroup.displayName = "CommandGroup";

/**
 * A line between groups, hidden from the accessibility tree.
 *
 * A `listbox` may only contain `option` and `group` children, and cmdk gives its
 * separator `role="separator"`, which makes the list an `aria-required-children`
 * violation - axe flags the list, not the separator, so it reads like a problem
 * with the list. `role` cannot be overridden: cmdk writes it after the prop
 * spread. `aria-hidden` is the fix, and it is also the honest description. The
 * line is decoration; the group headings are what convey the split.
 */
const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    aria-hidden="true"
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
));
CommandSeparator.displayName = "CommandSeparator";

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
      // cmdk marks the active item with data-selected, keyboard and pointer
      // alike, so hover styling would be a second source of truth.
      "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      "[&_svg]:pointer-events-none [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
      className,
    )}
    {...props}
  />
));
CommandItem.displayName = "CommandItem";

/** The keyboard hint on the right of an item. Decorative. */
const CommandShortcut = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    aria-hidden="true"
    className={cn(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      className,
    )}
    {...props}
  />
));
CommandShortcut.displayName = "CommandShortcut";

/** Shown while results are loading, for a `Command` fed from a server. */
const CommandLoading = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Loading>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Loading>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Loading
    ref={ref}
    className={cn("py-6 text-center text-sm text-muted-foreground", className)}
    {...props}
  />
));
CommandLoading.displayName = "CommandLoading";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
  CommandLoading,
};
