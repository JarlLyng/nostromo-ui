import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { NCard, NCardHeader, NCardTitle, NCardDescription, NCardContent, NCardFooter } from '../card';

describe('NCard', () => {
  it('renders correctly', () => {
    const wrapper = mount(NCard, {
      slots: {
        default: 'Card content',
      },
    });

    expect(wrapper.text()).toBe('Card content');
    expect(wrapper.classes()).toContain('rounded-lg');
    expect(wrapper.classes()).toContain('border');
    expect(wrapper.classes()).toContain('bg-white');
  });

  it('renders with all subcomponents', () => {
    const wrapper = mount(NCard, {
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
          mount(NCardContent, { slots: { default: 'Card content' } }),
          mount(NCardFooter, { slots: { default: 'Card footer' } }),
        ],
      },
    });

    expect(wrapper.text()).toContain('Card Title');
    expect(wrapper.text()).toContain('Card description');
    expect(wrapper.text()).toContain('Card content');
    expect(wrapper.text()).toContain('Card footer');
  });

  it('supports different variants', () => {
    const variants = ['default', 'outlined', 'elevated', 'ghost'] as const;

    variants.forEach((variant) => {
      const wrapper = mount(NCard, {
        props: { variant },
        slots: { default: 'Test content' },
      });

      expect(wrapper.classes()).toContain('rounded-lg');
      expect(wrapper.classes()).toContain('border');
      expect(wrapper.classes()).toContain('bg-white');

      if (variant === 'outlined') {
        expect(wrapper.classes()).toContain('border-2');
        expect(wrapper.classes()).toContain('border-neutral-300');
      } else if (variant === 'elevated') {
        expect(wrapper.classes()).toContain('shadow-lg');
      } else if (variant === 'ghost') {
        expect(wrapper.classes()).toContain('border-transparent');
        expect(wrapper.classes()).toContain('shadow-none');
      }

      wrapper.unmount();
    });
  });

  it('supports different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      const wrapper = mount(NCard, {
        props: { size },
        slots: { default: 'Test content' },
      });

      if (size === 'sm') {
        expect(wrapper.classes()).toContain('p-3');
      } else if (size === 'md') {
        expect(wrapper.classes()).toContain('p-4');
      } else if (size === 'lg') {
        expect(wrapper.classes()).toContain('p-6');
      }

      wrapper.unmount();
    });
  });

  it('renders with custom class', () => {
    const wrapper = mount(NCard, {
      props: { class: 'custom-card' },
      slots: { default: 'Test content' },
    });

    expect(wrapper.classes()).toContain('custom-card');
  });

  it('forwards attributes correctly', () => {
    const wrapper = mount(NCard, {
      attrs: { 'data-testid': 'card' },
      slots: { default: 'Test content' },
    });

    expect(wrapper.attributes('data-testid')).toBe('card');
  });
});

describe('NCardHeader', () => {
  it('renders correctly', () => {
    const wrapper = mount(NCardHeader, {
      slots: { default: 'Header content' },
    });

    expect(wrapper.text()).toBe('Header content');
    expect(wrapper.classes()).toContain('flex');
    expect(wrapper.classes()).toContain('flex-col');
    expect(wrapper.classes()).toContain('space-y-1.5');
  });

  it('supports different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      const wrapper = mount(NCardHeader, {
        props: { size },
        slots: { default: 'Header content' },
      });

      if (size === 'sm') {
        expect(wrapper.classes()).toContain('p-3');
        expect(wrapper.classes()).toContain('pb-2');
      } else if (size === 'md') {
        expect(wrapper.classes()).toContain('p-4');
        expect(wrapper.classes()).toContain('pb-3');
      } else if (size === 'lg') {
        expect(wrapper.classes()).toContain('p-6');
        expect(wrapper.classes()).toContain('pb-4');
      }

      wrapper.unmount();
    });
  });

  it('renders with custom class', () => {
    const wrapper = mount(NCardHeader, {
      props: { class: 'custom-header' },
      slots: { default: 'Header content' },
    });

    expect(wrapper.classes()).toContain('custom-header');
  });
});

describe('NCardTitle', () => {
  it('renders as h3 by default', () => {
    const wrapper = mount(NCardTitle, {
      slots: { default: 'Test Title' },
    });

    expect(wrapper.element.tagName).toBe('H3');
    expect(wrapper.text()).toBe('Test Title');
  });

  it('supports asChild prop', () => {
    const wrapper = mount(NCardTitle, {
      props: { asChild: true },
      slots: { default: () => 'Custom Title' },
    });

    expect(wrapper.text()).toBe('Custom Title');
  });

  it('supports different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      const wrapper = mount(NCardTitle, {
        props: { size },
        slots: { default: 'Test Title' },
      });

      if (size === 'sm') {
        expect(wrapper.classes()).toContain('text-base');
      } else if (size === 'md') {
        expect(wrapper.classes()).toContain('text-lg');
      } else if (size === 'lg') {
        expect(wrapper.classes()).toContain('text-xl');
      }

      wrapper.unmount();
    });
  });

  it('renders with custom class', () => {
    const wrapper = mount(NCardTitle, {
      props: { class: 'custom-title' },
      slots: { default: 'Test Title' },
    });

    expect(wrapper.classes()).toContain('custom-title');
  });
});

describe('NCardDescription', () => {
  it('renders as p by default', () => {
    const wrapper = mount(NCardDescription, {
      slots: { default: 'Test Description' },
    });

    expect(wrapper.element.tagName).toBe('P');
    expect(wrapper.text()).toBe('Test Description');
  });

  it('supports asChild prop', () => {
    const wrapper = mount(NCardDescription, {
      props: { asChild: true },
      slots: { default: () => 'Custom Description' },
    });

    expect(wrapper.text()).toBe('Custom Description');
  });

  it('supports different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      const wrapper = mount(NCardDescription, {
        props: { size },
        slots: { default: 'Test Description' },
      });

      if (size === 'sm') {
        expect(wrapper.classes()).toContain('text-xs');
      } else if (size === 'md') {
        expect(wrapper.classes()).toContain('text-sm');
      } else if (size === 'lg') {
        expect(wrapper.classes()).toContain('text-base');
      }

      wrapper.unmount();
    });
  });

  it('renders with custom class', () => {
    const wrapper = mount(NCardDescription, {
      props: { class: 'custom-description' },
      slots: { default: 'Test Description' },
    });

    expect(wrapper.classes()).toContain('custom-description');
  });
});

describe('NCardContent', () => {
  it('renders correctly', () => {
    const wrapper = mount(NCardContent, {
      slots: { default: 'Test content' },
    });

    expect(wrapper.text()).toBe('Test content');
  });

  it('supports different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      const wrapper = mount(NCardContent, {
        props: { size },
        slots: { default: 'Test content' },
      });

      if (size === 'sm') {
        expect(wrapper.classes()).toContain('p-3');
        expect(wrapper.classes()).toContain('pt-2');
      } else if (size === 'md') {
        expect(wrapper.classes()).toContain('p-4');
        expect(wrapper.classes()).toContain('pt-3');
      } else if (size === 'lg') {
        expect(wrapper.classes()).toContain('p-6');
        expect(wrapper.classes()).toContain('pt-4');
      }

      wrapper.unmount();
    });
  });

  it('renders with custom class', () => {
    const wrapper = mount(NCardContent, {
      props: { class: 'custom-content' },
      slots: { default: 'Test content' },
    });

    expect(wrapper.classes()).toContain('custom-content');
  });
});

describe('NCardFooter', () => {
  it('renders correctly', () => {
    const wrapper = mount(NCardFooter, {
      slots: { default: 'Test footer' },
    });

    expect(wrapper.text()).toBe('Test footer');
    expect(wrapper.classes()).toContain('flex');
    expect(wrapper.classes()).toContain('items-center');
  });

  it('supports different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      const wrapper = mount(NCardFooter, {
        props: { size },
        slots: { default: 'Test footer' },
      });

      if (size === 'sm') {
        expect(wrapper.classes()).toContain('p-3');
        expect(wrapper.classes()).toContain('pt-2');
      } else if (size === 'md') {
        expect(wrapper.classes()).toContain('p-4');
        expect(wrapper.classes()).toContain('pt-3');
      } else if (size === 'lg') {
        expect(wrapper.classes()).toContain('p-6');
        expect(wrapper.classes()).toContain('pt-4');
      }

      wrapper.unmount();
    });
  });

  it('renders with custom class', () => {
    const wrapper = mount(NCardFooter, {
      props: { class: 'custom-footer' },
      slots: { default: 'Test footer' },
    });

    expect(wrapper.classes()).toContain('custom-footer');
  });
});

describe('Card Integration', () => {
  it('renders complete card structure', () => {
    const wrapper = mount(NCard, {
      props: { variant: 'elevated', size: 'lg' },
      slots: {
        default: [
          mount(NCardHeader, {
            props: { size: 'lg' },
            slots: {
              default: [
                mount(NCardTitle, { 
                  props: { size: 'lg' },
                  slots: { default: 'Product Card' }
                }),
                mount(NCardDescription, { 
                  props: { size: 'lg' },
                  slots: { default: 'A beautiful product card' }
                }),
              ],
            },
          }),
          mount(NCardContent, {
            props: { size: 'lg' },
            slots: { default: 'This is the main content of the card.' },
          }),
          mount(NCardFooter, {
            props: { size: 'lg' },
            slots: { default: 'Learn More' },
          }),
        ],
      },
    });

    expect(wrapper.text()).toContain('Product Card');
    expect(wrapper.text()).toContain('A beautiful product card');
    expect(wrapper.text()).toContain('This is the main content of the card.');
    expect(wrapper.text()).toContain('Learn More');
  });

  it('handles nested content correctly', () => {
    const wrapper = mount(NCard, {
      slots: {
        default: [
          mount(NCardHeader, {
            slots: {
              default: [
                mount(NCardTitle, { slots: { default: 'Nested Content' } }),
                mount(NCardDescription, { slots: { default: 'Card with nested elements' } }),
              ],
            },
          }),
          mount(NCardContent, {
            slots: {
              default: [
                'Subtitle',
                'Nested paragraph content',
                'List item 1',
                'List item 2',
              ],
            },
          }),
          mount(NCardFooter, {
            slots: {
              default: [
                'Action 1',
                'Action 2',
              ],
            },
          }),
        ],
      },
    });

    expect(wrapper.text()).toContain('Nested Content');
    expect(wrapper.text()).toContain('Subtitle');
    expect(wrapper.text()).toContain('Nested paragraph content');
    expect(wrapper.text()).toContain('List item 1');
    expect(wrapper.text()).toContain('List item 2');
    expect(wrapper.text()).toContain('Action 1');
    expect(wrapper.text()).toContain('Action 2');
  });
});
