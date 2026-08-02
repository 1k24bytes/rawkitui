'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
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
  'inline-flex items-center justify-center whitespace-nowrap font-sans font-extrabold text-sm tracking-wide rk-border focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all select-none cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-rk-primary text-rk-ink hover:bg-rk-primary-hover',
        yellow: 'bg-rk-primary text-rk-ink hover:bg-rk-primary-hover',
        secondary: 'bg-rk-secondary text-rk-ink hover:bg-rk-secondary-hover',
        accent: 'bg-rk-accent text-rk-ink hover:bg-rk-accent-hover',
        mint: 'bg-rk-mint text-rk-ink hover:bg-rk-mint-hover',
        peach: 'bg-rk-peach text-rk-ink hover:bg-rk-peach-hover',
        sky: 'bg-rk-sky text-rk-ink hover:bg-rk-sky-hover',
        pink: 'bg-rk-pink text-rk-ink hover:bg-rk-pink-hover',
        black: 'bg-rk-ink text-rk-canvas hover:bg-rk-ink-hover',
        outline: 'bg-rk-surface text-rk-ink hover:bg-rk-canvas',
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
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  asChild?: boolean
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
      asChild = false,
      shadowColor = 'ink',
      shadowStyle = 'hard',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    const isSquareOrFab = shape === 'fab' || size === 'icon'

    const style = {
      '--rk-btn-shadow-color': shadowColorHexMap[shadowColor] ?? '#18181b',
    } as React.CSSProperties

    return (
      <Comp
        ref={ref}
        disabled={disabled || isLoading}
        data-shadow-style={shadowStyle}
        style={style}
        className={cn(
          'rk-btn',
          buttonVariants({ variant, shape, size, className }),
          isSquareOrFab && '!p-0 !px-0 !py-0 shrink-0 aspect-square'
        )}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin stroke-[3]" />
            {!isSquareOrFab && children}
          </span>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
