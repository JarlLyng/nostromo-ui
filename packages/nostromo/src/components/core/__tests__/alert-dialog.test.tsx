import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../alert-dialog";

function Example({ onConfirm }: { onConfirm?: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Delete project</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this project?</AlertDialogTitle>
          <AlertDialogDescription>
            This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

describe("AlertDialog", () => {
  it("opens from the trigger with alertdialog semantics", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByText("Delete project"));
    expect(await screen.findByRole("alertdialog")).toBeInTheDocument();
  });

  it("takes its accessible name and description from the title and description", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByText("Delete project"));
    const dialog = await screen.findByRole("alertdialog", {
      name: "Delete this project?",
    });
    expect(dialog).toHaveAccessibleDescription("This cannot be undone.");
  });

  // The reason this is not a Dialog: a confirmation cannot be lost by missing
  // the button.
  it("does not close when the overlay is clicked", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByText("Delete project"));
    await screen.findByRole("alertdialog");

    const overlay = document.querySelector('[data-state="open"].fixed.inset-0');
    fireEvent.pointerDown(overlay!);
    fireEvent.click(overlay!);

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });

  // Escape does close it, and that is correct rather than a gap: a modal a
  // keyboard user cannot leave is a trap. Cancelling is the safe outcome, so
  // nothing is lost.
  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByText("Delete project"));
    await screen.findByRole("alertdialog");
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  // Focus starts on the safe option, so a reflexive Enter cancels rather than
  // deletes. That is the property worth protecting in a destructive confirm.
  it("puts initial focus on Cancel, not on the action", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByText("Delete project"));
    await screen.findByRole("alertdialog");
    expect(screen.getByText("Cancel")).toHaveFocus();
  });

  it("closes from Cancel without running the action", async () => {
    const onConfirm = vi.fn();
    const user = userEvent.setup();
    render(<Example onConfirm={onConfirm} />);

    await user.click(screen.getByText("Delete project"));
    await user.click(await screen.findByText("Cancel"));

    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it("runs the action and closes on confirm", async () => {
    const onConfirm = vi.fn();
    const user = userEvent.setup();
    render(<Example onConfirm={onConfirm} />);

    await user.click(screen.getByText("Delete project"));
    await user.click(await screen.findByText("Delete"));

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  it("styles the action as destructive by default", async () => {
    const user = userEvent.setup();
    render(<Example />);

    await user.click(screen.getByText("Delete project"));
    const action = await screen.findByText("Delete");
    expect(action.className).toContain("destructive");
  });

  it("has no accessibility violations when open", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByText("Delete project"));
    await screen.findByRole("alertdialog");

    // `region` is a page-level rule about landmarks and says nothing about a
    // component fixture. Everything else stays on.
    const results = await axe(document.body, {
      rules: { region: { enabled: false } },
    });
    expect(results.violations).toHaveLength(0);
  });
});
