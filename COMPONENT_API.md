# Component API Design

This file describes the API design for Nostromo UI components, including variant system, props structure and consistent patterns for React components.

## 📋 Contents

- [API Design Principles](#api-design-principles)
- [Variant System](#variant-system)
- [Component Examples](#component-examples)
- [Props Interface](#props-interface)
- [Composition Patterns](#composition-patterns)
- [Accessibility](#accessibility)
- [Import Patterns](#import-patterns)
- [TypeScript Support](#typescript-support)
- [Testing](#testing)

## API Design Principles

### Consistency
- **Consistent prop names** across all components
- **Unified variant system** for all components
- **Standardized variant systems** (size, variant, state)

### Flexibility
- **Composable**: Components can be combined and extended
- **Customizable**: Support for custom styling via className/class
- **Accessible**: WCAG 2.1 AA compliance out of the box

### Performance
- **Tree-shakeable**: Individual component imports
- **Minimal bundle**: No runtime overhead
- **SSR compatible**: No client-side dependencies

## Variant System

### Standard Variants
All components follow this variant system:

```tsx
// Size variants
type Size = "sm" | "md" | "lg";

// Color variants  
type Variant = "primary" | "secondary" | "ghost" | "destructive";

// State variants
type State = "default" | "loading" | "disabled";
```

### Implementation with CVA
```tsx
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  // Base classes
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-brand-500 text-white hover:bg-brand-600",
        secondary: "bg-neutral-200 text-neutral-900 hover:bg-neutral-300",
        ghost: "hover:bg-neutral-100 hover:text-neutral-900",
        destructive: "bg-error-500 text-white hover:bg-error-600",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}
```

## Component Examples

### Button
```tsx
// React
import { Button } from "@nostromo/ui-core";

function Example() {
  return (
    <div className="space-x-2">
      <Button variant="primary" size="md">
        Primary Button
      </Button>
      <Button variant="secondary" size="lg" loading>
        Loading Button
      </Button>
      <Button variant="ghost" size="sm" disabled>
        Disabled Button
      </Button>
    </div>
  );
}
```


### Input
```tsx
// React
import { Input, Label, FormField } from "@nostromo/ui-core";

function LoginForm() {
  return (
    <FormField>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="Enter your email"
        size="md"
        variant="default"
      />
    </FormField>
  );
}
```


### Dialog
```tsx
// React
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@nostromo/ui-core";

function ExampleDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <p>This action cannot be undone.</p>
        <div className="flex justify-end space-x-2">
          <Button variant="ghost">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

## Props Interface

### Standard Props
All components support these standard props:

```tsx
interface BaseComponentProps {
  // Styling
  className?: string;           // React
  
  // Accessibility
  id?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  
  // State
  disabled?: boolean;
  loading?: boolean;
  
  // Events (React)
  onClick?: (event: MouseEvent) => void;
  onChange?: (event: ChangeEvent) => void;
  
}
```

### Component-specific Props
```tsx
// Button
interface ButtonProps extends BaseComponentProps {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  loading?: boolean;
}

// Input
interface InputProps extends BaseComponentProps {
  variant?: "default" | "error" | "success";
  size?: "sm" | "md" | "lg";
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  value?: string;
  defaultValue?: string;
}

// Dialog
interface DialogProps extends BaseComponentProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}
```

## Composition Patterns

### Compound Components
```tsx
// Dialog med compound components
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="ghost">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Render Props / Slots
```tsx
// React med render props
<Popover>
  <PopoverTrigger asChild>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverContent>
    {({ close }) => (
      <div>
        <p>Popover content</p>
        <Button onClick={close}>Close</Button>
      </div>
    )}
  </PopoverContent>
</Popover>
```


## Accessibility

### ARIA Patterns
```tsx
// Button med loading state
<Button 
  loading={isLoading}
  aria-label={isLoading ? "Loading..." : "Submit form"}
  disabled={isLoading}
>
  {isLoading ? <Spinner size="sm" /> : "Submit"}
</Button>

// Form med error state
<FormField>
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    variant={hasError ? "error" : "default"}
    aria-invalid={hasError}
    aria-describedby={hasError ? "email-error" : undefined}
  />
  {hasError && (
    <p id="email-error" className="text-error-500 text-sm">
      Please enter a valid email
    </p>
  )}
</FormField>
```

### Keyboard Navigation
```tsx
// Tabs med keyboard navigation
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

## Import Patterns

### Named Imports
```tsx
// Individuelle komponenter
import { Button } from "@nostromo/ui-core";
import { Input } from "@nostromo/ui-core";
import { Dialog } from "@nostromo/ui-core";

// Samlede imports
import { Button, Input, Dialog } from "@nostromo/ui-core";
```

### Tree Shaking
```tsx
// Kun Button inkluderes i bundle
import { Button } from "@nostromo/ui-core";

// Alle komponenter inkluderes
import * as Components from "@nostromo/ui-core";
```

## TypeScript Support

### Type Safety
```tsx
// Automatisk type inference
const button = <Button variant="primary" size="md" />; // ✅ Valid
const button = <Button variant="invalid" />; // ❌ TypeScript error

// Generic types
interface SelectProps<T> {
  value?: T;
  onValueChange?: (value: T) => void;
  options: Array<{ value: T; label: string }>;
}

function Select<T>({ value, onValueChange, options }: SelectProps<T>) {
  // Implementation
}
```

### IntelliSense
```tsx
// Fuld autocomplete support
<Button 
  variant="primary" // Autocomplete: primary | secondary | ghost | destructive
  size="md"         // Autocomplete: sm | md | lg
  loading={false}   // Autocomplete: boolean
/>
```

## Testing

### Unit Tests
```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@nostromo/ui-core";

test("Button renders with correct variant", () => {
  render(<Button variant="primary">Click me</Button>);
  
  const button = screen.getByRole("button");
  expect(button).toHaveClass("bg-brand-500");
});

test("Button handles click events", () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByRole("button"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Accessibility Tests
```tsx
import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "@testing-library/react";
import { Button } from "@nostromo/ui-core";

expect.extend(toHaveNoViolations);

test("Button has no accessibility violations", async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

This API design ensures consistency, flexibility and an excellent developer experience across all Nostromo UI components.
