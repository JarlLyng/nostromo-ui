---
"@jarllyng/nostromo": patch
---

Table: selection no longer picks the wrong records, includes disabled ones, or
erases the rest of the selection.

Three defects from the 2026-09-12 audit (#239), all of which 33 existing tests
passed straight through. DataTable consumers using `selection` get the same fixes.

**A key of zero became another record's key.** `record[rowKey] || index` read
`id: 0` as absent and used the row's position instead, so a zero-keyed record at
index 1 reported itself as key `1`. The fallback is nullish now, so `0` and `""`
are kept.

**Select-all compared the wrong two numbers.** It tested `selectedRowKeys.length`
against the number of visible rows, so two rows selected on another page made
select-all read as checked with nothing on screen selected. Checked and
indeterminate are now derived from the selectable rows on this page.

**Select-all replaced the selection.** It emitted every visible key, or an empty
array, so pressing it on page two discarded page one, and it selected rows the
consumer had disabled through `getCheckboxProps`. It now adds or removes this
page's selectable rows and leaves every other key alone. A disabled row is also
ignored when its own checkbox is clicked.

One behaviour is now documented rather than changed: `onChange` passes the
complete key list, but the records array only contains rows present in `data`,
because the component is never given the others. Paginating server-side means
keeping your own key-to-record map.
