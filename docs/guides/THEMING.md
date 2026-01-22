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
  --color-brand-50: 262 84% 95%;
  --color-brand-100: 262 84% 90%;
  --color-brand-200: 262 84% 80%;
  --color-brand-300: 262 84% 70%;
  --color-brand-400: 262 84% 60%;
  --color-brand-500: 262 84% 52%;
  --color-brand-600: 262 84% 45%;
  --color-brand-700: 262 84% 35%;
  --color-brand-800: 262 84% 25%;
  --color-brand-900: 262 84% 15%;
  --color-brand-950: 262 84% 8%;

  /* Neutral colors */
  --color-neutral-50: 0 0% 98%;
  --color-neutral-100: 0 0% 96%;
  --color-neutral-200: 0 0% 90%;
  --color-neutral-300: 0 0% 83%;
  --color-neutral-400: 0 0% 64%;
  --color-neutral-500: 0 0% 45%;
  --color-neutral-600: 0 0% 32%;
  --color-neutral-700: 0 0% 25%;
  --color-neutral-800: 0 0% 15%;
  --color-neutral-900: 0 0% 9%;
  --color-neutral-950: 0 0% 4%;

  /* Success Colors - Full scale (50-950) */
  --color-success-50: 142 76% 95%;
  --color-success-100: 142 76% 90%;
  --color-success-200: 142 76% 80%;
  --color-success-300: 142 76% 70%;
  --color-success-400: 142 76% 60%;
  --color-success-500: 142 76% 36%;
  --color-success-600: 142 76% 30%;
  --color-success-700: 142 76% 25%;
  --color-success-800: 142 76% 20%;
  --color-success-900: 142 76% 15%;
  --color-success-950: 142 76% 8%;

  /* Warning Colors - Full scale (50-950) */
  --color-warning-50: 38 92% 95%;
  --color-warning-100: 38 92% 90%;
  --color-warning-200: 38 92% 80%;
  --color-warning-300: 38 92% 70%;
  --color-warning-400: 38 92% 60%;
  --color-warning-500: 38 92% 50%;
  --color-warning-600: 38 92% 45%;
  --color-warning-700: 38 92% 35%;
  --color-warning-800: 38 92% 25%;
  --color-warning-900: 38 92% 15%;
  --color-warning-950: 38 92% 8%;

  /* Error Colors - Full scale (50-950) */
  --color-error-50: 0 84% 95%;
  --color-error-100: 0 84% 90%;
  --color-error-200: 0 84% 80%;
  --color-error-300: 0 84% 70%;
  --color-error-400: 0 84% 60%;
  --color-error-500: 0 84% 60%;
  --color-error-600: 0 84% 50%;
  --color-error-700: 0 84% 40%;
  --color-error-800: 0 84% 30%;
  --color-error-900: 0 84% 20%;
  --color-error-950: 0 84% 10%;

  /* Info Colors - Full scale (50-950) */
  --color-info-50: 199 89% 95%;
  --color-info-100: 199 89% 90%;
  --color-info-200: 199 89% 80%;
  --color-info-300: 199 89% 70%;
  --color-info-400: 199 89% 60%;
  --color-info-500: 199 89% 48%;
  --color-info-600: 199 89% 40%;
  --color-info-700: 199 89% 30%;
  --color-info-800: 199 89% 20%;
  --color-info-900: 199 89% 15%;
  --color-info-950: 199 89% 8%;

  /* Semantic tokens for component theming (WCAG AA validated) */
  --color-background: hsl(var(--color-neutral-50));
  --color-foreground: hsl(var(--color-neutral-900));
  --color-muted: hsl(var(--color-neutral-100));
  --color-muted-foreground: hsl(var(--color-neutral-600));
  --color-popover: hsl(var(--color-neutral-50));
  --color-popover-foreground: hsl(var(--color-neutral-900));
  --color-card: hsl(var(--color-neutral-50));
  --color-card-foreground: hsl(var(--color-neutral-900));
  --color-border: hsl(var(--color-neutral-200));
  --color-input: hsl(var(--color-neutral-200));
  --color-primary: hsl(var(--color-brand-500));
  --color-primary-foreground: hsl(var(--color-neutral-50));
  --color-secondary: hsl(var(--color-neutral-100));
  --color-secondary-foreground: hsl(var(--color-neutral-900));
  --color-accent: hsl(var(--color-brand-100));
  --color-accent-foreground: hsl(var(--color-brand-900));
  --color-destructive: hsl(var(--color-error-500));
  --color-destructive-foreground: hsl(var(--color-neutral-50));
  --color-success-foreground: hsl(var(--color-neutral-50));
  --color-warning-foreground: hsl(var(--color-neutral-900));
  --color-error-foreground: hsl(var(--color-neutral-50));
  --color-info-foreground: hsl(var(--color-neutral-50));
  --color-ring: hsl(var(--color-brand-500));
}
```

### Spacing & Sizing
```css
[data-theme="nostromo"] {
  /* Spacing scale */
  --spacing-xs: 0.25rem;   /* 4px */
  --spacing-sm: 0.5rem;    /* 8px */
  --spacing-md: 1rem;      /* 16px */
  --spacing-lg: 1.5rem;    /* 24px */
  --spacing-xl: 2rem;      /* 32px */
  --spacing-2xl: 3rem;     /* 48px */
  --spacing-3xl: 4rem;     /* 64px */

  /* Border radius */
  --radius-none: 0px;
  --radius-sm: 0.25rem;    /* 4px */
  --radius-md: 0.5rem;     /* 8px */
  --radius-lg: 0.75rem;    /* 12px */
  --radius-xl: 1rem;       /* 16px */
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}
```

### Typography
```css
[data-theme="nostromo"] {
  /* Font families */
  --font-heading: "Inter", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", monospace;

  /* Font sizes */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
  --text-5xl: 3rem;        /* 48px */

  /* Line heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;

  /* Font weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

## Predefined Themes

### Nostromo (Default)
Inspired by the spaceship from Alien - dark, technical aesthetic:
```css
[data-theme="nostromo"] {
  --color-brand-500: 262 84% 52%;  /* Purple */
  --color-neutral-900: 0 0% 9%;    /* Dark background */
  --radius-md: 0.5rem;
  --font-heading: "Inter", sans-serif;
}
```

### Mother
Cold, clinical style - perfect for dashboards:
```css
[data-theme="mother"] {
  --color-brand-500: 200 100% 50%;  /* Cyan */
  --color-neutral-900: 220 13% 9%;  /* Dark blue-gray */
  --radius-sm: 0.25rem;
  --font-heading: "Inter", sans-serif;
}
```

### LV-426
Warm, rustic atmosphere - great for marketing:
```css
[data-theme="lv-426"] {
  --color-brand-500: 25 95% 53%;    /* Orange */
  --color-neutral-900: 0 0% 8%;     /* Very dark */
  --radius-lg: 0.75rem;
  --font-heading: "Inter", sans-serif;
}
```

### Sulaco
Modern, military-inspired - professional look:
```css
[data-theme="sulaco"] {
  --color-brand-500: 210 40% 50%;   /* Blue */
  --color-neutral-900: 0 0% 10%;    /* Dark */
  --radius-md: 0.5rem;
  --font-heading: "Inter", sans-serif;
}
```

## Custom Theming

### Brand Customization (Quick Start)
To change brand colors for your project:

```css
[data-theme="mybrand"] {
  /* Your brand - only colors you want to change */
  --color-brand-500: 220 100% 50%;  /* Your brand blue */
  --color-brand-600: 220 100% 40%;  /* Darker variant */
  --color-brand-700: 220 100% 30%;  /* Even darker */
  
  /* Rest inherits from Nostromo theme */
}
```

**Pro Tip**: Start by changing only `--color-brand-500`, `--color-brand-600`, and `--color-brand-700`. The rest of the colors are generated automatically.

### Create Your Own Theme
```css
[data-theme="mybrand"] {
  /* Brand colors */
  --color-brand-500: 262 84% 52%;
  --color-brand-600: 262 84% 45%;
  --color-brand-700: 262 84% 35%;

  /* Neutral colors */
  --color-neutral-50: 0 0% 98%;
  --color-neutral-900: 0 0% 9%;

  /* Styling */
  --radius-md: 0.75rem;
  --font-heading: "Poppins", sans-serif;
  --font-body: "Inter", sans-serif;
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
  const [theme, setTheme] = useState('nostromo');
  
  const toggleTheme = () => {
    const newTheme = theme === 'nostromo' ? 'mother' : 'nostromo';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'nostromo' ? 'Mother' : 'Nostromo'}
    </button>
  );
}
```

## Dark Mode

### System-baseret Dark Mode
```css
@media (prefers-color-scheme: dark) {
  [data-theme="nostromo"] {
    --color-neutral-50: 0 0% 9%;
    --color-neutral-900: 0 0% 98%;
  }
}
```

### Manuel Dark Mode Toggle
```css
[data-theme="nostromo"][data-color-scheme="dark"] {
  --color-neutral-50: 0 0% 9%;
  --color-neutral-900: 0 0% 98%;
}
```

```tsx
// React hook for dark mode
function useDarkMode() {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-color-scheme', isDark ? 'dark' : 'light');
  }, [isDark]);
  
  return [isDark, setIsDark];
}
```

## Tailwind Integration

### Tailwind Preset
```js
// tailwind.config.js
const nostromoPreset = require("@jarllyng/nostromo/tailwind.preset");

module.exports = {
  presets: [nostromoPreset],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@jarllyng/**/*.{js,ts,jsx,tsx}"
  ],
};
```

### Custom Tailwind Classes
Our preset adds custom classes based on CSS variables:

```css
/* Generated by Tailwind preset */
.bg-brand-500 { background-color: hsl(var(--color-brand-500)); }
.text-brand-500 { color: hsl(var(--color-brand-500)); }
.border-brand-500 { border-color: hsl(var(--color-brand-500)); }

.rounded-md { border-radius: var(--radius-md); }
.text-heading { font-family: var(--font-heading); }
.text-body { font-family: var(--font-body); }
```

### Usage in Components
```tsx
function Button({ variant = "primary" }) {
  return (
    <button className={cn(
      "px-4 py-2 rounded-md font-medium transition-colors",
      {
        "bg-brand-500 text-white hover:bg-brand-600": variant === "primary",
        "bg-neutral-200 text-neutral-900 hover:bg-neutral-300": variant === "secondary",
      }
    )}>
      Button
    </button>
  );
}
```

### Form Integration (React Hook Form + Zod)
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input, HelperText, ErrorMessage } from '@jarllyng/nostromo';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          {...register('email')}
          placeholder="Email"
          className={errors.email ? 'border-error-500' : ''}
        />
        {errors.email && (
          <ErrorMessage>{errors.email.message}</ErrorMessage>
        )}
      </div>
      
      <div>
        <Input
          {...register('password')}
          type="password"
          placeholder="Password"
          className={errors.password ? 'border-error-500' : ''}
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
  --color-brand-500: 262 84% 52%;  /* 4.5:1 contrast on white */
  --color-brand-600: 262 84% 45%;  /* 7:1 contrast on white */
  
  /* Neutral colors - safe readability */
  --color-neutral-900: 0 0% 9%;    /* 21:1 contrast on white */
  --color-neutral-700: 0 0% 25%;  /* 12:1 contrast on white */
}
```

### Dark Mode Accessibility
```css
[data-theme="nostromo"][data-color-scheme="dark"] {
  /* Safe contrast in dark mode */
  --color-neutral-50: 0 0% 9%;     /* Dark background */
  --color-neutral-900: 0 0% 98%;   /* Light text */
  --color-brand-500: 262 84% 60%;  /* Lighter brand for better contrast */
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
  outline: 2px solid hsl(var(--color-ring));
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
import { Button } from '@jarllyng/nostromo/button';
import { Input } from '@jarllyng/nostromo/input';

// ✅ Also OK: Barrel imports
import { Button, Input } from '@jarllyng/nostromo';

// ❌ Avoid: Full library import
import * as Nostromo from '@jarllyng/nostromo';
```

### Bundle Size Optimization
```js
// tailwind.config.js
const nostromoPreset = require("@jarllyng/nostromo/tailwind.preset.js");

module.exports = {
  content: [
    // Scan your source files
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    // Include Nostromo UI components
    './node_modules/@jarllyng/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [nostromoPreset],
};
```

**Note**: Tailwind CSS v3+ uses `content` instead of the deprecated `purge` option. The `content` array tells Tailwind which files to scan for class names.

## Migration Guide

### From Other UI Libraries
```css
/* From shadcn/ui */
:root {
  --background: hsl(var(--color-neutral-50));
  --foreground: hsl(var(--color-neutral-900));
}

/* To Nostromo */
[data-theme="nostromo"] {
  --color-neutral-50: 0 0% 98%;
  --color-neutral-900: 0 0% 9%;
}
```

### From CSS-in-JS
```tsx
// From styled-components
const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.radius.md};
`;

// To Nostromo
const Button = ({ className, ...props }) => (
  <button 
    className={cn("bg-brand-500 rounded-md", className)} 
    {...props} 
  />
);
```

## Theme Playground

You can see live examples of all themes in our [documentation site](https://jarllyng.github.io/nostromo-ui/theming) and [Storybook](https://jarllyng.github.io/nostromo-ui/storybook-static/).

This theming system gives you maximum flexibility to create consistent, performant, and beautiful user interfaces.
