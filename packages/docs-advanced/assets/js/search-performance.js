// Nostromo UI Advanced Documentation - Search Performance Optimizations

class SearchPerformance {
  constructor() {
    this.cache = new Map();
    this.debounceTimers = new Map();
    this.throttleTimers = new Map();
    this.searchMetrics = {
      totalSearches: 0,
      cacheHits: 0,
      averageResponseTime: 0,
      popularQueries: new Map()
    };
    this.init();
  }

  init() {
    this.setupDebouncing();
    this.setupThrottling();
    this.setupCaching();
    this.setupAnalytics();
    this.setupMemoryManagement();
  }

  // Debouncing for search input
  setupDebouncing() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;

    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.handleSearchInput(e.target.value);
      }, 300);
    });
  }

  // Throttling for scroll events
  setupThrottling() {
    let scrollTimer;
    window.addEventListener('scroll', () => {
      if (!scrollTimer) {
        scrollTimer = setTimeout(() => {
          this.handleScroll();
          scrollTimer = null;
        }, 100);
      }
    });
  }

  // Advanced caching system
  setupCaching() {
    this.cacheConfig = {
      maxSize: 100,
      ttl: 300000, // 5 minutes
      cleanupInterval: 60000 // 1 minute
    };

    // Cleanup cache periodically
    setInterval(() => {
      this.cleanupCache();
    }, this.cacheConfig.cleanupInterval);
  }

  // Search analytics
  setupAnalytics() {
    this.trackSearch = (query, results, responseTime) => {
      this.searchMetrics.totalSearches++;
      this.searchMetrics.averageResponseTime = 
        (this.searchMetrics.averageResponseTime + responseTime) / 2;

      // Track popular queries
      const count = this.searchMetrics.popularQueries.get(query) || 0;
      this.searchMetrics.popularQueries.set(query, count + 1);

      // Send analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'search', {
          search_term: query,
          results_count: results.length,
          response_time: responseTime
        });
      }
    };
  }

  // Memory management
  setupMemoryManagement() {
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
      this.cleanup();
    });

    // Monitor memory usage
    if (performance.memory) {
      setInterval(() => {
        this.monitorMemoryUsage();
      }, 30000);
    }
  }

  // Search input handling
  handleSearchInput(query) {
    const startTime = performance.now();
    
    // Check cache first
    if (this.cache.has(query)) {
      this.searchMetrics.cacheHits++;
      const results = this.cache.get(query);
      this.displayResults(results);
      return;
    }

    // Perform search
    const results = this.performSearch(query);
    const endTime = performance.now();
    const responseTime = endTime - startTime;

    // Cache results
    this.cacheSearchResult(query, results);

    // Track analytics
    this.trackSearch(query, results, responseTime);

    // Display results
    this.displayResults(results);
  }

  // Perform search with optimizations
  performSearch(query) {
    if (!query || query.length < 2) {
      return [];
    }

    const normalizedQuery = query.toLowerCase();
    const results = [];

    // Use fuzzy matching for better results
    if (window.searchEngine) {
      const searchResults = window.searchEngine.search(normalizedQuery, {
        limit: 10,
        fuzzy: true
      });
      results.push(...searchResults);
    }

    // Sort by relevance
    return results.sort((a, b) => {
      const scoreA = this.calculateRelevanceScore(a, normalizedQuery);
      const scoreB = this.calculateRelevanceScore(b, normalizedQuery);
      return scoreB - scoreA;
    });
  }

  // Calculate relevance score
  calculateRelevanceScore(item, query) {
    let score = 0;
    const name = item.name.toLowerCase();
    const category = item.category.toLowerCase();
    const type = item.type.toLowerCase();

    // Exact match gets highest score
    if (name === query) score += 100;
    else if (name.startsWith(query)) score += 80;
    else if (name.includes(query)) score += 60;
    else if (query.includes(name)) score += 40;

    // Category bonus
    if (category.includes(query)) score += 20;
    if (type.includes(query)) score += 10;

    // Length penalty (shorter names are more relevant)
    score -= name.length * 0.1;

    return Math.max(0, score);
  }

  // Cache search results
  cacheSearchResult(query, results) {
    if (this.cache.size >= this.cacheConfig.maxSize) {
      // Remove oldest entry
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(query, {
      results,
      timestamp: Date.now()
    });
  }

  // Display search results
  displayResults(results) {
    const container = document.querySelector('.search-results');
    if (!container) return;

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
    this.setupResultHandlers(container);
  }

  // Highlight search matches
  highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  // Setup result click handlers
  setupResultHandlers(container) {
    container.querySelectorAll('.search-result').forEach(result => {
      result.addEventListener('click', () => {
        this.navigateToResult(result.dataset);
      });
    });
  }

  // Navigate to search result
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

  // Handle scroll events
  handleScroll() {
    // Hide search results when scrolling
    const searchResults = document.querySelector('.search-results');
    if (searchResults && searchResults.classList.contains('active')) {
      searchResults.classList.remove('active');
    }
  }

  // Cache cleanup
  cleanupCache() {
    const now = Date.now();
    const expiredKeys = [];

    this.cache.forEach((value, key) => {
      if (now - value.timestamp > this.cacheConfig.ttl) {
        expiredKeys.push(key);
      }
    });

    expiredKeys.forEach(key => this.cache.delete(key));
  }

  // Memory usage monitoring
  monitorMemoryUsage() {
    if (performance.memory) {
      const memoryInfo = {
        used: Math.round(performance.memory.usedJSHeapSize / 1048576),
        total: Math.round(performance.memory.totalJSHeapSize / 1048576),
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
      };

      // Log if memory usage is high
      if (memoryInfo.used > memoryInfo.limit * 0.8) {
        console.warn('High memory usage detected:', memoryInfo);
        this.cleanupCache();
      }
    }
  }

  // Get search metrics
  getSearchMetrics() {
    return {
      ...this.searchMetrics,
      cacheHitRate: this.searchMetrics.cacheHits / this.searchMetrics.totalSearches,
      popularQueries: Array.from(this.searchMetrics.popularQueries.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
    };
  }

  // Get last query
  getLastQuery() {
    return this.lastQuery || '';
  }

  // Set last query
  setLastQuery(query) {
    this.lastQuery = query;
  }

  // Cleanup
  cleanup() {
    this.cache.clear();
    this.debounceTimers.clear();
    this.throttleTimers.clear();
  }

  // Export for module usage
  static getInstance() {
    if (!SearchPerformance.instance) {
      SearchPerformance.instance = new SearchPerformance();
    }
    return SearchPerformance.instance;
  }
}

// Initialize search performance
document.addEventListener('DOMContentLoaded', () => {
  window.searchPerformance = SearchPerformance.getInstance();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SearchPerformance;
}
