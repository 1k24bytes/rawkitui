import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'motion/react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, shape, size, isLoading = false, children, disabled, ...props }, ref) => {
    // If shape is 'fab', force p-0 and aspect-square so default size px-6 can never distort it into an oval
    const isSquareOrFab = shape === 'fab' || size === 'icon'

    return (
      <motion.button
        ref={ref}
        disabled={disabled || isLoading}
        whileHover={{
          x: -2,
          y: -2,
          boxShadow: '6px 6px 0 0 #18181b',
        }}
        whileTap={{
          x: 2,
          y: 2,
          boxShadow: '1px 1px 0 0 #18181b',
        }}
        initial={{
          boxShadow: '4px 4px 0 0 #18181b',
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
