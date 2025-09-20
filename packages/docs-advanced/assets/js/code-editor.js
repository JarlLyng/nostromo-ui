// Nostromo UI Advanced Documentation - Code Editor

class CodeEditor {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      language: 'tsx',
      theme: 'dark',
      readOnly: false,
      showLineNumbers: true,
      ...options
    };
    
    this.code = options.code || '';
    this.onChange = options.onChange || (() => {});
    this.init();
  }

  init() {
    this.createEditor();
    this.setupEventListeners();
    this.updateCode(this.code);
  }

  createEditor() {
    this.container.innerHTML = `
      <div class="code-editor">
        <div class="code-editor-header">
          <span class="code-editor-title">${this.options.language.toUpperCase()}</span>
          <div class="code-editor-actions">
            <button class="btn btn-secondary copy-btn" title="Copy code">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
            <button class="btn btn-primary run-btn" title="Run code">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="5,3 19,12 5,21"></polygon>
              </svg>
            </button>
          </div>
        </div>
        <div class="code-editor-content" contenteditable="${!this.options.readOnly}" spellcheck="false"></div>
      </div>
    `;

    this.editor = this.container.querySelector('.code-editor-content');
    this.copyBtn = this.container.querySelector('.copy-btn');
    this.runBtn = this.container.querySelector('.run-btn');
  }

  setupEventListeners() {
    // Copy button
    this.copyBtn.addEventListener('click', () => {
      this.copyToClipboard();
    });

    // Run button
    this.runBtn.addEventListener('click', () => {
      this.runCode();
    });

    // Editor content changes
    this.editor.addEventListener('input', (e) => {
      this.code = e.target.textContent;
      this.onChange(this.code);
    });

    // Handle paste events
    this.editor.addEventListener('paste', (e) => {
      e.preventDefault();
      const text = e.clipboardData.getData('text/plain');
      document.execCommand('insertText', false, text);
    });

    // Handle keyboard shortcuts
    this.editor.addEventListener('keydown', (e) => {
      // Tab key handling
      if (e.key === 'Tab') {
        e.preventDefault();
        document.execCommand('insertText', false, '  ');
      }
      
      // Ctrl/Cmd + Enter to run
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        this.runCode();
      }
    });
  }

  updateCode(code) {
    this.code = code;
    this.editor.textContent = code;
    this.highlightSyntax();
  }

  highlightSyntax() {
    // Simple syntax highlighting for demo
    const code = this.editor.textContent;
    const highlighted = this.simpleHighlight(code);
    this.editor.innerHTML = highlighted;
  }

  simpleHighlight(code) {
    // Basic syntax highlighting
    return code
      .replace(/(import|export|from|const|let|var|function|return|if|else|for|while|class|interface|type)/g, '<span class="keyword">$1</span>')
      .replace(/(['"`])(.*?)\1/g, '<span class="string">$1$2$1</span>')
      .replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
      .replace(/(\b\d+\b)/g, '<span class="number">$1</span>')
      .replace(/(&lt;\/?[^&gt;]+&gt;)/g, '<span class="jsx">$1</span>');
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.code).then(() => {
      this.showNotification('Code copied to clipboard!');
      this.copyBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
      `;
      setTimeout(() => {
        this.copyBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        `;
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
      this.showNotification('Failed to copy code', 'error');
    });
  }

  runCode() {
    // Emit run event
    this.container.dispatchEvent(new CustomEvent('code-run', {
      detail: { code: this.code }
    }));
    
    this.showNotification('Code executed!');
  }

  showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'error' ? 'var(--color-error)' : 'var(--color-success)'};
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
      box-shadow: var(--shadow-lg);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // Public methods
  getCode() {
    return this.code;
  }

  setCode(code) {
    this.updateCode(code);
  }

  focus() {
    this.editor.focus();
  }

  destroy() {
    this.container.innerHTML = '';
  }
}

// Live Preview Component
class LivePreview {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      theme: 'light',
      ...options
    };
    
    this.init();
  }

  init() {
    this.container.innerHTML = `
      <div class="live-preview">
        <div class="live-preview-header">
          <span class="live-preview-title">Live Preview</span>
          <div class="live-preview-actions">
            <button class="btn btn-secondary refresh-btn" title="Refresh">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="23,4 23,10 17,10"></polyline>
                <polyline points="1,20 1,14 7,14"></polyline>
                <path d="M20.49,9A9,9,0,0,0,5.64,5.64L1,10m22,4L18.36,18.36A9,9,0,0,1,3.51,15"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="live-preview-content">
          <div class="preview-placeholder">
            <p>Live preview will appear here</p>
          </div>
        </div>
      </div>
    `;

    this.content = this.container.querySelector('.live-preview-content');
    this.refreshBtn = this.container.querySelector('.refresh-btn');
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.refreshBtn.addEventListener('click', () => {
      this.refresh();
    });
  }

  updatePreview(html) {
    this.content.innerHTML = html;
  }

  refresh() {
    // Emit refresh event
    this.container.dispatchEvent(new CustomEvent('preview-refresh'));
    this.showNotification('Preview refreshed!');
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
      box-shadow: var(--shadow-lg);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 2000);
  }
}

// Component Showcase
class ComponentShowcase {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      components: [],
      ...options
    };
    
    this.init();
  }

  init() {
    this.createShowcase();
    this.setupEventListeners();
  }

  createShowcase() {
    this.container.innerHTML = `
      <div class="component-showcase">
        <div class="showcase-header">
          <h3 class="showcase-title">Component Variants</h3>
          <div class="showcase-controls">
            <button class="btn btn-secondary toggle-code-btn">Show Code</button>
          </div>
        </div>
        <div class="showcase-content">
          <div class="component-variants"></div>
          <div class="showcase-code hidden">
            <div class="code-block"></div>
          </div>
        </div>
      </div>
    `;

    this.variantsContainer = this.container.querySelector('.component-variants');
    this.codeContainer = this.container.querySelector('.showcase-code');
    this.codeBlock = this.container.querySelector('.code-block');
    this.toggleBtn = this.container.querySelector('.toggle-code-btn');
    
    this.renderVariants();
  }

  renderVariants() {
    this.options.components.forEach((component, index) => {
      const variantCard = document.createElement('div');
      variantCard.className = 'variant-card';
      variantCard.innerHTML = `
        <div class="variant-preview">
          ${component.preview}
        </div>
        <div class="variant-name">${component.name}</div>
      `;
      
      variantCard.addEventListener('click', () => {
        this.selectVariant(index);
      });
      
      this.variantsContainer.appendChild(variantCard);
    });
  }

  selectVariant(index) {
    // Remove active class from all variants
    this.variantsContainer.querySelectorAll('.variant-card').forEach(card => {
      card.classList.remove('active');
    });
    
    // Add active class to selected variant
    this.variantsContainer.children[index].classList.add('active');
    
    // Update code block
    this.codeBlock.textContent = this.options.components[index].code;
    
    // Show code if hidden
    if (this.codeContainer.classList.contains('hidden')) {
      this.toggleCode();
    }
  }

  setupEventListeners() {
    this.toggleBtn.addEventListener('click', () => {
      this.toggleCode();
    });
  }

  toggleCode() {
    this.codeContainer.classList.toggle('hidden');
    this.toggleBtn.textContent = this.codeContainer.classList.contains('hidden') 
      ? 'Show Code' 
      : 'Hide Code';
  }
}

// Export for use in other files
window.CodeEditor = CodeEditor;
window.LivePreview = LivePreview;
window.ComponentShowcase = ComponentShowcase;
