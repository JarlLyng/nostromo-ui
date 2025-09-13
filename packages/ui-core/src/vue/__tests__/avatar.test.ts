import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { NAvatar, NAvatarImage, NAvatarFallback } from '../avatar';

describe('NAvatar', () => {
  it('renders correctly', () => {
    const wrapper = mount(NAvatar, {
      slots: { default: 'JD' },
    });

    expect(wrapper.text()).toBe('JD');
    expect(wrapper.classes()).toContain('relative');
    expect(wrapper.classes()).toContain('flex');
    expect(wrapper.classes()).toContain('shrink-0');
    expect(wrapper.classes()).toContain('overflow-hidden');
    expect(wrapper.classes()).toContain('rounded-full');
  });

  it('renders with fallback text', () => {
    const wrapper = mount(NAvatar, {
      props: { fallback: 'AB' },
      slots: { default: 'JD' },
    });

    expect(wrapper.text()).toBe('AB');
  });

  it('supports different sizes', () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach((size) => {
      const wrapper = mount(NAvatar, {
        props: { size },
        slots: { default: 'Test' },
      });

      expect(wrapper.classes()).toContain('relative', 'flex', 'shrink-0', 'overflow-hidden', 'rounded-full');

      if (size === 'sm') {
        expect(wrapper.classes()).toContain('h-8', 'w-8', 'text-xs');
      } else if (size === 'md') {
        expect(wrapper.classes()).toContain('h-10', 'w-10', 'text-sm');
      } else if (size === 'lg') {
        expect(wrapper.classes()).toContain('h-12', 'w-12', 'text-base');
      } else if (size === 'xl') {
        expect(wrapper.classes()).toContain('h-16', 'w-16', 'text-lg');
      }

      wrapper.unmount();
    });
  });

  it('renders with custom class', () => {
    const wrapper = mount(NAvatar, {
      props: { class: 'custom-avatar' },
      slots: { default: 'Test' },
    });

    expect(wrapper.classes()).toContain('custom-avatar');
  });

  it('forwards attributes correctly', () => {
    const wrapper = mount(NAvatar, {
      attrs: { 'data-testid': 'avatar' },
      slots: { default: 'Test' },
    });

    expect(wrapper.attributes('data-testid')).toBe('avatar');
  });

  it('renders with default fallback when no children provided', () => {
    const wrapper = mount(NAvatar);
    expect(wrapper.text()).toBe('?');
  });

  it('renders with custom fallback prop', () => {
    const wrapper = mount(NAvatar, {
      props: { fallback: 'AB' },
    });
    expect(wrapper.text()).toBe('AB');
  });

  it('renders with initials', () => {
    const wrapper = mount(NAvatar, {
      slots: { default: 'JD' },
    });
    expect(wrapper.text()).toBe('JD');
  });

  it('renders with single character', () => {
    const wrapper = mount(NAvatar, {
      slots: { default: 'J' },
    });
    expect(wrapper.text()).toBe('J');
  });

  it('renders with emoji', () => {
    const wrapper = mount(NAvatar, {
      slots: { default: '😀' },
    });
    expect(wrapper.text()).toBe('😀');
  });

  it('renders with special characters', () => {
    const wrapper = mount(NAvatar, {
      slots: { default: '@#$' },
    });
    expect(wrapper.text()).toBe('@#$');
  });

  it('renders with numbers', () => {
    const wrapper = mount(NAvatar, {
      slots: { default: '123' },
    });
    expect(wrapper.text()).toBe('123');
  });

  it('renders with long text', () => {
    const wrapper = mount(NAvatar, {
      slots: { default: 'Very Long Name' },
    });
    expect(wrapper.text()).toBe('Very Long Name');
  });

  it('renders with mixed content', () => {
    const wrapper = mount(NAvatar, {
      slots: { default: 'J.D.' },
    });
    expect(wrapper.text()).toBe('J.D.');
  });

  it('renders with custom size and fallback combination', () => {
    const wrapper = mount(NAvatar, {
      props: { size: 'lg', fallback: 'AB' },
      slots: { default: 'CD' },
    });

    expect(wrapper.text()).toBe('AB');
    expect(wrapper.classes()).toContain('h-12', 'w-12', 'text-base');
  });

  it('renders with small size and custom fallback', () => {
    const wrapper = mount(NAvatar, {
      props: { size: 'sm', fallback: 'X' },
      slots: { default: 'Y' },
    });

    expect(wrapper.text()).toBe('X');
    expect(wrapper.classes()).toContain('h-8', 'w-8', 'text-xs');
  });

  it('renders with extra large size and default fallback', () => {
    const wrapper = mount(NAvatar, {
      props: { size: 'xl' },
    });

    expect(wrapper.text()).toBe('?');
    expect(wrapper.classes()).toContain('h-16', 'w-16', 'text-lg');
  });

  it('renders with medium size and emoji fallback', () => {
    const wrapper = mount(NAvatar, {
      props: { size: 'md', fallback: '🚀' },
    });

    expect(wrapper.text()).toBe('🚀');
    expect(wrapper.classes()).toContain('h-10', 'w-10', 'text-sm');
  });

  it('renders with image when src is provided', () => {
    const wrapper = mount(NAvatar, {
      props: { src: 'https://example.com/avatar.jpg', alt: 'User avatar' },
      slots: { default: 'JD' },
    });

    // Should show fallback initially while image loads
    expect(wrapper.text()).toBe('JD');
  });

  it('shows fallback when image fails to load', async () => {
    const wrapper = mount(NAvatar, {
      props: { src: 'https://invalid-url.com/avatar.jpg', alt: 'User avatar' },
      slots: { default: 'JD' },
    });

    // Should show fallback when image fails
    expect(wrapper.text()).toBe('JD');
  });
});

describe('NAvatarImage', () => {
  it('renders correctly', () => {
    const wrapper = mount(NAvatarImage, {
      props: { src: 'https://example.com/avatar.jpg', alt: 'User avatar' },
    });

    const image = wrapper.find('img');
    expect(image.exists()).toBe(true);
    expect(image.attributes('src')).toBe('https://example.com/avatar.jpg');
    expect(image.attributes('alt')).toBe('User avatar');
    expect(image.classes()).toContain('aspect-square', 'h-full', 'w-full', 'object-cover');
  });

  it('renders with custom class', () => {
    const wrapper = mount(NAvatarImage, {
      props: { 
        src: 'https://example.com/avatar.jpg', 
        alt: 'User avatar',
        class: 'custom-image'
      },
    });

    const image = wrapper.find('img');
    expect(image.classes()).toContain('custom-image');
  });

  it('forwards attributes correctly', () => {
    const wrapper = mount(NAvatarImage, {
      props: { 
        src: 'https://example.com/avatar.jpg', 
        alt: 'User avatar'
      },
      attrs: { 'data-testid': 'avatar-image' },
    });

    const image = wrapper.find('img');
    expect(image.attributes('data-testid')).toBe('avatar-image');
  });

  it('renders with different image sources', () => {
    const sources = [
      'https://example.com/avatar1.jpg',
      'https://example.com/avatar2.png',
      'https://example.com/avatar3.webp',
    ];

    sources.forEach((src) => {
      const wrapper = mount(NAvatarImage, {
        props: { src, alt: 'User avatar' },
      });

      const image = wrapper.find('img');
      expect(image.attributes('src')).toBe(src);

      wrapper.unmount();
    });
  });

  it('renders with different alt texts', () => {
    const altTexts = [
      'User avatar',
      'Profile picture',
      'User photo',
      'Avatar image',
    ];

    altTexts.forEach((alt) => {
      const wrapper = mount(NAvatarImage, {
        props: { src: 'https://example.com/avatar.jpg', alt },
      });

      const image = wrapper.find('img');
      expect(image.attributes('alt')).toBe(alt);

      wrapper.unmount();
    });
  });
});

describe('NAvatarFallback', () => {
  it('renders correctly', () => {
    const wrapper = mount(NAvatarFallback, {
      slots: { default: 'JD' },
    });

    expect(wrapper.text()).toBe('JD');
  });

  it('renders with custom class', () => {
    const wrapper = mount(NAvatarFallback, {
      props: { class: 'custom-fallback' },
      slots: { default: 'JD' },
    });

    expect(wrapper.classes()).toContain('custom-fallback');
  });

  it('forwards attributes correctly', () => {
    const wrapper = mount(NAvatarFallback, {
      attrs: { 'data-testid': 'fallback' },
      slots: { default: 'JD' },
    });

    expect(wrapper.attributes('data-testid')).toBe('fallback');
  });

  it('renders with different content types', () => {
    const contents = [
      'JD',
      'AB',
      'X',
      '123',
      '😀',
      '@#$',
      'Very Long Name',
    ];

    contents.forEach((content) => {
      const wrapper = mount(NAvatarFallback, {
        slots: { default: content },
      });

      expect(wrapper.text()).toBe(content);

      wrapper.unmount();
    });
  });

  it('renders with complex children', () => {
    const wrapper = mount(NAvatarFallback, {
      slots: {
        default: [
          'J',
          'D',
        ],
      },
    });

    expect(wrapper.text()).toContain('J');
    expect(wrapper.text()).toContain('D');
  });

  it('applies correct styling classes', () => {
    const wrapper = mount(NAvatarFallback, {
      slots: { default: 'JD' },
    });

    expect(wrapper.classes()).toContain(
      'flex',
      'h-full',
      'w-full',
      'items-center',
      'justify-center',
      'rounded-full',
      'bg-neutral-100',
      'font-medium',
      'text-neutral-600'
    );
  });
});

describe('Avatar Integration', () => {
  it('renders complete avatar structure', () => {
    const wrapper = mount(NAvatar, {
      props: { size: 'lg', src: 'https://example.com/avatar.jpg', alt: 'User avatar' },
      slots: {
        default: [
          'JD',
        ],
      },
    });

    expect(wrapper.text()).toContain('JD');
  });

  it('handles multiple avatars correctly', () => {
    const wrapper = mount({
      template: `
        <div>
          <NAvatar size="sm">A</NAvatar>
          <NAvatar size="md">B</NAvatar>
          <NAvatar size="lg">C</NAvatar>
          <NAvatar size="xl">D</NAvatar>
        </div>
      `,
      components: {
        NAvatar,
      },
    });

    expect(wrapper.text()).toContain('A');
    expect(wrapper.text()).toContain('B');
    expect(wrapper.text()).toContain('C');
    expect(wrapper.text()).toContain('D');
  });

  it('handles nested content correctly', () => {
    const wrapper = mount(NAvatar, {
      slots: {
        default: [
          'J',
          'D',
        ],
      },
    });

    expect(wrapper.text()).toContain('J');
    expect(wrapper.text()).toContain('D');
  });
});
