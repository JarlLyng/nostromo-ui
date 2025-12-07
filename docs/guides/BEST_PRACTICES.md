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

For detailed accessibility information, see [ACCESSIBILITY_GUIDE.md](./ACCESSIBILITY_GUIDE.md).

**Key Points:**
- Use semantic HTML elements
- Add ARIA attributes for complex interactions
- Implement proper focus management
- Ensure WCAG 2.1 AA color contrast
- Provide screen reader support

---

## 🎨 Theming Best Practices

For detailed theming information, see [THEMING.md](./THEMING.md).

**Key Points:**
- Use CSS variables for consistent theming
- Implement theme switching with `data-theme` attribute
- Support dark mode with `data-color-scheme` attribute
- Create custom themes by extending base theme variables

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

For detailed testing examples, see [DEVELOPMENT.md](./DEVELOPMENT.md#testing).

**Key Points:**
- Test components in isolation with Vitest + Testing Library
- Test accessibility with axe-core
- Test component interactions with integration tests
- Aim for 80%+ code coverage

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
