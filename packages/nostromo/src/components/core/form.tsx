import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { cn } from "../../lib/utils";
import { ErrorMessage } from "./error-message";
import { HelperText } from "./helper-text";
import { Label } from "./label";

/**
 * Wires react-hook-form to this library's Label, HelperText and ErrorMessage,
 * and generates the ids that connect them.
 *
 * The three pieces have always existed separately, and connecting them was left
 * to the caller: an id on the input, a matching htmlFor, an aria-describedby
 * listing the description and the error, and aria-invalid toggled by hand. That
 * is four things to get right per field, and the failure is silent - a form that
 * looks correct and tells a screen reader nothing.
 *
 * `FormField` generates one id per field and `FormControl` applies the wiring, so
 * a field is a label, a control and a message with no bookkeeping.
 *
 * ## react-hook-form is an optional peer dependency, and this is not in the barrel
 *
 * `react-hook-form` is around 25kB and most consumers of a component library do
 * not want it forced on them, so it is an optional peer: install it if you use
 * `Form`, and pay nothing if you do not.
 *
 * That only works if importing something unrelated cannot pull it in. A bundler
 * has to *resolve* every import in a module before it can tree-shake anything,
 * so a barrel that re-exported this file would fail to build for anyone without
 * the peer installed, even if they only wanted `Button`. So `Form` is reachable
 * only through its own entry point:
 *
 *     import { Form, FormField } from "@jarllyng/nostromo/components/core/form";
 *
 * Verified rather than assumed - see the react-compat job, which installs the
 * packed tarball into a project with no react-hook-form and imports the barrel.
 */

const Form = FormProvider;

interface FormFieldContextValue {
  name: string;
  id: string;
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(
  null,
);

/**
 * One field: a name, and the ids that tie its parts together.
 *
 * Wraps react-hook-form's `Controller`, so it works with controlled components
 * like `Select` and `Checkbox` as well as with plain inputs.
 */
function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  const id = React.useId();
  const value = React.useMemo(
    () => ({ name: props.name as string, id }),
    [props.name, id],
  );
  return (
    <FormFieldContext.Provider value={value}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

/**
 * The ids and error state for the field being rendered.
 *
 * Throws rather than returning undefined when used outside a `FormField`. The
 * quiet alternative is a label whose `htmlFor` points at nothing, which is the
 * exact class of silent breakage this component exists to remove.
 */
function useFormField() {
  const field = React.useContext(FormFieldContext);
  if (!field) {
    throw new Error(
      "useFormField must be used inside a <FormField>. Without it there is no field id to attach a label or a message to.",
    );
  }
  const { errors } = useFormState({ name: field.name });
  // Nested names like "address.city" reach into the error object.
  const error = field.name
    .split(".")
    .reduce<unknown>(
      (acc, key) => (acc as Record<string, unknown>)?.[key],
      errors,
    );

  return {
    name: field.name,
    formItemId: field.id,
    formDescriptionId: `${field.id}-description`,
    formMessageId: `${field.id}-message`,
    error: error as { message?: string } | undefined,
  };
}

function FormItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-1.5", className)} {...props} />;
}
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();
  return (
    <Label
      ref={ref}
      htmlFor={formItemId}
      className={cn(error && "text-destructive", className)}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

/**
 * Applies the wiring to whatever control it wraps.
 *
 * A `Slot`, so it passes the id and the aria attributes to the child rather than
 * rendering an element of its own. `aria-describedby` lists the description and,
 * when there is one, the message - both, because a field can have guidance and
 * an error at the same time and a screen reader should hear both.
 */
const FormControl = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();
  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId
      }
      aria-invalid={error ? true : undefined}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  React.ElementRef<typeof HelperText>,
  React.ComponentPropsWithoutRef<typeof HelperText>
>(({ ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return <HelperText ref={ref} id={formDescriptionId} {...props} />;
});
FormDescription.displayName = "FormDescription";

/**
 * The field's error, or nothing.
 *
 * Renders the validation message when there is one and `children` otherwise, so
 * a field can carry a persistent hint that the error replaces. Renders nothing
 * at all when there is neither, rather than an empty element that still takes up
 * space in the layout.
 */
const FormMessage = React.forwardRef<
  React.ElementRef<typeof ErrorMessage>,
  React.ComponentPropsWithoutRef<typeof ErrorMessage>
>(({ children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error?.message ?? children;
  if (!body) return null;

  return (
    <ErrorMessage ref={ref} id={formMessageId} {...props}>
      {body}
    </ErrorMessage>
  );
});
FormMessage.displayName = "FormMessage";

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
  useFormContext,
};
