# Theming Overview

Learn how Nostromo UI's theming system works and how to customize it for your needs.

## CSS Variables Based Theming

Nostromo UI uses CSS custom properties (variables) for theming, making it easy to customize and maintain.

### Theme Structure

```css
[data-theme="nostromo"] {
  /* Brand Colors */
  --color-brand-500: 262 84% 52%;
  --color-brand-600: 262 84% 45%;
  
  /* Neutral Colors */
  --color-neutral-50: 0 0% 98%;
  --color-neutral-900: 0 0% 9%;
  
  /* Spacing & Typography */
  --spacing-md: 1rem;
  --text-base: 1rem;
}
```

## Color System

Our color system is inspired by the USCSS Nostromo from Alien (1979) with a focus on industrial, space-grade aesthetics.

### Brand Colors

- **brand-500**: Primary brand color
- **brand-600**: Darker brand variant
- **brand-700**: Even darker brand variant

### Neutral Colors

- **neutral-100**: Light background
- **neutral-500**: Medium neutral
- **neutral-900**: Dark text/background

### Success Colors

- **success-500**: Success state
- **success-600**: Darker success variant

### Error Colors

- **error-500**: Error state
- **error-600**: Darker error variant

## Dark Mode Support

Built-in support for dark mode with automatic color adjustments.

### Automatic Dark Mode

```html
<html data-theme="nostromo" data-color-scheme="dark">
```

### System Preference

```css
@media (prefers-color-scheme: dark) {
  /* Automatic dark mode styles */
}
```

## Ready to Customize?

Learn how to customize the theme for your specific needs.

- [Customization Guide](./customization) - Learn how to customize the theme
- [Theme Builder](./builder) - Interactive theme customization tool
