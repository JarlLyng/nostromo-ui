import { expect, test, type Page } from "@playwright/test";

/**
 * The documentation's live examples, in a real browser.
 *
 * `docs/tests/live-examples.test.ts` mounts all 120 examples through
 * react-live's `LiveProvider` and checks each one compiles and renders. That is
 * the broad check, and it runs in jsdom. What it cannot reach is the part a
 * reader touches: the `LiveEditor`, which is a contentEditable surface driven by
 * use-editable, and the bundle the docs site actually ships.
 *
 * Both are what a react-live major can break without the jsdom suite noticing.
 * react-live 5 moved its output target from es6 to es2022 and added an
 * `exports` map, neither of which changes what jsdom sees when vitest imports
 * it, and both of which change what Next bundles for the browser.
 *
 * So this edits an example the way a reader would and checks the preview
 * follows, in Chromium and WebKit, on the built export.
 */
const PAGE = "./components/button/";

/** The first live example on the page: its preview, editor and error box. */
function firstExample(page: Page) {
  const block = page
    .locator(".my-8")
    .filter({ has: page.locator("[contenteditable]") })
    .first();
  return {
    block,
    preview: block.locator("[data-color-scheme]").first(),
    editor: block.locator("[contenteditable]").first(),
  };
}

test.describe("a live example", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(PAGE);
  });

  test("renders its component, not an error", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    const { preview, block } = firstExample(page);
    await expect(
      preview.getByRole("button", { name: "Click me" }),
    ).toBeVisible();

    // LiveError renders a <pre> only when compilation or rendering failed.
    await expect(block.locator("pre.bg-red-950\\/90")).toHaveCount(0);
    expect(errors).toEqual([]);
  });

  test("follows an edit to its code", async ({ page }) => {
    const { preview, editor } = firstExample(page);
    await expect(
      preview.getByRole("button", { name: "Click me" }),
    ).toBeVisible();

    // Double-click selects one word, which is the least fragile way to change
    // text in a contentEditable without depending on how it splits into nodes.
    await editor.getByText("Click", { exact: false }).first().dblclick();
    await page.keyboard.type("Edited");

    await expect(
      preview.getByRole("button", { name: "Edited me" }),
    ).toBeVisible();
    await expect(preview.getByRole("button", { name: "Click me" })).toHaveCount(
      0,
    );
  });

  test("and Reset puts the original back", async ({ page }) => {
    const { preview, editor, block } = firstExample(page);
    await expect(
      preview.getByRole("button", { name: "Click me" }),
    ).toBeVisible();

    await editor.getByText("Click", { exact: false }).first().dblclick();
    await page.keyboard.type("Edited");
    await expect(
      preview.getByRole("button", { name: "Edited me" }),
    ).toBeVisible();

    await block.getByRole("button", { name: "Reset" }).click();
    await expect(
      firstExample(page).preview.getByRole("button", { name: "Click me" }),
    ).toBeVisible();
  });
});
