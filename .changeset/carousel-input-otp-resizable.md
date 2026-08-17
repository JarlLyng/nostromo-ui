---
"@jarllyng/nostromo": minor
---

Three components: Carousel, InputOTP and Resizable.

**Carousel** wraps [Embla](https://www.embla-carousel.com/). Slides that snap, a
previous and a next button, horizontal or vertical. `orientation` is the only
axis control - `opts.axis` is overwritten, because the padding on `CarouselItem`
and the placement of the buttons have to agree with it. Anything past next and
previous, so dots, autoplay or a slide counter, reads state Embla owns and gets
it through `setApi`.

The region is a tab stop. Without one the arrow-key handler is unreachable: it
sits on the container, which cannot hold focus, so it only ever fires for a key
pressed on something inside it and a keyboard user gets the two buttons and no
way to reach the slides. Arrow keys inside a text field are left alone, so an
input on a slide still moves its own caret. Vertical carousels use up and down
rather than left and right.

**InputOTP** wraps [input-otp](https://github.com/guilhermerodz/input-otp). One
real `<input>`, invisible and stretched across the row, with the boxes as divs
that read their character from context. That is what keeps paste, autofill,
`autocomplete="one-time-code"`, backspace, password managers and mobile keyboards
working. The boxes are `aria-hidden`, because everything a screen reader needs is
already on the input. A slot index outside `maxLength` throws instead of
rendering a box that stays empty forever.

**Resizable** wraps
[react-resizable-panels](https://github.com/bvaughn/react-resizable-panels) v4,
whose primitives are `Group`, `Panel` and `Separator`. Two things about it shape
the wrapper, and both are documented and pinned by tests:

- The group writes `display`, `flex-direction`, `width` and `height` as inline
  styles, which beat classes. `className="h-96"` on the group is a silent no-op.
  Size the parent, or pass `style`, which merges. The component adds no layout
  classes of its own for the same reason - they would be dead CSS.
- `aria-orientation` on the divider is the divider's own axis, not the group's. A
  horizontal group has a vertical divider. Every `aria-[orientation=horizontal]`
  style in the component depends on reading it that way round.

A new `animate-caret-blink` utility in the stylesheet, for the drawn caret in
InputOTP. It stops blinking under `prefers-reduced-motion`.

Also in this release, and not caused by the new components: the documentation
overview page was missing 17 of the components it is meant to list, including
Popover, DropdownMenu, Sheet, Slider and Form. Every component in the sidebar now
has a card on it. The component and test counts in both READMEs and on that page
were several releases out of date and have been remeasured.
