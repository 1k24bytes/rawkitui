import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-sans font-bold text-sm tracking-wide rk-border focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all duration-120 rk-shadow active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0_0_#18181b] hover:-translate-x-[1.5px] hover:-translate-y-[1.5px] hover:shadow-[6px_6px_0_0_#18181b]',
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
        fab: 'rounded-full w-12 h-12 p-0 flex items-center justify-center text-lg',
        square: 'rounded-xl',
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-6 text-sm',
        lg: 'h-13 px-8 text-base font-extrabold',
        icon: 'h-11 w-11 p-0 flex items-center justify-center',
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
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, shape, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, shape, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
