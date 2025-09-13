import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { NInput } from '../input';

describe('NInput', () => {
  it('renders correctly', () => {
    const wrapper = mount(NInput, {
      props: {
        placeholder: 'Enter text...',
      },
    });

    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
    expect(input.attributes('placeholder')).toBe('Enter text...');
  });

  it('renders with label', () => {
    const wrapper = mount(NInput, {
      props: {
        label: 'Email Address',
        placeholder: 'Enter your email',
      },
    });

    const label = wrapper.find('label');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('Email Address');
  });

  it('renders with helper text', () => {
    const wrapper = mount(NInput, {
      props: {
        label: 'Password',
        helperText: 'Must be at least 8 characters',
      },
    });

    const helperText = wrapper.find('p');
    expect(helperText.exists()).toBe(true);
    expect(helperText.text()).toBe('Must be at least 8 characters');
  });

  it('renders error state', () => {
    const wrapper = mount(NInput, {
      props: {
        label: 'Email',
        error: 'Invalid email address',
      },
    });

    const error = wrapper.find('p');
    expect(error.exists()).toBe(true);
    expect(error.text()).toBe('Invalid email address');
    expect(error.classes()).toContain('text-red-600');
  });

  it('renders success state', () => {
    const wrapper = mount(NInput, {
      props: {
        label: 'Email',
        success: 'Email is valid',
      },
    });

    const success = wrapper.find('p');
    expect(success.exists()).toBe(true);
    expect(success.text()).toBe('Email is valid');
    expect(success.classes()).toContain('text-green-600');
  });

  it('renders disabled state', () => {
    const wrapper = mount(NInput, {
      props: {
        disabled: true,
        placeholder: 'Disabled input',
      },
    });

    const input = wrapper.find('input');
    expect(input.attributes('disabled')).toBeDefined();
  });

  it('renders required field', () => {
    const wrapper = mount(NInput, {
      props: {
        label: 'Required Field',
        required: true,
      },
    });

    const input = wrapper.find('input');
    expect(input.attributes('required')).toBeDefined();

    const label = wrapper.find('label');
    const asterisk = label.find('span');
    expect(asterisk.exists()).toBe(true);
    expect(asterisk.text()).toBe('*');
  });

  it('supports different input types', () => {
    const types = ['text', 'email', 'password', 'number', 'tel', 'url'] as const;

    types.forEach((type) => {
      const wrapper = mount(NInput, {
        props: { type, label: 'Test Input' },
      });

      const input = wrapper.find('input');
      expect(input.attributes('type')).toBe(type);
    });
  });

  it('supports different sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      const wrapper = mount(NInput, {
        props: { size, label: 'Test Input' },
      });

      const input = wrapper.find('input');
      expect(input.classes()).toContain(`h-${size === 'sm' ? '8' : size === 'md' ? '10' : '12'}`);
    });
  });

  it('supports different variants', () => {
    const variants = ['default', 'error', 'success'] as const;

    variants.forEach((variant) => {
      const wrapper = mount(NInput, {
        props: { variant, label: 'Test Input' },
      });

      const input = wrapper.find('input');
      if (variant === 'error') {
        expect(input.classes()).toContain('border-red-500');
      } else if (variant === 'success') {
        expect(input.classes()).toContain('border-green-500');
      }
    });
  });

  it('emits input events', async () => {
    const wrapper = mount(NInput, {
      props: {
        modelValue: '',
      },
    });

    const input = wrapper.find('input');
    await input.setValue('test value');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test value']);
    expect(wrapper.emitted('input')).toBeTruthy();
    expect(wrapper.emitted('change')).toBeTruthy();
  });

  it('emits focus and blur events', async () => {
    const wrapper = mount(NInput);

    const input = wrapper.find('input');
    await input.trigger('focus');
    await input.trigger('blur');

    expect(wrapper.emitted('focus')).toBeTruthy();
    expect(wrapper.emitted('blur')).toBeTruthy();
  });

  it('supports v-model', async () => {
    const wrapper = mount(NInput, {
      props: {
        modelValue: 'initial value',
      },
    });

    const input = wrapper.find('input');
    expect(input.element.value).toBe('initial value');

    await input.setValue('new value');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value']);
  });

  it('supports value prop', () => {
    const wrapper = mount(NInput, {
      props: {
        value: 'controlled value',
      },
    });

    const input = wrapper.find('input');
    expect(input.element.value).toBe('controlled value');
  });

  it('generates unique IDs for accessibility', () => {
    const wrapper1 = mount(NInput, { props: { label: 'Input 1' } });
    const wrapper2 = mount(NInput, { props: { label: 'Input 2' } });

    const input1 = wrapper1.find('input');
    const input2 = wrapper2.find('input');

    expect(input1.attributes('id')).not.toBe(input2.attributes('id'));
  });

  it('associates label with input', () => {
    const wrapper = mount(NInput, {
      props: {
        label: 'Test Label',
      },
    });

    const input = wrapper.find('input');
    const label = wrapper.find('label');

    expect(input.attributes('id')).toBe(label.attributes('for'));
  });

  it('associates error with input via aria-describedby', () => {
    const wrapper = mount(NInput, {
      props: {
        label: 'Test Input',
        error: 'This is an error',
      },
    });

    const input = wrapper.find('input');
    const error = wrapper.find('p');

    expect(input.attributes('aria-describedby')).toBe(error.attributes('id'));
    expect(input.attributes('aria-invalid')).toBe('true');
  });

  it('associates success with input via aria-describedby', () => {
    const wrapper = mount(NInput, {
      props: {
        label: 'Test Input',
        success: 'This is success',
      },
    });

    const input = wrapper.find('input');
    const success = wrapper.find('p');

    expect(input.attributes('aria-describedby')).toBe(success.attributes('id'));
  });

  it('associates helper text with input via aria-describedby', () => {
    const wrapper = mount(NInput, {
      props: {
        label: 'Test Input',
        helperText: 'This is helper text',
      },
    });

    const input = wrapper.find('input');
    const helper = wrapper.find('p');

    expect(input.attributes('aria-describedby')).toBe(helper.attributes('id'));
  });

  it('supports custom class', () => {
    const wrapper = mount(NInput, {
      props: {
        class: 'custom-class',
      },
    });

    const input = wrapper.find('input');
    expect(input.classes()).toContain('custom-class');
  });

  it('supports custom attributes', () => {
    const wrapper = mount(NInput, {
      props: {
        name: 'test-input',
        autocomplete: 'email',
        minlength: 5,
        maxlength: 50,
      },
    });

    const input = wrapper.find('input');
    expect(input.attributes('name')).toBe('test-input');
    expect(input.attributes('autocomplete')).toBe('email');
    expect(input.attributes('minlength')).toBe('5');
    expect(input.attributes('maxlength')).toBe('50');
  });

  it('supports number input attributes', () => {
    const wrapper = mount(NInput, {
      props: {
        type: 'number',
        min: 0,
        max: 100,
        step: 1,
      },
    });

    const input = wrapper.find('input');
    expect(input.attributes('type')).toBe('number');
    expect(input.attributes('min')).toBe('0');
    expect(input.attributes('max')).toBe('100');
    expect(input.attributes('step')).toBe('1');
  });

  it('supports readonly state', () => {
    const wrapper = mount(NInput, {
      props: {
        readonly: true,
        value: 'readonly value',
      },
    });

    const input = wrapper.find('input');
    expect(input.attributes('readonly')).toBeDefined();
    expect(input.element.value).toBe('readonly value');
  });

  it('prioritizes error over success variant', () => {
    const wrapper = mount(NInput, {
      props: {
        variant: 'success',
        error: 'This is an error',
      },
    });

    const input = wrapper.find('input');
    expect(input.classes()).toContain('border-red-500');
  });

  it('prioritizes success over default variant', () => {
    const wrapper = mount(NInput, {
      props: {
        variant: 'default',
        success: 'This is success',
      },
    });

    const input = wrapper.find('input');
    expect(input.classes()).toContain('border-green-500');
  });
});
