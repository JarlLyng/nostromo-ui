/**
 * Renders a cross-section of the library through react-dom/server.
 *
 * Runs inside a throwaway project that installed the packed tarball, so it sees
 * exactly what a consumer sees: the `files` allowlist, the `exports` map, and
 * whatever React version that project resolved.
 *
 * Server rendering is deliberate - no jsdom, no test runner, nothing that could
 * paper over a React incompatibility with a shim.
 */
import { createElement as h } from "react";
import { renderToString } from "react-dom/server";
import {
  Alert,
  Avatar,
  Badge,
  Card,
  Input,
  Label,
  Progress,
  Separator,
} from "@jarllyng/nostromo";
// A per-component entry point, because that is a separate export path and can
// break on its own.
import { Button } from "@jarllyng/nostromo/components/core/button";

const cases = {
  Button: () => h(Button, null, "Click"),
  "Button asChild": () =>
    h(Button, { asChild: true }, h("a", { href: "/x" }, "Link")),
  "Button loading": () =>
    h(Button, { loading: true, loadingText: "Wait" }, "Submit"),
  Badge: () => h(Badge, { variant: "destructive" }, "Error"),
  "Card compound": () =>
    h(
      Card,
      null,
      h(Card.Header, null, h(Card.Title, null, "T")),
      h(Card.Content, null, "C"),
    ),
  Alert: () => h(Alert, { variant: "warning" }, "Careful"),
  Input: () => h(Input, { placeholder: "x" }),
  Progress: () => h(Progress, { value: 42 }),
  "Avatar compound": () => h(Avatar, null, h(Avatar.Fallback, null, "NU")),
  Separator: () => h(Separator, null),
  Label: () => h(Label, null, "L"),
};

const { default: reactPkg } = await import("react/package.json", {
  with: { type: "json" },
});

let failed = 0;
for (const [name, make] of Object.entries(cases)) {
  try {
    const html = renderToString(make());
    if (!html || html.length < 5) throw new Error("rendered nothing");
    process.stdout.write(`    ok       ${name}\n`);
  } catch (error) {
    failed += 1;
    process.stdout.write(`    FAILED   ${name}: ${error.message}\n`);
  }
}

process.stdout.write(
  `  react ${reactPkg.version}: ${Object.keys(cases).length - failed}/${Object.keys(cases).length} rendered\n`,
);
process.exit(failed ? 1 : 0);
