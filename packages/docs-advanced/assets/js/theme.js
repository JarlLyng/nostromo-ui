// Nostromo UI Advanced Documentation - Theme System

class ThemeManager {
  constructor() {
    this.themes = ['light', 'dark', 'auto'];
    this.currentTheme = 'auto';
    this.systemPreference = 'light';
    this.isChanging = false;
    this.storageKey = 'nostromo-theme';
    this.init();
  }

  init() {
    this.detectSystemPreference();
    this.loadTheme();
    this.setupThemeToggle();
    this.setupThemeDropdown();
    this.setupThemePersistence();
    this.setupThemeDebug();
    this.setupThemeAnimations();
    this.setupThemePerformance();
  }

  // System preference detection
  detectSystemPreference() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.systemPreference = mediaQuery.matches ? 'dark' : 'light';
      
      // Listen for system preference changes
      mediaQuery.addEventListener('change', (e) => {
        this.systemPreference = e.matches ? 'dark' : 'light';
        if (this.currentTheme === 'auto') {
          this.applyTheme('auto');
        }
      });
    }
  }

  // Theme loading
  loadTheme() {
    const savedTheme = localStorage.getItem(this.storageKey);
    if (savedTheme && this.themes.includes(savedTheme)) {
      this.currentTheme = savedTheme;
    } else {
      this.currentTheme = 'auto';
    }
    this.applyTheme(this.currentTheme);
  }

  // Theme application
  applyTheme(theme) {
    if (this.isChanging) return;
    
    this.isChanging = true;
    this.currentTheme = theme;
    
    // Add changing class for animation
    document.body.classList.add('theme-changing');
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update theme toggle
    this.updateThemeToggle();
    
    // Update theme dropdown
    this.updateThemeDropdown();
    
    // Save theme preference
    this.saveTheme(theme);
    
    // Announce theme change
    this.announceThemeChange(theme);
    
    // Remove changing class
    setTimeout(() => {
      document.body.classList.remove('theme-changing');
      this.isChanging = false;
    }, 300);
  }

  // Theme toggle setup
  setupThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }
  }

  toggleTheme() {
    const nextTheme = this.getNextTheme();
    this.applyTheme(nextTheme);
  }

  getNextTheme() {
    const currentIndex = this.themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % this.themes.length;
    return this.themes[nextIndex];
  }

  updateThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      const icon = toggle.querySelector('.theme-toggle-icon');
      if (icon) {
        icon.textContent = this.getThemeIcon();
      }
    }
  }

  getThemeIcon() {
    switch (this.currentTheme) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      case 'auto':
        return '🔄';
      default:
        return '🌙';
    }
  }

  // Theme dropdown setup
  setupThemeDropdown() {
    const dropdown = document.querySelector('.theme-dropdown');
    if (dropdown) {
      const trigger = dropdown.querySelector('.theme-dropdown-trigger');
      const menu = dropdown.querySelector('.theme-dropdown-menu');
      
      if (trigger && menu) {
        trigger.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleDropdown(menu);
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
          if (!dropdown.contains(e.target)) {
            this.closeDropdown(menu);
          }
        });
        
        // Handle dropdown item clicks
        const items = menu.querySelectorAll('.theme-dropdown-item');
        items.forEach(item => {
          item.addEventListener('click', () => {
            const theme = item.dataset.theme;
            if (theme) {
              this.applyTheme(theme);
              this.closeDropdown(menu);
            }
          });
        });
      }
    }
  }

  toggleDropdown(menu) {
    const isOpen = menu.classList.contains('open');
    if (isOpen) {
      this.closeDropdown(menu);
    } else {
      this.openDropdown(menu);
    }
  }

  openDropdown(menu) {
    menu.classList.add('open');
    menu.setAttribute('aria-expanded', 'true');
  }

  closeDropdown(menu) {
    menu.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  }

  updateThemeDropdown() {
    const dropdown = document.querySelector('.theme-dropdown');
    if (dropdown) {
      const trigger = dropdown.querySelector('.theme-dropdown-trigger');
      const items = dropdown.querySelectorAll('.theme-dropdown-item');
      
      if (trigger) {
        trigger.textContent = this.getThemeName();
      }
      
      items.forEach(item => {
        const theme = item.dataset.theme;
        if (theme === this.currentTheme) {
          item.classList.add('active');
          item.setAttribute('aria-selected', 'true');
        } else {
          item.classList.remove('active');
          item.setAttribute('aria-selected', 'false');
        }
      });
    }
  }

  getThemeName() {
    switch (this.currentTheme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'auto':
        return 'Auto';
      default:
        return 'Auto';
    }
  }

  // Theme persistence
  setupThemePersistence() {
    // Save theme on change
    this.saveTheme(this.currentTheme);
    
    // Listen for storage changes (sync across tabs)
    window.addEventListener('storage', (e) => {
      if (e.key === this.storageKey) {
        const newTheme = e.newValue;
        if (newTheme && this.themes.includes(newTheme)) {
          this.applyTheme(newTheme);
        }
      }
    });
  }

  saveTheme(theme) {
    try {
      localStorage.setItem(this.storageKey, theme);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  }

  // Theme debug
  setupThemeDebug() {
    // Create debug panel if in development
    if (this.isDevelopment()) {
      this.createDebugPanel();
    }
  }

  isDevelopment() {
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' ||
           window.location.hostname.includes('dev');
  }

  createDebugPanel() {
    const debugPanel = document.createElement('div');
    debugPanel.className = 'theme-debug';
    debugPanel.innerHTML = `
      <div class="theme-debug-item">
        <span class="theme-debug-label">Current Theme:</span>
        <span class="theme-debug-value" id="debug-current-theme">${this.currentTheme}</span>
      </div>
      <div class="theme-debug-item">
        <span class="theme-debug-label">System Preference:</span>
        <span class="theme-debug-value" id="debug-system-preference">${this.systemPreference}</span>
      </div>
      <div class="theme-debug-item">
        <span class="theme-debug-label">Effective Theme:</span>
        <span class="theme-debug-value" id="debug-effective-theme">${this.getEffectiveTheme()}</span>
      </div>
      <div class="theme-debug-item">
        <span class="theme-debug-label">Storage:</span>
        <span class="theme-debug-value" id="debug-storage">${localStorage.getItem(this.storageKey) || 'none'}</span>
      </div>
    `;
    
    document.body.appendChild(debugPanel);
    
    // Toggle debug panel with Ctrl+Shift+D
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        this.toggleDebugPanel();
      }
    });
  }

  toggleDebugPanel() {
    const debugPanel = document.querySelector('.theme-debug');
    if (debugPanel) {
      debugPanel.classList.toggle('show');
    }
  }

  updateDebugPanel() {
    const debugPanel = document.querySelector('.theme-debug');
    if (debugPanel) {
      const currentTheme = debugPanel.querySelector('#debug-current-theme');
      const systemPreference = debugPanel.querySelector('#debug-system-preference');
      const effectiveTheme = debugPanel.querySelector('#debug-effective-theme');
      const storage = debugPanel.querySelector('#debug-storage');
      
      if (currentTheme) currentTheme.textContent = this.currentTheme;
      if (systemPreference) systemPreference.textContent = this.systemPreference;
      if (effectiveTheme) effectiveTheme.textContent = this.getEffectiveTheme();
      if (storage) storage.textContent = localStorage.getItem(this.storageKey) || 'none';
    }
  }

  getEffectiveTheme() {
    if (this.currentTheme === 'auto') {
      return this.systemPreference;
    }
    return this.currentTheme;
  }

  // Theme animations
  setupThemeAnimations() {
    // Add theme change animation
    this.setupThemeChangeAnimation();
    
    // Add theme transition effects
    this.setupThemeTransitions();
  }

  setupThemeChangeAnimation() {
    // Add animation class during theme changes
    document.addEventListener('themechange', () => {
      document.body.classList.add('theme-changing');
      setTimeout(() => {
        document.body.classList.remove('theme-changing');
      }, 300);
    });
  }

  setupThemeTransitions() {
    // Smooth transitions for theme changes
    const style = document.createElement('style');
    style.textContent = `
      * {
        transition: background-color 0.3s ease, 
                   border-color 0.3s ease, 
                   color 0.3s ease, 
                   box-shadow 0.3s ease;
      }
    `;
    document.head.appendChild(style);
  }

  // Theme performance
  setupThemePerformance() {
    // Optimize theme changes for performance
    this.setupThemeOptimizations();
    
    // Monitor theme performance
    this.setupThemeMonitoring();
  }

  setupThemeOptimizations() {
    // Use requestAnimationFrame for smooth theme changes
    this.optimizedApplyTheme = (theme) => {
      requestAnimationFrame(() => {
        this.applyTheme(theme);
      });
    };
  }

  setupThemeMonitoring() {
    // Monitor theme change performance
    this.measureThemePerformance();
  }

  measureThemePerformance() {
    const startTime = performance.now();
    
    // Measure theme change time
    const measureTime = () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (duration > 100) {
        console.warn(`Theme change took ${duration.toFixed(2)}ms`);
      }
    };
    
    // Measure on next frame
    requestAnimationFrame(measureTime);
  }

  // Theme announcements
  announceThemeChange(theme) {
    const themeName = this.getThemeName();
    const message = `Theme changed to ${themeName}`;
    
    // Announce to screen readers
    this.announceToScreenReader(message);
    
    // Show theme status
    this.showThemeStatus(themeName);
    
    // Update debug panel
    this.updateDebugPanel();
    
    // Dispatch custom event
    this.dispatchThemeChangeEvent(theme);
  }

  announceToScreenReader(message) {
    const liveRegion = document.getElementById('live-status');
    if (liveRegion) {
      liveRegion.textContent = message;
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }

  showThemeStatus(themeName) {
    const status = document.querySelector('.theme-status');
    if (status) {
      status.textContent = `Theme: ${themeName}`;
      status.classList.add('show');
      setTimeout(() => {
        status.classList.remove('show');
      }, 2000);
    }
  }

  dispatchThemeChangeEvent(theme) {
    const event = new CustomEvent('themechange', {
      detail: {
        theme: theme,
        effectiveTheme: this.getEffectiveTheme(),
        systemPreference: this.systemPreference
      }
    });
    document.dispatchEvent(event);
  }

  // Utility methods
  getCurrentTheme() {
    return this.currentTheme;
  }

  getEffectiveTheme() {
    if (this.currentTheme === 'auto') {
      return this.systemPreference;
    }
    return this.currentTheme;
  }

  isDarkTheme() {
    return this.getEffectiveTheme() === 'dark';
  }

  isLightTheme() {
    return this.getEffectiveTheme() === 'light';
  }

  isAutoTheme() {
    return this.currentTheme === 'auto';
  }

  // Export for module usage
  static getInstance() {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }
}

// Initialize theme manager
document.addEventListener('DOMContentLoaded', () => {
  window.themeManager = ThemeManager.getInstance();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeManager;
}
