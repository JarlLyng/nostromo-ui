import { expect, test } from "@playwright/test";

/**
 * The two halves of "modal" that jsdom cannot answer.
 *
 * It has no Tab key, so focus never moves on its own there, and no scrolling. The
 * unit tests cover initial focus, Escape, the arrows and the aria-hiding; these
 * cover containment and the scroll lock, which is what `aria-modal="true"` was
 * claiming on its own before #244.
 */
test.describe("Gallery lightbox as a modal", () => {
  const openFirst = async (page: import("@playwright/test").Page) => {
    await page.goto("/?case=gallery");
    await page.getByLabel("View image 1: Image 1").click();
    await expect(page.getByRole("dialog")).toBeVisible();
  };

  test("keeps Tab inside the dialog", async ({ page }) => {
    await openFirst(page);
    const dialog = page.getByRole("dialog");

    // Ten stops is more than the dialog has, so an escape would show up.
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press("Tab");
      const inside = await dialog.evaluate((el) =>
        el.contains(document.activeElement),
      );
      expect(inside, `focus left the dialog after ${i + 1} tabs`).toBe(true);
    }
  });

  test("keeps Shift+Tab inside it too", async ({ page }) => {
    await openFirst(page);
    const dialog = page.getByRole("dialog");

    for (let i = 0; i < 10; i++) {
      await page.keyboard.press("Shift+Tab");
      const inside = await dialog.evaluate((el) =>
        el.contains(document.activeElement),
      );
      expect(inside).toBe(true);
    }
  });

  test("does not reach the buttons on the page behind it", async ({ page }) => {
    await openFirst(page);

    for (let i = 0; i < 10; i++) await page.keyboard.press("Tab");
    const focused = await page.evaluate(
      () => document.activeElement?.getAttribute("data-testid") ?? null,
    );
    expect(focused).not.toBe("before");
    expect(focused).not.toBe("after");
  });

  test("stops the page behind from scrolling", async ({ page }) => {
    await page.goto("/?case=gallery");

    // The wheel goes inside the poll rather than before it. WebKit drops one
    // sent the instant the page loads - about one run in six, always here and
    // never on the assertion below - so a single wheel followed by a wait is
    // waiting for something that already failed to happen.
    //
    // And this is a precondition rather than decoration: the assertion further
    // down is that a wheel moves nothing while the dialog is open, which would
    // hold just as well on a page that could not scroll in the first place.
    await expect
      .poll(async () => {
        await page.mouse.wheel(0, 200);
        return page.evaluate(() => window.scrollY);
      })
      .toBeGreaterThan(0);
    await page.evaluate(() => window.scrollTo(0, 0));

    await page.getByLabel("View image 1: Image 1").click();
    await expect(page.getByRole("dialog")).toBeVisible();

    // Read the offset rather than assuming it is zero. Opening the lightbox
    // sometimes leaves the page a few dozen pixels down - measured at 48 here,
    // and 0 on other runs of the same test - because focus moving into the
    // dialog can bring its trigger into view first. That is not the lock
    // failing, and a test asserting `0` fails on it about a quarter of the time.
    // What the lock promises is that the page does not move from here.
    const locked = await page.evaluate(() => window.scrollY);

    // Absence, so there is no value to wait for and `poll` has nothing to do.
    // Several wheels checked one at a time instead of one wheel and a sleep:
    // each is dispatched and answered before the next, so the page having
    // stayed put is a result rather than a guess about timing.
    for (let i = 0; i < 5; i++) {
      await page.mouse.wheel(0, 400);
      expect(await page.evaluate(() => window.scrollY)).toBe(locked);
    }

    // And the same wheel from the same place does move the page once the
    // dialog is gone. Without this the test above is satisfied by a wheel that
    // never arrived, which is the failure mode its first version actually had.
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect
      .poll(async () => {
        await page.mouse.wheel(0, 400);
        return page.evaluate(() => window.scrollY);
      })
      .toBeGreaterThan(locked);
  });

  test("gives focus back to the item that opened it", async ({ page }) => {
    await page.goto("/?case=gallery");
    const trigger = page.getByLabel("View image 2: Image 2");
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("moves between images with the arrows straight after opening", async ({
    page,
  }) => {
    await openFirst(page);

    await expect(page.getByRole("dialog")).toContainText("1 / 3");
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("dialog")).toContainText("2 / 3");
    await page.keyboard.press("ArrowLeft");
    await expect(page.getByRole("dialog")).toContainText("1 / 3");
  });
});
