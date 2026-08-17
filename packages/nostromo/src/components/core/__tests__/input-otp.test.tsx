import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { axe } from "jest-axe";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../input-otp";

function Code({
  maxLength = 6,
  onComplete,
  ...props
}: {
  maxLength?: number;
  onComplete?: (code: string) => void;
} & Record<string, unknown>) {
  const indices = Array.from({ length: maxLength }, (_, i) => i);
  const half = Math.ceil(maxLength / 2);
  return (
    <InputOTP maxLength={maxLength} onComplete={onComplete} {...props}>
      <InputOTPGroup>
        {indices.slice(0, half).map((i) => (
          <InputOTPSlot key={i} index={i} />
        ))}
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        {indices.slice(half).map((i) => (
          <InputOTPSlot key={i} index={i} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}

const slots = () =>
  Array.from(document.querySelectorAll("[data-active]")) as HTMLElement[];

/**
 * jsdom does not implement `document.elementFromPoint`, and input-otp calls it
 * on every click to work out which box was hit. Without this, each click throws
 * "document.elementFromPoint is not a function" into the test output. `null` is
 * the honest answer here - hit-testing needs layout and jsdom has none - and it
 * is what the caller already handles for a click that lands on nothing.
 *
 * Deliberately local, not in src/test/setup.ts. Putting it there breaks the axe
 * assertions in alert-dialog, context-menu, dropdown-menu, menubar and sheet:
 * axe uses `elementFromPoint` to decide whether an element is on screen, and a
 * stub that answers "nothing is here" flips it to reporting `aria-hidden-focus`
 * on the trigger that Radix aria-hides behind an open modal. Five green tests
 * turned red the first time this was global. Keep it in this file.
 */
const noElementFromPoint = () => null;
let hadElementFromPoint: typeof document.elementFromPoint | undefined;
beforeAll(() => {
  hadElementFromPoint = document.elementFromPoint;
  document.elementFromPoint = noElementFromPoint;
});
afterAll(() => {
  if (hadElementFromPoint) document.elementFromPoint = hadElementFromPoint;
  else delete (document as Partial<Document>).elementFromPoint;
});

describe("InputOTP", () => {
  // The whole design: one input, so the browser can autofill and paste into it.
  it("is a single text field, not one per digit", () => {
    render(<Code />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(1);
    expect(inputs[0]).toHaveAttribute("autocomplete", "one-time-code");
    expect(inputs[0]).toHaveAttribute("inputmode", "numeric");
    expect(inputs[0]).toHaveAttribute("maxlength", "6");
  });

  it("puts one typed character in each box", async () => {
    const user = userEvent.setup();
    render(<Code />);
    await user.type(screen.getByRole("textbox"), "1234");

    const boxes = slots();
    expect(boxes).toHaveLength(6);
    expect(boxes.slice(0, 4).map((b) => b.textContent)).toEqual([
      "1",
      "2",
      "3",
      "4",
    ]);
    expect(boxes[4]!.textContent).toBe("");
  });

  it("marks the box being typed into as active", async () => {
    const user = userEvent.setup();
    render(<Code />);
    await user.type(screen.getByRole("textbox"), "12");
    expect(slots()[2]).toHaveAttribute("data-active", "true");
    expect(slots()[1]).toHaveAttribute("data-active", "false");
  });

  it("clears the last box on backspace", async () => {
    const user = userEvent.setup();
    render(<Code />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    await user.type(input, "123");
    await user.keyboard("{Backspace}");
    expect(input.value).toBe("12");
    expect(slots()[2]!.textContent).toBe("");
  });

  // Pasting a whole code is the normal way one of these gets filled in.
  it("accepts a pasted code", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(<Code onComplete={onComplete} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    await user.click(input);
    await user.paste("135790");

    expect(input.value).toBe("135790");
    expect(slots().map((b) => b.textContent)).toEqual([
      "1",
      "3",
      "5",
      "7",
      "9",
      "0",
    ]);
    expect(onComplete).toHaveBeenCalledWith("135790");
  });

  it("stops at maxLength", async () => {
    const user = userEvent.setup();
    render(<Code maxLength={4} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    await user.type(input, "123456");
    expect(input.value).toBe("1234");
  });

  // The boxes carry no information a screen reader can use - the value lives on
  // the input. Announcing them as well would read the code out twice.
  it("hides the decoration from a screen reader", () => {
    render(<Code />);
    for (const box of slots())
      expect(box).toHaveAttribute("aria-hidden", "true");
    expect(
      document.querySelector("[role='separator']"),
    ).not.toBeInTheDocument();
  });

  it("keeps the pattern restriction it is given", async () => {
    const user = userEvent.setup();
    render(<Code pattern="^\d+$" />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    await user.type(input, "12ab34");
    expect(input.value).toBe("1234");
  });

  // A slot index past maxLength is a silent blank box otherwise, which looks
  // like a styling problem rather than an off-by-one.
  it("throws on a slot index outside the code", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      render(
        <InputOTP maxLength={2}>
          <InputOTPSlot index={5} />
        </InputOTP>,
      ),
    ).toThrow(/index 5 is outside the code. maxLength is 2/);
    spy.mockRestore();
  });

  it("throws when a slot is used outside an InputOTP", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<InputOTPSlot index={0} />)).toThrow(
      /must be used inside an <InputOTP>/,
    );
    spy.mockRestore();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <div>
        <label htmlFor="otp">One-time code</label>
        <InputOTP maxLength={2} id="otp">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
        </InputOTP>
      </div>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
