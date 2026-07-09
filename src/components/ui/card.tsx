import * as React from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'
import { cn } from '@/lib/utils'

const cardVariants = {
  white: 'bg-white',
  mint: 'bg-[#BBF7D0]',
  peach: 'bg-[#FED7AA]',
  lavender: 'bg-[#E9D5FF]',
  sky: 'bg-[#BAE6FD]',
  pink: 'bg-[#FBCFE8]',
  yellow: 'bg-[#FDE047]',
}

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof HTMLMotionProps<'div'>>,
    HTMLMotionProps<'div'> {
  variant?: keyof typeof cardVariants
  hasShadow?: boolean
  isInteractive?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'white', hasShadow = true, isInteractive = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={
          isInteractive
            ? {
                y: -4,
                boxShadow: '10px 10px 0 0 #18181b',
              }
            : undefined
        }
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={cn(
          'rounded-[28px] rk-border p-6 font-sans relative overflow-hidden transition-colors',
          cardVariants[variant],
          hasShadow && 'rk-shadow',
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 mb-4', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('font-display text-xl font-black tracking-tight text-[#18181B]', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-xs font-bold text-[#18181B]/70', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-4 mt-4 border-t-2 border-black/10', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
