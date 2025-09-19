# Card

Displays a card with optional header, content, and footer sections. Perfect for organizing content into distinct sections with consistent spacing and styling.

## Installation

```bash
pnpm add @nostromo/ui-core
```

## Basic Usage

```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nostromo/ui-core'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>This is the card content area.</p>
  </CardContent>
</Card>
```

## API Reference

### Card Components

| Component | Description |
|-----------|-------------|
| `Card` | Root card container |
| `CardHeader` | Header section of the card |
| `CardTitle` | Title text in header |
| `CardDescription` | Description text in header |
| `CardContent` | Main content area |
| `CardFooter` | Footer section of the card |