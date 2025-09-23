// Nostromo UI Advanced Documentation - Content Optimization

class ContentManager {
  constructor() {
    this.contentData = null;
    this.searchIndex = [];
    this.filters = new Map();
    this.activeFilters = new Set();
    this.contentCache = new Map();
    this.isLoading = false;
    this.init();
  }

  init() {
    this.loadContentData();
    this.setupContentSearch();
    this.setupContentFilters();
    this.setupInteractiveExamples();
    this.setupCodeExamples();
    this.setupContentTabs();
    this.setupContentAccordion();
    this.setupContentPerformance();
  }

  // Load content data
  async loadContentData() {
    try {
      const response = await fetch('/assets/js/content-data.js');
      if (response.ok) {
        const script = await response.text();
        eval(script); // Execute the content data script
        this.contentData = window.NostromoContent;
        this.buildSearchIndex();
      }
    } catch (error) {
      console.warn('Failed to load content data:', error);
      this.contentData = this.getDefaultContentData();
    }
  }

  getDefaultContentData() {
    return {
      components: [],
      examples: [],
      guides: []
    };
  }

  // Build search index
  buildSearchIndex() {
    this.searchIndex = [];
    
    if (this.contentData) {
      // Index components
      this.contentData.components?.forEach(component => {
        this.searchIndex.push({
          id: component.id,
          title: component.title,
          description: component.description,
          category: 'component',
          tags: component.tags || [],
          content: component.content || '',
          url: component.url || ''
        });
      });

      // Index examples
      this.contentData.examples?.forEach(example => {
        this.searchIndex.push({
          id: example.id,
          title: example.title,
          description: example.description,
          category: 'example',
          tags: example.tags || [],
          content: example.content || '',
          url: example.url || ''
        });
      });

      // Index guides
      this.contentData.guides?.forEach(guide => {
        this.searchIndex.push({
          id: guide.id,
          title: guide.title,
          description: guide.description,
          category: 'guide',
          tags: guide.tags || [],
          content: guide.content || '',
          url: guide.url || ''
        });
      });
    }
  }

  // Content search
  setupContentSearch() {
    const searchInput = document.querySelector('.content-search-input');
    const searchResults = document.querySelector('.content-search-results');
    
    if (searchInput && searchResults) {
      searchInput.addEventListener('input', (e) => {
        this.handleContentSearch(e.target.value, searchResults);
      });

      searchInput.addEventListener('focus', () => {
        searchResults.classList.add('active');
      });

      searchInput.addEventListener('blur', () => {
        setTimeout(() => {
          searchResults.classList.remove('active');
        }, 200);
      });
    }
  }

  handleContentSearch(query, resultsContainer) {
    if (!query.trim()) {
      resultsContainer.innerHTML = '';
      return;
    }

    const results = this.searchContent(query);
    this.renderSearchResults(results, resultsContainer);
  }

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

    // Add click handlers
    container.querySelectorAll('.content-search-result').forEach(result => {
      result.addEventListener('click', () => {
        const url = result.dataset.url;
        if (url) {
          window.location.href = url;
        }
      });
    });
  }

  // Content filters
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

  applyFilters() {
    const contentElements = document.querySelectorAll('.content-item');
    contentElements.forEach(element => {
      const elementTags = element.dataset.tags?.split(',') || [];
      const elementCategory = element.dataset.category;
      
      let shouldShow = true;
      
      if (this.activeFilters.size > 0) {
        shouldShow = Array.from(this.activeFilters).every(filter => {
          return elementTags.includes(filter) || elementCategory === filter;
        });
      }
      
      element.style.display = shouldShow ? 'block' : 'none';
    });
  }

  // Interactive examples
  setupInteractiveExamples() {
    const examples = document.querySelectorAll('.interactive-example');
    examples.forEach(example => {
      this.setupInteractiveExample(example);
    });
  }

  setupInteractiveExample(example) {
    const preview = example.querySelector('.interactive-example-preview');
    const code = example.querySelector('.interactive-example-code');
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

  runInteractiveExample(example) {
    const preview = example.querySelector('.interactive-example-preview');
    const code = example.querySelector('.interactive-example-code pre code');
    
    if (preview && code) {
      try {
        // Execute the code in the preview
        const codeContent = code.textContent;
        preview.innerHTML = this.executeCode(codeContent);
      } catch (error) {
        preview.innerHTML = `<div class="content-error-message">Error: ${error.message}</div>`;
      }
    }
  }

  executeCode(code) {
    // This is a simplified code execution
    // In a real implementation, you'd use a proper code execution environment
    return `<div class="code-output">${code}</div>`;
  }

  resetInteractiveExample(example) {
    const preview = example.querySelector('.interactive-example-preview');
    if (preview) {
      preview.innerHTML = '<div class="content-loading">Loading...</div>';
    }
  }

  // Code examples
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

  copyCode(block) {
    const code = block.querySelector('code');
    if (code) {
      navigator.clipboard.writeText(code.textContent).then(() => {
        this.showCopySuccess(block);
      }).catch(() => {
        this.showCopyError(block);
      });
    }
  }

  showCopySuccess(block) {
    const button = block.parentElement.querySelector('.code-action[data-action="copy"]');
    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Copied!';
      button.style.background = 'var(--color-success)';
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
      }, 2000);
    }
  }

  showCopyError(block) {
    const button = block.parentElement.querySelector('.code-action[data-action="copy"]');
    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Error!';
      button.style.background = 'var(--color-error)';
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
      }, 2000);
    }
  }

  runCode(block) {
    const code = block.querySelector('code');
    if (code) {
      try {
        const result = this.executeCode(code.textContent);
        this.showCodeResult(block, result);
      } catch (error) {
        this.showCodeError(block, error);
      }
    }
  }

  showCodeResult(block, result) {
    const resultContainer = document.createElement('div');
    resultContainer.className = 'code-result';
    resultContainer.innerHTML = result;
    block.appendChild(resultContainer);
  }

  showCodeError(block, error) {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'code-error';
    errorContainer.innerHTML = `<div class="content-error-message">Error: ${error.message}</div>`;
    block.appendChild(errorContainer);
  }

  // Content tabs
  setupContentTabs() {
    const tabContainers = document.querySelectorAll('.content-tabs');
    tabContainers.forEach(container => {
      this.setupContentTabContainer(container);
    });
  }

  setupContentTabContainer(container) {
    const tabs = container.querySelectorAll('.content-tabs-tab');
    const panels = container.querySelectorAll('.content-tabs-panel');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.switchTab(container, tab, tabs, panels);
      });
    });
  }

  switchTab(container, activeTab, allTabs, allPanels) {
    // Update tab states
    allTabs.forEach(tab => {
      tab.classList.remove('active');
      tab.setAttribute('aria-selected', 'false');
    });
    
    activeTab.classList.add('active');
    activeTab.setAttribute('aria-selected', 'true');
    
    // Update panel states
    allPanels.forEach(panel => {
      panel.classList.remove('active');
      panel.setAttribute('aria-hidden', 'true');
    });
    
    const targetPanel = container.querySelector(`#${activeTab.getAttribute('aria-controls')}`);
    if (targetPanel) {
      targetPanel.classList.add('active');
      targetPanel.setAttribute('aria-hidden', 'false');
    }
  }

  // Content accordion
  setupContentAccordion() {
    const accordionContainers = document.querySelectorAll('.content-accordion');
    accordionContainers.forEach(container => {
      this.setupContentAccordionContainer(container);
    });
  }

  setupContentAccordionContainer(container) {
    const headers = container.querySelectorAll('.content-accordion-header');
    
    headers.forEach(header => {
      header.addEventListener('click', () => {
        this.toggleAccordionItem(header);
      });
    });
  }

  toggleAccordionItem(header) {
    const content = header.nextElementSibling;
    const isExpanded = header.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
      header.setAttribute('aria-expanded', 'false');
      content.classList.remove('active');
    } else {
      header.setAttribute('aria-expanded', 'true');
      content.classList.add('active');
    }
  }

  // Content performance
  setupContentPerformance() {
    this.setupContentLazyLoading();
    this.setupContentCaching();
    this.setupContentOptimizations();
  }

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

  loadLazyContent(element) {
    const src = element.dataset.lazy;
    if (src) {
      if (element.tagName === 'IMG') {
        element.src = src;
      } else if (element.tagName === 'VIDEO') {
        element.src = src;
      } else {
        // Load content via fetch
        fetch(src)
          .then(response => response.text())
          .then(content => {
            element.innerHTML = content;
          })
          .catch(error => {
            console.warn('Failed to load lazy content:', error);
          });
      }
    }
  }

  setupContentCaching() {
    // Cache content data
    if (this.contentData) {
      this.contentCache.set('contentData', this.contentData);
    }
  }

  setupContentOptimizations() {
    // Optimize content rendering
    this.optimizeContentRendering();
  }

  optimizeContentRendering() {
    // Use requestAnimationFrame for smooth animations
    this.optimizedRender = (callback) => {
      requestAnimationFrame(callback);
    };
  }

  // Content analytics
  trackContentInteraction(action, element) {
    // Track content interactions for analytics
    const data = {
      action: action,
      element: element.tagName,
      timestamp: Date.now(),
      url: window.location.pathname
    };
    
    // Send to analytics service
    console.log('Content interaction:', data);
  }

  // Utility methods
  getContentData() {
    return this.contentData;
  }

  getSearchIndex() {
    return this.searchIndex;
  }

  getActiveFilters() {
    return Array.from(this.activeFilters);
  }

  // Export for module usage
  static getInstance() {
    if (!ContentManager.instance) {
      ContentManager.instance = new ContentManager();
    }
    return ContentManager.instance;
  }
}

// Initialize content manager
document.addEventListener('DOMContentLoaded', () => {
  window.contentManager = ContentManager.getInstance();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContentManager;
}
