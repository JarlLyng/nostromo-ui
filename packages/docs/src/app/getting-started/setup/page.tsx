import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from '@nostromo/ui-core'

export default function SetupPage() {
  return (
    <div className="bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-neutral-50">Setup</h1>
            <Badge variant="outline" className="text-brand-400 border-brand-400/20">
              Getting Started
            </Badge>
          </div>
          <p className="text-xl text-neutral-400 max-w-3xl">
            Learn how to set up Nostromo UI in your React or Next.js project.
          </p>
        </div>

        {/* Framework Setup */}
        <div className="space-y-8">
          <Card className="bg-neutral-900/50 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-neutral-50">React Setup</CardTitle>
              <CardDescription>
                Set up Nostromo UI in a React application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">1. Install dependencies</h4>
                  <div className="bg-neutral-800 rounded-lg p-4 font-mono text-sm">
                    <div className="text-neutral-100">pnpm add @nostromo/ui-core @nostromo/ui-tw</div>
                    <div className="text-neutral-100">pnpm add -D tailwindcss postcss autoprefixer</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">2. Initialize Tailwind</h4>
                  <div className="bg-neutral-800 rounded-lg p-4 font-mono text-sm">
                    <div className="text-neutral-100">npx tailwindcss init -p</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">3. Configure Tailwind</h4>
                  <div className="bg-neutral-800 rounded-lg p-4 font-mono text-sm">
                    <div className="text-neutral-100">{'// tailwind.config.js'}</div>
                    <div className="text-neutral-100">import {`{ nostromoPreset }`} from &apos;@nostromo/ui-tw&apos;</div>
                    <div className="text-neutral-100"></div>
                    <div className="text-neutral-100">export default {`{`}</div>
                    <div className="text-neutral-100">  content: [&apos;./src/**/*.{`{js,ts,jsx,tsx}`}&apos;],</div>
                    <div className="text-neutral-100">  presets: [nostromoPreset],</div>
                    <div className="text-neutral-100">{`}`}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/50 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-neutral-50">Next.js Setup</CardTitle>
              <CardDescription>
                Set up Nostromo UI in a Next.js application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">1. Install dependencies</h4>
                  <div className="bg-neutral-800 rounded-lg p-4 font-mono text-sm">
                    <div className="text-neutral-100">pnpm add @nostromo/ui-core @nostromo/ui-tw</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">2. Configure Tailwind</h4>
                  <div className="bg-neutral-800 rounded-lg p-4 font-mono text-sm">
                    <div className="text-neutral-100">{'// tailwind.config.ts'}</div>
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

                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">3. Add global styles</h4>
                  <div className="bg-neutral-800 rounded-lg p-4 font-mono text-sm">
                    <div className="text-neutral-100">{'// app/globals.css'}</div>
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
              <CardTitle className="text-neutral-50">First Component</CardTitle>
              <CardDescription>
                Create your first component with Nostromo UI.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">Example: Button Component</h4>
                  <div className="bg-neutral-800 rounded-lg p-4 font-mono text-sm">
                    <div className="text-neutral-100">import {`{ Button }`} from &apos;@nostromo/ui-core/button&apos;</div>
                    <div className="text-neutral-100"></div>
                    <div className="text-neutral-100">export function MyButton() {`{`}</div>
                    <div className="text-neutral-100">  return (</div>
                    <div className="text-neutral-100">    &lt;Button&gt;Click me&lt;/Button&gt;</div>
                    <div className="text-neutral-100">  )</div>
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
              <CardTitle className="text-brand-400">Ready to Go!</CardTitle>
              <CardDescription className="text-brand-300">
                Your Nostromo UI setup is complete. Start building with our components.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button asChild>
                  <a href="/getting-started/first-component">First Component</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/components/button">Browse Components</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
