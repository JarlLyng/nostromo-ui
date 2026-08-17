import { expect, test, type Locator } from "@playwright/test";

/**
 * Whether the shipped stylesheet actually applies.
 *
 * This is the largest gap the unit tests leave. jsdom parses no stylesheet, so
 * every assertion about appearance in the library's own suite is an assertion
 * about a `class` attribute - the InputOTP and Command tests say as much where
 * they check `sr-only` by class name and note that they cannot do better. And the
 * existing consumer contract test compiles the CSS and checks that rules are
 * *generated*, which is a different question from whether they *apply*.
 *
 * Everything below asks the browser what a property computed to.
 */
const computed = (locator: Locator, property: string) =>
  locator.evaluate(
    (el, prop) => getComputedStyle(el).getPropertyValue(prop),
    property,
  );

const isTransparent = (colour: string) =>
  colour === "transparent" || colour === "rgba(0, 0, 0, 0)" || colour === "";

test.describe("the stylesheet arrives at all", () => {
  // The failure this guards against actually shipped: the package declared
  // Tailwind v4 as a peer while shipping a v3 setup, so none of the semantic
  // colour utilities were generated and every component rendered unstyled. 1089
  // unit tests stayed green through it.
  test("a Button is painted, not a bare button element", async ({ page }) => {
    await page.goto("/?case=focus");
    const button = page.getByTestId("button");

    expect(isTransparent(await computed(button, "background-color"))).toBe(
      false,
    );
    expect(await computed(button, "border-radius")).not.toBe("0px");
    const height = (await button.boundingBox())!.height;
    expect(height).toBeGreaterThan(28);
  });

  test("sidebar tokens resolve to real colours", async ({ page }) => {
    await page.goto("/?case=theme");
    const surface = page.getByTestId("sidebar-surface");

    // The family is new, and its whole point is that it can be themed apart from
    // a card. If the bridge entry or the theme declaration were missing, these
    // would compute to nothing.
    expect(isTransparent(await computed(surface, "background-color"))).toBe(
      false,
    );
    expect(isTransparent(await computed(surface, "color"))).toBe(false);
    expect(isTransparent(await computed(surface, "border-top-color"))).toBe(
      false,
    );
  });
});

test.describe("sr-only", () => {
  // The CommandDialog test can only assert the class. Whether the title is
  // hidden from sight while still naming the dialog is a cascade question.
  test("hides the palette's title without unnaming the dialog", async ({
    page,
  }) => {
    await page.goto("/?case=command");
    await page.getByRole("button", { name: "Open palette" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAccessibleName("Command palette");

    // The assertion is on the element carrying sr-only, not on the heading
    // inside it. `overflow: hidden` and `clip-path` stop the text being painted
    // without shrinking the heading's own layout box, and Playwright's
    // visibility model ignores clip-path - so asking whether the heading "is
    // visible" gives a confident answer to the wrong question. The mechanism is
    // the 1px clipped container, so that is what gets checked.
    const hidden = page.locator(".sr-only", {
      has: page.getByRole("heading", { name: "Command palette" }),
    });
    await expect(hidden).toHaveCount(1);

    const box = (await hidden.boundingBox())!;
    expect(box.width).toBeLessThanOrEqual(1.5);
    expect(box.height).toBeLessThanOrEqual(1.5);
    expect(await computed(hidden, "position")).toBe("absolute");
    expect(await computed(hidden, "overflow")).toBe("hidden");
    expect(await computed(hidden, "clip-path")).toBe("inset(50%)");
  });
});

test.describe("Resizable: the class-versus-inline trap", () => {
  // The component's doc comment and its docs page both warn that a height class
  // on the group does nothing, because the library writes height inline. That was
  // established by reading the rendered attributes; this is the cascade actually
  // resolving it, which is the claim a reader cares about.
  test("a height class on the group loses, and a style wins", async ({
    page,
  }) => {
    await page.goto("/?case=resizable");

    const byClass = page.locator("#group-with-class");
    await expect(byClass).toHaveClass(/h-96/);
    // h-96 is 24rem = 384px. The inline height:100% wins instead, so the group
    // takes its height from the content rather than from the class.
    const classHeight = (await byClass.boundingBox())!.height;
    expect(classHeight).toBeLessThan(200);

    const byStyle = page.locator("#group-with-style");
    const styleHeight = (await byStyle.boundingBox())!.height;
    expect(Math.round(styleHeight)).toBe(160); // 10rem
  });
});

test.describe("animate-caret-blink", () => {
  test("the drawn caret is animated by the shipped utility", async ({
    page,
  }) => {
    await page.goto("/?case=input-otp");
    await page.getByRole("textbox").focus();

    // The caret lives inside the active slot and only exists while focused.
    const caret = page.locator('[data-active="true"] .animate-caret-blink');
    await expect(caret).toBeVisible();
    expect(await computed(caret, "animation-name")).toBe(
      "nostromo-caret-blink",
    );
    expect(await computed(caret, "animation-iteration-count")).toBe("infinite");
  });

  // The reduced-motion block in animations.css is otherwise unverifiable: it is a
  // media query, and jsdom answers every media query with `matches: false`.
  test("and stops when the reader asked for less motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/?case=input-otp");
    await page.getByRole("textbox").focus();

    const caret = page.locator('[data-active="true"] .animate-caret-blink');
    await expect(caret).toBeAttached();
    expect(await computed(caret, "animation-name")).toBe("none");
  });
});

test.describe("focus-visible", () => {
  // Chromium only, and that is a scoping decision rather than a workaround.
  // Whether a click focuses a button, and whether Tab reaches one at all, is
  // platform policy: WebKit follows the macOS convention where neither happens
  // by default. Running these there would test Safari's opinion about focus, not
  // the library's ring. The ring itself is a Tailwind utility from the same
  // stylesheet every other test here exercises in both engines.
  test.skip(
    ({ browserName }) => browserName !== "chromium",
    "focus policy for clicked and tabbed buttons is platform-specific",
  );

  // `:focus-visible` is the browser's judgement about how focus arrived. jsdom
  // has no such notion, so every `focus-visible:ring-2` in the library - and
  // there are dozens - is untested until here.
  // Two tests on two fresh pages rather than one that does both. Chromium's
  // heuristic has memory: once a page has been driven by the keyboard, a later
  // click can still count as focus-visible. Doing the click first in the same
  // page made this pass; doing it after the Tab made it fail. Neither ordering
  // says anything about the component, so each gets its own page.
  const focusVisible = (locator: Locator) =>
    locator.evaluate((el) => el.matches(":focus-visible"));

  /**
   * How many of a box-shadow's layers are actually painted.
   *
   * Counting layers rather than comparing the whole string. Button transitions
   * its drop shadow, so two reads taken moments apart differ by fractions of a
   * pixel - `0px 4px 6px -1px` against `0px 4.01971px 6.02957px -1.00657px` - and
   * a string comparison fails on that alone. It passed in isolation and failed in
   * a parallel run, which is the signature of exactly that. A ring adds a
   * coloured layer, and no amount of transitioning changes the count.
   */
  const paintedLayers = (locator: Locator) =>
    locator.evaluate((el) => {
      const value = getComputedStyle(el).boxShadow;
      if (value === "none") return 0;
      return value
        .split(/,(?![^(]*\))/)
        .filter((layer) => !/rgba\([^)]*,\s*0\)/.test(layer)).length;
    });

  test("a keyboard focus draws the ring", async ({ page }) => {
    await page.goto("/?case=focus");
    const button = page.getByTestId("button");
    const resting = await paintedLayers(button);

    await page.keyboard.press("Tab");
    await expect(button).toBeFocused();
    expect(await focusVisible(button)).toBe(true);

    // ring-2 plus ring-offset-2 is two more painted layers than at rest.
    expect(await paintedLayers(button)).toBeGreaterThan(resting);
  });

  // The assertion is `:focus-visible` rather than a box-shadow comparison. The
  // button also transitions its drop shadow on hover, and after a click the
  // pointer is still over it - so the two strings differ by fractions of a pixel
  // mid-transition and a string comparison fails for a reason that has nothing to
  // do with focus. `:focus-visible` is the judgement being tested anyway.
  test("a mouse focus does not", async ({ page }) => {
    await page.goto("/?case=focus");
    const button = page.getByTestId("button");

    await button.click();
    await expect(button).toBeFocused();
    expect(await focusVisible(button)).toBe(false);
  });
});
