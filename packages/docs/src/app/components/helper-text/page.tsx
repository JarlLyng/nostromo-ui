import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nostromo/ui-core'
import { Playground } from '@/components/playground/playground'

export default function HelperTextPage() {
  const defaultCode = `import { HelperText } from '@nostromo/ui-core/helper-text'

export function HelperTextExample() {
  return (
    <div className="space-y-4">
      <HelperText>This is default helper text</HelperText>
      <HelperText variant="error">This is an error message</HelperText>
      <HelperText variant="success">This is a success message</HelperText>
      <HelperText variant="warning">This is a warning message</HelperText>
    </div>
  )
}`

  const withInputsCode = `import { HelperText } from '@nostromo/ui-core/helper-text'
import { Input } from '@nostromo/ui-core/input'
import { Label } from '@nostromo/ui-core/label'

export function HelperTextWithInputs() {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" placeholder="john@example.com" type="email" className="mt-2" />
        <HelperText>We'll never share your email with anyone else.</HelperText>
      </div>
      
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" placeholder="Enter your password" type="password" className="mt-2" />
        <HelperText variant="error">Password must be at least 8 characters long.</HelperText>
      </div>
      
      <div>
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="johndoe" className="mt-2" />
        <HelperText variant="success">Username is available!</HelperText>
      </div>
    </div>
  )
}`

  const formValidationCode = `import { HelperText } from '@nostromo/ui-core/helper-text'
import { Input } from '@nostromo/ui-core/input'
import { Label } from '@nostromo/ui-core/label'
import { useState } from 'react'

export function FormValidation() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const isEmailValid = email.includes('@') && email.includes('.')
  const isPasswordValid = password.length >= 8
  
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input 
          id="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com" 
          type="email" 
          className="mt-2" 
        />
        {email && (
          <HelperText variant={isEmailValid ? 'success' : 'error'}>
            {isEmailValid ? 'Valid email address' : 'Please enter a valid email address'}
          </HelperText>
        )}
      </div>
      
      <div>
        <Label htmlFor="password">Password</Label>
        <Input 
          id="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password" 
          type="password" 
          className="mt-2" 
        />
        {password && (
          <HelperText variant={isPasswordValid ? 'success' : 'error'}>
            {isPasswordValid ? 'Strong password' : 'Password must be at least 8 characters'}
          </HelperText>
        )}
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
            <h1 className="text-4xl font-bold text-neutral-50">HelperText</h1>
            <Badge variant="outline" className="text-brand-400 border-brand-400/20">
              React
            </Badge>
          </div>
          <p className="text-xl text-neutral-400 max-w-3xl">
            Displays helper text for form elements. Perfect for providing additional context, 
            validation messages, or instructions. Supports different variants for different states.
          </p>
        </div>

        {/* Installation */}
        <Card className="mb-8 bg-neutral-900/50 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-neutral-50">Installation</CardTitle>
            <CardDescription>
              Install the HelperText component and its dependencies.
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
            Helper text is commonly used with form inputs to provide context and validation messages.
          </p>
          <Playground initialCode={withInputsCode} />
        </section>

        {/* Form Validation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">Form Validation</h2>
          <p className="text-neutral-400 mb-6">
            Use different variants to show validation states and provide real-time feedback.
          </p>
          <Playground initialCode={formValidationCode} />
        </section>

        {/* API Reference */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">API Reference</h2>
          
          <Card className="bg-neutral-900/50 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-neutral-50">HelperText Props</CardTitle>
              <CardDescription>
                All the props available for the HelperText component.
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
                      <td className="py-3 px-4 font-mono text-brand-400">variant</td>
                      <td className="py-3 px-4">&quot;default&quot; | &quot;error&quot; | &quot;success&quot; | &quot;warning&quot;</td>
                      <td className="py-3 px-4 font-mono">&quot;default&quot;</td>
                      <td className="py-3 px-4">The visual style variant of the helper text</td>
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
                      <td className="py-3 px-4">The helper text content</td>
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
                The HelperText component follows accessibility best practices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-green-200">
                <li>• High contrast ratios for all variants</li>
                <li>• Screen reader friendly with semantic HTML</li>
                <li>• Color is not the only way to convey information</li>
                <li>• Proper association with form controls</li>
                <li>• Semantic HTML structure with appropriate roles</li>
                <li>• Clear visual hierarchy and typography</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
