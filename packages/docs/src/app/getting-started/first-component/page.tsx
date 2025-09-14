import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from '@nostromo/ui-core'
import { Playground } from '@/components/playground/playground'

export default function FirstComponentPage() {
  const basicExample = `import { Button } from '@nostromo/ui-core/button'

export function MyFirstComponent() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-neutral-50">Welcome to Nostromo UI</h1>
      <p className="text-neutral-400">
        This is your first component using Nostromo UI!
      </p>
      <Button>Get Started</Button>
    </div>
  )
}`

  const multipleComponents = `import { Button } from '@nostromo/ui-core/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nostromo/ui-core/card'
import { Badge } from '@nostromo/ui-core/badge'

export function ComponentShowcase() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Nostromo UI Components</CardTitle>
          <CardDescription>
            A collection of space-grade UI components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Badge>React</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="outline">Tailwind</Badge>
          </div>
          <div className="flex gap-2">
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}`

  return (
    <div className="bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-neutral-50">First Component</h1>
            <Badge variant="outline" className="text-brand-400 border-brand-400/20">
              Getting Started
            </Badge>
          </div>
          <p className="text-xl text-neutral-400 max-w-3xl">
            Create your first component using Nostromo UI. Learn the basics of importing and using our components.
          </p>
        </div>

        {/* Basic Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">Basic Example</h2>
          <p className="text-neutral-400 mb-6">
            Start with a simple component that demonstrates the basic usage of Nostromo UI.
          </p>
          <Playground initialCode={basicExample} />
        </section>

        {/* Multiple Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">Multiple Components</h2>
          <p className="text-neutral-400 mb-6">
            Combine multiple components to create more complex interfaces.
          </p>
          <Playground initialCode={multipleComponents} />
        </section>

        {/* Best Practices */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">Best Practices</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-green-900/10 border-green-500/20">
              <CardHeader>
                <CardTitle className="text-green-400">✅ Do</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-green-200 text-sm">
                  <li>• Import components individually</li>
                  <li>• Use semantic HTML elements</li>
                  <li>• Follow accessibility guidelines</li>
                  <li>• Use consistent spacing</li>
                  <li>• Test with screen readers</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-red-900/10 border-red-500/20">
              <CardHeader>
                <CardTitle className="text-red-400">❌ Don&apos;t</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-red-200 text-sm">
                  <li>• Import entire package</li>
                  <li>• Override component internals</li>
                  <li>• Ignore accessibility</li>
                  <li>• Use inline styles</li>
                  <li>• Skip testing</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Import Patterns */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">Import Patterns</h2>
          
          <Card className="bg-neutral-900/50 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-neutral-50">Recommended Import Pattern</CardTitle>
              <CardDescription>
                Import components individually for better tree-shaking and performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">✅ Good - Individual imports</h4>
                  <div className="bg-neutral-800 rounded-lg p-4 font-mono text-sm">
                    <div className="text-neutral-100">import {`{ Button }`} from &apos;@nostromo/ui-core/button&apos;</div>
                    <div className="text-neutral-100">import {`{ Card, CardContent }`} from &apos;@nostromo/ui-core/card&apos;</div>
                    <div className="text-neutral-100">import {`{ Badge }`} from &apos;@nostromo/ui-core/badge&apos;</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">❌ Avoid - Barrel imports</h4>
                  <div className="bg-neutral-800 rounded-lg p-4 font-mono text-sm">
                    <div className="text-neutral-100">import {`{ Button, Card, Badge }`} from &apos;@nostromo/ui-core&apos;</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Next Steps */}
        <div className="mt-12">
          <Card className="bg-brand-900/10 border-brand-500/20">
            <CardHeader>
              <CardTitle className="text-brand-400">Congratulations!</CardTitle>
              <CardDescription className="text-brand-300">
                You&apos;ve created your first Nostromo UI component. Explore more components and features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button asChild>
                  <a href="/components/button">Explore Components</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/theming/overview">Learn Theming</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
