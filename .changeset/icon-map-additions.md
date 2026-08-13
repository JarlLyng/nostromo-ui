---
"@jarllyng/nostromo": patch
---

Add `code`, `terminal`, `palette` and `accessibility` to the icon map, plus `home`
as an alias for `house`.

`Icon` resolves its `name` through a lookup and only `console.warn`s on a miss, so
an unknown name renders nothing and the page simply looks empty. The Features
example asked for code, accessibility and palette - none of which existed - and the
Icon documentation page itself shipped `<Icon name="home" />` against a map that
only had `house`. `home` is the name people reach for first, so it is an alias
rather than a correction.
