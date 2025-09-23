// Nostromo UI Advanced Documentation - Performance Optimizations

class PerformanceOptimizer {
  constructor() {
    this.cache = new Map();
    this.debounceTimers = new Map();
    this.throttleTimers = new Map();
    this.init();
  }

  init() {
    this.setupResourcePreloading();
    this.setupCodeSplitting();
    this.setupCaching();
    this.setupDebouncing();
    this.setupThrottling();
    this.setupMemoryManagement();
  }

  // Resource preloading
  setupResourcePreloading() {
    // Preload critical CSS
    this.preloadResource('/assets/css/critical.css', 'style');
    
    // Preload critical JavaScript
    this.preloadResource('/assets/js/main.js', 'script');
    
    // Prefetch likely next resources
    this.prefetchResource('/assets/js/search.js');
    this.prefetchResource('/assets/js/theme.js');
    this.prefetchResource('/assets/js/navigation.js');
  }

  preloadResource(href, as) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (as === 'style') {
      link.onload = () => link.rel = 'stylesheet';
    }
    document.head.appendChild(link);
  }

  prefetchResource(href) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  }

  // Code splitting
  setupCodeSplitting() {
    // Lazy load non-critical JavaScript modules
    this.lazyLoadModule('search', '/assets/js/search.js');
    this.lazyLoadModule('theme', '/assets/js/theme.js');
    this.lazyLoadModule('navigation', '/assets/js/navigation.js');
    this.lazyLoadModule('codeEditor', '/assets/js/code-editor.js');
    this.lazyLoadModule('livePreview', '/assets/js/live-preview.js');
  }

  async lazyLoadModule(name, src) {
    try {
      if (this.cache.has(name)) {
        return this.cache.get(name);
      }

      const module = await import(src);
      this.cache.set(name, module);
      return module;
    } catch (error) {
      console.warn(`Failed to load module ${name}:`, error);
      return null;
    }
  }

  // Caching system
  setupCaching() {
    // Cache DOM queries
    this.cache.set('domQueries', new Map());
    
    // Cache API responses
    this.cache.set('apiResponses', new Map());
    
    // Cache computed values
    this.cache.set('computedValues', new Map());
  }

  getCachedQuery(selector) {
    const domQueries = this.cache.get('domQueries');
    if (domQueries.has(selector)) {
      return domQueries.get(selector);
    }
    
    const elements = document.querySelectorAll(selector);
    domQueries.set(selector, elements);
    return elements;
  }

  getCachedValue(key, computeFn) {
    const computedValues = this.cache.get('computedValues');
    if (computedValues.has(key)) {
      return computedValues.get(key);
    }
    
    const value = computeFn();
    computedValues.set(key, value);
    return value;
  }

  // Debouncing
  setupDebouncing() {
    // Debounce search input
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.addEventListener('input', this.debounce((e) => {
        this.handleSearch(e.target.value);
      }, 300));
    }

    // Debounce resize events
    window.addEventListener('resize', this.debounce(() => {
      this.handleResize();
    }, 250));
  }

  debounce(func, wait) {
    return (...args) => {
      const key = func.toString();
      clearTimeout(this.debounceTimers.get(key));
      this.debounceTimers.set(key, setTimeout(() => func.apply(this, args), wait));
    };
  }

  // Throttling
  setupThrottling() {
    // Throttle scroll events
    window.addEventListener('scroll', this.throttle(() => {
      this.handleScroll();
    }, 100));

    // Throttle mouse move events
    document.addEventListener('mousemove', this.throttle((e) => {
      this.handleMouseMove(e);
    }, 16)); // 60fps
  }

  throttle(func, limit) {
    return (...args) => {
      const key = func.toString();
      if (!this.throttleTimers.has(key)) {
        func.apply(this, args);
        this.throttleTimers.set(key, setTimeout(() => {
          this.throttleTimers.delete(key);
        }, limit));
      }
    };
  }

  // Memory management
  setupMemoryManagement() {
    // Clean up event listeners on page unload
    window.addEventListener('beforeunload', () => {
      this.cleanup();
    });

    // Clean up unused cache entries periodically
    setInterval(() => {
      this.cleanupCache();
    }, 30000); // Every 30 seconds
  }

  cleanup() {
    // Clear all timers
    this.debounceTimers.forEach(timer => clearTimeout(timer));
    this.throttleTimers.forEach(timer => clearTimeout(timer));
    this.debounceTimers.clear();
    this.throttleTimers.clear();

    // Clear cache
    this.cache.clear();
  }

  cleanupCache() {
    const domQueries = this.cache.get('domQueries');
    if (domQueries) {
      // Remove stale DOM queries
      domQueries.forEach((elements, selector) => {
        if (!document.querySelector(selector)) {
          domQueries.delete(selector);
        }
      });
    }

    // Clear old API responses
    const apiResponses = this.cache.get('apiResponses');
    if (apiResponses) {
      const now = Date.now();
      apiResponses.forEach((response, key) => {
        if (now - response.timestamp > 300000) { // 5 minutes
          apiResponses.delete(key);
        }
      });
    }
  }

  // Performance monitoring
  measurePerformance(name, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
  }

  // Event handlers
  handleSearch(query) {
    // Implement search functionality
    console.log('Searching for:', query);
  }

  handleResize() {
    // Handle resize events
    console.log('Window resized');
  }

  handleScroll() {
    // Handle scroll events
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    console.log('Scrolled to:', scrollTop);
  }

  handleMouseMove(e) {
    // Handle mouse move events
    // Only log occasionally to avoid spam
    if (Math.random() < 0.01) {
      console.log('Mouse moved to:', e.clientX, e.clientY);
    }
  }

  // Utility methods
  isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  getElementCenter(element) {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  }

  // Export for module usage
  static getInstance() {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }
}

// Initialize performance optimizer
document.addEventListener('DOMContentLoaded', () => {
  window.performanceOptimizer = PerformanceOptimizer.getInstance();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PerformanceOptimizer;
}
