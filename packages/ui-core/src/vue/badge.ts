import { defineComponent, computed, h, type PropType } from 'vue';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '../lib/utils';

const badgeVariants = tv({
  base: [
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  ],
  variants: {
    variant: {
      default: 'border-transparent bg-brand-500 text-white hover:bg-brand-600',
      secondary: 'border-transparent bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
      destructive: 'border-transparent bg-red-500 text-white hover:bg-red-600',
      outline: 'text-neutral-950 border-neutral-200',
      success: 'border-transparent bg-green-500 text-white hover:bg-green-600',
      warning: 'border-transparent bg-yellow-500 text-white hover:bg-yellow-600',
      info: 'border-transparent bg-blue-500 text-white hover:bg-blue-600',
    },
    size: {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-xs',
      lg: 'px-3 py-1 text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  class?: string;
  asChild?: boolean;
}

export const NBadge = defineComponent<BadgeProps>({
  name: 'NBadge',
  props: {
    variant: {
      type: String as PropType<BadgeProps['variant']>,
      default: 'default',
    },
    size: {
      type: String as PropType<BadgeProps['size']>,
      default: 'md',
    },
    class: {
      type: String,
      default: '',
    },
    asChild: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, attrs }) {
    const badgeClasses = computed(() => 
      cn(badgeVariants({ variant: props.variant, size: props.size }), props.class)
    );

    return () => {
      if (props.asChild && slots.default) {
        // When asChild is true, apply classes to the child element
        const children = slots.default();
        if (children && children.length > 0) {
          // Handle single child - apply classes to it
          if (children.length === 1) {
            const child = children[0];
            if (child && typeof child === 'object' && 'props' in child) {
              return h(child.type as any, {
                ...child.props,
                class: cn(badgeClasses.value, child.props?.class),
                ...attrs,
              }, child.children as any);
            }
          } else {
            // Multiple children - wrap in div with badge classes
            return h('div', {
              class: badgeClasses.value,
              ...attrs,
            }, children);
          }
        }
        // If no valid child found, fall back to div wrapper
      }
      
      return h('div', {
        class: badgeClasses.value,
        ...attrs,
      }, slots.default?.());
    };
  },
});