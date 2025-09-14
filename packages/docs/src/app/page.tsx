import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nostromo/ui-core'

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            {/* Badge */}
            <div className="mb-8">
              <Badge variant="outline" className="bg-brand-500/10 border-brand-500/20 text-brand-400">
                🚀 Space-grade UI Components
              </Badge>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="text-neutral-50">In space, no one can hear you</span>
              <br />
              <span className="text-brand-400">scream...</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              but everyone can see your beautiful UI. Meet Nostromo UI - a modern component library 
              inspired by the USCSS Nostromo from Alien (1979).
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="lg" className="bg-brand-500 hover:bg-brand-600 text-white">
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-neutral-700 hover:bg-neutral-800"
                asChild
              >
                <a href="/components/button">View Components</a>
              </Button>
            </div>

            {/* Framework Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className="text-neutral-500">Choose your framework:</span>
              <div className="flex bg-neutral-800 rounded-lg p-1">
                <button className="px-4 py-2 rounded-md bg-brand-500 text-white text-sm font-medium">
                  React
                </button>
                <button className="px-4 py-2 rounded-md text-neutral-400 hover:text-white text-sm font-medium">
                  Vue
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-50 mb-4">
              Built for the modern developer
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Everything you need to build beautiful, accessible, and performant user interfaces.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-neutral-800/50 border-neutral-700">
              <CardHeader>
                <CardTitle className="text-neutral-50">Dual Framework Support</CardTitle>
                <CardDescription>
                  Works seamlessly with both React and Vue 3. Same components, different frameworks.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Vue</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-neutral-800/50 border-neutral-700">
              <CardHeader>
                <CardTitle className="text-neutral-50">Accessibility First</CardTitle>
                <CardDescription>
                  WCAG 2.1 AA compliant components with proper ARIA attributes and keyboard navigation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline" className="text-green-400 border-green-400/20">
                  89.6% Coverage
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-neutral-800/50 border-neutral-700">
              <CardHeader>
                <CardTitle className="text-neutral-50">TypeScript Ready</CardTitle>
                <CardDescription>
                  Built with TypeScript from the ground up. Full type safety and excellent developer experience.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline" className="text-blue-400 border-blue-400/20">
                  Type Safe
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-neutral-500">
            Built with ❤️ by the Nostromo UI team. Inspired by the USCSS Nostromo.
          </p>
        </div>
      </footer>
    </div>
  )
}
