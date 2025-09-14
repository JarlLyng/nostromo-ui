# 🎯 Nostromo UI - Praktiske Eksempler & Use Cases

Denne fil indeholder praktiske eksempler og use cases for Nostromo UI komponenter. Brug disse som inspiration og reference når du bygger dine applikationer.

## 📋 Indhold

- [🚀 Quick Start Eksempler](#quick-start-eksempler)
- [🎨 Theming Eksempler](#theming-eksempler)
- [🧩 Komponent Eksempler](#komponent-eksempler)
- [📱 Real-world Use Cases](#real-world-use-cases)
- [🔧 Advanced Patterns](#advanced-patterns)
- [🎯 Best Practices](#best-practices)

## 🚀 Quick Start Eksempler

### **Basis Setup**
```tsx
// 1. Installer pakker
// npm install @nostromo/ui-core @nostromo/ui-tw

// 2. Tailwind konfiguration
// tailwind.config.js
const nostromoPreset = require("@nostromo/ui-tw/tailwind.preset.js");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nostromo/**/*.{js,ts,jsx,tsx}"
  ],
  presets: [nostromoPreset],
};

// 3. Import base CSS
// main.tsx
import "@nostromo/ui-tw/styles/base.css";
import "@nostromo/ui-tw/themes/nostromo.css";

// 4. Brug komponenter
import { Button, Input, Dialog } from "@nostromo/ui-core";

function App() {
  return (
    <div className="p-8 space-y-4">
      <Button variant="primary">Start Mission</Button>
      <Input placeholder="Enter your name" />
    </div>
  );
}
```

### **Første Komponenter**
```tsx
import { Button, Input, Card, Badge } from "@nostromo/ui-core";

function WelcomePage() {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <h1 className="text-2xl font-bold">Welcome to Nostromo</h1>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Email address" type="email" />
        <Input placeholder="Password" type="password" />
        <Button className="w-full" variant="primary">
          Sign In
        </Button>
      </CardContent>
      <CardFooter>
        <Badge variant="secondary">New User</Badge>
      </CardFooter>
    </Card>
  );
}
```

## 🎨 Theming Eksempler

### **Basis Tema Skift**
```tsx
import { useState } from 'react';

function ThemeToggle() {
  const [theme, setTheme] = useState('nostromo');
  
  const themes = [
    { id: 'nostromo', name: 'Nostromo', description: 'Dark, technical aesthetic' },
    { id: 'mother', name: 'Mother', description: 'Cold, clinical style' },
    { id: 'lv-426', name: 'LV-426', description: 'Warm, rusty atmosphere' },
    { id: 'sulaco', name: 'Sulaco', description: 'Modern, military-inspired' }
  ];

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Choose Theme</h3>
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => changeTheme(t.id)}
          className={`p-3 rounded-md border-2 transition-colors ${
            theme === t.id 
              ? 'border-brand-500 bg-brand-50' 
              : 'border-neutral-200 hover:border-neutral-300'
          }`}
        >
          <div className="font-medium">{t.name}</div>
          <div className="text-sm text-neutral-600">{t.description}</div>
        </button>
      ))}
    </div>
  );
}
```

### **Custom Tema**
```css
/* custom-theme.css */
[data-theme="mybrand"] {
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

  /* Styling */
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

```tsx
// Anvend custom tema
function App() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'mybrand');
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-brand-500">
        My Custom Brand
      </h1>
      <Button variant="primary">Custom Brand Button</Button>
    </div>
  );
}
```

## 🧩 Komponent Eksempler

### **Button Variants**
```tsx
import { Button } from "@nostromo/ui-core";

function ButtonShowcase() {
  return (
    <div className="space-y-4">
      {/* Variants */}
      <div className="flex gap-2">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>

      {/* Sizes */}
      <div className="flex items-center gap-2">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>

      {/* States */}
      <div className="flex gap-2">
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
        <Button loading loadingText="Saving...">Save</Button>
      </div>
    </div>
  );
}
```

### **Form Eksempel**
```tsx
import { Button, Input, Card, CardHeader, CardContent, CardFooter } from "@nostromo/ui-core";
import { useState } from 'react';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    console.log('Login:', formData);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <p className="text-neutral-600 text-center">
          Enter your credentials to access the system
        </p>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              required
            />
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full" 
            loading={isLoading}
            loadingText="Signing in..."
          >
            Sign In
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
```

### **Dialog Eksempel**
```tsx
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@nostromo/ui-core";
import { useState } from 'react';

function ConfirmDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    console.log('Action confirmed');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Item</Button>
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-neutral-600">
            This action cannot be undone. This will permanently delete the item
            and remove it from our servers.
          </p>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

### **Avatar Eksempler**
```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@nostromo/ui-core";

function AvatarShowcase() {
  return (
    <div className="space-y-4">
      {/* Basic Avatar */}
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="/user1.jpg" alt="User 1" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        
        <Avatar>
          <AvatarImage src="/user2.jpg" alt="User 2" />
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        
        {/* Fallback when image fails */}
        <Avatar>
          <AvatarImage src="/nonexistent.jpg" alt="User 3" />
          <AvatarFallback>CD</AvatarFallback>
        </Avatar>
      </div>

      {/* Different Sizes */}
      <div className="flex items-center gap-4">
        <Avatar size="sm">
          <AvatarImage src="/user1.jpg" alt="Small" />
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        
        <Avatar size="md">
          <AvatarImage src="/user1.jpg" alt="Medium" />
          <AvatarFallback>MD</AvatarFallback>
        </Avatar>
        
        <Avatar size="lg">
          <AvatarImage src="/user1.jpg" alt="Large" />
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
```

## 📱 Real-world Use Cases

### **Dashboard Layout**
```tsx
import { Button, Card, CardHeader, CardContent, Badge, Avatar, AvatarImage, AvatarFallback } from "@nostromo/ui-core";

function Dashboard() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Nostromo Dashboard</h1>
          <div className="flex items-center gap-4">
            <Badge variant="secondary">Beta</Badge>
            <Avatar>
              <AvatarImage src="/admin.jpg" alt="Admin" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Total Users</h3>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brand-500">1,234</div>
              <p className="text-sm text-neutral-600">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Revenue</h3>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success-500">$45,678</div>
              <p className="text-sm text-neutral-600">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Active Sessions</h3>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning-500">567</div>
              <p className="text-sm text-neutral-600">+3% from last hour</p>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <Button variant="primary">Create New</Button>
          <Button variant="secondary">Export Data</Button>
          <Button variant="ghost">Settings</Button>
        </div>
      </main>
    </div>
  );
}
```

### **User Profile Form**
```tsx
import { Button, Input, Card, CardHeader, CardContent, CardFooter, Avatar, AvatarImage, AvatarFallback } from "@nostromo/ui-core";
import { useState } from 'react';

function UserProfile() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Software engineer with a passion for UI/UX design.',
    avatar: '/user.jpg'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Profile Settings</h2>
          <p className="text-neutral-600">Update your personal information</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-4">
            <Avatar size="lg">
              <AvatarImage src={profile.avatar} alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <Button variant="secondary" size="sm">Change Avatar</Button>
              <p className="text-sm text-neutral-600 mt-1">
                JPG, PNG or GIF. Max size 2MB.
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
              rows={4}
              value={profile.bio}
              onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end gap-2">
          <Button variant="ghost">Cancel</Button>
          <Button 
            variant="primary" 
            onClick={handleSave}
            loading={isLoading}
            loadingText="Saving..."
          >
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
```

### **Notification System**
```tsx
import { Button, Card, CardContent, Badge } from "@nostromo/ui-core";
import { useState } from 'react';

function NotificationCenter() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New message', message: 'You have a new message from John', type: 'info', read: false },
    { id: 2, title: 'System update', message: 'System will be updated tonight at 2 AM', type: 'warning', read: false },
    { id: 3, title: 'Payment received', message: 'Payment of $150 has been received', type: 'success', read: true },
    { id: 4, title: 'Error occurred', message: 'Failed to process your request', type: 'error', read: false },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-success-500';
      case 'warning': return 'text-warning-500';
      case 'error': return 'text-error-500';
      default: return 'text-info-500';
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Notifications</h2>
        <Badge variant="secondary">
          {notifications.filter(n => !n.read).length} unread
        </Badge>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`cursor-pointer transition-colors ${
              notification.read ? 'opacity-60' : 'border-l-4 border-l-brand-500'
            }`}
            onClick={() => markAsRead(notification.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium">{notification.title}</h3>
                  <p className="text-sm text-neutral-600 mt-1">
                    {notification.message}
                  </p>
                </div>
                <div className={`w-2 h-2 rounded-full ${getTypeColor(notification.type)}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

## 🔧 Advanced Patterns

### **Error Boundary Integration**
```tsx
import { ErrorBoundary } from "@nostromo/ui-core";

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </ErrorBoundary>
  );
}
```

### **Performance Monitoring**
```tsx
import { withPerformanceMonitoring } from "@nostromo/ui-core";

const MonitoredComponent = withPerformanceMonitoring(
  function ExpensiveComponent() {
    // Expensive operations here
    return <div>Heavy component content</div>;
  },
  'ExpensiveComponent',
  {
    threshold: 100, // Log if render takes > 100ms
    onMetric: (metric) => {
      console.log(`Component ${metric.componentName} took ${metric.renderTime}ms`);
    }
  }
);
```

### **Lazy Loading**
```tsx
import { LazyComponent, LazyInView } from "@nostromo/ui-core";

function App() {
  return (
    <div>
      {/* Lazy load heavy component */}
      <LazyComponent fallback={<div>Loading...</div>}>
        <HeavyChartComponent />
      </LazyComponent>

      {/* Lazy load when in view */}
      <LazyInView>
        <ImageGallery />
      </LazyInView>
    </div>
  );
}
```

## 🎯 Best Practices

### **1. Konsistent Styling**
```tsx
// ✅ Godt - Brug design tokens
<Button className="bg-brand-500 hover:bg-brand-600" />

// ❌ Dårligt - Hardcoded farver
<Button className="bg-purple-500 hover:bg-purple-600" />
```

### **2. Accessibility**
```tsx
// ✅ Godt - Proper labels og ARIA
<Input 
  id="email"
  aria-label="Email address"
  aria-describedby="email-help"
/>
<p id="email-help">Enter your email address</p>

// ❌ Dårligt - Mangler accessibility
<Input placeholder="Email" />
```

### **3. Performance**
```tsx
// ✅ Godt - Lazy load tunge komponenter
<LazyComponent>
  <HeavyDataTable />
</LazyComponent>

// ❌ Dårligt - Loader alt på en gang
<HeavyDataTable />
```

### **4. Error Handling**
```tsx
// ✅ Godt - Error boundary
<ErrorBoundary>
  <RiskyComponent />
</ErrorBoundary>

// ❌ Dårligt - Ingen error handling
<RiskyComponent />
```

### **5. Theming**
```tsx
// ✅ Godt - Brug CSS variabler
<div className="bg-brand-500 text-white" />

// ❌ Dårligt - Hardcoded styling
<div style={{ backgroundColor: '#8b5cf6', color: 'white' }} />
```

---

**💡 Tip**: Brug disse eksempler som udgangspunkt og tilpas dem til dine specifikke behov. Alle eksempler følger Nostromo UI's design principper og best practices.
