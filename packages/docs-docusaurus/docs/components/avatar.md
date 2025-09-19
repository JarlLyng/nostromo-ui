# Avatar

Displays an avatar image with a fallback. Perfect for user profiles, team members, and any scenario where you need to display a user's image or initials.

## Installation

Install the Avatar component and its dependencies.

```bash
# Install with pnpm
pnpm add @nostromo/ui-core
```

## Basic Usage

```tsx
import { Avatar } from '@nostromo/ui-core/avatar'

export function AvatarExample() {
  return (
    <div className="flex gap-4">
      <Avatar>
        <Avatar.Image src="https://github.com/shadcn.png" alt="User" />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>
    </div>
  )
}
```

## Sizes

Control the size of the avatar with Tailwind CSS classes.

```tsx
import { Avatar } from '@nostromo/ui-core/avatar'

export function AvatarSizes() {
  return (
    <div className="flex gap-4 items-center">
      <Avatar className="h-8 w-8">
        <Avatar.Image src="https://github.com/shadcn.png" alt="User" />
        <Avatar.Fallback>SM</Avatar.Fallback>
      </Avatar>
      <Avatar className="h-10 w-10">
        <Avatar.Image src="https://github.com/shadcn.png" alt="User" />
        <Avatar.Fallback>MD</Avatar.Fallback>
      </Avatar>
      <Avatar className="h-12 w-12">
        <Avatar.Image src="https://github.com/shadcn.png" alt="User" />
        <Avatar.Fallback>LG</Avatar.Fallback>
      </Avatar>
      <Avatar className="h-16 w-16">
        <Avatar.Image src="https://github.com/shadcn.png" alt="User" />
        <Avatar.Fallback>XL</Avatar.Fallback>
      </Avatar>
    </div>
  )
}
```

## Variants

Customize the avatar appearance with borders and rings.

```tsx
import { Avatar } from '@nostromo/ui-core/avatar'

export function AvatarVariants() {
  return (
    <div className="flex gap-4">
      <Avatar>
        <Avatar.Image src="https://github.com/shadcn.png" alt="User" />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar>
      <Avatar className="ring-2 ring-brand-500">
        <Avatar.Image src="https://github.com/shadcn.png" alt="User" />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar>
      <Avatar className="border-2 border-success-500">
        <Avatar.Image src="https://github.com/shadcn.png" alt="User" />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar>
    </div>
  )
}
```

## Avatar Group

Create avatar groups for team members or multiple users.

```tsx
import { Avatar } from '@nostromo/ui-core/avatar'

export function AvatarGroup() {
  return (
    <div className="flex -space-x-2">
      <Avatar className="border-2 border-neutral-900">
        <Avatar.Image src="https://github.com/shadcn.png" alt="User 1" />
        <Avatar.Fallback>U1</Avatar.Fallback>
      </Avatar>
      <Avatar className="border-2 border-neutral-900">
        <Avatar.Image src="https://github.com/vercel.png" alt="User 2" />
        <Avatar.Fallback>U2</Avatar.Fallback>
      </Avatar>
      <Avatar className="border-2 border-neutral-900">
        <Avatar.Image src="https://github.com/nextjs.png" alt="User 3" />
        <Avatar.Fallback>U3</Avatar.Fallback>
      </Avatar>
      <Avatar className="border-2 border-neutral-900">
        <Avatar.Fallback>+5</Avatar.Fallback>
      </Avatar>
    </div>
  )
}
```

## API Reference

### Avatar Props

Props for the main Avatar component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `ReactNode` | `undefined` | Avatar content (Image and Fallback) |

### Avatar.Image Props

Props for the Avatar.Image component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | `undefined` | The image source URL |
| `alt` | `string` | `undefined` | Alternative text for the image |
| `className` | `string` | `undefined` | Additional CSS classes |

### Avatar.Fallback Props

Props for the Avatar.Fallback component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `ReactNode` | `undefined` | Fallback content (usually initials) |

## Accessibility

### WCAG 2.1 AA Compliant

The Avatar component follows accessibility best practices.

- Proper alt text for images
- Fallback content for when images fail to load
- High contrast ratios for fallback text
- Screen reader friendly with appropriate ARIA attributes
- Semantic HTML structure
