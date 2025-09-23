// Nostromo UI Advanced Documentation - Search System

class SearchEngine {
  constructor() {
    this.index = new Map();
    this.searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    this.searchCache = new Map();
    this.maxCacheSize = 50;
    this.debounceDelay = 300;
    this.init();
  }

  init() {
    this.buildSearchIndex();
    this.setupSearchUI();
    this.setupKeyboardShortcuts();
    this.setupSearchAnalytics();
  }

  // Build search index from navigation data
  buildSearchIndex() {
    if (window.NostromoNavigation) {
      const { core, marketing, gettingStarted } = window.NostromoNavigation;
      
      // Index core components
      core.forEach(component => {
        this.addToIndex(component.name, {
          type: 'component',
          category: 'core',
          file: component.file,
          keywords: this.extractKeywords(component.name, component.category)
        });
      });
      
      // Index marketing components
      marketing.forEach(component => {
        this.addToIndex(component.name, {
          type: 'component',
          category: 'marketing',
          file: component.file,
          keywords: this.extractKeywords(component.name, component.category)
        });
      });
      
      // Index getting started pages
      gettingStarted.forEach(page => {
        this.addToIndex(page.name, {
          type: 'page',
          category: 'getting-started',
          file: page.file,
          keywords: this.extractKeywords(page.name, 'getting-started')
        });
      });
    }
    
    // Add common search terms
    this.addCommonTerms();
  }

  addToIndex(term, data) {
    const normalizedTerm = term.toLowerCase();
    
    if (!this.index.has(normalizedTerm)) {
      this.index.set(normalizedTerm, []);
    }
    
    this.index.get(normalizedTerm).push(data);
    
    // Add partial matches
    const words = normalizedTerm.split(' ');
    words.forEach(word => {
      if (word.length > 2) {
        for (let i = 0; i < word.length - 1; i++) {
          const partial = word.substring(0, i + 2);
          if (!this.index.has(partial)) {
            this.index.set(partial, []);
          }
          this.index.get(partial).push(data);
        }
      }
    });
  }

  extractKeywords(name, category) {
    const keywords = [name.toLowerCase()];
    
    // Add category keywords
    keywords.push(category.toLowerCase());
    
    // Add component type keywords
    if (category === 'form') {
      keywords.push('input', 'field', 'form', 'validation');
    } else if (category === 'display') {
      keywords.push('show', 'display', 'visual', 'ui');
    } else if (category === 'navigation') {
      keywords.push('nav', 'menu', 'link', 'route');
    } else if (category === 'overlay') {
      keywords.push('modal', 'popup', 'overlay', 'dialog');
    } else if (category === 'feedback') {
      keywords.push('message', 'notification', 'alert', 'status');
    }
    
    return keywords;
  }

  addCommonTerms() {
    const commonTerms = [
      { term: 'button', data: { type: 'component', category: 'core', file: 'button.html' } },
      { term: 'input', data: { type: 'component', category: 'core', file: 'input.html' } },
      { term: 'form', data: { type: 'component', category: 'core', file: 'input.html' } },
      { term: 'modal', data: { type: 'component', category: 'core', file: 'dialog.html' } },
      { term: 'table', data: { type: 'component', category: 'core', file: 'table.html' } },
      { term: 'card', data: { type: 'component', category: 'core', file: 'card.html' } },
      { term: 'badge', data: { type: 'component', category: 'core', file: 'badge.html' } },
      { term: 'avatar', data: { type: 'component', category: 'core', file: 'avatar.html' } },
      { term: 'tabs', data: { type: 'component', category: 'core', file: 'tabs.html' } },
      { term: 'select', data: { type: 'component', category: 'core', file: 'select.html' } },
      { term: 'toast', data: { type: 'component', category: 'core', file: 'toast.html' } },
      { term: 'tooltip', data: { type: 'component', category: 'core', file: 'tooltip.html' } },
      { term: 'accordion', data: { type: 'component', category: 'core', file: 'accordion.html' } },
      { term: 'skeleton', data: { type: 'component', category: 'core', file: 'skeleton.html' } },
      { term: 'progress', data: { type: 'component', category: 'core', file: 'progress.html' } }
    ];
    
    commonTerms.forEach(({ term, data }) => {
      this.addToIndex(term, data);
    });
  }

  // Search functionality
  search(query, options = {}) {
    const {
      limit = 10,
      includeHistory = true,
      fuzzy = true
    } = options;
    
    if (!query || query.length < 2) {
      return [];
    }
    
    const normalizedQuery = query.toLowerCase();
    
    // Check cache first
    if (this.searchCache.has(normalizedQuery)) {
      return this.searchCache.get(normalizedQuery);
    }
    
    const results = this.performSearch(normalizedQuery, fuzzy);
    const limitedResults = results.slice(0, limit);
    
    // Cache results
    this.cacheSearchResult(normalizedQuery, limitedResults);
    
    // Add to search history
    if (includeHistory) {
      this.addToSearchHistory(query);
    }
    
    return limitedResults;
  }

  performSearch(query, fuzzy = true) {
    const results = new Map();
    
    // Exact matches first
    if (this.index.has(query)) {
      this.index.get(query).forEach(item => {
        const key = `${item.type}-${item.file}`;
        if (!results.has(key)) {
          results.set(key, { ...item, score: 100 });
        }
      });
    }
    
    // Partial matches
    if (fuzzy) {
      this.index.forEach((items, term) => {
        if (term.includes(query) || query.includes(term)) {
          const score = this.calculateScore(query, term);
          items.forEach(item => {
            const key = `${item.type}-${item.file}`;
            if (!results.has(key) || results.get(key).score < score) {
              results.set(key, { ...item, score });
            }
          });
        }
      });
    }
    
    // Convert to array and sort by score
    return Array.from(results.values())
      .sort((a, b) => b.score - a.score);
  }

  calculateScore(query, term) {
    if (term === query) return 100;
    if (term.startsWith(query)) return 80;
    if (term.includes(query)) return 60;
    if (query.includes(term)) return 40;
    return 20;
  }

  // Search UI
  setupSearchUI() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (!searchInput || !searchResults) return;
    
    // Debounced search
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.handleSearch(e.target.value, searchResults);
      }, this.debounceDelay);
    });
    
    // Focus handling
    searchInput.addEventListener('focus', () => {
      this.showSearchResults(searchResults);
    });
    
    // Click outside to close
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        this.hideSearchResults(searchResults);
      }
    });
    
    // Keyboard navigation
    searchInput.addEventListener('keydown', (e) => {
      this.handleKeyboardNavigation(e, searchResults);
    });
  }

  handleSearch(query, resultsContainer) {
    if (!query || query.length < 2) {
      this.hideSearchResults(resultsContainer);
      return;
    }
    
    const results = this.search(query);
    this.displaySearchResults(results, resultsContainer);
    this.showSearchResults(resultsContainer);
  }

  displaySearchResults(results, container) {
    if (results.length === 0) {
      container.innerHTML = `
        <div class="search-no-results">
          <p>No results found</p>
          <p class="search-suggestion">Try searching for "button", "input", or "form"</p>
        </div>
      `;
      return;
    }
    
    const html = results.map(result => `
      <div class="search-result" data-type="${result.type}" data-file="${result.file}">
        <div class="search-result-title">${this.highlightMatch(result.name, this.getLastQuery())}</div>
        <div class="search-result-category">${result.category}</div>
        <div class="search-result-type">${result.type}</div>
      </div>
    `).join('');
    
    container.innerHTML = html;
    
    // Add click handlers
    container.querySelectorAll('.search-result').forEach(result => {
      result.addEventListener('click', () => {
        this.navigateToResult(result.dataset);
      });
    });
  }

  highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  showSearchResults(container) {
    container.style.display = 'block';
    container.classList.add('active');
  }

  hideSearchResults(container) {
    container.style.display = 'none';
    container.classList.remove('active');
  }

  // Keyboard shortcuts
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
          searchInput.focus();
        }
      }
      
      // Escape to close search
      if (e.key === 'Escape') {
        const searchResults = document.querySelector('.search-results');
        if (searchResults) {
          this.hideSearchResults(searchResults);
        }
      }
    });
  }

  handleKeyboardNavigation(e, container) {
    const results = container.querySelectorAll('.search-result');
    const current = container.querySelector('.search-result.active');
    let index = Array.from(results).indexOf(current);
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        index = Math.min(index + 1, results.length - 1);
        this.setActiveResult(results, index);
        break;
      case 'ArrowUp':
        e.preventDefault();
        index = Math.max(index - 1, 0);
        this.setActiveResult(results, index);
        break;
      case 'Enter':
        e.preventDefault();
        if (current) {
          this.navigateToResult(current.dataset);
        }
        break;
    }
  }

  setActiveResult(results, index) {
    results.forEach((result, i) => {
      result.classList.toggle('active', i === index);
    });
  }

  navigateToResult(data) {
    const { type, file } = data;
    let url = '';
    
    if (type === 'component') {
      url = `components/${file}`;
    } else if (type === 'page') {
      url = file;
    }
    
    if (url) {
      window.location.href = url;
    }
  }

  // Search history
  addToSearchHistory(query) {
    if (!this.searchHistory.includes(query)) {
      this.searchHistory.unshift(query);
      this.searchHistory = this.searchHistory.slice(0, 10); // Keep last 10
      localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
    }
  }

  getSearchHistory() {
    return this.searchHistory;
  }

  clearSearchHistory() {
    this.searchHistory = [];
    localStorage.removeItem('searchHistory');
  }

  // Caching
  cacheSearchResult(query, results) {
    if (this.searchCache.size >= this.maxCacheSize) {
      const firstKey = this.searchCache.keys().next().value;
      this.searchCache.delete(firstKey);
    }
    this.searchCache.set(query, results);
  }

  // Analytics
  setupSearchAnalytics() {
    // Track search queries for analytics
    this.trackSearch = (query, results) => {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'search', {
          search_term: query,
          results_count: results.length
        });
      }
    };
  }

  // Utility methods
  getLastQuery() {
    return this.lastQuery || '';
  }

  setLastQuery(query) {
    this.lastQuery = query;
  }

  // Export for module usage
  static getInstance() {
    if (!SearchEngine.instance) {
      SearchEngine.instance = new SearchEngine();
    }
    return SearchEngine.instance;
  }
}

// Initialize search engine
document.addEventListener('DOMContentLoaded', () => {
  window.searchEngine = SearchEngine.getInstance();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SearchEngine;
}
