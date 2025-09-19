# Dialog

A modal dialog component built on top of Radix UI's Dialog primitive. Perfect for displaying important information, forms, or actions that require user attention.

## Installation

```bash
pnpm add @nostromo/ui-core
```

## Basic Usage

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@nostromo/ui-core'
import { Button } from '@nostromo/ui-core'

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <p>This is the dialog content.</p>
  </DialogContent>
</Dialog>
```

## API Reference

### Dialog Components

| Component | Description |
|-----------|-------------|
| `Dialog` | Root dialog component |
| `DialogTrigger` | Trigger element for the dialog |
| `DialogContent` | Dialog content container |
| `DialogHeader` | Header section of dialog |
| `DialogTitle` | Title of the dialog |