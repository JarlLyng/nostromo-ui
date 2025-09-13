import { defineComponent, computed, h, ref, type PropType } from 'vue';
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '../lib/utils';

const avatarVariants = tv({
  base: [
    'relative flex shrink-0 overflow-hidden rounded-full',
    'bg-neutral-100 text-neutral-600',
    'transition-colors duration-200',
  ],
  variants: {
    size: {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
      xl: 'h-16 w-16 text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const avatarImageVariants = tv({
  base: 'aspect-square h-full w-full object-cover',
});

const avatarFallbackVariants = tv({
  base: 'flex h-full w-full items-center justify-center rounded-full bg-neutral-100 font-medium text-neutral-600',
});

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  class?: string;
  src?: string;
  alt?: string;
  fallback?: string;
}

export interface AvatarImageProps {
  class?: string;
  src?: string;
  alt?: string;
}

export interface AvatarFallbackProps {
  class?: string;
}

export const NAvatar = defineComponent<AvatarProps>({
  name: 'NAvatar',
  props: {
    size: {
      type: String as PropType<AvatarProps['size']>,
      default: 'md',
    },
    class: {
      type: String,
      default: '',
    },
    src: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
    fallback: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots, attrs }) {
    const imageError = ref(false);
    const imageLoaded = ref(false);

    const avatarClasses = computed(() => 
      cn(avatarVariants({ size: props.size }), props.class)
    );

    const handleImageError = () => {
      imageError.value = true;
    };

    const handleImageLoad = () => {
      imageLoaded.value = true;
    };

    return () => {
      const showImage = props.src && !imageError.value;
      const showFallback = imageError.value || !props.src || !imageLoaded.value;

      return h('div', {
        class: avatarClasses.value,
        ...attrs,
      }, [
        showImage && h('img', {
          src: props.src,
          alt: props.alt,
          class: avatarImageVariants(),
          onError: handleImageError,
          onLoad: handleImageLoad,
          style: { display: imageLoaded.value ? 'block' : 'none' },
        }),
        showFallback && h('div', {
          class: avatarFallbackVariants(),
        }, props.fallback || slots.default?.() || '?'),
      ]);
    };
  },
});

export const NAvatarImage = defineComponent<AvatarImageProps>({
  name: 'NAvatarImage',
  props: {
    class: {
      type: String,
      default: '',
    },
    src: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
  },
  setup(props, { attrs }) {
    const imageClasses = computed(() => 
      cn(avatarImageVariants(), props.class)
    );

    return () => h('img', {
      src: props.src,
      alt: props.alt,
      class: imageClasses.value,
      ...attrs,
    });
  },
});

export const NAvatarFallback = defineComponent<AvatarFallbackProps>({
  name: 'NAvatarFallback',
  props: {
    class: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots, attrs }) {
    const fallbackClasses = computed(() => 
      cn(avatarFallbackVariants(), props.class)
    );

    return () => h('div', {
      class: fallbackClasses.value,
      ...attrs,
    }, slots.default?.());
  },
});
