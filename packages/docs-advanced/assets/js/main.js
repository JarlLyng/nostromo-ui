// Nostromo UI Advanced Documentation - Main JavaScript

class NostromoDocs {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.searchQuery = '';
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
    // Handle sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigateToPage(link.getAttribute('href'));
      });
    });

    // Handle main navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigateToPage(link.getAttribute('href'));
      });
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
    }
  }

  performSearch() {
    const searchResults = document.querySelector('.search-results');
    if (!searchResults) return;

    if (this.searchQuery.length < 2) {
      searchResults.innerHTML = '';
      return;
    }

    // Simple search implementation
    const components = document.querySelectorAll('.component-card, .sidebar-link');
    const results = [];

    components.forEach(component => {
      const text = component.textContent.toLowerCase();
      if (text.includes(this.searchQuery)) {
        results.push(component);
      }
    });

    this.displaySearchResults(results);
  }

  displaySearchResults(results) {
    const searchResults = document.querySelector('.search-results');
    if (!searchResults) return;

    if (results.length === 0) {
      searchResults.innerHTML = '<p>No results found</p>';
      return;
    }

    const resultsHTML = results.map(result => {
      const title = result.querySelector('h3')?.textContent || result.textContent;
      const description = result.querySelector('p')?.textContent || '';
      return `
        <div class="search-result-item">
          <h4>${title}</h4>
          <p>${description}</p>
        </div>
      `;
    }).join('');

    searchResults.innerHTML = resultsHTML;
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

  .search-result-item {
    padding: 12px;
    border: 1px solid var(--border-light);
    border-radius: 8px;
    margin-bottom: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .search-result-item:hover {
    background: var(--bg-secondary);
    border-color: var(--color-primary);
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
