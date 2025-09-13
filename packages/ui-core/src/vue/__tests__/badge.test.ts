import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { NBadge } from '../badge';

describe('NBadge', () => {
  it('renders correctly', () => {
    const wrapper = mount(NBadge, {
      slots: { default: 'Badge content' },
    });

    expect(wrapper.text()).toBe('Badge content');
    expect(wrapper.classes()).toContain('inline-flex');
    expect(wrapper.classes()).toContain('items-center');
    expect(wrapper.classes()).toContain('rounded-full');
  });

  it('renders with default variant and size', () => {
    const wrapper = mount(NBadge, {
      slots: { default: 'Default Badge' },
    });

    expect(wrapper.classes()).toContain('bg-brand-500');
    expect(wrapper.classes()).toContain('text-white');
    expect(wrapper.classes()).toContain('px-2.5');
    expect(wrapper.classes()).toContain('py-0.5');
    expect(wrapper.classes()).toContain('text-xs');
  });

  it('supports different variants', () => {
    const variants = ['default', 'secondary', 'destructive', 'outline', 'success', 'warning', 'info'] as const;

    variants.forEach((variant) => {
      const wrapper = mount(NBadge, {
        props: { variant },
        slots: { default: 'Test Badge' },
      });

      expect(wrapper.classes()).toContain('inline-flex');
      expect(wrapper.classes()).toContain('items-center');
      expect(wrapper.classes()).toContain('rounded-full');

      if (variant === 'default') {
        expect(wrapper.classes()).toContain('bg-brand-500');
        expect(wrapper.classes()).toContain('text-white');
      } else if (variant === 'secondary') {
        expect(wrapper.classes()).toContain('bg-neutral-100');
        expect(wrapper.classes()).toContain('text-neutral-900');
      } else if (variant === 'destructive') {
        expect(wrapper.classes()).toContain('bg-red-500');
        expect(wrapper.classes()).toContain('text-white');
      } else if (variant === 'outline') {
        expect(wrapper.classes()).toContain('text-neutral-950');
        expect(wrapper.classes()).toContain('border-neutral-200');
      } else if (variant === 'success') {
        expect(wrapper.classes()).toContain('bg-green-500');
        expect(wrapper.classes()).toContain('text-white');
      } else if (variant === 'warning') {
        expect(wrapper.classes()).toContain('bg-yellow-500');
        expect(wrapper.classes()).toContain('text-white');
      } else if (variant === 'info') {
        expect(wrapper.classes()).toContain('bg-blue-500');
        expect(wrapper.classes()).toContain('text-white');
      }

      wrapper.unmount();
    });
  });

  it('supports different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      const wrapper = mount(NBadge, {
        props: { size },
        slots: { default: 'Test Badge' },
      });

      if (size === 'sm') {
        expect(wrapper.classes()).toContain('px-2');
        expect(wrapper.classes()).toContain('py-0.5');
        expect(wrapper.classes()).toContain('text-xs');
      } else if (size === 'md') {
        expect(wrapper.classes()).toContain('px-2.5');
        expect(wrapper.classes()).toContain('py-0.5');
        expect(wrapper.classes()).toContain('text-xs');
      } else if (size === 'lg') {
        expect(wrapper.classes()).toContain('px-3');
        expect(wrapper.classes()).toContain('py-1');
        expect(wrapper.classes()).toContain('text-sm');
      }

      wrapper.unmount();
    });
  });

  it('renders with custom class', () => {
    const wrapper = mount(NBadge, {
      props: { class: 'custom-badge' },
      slots: { default: 'Test Badge' },
    });

    expect(wrapper.classes()).toContain('custom-badge');
  });

  it('forwards attributes correctly', () => {
    const wrapper = mount(NBadge, {
      attrs: { 'data-testid': 'badge' },
      slots: { default: 'Test Badge' },
    });

    expect(wrapper.attributes('data-testid')).toBe('badge');
  });

  it('supports asChild prop with button', () => {
    const wrapper = mount(NBadge, {
      props: { asChild: true },
      slots: {
        default: () => h('button', 'Badge Button'),
      },
    });

    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Badge Button');
    expect(button.classes()).toContain('bg-brand-500');
    expect(button.classes()).toContain('text-white');
  });

  it('supports asChild prop with link', () => {
    const wrapper = mount(NBadge, {
      props: { asChild: true },
      slots: {
        default: () => h('a', { href: '#test' }, 'Badge Link'),
      },
    });

    const link = wrapper.find('a');
    expect(link.exists()).toBe(true);
    expect(link.text()).toBe('Badge Link');
    expect(link.attributes('href')).toBe('#test');
    expect(link.classes()).toContain('bg-brand-500');
    expect(link.classes()).toContain('text-white');
  });

  it('supports asChild prop with span', () => {
    const wrapper = mount(NBadge, {
      props: { asChild: true },
      slots: {
        default: () => h('span', 'Badge Span'),
      },
    });

    const span = wrapper.find('span');
    expect(span.exists()).toBe(true);
    expect(span.text()).toBe('Badge Span');
    expect(span.classes()).toContain('bg-brand-500');
    expect(span.classes()).toContain('text-white');
  });

  it('handles multiple children with asChild', () => {
    const wrapper = mount(NBadge, {
      props: { asChild: true },
      slots: {
        default: () => [
          h('div', 'First'),
          h('div', 'Second'),
        ],
      },
    });

    expect(wrapper.text()).toContain('First');
    expect(wrapper.text()).toContain('Second');
  });

  it('applies focus styles correctly', () => {
    const wrapper = mount(NBadge, {
      slots: { default: 'Focusable Badge' },
    });

    expect(wrapper.classes()).toContain('focus:outline-none');
    expect(wrapper.classes()).toContain('focus:ring-2');
    expect(wrapper.classes()).toContain('focus:ring-ring');
    expect(wrapper.classes()).toContain('focus:ring-offset-2');
  });

  it('applies hover styles correctly', () => {
    const wrapper = mount(NBadge, {
      props: { variant: 'default' },
      slots: { default: 'Hover Badge' },
    });

    expect(wrapper.classes()).toContain('hover:bg-brand-600');
  });

  it('renders with icon and text', () => {
    const wrapper = mount(NBadge, {
      slots: {
        default: [
          h('span', '🔔'),
          h('span', 'Notifications'),
        ],
      },
    });

    expect(wrapper.text()).toContain('🔔');
    expect(wrapper.text()).toContain('Notifications');
  });

  it('renders with only icon', () => {
    const wrapper = mount(NBadge, {
      slots: {
        default: h('span', '⭐'),
      },
    });

    expect(wrapper.text()).toContain('⭐');
  });

  it('renders with number', () => {
    const wrapper = mount(NBadge, {
      slots: { default: '42' },
    });

    expect(wrapper.text()).toBe('42');
  });

  it('renders with long text', () => {
    const wrapper = mount(NBadge, {
      slots: { default: 'This is a very long badge text that should wrap' },
    });

    expect(wrapper.text()).toBe('This is a very long badge text that should wrap');
  });

  it('renders with special characters', () => {
    const wrapper = mount(NBadge, {
      slots: { default: 'Badge with @#$%^&*()' },
    });

    expect(wrapper.text()).toBe('Badge with @#$%^&*()');
  });

  it('renders with emoji', () => {
    const wrapper = mount(NBadge, {
      slots: { default: '🚀 Rocket Badge' },
    });

    expect(wrapper.text()).toBe('🚀 Rocket Badge');
  });

  it('renders with HTML entities', () => {
    const wrapper = mount(NBadge, {
      slots: { default: 'Badge &amp; HTML' },
    });

    expect(wrapper.text()).toBe('Badge & HTML');
  });

  it('renders with mixed content', () => {
    const wrapper = mount(NBadge, {
      slots: {
        default: [
          h('span', '🔔'),
          h('span', ' '),
          h('span', 'New'),
          h('span', ' '),
          h('span', '(3)'),
        ],
      },
    });

    expect(wrapper.text()).toContain('🔔');
    expect(wrapper.text()).toContain('New');
    expect(wrapper.text()).toContain('(3)');
  });

  it('renders with custom variant and size combination', () => {
    const wrapper = mount(NBadge, {
      props: { variant: 'success', size: 'lg' },
      slots: { default: 'Success Badge' },
    });

    expect(wrapper.classes()).toContain('bg-green-500');
    expect(wrapper.classes()).toContain('text-white');
    expect(wrapper.classes()).toContain('px-3');
    expect(wrapper.classes()).toContain('py-1');
    expect(wrapper.classes()).toContain('text-sm');
  });

  it('renders with outline variant and small size', () => {
    const wrapper = mount(NBadge, {
      props: { variant: 'outline', size: 'sm' },
      slots: { default: 'Outline Badge' },
    });

    expect(wrapper.classes()).toContain('text-neutral-950');
    expect(wrapper.classes()).toContain('border-neutral-200');
    expect(wrapper.classes()).toContain('px-2');
    expect(wrapper.classes()).toContain('py-0.5');
    expect(wrapper.classes()).toContain('text-xs');
  });

  it('renders with destructive variant and large size', () => {
    const wrapper = mount(NBadge, {
      props: { variant: 'destructive', size: 'lg' },
      slots: { default: 'Destructive Badge' },
    });

    expect(wrapper.classes()).toContain('bg-red-500');
    expect(wrapper.classes()).toContain('text-white');
    expect(wrapper.classes()).toContain('px-3');
    expect(wrapper.classes()).toContain('py-1');
    expect(wrapper.classes()).toContain('text-sm');
  });

  it('renders with warning variant and medium size', () => {
    const wrapper = mount(NBadge, {
      props: { variant: 'warning', size: 'md' },
      slots: { default: 'Warning Badge' },
    });

    expect(wrapper.classes()).toContain('bg-yellow-500');
    expect(wrapper.classes()).toContain('text-white');
    expect(wrapper.classes()).toContain('px-2.5');
    expect(wrapper.classes()).toContain('py-0.5');
    expect(wrapper.classes()).toContain('text-xs');
  });

  it('renders with info variant and small size', () => {
    const wrapper = mount(NBadge, {
      props: { variant: 'info', size: 'sm' },
      slots: { default: 'Info Badge' },
    });

    expect(wrapper.classes()).toContain('bg-blue-500');
    expect(wrapper.classes()).toContain('text-white');
    expect(wrapper.classes()).toContain('px-2');
    expect(wrapper.classes()).toContain('py-0.5');
    expect(wrapper.classes()).toContain('text-xs');
  });

  it('renders with secondary variant and large size', () => {
    const wrapper = mount(NBadge, {
      props: { variant: 'secondary', size: 'lg' },
      slots: { default: 'Secondary Badge' },
    });

    expect(wrapper.classes()).toContain('bg-neutral-100');
    expect(wrapper.classes()).toContain('text-neutral-900');
    expect(wrapper.classes()).toContain('px-3');
    expect(wrapper.classes()).toContain('py-1');
    expect(wrapper.classes()).toContain('text-sm');
  });
});
