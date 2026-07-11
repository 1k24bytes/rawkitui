import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, type HTMLMotionProps } from 'motion/react'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center font-mono font-bold text-xs tracking-wider uppercase transition-colors focus:outline-none rk-border-sm select-none',
  {
    variants: {
      variant: {
        yellow: 'bg-[#FDE047] text-[#18181B]',
        orange: 'bg-[#FB923C] text-[#18181B]',
        violet: 'bg-[#A78BFA] text-[#18181B]',
        mint: 'bg-[#BBF7D0] text-[#18181B]',
        peach: 'bg-[#FED7AA] text-[#18181B]',
        sky: 'bg-[#BAE6FD] text-[#18181B]',
        pink: 'bg-[#FBCFE8] text-[#18181B]',
        lavender: 'bg-[#E9D5FF] text-[#18181B]',
        black: 'bg-[#18181B] text-white',
        white: 'bg-white text-[#18181B]',
      },
      shape: {
        pill: 'rounded-full px-3 py-1',
        square: 'rounded-lg px-2.5 py-1',
        scalloped: '!w-12 !h-12 rounded-full !p-0 shrink-0 aspect-square flex items-center justify-center text-center rk-scalloped text-xs font-black rk-shadow-sm leading-none',
      },
    },
    defaultVariants: {
      variant: 'yellow',
      shape: 'pill',
    },
  }
)

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof HTMLMotionProps<'div'>>,
    HTMLMotionProps<'div'>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, shape, ...props }: BadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: shape === 'scalloped' ? 8 : 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
      className={cn(badgeVariants({ variant, shape }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
