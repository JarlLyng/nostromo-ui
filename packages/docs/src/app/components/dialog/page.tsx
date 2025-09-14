import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nostromo/ui-core'
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@nostromo/ui-core/dialog'
// import { Button } from '@nostromo/ui-core/button'
import { Playground } from '@/components/playground/playground'

export default function DialogPage() {
  const defaultCode = `import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@nostromo/ui-core/dialog'
import { Button } from '@nostromo/ui-core/button'
import { useState } from 'react'

export function DialogExample() {
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="destructive">Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}`

  const sizesCode = `import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@nostromo/ui-core/dialog'
import { Button } from '@nostromo/ui-core/button'
import { useState } from 'react'

export function DialogSizes() {
  const [smallOpen, setSmallOpen] = useState(false)
  const [largeOpen, setLargeOpen] = useState(false)
  
  return (
    <div className="flex gap-4">
      <Button variant="outline" onClick={() => setSmallOpen(true)}>Small Dialog</Button>
      <Dialog open={smallOpen} onOpenChange={setSmallOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Small Dialog</DialogTitle>
            <DialogDescription>
              This is a small dialog with limited content.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      
      <Button variant="outline" onClick={() => setLargeOpen(true)}>Large Dialog</Button>
      <Dialog open={largeOpen} onOpenChange={setLargeOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Large Dialog</DialogTitle>
            <DialogDescription>
              This is a large dialog that can contain more content and complex layouts.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-sm text-neutral-400">
              You can put any content here, including forms, images, or other components.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}`

  const formCode = `import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@nostromo/ui-core/dialog'
import { Button } from '@nostromo/ui-core/button'
import { Input } from '@nostromo/ui-core/input'
import { useState } from 'react'

export function DialogForm() {
  const [open, setOpen] = useState(false)
  
  return (
    <>
      <Button onClick={() => setOpen(true)}>Create Account</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Account</DialogTitle>
            <DialogDescription>
              Enter your information to create a new account.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Full Name
              </label>
              <Input placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Email
              </label>
              <Input placeholder="john@example.com" type="email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Password
              </label>
              <Input placeholder="Enter password" type="password" />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit">Create Account</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}`

  return (
    <div className="bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-neutral-50">Dialog</h1>
            <Badge variant="outline" className="text-brand-400 border-brand-400/20">
              React
            </Badge>
          </div>
          <p className="text-xl text-neutral-400 max-w-3xl">
            Displays a modal dialog that overlays the main content. Perfect for confirmations, 
            forms, and any content that requires user attention. Built with accessibility in mind.
          </p>
        </div>

        {/* Installation */}
        <Card className="mb-8 bg-neutral-900/50 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-neutral-50">Installation</CardTitle>
            <CardDescription>
              Install the Dialog component and its dependencies.
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

        {/* Sizes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">Sizes</h2>
          <p className="text-neutral-400 mb-6">
            Control the size of the dialog with Tailwind CSS classes.
          </p>
          <Playground initialCode={sizesCode} />
        </section>

        {/* Form Dialog */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">Form Dialog</h2>
          <p className="text-neutral-400 mb-6">
            Dialogs can contain forms and complex content.
          </p>
          <Playground initialCode={formCode} />
        </section>

        {/* API Reference */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">API Reference</h2>
          
          <div className="space-y-6">
            <Card className="bg-neutral-900/50 border-neutral-700">
              <CardHeader>
                <CardTitle className="text-neutral-50">Dialog Props</CardTitle>
                <CardDescription>
                  Props for the main Dialog component.
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
                        <td className="py-3 px-4 font-mono text-brand-400">open</td>
                        <td className="py-3 px-4">boolean</td>
                        <td className="py-3 px-4 font-mono">undefined</td>
                        <td className="py-3 px-4">Whether the dialog is open</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-3 px-4 font-mono text-brand-400">onOpenChange</td>
                        <td className="py-3 px-4">(open: boolean) =&gt; void</td>
                        <td className="py-3 px-4 font-mono">undefined</td>
                        <td className="py-3 px-4">Called when the open state changes</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-mono text-brand-400">children</td>
                        <td className="py-3 px-4">ReactNode</td>
                        <td className="py-3 px-4 font-mono">undefined</td>
                        <td className="py-3 px-4">Dialog content (Trigger and Content)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900/50 border-neutral-700">
              <CardHeader>
                <CardTitle className="text-neutral-50">DialogContent Props</CardTitle>
                <CardDescription>
                  Props for the DialogContent component.
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
                        <td className="py-3 px-4">The dialog content</td>
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
                The Dialog component follows accessibility best practices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-green-200">
                <li>• Proper focus management and trapping</li>
                <li>• Screen reader friendly with appropriate ARIA attributes</li>
                <li>• Keyboard navigation support (Escape to close)</li>
                <li>• High contrast ratios for all content</li>
                <li>• Semantic HTML structure with proper roles</li>
                <li>• Backdrop click to close functionality</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
