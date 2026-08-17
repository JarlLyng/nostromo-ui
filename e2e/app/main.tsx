import * as React from "react";
import { createRoot } from "react-dom/client";

import "./app.css";
import { CarouselCase } from "./cases/carousel";
import { CommandCase } from "./cases/command";
import { DrawerCase } from "./cases/drawer";
import { FocusCase } from "./cases/focus";
import { InputOtpCase } from "./cases/input-otp";
import { ResizableCase } from "./cases/resizable";
import { SidebarCase } from "./cases/sidebar";
import { ThemeCase } from "./cases/theme";

/**
 * One page per scenario, chosen with `?case=`.
 *
 * A router rather than one long page, because several of these tests measure
 * geometry and drag things around. Neighbouring fixtures would change the
 * numbers, and a drag that overshoots would land on someone else's component.
 */
const CASES: Record<string, React.ComponentType> = {
  carousel: CarouselCase,
  command: CommandCase,
  drawer: DrawerCase,
  focus: FocusCase,
  "input-otp": InputOtpCase,
  resizable: ResizableCase,
  sidebar: SidebarCase,
  theme: ThemeCase,
};

function App() {
  const name = new URLSearchParams(window.location.search).get("case") ?? "";
  const Case = CASES[name];

  if (!Case) {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui" }}>
        <h1>Nostromo UI E2E fixtures</h1>
        <ul>
          {Object.keys(CASES).map((key) => (
            <li key={key}>
              <a href={`?case=${key}`}>{key}</a>
            </li>
          ))}
        </ul>
      </main>
    );
  }

  return <Case />;
}

createRoot(document.getElementById("root")!).render(<App />);
