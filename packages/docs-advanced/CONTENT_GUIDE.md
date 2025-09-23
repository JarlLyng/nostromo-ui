# Nostromo UI Documentation Content Guide

## 📝 Content Optimization Overview

The Nostromo UI documentation site features comprehensive content optimization with interactive examples, code highlighting, content search, and filtering capabilities.

## 🎯 Content Features

### **1. Interactive Examples**
- **Live code examples** with run/reset functionality
- **Interactive playground** for component testing
- **Real-time preview** of code changes
- **Copy to clipboard** functionality
- **Error handling** with user-friendly messages

### **2. Code Examples**
- **Syntax highlighting** for multiple languages
- **Copy to clipboard** with success feedback
- **Run code** functionality for executable examples
- **Error display** with helpful error messages
- **Responsive design** for mobile devices

### **3. Content Search**
- **Real-time search** across all content
- **Fuzzy matching** for better results
- **Category filtering** (components, examples, guides)
- **Search suggestions** and autocomplete
- **Keyboard navigation** support

### **4. Content Filtering**
- **Tag-based filtering** for content organization
- **Category filtering** for different content types
- **Active filter** highlighting
- **Multiple filter** support
- **Clear filters** functionality

## 🚀 Content Implementation

### **Interactive Examples Structure**
```html
<div class="interactive-example">
  <div class="interactive-example-header">
    <h3 class="interactive-example-title">Button Example</h3>
    <div class="interactive-example-actions">
      <button class="interactive-example-action" data-action="run">
        <svg class="interactive-example-action-icon">▶</svg>
        Run
      </button>
      <button class="interactive-example-action" data-action="reset">
        <svg class="interactive-example-action-icon">🔄</svg>
        Reset
      </button>
    </div>
  </div>
  <div class="interactive-example-content">
    <div class="interactive-example-preview">
      <!-- Live preview area -->
    </div>
    <div class="interactive-example-code">
      <pre><code>// Example code here</code></pre>
    </div>
  </div>
</div>
```

### **Code Examples Structure**
```html
<div class="code-container">
  <div class="code-header">
    <h4 class="code-title">Button Component</h4>
    <div class="code-actions">
      <button class="code-action" data-action="copy">
        <svg class="code-action-icon">📋</svg>
        Copy
      </button>
      <button class="code-action" data-action="run">
        <svg class="code-action-icon">▶</svg>
        Run
      </button>
    </div>
  </div>
  <div class="code-content">
    <pre><code class="language-jsx">
import { Button } from '@nostromo/ui-core';

function App() {
  return (
    <Button variant="primary" size="md">
      Click me
    </Button>
  );
}
    </code></pre>
  </div>
</div>
```

### **Content Search Structure**
```html
<div class="content-search">
  <svg class="content-search-icon">🔍</svg>
  <input type="text" class="content-search-input" placeholder="Search content...">
  <div class="content-search-results">
    <div class="content-search-result" data-url="/components/button">
      <div class="content-search-result-title">Button Component</div>
      <div class="content-search-result-text">A versatile button component with multiple variants</div>
    </div>
  </div>
</div>
```

### **Content Filters Structure**
```html
<div class="content-filters">
  <button class="content-filter" data-filter="component" data-category="component">
    <svg class="content-filter-icon">📦</svg>
    Components
  </button>
  <button class="content-filter" data-filter="example" data-category="example">
    <svg class="content-filter-icon">💡</svg>
    Examples
  </button>
  <button class="content-filter" data-filter="guide" data-category="guide">
    <svg class="content-filter-icon">📚</svg>
    Guides
  </button>
</div>
```

## 🎨 Content Styling

### **Interactive Examples**
```css
.interactive-example {
  margin: var(--spacing-xl) 0;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.interactive-example-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg);
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-light);
}

.interactive-example-preview {
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-lg);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
}
```

### **Code Examples**
```css
.code-container {
  position: relative;
  margin: var(--spacing-lg) 0;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-light);
}

.code-content {
  background: var(--code-bg);
  border: 1px solid var(--code-border);
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
```

### **Content Search**
```css
.content-search {
  position: relative;
  margin: var(--spacing-lg) 0;
}

.content-search-input {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg) var(--spacing-md) 3rem;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  font-size: 1rem;
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.content-search-input:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}
```

### **Content Filters**
```css
.content-filters {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin: var(--spacing-lg) 0;
  flex-wrap: wrap;
}

.content-filter {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
}

.content-filter:hover {
  background: var(--bg-tertiary);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.content-filter.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}
```

## 🔧 Content JavaScript

### **Content Manager Class**
```javascript
class ContentManager {
  constructor() {
    this.contentData = null;
    this.searchIndex = [];
    this.filters = new Map();
    this.activeFilters = new Set();
    this.contentCache = new Map();
    this.isLoading = false;
  }

  // Setup content search
  setupContentSearch() {
    const searchInput = document.querySelector('.content-search-input');
    const searchResults = document.querySelector('.content-search-results');
    
    if (searchInput && searchResults) {
      searchInput.addEventListener('input', (e) => {
        this.handleContentSearch(e.target.value, searchResults);
      });
    }
  }

  // Handle content search
  handleContentSearch(query, resultsContainer) {
    if (!query.trim()) {
      resultsContainer.innerHTML = '';
      return;
    }

    const results = this.searchContent(query);
    this.renderSearchResults(results, resultsContainer);
  }
}
```

### **Content Search Implementation**
```javascript
searchContent(query) {
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
  
  return this.searchIndex.filter(item => {
    const searchableText = [
      item.title,
      item.description,
      item.content,
      ...item.tags
    ].join(' ').toLowerCase();

    return searchTerms.every(term => searchableText.includes(term));
  }).slice(0, 10); // Limit to 10 results
}

renderSearchResults(results, container) {
  if (results.length === 0) {
    container.innerHTML = '<div class="content-search-result"><div class="content-search-result-text">No results found</div></div>';
    return;
  }

  container.innerHTML = results.map(result => `
    <div class="content-search-result" data-url="${result.url}">
      <div class="content-search-result-title">${result.title}</div>
      <div class="content-search-result-text">${result.description}</div>
    </div>
  `).join('');
}
```

### **Content Filtering**
```javascript
setupContentFilters() {
  const filterElements = document.querySelectorAll('.content-filter');
  filterElements.forEach(filter => {
    filter.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleFilter(filter);
    });
  });
}

toggleFilter(filter) {
  const filterValue = filter.dataset.filter;
  const filterCategory = filter.dataset.category;
  
  if (filter.classList.contains('active')) {
    filter.classList.remove('active');
    this.activeFilters.delete(filterValue);
  } else {
    filter.classList.add('active');
    this.activeFilters.add(filterValue);
  }

  this.applyFilters();
}
```

### **Interactive Examples**
```javascript
setupInteractiveExamples() {
  const examples = document.querySelectorAll('.interactive-example');
  examples.forEach(example => {
    this.setupInteractiveExample(example);
  });
}

setupInteractiveExample(example) {
  const runButton = example.querySelector('.interactive-example-action[data-action="run"]');
  const resetButton = example.querySelector('.interactive-example-action[data-action="reset"]');
  
  if (runButton) {
    runButton.addEventListener('click', () => {
      this.runInteractiveExample(example);
    });
  }
  
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      this.resetInteractiveExample(example);
    });
  }
}
```

### **Code Examples**
```javascript
setupCodeExamples() {
  const codeBlocks = document.querySelectorAll('.code-content');
  codeBlocks.forEach(block => {
    this.setupCodeBlock(block);
  });
}

setupCodeBlock(block) {
  const copyButton = block.parentElement.querySelector('.code-action[data-action="copy"]');
  const runButton = block.parentElement.querySelector('.code-action[data-action="run"]');
  
  if (copyButton) {
    copyButton.addEventListener('click', () => {
      this.copyCode(block);
    });
  }
  
  if (runButton) {
    runButton.addEventListener('click', () => {
      this.runCode(block);
    });
  }
}
```

## 📱 Content Responsive Design

### **Mobile Optimizations**
```css
@media (max-width: 768px) {
  .interactive-example {
    margin: var(--spacing-lg) 0;
  }

  .interactive-example-header {
    padding: var(--spacing-md);
  }

  .interactive-example-content {
    padding: var(--spacing-md);
  }

  .code-container {
    margin: var(--spacing-md) 0;
  }

  .code-header {
    padding: var(--spacing-sm) var(--spacing-md);
  }

  .code-content pre {
    padding: var(--spacing-md);
    font-size: 0.75rem;
  }

  .content-filters {
    flex-direction: column;
    align-items: stretch;
  }

  .content-filter {
    justify-content: center;
  }
}
```

### **Tablet Optimizations**
```css
@media (min-width: 769px) and (max-width: 1024px) {
  .interactive-example-content {
    padding: var(--spacing-lg);
  }

  .code-content pre {
    padding: var(--spacing-lg);
    font-size: 0.875rem;
  }
}
```

## 🎯 Content Accessibility

### **Keyboard Navigation**
```javascript
// Handle keyboard navigation for content
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    // Handle tab navigation
  }
  
  if (e.key === 'Enter' || e.key === ' ') {
    // Handle activation
  }
  
  if (e.key === 'Escape') {
    // Close search results and filters
  }
});
```

### **Screen Reader Support**
```html
<!-- Interactive example with proper ARIA -->
<div class="interactive-example" role="region" aria-labelledby="example-title">
  <div class="interactive-example-header">
    <h3 id="example-title" class="interactive-example-title">Button Example</h3>
    <div class="interactive-example-actions" role="toolbar" aria-label="Example actions">
      <button class="interactive-example-action" data-action="run" aria-label="Run example">
        <svg class="interactive-example-action-icon">▶</svg>
        Run
      </button>
    </div>
  </div>
</div>
```

### **Focus Management**
```javascript
// Focus management for content
setupContentFocus() {
  const focusableElements = document.querySelectorAll(
    '.content-search-input, .content-filter, .interactive-example-action, .code-action'
  );
  
  focusableElements.forEach(element => {
    element.addEventListener('focus', () => {
      element.classList.add('focus-visible');
    });
    
    element.addEventListener('blur', () => {
      element.classList.remove('focus-visible');
    });
  });
}
```

## 🚀 Content Performance

### **Lazy Loading**
```javascript
setupContentLazyLoading() {
  const lazyElements = document.querySelectorAll('[data-lazy]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadLazyContent(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });

  lazyElements.forEach(element => {
    observer.observe(element);
  });
}
```

### **Content Caching**
```javascript
setupContentCaching() {
  // Cache content data
  if (this.contentData) {
    this.contentCache.set('contentData', this.contentData);
  }
}
```

### **Search Optimization**
```javascript
// Debounced search for better performance
setupContentSearch() {
  const searchInput = document.querySelector('.content-search-input');
  let searchTimeout;
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.handleContentSearch(e.target.value);
      }, 300);
    });
  }
}
```

## 🎨 Content Best Practices

### **1. Content Structure**
- **Semantic HTML** for all content elements
- **Proper heading hierarchy** (h1, h2, h3...)
- **Consistent spacing** and typography
- **Clear visual hierarchy** for content sections

### **2. Interactive Elements**
- **Clear action buttons** with descriptive labels
- **Loading states** for async operations
- **Error handling** with user-friendly messages
- **Success feedback** for completed actions

### **3. Code Examples**
- **Syntax highlighting** for better readability
- **Copy functionality** for easy code sharing
- **Run functionality** for executable examples
- **Error display** with helpful messages

### **4. Search and Filtering**
- **Real-time search** with debouncing
- **Fuzzy matching** for better results
- **Category filtering** for content organization
- **Clear visual feedback** for active filters

---

This content guide ensures that the Nostromo UI documentation site provides an excellent content experience for all users, with interactive examples, comprehensive search, and optimized performance.
