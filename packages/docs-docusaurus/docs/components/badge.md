# Badge

Displays a badge or a component that looks like a badge. Perfect for status indicators, labels, and small pieces of information. Built with Tailwind CSS and fully customizable.

## Installation

Install the Badge component and its dependencies.

```bash
# Install with pnpm
pnpm add @nostromo/ui-core
```

## Basic Usage

```tsx
import { Badge } from '@nostromo/ui-core/badge'

export function BadgeExample() {
  return (
    <div className="flex gap-4">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
}
```

## Variants

Badges come in different variants to suit different use cases and visual hierarchies.

```tsx
import { Badge } from '@nostromo/ui-core/badge'

export function BadgeVariants() {
  return (
    <div className="flex gap-4 flex-wrap">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  )
}
```

## Custom Colors

You can customize badge colors using Tailwind CSS classes.

```tsx
import { Badge } from '@nostromo/ui-core/badge'

export function BadgeColors() {
  return (
    <div className="flex gap-4 flex-wrap">
      <Badge className="bg-brand-500">Brand</Badge>
      <Badge className="bg-success-500">Success</Badge>
      <Badge className="bg-warning-500">Warning</Badge>
      <Badge className="bg-error-500">Error</Badge>
      <Badge className="bg-info-500">Info</Badge>
    </div>
  )
}
```

## API Reference

### Badge Props

All the props available for the Badge component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "secondary" \| "outline" \| "destructive"` | `"default"` | The visual style variant of the badge |
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `ReactNode` | `undefined` | The content of the badge |

## Accessibility

### WCAG 2.1 AA Compliant

The Badge component follows accessibility best practices.

- Semantic HTML structure with proper roles
- High contrast ratios for all variants
- Screen reader friendly with appropriate ARIA attributes
- Keyboard navigation support
- Color is not the only way to convey information
