import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nostromo/ui-core'
import { Playground } from '@/components/playground/playground'

export default function ErrorMessagePage() {
  const defaultCode = `import { ErrorMessage } from '@nostromo/ui-core/error-message'

export function ErrorMessageExample() {
  return (
    <div className="space-y-4">
      <ErrorMessage>This is a default error message</ErrorMessage>
      <ErrorMessage variant="inline">This is an inline error message</ErrorMessage>
    </div>
  )
}`

  const withInputsCode = `import { ErrorMessage } from '@nostromo/ui-core/error-message'
import { Input } from '@nostromo/ui-core/input'
import { Label } from '@nostromo/ui-core/label'

export function ErrorMessageWithInputs() {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" placeholder="john@example.com" type="email" className="mt-2" />
        <ErrorMessage>Please enter a valid email address</ErrorMessage>
      </div>
      
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" placeholder="Enter your password" type="password" className="mt-2" />
        <ErrorMessage variant="inline">Password must be at least 8 characters long</ErrorMessage>
      </div>
    </div>
  )
}`

  const formValidationCode = `import { ErrorMessage } from '@nostromo/ui-core/error-message'
import { Input } from '@nostromo/ui-core/input'
import { Label } from '@nostromo/ui-core/label'
import { useState } from 'react'

export function FormValidation() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ email: '', password: '' })
  
  const validateForm = () => {
    const newErrors = { email: '', password: '' }
    
    if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long'
    }
    
    setErrors(newErrors)
  }
  
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
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
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
        {errors.password && <ErrorMessage variant="inline">{errors.password}</ErrorMessage>}
      </div>
      
      <button 
        onClick={validateForm}
        className="px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-600"
      >
        Validate Form
      </button>
    </div>
  )
}`

  const accessibilityCode = `import { ErrorMessage } from '@nostromo/ui-core/error-message'
import { Input } from '@nostromo/ui-core/input'
import { Label } from '@nostromo/ui-core/label'

export function AccessibilityExample() {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="required-field">Required Field *</Label>
        <Input 
          id="required-field" 
          placeholder="This field is required" 
          className="mt-2" 
          aria-describedby="required-error"
          aria-invalid="true"
        />
        <ErrorMessage id="required-error">
          This field is required and cannot be empty
        </ErrorMessage>
      </div>
      
      <div>
        <Label htmlFor="email-field">Email Address</Label>
        <Input 
          id="email-field" 
          placeholder="john@example.com" 
          type="email" 
          className="mt-2"
          aria-describedby="email-error"
          aria-invalid="true"
        />
        <ErrorMessage id="email-error" variant="inline">
          Please enter a valid email address with @ symbol
        </ErrorMessage>
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
            <h1 className="text-4xl font-bold text-neutral-50">ErrorMessage</h1>
            <Badge variant="outline" className="text-brand-400 border-brand-400/20">
              React
            </Badge>
          </div>
          <p className="text-xl text-neutral-400 max-w-3xl">
            Displays error messages for form elements. Essential for form validation and user feedback. 
            Includes proper ARIA attributes for accessibility and screen reader support.
          </p>
        </div>

        {/* Installation */}
        <Card className="mb-8 bg-neutral-900/50 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-neutral-50">Installation</CardTitle>
            <CardDescription>
              Install the ErrorMessage component and its dependencies.
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
            Error messages are commonly used with form inputs to show validation errors.
          </p>
          <Playground initialCode={withInputsCode} />
        </section>

        {/* Form Validation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">Form Validation</h2>
          <p className="text-neutral-400 mb-6">
            Use error messages to provide real-time validation feedback to users.
          </p>
          <Playground initialCode={formValidationCode} />
        </section>

        {/* Accessibility */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">Accessibility Example</h2>
          <p className="text-neutral-400 mb-6">
            Proper ARIA attributes and associations for screen readers and assistive technologies.
          </p>
          <Playground initialCode={accessibilityCode} />
        </section>

        {/* API Reference */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">API Reference</h2>
          
          <Card className="bg-neutral-900/50 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-neutral-50">ErrorMessage Props</CardTitle>
              <CardDescription>
                All the props available for the ErrorMessage component.
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
                      <td className="py-3 px-4">&quot;default&quot; | &quot;inline&quot;</td>
                      <td className="py-3 px-4 font-mono">&quot;default&quot;</td>
                      <td className="py-3 px-4">The visual style variant of the error message</td>
                    </tr>
                    <tr className="border-b border-neutral-800">
                      <td className="py-3 px-4 font-mono text-brand-400">id</td>
                      <td className="py-3 px-4">string</td>
                      <td className="py-3 px-4 font-mono">undefined</td>
                      <td className="py-3 px-4">ID for accessibility association with form controls</td>
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
                      <td className="py-3 px-4">The error message content</td>
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
                The ErrorMessage component follows accessibility best practices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-green-200">
                <li>• Proper ARIA attributes (role=&quot;alert&quot;, aria-live=&quot;polite&quot;)</li>
                <li>• Screen reader friendly with semantic HTML</li>
                <li>• High contrast ratios for all variants</li>
                <li>• Proper association with form controls using id and aria-describedby</li>
                <li>• Semantic HTML structure with appropriate roles</li>
                <li>• Live region announcements for dynamic error messages</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
