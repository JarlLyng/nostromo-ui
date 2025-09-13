import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { NDialog, NDialogContent, NDialogHeader, NDialogTitle, NDialogDescription, NDialogFooter, NDialogClose } from '../dialog';

describe('NDialog', () => {
  beforeEach(() => {
    // Reset body overflow
    document.body.style.overflow = 'unset';
  });

  afterEach(() => {
    // Clean up body overflow
    document.body.style.overflow = 'unset';
  });

  it('renders when open', () => {
    const wrapper = mount(NDialog, {
      props: {
        open: true,
      },
      slots: {
        default: () => [
          h(NDialogContent, {}, {
            default: () => [
              h(NDialogHeader, {}, {
                default: () => [
                  h(NDialogTitle, {}, 'Test Dialog'),
                  h(NDialogDescription, {}, 'Test description'),
                ],
              }),
              h(NDialogFooter, {}, {
                default: () => h('button', 'Close'),
              }),
            ],
          }),
        ],
      },
    });

    expect(wrapper.find('h2').text()).toBe('Test Dialog');
    expect(wrapper.find('p').text()).toBe('Test description');
  });

  it('does not render when closed', () => {
    const wrapper = mount(NDialog, {
      props: {
        open: false,
      },
      slots: {
        default: () => h(NDialogContent, {}, {
          default: () => h(NDialogTitle, {}, 'Test Dialog'),
        }),
      },
    });

    expect(wrapper.find('h2').exists()).toBe(false);
  });

  it('emits update:modelValue when backdrop is clicked', async () => {
    const wrapper = mount(NDialog, {
      props: {
        modelValue: true,
      },
      slots: {
        default: () => h(NDialogContent, {}, {
          default: () => h(NDialogTitle, {}, 'Test Dialog'),
        }),
      },
    });

    const backdrop = wrapper.find('[role="dialog"]');
    await backdrop.trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
  });

  it('does not emit when content is clicked', async () => {
    const wrapper = mount(NDialog, {
      props: {
        modelValue: true,
      },
      slots: {
        default: () => h(NDialogContent, {}, {
          default: () => h(NDialogTitle, {}, 'Test Dialog'),
        }),
      },
    });

    const content = wrapper.find('h2').element.closest('div');
    if (content) {
      await wrapper.find('h2').trigger('click');
    }

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('emits update:modelValue when Escape key is pressed', async () => {
    const wrapper = mount(NDialog, {
      props: {
        modelValue: true,
      },
      slots: {
        default: () => h(NDialogContent, {}, {
          default: () => h(NDialogTitle, {}, 'Test Dialog'),
        }),
      },
    });

    // Simulate Escape key press
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escapeEvent);

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
  });

  it('sets body overflow to hidden when open', () => {
    mount(NDialog, {
      props: {
        modelValue: true,
      },
      slots: {
        default: () => h(NDialogContent, {}, {
          default: () => h(NDialogTitle, {}, 'Test Dialog'),
        }),
      },
    });

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body overflow when closed', async () => {
    const wrapper = mount(NDialog, {
      props: {
        modelValue: true,
      },
      slots: {
        default: () => h(NDialogContent, {}, {
          default: () => h(NDialogTitle, {}, 'Test Dialog'),
        }),
      },
    });

    expect(document.body.style.overflow).toBe('hidden');

    await wrapper.setProps({ modelValue: false });

    expect(document.body.style.overflow).toBe('unset');
  });

  it('supports different sizes', () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach((size) => {
      const wrapper = mount(NDialog, {
        props: {
          open: true,
          size,
        },
        slots: {
          default: () => h(NDialogContent, {}, {
            default: () => h(NDialogTitle, {}, 'Test Dialog'),
          }),
        },
      });

      const dialog = wrapper.find('[role="dialog"]');
      if (size === 'sm') {
        expect(dialog.classes()).toContain('p-4');
      } else if (size === 'md') {
        expect(dialog.classes()).toContain('p-6');
      } else if (size === 'lg') {
        expect(dialog.classes()).toContain('p-8');
      } else if (size === 'xl') {
        expect(dialog.classes()).toContain('p-12');
      }
    });
  });

  it('renders with custom class', () => {
    const wrapper = mount(NDialog, {
      props: {
        open: true,
        class: 'custom-dialog',
      },
      slots: {
        default: () => h(NDialogContent, {}, {
          default: () => h(NDialogTitle, {}, 'Test Dialog'),
        }),
      },
    });

    const dialog = wrapper.find('[role="dialog"]');
    expect(dialog.classes()).toContain('custom-dialog');
  });

  it('renders NDialogContent with correct size', () => {
    const wrapper = mount(NDialogContent, {
      props: {
        size: 'xl',
      },
      slots: {
        default: () => h(NDialogTitle, {}, 'Test Dialog'),
      },
    });

    const content = wrapper.find('div');
    expect(content.classes()).toContain('max-w-xl');
  });

  it('renders NDialogHeader with correct structure', () => {
    const wrapper = mount(NDialogHeader, {
      slots: {
        default: () => [
          h(NDialogTitle, {}, 'Test Title'),
          h(NDialogDescription, {}, 'Test Description'),
        ],
      },
    });

    const header = wrapper.find('div');
    expect(header.classes()).toContain('flex', 'flex-col', 'space-y-1.5', 'p-6', 'pb-0');
  });

  it('renders NDialogTitle with correct styling', () => {
    const wrapper = mount(NDialogTitle, {
      slots: {
        default: () => 'Test Title',
      },
    });

    const title = wrapper.find('h2');
    expect(title.classes()).toContain('text-lg', 'font-semibold', 'leading-none', 'tracking-tight');
    expect(title.text()).toBe('Test Title');
  });

  it('renders NDialogDescription with correct styling', () => {
    const wrapper = mount(NDialogDescription, {
      slots: {
        default: () => 'Test Description',
      },
    });

    const description = wrapper.find('p');
    expect(description.classes()).toContain('text-sm', 'text-neutral-500');
    expect(description.text()).toBe('Test Description');
  });

  it('renders NDialogFooter with correct structure', () => {
    const wrapper = mount(NDialogFooter, {
      slots: {
        default: () => [
          h('button', 'Cancel'),
          h('button', 'Save'),
        ],
      },
    });

    const footer = wrapper.find('div');
    expect(footer.classes()).toContain('flex', 'flex-col-reverse', 'sm:flex-row', 'sm:justify-end', 'sm:space-x-2', 'p-6', 'pt-0');
  });

  it('renders NDialogClose button', async () => {
    const wrapper = mount(NDialogClose, {
      slots: {
        default: () => '×',
      },
    });

    const closeButton = wrapper.find('button');
    expect(closeButton.exists()).toBe(true);
    expect(closeButton.attributes('aria-label')).toBe('Close dialog');
    expect(closeButton.classes()).toContain('absolute', 'right-4', 'top-4');

    await closeButton.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('supports custom class on all components', () => {
    const wrapper = mount({
      template: `
        <NDialog open="true">
          <NDialogContent class="custom-content">
            <NDialogHeader class="custom-header">
              <NDialogTitle class="custom-title">Test Title</NDialogTitle>
              <NDialogDescription class="custom-description">Test Description</NDialogDescription>
            </NDialogHeader>
            <NDialogFooter class="custom-footer">
              <button>Action</button>
            </NDialogFooter>
          </NDialogContent>
        </NDialog>
      `,
      components: {
        NDialog,
        NDialogContent,
        NDialogHeader,
        NDialogTitle,
        NDialogDescription,
        NDialogFooter,
      },
    });

    expect(wrapper.find('.custom-content').exists()).toBe(true);
    expect(wrapper.find('.custom-header').exists()).toBe(true);
    expect(wrapper.find('.custom-title').exists()).toBe(true);
    expect(wrapper.find('.custom-description').exists()).toBe(true);
    expect(wrapper.find('.custom-footer').exists()).toBe(true);
  });

  it('handles v-model correctly', async () => {
    const wrapper = mount({
      template: `
        <div>
          <button @click="open = true">Open</button>
          <NDialog v-model="open">
            <NDialogContent>
              <NDialogTitle>Test Dialog</NDialogTitle>
            </NDialogContent>
          </NDialog>
        </div>
      `,
      components: {
        NDialog,
        NDialogContent,
        NDialogTitle,
      },
      data() {
        return {
          open: false,
        };
      },
    });

    expect(wrapper.find('h2').exists()).toBe(false);

    await wrapper.find('button').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('h2').exists()).toBe(true);
  });
});
