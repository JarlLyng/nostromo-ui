# Badge

Displays a badge or a component that looks like a badge. Perfect for status indicators, labels, and small pieces of information.

## Installation

```bash
pnpm add @nostromo/ui-core
```

## Basic Usage

```tsx
import { Badge } from '@nostromo/ui-core'

<div className="flex gap-4">
  <Badge>Default</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="outline">Outline</Badge>
</div>
```

## API Reference

### Badge Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "secondary" \| "outline" \| "destructive"` | `"default"` | Visual style variant |
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `ReactNode` | `undefined` | Badge content |