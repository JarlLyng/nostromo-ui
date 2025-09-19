# Select

A select component that allows users to choose one option from a list of options. Built on top of Radix UI's Select primitive for accessibility and keyboard navigation.

## Installation

```bash
pnpm add @nostromo/ui-core
```

## Basic Usage

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@nostromo/ui-core'

<Select defaultValue="apple">
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="grapes">Grapes</SelectItem>
  </SelectContent>
</Select>
```

## API Reference

### Select Components

| Component | Description |
|-----------|-------------|
| `Select` | Root select component |
| `SelectTrigger` | Trigger button |
| `SelectValue` | Displays selected value |
| `SelectContent` | Dropdown content container |
| `SelectItem` | Individual option |