import { expect, test, type Page } from "@playwright/test";

/**
 * Everything here needs a layout engine.
 *
 * Embla measures element widths to work out where its snap points are, and
 * react-resizable-panels turns a pointer delta into a percentage of a measured
 * width. In jsdom every element is 0 wide, so the carousel collapses to a single
 * snap with both buttons permanently disabled, and a resize divides by nothing.
 * Both component test files say so; these are the tests they could not write.
 */

test.describe("Carousel", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/?case=carousel");
    await expect(page.getByRole("region", { name: "Numbers" })).toBeVisible();
  });

  // In jsdom this reads "both disabled", which is correct there and useless.
  test("starts with a way forward and none back", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Next slide" }),
    ).toBeEnabled();
    await expect(
      page.getByRole("button", { name: "Previous slide" }),
    ).toBeDisabled();
  });

  test("moves the track when Next is clicked", async ({ page }) => {
    const first = page.getByTestId("slide-1");
    const before = (await first.boundingBox())!;

    await page.getByRole("button", { name: "Next slide" }).click();
    // Embla animates, so settle before measuring.
    await expect
      .poll(async () => (await first.boundingBox())!.x, { timeout: 3000 })
      .toBeLessThan(before.x - 100);

    await expect(
      page.getByRole("button", { name: "Previous slide" }),
    ).toBeEnabled();
  });

  test("runs out of slides at the end", async ({ page }) => {
    const next = page.getByRole("button", { name: "Next slide" });
    for (let i = 0; i < 4; i++) await next.click();
    await expect(next).toBeDisabled();
    await expect(
      page.getByRole("button", { name: "Previous slide" }),
    ).toBeEnabled();
  });

  test("comes back with Previous", async ({ page }) => {
    const first = page.getByTestId("slide-1");
    const home = (await first.boundingBox())!.x;

    await page.getByRole("button", { name: "Next slide" }).click();
    await expect
      .poll(async () => (await first.boundingBox())!.x)
      .toBeLessThan(home - 100);

    await page.getByRole("button", { name: "Previous slide" }).click();
    await expect
      .poll(async () => Math.round((await first.boundingBox())!.x))
      .toBe(Math.round(home));
  });

  // The arrow keys are wired on the region with onKeyDownCapture, and the region
  // is a tab stop so they can be reached at all. Both halves only mean something
  // with a focus model and a layout to move.
  test("moves with the arrow keys after tabbing to it", async ({ page }) => {
    const first = page.getByTestId("slide-1");
    const home = (await first.boundingBox())!.x;

    await page.keyboard.press("Tab");
    await expect(page.getByRole("region", { name: "Numbers" })).toBeFocused();

    await page.keyboard.press("ArrowRight");
    await expect
      .poll(async () => (await first.boundingBox())!.x)
      .toBeLessThan(home - 100);
  });

  // A real drag, which is the interaction the component exists for and the one
  // thing no amount of jsdom can approximate.
  test("follows a pointer drag", async ({ page }) => {
    const track = page.getByTestId("track");
    const box = (await track.boundingBox())!;
    const first = page.getByTestId("slide-1");
    const home = (await first.boundingBox())!.x;

    const y = box.y + box.height / 2;
    await page.mouse.move(box.x + box.width - 40, y);
    await page.mouse.down();
    // Several steps: embla reads pointer velocity, and one jump looks like a
    // teleport rather than a swipe.
    for (let i = 1; i <= 10; i++) {
      await page.mouse.move(box.x + box.width - 40 - i * 25, y);
    }
    await page.mouse.up();

    await expect
      .poll(async () => (await first.boundingBox())!.x, { timeout: 3000 })
      .toBeLessThan(home - 100);
  });
});

test.describe("Resizable", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/?case=resizable");
    await expect(page.locator("#left")).toBeVisible();
  });

  test("starts at the sizes it was given", async ({ page }) => {
    const left = (await page.locator("#left").boundingBox())!;
    const right = (await page.locator("#right").boundingBox())!;
    // 50/50 of 600px, less the divider.
    expect(Math.abs(left.width - right.width)).toBeLessThan(4);
    expect(left.width).toBeGreaterThan(250);
  });

  test("resizes when the divider is dragged", async ({ page }) => {
    const handle = page.getByRole("separator");
    const before = (await page.locator("#left").boundingBox())!.width;
    const box = (await handle.boundingBox())!;

    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2 + 120, box.y + box.height / 2, {
      steps: 10,
    });
    await page.mouse.up();

    await expect
      .poll(async () => (await page.locator("#left").boundingBox())!.width)
      .toBeGreaterThan(before + 80);
  });

  test("stops at minSize", async ({ page }) => {
    const handle = page.getByRole("separator");
    const box = (await handle.boundingBox())!;

    // Well past the left edge, which minSize="20" should refuse.
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x - 500, box.y + box.height / 2, { steps: 10 });
    await page.mouse.up();

    const frame = (await page.getByTestId("frame").boundingBox())!;
    const left = (await page.locator("#left").boundingBox())!;
    const share = left.width / frame.width;
    expect(share).toBeGreaterThan(0.17);
    expect(share).toBeLessThan(0.24);
  });

  // The divider is keyboard-operable, which is the reason to use the library
  // rather than a div with a mousedown handler. Untestable without focus and
  // without widths to compare.
  test("resizes from the keyboard", async ({ page }) => {
    const before = (await page.locator("#left").boundingBox())!.width;
    await page.getByRole("separator").focus();
    for (let i = 0; i < 5; i++) await page.keyboard.press("ArrowRight");

    await expect
      .poll(async () => (await page.locator("#left").boundingBox())!.width)
      .toBeGreaterThan(before + 5);
  });
});

test.describe("Drawer", () => {
  /**
   * Waits for the panel to reach its resting position.
   *
   * vaul measures a drag from where the panel currently is, so grabbing it while
   * the open transition is still running measures from a moving origin. That is
   * what the first version of these tests did, and it looked like a WebKit bug:
   * the same drag that dismissed the drawer in Chromium left it open in WebKit.
   * With the transform settled first, both engines translate by exactly the
   * pointer delta - 30, 60, 90 ... 240 - and both dismiss. The engines never
   * disagreed; the test was racing an animation.
   *
   * The wait is for the specific resting value rather than for the transform to
   * stop changing. "Stopped changing" is what the theming tests tried first, and
   * a slow transition can hand out two identical samples while still moving -
   * which is exactly how it failed on Linux WebKit and not on macOS. `none` is
   * the value an open, untouched drawer has, so waiting for it cannot be
   * satisfied early.
   */
  async function settled(page: Page) {
    await expect
      .poll(
        () =>
          page
            .getByRole("dialog")
            .evaluate((el) => getComputedStyle(el).transform),
        { timeout: 5000 },
      )
      .toBe("none");
  }

  test("opens, and a drag downwards dismisses it", async ({ page }) => {
    await page.goto("/?case=drawer");
    await page.getByRole("button", { name: "Open drawer" }).click();

    const panel = page.getByRole("dialog");
    await expect(panel).toBeVisible();
    await settled(page);
    const box = (await panel.boundingBox())!;

    // Grab the panel and pull it down past the close threshold.
    await page.mouse.move(box.x + box.width / 2, box.y + 20);
    await page.mouse.down();
    for (let i = 1; i <= 12; i++) {
      await page.mouse.move(box.x + box.width / 2, box.y + 20 + i * 30);
    }
    await page.mouse.up();

    await expect(panel).toBeHidden({ timeout: 3000 });
  });

  test("stays open when the drag is too small to count", async ({ page }) => {
    await page.goto("/?case=drawer");
    await page.getByRole("button", { name: "Open drawer" }).click();

    const panel = page.getByRole("dialog");
    await expect(panel).toBeVisible();
    await settled(page);
    const box = (await panel.boundingBox())!;

    await page.mouse.move(box.x + box.width / 2, box.y + 20);
    await page.mouse.down();
    for (let i = 1; i <= 4; i++) {
      await page.mouse.move(box.x + box.width / 2, box.y + 20 + i * 5);
    }
    await page.mouse.up();

    await expect(panel).toBeVisible();
  });
});
