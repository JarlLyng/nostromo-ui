# Best Practices

This document provides comprehensive best practices for using Nostromo UI components effectively, including composition patterns, performance optimization, accessibility guidelines, and theming strategies.

## 📋 Contents

- [Component Composition](#component-composition)
- [Performance Optimization](#performance-optimization)
- [Accessibility Guidelines](#accessibility-guidelines)
- [Theming Best Practices](#theming-best-practices)
- [TypeScript Usage](#typescript-usage)
- [Testing Strategies](#testing-strategies)
- [Common Patterns](#common-patterns)
- [Anti-Patterns](#anti-patterns)

---

## 🧩 Component Composition

### Compound Components

Use compound components for complex UI patterns:

```tsx
// ✅ Good: Compound component pattern
<Card>
  <CardHeader>
    <CardTitle>Project Dashboard</CardTitle>
    <CardDescription>Overview of your projects</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span>Active Projects</span>
        <Badge variant="success">12</Badge>
      </div>
    </div>
  </CardContent>
  <CardFooter>
    <Button>View All</Button>
  </CardFooter>
</Card>

// ❌ Avoid: Monolithic components
<Card 
  title="Project Dashboard"
  description="Overview of your projects"
  content="..."
  footer="..."
/>
```

### Composition over Configuration

Prefer composition over complex prop configurations:

```tsx
// ✅ Good: Composition
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete Item</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete this item? This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <div className="flex justify-end space-x-2">
      <Button variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="destructive" onClick={onConfirm}>
        Delete
      </Button>
    </div>
  </DialogContent>
</Dialog>

// ❌ Avoid: Complex configuration
<Dialog
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Delete Item"
  description="Are you sure you want to delete this item?"
  actions={[
    { label: "Cancel", variant: "outline", onClick: onCancel },
    { label: "Delete", variant: "destructive", onClick: onConfirm }
  ]}
/>
```

### Custom Components

Create custom components that wrap Nostromo UI components:

```tsx
// ✅ Good: Custom component with business logic
interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="mail" size="sm" />
            <span className="text-sm text-muted-foreground">{user.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="phone" size="sm" />
            <span className="text-sm text-muted-foreground">{user.phone}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(user)}>
            <Icon name="edit" size="sm" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete(user)}>
            <Icon name="trash" size="sm" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
```

### Layout Components

Create layout components using Tailwind classes:

```tsx
// ✅ Good: Layout component
interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PageLayout({ children, title, description, actions }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {(title || description || actions) && (
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                {title && <h1 className="text-3xl font-bold">{title}</h1>}
                {description && <p className="text-muted-foreground mt-2">{description}</p>}
              </div>
              {actions && <div className="flex space-x-2">{actions}</div>}
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

// Usage
<PageLayout
  title="Users"
  description="Manage your team members"
  actions={
    <Button>
      <Icon name="plus" size="sm" />
      Add User
    </Button>
  }
>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {users.map(user => (
      <UserCard key={user.id} user={user} onEdit={handleEdit} onDelete={handleDelete} />
    ))}
  </div>
</PageLayout>
```

---

## ⚡ Performance Optimization

### Bundle Size Optimization

Use individual imports to enable tree shaking:

```tsx
// ✅ Good: Individual imports
import { Button } from '@nostromo/ui-core/button';
import { Input } from '@nostromo/ui-core/input';
import { Dialog } from '@nostromo/ui-core/dialog';

// ❌ Avoid: Package imports (larger bundle)
import { Button, Input, Dialog } from '@nostromo/ui-core';
```

### Lazy Loading

Implement lazy loading for heavy components:

```tsx
// ✅ Good: Lazy loading
import { lazy, Suspense } from 'react';
import { Skeleton } from '@nostromo/ui-core/skeleton';

const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Lightweight content */}
          </CardContent>
        </Card>
        
        <Suspense fallback={<Skeleton className="h-64 w-full" />}>
          <HeavyChart />
        </Suspense>
      </div>
    </div>
  );
}
```

### Memoization

Use React.memo for expensive components:

```tsx
// ✅ Good: Memoized component
interface ExpensiveListProps {
  items: Item[];
  onItemClick: (item: Item) => void;
}

export const ExpensiveList = React.memo(function ExpensiveList({ 
  items, 
  onItemClick 
}: ExpensiveListProps) {
  return (
    <div className="space-y-2">
      {items.map(item => (
        <div 
          key={item.id} 
          className="p-4 border rounded-lg cursor-pointer hover:bg-muted"
          onClick={() => onItemClick(item)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
});
```

### Virtual Scrolling

For large lists, implement virtual scrolling:

```tsx
// ✅ Good: Virtual scrolling for large datasets
import { FixedSizeList as List } from 'react-window';

interface VirtualListProps {
  items: Item[];
  height: number;
}

export function VirtualList({ items, height }: VirtualListProps) {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style} className="p-4 border-b">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={items[index].avatar} />
          <AvatarFallback>{items[index].name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{items[index].name}</p>
          <p className="text-sm text-muted-foreground">{items[index].email}</p>
        </div>
      </div>
    </div>
  );

  return (
    <List
      height={height}
      itemCount={items.length}
      itemSize={80}
      width="100%"
    >
      {Row}
    </List>
  );
}
```

### CSS Optimization

Use CSS variables for theming instead of runtime calculations:

```tsx
// ✅ Good: CSS variables (compile-time)
<div className="bg-brand-500 text-white">
  Content
</div>

// ❌ Avoid: Runtime calculations
<div style={{ backgroundColor: theme.colors.primary }}>
  Content
</div>
```

---

## ♿ Accessibility Guidelines

### Semantic HTML

Use semantic HTML elements:

```tsx
// ✅ Good: Semantic HTML
<main>
  <header>
    <h1>Page Title</h1>
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>
  
  <section aria-labelledby="content-heading">
    <h2 id="content-heading">Content</h2>
    <p>Content goes here</p>
  </section>
</main>

// ❌ Avoid: Non-semantic HTML
<div>
  <div>
    <div>Page Title</div>
    <div>
      <div><a href="/">Home</a></div>
      <div><a href="/about">About</a></div>
    </div>
  </div>
</div>
```

### ARIA Attributes

Use ARIA attributes for complex interactions:

```tsx
// ✅ Good: ARIA attributes
<Button
  aria-expanded={isOpen}
  aria-controls="menu"
  aria-haspopup="true"
  onClick={toggleMenu}
>
  Menu
</Button>

<div
  id="menu"
  role="menu"
  aria-hidden={!isOpen}
  className={cn("menu", isOpen && "open")}
>
  <div role="menuitem" tabIndex={0}>Item 1</div>
  <div role="menuitem" tabIndex={0}>Item 2</div>
</div>
```

### Focus Management

Implement proper focus management:

```tsx
// ✅ Good: Focus management
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

### Color Contrast

Ensure proper color contrast:

```tsx
// ✅ Good: High contrast colors
<Button className="bg-brand-600 text-white hover:bg-brand-700">
  Primary Action
</Button>

<Button variant="outline" className="border-brand-600 text-brand-600 hover:bg-brand-50">
  Secondary Action
</Button>

// ❌ Avoid: Low contrast
<Button className="bg-brand-300 text-brand-400">
  Low Contrast
</Button>
```

### Screen Reader Support

Provide screen reader support:

```tsx
// ✅ Good: Screen reader support
<Button
  aria-label="Close dialog"
  onClick={onClose}
>
  <Icon name="x" aria-hidden="true" />
</Button>

<Input
  label="Email"
  aria-describedby="email-help"
  helperText="We'll never share your email"
  id="email-help"
/>
```

---

## 🎨 Theming Best Practices

### CSS Variables

Use CSS variables for consistent theming:

```css
/* ✅ Good: CSS variables */
[data-theme="nostromo"] {
  --color-brand-50: 262 84% 95%;
  --color-brand-100: 262 84% 90%;
  --color-brand-500: 262 84% 52%;
  --color-brand-600: 262 84% 42%;
  --color-brand-900: 262 84% 15%;
  
  --color-success-500: 142 76% 36%;
  --color-warning-500: 38 92% 50%;
  --color-error-500: 0 84% 60%;
  
  --font-heading: "Inter", sans-serif;
  --font-body: "Inter", sans-serif;
  
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
}
```

### Theme Switching

Implement theme switching:

```tsx
// ✅ Good: Theme switching
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.setAttribute('data-color-scheme', systemTheme);
    } else {
      root.setAttribute('data-color-scheme', theme);
    }
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### Custom Themes

Create custom themes:

```css
/* ✅ Good: Custom theme */
[data-theme="custom"] {
  --color-brand-500: 200 100% 50%;
  --color-brand-600: 200 100% 40%;
  --color-brand-700: 200 100% 30%;
  
  --font-heading: "Poppins", sans-serif;
  --font-body: "Poppins", sans-serif;
  
  --radius-sm: 0.125rem;
  --radius-md: 0.25rem;
  --radius-lg: 0.5rem;
}
```

### Dark Mode

Implement dark mode support:

```css
/* ✅ Good: Dark mode */
[data-color-scheme="dark"] {
  --color-background: 0 0% 3%;
  --color-foreground: 0 0% 98%;
  --color-muted: 0 0% 14%;
  --color-muted-foreground: 0 0% 63%;
  
  --color-brand-500: 262 84% 52%;
  --color-brand-600: 262 84% 42%;
  --color-brand-700: 262 84% 32%;
}
```

---

## 📝 TypeScript Usage

### Component Props

Define proper TypeScript interfaces:

```tsx
// ✅ Good: Proper TypeScript interfaces
interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  className?: string;
}

export function UserCard({ user, onEdit, onDelete, className }: UserCardProps) {
  return (
    <Card className={className}>
      {/* Component content */}
    </Card>
  );
}
```

### Generic Components

Use generics for reusable components:

```tsx
// ✅ Good: Generic component
interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (row: T) => void;
  loading?: boolean;
}

export function DataTable<T>({ data, columns, onRowClick, loading }: DataTableProps<T>) {
  return (
    <Table data={data} columns={columns} onRowClick={onRowClick} loading={loading} />
  );
}

// Usage
<DataTable<User> data={users} columns={userColumns} onRowClick={handleUserClick} />
```

### Event Handlers

Type event handlers properly:

```tsx
// ✅ Good: Typed event handlers
interface FormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

function Form({ onSubmit, onCancel }: FormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form content */}
    </form>
  );
}
```

---

## 🧪 Testing Strategies

### Component Testing

Test components in isolation:

```tsx
// ✅ Good: Component testing
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@nostromo/ui-core/button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
  
  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Accessibility Testing

Test accessibility features:

```tsx
// ✅ Good: Accessibility testing
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '@nostromo/ui-core/button';

expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Integration Testing

Test component interactions:

```tsx
// ✅ Good: Integration testing
import { render, screen, fireEvent } from '@testing-library/react';
import { Dialog, DialogContent, DialogTrigger } from '@nostromo/ui-core/dialog';
import { Button } from '@nostromo/ui-core/button';

describe('Dialog Integration', () => {
  it('opens and closes dialog', () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <p>Dialog content</p>
        </DialogContent>
      </Dialog>
    );
    
    // Open dialog
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Dialog content')).toBeInTheDocument();
    
    // Close dialog
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByText('Dialog content')).not.toBeInTheDocument();
  });
});
```

---

## 🔄 Common Patterns

### Form Patterns

```tsx
// ✅ Good: Form pattern
interface UserFormProps {
  user?: User;
  onSubmit: (user: User) => void;
  onCancel: () => void;
}

export function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(formData as User);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        error={!!errors.name}
        helperText={errors.name}
      />
      
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        error={!!errors.email}
        helperText={errors.email}
      />
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}
```

### Loading States

```tsx
// ✅ Good: Loading states
function UserList({ users, loading, error }: UserListProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[160px]" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  if (error) {
    return (
      <Alert variant="error">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load users. Please try again.
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <div className="space-y-4">
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
```

### Error Boundaries

```tsx
// ✅ Good: Error boundary
class ComponentErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Component error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <Alert variant="error">
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            An error occurred while rendering this component.
          </AlertDescription>
        </Alert>
      );
    }
    
    return this.props.children;
  }
}
```

---

## ❌ Anti-Patterns

### Avoid These Patterns

```tsx
// ❌ Avoid: Inline styles
<Button style={{ backgroundColor: 'blue', color: 'white' }}>
  Button
</Button>

// ✅ Good: Use Tailwind classes
<Button className="bg-blue-500 text-white">
  Button
</Button>

// ❌ Avoid: Complex prop drilling
<Component
  prop1={value1}
  prop2={value2}
  prop3={value3}
  prop4={value4}
  prop5={value5}
  prop6={value6}
  prop7={value7}
  prop8={value8}
/>

// ✅ Good: Use composition
<Component>
  <ComponentHeader />
  <ComponentContent />
  <ComponentFooter />
</Component>

// ❌ Avoid: Runtime theme calculations
<div style={{ 
  backgroundColor: theme.colors.primary,
  color: theme.colors.text 
}}>
  Content
</div>

// ✅ Good: Use CSS variables
<div className="bg-brand-500 text-foreground">
  Content
</div>

// ❌ Avoid: Missing accessibility attributes
<button onClick={handleClick}>
  <Icon name="close" />
</button>

// ✅ Good: Include accessibility attributes
<button 
  onClick={handleClick}
  aria-label="Close dialog"
>
  <Icon name="close" aria-hidden="true" />
</button>
```

---

## 🚀 Getting Started

### 1. Follow the Patterns

Start with the patterns shown in this guide and adapt them to your needs.

### 2. Test Thoroughly

Always test your components for functionality, accessibility, and performance.

### 3. Keep It Simple

Prefer simple, composable solutions over complex configurations.

### 4. Document Your Components

Document your custom components and their usage patterns.

---

**Last Updated**: October 2025  
**Version**: 0.1.0 (Beta)

---

*These best practices are based on modern React patterns, accessibility standards, and performance optimization techniques.*
