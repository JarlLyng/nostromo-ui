# Contributing to Nostromo UI

Tak for din interesse i at bidrage til Nostromo UI! 🚀

## 📋 Indhold

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)
- [Community Guidelines](#community-guidelines)

## 🤝 Code of Conduct

Dette projekt følger en Code of Conduct. Ved at deltage forventes det, at du respekterer alle medlemmer af vores community.

### Vores Forpligtelser
- Vær respektfuld og inkluderende
- Vær konstruktiv i feedback
- Fokusér på det, der er bedst for community'et
- Vis empati over for andre medlemmer

### Uacceptabel Adfærd
- Brug af seksualiseret sprog eller billeder
- Trolling, fornærmende kommentarer eller personlige angreb
- Offentlig eller privat chikane
- Anden uetisk eller uprofessionel adfærd

## 🚀 Getting Started

### Forudsætninger
- **Node.js**: >= 20.0.0
- **pnpm**: >= 9.0.0
- **Git**: Latest version
- **Fork** af repository'et

### Development Setup

1. **Fork og Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/nostromo-ui.git
   cd nostromo-ui
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Start Development**
   ```bash
   pnpm dev
   ```

4. **Verify Setup**
   ```bash
   pnpm test
   pnpm lint
   pnpm type-check
   ```

## 🛠️ Development Workflow

### Branch Strategy
- **Main branch**: `main` (production-ready)
- **Feature branches**: `feature/component-name`
- **Bug fixes**: `fix/issue-description`
- **Documentation**: `docs/update-description`

### Making Changes

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/button-component
   ```

2. **Make Changes**
   - Følg [Component Development Rules](.cursor/rules/component-development.mdc)
   - Skriv tests for nye funktioner
   - Opdater dokumentation

3. **Test Changes**
   ```bash
   pnpm test
   pnpm lint
   pnpm type-check
   pnpm build
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat(button): add loading state"
   ```

5. **Create Changeset**
   ```bash
   pnpm changeset
   ```

6. **Push and Create PR**
   ```bash
   git push origin feature/button-component
   ```

## 📝 Pull Request Process

### PR Requirements
- [ ] **Tests**: Alle tests passer
- [ ] **Linting**: Ingen linting fejl
- [ ] **Type Checking**: TypeScript kompilerer
- [ ] **Accessibility**: WCAG 2.1 AA compliance
- [ ] **Documentation**: Relevant dokumentation opdateret
- [ ] **Changeset**: Changeset oprettet for breaking changes
- [ ] **Storybook**: Stories tilføjet for nye komponenter

### PR Template
```markdown
## Description
Kort beskrivelse af ændringerne.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Accessibility tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
Tilføj screenshots for UI ændringer.

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Changeset created (if needed)
```

### Review Process
1. **Automated Checks**: CI/CD pipeline kører automatisk
2. **Code Review**: Mindst én approver kræves
3. **Testing**: Manual testing af ændringer
4. **Approval**: Maintainer godkender PR
5. **Merge**: PR merges til main branch

## 🚀 Release Process

### Versioning
Vi følger [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: Nye funktioner (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Steps
1. **Changeset**: Automatisk version bump
2. **Changelog**: Automatisk changelog generation
3. **Publish**: Automatisk npm publish
4. **Documentation**: Automatisk docs update

## 🧪 Testing Guidelines

### Unit Tests
```tsx
// Eksempel test
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button with correct text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
});
```

### Accessibility Tests
```tsx
import { axe, toHaveNoViolations } from 'jest-axe';

test('has no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### E2E Tests
```ts
// Playwright test
import { test, expect } from '@playwright/test';

test('button works correctly', async ({ page }) => {
  await page.goto('/playground');
  await expect(page.getByRole('button')).toBeVisible();
});
```

## 📚 Documentation Guidelines

### Code Documentation
- **JSDoc**: For alle public APIs
- **TypeScript**: Tydelige interface definitions
- **Comments**: Forklar kompleks logik

### Storybook Stories
```tsx
// Button.stories.tsx
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};
```

### README Updates
- Opdater relevant dokumentation
- Tilføj eksempler for nye funktioner
- Opdater installation instruktioner

## 🎨 Design Guidelines

### Component Design
- **Consistent API**: Følg etablerede patterns
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Minimal bundle impact
- **Theming**: Støt alle prædefinerede temaer

### Styling
- **Tailwind-first**: Brug utility classes
- **CSS Variables**: For theming
- **Responsive**: Mobile-first approach
- **Dark Mode**: Støt både system og manual

## 🐛 Bug Reports

### Bug Report Template
```markdown
## Bug Description
Kort beskrivelse af fejlen.

## Steps to Reproduce
1. Gå til '...'
2. Klik på '...'
3. Se fejl

## Expected Behavior
Hvad skulle der ske?

## Actual Behavior
Hvad skete der i stedet?

## Environment
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 0.1.0]

## Screenshots
Tilføj screenshots hvis relevant.
```

## 💡 Feature Requests

### Feature Request Template
```markdown
## Feature Description
Beskriv den ønskede funktion.

## Use Case
Hvordan vil denne funktion hjælpe?

## Proposed Solution
Har du en idé til implementation?

## Alternatives
Har du overvejet alternative løsninger?
```

## 🏷️ Labels

Vi bruger følgende labels:
- `bug`: Fejl der skal fixes
- `enhancement`: Nye funktioner
- `documentation`: Dokumentationsændringer
- `good first issue`: Godt for nye bidragydere
- `help wanted`: Ekstra hjælp ønsket
- `question`: Spørgsmål eller diskussion

## 📞 Getting Help

### Resources
- **Documentation**: [README.md](README.md)
- **Architecture**: [ARCHITECTURE.md](ARCHITECTURE.md)
- **Component API**: [COMPONENT_API.md](COMPONENT_API.md)
- **Development**: [DEVELOPMENT.md](DEVELOPMENT.md)

### Community
- **GitHub Issues**: Bug reports og feature requests
- **GitHub Discussions**: Generelle spørgsmål
- **Discord**: Real-time chat (kommer snart)

## 🎉 Recognition

Tak til alle bidragydere! Vi anerkender bidrag på følgende måder:
- **Contributors**: Liste i README
- **Release Notes**: Kreditering i changelog
- **Community**: Highlighting af bidrag

## 📄 License

Ved at bidrage accepterer du, at dine bidrag vil blive licenseret under MIT-licensen.

---

**Tak for at bidrage til Nostromo UI!** 🚀

*"In space, no one can hear you scream... but everyone can see your beautiful UI"*
