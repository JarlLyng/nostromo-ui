import { expect, test } from "@playwright/test";

/**
 * The billing switch, asked the questions jsdom cannot answer.
 *
 * The unit suite covers the role, the name, the state and the fact that a click
 * reports the flip. What it cannot cover is keyboard activation - jsdom fires no
 * click for Space or Enter on a button, which was measured rather than assumed -
 * and it cannot cover implicit form submission, which needs a form the browser
 * is willing to submit.
 *
 * Both matter here because the switch shipped as a bare `<button>` with no
 * `type`, which defaults to `submit`. Inside a checkout form that is a posted
 * order rather than a changed price.
 */
test.describe("Pricing billing switch", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/?case=pricing");
    await expect(page.getByRole("switch")).toBeVisible();
  });

  test("Space flips it", async ({ page }) => {
    const toggle = page.getByRole("switch");
    await expect(toggle).toHaveAttribute("aria-checked", "false");

    await toggle.focus();
    await page.keyboard.press("Space");

    await expect(toggle).toHaveAttribute("aria-checked", "true");
    await expect(page.getByTestId("yearly")).toHaveText("true");
  });

  test("Enter flips it too, and does not submit the form", async ({ page }) => {
    const toggle = page.getByRole("switch");

    await toggle.focus();
    await page.keyboard.press("Enter");

    await expect(toggle).toHaveAttribute("aria-checked", "true");
    // The form is still unsubmitted, and the URL is unchanged. A `type="submit"`
    // button would have given `#submitted` here, or a count of 1.
    await expect(page.getByTestId("submits")).toHaveText("0");
    expect(new URL(page.url()).hash).toBe("");
  });

  test("and the form itself still submits, so the test is not vacuous", async ({
    page,
  }) => {
    // If nothing in this fixture could submit, the assertion above would pass
    // for the wrong reason. Enter in a lone text field is implicit submission,
    // which the browser does and jsdom does not.
    await page.getByLabel("Coupon").fill("SPRING");
    await page.keyboard.press("Enter");

    await expect(page.getByTestId("submits")).toHaveText("1");
  });

  test("the price shown follows the switch", async ({ page }) => {
    // Exact text: "$9" as a substring also matches "$90", which would make the
    // second assertion pass before anything had changed.
    await expect(page.getByText("$9", { exact: true })).toBeVisible();
    await expect(page.getByText("/month").first()).toBeVisible();

    await page.getByRole("switch").click();

    await expect(page.getByText("$90", { exact: true })).toBeVisible();
    await expect(page.getByText("/year").first()).toBeVisible();
    await expect(page.getByText("$9", { exact: true })).toHaveCount(0);
  });
});

test.describe("Pricing calls to action", () => {
  test("an href renders a link that actually navigates", async ({ page }) => {
    await page.goto("/?case=pricing");

    const link = page.getByRole("link", { name: "Get Started" });
    await expect(link).toHaveAttribute("href", "#starter");

    // The point of #246: this was a `<button>`, so it went nowhere at all.
    await link.click();
    expect(new URL(page.url()).hash).toBe("#starter");
  });

  test("a callback-only action stays a button, and does not submit", async ({
    page,
  }) => {
    await page.goto("/?case=pricing");

    const button = page.getByRole("button", { name: "Contact Sales" });
    await expect(button).toHaveAttribute("type", "button");

    await button.click();
    await expect(page.getByTestId("submits")).toHaveText("0");
  });
});
