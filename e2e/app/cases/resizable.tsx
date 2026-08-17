import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@jarllyng/nostromo";

/**
 * The panels are addressed by `id`, not by a test id.
 *
 * react-resizable-panels writes its own `data-testid` onto each element, derived
 * from the `id` - so a `data-testid` passed in gets overwritten, and one put on a
 * child ends up matching twice. `id` is a documented prop and lands on the element
 * that actually resizes, which is the one the tests need to measure.
 */
export function ResizableCase() {
  return (
    <div style={{ padding: 24 }}>
      <div style={{ height: 240, width: 600 }} data-testid="frame">
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel defaultSize="50" minSize="20" id="left">
            <div className="h-full bg-muted p-2 text-sm">Left</div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="50" minSize="20" id="right">
            <div className="h-full bg-card p-2 text-sm">Right</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/*
        The documented trap: the group writes width and height as inline styles,
        so a height class on it is a silent no-op. Both are here so the styling
        test can watch the class lose and the style win, in a real cascade rather
        than by reading the source.
      */}
      <div style={{ marginTop: 24 }}>
        <ResizablePanelGroup className="h-96" id="group-with-class">
          <ResizablePanel>
            <div className="text-sm">Height by class</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div style={{ marginTop: 24 }}>
        <ResizablePanelGroup style={{ height: "10rem" }} id="group-with-style">
          <ResizablePanel>
            <div className="text-sm">Height by style</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
