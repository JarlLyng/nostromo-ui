# Contributing to Nostromo UI

Tak for din interesse i at bidrage til Nostromo UI! Dette dokument beskriver hvordan du kan bidrage til projektet.

## 📋 Indhold

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)

## Code of Conduct

Dette projekt følger vores [Code of Conduct](CODE_OF_CONDUCT.md). Ved at deltage accepterer du at overholde disse retningslinjer.

## Getting Started

### Prerequisites
- **Node.js**: >= 20.0.0
- **pnpm**: >= 9.0.0
- **Git**: Latest version

### Setup
```bash
# Fork og clone repository
git clone https://github.com/your-username/nostromo-ui.git
cd nostromo-ui

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Development Workflow

### 1. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes
- Implement din feature eller fix
- Følg vores [code standards](#code-standards)
- Skriv tests for din kode
- Opdater dokumentation

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
- Opret en pull request mod `main` branch
- Beskriv dine ændringer tydeligt
- Link til relevante issues

## Code Standards

### TypeScript
- **Strict mode**: Altid brug strict TypeScript
- **No any**: Undgå `any` types
- **Proper typing**: Definer typer for alle props og funktioner

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
- **WCAG 2.1 AA**: Alle komponenter skal være tilgængelige
- **ARIA attributes**: Brug korrekte ARIA attributes
- **Keyboard navigation**: Understøt keyboard navigation
- **Screen readers**: Test med screen readers

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
- **Accessibility**: Alle komponenter skal have a11y tests
- **Edge cases**: Test edge cases og error states

## Documentation

### Component Documentation
- **JSDoc**: Dokumenter alle public APIs
- **Examples**: Inkluder praktiske eksempler
- **Props table**: Auto-genereret fra TypeScript

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
- Opdater README.md hvis du tilføjer nye features
- Opdater installation instruktioner
- Opdater eksempler

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
```markdown
## Description
Beskriv dine ændringer...

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Accessibility tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project standards
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Changeset created
```

### Review Process
1. **Automated checks**: CI/CD pipeline kører automatisk
2. **Code review**: Mindst én approver kræves
3. **Testing**: Manual testing af ændringer
4. **Documentation**: Verificer at dokumentation er opdateret

## Release Process

### Versioning
Vi følger [Semantic Versioning](https://semver.org/):
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
Hvis du har spørgsmål, er du velkommen til at:
- Oprette en GitHub issue
- Deltage i GitHub discussions
- Kontakte maintainers direkte

## Recognition

Tak til alle bidragydere! Vi anerkender bidrag i:
- Release notes
- Contributors list
- Special mentions for significant contributions

---

**Tak for at bidrage til Nostromo UI!** 🚀