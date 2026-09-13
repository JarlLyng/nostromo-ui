import * as React from "react";
import { Pricing } from "@jarllyng/nostromo";

/**
 * The billing switch, in a browser and inside a form.
 *
 * Two of the things #245 asked for cannot be answered in jsdom. Space and Enter
 * on a button are translated into a click by the browser, and jsdom does not do
 * it - measured, not assumed: `fireEvent.keyDown(button, { key: " " })` fires no
 * click there, so a unit test pressing keys would pass against a `<div>` with an
 * onClick just as readily.
 *
 * Implicit submission is the same story. A form with a text field submits when
 * Enter is pressed in that field, and a `type="submit"` button anywhere inside
 * it submits when activated. Whether the switch stays out of that is a question
 * about form semantics that only a real browser answers.
 *
 * The form's action is a same-page hash so a submission shows up in `location`
 * rather than needing a server.
 */
export function PricingCase() {
  const [yearly, setYearly] = React.useState(false);
  const [submits, setSubmits] = React.useState(0);

  return (
    <div style={{ padding: 24 }}>
      <p data-testid="yearly">{String(yearly)}</p>
      <p data-testid="submits">{submits}</p>

      <form
        action="#submitted"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmits((count) => count + 1);
        }}
      >
        <input type="text" name="coupon" aria-label="Coupon" />
        <Pricing
          title="Plans"
          showYearly={yearly}
          onToggleBilling={setYearly}
          columns={2}
          plans={[
            {
              id: "starter",
              name: "Starter",
              price: { monthly: 9, yearly: 90 },
              features: [
                { id: "projects", name: "Up to 5 projects", included: true },
              ],
              cta: { text: "Get Started", href: "#starter" },
            },
            {
              id: "team",
              name: "Team",
              price: { monthly: 29, yearly: 290 },
              features: [
                { id: "projects", name: "Unlimited projects", included: true },
              ],
              cta: { text: "Contact Sales", onClick: () => undefined },
            },
          ]}
        />
      </form>
    </div>
  );
}
