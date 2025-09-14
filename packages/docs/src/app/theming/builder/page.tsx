import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from '@nostromo/ui-core'

export default function ThemeBuilderPage() {
  return (
    <div className="bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-neutral-50">Theme Builder</h1>
            <Badge variant="outline" className="text-brand-400 border-brand-400/20">
              Theming
            </Badge>
          </div>
          <p className="text-xl text-neutral-400 max-w-3xl">
            Build and preview your custom theme with our interactive theme builder. Coming soon!
          </p>
        </div>

        {/* Coming Soon */}
        <Card className="bg-neutral-900/50 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-neutral-50">Interactive Theme Builder</CardTitle>
            <CardDescription>
              We&apos;re working on an interactive theme builder that will allow you to customize colors, spacing, typography, and more in real-time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-brand-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-50 mb-2">Coming Soon</h3>
                <p className="text-neutral-400">
                  The interactive theme builder is currently in development.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-brand-900/10 border-brand-500/20">
                  <CardHeader>
                    <CardTitle className="text-brand-400">Planned Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-brand-200 text-sm">
                      <li>• Real-time color customization</li>
                      <li>• Live preview of components</li>
                      <li>• Export CSS variables</li>
                      <li>• Save and share themes</li>
                      <li>• Accessibility validation</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-neutral-800/50 border-neutral-600">
                  <CardHeader>
                    <CardTitle className="text-neutral-300">Current Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-neutral-400 text-sm">
                      <li>• Manual CSS variable override</li>
                      <li>• Tailwind config extension</li>
                      <li>• Component-level customization</li>
                      <li>• Copy-paste theme examples</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Manual Theme Creation */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">Manual Theme Creation</h2>
          
          <Card className="bg-neutral-900/50 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-neutral-50">Create Your Own Theme</CardTitle>
              <CardDescription>
                While we work on the interactive builder, you can create custom themes manually.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">1. Define Your Theme</h4>
                  <div className="bg-neutral-800 rounded-lg p-4 font-mono text-sm">
                    <div className="text-neutral-100">[data-theme=&quot;my-custom-theme&quot;] {`{`}</div>
                    <div className="text-neutral-100">  {'/* Brand Colors */'}</div>
                    <div className="text-neutral-100">  --color-brand-500: 142 76% 36%;</div>
                    <div className="text-neutral-100">  --color-brand-600: 142 76% 30%;</div>
                    <div className="text-neutral-100">  </div>
                    <div className="text-neutral-100">  {'/* Neutral Colors */'}</div>
                    <div className="text-neutral-100">  --color-neutral-50: 0 0% 98%;</div>
                    <div className="text-neutral-100">  --color-neutral-900: 0 0% 9%;</div>
                    <div className="text-neutral-100">  </div>
                    <div className="text-neutral-100">  {'/* Spacing */'}</div>
                    <div className="text-neutral-100">  --spacing-md: 1rem;</div>
                    <div className="text-neutral-100">  --spacing-lg: 1.5rem;</div>
                    <div className="text-neutral-100">{`}`}</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">2. Apply Your Theme</h4>
                  <div className="bg-neutral-800 rounded-lg p-4 font-mono text-sm">
                    <div className="text-neutral-100">&lt;html data-theme=&quot;my-custom-theme&quot;&gt;</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">3. Test Your Theme</h4>
                  <div className="bg-neutral-800 rounded-lg p-4 font-mono text-sm">
                    <div className="text-neutral-100">{'// Test with different components'}</div>
                    <div className="text-neutral-100">&lt;Button&gt;Test Button&lt;/Button&gt;</div>
                    <div className="text-neutral-100">&lt;Card&gt;Test Card&lt;/Card&gt;</div>
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
              <CardTitle className="text-brand-400">Stay Updated</CardTitle>
              <CardDescription className="text-brand-300">
                Follow our development progress and get notified when the theme builder is ready.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button asChild>
                  <a href="/theming/customization">Customization Guide</a>
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
