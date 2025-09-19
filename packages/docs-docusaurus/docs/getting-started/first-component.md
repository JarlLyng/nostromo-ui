# First Component

Create your first component using Nostromo UI. Learn the basics of importing and using our components.

## Basic Example

Start with a simple component that demonstrates the basic usage of Nostromo UI.

```tsx
import { Button } from '@nostromo/ui-core/button'

export function MyFirstComponent() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-neutral-50">Welcome to Nostromo UI</h1>
      <p className="text-neutral-400">
        This is your first component using Nostromo UI!
      </p>
      <Button>Get Started</Button>
    </div>
  )
}
```

## Multiple Components

Combine multiple components to create more complex interfaces.

```tsx
import { Button } from '@nostromo/ui-core/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nostromo/ui-core/card'
import { Badge } from '@nostromo/ui-core/badge'

export function ComponentShowcase() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Nostromo UI Components</CardTitle>
          <CardDescription>
            A collection of space-grade UI components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Badge>React</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="outline">Tailwind</Badge>
          </div>
          <div className="flex gap-2">
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```

## Best Practices

### ✅ Do

- Import components individually
- Use semantic HTML elements
- Follow accessibility guidelines
- Use consistent spacing
- Test with screen readers

### ❌ Don't

- Import entire package
- Override component internals
- Ignore accessibility
- Use inline styles
- Skip testing

## Import Patterns

### Recommended Import Pattern

Import components individually for better tree-shaking and performance.

#### ✅ Good - Individual imports

```tsx
import { Button } from '@nostromo/ui-core/button'
import { Card, CardContent } from '@nostromo/ui-core/card'
import { Badge } from '@nostromo/ui-core/badge'
```

#### ❌ Avoid - Barrel imports

```tsx
import { Button, Card, Badge } from '@nostromo/ui-core'
```

## Congratulations!

You've created your first Nostromo UI component. Explore more components and features.

- [Explore Components](../components/button) - Browse all available components
- [Learn Theming](../theming/overview) - Customize the appearance of your components
