import { expect, test, type Page } from "@playwright/test";

/**
 * The documentation home page, in a browser.
 *
 * Everything here failed silently before. The page promised an interactive
 * four-theme preview and rendered a dashed box reading "Interactive Theme
 * Switcher Implementation..."; it requested a hero background that has never
 * existed in `public/` and took a 404 on every visit; and once the real switcher
 * was mounted it still changed nothing, because each theme file scopes its
 * tokens to its own `[data-theme="..."]` and the site imported one of the four.
 *
 * None of that is answerable without a browser. jsdom parses no stylesheet, so
 * it cannot tell a token that resolved from one that did not, and it issues no
 * requests, so it cannot notice a 404. Every unit test stayed green throughout.
 */
/**
 * Colour transitions are switched off for this file.
 *
 * The preview Card transitions its colours, so a computed style read straight
 * after the attribute changes catches the transition in flight: the first run of
 * the four-theme check returned three distinct colours out of four, because two
 * reads landed on the same point of two different journeys.
 *
 * This is the same conclusion `theming.spec.ts` reached and for the same reason,
 * including the part about not polling instead: a slow transition hands out two
 * identical samples while still moving. What these tests are about is whether
 * the attribute re-resolves a token, not how the colour travels there.
 */
const NO_TRANSITIONS = `*, *::before, *::after {
  transition-property: none !important;
  animation-duration: 0s !important;
}`;

const THEMES = [
  { label: "Nostromo", attr: "nostromo" },
  { label: "Mother", attr: "mother" },
  { label: "LV-426", attr: "lv-426" },
  { label: "Sulaco", attr: "sulaco" },
] as const;

/** The preview card's primary button, which is a real `Button` from the library. */
function previewButton(page: Page) {
  return page.locator("main [data-theme] button").first();
}

const colour = (page: Page, locator = previewButton(page)) =>
  locator.evaluate((el) => getComputedStyle(el).backgroundColor);

test.describe("the home page's theme preview", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
    await page.addStyleTag({ content: NO_TRANSITIONS });
    await expect(
      page.getByRole("button", { name: "Nostromo", exact: true }),
    ).toBeVisible();
  });

  // The placeholder the previous version shipped. Named exactly, because a test
  // for "no placeholder" that matches nothing would pass on a blank page too.
  test("is a real preview, not the placeholder", async ({ page }) => {
    await expect(page.getByText("Implementation...")).toHaveCount(0);
    await expect(previewButton(page)).toBeVisible();
  });

  test("every theme paints a different primary", async ({ page }) => {
    const seen = new Map<string, string>();

    for (const theme of THEMES) {
      await page
        .getByRole("button", { name: theme.label, exact: true })
        .click();
      await expect(page.locator("main [data-theme]").first()).toHaveAttribute(
        "data-theme",
        theme.attr,
      );
      const value = await colour(page);
      expect(value, `${theme.label} primary`).not.toBe("rgba(0, 0, 0, 0)");
      seen.set(theme.label, value);
    }

    // Four themes, four colours. The bug this replaces produced four *identical*
    // ones - rgb(105, 30, 235) in every case - while the attribute changed
    // correctly each time, so asserting only on the attribute would have passed
    // against the broken build.
    expect(new Set(seen.values()).size).toBe(THEMES.length);
  });

  test("and switching back is exact, not approximate", async ({ page }) => {
    const first = page.getByRole("button", { name: "Nostromo", exact: true });
    await first.click();
    const home = await colour(page);

    await page.getByRole("button", { name: "Mother", exact: true }).click();
    await expect.poll(() => colour(page)).not.toBe(home);

    await first.click();
    await expect.poll(() => colour(page)).toBe(home);
  });
});

test.describe("the home page's own assets", () => {
  // The `/hero-bg.jpg` that was requested on every visit and never existed. This
  // watches every same-origin request rather than that one filename, so the next
  // asset someone references without adding is caught too.
  test("requests nothing from itself that is not there", async ({ page }) => {
    const missing: string[] = [];

    page.on("response", (response) => {
      const url = new URL(response.url());
      if (url.host !== new URL(page.url() || "http://localhost").host) return;
      if (response.status() >= 400) {
        missing.push(`${response.status()} ${url.pathname}`);
      }
    });

    await page.goto("./", { waitUntil: "networkidle" });
    expect(missing).toEqual([]);
  });

  test("the hero is painted, and its ground follows the colour scheme", async ({
    page,
  }) => {
    await page.goto("./");
    const hero = page.locator(".nostromo-hero-surface");
    await expect(hero).toBeVisible();

    const light = await hero.evaluate(
      (el) => getComputedStyle(el).backgroundImage,
    );
    expect(light).not.toBe("none");

    await page.evaluate(() => {
      document.documentElement.setAttribute("data-color-scheme", "dark");
      document.documentElement.classList.add("dark");
    });
    await expect
      .poll(() => hero.evaluate((el) => getComputedStyle(el).backgroundImage))
      .not.toBe(light);
  });
});

test.describe("the layout fills the viewport", () => {
  // Nextra caps its whole chrome at `--nextra-content-width` and centres it,
  // which left a 226px dead gutter either side at this width and floated the
  // sidebar inward instead of against the edge.
  test.use({ viewport: { width: 1900, height: 950 } });

  test("on a documentation page, with the sidebar against the edge", async ({
    page,
  }) => {
    await page.goto("./components/button/");

    // The navbar, not `body > div`: the first div is the scroll-progress bar,
    // which is fixed and 0 tall, so `boundingBox()` came back null. The navbar
    // carries the same `max-w-(--nextra-content-width)` as the shell and is
    // unambiguous to locate.
    const nav = (await page.locator("nav").first().boundingBox())!;
    expect(nav.x).toBeLessThan(2);
    expect(nav.width).toBeGreaterThan(1800);

    // And the prose does not stretch with it: the measure is the point of
    // separating the two.
    const main = (await page.locator("main").boundingBox())!;
    expect(main.width).toBeLessThanOrEqual(900);
    expect(main.x).toBeGreaterThan(300);
  });

  test("and the home page has no documentation chrome", async ({ page }) => {
    await page.goto("./");

    await expect(page.getByText("Copy page")).toHaveCount(0);
    await expect(
      page.getByRole("navigation", { name: "breadcrumbs" }),
    ).toHaveCount(0);

    // The hero band reaches the edges of the content area rather than stopping
    // short of the sidebar, which is what `nostromo-bleed` is for.
    const hero = (await page.locator(".nostromo-hero-surface").boundingBox())!;
    const main = (await page.locator("main").boundingBox())!;
    expect(hero.width).toBeGreaterThan(main.width);
  });
});
