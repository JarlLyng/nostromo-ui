# Migration Guides

This document provides comprehensive migration guides for developers switching from other UI libraries to Nostromo UI. Each guide includes component mappings, API differences, and step-by-step migration instructions.

## 📋 Contents

- [Migration Overview](#migration-overview)
- [Material-UI → Nostromo UI](#material-ui--nostromo-ui)
- [Chakra UI → Nostromo UI](#chakra-ui--nostromo-ui)
- [Ant Design → Nostromo UI](#ant-design--nostromo-ui)
- [Mantine → Nostromo UI](#mantine--nostromo-ui)
- [General Migration Tips](#general-migration-tips)
- [Common Issues](#common-issues)

---

## 🔄 Migration Overview

### Why Migrate to Nostromo UI?

- **Modern Stack**: Built with React 18+, TypeScript, and Tailwind CSS
- **Accessibility First**: WCAG 2.1 AA compliant out of the box
- **Performance**: Tree-shakeable, minimal bundle size, SSR compatible
- **Theming**: CSS variables-based theming with 4 predefined themes
- **Developer Experience**: Excellent TypeScript support and documentation

### Migration Benefits

- **Smaller Bundle Size**: 60-80% reduction compared to other libraries
- **Better Performance**: No runtime CSS-in-JS overhead
- **Modern Theming**: CSS variables instead of JavaScript-based theming
- **Accessibility**: Built-in accessibility features
- **TypeScript**: Full type safety and IntelliSense support

---

## 🎨 Material-UI → Nostromo UI

### Installation

> 📖 **For complete installation instructions, see [Development Guide](DEVELOPMENT.md#installation)**

```bash
# Remove Material-UI
npm uninstall @mui/material @emotion/react @emotion/styled

# Install Nostromo UI
pnpm add @nostromo/ui-core @nostromo/ui-marketing @nostromo/ui-tw
```

### Component Mappings

| Material-UI | Nostromo UI | Notes |
|-------------|-------------|-------|
| `Button` | `Button` | Similar API, different variants |
| `TextField` | `Input` | Different prop structure |
| `Dialog` | `Dialog` | Similar API, different backdrop options |
| `Card` | `Card` | Similar structure, different styling |
| `Chip` | `Badge` | Different API, similar functionality |
| `Avatar` | `Avatar` | Similar API, different fallback handling |
| `Switch` | `Switch` | Similar API, different styling |
| `Checkbox` | `Checkbox` | Similar API, different styling |
| `Radio` | `RadioGroup` | Different component structure |
| `Select` | `Select` | Similar API, different styling |
| `Tabs` | `Tabs` | Similar API, different styling |
| `Accordion` | `Accordion` | Similar API, different styling |
| `Alert` | `Alert` | Similar API, different variants |
| `Progress` | `Progress` | Similar API, different styling |
| `Table` | `Table` | Different API, more features |
| `Pagination` | `Pagination` | Similar API, different styling |

### API Differences

#### Button Component

**Material-UI:**
```tsx
import { Button } from '@mui/material';

<Button 
  variant="contained" 
  color="primary" 
  size="large"
  disabled={false}
>
  Click me
</Button>
```

**Nostromo UI:**
```tsx
import { Button } from '@nostromo/ui-core/button';

<Button 
  variant="default" 
  size="lg" 
  disabled={false}
>
  Click me
</Button>
```

#### TextField Component

**Material-UI:**
```tsx
import { TextField } from '@mui/material';

<TextField
  label="Email"
  variant="outlined"
  size="medium"
  error={hasError}
  helperText="Enter your email"
  fullWidth
/>
```

**Nostromo UI:**
```tsx
import { Input } from '@nostromo/ui-core/input';

<Input
  label="Email"
  variant={hasError ? "error" : "default"}
  inputSize="default"
  helperText="Enter your email"
  error={hasError}
/>
```

#### Dialog Component

**Material-UI:**
```tsx
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

<Dialog open={open} onClose={handleClose}>
  <DialogTitle>Title</DialogTitle>
  <DialogContent>
    Content here
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button onClick={handleSave}>Save</Button>
  </DialogActions>
</Dialog>
```

**Nostromo UI:**
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@nostromo/ui-core/dialog';

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    Content here
  </DialogContent>
</Dialog>
```

### Theming Migration

**Material-UI Theme:**
```tsx
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});
```

**Nostromo UI Theme:**
```css
/* CSS Variables */
[data-theme="nostromo"] {
  --color-brand-500: 262 84% 52%;
  --color-brand-600: 262 84% 42%;
  --font-heading: "Inter", sans-serif;
}
```

### Migration Steps

1. **Install Nostromo UI packages**
2. **Update Tailwind configuration**
3. **Replace Material-UI imports**
4. **Update component props**
5. **Migrate theming to CSS variables**
6. **Test accessibility features**

---

## 🎨 Chakra UI → Nostromo UI

### Installation

```bash
# Remove Chakra UI
npm uninstall @chakra-ui/react @emotion/react @emotion/styled framer-motion

# Install Nostromo UI
npm install @nostromo/ui-core @nostromo/ui-marketing @nostromo/ui-tw
```

### Component Mappings

| Chakra UI | Nostromo UI | Notes |
|-----------|-------------|-------|
| `Button` | `Button` | Similar API, different variants |
| `Input` | `Input` | Similar API, different styling |
| `Modal` | `Dialog` | Different API structure |
| `Box` | `div` | Use regular HTML elements |
| `Flex` | `div` | Use Tailwind classes |
| `Grid` | `div` | Use Tailwind classes |
| `Stack` | `div` | Use Tailwind classes |
| `Text` | `p`, `span` | Use semantic HTML |
| `Heading` | `h1`, `h2`, etc. | Use semantic HTML |
| `Badge` | `Badge` | Similar API, different styling |
| `Avatar` | `Avatar` | Similar API, different styling |
| `Switch` | `Switch` | Similar API, different styling |
| `Checkbox` | `Checkbox` | Similar API, different styling |
| `Radio` | `RadioGroup` | Different component structure |
| `Select` | `Select` | Similar API, different styling |
| `Tabs` | `Tabs` | Similar API, different styling |
| `Accordion` | `Accordion` | Similar API, different styling |
| `Alert` | `Alert` | Similar API, different styling |
| `Progress` | `Progress` | Similar API, different styling |
| `Table` | `Table` | Different API, more features |

### API Differences

#### Button Component

**Chakra UI:**
```tsx
import { Button } from '@chakra-ui/react';

<Button 
  colorScheme="blue" 
  variant="solid" 
  size="lg"
  isLoading={isLoading}
  loadingText="Loading..."
>
  Click me
</Button>
```

**Nostromo UI:**
```tsx
import { Button } from '@nostromo/ui-core/button';

<Button 
  variant="default" 
  size="lg" 
  loading={isLoading}
  loadingText="Loading..."
>
  Click me
</Button>
```

#### Input Component

**Chakra UI:**
```tsx
import { Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';

<FormControl isInvalid={hasError}>
  <FormLabel>Email</FormLabel>
  <Input 
    type="email" 
    placeholder="Enter your email"
    value={email}
    onChange={handleChange}
  />
  <FormErrorMessage>Email is required</FormErrorMessage>
</FormControl>
```

**Nostromo UI:**
```tsx
import { Input } from '@nostromo/ui-core/input';

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  error={hasError}
  helperText={hasError ? "Email is required" : undefined}
/>
```

#### Modal Component

**Chakra UI:**
```tsx
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react';

<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Title</ModalHeader>
    <ModalBody>
      Content here
    </ModalBody>
    <ModalFooter>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onSave}>Save</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

**Nostromo UI:**
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@nostromo/ui-core/dialog';

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    Content here
  </DialogContent>
</Dialog>
```

### Theming Migration

**Chakra UI Theme:**
```tsx
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#e3f2fd',
      500: '#1976d2',
      900: '#0d47a1',
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
});
```

**Nostromo UI Theme:**
```css
/* CSS Variables */
[data-theme="nostromo"] {
  --color-brand-50: 262 84% 95%;
  --color-brand-500: 262 84% 52%;
  --color-brand-900: 262 84% 15%;
  --font-heading: "Inter", sans-serif;
  --font-body: "Inter", sans-serif;
}
```

### Migration Steps

1. **Install Nostromo UI packages**
2. **Update Tailwind configuration**
3. **Replace Chakra UI imports**
4. **Update component props**
5. **Migrate theming to CSS variables**
6. **Replace Chakra UI layout components with Tailwind**

---

## 🎨 Ant Design → Nostromo UI

### Installation

```bash
# Remove Ant Design
npm uninstall antd

# Install Nostromo UI
npm install @nostromo/ui-core @nostromo/ui-marketing @nostromo/ui-tw
```

### Component Mappings

| Ant Design | Nostromo UI | Notes |
|------------|-------------|-------|
| `Button` | `Button` | Similar API, different variants |
| `Input` | `Input` | Similar API, different styling |
| `Modal` | `Dialog` | Different API structure |
| `Card` | `Card` | Similar structure, different styling |
| `Tag` | `Badge` | Different API, similar functionality |
| `Avatar` | `Avatar` | Similar API, different styling |
| `Switch` | `Switch` | Similar API, different styling |
| `Checkbox` | `Checkbox` | Similar API, different styling |
| `Radio` | `RadioGroup` | Different component structure |
| `Select` | `Select` | Similar API, different styling |
| `Tabs` | `Tabs` | Similar API, different styling |
| `Collapse` | `Accordion` | Similar API, different styling |
| `Alert` | `Alert` | Similar API, different styling |
| `Progress` | `Progress` | Similar API, different styling |
| `Table` | `Table` | Different API, more features |
| `Pagination` | `Pagination` | Similar API, different styling |
| `Breadcrumb` | `Breadcrumb` | Similar API, different styling |
| `Divider` | `Separator` | Similar API, different styling |

### API Differences

#### Button Component

**Ant Design:**
```tsx
import { Button } from 'antd';

<Button 
  type="primary" 
  size="large"
  loading={isLoading}
  disabled={false}
>
  Click me
</Button>
```

**Nostromo UI:**
```tsx
import { Button } from '@nostromo/ui-core/button';

<Button 
  variant="default" 
  size="lg" 
  loading={isLoading}
  disabled={false}
>
  Click me
</Button>
```

#### Input Component

**Ant Design:**
```tsx
import { Input, Form, Form.Item } from 'antd';

<Form.Item 
  label="Email" 
  name="email"
  rules={[{ required: true, message: 'Please input your email!' }]}
>
  <Input 
    type="email" 
    placeholder="Enter your email"
  />
</Form.Item>
```

**Nostromo UI:**
```tsx
import { Input } from '@nostromo/ui-core/input';

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  required
  error={hasError}
  helperText={hasError ? "Please input your email!" : undefined}
/>
```

#### Modal Component

**Ant Design:**
```tsx
import { Modal } from 'antd';

<Modal
  title="Title"
  open={isOpen}
  onOk={handleOk}
  onCancel={handleCancel}
  okText="Save"
  cancelText="Cancel"
>
  Content here
</Modal>
```

**Nostromo UI:**
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@nostromo/ui-core/dialog';

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    Content here
  </DialogContent>
</Dialog>
```

### Theming Migration

**Ant Design Theme:**
```tsx
import { ConfigProvider } from 'antd';

const theme = {
  token: {
    colorPrimary: '#1976d2',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    fontFamily: 'Inter, sans-serif',
  },
};

<ConfigProvider theme={theme}>
  <App />
</ConfigProvider>
```

**Nostromo UI Theme:**
```css
/* CSS Variables */
[data-theme="nostromo"] {
  --color-brand-500: 262 84% 52%;
  --color-success-500: 142 76% 36%;
  --color-warning-500: 38 92% 50%;
  --color-error-500: 0 84% 60%;
  --font-heading: "Inter", sans-serif;
}
```

### Migration Steps

1. **Install Nostromo UI packages**
2. **Update Tailwind configuration**
3. **Replace Ant Design imports**
4. **Update component props**
5. **Migrate theming to CSS variables**
6. **Replace Ant Design form components**

---

## 🎨 Mantine → Nostromo UI

### Installation

```bash
# Remove Mantine
npm uninstall @mantine/core @mantine/hooks @mantine/notifications @mantine/spotlight

# Install Nostromo UI
npm install @nostromo/ui-core @nostromo/ui-marketing @nostromo/ui-tw
```

### Component Mappings

| Mantine | Nostromo UI | Notes |
|---------|-------------|-------|
| `Button` | `Button` | Similar API, different variants |
| `TextInput` | `Input` | Similar API, different styling |
| `Modal` | `Dialog` | Different API structure |
| `Card` | `Card` | Similar structure, different styling |
| `Badge` | `Badge` | Similar API, different styling |
| `Avatar` | `Avatar` | Similar API, different styling |
| `Switch` | `Switch` | Similar API, different styling |
| `Checkbox` | `Checkbox` | Similar API, different styling |
| `Radio` | `RadioGroup` | Different component structure |
| `Select` | `Select` | Similar API, different styling |
| `Tabs` | `Tabs` | Similar API, different styling |
| `Accordion` | `Accordion` | Similar API, different styling |
| `Alert` | `Alert` | Similar API, different styling |
| `Progress` | `Progress` | Similar API, different styling |
| `Table` | `Table` | Different API, more features |
| `Pagination` | `Pagination` | Similar API, different styling |
| `Breadcrumbs` | `Breadcrumb` | Similar API, different styling |
| `Divider` | `Separator` | Similar API, different styling |

### API Differences

#### Button Component

**Mantine:**
```tsx
import { Button } from '@mantine/core';

<Button 
  variant="filled" 
  color="blue" 
  size="lg"
  loading={isLoading}
  disabled={false}
>
  Click me
</Button>
```

**Nostromo UI:**
```tsx
import { Button } from '@nostromo/ui-core/button';

<Button 
  variant="default" 
  size="lg" 
  loading={isLoading}
  disabled={false}
>
  Click me
</Button>
```

#### TextInput Component

**Mantine:**
```tsx
import { TextInput, Stack } from '@mantine/core';

<Stack>
  <TextInput
    label="Email"
    placeholder="Enter your email"
    required
    error={hasError ? "Email is required" : undefined}
  />
</Stack>
```

**Nostromo UI:**
```tsx
import { Input } from '@nostromo/ui-core/input';

<Input
  label="Email"
  placeholder="Enter your email"
  required
  error={hasError}
  helperText={hasError ? "Email is required" : undefined}
/>
```

#### Modal Component

**Mantine:**
```tsx
import { Modal, Stack, Button } from '@mantine/core';

<Modal
  opened={opened}
  onClose={close}
  title="Title"
  size="md"
>
  <Stack>
    Content here
    <Button onClick={close}>Cancel</Button>
    <Button onClick={save}>Save</Button>
  </Stack>
</Modal>
```

**Nostromo UI:**
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@nostromo/ui-core/dialog';

<Dialog open={opened} onOpenChange={setOpened}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    Content here
  </DialogContent>
</Dialog>
```

### Theming Migration

**Mantine Theme:**
```tsx
import { MantineProvider } from '@mantine/core';

const theme = {
  primaryColor: 'blue',
  colors: {
    blue: ['#e3f2fd', '#1976d2', '#0d47a1'],
  },
  fontFamily: 'Inter, sans-serif',
};

<MantineProvider theme={theme}>
  <App />
</MantineProvider>
```

**Nostromo UI Theme:**
```css
/* CSS Variables */
[data-theme="nostromo"] {
  --color-brand-50: 262 84% 95%;
  --color-brand-500: 262 84% 52%;
  --color-brand-900: 262 84% 15%;
  --font-heading: "Inter", sans-serif;
}
```

### Migration Steps

1. **Install Nostromo UI packages**
2. **Update Tailwind configuration**
3. **Replace Mantine imports**
4. **Update component props**
5. **Migrate theming to CSS variables**
6. **Replace Mantine layout components with Tailwind**

---

## 💡 General Migration Tips

### 1. Start with Core Components

Begin migration with the most commonly used components:
- Button
- Input
- Dialog
- Card
- Badge

### 2. Update Imports Gradually

Replace imports one component at a time:
```tsx
// Before
import { Button } from '@mui/material';

// After
import { Button } from '@nostromo/ui-core/button';
```

### 3. Test Each Component

After migrating each component:
- Test functionality
- Check accessibility
- Verify styling
- Test responsive behavior

### 4. Update Theming

Replace JavaScript-based theming with CSS variables:
```css
/* Before: JavaScript theme */
const theme = {
  colors: {
    primary: '#1976d2',
  },
};

/* After: CSS variables */
[data-theme="nostromo"] {
  --color-brand-500: 262 84% 52%;
}
```

### 5. Use Tailwind for Layout

Replace layout components with Tailwind classes:
```tsx
// Before: Layout components
<Stack spacing="md">
  <Box>
    <Text>Content</Text>
  </Box>
</Stack>

// After: Tailwind classes
<div className="space-y-4">
  <div>
    <p>Content</p>
  </div>
</div>
```

---

## 🚨 Common Issues

### 1. Styling Differences

**Problem**: Components look different after migration
**Solution**: Use Tailwind classes to match original styling

```tsx
// Add custom classes
<Button className="bg-blue-500 hover:bg-blue-600">
  Custom Button
</Button>
```

### 2. Missing Components

**Problem**: Some components don't have direct equivalents
**Solution**: Use HTML elements with Tailwind classes

```tsx
// Before: Chakra UI Box
<Box bg="gray.100" p={4}>
  Content
</Box>

// After: HTML with Tailwind
<div className="bg-gray-100 p-4">
  Content
</div>
```

### 3. Form Integration

**Problem**: Form libraries expect different prop structures
**Solution**: Create wrapper components

```tsx
// Wrapper for React Hook Form
const NostromoInput = ({ field, ...props }) => (
  <Input
    {...field}
    {...props}
    error={!!field.error}
    helperText={field.error?.message}
  />
);
```

### 4. Theming Conflicts

**Problem**: CSS variables conflict with existing styles
**Solution**: Use CSS specificity or scoped styles

```css
/* Scoped theming */
.nostromo-theme {
  --color-brand-500: 262 84% 52%;
}
```

### 5. Bundle Size

**Problem**: Bundle size increases after migration
**Solution**: Use individual imports and tree shaking

```tsx
// Good: Individual imports
import { Button } from '@nostromo/ui-core/button';

// Avoid: Package imports
import { Button } from '@nostromo/ui-core';
```

---

## 🚀 Getting Started

### 1. Install Packages

```bash
npm install @nostromo/ui-core @nostromo/ui-marketing @nostromo/ui-tw
```

### 2. Configure Tailwind

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

### 3. Import Base Styles

```tsx
// In your entry file
import "@nostromo/ui-tw/styles/base.css";
```

### 4. Start Migration

Begin with one component at a time, testing thoroughly at each step.

---

**Last Updated**: October 2025  
**Version**: 0.1.0 (Beta)

---

*These migration guides are based on the latest versions of each library. Always check for updates and breaking changes.*
