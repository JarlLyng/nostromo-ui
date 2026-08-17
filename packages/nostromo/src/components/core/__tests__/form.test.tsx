import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { axe } from "jest-axe";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";

import { Button } from "../button";
import { Checkbox } from "../checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "../form";
import { Input } from "../input";

interface Values {
  email: string;
  terms: boolean;
  address: { city: string };
}

function Example({ onSubmit }: { onSubmit?: (values: Values) => void }) {
  const form = useForm<Values>({
    defaultValues: { email: "", terms: false, address: { city: "" } },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((v) => onSubmit?.(v))}>
        <FormField
          control={form.control}
          name="email"
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                We only use this to sign you in.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address.city"
          rules={{ required: "City is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="terms"
          rules={{ required: "You must accept the terms" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Accept terms</FormLabel>
              <FormControl>
                {/* This library's Checkbox is a native input, so it is
                    `checked` and `onChange` rather than Radix's
                    `onCheckedChange`. react-hook-form reads target.checked off
                    the event, so field.onChange can be passed straight in. */}
                <Checkbox
                  name={field.name}
                  ref={field.ref}
                  checked={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

describe("Form", () => {
  // The whole point: four things that had to be wired by hand per field, and
  // whose failure is silent.
  it("connects the label to the control", () => {
    render(<Example />);
    // getByLabelText only finds it if htmlFor and id actually match.
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("points aria-describedby at the description", () => {
    render(<Example />);
    const input = screen.getByLabelText("Email");
    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();

    const description = screen.getByText("We only use this to sign you in.");
    expect(describedBy!.split(" ")).toContain(description.id);
  });

  it("renders no message until there is an error", () => {
    render(<Example />);
    expect(screen.queryByText("Email is required")).not.toBeInTheDocument();
  });

  it("shows the validation message and marks the control invalid", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  // A field can have guidance and an error at once, and a screen reader should
  // hear both rather than only the newer one.
  it("describes the control by both the description and the message", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole("button", { name: "Submit" }));
    await screen.findByText("Email is required");

    const input = screen.getByLabelText("Email");
    const ids = input.getAttribute("aria-describedby")!.split(" ");
    expect(ids).toHaveLength(2);
    expect(ids).toContain(
      screen.getByText("We only use this to sign you in.").id,
    );
    expect(ids).toContain(screen.getByText("Email is required").id);
  });

  // Nested names reach into the error object, so "address.city" has to be walked
  // rather than looked up as a single key.
  it("finds the error for a nested field name", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(await screen.findByText("City is required")).toBeInTheDocument();
  });

  // Through Controller, so a checkbox works as well as a text input.
  it("drives a controlled component", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(
      await screen.findByText("You must accept the terms"),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("checkbox"));
    await waitFor(() =>
      expect(
        screen.queryByText("You must accept the terms"),
      ).not.toBeInTheDocument(),
    );
  });

  it("submits the values once it validates", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<Example onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Email"), "jarl@example.com");
    await user.type(screen.getByLabelText("City"), "Copenhagen");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "jarl@example.com",
        terms: true,
        address: { city: "Copenhagen" },
      }),
    );
  });

  // Throwing beats returning undefined here. The quiet alternative is a label
  // whose htmlFor points at nothing, which is the failure this exists to remove.
  it("throws when used outside a FormField", () => {
    function Orphan() {
      useFormField();
      return null;
    }
    // React logs the error boundary trace; silence it for this one assertion.
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Orphan />)).toThrow(
      /must be used inside a <FormField>/,
    );
    spy.mockRestore();
  });

  it("has no accessibility violations, with and without errors", async () => {
    const user = userEvent.setup();
    const { container } = render(<Example />);

    let results = await axe(container);
    expect(results.violations).toHaveLength(0);

    await user.click(screen.getByRole("button", { name: "Submit" }));
    await screen.findByText("Email is required");

    results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
