import * as React from 'react'
import { motion, type HTMLMotionProps } from 'motion/react'
import { cn } from '@/lib/utils'

const cardVariants = {
  white: 'bg-rk-surface text-rk-ink',
  mint: 'bg-rk-mint text-rk-ink',
  peach: 'bg-rk-peach text-rk-ink',
  lavender: 'bg-rk-lavender text-rk-ink',
  sky: 'bg-rk-sky text-rk-ink',
  pink: 'bg-rk-pink text-rk-ink',
  yellow: 'bg-rk-primary text-rk-ink',
  orange: 'bg-rk-secondary text-rk-ink',
  dark: 'bg-rk-ink text-rk-canvas',
}

const shadowColorMap = {
  ink: 'rk-shadow',
  yellow: 'rk-shadow',
  orange: 'rk-shadow',
  violet: 'rk-shadow',
  mint: 'rk-shadow',
  pink: 'rk-shadow',
  sky: 'rk-shadow',
}

const shadowColorHexMap: Record<keyof typeof shadowColorMap, string> = {
  ink: '#18181b',
  yellow: '#FACC15',
  orange: '#FB923C',
  violet: '#A78BFA',
  mint: '#4ADE80',
  pink: '#F472B6',
  sky: '#38BDF8',
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
        : 'rk-shadow'

    const shadowVar =
      shadowStyle === 'hard' && shadowColor !== 'ink'
        ? ({ '--rk-shadow-color': shadowColorHexMap[shadowColor] } as React.CSSProperties)
        : undefined

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
        style={shadowVar}
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
              <span className="inline-flex items-center rounded-full border-2 border-rk-ink bg-rk-primary px-3 py-1 font-mono text-xs font-black text-rk-ink rk-shadow-xs">
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
