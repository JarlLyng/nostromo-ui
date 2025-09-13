import { defineComponent, computed, h, type PropType } from 'vue';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '../lib/utils';

const inputVariants = tv({
  base: [
    'flex w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm',
    'placeholder:text-neutral-400',
    'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'transition-colors duration-200',
  ],
  variants: {
    variant: {
      default: 'border-neutral-200 focus:ring-brand-500',
      error: 'border-red-500 focus:ring-red-500',
      success: 'border-green-500 focus:ring-green-500',
    },
    size: {
      sm: 'h-8 px-2 text-xs',
      md: 'h-10 px-3 text-sm',
      lg: 'h-12 px-4 text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export type InputVariants = VariantProps<typeof inputVariants>;

export interface InputProps extends InputVariants {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  label?: string;
  placeholder?: string;
  error?: string;
  success?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  value?: string | number;
  modelValue?: string | number;
  class?: string;
  id?: string;
  name?: string;
  autocomplete?: string;
  readonly?: boolean;
  min?: number;
  max?: number;
  step?: number;
  minlength?: number;
  maxlength?: number;
  pattern?: string;
}

export const NInput = defineComponent({
  name: 'NInput',
  props: {
    type: {
      type: String as PropType<InputProps['type']>,
      default: 'text',
    },
    variant: {
      type: String as PropType<InputProps['variant']>,
      default: 'default',
    },
    size: {
      type: String as PropType<InputProps['size']>,
      default: 'md',
    },
    label: String,
    placeholder: String,
    error: String,
    success: String,
    helperText: String,
    disabled: Boolean,
    required: Boolean,
    value: [String, Number],
    modelValue: [String, Number],
    class: String,
    id: String,
    name: String,
    autocomplete: String,
    readonly: Boolean,
    min: Number,
    max: Number,
    step: Number,
    minlength: Number,
    maxlength: Number,
    pattern: String,
  },
  emits: ['update:modelValue', 'change', 'focus', 'blur', 'input'],
  setup(props, { emit, attrs }) {
    const inputId = computed(() => props.id || `input-${Math.random().toString(36).substr(2, 9)}`);
    const errorId = computed(() => `${inputId.value}-error`);
    const successId = computed(() => `${inputId.value}-success`);
    const helperId = computed(() => `${inputId.value}-helper`);

    const inputClasses = computed(() => {
      const variant = props.error ? 'error' : props.success ? 'success' : props.variant;
      return cn(inputVariants({ variant, size: props.size }), props.class);
    });

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit('update:modelValue', target.value);
      emit('input', target.value);
      emit('change', target.value);
    };

    const handleFocus = (event: FocusEvent) => {
      emit('focus', event);
    };

    const handleBlur = (event: FocusEvent) => {
      emit('blur', event);
    };

    return () => {
      const inputElement = h('input', {
        id: inputId.value,
        type: props.type,
        class: inputClasses.value,
        placeholder: props.placeholder,
        disabled: props.disabled,
        required: props.required,
        readonly: props.readonly,
        value: props.modelValue ?? props.value,
        name: props.name,
        autocomplete: props.autocomplete,
        min: props.min,
        max: props.max,
        step: props.step,
        minlength: props.minlength,
        maxlength: props.maxlength,
        pattern: props.pattern,
        'aria-invalid': props.error ? 'true' : 'false',
        'aria-describedby': [
          props.error ? errorId.value : null,
          props.success ? successId.value : null,
          props.helperText ? helperId.value : null,
        ].filter(Boolean).join(' ') || undefined,
        onInput: handleInput,
        onFocus: handleFocus,
        onBlur: handleBlur,
        ...attrs,
      });

      if (!props.label && !props.error && !props.success && !props.helperText) {
        return inputElement;
      }

      return h('div', { class: 'space-y-1' }, [
        // Label
        props.label && h('label', {
          for: inputId.value,
          class: 'text-sm font-medium text-neutral-700',
        }, [
          props.label,
          props.required && h('span', { class: 'text-red-500 ml-1' }, '*'),
        ]),

        // Input
        inputElement,

        // Error message
        props.error && h('p', {
          id: errorId.value,
          class: 'text-sm text-red-600',
          role: 'alert',
          'aria-live': 'polite',
        }, props.error),

        // Success message
        props.success && h('p', {
          id: successId.value,
          class: 'text-sm text-green-600',
          role: 'status',
          'aria-live': 'polite',
        }, props.success),

        // Helper text
        props.helperText && !props.error && !props.success && h('p', {
          id: helperId.value,
          class: 'text-sm text-neutral-500',
        }, props.helperText),
      ]);
    };
  },
});
