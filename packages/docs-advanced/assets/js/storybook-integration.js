// Nostromo UI Advanced Documentation - Storybook Integration

class StorybookIntegration {
  constructor() {
    this.storybookUrl = 'http://localhost:6006'; // Default Storybook URL
    this.isStorybookRunning = false;
    this.init();
  }

  init() {
    this.checkStorybookStatus();
    this.createStorybookEmbed();
    this.setupEventListeners();
  }

  async checkStorybookStatus() {
    try {
      const response = await fetch(`${this.storybookUrl}/iframe.html`, { 
        method: 'HEAD',
        mode: 'no-cors'
      });
      this.isStorybookRunning = true;
    } catch (error) {
      this.isStorybookRunning = false;
      console.log('Storybook is not running on localhost:6006');
    }
  }

  createStorybookEmbed() {
    // Create Storybook integration elements
    const storybookSection = document.createElement('section');
    storybookSection.className = 'storybook-integration mb-8';
    storybookSection.innerHTML = `
      <h2>Interactive Examples</h2>
      <p>Explore live, interactive examples powered by Storybook.</p>
      
      <div class="storybook-container">
        <div class="storybook-header">
          <div class="storybook-controls">
            <button class="btn btn-secondary" id="refresh-storybook">Refresh</button>
            <button class="btn btn-primary" id="open-storybook">Open in Storybook</button>
          </div>
          <div class="storybook-status">
            <span class="status-indicator" id="storybook-status"></span>
            <span id="storybook-status-text">Checking Storybook...</span>
          </div>
        </div>
        
        <div class="storybook-embed" id="storybook-embed">
          <div class="storybook-placeholder">
            <div class="placeholder-content">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <path d="M9 9h6v6H9z"></path>
              </svg>
              <h3>Storybook Integration</h3>
              <p>Interactive component examples will appear here when Storybook is running.</p>
              <div class="storybook-actions">
                <button class="btn btn-primary" onclick="window.open('http://localhost:6006', '_blank')">
                  Launch Storybook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Insert after the first section
    const firstSection = document.querySelector('main .content > section');
    if (firstSection) {
      firstSection.parentNode.insertBefore(storybookSection, firstSection.nextSibling);
    }
  }

  setupEventListeners() {
    // Refresh button
    const refreshBtn = document.getElementById('refresh-storybook');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        this.refreshStorybook();
      });
    }

    // Open in Storybook button
    const openBtn = document.getElementById('open-storybook');
    if (openBtn) {
      openBtn.addEventListener('click', () => {
        this.openInStorybook();
      });
    }

    // Update status periodically
    setInterval(() => {
      this.updateStorybookStatus();
    }, 30000); // Check every 30 seconds
  }

  async refreshStorybook() {
    const statusElement = document.getElementById('storybook-status');
    const statusText = document.getElementById('storybook-status-text');
    
    statusText.textContent = 'Checking Storybook...';
    statusElement.className = 'status-indicator checking';
    
    await this.checkStorybookStatus();
    this.updateStorybookStatus();
  }

  updateStorybookStatus() {
    const statusElement = document.getElementById('storybook-status');
    const statusText = document.getElementById('storybook-status-text');
    const embed = document.getElementById('storybook-embed');
    
    if (this.isStorybookRunning) {
      statusElement.className = 'status-indicator online';
      statusText.textContent = 'Storybook is running';
      this.loadStorybookEmbed();
    } else {
      statusElement.className = 'status-indicator offline';
      statusText.textContent = 'Storybook is not running';
      this.showStorybookPlaceholder();
    }
  }

  loadStorybookEmbed() {
    const embed = document.getElementById('storybook-embed');
    const currentComponent = this.getCurrentComponent();
    
    if (currentComponent) {
      const storybookUrl = `${this.storybookUrl}/iframe.html?id=${currentComponent.storyId}`;
      embed.innerHTML = `
        <iframe 
          src="${storybookUrl}" 
          width="100%" 
          height="600" 
          frameborder="0"
          title="Storybook ${currentComponent.name} Example"
        ></iframe>
      `;
    }
  }

  showStorybookPlaceholder() {
    const embed = document.getElementById('storybook-embed');
    embed.innerHTML = `
      <div class="storybook-placeholder">
        <div class="placeholder-content">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <path d="M9 9h6v6H9z"></path>
          </svg>
          <h3>Storybook Not Running</h3>
          <p>To see interactive examples, start Storybook in your terminal:</p>
          <div class="code-block">
            <pre><code>cd packages/ui-core
pnpm storybook</code></pre>
          </div>
          <div class="storybook-actions">
            <button class="btn btn-primary" onclick="window.open('http://localhost:6006', '_blank')">
              Launch Storybook
            </button>
          </div>
        </div>
      </div>
    `;
  }

  getCurrentComponent() {
    const path = window.location.pathname;
    const componentMap = {
      '/components/button.html': { name: 'Button', storyId: 'components-button--default' },
      '/components/input.html': { name: 'Input', storyId: 'components-input--default' },
      '/components/dialog.html': { name: 'Dialog', storyId: 'components-dialog--default' },
      '/components/badge.html': { name: 'Badge', storyId: 'components-badge--default' },
      '/components/card.html': { name: 'Card', storyId: 'components-card--default' },
      '/components/avatar.html': { name: 'Avatar', storyId: 'components-avatar--default' },
      '/components/tabs.html': { name: 'Tabs', storyId: 'components-tabs--default' },
      '/components/select.html': { name: 'Select', storyId: 'components-select--default' },
      '/components/label.html': { name: 'Label', storyId: 'components-label--default' },
      '/components/helper-text.html': { name: 'HelperText', storyId: 'components-helpertext--default' },
      '/components/error-message.html': { name: 'ErrorMessage', storyId: 'components-errormessage--default' },
      '/components/marketing/hero.html': { name: 'Hero', storyId: 'components-hero--default' },
      '/components/marketing/testimonials.html': { name: 'Testimonials', storyId: 'components-testimonials--default' },
      '/components/marketing/features.html': { name: 'Features', storyId: 'components-features--default' },
      '/components/marketing/pricing.html': { name: 'Pricing', storyId: 'components-pricing--default' }
    };
    
    return componentMap[path] || null;
  }

  openInStorybook() {
    const currentComponent = this.getCurrentComponent();
    if (currentComponent) {
      const storybookUrl = `${this.storybookUrl}/?path=/story/${currentComponent.storyId}`;
      window.open(storybookUrl, '_blank');
    } else {
      window.open(this.storybookUrl, '_blank');
    }
  }

  // Public methods
  setStorybookUrl(url) {
    this.storybookUrl = url;
    this.checkStorybookStatus();
  }

  getStorybookUrl() {
    return this.storybookUrl;
  }
}

// Storybook Component Links
class StorybookLinks {
  constructor() {
    this.init();
  }

  init() {
    this.addStorybookLinks();
  }

  addStorybookLinks() {
    // Add Storybook links to component cards
    const componentCards = document.querySelectorAll('.component-card');
    componentCards.forEach(card => {
      const title = card.querySelector('h3, h4').textContent;
      const storybookLink = this.createStorybookLink(title);
      
      const actions = card.querySelector('.btn')?.parentElement;
      if (actions) {
        actions.appendChild(storybookLink);
      }
    });
  }

  createStorybookLink(componentName) {
    const link = document.createElement('a');
    link.href = `http://localhost:6006/?path=/story/components-${componentName.toLowerCase()}--default`;
    link.target = '_blank';
    link.className = 'btn btn-secondary';
    link.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <path d="M9 9h6v6H9z"></path>
      </svg>
      Storybook
    `;
    return link;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize on component pages
  if (window.location.pathname.includes('/components/')) {
    new StorybookIntegration();
    new StorybookLinks();
  }
});

// Add CSS for Storybook integration
const storybookStyle = document.createElement('style');
storybookStyle.textContent = `
  .storybook-integration {
    margin: 2rem 0;
  }

  .storybook-container {
    border: 1px solid var(--border-light);
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--bg-primary);
  }

  .storybook-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border-light);
  }

  .storybook-controls {
    display: flex;
    gap: 0.5rem;
  }

  .storybook-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-secondary);
  }

  .status-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--color-gray-400);
  }

  .status-indicator.online {
    background: var(--color-success);
  }

  .status-indicator.offline {
    background: var(--color-error);
  }

  .status-indicator.checking {
    background: var(--color-warning);
    animation: pulse 1s infinite;
  }

  .storybook-embed {
    min-height: 600px;
    background: var(--bg-primary);
  }

  .storybook-embed iframe {
    border: none;
    width: 100%;
    height: 600px;
  }

  .storybook-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 600px;
    background: var(--bg-secondary);
  }

  .placeholder-content {
    text-align: center;
    max-width: 400px;
    padding: 2rem;
  }

  .placeholder-content svg {
    color: var(--text-muted);
    margin-bottom: 1rem;
  }

  .placeholder-content h3 {
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }

  .placeholder-content p {
    margin-bottom: 1.5rem;
    color: var(--text-secondary);
  }

  .storybook-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
  }

  .storybook-actions .code-block {
    background: var(--bg-dark);
    color: var(--text-dark);
    padding: 1rem;
    border-radius: var(--radius-md);
    margin: 1rem 0;
    font-family: var(--font-mono);
    font-size: 0.875rem;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @media (max-width: 768px) {
    .storybook-header {
      flex-direction: column;
      gap: 1rem;
      align-items: stretch;
    }

    .storybook-controls {
      justify-content: center;
    }

    .storybook-status {
      justify-content: center;
    }
  }
`;
document.head.appendChild(storybookStyle);
