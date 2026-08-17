import * as React from "react";
import { OTPInput, OTPInputContext, type OTPInputProps } from "input-otp";
import { Minus } from "phosphor-react";

import { cn } from "../../lib/utils";

/**
 * A one-time code, one character per box.
 *
 * There is exactly one `<input>`, stretched across the whole row and made
 * invisible. The boxes are divs that read their character out of context. That
 * is what makes paste, autofill, `autocomplete="one-time-code"`, backspace and
 * mobile keyboards work: the browser sees a single ordinary text field. A row of
 * six real inputs looks the same and gets all of that wrong.
 *
 * The consequence, and the one thing worth knowing: the caret you see is drawn
 * by CSS, because the real caret is not where the boxes are.
 *
 * ## Slots are positional
 *
 * `InputOTPSlot` takes an `index`, and the indices must run 0..maxLength-1 in
 * document order. Nothing enforces it, because the boxes are yours to arrange -
 * `InputOTPSeparator` sits between groups, and the grouping is a visual choice
 * that this component should not make for you.
 */

/**
 * `containerClassName` styles the row of boxes; `className` styles the hidden
 * input.
 *
 * A re-export rather than an interface of our own. The upstream type is a union
 * - `render` or `children`, never both - and `interface extends` flattens a
 * union into one object with every member optional, which would let both through
 * at once. Same reason the props below are spread whole instead of destructured:
 * `Omit` over a union collapses it too.
 */
export type InputOTPProps = OTPInputProps;

const InputOTP = React.forwardRef<HTMLInputElement, InputOTPProps>(
  (props, ref) => (
    <OTPInput
      {...props}
      ref={ref}
      containerClassName={cn(
        "flex items-center gap-2 has-[:disabled]:opacity-50",
        props.containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", props.className)}
    />
  ),
);
InputOTP.displayName = "InputOTP";

/**
 * One group of boxes.
 *
 * The boxes inside a group share borders, so the group reads as one field split
 * into cells rather than as separate inputs.
 */
const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

export interface InputOTPSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Position in the code, from 0. Must match the order on screen. */
  index: number;
}

const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ index, className, ...props }, ref) => {
    // The upstream context has a default value rather than null, so the check
    // is for the slots it should be carrying, not for the context itself.
    const context = React.useContext(OTPInputContext);
    if (!context?.slots) {
      throw new Error("InputOTPSlot must be used inside an <InputOTP>.");
    }
    const slot = context.slots[index];
    if (!slot) {
      throw new Error(
        `InputOTPSlot index ${index} is outside the code. maxLength is ${context.slots.length}, so the last index is ${context.slots.length - 1}.`,
      );
    }
    const { char, hasFakeCaret, isActive } = slot;

    return (
      <div
        ref={ref}
        // The boxes are decoration. Everything a screen reader needs is on the
        // one real input, so announcing 6 empty divs on top of it is noise.
        aria-hidden="true"
        data-active={isActive}
        className={cn(
          "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all",
          "first:rounded-l-md first:border-l last:rounded-r-md",
          "data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-2 data-[active=true]:ring-ring/20",
          className,
        )}
        {...props}
      >
        {char}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-5 w-px animate-caret-blink bg-foreground" />
          </div>
        )}
      </div>
    );
  },
);
InputOTPSlot.displayName = "InputOTPSlot";

/** A gap between groups. Decorative, so it is hidden rather than announced. */
const InputOTPSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    aria-hidden="true"
    className={cn("text-muted-foreground", className)}
    {...props}
  >
    <Minus className="h-4 w-4" />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
