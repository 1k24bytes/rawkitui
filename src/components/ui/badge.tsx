import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, type HTMLMotionProps } from 'motion/react'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center font-mono font-bold text-xs tracking-wider uppercase transition-colors focus:outline-none rk-border-sm select-none',
  {
    variants: {
      variant: {
        yellow: 'bg-rk-primary text-rk-ink',
        orange: 'bg-rk-secondary text-rk-ink',
        violet: 'bg-rk-accent text-rk-ink',
        mint: 'bg-rk-mint text-rk-ink',
        peach: 'bg-rk-peach text-rk-ink',
        sky: 'bg-rk-sky text-rk-ink',
        pink: 'bg-rk-pink text-rk-ink',
        lavender: 'bg-rk-lavender text-rk-ink',
        black: 'bg-rk-ink text-rk-canvas',
        white: 'bg-rk-surface text-rk-ink',
      },
      shape: {
        pill: 'rounded-full px-3 py-1',
        square: 'rounded-lg px-2.5 py-1',
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
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
      className={cn(badgeVariants({ variant, shape }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
