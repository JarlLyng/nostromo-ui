# Theming System

Nostromo UI's theming system is built around CSS variables in HSL format that integrate directly with Tailwind CSS. This provides maximum flexibility and performance.

## 📋 Contents

- [Design Tokens](#design-tokens)
- [Predefined Themes](#predefined-themes)
- [Custom Theming](#custom-theming)
- [Dark Mode](#dark-mode)
- [Tailwind Integration](#tailwind-integration)
- [Performance](#performance)
- [Migration Guide](#migration-guide)

## Design Tokens

### Color System

We use an HSL-based color system with semantic naming. This gives you full control over theming without runtime overhead:

**Why HSL?**

- **Easy to adjust**: Change lightness for dark mode
- **Consistent**: HSL values match Tailwind's `hsl()` function
- **Performance**: No JavaScript runtime - CSS only
- **Accessibility**: Easy to validate contrast ratios

```css
[data-theme="nostromo"] {
  /* Brand colors */
  --nostromo-color-brand-50: 262 84% 95%;
  --nostromo-color-brand-100: 262 84% 90%;
  --nostromo-color-brand-200: 262 84% 80%;
  --nostromo-color-brand-300: 262 84% 70%;
  --nostromo-color-brand-400: 262 84% 60%;
  --nostromo-color-brand-500: 262 84% 52%;
  --nostromo-color-brand-600: 262 84% 45%;
  --nostromo-color-brand-700: 262 84% 35%;
  --nostromo-color-brand-800: 262 84% 25%;
  --nostromo-color-brand-900: 262 84% 15%;
  --nostromo-color-brand-950: 262 84% 8%;

  /* Neutral colors */
  --nostromo-color-neutral-50: 0 0% 98%;
  --nostromo-color-neutral-100: 0 0% 96%;
  --nostromo-color-neutral-200: 0 0% 90%;
  --nostromo-color-neutral-300: 0 0% 83%;
  --nostromo-color-neutral-400: 0 0% 64%;
  --nostromo-color-neutral-500: 0 0% 45%;
  --nostromo-color-neutral-600: 0 0% 32%;
  --nostromo-color-neutral-700: 0 0% 25%;
  --nostromo-color-neutral-800: 0 0% 15%;
  --nostromo-color-neutral-900: 0 0% 9%;
  --nostromo-color-neutral-950: 0 0% 4%;

  /* Success Colors - Full scale (50-950) */
  --nostromo-color-success-50: 142 76% 95%;
  --nostromo-color-success-100: 142 76% 90%;
  --nostromo-color-success-200: 142 76% 80%;
  --nostromo-color-success-300: 142 76% 70%;
  --nostromo-color-success-400: 142 76% 60%;
  --nostromo-color-success-500: 142 76% 36%;
  --nostromo-color-success-600: 142 76% 30%;
  --nostromo-color-success-700: 142 76% 25%;
  --nostromo-color-success-800: 142 76% 20%;
  --nostromo-color-success-900: 142 76% 15%;
  --nostromo-color-success-950: 142 76% 8%;

  /* Warning Colors - Full scale (50-950) */
  --nostromo-color-warning-50: 38 92% 95%;
  --nostromo-color-warning-100: 38 92% 90%;
  --nostromo-color-warning-200: 38 92% 80%;
  --nostromo-color-warning-300: 38 92% 70%;
  --nostromo-color-warning-400: 38 92% 60%;
  --nostromo-color-warning-500: 38 92% 50%;
  --nostromo-color-warning-600: 38 92% 45%;
  --nostromo-color-warning-700: 38 92% 35%;
  --nostromo-color-warning-800: 38 92% 25%;
  --nostromo-color-warning-900: 38 92% 15%;
  --nostromo-color-warning-950: 38 92% 8%;

  /* Error Colors - Full scale (50-950) */
  --nostromo-color-error-50: 0 84% 95%;
  --nostromo-color-error-100: 0 84% 90%;
  --nostromo-color-error-200: 0 84% 80%;
  --nostromo-color-error-300: 0 84% 70%;
  --nostromo-color-error-400: 0 84% 60%;
  --nostromo-color-error-500: 0 84% 60%;
  --nostromo-color-error-600: 0 84% 50%;
  --nostromo-color-error-700: 0 84% 40%;
  --nostromo-color-error-800: 0 84% 30%;
  --nostromo-color-error-900: 0 84% 20%;
  --nostromo-color-error-950: 0 84% 10%;

  /* Info Colors - Full scale (50-950) */
  --nostromo-color-info-50: 199 89% 95%;
  --nostromo-color-info-100: 199 89% 90%;
  --nostromo-color-info-200: 199 89% 80%;
  --nostromo-color-info-300: 199 89% 70%;
  --nostromo-color-info-400: 199 89% 60%;
  --nostromo-color-info-500: 199 89% 48%;
  --nostromo-color-info-600: 199 89% 40%;
  --nostromo-color-info-700: 199 89% 30%;
  --nostromo-color-info-800: 199 89% 20%;
  --nostromo-color-info-900: 199 89% 15%;
  --nostromo-color-info-950: 199 89% 8%;

  /* Semantic tokens for component theming (WCAG AA validated) */
  --nostromo-color-background: hsl(var(--nostromo-color-neutral-50));
  --nostromo-color-foreground: hsl(var(--nostromo-color-neutral-900));
  --nostromo-color-muted: hsl(var(--nostromo-color-neutral-100));
  --nostromo-color-muted-foreground: hsl(var(--nostromo-color-neutral-600));
  --nostromo-color-popover: hsl(var(--nostromo-color-neutral-50));
  --nostromo-color-popover-foreground: hsl(var(--nostromo-color-neutral-900));
  --nostromo-color-card: hsl(var(--nostromo-color-neutral-50));
  --nostromo-color-card-foreground: hsl(var(--nostromo-color-neutral-900));
  --nostromo-color-border: hsl(var(--nostromo-color-neutral-200));
  --nostromo-color-input: hsl(var(--nostromo-color-neutral-200));
  --nostromo-color-primary: hsl(var(--nostromo-color-brand-500));
  --nostromo-color-primary-foreground: hsl(var(--nostromo-color-neutral-50));
  --nostromo-color-secondary: hsl(var(--nostromo-color-neutral-100));
  --nostromo-color-secondary-foreground: hsl(var(--nostromo-color-neutral-900));
  --nostromo-color-accent: hsl(var(--nostromo-color-brand-100));
  --nostromo-color-accent-foreground: hsl(var(--nostromo-color-brand-900));
  --nostromo-color-destructive: hsl(var(--nostromo-color-error-500));
  --nostromo-color-destructive-foreground: hsl(
    var(--nostromo-color-neutral-50)
  );
  --nostromo-color-success-foreground: hsl(var(--nostromo-color-neutral-50));
  --nostromo-color-warning-foreground: hsl(var(--nostromo-color-neutral-900));
  --nostromo-color-error-foreground: hsl(var(--nostromo-color-neutral-50));
  --nostromo-color-info-foreground: hsl(var(--nostromo-color-neutral-50));
  --nostromo-color-ring: hsl(var(--nostromo-color-brand-500));
}
```

### Spacing & Sizing

```css
[data-theme="nostromo"] {
  /* Spacing scale */
  --nostromo-spacing-xs: 0.25rem; /* 4px */
  --nostromo-spacing-sm: 0.5rem; /* 8px */
  --nostromo-spacing-md: 1rem; /* 16px */
  --nostromo-spacing-lg: 1.5rem; /* 24px */
  --nostromo-spacing-xl: 2rem; /* 32px */
  --nostromo-spacing-2xl: 3rem; /* 48px */
  --nostromo-spacing-3xl: 4rem; /* 64px */

  /* Border radius */
  --nostromo-radius-none: 0px;
  --nostromo-radius-sm: 0.25rem; /* 4px */
  --nostromo-radius-md: 0.5rem; /* 8px */
  --nostromo-radius-lg: 0.75rem; /* 12px */
  --nostromo-radius-xl: 1rem; /* 16px */
  --nostromo-radius-full: 9999px;

  /* Shadows */
  --nostromo-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --nostromo-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --nostromo-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --nostromo-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}
```

### Typography

```css
[data-theme="nostromo"] {
  /* Font families */
  --nostromo-font-heading: "Inter", system-ui, sans-serif;
  --nostromo-font-body: "Inter", system-ui, sans-serif;
  --nostromo-font-mono: "JetBrains Mono", "Fira Code", monospace;

  /* Font sizes */
  --nostromo-text-xs: 0.75rem; /* 12px */
  --nostromo-text-sm: 0.875rem; /* 14px */
  --nostromo-text-base: 1rem; /* 16px */
  --nostromo-text-lg: 1.125rem; /* 18px */
  --nostromo-text-xl: 1.25rem; /* 20px */
  --nostromo-text-2xl: 1.5rem; /* 24px */
  --nostromo-text-3xl: 1.875rem; /* 30px */
  --nostromo-text-4xl: 2.25rem; /* 36px */
  --nostromo-text-5xl: 3rem; /* 48px */

  /* Line heights */
  --nostromo-leading-tight: 1.25;
  --nostromo-leading-normal: 1.5;
  --nostromo-leading-relaxed: 1.75;

  /* Font weights */
  --nostromo-font-normal: 400;
  --nostromo-font-medium: 500;
  --nostromo-font-semibold: 600;
  --nostromo-font-bold: 700;
}
```

## Predefined Themes

### Nostromo (Default)

Inspired by the spaceship from Alien - dark, technical aesthetic:

```css
[data-theme="nostromo"] {
  --nostromo-color-brand-500: 262 84% 52%; /* Purple */
  --nostromo-color-neutral-900: 0 0% 9%; /* Dark background */
  --nostromo-radius-md: 0.5rem;
  --nostromo-font-heading: "Inter", sans-serif;
}
```

### Mother

Cold, clinical style - perfect for dashboards:

```css
[data-theme="mother"] {
  --nostromo-color-brand-500: 200 100% 50%; /* Cyan */
  --nostromo-color-neutral-900: 220 13% 9%; /* Dark blue-gray */
  --nostromo-radius-sm: 0.25rem;
  --nostromo-font-heading: "Inter", sans-serif;
}
```

### LV-426

Warm, rustic atmosphere - great for marketing:

```css
[data-theme="lv-426"] {
  --nostromo-color-brand-500: 25 95% 53%; /* Orange */
  --nostromo-color-neutral-900: 0 0% 8%; /* Very dark */
  --nostromo-radius-lg: 0.75rem;
  --nostromo-font-heading: "Inter", sans-serif;
}
```

### Sulaco

Modern, military-inspired - professional look:

```css
[data-theme="sulaco"] {
  --nostromo-color-brand-500: 210 40% 50%; /* Blue */
  --nostromo-color-neutral-900: 0 0% 10%; /* Dark */
  --nostromo-radius-md: 0.5rem;
  --nostromo-font-heading: "Inter", sans-serif;
}
```

## Custom Theming

### Brand Customization (Quick Start)

To change brand colors for your project:

```css
[data-theme="mybrand"] {
  /* Your brand - only colors you want to change */
  --nostromo-color-brand-500: 220 100% 50%; /* Your brand blue */
  --nostromo-color-brand-600: 220 100% 40%; /* Darker variant */
  --nostromo-color-brand-700: 220 100% 30%; /* Even darker */

  /* Rest inherits from Nostromo theme */
}
```

**Pro Tip**: Start by changing only `--nostromo-color-brand-500`, `--nostromo-color-brand-600`, and `--nostromo-color-brand-700`. The rest of the colors are generated automatically.

### Create Your Own Theme

```css
[data-theme="mybrand"] {
  /* Brand colors */
  --nostromo-color-brand-500: 262 84% 52%;
  --nostromo-color-brand-600: 262 84% 45%;
  --nostromo-color-brand-700: 262 84% 35%;

  /* Neutral colors */
  --nostromo-color-neutral-50: 0 0% 98%;
  --nostromo-color-neutral-900: 0 0% 9%;

  /* Styling */
  --nostromo-radius-md: 0.75rem;
  --nostromo-font-heading: "Poppins", sans-serif;
  --nostromo-font-body: "Inter", sans-serif;
}
```

### Apply Theme

```html
<html data-theme="mybrand">
  <!-- Your content -->
</html>
```

### Dynamic Theme Switching

```tsx
// React example
function ThemeToggle() {
  const [theme, setTheme] = useState("nostromo");

  const toggleTheme = () => {
    const newTheme = theme === "nostromo" ? "mother" : "nostromo";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === "nostromo" ? "Mother" : "Nostromo"}
    </button>
  );
}
```

## Dark Mode

### System-baseret Dark Mode

```css
@media (prefers-color-scheme: dark) {
  [data-theme="nostromo"] {
    --nostromo-color-neutral-50: 0 0% 9%;
    --nostromo-color-neutral-900: 0 0% 98%;
  }
}
```

### Manuel Dark Mode Toggle

```css
[data-theme="nostromo"][data-color-scheme="dark"] {
  --nostromo-color-neutral-50: 0 0% 9%;
  --nostromo-color-neutral-900: 0 0% 98%;
}
```

```tsx
// React hook for dark mode
function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-color-scheme", isDark ? "dark" : "light");
  }, [isDark]);

  return [isDark, setIsDark];
}
```

## Tailwind Integration

### Tailwind Setup

```css
@import "@jarllyng/nostromo/tailwind.css";
@import "@jarllyng/nostromo/themes/nostromo.css";
```

The entry maps the `--nostromo-*` tokens onto Tailwind's namespaces with
`@theme inline`, so every token change re-resolves in the utilities immediately.

### Custom Tailwind Classes

Our preset adds custom classes based on CSS variables:

```css
/* Generated by Tailwind preset */
.bg-brand-500 {
  background-color: hsl(var(--nostromo-color-brand-500));
}
.text-brand-500 {
  color: hsl(var(--nostromo-color-brand-500));
}
.border-brand-500 {
  border-color: hsl(var(--nostromo-color-brand-500));
}

.rounded-md {
  border-radius: var(--nostromo-radius-md);
}
.text-heading {
  font-family: var(--nostromo-font-heading);
}
.text-body {
  font-family: var(--nostromo-font-body);
}
```

### Usage in Components

```tsx
function Button({ variant = "primary" }) {
  return (
    <button
      className={cn("px-4 py-2 rounded-md font-medium transition-colors", {
        "bg-brand-500 text-white hover:bg-brand-600": variant === "primary",
        "bg-neutral-200 text-neutral-900 hover:bg-neutral-300":
          variant === "secondary",
      })}
    >
      Button
    </button>
  );
}
```

### Form Integration (React Hook Form + Zod)

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, HelperText, ErrorMessage } from "@jarllyng/nostromo";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          {...register("email")}
          placeholder="Email"
          className={errors.email ? "border-error-500" : ""}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>

      <div>
        <Input
          {...register("password")}
          type="password"
          placeholder="Password"
          className={errors.password ? "border-error-500" : ""}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
        <HelperText>Password must be at least 8 characters</HelperText>
      </div>
    </form>
  );
}
```

## Accessibility & Contrast

### Contrast Guidelines

All our colors are designed to meet WCAG 2.1 AA standards:

```css
/* Automatic contrast validation */
[data-theme="nostromo"] {
  /* Brand colors - validated contrast */
  --nostromo-color-brand-500: 262 84% 52%; /* 4.5:1 contrast on white */
  --nostromo-color-brand-600: 262 84% 45%; /* 7:1 contrast on white */

  /* Neutral colors - safe readability */
  --nostromo-color-neutral-900: 0 0% 9%; /* 21:1 contrast on white */
  --nostromo-color-neutral-700: 0 0% 25%; /* 12:1 contrast on white */
}
```

### Dark Mode Accessibility

```css
[data-theme="nostromo"][data-color-scheme="dark"] {
  /* Safe contrast in dark mode */
  --nostromo-color-neutral-50: 0 0% 9%; /* Dark background */
  --nostromo-color-neutral-900: 0 0% 98%; /* Light text */
  --nostromo-color-brand-500: 262 84% 60%; /* Lighter brand for better contrast */
}
```

### Semantic Tokens for Accessibility

All components use semantic color tokens that automatically ensure proper contrast:

```tsx
// ✅ Correct - Uses semantic tokens
<Button className="bg-primary text-primary-foreground">Click me</Button>
<Card className="bg-card text-card-foreground">Content</Card>
<Input className="border-border text-foreground" />

// ❌ Wrong - Hardcoded colors
<Button className="bg-brand-500 text-white">Click me</Button>
<Card className="bg-white text-neutral-900">Content</Card>
<Input className="border-neutral-200 text-neutral-900" />
```

### Available Semantic Tokens

- `background` / `foreground` - Main page background and text
- `card` / `card-foreground` - Card backgrounds and text
- `muted` / `muted-foreground` - Muted backgrounds and secondary text
- `popover` / `popover-foreground` - Popover/dropdown backgrounds
- `primary` / `primary-foreground` - Primary actions
- `secondary` / `secondary-foreground` - Secondary actions
- `accent` / `accent-foreground` - Accent colors
- `destructive` / `destructive-foreground` - Error/destructive actions
- `border` - Border colors
- `input` - Input border colors
- `ring` - Focus ring colors

### Contrast Validation Tools

We provide automated contrast validation:

```bash
# Validate theme contrasts
pnpm validate:theme-contrasts

# Audit components for hardcoded colors
pnpm audit:contrast
```

The validation tools check all semantic token combinations in both light and dark mode to ensure WCAG AA compliance.

### Focus States

```css
/* Automatiske focus states */
.focus-visible {
  outline: 2px solid hsl(var(--nostromo-color-ring));
  outline-offset: 2px;
}
```

## Performance

### CSS Loading Strategy

1. **Critical CSS**: Base styles and theme variables loaded in `<head>`
2. **Non-critical CSS**: Component-specific styles lazy-loaded
3. **CSS Variables**: No runtime overhead - compile-time only

### Bundle Size

- **Minimal runtime**: CSS variables only, no JavaScript
- **Tree shaking**: Only used themes included
- **Compression**: CSS minification and gzip

### Import Strategies

```tsx
// ✅ Recommended: Per-component imports
import { Button } from "@jarllyng/nostromo/button";
import { Input } from "@jarllyng/nostromo/input";

// ✅ Also OK: Barrel imports
import { Button, Input } from "@jarllyng/nostromo";

// ❌ Avoid: Full library import
import * as Nostromo from "@jarllyng/nostromo";
```

### Bundle Size Optimization

Nothing to configure. Tailwind v4 discovers your source files automatically and
the library ships its own `@source` for its compiled output, so only the
utilities you actually use are emitted.

## Migration Guide

### From Other UI Libraries

```css
/* From shadcn/ui */
:root {
  --background: hsl(var(--nostromo-color-neutral-50));
  --foreground: hsl(var(--nostromo-color-neutral-900));
}

/* To Nostromo */
[data-theme="nostromo"] {
  --nostromo-color-neutral-50: 0 0% 98%;
  --nostromo-color-neutral-900: 0 0% 9%;
}
```

### From CSS-in-JS

```tsx
// From styled-components
const Button = styled.button`
  background: ${(props) => props.theme.colors.primary};
  border-radius: ${(props) => props.theme.radius.md};
`;

// To Nostromo
const Button = ({ className, ...props }) => (
  <button className={cn("bg-brand-500 rounded-md", className)} {...props} />
);
```

## Theme Playground

You can see live examples of all themes in our [documentation site](https://jarllyng.github.io/nostromo-ui/theming) and [Storybook](https://jarllyng.github.io/nostromo-ui/storybook-static/).

This theming system gives you maximum flexibility to create consistent, performant, and beautiful user interfaces.
