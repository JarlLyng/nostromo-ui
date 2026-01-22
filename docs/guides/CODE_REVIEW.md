# Code Review Guide

This guide helps reviewers understand how to effectively review code in the Nostromo UI project.

## 📋 Contents

- [Review Checklist](#review-checklist)
- [Project Structure](#project-structure)
- [Code Standards](#code-standards)
- [Testing Requirements](#testing-requirements)
- [Documentation Requirements](#documentation-requirements)
- [Accessibility Review](#accessibility-review)
- [Performance Considerations](#performance-considerations)
- [Common Issues to Look For](#common-issues-to-look-for)

---

## 🎯 Review Checklist

### Before Starting Review

- [ ] **Understand the context**: Read the PR description and linked issues
- [ ] **Check CI status**: Ensure all automated checks pass
- [ ] **Review scope**: Verify changes align with PR description
- [ ] **Test locally** (if possible): Clone branch and test functionality

### Code Quality

- [ ] **TypeScript**: No `any` types, proper typing throughout
- [ ] **Code style**: Follows project conventions (ESLint, Prettier)
- [ ] **Component structure**: Follows established patterns
- [ ] **Naming**: Clear, descriptive names for components, functions, variables
- [ ] **Comments**: Complex logic is documented
- [ ] **No dead code**: Remove unused imports, functions, variables

### Testing

- [ ] **Unit tests**: New/changed code has tests
- [ ] **Accessibility tests**: Components have a11y tests
- [ ] **Test coverage**: Maintains or improves coverage (target: 80%+)
- [ ] **Edge cases**: Error states and edge cases are tested
- [ ] **Test quality**: Tests are clear and maintainable

### Documentation

- [ ] **JSDoc**: Public APIs are documented
- [ ] **Storybook**: New components have stories
- [ ] **README/Guides**: Updated if needed
- [ ] **API Reference**: Updated for API changes
- [ ] **Examples**: Usage examples are clear

### Accessibility

- [ ] **ARIA attributes**: Properly implemented
- [ ] **Keyboard navigation**: All interactive elements accessible via keyboard
- [ ] **Screen readers**: Semantic HTML and proper labels
- [ ] **Focus management**: Focus is managed correctly
- [ ] **Color contrast**: Meets WCAG 2.1 AA standards

### Performance

- [ ] **Bundle size**: No unnecessary dependencies
- [ ] **Tree shaking**: Components are tree-shakeable
- [ ] **SSR compatible**: No client-only code
- [ ] **Re-renders**: Optimized React patterns (useMemo, useCallback where appropriate)

### Breaking Changes

- [ ] **Semantic versioning**: Breaking changes properly documented
- [ ] **Migration guide**: If breaking, migration path provided
- [ ] **Deprecation**: Old APIs deprecated before removal

---

## 🏗️ Project Structure

### Monorepo Organization

```
nostromo-ui/
├── packages/
│   ├── ui-core/              # Core components (27 components)
│   │   ├── src/
│   │   │   ├── components/   # Component implementations
│   │   │   │   ├── button/
│   │   │   │   │   ├── button.tsx
│   │   │   │   │   ├── button.test.tsx
│   │   │   │   │   └── button.stories.tsx
│   │   │   └── index.ts      # Public exports
│   │   └── __stories__/      # Storybook stories
│   ├── ui-marketing/         # Marketing components (6 components)
│   └── ui-tw/               # Tailwind preset & themes
├── docs/                    # Nextra documentation site
└── tools/                   # Shared tooling configs
```

### Component File Structure

Each component should have:
- **Component file**: `component.tsx` (main implementation)
- **Test file**: `component.test.tsx` (unit tests)
- **Story file**: `component.stories.tsx` (Storybook stories)
- **Type definitions**: Inline in component file (TypeScript)

### Import Patterns

```tsx
// ✅ Good: Individual imports (tree-shakeable)
import { Button } from "@jarllyng/nostromo/button"

// ✅ Good: Named imports from main
import { Button, Input } from "@jarllyng/nostromo"

// ❌ Bad: Default imports
import Button from "@jarllyng/nostromo/button"
```

---

## 📐 Code Standards

### TypeScript

**Required:**
- Strict mode enabled
- No `any` types (use `unknown` if needed)
- Proper type definitions for all props
- Exported types for component props

**Example:**
```tsx
// ✅ Good
interface ButtonProps {
  variant?: 'default' | 'secondary' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'md', children, className, ...props }, ref) => {
    // Implementation
  }
)

// ❌ Bad
export const Button = (props: any) => {
  // Implementation
}
```

### React Patterns

**Required:**
- Use `React.forwardRef` for components that need refs
- Proper prop spreading with `...props`
- Use `React.Fragment` or `<>` for multiple children
- Memoization only when necessary

**Example:**
```tsx
// ✅ Good
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
```

### Styling

**Required:**
- Use Tailwind utility classes
- Use CVA (class-variance-authority) for variants
- CSS variables for theming (HSL format)
- No inline styles (except for dynamic values)

**Example:**
```tsx
// ✅ Good
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium',
  {
    variants: {
      variant: {
        default: 'bg-brand-500 text-white hover:bg-brand-600',
        secondary: 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)
```

---

## 🧪 Testing Requirements

### Unit Tests

**Required for all components:**
- Rendering tests
- Prop variations
- Event handlers
- Edge cases and error states

**Example:**
```tsx
// button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies correct variant classes', () => {
    render(<Button variant="secondary">Button</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-neutral-200')
  })
})
```

### Accessibility Tests

**Required for all interactive components:**
- axe-core integration
- Keyboard navigation tests
- ARIA attribute verification

**Example:**
```tsx
// button.a11y.test.tsx
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Button } from './button'

describe('Button Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

### Test Coverage

- **Target**: 80%+ code coverage
- **Critical paths**: 100% coverage
- **Edge cases**: All error states tested

---

## 📚 Documentation Requirements

### JSDoc Comments

**Required for all public APIs:**
```tsx
/**
 * A versatile button component with multiple variants and states.
 * 
 * @example
 * ```tsx
 * <Button variant="default" size="md">Click me</Button>
 * ```
 */
export const Button = ({ ... }: ButtonProps) => {
  // Implementation
}
```

### Storybook Stories

**Required for all components:**
```tsx
// button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'ghost', 'destructive'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}
```

### README/Guide Updates

Update relevant documentation when:
- Adding new components
- Changing APIs
- Adding new features
- Fixing bugs that affect usage

---

## ♿ Accessibility Review

### ARIA Attributes

**Check for:**
- Proper `aria-label` for icon-only buttons
- `aria-describedby` for helper text
- `aria-expanded` for collapsible components
- `aria-controls` for components that control others
- `role` attributes where semantic HTML isn't sufficient

### Keyboard Navigation

**Verify:**
- All interactive elements are keyboard accessible
- Tab order is logical
- Enter/Space activate buttons
- Arrow keys work for navigation components
- Escape closes modals/dialogs
- Focus is visible and managed correctly

### Screen Reader Support

**Check:**
- Semantic HTML (`<button>`, `<nav>`, `<main>`, etc.)
- Proper heading hierarchy
- Alt text for images
- Descriptive link text
- Form labels properly associated

### Color Contrast

**Verify:**
- Text meets WCAG 2.1 AA contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Interactive states are distinguishable
- Error states are clear

---

## ⚡ Performance Considerations

### Bundle Size

**Check:**
- No unnecessary dependencies
- Tree-shaking works (individual imports)
- No large dependencies for simple features
- Bundle size limits respected

### React Performance

**Look for:**
- Unnecessary re-renders
- Missing `React.memo` where beneficial
- Missing `useMemo`/`useCallback` for expensive operations
- Proper dependency arrays in hooks

### SSR Compatibility

**Verify:**
- No `window` or `document` in component body
- No browser-only APIs without checks
- Proper hydration handling
- No client-side only code

---

## 🐛 Common Issues to Look For

### TypeScript Issues

- ❌ Use of `any` type
- ❌ Missing type definitions
- ❌ Incorrect prop types
- ❌ Missing `forwardRef` for refs

### React Issues

- ❌ Missing `key` props in lists
- ❌ Incorrect hook dependencies
- ❌ Memory leaks (missing cleanup)
- ❌ Direct DOM manipulation

### Accessibility Issues

- ❌ Missing ARIA attributes
- ❌ Non-semantic HTML
- ❌ Missing keyboard handlers
- ❌ Poor focus management

### Performance Issues

- ❌ Unnecessary re-renders
- ❌ Large bundle additions
- ❌ Client-only code in SSR context
- ❌ Missing memoization

### Styling Issues

- ❌ Inline styles (except dynamic)
- ❌ Hardcoded colors (should use CSS variables)
- ❌ Missing responsive design
- ❌ Inconsistent spacing/sizing

### Testing Issues

- ❌ Missing tests for new code
- ❌ Tests that don't actually test behavior
- ❌ Missing accessibility tests
- ❌ Tests that are too brittle

---

## 📝 Review Comments

### Good Review Comments

**Be specific:**
```markdown
❌ "This doesn't look right"
✅ "The `variant` prop should use the `ButtonVariant` type instead of a string literal"
```

**Suggest solutions:**
```markdown
❌ "This is wrong"
✅ "Consider using `React.forwardRef` here to support ref forwarding, which is expected for button components"
```

**Explain why:**
```markdown
❌ "Add tests"
✅ "This component handles user input, so we should add tests for the onChange handler to ensure it's called correctly"
```

### Review Tone

- **Be constructive**: Focus on helping improve the code
- **Be respectful**: Remember the person behind the code
- **Be specific**: Point to exact lines and suggest fixes
- **Be appreciative**: Acknowledge good work

---

## ✅ Approval Criteria

A PR is ready to merge when:

1. ✅ All CI checks pass
2. ✅ Code follows project standards
3. ✅ Tests are added and passing
4. ✅ Documentation is updated
5. ✅ Accessibility requirements met
6. ✅ Performance considerations addressed
7. ✅ At least one approval from maintainer
8. ✅ No blocking review comments

---

## 🚀 Quick Reference

### Key Files to Review

- **Component code**: `packages/nostromo/src/components/[component]/[component].tsx`
- **Tests**: `packages/nostromo/src/components/[component]/[component].test.tsx`
- **Stories**: `packages/nostromo/src/components/__stories__/[component].stories.tsx`
- **Exports**: `packages/nostromo/src/index.ts`
- **Documentation**: `docs/pages/components/[component].mdx`

### Key Commands

```bash
# Run tests
pnpm test

# Run linting
pnpm lint

# Run type checking
pnpm type-check

# Build packages
pnpm build

# Check bundle size
cd packages/nostromo && pnpm size
```

### Useful Links

- [Live Documentation](https://jarllyng.github.io/nostromo-ui/)
- [Live Storybook](https://jarllyng.github.io/nostromo-ui/storybook-static/)
- [Architecture Guide](ARCHITECTURE.md)
- [API Reference](API_REFERENCE.md)
- [Development Guide](DEVELOPMENT.md)
- [Contributing Guide](../../CONTRIBUTING.md)

---

**Thank you for reviewing! Your feedback helps make Nostromo UI better for everyone.** 🚀

