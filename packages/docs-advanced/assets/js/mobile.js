// Nostromo UI Advanced Documentation - Mobile Functionality

class MobileOptimizer {
  constructor() {
    this.isMobile = window.innerWidth <= 768;
    this.isTouch = 'ontouchstart' in window;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.swipeThreshold = 50;
    this.init();
  }

  init() {
    this.setupMobileNavigation();
    this.setupTouchGestures();
    this.setupViewportOptimizations();
    this.setupPerformanceOptimizations();
    this.setupAccessibility();
  }

  // Mobile navigation
  setupMobileNavigation() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.mobile-overlay');
    const mobileNav = document.querySelector('.mobile-nav');

    if (!mobileMenuToggle || !sidebar) return;

    // Create mobile overlay if it doesn't exist
    if (!overlay) {
      const overlayElement = document.createElement('div');
      overlayElement.className = 'mobile-overlay';
      document.body.appendChild(overlayElement);
    }

    // Create mobile nav if it doesn't exist
    if (!mobileNav) {
      this.createMobileNav();
    }

    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMobileMenu();
    });

    // Close mobile menu when clicking overlay
    document.addEventListener('click', (e) => {
      if (overlay && overlay.classList.contains('open')) {
        this.closeMobileMenu();
      }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        this.closeMobileMenu();
      }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }

  createMobileNav() {
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    
    // Get sidebar content
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      mobileNav.innerHTML = `
        <div class="mobile-nav-header">
          <div class="logo">Nostromo UI</div>
          <button class="mobile-nav-close" aria-label="Close menu">×</button>
        </div>
        <div class="mobile-nav-content">
          ${sidebar.innerHTML}
        </div>
      `;
      
      document.body.appendChild(mobileNav);
      
      // Add close button functionality
      const closeBtn = mobileNav.querySelector('.mobile-nav-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          this.closeMobileMenu();
        });
      }
    }
  }

  toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.mobile-overlay');
    const mobileNav = document.querySelector('.mobile-nav');

    if (sidebar && overlay && mobileNav) {
      const isOpen = sidebar.classList.contains('open');
      
      if (isOpen) {
        this.closeMobileMenu();
      } else {
        this.openMobileMenu();
      }
    }
  }

  openMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.mobile-overlay');
    const mobileNav = document.querySelector('.mobile-nav');

    if (sidebar && overlay && mobileNav) {
      sidebar.classList.add('open');
      overlay.classList.add('open');
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
      
      // Focus management
      const firstLink = mobileNav.querySelector('a');
      if (firstLink) {
        firstLink.focus();
      }
    }
  }

  closeMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.mobile-overlay');
    const mobileNav = document.querySelector('.mobile-nav');

    if (sidebar && overlay && mobileNav) {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
      
      // Return focus to menu toggle
      const menuToggle = document.querySelector('.mobile-menu-toggle');
      if (menuToggle) {
        menuToggle.focus();
      }
    }
  }

  // Touch gestures
  setupTouchGestures() {
    if (!this.isTouch) return;

    // Swipe to close mobile menu
    document.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].clientX;
      this.touchEndY = e.changedTouches[0].clientY;
      this.handleSwipe();
    });

    // Prevent default touch behaviors
    document.addEventListener('touchmove', (e) => {
      // Allow scrolling in content areas
      const target = e.target;
      if (target.closest('.content') || target.closest('.search-results')) {
        return;
      }
      
      // Prevent default for navigation areas
      if (target.closest('.sidebar') || target.closest('.mobile-nav')) {
        e.preventDefault();
      }
    });
  }

  handleSwipe() {
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Check if it's a horizontal swipe
    if (absDeltaX > absDeltaY && absDeltaX > this.swipeThreshold) {
      const sidebar = document.querySelector('.sidebar');
      const mobileNav = document.querySelector('.mobile-nav');
      
      if (sidebar && mobileNav && sidebar.classList.contains('open')) {
        // Swipe left to close
        if (deltaX < 0) {
          this.closeMobileMenu();
        }
      }
    }
  }

  // Viewport optimizations
  setupViewportOptimizations() {
    // Prevent zoom on input focus (iOS)
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        if (this.isMobile) {
          // Set viewport meta tag to prevent zoom
          const viewport = document.querySelector('meta[name="viewport"]');
          if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
          }
        }
      });

      input.addEventListener('blur', () => {
        if (this.isMobile) {
          // Restore normal viewport
          const viewport = document.querySelector('meta[name="viewport"]');
          if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
          }
        }
      });
    });

    // Handle orientation change
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.handleOrientationChange();
      }, 100);
    });
  }

  handleOrientationChange() {
    // Close mobile menu on orientation change
    this.closeMobileMenu();
    
    // Recalculate layout
    this.handleResize();
  }

  // Performance optimizations
  setupPerformanceOptimizations() {
    // Lazy load images on mobile
    if (this.isMobile) {
      this.setupLazyLoading();
    }

    // Optimize scroll performance
    this.setupScrollOptimizations();

    // Reduce animations on low-end devices
    this.setupAnimationOptimizations();
  }

  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  setupScrollOptimizations() {
    let scrollTimer;
    let isScrolling = false;

    window.addEventListener('scroll', () => {
      if (!isScrolling) {
        isScrolling = true;
        document.body.classList.add('scrolling');
      }

      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        isScrolling = false;
        document.body.classList.remove('scrolling');
      }, 150);
    });
  }

  setupAnimationOptimizations() {
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      document.documentElement.style.setProperty('--animation-duration', '0.1s');
    }

    // Disable animations if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.setProperty('--animation-duration', '0s');
    }
  }

  // Accessibility
  setupAccessibility() {
    // Improve focus management on mobile
    this.setupFocusManagement();

    // Add touch feedback
    this.setupTouchFeedback();

    // Improve screen reader support
    this.setupScreenReaderSupport();
  }

  setupFocusManagement() {
    // Trap focus in mobile menu
    document.addEventListener('keydown', (e) => {
      const mobileNav = document.querySelector('.mobile-nav');
      if (!mobileNav || !mobileNav.classList.contains('open')) return;

      if (e.key === 'Tab') {
        const focusableElements = mobileNav.querySelectorAll(
          'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
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
      }
    });
  }

  setupTouchFeedback() {
    // Add touch feedback to interactive elements
    const touchElements = document.querySelectorAll('button, a, .btn, .nav-link, .sidebar-link');
    
    touchElements.forEach(element => {
      element.addEventListener('touchstart', () => {
        element.classList.add('touch-active');
      });

      element.addEventListener('touchend', () => {
        setTimeout(() => {
          element.classList.remove('touch-active');
        }, 150);
      });
    });
  }

  setupScreenReaderSupport() {
    // Add ARIA labels for mobile menu
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
      mobileMenuToggle.setAttribute('aria-label', 'Open navigation menu');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }

    // Update ARIA attributes when menu opens/closes
    this.updateAriaAttributes();
  }

  updateAriaAttributes() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuToggle && sidebar) {
      const isOpen = sidebar.classList.contains('open');
      mobileMenuToggle.setAttribute('aria-expanded', isOpen.toString());
    }
  }

  // Window resize handling
  handleResize() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 768;

    if (wasMobile !== this.isMobile) {
      // Device type changed
      if (!this.isMobile) {
        // Switched to desktop
        this.closeMobileMenu();
        document.body.style.overflow = '';
      }
    }
  }

  // Utility methods
  isTouchDevice() {
    return this.isTouch;
  }

  isMobileDevice() {
    return this.isMobile;
  }

  getDeviceInfo() {
    return {
      isMobile: this.isMobile,
      isTouch: this.isTouch,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
    };
  }

  // Export for module usage
  static getInstance() {
    if (!MobileOptimizer.instance) {
      MobileOptimizer.instance = new MobileOptimizer();
    }
    return MobileOptimizer.instance;
  }
}

// Initialize mobile optimizer
document.addEventListener('DOMContentLoaded', () => {
  window.mobileOptimizer = MobileOptimizer.getInstance();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MobileOptimizer;
}
