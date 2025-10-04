# Troubleshooting

This document provides solutions to common issues when using Nostromo UI, including setup problems, build issues, theming conflicts, and performance problems.

## 📋 Contents

- [Common Setup Issues](#common-setup-issues)
- [Build Problems](#build-problems)
- [Theme Issues](#theme-issues)
- [Performance Problems](#performance-problems)
- [Accessibility Issues](#accessibility-issues)
- [Component Issues](#component-issues)
- [Debugging Tips](#debugging-tips)
- [Getting Help](#getting-help)

---

## 🔧 Common Setup Issues

### Installation Problems

#### Issue: Package not found
```
Error: Cannot resolve module '@nostromo/ui-core'
```

**Solution:**
```bash
# Check if packages are installed
npm list @nostromo/ui-core @nostromo/ui-marketing @nostromo/ui-tw

# Reinstall if missing
npm install @nostromo/ui-core @nostromo/ui-marketing @nostromo/ui-tw

# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### Issue: Version conflicts
```
Error: Conflicting peer dependencies
```

**Solution:**
```bash
# Check for version conflicts
npm ls

# Install specific versions
npm install @nostromo/ui-core@latest @nostromo/ui-marketing@latest @nostromo/ui-tw@latest

# Use resolutions in package.json
{
  "resolutions": {
    "@nostromo/ui-core": "latest",
    "@nostromo/ui-marketing": "latest",
    "@nostromo/ui-tw": "latest"
  }
}
```

### Tailwind Configuration Issues

#### Issue: Styles not applying
```
Components render but without styling
```

**Solution:**
```js
// tailwind.config.js
const nostromoPreset = require("@nostromo/ui-tw/tailwind.preset.js");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nostromo/**/*.{js,ts,jsx,tsx}"
  ],
  presets: [nostromoPreset],
  // Don't override the preset
  // theme: { ... } // ❌ Avoid this
};
```

#### Issue: CSS variables not working
```
CSS variables not being applied
```

**Solution:**
```tsx
// Import base styles
import "@nostromo/ui-tw/styles/base.css";

// Set theme on document
document.documentElement.setAttribute('data-theme', 'nostromo');

// Or use theme provider
import { ThemeProvider } from './theme-provider';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

### TypeScript Configuration Issues

#### Issue: Type errors
```
Cannot find module '@nostromo/ui-core/button'
```

**Solution:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src/**/*",
    "node_modules/@nostromo/**/*"
  ]
}
```

#### Issue: Missing type definitions
```
Property 'variant' does not exist on type 'ButtonProps'
```

**Solution:**
```tsx
// Import types explicitly
import type { ButtonProps } from '@nostromo/ui-core/button';

// Use proper typing
const MyButton: React.FC<ButtonProps> = ({ variant, size, ...props }) => {
  return <Button variant={variant} size={size} {...props} />;
};
```

---

## 🏗️ Build Problems

### Webpack Issues

#### Issue: Module resolution errors
```
Module not found: Can't resolve '@nostromo/ui-core'
```

**Solution:**
```js
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      '@nostromo/ui-core': path.resolve(__dirname, 'node_modules/@nostromo/ui-core'),
      '@nostromo/ui-marketing': path.resolve(__dirname, 'node_modules/@nostromo/ui-marketing'),
      '@nostromo/ui-tw': path.resolve(__dirname, 'node_modules/@nostromo/ui-tw'),
    }
  }
};
```

#### Issue: CSS not being processed
```
Tailwind classes not being applied
```

**Solution:**
```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  }
};
```

### Vite Issues

#### Issue: CSS variables not working
```
CSS variables not being processed by Vite
```

**Solution:**
```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer')
      ]
    }
  }
});
```

#### Issue: Build errors with TypeScript
```
Type errors during build
```

**Solution:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "skipLibCheck": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  }
}
```

### Next.js Issues

#### Issue: CSS not loading in production
```
Styles work in development but not in production
```

**Solution:**
```js
// next.config.js
const nostromoPreset = require("@nostromo/ui-tw/tailwind.preset.js");

module.exports = {
  experimental: {
    appDir: true
  },
  // Ensure CSS is processed
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader']
    });
    return config;
  }
};
```

#### Issue: Server-side rendering errors
```
Hydration mismatch errors
```

**Solution:**
```tsx
// Use dynamic imports for client-only components
import dynamic from 'next/dynamic';

const ClientOnlyComponent = dynamic(
  () => import('./ClientOnlyComponent'),
  { ssr: false }
);

// Or use useEffect for client-side only code
useEffect(() => {
  // Client-side only code
}, []);
```

---

## 🎨 Theme Issues

### CSS Variables Not Working

#### Issue: Theme not applying
```
Components render with default styles instead of theme
```

**Solution:**
```tsx
// Check if theme is set
console.log(document.documentElement.getAttribute('data-theme'));

// Set theme explicitly
document.documentElement.setAttribute('data-theme', 'nostromo');

// Or use theme provider
import { ThemeProvider } from './theme-provider';

function App() {
  return (
    <ThemeProvider theme="nostromo">
      <YourApp />
    </ThemeProvider>
  );
}
```

#### Issue: Custom theme not working
```
Custom theme variables not being applied
```

**Solution:**
```css
/* Ensure custom theme is defined correctly */
[data-theme="custom"] {
  --color-brand-500: 200 100% 50%;
  --color-brand-600: 200 100% 40%;
  --color-brand-700: 200 100% 30%;
}

/* Check if theme is applied */
[data-theme="custom"] .bg-brand-500 {
  background-color: hsl(var(--color-brand-500));
}
```

### Dark Mode Issues

#### Issue: Dark mode not switching
```
Dark mode toggle not working
```

**Solution:**
```tsx
// Check if dark mode is properly implemented
function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-color-scheme', isDark ? 'dark' : 'light');
  }, [isDark]);
  
  return (
    <Button onClick={() => setIsDark(!isDark)}>
      {isDark ? 'Light' : 'Dark'} Mode
    </Button>
  );
}
```

#### Issue: Dark mode styles not applying
```
Dark mode styles not being applied
```

**Solution:**
```css
/* Ensure dark mode styles are defined */
[data-color-scheme="dark"] {
  --color-background: 0 0% 3%;
  --color-foreground: 0 0% 98%;
  --color-muted: 0 0% 14%;
  --color-muted-foreground: 0 0% 63%;
}

/* Check if dark mode is applied */
[data-color-scheme="dark"] .bg-background {
  background-color: hsl(var(--color-background));
}
```

### Theme Switching Issues

#### Issue: Theme switching not working
```
Theme switching between different themes not working
```

**Solution:**
```tsx
// Implement proper theme switching
function ThemeSwitcher() {
  const [theme, setTheme] = useState('nostromo');
  
  const themes = ['nostromo', 'mother', 'lv-426', 'sulaco'];
  
  const switchTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };
  
  return (
    <Select value={theme} onValueChange={switchTheme}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {themes.map(themeName => (
          <SelectItem key={themeName} value={themeName}>
            {themeName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
```

---

## ⚡ Performance Problems

### Bundle Size Issues

#### Issue: Bundle size too large
```
Bundle size is larger than expected
```

**Solution:**
```tsx
// Use individual imports
import { Button } from '@nostromo/ui-core/button';
import { Input } from '@nostromo/ui-core/input';

// ❌ Avoid package imports
import { Button, Input } from '@nostromo/ui-core';

// Check bundle size
npm run build
npx bundle-analyzer dist/
```

#### Issue: Tree shaking not working
```
Unused components still included in bundle
```

**Solution:**
```js
// webpack.config.js
module.exports = {
  optimization: {
    usedExports: true,
    sideEffects: false
  }
};

// Check if components are tree-shakeable
import { Button } from '@nostromo/ui-core/button';
// Only Button will be included in bundle
```

### Runtime Performance Issues

#### Issue: Components rendering slowly
```
Components are slow to render
```

**Solution:**
```tsx
// Use React.memo for expensive components
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
});

// Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return data.reduce((sum, item) => sum + item.value, 0);
}, [data]);
```

#### Issue: Memory leaks
```
Memory usage increasing over time
```

**Solution:**
```tsx
// Clean up event listeners
useEffect(() => {
  const handleResize = () => {
    // Handle resize
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

// Clean up timers
useEffect(() => {
  const timer = setInterval(() => {
    // Do something
  }, 1000);
  
  return () => {
    clearInterval(timer);
  };
}, []);
```

### Lazy Loading Issues

#### Issue: Lazy loading not working
```
Lazy loaded components not rendering
```

**Solution:**
```tsx
// Use proper lazy loading
import { lazy, Suspense } from 'react';
import { Skeleton } from '@nostromo/ui-core/skeleton';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<Skeleton className="h-64 w-full" />}>
      <LazyComponent />
    </Suspense>
  );
}
```

---

## ♿ Accessibility Issues

### Screen Reader Issues

#### Issue: Screen reader not announcing content
```
Screen reader not reading component content
```

**Solution:**
```tsx
// Add proper ARIA attributes
<Button
  aria-label="Close dialog"
  onClick={onClose}
>
  <Icon name="x" aria-hidden="true" />
</Button>

// Use semantic HTML
<main>
  <h1>Page Title</h1>
  <section aria-labelledby="content-heading">
    <h2 id="content-heading">Content</h2>
    <p>Content goes here</p>
  </section>
</main>
```

#### Issue: Focus management problems
```
Focus not moving to modal when opened
```

**Solution:**
```tsx
// Implement proper focus management
function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      firstElement?.focus();
    }
  }, [isOpen]);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent ref={modalRef}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
```

### Keyboard Navigation Issues

#### Issue: Keyboard navigation not working
```
Components not responding to keyboard input
```

**Solution:**
```tsx
// Add keyboard event handlers
function CustomButton({ onClick, children }: ButtonProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };
  
  return (
    <button
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {children}
    </button>
  );
}
```

### Color Contrast Issues

#### Issue: Text not readable
```
Text color not meeting contrast requirements
```

**Solution:**
```tsx
// Use high contrast colors
<Button className="bg-brand-600 text-white hover:bg-brand-700">
  High Contrast Button
</Button>

// Check contrast ratios
// Use tools like WebAIM Contrast Checker
// Ensure 4.5:1 ratio for normal text
// Ensure 3:1 ratio for large text
```

---

## 🧩 Component Issues

### Button Issues

#### Issue: Button not responding to clicks
```
Button onClick not working
```

**Solution:**
```tsx
// Check if button is disabled
<Button disabled={isLoading} onClick={handleClick}>
  Click me
</Button>

// Check if event is being prevented
const handleClick = (e: React.MouseEvent) => {
  e.preventDefault(); // ❌ This prevents default behavior
  // e.stopPropagation(); // Use this instead if needed
  onClick();
};

// Check if button is inside a form
<form onSubmit={handleSubmit}>
  <Button type="button" onClick={handleClick}>
    Click me
  </Button>
</form>
```

#### Issue: Button loading state not working
```
Button loading state not showing
```

**Solution:**
```tsx
// Use proper loading state
<Button 
  loading={isLoading}
  loadingText="Loading..."
  disabled={isLoading}
>
  Save
</Button>

// Or use state variants
<Button 
  state={isLoading ? "loading" : "default"}
  disabled={isLoading}
>
  Save
</Button>
```

### Input Issues

#### Issue: Input validation not working
```
Input validation not showing errors
```

**Solution:**
```tsx
// Implement proper validation
const [errors, setErrors] = useState<Record<string, string>>({});

const validateInput = (value: string) => {
  if (!value) {
    setErrors(prev => ({ ...prev, email: 'Email is required' }));
  } else if (!/\S+@\S+\.\S+/.test(value)) {
    setErrors(prev => ({ ...prev, email: 'Email is invalid' }));
  } else {
    setErrors(prev => ({ ...prev, email: '' }));
  }
};

<Input
  label="Email"
  type="email"
  error={!!errors.email}
  helperText={errors.email}
  onChange={(e) => validateInput(e.target.value)}
/>
```

#### Issue: Input focus not working
```
Input not receiving focus
```

**Solution:**
```tsx
// Use refs for focus management
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  if (inputRef.current) {
    inputRef.current.focus();
  }
}, []);

<Input
  ref={inputRef}
  label="Email"
  type="email"
/>
```

### Dialog Issues

#### Issue: Dialog not closing
```
Dialog not closing when clicking outside
```

**Solution:**
```tsx
// Use proper dialog props
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    Content here
  </DialogContent>
</Dialog>

// Or handle close manually
<Dialog open={isOpen} onOpenChange={(open) => {
  if (!open) {
    setIsOpen(false);
  }
}}>
  <DialogContent>
    <Button onClick={() => setIsOpen(false)}>
      Close
    </Button>
  </DialogContent>
</Dialog>
```

#### Issue: Dialog backdrop not working
```
Dialog backdrop not preventing clicks
```

**Solution:**
```tsx
// Check if backdrop is enabled
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent backdropVariant="default">
    Content
  </DialogContent>
</Dialog>

// Or handle backdrop clicks
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <div onClick={(e) => e.stopPropagation()}>
      Content
    </div>
  </DialogContent>
</Dialog>
```

---

## 🔍 Debugging Tips

### Console Debugging

```tsx
// Add debug logging
console.log('Component props:', props);
console.log('Component state:', state);
console.log('Component refs:', refs);

// Use React DevTools
// Install React Developer Tools browser extension
// Use Profiler to check performance
// Use Components tab to inspect props and state
```

### CSS Debugging

```css
/* Add debug borders */
.debug {
  border: 2px solid red !important;
}

/* Check if styles are applied */
.bg-brand-500 {
  background-color: hsl(var(--color-brand-500)) !important;
}

/* Check if theme is applied */
[data-theme="nostromo"] {
  --color-brand-500: 262 84% 52%;
}
```

### Performance Debugging

```tsx
// Use React DevTools Profiler
// Check for unnecessary re-renders
// Use why-did-you-render
import whyDidYouRender from '@welldone-software/why-did-you-render';

whyDidYouRender(React, {
  trackAllPureComponents: true,
});

// Use performance monitoring
const startTime = performance.now();
// Component logic
const endTime = performance.now();
console.log(`Component took ${endTime - startTime} milliseconds`);
```

### Network Debugging

```bash
# Check bundle size
npm run build
npx bundle-analyzer dist/

# Check for unused dependencies
npx depcheck

# Check for circular dependencies
npx madge --circular src/
```

---

## 🆘 Getting Help

### Documentation

- **API Reference**: [API_REFERENCE.md](./API_REFERENCE.md)
- **Migration Guides**: [MIGRATION_GUIDES.md](./MIGRATION_GUIDES.md)
- **Best Practices**: [BEST_PRACTICES.md](./BEST_PRACTICES.md)
- **Component Examples**: [Storybook](https://jarllyng.github.io/nostromo-ui/storybook-static/)

### Community Support

- **GitHub Issues**: [Report bugs and request features](https://github.com/JarlLyng/nostromo-ui/issues)
- **GitHub Discussions**: [Ask questions and share ideas](https://github.com/JarlLyng/nostromo-ui/discussions)
- **Discord**: [Join our Discord server](https://discord.gg/nostromo-ui) (Coming soon)

### Professional Support

- **Enterprise Support**: [Contact us](mailto:support@nostromo-ui.com) for enterprise support
- **Custom Development**: [Hire us](mailto:dev@nostromo-ui.com) for custom component development
- **Training**: [Book a training session](mailto:training@nostromo-ui.com) for team training

### Reporting Issues

When reporting issues, please include:

1. **Environment**: Node.js version, package manager, build tool
2. **Reproduction**: Steps to reproduce the issue
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Code Example**: Minimal code example
6. **Error Messages**: Full error messages and stack traces
7. **Screenshots**: If applicable

### Issue Templates

Use our issue templates for:
- **Bug Reports**: [Bug report template](https://github.com/JarlLyng/nostromo-ui/issues/new?template=bug_report.md)
- **Feature Requests**: [Feature request template](https://github.com/JarlLyng/nostromo-ui/issues/new?template=feature_request.md)
- **Questions**: [Question template](https://github.com/JarlLyng/nostromo-ui/issues/new?template=question.md)

---

**Last Updated**: December 2024  
**Version**: 0.1.0 (Beta)

---

*This troubleshooting guide is continuously updated based on community feedback and common issues.*
