// Nostromo UI Advanced Documentation - Clipboard Integration

class ClipboardManager {
  constructor() {
    this.setupCopyButtons();
  }

  setupCopyButtons() {
    // Add copy buttons to code blocks
    this.addCopyButtonsToCodeBlocks();
    
    // Add copy buttons to component examples
    this.addCopyButtonsToComponents();
  }

  addCopyButtonsToCodeBlocks() {
    const codeBlocks = document.querySelectorAll('.code-block pre');
    codeBlocks.forEach(codeBlock => {
      if (!codeBlock.querySelector('.copy-button')) {
        const copyButton = this.createCopyButton();
        codeBlock.style.position = 'relative';
        codeBlock.appendChild(copyButton);
        
        copyButton.addEventListener('click', () => {
          const code = codeBlock.textContent;
          this.copyToClipboard(code, copyButton);
        });
      }
    });
  }

  addCopyButtonsToComponents() {
    const liveComponents = document.querySelectorAll('.live-component');
    liveComponents.forEach(component => {
      if (!component.querySelector('.copy-component-button')) {
        const copyButton = this.createCopyComponentButton();
        component.style.position = 'relative';
        component.appendChild(copyButton);
        
        copyButton.addEventListener('click', () => {
          const componentName = component.getAttribute('data-component');
          const propsString = component.getAttribute('data-props');
          const code = this.generateComponentCode(componentName, propsString);
          this.copyToClipboard(code, copyButton);
        });
      }
    });
  }

  createCopyButton() {
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
    `;
    button.title = 'Copy code';
    button.style.cssText = `
      position: absolute;
      top: 8px;
      right: 8px;
      background: var(--bg-secondary, #f8fafc);
      border: 1px solid var(--border-light, #e5e7eb);
      border-radius: 6px;
      padding: 8px;
      cursor: pointer;
      opacity: 0.7;
      transition: all 0.2s ease;
      z-index: 10;
    `;
    
    button.addEventListener('mouseenter', () => {
      button.style.opacity = '1';
      button.style.background = 'var(--bg-primary, #ffffff)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.opacity = '0.7';
      button.style.background = 'var(--bg-secondary, #f8fafc)';
    });
    
    return button;
  }

  createCopyComponentButton() {
    const button = document.createElement('button');
    button.className = 'copy-component-button';
    button.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
    `;
    button.title = 'Copy component code';
    button.style.cssText = `
      position: absolute;
      top: 4px;
      right: 4px;
      background: var(--bg-secondary, #f8fafc);
      border: 1px solid var(--border-light, #e5e7eb);
      border-radius: 4px;
      padding: 4px;
      cursor: pointer;
      opacity: 0.6;
      transition: all 0.2s ease;
      z-index: 10;
      font-size: 12px;
    `;
    
    button.addEventListener('mouseenter', () => {
      button.style.opacity = '1';
      button.style.background = 'var(--bg-primary, #ffffff)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.opacity = '0.6';
      button.style.background = 'var(--bg-secondary, #f8fafc)';
    });
    
    return button;
  }

  generateComponentCode(componentName, propsString) {
    let props = {};
    try {
      props = JSON.parse(propsString || '{}');
    } catch (error) {
      console.warn('Error parsing props:', error);
    }

    // Generate JSX code based on component type
    switch (componentName) {
      case 'Button':
        return this.generateButtonCode(props);
      case 'Input':
        return this.generateInputCode(props);
      case 'Card':
        return this.generateCardCode(props);
      case 'Dialog':
        return this.generateDialogCode(props);
      case 'Badge':
        return this.generateBadgeCode(props);
      case 'Avatar':
        return this.generateAvatarCode(props);
      case 'Tabs':
        return this.generateTabsCode(props);
      default:
        return `<${componentName} ${this.propsToString(props)} />`;
    }
  }

  generateButtonCode(props) {
    const { children = 'Button', variant, size, disabled } = props;
    let propsStr = '';
    if (variant && variant !== 'primary') propsStr += ` variant="${variant}"`;
    if (size && size !== 'md') propsStr += ` size="${size}"`;
    if (disabled) propsStr += ` disabled`;
    
    return `<Button${propsStr}>${children}</Button>`;
  }

  generateInputCode(props) {
    const { type, placeholder, size, error, disabled } = props;
    let propsStr = '';
    if (type && type !== 'text') propsStr += ` type="${type}"`;
    if (placeholder) propsStr += ` placeholder="${placeholder}"`;
    if (size && size !== 'md') propsStr += ` size="${size}"`;
    if (error) propsStr += ` error`;
    if (disabled) propsStr += ` disabled`;
    
    return `<Input${propsStr} />`;
  }

  generateCardCode(props) {
    const { title, content, variant, size } = props;
    let propsStr = '';
    if (variant && variant !== 'default') propsStr += ` variant="${variant}"`;
    if (size && size !== 'md') propsStr += ` size="${size}"`;
    
    return `<Card${propsStr}>
  <CardHeader>
    <CardTitle>${title || 'Card Title'}</CardTitle>
  </CardHeader>
  <CardContent>
    ${content || 'Card content goes here.'}
  </CardContent>
</Card>`;
  }

  generateDialogCode(props) {
    const { title, content, variant, size } = props;
    let propsStr = '';
    if (variant && variant !== 'default') propsStr += ` variant="${variant}"`;
    if (size && size !== 'md') propsStr += ` size="${size}"`;
    
    return `<Dialog${propsStr}>
  <DialogTrigger>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>${title || 'Dialog Title'}</DialogTitle>
    </DialogHeader>
    <p>${content || 'Dialog content goes here.'}</p>
    <DialogFooter>
      <Button variant="secondary">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`;
  }

  generateBadgeCode(props) {
    const { children = 'Badge', color, size } = props;
    let propsStr = '';
    if (color && color !== 'blue') propsStr += ` color="${color}"`;
    if (size && size !== 'md') propsStr += ` size="${size}"`;
    
    return `<Badge${propsStr}>${children}</Badge>`;
  }

  generateAvatarCode(props) {
    const { src, alt, fallback, size, variant } = props;
    let propsStr = '';
    if (src) propsStr += ` src="${src}"`;
    if (alt) propsStr += ` alt="${alt}"`;
    if (fallback) propsStr += ` fallback="${fallback}"`;
    if (size && size !== 'md') propsStr += ` size="${size}"`;
    if (variant && variant !== 'default') propsStr += ` variant="${variant}"`;
    
    return `<Avatar${propsStr} />`;
  }

  generateTabsCode(props) {
    const { tabs = [], activeTab, variant, size } = props;
    let propsStr = '';
    if (variant && variant !== 'default') propsStr += ` variant="${variant}"`;
    if (size && size !== 'md') propsStr += ` size="${size}"`;
    if (activeTab) propsStr += ` defaultValue="${activeTab}"`;
    
    const tabsContent = tabs.map(tab => 
      `  <TabsContent value="${tab.id}">${tab.content}</TabsContent>`
    ).join('\n');
    
    const tabsList = tabs.map(tab => 
      `    <TabsTrigger value="${tab.id}">${tab.label}</TabsTrigger>`
    ).join('\n');
    
    return `<Tabs${propsStr}>
  <TabsList>
${tabsList}
  </TabsList>
${tabsContent}
</Tabs>`;
  }

  propsToString(props) {
    return Object.entries(props)
      .map(([key, value]) => {
        if (typeof value === 'boolean') {
          return value ? key : '';
        }
        return `${key}="${value}"`;
      })
      .filter(Boolean)
      .join(' ');
  }

  async copyToClipboard(text, button) {
    try {
      await navigator.clipboard.writeText(text);
      this.showCopySuccess(button);
    } catch (error) {
      // Fallback for older browsers
      this.fallbackCopyToClipboard(text, button);
    }
  }

  fallbackCopyToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      this.showCopySuccess(button);
    } catch (error) {
      console.error('Copy failed:', error);
      this.showCopyError(button);
    }
    
    document.body.removeChild(textArea);
  }

  showCopySuccess(button) {
    const originalInnerHTML = button.innerHTML;
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20,6 9,17 4,12"></polyline>
      </svg>
    `;
    button.style.color = 'var(--color-success, #10b981)';
    button.title = 'Copied!';
    
    setTimeout(() => {
      button.innerHTML = originalInnerHTML;
      button.style.color = '';
      button.title = 'Copy code';
    }, 2000);
  }

  showCopyError(button) {
    const originalInnerHTML = button.innerHTML;
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `;
    button.style.color = 'var(--color-error, #ef4444)';
    button.title = 'Copy failed';
    
    setTimeout(() => {
      button.innerHTML = originalInnerHTML;
      button.style.color = '';
      button.title = 'Copy code';
    }, 2000);
  }
}

// Initialize clipboard manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.clipboardManager = new ClipboardManager();
});

// Also initialize if document is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.clipboardManager = new ClipboardManager();
  });
} else {
  window.clipboardManager = new ClipboardManager();
}

// Export for global access
window.ClipboardManager = ClipboardManager;
