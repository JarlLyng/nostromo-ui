import * as React from "react";
import {
  Button,
  ToastProvider,
  useToast,
  useToastNotification,
} from "@jarllyng/nostromo";

/**
 * Notifications are geometry, which is why this fixture exists.
 *
 * The audit that produced #248 measured two 1200px-wide boxes starting at x=-16
 * with 8px between them, in a 1200px viewport. Numbers like that are the whole
 * bug and jsdom cannot produce them.
 *
 * The long text is deliberate: notifications with one short line stack fine by
 * accident, and the failure was about variable height.
 */
const LONG =
  "The transponder signal was traced to a moon in the Zeta II Reticuli system, and the crew has been woken to investigate it under paragraph B2 of the company charter.";

function Controls() {
  const toast = useToastNotification();
  const { toasts } = useToast();

  return (
    <div style={{ padding: 24 }} className="space-y-2">
      <p data-testid="count">{toasts.length}</p>

      <Button
        data-testid="add-two"
        onClick={() => {
          toast.custom({ title: "First", description: LONG, duration: 0 });
          toast.custom({ title: "Second", description: LONG, duration: 0 });
        }}
      >
        Add two
      </Button>

      <Button
        data-testid="add-bottom-left"
        onClick={() =>
          toast.custom({
            title: "Bottom left",
            description: LONG,
            duration: 0,
            position: "bottom-left",
          })
        }
      >
        Add bottom left
      </Button>

      <Button
        data-testid="add-error"
        onClick={() => toast.error("Something went wrong", { duration: 0 })}
      >
        Add error
      </Button>

      <Button data-testid="clear" onClick={() => toast.clear()}>
        Clear
      </Button>
    </div>
  );
}

export function ToastCase() {
  return (
    <ToastProvider>
      <Controls />
    </ToastProvider>
  );
}
