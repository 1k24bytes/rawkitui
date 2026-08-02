import * as React from 'react'
import { cn } from '@/lib/utils'

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'md' | 'lg'
}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-1 rounded-lg bg-white font-mono font-bold text-[#18181B] rk-border-sm rk-shadow-sm select-none whitespace-nowrap',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-2',
        'active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-75',
        size === 'sm' && 'h-6 min-w-6 px-1.5 text-[10px]',
        size === 'md' && 'h-7 min-w-7 px-2 text-xs',
        size === 'lg' && 'h-9 min-w-9 px-2.5 text-sm',
        className
      )}
      {...props}
    />
  )
)
Kbd.displayName = 'Kbd'
