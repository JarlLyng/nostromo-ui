# Contributing to Nostromo UI

Thank you for your interest in contributing to Nostromo UI! This document describes how you can contribute to the project.

## 📋 Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)

## Code of Conduct

This project follows our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to abide by these guidelines.

## Getting Started

### Prerequisites
- **Node.js**: >= 20.0.0
- **pnpm**: >= 9.0.0
- **Git**: Latest version

### Setup
```bash
# Fork and clone repository
git clone https://github.com/JarlLyng/nostromo-ui.git
cd nostromo-ui

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

For detailed setup instructions, see [DEVELOPMENT.md](docs/guides/DEVELOPMENT.md#quick-start).

## Development Workflow

### 1. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes
- Implement your feature or fix
- Follow our [code standards](#code-standards)
- Write tests for your code
- Update documentation

### 3. Test Your Changes
```bash
# Run all tests
pnpm test

# Run linting
pnpm lint

# Run type checking
pnpm type-check

# Build packages
pnpm build
```

### 4. Create Changeset
```bash
pnpm changeset
```

### 5. Submit Pull Request
- Create a pull request against `main` branch
- Describe your changes clearly
- Link to relevant issues

## Code Standards

### TypeScript
- **Strict mode**: Always use strict TypeScript
- **No any**: Avoid `any` types
- **Proper typing**: Define types for all props and functions

### React Components
```tsx
// ✅ Good
interface ButtonProps {
  variant?: 'default' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = ({ variant = 'default', size = 'md', children, ...props }: ButtonProps) => {
  return (
    <button 
      className={cn(buttonVariants({ variant, size }))}
      {...props}
    >
      {children}
    </button>
  );
};
```


### Accessibility
- **WCAG 2.1 AA**: All components must be accessible
- **ARIA attributes**: Use correct ARIA attributes
- **Keyboard navigation**: Support keyboard navigation
- **Screen readers**: Test with screen readers

### Performance
- **Tree shaking**: Komponenter skal være tree-shakeable
- **Bundle size**: Minimal bundle impact
- **SSR compatible**: Ingen client-side dependencies

## Testing

### Unit Tests
```tsx
// src/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Accessibility Tests
```tsx
// src/components/Button.a11y.test.tsx
import { render } from '@testing-library/react';
import { Button } from './Button';

describe('Button Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Test Requirements
- **Coverage**: Minimum 80% code coverage
- **Accessibility**: All components must have a11y tests
- **Edge cases**: Test edge cases and error states

For detailed testing examples, see [DEVELOPMENT.md](docs/guides/DEVELOPMENT.md#testing) and [BEST_PRACTICES.md](docs/guides/BEST_PRACTICES.md#testing-strategies).

## Documentation

### Component Documentation
- **JSDoc**: Document all public APIs
- **Examples**: Include practical examples
- **Props table**: Auto-generated from TypeScript

### Storybook Stories
```tsx
// src/components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'ghost', 'destructive'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};
```

### README Updates
- Update README.md if you add new features
- Update installation instructions
- Update examples

## Pull Request Process

### PR Requirements
- [ ] All tests pass
- [ ] No linting errors
- [ ] TypeScript compilation succeeds
- [ ] Accessibility tests pass
- [ ] Documentation updated
- [ ] Changeset created
- [ ] Storybook stories added

### PR Template
Use the [PR template](.github/pull_request_template.md) when creating your pull request.

### Review Process
1. **Automated checks**: CI/CD pipeline runs automatically
2. **Code review**: At least one approver required
3. **Testing**: Manual testing of changes
4. **Documentation**: Verify documentation is updated

> 📖 **For reviewers**: See [Code Review Guide](docs/guides/CODE_REVIEW.md) for detailed instructions on how to review code in this project.

## Release Process

### Versioning
We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Changesets
```bash
# Create changeset
pnpm changeset

# Follow prompts to describe changes
```

### Release Workflow
1. **Merge PR**: Changes merged to main
2. **Version bump**: Changesets creates version PR
3. **Publish**: Automated npm publish
4. **Documentation**: Auto-updated docs site

## Getting Help

### Resources
- **GitHub Issues**: Bug reports og feature requests
- **GitHub Discussions**: Generelle spørgsmål
- **Discord**: Real-time community support

### Questions?
If you have questions, feel free to:
- Open a GitHub issue
- Participate in GitHub discussions
- Contact maintainers directly

## Recognition

Thank you to all contributors! We acknowledge contributions in:
- Release notes
- Contributors list
- Special mentions for significant contributions

---

**Thank you for contributing to Nostromo UI!** 🚀