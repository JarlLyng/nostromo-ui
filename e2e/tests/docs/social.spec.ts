import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { expect, test } from "@playwright/test";

/**
 * The card a shared link produces, on every page of the export.
 *
 * Both failures this guards against render the page perfectly and break only
 * what a crawler sees, so nothing else in the build or the suite would notice.
 *
 * The first is a relative image resolved against a base that lives under a
 * path. `new URL("/og-image.png", "https://host/nostromo-ui")` drops the path,
 * and the crawler fetches a 404 from the domain root.
 *
 * The second happened while adding per-page titles. Next replaces `openGraph`
 * and `twitter` wholesale rather than merging them with the layout's, so a page
 * that set only its title lost the image and fell back to a small `summary`
 * card - on all 64 pages at once. The titles were right and every page looked
 * fine, which is why it is checked across the whole export rather than on a
 * sample: the sample I first checked was the three pages I had just edited.
 */
const OUT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../../docs/out",
);
const IMAGE = "https://jarllyng.github.io/nostromo-ui/og-image.png";

function pages(dir: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) found.push(...pages(path));
    else if (entry === "index.html") found.push(path);
  }
  return found;
}

const meta = (html: string, attr: "property" | "name", key: string) =>
  html.match(new RegExp(`${attr}="${key}" content="([^"]*)"`))?.[1];

test.describe("the share card", () => {
  const all = pages(OUT);

  test("the export has pages to check", () => {
    // Without this, an empty or missing export passes every assertion below.
    expect(all.length).toBeGreaterThan(50);
  });

  test("every page carries the image and the large card", () => {
    const wrong: string[] = [];
    for (const file of all) {
      const html = readFileSync(file, "utf8");
      const problems = [
        meta(html, "property", "og:image") !== IMAGE && "og:image",
        meta(html, "name", "twitter:image") !== IMAGE && "twitter:image",
        meta(html, "name", "twitter:card") !== "summary_large_image" &&
          `twitter:card=${meta(html, "name", "twitter:card")}`,
        !meta(html, "property", "og:title") && "og:title",
      ].filter(Boolean);
      if (problems.length) {
        wrong.push(`${relative(OUT, file)}: ${problems.join(", ")}`);
      }
    }
    expect(wrong).toEqual([]);
  });

  test("a page's card is titled after the page, not after the site", () => {
    const button = readFileSync(
      join(OUT, "components/button/index.html"),
      "utf8",
    );
    expect(meta(button, "property", "og:title")).toBe("Button – Nostromo UI");

    // And the home page is the site, not "Index", which is what Nextra derives
    // from the filename and what the browser tab said until this was fixed.
    const home = readFileSync(join(OUT, "index.html"), "utf8");
    expect(meta(home, "property", "og:title")).toBe("Nostromo UI");
    expect(home).toContain("<title>Nostromo UI</title>");
  });

  test("the image the card names is actually served", async ({ request }) => {
    // The absolute URL points at production. Its path is what the export has
    // to contain, so ask the local server for the same path.
    const path = new URL(IMAGE).pathname;
    const response = await request.get(`http://localhost:4320${path}`);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toBe("image/png");

    // The dimensions the tags declare are the dimensions of the file. A PNG
    // stores width and height big-endian at bytes 16 and 20.
    const body = await response.body();
    expect(body.readUInt32BE(16)).toBe(1280);
    expect(body.readUInt32BE(20)).toBe(640);
  });
});
