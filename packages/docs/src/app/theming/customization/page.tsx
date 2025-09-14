import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from '@nostromo/ui-core'

export default function ThemingCustomizationPage() {
  return (
    <div className="bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-neutral-50">Customization</h1>
            <Badge variant="outline" className="text-brand-400 border-brand-400/20">
              Theming
            </Badge>
          </div>
          <p className="text-xl text-neutral-400 max-w-3xl">
            Learn how to customize Nostromo UI themes to match your brand and design requirements.
          </p>
        </div>

        {/* Customization Methods */}
        <div className="space-y-8">
          <Card className="bg-neutral-900/50 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-neutral-50">Method 1: CSS Variables Override</CardTitle>
              <CardDescription>
                Override CSS variables to customize colors, spacing, and other theme properties.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">Custom Theme</h4>
                  <div className="bg-neutral-800 rounded-lg p-4 font-mono text-sm">
                    <div className="text-neutral-100">[data-theme=&quot;custom&quot;] {`{`}</div>
                    <div className="text-neutral-100">  {'/* Override brand colors */'}</div>
                    <div className="text-neutral-100">  --color-brand-500: 120 100% 50%; /* Green */</div>
                    <div className="text-neutral-100">  --color-brand-600: 120 100% 40%;</div>
                    <div className="text-neutral-100">  </div>
                    <div className="text-neutral-100">  {'/* Override spacing */'}</div>
                    <div className="text-neutral-100">  --spacing-md: 1.25rem;</div>
                    <div className="text-neutral-100">  </div>
                    <div className="text-neutral-100">  {'/* Override typography */'}</div>
                    <div className="text-neutral-100">  --font-heading: &quot;Roboto&quot;, sans-serif;</div>
                    <div className="text-neutral-100">{`}`}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/50 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-neutral-50">Method 2: Tailwind Config Extension</CardTitle>
              <CardDescription>
                Extend the Tailwind configuration to add custom colors and utilities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">tailwind.config.js</h4>
                  <div className="bg-neutral-800 rounded-lg p-4 font-mono text-sm">
                    <div className="text-neutral-100">import {`{ nostromoPreset }`} from &apos;@nostromo/ui-tw&apos;</div>
                    <div className="text-neutral-100"></div>
                    <div className="text-neutral-100">export default {`{`}</div>
                    <div className="text-neutral-100">  presets: [nostromoPreset],</div>
                    <div className="text-neutral-100">  theme: {`{`}</div>
                    <div className="text-neutral-100">    extend: {`{`}</div>
                    <div className="text-neutral-100">      colors: {`{`}</div>
                    <div className="text-neutral-100">        {'// Add custom colors'}</div>
                    <div className="text-neutral-100">        custom: {`{`}</div>
                    <div className="text-neutral-100">          500: &apos;#10b981&apos;,</div>
                    <div className="text-neutral-100">          600: &apos;#059669&apos;,</div>
                    <div className="text-neutral-100">        {`}`}</div>
                    <div className="text-neutral-100">      {`}`}</div>
                    <div className="text-neutral-100">    {`}`}</div>
                    <div className="text-neutral-100">  {`}`}</div>
                    <div className="text-neutral-100">{`}`}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/50 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-neutral-50">Method 3: Component-Level Customization</CardTitle>
              <CardDescription>
                Customize individual components using className props and CSS.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">Custom Button Styles</h4>
                  <div className="bg-neutral-800 rounded-lg p-4 font-mono text-sm">
                    <div className="text-neutral-100">import {`{ Button }`} from &apos;@nostromo/ui-core/button&apos;</div>
                    <div className="text-neutral-100"></div>
                    <div className="text-neutral-100">export function CustomButton() {`{`}</div>
                    <div className="text-neutral-100">  return (</div>
                    <div className="text-neutral-100">    &lt;Button </div>
                    <div className="text-neutral-100">      className=&quot;bg-gradient-to-r from-purple-500 to-pink-500&quot;</div>
                    <div className="text-neutral-100">    &gt;</div>
                    <div className="text-neutral-100">      Custom Button</div>
                    <div className="text-neutral-100">    &lt;/Button&gt;</div>
                    <div className="text-neutral-100">  )</div>
                    <div className="text-neutral-100">{`}`}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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
                  <li>• Use CSS variables for consistency</li>
                  <li>• Maintain color contrast ratios</li>
                  <li>• Test in both light and dark modes</li>
                  <li>• Document your customizations</li>
                  <li>• Use semantic color names</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-red-900/10 border-red-500/20">
              <CardHeader>
                <CardTitle className="text-red-400">❌ Don&apos;t</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-red-200 text-sm">
                  <li>• Override component internals</li>
                  <li>• Use hardcoded color values</li>
                  <li>• Ignore accessibility guidelines</li>
                  <li>• Create too many custom variants</li>
                  <li>• Break the design system</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Next Steps */}
        <div className="mt-12">
          <Card className="bg-brand-900/10 border-brand-500/20">
            <CardHeader>
              <CardTitle className="text-brand-400">Ready to Build?</CardTitle>
              <CardDescription className="text-brand-300">
                Use the theme builder to create your custom theme visually.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button asChild>
                  <a href="/theming/builder">Theme Builder</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/components/button">View Components</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
