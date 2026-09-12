import { expect, test, type Page } from "@playwright/test";

/**
 * Which column a date lands in, measured rather than counted.
 *
 * The audit behind #240 found September 1 and the "Mon" heading at the same
 * x-coordinate with the outside dates hidden - the date was a whole column to the
 * left of its weekday, and so was every other date in the month. A unit test can
 * count the spacer cells; only a browser can say where the cell ended up.
 */
async function openCalendar(page: Page, query: string) {
  await page.goto(`/?case=calendar&${query}`);
  await page
    .getByRole("button", { name: /open calendar|select date/i })
    .click();
  await expect(
    page.getByRole("button", { name: /previous month/i }),
  ).toBeVisible();
}

/** The x-centre of a heading, by its text. */
async function headingX(page: Page, name: string) {
  const box = (await page
    .locator(`[aria-label="Calendar"] div`, {
      hasText: new RegExp(`^${name}$`),
    })
    .first()
    .boundingBox())!;
  return box.x + box.width / 2;
}

async function dayX(page: Page, label: string | RegExp) {
  const box = (await page
    .getByLabel(label, typeof label === "string" ? { exact: true } : {})
    .boundingBox())!;
  return box.x + box.width / 2;
}

test.describe("Calendar weekday alignment", () => {
  // September 2026 starts on a Tuesday.
  // The label of the 1st is spelled out per case rather than matched loosely:
  // with the outside dates shown, the grid also contains the 1st of the *next*
  // month in its trailing cells, and a pattern for "something 1, someyear" hits
  // both.
  const cases = [
    {
      name: "Monday-first",
      query: "month=2026-09&first=1",
      heading: "Tue",
      first: "Tuesday, September 1, 2026",
    },
    {
      name: "Sunday-first",
      query: "month=2026-09&first=0",
      heading: "Tue",
      first: "Tuesday, September 1, 2026",
    },
    // February 2027 starts on a Monday: the first column, so nothing is held
    // open and an off-by-one would be invisible in the Monday-first case above.
    {
      name: "month starting Monday",
      query: "month=2027-02&first=1",
      heading: "Mon",
      first: "Monday, February 1, 2027",
    },
    // November 2026 starts on a Sunday, the last column of a Monday-first week.
    {
      name: "month starting Sunday",
      query: "month=2026-11&first=1",
      heading: "Sun",
      first: "Sunday, November 1, 2026",
    },
  ];

  for (const { name, query, heading, first: firstLabel } of cases) {
    test(`puts the 1st under its weekday with outside days hidden (${name})`, async ({
      page,
    }) => {
      await openCalendar(page, `${query}&outside=false`);

      const first = await dayX(page, firstLabel);
      const column = await headingX(page, heading);
      expect(Math.abs(first - column)).toBeLessThan(4);
    });

    test(`agrees with itself when outside days are shown (${name})`, async ({
      page,
    }) => {
      await openCalendar(page, `${query}&outside=true`);

      const first = await dayX(page, firstLabel);
      const column = await headingX(page, heading);
      expect(Math.abs(first - column)).toBeLessThan(4);
    });
  }

  // A short month and a long one, so the last row is not assumed.
  test("keeps the last day of a 28-day month under its weekday", async ({
    page,
  }) => {
    await openCalendar(page, "month=2027-02&first=1&outside=false");

    // 28 February 2027 is a Sunday.
    const last = await dayX(page, /sunday, february 28, 2027/i);
    const column = await headingX(page, "Sun");
    expect(Math.abs(last - column)).toBeLessThan(4);
  });

  test("keeps the last day of a 31-day month under its weekday", async ({
    page,
  }) => {
    await openCalendar(page, "month=2026-12&first=1&outside=false");

    // 31 December 2026 is a Thursday.
    const last = await dayX(page, /thursday, december 31, 2026/i);
    const column = await headingX(page, "Thu");
    expect(Math.abs(last - column)).toBeLessThan(4);
  });
});

test.describe("Calendar keyboard focus", () => {
  // The reported failure, in the browser that reported it: with Tuesdays
  // disabled, ArrowRight from a Monday left the only tabIndex=0 on a disabled
  // button, which cannot take focus - so the grid had no reachable date and
  // pressing the key again did nothing.
  test("moves past a disabled day instead of stalling on it", async ({
    page,
  }) => {
    await openCalendar(
      page,
      "month=2026-09&first=1&outside=false&disabledDays=2",
    );

    const monday = page.getByLabel(/monday, september 14, 2026/i);
    await monday.focus();
    await expect(monday).toBeFocused();

    await page.keyboard.press("ArrowRight");
    await expect(
      page.getByLabel(/wednesday, september 16, 2026/i),
    ).toBeFocused();

    await page.keyboard.press("ArrowRight");
    await expect(
      page.getByLabel(/thursday, september 17, 2026/i),
    ).toBeFocused();
  });

  test("leaves exactly one reachable date in the grid", async ({ page }) => {
    await openCalendar(
      page,
      "month=2026-09&first=1&outside=false&disabledDays=2",
    );

    const stops = page.locator(
      '[aria-label="Calendar"] button[aria-selected][tabindex="0"]',
    );
    await expect(stops).toHaveCount(1);
    await expect(stops.first()).toBeEnabled();
  });

  test("can be tabbed into and then driven with the arrows", async ({
    page,
  }) => {
    await openCalendar(
      page,
      "month=2026-09&first=1&outside=false&disabledDays=2",
    );

    const stop = page.locator(
      '[aria-label="Calendar"] button[aria-selected][tabindex="0"]',
    );
    await stop.focus();
    await expect(stop).toBeFocused();

    await page.keyboard.press("ArrowDown");
    const focused = page.locator('[aria-label="Calendar"] button:focus');
    await expect(focused).toHaveCount(1);
    await expect(focused).toBeEnabled();
  });
});
