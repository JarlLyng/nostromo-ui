import { expect, test, type Page } from "@playwright/test";

/**
 * Notifications are geometry, and the bug that produced #248 was reported in
 * numbers jsdom cannot produce: two 1200px-wide boxes starting at x=-16 in a
 * 1200px viewport, 8px apart, each about 94px tall - so the second covered
 * nearly all of the first and both ran off the left edge.
 *
 * Every assertion here is a measurement. The structure that makes the layout
 * possible is checked in the unit tests, where it is cheaper.
 */

/**
 * Reads the toast boxes once they have arrived.
 *
 * The wait is for the entrance transform to reach the identity, which is the
 * value a settled toast has - not for the numbers to stop changing. A slow
 * transition can hand out two identical samples mid-flight, which is how the
 * theming tests failed on Linux WebKit and passed on macOS.
 *
 * `[data-leaving]` rather than a descendant of the viewport: the toast element is
 * the thing being measured, and addressing it directly means these tests also run
 * against an implementation that positions each toast itself. Against the old one
 * they reported the geometry from the issue - two boxes at x=-16, 1200 wide in a
 * 1200px window, 8px apart and 94 tall - rather than failing for want of a
 * selector.
 */
async function boxes(page: Page) {
  const toasts = page.locator("[data-leaving]");
  await expect(toasts.first()).toBeVisible();

  await expect
    .poll(async () =>
      Promise.all(
        (await toasts.all()).map((el) =>
          el.evaluate((node) => {
            const value = getComputedStyle(node).transform;
            return value === "none" || value === "matrix(1, 0, 0, 1, 0, 0)";
          }),
        ),
      ).then((settled) => settled.every(Boolean)),
    )
    .toBe(true);

  const out = [];
  for (const el of await toasts.all()) out.push((await el.boundingBox())!);
  return out;
}

function overlaps(
  a: { y: number; height: number },
  b: { y: number; height: number },
) {
  return a.y < b.y + b.height && b.y < a.y + a.height;
}

for (const viewport of [
  { name: "desktop", width: 1200, height: 900 },
  { name: "mobile", width: 375, height: 812 },
]) {
  test.describe(`Toast at ${viewport.name} width`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("two long notifications stack without covering each other", async ({
      page,
    }) => {
      await page.goto("/?case=toast");
      await page.getByTestId("add-two").click();

      const [first, second] = await boxes(page);
      expect(first).toBeTruthy();
      expect(second).toBeTruthy();

      // The reported failure: 8px of separation for boxes ~94px tall.
      expect(overlaps(first!, second!)).toBe(false);
      const gap = second!.y - (first!.y + first!.height);
      expect(gap).toBeGreaterThanOrEqual(4);
      expect(gap).toBeLessThan(40);
    });

    test("stays inside the viewport", async ({ page }) => {
      await page.goto("/?case=toast");
      await page.getByTestId("add-two").click();

      for (const box of await boxes(page)) {
        // x was -16 before, with a width equal to the whole window.
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
        expect(box.width).toBeLessThanOrEqual(viewport.width);
      }
    });

    test("puts a bottom-left notification at the bottom left", async ({
      page,
    }) => {
      await page.goto("/?case=toast");
      await page.getByTestId("add-bottom-left").click();

      const [box] = await boxes(page);
      expect(box!.x).toBeLessThan(viewport.width / 2);
      expect(box!.y + box!.height).toBeGreaterThan(viewport.height / 2);
      expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width);
    });
  });
}

test.describe("Toast behaviour in a browser", () => {
  test.use({ viewport: { width: 1200, height: 900 } });

  test("a dismissed notification leaves the provider's state", async ({
    page,
  }) => {
    await page.goto("/?case=toast");
    await page.getByTestId("add-two").click();
    await expect(page.getByTestId("count")).toHaveText("2");

    await page
      .getByRole("button", { name: "Close notification" })
      .first()
      .click();
    await expect(page.getByTestId("count")).toHaveText("1");

    await page
      .getByRole("button", { name: "Close notification" })
      .first()
      .click();
    await expect(page.getByTestId("count")).toHaveText("0");
    await expect(page.locator("[data-toast-viewport]")).toHaveCount(0);
  });

  test("the remaining notification moves up to take the space", async ({
    page,
  }) => {
    await page.goto("/?case=toast");
    await page.getByTestId("add-two").click();
    const before = await boxes(page);
    expect(before).toHaveLength(2);

    await page
      .getByRole("button", { name: "Close notification" })
      .first()
      .click();
    await expect(page.getByTestId("count")).toHaveText("1");

    const after = await boxes(page);
    expect(after).toHaveLength(1);
    expect(after[0]!.y).toBeLessThan(before[1]!.y);
  });

  // The announcement policy, in a real accessibility tree rather than by
  // attribute: a routine notification is a status, an error is an alert.
  test("is announced, and an error is announced urgently", async ({ page }) => {
    await page.goto("/?case=toast");

    await page.getByTestId("add-two").click();
    await expect(page.getByRole("status").first()).toBeVisible();
    await expect(page.getByRole("status").first()).toHaveAttribute(
      "aria-live",
      "polite",
    );

    await page.getByTestId("clear").click();
    await expect(page.getByTestId("count")).toHaveText("0");

    await page.getByTestId("add-error").click();
    const alert = page.getByRole("alert");
    await expect(alert).toBeVisible();
    await expect(alert).toHaveAttribute("aria-live", "assertive");
  });

  test("does not take focus away from what you were doing", async ({
    page,
  }) => {
    await page.goto("/?case=toast");
    const button = page.getByTestId("add-two");
    await button.focus();
    await page.keyboard.press("Enter");

    await expect(page.getByRole("status").first()).toBeVisible();
    await expect(button).toBeFocused();
  });

  test("the close button is reachable by keyboard", async ({ page }) => {
    await page.goto("/?case=toast");
    await page.getByTestId("add-two").click();
    await expect(page.getByTestId("count")).toHaveText("2");

    const close = page
      .getByRole("button", { name: "Close notification" })
      .first();
    await close.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("count")).toHaveText("1");
  });
});
