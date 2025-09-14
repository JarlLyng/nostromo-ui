import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nostromo/ui-core'
import { Playground } from '@/components/playground/playground'

export default function LabelPage() {
  const defaultCode = `import { Label } from '@nostromo/ui-core/label'

export function LabelExample() {
  return (
    <div className="space-y-4">
      <Label>Email Address</Label>
      <Label>Password</Label>
      <Label>Full Name</Label>
    </div>
  )
}`

  const withInputsCode = `import { Label } from '@nostromo/ui-core/label'
import { Input } from '@nostromo/ui-core/input'

export function LabelWithInputs() {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" placeholder="john@example.com" type="email" className="mt-2" />
      </div>
      
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" placeholder="Enter your password" type="password" className="mt-2" />
      </div>
      
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" placeholder="John Doe" className="mt-2" />
      </div>
    </div>
  )
}`

  const disabledCode = `import { Label } from '@nostromo/ui-core/label'
import { Input } from '@nostromo/ui-core/input'

export function DisabledLabel() {
  return (
    <div className="space-y-4">
      <Label>Normal Label</Label>
      <Label className="opacity-50">Disabled Label</Label>
      <div>
        <Label htmlFor="disabled-input">Disabled Input Label</Label>
        <Input id="disabled-input" disabled className="mt-2" />
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
            <h1 className="text-4xl font-bold text-neutral-50">Label</h1>
            <Badge variant="outline" className="text-brand-400 border-brand-400/20">
              React
            </Badge>
          </div>
          <p className="text-xl text-neutral-400 max-w-3xl">
            Displays a label for form elements. Essential for accessibility and user experience. 
            Properly associates labels with form controls for screen readers and keyboard navigation.
          </p>
        </div>

        {/* Installation */}
        <Card className="mb-8 bg-neutral-900/50 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-neutral-50">Installation</CardTitle>
            <CardDescription>
              Install the Label component and its dependencies.
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

        {/* With Inputs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">With Form Inputs</h2>
          <p className="text-neutral-400 mb-6">
            Labels should be properly associated with form controls using the htmlFor prop.
          </p>
          <Playground initialCode={withInputsCode} />
        </section>

        {/* Disabled State */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">Disabled State</h2>
          <p className="text-neutral-400 mb-6">
            Labels can be styled to indicate disabled state for better user experience.
          </p>
          <Playground initialCode={disabledCode} />
        </section>

        {/* API Reference */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">API Reference</h2>
          
          <Card className="bg-neutral-900/50 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-neutral-50">Label Props</CardTitle>
              <CardDescription>
                All the props available for the Label component.
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
                      <td className="py-3 px-4 font-mono text-brand-400">htmlFor</td>
                      <td className="py-3 px-4">string</td>
                      <td className="py-3 px-4 font-mono">undefined</td>
                      <td className="py-3 px-4">Associates the label with a form control</td>
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
                      <td className="py-3 px-4">The label text content</td>
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
                The Label component follows accessibility best practices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-green-200">
                <li>• Proper association with form controls using htmlFor</li>
                <li>• Screen reader friendly with semantic HTML</li>
                <li>• High contrast ratios for all states</li>
                <li>• Keyboard navigation support</li>
                <li>• Semantic HTML structure with proper roles</li>
                <li>• Disabled state styling for better UX</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
