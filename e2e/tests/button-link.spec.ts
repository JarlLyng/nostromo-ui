import { expect, test, type Locator } from "@playwright/test";

/**
 * A disabled `asChild` link, in a browser that can actually navigate.
 *
 * The unit tests assert `defaultPrevented`, which is the mechanism. This asserts
 * the consequence: the URL does not change. `disabled` on an anchor is inert
 * markup, so before this it navigated and ran both handlers while announcing
 * itself disabled.
 */
test.describe("Button asChild link", () => {
  /**
   * `force: true` because Playwright refuses to click it otherwise.
   *
   * Its actionability check reads `aria-disabled="true"` as "element is not
   * enabled" and waits for it to become enabled until the test times out. That is
   * a useful second opinion - the tooling agrees the link is disabled - but it
   * means the ordinary click API cannot ask the question this test is asking.
   * Forcing it performs the same real mouse click without the wait, which is what
   * a user's pointer does regardless of what any framework thinks.
   */
  const forceClick = (locator: Locator) => locator.click({ force: true });

  test("a disabled link does not navigate and runs no handler", async ({
    page,
  }) => {
    await page.goto("/?case=button-link");
    const before = page.url();

    await forceClick(page.getByTestId("disabled-link"));

    expect(page.url()).toBe(before);
    await expect(page.getByTestId("clicks")).toHaveText("");
  });

  test("nor does a loading one", async ({ page }) => {
    await page.goto("/?case=button-link");
    const before = page.url();

    await forceClick(page.getByTestId("loading-link"));

    expect(page.url()).toBe(before);
    await expect(page.getByTestId("clicks")).toHaveText("");
  });

  test("Enter on a disabled link does nothing either", async ({ page }) => {
    await page.goto("/?case=button-link");
    const before = page.url();

    await page.getByTestId("disabled-link").focus();
    await page.keyboard.press("Enter");

    expect(page.url()).toBe(before);
    await expect(page.getByTestId("clicks")).toHaveText("");
  });

  // It stays focusable on purpose: the aria-disabled convention keeps a disabled
  // control discoverable rather than removing it from the tab order.
  test("a disabled link can still be reached and announces itself", async ({
    page,
  }) => {
    await page.goto("/?case=button-link");

    const link = page.getByTestId("disabled-link");
    await link.focus();
    await expect(link).toBeFocused();
    await expect(link).toHaveAttribute("aria-disabled", "true");
  });

  test("and it looks disabled", async ({ page }) => {
    await page.goto("/?case=button-link");

    const opacity = await page
      .getByTestId("disabled-link")
      .evaluate((el) => getComputedStyle(el).opacity);
    const enabled = await page
      .getByTestId("enabled-link")
      .evaluate((el) => getComputedStyle(el).opacity);

    expect(Number(opacity)).toBeLessThan(Number(enabled));
    expect(
      await page
        .getByTestId("disabled-link")
        .evaluate((el) => getComputedStyle(el).cursor),
    ).toBe("not-allowed");
  });

  test("an enabled link still navigates and runs both handlers", async ({
    page,
  }) => {
    await page.goto("/?case=button-link");

    await page.getByTestId("enabled-link").click();

    expect(page.url()).toContain("#enabled");
    await expect(page.getByTestId("clicks")).toHaveText(
      "child-enabled,parent-enabled",
    );
  });
});
