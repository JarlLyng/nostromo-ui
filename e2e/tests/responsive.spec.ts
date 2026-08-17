import { expect, test } from "@playwright/test";

/**
 * Real viewports, and one thing that survives a reload.
 *
 * `Sidebar` renders a different tree either side of 768px - a modal Sheet on a
 * phone, a fixed column on a desktop - and picks between them in JS with
 * `matchMedia`. The unit tests get there by replacing `matchMedia` with a stub
 * that answers a width they choose, which tests the branch but not the breakpoint.
 * Here the viewport is real and the media query is the browser's own.
 */

test.describe("Sidebar on a desktop viewport", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("is a column beside the page, not a dialog", async ({ page }) => {
    await page.goto("/?case=sidebar");

    await expect(page.getByRole("dialog")).toHaveCount(0);
    const shell = page.locator('[data-slot="sidebar"]');
    await expect(shell).toHaveAttribute("data-state", "expanded");

    // Beside, not over: the gap element reserves the width the fixed column
    // occupies, and the page content starts to its right.
    const gap = (await page
      .locator('[data-slot="sidebar-gap"]')
      .boundingBox())!;
    expect(gap.width).toBeGreaterThan(200);

    const main = (await page.getByRole("main").boundingBox())!;
    expect(main.x).toBeGreaterThanOrEqual(gap.width - 2);
  });

  test("collapsing takes the column's width away", async ({ page }) => {
    await page.goto("/?case=sidebar");
    const gap = page.locator('[data-slot="sidebar-gap"]');
    const before = (await gap.boundingBox())!.width;
    expect(before).toBeGreaterThan(200);

    await page.locator('[data-slot="sidebar-trigger"]').click();
    await expect
      .poll(async () => (await gap.boundingBox())!.width, { timeout: 3000 })
      .toBeLessThan(2);

    const main = (await page.getByRole("main").boundingBox())!;
    expect(main.x).toBeLessThan(2);
  });

  // The cookie's entire purpose. The unit test can check that it is written; only
  // a real navigation can check that it is worth writing.
  test("the collapsed state survives a reload", async ({ page }) => {
    await page.goto("/?case=sidebar");
    await expect(page.locator('[data-slot="sidebar"]')).toHaveAttribute(
      "data-state",
      "expanded",
    );

    await page.locator('[data-slot="sidebar-trigger"]').click();
    await expect(page.locator('[data-slot="sidebar"]')).toHaveAttribute(
      "data-state",
      "collapsed",
    );

    await page.reload();
    await expect(page.locator('[data-slot="sidebar"]')).toHaveAttribute(
      "data-state",
      "collapsed",
    );

    // And back again, so the test is not passing because the cookie is stuck.
    await page.locator('[data-slot="sidebar-trigger"]').click();
    await page.reload();
    await expect(page.locator('[data-slot="sidebar"]')).toHaveAttribute(
      "data-state",
      "expanded",
    );
  });

  test("⌘B toggles it", async ({ page }) => {
    await page.goto("/?case=sidebar");
    const shell = page.locator('[data-slot="sidebar"]');
    await expect(shell).toHaveAttribute("data-state", "expanded");

    // ControlOrMeta rather than a platform check of our own: the component keys
    // off metaKey || ctrlKey, and Playwright already knows which one the browser
    // it is driving expects.
    await page.keyboard.press("ControlOrMeta+b");
    await expect(shell).toHaveAttribute("data-state", "collapsed");
  });
});

test.describe("Sidebar on a phone viewport", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("is a dialog, closed until the trigger is pressed", async ({ page }) => {
    await page.goto("/?case=sidebar");

    await expect(page.getByRole("dialog")).toHaveCount(0);
    // No column, so nothing reserving width either.
    await expect(page.locator('[data-slot="sidebar-gap"]')).toHaveCount(0);

    await page.locator('[data-slot="sidebar-trigger"]').click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("data-mobile", "true");
    await expect(dialog).toHaveAccessibleName("Sidebar");
  });

  test("the open sheet takes the page out of the accessibility tree", async ({
    page,
  }) => {
    await page.goto("/?case=sidebar");
    await expect(page.getByRole("main")).toBeVisible();

    await page.locator('[data-slot="sidebar-trigger"]').click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    // The page behind it is aria-hidden while the sheet is open, so it has no
    // role any more - which is how `getByRole` reports it, and is the modal
    // behaviour the Drawer unit test could only infer from attributes. The
    // element is still on screen, hence the CSS locator for the geometry below.
    await expect(page.getByRole("main")).toHaveCount(0);
    const main = (await page.locator("main").boundingBox())!;
    const panel = (await dialog.boundingBox())!;

    // Over the page rather than beside it, which is the whole difference from
    // the desktop layout.
    expect(panel.x).toBeLessThan(main.x + main.width);
    expect(panel.width).toBeGreaterThan(200);

    await page.keyboard.press("Escape");
    await expect(page.getByRole("main")).toBeVisible();
  });

  test("closes on Escape", async ({ page }) => {
    await page.goto("/?case=sidebar");
    await page.locator('[data-slot="sidebar-trigger"]').click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
  });
});

test.describe("the breakpoint itself", () => {
  // 768 is Tailwind's md, and the hook queries max-width: 767px so that the
  // boundary belongs to the desktop side. The unit test asserts the number; this
  // asserts that the browser agrees about which side of it 768 is on.
  test("768 is a desktop and 767 is a phone", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 800 });
    await page.goto("/?case=sidebar");
    await expect(page.locator('[data-slot="sidebar-gap"]')).toHaveCount(1);

    await page.setViewportSize({ width: 767, height: 800 });
    await expect(page.locator('[data-slot="sidebar-gap"]')).toHaveCount(0);

    // And it reacts to a resize rather than only reading the width once on mount.
    await page.setViewportSize({ width: 1000, height: 800 });
    await expect(page.locator('[data-slot="sidebar-gap"]')).toHaveCount(1);
  });
});
