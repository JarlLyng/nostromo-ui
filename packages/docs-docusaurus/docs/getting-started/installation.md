# Installation

Get started with Nostromo UI by installing the core package and setting up your project.

## Install the Package

Install Nostromo UI using your preferred package manager.

### Using pnpm (recommended)

```bash
# Install core components
pnpm add @nostromo/ui-core

# Install Tailwind preset
pnpm add @nostromo/ui-tw
```

### Using npm

```bash
# Install core components
npm install @nostromo/ui-core

# Install Tailwind preset
npm install @nostromo/ui-tw
```

### Using yarn

```bash
# Install core components
yarn add @nostromo/ui-core

# Install Tailwind preset
yarn add @nostromo/ui-tw
```

## Configure Tailwind CSS

Set up Tailwind CSS with the Nostromo preset.

```js title="tailwind.config.js"
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

## Add Theme CSS

Import the Nostromo theme CSS in your application.

```css title="globals.css"
@import 'tailwindcss';
@import '@nostromo/ui-tw/base.css';
@import '@nostromo/ui-tw/themes/nostromo.css';
```

## Set Theme Attribute

Add the theme attribute to your HTML element.

```html title="HTML"
<html lang="en" data-theme="nostromo" data-color-scheme="dark">
  <body>
    <!-- Your app content -->
  </body>
</html>
```

## Next Steps

You're ready to start using Nostromo UI components!

- [Setup Guide](./setup) - Learn how to configure your project
- [View Components](../components/button) - Explore available components
