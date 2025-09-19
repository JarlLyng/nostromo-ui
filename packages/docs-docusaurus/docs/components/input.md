# Input

A flexible input component for collecting user data. Supports various types, states, and integrates with form components.

## Installation

```bash
pnpm add @nostromo/ui-core
```

## Basic Usage

```tsx
import { Input } from '@nostromo/ui-core'

<Input placeholder="Enter your name" />
```

## API Reference

### Input Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `"text"` | The type of the input element |
| `placeholder` | `string` | `undefined` | The placeholder text |
| `className` | `string` | `undefined` | Additional CSS classes |
| `error` | `boolean` | `false` | Renders the input in error state |
| `disabled` | `boolean` | `false` | Disables the input |