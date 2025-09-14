import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nostromo/ui-core'
import { Playground } from '@/components/playground/playground'

export default function BadgePage() {
  const defaultCode = `import { Badge } from '@nostromo/ui-core/badge'

export function BadgeExample() {
  return (
    <div className="flex gap-4">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
}`

  const variantsCode = `import { Badge } from '@nostromo/ui-core/badge'

export function BadgeVariants() {
  return (
    <div className="flex gap-4 flex-wrap">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  )
}`

  const colorsCode = `import { Badge } from '@nostromo/ui-core/badge'

export function BadgeColors() {
  return (
    <div className="flex gap-4 flex-wrap">
      <Badge className="bg-brand-500">Brand</Badge>
      <Badge className="bg-success-500">Success</Badge>
      <Badge className="bg-warning-500">Warning</Badge>
      <Badge className="bg-error-500">Error</Badge>
      <Badge className="bg-info-500">Info</Badge>
    </div>
  )
}`

  return (
    <div className="bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-neutral-50">Badge</h1>
            <Badge variant="outline" className="text-brand-400 border-brand-400/20">
              React
            </Badge>
          </div>
          <p className="text-xl text-neutral-400 max-w-3xl">
            Displays a badge or a component that looks like a badge. Perfect for status indicators, 
            labels, and small pieces of information. Built with Tailwind CSS and fully customizable.
          </p>
        </div>

        {/* Installation */}
        <Card className="mb-8 bg-neutral-900/50 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-neutral-50">Installation</CardTitle>
            <CardDescription>
              Install the Badge component and its dependencies.
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
            Badges come in different variants to suit different use cases and visual hierarchies.
          </p>
          <Playground initialCode={variantsCode} />
        </section>

        {/* Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">Custom Colors</h2>
          <p className="text-neutral-400 mb-6">
            You can customize badge colors using Tailwind CSS classes.
          </p>
          <Playground initialCode={colorsCode} />
        </section>

        {/* API Reference */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">API Reference</h2>
          
          <Card className="bg-neutral-900/50 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-neutral-50">Badge Props</CardTitle>
              <CardDescription>
                All the props available for the Badge component.
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
                      <td className="py-3 px-4">&quot;default&quot; | &quot;secondary&quot; | &quot;outline&quot; | &quot;destructive&quot;</td>
                      <td className="py-3 px-4 font-mono">&quot;default&quot;</td>
                      <td className="py-3 px-4">The visual style variant of the badge</td>
                    </tr>
                    <tr className="border-b border-neutral-800">
                      <td className="py-3 px-4 font-mono text-brand-400">className</td>
                      <td className="py-3 px-4">string</td>
                      <td className="py-3 px-4 font-mono">undefined</td>
                      <td className="py-3 px-4">Additional CSS classes</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-mono text-brand-400">children</td>
                      <td className="py-3 px-4">ReactNode</td>
                      <td className="py-3 px-4 font-mono">undefined</td>
                      <td className="py-3 px-4">The content of the badge</td>
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
                The Badge component follows accessibility best practices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-green-200">
                <li>• Semantic HTML structure with proper roles</li>
                <li>• High contrast ratios for all variants</li>
                <li>• Screen reader friendly with appropriate ARIA attributes</li>
                <li>• Keyboard navigation support</li>
                <li>• Color is not the only way to convey information</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
