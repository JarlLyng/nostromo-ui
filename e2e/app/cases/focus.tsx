import { Button, Input } from "@jarllyng/nostromo";

/**
 * `:focus-visible` is the point. It is a browser judgement about how focus
 * arrived - keyboard yes, mouse no - and jsdom has no such notion, so every
 * `focus-visible:ring-2` in the library is untested until here.
 */
export function FocusCase() {
  return (
    <div style={{ padding: 24 }} className="space-y-4">
      <Button data-testid="button">Press me</Button>
      <Input aria-label="Name" data-testid="input" />
    </div>
  );
}
