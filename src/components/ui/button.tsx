import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'motion/react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const shadowColorHexMap = {
  ink: 'var(--rk-shadow-color, #18181b)',
  yellow: '#FACC15',
  orange: '#FB923C',
  violet: '#A78BFA',
  mint: '#4ADE80',
  pink: '#F472B6',
  sky: '#38BDF8',
}

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-sans font-extrabold text-sm tracking-wide rk-border focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-colors select-none cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-[#FDE047] text-[#18181B] hover:bg-[#FACC15]',
        yellow: 'bg-[#FDE047] text-[#18181B] hover:bg-[#FACC15]',
        secondary: 'bg-[#FB923C] text-[#18181B] hover:bg-[#F97316]',
        accent: 'bg-[#A78BFA] text-[#18181B] hover:bg-[#8B5CF6]',
        mint: 'bg-[#BBF7D0] text-[#18181B] hover:bg-[#86EFAC]',
        peach: 'bg-[#FED7AA] text-[#18181B] hover:bg-[#FDBA74]',
        sky: 'bg-[#BAE6FD] text-[#18181B] hover:bg-[#7DD3FC]',
        pink: 'bg-[#FBCFE8] text-[#18181B] hover:bg-[#F472B6]',
        black: 'bg-[#18181B] text-[#FFFFFF] border-black hover:bg-[#27272A]',
        outline: 'bg-white text-[#18181B] hover:bg-[#F4F4F0]',
      },
      shape: {
        default: 'rounded-2xl',
        pill: 'rounded-full',
        fab: 'rounded-full !w-12 !h-12 !p-0 shrink-0 aspect-square flex items-center justify-center text-lg',
        square: 'rounded-xl',
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-6 text-sm',
        lg: 'h-13 px-8 text-base font-extrabold',
        icon: 'h-11 w-11 !p-0 shrink-0 aspect-square flex items-center justify-center',
      },
    },
    defaultVariants: {
      variant: 'primary',
      shape: 'pill',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  shadowColor?: keyof typeof shadowColorHexMap
  shadowStyle?: 'hard' | 'soft' | 'none'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      shape,
      size,
      isLoading = false,
      shadowColor = 'ink',
      shadowStyle = 'hard',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isSquareOrFab = shape === 'fab' || size === 'icon'

    // Compute dynamic motion shadows based on shadowStyle & shadowColor
    let initialShadow = '4px 4px 0 0 var(--rk-shadow-color, #18181b)'
    let hoverShadow = '6px 6px 0 0 var(--rk-shadow-color, #18181b)'
    let tapShadow = '1px 1px 0 0 var(--rk-shadow-color, #18181b)'

    if (shadowStyle === 'none') {
      initialShadow = '0px 0px 0 0 transparent'
      hoverShadow = '0px 0px 0 0 transparent'
      tapShadow = '0px 0px 0 0 transparent'
    } else if (shadowStyle === 'soft') {
      initialShadow = '0 8px 20px -4px rgba(24, 24, 27, 0.15), 2px 2px 0 0 var(--rk-shadow-color, #18181b)'
      hoverShadow = '0 12px 28px -4px rgba(24, 24, 27, 0.25), 4px 4px 0 0 var(--rk-shadow-color, #18181b)'
      tapShadow = '0 4px 10px -2px rgba(24, 24, 27, 0.1), 1px 1px 0 0 var(--rk-shadow-color, #18181b)'
    } else if (shadowColor !== 'ink') {
      const colorHex = shadowColorHexMap[shadowColor] || '#18181b'
      initialShadow = `4px 4px 0 0 ${colorHex}`
      hoverShadow = `6px 6px 0 0 ${colorHex}`
      tapShadow = `1px 1px 0 0 ${colorHex}`
    }

    return (
      <motion.button
        ref={ref}
        disabled={disabled || isLoading}
        initial={{ boxShadow: initialShadow }}
        whileHover={{
          x: shadowStyle === 'none' ? 0 : -2,
          y: shadowStyle === 'none' ? 0 : -2,
          boxShadow: hoverShadow,
        }}
        whileTap={{
          x: shadowStyle === 'none' ? 0 : 2,
          y: shadowStyle === 'none' ? 0 : 2,
          boxShadow: tapShadow,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 25,
        }}
        className={cn(
          buttonVariants({ variant, shape, size, className }),
          isSquareOrFab && '!p-0 !px-0 !py-0 shrink-0 aspect-square'
        )}
        {...(props as any)}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin stroke-[3]" />
            {!isSquareOrFab && children}
          </span>
        ) : (
          children
        )}
      </motion.button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
