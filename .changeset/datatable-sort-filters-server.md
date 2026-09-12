---
"@jarllyng/nostromo": minor
---

DataTable: sorting emits once, server-supplied rows are left alone, and filters
keep their types.

Three findings from the 2026-09-12 audit, all of which 21 existing tests passed
straight through.

**Controlled sorting fired twice with the wrong values (#236).** The two
controlled setters each emitted `onSortChange` on their own, and each read the
other value from the render it was created in. Clicking Age on a table sorted by
name descending produced `("age", "desc")` and then `("name", "asc")`: two
requests, the second restoring the old column. A consumer writing both values back
from the callback, which is what the docs show, ended up where it started. It also
never fired for a controlled table that started unsorted.

One click now emits one call carrying both new values.

**New `manualSearch`, `manualFiltering` and `manualSorting` (#237).** Passing
`searchTerm`, `columnFilters` or `sortColumn` made DataTable controlled but it
kept processing the rows anyway. For a server-backed table that is wrong: a server
searching without accent distinctions returns `{ name: "José" }` for `jose`, and
the local substring filter then dropped the row while `totalItems` still counted
it. Controlled sorting reordered the page the server had already ordered.

Controlled state and processing ownership are separate now. Set these when the
rows arriving in `data` are already searched, filtered or sorted; the callbacks
still fire. Nothing changes for client-side use, controlled or not. Pagination
already worked this way under a different name: it is manual when `currentPage`
and `totalItems` are both given.

**Boolean and numeric filters could not express false, zero or empty (#238).** A
`boolean` filter rendered a text input, and `Boolean("false")` is `true`, so
asking for the false records returned the true ones. It is a three-state select
now: all, yes, no.

A `number` filter that was emptied applied `Number("") === 0` and left only the
zero-valued rows. An empty box is no filter now, and an explicitly entered `0`
still filters for zero. Both controls also stop blanking legitimate `0` and
`false` values, which `String(value || "")` did.
