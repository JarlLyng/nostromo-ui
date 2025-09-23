// Nostromo UI Advanced Documentation - Live Components Integration

class LiveComponentRenderer {
  constructor() {
    this.components = new Map();
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
  window.liveComponentRenderer = new LiveComponentRenderer();
  
  // Register Nostromo components
  Object.entries(NostromoComponents).forEach(([name, code]) => {
    window.liveComponentRenderer.components.set(name, { 
      Component: null, 
      props: {}, 
      code 
    });
  });
});

// Export for global access
window.LiveComponentRenderer = LiveComponentRenderer;
window.NostromoComponents = NostromoComponents;
