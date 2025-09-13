import { defineComponent, computed, h, type PropType, watch } from 'vue';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '../lib/utils';

const dialogVariants = tv({
  base: [
    'fixed inset-0 z-50 flex items-center justify-center',
    'bg-black/50 backdrop-blur-sm',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  ],
  variants: {
    size: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-12',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const dialogContentVariants = tv({
  base: [
    'relative bg-white rounded-lg shadow-lg',
    'w-full max-w-lg mx-auto',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
    'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
    'border border-neutral-200',
  ],
  variants: {
    size: {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      '4xl': 'max-w-4xl',
      '5xl': 'max-w-5xl',
      '6xl': 'max-w-6xl',
      '7xl': 'max-w-7xl',
      full: 'max-w-full mx-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type DialogVariants = VariantProps<typeof dialogVariants>;
export type DialogContentVariants = VariantProps<typeof dialogContentVariants>;

export interface DialogProps extends DialogVariants {
  open?: boolean;
  modelValue?: boolean;
  class?: string;
}

export interface DialogContentProps extends DialogContentVariants {
  class?: string;
}

export interface DialogHeaderProps {
  class?: string;
}

export interface DialogTitleProps {
  class?: string;
}

export interface DialogDescriptionProps {
  class?: string;
}

export interface DialogFooterProps {
  class?: string;
}

export interface DialogCloseProps {
  class?: string;
}

export const NDialog = defineComponent({
  name: 'NDialog',
  props: {
    open: Boolean,
    modelValue: Boolean,
    size: {
      type: String as PropType<DialogProps['size']>,
      default: 'md',
    },
    class: String,
  },
  emits: ['update:modelValue', 'openChange'],
  setup(props, { emit, slots }) {
    const isOpen = computed(() => props.open ?? props.modelValue ?? false);

    const dialogClasses = computed(() => {
      return cn(dialogVariants({ size: props.size }), props.class);
    });

    const handleBackdropClick = (event: Event) => {
      if (event.target === event.currentTarget) {
        emit('update:modelValue', false);
        emit('openChange', false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        emit('update:modelValue', false);
        emit('openChange', false);
      }
    };

    watch(isOpen, (newValue) => {
      if (newValue) {
        document.addEventListener('keydown', handleEscapeKey);
        document.body.style.overflow = 'hidden';
      } else {
        document.removeEventListener('keydown', handleEscapeKey);
        document.body.style.overflow = 'unset';
      }
    }, { immediate: true });

    return () => {
      if (!isOpen.value) return null;

      return h('div', {
        class: dialogClasses.value,
        onClick: handleBackdropClick,
        role: 'dialog',
        'aria-modal': 'true',
      }, slots.default?.());
    };
  },
});

export const NDialogContent = defineComponent({
  name: 'NDialogContent',
  props: {
    size: {
      type: String as PropType<DialogContentProps['size']>,
      default: 'md',
    },
    class: String,
  },
  setup(props, { slots }) {
    const contentClasses = computed(() => {
      return cn(dialogContentVariants({ size: props.size }), props.class);
    });

    return () => {
      return h('div', {
        class: contentClasses.value,
        onClick: (e: Event) => e.stopPropagation(),
      }, slots.default?.());
    };
  },
});

export const NDialogHeader = defineComponent({
  name: 'NDialogHeader',
  props: {
    class: String,
  },
  setup(props, { slots }) {
    return () => {
      return h('div', {
        class: cn('flex flex-col space-y-1.5 p-6 pb-0', props.class),
      }, slots.default?.());
    };
  },
});

export const NDialogTitle = defineComponent({
  name: 'NDialogTitle',
  props: {
    class: String,
  },
  setup(props, { slots }) {
    return () => {
      return h('h2', {
        class: cn('text-lg font-semibold leading-none tracking-tight', props.class),
      }, slots.default?.());
    };
  },
});

export const NDialogDescription = defineComponent({
  name: 'NDialogDescription',
  props: {
    class: String,
  },
  setup(props, { slots }) {
    return () => {
      return h('p', {
        class: cn('text-sm text-neutral-500', props.class),
      }, slots.default?.());
    };
  },
});

export const NDialogFooter = defineComponent({
  name: 'NDialogFooter',
  props: {
    class: String,
  },
  setup(props, { slots }) {
    return () => {
      return h('div', {
        class: cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-0', props.class),
      }, slots.default?.());
    };
  },
});

export const NDialogClose = defineComponent({
  name: 'NDialogClose',
  props: {
    class: String,
  },
  emits: ['click'],
  setup(props, { emit, slots }) {
    const handleClick = () => {
      emit('click');
    };

    return () => {
      return h('button', {
        type: 'button',
        class: cn(
          'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity',
          'hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
          'disabled:pointer-events-none',
          props.class
        ),
        onClick: handleClick,
        'aria-label': 'Close dialog',
      }, slots.default?.());
    };
  },
});
