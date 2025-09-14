import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from '@nostromo/ui-core'

export default function InstallationPage() {
  return (
    <div className="bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-neutral-50">Installation</h1>
            <Badge variant="outline" className="text-brand-400 border-brand-400/20">
              Getting Started
            </Badge>
          </div>
          <p className="text-xl text-neutral-400 max-w-3xl">
            Get started with Nostromo UI by installing the core package and setting up your project.
          </p>
        </div>

        {/* Installation Steps */}
        <div className="space-y-8">
          <Card className="bg-neutral-900/50 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-neutral-50">1. Install the Package</CardTitle>
              <CardDescription>
                Install Nostromo UI using your preferred package manager.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">Using pnpm (recommended)</h4>
                  <div className="bg-neutral-800 rounded-lg p-4 font-mono text-sm">
                    <div className="text-neutral-400 mb-2"># Install core components</div>
                    <div className="text-neutral-100">pnpm add @nostromo/ui-core</div>
                    <div className="text-neutral-400 mb-2 mt-4"># Install Tailwind preset</div>
                    <div className="text-neutral-100">pnpm add @nostromo/ui-tw</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">Using npm</h4>
                  <div className="bg-neutral-800 rounded-lg p-4 font-mono text-sm">
                    <div className="text-neutral-400 mb-2"># Install core components</div>
                    <div className="text-neutral-100">npm install @nostromo/ui-core</div>
                    <div className="text-neutral-400 mb-2 mt-4"># Install Tailwind preset</div>
                    <div className="text-neutral-100">npm install @nostromo/ui-tw</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">Using yarn</h4>
                  <div className="bg-neutral-800 rounded-lg p-4 font-mono text-sm">
                    <div className="text-neutral-400 mb-2"># Install core components</div>
                    <div className="text-neutral-100">yarn add @nostromo/ui-core</div>
                    <div className="text-neutral-400 mb-2 mt-4"># Install Tailwind preset</div>
                    <div className="text-neutral-100">yarn add @nostromo/ui-tw</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/50 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-neutral-50">2. Configure Tailwind CSS</CardTitle>
              <CardDescription>
                Set up Tailwind CSS with the Nostromo preset.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">tailwind.config.js</h4>
                  <div className="bg-neutral-800 rounded-lg p-4 font-mono text-sm">
                    <div className="text-neutral-100">import type {`{ Config }`} from &apos;tailwindcss&apos;</div>
                    <div className="text-neutral-100">import {`{ nostromoPreset }`} from &apos;@nostromo/ui-tw&apos;</div>
                    <div className="text-neutral-100"></div>
                    <div className="text-neutral-100">const config: Config = {`{`}</div>
                    <div className="text-neutral-100">  content: [</div>
                    <div className="text-neutral-100">    &apos;./src/**/*.{`{js,ts,jsx,tsx,mdx}`}&apos;,</div>
                    <div className="text-neutral-100">  ],</div>
                    <div className="text-neutral-100">  presets: [nostromoPreset],</div>
                    <div className="text-neutral-100">{`}`}</div>
                    <div className="text-neutral-100"></div>
                    <div className="text-neutral-100">export default config</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/50 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-neutral-50">3. Add Theme CSS</CardTitle>
              <CardDescription>
                Import the Nostromo theme CSS in your application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">globals.css</h4>
                  <div className="bg-neutral-800 rounded-lg p-4 font-mono text-sm">
                    <div className="text-neutral-100">@import &apos;tailwindcss&apos;;</div>
                    <div className="text-neutral-100">@import &apos;@nostromo/ui-tw/base.css&apos;;</div>
                    <div className="text-neutral-100">@import &apos;@nostromo/ui-tw/themes/nostromo.css&apos;;</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/50 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-neutral-50">4. Set Theme Attribute</CardTitle>
              <CardDescription>
                Add the theme attribute to your HTML element.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">HTML</h4>
                  <div className="bg-neutral-800 rounded-lg p-4 font-mono text-sm">
                    <div className="text-neutral-100">&lt;html lang=&quot;en&quot; data-theme=&quot;nostromo&quot; data-color-scheme=&quot;dark&quot;&gt;</div>
                    <div className="text-neutral-100">  &lt;body&gt;</div>
                    <div className="text-neutral-100">    &lt;!-- Your app content --&gt;</div>
                    <div className="text-neutral-100">  &lt;/body&gt;</div>
                    <div className="text-neutral-100">&lt;/html&gt;</div>
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
              <CardTitle className="text-brand-400">Next Steps</CardTitle>
              <CardDescription className="text-brand-300">
                You&apos;re ready to start using Nostromo UI components!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button asChild>
                  <a href="/getting-started/setup">Setup Guide</a>
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
