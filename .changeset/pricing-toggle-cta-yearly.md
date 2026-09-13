---
"@jarllyng/nostromo": minor
---

Pricing: a real switch, working links, and honest yearly prices.

The billing toggle was an empty `<button>`: no accessible name, no state, and
`type` defaulting to `submit`, so it posted any form it sat inside. It was also
rendered inside the header block, which meant it vanished unless you passed a
`title` or a `subtitle`. It is now a `role="switch"` with `aria-checked`, a
`billingToggleLabel` for its name, `type="button"`, and a place of its own that
depends on `onToggleBilling` rather than on headings.

`PricingPlan.cta.href` was declared and then ignored: every plan rendered a
button, so "Get Started" went nowhere without JavaScript, and could not be
opened in a new tab. A plan with an `href` now renders an anchor; one with only
an `onClick` renders a `type="button"` button; one with both navigates and calls
the handler.

Yearly prices were picked with `showYearly && plan.price.yearly`, a truthiness
test. A plan priced at `yearly: 0` fell through to its monthly figure and
labelled it `/year`, and so did a plan with no yearly price at all. The check is
now on `undefined`, and a plan without a yearly price keeps its own period.

The "(Save 20%)" beside the toggle was hardcoded, unrelated to the prices on the
page and wrong for most of them. It is now computed from the plans: the best
saving, exact when they agree and "up to" when they differ, nothing at all when
there is nothing to save. `showYearlyDiscount={false}` removes it and
`yearlyDiscountLabel` rewords it.

Closes #245, #246, #247.
