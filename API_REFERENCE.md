# API Reference

This document provides a comprehensive API reference for all Nostromo UI components, including props, variants, and usage examples.

## 📋 Contents

- [API Design Principles](#api-design-principles)
- [Core Components](#core-components)
- [Marketing Components](#marketing-components)
- [Component Props](#component-props)
- [Variant System](#variant-system)
- [Composition Patterns](#composition-patterns)
- [Accessibility](#accessibility)
- [TypeScript Support](#typescript-support)
- [Import Patterns](#import-patterns)
- [Testing](#testing)

---

## 🎯 API Design Principles

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

## 🧩 Core Components

### Button

A versatile button component with multiple variants and states.

```tsx
import { Button } from "@nostromo/ui-core"
// or
import { Button } from "@nostromo/ui-core/button"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link" \| "subtle"` | `"default"` | Visual variant of the button |
| `size` | `"sm" \| "default" \| "lg" \| "xl" \| "icon"` | `"default"` | Size of the button |
| `state` | `"default" \| "loading" \| "success" \| "error"` | `"default"` | Visual state of the button |
| `loading` | `boolean` | `false` | Whether the button is in a loading state |
| `loadingText` | `string` | `undefined` | The loading text to display when loading is true |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `ReactNode` | `undefined` | Button content |

#### Variants

- **default**: Primary button with brand colors
- **destructive**: Red button for destructive actions
- **outline**: Outlined button with transparent background
- **secondary**: Secondary button with neutral colors
- **ghost**: Transparent button with hover effects
- **link**: Text button that looks like a link
- **subtle**: Subtle button with minimal styling

#### Sizes

- **sm**: Small button (h-8, px-3, text-xs)
- **default**: Default button (h-10, px-4, text-sm)
- **lg**: Large button (h-11, px-6, text-base)
- **xl**: Extra large button (h-12, px-8, text-lg)
- **icon**: Square button for icons only (h-10, w-10)

#### Example

```tsx
<Button variant="default" size="lg" loading={isLoading}>
  Save Changes
</Button>
```

---

### Input

A versatile input component with label, helper text, and error states.

```tsx
import { Input } from "@nostromo/ui-core"
// or
import { Input } from "@nostromo/ui-core/input"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "error" \| "success"` | `"default"` | Visual variant of the input |
| `inputSize` | `"sm" \| "default" \| "lg"` | `"default"` | Size of the input |
| `type` | `string` | `"text"` | HTML input type |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `label` | `string` | `undefined` | Label text |
| `helperText` | `string` | `undefined` | Helper text below input |
| `error` | `boolean` | `false` | Whether the input has an error |
| `success` | `boolean` | `false` | Whether the input has success state |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `className` | `string` | `undefined` | Additional CSS classes |

#### Example

```tsx
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  helperText="We'll never share your email"
  error={hasError}
/>
```

---

### Dialog

A modal dialog component with backdrop and focus management.

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@nostromo/ui-core"
// or
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@nostromo/ui-core/dialog"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Whether the dialog is open |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | Callback when open state changes |
| `variant` | `"default" \| "centered" \| "fullscreen"` | `"default"` | Visual variant of the dialog |
| `size` | `"sm" \| "default" \| "lg" \| "xl"` | `"default"` | Size of the dialog |
| `backdropVariant` | `"default" \| "blur" \| "transparent"` | `"default"` | Backdrop variant |
| `className` | `string` | `undefined` | Additional CSS classes |

#### Example

```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete this item?
      </DialogDescription>
    </DialogHeader>
    {/* Dialog content */}
  </DialogContent>
</Dialog>
```

---

### Card

A flexible card component with header, content, and footer sections.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@nostromo/ui-core"
// or
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@nostromo/ui-core/card"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "outlined" \| "elevated"` | `"default"` | Visual variant of the card |
| `className` | `string` | `undefined` | Additional CSS classes |

#### Example

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

### Badge

A status badge component with multiple variants.

```tsx
import { Badge } from "@nostromo/ui-core"
// or
import { Badge } from "@nostromo/ui-core/badge"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "secondary" \| "destructive" \| "outline"` | `"default"` | Visual variant of the badge |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size of the badge |
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `ReactNode` | `undefined` | Badge content |

#### Example

```tsx
<Badge variant="destructive">Error</Badge>
<Badge variant="secondary">In Progress</Badge>
```

---

### Avatar

A user avatar component with image support and fallback.

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@nostromo/ui-core"
// or
import { Avatar, AvatarImage, AvatarFallback } from "@nostromo/ui-core/avatar"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "default" \| "lg" \| "xl"` | `"default"` | Size of the avatar |
| `className` | `string` | `undefined` | Additional CSS classes |

#### AvatarImage Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | `undefined` | Image source URL |
| `alt` | `string` | `undefined` | Alt text for the image |

#### AvatarFallback Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | `undefined` | Fallback content |

#### Example

```tsx
<Avatar>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

---

### Icon

A flexible icon component using Phosphor Icons.

```tsx
import { Icon } from "@nostromo/ui-core"
// or
import { Icon } from "@nostromo/ui-core/icon"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | `undefined` | Name of the icon (see available icons) |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl"` | `"md"` | Size of the icon |
| `weight` | `"thin" \| "light" \| "regular" \| "bold" \| "fill" \| "duotone"` | `"regular"` | Weight/style of the icon |
| `color` | `"current" \| "primary" \| "secondary" \| "success" \| "warning" \| "error" \| "muted"` | `"current"` | Color of the icon |
| `className` | `string` | `undefined` | Additional CSS classes |

#### Available Icons

The Icon component supports 200+ Phosphor icons including:

- **Navigation**: house, user, settings, search, menu, x, chevron-left, chevron-right, etc.
- **Actions**: plus, minus, check, trash, edit, copy, download, upload, etc.
- **Communication**: mail, phone, message-circle, bell, etc.
- **Media**: play, pause, stop, volume-high, camera, image, video, etc.
- **Files**: file, folder, file-text, file-pdf, etc.
- **Status**: check-circle, x-circle, warning, info, question, etc.
- **Time**: clock, calendar, timer, etc.
- **Security**: lock, lock-open, eye, eye-slash, shield, etc.
- **Technology**: wifi, cpu, hard-drive, etc.
- **Weather**: sun, moon, cloud, cloud-rain, etc.
- **Social**: github, twitter, facebook, instagram, linkedin, youtube, etc.
- **Shopping**: shopping-cart, shopping-bag, credit-card, money, etc.
- **And many more...**

#### Example

```tsx
<Icon name="user" size="lg" color="primary" />
<Icon name="check-circle" weight="fill" color="success" />
```

---

### Table

A data table component with sorting, pagination, and selection.

```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@nostromo/ui-core"
// or
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@nostromo/ui-core/table"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | `undefined` | Array of data objects |
| `columns` | `TableColumn<T>[]` | `undefined` | Column definitions |
| `loading` | `boolean` | `false` | Whether the table is loading |
| `emptyText` | `string` | `"No data"` | Text to show when no data |
| `caption` | `string` | `undefined` | Table caption |
| `className` | `string` | `undefined` | Additional CSS classes |
| `rowKey` | `keyof T \| ((record: T) => string \| number)` | `undefined` | Unique key for each row |
| `onRowClick` | `(record: T, index: number) => void` | `undefined` | Callback when row is clicked |
| `onSort` | `(column: TableColumn<T>, direction: 'asc' \| 'desc') => void` | `undefined` | Callback when column is sorted |
| `sortColumn` | `string` | `undefined` | Currently sorted column |
| `sortDirection` | `'asc' \| 'desc'` | `undefined` | Sort direction |
| `pagination` | `PaginationProps` | `undefined` | Pagination configuration |
| `selection` | `SelectionProps` | `undefined` | Row selection configuration |

#### TableColumn Interface

```tsx
interface TableColumn<T = any> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  className?: string;
}
```

#### Example

```tsx
const columns = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'actions', title: 'Actions', render: (_, record) => (
    <Button size="sm">Edit</Button>
  ) }
];

<Table
  data={users}
  columns={columns}
  loading={isLoading}
  onSort={handleSort}
  pagination={{
    current: 1,
    pageSize: 10,
    total: 100,
    onChange: handlePageChange
  }}
/>
```

---

### Progress

A progress indicator component with multiple variants.

```tsx
import { Progress } from "@nostromo/ui-core"
// or
import { Progress } from "@nostromo/ui-core/progress"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Current progress value (0-100) |
| `variant` | `"default" \| "success" \| "warning" \| "error"` | `"default"` | Visual variant of the progress |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size of the progress |
| `showValue` | `boolean` | `false` | Whether to show the percentage value |
| `className` | `string` | `undefined` | Additional CSS classes |

#### Example

```tsx
<Progress value={75} variant="success" showValue />
<Progress value={50} size="lg" />
```

---

### Toast

A notification toast component with auto-dismiss and positioning.

```tsx
import { Toast, ToastProvider, ToastViewport } from "@nostromo/ui-core"
// or
import { Toast, ToastProvider, ToastViewport } from "@nostromo/ui-core/toast"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "success" \| "warning" \| "error"` | `"default"` | Visual variant of the toast |
| `title` | `string` | `undefined` | Toast title |
| `description` | `string` | `undefined` | Toast description |
| `duration` | `number` | `5000` | Auto-dismiss duration in ms |
| `position` | `"top-left" \| "top-center" \| "top-right" \| "bottom-left" \| "bottom-center" \| "bottom-right"` | `"top-right"` | Toast position |
| `className` | `string` | `undefined` | Additional CSS classes |

#### Example

```tsx
<ToastProvider>
  <Toast
    variant="success"
    title="Success!"
    description="Your changes have been saved."
    duration={3000}
  />
</ToastProvider>
```

---

### Tooltip

A tooltip component with positioning and triggers.

```tsx
import { Tooltip, TooltipContent, TooltipTrigger } from "@nostromo/ui-core"
// or
import { Tooltip, TooltipContent, TooltipTrigger } from "@nostromo/ui-core/tooltip"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | `undefined` | Tooltip content |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"top"` | Tooltip side |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Tooltip alignment |
| `delayDuration` | `number` | `700` | Delay before showing tooltip |
| `className` | `string` | `undefined` | Additional CSS classes |

#### Example

```tsx
<Tooltip content="This is a tooltip">
  <TooltipTrigger asChild>
    <Button>Hover me</Button>
  </TooltipTrigger>
</Tooltip>
```

---

### Accordion

A collapsible accordion component with keyboard navigation.

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@nostromo/ui-core"
// or
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@nostromo/ui-core/accordion"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"single" \| "multiple"` | `"single"` | Whether single or multiple items can be open |
| `collapsible` | `boolean` | `true` | Whether items can be collapsed |
| `value` | `string \| string[]` | `undefined` | Currently open items |
| `onValueChange` | `(value: string \| string[]) => void` | `undefined` | Callback when value changes |
| `className` | `string` | `undefined` | Additional CSS classes |

#### Example

```tsx
<Accordion type="multiple">
  <AccordionItem value="item1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>
      Content for section 1
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

---

### Skeleton

A loading skeleton component with animations.

```tsx
import { Skeleton } from "@nostromo/ui-core"
// or
import { Skeleton } from "@nostromo/ui-core/skeleton"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "pulse" \| "wave"` | `"default"` | Animation variant |
| `className` | `string` | `undefined` | Additional CSS classes |

#### Example

```tsx
<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-4 w-[200px]" />
<Skeleton className="h-4 w-[150px]" />
```

---

### Tabs

A tab navigation component with keyboard support.

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@nostromo/ui-core"
// or
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@nostromo/ui-core/tabs"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `undefined` | Currently active tab |
| `onValueChange` | `(value: string) => void` | `undefined` | Callback when tab changes |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Tab orientation |
| `className` | `string` | `undefined` | Additional CSS classes |

#### Example

```tsx
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

---

### Select

A dropdown select component with search and keyboard navigation.

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@nostromo/ui-core"
// or
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@nostromo/ui-core/select"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `undefined` | Selected value |
| `onValueChange` | `(value: string) => void` | `undefined` | Callback when value changes |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `disabled` | `boolean` | `false` | Whether the select is disabled |
| `className` | `string` | `undefined` | Additional CSS classes |

#### Example

```tsx
<Select value={selectedValue} onValueChange={setSelectedValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

---

### Checkbox

A checkbox component with form integration.

```tsx
import { Checkbox } from "@nostromo/ui-core"
// or
import { Checkbox } from "@nostromo/ui-core/checkbox"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Whether the checkbox is checked |
| `onCheckedChange` | `(checked: boolean) => void` | `undefined` | Callback when checked state changes |
| `disabled` | `boolean` | `false` | Whether the checkbox is disabled |
| `className` | `string` | `undefined` | Additional CSS classes |

#### Example

```tsx
<Checkbox checked={isChecked} onCheckedChange={setIsChecked}>
  Accept terms and conditions
</Checkbox>
```

---

### Switch

A toggle switch component with form integration.

```tsx
import { Switch } from "@nostromo/ui-core"
// or
import { Switch } from "@nostromo/ui-core/switch"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Whether the switch is checked |
| `onCheckedChange` | `(checked: boolean) => void` | `undefined` | Callback when checked state changes |
| `disabled` | `boolean` | `false` | Whether the switch is disabled |
| `className` | `string` | `undefined` | Additional CSS classes |

#### Example

```tsx
<Switch checked={isEnabled} onCheckedChange={setIsEnabled}>
  Enable notifications
</Switch>
```

---

### Textarea

A multi-line text input component with auto-resize.

```tsx
import { Textarea } from "@nostromo/ui-core"
// or
import { Textarea } from "@nostromo/ui-core/textarea"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "error" \| "success"` | `"default"` | Visual variant of the textarea |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Size of the textarea |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `label` | `string` | `undefined` | Label text |
| `helperText` | `string` | `undefined` | Helper text below textarea |
| `error` | `boolean` | `false` | Whether the textarea has an error |
| `success` | `boolean` | `false` | Whether the textarea has success state |
| `disabled` | `boolean` | `false` | Whether the textarea is disabled |
| `autoResize` | `boolean` | `true` | Whether to auto-resize based on content |
| `className` | `string` | `undefined` | Additional CSS classes |

#### Example

```tsx
<Textarea
  label="Message"
  placeholder="Enter your message"
  helperText="Maximum 500 characters"
  autoResize
/>
```

---

### Alert

A notification alert component with multiple variants.

```tsx
import { Alert, AlertTitle, AlertDescription } from "@nostromo/ui-core"
// or
import { Alert, AlertTitle, AlertDescription } from "@nostromo/ui-core/alert"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "success" \| "warning" \| "error"` | `"default"` | Visual variant of the alert |
| `dismissible` | `boolean` | `false` | Whether the alert can be dismissed |
| `onDismiss` | `() => void` | `undefined` | Callback when alert is dismissed |
| `className` | `string` | `undefined` | Additional CSS classes |

#### Example

```tsx
<Alert variant="success" dismissible onDismiss={handleDismiss}>
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>
    Your changes have been saved successfully.
  </AlertDescription>
</Alert>
```

---

### Label

A form label component with accessibility features.

```tsx
import { Label } from "@nostromo/ui-core"
// or
import { Label } from "@nostromo/ui-core/label"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `htmlFor` | `string` | `undefined` | ID of the associated form element |
| `required` | `boolean` | `false` | Whether the field is required |
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `ReactNode` | `undefined` | Label content |

#### Example

```tsx
<Label htmlFor="email" required>
  Email Address
</Label>
```

---

### HelperText

A helper text component for form fields.

```tsx
import { HelperText } from "@nostromo/ui-core"
// or
import { HelperText } from "@nostromo/ui-core/helper-text"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "error" \| "success"` | `"default"` | Visual variant of the helper text |
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `ReactNode` | `undefined` | Helper text content |

#### Example

```tsx
<HelperText variant="error">
  This field is required
</HelperText>
```

---

### ErrorMessage

An error message component for form validation.

```tsx
import { ErrorMessage } from "@nostromo/ui-core"
// or
import { ErrorMessage } from "@nostromo/ui-core/error-message"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `ReactNode` | `undefined` | Error message content |

#### Example

```tsx
<ErrorMessage>
  Please enter a valid email address
</ErrorMessage>
```

---

### Breadcrumb

A breadcrumb navigation component.

```tsx
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@nostromo/ui-core"
// or
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@nostromo/ui-core/breadcrumb"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS classes |

#### Example

```tsx
<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <BreadcrumbLink href="/products">Products</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem>
    <span>Current Page</span>
  </BreadcrumbItem>
</Breadcrumb>
```

---

### Pagination

A pagination component with page navigation.

```tsx
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@nostromo/ui-core"
// or
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@nostromo/ui-core/pagination"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `current` | `number` | `1` | Current page number |
| `total` | `number` | `0` | Total number of pages |
| `pageSize` | `number` | `10` | Number of items per page |
| `onChange` | `(page: number) => void` | `undefined` | Callback when page changes |
| `showSizeChanger` | `boolean` | `false` | Whether to show page size changer |
| `showQuickJumper` | `boolean` | `false` | Whether to show quick jumper |
| `className` | `string` | `undefined` | Additional CSS classes |

#### Example

```tsx
<Pagination
  current={currentPage}
  total={totalPages}
  pageSize={pageSize}
  onChange={handlePageChange}
  showSizeChanger
  showQuickJumper
/>
```

---

### Separator

A visual separator component.

```tsx
import { Separator } from "@nostromo/ui-core"
// or
import { Separator } from "@nostromo/ui-core/separator"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Orientation of the separator |
| `className` | `string` | `undefined` | Additional CSS classes |

#### Example

```tsx
<Separator orientation="horizontal" />
<Separator orientation="vertical" className="h-4" />
```

---

## 🎨 Marketing Components

### Hero

A hero section component for landing pages.

```tsx
import { Hero } from "@nostromo/ui-marketing"
// or
import { Hero } from "@nostromo/ui-marketing/hero"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | Hero title |
| `subtitle` | `string` | `undefined` | Hero subtitle |
| `description` | `string` | `undefined` | Hero description |
| `ctaText` | `string` | `undefined` | Call-to-action button text |
| `ctaHref` | `string` | `undefined` | Call-to-action button link |
| `secondaryCtaText` | `string` | `undefined` | Secondary CTA button text |
| `secondaryCtaHref` | `string` | `undefined` | Secondary CTA button link |
| `image` | `string` | `undefined` | Hero image URL |
| `variant` | `"default" \| "centered" \| "split"` | `"default"` | Hero layout variant |
| `className` | `string` | `undefined` | Additional CSS classes |

#### Example

```tsx
<Hero
  title="Build Amazing UIs"
  subtitle="With Nostromo UI"
  description="A comprehensive UI library built with React, TypeScript and Tailwind CSS."
  ctaText="Get Started"
  ctaHref="/getting-started"
  secondaryCtaText="View Examples"
  secondaryCtaHref="/examples"
  image="/hero-image.jpg"
  variant="centered"
/>
```

---

### Features

A features showcase component.

```tsx
import { Features } from "@nostromo/ui-marketing"
// or
import { Features } from "@nostromo/ui-marketing/features"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | Features section title |
| `description` | `string` | `undefined` | Features section description |
| `features` | `Feature[]` | `undefined` | Array of feature objects |
| `columns` | `number` | `3` | Number of columns in the grid |
| `className` | `string` | `undefined` | Additional CSS classes |

#### Feature Interface

```tsx
interface Feature {
  title: string;
  description: string;
  icon?: string;
  image?: string;
}
```

#### Example

```tsx
<Features
  title="Why Choose Nostromo UI?"
  description="Powerful features for modern web development"
  features={[
    {
      title: "Accessible",
      description: "WCAG 2.1 AA compliant components",
      icon: "shield-check"
    },
    {
      title: "Customizable",
      description: "Easy theming with CSS variables",
      icon: "paint-brush"
    }
  ]}
  columns={3}
/>
```

---

### Testimonials

A testimonials component for customer reviews.

```tsx
import { Testimonials } from "@nostromo/ui-marketing"
// or
import { Testimonials } from "@nostromo/ui-marketing/testimonials"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | Testimonials section title |
| `description` | `string` | `undefined` | Testimonials section description |
| `testimonials` | `Testimonial[]` | `undefined` | Array of testimonial objects |
| `columns` | `number` | `3` | Number of columns in the grid |
| `className` | `string` | `undefined` | Additional CSS classes |

#### Testimonial Interface

```tsx
interface Testimonial {
  content: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  rating?: number;
}
```

#### Example

```tsx
<Testimonials
  title="What Our Users Say"
  description="Real feedback from developers using Nostromo UI"
  testimonials={[
    {
      content: "Nostromo UI has transformed our development process.",
      author: "John Doe",
      role: "Frontend Developer",
      company: "Acme Corp",
      avatar: "/avatar1.jpg",
      rating: 5
    }
  ]}
  columns={3}
/>
```

---

### Gallery

An image gallery component with lightbox functionality.

```tsx
import { Gallery } from "@nostromo/ui-marketing"
// or
import { Gallery } from "@nostromo/ui-marketing/gallery"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `GalleryImage[]` | `undefined` | Array of image objects |
| `columns` | `number` | `3` | Number of columns in the grid |
| `showLightbox` | `boolean` | `true` | Whether to show lightbox on click |
| `className` | `string` | `undefined` | Additional CSS classes |

#### GalleryImage Interface

```tsx
interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}
```

#### Example

```tsx
<Gallery
  images={[
    {
      src: "/image1.jpg",
      alt: "Image 1",
      title: "Beautiful Landscape",
      description: "A stunning view of the mountains"
    }
  ]}
  columns={4}
  showLightbox
/>
```

---

### Pricing

A pricing table component.

```tsx
import { Pricing } from "@nostromo/ui-marketing"
// or
import { Pricing } from "@nostromo/ui-marketing/pricing"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | Pricing section title |
| `description` | `string` | `undefined` | Pricing section description |
| `plans` | `PricingPlan[]` | `undefined` | Array of pricing plan objects |
| `showToggle` | `boolean` | `true` | Whether to show monthly/yearly toggle |
| `className` | `string` | `undefined` | Additional CSS classes |

#### PricingPlan Interface

```tsx
interface PricingPlan {
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  ctaText: string;
  ctaHref: string;
  popular?: boolean;
}
```

#### Example

```tsx
<Pricing
  title="Choose Your Plan"
  description="Flexible pricing for teams of all sizes"
  plans={[
    {
      name: "Basic",
      description: "Perfect for small projects",
      price: { monthly: 9, yearly: 90 },
      features: ["Up to 5 projects", "Basic support"],
      ctaText: "Get Started",
      ctaHref: "/signup"
    }
  ]}
  showToggle
/>
```

---

### LogoWall

A client logos component with hover effects.

```tsx
import { LogoWall } from "@nostromo/ui-marketing"
// or
import { LogoWall } from "@nostromo/ui-marketing/logo-wall"
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `undefined` | Logo wall section title |
| `description` | `string` | `undefined` | Logo wall section description |
| `logos` | `Logo[]` | `undefined` | Array of logo objects |
| `columns` | `number` | `6` | Number of columns in the grid |
| `className` | `string` | `undefined` | Additional CSS classes |

#### Logo Interface

```tsx
interface Logo {
  src: string;
  alt: string;
  href?: string;
}
```

#### Example

```tsx
<LogoWall
  title="Trusted by Leading Companies"
  description="Join thousands of developers using Nostromo UI"
  logos={[
    { src: "/logo1.png", alt: "Company 1", href: "https://company1.com" },
    { src: "/logo2.png", alt: "Company 2", href: "https://company2.com" }
  ]}
  columns={6}
/>
```

---

## 🔧 Component Props

### Common Props

All components support these common props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS classes |
| `children` | `ReactNode` | `undefined` | Component content |

### Form Props

Form components support these additional props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Whether the component is disabled |
| `required` | `boolean` | `false` | Whether the field is required |
| `error` | `boolean` | `false` | Whether the component has an error |
| `success` | `boolean` | `false` | Whether the component has success state |

---

## 🎨 Variant System

### Size Variants

Most components support these size variants:

- **sm**: Small size (h-8, px-3, text-xs)
- **default**: Default size (h-10, px-4, text-sm)
- **lg**: Large size (h-11, px-6, text-base)
- **xl**: Extra large size (h-12, px-8, text-lg)

### Color Variants

Most components support these color variants:

- **default**: Default brand colors
- **secondary**: Secondary neutral colors
- **success**: Success green colors
- **warning**: Warning yellow colors
- **error**: Error red colors
- **destructive**: Destructive red colors

### State Variants

Interactive components support these state variants:

- **default**: Default state
- **loading**: Loading state with spinner
- **success**: Success state with checkmark
- **error**: Error state with error icon

---

## 📝 TypeScript Support

All components are fully typed with TypeScript interfaces. Import types like this:

```tsx
import type { ButtonProps, InputProps, DialogProps } from "@nostromo/ui-core"
```

### Generic Components

Some components like Table support generics:

```tsx
import type { TableProps, TableColumn } from "@nostromo/ui-core"

interface User {
  id: string;
  name: string;
  email: string;
}

const columns: TableColumn<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name' },
  { key: 'email', title: 'Email', dataIndex: 'email' }
];

<Table<User> data={users} columns={columns} />
```

---

## 📦 Import Patterns

### Individual Imports (Recommended)

```tsx
import { Button } from "@nostromo/ui-core/button"
import { Input } from "@nostromo/ui-core/input"
import { Dialog } from "@nostromo/ui-core/dialog"
```

### Package Imports

```tsx
import { Button, Input, Dialog } from "@nostromo/ui-core"
```

### Marketing Components

```tsx
import { Hero } from "@nostromo/ui-marketing/hero"
import { Features } from "@nostromo/ui-marketing/features"
import { Testimonials } from "@nostromo/ui-marketing/testimonials"
```

---

## 🚀 Getting Started

1. **Install the packages**:
   ```bash
   npm install @nostromo/ui-core @nostromo/ui-marketing @nostromo/ui-tw
   ```

2. **Configure Tailwind**:
   ```js
   // tailwind.config.js
   const nostromoPreset = require("@nostromo/ui-tw/tailwind.preset.js");
   
   module.exports = {
     content: [
       "./src/**/*.{js,ts,jsx,tsx,mdx}",
       "./node_modules/@nostromo/**/*.{js,ts,jsx,tsx}"
     ],
     presets: [nostromoPreset],
   };
   ```

3. **Import base styles**:
   ```tsx
   import "@nostromo/ui-tw/styles/base.css";
   ```

4. **Start using components**:
   ```tsx
   import { Button } from "@nostromo/ui-core/button"
   
   function App() {
     return <Button>Hello World</Button>
   }
   ```

---

**Last Updated**: October 2025  
**Version**: 0.1.0 (Beta)

---

## 🔧 Composition Patterns

### Compound Components
```tsx
// Dialog with compound components
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
// React with render props
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

## ♿ Accessibility

### ARIA Patterns
```tsx
// Button with loading state
<Button 
  loading={isLoading}
  aria-label={isLoading ? "Loading..." : "Submit form"}
  disabled={isLoading}
>
  {isLoading ? <Spinner size="sm" /> : "Submit"}
</Button>

// Form with error state
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
// Tabs with keyboard navigation
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

## 🧪 Testing

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

---

*This API reference is automatically generated from TypeScript interfaces and component definitions.*
