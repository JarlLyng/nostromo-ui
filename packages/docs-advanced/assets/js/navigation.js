// Nostromo UI Advanced Documentation - Navigation System

class NavigationManager {
  constructor() {
    this.currentPath = window.location.pathname;
    this.history = [];
    this.breadcrumbs = [];
    this.navigationData = null;
    this.isNavigating = false;
    this.navigationCache = new Map();
    this.init();
  }

  init() {
    this.loadNavigationData();
    this.setupNavigation();
    this.setupBreadcrumbs();
    this.setupPagination();
    this.setupNavigationHistory();
    this.setupNavigationProgress();
    this.setupNavigationAnimations();
    this.setupNavigationPerformance();
  }

  // Load navigation data
  async loadNavigationData() {
    try {
      // Try to use existing navigation data if already loaded
      if (window.NostromoNavigation) {
        this.navigationData = window.NostromoNavigation;
        return;
      }
      
      // Try to load from relative path
      const response = await fetch('./assets/js/navigation-data.js');
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

  getDefaultNavigationData() {
    return {
      core: [],
      marketing: [],
      gettingStarted: []
    };
  }

  // Setup navigation
  setupNavigation() {
    this.setupMainNavigation();
    this.setupSidebarNavigation();
    this.setupDropdownNavigation();
    this.setupMobileNavigation();
  }

  setupMainNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        this.handleNavigation(e, link);
      });
    });
  }

  setupSidebarNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-nav-link');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        this.handleNavigation(e, link);
      });
    });

    // Update active states
    this.updateActiveStates();
    
    // Update sidebar with navigation data
    this.updateSidebarWithNavigationData();
  }
  
  updateSidebarWithNavigationData() {
    if (!this.navigationData) return;
    
    // Update core components section
    const coreSection = document.querySelector('#core-components-nav');
    if (coreSection && this.navigationData.core) {
      coreSection.innerHTML = this.navigationData.core.map(component => 
        `<li><a href="../components/${component.file}" class="sidebar-link">${component.name}</a></li>`
      ).join('');
    }
    
    // Update marketing components section
    const marketingSection = document.querySelector('#marketing-components-nav');
    if (marketingSection && this.navigationData.marketing) {
      marketingSection.innerHTML = this.navigationData.marketing.map(component => 
        `<li><a href="../components/${component.file}" class="sidebar-link">${component.name}</a></li>`
      ).join('');
    }
  }

  setupDropdownNavigation() {
    const dropdownTriggers = document.querySelectorAll('.nav-dropdown-trigger');
    dropdownTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleDropdown(trigger);
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-dropdown')) {
        this.closeAllDropdowns();
      }
    });
  }

  setupMobileNavigation() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar-nav');
    
    if (mobileMenuToggle && sidebar) {
      mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleMobileMenu();
      });
    }
  }

  // Navigation handling
  handleNavigation(e, link) {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;

    e.preventDefault();
    this.navigateTo(href);
  }

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

  // Dropdown management
  toggleDropdown(trigger) {
    const dropdown = trigger.closest('.nav-dropdown');
    const menu = dropdown.querySelector('.nav-dropdown-menu');
    
    if (menu.classList.contains('open')) {
      this.closeDropdown(menu);
    } else {
      this.closeAllDropdowns();
      this.openDropdown(menu);
    }
  }

  openDropdown(menu) {
    menu.classList.add('open');
    menu.setAttribute('aria-expanded', 'true');
    
    // Focus first item
    const firstItem = menu.querySelector('.nav-dropdown-item');
    if (firstItem) {
      firstItem.focus();
    }
  }

  closeDropdown(menu) {
    menu.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  }

  closeAllDropdowns() {
    const openDropdowns = document.querySelectorAll('.nav-dropdown-menu.open');
    openDropdowns.forEach(dropdown => {
      this.closeDropdown(dropdown);
    });
  }

  // Mobile menu
  toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar-nav');
    const overlay = document.querySelector('.mobile-overlay');
    
    if (sidebar && overlay) {
      const isOpen = sidebar.classList.contains('open');
      
      if (isOpen) {
        this.closeMobileMenu();
      } else {
        this.openMobileMenu();
      }
    }
  }

  openMobileMenu() {
    const sidebar = document.querySelector('.sidebar-nav');
    const overlay = document.querySelector('.mobile-overlay');
    
    if (sidebar && overlay) {
      sidebar.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      
      // Focus first link
      const firstLink = sidebar.querySelector('.sidebar-nav-link');
      if (firstLink) {
        firstLink.focus();
      }
    }
  }

  closeMobileMenu() {
    const sidebar = document.querySelector('.sidebar-nav');
    const overlay = document.querySelector('.mobile-overlay');
    
    if (sidebar && overlay) {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // Breadcrumbs
  setupBreadcrumbs() {
    this.generateBreadcrumbs();
    this.renderBreadcrumbs();
  }

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

  formatBreadcrumbLabel(segment) {
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  getBreadcrumbIcon(segment) {
    const iconMap = {
      'components': '📦',
      'marketing': '🎨',
      'getting-started': '🚀',
      'button': '🔘',
      'input': '📝',
      'dialog': '💬',
      'badge': '🏷️',
      'card': '🃏',
      'avatar': '👤',
      'tabs': '📑',
      'select': '📋',
      'label': '🏷️',
      'helper-text': '💡',
      'error-message': '⚠️',
      'icon': '🎯',
      'table': '📊',
      'toast': '🍞',
      'tooltip': '💭',
      'accordion': '📋',
      'skeleton': '🦴',
      'progress': '📈',
      'hero': '🦸',
      'testimonials': '💬',
      'features': '⭐',
      'pricing': '💰',
      'gallery': '🖼️',
      'logo-wall': '🏢'
    };
    
    return iconMap[segment] || '📄';
  }

  renderBreadcrumbs() {
    const breadcrumbContainer = document.querySelector('.breadcrumb-nav');
    if (!breadcrumbContainer) return;
    
    breadcrumbContainer.innerHTML = '';
    
    this.breadcrumbs.forEach((crumb, index) => {
      const breadcrumbItem = document.createElement('div');
      breadcrumbItem.className = 'breadcrumb-item';
      
      if (crumb.current) {
        breadcrumbItem.innerHTML = `
          <span class="breadcrumb-icon">${crumb.icon}</span>
          <span class="breadcrumb-current">${crumb.label}</span>
        `;
      } else {
        breadcrumbItem.innerHTML = `
          <a href="${crumb.url}" class="breadcrumb-link">
            <span class="breadcrumb-icon">${crumb.icon}</span>
            <span>${crumb.label}</span>
          </a>
        `;
      }
      
      breadcrumbContainer.appendChild(breadcrumbItem);
      
      // Add separator (except for last item)
      if (index < this.breadcrumbs.length - 1) {
        const separator = document.createElement('span');
        separator.className = 'breadcrumb-separator';
        separator.textContent = '›';
        breadcrumbContainer.appendChild(separator);
      }
    });
  }

  // Pagination
  setupPagination() {
    this.generatePagination();
    this.renderPagination();
  }

  generatePagination() {
    // This would be implemented based on the current page and total pages
    // For now, we'll create a simple pagination structure
    this.pagination = {
      current: 1,
      total: 10,
      hasPrevious: true,
      hasNext: true,
      pages: [1, 2, 3, 4, 5]
    };
  }

  renderPagination() {
    const paginationContainer = document.querySelector('.pagination-nav');
    if (!paginationContainer) return;
    
    paginationContainer.innerHTML = '';
    
    // Previous button
    if (this.pagination.hasPrevious) {
      const prevButton = document.createElement('a');
      prevButton.className = 'pagination-item';
      prevButton.href = `?page=${this.pagination.current - 1}`;
      prevButton.innerHTML = `
        <svg class="pagination-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      `;
      paginationContainer.appendChild(prevButton);
    }
    
    // Page numbers
    this.pagination.pages.forEach(page => {
      const pageButton = document.createElement('a');
      pageButton.className = `pagination-item ${page === this.pagination.current ? 'active' : ''}`;
      pageButton.href = `?page=${page}`;
      pageButton.textContent = page;
      paginationContainer.appendChild(pageButton);
    });
    
    // Next button
    if (this.pagination.hasNext) {
      const nextButton = document.createElement('a');
      nextButton.className = 'pagination-item';
      nextButton.href = `?page=${this.pagination.current + 1}`;
      nextButton.innerHTML = `
        <svg class="pagination-item-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      `;
      paginationContainer.appendChild(nextButton);
    }
  }

  // Navigation history
  setupNavigationHistory() {
    this.renderNavigationHistory();
  }

  renderNavigationHistory() {
    const historyContainer = document.querySelector('.nav-history');
    if (!historyContainer) return;
    
    historyContainer.innerHTML = '';
    
    this.history.slice(-5).forEach((entry, index) => {
      const historyItem = document.createElement('a');
      historyItem.className = 'nav-history-item';
      historyItem.href = entry.path;
      historyItem.textContent = entry.title;
      
      if (index === this.history.length - 1) {
        historyItem.classList.add('current');
      }
      
      historyContainer.appendChild(historyItem);
      
      // Add separator (except for last item)
      if (index < this.history.length - 1) {
        const separator = document.createElement('span');
        separator.className = 'nav-history-separator';
        separator.textContent = '›';
        historyContainer.appendChild(separator);
      }
    });
  }

  // Navigation progress
  setupNavigationProgress() {
    this.createNavigationProgress();
    this.updateNavigationProgress();
  }

  createNavigationProgress() {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'nav-progress';
    progressContainer.innerHTML = '<div class="nav-progress-bar"></div>';
    document.body.appendChild(progressContainer);
  }

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

  updateNavigationProgress() {
    const progressBar = document.querySelector('.nav-progress-bar');
    if (progressBar) {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      progressBar.style.width = `${scrollPercent}%`;
    }
  }

  // Navigation animations
  setupNavigationAnimations() {
    this.setupScrollAnimations();
    this.setupHoverAnimations();
    this.setupClickAnimations();
  }

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

  // Navigation performance
  setupNavigationPerformance() {
    this.setupNavigationCaching();
    this.setupNavigationOptimizations();
  }

  setupNavigationCaching() {
    // Cache navigation data
    this.cacheNavigationData();
  }

  cacheNavigationData() {
    if (this.navigationData) {
      this.navigationCache.set('navigationData', this.navigationData);
    }
  }

  setupNavigationOptimizations() {
    // Optimize navigation performance
    this.optimizeNavigationRendering();
  }

  optimizeNavigationRendering() {
    // Use requestAnimationFrame for smooth animations
    this.optimizedRender = (callback) => {
      requestAnimationFrame(callback);
    };
  }

  // Active states
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
    
    // Update sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-nav-link');
    sidebarLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Utility methods
  getCurrentPath() {
    return this.currentPath;
  }

  getNavigationHistory() {
    return this.history;
  }

  getBreadcrumbs() {
    return this.breadcrumbs;
  }

  // Export for module usage
  static getInstance() {
    if (!NavigationManager.instance) {
      NavigationManager.instance = new NavigationManager();
    }
    return NavigationManager.instance;
  }
}

// Initialize navigation manager
document.addEventListener('DOMContentLoaded', () => {
  window.navigationManager = NavigationManager.getInstance();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NavigationManager;
}
