// Nostromo UI Advanced Documentation - Interactive Playground

class InteractivePlayground {
  constructor() {
    this.playgrounds = new Map();
    this.init();
  }

  init() {
    this.setupPlaygroundContainers();
  }

  setupPlaygroundContainers() {
    const containers = document.querySelectorAll('.interactive-playground');
    containers.forEach(container => {
      this.createPlayground(container);
    });
  }

  createPlayground(container) {
    const playgroundId = container.getAttribute('data-playground-id') || 'playground-' + Date.now();
    const initialCode = container.getAttribute('data-initial-code') || this.getDefaultCode();
    
    // Create playground HTML structure
    container.innerHTML = `
      <div class="playground-header">
        <h3>Interactive Playground</h3>
        <div class="playground-controls">
          <button class="playground-btn" data-action="reset">Reset</button>
          <button class="playground-btn" data-action="copy">Copy Code</button>
          <button class="playground-btn" data-action="fullscreen">Fullscreen</button>
        </div>
      </div>
      <div class="playground-content">
        <div class="playground-editor">
          <div class="editor-header">
            <span>Code Editor</span>
            <div class="editor-tabs">
              <button class="tab-btn active" data-tab="jsx">JSX</button>
              <button class="tab-btn" data-tab="css">CSS</button>
            </div>
          </div>
          <div class="editor-container">
            <textarea class="code-editor" data-tab="jsx" placeholder="Enter your JSX code here...">${initialCode}</textarea>
            <textarea class="code-editor" data-tab="css" placeholder="Enter your CSS here..." style="display: none;">${this.getDefaultCSS()}</textarea>
          </div>
        </div>
        <div class="playground-preview">
          <div class="preview-header">
            <span>Live Preview</span>
            <div class="preview-controls">
              <button class="preview-btn" data-action="refresh">Refresh</button>
              <button class="preview-btn" data-action="console">Console</button>
            </div>
          </div>
          <div class="preview-container">
            <iframe class="preview-iframe" sandbox="allow-scripts"></iframe>
          </div>
        </div>
      </div>
      <div class="playground-console" style="display: none;">
        <div class="console-header">
          <span>Console Output</span>
          <button class="console-btn" data-action="clear">Clear</button>
        </div>
        <div class="console-output"></div>
      </div>
    `;

    // Store playground reference
    this.playgrounds.set(playgroundId, {
      container,
      jsxCode: initialCode,
      cssCode: this.getDefaultCSS(),
      iframe: container.querySelector('.preview-iframe'),
      console: container.querySelector('.console-output')
    });

    // Setup event listeners
    this.setupPlaygroundEvents(container, playgroundId);
    
    // Initial render
    this.renderPlayground(playgroundId);
  }

  setupPlaygroundEvents(container, playgroundId) {
    const playground = this.playgrounds.get(playgroundId);
    
    // Tab switching
    container.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        this.switchTab(container, tab);
      });
    });

    // Code editor changes
    container.querySelectorAll('.code-editor').forEach(editor => {
      editor.addEventListener('input', () => {
        this.debounce(() => {
          this.updatePlaygroundCode(playgroundId);
        }, 500)();
      });
    });

    // Control buttons
    container.querySelectorAll('.playground-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        this.handlePlaygroundAction(playgroundId, action);
      });
    });

    // Preview buttons
    container.querySelectorAll('.preview-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        this.handlePreviewAction(playgroundId, action);
      });
    });

    // Console button
    const consoleBtn = container.querySelector('.console-btn');
    if (consoleBtn) {
      consoleBtn.addEventListener('click', () => {
        this.clearConsole(playgroundId);
      });
    }
  }

  switchTab(container, tab) {
    // Update tab buttons
    container.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
    });

    // Update editors
    container.querySelectorAll('.code-editor').forEach(editor => {
      editor.style.display = editor.getAttribute('data-tab') === tab ? 'block' : 'none';
    });
  }

  updatePlaygroundCode(playgroundId) {
    const playground = this.playgrounds.get(playgroundId);
    if (!playground) return;

    const jsxEditor = playground.container.querySelector('.code-editor[data-tab="jsx"]');
    const cssEditor = playground.container.querySelector('.code-editor[data-tab="css"]');

    playground.jsxCode = jsxEditor.value;
    playground.cssCode = cssEditor.value;

    this.renderPlayground(playgroundId);
  }

  renderPlayground(playgroundId) {
    const playground = this.playgrounds.get(playgroundId);
    if (!playground) return;

    try {
      const html = this.generatePreviewHTML(playground.jsxCode, playground.cssCode);
      playground.iframe.srcdoc = html;
    } catch (error) {
      this.showError(playgroundId, error.message);
    }
  }

  generatePreviewHTML(jsxCode, cssCode) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Playground Preview</title>
        <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background: #f8fafc;
          }
          ${cssCode}
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/babel">
          ${this.getComponentDefinitions()}
          
          ${jsxCode}
          
          // Render the component
          const root = ReactDOM.createRoot(document.getElementById('root'));
          root.render(React.createElement(App));
        </script>
      </body>
      </html>
    `;
  }

  getComponentDefinitions() {
    return `
      // Nostromo UI Components
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
    `;
  }

  getDefaultCode() {
    return `function App() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome to Nostromo UI Playground
      </h1>
      
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Interactive Example</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="primary" 
              onClick={() => setCount(count + 1)}
            >
              Count: {count}
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => setCount(0)}
            >
              Reset
            </Button>
          </div>
          
          <Input 
            placeholder="Type something here..."
            className="max-w-md"
          />
          
          <div className="flex gap-2">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}`;
  }

  getDefaultCSS() {
    return `/* Custom styles for your components */
.custom-button {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.custom-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}`;
  }

  handlePlaygroundAction(playgroundId, action) {
    const playground = this.playgrounds.get(playgroundId);
    if (!playground) return;

    switch (action) {
      case 'reset':
        this.resetPlayground(playgroundId);
        break;
      case 'copy':
        this.copyCode(playgroundId);
        break;
      case 'fullscreen':
        this.toggleFullscreen(playgroundId);
        break;
    }
  }

  handlePreviewAction(playgroundId, action) {
    const playground = this.playgrounds.get(playgroundId);
    if (!playground) return;

    switch (action) {
      case 'refresh':
        this.renderPlayground(playgroundId);
        break;
      case 'console':
        this.toggleConsole(playgroundId);
        break;
    }
  }

  resetPlayground(playgroundId) {
    const playground = this.playgrounds.get(playgroundId);
    if (!playground) return;

    const jsxEditor = playground.container.querySelector('.code-editor[data-tab="jsx"]');
    const cssEditor = playground.container.querySelector('.code-editor[data-tab="css"]');

    jsxEditor.value = this.getDefaultCode();
    cssEditor.value = this.getDefaultCSS();

    playground.jsxCode = jsxEditor.value;
    playground.cssCode = cssEditor.value;

    this.renderPlayground(playgroundId);
  }

  copyCode(playgroundId) {
    const playground = this.playgrounds.get(playgroundId);
    if (!playground) return;

    const jsxEditor = playground.container.querySelector('.code-editor[data-tab="jsx"]');
    const cssEditor = playground.container.querySelector('.code-editor[data-tab="css"]');
    
    const code = `// JSX Code
${jsxEditor.value}

// CSS Code
${cssEditor.value}`;

    navigator.clipboard.writeText(code).then(() => {
      this.showNotification('Code copied to clipboard!');
    });
  }

  toggleFullscreen(playgroundId) {
    const playground = this.playgrounds.get(playgroundId);
    if (!playground) return;

    playground.container.classList.toggle('fullscreen');
  }

  toggleConsole(playgroundId) {
    const playground = this.playgrounds.get(playgroundId);
    if (!playground) return;

    const console = playground.container.querySelector('.playground-console');
    console.style.display = console.style.display === 'none' ? 'block' : 'none';
  }

  clearConsole(playgroundId) {
    const playground = this.playgrounds.get(playgroundId);
    if (!playground) return;

    playground.console.innerHTML = '';
  }

  showError(playgroundId, message) {
    const playground = this.playgrounds.get(playgroundId);
    if (!playground) return;

    const iframe = playground.iframe;
    iframe.srcdoc = `
      <div style="padding: 20px; color: #ef4444; font-family: monospace;">
        <h3>Error:</h3>
        <p>${message}</p>
      </div>
    `;
  }

  showNotification(message) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.className = 'playground-notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 10000;
      font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.interactivePlayground = new InteractivePlayground();
});

// Export for global access
window.InteractivePlayground = InteractivePlayground;
