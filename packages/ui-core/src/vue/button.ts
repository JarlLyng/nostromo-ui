import { defineComponent, computed, h, type PropType } from 'vue';
import { buttonVariants, type ButtonVariants } from '../lib/vue-utils';

export interface VueButtonProps extends ButtonVariants {
  asChild?: boolean;
  loading?: boolean;
  disabled?: boolean;
  class?: string;
}

export const NButton = defineComponent({
  name: 'NButton',
  props: {
    variant: {
      type: String as PropType<ButtonVariants['variant']>,
      default: 'primary',
    },
    size: {
      type: String as PropType<ButtonVariants['size']>,
      default: 'md',
    },
    asChild: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    class: {
      type: String,
      default: '',
    },
  },
  emits: ['click'],
  setup(props, { slots, emit }) {
    const isDisabled = computed(() => props.disabled || props.loading);

    const buttonClasses = computed(() => {
      return buttonVariants({
        variant: props.variant,
        size: props.size,
        class: props.class,
      });
    });

    const handleClick = (event: Event) => {
      if (!isDisabled.value) {
        emit('click', event);
      }
    };

    return () => {
      return h('button', {
        class: buttonClasses.value,
        disabled: isDisabled.value,
        onClick: handleClick,
      }, [
        props.loading && h('svg', {
          class: 'mr-2 h-4 w-4 animate-spin',
          xmlns: 'http://www.w3.org/2000/svg',
          fill: 'none',
          viewBox: '0 0 24 24',
        }, [
          h('circle', {
            class: 'opacity-25',
            cx: '12',
            cy: '12',
            r: '10',
            stroke: 'currentColor',
            'stroke-width': '4',
          }),
          h('path', {
            class: 'opacity-75',
            fill: 'currentColor',
            d: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z',
          }),
        ]),
        slots.default?.(),
      ]);
    };
  },
});
