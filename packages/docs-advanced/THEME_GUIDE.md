# Nostromo UI Documentation Theme Guide

## 🌙 Theme System Overview

The Nostromo UI documentation site features a comprehensive theme system with light, dark, and auto modes, providing users with a personalized viewing experience, including Live Components System integration.

## 🎨 Available Themes

### **1. Light Theme**
- **Default theme** for optimal readability
- **High contrast** text on light backgrounds
- **Professional appearance** for documentation
- **Battery efficient** on OLED displays

### **2. Dark Theme**
- **Reduced eye strain** in low-light environments
- **Modern appearance** with dark backgrounds
- **Battery efficient** on OLED displays
- **Popular choice** for developers

### **3. Auto Theme**
- **System preference** detection
- **Automatic switching** based on time of day
- **Seamless experience** across devices
- **Accessibility compliant** with user preferences

## 🚀 Theme Features

### **Theme Toggle**
- **One-click switching** between themes
- **Visual feedback** with smooth transitions
- **Keyboard accessible** with Tab navigation
- **Touch-friendly** with 44px minimum target

### **Theme Persistence**
- **localStorage** for theme preference
- **Cross-tab synchronization** for consistency
- **Fallback to system** preference if no preference set
- **Graceful degradation** if localStorage unavailable

### **Theme Performance**
- **CSS variables** for efficient theme switching
- **Smooth transitions** with hardware acceleration
- **Minimal reflow** during theme changes
- **Optimized animations** for 60fps performance
- **Live Components** theme integration

## 🎯 Theme Implementation

### **CSS Variables System**
```css
/* Light Theme */
:root {
  --color-primary: 262 84% 52%;
  --color-secondary: 262 84% 45%;
  --bg-primary: hsl(var(--color-neutral-50));
  --text-primary: hsl(var(--color-neutral-900));
  --border-light: hsl(var(--color-neutral-200));
}

/* Dark Theme */
[data-theme="dark"] {
  --color-primary: 262 84% 52%;
  --color-secondary: 262 84% 45%;
  --bg-primary: hsl(var(--color-neutral-950));
  --text-primary: hsl(var(--color-neutral-50));
  --border-light: hsl(var(--color-neutral-800));
}
```

### **Theme Toggle Button**
```html
<button class="theme-toggle" aria-label="Toggle theme">
  <span class="theme-toggle-icon light">☀️</span>
  <span class="theme-toggle-icon dark">🌙</span>
</button>
```

### **Theme Dropdown**
```html
<div class="theme-dropdown">
  <button class="theme-dropdown-trigger" aria-expanded="false">
    <span class="theme-icon">🌙</span>
    <span class="theme-name">Dark</span>
    <span class="dropdown-arrow">▼</span>
  </button>
  <div class="theme-dropdown-menu">
    <button class="theme-dropdown-item" data-theme="light">
      <span class="theme-icon">☀️</span>
      <span class="theme-name">Light</span>
    </button>
    <button class="theme-dropdown-item" data-theme="dark">
      <span class="theme-icon">🌙</span>
      <span class="theme-name">Dark</span>
    </button>
    <button class="theme-dropdown-item" data-theme="auto">
      <span class="theme-icon">🔄</span>
      <span class="theme-name">Auto</span>
    </button>
  </div>
</div>
```

## 🎨 Theme Customization

### **Color Palette**
```css
/* Primary Colors */
--color-primary: 262 84% 52%;      /* Purple */
--color-secondary: 262 84% 45%;     /* Darker Purple */
--color-accent: 262 84% 60%;        /* Lighter Purple */

/* Status Colors */
--color-success: 142 76% 36%;       /* Green */
--color-warning: 38 92% 50%;        /* Orange */
--color-error: 0 84% 60%;           /* Red */
--color-info: 199 89% 48%;           /* Blue */
```

### **Neutral Colors**
```css
/* Light Theme Neutrals */
--color-neutral-50: 0 0% 98%;       /* Lightest */
--color-neutral-100: 0 0% 96%;
--color-neutral-200: 0 0% 90%;
--color-neutral-300: 0 0% 83%;
--color-neutral-400: 0 0% 64%;
--color-neutral-500: 0 0% 45%;
--color-neutral-600: 0 0% 32%;
--color-neutral-700: 0 0% 25%;
--color-neutral-800: 0 0% 15%;
--color-neutral-900: 0 0% 9%;
--color-neutral-950: 0 0% 4%;       /* Darkest */

/* Dark Theme Neutrals (Inverted) */
--color-neutral-50: 0 0% 4%;        /* Darkest */
--color-neutral-100: 0 0% 9%;
--color-neutral-200: 0 0% 15%;
--color-neutral-300: 0 0% 25%;
--color-neutral-400: 0 0% 32%;
--color-neutral-500: 0 0% 45%;
--color-neutral-600: 0 0% 64%;
--color-neutral-700: 0 0% 83%;
--color-neutral-800: 0 0% 90%;
--color-neutral-900: 0 0% 96%;
--color-neutral-950: 0 0% 98%;      /* Lightest */
```

### **Component Colors**
```css
/* Button Colors */
--btn-primary-bg: hsl(var(--color-primary));
--btn-primary-text: hsl(var(--color-neutral-50));
--btn-primary-hover: hsl(var(--color-secondary));
--btn-secondary-bg: hsl(var(--color-neutral-100));
--btn-secondary-text: hsl(var(--color-neutral-900));
--btn-secondary-hover: hsl(var(--color-neutral-200));

/* Form Colors */
--form-bg: hsl(var(--color-neutral-50));
--form-border: hsl(var(--color-neutral-300));
--form-border-focus: hsl(var(--color-primary));
--form-border-error: hsl(var(--color-error));
--form-border-success: hsl(var(--color-success));
```

## 🔧 Theme JavaScript

### **Theme Manager Class**
```javascript
class ThemeManager {
  constructor() {
    this.themes = ['light', 'dark', 'auto'];
    this.currentTheme = 'auto';
    this.systemPreference = 'light';
    this.storageKey = 'nostromo-theme';
  }

  // Apply theme
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme = theme;
    this.saveTheme(theme);
  }

  // Save theme preference
  saveTheme(theme) {
    localStorage.setItem(this.storageKey, theme);
  }

  // Load theme preference
  loadTheme() {
    const savedTheme = localStorage.getItem(this.storageKey);
    if (savedTheme && this.themes.includes(savedTheme)) {
      this.applyTheme(savedTheme);
    }
  }
}
```

### **Theme Toggle Functionality**
```javascript
// Toggle between themes
toggleTheme() {
  const nextTheme = this.getNextTheme();
  this.applyTheme(nextTheme);
}

// Get next theme in sequence
getNextTheme() {
  const currentIndex = this.themes.indexOf(this.currentTheme);
  const nextIndex = (currentIndex + 1) % this.themes.length;
  return this.themes[nextIndex];
}
```

### **System Preference Detection**
```javascript
// Detect system preference
detectSystemPreference() {
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.systemPreference = mediaQuery.matches ? 'dark' : 'light';
    
    // Listen for changes
    mediaQuery.addEventListener('change', (e) => {
      this.systemPreference = e.matches ? 'dark' : 'light';
      if (this.currentTheme === 'auto') {
        this.applyTheme('auto');
      }
    });
  }
}
```

## 🎯 Theme Accessibility

### **High Contrast Support**
```css
@media (prefers-contrast: high) {
  :root {
    --color-primary: #0000ff;
    --color-secondary: #000000;
    --text-primary: #000000;
    --bg-primary: #ffffff;
  }
}
```

### **Reduced Motion Support**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

### **Screen Reader Support**
```html
<!-- Theme toggle with proper labels -->
<button class="theme-toggle" aria-label="Toggle theme">
  <span class="sr-only">Current theme: Light</span>
  <span class="theme-toggle-icon light">☀️</span>
  <span class="theme-toggle-icon dark">🌙</span>
</button>
```

## 🚀 Theme Performance

### **Optimized Theme Switching**
```javascript
// Use requestAnimationFrame for smooth transitions
applyTheme(theme) {
  requestAnimationFrame(() => {
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme = theme;
  });
}
```

### **Theme Caching**
```javascript
// Cache theme preference
saveTheme(theme) {
  try {
    localStorage.setItem(this.storageKey, theme);
  } catch (error) {
    console.warn('Failed to save theme preference:', error);
  }
}
```

### **Theme Synchronization**
```javascript
// Sync theme across tabs
window.addEventListener('storage', (e) => {
  if (e.key === this.storageKey) {
    const newTheme = e.newValue;
    if (newTheme && this.themes.includes(newTheme)) {
      this.applyTheme(newTheme);
    }
  }
});
```

## 🎨 Theme Animations

### **Smooth Transitions**
```css
/* Theme transition animations */
* {
  transition: background-color 0.3s ease, 
             border-color 0.3s ease, 
             color 0.3s ease, 
             box-shadow 0.3s ease;
}
```

### **Theme Change Animation**
```css
@keyframes theme-change {
  0% { opacity: 1; }
  50% { opacity: 0.8; }
  100% { opacity: 1; }
}

.theme-changing {
  animation: theme-change 0.3s ease;
}
```

### **Theme Toggle Animation**
```css
.theme-toggle-icon {
  transition: all 0.3s ease;
}

.theme-toggle-icon.light {
  opacity: 1;
  transform: rotate(0deg);
}

.theme-toggle-icon.dark {
  opacity: 0;
  transform: rotate(180deg);
}

[data-theme="dark"] .theme-toggle-icon.light {
  opacity: 0;
  transform: rotate(-180deg);
}

[data-theme="dark"] .theme-toggle-icon.dark {
  opacity: 1;
  transform: rotate(0deg);
}
```

## 🔧 Theme Debugging

### **Debug Panel**
```javascript
// Create debug panel for development
createDebugPanel() {
  const debugPanel = document.createElement('div');
  debugPanel.className = 'theme-debug';
  debugPanel.innerHTML = `
    <div class="theme-debug-item">
      <span class="theme-debug-label">Current Theme:</span>
      <span class="theme-debug-value">${this.currentTheme}</span>
    </div>
    <div class="theme-debug-item">
      <span class="theme-debug-label">System Preference:</span>
      <span class="theme-debug-value">${this.systemPreference}</span>
    </div>
  `;
  document.body.appendChild(debugPanel);
}
```

### **Theme Status**
```javascript
// Show theme status
showThemeStatus(themeName) {
  const status = document.querySelector('.theme-status');
  if (status) {
    status.textContent = `Theme: ${themeName}`;
    status.classList.add('show');
    setTimeout(() => {
      status.classList.remove('show');
    }, 2000);
  }
}
```

## 🎯 Theme Best Practices

### **1. Use CSS Variables**
- **Consistent theming** across all components
- **Easy maintenance** and updates
- **Performance optimized** theme switching
- **Future-proof** design system

### **2. Semantic Color Names**
- **Descriptive names** (primary, secondary, success)
- **Contextual usage** (text-primary, bg-primary)
- **Consistent naming** across themes
- **Accessible color** combinations

### **3. Smooth Transitions**
- **Hardware accelerated** animations
- **Consistent timing** across all elements
- **Respect user preferences** for reduced motion
- **Performance optimized** transitions

### **4. Accessibility First**
- **High contrast** support
- **Screen reader** compatibility
- **Keyboard navigation** support
- **Focus indicators** for all themes

### **5. Live Components Theme Integration**
- **Live Components** theme support
- **Dynamic theme** switching for components
- **Consistent styling** across all components
- **Theme-aware** component rendering

## 🚀 Future Theme Enhancements

### **Planned Features:**
- **Custom theme** creation
- **Theme sharing** functionality
- **Advanced color** customization
- **Theme presets** for different use cases

### **Possible Improvements:**
- **AI-powered** theme suggestions
- **Time-based** theme switching
- **Location-based** theme preferences
- **Advanced accessibility** features

## 🚀 Live Components Theme Integration

### **Live Components Theme Support:**
- **Theme-aware rendering** for all 26 components
- **Dynamic theme switching** for live components
- **Consistent styling** across all themes
- **Performance optimized** theme updates

### **Live Components Theme Implementation:**
```javascript
// Live Components with theme support
class LiveComponentRenderer {
  constructor() {
    this.themeManager = new ThemeManager();
    this.components = new Map();
  }

  // Render component with theme
  renderComponent(element, props) {
    const theme = this.themeManager.getCurrentTheme();
    const componentName = element.dataset.component;
    
    // Apply theme to component
    element.setAttribute('data-theme', theme);
    
    // Render component with theme context
    switch (componentName) {
      case 'Button':
        this.renderButton(element, props, theme);
        break;
      case 'Input':
        this.renderInput(element, props, theme);
        break;
      // ... other components
    }
  }

  // Theme change handler
  handleThemeChange(newTheme) {
    const liveComponents = document.querySelectorAll('.live-component');
    liveComponents.forEach(component => {
      component.setAttribute('data-theme', newTheme);
      this.updateComponentTheme(component, newTheme);
    });
  }
}
```

### **Live Components Theme Styling:**
```css
/* Live Components with theme support */
.live-component {
  margin: var(--spacing-lg) 0;
  padding: var(--spacing-lg);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  background: var(--bg-secondary);
  transition: all 0.3s ease;
}

/* Theme-specific styling */
[data-theme="light"] .live-component {
  background: var(--bg-secondary);
  border-color: var(--border-light);
}

[data-theme="dark"] .live-component {
  background: var(--bg-secondary);
  border-color: var(--border-light);
}

/* Live component rendered elements */
.live-component-rendered {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.live-component-rendered button,
.live-component-rendered input,
.live-component-rendered select {
  transition: all 0.3s ease;
}
```

---

This theme guide ensures that the Nostromo UI documentation site provides an excellent theming experience for all users, with support for light, dark, and auto modes, including Live Components System integration.
