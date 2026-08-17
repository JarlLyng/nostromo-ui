import * as React from "react";
import { Badge, Button, Card, CardContent } from "@jarllyng/nostromo";

const THEMES = ["nostromo", "mother", "lv-426", "sulaco"] as const;
const SCHEMES = ["light", "dark"] as const;

/**
 * Switches `data-theme` and `data-color-scheme` on `<html>` at runtime.
 *
 * This is the one page that tests the theming architecture rather than a
 * component. The `@theme inline` bridge is supposed to keep the `var()` reference
 * inside each generated utility, so that flipping the attribute re-resolves every
 * colour without rebuilding anything. That claim is load-bearing - it is the whole
 * reason the token layer is namespaced - and nothing could check it before, because
 * checking it means asking a real cascade what colour something ended up.
 */
export function ThemeCase() {
  const [theme, setTheme] = React.useState<string>("nostromo");
  const [scheme, setScheme] = React.useState<string>("light");

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.colorScheme = scheme;
  }, [theme, scheme]);

  return (
    <div style={{ padding: 24 }} className="space-y-4 bg-background">
      <div className="flex flex-wrap gap-2">
        {THEMES.map((name) => (
          <button
            key={name}
            type="button"
            data-testid={`theme-${name}`}
            onClick={() => setTheme(name)}
          >
            {name}
          </button>
        ))}
        {SCHEMES.map((name) => (
          <button
            key={name}
            type="button"
            data-testid={`scheme-${name}`}
            onClick={() => setScheme(name)}
          >
            {name}
          </button>
        ))}
      </div>

      <Card data-testid="card">
        <CardContent className="space-y-3 p-4">
          <p data-testid="body" className="text-foreground">
            Body text on the card surface.
          </p>
          <p data-testid="muted" className="text-muted-foreground">
            Muted text.
          </p>
          <Button data-testid="primary">Primary</Button>
          <Badge data-testid="badge">Badge</Badge>
          <div
            data-testid="sidebar-surface"
            className="rounded-md border border-sidebar-border bg-sidebar p-2 text-sidebar-foreground"
          >
            Sidebar surface
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
