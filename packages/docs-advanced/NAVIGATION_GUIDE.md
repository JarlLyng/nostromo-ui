# Nostromo UI Documentation Navigation Guide

## 🧭 Navigation System Overview

The Nostromo UI documentation site features a comprehensive navigation system with breadcrumbs, pagination, navigation history, and mobile-optimized navigation.

## 🎯 Navigation Features

### **1. Main Navigation**
- **Header navigation** with logo and main links
- **Dropdown menus** for organized content
- **Active state** highlighting for current page
- **Keyboard accessible** with Tab navigation
- **Touch-friendly** with 44px minimum targets

### **2. Sidebar Navigation**
- **Sticky sidebar** with component categories
- **Collapsible sections** for better organization
- **Active state** highlighting for current page
- **Mobile responsive** with overlay
- **Search integration** for quick access

### **3. Breadcrumb Navigation**
- **Hierarchical breadcrumbs** showing page location
- **Icon indicators** for different content types
- **Clickable links** for easy navigation
- **Mobile responsive** with wrapping
- **Accessibility compliant** with proper ARIA

### **4. Pagination Navigation**
- **Page numbers** with current page highlighting
- **Previous/Next buttons** for sequential navigation
- **Responsive design** for mobile devices
- **Keyboard accessible** with arrow keys
- **Touch-friendly** with proper spacing

## 🚀 Navigation Implementation

### **Main Navigation Structure**
```html
<nav class="main-nav">
  <ul class="nav-links">
    <li><a href="/" class="nav-link">Home</a></li>
    <li><a href="/components" class="nav-link">Components</a></li>
    <li><a href="/getting-started" class="nav-link">Getting Started</a></li>
    <li><a href="/themes" class="nav-link">Themes</a></li>
  </ul>
</nav>
```

### **Dropdown Navigation**
```html
<div class="nav-dropdown">
  <button class="nav-dropdown-trigger" aria-expanded="false">
    <span>Components</span>
    <svg class="nav-dropdown-arrow">▼</svg>
  </button>
  <div class="nav-dropdown-menu">
    <div class="nav-dropdown-section">
      <div class="nav-dropdown-section-title">Core Components</div>
      <a href="/components/button" class="nav-dropdown-item">
        <svg class="nav-dropdown-item-icon">🔘</svg>
        <span class="nav-dropdown-item-text">Button</span>
      </a>
    </div>
  </div>
</div>
```

### **Sidebar Navigation**
```html
<nav class="sidebar-nav">
  <div class="sidebar-nav-section">
    <h3 class="sidebar-nav-title">Core Components</h3>
    <ul class="sidebar-nav-links">
      <li>
        <a href="/components/button" class="sidebar-nav-link">
          <svg class="sidebar-nav-link-icon">🔘</svg>
          <span class="sidebar-nav-link-text">Button</span>
        </a>
      </li>
    </ul>
  </div>
</nav>
```

### **Breadcrumb Navigation**
```html
<nav class="breadcrumb-nav">
  <div class="breadcrumb-item">
    <a href="/" class="breadcrumb-link">
      <span class="breadcrumb-icon">🏠</span>
      <span>Home</span>
    </a>
  </div>
  <span class="breadcrumb-separator">›</span>
  <div class="breadcrumb-item">
    <a href="/components" class="breadcrumb-link">
      <span class="breadcrumb-icon">📦</span>
      <span>Components</span>
    </a>
  </div>
  <span class="breadcrumb-separator">›</span>
  <div class="breadcrumb-item">
    <span class="breadcrumb-icon">🔘</span>
    <span class="breadcrumb-current">Button</span>
  </div>
</nav>
```

### **Pagination Navigation**
```html
<nav class="pagination-nav">
  <a href="?page=1" class="pagination-item">
    <svg class="pagination-item-icon">◀</svg>
  </a>
  <a href="?page=1" class="pagination-item">1</a>
  <a href="?page=2" class="pagination-item active">2</a>
  <a href="?page=3" class="pagination-item">3</a>
  <a href="?page=4" class="pagination-item">4</a>
  <a href="?page=5" class="pagination-item">5</a>
  <a href="?page=3" class="pagination-item">
    <svg class="pagination-item-icon">▶</svg>
  </a>
</nav>
```

## 🎨 Navigation Styling

### **Navigation Container**
```css
.navigation-container {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-light);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.navigation-container.scrolled {
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(10px);
  background: rgba(var(--bg-primary), 0.95);
}
```

### **Navigation Links**
```css
.nav-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: var(--color-primary);
  background: var(--bg-secondary);
  transform: translateY(-1px);
}

.nav-link.active {
  color: var(--color-primary);
  background: var(--bg-secondary);
  font-weight: 600;
}

.nav-link.active::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background: var(--color-primary);
  border-radius: 1px;
}
```

### **Dropdown Navigation**
```css
.nav-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  z-index: 1000;
  margin-top: var(--spacing-xs);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.nav-dropdown-menu.open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
```

### **Sidebar Navigation**
```css
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  background: var(--bg-secondary);
  border-right: 1px solid var(--border-light);
  overflow-y: auto;
  height: 100vh;
  position: sticky;
  top: 0;
}

.sidebar-nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.sidebar-nav-link:hover {
  color: var(--color-primary);
  background: var(--bg-primary);
  transform: translateX(4px);
}

.sidebar-nav-link.active {
  color: var(--color-primary);
  background: var(--bg-primary);
  font-weight: 600;
  box-shadow: var(--shadow-sm);
}

.sidebar-nav-link.active::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--color-primary);
  border-radius: 0 2px 2px 0;
}
```

## 🔧 Navigation JavaScript

### **Navigation Manager Class**
```javascript
class NavigationManager {
  constructor() {
    this.currentPath = window.location.pathname;
    this.history = [];
    this.breadcrumbs = [];
    this.navigationData = null;
    this.isNavigating = false;
    this.navigationCache = new Map();
  }

  // Setup navigation
  setupNavigation() {
    this.setupMainNavigation();
    this.setupSidebarNavigation();
    this.setupDropdownNavigation();
    this.setupMobileNavigation();
  }

  // Handle navigation
  handleNavigation(e, link) {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;

    e.preventDefault();
    this.navigateTo(href);
  }

  // Navigate to URL
  navigateTo(url) {
    if (this.isNavigating) return;
    
    this.isNavigating = true;
    this.showNavigationProgress();
    
    // Add to history
    this.addToHistory(this.currentPath);
    
    // Update current path
    this.currentPath = url;
    
    // Navigate
    window.location.href = url;
  }
}
```

### **Breadcrumb Generation**
```javascript
generateBreadcrumbs() {
  const pathSegments = this.currentPath.split('/').filter(segment => segment);
  this.breadcrumbs = [];
  
  // Add home
  this.breadcrumbs.push({
    label: 'Home',
    url: '/',
    icon: '🏠'
  });
  
  // Add path segments
  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += '/' + segment;
    const isLast = index === pathSegments.length - 1;
    
    this.breadcrumbs.push({
      label: this.formatBreadcrumbLabel(segment),
      url: isLast ? null : currentPath,
      icon: this.getBreadcrumbIcon(segment),
      current: isLast
    });
  });
}
```

### **Navigation History**
```javascript
addToHistory(path) {
  this.history.push({
    path: path,
    timestamp: Date.now(),
    title: document.title
  });
  
  // Keep only last 10 entries
  if (this.history.length > 10) {
    this.history.shift();
  }
}
```

### **Navigation Progress**
```javascript
showNavigationProgress() {
  const progressBar = document.querySelector('.nav-progress-bar');
  if (progressBar) {
    progressBar.style.width = '0%';
    progressBar.style.transition = 'width 0.3s ease';
    
    setTimeout(() => {
      progressBar.style.width = '100%';
    }, 100);
  }
}
```

## 📱 Mobile Navigation

### **Mobile Menu Toggle**
```html
<button class="mobile-menu-toggle" aria-label="Open navigation menu">
  ☰
</button>
```

### **Mobile Sidebar**
```html
<nav class="sidebar-nav">
  <div class="sidebar-nav-header">
    <div class="logo">Nostromo UI</div>
    <button class="mobile-nav-close" aria-label="Close menu">×</button>
  </div>
  <div class="sidebar-nav-content">
    <!-- Navigation content -->
  </div>
</nav>
```

### **Mobile Navigation CSS**
```css
@media (max-width: 768px) {
  .sidebar-nav {
    position: fixed;
    top: 0;
    left: -100%;
    width: 280px;
    height: 100vh;
    z-index: 1000;
    transition: left 0.3s ease;
    background: var(--bg-primary);
    border-right: 1px solid var(--border-light);
    box-shadow: var(--shadow-xl);
  }

  .sidebar-nav.open {
    left: 0;
  }
}
```

## 🎯 Navigation Accessibility

### **Keyboard Navigation**
```javascript
// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    // Handle tab navigation
  }
  
  if (e.key === 'Enter' || e.key === ' ') {
    // Handle activation
  }
  
  if (e.key === 'Escape') {
    // Close dropdowns and menus
  }
});
```

### **ARIA Attributes**
```html
<!-- Dropdown with proper ARIA -->
<button class="nav-dropdown-trigger" aria-expanded="false" aria-haspopup="true">
  <span>Components</span>
  <svg class="nav-dropdown-arrow">▼</svg>
</button>

<!-- Navigation with proper roles -->
<nav role="navigation" aria-label="Main navigation">
  <ul class="nav-links">
    <li><a href="/" class="nav-link">Home</a></li>
  </ul>
</nav>
```

### **Focus Management**
```javascript
// Focus management for dropdowns
openDropdown(menu) {
  menu.classList.add('open');
  menu.setAttribute('aria-expanded', 'true');
  
  // Focus first item
  const firstItem = menu.querySelector('.nav-dropdown-item');
  if (firstItem) {
    firstItem.focus();
  }
}
```

## 🚀 Navigation Performance

### **Navigation Caching**
```javascript
// Cache navigation data
cacheNavigationData() {
  if (this.navigationData) {
    this.navigationCache.set('navigationData', this.navigationData);
  }
}
```

### **Optimized Rendering**
```javascript
// Use requestAnimationFrame for smooth animations
optimizedRender(callback) {
  requestAnimationFrame(callback);
}
```

### **Navigation Progress**
```javascript
// Show navigation progress
showNavigationProgress() {
  const progressBar = document.querySelector('.nav-progress-bar');
  if (progressBar) {
    progressBar.style.width = '0%';
    progressBar.style.transition = 'width 0.3s ease';
    
    setTimeout(() => {
      progressBar.style.width = '100%';
    }, 100);
  }
}
```

## 🎨 Navigation Animations

### **Scroll Animations**
```javascript
setupScrollAnimations() {
  let lastScrollTop = 0;
  const navigationContainer = document.querySelector('.navigation-container');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      navigationContainer.classList.add('scrolled');
    } else {
      // Scrolling up
      navigationContainer.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
  });
}
```

### **Hover Animations**
```javascript
setupHoverAnimations() {
  const navLinks = document.querySelectorAll('.nav-link, .sidebar-nav-link');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'translateY(-1px)';
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.transform = 'translateY(0)';
    });
  });
}
```

### **Click Animations**
```javascript
setupClickAnimations() {
  const navLinks = document.querySelectorAll('.nav-link, .sidebar-nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      link.classList.add('nav-loading');
      setTimeout(() => {
        link.classList.remove('nav-loading');
      }, 1000);
    });
  });
}
```

## 🔧 Navigation Maintenance

### **Active State Updates**
```javascript
updateActiveStates() {
  const currentPath = window.location.pathname;
  
  // Update main navigation
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
```

### **Navigation Data Loading**
```javascript
async loadNavigationData() {
  try {
    const response = await fetch('/assets/js/navigation-data.js');
    if (response.ok) {
      const script = await response.text();
      eval(script); // Execute the navigation data script
      this.navigationData = window.NostromoNavigation;
    }
  } catch (error) {
    console.warn('Failed to load navigation data:', error);
    this.navigationData = this.getDefaultNavigationData();
  }
}
```

## 🎯 Navigation Best Practices

### **1. Consistent Structure**
- **Semantic HTML** for navigation elements
- **Proper ARIA attributes** for accessibility
- **Consistent styling** across all navigation types
- **Clear visual hierarchy** for navigation levels

### **2. Performance Optimization**
- **Lazy loading** for navigation data
- **Caching** for frequently accessed navigation
- **Smooth animations** with hardware acceleration
- **Minimal reflow** during navigation changes

### **3. Accessibility First**
- **Keyboard navigation** support
- **Screen reader** compatibility
- **Focus management** for dropdowns and menus
- **ARIA labels** for all navigation elements

### **4. Mobile Responsive**
- **Touch-friendly** navigation elements
- **Mobile menu** with overlay
- **Responsive design** for all screen sizes
- **Gesture support** for mobile navigation

---

This navigation guide ensures that the Nostromo UI documentation site provides an excellent navigation experience for all users, with support for desktop, mobile, and assistive technologies.
