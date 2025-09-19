# Form Components

A collection of form-related components that work together to create accessible and user-friendly forms. Includes Label, HelperText, and ErrorMessage components.

## Installation

```bash
pnpm add @nostromo/ui-core
```

## Basic Usage

```tsx
import { Label, HelperText, ErrorMessage } from '@nostromo/ui-core'

<div className="space-y-2">
  <Label htmlFor="email">Email Address</Label>
  <input 
    id="email" 
    type="email" 
    className="w-full px-3 py-2 border rounded-md"
    placeholder="you@example.com"
  />
  <HelperText>We'll never share your email with anyone else.</HelperText>
</div>
```

## Components

### Label
Form labels that associate with form controls for accessibility and usability.

### HelperText  
Helper text that provides additional information about form fields.

### ErrorMessage
Error messages that display validation errors in a consistent way.