import { Badge } from '@nostromo/ui-core/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nostromo/ui-core/card'
import { Playground } from '@/components/playground/playground'

export default function ButtonPage() {
  const defaultCode = `import { Button } from '@nostromo/ui-core/button'

export function ButtonExample() {
  return (
    <div className="flex gap-4">
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  )
}`

  const variantsCode = `import { Button } from '@nostromo/ui-core/button'

export function ButtonVariants() {
  return (
    <div className="flex gap-4 flex-wrap">
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  )
}`

  const sizesCode = `import { Button } from '@nostromo/ui-core/button'

export function ButtonSizes() {
  return (
    <div className="flex gap-4 items-center">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}`

  return (
    <div className="bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-neutral-50">Button</h1>
            <Badge variant="outline" className="text-brand-400 border-brand-400/20">
              React
            </Badge>
          </div>
          <p className="text-xl text-neutral-400 max-w-3xl">
            Displays a button or a component that looks like a button. Built with Radix UI primitives 
            and styled with Tailwind CSS. Supports multiple variants, sizes, and states.
          </p>
        </div>

        {/* Installation */}
        <Card className="mb-8 bg-neutral-900/50 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-neutral-50">Installation</CardTitle>
            <CardDescription>
              Install the Button component and its dependencies.
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
            Buttons come in different variants to suit different use cases and visual hierarchies.
          </p>
          <Playground initialCode={variantsCode} />
        </section>

        {/* Sizes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">Sizes</h2>
          <p className="text-neutral-400 mb-6">
            Control the size of the button with the size prop.
          </p>
          <Playground initialCode={sizesCode} />
        </section>

        {/* API Reference */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">API Reference</h2>
          
          <Card className="bg-neutral-900/50 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-neutral-50">Button Props</CardTitle>
              <CardDescription>
                All the props available for the Button component.
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
                      <td className="py-3 px-4 font-mono text-brand-400">variant</td>
                      <td className="py-3 px-4">&quot;default&quot; | &quot;outline&quot; | &quot;ghost&quot; | &quot;destructive&quot;</td>
                      <td className="py-3 px-4 font-mono">&quot;default&quot;</td>
                      <td className="py-3 px-4">The visual style variant of the button</td>
                    </tr>
                    <tr className="border-b border-neutral-800">
                      <td className="py-3 px-4 font-mono text-brand-400">size</td>
                      <td className="py-3 px-4">&quot;sm&quot; | &quot;default&quot; | &quot;lg&quot;</td>
                      <td className="py-3 px-4 font-mono">&quot;default&quot;</td>
                      <td className="py-3 px-4">The size of the button</td>
                    </tr>
                    <tr className="border-b border-neutral-800">
                      <td className="py-3 px-4 font-mono text-brand-400">asChild</td>
                      <td className="py-3 px-4">boolean</td>
                      <td className="py-3 px-4 font-mono">false</td>
                      <td className="py-3 px-4">Render as a child component instead of a button</td>
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
                The Button component follows accessibility best practices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-green-200">
                <li>• Proper keyboard navigation support</li>
                <li>• Screen reader friendly with appropriate ARIA attributes</li>
                <li>• High contrast ratios for all variants</li>
                <li>• Focus management and visual indicators</li>
                <li>• Semantic HTML structure</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
