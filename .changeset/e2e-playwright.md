---
"@jarllyng/nostromo": patch
---

No change to the published package. Adding a changeset only because the browser
test suite found two things worth writing down, and neither is visible from the
package itself.

Both were races against animations, not defects:

- Reading a computed colour straight after a theme switch catches the transition
  mid-flight. Nostromo's dark card is `0 0% 15%`, about `rgb(38,38,38)`, and it
  read back as `rgb(241,241,241)`. Waiting for the value to stop changing was not
  enough either: a slow transition hands out two identical samples while still
  moving, which passed on macOS and failed on Linux WebKit.
- Grabbing a Drawer while it is still sliding in makes vaul measure the drag from
  a moving origin. That looked like a WebKit bug - the same drag dismissed the
  drawer in Chromium and not in WebKit - and was a race in the test.

Everything the components claim held up: the four themes all switch at runtime and
switch back exactly, `sr-only` clips as documented, `animate-caret-blink` runs and
stops under `prefers-reduced-motion`, the sidebar tokens resolve, and Resizable's
documented no-op - a height class on the group losing to the inline style - is
real in a browser cascade too.
