// Nostromo UI Advanced Documentation - Lazy Loading System

class LazyLoader {
  constructor() {
    this.observer = null;
    this.images = new Set();
    this.components = new Set();
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupImageLazyLoading();
    this.setupComponentLazyLoading();
    this.setupCodeBlockLazyLoading();
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.handleIntersection(entry);
        }
      });
    }, options);
  }

  setupImageLazyLoading() {
    // Find all images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      this.images.add(img);
      this.observer.observe(img);
    });
  }

  setupComponentLazyLoading() {
    // Find all components with data-lazy attribute
    const lazyComponents = document.querySelectorAll('[data-lazy]');
    lazyComponents.forEach(component => {
      this.components.add(component);
      this.observer.observe(component);
    });
  }

  setupCodeBlockLazyLoading() {
    // Find all code blocks that need syntax highlighting
    const codeBlocks = document.querySelectorAll('pre code[data-lang]');
    codeBlocks.forEach(block => {
      this.observer.observe(block);
    });
  }

  handleIntersection(entry) {
    const element = entry.target;
    
    if (element.tagName === 'IMG' && element.dataset.src) {
      this.loadImage(element);
    } else if (element.dataset.lazy) {
      this.loadComponent(element);
    } else if (element.tagName === 'CODE' && element.dataset.lang) {
      this.loadCodeHighlighting(element);
    }
  }

  loadImage(img) {
    if (img.dataset.src) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      img.classList.add('loaded');
      
      // Remove from observer
      this.observer.unobserve(img);
      this.images.delete(img);
    }
  }

  loadComponent(component) {
    const componentType = component.dataset.lazy;
    
    switch (componentType) {
      case 'interactive-demo':
        this.loadInteractiveDemo(component);
        break;
      case 'code-editor':
        this.loadCodeEditor(component);
        break;
      case 'live-preview':
        this.loadLivePreview(component);
        break;
      default:
        this.loadGenericComponent(component);
    }
    
    // Remove from observer
    this.observer.unobserve(component);
    this.components.delete(component);
  }

  loadInteractiveDemo(component) {
    // Load interactive demo JavaScript
    const script = document.createElement('script');
    script.src = '/assets/js/interactive-demo.js';
    script.onload = () => {
      component.classList.add('loaded');
    };
    document.head.appendChild(script);
  }

  loadCodeEditor(component) {
    // Load code editor JavaScript
    const script = document.createElement('script');
    script.src = '/assets/js/code-editor.js';
    script.onload = () => {
      component.classList.add('loaded');
    };
    document.head.appendChild(script);
  }

  loadLivePreview(component) {
    // Load live preview JavaScript
    const script = document.createElement('script');
    script.src = '/assets/js/live-preview.js';
    script.onload = () => {
      component.classList.add('loaded');
    };
    document.head.appendChild(script);
  }

  loadGenericComponent(component) {
    // Generic component loading
    component.classList.add('loaded');
  }

  loadCodeHighlighting(codeBlock) {
    // Load syntax highlighting
    const script = document.createElement('script');
    script.src = '/assets/js/syntax-highlighting.js';
    script.onload = () => {
      codeBlock.classList.add('highlighted');
    };
    document.head.appendChild(script);
  }

  // Preload critical resources
  preloadCriticalResources() {
    const criticalResources = [
      '/assets/css/main.css',
      '/assets/js/main.js',
      '/assets/images/favicon.svg'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.endsWith('.css') ? 'style' : 'script';
      document.head.appendChild(link);
    });
  }

  // Prefetch next likely resources
  prefetchNextResources() {
    const nextResources = [
      '/assets/js/search.js',
      '/assets/js/theme.js',
      '/assets/js/navigation.js'
    ];

    nextResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = resource;
      document.head.appendChild(link);
    });
  }

  // Cleanup
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.images.clear();
    this.components.clear();
  }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', () => {
  window.lazyLoader = new LazyLoader();
  
  // Preload critical resources
  window.lazyLoader.preloadCriticalResources();
  
  // Prefetch next resources after a delay
  setTimeout(() => {
    window.lazyLoader.prefetchNextResources();
  }, 1000);
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LazyLoader;
}
