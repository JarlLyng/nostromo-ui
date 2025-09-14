import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from '@nostromo/ui-core'

export default function ThemingOverviewPage() {
  return (
    <div className="bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-neutral-50">Theming Overview</h1>
            <Badge variant="outline" className="text-brand-400 border-brand-400/20">
              Theming
            </Badge>
          </div>
          <p className="text-xl text-neutral-400 max-w-3xl">
            Learn how Nostromo UI&apos;s theming system works and how to customize it for your needs.
          </p>
        </div>

        {/* Theme System */}
        <div className="space-y-8">
          <Card className="bg-neutral-900/50 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-neutral-50">CSS Variables Based Theming</CardTitle>
              <CardDescription>
                Nostromo UI uses CSS custom properties (variables) for theming, making it easy to customize and maintain.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">Theme Structure</h4>
                  <div className="bg-neutral-800 rounded-lg p-4 font-mono text-sm">
                    <div className="text-neutral-100">[data-theme=&quot;nostromo&quot;] {`{`}</div>
                    <div className="text-neutral-100">  {'/* Brand Colors */'}</div>
                    <div className="text-neutral-100">  --color-brand-500: 262 84% 52%;</div>
                    <div className="text-neutral-100">  --color-brand-600: 262 84% 45%;</div>
                    <div className="text-neutral-100">  </div>
                    <div className="text-neutral-100">  {'/* Neutral Colors */'}</div>
                    <div className="text-neutral-100">  --color-neutral-50: 0 0% 98%;</div>
                    <div className="text-neutral-100">  --color-neutral-900: 0 0% 9%;</div>
                    <div className="text-neutral-100">  </div>
                    <div className="text-neutral-100">  {'/* Spacing & Typography */'}</div>
                    <div className="text-neutral-100">  --spacing-md: 1rem;</div>
                    <div className="text-neutral-100">  --text-base: 1rem;</div>
                    <div className="text-neutral-100">{`}`}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/50 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-neutral-50">Color System</CardTitle>
              <CardDescription>
                Our color system is inspired by the USCSS Nostromo from Alien (1979) with a focus on industrial, space-grade aesthetics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">Brand Colors</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-brand-500"></div>
                      <span className="text-xs text-neutral-400">brand-500</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-brand-600"></div>
                      <span className="text-xs text-neutral-400">brand-600</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-brand-700"></div>
                      <span className="text-xs text-neutral-400">brand-700</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">Neutral Colors</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-neutral-100"></div>
                      <span className="text-xs text-neutral-400">neutral-100</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-neutral-500"></div>
                      <span className="text-xs text-neutral-400">neutral-500</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-neutral-900"></div>
                      <span className="text-xs text-neutral-400">neutral-900</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">Success Colors</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-success-500"></div>
                      <span className="text-xs text-neutral-400">success-500</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-success-600"></div>
                      <span className="text-xs text-neutral-400">success-600</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">Error Colors</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-error-500"></div>
                      <span className="text-xs text-neutral-400">error-500</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-error-600"></div>
                      <span className="text-xs text-neutral-400">error-600</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/50 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-neutral-50">Dark Mode Support</CardTitle>
              <CardDescription>
                Built-in support for dark mode with automatic color adjustments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">Automatic Dark Mode</h4>
                  <div className="bg-neutral-800 rounded-lg p-4 font-mono text-sm">
                    <div className="text-neutral-100">&lt;html data-theme=&quot;nostromo&quot; data-color-scheme=&quot;dark&quot;&gt;</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">System Preference</h4>
                  <div className="bg-neutral-800 rounded-lg p-4 font-mono text-sm">
                    <div className="text-neutral-100">@media (prefers-color-scheme: dark) {`{`}</div>
                    <div className="text-neutral-100">  {'/* Automatic dark mode styles */'}</div>
                    <div className="text-neutral-100">{`}`}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <div className="mt-12">
          <Card className="bg-brand-900/10 border-brand-500/20">
            <CardHeader>
              <CardTitle className="text-brand-400">Ready to Customize?</CardTitle>
              <CardDescription className="text-brand-300">
                Learn how to customize the theme for your specific needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button asChild>
                  <a href="/theming/customization">Customization Guide</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/theming/builder">Theme Builder</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
