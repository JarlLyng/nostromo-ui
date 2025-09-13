# Theming System

Nostromo UI's theming system er bygget omkring CSS-variabler i HSL-format, der integreres direkte med Tailwind CSS. Dette giver maksimal fleksibilitet og performance.

## 📋 Indhold

- [Design Tokens](#design-tokens)
- [Prædefinerede Temaer](#prædefinerede-temaer)
- [Custom Theming](#custom-theming)
- [Dark Mode](#dark-mode)
- [Tailwind Integration](#tailwind-integration)
- [Performance](#performance)
- [Migration Guide](#migration-guide)

## Design Tokens

### Farve System
Vi bruger et HSL-baseret farvesystem med semantiske navne:

```css
[data-theme="nostromo"] {
  /* Brand farver */
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

  /* Neutral farver */
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

  /* Semantic farver */
  --color-success-500: 142 76% 36%;
  --color-warning-500: 38 92% 50%;
  --color-error-500: 0 84% 60%;
  --color-info-500: 199 89% 48%;
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

## Prædefinerede Temaer

### Nostromo (Default)
Inspireret af rumskibet fra Alien - mørk, teknisk æstetik:
```css
[data-theme="nostromo"] {
  --color-brand-500: 262 84% 52%;  /* Purple */
  --color-neutral-900: 0 0% 9%;    /* Dark background */
  --radius-md: 0.5rem;
  --font-heading: "Inter", sans-serif;
}
```

### Mother
Kold, klinisk stil - perfekt til dashboards:
```css
[data-theme="mother"] {
  --color-brand-500: 200 100% 50%;  /* Cyan */
  --color-neutral-900: 220 13% 9%;  /* Dark blue-gray */
  --radius-sm: 0.25rem;
  --font-heading: "Inter", sans-serif;
}
```

### LV-426
Varm, rustig atmosfære - god til marketing:
```css
[data-theme="lv-426"] {
  --color-brand-500: 25 95% 53%;    /* Orange */
  --color-neutral-900: 0 0% 8%;     /* Very dark */
  --radius-lg: 0.75rem;
  --font-heading: "Inter", sans-serif;
}
```

### Sulaco
Moderne, militær-inspireret - professionel look:
```css
[data-theme="sulaco"] {
  --color-brand-500: 210 40% 50%;   /* Blue */
  --color-neutral-900: 0 0% 10%;    /* Dark */
  --radius-md: 0.5rem;
  --font-heading: "Inter", sans-serif;
}
```

## Custom Theming

### Opret Dit Eget Tema
```css
[data-theme="mybrand"] {
  /* Brand farver */
  --color-brand-500: 262 84% 52%;
  --color-brand-600: 262 84% 45%;
  --color-brand-700: 262 84% 35%;

  /* Neutral farver */
  --color-neutral-50: 0 0% 98%;
  --color-neutral-900: 0 0% 9%;

  /* Styling */
  --radius-md: 0.75rem;
  --font-heading: "Poppins", sans-serif;
  --font-body: "Inter", sans-serif;
}
```

### Anvend Tema
```html
<html data-theme="mybrand">
  <!-- Dit indhold -->
</html>
```

### Dynamisk Tema Skift
```tsx
// React eksempel
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
const nostromoPreset = require("@nostromo/ui-tw/tailwind.preset");

module.exports = {
  presets: [nostromoPreset],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    "./node_modules/@nostromo/**/*.{js,ts,jsx,tsx,vue}"
  ],
};
```

### Custom Tailwind Classes
Vores preset tilføjer custom classes baseret på CSS-variablerne:

```css
/* Genereret af Tailwind preset */
.bg-brand-500 { background-color: hsl(var(--color-brand-500)); }
.text-brand-500 { color: hsl(var(--color-brand-500)); }
.border-brand-500 { border-color: hsl(var(--color-brand-500)); }

.rounded-md { border-radius: var(--radius-md); }
.text-heading { font-family: var(--font-heading); }
.text-body { font-family: var(--font-body); }
```

### Brug i Komponenter
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

## Performance

### CSS Loading Strategi
1. **Critical CSS**: Base styles og tema-variabler indlæses i `<head>`
2. **Non-critical CSS**: Komponent-specifikke styles lazy-loades
3. **CSS Variables**: Ingen runtime overhead - kun compile-time

### Bundle Size
- **Minimal runtime**: Kun CSS-variabler, ingen JavaScript
- **Tree shaking**: Kun brugte temaer inkluderes
- **Compression**: CSS minification og gzip

## Migration Guide

### Fra andre UI-biblioteker
```css
/* Fra shadcn/ui */
:root {
  --background: hsl(var(--color-neutral-50));
  --foreground: hsl(var(--color-neutral-900));
}

/* Til Nostromo */
[data-theme="nostromo"] {
  --color-neutral-50: 0 0% 98%;
  --color-neutral-900: 0 0% 9%;
}
```

### Fra CSS-in-JS
```tsx
// Fra styled-components
const Button = styled.button`
  background: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.radius.md};
`;

// Til Nostromo
const Button = ({ className, ...props }) => (
  <button 
    className={cn("bg-brand-500 rounded-md", className)} 
    {...props} 
  />
);
```

Dette theming system giver dig maksimal fleksibilitet til at skabe konsistente, performante og smukke brugergrænseflader.
