# Card

Displays a card with optional header, content, and footer sections. Perfect for organizing content into distinct sections with consistent spacing and styling.

## Installation

Install the Card component and its dependencies.

```bash
# Install with pnpm
pnpm add @nostromo/ui-core
```

## Basic Usage

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nostromo/ui-core/card'

export function CardExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content area.</p>
      </CardContent>
    </Card>
  )
}
```

## Variants

Cards can be customized with different borders and styling.

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nostromo/ui-core/card'

export function CardVariants() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>Standard card styling</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a default card.</p>
        </CardContent>
      </Card>
      
      <Card className="border-brand-500">
        <CardHeader>
          <CardTitle>Branded Card</CardTitle>
          <CardDescription>Card with brand border</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has a brand-colored border.</p>
        </CardContent>
      </Card>
    </div>
  )
}
```

## Complex Example

Cards can contain complex layouts with multiple elements.

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nostromo/ui-core/card'
import { Badge } from '@nostromo/ui-core/badge'

export function ComplexCard() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Project Status</CardTitle>
          <Badge variant="secondary">Active</Badge>
        </div>
        <CardDescription>
          Monitor your project progress and status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium">Progress</h4>
            <div className="w-full bg-neutral-200 rounded-full h-2 mt-2">
              <div className="bg-brand-500 h-2 rounded-full" style={{width: '75%'}}></div>
            </div>
            <p className="text-sm text-neutral-500 mt-1">75% complete</p>
          </div>
          <div>
            <h4 className="font-medium">Team Members</h4>
            <p className="text-sm text-neutral-500">5 active members</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
```

## API Reference

### Card Props

Props for the main Card component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `ReactNode` | `undefined` | The content of the card |

### CardHeader Props

Props for the CardHeader component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `ReactNode` | `undefined` | The header content |

### CardTitle Props

Props for the CardTitle component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `ReactNode` | `undefined` | The title content |

### CardDescription Props

Props for the CardDescription component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `ReactNode` | `undefined` | The description content |

### CardContent Props

Props for the CardContent component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `ReactNode` | `undefined` | The content |

## Accessibility

### WCAG 2.1 AA Compliant

The Card component follows accessibility best practices.

- Semantic HTML structure with proper roles
- High contrast ratios for all content
- Screen reader friendly with appropriate ARIA attributes
- Keyboard navigation support
- Logical content hierarchy and structure
