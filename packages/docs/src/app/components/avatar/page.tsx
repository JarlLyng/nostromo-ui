import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@nostromo/ui-core'
// import { Avatar } from '@nostromo/ui-core/avatar'
import { Playground } from '@/components/playground/playground'

export default function AvatarPage() {
  const defaultCode = `import { Avatar } from '@nostromo/ui-core/avatar'

export function AvatarExample() {
  return (
    <div className="flex gap-4">
      <Avatar>
        <Avatar.Image src="https://github.com/shadcn.png" alt="User" />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>
    </div>
  )
}`

  const sizesCode = `import { Avatar } from '@nostromo/ui-core/avatar'

export function AvatarSizes() {
  return (
    <div className="flex gap-4 items-center">
      <Avatar className="h-8 w-8">
        <Avatar.Image src="https://github.com/shadcn.png" alt="User" />
        <Avatar.Fallback>SM</Avatar.Fallback>
      </Avatar>
      <Avatar className="h-10 w-10">
        <Avatar.Image src="https://github.com/shadcn.png" alt="User" />
        <Avatar.Fallback>MD</Avatar.Fallback>
      </Avatar>
      <Avatar className="h-12 w-12">
        <Avatar.Image src="https://github.com/shadcn.png" alt="User" />
        <Avatar.Fallback>LG</Avatar.Fallback>
      </Avatar>
      <Avatar className="h-16 w-16">
        <Avatar.Image src="https://github.com/shadcn.png" alt="User" />
        <Avatar.Fallback>XL</Avatar.Fallback>
      </Avatar>
    </div>
  )
}`

  const variantsCode = `import { Avatar } from '@nostromo/ui-core/avatar'

export function AvatarVariants() {
  return (
    <div className="flex gap-4">
      <Avatar>
        <Avatar.Image src="https://github.com/shadcn.png" alt="User" />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar>
      <Avatar className="ring-2 ring-brand-500">
        <Avatar.Image src="https://github.com/shadcn.png" alt="User" />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar>
      <Avatar className="border-2 border-success-500">
        <Avatar.Image src="https://github.com/shadcn.png" alt="User" />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar>
    </div>
  )
}`

  const groupCode = `import { Avatar } from '@nostromo/ui-core/avatar'

export function AvatarGroup() {
  return (
    <div className="flex -space-x-2">
      <Avatar className="border-2 border-neutral-900">
        <Avatar.Image src="https://github.com/shadcn.png" alt="User 1" />
        <Avatar.Fallback>U1</Avatar.Fallback>
      </Avatar>
      <Avatar className="border-2 border-neutral-900">
        <Avatar.Image src="https://github.com/vercel.png" alt="User 2" />
        <Avatar.Fallback>U2</Avatar.Fallback>
      </Avatar>
      <Avatar className="border-2 border-neutral-900">
        <Avatar.Image src="https://github.com/nextjs.png" alt="User 3" />
        <Avatar.Fallback>U3</Avatar.Fallback>
      </Avatar>
      <Avatar className="border-2 border-neutral-900">
        <Avatar.Fallback>+5</Avatar.Fallback>
      </Avatar>
    </div>
  )
}`

  return (
    <div className="bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-neutral-50">Avatar</h1>
            <Badge variant="outline" className="text-brand-400 border-brand-400/20">
              React
            </Badge>
          </div>
          <p className="text-xl text-neutral-400 max-w-3xl">
            Displays an avatar image with a fallback. Perfect for user profiles, team members, 
            and any scenario where you need to display a user&apos;s image or initials.
          </p>
        </div>

        {/* Installation */}
        <Card className="mb-8 bg-neutral-900/50 border-neutral-700">
          <CardHeader>
            <CardTitle className="text-neutral-50">Installation</CardTitle>
            <CardDescription>
              Install the Avatar component and its dependencies.
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
            Control the size of the avatar with Tailwind CSS classes.
          </p>
          <Playground initialCode={sizesCode} />
        </section>

        {/* Variants */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">Variants</h2>
          <p className="text-neutral-400 mb-6">
            Customize the avatar appearance with borders and rings.
          </p>
          <Playground initialCode={variantsCode} />
        </section>

        {/* Group */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">Avatar Group</h2>
          <p className="text-neutral-400 mb-6">
            Create avatar groups for team members or multiple users.
          </p>
          <Playground initialCode={groupCode} />
        </section>

        {/* API Reference */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-50 mb-6">API Reference</h2>
          
          <div className="space-y-6">
            <Card className="bg-neutral-900/50 border-neutral-700">
              <CardHeader>
                <CardTitle className="text-neutral-50">Avatar Props</CardTitle>
                <CardDescription>
                  Props for the main Avatar component.
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
                        <td className="py-3 px-4">Avatar content (Image and Fallback)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900/50 border-neutral-700">
              <CardHeader>
                <CardTitle className="text-neutral-50">Avatar.Image Props</CardTitle>
                <CardDescription>
                  Props for the Avatar.Image component.
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
                        <td className="py-3 px-4 font-mono text-brand-400">src</td>
                        <td className="py-3 px-4">string</td>
                        <td className="py-3 px-4 font-mono">undefined</td>
                        <td className="py-3 px-4">The image source URL</td>
                      </tr>
                      <tr className="border-b border-neutral-800">
                        <td className="py-3 px-4 font-mono text-brand-400">alt</td>
                        <td className="py-3 px-4">string</td>
                        <td className="py-3 px-4 font-mono">undefined</td>
                        <td className="py-3 px-4">Alternative text for the image</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-mono text-brand-400">className</td>
                        <td className="py-3 px-4">string</td>
                        <td className="py-3 px-4 font-mono">undefined</td>
                        <td className="py-3 px-4">Additional CSS classes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900/50 border-neutral-700">
              <CardHeader>
                <CardTitle className="text-neutral-50">Avatar.Fallback Props</CardTitle>
                <CardDescription>
                  Props for the Avatar.Fallback component.
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
                        <td className="py-3 px-4">Fallback content (usually initials)</td>
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
                The Avatar component follows accessibility best practices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-green-200">
                <li>• Proper alt text for images</li>
                <li>• Fallback content for when images fail to load</li>
                <li>• High contrast ratios for fallback text</li>
                <li>• Screen reader friendly with appropriate ARIA attributes</li>
                <li>• Semantic HTML structure</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
