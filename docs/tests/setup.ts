import { afterEach } from "vitest";

// Without this, React logs "The current testing environment is not configured to
// support act(...)" and act() does not flush updates - which made the first
// version of the example harness read the error state before react-live had set
// it, so every example passed no matter how broken. React only honours the flag
// when it is on globalThis before the first render.
(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

afterEach(() => {
  document.body.innerHTML = "";
});
