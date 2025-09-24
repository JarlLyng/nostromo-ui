#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DocsBuilder {
  constructor() {
    this.config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
    this.templatePath = path.join(__dirname, '../templates');
    this.outputPath = path.join(__dirname, '..');
    this.componentsPath = path.join(this.outputPath, 'components');
    this.marketingPath = path.join(this.outputPath, 'components/marketing');
  }

  async build() {
    console.log('🚀 Building Nostromo UI Documentation...');
    
    try {
      await this.buildComponents();
      await this.buildMarketingComponents();
      await this.buildGettingStarted();
      await this.buildIndex();
      await this.generateNavigation();
      
      console.log('✅ Documentation build complete!');
    } catch (error) {
      console.error('❌ Build failed:', error);
      process.exit(1);
    }
  }

  async buildComponents() {
    console.log('📦 Building core components...');
    
    for (const component of this.config.components.core) {
      await this.buildComponent(component, 'core');
    }
  }

  async buildMarketingComponents() {
    console.log('📦 Building marketing components...');
    
    for (const component of this.config.components.marketing) {
      await this.buildComponent(component, 'marketing');
    }
  }

  async buildComponent(component, type) {
    const templatePath = path.join(this.templatePath, 'base.html');
    const template = fs.readFileSync(templatePath, 'utf8');
    
    // Determine CSS path based on component location
    const cssPath = type === 'marketing' ? '../../..' : '../..';
    
    // Load component content
    const contentPath = path.join(this.outputPath, 'components', component.file);
    let content = '';
    
    if (fs.existsSync(contentPath)) {
      const fullContent = fs.readFileSync(contentPath, 'utf8');
      // Extract content between <main class="content"> and </main>
      const contentMatch = fullContent.match(/<main class="content">([\s\S]*?)<\/main>/);
      if (contentMatch) {
        content = contentMatch[1]
          .replace(/<div class="container">\s*<div class="component-page">/, '')
          .replace(/<\/div>\s*<\/div>\s*<\/main>/, '');
      }
    }
    
    // Generate default content if empty
    if (!content || content.trim() === '') {
      content = this.generateDefaultContent(component);
    }
    
    // Replace template variables
    let html = template
      .replace(/\{\{title\}\}/g, component.name)
      .replace(/\{\{cssPath\}\}/g, cssPath)
      .replace(/\{\{content\}\}/g, content);
    
    // Fix navigation links to be consistent
    html = this.fixNavigationLinks(html, type);
    
    // Write to output
    const outputPath = path.join(this.outputPath, 'components', component.file);
    fs.writeFileSync(outputPath, html);
    
    console.log(`  ✅ ${component.name}`);
  }

  async buildGettingStarted() {
    console.log('📚 Building getting started pages...');
    
    for (const page of this.config.navigation.gettingStarted) {
      const templatePath = path.join(this.templatePath, 'base.html');
      const template = fs.readFileSync(templatePath, 'utf8');
      
      const cssPath = '../..';
      
      // Load page content
      const contentPath = path.join(this.outputPath, page.file);
      let content = '';
      
      if (fs.existsSync(contentPath)) {
        const fullContent = fs.readFileSync(contentPath, 'utf8');
        const contentMatch = fullContent.match(/<main class="content">([\s\S]*?)<\/main>/);
        if (contentMatch) {
          content = contentMatch[1]
            .replace(/<div class="container">\s*<div class="component-page">/, '')
            .replace(/<\/div>\s*<\/div>\s*<\/main>/, '');
        }
      }
      
      let html = template
        .replace(/\{\{title\}\}/g, page.name)
        .replace(/\{\{cssPath\}\}/g, cssPath)
        .replace(/\{\{content\}\}/g, content);
      
      // Fix navigation links for getting started pages
      html = this.fixNavigationLinks(html, 'getting-started');
      
      const outputPath = path.join(this.outputPath, page.file);
      fs.writeFileSync(outputPath, html);
      
      console.log(`  ✅ ${page.name}`);
    }
  }

  async buildIndex() {
    console.log('🏠 Building index page...');
    
    const templatePath = path.join(this.templatePath, 'base.html');
    const template = fs.readFileSync(templatePath, 'utf8');
    
    const cssPath = '.';
    
    // Load index content
    const contentPath = path.join(this.outputPath, 'index.html');
    let content = '';
    
    if (fs.existsSync(contentPath)) {
      const fullContent = fs.readFileSync(contentPath, 'utf8');
      const contentMatch = fullContent.match(/<main class="content">([\s\S]*?)<\/main>/);
      if (contentMatch) {
        content = contentMatch[1]
          .replace(/<div class="container">\s*<div class="component-page">/, '')
          .replace(/<\/div>\s*<\/div>\s*<\/main>/, '');
      }
    }
    
    let html = template
      .replace(/\{\{title\}\}/g, 'Nostromo UI - Advanced Documentation')
      .replace(/\{\{cssPath\}\}/g, cssPath)
      .replace(/\{\{content\}\}/g, content);
    
    // Fix navigation links for index page
    html = this.fixNavigationLinks(html, 'index');
    
    fs.writeFileSync(contentPath, html);
    
    console.log('  ✅ Index page');
  }

  generateDefaultContent(component) {
    // Generate specific content based on component type
    if (component.name === 'Table') {
      return this.generateTableContent();
    } else if (component.name === 'Toast') {
      return this.generateToastContent();
    } else if (component.name === 'Button') {
      return this.generateButtonContent();
    } else if (component.name === 'Input') {
      return this.generateInputContent();
    } else if (component.name === 'Card') {
      return this.generateCardContent();
    } else if (component.name === 'Dialog') {
      return this.generateDialogContent();
    } else if (component.name === 'Badge') {
      return this.generateBadgeContent();
    } else if (component.name === 'Avatar') {
      return this.generateAvatarContent();
    } else if (component.name === 'Tabs') {
      return this.generateTabsContent();
    } else if (component.name === 'Select') {
      return this.generateSelectContent();
    } else if (component.name === 'Label') {
      return this.generateLabelContent();
    } else if (component.name === 'HelperText') {
      return this.generateHelperTextContent();
    } else if (component.name === 'ErrorMessage') {
      return this.generateErrorMessageContent();
    } else if (component.name === 'Icon') {
      return this.generateIconContent();
    } else if (component.name === 'Tooltip') {
      return this.generateTooltipContent();
    } else if (component.name === 'Accordion') {
      return this.generateAccordionContent();
    } else if (component.name === 'Skeleton') {
      return this.generateSkeletonContent();
    } else if (component.name === 'Progress') {
      return this.generateProgressContent();
    } else if (component.name === 'Checkbox') {
      return this.generateCheckboxContent();
    } else if (component.name === 'RadioGroup') {
      return this.generateRadioGroupContent();
    } else if (component.name === 'Switch') {
      return this.generateSwitchContent();
    } else if (component.name === 'Textarea') {
      return this.generateTextareaContent();
    } else if (component.name === 'Alert') {
      return this.generateAlertContent();
    } else if (component.name === 'Breadcrumb') {
      return this.generateBreadcrumbContent();
    } else if (component.name === 'Pagination') {
      return this.generatePaginationContent();
    } else if (component.name === 'Separator') {
      return this.generateSeparatorContent();
    } else {
      return this.generateGenericContent(component);
    }
  }

  generateTableContent() {
    return `
      <!-- Page Header -->
      <div class="mb-8">
        <h1>Table</h1>
        <p>Data tables with sorting, filtering, and responsive design. Built for accessibility and performance.</p>
      </div>

      <!-- Installation -->
      <section class="mb-8">
        <h2>Installation</h2>
        <div class="code-block">
          <pre><code>import { Table } from '@nostromo/ui-core'</code></pre>
        </div>
      </section>

      <!-- Live Preview -->
      <section class="mb-8">
        <h2>Live Preview</h2>
        <div class="component-preview">
          <div class="preview-container">
            <div class="live-component" data-component="Table" data-props='{"data":[{"name":"John Doe","email":"john@example.com","role":"Admin"},{"name":"Jane Smith","email":"jane@example.com","role":"User"}],"columns":[{"key":"name","label":"Name"},{"key":"email","label":"Email"},{"key":"role","label":"Role"}],"size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Basic Usage -->
      <section class="mb-8">
        <h2>Basic Usage</h2>
        <div class="code-block">
          <pre><code>import { Table } from '@nostromo/ui-core'

export default function App() {
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]

  return (
    &lt;Table&gt;
      &lt;Table.Header&gt;
        &lt;Table.Row&gt;
          &lt;Table.Head&gt;Name&lt;/Table.Head&gt;
          &lt;Table.Head&gt;Email&lt;/Table.Head&gt;
        &lt;/Table.Row&gt;
      &lt;/Table.Header&gt;
      &lt;Table.Body&gt;
        {data.map((user) =&gt; (
          &lt;Table.Row key={user.id}&gt;
            &lt;Table.Cell&gt;{user.name}&lt;/Table.Cell&gt;
            &lt;Table.Cell&gt;{user.email}&lt;/Table.Cell&gt;
          &lt;/Table.Row&gt;
        ))}
      &lt;/Table.Body&gt;
    &lt;/Table&gt;
  )
}</code></pre>
        </div>
        
        <!-- Live Example -->
        <div class="component-example">
          <div class="example-preview">
            <div class="live-component" data-component="Table" data-props='{"data":[{"id":1,"name":"Product A","price":"$29.99","status":"Active"}],"columns":[{"key":"name","label":"Product"},{"key":"price","label":"Price"},{"key":"status","label":"Status"}],"size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Variants -->
      <section class="mb-8">
        <h2>Variants</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 border rounded-lg">
            <h3 class="font-semibold mb-2">Default</h3>
            <p class="text-sm text-gray-600">Standard table with clean borders</p>
          </div>
          <div class="p-4 border rounded-lg">
            <h3 class="font-semibold mb-2">Bordered</h3>
            <p class="text-sm text-gray-600">Table with enhanced borders</p>
          </div>
          <div class="p-4 border rounded-lg">
            <h3 class="font-semibold mb-2">Striped</h3>
            <p class="text-sm text-gray-600">Alternating row colors</p>
          </div>
          <div class="p-4 border rounded-lg">
            <h3 class="font-semibold mb-2">Hover</h3>
            <p class="text-sm text-gray-600">Row hover effects</p>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="mb-8">
        <h2>Features</h2>
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Responsive:</strong> Automatically adapts to different screen sizes</li>
          <li><strong>Accessible:</strong> Full keyboard navigation and screen reader support</li>
          <li><strong>Sortable:</strong> Built-in sorting functionality</li>
          <li><strong>Filterable:</strong> Easy data filtering</li>
          <li><strong>Customizable:</strong> Extensive styling options</li>
        </ul>
      </section>

      <!-- API Reference -->
      <section class="mb-8">
        <h2>API Reference</h2>
        <div class="space-y-4">
          <div class="border rounded-lg p-4">
            <h3 class="font-semibold mb-2">Table Props</h3>
            <div class="space-y-2 text-sm">
              <div><code class="bg-gray-100 px-2 py-1 rounded">variant</code> - Table style variant</div>
              <div><code class="bg-gray-100 px-2 py-1 rounded">size</code> - Table size (sm, md, lg)</div>
              <div><code class="bg-gray-100 px-2 py-1 rounded">striped</code> - Alternating row colors</div>
              <div><code class="bg-gray-100 px-2 py-1 rounded">hover</code> - Row hover effects</div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  generateToastContent() {
    return `
      <!-- Page Header -->
      <div class="mb-8">
        <h1>Toast</h1>
        <p>Notification toasts with multiple variants and positioning. Perfect for showing success, error, warning, and info messages.</p>
      </div>

      <!-- Installation -->
      <section class="mb-8">
        <h2>Installation</h2>
        <div class="code-block">
          <pre><code>import { Toast, ToastProvider, useToast } from '@nostromo/ui-core'</code></pre>
        </div>
      </section>

      <!-- Live Preview -->
      <section class="mb-8">
        <h2>Live Preview</h2>
        <div class="component-preview">
          <div class="preview-container">
            <div class="live-component" data-component="Toast" data-props='{"title":"Success!","description":"Your action was completed successfully.","variant":"success","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Basic Usage -->
      <section class="mb-8">
        <h2>Basic Usage</h2>
        <div class="code-block">
          <pre><code>import { ToastProvider, useToast } from '@nostromo/ui-core'

export default function App() {
  return (
    &lt;ToastProvider&gt;
      &lt;MyComponent /&gt;
    &lt;/ToastProvider&gt;
  )
}

function MyComponent() {
  const { toast } = useToast()

  const showToast = () => {
    toast({
      title: "Success!",
      description: "Your action was completed successfully.",
      variant: "success"
    })
  }

  return (
    &lt;button onClick={showToast}&gt;
      Show Toast
    &lt;/button&gt;
  )
}</code></pre>
        </div>
        
        <!-- Live Example -->
        <div class="component-example">
          <div class="example-preview">
            <div class="live-component" data-component="Toast" data-props='{"title":"Basic Toast","description":"This is a basic toast notification.","variant":"default","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Variants -->
      <section class="mb-8">
        <h2>Variants</h2>
        <div class="space-y-4">
          <div class="live-component" data-component="Toast" data-props='{"title":"Success Toast","description":"Your action was completed successfully.","variant":"success","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Toast" data-props='{"title":"Error Toast","description":"Something went wrong. Please try again.","variant":"error","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Toast" data-props='{"title":"Warning Toast","description":"Please review your settings before proceeding.","variant":"warning","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Toast" data-props='{"title":"Info Toast","description":"Here is some important information for you.","variant":"info","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>

      <!-- Positioning -->
      <section class="mb-8">
        <h2>Positioning</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 border rounded-lg">
            <h3 class="font-semibold mb-2">Top</h3>
            <p class="text-sm text-gray-600">Top-left, top-center, top-right</p>
          </div>
          <div class="p-4 border rounded-lg">
            <h3 class="font-semibold mb-2">Bottom</h3>
            <p class="text-sm text-gray-600">Bottom-left, bottom-center, bottom-right</p>
          </div>
          <div class="p-4 border rounded-lg">
            <h3 class="font-semibold mb-2">Center</h3>
            <p class="text-sm text-gray-600">Center of the screen</p>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="mb-8">
        <h2>Features</h2>
        <ul class="list-disc list-inside space-y-2">
          <li><strong>Auto-dismiss:</strong> Configurable auto-dismiss duration</li>
          <li><strong>Manual dismiss:</strong> Close button for manual dismissal</li>
          <li><strong>Stacking:</strong> Multiple toasts stack neatly</li>
          <li><strong>Animations:</strong> Smooth enter and exit animations</li>
          <li><strong>Accessible:</strong> Full keyboard and screen reader support</li>
          <li><strong>Swipe to dismiss:</strong> Touch-friendly swipe gestures</li>
        </ul>
      </section>

      <!-- API Reference -->
      <section class="mb-8">
        <h2>API Reference</h2>
        <div class="space-y-4">
          <div class="border rounded-lg p-4">
            <h3 class="font-semibold mb-2">useToast Hook</h3>
            <div class="space-y-2 text-sm">
              <div><code class="bg-gray-100 px-2 py-1 rounded">toast(options)</code> - Show a toast notification</div>
              <div><code class="bg-gray-100 px-2 py-1 rounded">dismiss(toastId)</code> - Dismiss a specific toast</div>
              <div><code class="bg-gray-100 px-2 py-1 rounded">dismissAll()</code> - Dismiss all toasts</div>
            </div>
          </div>
          <div class="border rounded-lg p-4">
            <h3 class="font-semibold mb-2">Toast Options</h3>
            <div class="space-y-2 text-sm">
              <div><code class="bg-gray-100 px-2 py-1 rounded">title</code> - Toast title</div>
              <div><code class="bg-gray-100 px-2 py-1 rounded">description</code> - Toast description</div>
              <div><code class="bg-gray-100 px-2 py-1 rounded">variant</code> - Toast variant (success, error, warning, info)</div>
              <div><code class="bg-gray-100 px-2 py-1 rounded">duration</code> - Auto-dismiss duration in ms</div>
              <div><code class="bg-gray-100 px-2 py-1 rounded">position</code> - Toast position</div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  generateGenericContent(component) {
    return `
      <!-- Page Header -->
      <div class="mb-8">
        <h1>${component.name}</h1>
        <p>A ${component.name.toLowerCase()} component with multiple variants and configurations.</p>
      </div>

      <!-- Installation -->
      <section class="mb-8">
        <h2>Installation</h2>
        <div class="code-block">
          <pre><code>import { ${component.name} } from '@nostromo/ui-core'</code></pre>
        </div>
      </section>

      <!-- Basic Usage -->
      <section class="mb-8">
        <h2>Basic Usage</h2>
        <div class="code-block">
          <pre><code>&lt;${component.name} /&gt;</code></pre>
        </div>
      </section>

      <!-- Variants -->
      <section class="mb-8">
        <h2>Variants</h2>
        <p>This component supports multiple variants and configurations.</p>
      </section>

      <!-- API Reference -->
      <section class="mb-8">
        <h2>API Reference</h2>
        <p>Component props and configuration options will be documented here.</p>
      </section>
    `;
  }

  generateButtonContent() {
    return `
      <!-- Page Header -->
      <div class="mb-8">
        <h1>Button</h1>
        <p>Interactive buttons with multiple variants, sizes, and states. Built for accessibility and flexibility.</p>
      </div>

      <!-- Live Preview -->
      <section class="mb-8">
        <h2>Live Preview</h2>
        <div class="component-preview">
          <div class="live-component" data-component="Button" data-props='{"children":"Click me"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>

      <!-- Installation -->
      <section class="mb-8">
        <h2>Installation</h2>
        <div class="code-block">
          <pre><code>import { Button } from '@nostromo/ui-core'</code></pre>
        </div>
      </section>

      <!-- Basic Usage -->
      <section class="mb-8">
        <h2>Basic Usage</h2>
        <div class="code-block">
          <pre><code>&lt;Button&gt;Click me&lt;/Button&gt;</code></pre>
        </div>
        
        <!-- Live Example -->
        <div class="component-example">
          <div class="example-preview">
            <div class="live-component" data-component="Button" data-props='{"children":"Basic Button", "variant":"primary", "size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Variants -->
      <section class="mb-8">
        <h2>Variants</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Primary Button -->
          <div class="component-example">
            <h3>Primary</h3>
            <div class="live-component" data-component="Button" data-props='{"children":"Primary Button", "variant":"primary", "size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
          
          <!-- Secondary Button -->
          <div class="component-example">
            <h3>Secondary</h3>
            <div class="live-component" data-component="Button" data-props='{"children":"Secondary Button", "variant":"secondary", "size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
          
          <!-- Ghost Button -->
          <div class="component-example">
            <h3>Ghost</h3>
            <div class="live-component" data-component="Button" data-props='{"children":"Ghost Button", "variant":"ghost", "size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
          
          <!-- Destructive Button -->
          <div class="component-example">
            <h3>Destructive</h3>
            <div class="live-component" data-component="Button" data-props='{"children":"Destructive Button", "variant":"destructive", "size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>
      
      <!-- Sizes -->
      <section class="mb-8">
        <h2>Sizes</h2>
        <div class="flex gap-4 items-center">
          <div class="live-component" data-component="Button" data-props='{"children":"Small", "variant":"primary", "size":"sm"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Button" data-props='{"children":"Medium", "variant":"primary", "size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Button" data-props='{"children":"Large", "variant":"primary", "size":"lg"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>
      
      <!-- States -->
      <section class="mb-8">
        <h2>States</h2>
        <div class="flex gap-4 items-center">
          <div class="live-component" data-component="Button" data-props='{"children":"Normal", "variant":"primary", "size":"md", "disabled":false}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Button" data-props='{"children":"Disabled", "variant":"primary", "size":"md", "disabled":true}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>

      <!-- API Reference -->
      <section class="mb-8">
        <h2>API Reference</h2>
        <div class="space-y-4">
          <div class="border rounded-lg p-4">
            <h3 class="font-semibold mb-2">Button Props</h3>
            <div class="space-y-2 text-sm">
              <div><code class="bg-gray-100 px-2 py-1 rounded">variant</code> - Button style variant</div>
              <div><code class="bg-gray-100 px-2 py-1 rounded">size</code> - Button size (sm, md, lg)</div>
              <div><code class="bg-gray-100 px-2 py-1 rounded">disabled</code> - Disabled state</div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  generateInputContent() {
    return `
      <!-- Page Header -->
      <div class="mb-8">
        <h1>Input</h1>
        <p>Form input fields with validation states and accessibility features.</p>
      </div>

      <!-- Live Preview -->
      <section class="mb-8">
        <h2>Live Preview</h2>
        <div class="component-preview">
          <div class="preview-container">
            <div class="live-component" data-component="Input" data-props='{"placeholder":"Enter text...", "type":"text", "size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Installation -->
      <section class="mb-8">
        <h2>Installation</h2>
        <div class="code-block">
          <pre><code>import { Input } from '@nostromo/ui-core'</code></pre>
        </div>
      </section>

      <!-- Basic Usage -->
      <section class="mb-8">
        <h2>Basic Usage</h2>
        <div class="code-block">
          <pre><code>&lt;Input placeholder="Enter text..." /&gt;</code></pre>
        </div>
        
        <!-- Live Example -->
        <div class="component-example">
          <div class="example-preview">
            <div class="live-component" data-component="Input" data-props='{"placeholder":"Enter text...", "type":"text", "size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Input Types -->
      <section class="mb-8">
        <h2>Input Types</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Text Input -->
          <div class="component-example">
            <h3>Text</h3>
            <div class="live-component" data-component="Input" data-props='{"placeholder":"Enter text...", "type":"text", "size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
          
          <!-- Email Input -->
          <div class="component-example">
            <h3>Email</h3>
            <div class="live-component" data-component="Input" data-props='{"placeholder":"Enter email...", "type":"email", "size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
          
          <!-- Password Input -->
          <div class="component-example">
            <h3>Password</h3>
            <div class="live-component" data-component="Input" data-props='{"placeholder":"Enter password...", "type":"password", "size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
          
          <!-- Number Input -->
          <div class="component-example">
            <h3>Number</h3>
            <div class="live-component" data-component="Input" data-props='{"placeholder":"Enter number...", "type":"number", "size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Sizes -->
      <section class="mb-8">
        <h2>Sizes</h2>
        <div class="space-y-4">
          <div class="live-component" data-component="Input" data-props='{"placeholder":"Small input", "type":"text", "size":"sm"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Input" data-props='{"placeholder":"Medium input", "type":"text", "size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Input" data-props='{"placeholder":"Large input", "type":"text", "size":"lg"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>

      <!-- States -->
      <section class="mb-8">
        <h2>States</h2>
        <div class="space-y-4">
          <div class="live-component" data-component="Input" data-props='{"placeholder":"Normal input", "type":"text", "size":"md", "error":false, "disabled":false}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Input" data-props='{"placeholder":"Error input", "type":"text", "size":"md", "error":true, "disabled":false}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Input" data-props='{"placeholder":"Success input", "type":"text", "size":"md", "variant":"success", "disabled":false}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Input" data-props='{"placeholder":"Disabled input", "type":"text", "size":"md", "error":false, "disabled":true}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>
    `;
  }

  generateCardContent() {
    return `
      <!-- Page Header -->
      <div class="mb-8">
        <h1>Card</h1>
        <p>Flexible content containers with multiple variants and layouts.</p>
      </div>

      <!-- Live Preview -->
      <section class="mb-8">
        <h2>Live Preview</h2>
        <div class="component-preview">
          <div class="preview-container">
            <div class="live-component" data-component="Card" data-props='{"title":"Card Title", "content":"This is a basic card with some content.", "variant":"default", "size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Installation -->
      <section class="mb-8">
        <h2>Installation</h2>
        <div class="code-block">
          <pre><code>import { Card } from '@nostromo/ui-core'</code></pre>
        </div>
      </section>

      <!-- Basic Usage -->
      <section class="mb-8">
        <h2>Basic Usage</h2>
        <div class="code-block">
          <pre><code>&lt;Card&gt;Content here&lt;/Card&gt;</code></pre>
        </div>
        
        <!-- Live Example -->
        <div class="component-example">
          <div class="example-preview">
            <div class="live-component" data-component="Card" data-props='{"title":"Basic Card", "content":"This is a basic card with some content.", "variant":"default", "size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Variants -->
      <section class="mb-8">
        <h2>Variants</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Default Card -->
          <div class="component-example">
            <h3>Default</h3>
            <div class="live-component" data-component="Card" data-props='{"title":"Default Card", "content":"This is a default card with subtle shadow.", "variant":"default", "size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
          
          <!-- Elevated Card -->
          <div class="component-example">
            <h3>Elevated</h3>
            <div class="live-component" data-component="Card" data-props='{"title":"Elevated Card", "content":"This is an elevated card with more shadow.", "variant":"elevated", "size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
          
          <!-- Outlined Card -->
          <div class="component-example">
            <h3>Outlined</h3>
            <div class="live-component" data-component="Card" data-props='{"title":"Outlined Card", "content":"This is an outlined card with border.", "variant":"outlined", "size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
          
          <!-- Card with Image -->
          <div class="component-example">
            <h3>With Image</h3>
            <div class="live-component" data-component="Card" data-props='{"title":"Card with Image", "content":"This card includes an image header.", "variant":"default", "size":"md", "hasImage":true}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Sizes -->
      <section class="mb-8">
        <h2>Sizes</h2>
        <div class="space-y-4">
          <div class="live-component" data-component="Card" data-props='{"title":"Small Card", "content":"This is a small card.", "variant":"default", "size":"sm"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Card" data-props='{"title":"Medium Card", "content":"This is a medium card.", "variant":"default", "size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Card" data-props='{"title":"Large Card", "content":"This is a large card with more content.", "variant":"default", "size":"lg"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>

      <!-- Content Types -->
      <section class="mb-8">
        <h2>Content Types</h2>
        <div class="space-y-4">
          <div class="live-component" data-component="Card" data-props='{"title":"Basic Card", "content":"This is a basic card with just content.", "variant":"default", "size":"md", "hasImage":false, "hasActions":false}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Card" data-props='{"title":"Card with Actions", "content":"This card includes action buttons.", "variant":"default", "size":"md", "hasImage":false, "hasActions":true}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Card" data-props='{"title":"Complete Card", "content":"This card has everything: image, content, and actions.", "variant":"elevated", "size":"md", "hasImage":true, "hasActions":true}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>
    `;
  }

  generateDialogContent() {
    return `
      <!-- Page Header -->
      <div class="mb-8">
        <h1>Dialog</h1>
        <p>Modal dialogs with overlay backgrounds and interactive content.</p>
      </div>

      <!-- Live Preview -->
      <section class="mb-8">
        <h2>Live Preview</h2>
        <div class="component-preview">
          <div class="preview-container">
            <div class="live-component" data-component="Dialog" data-props='{"title":"Dialog Title", "content":"This is a dialog with some content.", "variant":"default", "size":"md", "hasTrigger":true}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Installation -->
      <section class="mb-8">
        <h2>Installation</h2>
        <div class="code-block">
          <pre><code>import { Dialog } from '@nostromo/ui-core'</code></pre>
        </div>
      </section>

      <!-- Basic Usage -->
      <section class="mb-8">
        <h2>Basic Usage</h2>
        <div class="code-block">
          <pre><code>&lt;Dialog&gt;Content here&lt;/Dialog&gt;</code></pre>
        </div>
        
        <!-- Live Example -->
        <div class="component-example">
          <div class="example-preview">
            <div class="live-component" data-component="Dialog" data-props='{"title":"Basic Dialog", "content":"This is a basic dialog with some content.", "variant":"default", "size":"md", "hasTrigger":true}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Variants -->
      <section class="mb-8">
        <h2>Variants</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Default Dialog -->
          <div class="component-example">
            <h3>Default</h3>
            <div class="live-component" data-component="Dialog" data-props='{"title":"Default Dialog", "content":"This is a default dialog with standard styling.", "variant":"default", "size":"md", "hasTrigger":true}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
          
          <!-- Alert Dialog -->
          <div class="component-example">
            <h3>Alert</h3>
            <div class="live-component" data-component="Dialog" data-props='{"title":"Alert Dialog", "content":"This is an alert dialog for important messages.", "variant":"alert", "size":"md", "hasTrigger":true}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
          
          <!-- Confirmation Dialog -->
          <div class="component-example">
            <h3>Confirmation</h3>
            <div class="live-component" data-component="Dialog" data-props='{"title":"Confirm Action", "content":"Are you sure you want to proceed with this action?", "variant":"confirmation", "size":"md", "hasTrigger":true}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
          
          <!-- Without Trigger -->
          <div class="component-example">
            <h3>Without Trigger</h3>
            <div class="live-component" data-component="Dialog" data-props='{"title":"Dialog Without Trigger", "content":"This dialog is shown without a trigger button.", "variant":"default", "size":"md", "hasTrigger":false}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Sizes -->
      <section class="mb-8">
        <h2>Sizes</h2>
        <div class="space-y-4">
          <div class="live-component" data-component="Dialog" data-props='{"title":"Small Dialog", "content":"This is a small dialog.", "variant":"default", "size":"sm", "hasTrigger":true}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Dialog" data-props='{"title":"Medium Dialog", "content":"This is a medium dialog.", "variant":"default", "size":"md", "hasTrigger":true}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Dialog" data-props='{"title":"Large Dialog", "content":"This is a large dialog with more content.", "variant":"default", "size":"lg", "hasTrigger":true}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>

      <!-- Content Types -->
      <section class="mb-8">
        <h2>Content Types</h2>
        <div class="space-y-4">
          <div class="live-component" data-component="Dialog" data-props='{"title":"Simple Dialog", "content":"This is a simple dialog with basic content.", "variant":"default", "size":"md", "hasTrigger":true}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Dialog" data-props='{"title":"Form Dialog", "content":"This dialog contains a form with input fields and validation.", "variant":"default", "size":"md", "hasTrigger":true}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Dialog" data-props='{"title":"Information Dialog", "content":"This dialog provides information and requires user acknowledgment.", "variant":"info", "size":"md", "hasTrigger":true}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>
    `;
  }

  generateBadgeContent() {
    return `
      <!-- Page Header -->
      <div class="mb-8">
        <h1>Badge</h1>
        <p>Small status indicators with multiple colors and sizes.</p>
      </div>

      <!-- Live Preview -->
      <section class="mb-8">
        <h2>Live Preview</h2>
        <div class="component-preview">
          <div class="preview-container">
            <div class="live-component" data-component="Badge" data-props='{"children":"Badge", "color":"blue", "size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Installation -->
      <section class="mb-8">
        <h2>Installation</h2>
        <div class="code-block">
          <pre><code>import { Badge } from '@nostromo/ui-core'</code></pre>
        </div>
      </section>

      <!-- Basic Usage -->
      <section class="mb-8">
        <h2>Basic Usage</h2>
        <div class="code-block">
          <pre><code>&lt;Badge&gt;Badge&lt;/Badge&gt;</code></pre>
        </div>
        
        <!-- Live Example -->
        <div class="component-example">
          <div class="example-preview">
            <div class="live-component" data-component="Badge" data-props='{"children":"Basic Badge", "color":"blue", "size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Colors -->
      <section class="mb-8">
        <h2>Colors</h2>
        <div class="flex flex-wrap gap-2">
          <div class="live-component" data-component="Badge" data-props='{"children":"Blue", "color":"blue", "size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Badge" data-props='{"children":"Green", "color":"green", "size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Badge" data-props='{"children":"Red", "color":"red", "size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Badge" data-props='{"children":"Yellow", "color":"yellow", "size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Badge" data-props='{"children":"Gray", "color":"gray", "size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>

      <!-- Sizes -->
      <section class="mb-8">
        <h2>Sizes</h2>
        <div class="flex flex-wrap gap-2 items-center">
          <div class="live-component" data-component="Badge" data-props='{"children":"Small", "color":"blue", "size":"sm"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Badge" data-props='{"children":"Medium", "color":"blue", "size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Badge" data-props='{"children":"Large", "color":"blue", "size":"lg"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>

      <!-- Variants -->
      <section class="mb-8">
        <h2>Variants</h2>
        <div class="space-y-4">
          <div class="live-component" data-component="Badge" data-props='{"children":"Default Badge", "color":"blue", "size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Badge" data-props='{"children":"Success Badge", "color":"green", "size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Badge" data-props='{"children":"Warning Badge", "color":"yellow", "size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Badge" data-props='{"children":"Error Badge", "color":"red", "size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>
    `;
  }

  generateAvatarContent() {
    return `
      <!-- Page Header -->
      <div class="mb-8">
        <h1>Avatar</h1>
        <p>User profile images with fallback support and multiple sizes.</p>
      </div>

      <!-- Live Preview -->
      <section class="mb-8">
        <h2>Live Preview</h2>
        <div class="component-preview">
          <div class="preview-container">
            <div class="live-component" data-component="Avatar" data-props='{"fallback":"U", "size":"md", "variant":"default"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Installation -->
      <section class="mb-8">
        <h2>Installation</h2>
        <div class="code-block">
          <pre><code>import { Avatar } from '@nostromo/ui-core'</code></pre>
        </div>
      </section>

      <!-- Basic Usage -->
      <section class="mb-8">
        <h2>Basic Usage</h2>
        <div class="code-block">
          <pre><code>&lt;Avatar fallback="U" /&gt;</code></pre>
        </div>
        
        <!-- Live Example -->
        <div class="component-example">
          <div class="example-preview">
            <div class="live-component" data-component="Avatar" data-props='{"fallback":"U", "size":"md", "variant":"default"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Sizes -->
      <section class="mb-8">
        <h2>Sizes</h2>
        <div class="flex flex-wrap gap-4 items-center">
          <div class="live-component" data-component="Avatar" data-props='{"fallback":"S", "size":"sm", "variant":"default"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Avatar" data-props='{"fallback":"M", "size":"md", "variant":"default"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Avatar" data-props='{"fallback":"L", "size":"lg", "variant":"default"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Avatar" data-props='{"fallback":"XL", "size":"xl", "variant":"default"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>

      <!-- Variants -->
      <section class="mb-8">
        <h2>Variants</h2>
        <div class="flex flex-wrap gap-4 items-center">
          <div class="live-component" data-component="Avatar" data-props='{"fallback":"C", "size":"md", "variant":"default"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Avatar" data-props='{"fallback":"R", "size":"md", "variant":"rounded"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Avatar" data-props='{"fallback":"S", "size":"md", "variant":"square"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>

      <!-- With Images -->
      <section class="mb-8">
        <h2>With Images</h2>
        <div class="flex flex-wrap gap-4 items-center">
          <div class="live-component" data-component="Avatar" data-props='{"src":"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", "alt":"User", "fallback":"U", "size":"md", "variant":"default"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Avatar" data-props='{"src":"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", "alt":"User", "fallback":"U", "size":"lg", "variant":"default"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Avatar" data-props='{"src":"", "alt":"User", "fallback":"U", "size":"md", "variant":"default"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>

      <!-- Fallback Examples -->
      <section class="mb-8">
        <h2>Fallback Examples</h2>
        <div class="flex flex-wrap gap-4 items-center">
          <div class="live-component" data-component="Avatar" data-props='{"fallback":"JD", "size":"md", "variant":"default"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Avatar" data-props='{"fallback":"AB", "size":"md", "variant":"default"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Avatar" data-props='{"fallback":"CD", "size":"md", "variant":"default"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Avatar" data-props='{"fallback":"EF", "size":"md", "variant":"default"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>
    `;
  }

  generateTabsContent() {
    return `
      <!-- Page Header -->
      <div class="mb-8">
        <h1>Tabs</h1>
        <p>Navigation tabs with content switching and multiple variants.</p>
      </div>

      <!-- Live Preview -->
      <section class="mb-8">
        <h2>Live Preview</h2>
        <div class="component-preview">
          <div class="preview-container">
            <div class="live-component" data-component="Tabs" data-props='{"tabs":[{"id":"tab1","label":"Overview","content":"This is the overview tab content."},{"id":"tab2","label":"Details","content":"This is the details tab content."},{"id":"tab3","label":"Settings","content":"This is the settings tab content."}],"activeTab":"tab1","variant":"default","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Installation -->
      <section class="mb-8">
        <h2>Installation</h2>
        <div class="code-block">
          <pre><code>import { Tabs } from '@nostromo/ui-core'</code></pre>
        </div>
      </section>

      <!-- Basic Usage -->
      <section class="mb-8">
        <h2>Basic Usage</h2>
        <div class="code-block">
          <pre><code>&lt;Tabs tabs={tabs} activeTab="tab1" /&gt;</code></pre>
        </div>
        
        <!-- Live Example -->
        <div class="component-example">
          <div class="example-preview">
            <div class="live-component" data-component="Tabs" data-props='{"tabs":[{"id":"tab1","label":"Home","content":"Welcome to the home tab."},{"id":"tab2","label":"About","content":"Learn more about us."}],"activeTab":"tab1","variant":"default","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Variants -->
      <section class="mb-8">
        <h2>Variants</h2>
        <div class="space-y-4">
          <div class="live-component" data-component="Tabs" data-props='{"tabs":[{"id":"tab1","label":"Default","content":"This is a default tab style."},{"id":"tab2","label":"Tab 2","content":"Content for tab 2."}],"activeTab":"tab1","variant":"default","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Tabs" data-props='{"tabs":[{"id":"tab1","label":"Pills","content":"This is a pills tab style."},{"id":"tab2","label":"Tab 2","content":"Content for tab 2."}],"activeTab":"tab1","variant":"pills","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Tabs" data-props='{"tabs":[{"id":"tab1","label":"Underline","content":"This is an underline tab style."},{"id":"tab2","label":"Tab 2","content":"Content for tab 2."}],"activeTab":"tab1","variant":"underline","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>

      <!-- Sizes -->
      <section class="mb-8">
        <h2>Sizes</h2>
        <div class="space-y-4">
          <div class="live-component" data-component="Tabs" data-props='{"tabs":[{"id":"tab1","label":"Small","content":"This is a small tab."},{"id":"tab2","label":"Tab 2","content":"Content for tab 2."}],"activeTab":"tab1","variant":"default","size":"sm"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Tabs" data-props='{"tabs":[{"id":"tab1","label":"Medium","content":"This is a medium tab."},{"id":"tab2","label":"Tab 2","content":"Content for tab 2."}],"activeTab":"tab1","variant":"default","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Tabs" data-props='{"tabs":[{"id":"tab1","label":"Large","content":"This is a large tab."},{"id":"tab2","label":"Tab 2","content":"Content for tab 2."}],"activeTab":"tab1","variant":"default","size":"lg"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>
    `;
  }

  generateSelectContent() {
    return `
      <!-- Page Header -->
      <div class="mb-8">
        <h1>Select</h1>
        <p>Dropdown select components with multiple options and variants.</p>
      </div>

      <!-- Live Preview -->
      <section class="mb-8">
        <h2>Live Preview</h2>
        <div class="component-preview">
          <div class="preview-container">
            <div class="live-component" data-component="Select" data-props='{"options":[{"value":"option1","label":"Option 1"},{"value":"option2","label":"Option 2"}],"placeholder":"Select an option","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Installation -->
      <section class="mb-8">
        <h2>Installation</h2>
        <div class="code-block">
          <pre><code>import { Select } from '@nostromo/ui-core'</code></pre>
        </div>
      </section>

      <!-- Basic Usage -->
      <section class="mb-8">
        <h2>Basic Usage</h2>
        <div class="code-block">
          <pre><code>&lt;Select options={options} placeholder="Select an option" /&gt;</code></pre>
        </div>
        
        <!-- Live Example -->
        <div class="component-example">
          <div class="example-preview">
            <div class="live-component" data-component="Select" data-props='{"options":[{"value":"home","label":"Home"},{"value":"about","label":"About"}],"placeholder":"Choose a page","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Variants -->
      <section class="mb-8">
        <h2>Variants</h2>
        <div class="space-y-4">
          <div class="live-component" data-component="Select" data-props='{"options":[{"value":"default","label":"Default Select"}],"placeholder":"Default style","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Select" data-props='{"options":[{"value":"error","label":"Error Select"}],"placeholder":"Error state","size":"md","error":true}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Select" data-props='{"options":[{"value":"disabled","label":"Disabled Select"}],"placeholder":"Disabled","size":"md","disabled":true}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>

      <!-- Sizes -->
      <section class="mb-8">
        <h2>Sizes</h2>
        <div class="space-y-4">
          <div class="live-component" data-component="Select" data-props='{"options":[{"value":"small","label":"Small"}],"placeholder":"Small select","size":"sm"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Select" data-props='{"options":[{"value":"medium","label":"Medium"}],"placeholder":"Medium select","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Select" data-props='{"options":[{"value":"large","label":"Large"}],"placeholder":"Large select","size":"lg"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>
    `;
  }

  generateLabelContent() {
    return `
      <!-- Page Header -->
      <div class="mb-8">
        <h1>Label</h1>
        <p>Form labels with accessibility features and multiple variants.</p>
      </div>

      <!-- Live Preview -->
      <section class="mb-8">
        <h2>Live Preview</h2>
        <div class="component-preview">
          <div class="preview-container">
            <div class="live-component" data-component="Label" data-props='{"children":"Email Address","htmlFor":"email","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Installation -->
      <section class="mb-8">
        <h2>Installation</h2>
        <div class="code-block">
          <pre><code>import { Label } from '@nostromo/ui-core'</code></pre>
        </div>
      </section>

      <!-- Basic Usage -->
      <section class="mb-8">
        <h2>Basic Usage</h2>
        <div class="code-block">
          <pre><code>&lt;Label htmlFor="email"&gt;Email Address&lt;/Label&gt;</code></pre>
        </div>
        
        <!-- Live Example -->
        <div class="component-example">
          <div class="example-preview">
            <div class="live-component" data-component="Label" data-props='{"children":"Username","htmlFor":"username","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Sizes -->
      <section class="mb-8">
        <h2>Sizes</h2>
        <div class="space-y-4">
          <div class="live-component" data-component="Label" data-props='{"children":"Small Label","htmlFor":"small","size":"sm"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Label" data-props='{"children":"Medium Label","htmlFor":"medium","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Label" data-props='{"children":"Large Label","htmlFor":"large","size":"lg"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>

      <!-- Variants -->
      <section class="mb-8">
        <h2>Variants</h2>
        <div class="space-y-4">
          <div class="live-component" data-component="Label" data-props='{"children":"Default Label","htmlFor":"default","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Label" data-props='{"children":"Required Label","htmlFor":"required","size":"md","required":true}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Label" data-props='{"children":"Disabled Label","htmlFor":"disabled","size":"md","disabled":true}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>
    `;
  }

  generateHelperTextContent() {
    return `
      <!-- Page Header -->
      <div class="mb-8">
        <h1>HelperText</h1>
        <p>Helper text components for form fields with multiple variants.</p>
      </div>

      <!-- Live Preview -->
      <section class="mb-8">
        <h2>Live Preview</h2>
        <div class="component-preview">
          <div class="preview-container">
            <div class="live-component" data-component="HelperText" data-props='{"children":"This is helper text","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Installation -->
      <section class="mb-8">
        <h2>Installation</h2>
        <div class="code-block">
          <pre><code>import { HelperText } from '@nostromo/ui-core'</code></pre>
        </div>
      </section>

      <!-- Basic Usage -->
      <section class="mb-8">
        <h2>Basic Usage</h2>
        <div class="code-block">
          <pre><code>&lt;HelperText&gt;This is helper text&lt;/HelperText&gt;</code></pre>
        </div>
        
        <!-- Live Example -->
        <div class="component-example">
          <div class="example-preview">
            <div class="live-component" data-component="HelperText" data-props='{"children":"Enter your email address","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Variants -->
      <section class="mb-8">
        <h2>Variants</h2>
        <div class="space-y-4">
          <div class="live-component" data-component="HelperText" data-props='{"children":"Default helper text","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="HelperText" data-props='{"children":"Error helper text","size":"md","variant":"error"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="HelperText" data-props='{"children":"Success helper text","size":"md","variant":"success"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>
    `;
  }

  generateErrorMessageContent() {
    return `
      <!-- Page Header -->
      <div class="mb-8">
        <h1>ErrorMessage</h1>
        <p>Error message components for form validation feedback.</p>
      </div>

      <!-- Live Preview -->
      <section class="mb-8">
        <h2>Live Preview</h2>
        <div class="component-preview">
          <div class="preview-container">
            <div class="live-component" data-component="ErrorMessage" data-props='{"children":"This field is required","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Installation -->
      <section class="mb-8">
        <h2>Installation</h2>
        <div class="code-block">
          <pre><code>import { ErrorMessage } from '@nostromo/ui-core'</code></pre>
        </div>
      </section>

      <!-- Basic Usage -->
      <section class="mb-8">
        <h2>Basic Usage</h2>
        <div class="code-block">
          <pre><code>&lt;ErrorMessage&gt;This field is required&lt;/ErrorMessage&gt;</code></pre>
        </div>
        
        <!-- Live Example -->
        <div class="component-example">
          <div class="example-preview">
            <div class="live-component" data-component="ErrorMessage" data-props='{"children":"Invalid email format","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Sizes -->
      <section class="mb-8">
        <h2>Sizes</h2>
        <div class="space-y-4">
          <div class="live-component" data-component="ErrorMessage" data-props='{"children":"Small error","size":"sm"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="ErrorMessage" data-props='{"children":"Medium error","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="ErrorMessage" data-props='{"children":"Large error","size":"lg"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>
    `;
  }

  generateIconContent() {
    return `
      <!-- Page Header -->
      <div class="mb-8">
        <h1>Icon</h1>
        <p>Icon components with multiple sizes and variants.</p>
      </div>

      <!-- Live Preview -->
      <section class="mb-8">
        <h2>Live Preview</h2>
        <div class="component-preview">
          <div class="preview-container">
            <div class="live-component" data-component="Icon" data-props='{"name":"heart","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Installation -->
      <section class="mb-8">
        <h2>Installation</h2>
        <div class="code-block">
          <pre><code>import { Icon } from '@nostromo/ui-core'</code></pre>
        </div>
      </section>

      <!-- Basic Usage -->
      <section class="mb-8">
        <h2>Basic Usage</h2>
        <div class="code-block">
          <pre><code>&lt;Icon name="heart" /&gt;</code></pre>
        </div>
        
        <!-- Live Example -->
        <div class="component-example">
          <div class="example-preview">
            <div class="live-component" data-component="Icon" data-props='{"name":"star","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Sizes -->
      <section class="mb-8">
        <h2>Sizes</h2>
        <div class="flex gap-4 items-center">
          <div class="live-component" data-component="Icon" data-props='{"name":"heart","size":"sm"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Icon" data-props='{"name":"heart","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Icon" data-props='{"name":"heart","size":"lg"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>

      <!-- Icon Examples -->
      <section class="mb-8">
        <h2>Icon Examples</h2>
        <div class="flex gap-4 items-center">
          <div class="live-component" data-component="Icon" data-props='{"name":"home","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Icon" data-props='{"name":"user","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Icon" data-props='{"name":"settings","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Icon" data-props='{"name":"search","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>
    `;
  }

  generateTooltipContent() {
    return `
      <!-- Page Header -->
      <div class="mb-8">
        <h1>Tooltip</h1>
        <p>Tooltip components with positioning and multiple variants.</p>
      </div>

      <!-- Live Preview -->
      <section class="mb-8">
        <h2>Live Preview</h2>
        <div class="component-preview">
          <div class="preview-container">
            <div class="live-component" data-component="Tooltip" data-props='{"content":"This is a tooltip","children":"Hover me","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Installation -->
      <section class="mb-8">
        <h2>Installation</h2>
        <div class="code-block">
          <pre><code>import { Tooltip } from '@nostromo/ui-core'</code></pre>
        </div>
      </section>

      <!-- Basic Usage -->
      <section class="mb-8">
        <h2>Basic Usage</h2>
        <div class="code-block">
          <pre><code>&lt;Tooltip content="Tooltip text"&gt;Hover me&lt;/Tooltip&gt;</code></pre>
        </div>
        
        <!-- Live Example -->
        <div class="component-example">
          <div class="example-preview">
            <div class="live-component" data-component="Tooltip" data-props='{"content":"Click to learn more","children":"Learn more","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Positions -->
      <section class="mb-8">
        <h2>Positions</h2>
        <div class="grid grid-cols-2 gap-4">
          <div class="live-component" data-component="Tooltip" data-props='{"content":"Top tooltip","children":"Top","size":"md","position":"top"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Tooltip" data-props='{"content":"Bottom tooltip","children":"Bottom","size":"md","position":"bottom"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Tooltip" data-props='{"content":"Left tooltip","children":"Left","size":"md","position":"left"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Tooltip" data-props='{"content":"Right tooltip","children":"Right","size":"md","position":"right"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>
    `;
  }

  generateAccordionContent() {
    return `
      <!-- Page Header -->
      <div class="mb-8">
        <h1>Accordion</h1>
        <p>Collapsible content sections with smooth animations.</p>
      </div>

      <!-- Live Preview -->
      <section class="mb-8">
        <h2>Live Preview</h2>
        <div class="component-preview">
          <div class="preview-container">
            <div class="live-component" data-component="Accordion" data-props='{"items":[{"title":"Section 1","content":"Content for section 1"},{"title":"Section 2","content":"Content for section 2"}],"size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Installation -->
      <section class="mb-8">
        <h2>Installation</h2>
        <div class="code-block">
          <pre><code>import { Accordion } from '@nostromo/ui-core'</code></pre>
        </div>
      </section>

      <!-- Basic Usage -->
      <section class="mb-8">
        <h2>Basic Usage</h2>
        <div class="code-block">
          <pre><code>&lt;Accordion items={items} /&gt;</code></pre>
        </div>
        
        <!-- Live Example -->
        <div class="component-example">
          <div class="example-preview">
            <div class="live-component" data-component="Accordion" data-props='{"items":[{"title":"FAQ 1","content":"Answer to FAQ 1"},{"title":"FAQ 2","content":"Answer to FAQ 2"}],"size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Variants -->
      <section class="mb-8">
        <h2>Variants</h2>
        <div class="space-y-4">
          <div class="live-component" data-component="Accordion" data-props='{"items":[{"title":"Default","content":"Default accordion style"}],"size":"md","variant":"default"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Accordion" data-props='{"items":[{"title":"Bordered","content":"Bordered accordion style"}],"size":"md","variant":"bordered"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Accordion" data-props='{"items":[{"title":"Filled","content":"Filled accordion style"}],"size":"md","variant":"filled"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>
    `;
  }

  generateSkeletonContent() {
    return `
      <!-- Page Header -->
      <div class="mb-8">
        <h1>Skeleton</h1>
        <p>Loading placeholders with multiple shapes and animations.</p>
      </div>

      <!-- Live Preview -->
      <section class="mb-8">
        <h2>Live Preview</h2>
        <div class="component-preview">
          <div class="preview-container">
            <div class="live-component" data-component="Skeleton" data-props='{"variant":"text","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Installation -->
      <section class="mb-8">
        <h2>Installation</h2>
        <div class="code-block">
          <pre><code>import { Skeleton } from '@nostromo/ui-core'</code></pre>
        </div>
      </section>

      <!-- Basic Usage -->
      <section class="mb-8">
        <h2>Basic Usage</h2>
        <div class="code-block">
          <pre><code>&lt;Skeleton variant="text" /&gt;</code></pre>
        </div>
        
        <!-- Live Example -->
        <div class="component-example">
          <div class="example-preview">
            <div class="live-component" data-component="Skeleton" data-props='{"variant":"rectangular","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Variants -->
      <section class="mb-8">
        <h2>Variants</h2>
        <div class="space-y-4">
          <div class="live-component" data-component="Skeleton" data-props='{"variant":"text","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Skeleton" data-props='{"variant":"rectangular","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Skeleton" data-props='{"variant":"circular","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>
    `;
  }

  generateProgressContent() {
    return `
      <!-- Page Header -->
      <div class="mb-8">
        <h1>Progress</h1>
        <p>Progress indicators with multiple variants and animations.</p>
      </div>

      <!-- Live Preview -->
      <section class="mb-8">
        <h2>Live Preview</h2>
        <div class="component-preview">
          <div class="preview-container">
            <div class="live-component" data-component="Progress" data-props='{"value":50,"size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Installation -->
      <section class="mb-8">
        <h2>Installation</h2>
        <div class="code-block">
          <pre><code>import { Progress } from '@nostromo/ui-core'</code></pre>
        </div>
      </section>

      <!-- Basic Usage -->
      <section class="mb-8">
        <h2>Basic Usage</h2>
        <div class="code-block">
          <pre><code>&lt;Progress value={50} /&gt;</code></pre>
        </div>
        
        <!-- Live Example -->
        <div class="component-example">
          <div class="example-preview">
            <div class="live-component" data-component="Progress" data-props='{"value":75,"size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Values -->
      <section class="mb-8">
        <h2>Progress Values</h2>
        <div class="space-y-4">
          <div class="live-component" data-component="Progress" data-props='{"value":25,"size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Progress" data-props='{"value":50,"size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Progress" data-props='{"value":75,"size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Progress" data-props='{"value":100,"size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>
    `;
  }

  generateCheckboxContent() {
    return `
      <!-- Page Header -->
      <div class="mb-8">
        <h1>Checkbox</h1>
        <p>Checkbox components with multiple states and variants.</p>
      </div>

      <!-- Live Preview -->
      <section class="mb-8">
        <h2>Live Preview</h2>
        <div class="component-preview">
          <div class="preview-container">
            <div class="live-component" data-component="Checkbox" data-props='{"children":"Checkbox option","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Installation -->
      <section class="mb-8">
        <h2>Installation</h2>
        <div class="code-block">
          <pre><code>import { Checkbox } from '@nostromo/ui-core'</code></pre>
        </div>
      </section>

      <!-- Basic Usage -->
      <section class="mb-8">
        <h2>Basic Usage</h2>
        <div class="code-block">
          <pre><code>&lt;Checkbox&gt;Checkbox option&lt;/Checkbox&gt;</code></pre>
        </div>
        
        <!-- Live Example -->
        <div class="component-example">
          <div class="example-preview">
            <div class="live-component" data-component="Checkbox" data-props='{"children":"Accept terms","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- States -->
      <section class="mb-8">
        <h2>States</h2>
        <div class="space-y-4">
          <div class="live-component" data-component="Checkbox" data-props='{"children":"Unchecked","size":"md","checked":false}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Checkbox" data-props='{"children":"Checked","size":"md","checked":true}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Checkbox" data-props='{"children":"Disabled","size":"md","disabled":true}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>
    `;
  }

  generateRadioGroupContent() {
    return `
      <!-- Page Header -->
      <div class="mb-8">
        <h1>RadioGroup</h1>
        <p>Radio button groups with multiple options and variants.</p>
      </div>

      <!-- Live Preview -->
      <section class="mb-8">
        <h2>Live Preview</h2>
        <div class="component-preview">
          <div class="preview-container">
            <div class="live-component" data-component="RadioGroup" data-props='{"options":[{"value":"option1","label":"Option 1"},{"value":"option2","label":"Option 2"}],"size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Installation -->
      <section class="mb-8">
        <h2>Installation</h2>
        <div class="code-block">
          <pre><code>import { RadioGroup } from '@nostromo/ui-core'</code></pre>
        </div>
      </section>

      <!-- Basic Usage -->
      <section class="mb-8">
        <h2>Basic Usage</h2>
        <div class="code-block">
          <pre><code>&lt;RadioGroup options={options} /&gt;</code></pre>
        </div>
        
        <!-- Live Example -->
        <div class="component-example">
          <div class="example-preview">
            <div class="live-component" data-component="RadioGroup" data-props='{"options":[{"value":"small","label":"Small"},{"value":"medium","label":"Medium"},{"value":"large","label":"Large"}],"size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Variants -->
      <section class="mb-8">
        <h2>Variants</h2>
        <div class="space-y-4">
          <div class="live-component" data-component="RadioGroup" data-props='{"options":[{"value":"default","label":"Default"}],"size":"md","variant":"default"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="RadioGroup" data-props='{"options":[{"value":"error","label":"Error"}],"size":"md","variant":"error"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="RadioGroup" data-props='{"options":[{"value":"disabled","label":"Disabled"}],"size":"md","disabled":true}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>
    `;
  }

  generateSwitchContent() {
    return `
      <!-- Page Header -->
      <div class="mb-8">
        <h1>Switch</h1>
        <p>Toggle switch components with multiple states and variants.</p>
      </div>

      <!-- Live Preview -->
      <section class="mb-8">
        <h2>Live Preview</h2>
        <div class="component-preview">
          <div class="preview-container">
            <div class="live-component" data-component="Switch" data-props='{"children":"Switch option","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Installation -->
      <section class="mb-8">
        <h2>Installation</h2>
        <div class="code-block">
          <pre><code>import { Switch } from '@nostromo/ui-core'</code></pre>
        </div>
      </section>

      <!-- Basic Usage -->
      <section class="mb-8">
        <h2>Basic Usage</h2>
        <div class="code-block">
          <pre><code>&lt;Switch&gt;Switch option&lt;/Switch&gt;</code></pre>
        </div>
        
        <!-- Live Example -->
        <div class="component-example">
          <div class="example-preview">
            <div class="live-component" data-component="Switch" data-props='{"children":"Enable notifications","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- States -->
      <section class="mb-8">
        <h2>States</h2>
        <div class="space-y-4">
          <div class="live-component" data-component="Switch" data-props='{"children":"Off","size":"md","checked":false}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Switch" data-props='{"children":"On","size":"md","checked":true}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Switch" data-props='{"children":"Disabled","size":"md","disabled":true}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>
    `;
  }

  generateTextareaContent() {
    return `
      <!-- Page Header -->
      <div class="mb-8">
        <h1>Textarea</h1>
        <p>Multi-line text input components with auto-resize functionality.</p>
      </div>

      <!-- Live Preview -->
      <section class="mb-8">
        <h2>Live Preview</h2>
        <div class="component-preview">
          <div class="preview-container">
            <div class="live-component" data-component="Textarea" data-props='{"placeholder":"Enter your message...","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Installation -->
      <section class="mb-8">
        <h2>Installation</h2>
        <div class="code-block">
          <pre><code>import { Textarea } from '@nostromo/ui-core'</code></pre>
        </div>
      </section>

      <!-- Basic Usage -->
      <section class="mb-8">
        <h2>Basic Usage</h2>
        <div class="code-block">
          <pre><code>&lt;Textarea placeholder="Enter your message..." /&gt;</code></pre>
        </div>
        
        <!-- Live Example -->
        <div class="component-example">
          <div class="example-preview">
            <div class="live-component" data-component="Textarea" data-props='{"placeholder":"Tell us about yourself...","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Sizes -->
      <section class="mb-8">
        <h2>Sizes</h2>
        <div class="space-y-4">
          <div class="live-component" data-component="Textarea" data-props='{"placeholder":"Small textarea","size":"sm"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Textarea" data-props='{"placeholder":"Medium textarea","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Textarea" data-props='{"placeholder":"Large textarea","size":"lg"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>
    `;
  }

  generateAlertContent() {
    return `
      <!-- Page Header -->
      <div class="mb-8">
        <h1>Alert</h1>
        <p>Alert components with multiple variants and dismissible functionality.</p>
      </div>

      <!-- Live Preview -->
      <section class="mb-8">
        <h2>Live Preview</h2>
        <div class="component-preview">
          <div class="preview-container">
            <div class="live-component" data-component="Alert" data-props='{"children":"This is an alert message","variant":"default","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Installation -->
      <section class="mb-8">
        <h2>Installation</h2>
        <div class="code-block">
          <pre><code>import { Alert } from '@nostromo/ui-core'</code></pre>
        </div>
      </section>

      <!-- Basic Usage -->
      <section class="mb-8">
        <h2>Basic Usage</h2>
        <div class="code-block">
          <pre><code>&lt;Alert&gt;This is an alert message&lt;/Alert&gt;</code></pre>
        </div>
        
        <!-- Live Example -->
        <div class="component-example">
          <div class="example-preview">
            <div class="live-component" data-component="Alert" data-props='{"children":"Welcome to our application!","variant":"success","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Variants -->
      <section class="mb-8">
        <h2>Variants</h2>
        <div class="space-y-4">
          <div class="live-component" data-component="Alert" data-props='{"children":"Default alert","variant":"default","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Alert" data-props='{"children":"Success alert","variant":"success","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Alert" data-props='{"children":"Warning alert","variant":"warning","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Alert" data-props='{"children":"Error alert","variant":"error","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>
    `;
  }

  generateBreadcrumbContent() {
    return `
      <!-- Page Header -->
      <div class="mb-8">
        <h1>Breadcrumb</h1>
        <p>Navigation breadcrumbs with multiple levels and variants.</p>
      </div>

      <!-- Live Preview -->
      <section class="mb-8">
        <h2>Live Preview</h2>
        <div class="component-preview">
          <div class="preview-container">
            <div class="live-component" data-component="Breadcrumb" data-props='{"items":[{"label":"Home","href":"/"},{"label":"Products","href":"/products"},{"label":"Current"}],"size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Installation -->
      <section class="mb-8">
        <h2>Installation</h2>
        <div class="code-block">
          <pre><code>import { Breadcrumb } from '@nostromo/ui-core'</code></pre>
        </div>
      </section>

      <!-- Basic Usage -->
      <section class="mb-8">
        <h2>Basic Usage</h2>
        <div class="code-block">
          <pre><code>&lt;Breadcrumb items={items} /&gt;</code></pre>
        </div>
        
        <!-- Live Example -->
        <div class="component-example">
          <div class="example-preview">
            <div class="live-component" data-component="Breadcrumb" data-props='{"items":[{"label":"Home","href":"/"},{"label":"About","href":"/about"}],"size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Variants -->
      <section class="mb-8">
        <h2>Variants</h2>
        <div class="space-y-4">
          <div class="live-component" data-component="Breadcrumb" data-props='{"items":[{"label":"Home","href":"/"},{"label":"Products","href":"/products"},{"label":"Current"}],"size":"md","variant":"default"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Breadcrumb" data-props='{"items":[{"label":"Home","href":"/"},{"label":"Products","href":"/products"},{"label":"Current"}],"size":"md","variant":"compact"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>
    `;
  }

  generatePaginationContent() {
    return `
      <!-- Page Header -->
      <div class="mb-8">
        <h1>Pagination</h1>
        <p>Pagination components with multiple pages and navigation controls.</p>
      </div>

      <!-- Live Preview -->
      <section class="mb-8">
        <h2>Live Preview</h2>
        <div class="component-preview">
          <div class="preview-container">
            <div class="live-component" data-component="Pagination" data-props='{"currentPage":1,"totalPages":10,"size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Installation -->
      <section class="mb-8">
        <h2>Installation</h2>
        <div class="code-block">
          <pre><code>import { Pagination } from '@nostromo/ui-core'</code></pre>
        </div>
      </section>

      <!-- Basic Usage -->
      <section class="mb-8">
        <h2>Basic Usage</h2>
        <div class="code-block">
          <pre><code>&lt;Pagination currentPage={1} totalPages={10} /&gt;</code></pre>
        </div>
        
        <!-- Live Example -->
        <div class="component-example">
          <div class="example-preview">
            <div class="live-component" data-component="Pagination" data-props='{"currentPage":3,"totalPages":5,"size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Variants -->
      <section class="mb-8">
        <h2>Variants</h2>
        <div class="space-y-4">
          <div class="live-component" data-component="Pagination" data-props='{"currentPage":1,"totalPages":10,"size":"md","variant":"default"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Pagination" data-props='{"currentPage":1,"totalPages":10,"size":"md","variant":"compact"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>
    `;
  }

  generateSeparatorContent() {
    return `
      <!-- Page Header -->
      <div class="mb-8">
        <h1>Separator</h1>
        <p>Visual separator components with multiple orientations and variants.</p>
      </div>

      <!-- Live Preview -->
      <section class="mb-8">
        <h2>Live Preview</h2>
        <div class="component-preview">
          <div class="preview-container">
            <div class="live-component" data-component="Separator" data-props='{"orientation":"horizontal","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Installation -->
      <section class="mb-8">
        <h2>Installation</h2>
        <div class="code-block">
          <pre><code>import { Separator } from '@nostromo/ui-core'</code></pre>
        </div>
      </section>

      <!-- Basic Usage -->
      <section class="mb-8">
        <h2>Basic Usage</h2>
        <div class="code-block">
          <pre><code>&lt;Separator /&gt;</code></pre>
        </div>
        
        <!-- Live Example -->
        <div class="component-example">
          <div class="example-preview">
            <div class="live-component" data-component="Separator" data-props='{"orientation":"horizontal","size":"md"}'>
              <!-- Live component will be rendered here -->
            </div>
          </div>
        </div>
      </section>

      <!-- Orientations -->
      <section class="mb-8">
        <h2>Orientations</h2>
        <div class="space-y-4">
          <div class="live-component" data-component="Separator" data-props='{"orientation":"horizontal","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
          <div class="live-component" data-component="Separator" data-props='{"orientation":"vertical","size":"md"}'>
            <!-- Live component will be rendered here -->
          </div>
        </div>
      </section>
    `;
  }

  fixNavigationLinks(html, type) {
    // Fix navigation links based on component type
    if (type === 'marketing') {
      // Marketing components are in components/marketing/ subdirectory
      html = html
        .replace(/href="\.\.\/\.\.\/components\//g, 'href="../../components/')
        .replace(/href="\.\.\/\.\.\/getting-started\//g, 'href="../../getting-started/')
        .replace(/href="\.\.\/\.\.\/index\.html"/g, 'href="../../index.html"')
        .replace(/href="\.\.\/\.\.\/#/g, 'href="../../#');
    } else if (type === 'getting-started') {
      // Getting started pages are in getting-started/ directory
      html = html
        .replace(/href="\.\.\/\.\.\/components\//g, 'href="../components/')
        .replace(/href="\.\.\/\.\.\/getting-started\//g, 'href="../getting-started/')
        .replace(/href="\.\.\/\.\.\/index\.html"/g, 'href="../index.html"')
        .replace(/href="\.\.\/\.\.\/#/g, 'href="../#');
    } else if (type === 'index') {
      // Index page is in root directory
      html = html
        .replace(/href="\.\.\/\.\.\/components\//g, 'href="./components/')
        .replace(/href="\.\.\/\.\.\/getting-started\//g, 'href="./getting-started/')
        .replace(/href="\.\.\/\.\.\/index\.html"/g, 'href="./index.html"')
        .replace(/href="\.\.\/\.\.\/#/g, 'href="./#');
    } else {
      // Core components are in components/ directory
      html = html
        .replace(/href="\.\.\/\.\.\/components\//g, 'href="../components/')
        .replace(/href="\.\.\/\.\.\/getting-started\//g, 'href="../getting-started/')
        .replace(/href="\.\.\/\.\.\/index\.html"/g, 'href="../index.html"')
        .replace(/href="\.\.\/\.\.\/#/g, 'href="../#');
    }
    
    return html;
  }

  async generateNavigation() {
    console.log('🧭 Generating navigation data...');
    
    const navigationData = {
      core: this.config.components.core,
      marketing: this.config.components.marketing,
      gettingStarted: this.config.navigation.gettingStarted
    };
    
    const navPath = path.join(this.outputPath, 'assets/js/navigation-data.js');
    const navContent = `// Auto-generated navigation data
window.NostromoNavigation = ${JSON.stringify(navigationData, null, 2)};`;
    
    fs.writeFileSync(navPath, navContent);
    
    console.log('  ✅ Navigation data generated');
  }
}

// Run build
const builder = new DocsBuilder();
builder.build();
