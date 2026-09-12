import * as React from "react";
import { Button } from "@jarllyng/nostromo";

/**
 * Whether a disabled link actually navigates.
 *
 * jsdom can only report `defaultPrevented`, which is a proxy for the thing that
 * matters. A browser either changes the URL or it does not, and that is the
 * question #243 was really about.
 *
 * The targets are same-page hashes so a navigation is visible in `location` and
 * cheap to detect.
 */
export function ButtonLinkCase() {
  const [clicks, setClicks] = React.useState<string[]>([]);
  const record = (who: string) => () =>
    setClicks((previous) => [...previous, who]);

  return (
    <div style={{ padding: 24 }} className="space-y-3">
      <p data-testid="clicks">{clicks.join(",")}</p>

      <Button asChild disabled onClick={record("parent-disabled")}>
        <a
          href="#disabled"
          data-testid="disabled-link"
          onClick={record("child-disabled")}
        >
          Disabled link
        </a>
      </Button>

      <Button asChild loading onClick={record("parent-loading")}>
        <a
          href="#loading"
          data-testid="loading-link"
          onClick={record("child-loading")}
        >
          Loading link
        </a>
      </Button>

      <Button asChild onClick={record("parent-enabled")}>
        <a
          href="#enabled"
          data-testid="enabled-link"
          onClick={record("child-enabled")}
        >
          Enabled link
        </a>
      </Button>
    </div>
  );
}
