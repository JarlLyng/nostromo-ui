import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card';

describe('Card', () => {
  it('renders correctly', () => {
    render(
      <Card>
        <CardContent>Card content</CardContent>
      </Card>
    );

    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders with all subcomponents', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>Card content</CardContent>
        <CardFooter>Card footer</CardFooter>
      </Card>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card description')).toBeInTheDocument();
    expect(screen.getByText('Card content')).toBeInTheDocument();
    expect(screen.getByText('Card footer')).toBeInTheDocument();
  });

  it('supports different variants', () => {
    const variants = ['default', 'outlined', 'elevated', 'ghost'] as const;

    variants.forEach((variant) => {
      const { rerender } = render(
        <Card variant={variant}>
          <CardContent>Test content</CardContent>
        </Card>
      );

      const card = screen.getByText('Test content').closest('div');
      expect(card).toHaveClass('rounded-lg', 'border', 'bg-white');

      if (variant === 'outlined') {
        expect(card).toHaveClass('border-2', 'border-neutral-300');
      } else if (variant === 'elevated') {
        expect(card).toHaveClass('shadow-lg');
      } else if (variant === 'ghost') {
        expect(card).toHaveClass('border-transparent', 'shadow-none');
      }

      rerender(<div />); // Clear for next iteration
    });
  });

  it('supports different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      const { rerender } = render(
        <Card size={size}>
          <CardContent>Test content</CardContent>
        </Card>
      );

      const card = screen.getByText('Test content').closest('div');
      if (size === 'sm') {
        expect(card).toHaveClass('p-3');
      } else if (size === 'md') {
        expect(card).toHaveClass('p-4');
      } else if (size === 'lg') {
        expect(card).toHaveClass('p-6');
      }

      rerender(<div />); // Clear for next iteration
    });
  });

  it('renders with custom className', () => {
    render(
      <Card className="custom-card">
        <CardContent>Test content</CardContent>
      </Card>
    );

    const card = screen.getByText('Test content').closest('div');
    expect(card).toHaveClass('custom-card');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(
      <Card ref={ref}>
        <CardContent>Test content</CardContent>
      </Card>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('CardHeader', () => {
  it('renders correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
        </CardHeader>
      </Card>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('supports different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      const { rerender } = render(
        <Card>
          <CardHeader size={size}>
            <CardTitle>Test Title</CardTitle>
          </CardHeader>
        </Card>
      );

      const header = screen.getByText('Test Title').closest('div');
      if (size === 'sm') {
        expect(header).toHaveClass('p-3', 'pb-2');
      } else if (size === 'md') {
        expect(header).toHaveClass('p-4', 'pb-3');
      } else if (size === 'lg') {
        expect(header).toHaveClass('p-6', 'pb-4');
      }

      rerender(<div />); // Clear for next iteration
    });
  });

  it('renders with custom className', () => {
    render(
      <Card>
        <CardHeader className="custom-header">
          <CardTitle>Test Title</CardTitle>
        </CardHeader>
      </Card>
    );

    const header = screen.getByText('Test Title').closest('div');
    expect(header).toHaveClass('custom-header');
  });
});

describe('CardTitle', () => {
  it('renders as h3 by default', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
        </CardHeader>
      </Card>
    );

    const title = screen.getByText('Test Title');
    expect(title.tagName).toBe('H3');
  });

  it('supports asChild prop', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle asChild>
            <h1>Test Title</h1>
          </CardTitle>
        </CardHeader>
      </Card>
    );

    const title = screen.getByText('Test Title');
    expect(title.tagName).toBe('H1');
  });

  it('supports different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      const { rerender } = render(
        <Card>
          <CardHeader>
            <CardTitle size={size}>Test Title</CardTitle>
          </CardHeader>
        </Card>
      );

      const title = screen.getByText('Test Title');
      if (size === 'sm') {
        expect(title).toHaveClass('text-base');
      } else if (size === 'md') {
        expect(title).toHaveClass('text-lg');
      } else if (size === 'lg') {
        expect(title).toHaveClass('text-xl');
      }

      rerender(<div />); // Clear for next iteration
    });
  });

  it('renders with custom className', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle className="custom-title">Test Title</CardTitle>
        </CardHeader>
      </Card>
    );

    const title = screen.getByText('Test Title');
    expect(title).toHaveClass('custom-title');
  });
});

describe('CardDescription', () => {
  it('renders as p by default', () => {
    render(
      <Card>
        <CardHeader>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
      </Card>
    );

    const description = screen.getByText('Test Description');
    expect(description.tagName).toBe('P');
  });

  it('supports asChild prop', () => {
    render(
      <Card>
        <CardHeader>
          <CardDescription asChild>
            <span>Test Description</span>
          </CardDescription>
        </CardHeader>
      </Card>
    );

    const description = screen.getByText('Test Description');
    expect(description.tagName).toBe('SPAN');
  });

  it('supports different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      const { rerender } = render(
        <Card>
          <CardHeader>
            <CardDescription size={size}>Test Description</CardDescription>
          </CardHeader>
        </Card>
      );

      const description = screen.getByText('Test Description');
      if (size === 'sm') {
        expect(description).toHaveClass('text-xs');
      } else if (size === 'md') {
        expect(description).toHaveClass('text-sm');
      } else if (size === 'lg') {
        expect(description).toHaveClass('text-base');
      }

      rerender(<div />); // Clear for next iteration
    });
  });

  it('renders with custom className', () => {
    render(
      <Card>
        <CardHeader>
          <CardDescription className="custom-description">Test Description</CardDescription>
        </CardHeader>
      </Card>
    );

    const description = screen.getByText('Test Description');
    expect(description).toHaveClass('custom-description');
  });
});

describe('CardContent', () => {
  it('renders correctly', () => {
    render(
      <Card>
        <CardContent>Test content</CardContent>
      </Card>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('supports different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      const { rerender } = render(
        <Card>
          <CardContent size={size}>Test content</CardContent>
        </Card>
      );

      const content = screen.getByText('Test content');
      if (size === 'sm') {
        expect(content).toHaveClass('p-3', 'pt-2');
      } else if (size === 'md') {
        expect(content).toHaveClass('p-4', 'pt-3');
      } else if (size === 'lg') {
        expect(content).toHaveClass('p-6', 'pt-4');
      }

      rerender(<div />); // Clear for next iteration
    });
  });

  it('renders with custom className', () => {
    render(
      <Card>
        <CardContent className="custom-content">Test content</CardContent>
      </Card>
    );

    const content = screen.getByText('Test content');
    expect(content).toHaveClass('custom-content');
  });
});

describe('CardFooter', () => {
  it('renders correctly', () => {
    render(
      <Card>
        <CardFooter>Test footer</CardFooter>
      </Card>
    );

    expect(screen.getByText('Test footer')).toBeInTheDocument();
  });

  it('supports different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      const { rerender } = render(
        <Card>
          <CardFooter size={size}>Test footer</CardFooter>
        </Card>
      );

      const footer = screen.getByText('Test footer');
      if (size === 'sm') {
        expect(footer).toHaveClass('p-3', 'pt-2');
      } else if (size === 'md') {
        expect(footer).toHaveClass('p-4', 'pt-3');
      } else if (size === 'lg') {
        expect(footer).toHaveClass('p-6', 'pt-4');
      }

      rerender(<div />); // Clear for next iteration
    });
  });

  it('renders with custom className', () => {
    render(
      <Card>
        <CardFooter className="custom-footer">Test footer</CardFooter>
      </Card>
    );

    const footer = screen.getByText('Test footer');
    expect(footer).toHaveClass('custom-footer');
  });
});

describe('Card Integration', () => {
  it('renders complete card structure', () => {
    render(
      <Card variant="elevated" size="lg">
        <CardHeader size="lg">
          <CardTitle size="lg">Product Card</CardTitle>
          <CardDescription size="lg">A beautiful product card</CardDescription>
        </CardHeader>
        <CardContent size="lg">
          <p>This is the main content of the card.</p>
        </CardContent>
        <CardFooter size="lg">
          <button>Learn More</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText('Product Card')).toBeInTheDocument();
    expect(screen.getByText('A beautiful product card')).toBeInTheDocument();
    expect(screen.getByText('This is the main content of the card.')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('handles nested content correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Nested Content</CardTitle>
          <CardDescription>Card with nested elements</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <h4>Subtitle</h4>
            <p>Nested paragraph content</p>
            <ul>
              <li>List item 1</li>
              <li>List item 2</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex space-x-2">
            <button>Action 1</button>
            <button>Action 2</button>
          </div>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText('Nested Content')).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Nested paragraph content')).toBeInTheDocument();
    expect(screen.getByText('List item 1')).toBeInTheDocument();
    expect(screen.getByText('List item 2')).toBeInTheDocument();
    expect(screen.getByText('Action 1')).toBeInTheDocument();
    expect(screen.getByText('Action 2')).toBeInTheDocument();
  });
});
