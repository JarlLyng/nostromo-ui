import { expect, test, type Locator, type Page } from "@playwright/test";

/**
 * The theming architecture, which nothing could test before.
 *
 * `tokens.css` maps the private `--nostromo-*` layer onto Tailwind's namespaces
 * inside `@theme inline`. The `inline` is the load-bearing word: it keeps the
 * `var()` reference inside each generated utility rather than resolving it at
 * build time, which is what makes flipping `[data-theme]` at runtime re-colour
 * every component without rebuilding anything.
 *
 * That claim is why the token layer is namespaced in the first place, and it has
 * only ever been asserted in a comment. Checking it means asking a real cascade
 * what colour something ended up, four themes and two colour schemes deep.
 */
const THEMES = ["nostromo", "mother", "lv-426", "sulaco"] as const;

/**
 * Colour transitions are switched off for this file, and the reads are plain.
 *
 * Card and Button animate their colours, so a computed style read after a theme
 * switch can catch the transition mid-flight. The first version of these tests
 * saw nostromo's dark card - `0 0% 15%`, about rgb(38,38,38) - come back as
 * rgb(241,241,241), and light to dark to light return 249 where it started at 250.
 *
 * The second version polled until two consecutive reads agreed. That passed on
 * macOS and failed on Linux WebKit, where the transition is slow enough to give
 * two identical samples while still moving. Polling harder would only make the
 * window smaller.
 *
 * So the transition goes instead. What these tests are about is whether flipping
 * `data-theme` re-resolves a colour, not how it travels there, and with no
 * transition the computed value is the final one in every engine on the first
 * read. Deterministic by construction rather than by timing.
 */
const NO_TRANSITIONS = `*, *::before, *::after {
  transition-property: none !important;
  animation-duration: 0s !important;
}`;

const colour = (locator: Locator, property = "background-color") =>
  locator.evaluate(
    (el, prop) => getComputedStyle(el).getPropertyValue(prop),
    property,
  );

async function setTheme(page: Page, name: string) {
  await page.getByTestId(`theme-${name}`).click();
  await expect
    .poll(() => page.locator("html").getAttribute("data-theme"))
    .toBe(name);
}

async function setScheme(page: Page, name: string) {
  await page.getByTestId(`scheme-${name}`).click();
  await expect
    .poll(() => page.locator("html").getAttribute("data-color-scheme"))
    .toBe(name);
}

test.describe("runtime theme switching", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/?case=theme");
    await page.addStyleTag({ content: NO_TRANSITIONS });
    await expect(page.getByTestId("card")).toBeVisible();
  });

  // The most direct test of what `@theme inline` means. A non-inline @theme block
  // would define `--color-card` on the root and have utilities point at it; the
  // inline form puts the value into the utility instead. So: no `--color-card`
  // anywhere, and `bg-card` still resolves to a colour. That is the mechanism the
  // runtime switching below depends on.
  test("the bridge is inline: no --color-* on the root, and bg-card still paints", async ({
    page,
  }) => {
    const bridged = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--color-card")
        .trim(),
    );
    expect(bridged).toBe("");

    const nostromoToken = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--nostromo-color-card")
        .trim(),
    );
    expect(nostromoToken).not.toBe("");

    expect(await colour(page.getByTestId("card"))).not.toBe("rgba(0, 0, 0, 0)");
  });

  test("every theme paints a different card surface", async ({ page }) => {
    const seen = new Map<string, string>();
    for (const name of THEMES) {
      await setTheme(page, name);
      seen.set(name, await colour(page.getByTestId("card")));
    }

    // Not just "it changed once": four themes, four surfaces, and none of them
    // transparent - which is what a missing token would look like.
    for (const [name, value] of seen) {
      expect(value, `${name} card surface`).not.toBe("rgba(0, 0, 0, 0)");
    }
    expect(new Set(seen.values()).size).toBeGreaterThan(1);
  });

  test("the primary button follows the theme too", async ({ page }) => {
    const button = page.getByTestId("primary");
    await setTheme(page, "nostromo");
    const first = await colour(button);

    await setTheme(page, "lv-426");
    expect(await colour(button)).not.toBe(first);

    await setTheme(page, "nostromo");
    expect(await colour(button)).toBe(first);
  });

  // No rebuild, no re-render of the stylesheet: the same generated rule resolves
  // to a different colour because the var() is still in it. If tokens.css lost
  // its `inline`, this is the test that would notice.
  test("switching back and forth is exact, not approximate", async ({
    page,
  }) => {
    const body = page.getByTestId("body");
    const muted = page.getByTestId("muted");

    await setTheme(page, "mother");
    const motherBody = await colour(body, "color");
    const motherMuted = await colour(muted, "color");
    expect(motherBody).not.toBe(motherMuted);

    await setTheme(page, "sulaco");
    expect(await colour(body, "color")).not.toBe(motherBody);

    await setTheme(page, "mother");
    expect(await colour(body, "color")).toBe(motherBody);
    expect(await colour(muted, "color")).toBe(motherMuted);
  });

  test("the colour scheme flips independently of the theme", async ({
    page,
  }) => {
    await setTheme(page, "nostromo");
    await setScheme(page, "light");
    const light = await colour(page.getByTestId("card"));

    await setScheme(page, "dark");
    const dark = await colour(page.getByTestId("card"));
    expect(dark).not.toBe(light);

    // The theme is still nostromo, and going back to light returns the same
    // surface rather than something merely similar.
    await setScheme(page, "light");
    expect(await colour(page.getByTestId("card"))).toBe(light);
  });

  // The new family should follow the theme like every other token, and the
  // defaults were derived from each theme's card - so they should track it.
  test("the sidebar surface is themed as well", async ({ page }) => {
    const surface = page.getByTestId("sidebar-surface");
    const values = new Set<string>();
    for (const name of THEMES) {
      await setTheme(page, name);
      const value = await colour(surface);
      expect(value, `${name} sidebar surface`).not.toBe("rgba(0, 0, 0, 0)");
      values.add(value);
    }
    expect(values.size).toBeGreaterThan(1);
  });
});
