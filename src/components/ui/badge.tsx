import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center font-mono font-bold text-xs tracking-wider uppercase transition-colors focus:outline-none rk-border-sm',
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
        scalloped: 'w-12 h-12 rounded-full p-0 flex items-center justify-center text-center rk-scalloped text-xs font-black rk-shadow-sm',
      },
    },
    defaultVariants: {
      variant: 'yellow',
      shape: 'pill',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, shape, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, shape }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
