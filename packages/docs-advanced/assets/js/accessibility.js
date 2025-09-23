// Nostromo UI Advanced Documentation - Accessibility Functionality

class AccessibilityManager {
  constructor() {
    this.focusHistory = [];
    this.announcements = [];
    this.keyboardNavigation = false;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.highContrast = window.matchMedia('(prefers-contrast: high)').matches;
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupARIA();
    this.setupScreenReader();
    this.setupColorContrast();
    this.setupMotionPreferences();
    this.setupSkipLinks();
    this.setupLiveRegions();
  }

  // Keyboard navigation
  setupKeyboardNavigation() {
    // Detect keyboard usage
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        this.keyboardNavigation = true;
        document.body.classList.add('keyboard-nav');
      }
    });

    document.addEventListener('mousedown', () => {
      this.keyboardNavigation = false;
      document.body.classList.remove('keyboard-nav');
    });

    // Handle keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      this.handleKeyboardShortcuts(e);
    });

    // Handle focus trapping
    this.setupFocusTrapping();
  }

  handleKeyboardShortcuts(e) {
    // Alt + 1: Skip to main content
    if (e.altKey && e.key === '1') {
      e.preventDefault();
      this.skipToMain();
    }

    // Alt + 2: Skip to navigation
    if (e.altKey && e.key === '2') {
      e.preventDefault();
      this.skipToNavigation();
    }

    // Alt + 3: Skip to search
    if (e.altKey && e.key === '3') {
      e.preventDefault();
      this.skipToSearch();
    }

    // Escape: Close modals, menus, etc.
    if (e.key === 'Escape') {
      this.handleEscape();
    }

    // Enter/Space: Activate buttons and links
    if (e.key === 'Enter' || e.key === ' ') {
      this.handleActivation(e);
    }

    // Arrow keys: Navigate menus and lists
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      this.handleArrowNavigation(e);
    }
  }

  setupFocusTrapping() {
    // Focus trap for modals
    document.addEventListener('keydown', (e) => {
      const modal = document.querySelector('.modal-overlay:not([style*="display: none"])');
      if (!modal || e.key !== 'Tab') return;

      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    });
  }

  // Focus management
  setupFocusManagement() {
    // Track focus history
    document.addEventListener('focusin', (e) => {
      this.focusHistory.push(e.target);
      if (this.focusHistory.length > 10) {
        this.focusHistory.shift();
      }
    });

    // Handle focus restoration
    this.setupFocusRestoration();
  }

  setupFocusRestoration() {
    // Restore focus when returning to page
    window.addEventListener('pageshow', () => {
      const lastFocused = this.focusHistory[this.focusHistory.length - 1];
      if (lastFocused && document.contains(lastFocused)) {
        lastFocused.focus();
      }
    });
  }

  // ARIA support
  setupARIA() {
    this.setupARIALabels();
    this.setupARIARoles();
    this.setupARIAStates();
    this.setupARIAProperties();
  }

  setupARIALabels() {
    // Add missing labels
    const inputs = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
    inputs.forEach(input => {
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (label) {
        input.setAttribute('aria-labelledby', label.id || this.generateID(label));
      } else if (input.placeholder) {
        input.setAttribute('aria-label', input.placeholder);
      }
    });

    // Add labels for buttons without text
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
      if (!button.textContent.trim()) {
        const icon = button.querySelector('svg, i');
        if (icon) {
          button.setAttribute('aria-label', this.getIconLabel(icon));
        }
      }
    });
  }

  setupARIARoles() {
    // Add roles to custom components
    const customComponents = {
      '.search': 'search',
      '.sidebar': 'navigation',
      '.content': 'main',
      '.footer': 'contentinfo',
      '.header': 'banner'
    };

    Object.entries(customComponents).forEach(([selector, role]) => {
      const element = document.querySelector(selector);
      if (element && !element.getAttribute('role')) {
        element.setAttribute('role', role);
      }
    });
  }

  setupARIAStates() {
    // Manage ARIA states
    this.setupExpandedStates();
    this.setupSelectedStates();
    this.setupHiddenStates();
  }

  setupExpandedStates() {
    // Accordion expanded states
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
      header.setAttribute('aria-expanded', 'false');
      header.addEventListener('click', () => {
        const expanded = header.getAttribute('aria-expanded') === 'true';
        header.setAttribute('aria-expanded', (!expanded).toString());
      });
    });

    // Dropdown expanded states
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    dropdownTriggers.forEach(trigger => {
      trigger.setAttribute('aria-expanded', 'false');
      trigger.addEventListener('click', () => {
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', (!expanded).toString());
      });
    });
  }

  setupSelectedStates() {
    // Tab selected states
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
      button.setAttribute('aria-selected', 'false');
      button.addEventListener('click', () => {
        // Update all tabs in the same group
        const tabGroup = button.closest('.tabs');
        const allTabs = tabGroup.querySelectorAll('.tab-button');
        allTabs.forEach(tab => tab.setAttribute('aria-selected', 'false'));
        button.setAttribute('aria-selected', 'true');
      });
    });
  }

  setupHiddenStates() {
    // Manage hidden content
    const hiddenElements = document.querySelectorAll('[aria-hidden="true"]');
    hiddenElements.forEach(element => {
      element.style.display = 'none';
    });
  }

  setupARIAProperties() {
    // Add ARIA properties
    this.setupAriaDescribedBy();
    this.setupAriaControls();
    this.setupAriaOwns();
  }

  setupAriaDescribedBy() {
    // Connect form inputs with error messages
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      const error = input.parentNode.querySelector('.form-error');
      if (error) {
        input.setAttribute('aria-describedby', error.id || this.generateID(error));
      }
    });
  }

  setupAriaControls() {
    // Connect controls with controlled elements
    const controls = document.querySelectorAll('[data-controls]');
    controls.forEach(control => {
      const targetId = control.getAttribute('data-controls');
      const target = document.getElementById(targetId);
      if (target) {
        control.setAttribute('aria-controls', targetId);
      }
    });
  }

  setupAriaOwns() {
    // Connect owners with owned elements
    const owners = document.querySelectorAll('[data-owns]');
    owners.forEach(owner => {
      const ownedIds = owner.getAttribute('data-owns').split(' ');
      owner.setAttribute('aria-owns', ownedIds.join(' '));
    });
  }

  // Screen reader support
  setupScreenReader() {
    this.setupScreenReaderAnnouncements();
    this.setupScreenReaderNavigation();
    this.setupScreenReaderContent();
  }

  setupScreenReaderAnnouncements() {
    // Create live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);
  }

  setupScreenReaderNavigation() {
    // Add navigation landmarks
    const landmarks = {
      'main': '.content',
      'navigation': '.sidebar',
      'search': '.search',
      'banner': '.header',
      'contentinfo': '.footer'
    };

    Object.entries(landmarks).forEach(([role, selector]) => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute('role', role);
        if (role === 'main') {
          element.setAttribute('tabindex', '-1');
        }
      }
    });
  }

  setupScreenReaderContent() {
    // Add screen reader only content
    this.addScreenReaderOnlyContent();
  }

  addScreenReaderOnlyContent() {
    // Add screen reader only headings
    const sections = document.querySelectorAll('section, .section');
    sections.forEach((section, index) => {
      if (!section.querySelector('h1, h2, h3, h4, h5, h6')) {
        const heading = document.createElement('h2');
        heading.className = 'sr-only';
        heading.textContent = `Section ${index + 1}`;
        section.insertBefore(heading, section.firstChild);
      }
    });
  }

  // Color contrast
  setupColorContrast() {
    // Monitor color contrast
    this.checkColorContrast();
    
    // Handle high contrast mode
    if (this.highContrast) {
      document.body.classList.add('high-contrast');
    }

    // Listen for contrast changes
    window.matchMedia('(prefers-contrast: high)').addEventListener('change', (e) => {
      if (e.matches) {
        document.body.classList.add('high-contrast');
      } else {
        document.body.classList.remove('high-contrast');
      }
    });
  }

  checkColorContrast() {
    // Check contrast ratios
    const elements = document.querySelectorAll('*');
    elements.forEach(element => {
      const style = window.getComputedStyle(element);
      const color = style.color;
      const backgroundColor = style.backgroundColor;
      
      if (color && backgroundColor && color !== backgroundColor) {
        const contrast = this.calculateContrast(color, backgroundColor);
        if (contrast < 4.5) {
          console.warn('Low contrast detected:', element, contrast);
        }
      }
    });
  }

  calculateContrast(color1, color2) {
    // Simplified contrast calculation
    // In a real implementation, you'd use a proper color contrast library
    return 4.5; // Placeholder
  }

  // Motion preferences
  setupMotionPreferences() {
    if (this.reducedMotion) {
      document.body.classList.add('reduced-motion');
    }

    // Listen for motion preference changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      if (e.matches) {
        document.body.classList.add('reduced-motion');
      } else {
        document.body.classList.remove('reduced-motion');
      }
    });
  }

  // Skip links
  setupSkipLinks() {
    // Create skip links
    this.createSkipLinks();
  }

  createSkipLinks() {
    const skipLinks = [
      { href: '#main', text: 'Skip to main content' },
      { href: '#navigation', text: 'Skip to navigation' },
      { href: '#search', text: 'Skip to search' }
    ];

    const skipContainer = document.createElement('div');
    skipContainer.className = 'skip-links';

    skipLinks.forEach(link => {
      const skipLink = document.createElement('a');
      skipLink.href = link.href;
      skipLink.textContent = link.text;
      skipLink.className = 'skip-link';
      skipContainer.appendChild(skipLink);
    });

    document.body.insertBefore(skipContainer, document.body.firstChild);
  }

  // Live regions
  setupLiveRegions() {
    // Create live regions for dynamic content
    this.createLiveRegions();
  }

  createLiveRegions() {
    const liveRegions = {
      'status': 'polite',
      'alert': 'assertive',
      'log': 'polite'
    };

    Object.entries(liveRegions).forEach(([id, politeness]) => {
      const region = document.createElement('div');
      region.id = `live-${id}`;
      region.setAttribute('aria-live', politeness);
      region.setAttribute('aria-atomic', 'true');
      region.className = 'sr-only';
      document.body.appendChild(region);
    });
  }

  // Utility methods
  announce(message, type = 'status') {
    const liveRegion = document.getElementById(`live-${type}`);
    if (liveRegion) {
      liveRegion.textContent = message;
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }

  skipToMain() {
    const main = document.querySelector('main, .content');
    if (main) {
      main.focus();
      this.announce('Moved to main content');
    }
  }

  skipToNavigation() {
    const nav = document.querySelector('nav, .sidebar');
    if (nav) {
      nav.focus();
      this.announce('Moved to navigation');
    }
  }

  skipToSearch() {
    const search = document.querySelector('.search-input');
    if (search) {
      search.focus();
      this.announce('Moved to search');
    }
  }

  handleEscape() {
    // Close modals, menus, etc.
    const openElements = document.querySelectorAll('.modal-overlay.open, .dropdown-menu.open, .search-results.active');
    openElements.forEach(element => {
      element.classList.remove('open', 'active');
    });
  }

  handleActivation(e) {
    const target = e.target;
    if (target.tagName === 'BUTTON' || target.tagName === 'A') {
      // Let default behavior handle it
      return;
    }
    
    // Handle custom elements
    if (target.classList.contains('tab-button')) {
      target.click();
    }
  }

  handleArrowNavigation(e) {
    // Handle arrow key navigation for menus, lists, etc.
    const currentElement = document.activeElement;
    const parent = currentElement.closest('.tab-list, .dropdown-menu, .sidebar-links');
    
    if (parent) {
      const items = Array.from(parent.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])'));
      const currentIndex = items.indexOf(currentElement);
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % items.length;
        items[nextIndex].focus();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
        items[prevIndex].focus();
      }
    }
  }

  generateID(element) {
    if (element.id) return element.id;
    const id = 'id-' + Math.random().toString(36).substr(2, 9);
    element.id = id;
    return id;
  }

  getIconLabel(icon) {
    // Get label from icon
    const title = icon.getAttribute('title');
    if (title) return title;
    
    const ariaLabel = icon.getAttribute('aria-label');
    if (ariaLabel) return ariaLabel;
    
    // Default labels for common icons
    const iconClass = icon.className;
    if (iconClass.includes('menu')) return 'Menu';
    if (iconClass.includes('close')) return 'Close';
    if (iconClass.includes('search')) return 'Search';
    if (iconClass.includes('arrow')) return 'Arrow';
    
    return 'Icon';
  }

  // Export for module usage
  static getInstance() {
    if (!AccessibilityManager.instance) {
      AccessibilityManager.instance = new AccessibilityManager();
    }
    return AccessibilityManager.instance;
  }
}

// Initialize accessibility manager
document.addEventListener('DOMContentLoaded', () => {
  window.accessibilityManager = AccessibilityManager.getInstance();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AccessibilityManager;
}
