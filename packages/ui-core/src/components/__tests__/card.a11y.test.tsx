import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';
import axe from 'axe-core';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card';

expect.extend(toHaveNoViolations);

const runAxe = async (container: HTMLElement) => {
  const results = await axe.run(container);
  return results;
};

describe('Card Accessibility', () => {
  it('should not have accessibility violations with basic card', async () => {
    const { container } = render(
      <Card>
        <CardContent>
          <p>Basic card content</p>
        </CardContent>
      </Card>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with complete card structure', async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content goes here</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with different variants', async () => {
    const variants = ['default', 'outlined', 'elevated', 'ghost'] as const;

    for (const variant of variants) {
      const { container } = render(
        <Card variant={variant}>
          <CardHeader>
            <CardTitle>{variant.charAt(0).toUpperCase() + variant.slice(1)} Card</CardTitle>
            <CardDescription>This is a {variant} variant card</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Content for {variant} card</p>
          </CardContent>
        </Card>
      );

      const results = await runAxe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should not have accessibility violations with different sizes', async () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    for (const size of sizes) {
      const { container } = render(
        <Card size={size}>
          <CardHeader size={size}>
            <CardTitle size={size}>{size.toUpperCase()} Card</CardTitle>
            <CardDescription size={size}>This is a {size} sized card</CardDescription>
          </CardHeader>
          <CardContent size={size}>
            <p>Content for {size} card</p>
          </CardContent>
          <CardFooter size={size}>
            <button>Action</button>
          </CardFooter>
        </Card>
      );

      const results = await runAxe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should not have accessibility violations with interactive elements', async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
          <CardDescription>Card with interactive elements</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div>
              <label htmlFor="name">Name</label>
              <input id="name" type="text" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" />
            </div>
            <div>
              <input type="checkbox" id="agree" />
              <label htmlFor="agree">I agree to the terms</label>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <button type="submit">Submit</button>
          <button type="button">Cancel</button>
        </CardFooter>
      </Card>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with links and buttons', async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Card with Links</CardTitle>
          <CardDescription>Card containing various interactive elements</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card contains various interactive elements:</p>
          <ul>
            <li><a href="#link1">Link 1</a></li>
            <li><a href="#link2">Link 2</a></li>
          </ul>
        </CardContent>
        <CardFooter>
          <button>Primary Action</button>
          <a href="#secondary">Secondary Action</a>
        </CardFooter>
      </Card>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with images', async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Card with Image</CardTitle>
          <CardDescription>Card containing an image</CardDescription>
        </CardHeader>
        <CardContent>
          <img src="https://via.placeholder.com/300x200" alt="Placeholder image" />
          <p>This card contains an image with proper alt text.</p>
        </CardContent>
        <CardFooter>
          <button>View Details</button>
        </CardFooter>
      </Card>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with complex content', async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Complex Content Card</CardTitle>
          <CardDescription>Card with complex nested content</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <h4>Section 1</h4>
            <p>Content for section 1</p>
            <table>
              <thead>
                <tr>
                  <th>Column 1</th>
                  <th>Column 2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Data 1</td>
                  <td>Data 2</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h4>Section 2</h4>
            <p>Content for section 2</p>
            <blockquote>
              This is a quote
            </blockquote>
          </div>
        </CardContent>
        <CardFooter>
          <button>Edit</button>
          <button>Delete</button>
        </CardFooter>
      </Card>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with multiple cards', async () => {
    const { container } = render(
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Card 1</CardTitle>
            <CardDescription>First card</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Content for card 1</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Card 2</CardTitle>
            <CardDescription>Second card</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Content for card 2</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Card 3</CardTitle>
            <CardDescription>Third card</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Content for card 3</p>
          </CardContent>
        </Card>
      </div>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with asChild props', async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle asChild>
            <h1>Custom Title Element</h1>
          </CardTitle>
          <CardDescription asChild>
            <span>Custom description element</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content with custom title and description elements</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with disabled elements', async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Card with Disabled Elements</CardTitle>
          <CardDescription>Card containing disabled interactive elements</CardDescription>
        </CardHeader>
        <CardContent>
          <button disabled>Disabled Button</button>
          <input type="text" disabled placeholder="Disabled input" />
          <select disabled>
            <option>Disabled select</option>
          </select>
        </CardContent>
        <CardFooter>
          <button>Enabled Action</button>
        </CardFooter>
      </Card>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with focusable elements', async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Focusable Elements Card</CardTitle>
          <CardDescription>Card with various focusable elements</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <button>Button 1</button>
            <button>Button 2</button>
            <a href="#link">Link</a>
            <input type="text" placeholder="Text input" />
            <textarea placeholder="Textarea"></textarea>
            <select>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </div>
        </CardContent>
        <CardFooter>
          <button>Submit</button>
        </CardFooter>
      </Card>
    );

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });
});
