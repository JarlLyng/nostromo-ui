# Setup

Learn how to set up Nostromo UI in your React or Next.js project.

## React Setup

Set up Nostromo UI in a React application.

### 1. Install dependencies

```bash
pnpm add @nostromo/ui-core @nostromo/ui-tw
pnpm add -D tailwindcss postcss autoprefixer
```

### 2. Initialize Tailwind

```bash
npx tailwindcss init -p
```

### 3. Configure Tailwind

```js title="tailwind.config.js"
import { nostromoPreset } from '@nostromo/ui-tw'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  presets: [nostromoPreset],
}
```

## Next.js Setup

Set up Nostromo UI in a Next.js application.

### 1. Install dependencies

```bash
pnpm add @nostromo/ui-core @nostromo/ui-tw
```

### 2. Configure Tailwind

```ts title="tailwind.config.ts"
import type { Config } from 'tailwindcss'
import { nostromoPreset } from '@nostromo/ui-tw'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  presets: [nostromoPreset],
}

export default config
```

### 3. Add global styles

```css title="app/globals.css"
@import 'tailwindcss';
@import '@nostromo/ui-tw/base.css';
@import '@nostromo/ui-tw/themes/nostromo.css';
```

## First Component

Create your first component with Nostromo UI.

### Example: Button Component

```tsx
import { Button } from '@nostromo/ui-core/button'

export function MyButton() {
  return (
    <Button>Click me</Button>
  )
}
```

## Ready to Go!

Your Nostromo UI setup is complete. Start building with our components.

- [First Component](./first-component) - Learn how to create your first component
- [Browse Components](../components/button) - Explore all available components
