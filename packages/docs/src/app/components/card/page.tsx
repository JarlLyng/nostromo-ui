import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nostromo/ui-core'
import { Playground } from '@/components/playground/playground'

export default function CardPage() {
  const defaultCode = `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nostromo/ui-core/card'

export function CardExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content area.</p>
      </CardContent>
    </Card>
  )
}`

  const variantsCode = `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nostromo/ui-core/card'

export function CardVariants() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>Standard card styling</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a default card.</p>
        </CardContent>
      </Card>
      
      <Card className="border-brand-500">
        <CardHeader>
          <CardTitle>Branded Card</CardTitle>
          <CardDescription>Card with brand border</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has a brand-colored border.</p>
        </CardContent>
      </Card>
    </div>
  )
}`

  const complexCode = `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nostromo/ui-core/card'
import { Badge } from '@nostromo/ui-core/badge'

export function ComplexCard() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Project Status</CardTitle>
          <Badge variant="secondary">Active</Badge>
        </div>
        <CardDescription>
          Monitor your project progress and status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium">Progress</h4>
            <div className="w-full bg-neutral-200 rounded-full h-2 mt-2">
              <div className="bg-brand-500 h-2 rounded-full" style={{width: '75%'}}></div>
            </div>
            <p className="text-sm text-neutral-500 mt-1">75% complete</p>
          </div>
          <div>
            <h4 className="font-medium">Team Members</h4>
            <p className="text-sm text-neutral-500">5 active members</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}`

  return (
    <div className="bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-neutral-50">Card</h1>
            <Badge variant="outline" className="text-brand-400 border-brand-400/20">
              React
            </Badge>
          </div>
          <p className="text-xl text-neutral-400 max-w-3xl">
            Displays a card with optional header, content, and footer sections. Perfect for 
            organizing content into distinct sections with consistent spacing and styling.
          </p>
        </div>

        {/* Installation */}
        <Card className="mb-8 bg-neutral-900/50 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-neutral-50">Installation</CardTitle>
            <CardDescription>
              Install the Card component and its dependencies.
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
            Cards can be customized with different borders and styling.
          </p>
          <Playground initialCode={variantsCode} />
        </section>

        {/* Complex Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">Complex Example</h2>
          <p className="text-neutral-400 mb-6">
            Cards can contain complex layouts with multiple elements.
          </p>
          <Playground initialCode={complexCode} />
        </section>

        {/* API Reference */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">API Reference</h2>
          
          <div className="space-y-6">
            <Card className="bg-neutral-900/50 border-neutral-700">
              <CardHeader>
                <CardTitle className="text-neutral-50">Card Props</CardTitle>
                <CardDescription>
                  Props for the main Card component.
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
                        <td className="py-3 px-4 font-mono text-brand-400">className</td>
                        <td className="py-3 px-4">string</td>
                        <td className="py-3 px-4 font-mono">undefined</td>
                        <td className="py-3 px-4">Additional CSS classes</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-mono text-brand-400">children</td>
                        <td className="py-3 px-4">ReactNode</td>
                        <td className="py-3 px-4 font-mono">undefined</td>
                        <td className="py-3 px-4">The content of the card</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900/50 border-neutral-700">
              <CardHeader>
                <CardTitle className="text-neutral-50">CardHeader Props</CardTitle>
                <CardDescription>
                  Props for the CardHeader component.
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
                        <td className="py-3 px-4 font-mono text-brand-400">className</td>
                        <td className="py-3 px-4">string</td>
                        <td className="py-3 px-4 font-mono">undefined</td>
                        <td className="py-3 px-4">Additional CSS classes</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-mono text-brand-400">children</td>
                        <td className="py-3 px-4">ReactNode</td>
                        <td className="py-3 px-4 font-mono">undefined</td>
                        <td className="py-3 px-4">The header content</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Accessibility */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">Accessibility</h2>
          <Card className="bg-green-900/10 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400">WCAG 2.1 AA Compliant</CardTitle>
              <CardDescription className="text-green-300">
                The Card component follows accessibility best practices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-green-200">
                <li>• Semantic HTML structure with proper roles</li>
                <li>• High contrast ratios for all content</li>
                <li>• Screen reader friendly with appropriate ARIA attributes</li>
                <li>• Keyboard navigation support</li>
                <li>• Logical content hierarchy and structure</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
