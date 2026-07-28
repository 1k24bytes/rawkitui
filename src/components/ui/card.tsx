import * as React from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'
import { cn } from '@/lib/utils'

const cardVariants = {
  white: 'bg-white text-[#18181B]',
  mint: 'bg-[#BBF7D0] text-[#18181B]',
  peach: 'bg-[#FED7AA] text-[#18181B]',
  lavender: 'bg-[#E9D5FF] text-[#18181B]',
  sky: 'bg-[#BAE6FD] text-[#18181B]',
  pink: 'bg-[#FBCFE8] text-[#18181B]',
  yellow: 'bg-[#FDE047] text-[#18181B]',
  orange: 'bg-[#FB923C] text-[#18181B]',
  dark: 'bg-[#18181B] text-white',
}

const shadowColorMap = {
  ink: 'rk-shadow-ink',
  yellow: 'rk-shadow-yellow',
  orange: 'rk-shadow-orange',
  violet: 'rk-shadow-violet',
  mint: 'rk-shadow-mint',
  pink: 'rk-shadow-pink',
  sky: 'rk-shadow-sky',
}

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof HTMLMotionProps<'div'>>,
    Omit<HTMLMotionProps<'div'>, 'children'> {
  children?: React.ReactNode
  variant?: keyof typeof cardVariants
  hasShadow?: boolean
  isInteractive?: boolean
  shadowColor?: keyof typeof shadowColorMap
  shadowStyle?: 'hard' | 'soft' | 'none'
  badge?: React.ReactNode
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'white',
      hasShadow = true,
      isInteractive = false,
      shadowColor = 'ink',
      shadowStyle = 'hard',
      badge,
      children,
      ...props
    },
    ref
  ) => {
    const shadowClass =
      !hasShadow || shadowStyle === 'none'
        ? 'rk-shadow-none'
        : shadowStyle === 'soft'
        ? 'rk-shadow-soft'
        : shadowColorMap[shadowColor] || 'rk-shadow'

    return (
      <motion.div
        ref={ref}
        whileHover={
          isInteractive && shadowStyle !== 'none'
            ? {
                y: -4,
              }
            : undefined
        }
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={cn(
          'rounded-[28px] rk-border p-6 sm:p-7 font-sans relative overflow-hidden transition-colors',
          cardVariants[variant],
          shadowClass,
          isInteractive && 'cursor-pointer',
          className
        )}
        {...props}
      >
        {badge && (
          <div className="absolute top-5 right-5 z-10">
            {typeof badge === 'string' ? (
              <span className="inline-flex items-center rounded-full border-2 border-[#18181B] bg-[#FDE047] px-3 py-1 font-mono text-xs font-black text-[#18181B] rk-shadow-xs">
                {badge}
              </span>
            ) : (
              badge
            )}
          </div>
        )}
        {children}
      </motion.div>
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
    className={cn('flex flex-col space-y-1.5 mb-4 pr-14 sm:pr-16', className)}
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
    className={cn('font-display text-xl sm:text-2xl font-black tracking-tight text-inherit', className)}
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
    className={cn('text-xs sm:text-sm font-bold opacity-80', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('pt-0 space-y-3', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-between pt-4 mt-5 border-t-2 border-current/15', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
