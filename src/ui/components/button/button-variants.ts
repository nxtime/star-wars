import { cva } from 'class-variance-authority';

export const buttonVariants = cva(['btn'], {
  variants: {
    intent: {
      primary: ['btn-primary'],
      secondary: ['btn-secondary'],
      danger: ['bg-red', 'text-crust'],
      ghost: ['btn-ghost']
    },
    size: {
      sm: ['btn-sm'],
      md: ['btn-md'],
      lg: ['btn-lg'],
    },
    text: {
      xs: ['text-xs'],
      sm: ['text-sm'],
      md: ['text-md'],
      lg: ['text-lg'],
      xl: ['text-xl'],
    },
    animation: {
      fade: ['animate', 'fade-in'],
      slideRight: ['animate', 'slide-in-right'],
      slideLeft: ['animate', 'slide-in-left'],
      slideUp: ['animate', 'slide-in-up'],
      slideDown: ['animate', 'slide-in-down'],
      scale: ['animate', 'btn-scale'],
      bounce: ['animate', 'bounce-in-up'],
    },
    speed: {
      fast: ['animate-fast'],
      normal: [],
      slow: ['animate-slow'],
    },
    timing: {
      linear: ['ease-linear'],
      easeIn: ['ease-in'],
      easeOut: ['ease-out'],
      easeInOut: ['ease-in-out'],
    },
    fullWidth: {
      true: ['btn-full'],
    },
    disabled: {
      true: ['btn-disabled'],
    },
    active: {
      true: ["btn-active"]
    }
  },
  compoundVariants: [
    // Hover effects for non-disabled buttons
    {
      intent: 'primary',
      disabled: undefined,
      class: 'hover:bg-mauve/90',
    },
    {
      intent: 'secondary',
      disabled: undefined,
      class: 'hover:bg-surface1/90',
    },
    {
      intent: 'danger',
      disabled: undefined,
      class: 'hover:bg-red/90',
    },

    {
      intent: 'ghost',
      active: true,
      class: 'text-mauve'
    },
    {
      animation: ['fade', 'slideRight', 'slideLeft', 'slideUp', 'slideDown', 'scale', 'bounce'],
      timing: 'easeInOut',
      class: 'ease-in-out',
    },
  ],
  defaultVariants: {
    intent: 'primary',
    size: 'md',
    speed: 'normal',
    animation: "scale",
    text: "md",
    disabled: undefined
  },
});
