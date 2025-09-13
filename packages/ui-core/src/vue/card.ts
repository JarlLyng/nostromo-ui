import { defineComponent, computed, h, type PropType } from 'vue';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '../lib/utils';

const cardVariants = tv({
  base: [
    'rounded-lg border bg-white text-neutral-950 shadow-sm',
    'transition-colors duration-200',
  ],
  variants: {
    variant: {
      default: 'border-neutral-200',
      outlined: 'border-neutral-300 border-2',
      elevated: 'border-neutral-200 shadow-lg',
      ghost: 'border-transparent shadow-none',
    },
    size: {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

const cardHeaderVariants = tv({
  base: 'flex flex-col space-y-1.5',
  variants: {
    size: {
      sm: 'p-3 pb-2',
      md: 'p-4 pb-3',
      lg: 'p-6 pb-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const cardTitleVariants = tv({
  base: 'text-lg font-semibold leading-none tracking-tight',
  variants: {
    size: {
      sm: 'text-base',
      md: 'text-lg',
      lg: 'text-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const cardDescriptionVariants = tv({
  base: 'text-sm text-neutral-500',
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const cardContentVariants = tv({
  base: 'text-neutral-950',
  variants: {
    size: {
      sm: 'p-3 pt-2',
      md: 'p-4 pt-3',
      lg: 'p-6 pt-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const cardFooterVariants = tv({
  base: 'flex items-center',
  variants: {
    size: {
      sm: 'p-3 pt-2',
      md: 'p-4 pt-3',
      lg: 'p-6 pt-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface CardProps extends VariantProps<typeof cardVariants> {
  class?: string;
}

export interface CardHeaderProps extends VariantProps<typeof cardHeaderVariants> {
  class?: string;
}

export interface CardTitleProps extends VariantProps<typeof cardTitleVariants> {
  class?: string;
  asChild?: boolean;
}

export interface CardDescriptionProps extends VariantProps<typeof cardDescriptionVariants> {
  class?: string;
  asChild?: boolean;
}

export interface CardContentProps extends VariantProps<typeof cardContentVariants> {
  class?: string;
}

export interface CardFooterProps extends VariantProps<typeof cardFooterVariants> {
  class?: string;
}

export const NCard = defineComponent<CardProps>({
  name: 'NCard',
  props: {
    variant: {
      type: String as PropType<CardProps['variant']>,
      default: 'default',
    },
    size: {
      type: String as PropType<CardProps['size']>,
      default: 'md',
    },
    class: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots, attrs }) {
    const cardClasses = computed(() => 
      cn(cardVariants({ variant: props.variant, size: props.size }), props.class)
    );

    return () => h('div', {
      class: cardClasses.value,
      ...attrs,
    }, slots.default?.());
  },
});

export const NCardHeader = defineComponent<CardHeaderProps>({
  name: 'NCardHeader',
  props: {
    size: {
      type: String as PropType<CardHeaderProps['size']>,
      default: 'md',
    },
    class: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots, attrs }) {
    const headerClasses = computed(() => 
      cn(cardHeaderVariants({ size: props.size }), props.class)
    );

    return () => h('div', {
      class: headerClasses.value,
      ...attrs,
    }, slots.default?.());
  },
});

export const NCardTitle = defineComponent<CardTitleProps>({
  name: 'NCardTitle',
  props: {
    size: {
      type: String as PropType<CardTitleProps['size']>,
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
    const titleClasses = computed(() => 
      cn(cardTitleVariants({ size: props.size }), props.class)
    );

    return () => {
      if (props.asChild && slots.default) {
        return slots.default();
      }
      
      return h('h3', {
        class: titleClasses.value,
        ...attrs,
      }, slots.default?.());
    };
  },
});

export const NCardDescription = defineComponent<CardDescriptionProps>({
  name: 'NCardDescription',
  props: {
    size: {
      type: String as PropType<CardDescriptionProps['size']>,
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
    const descriptionClasses = computed(() => 
      cn(cardDescriptionVariants({ size: props.size }), props.class)
    );

    return () => {
      if (props.asChild && slots.default) {
        return slots.default();
      }
      
      return h('p', {
        class: descriptionClasses.value,
        ...attrs,
      }, slots.default?.());
    };
  },
});

export const NCardContent = defineComponent<CardContentProps>({
  name: 'NCardContent',
  props: {
    size: {
      type: String as PropType<CardContentProps['size']>,
      default: 'md',
    },
    class: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots, attrs }) {
    const contentClasses = computed(() => 
      cn(cardContentVariants({ size: props.size }), props.class)
    );

    return () => h('div', {
      class: contentClasses.value,
      ...attrs,
    }, slots.default?.());
  },
});

export const NCardFooter = defineComponent<CardFooterProps>({
  name: 'NCardFooter',
  props: {
    size: {
      type: String as PropType<CardFooterProps['size']>,
      default: 'md',
    },
    class: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots, attrs }) {
    const footerClasses = computed(() => 
      cn(cardFooterVariants({ size: props.size }), props.class)
    );

    return () => h('div', {
      class: footerClasses.value,
      ...attrs,
    }, slots.default?.());
  },
});
