---
"@jarllyng/nostromo": patch
---

Dropped `engines.pnpm` from the published package.

It said `>=9.0.0`, which is a claim about _your_ environment: install this with
pnpm 9 and pnpm would have had grounds to complain, for a library that has no pnpm
requirement of any kind. `engines.node` stays, because that one is real.

This came out of moving the workspace itself to pnpm 10 and changesets 3, which is
otherwise invisible from the outside: no dependency of the published package
changed, and the tarball is byte-for-byte the same shape.
