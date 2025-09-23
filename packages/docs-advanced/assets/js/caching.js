// Nostromo UI Advanced Documentation - Caching System

class CacheManager {
  constructor() {
    this.cache = new Map();
    this.maxSize = 100; // Maximum number of cache entries
    this.ttl = 300000; // Time to live in milliseconds (5 minutes)
    this.init();
  }

  init() {
    this.setupLocalStorage();
    this.setupSessionStorage();
    this.setupIndexedDB();
    this.setupServiceWorker();
  }

  // Local Storage caching
  setupLocalStorage() {
    // Cache user preferences
    this.cache.set('userPreferences', {
      theme: localStorage.getItem('theme') || 'light',
      searchHistory: JSON.parse(localStorage.getItem('searchHistory') || '[]'),
      navigationState: JSON.parse(localStorage.getItem('navigationState') || '{}')
    });
  }

  // Session Storage caching
  setupSessionStorage() {
    // Cache current session data
    this.cache.set('sessionData', {
      currentPage: sessionStorage.getItem('currentPage') || '',
      scrollPosition: JSON.parse(sessionStorage.getItem('scrollPosition') || '{}'),
      formData: JSON.parse(sessionStorage.getItem('formData') || '{}')
    });
  }

  // IndexedDB for larger data
  setupIndexedDB() {
    if ('indexedDB' in window) {
      this.dbName = 'NostromoDocsCache';
      this.dbVersion = 1;
      this.openDB();
    }
  }

  openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Create object stores
        if (!db.objectStoreNames.contains('components')) {
          db.createObjectStore('components', { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains('navigation')) {
          db.createObjectStore('navigation', { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains('search')) {
          db.createObjectStore('search', { keyPath: 'id' });
        }
      };
    });
  }

  // Service Worker for advanced caching
  setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered:', registration);
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }

  // Cache operations
  set(key, value, ttl = this.ttl) {
    const entry = {
      value,
      timestamp: Date.now(),
      ttl
    };
    
    this.cache.set(key, entry);
    
    // Clean up if cache is too large
    if (this.cache.size > this.maxSize) {
      this.cleanup();
    }
  }

  get(key) {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }
    
    // Check if entry has expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.value;
  }

  has(key) {
    return this.get(key) !== null;
  }

  delete(key) {
    return this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  // Cleanup expired entries
  cleanup() {
    const now = Date.now();
    const expiredKeys = [];
    
    this.cache.forEach((entry, key) => {
      if (now - entry.timestamp > entry.ttl) {
        expiredKeys.push(key);
      }
    });
    
    expiredKeys.forEach(key => this.cache.delete(key));
  }

  // IndexedDB operations
  async setIndexedDB(storeName, key, value) {
    if (!this.db) {
      await this.openDB();
    }
    
    const transaction = this.db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.put({ id: key, data: value, timestamp: Date.now() });
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getIndexedDB(storeName, key) {
    if (!this.db) {
      await this.openDB();
    }
    
    const transaction = this.db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = () => {
        const result = request.result;
        if (result && Date.now() - result.timestamp < this.ttl) {
          resolve(result.data);
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  }

  // Component caching
  async cacheComponent(componentId, componentData) {
    // Cache in memory
    this.set(`component:${componentId}`, componentData);
    
    // Cache in IndexedDB
    await this.setIndexedDB('components', componentId, componentData);
  }

  async getCachedComponent(componentId) {
    // Try memory cache first
    let component = this.get(`component:${componentId}`);
    
    if (!component) {
      // Try IndexedDB
      component = await this.getIndexedDB('components', componentId);
      
      if (component) {
        // Cache in memory for faster access
        this.set(`component:${componentId}`, component);
      }
    }
    
    return component;
  }

  // Navigation caching
  async cacheNavigation(navigationData) {
    this.set('navigation', navigationData);
    await this.setIndexedDB('navigation', 'main', navigationData);
  }

  async getCachedNavigation() {
    let navigation = this.get('navigation');
    
    if (!navigation) {
      navigation = await this.getIndexedDB('navigation', 'main');
      if (navigation) {
        this.set('navigation', navigation);
      }
    }
    
    return navigation;
  }

  // Search caching
  async cacheSearchResults(query, results) {
    const key = `search:${query}`;
    this.set(key, results);
    await this.setIndexedDB('search', query, results);
  }

  async getCachedSearchResults(query) {
    const key = `search:${query}`;
    let results = this.get(key);
    
    if (!results) {
      results = await this.getIndexedDB('search', query);
      if (results) {
        this.set(key, results);
      }
    }
    
    return results;
  }

  // Cache statistics
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      ttl: this.ttl,
      entries: Array.from(this.cache.keys())
    };
  }

  // Export for module usage
  static getInstance() {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }
}

// Initialize cache manager
document.addEventListener('DOMContentLoaded', () => {
  window.cacheManager = CacheManager.getInstance();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CacheManager;
}
