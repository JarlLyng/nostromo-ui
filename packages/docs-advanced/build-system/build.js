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
      </section>

      <!-- Variants -->
      <section class="mb-8">
        <h2>Variants</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 border rounded-lg">
            <h3 class="font-semibold mb-2">Success</h3>
            <p class="text-sm text-gray-600">Green toast for successful actions</p>
          </div>
          <div class="p-4 border rounded-lg">
            <h3 class="font-semibold mb-2">Error</h3>
            <p class="text-sm text-gray-600">Red toast for errors and failures</p>
          </div>
          <div class="p-4 border rounded-lg">
            <h3 class="font-semibold mb-2">Warning</h3>
            <p class="text-sm text-gray-600">Yellow toast for warnings</p>
          </div>
          <div class="p-4 border rounded-lg">
            <h3 class="font-semibold mb-2">Info</h3>
            <p class="text-sm text-gray-600">Blue toast for information</p>
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
