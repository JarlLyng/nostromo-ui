# Avatar

Displays an avatar image with a fallback. Perfect for user profiles, team members, and any scenario where you need to display a user's image or initials.

## Installation

```bash
pnpm add @nostromo/ui-core
```

## Basic Usage

```tsx
import { Avatar } from '@nostromo/ui-core'

<div className="flex gap-4">
  <Avatar>
    <Avatar.Image src="https://github.com/shadcn.png" alt="User" />
    <Avatar.Fallback>CN</Avatar.Fallback>
  </Avatar>
  <Avatar>
    <Avatar.Fallback>JD</Avatar.Fallback>
  </Avatar>
</div>
```

## API Reference

### Avatar Components

| Component | Description |
|-----------|-------------|
| `Avatar` | Root avatar container |
| `Avatar.Image` | Avatar image |
| `Avatar.Fallback` | Fallback content when image fails |