---
"@jarllyng/nostromo": patch
---

Button: `disabled` and `loading` now actually disable an `asChild` link.

`disabled` is a form-control attribute, and `asChild` usually renders an anchor,
which ignores it. So this navigated, ran the caller's `onClick` and ran the
anchor's own `onClick`, while `aria-disabled` announced a disabled state that
nothing implemented (#243):

    <Button asChild disabled onClick={parentHandler}>
      <a href="/checkout" onClick={childHandler}>Continue</a>
    </Button>

Clicks and the Enter and Space keys are now cancelled in the capture phase, so
neither handler runs and the navigation does not happen. The phase matters:
measured rather than assumed, Radix Slot merges its props with the child's by
running the child's handler first and does not check `defaultPrevented`, so the
order is child capture, parent capture, child onClick, parent onClick. A bubble
handler would have arrived after both onClicks had already fired.

Two smaller things came with it. The meaningless `disabled=""` no longer goes onto
elements that cannot use it, while a slotted `<button>` still gets the real
attribute. And the disabled styling is keyed on `aria-disabled` as well as
`:disabled`, which never matches an anchor, so a disabled link now looks disabled.

It stays focusable on purpose. A disabled control removed from the tab order
cannot be found by someone navigating by keyboard, so the aria-disabled convention
keeps it reachable and blocks the activation instead.

One documented limit: a capture handler on the child element itself runs before
the guard. Regular handlers on either side are blocked.
