import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nostromo/ui-core'
// import { Input } from '@nostromo/ui-core/input'
import { Playground } from '@/components/playground/playground'

export default function InputPage() {
  const defaultCode = `import { Input } from '@nostromo/ui-core/input'

export function InputExample() {
  return (
    <div className="space-y-4">
      <Input placeholder="Enter your email" />
      <Input placeholder="Enter your password" type="password" />
      <Input placeholder="Disabled input" disabled />
    </div>
  )
}`

  const variantsCode = `import { Input } from '@nostromo/ui-core/input'

export function InputVariants() {
  return (
    <div className="space-y-4">
      <Input placeholder="Default input" />
      <Input placeholder="Error state" className="border-error-500 focus:border-error-500" />
      <Input placeholder="Success state" className="border-success-500 focus:border-success-500" />
      <Input placeholder="Brand input" className="border-brand-500 focus:border-brand-500" />
    </div>
  )
}`

  const sizesCode = `import { Input } from '@nostromo/ui-core/input'

export function InputSizes() {
  return (
    <div className="space-y-4">
      <Input placeholder="Small input" className="h-8" />
      <Input placeholder="Default input" />
      <Input placeholder="Large input" className="h-12" />
    </div>
  )
}`

  const withLabelsCode = `import { Input } from '@nostromo/ui-core/input'

export function InputWithLabels() {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-2">
          Email Address
        </label>
        <Input placeholder="john@example.com" type="email" />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-2">
          Password
        </label>
        <Input placeholder="Enter your password" type="password" />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-2">
          Full Name
        </label>
        <Input placeholder="John Doe" />
      </div>
    </div>
  )
}`

  return (
    <div className="bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-neutral-50">Input</h1>
            <Badge variant="outline" className="text-brand-400 border-brand-400/20">
              React
            </Badge>
          </div>
          <p className="text-xl text-neutral-400 max-w-3xl">
            Displays a form input field. Perfect for forms, search boxes, and any scenario 
            where you need to collect user input. Built with accessibility in mind.
          </p>
        </div>

        {/* Installation */}
        <Card className="mb-8 bg-neutral-900/50 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-neutral-50">Installation</CardTitle>
            <CardDescription>
              Install the Input component and its dependencies.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-neutral-800 rounded-lg p-4 font-mono text-sm">
              <div className="text-neutral-400 mb-2"># Install with pnpm</div>
              <div className="text-neutral-100">pnpm add @nostromo/ui-core</div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Usage */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">Basic Usage</h2>
          <Playground initialCode={defaultCode} />
        </section>

        {/* Variants */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">Variants</h2>
          <p className="text-neutral-400 mb-6">
            Customize the input appearance with different border colors and states.
          </p>
          <Playground initialCode={variantsCode} />
        </section>

        {/* Sizes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">Sizes</h2>
          <p className="text-neutral-400 mb-6">
            Control the size of the input with Tailwind CSS classes.
          </p>
          <Playground initialCode={sizesCode} />
        </section>

        {/* With Labels */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">With Labels</h2>
          <p className="text-neutral-400 mb-6">
            Properly labeled inputs for better accessibility and user experience.
          </p>
          <Playground initialCode={withLabelsCode} />
        </section>

        {/* API Reference */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">API Reference</h2>
          
          <Card className="bg-neutral-900/50 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-neutral-50">Input Props</CardTitle>
              <CardDescription>
                All the props available for the Input component.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-700">
                      <th className="text-left py-3 px-4 text-neutral-300 font-medium">Prop</th>
                      <th className="text-left py-3 px-4 text-neutral-300 font-medium">Type</th>
                      <th className="text-left py-3 px-4 text-neutral-300 font-medium">Default</th>
                      <th className="text-left py-3 px-4 text-neutral-300 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-neutral-400">
                    <tr className="border-b border-neutral-800">
                      <td className="py-3 px-4 font-mono text-brand-400">type</td>
                      <td className="py-3 px-4">&quot;text&quot; | &quot;email&quot; | &quot;password&quot; | &quot;number&quot; | &quot;tel&quot; | &quot;url&quot; | &quot;search&quot;</td>
                      <td className="py-3 px-4 font-mono">&quot;text&quot;</td>
                      <td className="py-3 px-4">The input type</td>
                    </tr>
                    <tr className="border-b border-neutral-800">
                      <td className="py-3 px-4 font-mono text-brand-400">placeholder</td>
                      <td className="py-3 px-4">string</td>
                      <td className="py-3 px-4 font-mono">undefined</td>
                      <td className="py-3 px-4">Placeholder text</td>
                    </tr>
                    <tr className="border-b border-neutral-800">
                      <td className="py-3 px-4 font-mono text-brand-400">disabled</td>
                      <td className="py-3 px-4">boolean</td>
                      <td className="py-3 px-4 font-mono">false</td>
                      <td className="py-3 px-4">Whether the input is disabled</td>
                    </tr>
                    <tr className="border-b border-neutral-800">
                      <td className="py-3 px-4 font-mono text-brand-400">value</td>
                      <td className="py-3 px-4">string</td>
                      <td className="py-3 px-4 font-mono">undefined</td>
                      <td className="py-3 px-4">The input value</td>
                    </tr>
                    <tr className="border-b border-neutral-800">
                      <td className="py-3 px-4 font-mono text-brand-400">onChange</td>
                      <td className="py-3 px-4">(event: ChangeEvent&lt;HTMLInputElement&gt;) =&gt; void</td>
                      <td className="py-3 px-4 font-mono">undefined</td>
                      <td className="py-3 px-4">Change event handler</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono text-brand-400">className</td>
                      <td className="py-3 px-4">string</td>
                      <td className="py-3 px-4 font-mono">undefined</td>
                      <td className="py-3 px-4">Additional CSS classes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Accessibility */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">Accessibility</h2>
          <Card className="bg-green-900/10 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400">WCAG 2.1 AA Compliant</CardTitle>
              <CardDescription className="text-green-300">
                The Input component follows accessibility best practices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-green-200">
                <li>• Proper keyboard navigation support</li>
                <li>• Screen reader friendly with appropriate ARIA attributes</li>
                <li>• High contrast ratios for all states</li>
                <li>• Focus management and visual indicators</li>
                <li>• Semantic HTML structure with proper labels</li>
                <li>• Support for all standard input types</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
