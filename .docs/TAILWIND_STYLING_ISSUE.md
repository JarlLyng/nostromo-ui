# Tailwind CSS Styling Issue i test-app

## Problembeskrivelse

UI-komponenter fra `@jarllyng/ui-core` vises uden korrekt styling i `test-app`, selvom Tailwind CSS-klasserne bliver genereret i CSS-filen. Komponenterne (Button, Input, Badge, Card) vises med minimal eller ingen styling - de mangler baggrundsfarver, korrekt padding, borders, shadows, og andre visuelle effekter.

## Hvad virker

1. **CSS-klasser bliver genereret**: I den buildede CSS-fil kan vi se at klasser som `.bg-primary`, `.bg-secondary`, `.h-10`, `.px-4`, osv. faktisk bliver genereret korrekt.

2. **CSS-variabler er defineret**: Theme CSS-filen (`@jarllyng/ui-tw/themes/nostromo.css`) definerer alle nødvendige CSS-variabler korrekt under `[data-theme="nostromo"]`.

3. **HTML-attributter er korrekte**: `index.html` har `data-theme="nostromo"` og `data-color-scheme="light"` sat korrekt på `<html>` elementet.

4. **Imports er korrekte**: `main.tsx` importerer både `base.css` og `nostromo.css` fra `@jarllyng/ui-tw`.

## Hvad virker ikke

1. **Styling anvendes ikke**: Selvom CSS-klasserne er genereret, bliver de ikke anvendt korrekt på komponenterne. Buttons vises som tomme rammer, inputs mangler styling, badges har kun delvis styling (success/warning/error har farver, men secondary mangler baggrundsfarve).

2. **CSS-variabler løses muligvis ikke korrekt**: Selvom variablerne er defineret, kan det være at de ikke bliver løst korrekt i browseren.

## Konfiguration

### test-app/vite.config.ts
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
});
```

### test-app/postcss.config.js
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {
      // Explicitly configure Tailwind to use our config
      config: './tailwind.config.ts',
    },
  },
};
```

### test-app/tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss';
import nostromoPreset from '@jarllyng/ui-tw/tailwind.preset.js';
import { join } from 'path';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Scan source files from packages (workspace dependencies)
    join(__dirname, "../packages/ui-core/src/**/*.{js,jsx,ts,tsx}"),
    join(__dirname, "../packages/ui-marketing/src/**/*.{js,jsx,ts,tsx}"),
    // Also scan dist files as fallback
    join(__dirname, "./node_modules/@jarllyng/ui-core/dist/components/**/*.{js,jsx,ts,tsx}"),
    join(__dirname, "./node_modules/@jarllyng/ui-marketing/dist/components/**/*.{js,jsx,ts,tsx}"),
  ],
  presets: [nostromoPreset],
  // Comprehensive safelist to ensure all component classes are generated
  safelist: [
    // Button base classes
    'inline-flex', 'items-center', 'justify-center', 'whitespace-nowrap',
    'rounded-md', 'text-sm', 'font-medium', 'transition-all', 'duration-200',
    'focus-visible:outline-none', 'focus-visible:ring-2', 'focus-visible:ring-ring',
    'focus-visible:ring-offset-2', 'disabled:pointer-events-none', 'disabled:opacity-50',
    // Button variants
    {
      pattern: /^(bg|text|border)-(primary|secondary|destructive|muted|success|warning|error|info)(\/\d+)?$/,
      variants: ['hover', 'active', 'focus-visible'],
    },
    {
      pattern: /^(bg|text)-(primary|secondary|destructive|muted|success|warning|error|info)-foreground$/,
    },
    {
      pattern: /^border-(border|primary|destructive|success|warning|error|info)(\/\d+)?$/,
      variants: ['hover', 'focus-visible'],
    },
    // Button sizes
    'h-8', 'h-10', 'h-11', 'h-12',
    'px-2', 'px-2.5', 'px-3', 'px-4', 'px-6', 'px-8',
    'py-0.5', 'py-1', 'py-2',
    'text-xs', 'text-sm', 'text-base', 'text-lg',
    'rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-full',
    // Badge classes
    'shadow-badge', 'hover:shadow-badge-hover',
    // Input classes
    'flex', 'w-full', 'bg-background', 'ring-offset-background',
    'file:border-0', 'file:bg-transparent', 'file:text-sm', 'file:font-medium',
    'placeholder:text-muted-foreground', 'disabled:cursor-not-allowed',
    'focus-visible:ring-ring/20', 'focus-visible:border-ring',
    'focus-visible:shadow-md', 'hover:border-border',
    // Card classes
    'bg-card', 'text-card-foreground', 'hover:shadow-md', 'hover:shadow-xl',
    'hover:scale-[1.02]', 'focus-within:border-primary', 'focus-within:shadow-sm',
    'cursor-pointer',
    // Common utilities
    'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl',
    'active:scale-[0.98]', 'active:shadow-sm',
    'space-y-2', 'leading-none',
  ],
} satisfies Config;
```

### test-app/src/index.css
```css
@import "tailwindcss";

/* Ensure all Tailwind utilities are available */
@layer utilities {
  /* Layout utilities */
  .inline-flex {
    display: inline-flex;
  }
  .items-center {
    align-items: center;
  }
  .justify-center {
    justify-content: center;
  }
  /* ... mange flere utility classes ... */
  
  /* Semantic color utilities */
  .bg-primary {
    background-color: hsl(var(--color-primary));
  }
  .text-primary-foreground {
    color: hsl(var(--color-primary-foreground));
  }
  /* ... mange flere semantiske farveklasser ... */
}
```

### test-app/src/main.tsx
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import '@jarllyng/ui-tw/base.css';
import '@jarllyng/ui-tw/themes/nostromo.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### test-app/index.html
```html
<!doctype html>
<html lang="en" data-theme="nostromo" data-color-scheme="light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nostromo UI Test</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### test-app/src/App.tsx
```typescript
import { Button } from '@jarllyng/ui-core';
import { Input } from '@jarllyng/ui-core';
import { Card, CardHeader, CardTitle, CardContent } from '@jarllyng/ui-core';
import { Badge } from '@jarllyng/ui-core';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>
        Nostromo UI Test App
      </h1>

      <Card style={{ marginBottom: '2rem' }}>
        <CardHeader>
          <CardTitle>Button Component</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="default" onClick={() => setCount(count + 1)}>
              Clicked {count} times
            </Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </CardContent>
      </Card>

      <Card style={{ marginBottom: '2rem' }}>
        <CardHeader>
          <CardTitle>Input Component</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Type something..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ marginBottom: '1rem' }}
          />
          <p>You typed: {inputValue || '(nothing)'}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Badge Component</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
```

## Eksempel på genererede CSS-klasser

Fra `dist/assets/*.css` kan vi se at klasserne faktisk bliver genereret:

```css
.bg-primary{background-color:hsl(var(--color-primary))}
.text-primary-foreground{color:hsl(var(--color-primary-foreground))}
.bg-secondary{background-color:hsl(var(--color-secondary))}
.h-10{height:calc(var(--spacing)*10)}
.px-4{padding-inline:calc(var(--spacing)*4)}
.inline-flex{display:inline-flex}
.items-center{align-items:center}
/* osv. */
```

## CSS-variabler defineret i theme

Fra `packages/ui-tw/src/themes/nostromo.css`:

```css
[data-theme="nostromo"] {
  --color-brand-500: 262 84% 52%;
  --color-primary: hsl(var(--color-brand-500));
  --color-primary-foreground: hsl(var(--color-neutral-50));
  --color-secondary: hsl(var(--color-neutral-100));
  --color-secondary-foreground: hsl(var(--color-neutral-900));
  /* osv. */
}
```

## Hvad vi har prøvet

1. ✅ Tilføjet omfattende safelist med patterns i `tailwind.config.ts`
2. ✅ Manuelt defineret alle utility classes i `index.css` under `@layer utilities`
3. ✅ Skiftet fra `@tailwindcss/vite` plugin til PostCSS med `@tailwindcss/postcss`
4. ✅ Sikret at content paths scanner både source filer og dist filer
5. ✅ Verificeret at CSS-klasserne faktisk bliver genereret i build output
6. ✅ Verificeret at `data-theme="nostromo"` er sat korrekt på HTML elementet
7. ✅ Verificeret at theme CSS-filer importeres korrekt

## Mulige årsager

1. **Tailwind v4 JIT scanning virker ikke korrekt med workspace dependencies**: Selvom klasserne bliver genereret (måske pga. safelist), kan det være at Tailwind v4's JIT scanning ikke opdager klasserne i workspace dependencies korrekt.

2. **CSS-variabler løses ikke korrekt**: Selvom variablerne er defineret, kan det være at de ikke bliver løst korrekt i browseren, hvilket betyder at `hsl(var(--color-primary))` ikke evaluerer til en faktisk farve.

3. **CSS-specificity problemer**: Måske bliver klasserne overskrevet af andre CSS-regler med højere specificity.

4. **Import rækkefølge**: Måske er rækkefølgen af CSS-imports forkert, så theme-variablerne ikke er tilgængelige når Tailwind genererer klasserne.

5. **Tailwind v4 preset kompatibilitet**: Måske er der et problem med hvordan Tailwind v4 håndterer presets, især med workspace dependencies.

## Tekniske detaljer

- **Tailwind CSS version**: 4.1.18
- **Vite version**: 6.4.1
- **React version**: 19.x
- **Monorepo setup**: pnpm workspaces
- **Build output CSS størrelse**: ~34 KB (minified)

## Næste skridt

1. Tjekke om CSS-variablerne faktisk bliver løst korrekt i browseren (via DevTools)
2. Undersøge om der er CSS-specificity problemer
3. Prøve at bruge Tailwind v3 i stedet for v4 for at se om problemet er specifikt for v4
4. Overveje at bruge en anden build-strategi, f.eks. at pre-generere alle klasser i stedet for at bruge JIT
5. Undersøge om der er et problem med hvordan Tailwind v4 håndterer presets med workspace dependencies

## Relaterede filer

- `test-app/vite.config.ts`
- `test-app/postcss.config.js`
- `test-app/tailwind.config.ts`
- `test-app/src/index.css`
- `test-app/src/main.tsx`
- `test-app/index.html`
- `test-app/src/App.tsx`
- `packages/ui-tw/src/tailwind.preset.ts`
- `packages/ui-tw/src/themes/nostromo.css`
- `packages/ui-core/src/components/button.tsx`
- `packages/ui-core/src/components/badge.tsx`
- `packages/ui-core/src/components/input.tsx`
- `packages/ui-core/src/components/card.tsx`
