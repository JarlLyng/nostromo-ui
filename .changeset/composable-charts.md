---
"@jarllyng/nostromo": minor
---

Add a composable chart API alongside `Chart`, and fix multi-line imports in the
documentation previews.

`<Chart type="..." />` renders one series type from a `dataKeys` array. That shape
cannot express a stacked bar, a bar and a line together, a second axis, or a
reference line - and no additional `type` string fixes it, because the limitation
is that the chart is one prop rather than a tree.

```tsx
<ChartContainer data={data} height={320} ariaLabel="Visitors against target">
  <ChartGrid />
  <ChartXAxis dataKey="month" />
  <ChartYAxis />
  <ChartTooltip />
  <ChartLegend />
  <ChartBar dataKey="desktop" stackId="devices" />
  <ChartBar dataKey="mobile" stackId="devices" />
  <ChartLine dataKey="target" />
</ChartContainer>
```

New exports: `ChartContainer`, `ChartGrid`, `ChartXAxis`, `ChartYAxis`,
`ChartTooltip`, `ChartLegend`, `ChartBar`, `ChartLine`, `ChartArea`,
`ChartReferenceLine`, and `chartPalette`. Also available as
`@jarllyng/nostromo/components/core/chart-composable`.

**`Chart` is unchanged and stays supported.** This is additive, which is why it is
a minor rather than the breaking rewrite it was originally scoped as.

Each series takes its colour from the container's palette in tree order, keyed by
`dataKey` rather than by a render counter - so adding a series does not recolour
the ones already there, and StrictMode's double invoke cannot shuffle them. Pass
`color` on a series or `colors` on the container to override.

Also fixes a transform bug this surfaced: `LiveCode` stripped import _lines_
rather than import _statements_, so an example whose import wrapped across lines
left `ChartContainer,` and `} from '@jarllyng/nostromo'` behind as loose tokens
and the preview threw a SyntaxError. Any documentation example with a wrapped
import was affected, not only the new ones.
