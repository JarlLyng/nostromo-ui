# Button

Displays a button or a component that looks like a button. Built with Radix UI primitives and styled with Tailwind CSS. Supports multiple variants, sizes, and states.

## Installation

Install the Button component and its dependencies.

```bash
# Install with pnpm
pnpm add @nostromo/ui-core
```

## Basic Usage

```tsx
import { Button } from '@nostromo/ui-core'

<div className="flex gap-4">
  <Button>Default</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
</div>
```

## Variants

Buttons come in different variants to suit different use cases and visual hierarchies.

```tsx
<div className="flex gap-4 flex-wrap">
  <Button>Default</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="destructive">Destructive</Button>
</div>
```

## Sizes

Control the size of the button with the size prop.

```tsx
<div className="flex gap-4 items-center">
  <Button size="sm">Small</Button>
  <Button size="default">Default</Button>
  <Button size="lg">Large</Button>
</div>
```

## Loading States

Show loading states with the loading prop and optional loading text.

```tsx
<div className="flex gap-4">
  <Button loading>Loading</Button>
  <Button loading loadingText="Saving...">Save</Button>
</div>
```

## API Reference

### Button Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "outline" \| "ghost" \| "destructive"` | `"default"` | Visual style variant |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size of the button |
| `loading` | `boolean` | `false` | Show loading spinner |
| `loadingText` | `string` | `undefined` | Text to show while loading |
| `disabled` | `boolean` | `false` | Disable the button |
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `ReactNode` | `undefined` | Button content |

## Accessibility

- Buttons are keyboard focusable and can be activated with Enter or Space
- Loading state is announced to screen readers
- Disabled buttons are properly marked as such
- Focus indicators are clearly visible

## Best Practices

- Use descriptive button text that clearly indicates the action
- Don't rely solely on color to convey meaning
- Use loading states for actions that take time
- Group related buttons with consistent sizing