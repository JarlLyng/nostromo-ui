// Nostromo UI Advanced Documentation - Live Components Integration

class LiveComponentRenderer {
  constructor() {
    this.components = new Map();
    this.cache = new Map();
    this.observer = null;
    this.performanceMetrics = {
      renderTime: 0,
      componentCount: 0,
      cacheHits: 0,
      cacheMisses: 0
    };
    this.init().catch(error => {
      console.error('Failed to initialize LiveComponentRenderer:', error);
    });
  }

  async init() {
    await this.loadReact();
    this.setupComponentContainers();
  }

  async loadReact() {
    // Load React and ReactDOM from CDN
    if (!window.React) {
      await this.loadScript('https://unpkg.com/react@18/umd/react.development.js');
    }
    if (!window.ReactDOM) {
      await this.loadScript('https://unpkg.com/react-dom@18/umd/react-dom.development.js');
    }
    
    // Load Babel for JSX transformation
    if (!window.Babel) {
      await this.loadScript('https://unpkg.com/@babel/standalone/babel.min.js');
      // Wait for Babel to initialize
      await this.waitForBabel();
    }
    
    // Load our UI components
    await this.loadUIComponents();
  }

  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  waitForBabel() {
    return new Promise((resolve, reject) => {
      let attempts = 0;
      const maxAttempts = 50; // 5 seconds max
      
      const checkBabel = () => {
        attempts++;
        if (window.Babel && window.Babel.transform) {
          resolve();
        } else if (attempts >= maxAttempts) {
          reject(new Error('Babel failed to load after 5 seconds'));
        } else {
          setTimeout(checkBabel, 100);
        }
      };
      
      checkBabel();
    });
  }

  async loadUIComponents() {
    // Create mock UI components for demonstration
    // In a real implementation, these would be loaded from the built UI library
    window.NostromoComponents = {
      Button: this.createMockButtonComponent(),
      Input: this.createMockInputComponent(),
      Badge: this.createMockBadgeComponent(),
      Card: this.createMockCardComponent(),
      Avatar: this.createMockAvatarComponent(),
      Dialog: this.createMockDialogComponent(),
      Tabs: this.createMockTabsComponent(),
      Select: this.createMockSelectComponent(),
      Progress: this.createMockProgressComponent(),
      Icon: this.createMockIconComponent()
    };
  }

  createMockButtonComponent() {
    return function Button({ 
      children, 
      variant = 'primary',
      size = 'md',
      disabled = false,
      className = '',
      ...props 
    }) {
      const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
      
      const variantClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
        outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
        ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
      };
      
      const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base'
      };
      
      const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
      
      const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;
      
      return window.React.createElement('button', {
        className: classes,
        disabled: disabled,
        ...props
      }, children);
    };
  }

  createMockInputComponent() {
    return function Input({ 
      type = 'text',
      placeholder = '',
      value,
      defaultValue,
      disabled = false,
      className = '',
      onChange,
      ...props 
    }) {
      const baseClasses = 'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500';
      const disabledClasses = disabled ? 'bg-gray-50 cursor-not-allowed' : '';
      
      const classes = `${baseClasses} ${disabledClasses} ${className}`;
      
      // Use defaultValue if no value or onChange is provided (uncontrolled)
      const inputProps = {
        type: type,
        placeholder: placeholder,
        disabled: disabled,
        className: classes,
        ...props
      };
      
      if (value !== undefined && onChange) {
        // Controlled input
        inputProps.value = value;
        inputProps.onChange = onChange;
      } else if (defaultValue !== undefined) {
        // Uncontrolled input with defaultValue
        inputProps.defaultValue = defaultValue;
      } else if (value !== undefined) {
        // Read-only input
        inputProps.value = value;
        inputProps.readOnly = true;
      }
      
      return window.React.createElement('input', inputProps);
    };
  }

  createMockBadgeComponent() {
    return function Badge({ 
      children, 
      variant = 'default',
      size = 'md',
      className = '',
      ...props 
    }) {
      const baseClasses = 'inline-flex items-center font-medium rounded-full';
      
      const variantClasses = {
        default: 'bg-gray-100 text-gray-800',
        primary: 'bg-blue-100 text-blue-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        error: 'bg-red-100 text-red-800'
      };
      
      const sizeClasses = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-sm',
        lg: 'px-3 py-1 text-sm'
      };
      
      const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
      
      return window.React.createElement('span', {
        className: classes,
        ...props
      }, children);
    };
  }

  createMockCardComponent() {
    return function Card({ 
      children, 
      variant = 'default',
      className = '',
      ...props 
    }) {
      const baseClasses = 'bg-white rounded-lg shadow';
      
      const variantClasses = {
        default: 'border border-gray-200',
        elevated: 'shadow-lg',
        outlined: 'border-2 border-gray-300'
      };
      
      const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
      
      return window.React.createElement('div', {
        className: classes,
        ...props
      }, children);
    };
  }

  createMockAvatarComponent() {
    return function Avatar({ 
      src,
      alt = '',
      size = 'md',
      className = '',
      ...props 
    }) {
      const baseClasses = 'inline-block rounded-full bg-gray-200';
      
      const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
      };
      
      const classes = `${baseClasses} ${sizeClasses[size]} ${className}`;
      
      return window.React.createElement('img', {
        src: src || 'https://via.placeholder.com/40',
        alt: alt,
        className: classes,
        ...props
      });
    };
  }

  createMockDialogComponent() {
    return function Dialog({ 
      children, 
      open = false,
      onClose,
      className = '',
      ...props 
    }) {
      if (!open) return null;
      
      return window.React.createElement('div', {
        className: 'fixed inset-0 z-50 overflow-y-auto',
        ...props
      }, 
        window.React.createElement('div', {
          className: 'flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'
        },
          window.React.createElement('div', {
            className: 'fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75',
            onClick: onClose
          }),
          window.React.createElement('div', {
            className: 'inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg'
          }, children)
        )
      );
    };
  }

  createMockTabsComponent() {
    return function Tabs({ 
      children, 
      defaultTab = 0,
      className = '',
      ...props 
    }) {
      const [activeTab, setActiveTab] = window.React.useState(defaultTab);
      
      return window.React.createElement('div', {
        className: className,
        ...props
      }, window.React.Children.map(children, (child, index) => 
        window.React.cloneElement(child, { 
          active: index === activeTab,
          onClick: () => setActiveTab(index)
        })
      ));
    };
  }

  createMockSelectComponent() {
    return function Select({ 
      options = [],
      value = '',
      onChange,
      placeholder = 'Select an option',
      className = '',
      ...props 
    }) {
      const [isOpen, setIsOpen] = window.React.useState(false);
      
      return window.React.createElement('div', {
        className: `relative ${className}`,
        ...props
      },
        window.React.createElement('button', {
          className: 'w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
          onClick: () => setIsOpen(!isOpen)
        }, value || placeholder),
        isOpen && window.React.createElement('div', {
          className: 'absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg'
        }, options.map((option, index) => 
          window.React.createElement('button', {
            key: index,
            className: 'w-full px-3 py-2 text-left hover:bg-gray-100',
            onClick: () => {
              onChange(option.value);
              setIsOpen(false);
            }
          }, option.label)
        ))
      );
    };
  }

  createMockProgressComponent() {
    return function Progress({ 
      value = 0,
      max = 100,
      size = 'md',
      variant = 'default',
      className = '',
      ...props 
    }) {
      const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
      
      const baseClasses = 'w-full bg-gray-200 rounded-full';
      
      const sizeClasses = {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3'
      };
      
      const variantClasses = {
        default: 'bg-blue-600',
        success: 'bg-green-600',
        warning: 'bg-yellow-600',
        error: 'bg-red-600'
      };
      
      const classes = `${baseClasses} ${sizeClasses[size]} ${className}`;
      const fillClasses = `${variantClasses[variant]} h-full rounded-full transition-all duration-300`;
      
      return window.React.createElement('div', {
        className: classes,
        ...props
      }, window.React.createElement('div', {
        className: fillClasses,
        style: { width: `${percentage}%` }
      }));
    };
  }

  createMockIconComponent() {
    return function Icon({ 
      name = 'heart',
      size = 'md',
      className = '',
      ...props 
    }) {
      const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8'
      };
      
      const classes = `${sizeClasses[size]} ${className}`;
      
      return window.React.createElement('svg', {
        className: classes,
        fill: 'currentColor',
        viewBox: '0 0 24 24',
        ...props
      }, window.React.createElement('path', {
        d: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
      }));
    };
  }

  setupComponentContainers() {
    // Find all live component containers
    const containers = document.querySelectorAll('.live-component');
    containers.forEach(container => {
      this.renderComponent(container);
      this.setupVariantButtons(container);
    });
  }

  setupVariantButtons(container) {
    const variantButtons = container.querySelectorAll('.variant-btn');
    variantButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons in this container
        container.querySelectorAll('.variant-btn').forEach(btn => {
          btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Update component with new variant
        const componentName = container.getAttribute('data-component');
        const variant = button.getAttribute('data-variant');
        const state = button.getAttribute('data-state');
        
        if (variant) {
          this.updateComponentVariant(componentName, variant);
        } else if (state) {
          this.updateComponentState(componentName, state);
        }
      });
    });
    
    // Set first button as active by default
    if (variantButtons.length > 0) {
      variantButtons[0].classList.add('active');
    }
  }

  updateComponentVariant(componentName, variant) {
    const container = document.querySelector(`[data-component="${componentName}"]`);
    if (!container) return;

    const currentProps = this.parseProps(container.getAttribute('data-props') || '{}');
    const newProps = { ...currentProps, variant };
    
    container.setAttribute('data-props', JSON.stringify(newProps));
    this.renderComponent(container);
  }

  updateComponentState(componentName, state) {
    const container = document.querySelector(`[data-component="${componentName}"]`);
    if (!container) return;

    const currentProps = this.parseProps(container.getAttribute('data-props') || '{}');
    let newProps = { ...currentProps };
    
    switch (state) {
      case 'error':
        newProps.error = true;
        newProps.disabled = false;
        break;
      case 'disabled':
        newProps.disabled = true;
        newProps.error = false;
        break;
      case 'normal':
      default:
        newProps.error = false;
        newProps.disabled = false;
        break;
    }
    
    container.setAttribute('data-props', JSON.stringify(newProps));
    this.renderComponent(container);
  }

  renderComponent(container) {
    const componentName = container.getAttribute('data-component');
    const props = this.parseProps(container.getAttribute('data-props') || '{}');
    const code = container.querySelector('.component-code')?.textContent || '';

    if (!componentName || !code) return;

    try {
      // Create React component from code
      const Component = this.createComponentFromCode(code, componentName);
      
      // Render component
      const root = ReactDOM.createRoot(container.querySelector('.component-preview'));
      root.render(React.createElement(Component, props));

      // Store component for later use
      this.components.set(componentName, { Component, props, code });
    } catch (error) {
      console.error(`Error rendering component ${componentName}:`, error);
      this.showError(container, error.message);
    }
  }

  createComponentFromCode(code, componentName) {
    // Check if Babel is available
    if (!window.Babel || !window.Babel.transform) {
      throw new Error('Babel is not loaded. Please refresh the page.');
    }
    
    // Check if components are available
    if (!window.NostromoComponents) {
      throw new Error('UI components are not loaded. Please refresh the page.');
    }
    
    // Transform JSX to JavaScript
    const transformedCode = Babel.transform(code, {
      presets: ['react']
    }).code;

    // Create a function that returns the component
    const componentFunction = new Function(
      'React',
      'ReactDOM',
      'Button',
      'Input',
      'Badge',
      'Card',
      'Avatar',
      'Dialog',
      'Tabs',
      'Select',
      'Progress',
      'Icon',
      `
      ${transformedCode}
      return ${componentName};
      `
    );

    return componentFunction(
      window.React,
      window.ReactDOM,
      window.NostromoComponents.Button,
      window.NostromoComponents.Input,
      window.NostromoComponents.Badge,
      window.NostromoComponents.Card,
      window.NostromoComponents.Avatar,
      window.NostromoComponents.Dialog,
      window.NostromoComponents.Tabs,
      window.NostromoComponents.Select,
      window.NostromoComponents.Progress,
      window.NostromoComponents.Icon
    );
  }

  parseProps(propsString) {
    try {
      return JSON.parse(propsString);
    } catch (error) {
      console.warn('Invalid props JSON:', propsString);
      return {};
    }
  }

  showError(container, message) {
    const preview = container.querySelector('.component-preview');
    if (preview) {
      preview.innerHTML = `
        <div class="component-error">
          <h4>Component Error</h4>
          <p>${message}</p>
        </div>
      `;
    }
  }

  // Method to update component props dynamically
  updateComponent(componentName, newProps) {
    const componentData = this.components.get(componentName);
    if (!componentData) return;

    const container = document.querySelector(`[data-component="${componentName}"]`);
    if (!container) return;

    try {
      const root = ReactDOM.createRoot(container.querySelector('.component-preview'));
      root.render(React.createElement(componentData.Component, newProps));
      
      // Update stored props
      componentData.props = newProps;
    } catch (error) {
      console.error(`Error updating component ${componentName}:`, error);
      this.showError(container, error.message);
    }
  }

  // Method to get component code
  getComponentCode(componentName) {
    const componentData = this.components.get(componentName);
    return componentData ? componentData.code : null;
  }
  
  setupIntersectionObserver() {
    if (!window.IntersectionObserver) {
      console.warn('IntersectionObserver not supported, skipping lazy loading');
      return;
    }
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const container = entry.target;
          const componentName = container.getAttribute('data-component');
          const propsString = container.getAttribute('data-props');
          
          if (componentName && propsString) {
            try {
              const props = JSON.parse(propsString);
              this.renderComponent(container, componentName, props);
            } catch (error) {
              console.error(`Error parsing props for ${componentName}:`, error);
            }
          }
          
          this.observer.unobserve(container);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });
  }
  
  renderLiveComponents() {
    const startTime = performance.now();
    console.log('🎯 renderLiveComponents called');
    
    // Find all live component containers on the page
    const liveComponents = document.querySelectorAll('.live-component');
    console.log(`🔍 Found ${liveComponents.length} live components`);
    
    // Setup intersection observer for lazy loading
    if (!this.observer) {
      this.setupIntersectionObserver();
    }
    
    // Debug: Log all found elements
    liveComponents.forEach((el, index) => {
      console.log(`📦 Component ${index + 1}:`, el);
      console.log(`📦 Data component:`, el.getAttribute('data-component'));
      console.log(`📦 Data props:`, el.getAttribute('data-props'));
    });
    
    liveComponents.forEach((container, index) => {
      const componentName = container.getAttribute('data-component');
      const propsString = container.getAttribute('data-props');
      
      console.log(`📦 Component ${index + 1}: ${componentName}`, propsString);
      
      if (componentName) {
        try {
          let props = {};
          if (propsString) {
            props = JSON.parse(propsString);
          }
          
          // Check cache first
          const cacheKey = `${componentName}-${JSON.stringify(props)}`;
          if (this.cache.has(cacheKey)) {
            this.performanceMetrics.cacheHits++;
            container.innerHTML = this.cache.get(cacheKey);
            return;
          }
          
          this.performanceMetrics.cacheMisses++;
          
          // Cache the rendered component after rendering
          const originalInnerHTML = container.innerHTML;
          
          // Store in cache after rendering
          this.cache.set(cacheKey, container.innerHTML);
          
                 // Handle different component types
                 if (componentName === 'Input') {
                   // Create Input component
                   const inputComponent = document.createElement('input');
                   inputComponent.type = props.type || 'text';
                   inputComponent.placeholder = props.placeholder || 'Enter text...';
                   inputComponent.value = props.value || '';
                   inputComponent.disabled = props.disabled || false;
                   
                   // Get variant from props
                   const variant = props.variant || 'default';
                   const size = props.size || 'md';
                   const error = props.error || false;
                   
                   // Base styles
                   let baseStyles = `
                     display: block;
                     width: 100%;
                     border-radius: 6px;
                     font-family: system-ui, sans-serif;
                     transition: all 0.2s ease;
                     outline: none;
                     margin: 8px 0;
                   `;
                   
                   // Size variants
                   if (size === 'sm') {
                     baseStyles += `font-size: 12px; height: 32px; padding: 6px 12px;`;
                   } else if (size === 'lg') {
                     baseStyles += `font-size: 16px; height: 48px; padding: 12px 16px;`;
                   } else {
                     baseStyles += `font-size: 14px; height: 40px; padding: 8px 12px;`;
                   }
                   
                   // Variant styles
                   if (error) {
                     baseStyles += `
                       border: 2px solid var(--color-error, #ef4444);
                       background: var(--bg-error-light, #fef2f2);
                       color: var(--text-error, #dc2626);
                     `;
                   } else if (variant === 'success') {
                     baseStyles += `
                       border: 2px solid var(--color-success, #10b981);
                       background: var(--bg-success-light, #f0fdf4);
                       color: var(--text-success, #059669);
                     `;
                   } else {
                     baseStyles += `
                       border: 2px solid var(--border-light, #e5e7eb);
                       background: var(--bg-primary, #ffffff);
                       color: var(--text-primary, #1f2937);
                     `;
                   }
                   
                   // Disabled state
                   if (props.disabled) {
                     baseStyles += `
                       opacity: 0.5;
                       cursor: not-allowed;
                       background: var(--bg-disabled, #f9fafb);
                     `;
                   }
                   
                   inputComponent.style.cssText = baseStyles;
                   
                   // Add focus effects (only if not disabled)
                   if (!props.disabled) {
                     inputComponent.addEventListener('focus', () => {
                       if (error) {
                         inputComponent.style.borderColor = 'var(--color-error-dark, #dc2626)';
                         inputComponent.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
                       } else if (variant === 'success') {
                         inputComponent.style.borderColor = 'var(--color-success-dark, #059669)';
                         inputComponent.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
                       } else {
                         inputComponent.style.borderColor = 'var(--color-primary, #667eea)';
                         inputComponent.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                       }
                     });
                     
                     inputComponent.addEventListener('blur', () => {
                       if (error) {
                         inputComponent.style.borderColor = 'var(--color-error, #ef4444)';
                       } else if (variant === 'success') {
                         inputComponent.style.borderColor = 'var(--color-success, #10b981)';
                       } else {
                         inputComponent.style.borderColor = 'var(--border-light, #e5e7eb)';
                       }
                       inputComponent.style.boxShadow = 'none';
                     });
                   }
                   
                   // Clear container and add component
                   container.innerHTML = '';
                   container.appendChild(inputComponent);
                   
                   console.log(`✅ Rendered ${componentName} with type: ${props.type || 'text'}`);
                   return;
                 }
                 
                 // Handle Card component
                 if (componentName === 'Card') {
                   // Create Card component
                   const cardComponent = document.createElement('div');
                   
                   // Get variant from props
                   const variant = props.variant || 'default';
                   const size = props.size || 'md';
                   const title = props.title || 'Card Title';
                   const content = props.content || 'This is a card with some content.';
                   const hasImage = props.hasImage || false;
                   const hasActions = props.hasActions || false;
                   
                   // Base styles
                   let baseStyles = `
                     display: block;
                     border-radius: 8px;
                     font-family: system-ui, sans-serif;
                     transition: all 0.2s ease;
                     overflow: hidden;
                     margin: 8px 0;
                   `;
                   
                   // Size variants
                   if (size === 'sm') {
                     baseStyles += `max-width: 300px;`;
                   } else if (size === 'lg') {
                     baseStyles += `max-width: 500px;`;
                   } else {
                     baseStyles += `max-width: 400px;`;
                   }
                   
                   // Variant styles
                   if (variant === 'elevated') {
                     baseStyles += `
                       background: var(--bg-primary, #ffffff);
                       border: none;
                       box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                     `;
                   } else if (variant === 'outlined') {
                     baseStyles += `
                       background: var(--bg-primary, #ffffff);
                       border: 2px solid var(--border-light, #e5e7eb);
                       box-shadow: none;
                     `;
                   } else {
                     baseStyles += `
                       background: var(--bg-primary, #ffffff);
                       border: 1px solid var(--border-light, #e5e7eb);
                       box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
                     `;
                   }
                   
                   cardComponent.style.cssText = baseStyles;
                   
                   // Create card content
                   let cardHTML = '';
                   
                   // Card image
                   if (hasImage) {
                     cardHTML += `
                       <div style="width: 100%; height: 200px; background: linear-gradient(135deg, var(--color-primary, #667eea), var(--color-secondary, #764ba2)); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">
                         Card Image
                       </div>
                     `;
                   }
                   
                   // Card content
                   cardHTML += `
                     <div style="padding: 16px;">
                       <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: var(--text-primary, #1f2937);">${title}</h3>
                       <p style="margin: 0 0 16px 0; color: var(--text-secondary, #6b7280); line-height: 1.5;">${content}</p>
                   `;
                   
                   // Card actions
                   if (hasActions) {
                     cardHTML += `
                       <div style="display: flex; gap: 8px; justify-content: flex-end;">
                         <button style="padding: 6px 12px; border: 1px solid var(--border-light, #e5e7eb); background: transparent; color: var(--text-primary, #1f2937); border-radius: 4px; cursor: pointer; font-size: 14px;">Cancel</button>
                         <button style="padding: 6px 12px; border: none; background: var(--color-primary, #667eea); color: white; border-radius: 4px; cursor: pointer; font-size: 14px;">Action</button>
                       </div>
                     `;
                   }
                   
                   cardHTML += `</div>`;
                   
                   cardComponent.innerHTML = cardHTML;
                   
                   // Clear container and add component
                   container.innerHTML = '';
                   container.appendChild(cardComponent);
                   
                   console.log(`✅ Rendered ${componentName} with variant: ${variant}`);
                   return;
                 }
                 
                 // Handle Dialog component
                 if (componentName === 'Dialog') {
                   // Create Dialog component
                   const dialogComponent = document.createElement('div');
                   
                   // Get variant from props
                   const variant = props.variant || 'default';
                   const size = props.size || 'md';
                   const title = props.title || 'Dialog Title';
                   const content = props.content || 'This is a dialog with some content.';
                   const hasTrigger = props.hasTrigger || true;
                   const isOpen = props.isOpen || false;
                   
                   // Base styles
                   let baseStyles = `
                     display: block;
                     font-family: system-ui, sans-serif;
                     margin: 8px 0;
                   `;
                   
                   // Size variants
                   if (size === 'sm') {
                     baseStyles += `max-width: 400px;`;
                   } else if (size === 'lg') {
                     baseStyles += `max-width: 600px;`;
                   } else {
                     baseStyles += `max-width: 500px;`;
                   }
                   
                   dialogComponent.style.cssText = baseStyles;
                   
                   // Create dialog content
                   let dialogHTML = '';
                   
                   // Dialog trigger button
                   if (hasTrigger) {
                     dialogHTML += `
                       <button style="
                         padding: 8px 16px;
                         background: var(--color-primary, #667eea);
                         color: white;
                         border: none;
                         border-radius: 6px;
                         cursor: pointer;
                         font-size: 14px;
                         font-weight: 500;
                         margin-bottom: 16px;
                         transition: all 0.2s ease;
                       " onmouseover="this.style.background='var(--color-primary-dark, #5a6fd8)'" onmouseout="this.style.background='var(--color-primary, #667eea)'">
                         Open Dialog
                       </button>
                     `;
                   }
                   
                   // Dialog modal
                   dialogHTML += `
                     <div style="
                       background: var(--bg-primary, #ffffff);
                       border-radius: 8px;
                       box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                       border: 1px solid var(--border-light, #e5e7eb);
                       overflow: hidden;
                     ">
                       <!-- Dialog Header -->
                       <div style="
                         padding: 16px 20px;
                         border-bottom: 1px solid var(--border-light, #e5e7eb);
                         display: flex;
                         justify-content: space-between;
                         align-items: center;
                       ">
                         <h3 style="margin: 0; font-size: 18px; font-weight: 600; color: var(--text-primary, #1f2937);">${title}</h3>
                         <button style="
                           background: none;
                           border: none;
                           color: var(--text-secondary, #6b7280);
                           cursor: pointer;
                           font-size: 20px;
                           padding: 4px;
                           border-radius: 4px;
                           transition: all 0.2s ease;
                         " onmouseover="this.style.background='var(--bg-secondary, #f8fafc)'" onmouseout="this.style.background='none'">
                           ×
                         </button>
                       </div>
                       
                       <!-- Dialog Content -->
                       <div style="padding: 20px;">
                         <p style="margin: 0 0 16px 0; color: var(--text-secondary, #6b7280); line-height: 1.5;">${content}</p>
                         
                         <!-- Dialog Actions -->
                         <div style="display: flex; gap: 8px; justify-content: flex-end;">
                           <button style="
                             padding: 8px 16px;
                             border: 1px solid var(--border-light, #e5e7eb);
                             background: transparent;
                             color: var(--text-primary, #1f2937);
                             border-radius: 6px;
                             cursor: pointer;
                             font-size: 14px;
                             transition: all 0.2s ease;
                           " onmouseover="this.style.background='var(--bg-secondary, #f8fafc)'" onmouseout="this.style.background='transparent'">
                             Cancel
                           </button>
                           <button style="
                             padding: 8px 16px;
                             border: none;
                             background: var(--color-primary, #667eea);
                             color: white;
                             border-radius: 6px;
                             cursor: pointer;
                             font-size: 14px;
                             transition: all 0.2s ease;
                           " onmouseover="this.style.background='var(--color-primary-dark, #5a6fd8)'" onmouseout="this.style.background='var(--color-primary, #667eea)'">
                             Confirm
                           </button>
                         </div>
                       </div>
                     </div>
                   `;
                   
                   dialogComponent.innerHTML = dialogHTML;
                   
                   // Clear container and add component
                   container.innerHTML = '';
                   container.appendChild(dialogComponent);
                   
                   console.log(`✅ Rendered ${componentName} with variant: ${variant}`);
                   return;
                 }
                 
                 // Handle Badge component
                 if (componentName === 'Badge') {
                   // Create Badge component
                   const badgeComponent = document.createElement('div');
                   
                   // Get variant from props
                   const variant = props.variant || 'default';
                   const size = props.size || 'md';
                   const children = props.children || 'Badge';
                   const color = props.color || 'blue';
                   
                   // Base styles
                   let baseStyles = `
                     display: inline-flex;
                     align-items: center;
                     font-family: system-ui, sans-serif;
                     font-weight: 500;
                     border-radius: 6px;
                     margin: 4px;
                     transition: all 0.2s ease;
                   `;
                   
                   // Size variants
                   if (size === 'sm') {
                     baseStyles += `padding: 2px 8px; font-size: 12px;`;
                   } else if (size === 'lg') {
                     baseStyles += `padding: 6px 12px; font-size: 14px;`;
                   } else {
                     baseStyles += `padding: 4px 10px; font-size: 13px;`;
                   }
                   
                   // Color variants
                   if (color === 'blue') {
                     baseStyles += `background: var(--color-primary, #667eea); color: white;`;
                   } else if (color === 'green') {
                     baseStyles += `background: var(--color-success, #10b981); color: white;`;
                   } else if (color === 'red') {
                     baseStyles += `background: var(--color-error, #ef4444); color: white;`;
                   } else if (color === 'yellow') {
                     baseStyles += `background: var(--color-warning, #f59e0b); color: white;`;
                   } else if (color === 'gray') {
                     baseStyles += `background: var(--color-neutral, #6b7280); color: white;`;
                   } else {
                     baseStyles += `background: var(--color-primary, #667eea); color: white;`;
                   }
                   
                   badgeComponent.style.cssText = baseStyles;
                   badgeComponent.textContent = children;
                   
                   // Clear container and add component
                   container.innerHTML = '';
                   container.appendChild(badgeComponent);
                   
                   console.log(`✅ Rendered ${componentName} with variant: ${variant}`);
                   return;
                 }
                 
                 // Handle Avatar component
                 if (componentName === 'Avatar') {
                   // Create Avatar component
                   const avatarComponent = document.createElement('div');
                   
                   // Get variant from props
                   const variant = props.variant || 'default';
                   const size = props.size || 'md';
                   const src = props.src || '';
                   const alt = props.alt || 'Avatar';
                   const fallback = props.fallback || 'U';
                   
                   // Base styles
                   let baseStyles = `
                     display: inline-flex;
                     align-items: center;
                     justify-content: center;
                     font-family: system-ui, sans-serif;
                     font-weight: 600;
                     border-radius: 50%;
                     background: var(--color-primary, #667eea);
                     color: white;
                     margin: 4px;
                     transition: all 0.2s ease;
                   `;
                   
                   // Size variants
                   if (size === 'sm') {
                     baseStyles += `width: 32px; height: 32px; font-size: 12px;`;
                   } else if (size === 'lg') {
                     baseStyles += `width: 64px; height: 64px; font-size: 24px;`;
                   } else if (size === 'xl') {
                     baseStyles += `width: 80px; height: 80px; font-size: 32px;`;
                   } else {
                     baseStyles += `width: 40px; height: 40px; font-size: 16px;`;
                   }
                   
                   // Variant styles
                   if (variant === 'square') {
                     baseStyles = baseStyles.replace('border-radius: 50%;', 'border-radius: 8px;');
                   } else if (variant === 'rounded') {
                     baseStyles = baseStyles.replace('border-radius: 50%;', 'border-radius: 12px;');
                   }
                   
                   avatarComponent.style.cssText = baseStyles;
                   
                   // Create avatar content
                   if (src) {
                     avatarComponent.innerHTML = `
                       <img src="${src}" alt="${alt}" style="
                         width: 100%;
                         height: 100%;
                         border-radius: inherit;
                         object-fit: cover;
                       " onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                       <div style="
                         display: none;
                         width: 100%;
                         height: 100%;
                         align-items: center;
                         justify-content: center;
                         background: var(--color-primary, #667eea);
                         color: white;
                         border-radius: inherit;
                         font-weight: 600;
                       ">${fallback}</div>
                     `;
                   } else {
                     avatarComponent.textContent = fallback;
                   }
                   
                   // Clear container and add component
                   container.innerHTML = '';
                   container.appendChild(avatarComponent);
                   
                   console.log(`✅ Rendered ${componentName} with variant: ${variant}`);
                   return;
                 }
                 
                 // Handle Tabs component
                 if (componentName === 'Tabs') {
                   // Create Tabs component
                   const tabsComponent = document.createElement('div');
                   
                   // Get variant from props
                   const variant = props.variant || 'default';
                   const size = props.size || 'md';
                   const tabs = props.tabs || [
                     { id: 'tab1', label: 'Tab 1', content: 'Content for Tab 1' },
                     { id: 'tab2', label: 'Tab 2', content: 'Content for Tab 2' },
                     { id: 'tab3', label: 'Tab 3', content: 'Content for Tab 3' }
                   ];
                   const activeTab = props.activeTab || 'tab1';
                   
                   // Base styles
                   let baseStyles = `
                     display: block;
                     font-family: system-ui, sans-serif;
                     margin: 8px 0;
                     border: 1px solid var(--border-light, #e5e7eb);
                     border-radius: 8px;
                     overflow: hidden;
                   `;
                   
                   // Size variants
                   if (size === 'sm') {
                     baseStyles += `font-size: 14px;`;
                   } else if (size === 'lg') {
                     baseStyles += `font-size: 16px;`;
                   } else {
                     baseStyles += `font-size: 15px;`;
                   }
                   
                   tabsComponent.style.cssText = baseStyles;
                   
                   // Create tabs content
                   let tabsHTML = `
                     <div style="
                       display: flex;
                       background: var(--bg-secondary, #f8fafc);
                       border-bottom: 1px solid var(--border-light, #e5e7eb);
                     ">
                   `;
                   
                   // Add tab headers
                   tabs.forEach((tab, index) => {
                     const isActive = tab.id === activeTab;
                     tabsHTML += `
                       <button style="
                         flex: 1;
                         padding: 12px 16px;
                         border: none;
                         background: ${isActive ? 'var(--bg-primary, #ffffff)' : 'transparent'};
                         color: ${isActive ? 'var(--color-primary, #667eea)' : 'var(--text-secondary, #6b7280)'};
                         font-weight: ${isActive ? '600' : '500'};
                         cursor: pointer;
                         transition: all 0.2s ease;
                         border-bottom: 2px solid ${isActive ? 'var(--color-primary, #667eea)' : 'transparent'};
                       " onmouseover="if (!this.classList.contains('active')) { this.style.background='var(--bg-hover, #f1f5f9)'; }" onmouseout="if (!this.classList.contains('active')) { this.style.background='transparent'; }">
                         ${tab.label}
                       </button>
                     `;
                   });
                   
                   tabsHTML += `</div>`;
                   
                   // Add tab content
                   tabsHTML += `
                     <div style="padding: 20px;">
                       <p style="margin: 0; color: var(--text-primary, #1f2937); line-height: 1.5;">
                         ${tabs.find(tab => tab.id === activeTab)?.content || 'No content available'}
                       </p>
                     </div>
                   `;
                   
                   tabsComponent.innerHTML = tabsHTML;
                   
                   // Clear container and add component
                   container.innerHTML = '';
                   container.appendChild(tabsComponent);
                   
                   console.log(`✅ Rendered ${componentName} with variant: ${variant}`);
                   return;
                 }
                 
                 // Handle Table component
                 if (componentName === 'Table') {
                   // Create Table component
                   const tableComponent = document.createElement('div');
                   const data = props.data || [];
                   const columns = props.columns || [];
                   
                   // Base styles
                   let baseStyles = `
                     display: block;
                     width: 100%;
                     border-radius: 8px;
                     font-family: system-ui, sans-serif;
                     margin: 8px 0;
                     overflow: hidden;
                     border: 1px solid var(--border-light, #e5e7eb);
                   `;
                   
                   tableComponent.style.cssText = baseStyles;
                   
                   // Create table content
                   let tableHTML = `
                     <table style="width: 100%; border-collapse: collapse;">
                       <thead style="background: var(--bg-secondary, #f8fafc);">
                         <tr>
                   `;
                   
                   columns.forEach(col => {
                     tableHTML += `<th style="padding: 12px; text-align: left; font-weight: 600; color: var(--text-primary, #1f2937); border-bottom: 1px solid var(--border-light, #e5e7eb);">${col.label}</th>`;
                   });
                   
                   tableHTML += `</tr></thead><tbody>`;
                   
                   data.forEach((row, index) => {
                     tableHTML += `<tr style="border-bottom: 1px solid var(--border-light, #e5e7eb); ${index % 2 === 0 ? 'background: var(--bg-primary, #ffffff);' : 'background: var(--bg-secondary, #f8fafc);'}">`;
                     columns.forEach(col => {
                       tableHTML += `<td style="padding: 12px; color: var(--text-primary, #1f2937);">${row[col.key] || ''}</td>`;
                     });
                     tableHTML += `</tr>`;
                   });
                   
                   tableHTML += `</tbody></table>`;
                   tableComponent.innerHTML = tableHTML;
                   
                   container.innerHTML = '';
                   container.appendChild(tableComponent);
                   
                   console.log(`✅ Rendered ${componentName} with ${data.length} rows`);
                   return;
                 }

                 // Handle Toast component
                 if (componentName === 'Toast') {
                   // Create Toast component
                   const toastComponent = document.createElement('div');
                   const title = props.title || 'Toast';
                   const description = props.description || 'This is a toast notification.';
                   const variant = props.variant || 'default';
                   
                   // Base styles
                   let baseStyles = `
                     display: flex;
                     align-items: flex-start;
                     padding: 16px;
                     border-radius: 8px;
                     font-family: system-ui, sans-serif;
                     margin: 8px 0;
                     box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                     max-width: 400px;
                   `;
                   
                   // Variant styles
                   if (variant === 'success') {
                     baseStyles += `background: var(--bg-success-light, #f0fdf4); border-left: 4px solid var(--color-success, #10b981);`;
                   } else if (variant === 'error') {
                     baseStyles += `background: var(--bg-error-light, #fef2f2); border-left: 4px solid var(--color-error, #ef4444);`;
                   } else if (variant === 'warning') {
                     baseStyles += `background: var(--bg-warning-light, #fffbeb); border-left: 4px solid var(--color-warning, #f59e0b);`;
                   } else if (variant === 'info') {
                     baseStyles += `background: var(--bg-info-light, #eff6ff); border-left: 4px solid var(--color-info, #3b82f6);`;
                   } else {
                     baseStyles += `background: var(--bg-primary, #ffffff); border-left: 4px solid var(--color-primary, #667eea);`;
                   }
                   
                   toastComponent.style.cssText = baseStyles;
                   
                   // Create toast content
                   toastComponent.innerHTML = `
                     <div style="flex: 1;">
                       <div style="font-weight: 600; color: var(--text-primary, #1f2937); margin-bottom: 4px;">${title}</div>
                       <div style="color: var(--text-secondary, #6b7280); font-size: 14px;">${description}</div>
                     </div>
                     <button style="background: none; border: none; color: var(--text-secondary, #6b7280); cursor: pointer; padding: 4px; margin-left: 8px;" onclick="this.parentElement.parentElement.style.display='none'">×</button>
                   `;
                   
                   container.innerHTML = '';
                   container.appendChild(toastComponent);
                   
                   console.log(`✅ Rendered ${componentName} with variant: ${variant}`);
                   return;
                 }

                 // Handle Tooltip component
                 if (componentName === 'Tooltip') {
                   // Create Tooltip component
                   const tooltipComponent = document.createElement('div');
                   const content = props.content || 'Tooltip content';
                   const children = props.children || 'Hover me';
                   
                   // Base styles
                   let baseStyles = `
                     position: relative;
                     display: inline-block;
                     font-family: system-ui, sans-serif;
                     margin: 8px 0;
                   `;
                   
                   tooltipComponent.style.cssText = baseStyles;
                   
                   // Create tooltip content
                   tooltipComponent.innerHTML = `
                     <div style="
                       background: var(--color-primary, #667eea);
                       color: white;
                       padding: 8px 12px;
                       border-radius: 6px;
                       font-size: 14px;
                       margin-bottom: 8px;
                       position: relative;
                       display: inline-block;
                     ">
                       ${children}
                       <div style="
                         position: absolute;
                         top: 100%;
                         left: 50%;
                         transform: translateX(-50%);
                         background: var(--color-neutral-900, #1f2937);
                         color: white;
                         padding: 8px 12px;
                         border-radius: 6px;
                         font-size: 12px;
                         white-space: nowrap;
                         opacity: 0;
                         pointer-events: none;
                         transition: opacity 0.2s ease;
                         z-index: 10;
                       " onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0'">
                         ${content}
                       </div>
                     </div>
                   `;
                   
                   container.innerHTML = '';
                   container.appendChild(tooltipComponent);
                   
                   console.log(`✅ Rendered ${componentName} with content: ${content}`);
                   return;
                 }

                 // Handle Accordion component
                 if (componentName === 'Accordion') {
                   // Create Accordion component
                   const accordionComponent = document.createElement('div');
                   const items = props.items || [];
                   
                   // Base styles
                   let baseStyles = `
                     display: block;
                     width: 100%;
                     font-family: system-ui, sans-serif;
                     margin: 8px 0;
                     border: 1px solid var(--border-light, #e5e7eb);
                     border-radius: 8px;
                     overflow: hidden;
                   `;
                   
                   accordionComponent.style.cssText = baseStyles;
                   
                   // Create accordion content
                   let accordionHTML = '';
                   items.forEach((item, index) => {
                     accordionHTML += `
                       <div style="border-bottom: 1px solid var(--border-light, #e5e7eb);">
                         <button style="
                           width: 100%;
                           padding: 16px;
                           background: var(--bg-primary, #ffffff);
                           border: none;
                           text-align: left;
                           font-weight: 600;
                           color: var(--text-primary, #1f2937);
                           cursor: pointer;
                           display: flex;
                           justify-content: space-between;
                           align-items: center;
                           transition: background 0.2s ease;
                         " onmouseover="this.style.background='var(--bg-secondary, #f8fafc)'" onmouseout="this.style.background='var(--bg-primary, #ffffff)'">
                           ${item.title}
                           <span style="font-size: 18px; transition: transform 0.2s ease;">+</span>
                         </button>
                         <div style="
                           padding: 16px;
                           background: var(--bg-secondary, #f8fafc);
                           color: var(--text-secondary, #6b7280);
                           display: none;
                         ">
                           ${item.content}
                         </div>
                       </div>
                     `;
                   });
                   
                   accordionComponent.innerHTML = accordionHTML;
                   
                   container.innerHTML = '';
                   container.appendChild(accordionComponent);
                   
                   console.log(`✅ Rendered ${componentName} with ${items.length} items`);
                   return;
                 }

                 // Handle Skeleton component
                 if (componentName === 'Skeleton') {
                   // Create Skeleton component
                   const skeletonComponent = document.createElement('div');
                   const variant = props.variant || 'text';
                   
                   // Base styles
                   let baseStyles = `
                     background: linear-gradient(90deg, var(--bg-secondary, #f8fafc) 25%, var(--bg-tertiary, #e2e8f0) 50%, var(--bg-secondary, #f8fafc) 75%);
                     background-size: 200% 100%;
                     animation: skeleton-loading 1.5s infinite;
                     border-radius: 4px;
                     margin: 8px 0;
                   `;
                   
                   // Variant styles
                   if (variant === 'text') {
                     baseStyles += `height: 16px; width: 100%;`;
                   } else if (variant === 'rectangular') {
                     baseStyles += `height: 200px; width: 100%;`;
                   } else if (variant === 'circular') {
                     baseStyles += `height: 40px; width: 40px; border-radius: 50%;`;
                   }
                   
                   skeletonComponent.style.cssText = baseStyles;
                   
                   // Add animation keyframes
                   if (!document.querySelector('#skeleton-animation')) {
                     const style = document.createElement('style');
                     style.id = 'skeleton-animation';
                     style.textContent = `
                       @keyframes skeleton-loading {
                         0% { background-position: 200% 0; }
                         100% { background-position: -200% 0; }
                       }
                     `;
                     document.head.appendChild(style);
                   }
                   
                   container.innerHTML = '';
                   container.appendChild(skeletonComponent);
                   
                   console.log(`✅ Rendered ${componentName} with variant: ${variant}`);
                   return;
                 }

                 // Handle Progress component
                 if (componentName === 'Progress') {
                   // Create Progress component
                   const progressComponent = document.createElement('div');
                   const value = props.value || 0;
                   const max = props.max || 100;
                   const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
                   
                   // Base styles
                   let baseStyles = `
                     display: block;
                     width: 100%;
                     height: 8px;
                     background: var(--bg-secondary, #f8fafc);
                     border-radius: 4px;
                     overflow: hidden;
                     margin: 8px 0;
                   `;
                   
                   progressComponent.style.cssText = baseStyles;
                   
                   // Create progress content
                   progressComponent.innerHTML = `
                     <div style="
                       height: 100%;
                       width: ${percentage}%;
                       background: var(--color-primary, #667eea);
                       border-radius: 4px;
                       transition: width 0.3s ease;
                     "></div>
                   `;
                   
                   container.innerHTML = '';
                   container.appendChild(progressComponent);
                   
                   console.log(`✅ Rendered ${componentName} with value: ${value}%`);
                   return;
                 }

                 // Handle Checkbox component
                 if (componentName === 'Checkbox') {
                   // Create Checkbox component
                   const checkboxComponent = document.createElement('label');
                   const children = props.children || 'Checkbox option';
                   const checked = props.checked || false;
                   const disabled = props.disabled || false;
                   
                   // Base styles
                   let baseStyles = `
                     display: flex;
                     align-items: center;
                     gap: 8px;
                     font-family: system-ui, sans-serif;
                     cursor: ${disabled ? 'not-allowed' : 'pointer'};
                     opacity: ${disabled ? '0.5' : '1'};
                     margin: 8px 0;
                   `;
                   
                   checkboxComponent.style.cssText = baseStyles;
                   
                   // Create checkbox content
                   checkboxComponent.innerHTML = `
                     <input type="checkbox" ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''} style="
                       width: 16px;
                       height: 16px;
                       accent-color: var(--color-primary, #667eea);
                     ">
                     <span style="color: var(--text-primary, #1f2937); font-size: 14px;">${children}</span>
                   `;
                   
                   container.innerHTML = '';
                   container.appendChild(checkboxComponent);
                   
                   console.log(`✅ Rendered ${componentName} with checked: ${checked}`);
                   return;
                 }

                 // Handle RadioGroup component
                 if (componentName === 'RadioGroup') {
                   // Create RadioGroup component
                   const radioGroupComponent = document.createElement('div');
                   const options = props.options || [];
                   const value = props.value || '';
                   
                   // Base styles
                   let baseStyles = `
                     display: flex;
                     flex-direction: column;
                     gap: 8px;
                     font-family: system-ui, sans-serif;
                     margin: 8px 0;
                   `;
                   
                   radioGroupComponent.style.cssText = baseStyles;
                   
                   // Create radio group content
                   let radioHTML = '';
                   options.forEach((option, index) => {
                     const isChecked = option.value === value;
                     radioHTML += `
                       <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                         <input type="radio" name="radio-group" value="${option.value}" ${isChecked ? 'checked' : ''} style="
                           width: 16px;
                           height: 16px;
                           accent-color: var(--color-primary, #667eea);
                         ">
                         <span style="color: var(--text-primary, #1f2937); font-size: 14px;">${option.label}</span>
                       </label>
                     `;
                   });
                   
                   radioGroupComponent.innerHTML = radioHTML;
                   
                   container.innerHTML = '';
                   container.appendChild(radioGroupComponent);
                   
                   console.log(`✅ Rendered ${componentName} with ${options.length} options`);
                   return;
                 }

                 // Handle Switch component
                 if (componentName === 'Switch') {
                   // Create Switch component
                   const switchComponent = document.createElement('label');
                   const children = props.children || 'Switch option';
                   const checked = props.checked || false;
                   const disabled = props.disabled || false;
                   
                   // Base styles
                   let baseStyles = `
                     display: flex;
                     align-items: center;
                     gap: 8px;
                     font-family: system-ui, sans-serif;
                     cursor: ${disabled ? 'not-allowed' : 'pointer'};
                     opacity: ${disabled ? '0.5' : '1'};
                     margin: 8px 0;
                   `;
                   
                   switchComponent.style.cssText = baseStyles;
                   
                   // Create switch content
                   switchComponent.innerHTML = `
                     <div style="
                       position: relative;
                       width: 44px;
                       height: 24px;
                       background: ${checked ? 'var(--color-primary, #667eea)' : 'var(--bg-secondary, #f8fafc)'};
                       border-radius: 12px;
                       transition: background 0.2s ease;
                     ">
                       <div style="
                         position: absolute;
                         top: 2px;
                         left: ${checked ? '22px' : '2px'};
                         width: 20px;
                         height: 20px;
                         background: white;
                         border-radius: 50%;
                         transition: left 0.2s ease;
                         box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                       "></div>
                     </div>
                     <span style="color: var(--text-primary, #1f2937); font-size: 14px;">${children}</span>
                   `;
                   
                   container.innerHTML = '';
                   container.appendChild(switchComponent);
                   
                   console.log(`✅ Rendered ${componentName} with checked: ${checked}`);
                   return;
                 }

                 // Handle Textarea component
                 if (componentName === 'Textarea') {
                   // Create Textarea component
                   const textareaComponent = document.createElement('textarea');
                   const placeholder = props.placeholder || 'Enter your message...';
                   const value = props.value || '';
                   const disabled = props.disabled || false;
                   const size = props.size || 'md';
                   
                   // Base styles
                   let baseStyles = `
                     display: block;
                     width: 100%;
                     border-radius: 6px;
                     font-family: system-ui, sans-serif;
                     transition: all 0.2s ease;
                     outline: none;
                     margin: 8px 0;
                     resize: vertical;
                   `;
                   
                   // Size variants
                   if (size === 'sm') {
                     baseStyles += `font-size: 12px; padding: 6px 12px; min-height: 60px;`;
                   } else if (size === 'lg') {
                     baseStyles += `font-size: 16px; padding: 12px 16px; min-height: 120px;`;
                   } else {
                     baseStyles += `font-size: 14px; padding: 8px 12px; min-height: 80px;`;
                   }
                   
                   // Variant styles
                   baseStyles += `
                     border: 2px solid var(--border-light, #e5e7eb);
                     background: var(--bg-primary, #ffffff);
                     color: var(--text-primary, #1f2937);
                   `;
                   
                   if (disabled) {
                     baseStyles += `
                       opacity: 0.5;
                       cursor: not-allowed;
                       background: var(--bg-disabled, #f9fafb);
                     `;
                   }
                   
                   textareaComponent.style.cssText = baseStyles;
                   textareaComponent.placeholder = placeholder;
                   textareaComponent.value = value;
                   textareaComponent.disabled = disabled;
                   
                   container.innerHTML = '';
                   container.appendChild(textareaComponent);
                   
                   console.log(`✅ Rendered ${componentName} with placeholder: ${placeholder}`);
                   return;
                 }

                 // Handle Alert component
                 if (componentName === 'Alert') {
                   // Create Alert component
                   const alertComponent = document.createElement('div');
                   const children = props.children || 'This is an alert message';
                   const variant = props.variant || 'default';
                   
                   // Base styles
                   let baseStyles = `
                     display: flex;
                     align-items: flex-start;
                     padding: 16px;
                     border-radius: 8px;
                     font-family: system-ui, sans-serif;
                     margin: 8px 0;
                     border: 1px solid;
                   `;
                   
                   // Variant styles
                   if (variant === 'success') {
                     baseStyles += `background: var(--bg-success-light, #f0fdf4); border-color: var(--color-success, #10b981); color: var(--text-success, #059669);`;
                   } else if (variant === 'warning') {
                     baseStyles += `background: var(--bg-warning-light, #fffbeb); border-color: var(--color-warning, #f59e0b); color: var(--text-warning, #d97706);`;
                   } else if (variant === 'error') {
                     baseStyles += `background: var(--bg-error-light, #fef2f2); border-color: var(--color-error, #ef4444); color: var(--text-error, #dc2626);`;
                   } else {
                     baseStyles += `background: var(--bg-info-light, #eff6ff); border-color: var(--color-info, #3b82f6); color: var(--text-info, #2563eb);`;
                   }
                   
                   alertComponent.style.cssText = baseStyles;
                   alertComponent.textContent = children;
                   
                   container.innerHTML = '';
                   container.appendChild(alertComponent);
                   
                   console.log(`✅ Rendered ${componentName} with variant: ${variant}`);
                   return;
                 }

                 // Handle Breadcrumb component
                 if (componentName === 'Breadcrumb') {
                   // Create Breadcrumb component
                   const breadcrumbComponent = document.createElement('nav');
                   const items = props.items || [];
                   
                   // Base styles
                   let baseStyles = `
                     display: flex;
                     align-items: center;
                     gap: 8px;
                     font-family: system-ui, sans-serif;
                     margin: 8px 0;
                   `;
                   
                   breadcrumbComponent.style.cssText = baseStyles;
                   
                   // Create breadcrumb content
                   let breadcrumbHTML = '';
                   items.forEach((item, index) => {
                     const isLast = index === items.length - 1;
                     if (isLast) {
                       breadcrumbHTML += `<span style="color: var(--text-primary, #1f2937); font-weight: 600;">${item.label}</span>`;
                     } else {
                       breadcrumbHTML += `
                         <a href="${item.href || '#'}" style="color: var(--color-primary, #667eea); text-decoration: none; hover:text-decoration: underline;">${item.label}</a>
                         <span style="color: var(--text-secondary, #6b7280);">/</span>
                       `;
                     }
                   });
                   
                   breadcrumbComponent.innerHTML = breadcrumbHTML;
                   
                   container.innerHTML = '';
                   container.appendChild(breadcrumbComponent);
                   
                   console.log(`✅ Rendered ${componentName} with ${items.length} items`);
                   return;
                 }

                 // Handle Pagination component
                 if (componentName === 'Pagination') {
                   // Create Pagination component
                   const paginationComponent = document.createElement('div');
                   const currentPage = props.currentPage || 1;
                   const totalPages = props.totalPages || 10;
                   
                   // Base styles
                   let baseStyles = `
                     display: flex;
                     align-items: center;
                     gap: 4px;
                     font-family: system-ui, sans-serif;
                     margin: 8px 0;
                   `;
                   
                   paginationComponent.style.cssText = baseStyles;
                   
                   // Create pagination content
                   let paginationHTML = '';
                   
                   // Previous button
                   if (currentPage > 1) {
                     paginationHTML += `
                       <button style="
                         padding: 8px 12px;
                         border: 1px solid var(--border-light, #e5e7eb);
                         background: var(--bg-primary, #ffffff);
                         color: var(--text-primary, #1f2937);
                         border-radius: 6px;
                         cursor: pointer;
                         font-size: 14px;
                       ">‹</button>
                     `;
                   }
                   
                   // Page numbers
                   for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
                     const isCurrent = i === currentPage;
                     paginationHTML += `
                       <button style="
                         padding: 8px 12px;
                         border: 1px solid ${isCurrent ? 'var(--color-primary, #667eea)' : 'var(--border-light, #e5e7eb)'};
                         background: ${isCurrent ? 'var(--color-primary, #667eea)' : 'var(--bg-primary, #ffffff)'};
                         color: ${isCurrent ? 'white' : 'var(--text-primary, #1f2937)'};
                         border-radius: 6px;
                         cursor: pointer;
                         font-size: 14px;
                       ">${i}</button>
                     `;
                   }
                   
                   // Next button
                   if (currentPage < totalPages) {
                     paginationHTML += `
                       <button style="
                         padding: 8px 12px;
                         border: 1px solid var(--border-light, #e5e7eb);
                         background: var(--bg-primary, #ffffff);
                         color: var(--text-primary, #1f2937);
                         border-radius: 6px;
                         cursor: pointer;
                         font-size: 14px;
                       ">›</button>
                     `;
                   }
                   
                   paginationComponent.innerHTML = paginationHTML;
                   
                   container.innerHTML = '';
                   container.appendChild(paginationComponent);
                   
                   console.log(`✅ Rendered ${componentName} with page ${currentPage} of ${totalPages}`);
                   return;
                 }

                 // Handle Separator component
                 if (componentName === 'Separator') {
                   // Create Separator component
                   const separatorComponent = document.createElement('div');
                   const orientation = props.orientation || 'horizontal';
                   
                   // Base styles
                   let baseStyles = `
                     background: var(--border-light, #e5e7eb);
                     margin: 8px 0;
                   `;
                   
                   if (orientation === 'horizontal') {
                     baseStyles += `height: 1px; width: 100%;`;
                   } else {
                     baseStyles += `width: 1px; height: 40px;`;
                   }
                   
                   separatorComponent.style.cssText = baseStyles;
                   
                   container.innerHTML = '';
                   container.appendChild(separatorComponent);
                   
                   console.log(`✅ Rendered ${componentName} with orientation: ${orientation}`);
                   return;
                 }

                 // Handle Select component
                 if (componentName === 'Select') {
                   // Create Select component
                   const selectComponent = document.createElement('select');
                   const options = props.options || [];
                   const placeholder = props.placeholder || 'Select an option';
                   const disabled = props.disabled || false;
                   const size = props.size || 'md';
                   
                   // Base styles
                   let baseStyles = `
                     display: block;
                     width: 100%;
                     border-radius: 6px;
                     font-family: system-ui, sans-serif;
                     transition: all 0.2s ease;
                     outline: none;
                     margin: 8px 0;
                   `;
                   
                   // Size variants
                   if (size === 'sm') {
                     baseStyles += `font-size: 12px; height: 32px; padding: 6px 12px;`;
                   } else if (size === 'lg') {
                     baseStyles += `font-size: 16px; height: 48px; padding: 12px 16px;`;
                   } else {
                     baseStyles += `font-size: 14px; height: 40px; padding: 8px 12px;`;
                   }
                   
                   // Variant styles
                   baseStyles += `
                     border: 2px solid var(--border-light, #e5e7eb);
                     background: var(--bg-primary, #ffffff);
                     color: var(--text-primary, #1f2937);
                   `;
                   
                   if (disabled) {
                     baseStyles += `
                       opacity: 0.5;
                       cursor: not-allowed;
                       background: var(--bg-disabled, #f9fafb);
                     `;
                   }
                   
                   selectComponent.style.cssText = baseStyles;
                   selectComponent.disabled = disabled;
                   
                   // Create select content
                   selectComponent.innerHTML = `
                     <option value="">${placeholder}</option>
                     ${options.map(option => `<option value="${option.value}">${option.label}</option>`).join('')}
                   `;
                   
                   container.innerHTML = '';
                   container.appendChild(selectComponent);
                   
                   console.log(`✅ Rendered ${componentName} with ${options.length} options`);
                   return;
                 }

                 // Handle Label component
                 if (componentName === 'Label') {
                   // Create Label component
                   const labelComponent = document.createElement('label');
                   const children = props.children || 'Label';
                   const htmlFor = props.htmlFor || '';
                   const required = props.required || false;
                   const disabled = props.disabled || false;
                   
                   // Base styles
                   let baseStyles = `
                     display: block;
                     font-family: system-ui, sans-serif;
                     font-weight: 600;
                     color: var(--text-primary, #1f2937);
                     margin: 8px 0;
                     opacity: ${disabled ? '0.5' : '1'};
                   `;
                   
                   labelComponent.style.cssText = baseStyles;
                   labelComponent.htmlFor = htmlFor;
                   
                   // Create label content
                   labelComponent.innerHTML = `${children}${required ? ' <span style="color: var(--color-error, #ef4444);">*</span>' : ''}`;
                   
                   container.innerHTML = '';
                   container.appendChild(labelComponent);
                   
                   console.log(`✅ Rendered ${componentName} with text: ${children}`);
                   return;
                 }

                 // Handle HelperText component
                 if (componentName === 'HelperText') {
                   // Create HelperText component
                   const helperTextComponent = document.createElement('div');
                   const children = props.children || 'Helper text';
                   const variant = props.variant || 'default';
                   
                   // Base styles
                   let baseStyles = `
                     display: block;
                     font-family: system-ui, sans-serif;
                     font-size: 14px;
                     margin: 4px 0;
                   `;
                   
                   // Variant styles
                   if (variant === 'error') {
                     baseStyles += `color: var(--color-error, #ef4444);`;
                   } else if (variant === 'success') {
                     baseStyles += `color: var(--color-success, #10b981);`;
                   } else {
                     baseStyles += `color: var(--text-secondary, #6b7280);`;
                   }
                   
                   helperTextComponent.style.cssText = baseStyles;
                   helperTextComponent.textContent = children;
                   
                   container.innerHTML = '';
                   container.appendChild(helperTextComponent);
                   
                   console.log(`✅ Rendered ${componentName} with variant: ${variant}`);
                   return;
                 }

                 // Handle ErrorMessage component
                 if (componentName === 'ErrorMessage') {
                   // Create ErrorMessage component
                   const errorMessageComponent = document.createElement('div');
                   const children = props.children || 'Error message';
                   
                   // Base styles
                   let baseStyles = `
                     display: block;
                     font-family: system-ui, sans-serif;
                     font-size: 14px;
                     color: var(--color-error, #ef4444);
                     margin: 4px 0;
                   `;
                   
                   errorMessageComponent.style.cssText = baseStyles;
                   errorMessageComponent.textContent = children;
                   
                   container.innerHTML = '';
                   container.appendChild(errorMessageComponent);
                   
                   console.log(`✅ Rendered ${componentName} with text: ${children}`);
                   return;
                 }

                 // Handle Icon component
                 if (componentName === 'Icon') {
                   // Create Icon component
                   const iconComponent = document.createElement('div');
                   const name = props.name || 'heart';
                   const size = props.size || 'md';
                   
                   // Base styles
                   let baseStyles = `
                     display: inline-flex;
                     align-items: center;
                     justify-content: center;
                     color: var(--text-primary, #1f2937);
                     margin: 4px;
                   `;
                   
                   // Size variants
                   if (size === 'sm') {
                     baseStyles += `width: 16px; height: 16px; font-size: 14px;`;
                   } else if (size === 'lg') {
                     baseStyles += `width: 32px; height: 32px; font-size: 24px;`;
                   } else {
                     baseStyles += `width: 24px; height: 24px; font-size: 18px;`;
                   }
                   
                   iconComponent.style.cssText = baseStyles;
                   
                   // Create icon content (using Unicode symbols as fallback)
                   const iconMap = {
                     heart: '♥',
                     star: '★',
                     home: '🏠',
                     user: '👤',
                     settings: '⚙',
                     search: '🔍',
                     plus: '+',
                     minus: '-',
                     check: '✓',
                     close: '×'
                   };
                   
                   iconComponent.textContent = iconMap[name] || '●';
                   
                   container.innerHTML = '';
                   container.appendChild(iconComponent);
                   
                   console.log(`✅ Rendered ${componentName} with name: ${name}`);
                   return;
                 }

                 // Create a Nostromo UI styled component with variants
                 const buttonComponent = document.createElement('button');
                 buttonComponent.textContent = props.children || componentName;

                 // Get variant from props
                 const variant = props.variant || 'primary';
                 const size = props.size || 'md';
                 const disabled = props.disabled || false;
                 
                 // Base styles
                 let baseStyles = `
                   display: inline-flex;
                   align-items: center;
                   justify-content: center;
                   border-radius: 6px;
                   font-weight: 500;
                   border: none;
                   cursor: pointer;
                   transition: all 0.2s ease;
                   font-family: system-ui, sans-serif;
                   margin: 8px;
                 `;
                 
                 // Size variants
                 if (size === 'sm') {
                   baseStyles += `font-size: 12px; height: 32px; padding: 6px 12px;`;
                 } else if (size === 'lg') {
                   baseStyles += `font-size: 16px; height: 48px; padding: 12px 24px;`;
                 } else {
                   baseStyles += `font-size: 14px; height: 40px; padding: 8px 16px;`;
                 }
                 
                 // Variant styles
                 if (variant === 'secondary') {
                   baseStyles += `
                     background: var(--bg-secondary, #f8fafc);
                     color: var(--text-primary, #1f2937);
                     border: 1px solid var(--border-light, #e5e7eb);
                   `;
                 } else if (variant === 'ghost') {
                   baseStyles += `
                     background: transparent;
                     color: var(--color-primary, #667eea);
                     border: 1px solid transparent;
                   `;
                 } else if (variant === 'destructive') {
                   baseStyles += `
                     background: var(--color-error, #ef4444);
                     color: white;
                     border: 1px solid var(--color-error, #ef4444);
                   `;
                 } else {
                   baseStyles += `
                     background: var(--color-primary, #667eea);
                     color: white;
                     border: 1px solid var(--color-primary, #667eea);
                   `;
                 }
                 
                 // Disabled state
                 if (disabled) {
                   baseStyles += `
                     opacity: 0.5;
                     cursor: not-allowed;
                     pointer-events: none;
                   `;
                 }
                 
                 buttonComponent.style.cssText = baseStyles;
                 
                 // Add hover effects (only if not disabled)
                 if (!disabled) {
                   buttonComponent.addEventListener('mouseenter', () => {
                     if (variant === 'secondary') {
                       buttonComponent.style.background = 'var(--bg-tertiary, #f1f5f9)';
                       buttonComponent.style.borderColor = 'var(--color-primary, #667eea)';
                     } else if (variant === 'ghost') {
                       buttonComponent.style.background = 'var(--color-primary, #667eea)';
                       buttonComponent.style.color = 'white';
                     } else if (variant === 'destructive') {
                       buttonComponent.style.background = 'var(--color-error-dark, #dc2626)';
                     } else {
                       buttonComponent.style.background = 'var(--color-primary-dark, #5a6fd8)';
                     }
                     buttonComponent.style.transform = 'translateY(-1px)';
                     buttonComponent.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                   });
                   
                   buttonComponent.addEventListener('mouseleave', () => {
                     if (variant === 'secondary') {
                       buttonComponent.style.background = 'var(--bg-secondary, #f8fafc)';
                       buttonComponent.style.borderColor = 'var(--border-light, #e5e7eb)';
                     } else if (variant === 'ghost') {
                       buttonComponent.style.background = 'transparent';
                       buttonComponent.style.color = 'var(--color-primary, #667eea)';
                     } else if (variant === 'destructive') {
                       buttonComponent.style.background = 'var(--color-error, #ef4444)';
                     } else {
                       buttonComponent.style.background = 'var(--color-primary, #667eea)';
                     }
                     buttonComponent.style.transform = 'translateY(0)';
                     buttonComponent.style.boxShadow = 'none';
                   });
                 }
          
          // Clear container and add component
          container.innerHTML = '';
          container.appendChild(buttonComponent);
          
          console.log(`✅ Rendered ${componentName} with text: ${props.children || componentName}`);
          
        } catch (error) {
          console.warn('Failed to render live component:', error);
          container.innerHTML = `<div style="color: red; padding: 8px; border: 1px solid red; border-radius: 4px;">Error rendering ${componentName}: ${error.message}</div>`;
        }
      } else {
        console.warn('No component name found for container:', container);
      }
    });
  }
}

// Component definitions for Nostromo UI
const NostromoComponents = {
  Button: `
    function Button({ 
      children, 
      variant = 'primary', 
      size = 'md', 
      disabled = false, 
      loading = false,
      onClick,
      className = '',
      ...props 
    }) {
      const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
      
      const variantClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
        outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
        ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
      };
      
      const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base'
      };
      
      const classes = \`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]} \${className}\`;
      
      return (
        <button 
          className={classes}
          disabled={disabled || loading}
          onClick={onClick}
          {...props}
        >
          {loading && (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {children}
        </button>
      );
    }
  `,

  Input: `
    function Input({ 
      type = 'text',
      placeholder = '',
      value,
      onChange,
      disabled = false,
      error = false,
      className = '',
      ...props 
    }) {
      const baseClasses = 'block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2';
      const stateClasses = error 
        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500';
      
      const classes = \`\${baseClasses} \${stateClasses} \${className}\`;
      
      return (
        <input
          type={type}
          className={classes}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
      );
    }
  `,

  Badge: `
    function Badge({ 
      children, 
      variant = 'default', 
      size = 'md',
      className = '',
      ...props 
    }) {
      const baseClasses = 'inline-flex items-center font-medium rounded-full';
      
      const variantClasses = {
        default: 'bg-gray-100 text-gray-800',
        primary: 'bg-blue-100 text-blue-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        error: 'bg-red-100 text-red-800'
      };
      
      const sizeClasses = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-sm',
        lg: 'px-3 py-1 text-sm'
      };
      
      const classes = \`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]} \${className}\`;
      
      return (
        <span className={classes} {...props}>
          {children}
        </span>
      );
    }
  `,

  Card: `
    function Card({ 
      children, 
      variant = 'default',
      className = '',
      ...props 
    }) {
      const baseClasses = 'bg-white rounded-lg shadow';
      
      const variantClasses = {
        default: 'border border-gray-200',
        elevated: 'shadow-lg',
        outlined: 'border-2 border-gray-200'
      };
      
      const classes = \`\${baseClasses} \${variantClasses[variant]} \${className}\`;
      
      return (
        <div className={classes} {...props}>
          {children}
        </div>
      );
    }
  `
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 LiveComponentRenderer initializing...');
  
  // Live components initialization
  console.log('🧪 Initializing live components...');
  
  window.liveComponentRenderer = new LiveComponentRenderer();
  
  // Register Nostromo components
  Object.entries(NostromoComponents).forEach(([name, code]) => {
    window.liveComponentRenderer.components.set(name, { 
      Component: null, 
      props: {}, 
      code 
    });
  });
  
  // Render live components on the page
  console.log('🎯 Calling renderLiveComponents...');
  window.liveComponentRenderer.renderLiveComponents();
});

// Fallback: Also try to render when window loads
window.addEventListener('load', () => {
  console.log('🔄 Window loaded, checking for live components...');
  if (window.liveComponentRenderer) {
    window.liveComponentRenderer.renderLiveComponents();
  }
});

// Export for global access
window.LiveComponentRenderer = LiveComponentRenderer;
window.NostromoComponents = NostromoComponents;
