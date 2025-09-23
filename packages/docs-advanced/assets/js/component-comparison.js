// Nostromo UI Advanced Documentation - Component Comparison

class ComponentComparison {
  constructor() {
    this.comparisons = new Map();
    this.init();
  }

  init() {
    this.setupComparisonContainers();
  }

  setupComparisonContainers() {
    const containers = document.querySelectorAll('.component-comparison');
    containers.forEach(container => {
      this.createComparison(container);
    });
  }

  createComparison(container) {
    const comparisonId = container.getAttribute('data-comparison-id') || 'comparison-' + Date.now();
    const components = this.parseComponents(container.getAttribute('data-components') || '[]');
    
    // Create comparison HTML structure
    container.innerHTML = `
      <div class="comparison-header">
        <h3>Component Comparison</h3>
        <div class="comparison-controls">
          <button class="comparison-btn" data-action="add-component">Add Component</button>
          <button class="comparison-btn" data-action="reset">Reset</button>
          <button class="comparison-btn" data-action="export">Export</button>
        </div>
      </div>
      <div class="comparison-content">
        <div class="comparison-sidebar">
          <div class="component-selector">
            <h4>Select Components</h4>
            <div class="component-list">
              ${this.generateComponentList()}
            </div>
          </div>
        </div>
        <div class="comparison-main">
          <div class="comparison-grid">
            ${this.generateComparisonGrid(components)}
          </div>
        </div>
      </div>
    `;

    // Store comparison reference
    this.comparisons.set(comparisonId, {
      container,
      components: components,
      selectedComponents: components.slice(0, 2) // Default to first 2 components
    });

    // Setup event listeners
    this.setupComparisonEvents(container, comparisonId);
    
    // Initial render
    this.renderComparison(comparisonId);
  }

  generateComponentList() {
    const components = [
      { name: 'Button', category: 'Core', description: 'Interactive buttons with variants' },
      { name: 'Input', category: 'Core', description: 'Form input fields' },
      { name: 'Badge', category: 'Core', description: 'Status indicators' },
      { name: 'Card', category: 'Core', description: 'Content containers' },
      { name: 'Avatar', category: 'Core', description: 'User profile images' },
      { name: 'Tabs', category: 'Core', description: 'Tab navigation' },
      { name: 'Select', category: 'Core', description: 'Dropdown selects' },
      { name: 'Dialog', category: 'Core', description: 'Modal dialogs' },
      { name: 'Label', category: 'Core', description: 'Form labels' },
      { name: 'HelperText', category: 'Core', description: 'Helper text' },
      { name: 'ErrorMessage', category: 'Core', description: 'Error messages' },
      { name: 'Hero', category: 'Marketing', description: 'Hero sections' },
      { name: 'Testimonials', category: 'Marketing', description: 'Customer testimonials' },
      { name: 'Features', category: 'Marketing', description: 'Feature showcases' },
      { name: 'Pricing', category: 'Marketing', description: 'Pricing tables' }
    ];

    return components.map(component => `
      <div class="component-item" data-component="${component.name}">
        <input type="checkbox" id="comp-${component.name}" class="component-checkbox">
        <label for="comp-${component.name}" class="component-label">
          <div class="component-info">
            <span class="component-name">${component.name}</span>
            <span class="component-category">${component.category}</span>
          </div>
          <p class="component-description">${component.description}</p>
        </label>
      </div>
    `).join('');
  }

  generateComparisonGrid(components) {
    if (components.length === 0) {
      return `
        <div class="comparison-empty">
          <h4>No components selected</h4>
          <p>Select components from the sidebar to compare them side by side.</p>
        </div>
      `;
    }

    return components.map(component => `
      <div class="comparison-item" data-component="${component.name}">
        <div class="comparison-item-header">
          <h4>${component.name}</h4>
          <button class="remove-btn" data-action="remove" data-component="${component.name}">×</button>
        </div>
        <div class="comparison-item-content">
          <div class="component-preview">
            <!-- Component will be rendered here -->
          </div>
          <div class="component-details">
            <div class="detail-section">
              <h5>Props</h5>
              <div class="props-list">
                ${this.generatePropsList(component.name)}
              </div>
            </div>
            <div class="detail-section">
              <h5>Variants</h5>
              <div class="variants-list">
                ${this.generateVariantsList(component.name)}
              </div>
            </div>
            <div class="detail-section">
              <h5>Usage</h5>
              <div class="usage-example">
                <pre><code>${this.generateUsageExample(component.name)}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  generatePropsList(componentName) {
    const propsMap = {
      'Button': ['variant', 'size', 'disabled', 'loading', 'onClick'],
      'Input': ['type', 'placeholder', 'value', 'onChange', 'disabled', 'error'],
      'Badge': ['variant', 'size', 'children'],
      'Card': ['variant', 'children'],
      'Avatar': ['src', 'alt', 'size', 'fallback'],
      'Tabs': ['defaultValue', 'onValueChange', 'children'],
      'Select': ['value', 'onValueChange', 'placeholder', 'disabled'],
      'Dialog': ['open', 'onOpenChange', 'children'],
      'Label': ['htmlFor', 'children'],
      'HelperText': ['children', 'variant'],
      'ErrorMessage': ['children', 'variant'],
      'Hero': ['title', 'subtitle', 'variant', 'size'],
      'Testimonials': ['testimonials', 'variant', 'size'],
      'Features': ['features', 'variant', 'size'],
      'Pricing': ['plans', 'variant', 'size']
    };

    const props = propsMap[componentName] || [];
    return props.map(prop => `
      <div class="prop-item">
        <span class="prop-name">${prop}</span>
        <span class="prop-type">string | boolean | function</span>
      </div>
    `).join('');
  }

  generateVariantsList(componentName) {
    const variantsMap = {
      'Button': ['primary', 'secondary', 'outline', 'ghost'],
      'Input': ['default', 'error', 'disabled'],
      'Badge': ['default', 'primary', 'success', 'warning', 'error'],
      'Card': ['default', 'elevated', 'outlined'],
      'Avatar': ['sm', 'md', 'lg', 'xl'],
      'Tabs': ['default', 'pills', 'underline'],
      'Select': ['default', 'error', 'disabled'],
      'Dialog': ['default', 'fullscreen', 'sheet'],
      'Label': ['default', 'required', 'optional'],
      'HelperText': ['default', 'error', 'success'],
      'ErrorMessage': ['default', 'inline', 'block'],
      'Hero': ['default', 'centered', 'split'],
      'Testimonials': ['default', 'carousel', 'grid'],
      'Features': ['default', 'grid', 'list'],
      'Pricing': ['default', 'highlighted', 'minimal']
    };

    const variants = variantsMap[componentName] || [];
    return variants.map(variant => `
      <span class="variant-tag">${variant}</span>
    `).join('');
  }

  generateUsageExample(componentName) {
    const examples = {
      'Button': `<Button variant="primary" size="md">
  Click me
</Button>`,
      'Input': `<Input 
  type="text" 
  placeholder="Enter text..."
  onChange={handleChange}
/>`,
      'Badge': `<Badge variant="primary" size="md">
  New
</Badge>`,
      'Card': `<Card variant="default">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>`,
      'Avatar': `<Avatar 
  src="/user.jpg" 
  alt="User" 
  size="md"
/>`,
      'Tabs': `<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
</Tabs>`,
      'Select': `<Select 
  value={value} 
  onValueChange={setValue}
>
  <SelectItem value="option1">Option 1</SelectItem>
</Select>`,
      'Dialog': `<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogTitle>Dialog Title</DialogTitle>
    <DialogDescription>Dialog description</DialogDescription>
  </DialogContent>
</Dialog>`,
      'Label': `<Label htmlFor="input-id">
  Label Text
</Label>`,
      'HelperText': `<HelperText variant="default">
  This is helper text
</HelperText>`,
      'ErrorMessage': `<ErrorMessage variant="default">
  This is an error message
</ErrorMessage>`,
      'Hero': `<Hero 
  title="Welcome to Nostromo"
  subtitle="Build amazing interfaces"
  variant="default"
/>`,
      'Testimonials': `<Testimonials 
  testimonials={testimonialData}
  variant="default"
/>`,
      'Features': `<Features 
  features={featureData}
  variant="grid"
/>`,
      'Pricing': `<Pricing 
  plans={pricingPlans}
  variant="default"
/>`
    };

    return examples[componentName] || `<${componentName} />`;
  }

  setupComparisonEvents(container, comparisonId) {
    const comparison = this.comparisons.get(comparisonId);
    
    // Component selection checkboxes
    container.querySelectorAll('.component-checkbox').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.updateSelectedComponents(comparisonId);
      });
    });

    // Control buttons
    container.querySelectorAll('.comparison-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        this.handleComparisonAction(comparisonId, action);
      });
    });

    // Remove buttons
    container.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const componentName = btn.getAttribute('data-component');
        this.removeComponent(comparisonId, componentName);
      });
    });
  }

  updateSelectedComponents(comparisonId) {
    const comparison = this.comparisons.get(comparisonId);
    if (!comparison) return;

    const checkedBoxes = comparison.container.querySelectorAll('.component-checkbox:checked');
    const selectedComponents = Array.from(checkedBoxes).map(checkbox => {
      const componentName = checkbox.closest('.component-item').getAttribute('data-component');
      return {
        name: componentName,
        category: this.getComponentCategory(componentName),
        description: this.getComponentDescription(componentName)
      };
    });

    comparison.selectedComponents = selectedComponents;
    this.renderComparison(comparisonId);
  }

  getComponentCategory(componentName) {
    const coreComponents = ['Button', 'Input', 'Badge', 'Card', 'Avatar', 'Tabs', 'Select', 'Dialog', 'Label', 'HelperText', 'ErrorMessage'];
    return coreComponents.includes(componentName) ? 'Core' : 'Marketing';
  }

  getComponentDescription(componentName) {
    const descriptions = {
      'Button': 'Interactive buttons with variants',
      'Input': 'Form input fields',
      'Badge': 'Status indicators',
      'Card': 'Content containers',
      'Avatar': 'User profile images',
      'Tabs': 'Tab navigation',
      'Select': 'Dropdown selects',
      'Dialog': 'Modal dialogs',
      'Label': 'Form labels',
      'HelperText': 'Helper text',
      'ErrorMessage': 'Error messages',
      'Hero': 'Hero sections',
      'Testimonials': 'Customer testimonials',
      'Features': 'Feature showcases',
      'Pricing': 'Pricing tables'
    };
    return descriptions[componentName] || 'Component description';
  }

  handleComparisonAction(comparisonId, action) {
    const comparison = this.comparisons.get(comparisonId);
    if (!comparison) return;

    switch (action) {
      case 'add-component':
        this.showAddComponentModal(comparisonId);
        break;
      case 'reset':
        this.resetComparison(comparisonId);
        break;
      case 'export':
        this.exportComparison(comparisonId);
        break;
    }
  }

  showAddComponentModal(comparisonId) {
    // Simple modal implementation
    const modal = document.createElement('div');
    modal.className = 'comparison-modal';
    modal.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Add Component to Comparison</h3>
            <button class="modal-close">×</button>
          </div>
          <div class="modal-body">
            <p>Select components from the sidebar to add them to the comparison.</p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Close modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
      modal.remove();
    });

    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        modal.remove();
      }
    });
  }

  resetComparison(comparisonId) {
    const comparison = this.comparisons.get(comparisonId);
    if (!comparison) return;

    // Uncheck all checkboxes
    comparison.container.querySelectorAll('.component-checkbox').forEach(checkbox => {
      checkbox.checked = false;
    });

    comparison.selectedComponents = [];
    this.renderComparison(comparisonId);
  }

  exportComparison(comparisonId) {
    const comparison = this.comparisons.get(comparisonId);
    if (!comparison) return;

    const exportData = {
      components: comparison.selectedComponents,
      timestamp: new Date().toISOString(),
      comparison: 'Nostromo UI Component Comparison'
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nostromo-component-comparison.json';
    link.click();
    
    URL.revokeObjectURL(url);
  }

  removeComponent(comparisonId, componentName) {
    const comparison = this.comparisons.get(comparisonId);
    if (!comparison) return;

    // Uncheck the checkbox
    const checkbox = comparison.container.querySelector(`#comp-${componentName}`);
    if (checkbox) {
      checkbox.checked = false;
    }

    // Remove from selected components
    comparison.selectedComponents = comparison.selectedComponents.filter(
      comp => comp.name !== componentName
    );

    this.renderComparison(comparisonId);
  }

  renderComparison(comparisonId) {
    const comparison = this.comparisons.get(comparisonId);
    if (!comparison) return;

    const grid = comparison.container.querySelector('.comparison-grid');
    if (!grid) return;

    grid.innerHTML = this.generateComparisonGrid(comparison.selectedComponents);
    
    // Re-setup remove button events
    comparison.container.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const componentName = btn.getAttribute('data-component');
        this.removeComponent(comparisonId, componentName);
      });
    });
  }

  parseComponents(componentsString) {
    try {
      return JSON.parse(componentsString);
    } catch (error) {
      console.warn('Invalid components JSON:', componentsString);
      return [];
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.componentComparison = new ComponentComparison();
});

// Export for global access
window.ComponentComparison = ComponentComparison;
