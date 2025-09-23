// Nostromo UI Advanced Documentation - Main JavaScript

class NostromoDocs {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.searchQuery = '';
    this.searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    this.searchIndex = this.buildSearchIndex();
    this.init();
  }

  init() {
    this.setupTheme();
    this.setupNavigation();
    this.setupSearch();
    this.setupCodeEditor();
    this.setupLivePreview();
    this.setupScrollSpy();
    this.setupMobileMenu();
  }

  // Theme management
  setupTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }
    this.applyTheme(this.currentTheme);
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.currentTheme);
    this.applyTheme(this.currentTheme);
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.innerHTML = theme === 'light' ? '🌙' : '☀️';
    }
  }

  // Navigation
  setupNavigation() {
    // Handle sidebar navigation - only for anchor links
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.navigateToPage(href);
        });
      }
      // Let normal page navigation work for other links
    });

    // Handle main navigation - only for anchor links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.navigateToPage(href);
        });
      }
      // Let normal page navigation work for other links
    });

    // Set active navigation item
    this.setActiveNavigation();
  }

  navigateToPage(href) {
    if (href.startsWith('#')) {
      // Handle anchor links
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Handle page navigation
      window.location.href = href;
    }
  }

  setActiveNavigation() {
    const currentPath = window.location.pathname;
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const navLinks = document.querySelectorAll('.nav-link');

    // Remove active class from all links
    [...sidebarLinks, ...navLinks].forEach(link => {
      link.classList.remove('active');
    });

    // Add active class to current page
    [...sidebarLinks, ...navLinks].forEach(link => {
      if (link.getAttribute('href') === currentPath || 
          (currentPath === '/' && link.getAttribute('href') === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // Search functionality
  setupSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase();
        this.performSearch();
      });

      // Keyboard navigation
      searchInput.addEventListener('keydown', (e) => {
        this.handleSearchKeydown(e);
      });

      // Focus/blur handling
      searchInput.addEventListener('focus', () => {
        this.showSearchResults();
      });

      searchInput.addEventListener('blur', (e) => {
        // Delay hiding to allow clicking on results
        setTimeout(() => {
          this.hideSearchResults();
        }, 200);
      });
    }
  }

  buildSearchIndex() {
    return [
      // Core Components
      { title: 'Button', description: 'Interactive buttons with loading states and variants', category: 'Core', url: 'components/button.html', keywords: ['button', 'click', 'interactive', 'primary', 'secondary'] },
      { title: 'Input', description: 'Text input fields with validation and form integration', category: 'Core', url: 'components/input.html', keywords: ['input', 'text', 'form', 'field', 'validation'] },
      { title: 'Dialog', description: 'Modal dialogs with accessibility and focus management', category: 'Core', url: 'components/dialog.html', keywords: ['dialog', 'modal', 'popup', 'overlay'] },
      { title: 'Badge', description: 'Status indicators and labels', category: 'Core', url: 'components/badge.html', keywords: ['badge', 'label', 'status', 'indicator'] },
      { title: 'Card', description: 'Container components for content', category: 'Core', url: 'components/card.html', keywords: ['card', 'container', 'content', 'panel'] },
      { title: 'Avatar', description: 'User profile images with fallback support', category: 'Core', url: 'components/avatar.html', keywords: ['avatar', 'profile', 'image', 'user'] },
      { title: 'Tabs', description: 'Tab navigation with keyboard accessibility', category: 'Core', url: 'components/tabs.html', keywords: ['tabs', 'navigation', 'tabbed', 'content'] },
      { title: 'Select', description: 'Dropdown selects with search and multi-select', category: 'Core', url: 'components/select.html', keywords: ['select', 'dropdown', 'option', 'choice'] },
      { title: 'Label', description: 'Form labels with accessibility features', category: 'Core', url: 'components/label.html', keywords: ['label', 'form', 'text', 'accessibility'] },
      { title: 'HelperText', description: 'Helper text for form fields', category: 'Core', url: 'components/helper-text.html', keywords: ['helper', 'text', 'form', 'help'] },
      { title: 'ErrorMessage', description: 'Error messages for validation', category: 'Core', url: 'components/error-message.html', keywords: ['error', 'message', 'validation', 'alert'] },
      
      // Marketing Components
      { title: 'Hero', description: 'Hero sections with customizable layouts and call-to-action buttons', category: 'Marketing', url: 'components/marketing/hero.html', keywords: ['hero', 'banner', 'landing', 'cta'] },
      { title: 'Testimonials', description: 'Customer testimonials with ratings, avatars and responsive grids', category: 'Marketing', url: 'components/marketing/testimonials.html', keywords: ['testimonials', 'reviews', 'customers', 'feedback'] },
      { title: 'Features', description: 'Feature showcase grids with icons and hover effects', category: 'Marketing', url: 'components/marketing/features.html', keywords: ['features', 'showcase', 'grid', 'icons'] },
      { title: 'Pricing', description: 'Pricing tables with yearly/monthly toggle and popular plan highlighting', category: 'Marketing', url: 'components/marketing/pricing.html', keywords: ['pricing', 'plans', 'cost', 'subscription'] },
      
      // Getting Started
      { title: 'Installation', description: 'How to install Nostromo UI in your project', category: 'Getting Started', url: 'getting-started/installation.html', keywords: ['install', 'setup', 'npm', 'yarn', 'pnpm'] },
      { title: 'Setup', description: 'Configure Tailwind CSS and import components', category: 'Getting Started', url: 'getting-started/setup.html', keywords: ['setup', 'config', 'tailwind', 'css'] }
    ];
  }

  performSearch() {
    const searchResults = document.querySelector('.search-results');
    if (!searchResults) return;

    if (this.searchQuery.length < 2) {
      this.showSearchHistory();
      return;
    }

    const results = this.searchIndex.filter(item => {
      const searchTerms = this.searchQuery.split(' ');
      return searchTerms.every(term => 
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.keywords.some(keyword => keyword.includes(term))
      );
    });

    // Sort by relevance
    results.sort((a, b) => {
      const aScore = this.calculateRelevanceScore(a);
      const bScore = this.calculateRelevanceScore(b);
      return bScore - aScore;
    });

    this.displaySearchResults(results);
    this.addToSearchHistory(this.searchQuery);
  }

  calculateRelevanceScore(item) {
    let score = 0;
    const query = this.searchQuery.toLowerCase();
    
    // Title match gets highest score
    if (item.title.toLowerCase().includes(query)) score += 10;
    
    // Description match gets medium score
    if (item.description.toLowerCase().includes(query)) score += 5;
    
    // Keyword match gets low score
    item.keywords.forEach(keyword => {
      if (keyword.includes(query)) score += 2;
    });
    
    return score;
  }

  displaySearchResults(results) {
    const searchResults = document.querySelector('.search-results');
    if (!searchResults) return;

    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="search-no-results">
          <p>No results found for "${this.searchQuery}"</p>
          <p class="search-suggestion">Try searching for: button, input, dialog, hero, pricing</p>
        </div>
      `;
      return;
    }

    // Group results by category
    const groupedResults = results.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});

    const resultsHTML = Object.entries(groupedResults).map(([category, items]) => `
      <div class="search-category">
        <h4 class="search-category-title">${category}</h4>
        ${items.map(item => `
          <div class="search-result-item" data-url="${item.url}">
            <h5 class="search-result-title">${this.highlightSearchTerm(item.title)}</h5>
            <p class="search-result-description">${this.highlightSearchTerm(item.description)}</p>
            <div class="search-result-keywords">
              ${item.keywords.slice(0, 3).map(keyword => 
                `<span class="search-keyword">${keyword}</span>`
              ).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `).join('');

    searchResults.innerHTML = resultsHTML;
    this.setupSearchResultClickHandlers();
  }

  highlightSearchTerm(text) {
    if (!this.searchQuery) return text;
    const regex = new RegExp(`(${this.searchQuery})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  setupSearchResultClickHandlers() {
    const resultItems = document.querySelectorAll('.search-result-item');
    resultItems.forEach(item => {
      item.addEventListener('click', () => {
        const url = item.getAttribute('data-url');
        if (url) {
          window.location.href = url;
        }
      });
    });
  }

  showSearchHistory() {
    const searchResults = document.querySelector('.search-results');
    if (!searchResults || this.searchHistory.length === 0) return;

    const historyHTML = `
      <div class="search-history">
        <h4 class="search-category-title">Recent Searches</h4>
        ${this.searchHistory.slice(0, 5).map(query => `
          <div class="search-history-item" data-query="${query}">
            <span class="search-history-icon">🕒</span>
            <span>${query}</span>
          </div>
        `).join('')}
      </div>
    `;

    searchResults.innerHTML = historyHTML;
    this.setupSearchHistoryClickHandlers();
  }

  setupSearchHistoryClickHandlers() {
    const historyItems = document.querySelectorAll('.search-history-item');
    historyItems.forEach(item => {
      item.addEventListener('click', () => {
        const query = item.getAttribute('data-query');
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
          searchInput.value = query;
          this.searchQuery = query.toLowerCase();
          this.performSearch();
        }
      });
    });
  }

  addToSearchHistory(query) {
    if (!query || query.length < 2) return;
    
    // Remove if already exists
    this.searchHistory = this.searchHistory.filter(item => item !== query);
    
    // Add to beginning
    this.searchHistory.unshift(query);
    
    // Keep only last 10 searches
    this.searchHistory = this.searchHistory.slice(0, 10);
    
    // Save to localStorage
    localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
  }

  handleSearchKeydown(e) {
    const searchResults = document.querySelector('.search-results');
    if (!searchResults) return;

    const resultItems = searchResults.querySelectorAll('.search-result-item, .search-history-item');
    const activeItem = searchResults.querySelector('.search-result-active');
    let activeIndex = -1;

    if (activeItem) {
      activeIndex = Array.from(resultItems).indexOf(activeItem);
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        activeIndex = Math.min(activeIndex + 1, resultItems.length - 1);
        this.setActiveSearchResult(resultItems[activeIndex]);
        break;
      case 'ArrowUp':
        e.preventDefault();
        activeIndex = Math.max(activeIndex - 1, 0);
        this.setActiveSearchResult(resultItems[activeIndex]);
        break;
      case 'Enter':
        e.preventDefault();
        if (activeItem) {
          activeItem.click();
        }
        break;
      case 'Escape':
        this.hideSearchResults();
        break;
    }
  }

  setActiveSearchResult(item) {
    const searchResults = document.querySelector('.search-results');
    if (!searchResults) return;

    // Remove previous active
    const previousActive = searchResults.querySelector('.search-result-active');
    if (previousActive) {
      previousActive.classList.remove('search-result-active');
    }

    // Set new active
    if (item) {
      item.classList.add('search-result-active');
    }
  }

  showSearchResults() {
    const searchResults = document.querySelector('.search-results');
    if (searchResults) {
      searchResults.style.display = 'block';
    }
  }

  hideSearchResults() {
    const searchResults = document.querySelector('.search-results');
    if (searchResults) {
      searchResults.style.display = 'none';
    }
  }

  // Code editor
  setupCodeEditor() {
    const codeEditors = document.querySelectorAll('.code-editor-content');
    codeEditors.forEach(editor => {
      editor.addEventListener('input', (e) => {
        this.updateLivePreview(e.target.value);
      });
    });
  }

  updateLivePreview(code) {
    const preview = document.querySelector('.live-preview');
    if (!preview) return;

    try {
      // Simple code execution for demo purposes
      // In a real implementation, you'd use a proper code sandbox
      preview.innerHTML = this.executeCode(code);
    } catch (error) {
      preview.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
  }

  executeCode(code) {
    // This is a simplified version - in reality you'd use a proper sandbox
    if (code.includes('Button')) {
      return '<button class="btn btn-primary">Demo Button</button>';
    }
    if (code.includes('Input')) {
      return '<input type="text" placeholder="Demo Input" class="form-input">';
    }
    return '<div>Live preview will appear here</div>';
  }

  // Live preview
  setupLivePreview() {
    const previewButtons = document.querySelectorAll('.preview-button');
    previewButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const code = e.target.closest('.code-block').textContent;
        this.updateLivePreview(code);
      });
    });
  }

  // Scroll spy for navigation
  setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '-100px 0px -100px 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  // Mobile menu
  setupMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
      });
    }
  }

  // Utility methods
  copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      this.showNotification('Copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }

  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--color-success);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  // Component showcase
  setupComponentShowcase() {
    const variantCards = document.querySelectorAll('.variant-card');
    variantCards.forEach(card => {
      card.addEventListener('click', () => {
        // Remove active class from all cards
        variantCards.forEach(c => c.classList.remove('active'));
        // Add active class to clicked card
        card.classList.add('active');
      });
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new NostromoDocs();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .search-results {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--bg-primary);
    border: 1px solid var(--border-light);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-height: 400px;
    overflow-y: auto;
    z-index: 1000;
    display: none;
  }

  .search-category {
    margin-bottom: 16px;
  }

  .search-category-title {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--text-muted);
    margin: 0 0 8px 0;
    padding: 8px 12px 4px;
    border-bottom: 1px solid var(--border-light);
  }

  .search-result-item {
    padding: 12px;
    border: none;
    border-radius: 0;
    margin: 0;
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: 1px solid var(--border-light);
  }

  .search-result-item:last-child {
    border-bottom: none;
  }

  .search-result-item:hover,
  .search-result-item.search-result-active {
    background: var(--bg-secondary);
  }

  .search-result-title {
    font-size: 14px;
    font-weight: 600;
    margin: 0 0 4px 0;
    color: var(--text-primary);
  }

  .search-result-description {
    font-size: 12px;
    color: var(--text-muted);
    margin: 0 0 8px 0;
    line-height: 1.4;
  }

  .search-result-keywords {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
  }

  .search-keyword {
    font-size: 10px;
    padding: 2px 6px;
    background: var(--bg-tertiary);
    color: var(--text-muted);
    border-radius: 4px;
  }

  .search-history {
    padding: 8px 0;
  }

  .search-history-item {
    padding: 8px 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .search-history-item:hover,
  .search-history-item.search-result-active {
    background: var(--bg-secondary);
  }

  .search-history-icon {
    font-size: 12px;
    opacity: 0.6;
  }

  .search-no-results {
    padding: 16px;
    text-align: center;
  }

  .search-no-results p {
    margin: 0 0 8px 0;
    color: var(--text-muted);
  }

  .search-suggestion {
    font-size: 12px;
    color: var(--text-muted);
    font-style: italic;
  }

  mark {
    background: var(--color-primary);
    color: white;
    padding: 1px 2px;
    border-radius: 2px;
  }

  .variant-card.active {
    border-color: var(--color-primary);
    background: var(--bg-tertiary);
  }

  .error {
    color: var(--color-error);
    padding: 12px;
    background: rgba(239, 68, 68, 0.1);
    border-radius: 8px;
    border: 1px solid rgba(239, 68, 68, 0.2);
  }

  .notification {
    box-shadow: var(--shadow-lg);
  }

  @media (max-width: 768px) {
    .mobile-menu {
      display: none;
      position: fixed;
      top: 80px;
      left: 0;
      right: 0;
      background: var(--bg-primary);
      border-bottom: 1px solid var(--border-light);
      padding: 20px;
      z-index: 99;
    }

    .mobile-menu.active {
      display: block;
    }

    .mobile-menu-toggle {
      display: block;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
    }
  }

  @media (min-width: 769px) {
    .mobile-menu-toggle {
      display: none;
    }
  }
`;
document.head.appendChild(style);
