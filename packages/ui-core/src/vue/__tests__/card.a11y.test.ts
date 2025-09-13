import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/vue';
import { toHaveNoViolations } from 'jest-axe';
import axe from 'axe-core';
import { NCard, NCardHeader, NCardTitle, NCardDescription, NCardContent, NCardFooter } from '../card';

expect.extend(toHaveNoViolations);

const runAxe = (container: HTMLElement) => {
  return new Promise((resolve, reject) => {
    axe.run(container, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

describe('Vue Card Accessibility', () => {
  it('should not have accessibility violations with basic card', async () => {
    const { container } = render(NCard, {
      slots: {
        default: 'Basic card content',
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with complete card structure', async () => {
    const { container } = render(NCard, {
      slots: {
        default: [
          mount(NCardHeader, {
            slots: {
              default: [
                mount(NCardTitle, { slots: { default: 'Card Title' } }),
                mount(NCardDescription, { slots: { default: 'Card description' } }),
              ],
            },
          }),
          mount(NCardContent, {
            slots: { default: 'Card content goes here' },
          }),
          mount(NCardFooter, {
            slots: { default: 'Action' },
          }),
        ],
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with different variants', async () => {
    const variants = ['default', 'outlined', 'elevated', 'ghost'] as const;

    for (const variant of variants) {
      const { container } = render(NCard, {
        props: { variant },
        slots: {
          default: [
            mount(NCardHeader, {
              slots: {
                default: [
                  mount(NCardTitle, { 
                    slots: { default: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Card` }
                  }),
                  mount(NCardDescription, { 
                    slots: { default: `This is a ${variant} variant card` }
                  }),
                ],
              },
            }),
            mount(NCardContent, {
              slots: { default: `Content for ${variant} card` },
            }),
          ],
        },
      });

      const results = await runAxe(container);
      expect(results).toHaveNoViolations();
      
      
    }
  });

  it('should not have accessibility violations with different sizes', async () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    for (const size of sizes) {
      const { container } = render(NCard, {
        props: { size },
        slots: {
          default: [
            mount(NCardHeader, {
              props: { size },
              slots: {
                default: [
                  mount(NCardTitle, { 
                    props: { size },
                    slots: { default: `${size.toUpperCase()} Card` }
                  }),
                  mount(NCardDescription, { 
                    props: { size },
                    slots: { default: `This is a ${size} sized card` }
                  }),
                ],
              },
            }),
            mount(NCardContent, {
              props: { size },
              slots: { default: `Content for ${size} card` },
            }),
            mount(NCardFooter, {
              props: { size },
              slots: { default: 'Action' },
            }),
          ],
        },
      });

      const results = await runAxe(container);
      expect(results).toHaveNoViolations();
      
      
    }
  });

  it('should not have accessibility violations with interactive elements', async () => {
    const { container } = render(NCard, {
      slots: {
        default: [
          mount(NCardHeader, {
            slots: {
              default: [
                mount(NCardTitle, { slots: { default: 'Interactive Card' } }),
                mount(NCardDescription, { slots: { default: 'Card with interactive elements' } }),
              ],
            },
          }),
          mount(NCardContent, {
            slots: {
              default: `
                <form>
                  <div>
                    <label for="name">Name</label>
                    <input id="name" type="text" />
                  </div>
                  <div>
                    <label for="email">Email</label>
                    <input id="email" type="email" />
                  </div>
                  <div>
                    <input type="checkbox" id="agree" />
                    <label for="agree">I agree to the terms</label>
                  </div>
                </form>
              `,
            },
          }),
          mount(NCardFooter, {
            slots: {
              default: `
                <button type="submit">Submit</button>
                <button type="button">Cancel</button>
              `,
            },
          }),
        ],
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with links and buttons', async () => {
    const { container } = render(NCard, {
      slots: {
        default: [
          mount(NCardHeader, {
            slots: {
              default: [
                mount(NCardTitle, { slots: { default: 'Card with Links' } }),
                mount(NCardDescription, { slots: { default: 'Card containing various interactive elements' } }),
              ],
            },
          }),
          mount(NCardContent, {
            slots: {
              default: `
                <p>This card contains various interactive elements:</p>
                <ul>
                  <li><a href="#link1">Link 1</a></li>
                  <li><a href="#link2">Link 2</a></li>
                </ul>
              `,
            },
          }),
          mount(NCardFooter, {
            slots: {
              default: `
                <button>Primary Action</button>
                <a href="#secondary">Secondary Action</a>
              `,
            },
          }),
        ],
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with images', async () => {
    const { container } = render(NCard, {
      slots: {
        default: [
          mount(NCardHeader, {
            slots: {
              default: [
                mount(NCardTitle, { slots: { default: 'Card with Image' } }),
                mount(NCardDescription, { slots: { default: 'Card containing an image' } }),
              ],
            },
          }),
          mount(NCardContent, {
            slots: {
              default: `
                <img src="https://via.placeholder.com/300x200" alt="Placeholder image" />
                <p>This card contains an image with proper alt text.</p>
              `,
            },
          }),
          mount(NCardFooter, {
            slots: { default: 'View Details' },
          }),
        ],
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with complex content', async () => {
    const { container } = render(NCard, {
      slots: {
        default: [
          mount(NCardHeader, {
            slots: {
              default: [
                mount(NCardTitle, { slots: { default: 'Complex Content Card' } }),
                mount(NCardDescription, { slots: { default: 'Card with complex nested content' } }),
              ],
            },
          }),
          mount(NCardContent, {
            slots: {
              default: `
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
              `,
            },
          }),
          mount(NCardFooter, {
            slots: {
              default: `
                <button>Edit</button>
                <button>Delete</button>
              `,
            },
          }),
        ],
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with multiple cards', async () => {
    const { container } = render({
      template: `
        <div>
          <NCard>
            <NCardHeader>
              <NCardTitle>Card 1</NCardTitle>
              <NCardDescription>First card</NCardDescription>
            </NCardHeader>
            <NCardContent>
              <p>Content for card 1</p>
            </NCardContent>
          </NCard>
          <NCard>
            <NCardHeader>
              <NCardTitle>Card 2</NCardTitle>
              <NCardDescription>Second card</NCardDescription>
            </NCardHeader>
            <NCardContent>
              <p>Content for card 2</p>
            </NCardContent>
          </NCard>
          <NCard>
            <NCardHeader>
              <NCardTitle>Card 3</NCardTitle>
              <NCardDescription>Third card</NCardDescription>
            </NCardHeader>
            <NCardContent>
              <p>Content for card 3</p>
            </NCardContent>
          </NCard>
        </div>
      `,
      components: {
        NCard,
        NCardHeader,
        NCardTitle,
        NCardDescription,
        NCardContent,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with asChild props', async () => {
    const { container } = render(NCard, {
      slots: {
        default: [
          mount(NCardHeader, {
            slots: {
              default: [
                mount(NCardTitle, {
                  props: { asChild: true },
                  slots: { default: () => 'Custom Title Element' },
                }),
                mount(NCardDescription, {
                  props: { asChild: true },
                  slots: { default: () => 'Custom description element' },
                }),
              ],
            },
          }),
          mount(NCardContent, {
            slots: { default: 'Content with custom title and description elements' },
          }),
          mount(NCardFooter, {
            slots: { default: 'Action' },
          }),
        ],
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with disabled elements', async () => {
    const { container } = render(NCard, {
      slots: {
        default: [
          mount(NCardHeader, {
            slots: {
              default: [
                mount(NCardTitle, { slots: { default: 'Card with Disabled Elements' } }),
                mount(NCardDescription, { slots: { default: 'Card containing disabled interactive elements' } }),
              ],
            },
          }),
          mount(NCardContent, {
            slots: {
              default: `
                <button disabled>Disabled Button</button>
                <input type="text" disabled placeholder="Disabled input" />
                <select disabled>
                  <option>Disabled select</option>
                </select>
              `,
            },
          }),
          mount(NCardFooter, {
            slots: { default: 'Enabled Action' },
          }),
        ],
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with focusable elements', async () => {
    const { container } = render(NCard, {
      slots: {
        default: [
          mount(NCardHeader, {
            slots: {
              default: [
                mount(NCardTitle, { slots: { default: 'Focusable Elements Card' } }),
                mount(NCardDescription, { slots: { default: 'Card with various focusable elements' } }),
              ],
            },
          }),
          mount(NCardContent, {
            slots: {
              default: `
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
              `,
            },
          }),
          mount(NCardFooter, {
            slots: { default: 'Submit' },
          }),
        ],
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });
});
