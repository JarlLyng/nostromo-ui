# 📚 Nostromo UI - API Reference

Komplet API reference for alle Nostromo UI komponenter, hooks og utilities.

## 📋 Indhold

- [🔧 Core Components](#core-components)
- [🎣 Hooks & Utilities](#hooks--utilities)
- [🎨 Theming API](#theming-api)
- [📦 Package Exports](#package-exports)
- [🔍 Type Definitions](#type-definitions)

## 🔧 Core Components

### **Button**

Primær knap komponent med loading states og accessibility support.

```tsx
import { Button } from "@nostromo/ui-core";
```

#### Props
```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  loadingText?: string;
}
```

#### Variants
- **`primary`** - Primær knap med brand farve
- **`secondary`** - Sekundær knap med neutral farve
- **`ghost`** - Transparent knap med hover effekt
- **`destructive`** - Knap til destructive handlinger

#### Sizes
- **`sm`** - Small (32px højde)
- **`md`** - Medium (40px højde) - Default
- **`lg`** - Large (48px højde)

#### Examples
```tsx
// Basic usage
<Button>Click me</Button>

// With variant and size
<Button variant="primary" size="lg">Primary Large</Button>

// Loading state
<Button loading loadingText="Saving...">Save</Button>

// Disabled state
<Button disabled>Disabled</Button>
```

---

### **Input**

Form input komponent med validation states.

```tsx
import { Input } from "@nostromo/ui-core";
```

#### Props
```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "error" | "success";
  size?: "sm" | "md" | "lg";
}
```

#### Variants
- **`default`** - Standard input styling
- **`error`** - Error state med rød border
- **`success`** - Success state med grøn border

#### Examples
```tsx
// Basic input
<Input placeholder="Enter text" />

// With variant
<Input variant="error" placeholder="Invalid input" />

// With size
<Input size="lg" placeholder="Large input" />

// Controlled input
<Input 
  value={value} 
  onChange={(e) => setValue(e.target.value)} 
  placeholder="Controlled input" 
/>
```

---

### **Dialog**

Modal dialog komponent med accessibility og focus management.

```tsx
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@nostromo/ui-core";
```

#### Dialog Props
```tsx
interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}
```

#### DialogContent Props
```tsx
interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}
```

#### Examples
```tsx
// Basic dialog
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <p>Dialog content goes here</p>
  </DialogContent>
</Dialog>

// Controlled dialog
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent onClose={() => setIsOpen(false)}>
    <DialogHeader>
      <DialogTitle>Controlled Dialog</DialogTitle>
    </DialogHeader>
    <p>This dialog is controlled by state</p>
  </DialogContent>
</Dialog>
```

---

### **Card**

Indholdskort komponent med header, content og footer sektioner.

```tsx
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter 
} from "@nostromo/ui-core";
```

#### Props
Alle Card komponenter accepterer standard HTML div props plus:
```tsx
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  // Ingen specifikke props - brug className for styling
}
```

#### Examples
```tsx
// Basic card
<Card>
  <CardHeader>
    <h3>Card Title</h3>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Card with custom styling
<Card className="max-w-md mx-auto">
  <CardHeader className="text-center">
    <h2 className="text-2xl font-bold">Featured</h2>
  </CardHeader>
  <CardContent>
    <p>This is a featured card with custom styling</p>
  </CardContent>
</Card>
```

---

### **Badge**

Status og label komponent.

```tsx
import { Badge } from "@nostromo/ui-core";
```

#### Props
```tsx
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}
```

#### Variants
- **`default`** - Standard badge med brand farve
- **`secondary`** - Sekundær badge med neutral farve
- **`destructive`** - Destructive badge med error farve
- **`outline`** - Outline badge med border

#### Examples
```tsx
// Basic badge
<Badge>New</Badge>

// With variant
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Outline</Badge>

// With custom content
<Badge>
  <span className="mr-1">🔔</span>
  Notifications
</Badge>
```

---

### **Avatar**

Bruger avatar komponent med image support og fallbacks.

```tsx
import { 
  Avatar, 
  AvatarImage, 
  AvatarFallback 
} from "@nostromo/ui-core";
```

#### Avatar Props
```tsx
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}
```

#### AvatarImage Props
```tsx
interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  // Standard img props
}
```

#### AvatarFallback Props
```tsx
interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {
  // Standard span props
}
```

#### Examples
```tsx
// Basic avatar
<Avatar>
  <AvatarImage src="/user.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

// Different sizes
<Avatar size="sm">
  <AvatarImage src="/user.jpg" alt="Small" />
  <AvatarFallback>SM</AvatarFallback>
</Avatar>

<Avatar size="lg">
  <AvatarImage src="/user.jpg" alt="Large" />
  <AvatarFallback>LG</AvatarFallback>
</Avatar>

// Fallback when image fails
<Avatar>
  <AvatarImage src="/nonexistent.jpg" alt="User" />
  <AvatarFallback>AB</AvatarFallback>
</Avatar>
```

---

## 🎣 Hooks & Utilities

### **ErrorBoundary**

Error boundary komponent til at fange JavaScript fejl.

```tsx
import { ErrorBoundary } from "@nostromo/ui-core";
```

#### Props
```tsx
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{
    error: Error;
    resetError: () => void;
  }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}
```

#### Examples
```tsx
// Basic error boundary
<ErrorBoundary>
  <RiskyComponent />
</ErrorBoundary>

// With custom fallback
<ErrorBoundary
  fallback={({ error, resetError }) => (
    <div>
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <Button onClick={resetError}>Try again</Button>
    </div>
  )}
>
  <RiskyComponent />
</ErrorBoundary>

// With error callback
<ErrorBoundary
  onError={(error, errorInfo) => {
    console.error('Error caught:', error, errorInfo);
    // Send to error reporting service
  }}
>
  <RiskyComponent />
</ErrorBoundary>
```

### **useErrorHandler**

Hook til at håndtere fejl i functional components.

```tsx
import { useErrorHandler } from "@nostromo/ui-core";
```

#### Usage
```tsx
function MyComponent() {
  const handleError = useErrorHandler();

  const riskyOperation = async () => {
    try {
      await someAsyncOperation();
    } catch (error) {
      handleError(error);
    }
  };

  return <button onClick={riskyOperation}>Risky Operation</button>;
}
```

---

### **Lazy Loading**

#### LazyComponent

Wrapper komponent til lazy loading med error boundary.

```tsx
import { LazyComponent } from "@nostromo/ui-core";
```

#### Props
```tsx
interface LazyComponentProps {
  children: React.ReactNode;
  fallback?: React.ComponentType;
  errorFallback?: React.ComponentType<{
    error: Error;
    retry: () => void;
  }>;
}
```

#### Examples
```tsx
// Basic lazy loading
<LazyComponent>
  <HeavyComponent />
</LazyComponent>

// With custom fallback
<LazyComponent fallback={() => <div>Loading...</div>}>
  <HeavyComponent />
</LazyComponent>

// With error fallback
<LazyComponent
  errorFallback={({ error, retry }) => (
    <div>
      <p>Failed to load: {error.message}</p>
      <Button onClick={retry}>Retry</Button>
    </div>
  )}
>
  <HeavyComponent />
</LazyComponent>
```

#### withLazyLoading

HOC til at wrappe komponenter med lazy loading.

```tsx
import { withLazyLoading } from "@nostromo/ui-core";

const LazyHeavyComponent = withLazyLoading(HeavyComponent);
```

#### useLazyLoading

Hook til lazy loading med intersection observer.

```tsx
import { useLazyLoading } from "@nostromo/ui-core";

function MyComponent() {
  const { ref, isVisible } = useLazyLoading({
    threshold: 0.1,
    rootMargin: '50px'
  });

  return (
    <div ref={ref}>
      {isVisible ? <HeavyComponent /> : <div>Loading...</div>}
    </div>
  );
}
```

#### LazyInView

Komponent der lazy loader når den kommer i view.

```tsx
import { LazyInView } from "@nostromo/ui-core";

<LazyInView>
  <HeavyComponent />
</LazyInView>
```

---

### **Performance Monitoring**

#### usePerformanceMonitor

Hook til at overvåge komponent performance.

```tsx
import { usePerformanceMonitor } from "@nostromo/ui-core";
```

#### Options
```tsx
interface PerformanceOptions {
  enabled?: boolean;
  logToConsole?: boolean;
  onMetric?: (metric: PerformanceMetrics) => void;
  threshold?: number;
}

interface PerformanceMetrics {
  renderTime: number;
  componentName: string;
  timestamp: number;
}
```

#### Examples
```tsx
function MyComponent() {
  usePerformanceMonitor('MyComponent', {
    threshold: 100,
    onMetric: (metric) => {
      console.log(`${metric.componentName} took ${metric.renderTime}ms`);
    }
  });

  return <div>Component content</div>;
}
```

#### withPerformanceMonitoring

HOC til at wrappe komponenter med performance monitoring.

```tsx
import { withPerformanceMonitoring } from "@nostromo/ui-core";

const MonitoredComponent = withPerformanceMonitoring(
  MyComponent,
  'MyComponent',
  {
    threshold: 100,
    onMetric: (metric) => console.log(metric)
  }
);
```

#### useBundleSize

Hook til at overvåge bundle size.

```tsx
import { useBundleSize } from "@nostromo/ui-core";

function MyComponent() {
  const bundleSize = useBundleSize();

  return (
    <div>
      <p>Bundle size: {bundleSize} bytes</p>
    </div>
  );
}
```

#### useMemoryMonitor

Hook til at overvåge memory usage.

```tsx
import { useMemoryMonitor } from "@nostromo/ui-core";

function MyComponent() {
  const memoryUsage = useMemoryMonitor();

  return (
    <div>
      <p>Memory usage: {memoryUsage.usedJSHeapSize} bytes</p>
    </div>
  );
}
```

---

### **Performance Utilities**

#### debounce

Utility til at debounce function calls.

```tsx
import { debounce } from "@nostromo/ui-core";

const debouncedSearch = debounce((query: string) => {
  // Search logic
}, 300);
```

#### throttle

Utility til at throttle function calls.

```tsx
import { throttle } from "@nostromo/ui-core";

const throttledScroll = throttle((event: Event) => {
  // Scroll logic
}, 100);
```

#### memoize

Utility til at memoize function results.

```tsx
import { memoize } from "@nostromo/ui-core";

const expensiveCalculation = memoize((input: number) => {
  // Expensive calculation
  return input * input;
});
```

---

## 🎨 Theming API

### **CSS Variables**

Alle temaer bruger CSS variabler i HSL format:

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

  /* Semantic colors */
  --color-success-500: 142 76% 36%;
  --color-warning-500: 38 92% 50%;
  --color-error-500: 0 84% 60%;
  --color-info-500: 199 89% 48%;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;

  /* Border radius */
  --radius-none: 0px;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;

  /* Typography */
  --font-heading: "Inter", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", monospace;
}
```

### **Tailwind Classes**

Tailwind preset genererer classes baseret på CSS variablerne:

```css
/* Brand colors */
.bg-brand-500 { background-color: hsl(var(--color-brand-500)); }
.text-brand-500 { color: hsl(var(--color-brand-500)); }
.border-brand-500 { border-color: hsl(var(--color-brand-500)); }

/* Neutral colors */
.bg-neutral-100 { background-color: hsl(var(--color-neutral-100)); }
.text-neutral-900 { color: hsl(var(--color-neutral-900)); }

/* Semantic colors */
.bg-success-500 { background-color: hsl(var(--color-success-500)); }
.bg-warning-500 { background-color: hsl(var(--color-warning-500)); }
.bg-error-500 { background-color: hsl(var(--color-error-500)); }
.bg-info-500 { background-color: hsl(var(--color-info-500)); }

/* Border radius */
.rounded-sm { border-radius: var(--radius-sm); }
.rounded-md { border-radius: var(--radius-md); }
.rounded-lg { border-radius: var(--radius-lg); }

/* Typography */
.font-heading { font-family: var(--font-heading); }
.font-body { font-family: var(--font-body); }
.font-mono { font-family: var(--font-mono); }
```

---

## 📦 Package Exports

### **@nostromo/ui-core**

```tsx
// Core components
export { Button } from './components/button';
export { Input } from './components/input';
export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/dialog';
export { Card, CardHeader, CardContent, CardFooter } from './components/card';
export { Badge } from './components/badge';
export { Avatar, AvatarImage, AvatarFallback } from './components/avatar';

// Error handling
export { ErrorBoundary } from './components/error-boundary';
export { useErrorHandler } from './components/error-boundary';

// Lazy loading
export { LazyComponent, withLazyLoading, useLazyLoading, LazyInView } from './lib/lazy';

// Performance monitoring
export { 
  usePerformanceMonitor, 
  withPerformanceMonitoring,
  useBundleSize,
  useMemoryMonitor,
  debounce,
  throttle,
  memoize
} from './lib/performance';
```

### **@nostromo/ui-tw**

```tsx
// Tailwind preset
export { default as tailwindPreset } from './tailwind.preset';

// Base styles
export './styles/base.css';

// Themes
export './themes/nostromo.css';
export './themes/mother.css';
export './themes/lv-426.css';
export './themes/sulaco.css';
```

---

## 🔍 Type Definitions

### **Common Types**

```tsx
// Size variants
type Size = "sm" | "md" | "lg";

// Color variants
type Variant = "primary" | "secondary" | "ghost" | "destructive";

// State variants
type State = "default" | "loading" | "disabled";

// Theme variants
type Theme = "nostromo" | "mother" | "lv-426" | "sulaco";

// Performance metrics
interface PerformanceMetrics {
  renderTime: number;
  componentName: string;
  timestamp: number;
}

// Error info
interface ErrorInfo {
  componentStack: string;
  errorBoundary?: string;
}
```

### **Component Props Base**

```tsx
interface BaseComponentProps {
  // Styling
  className?: string;
  
  // Accessibility
  id?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  
  // State
  disabled?: boolean;
  loading?: boolean;
  
  // Events
  onClick?: (event: MouseEvent) => void;
  onChange?: (event: ChangeEvent) => void;
}
```

---

**💡 Tip**: Brug TypeScript for fuld type safety og IntelliSense support. Alle komponenter er fuldt typed og følger TypeScript best practices.
