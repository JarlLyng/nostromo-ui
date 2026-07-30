---
"@jarllyng/nostromo": minor
---

Refresh dependency resolutions and remove `useBundleSize`

All in-range dependency resolutions updated (Radix, recharts, date-fns and the
rest), clearing the bulk of the open security advisories - including `next`
16.2.12 for the docs site.

`useBundleSize` is removed. It did not measure anything: it counted script tags
containing "nostromo" and multiplied by 10000. An API that returns fabricated
data is worse than no API. Nothing has been published yet, so no consumer can be
depending on it. Real bundle numbers live in the size-limit budgets enforced in
CI.
