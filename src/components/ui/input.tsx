'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  clearable?: boolean
  onClear?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightIcon, clearable, onClear, value, onChange, ...props }, ref) => {
    const showClear = clearable && Boolean(value) && !props.disabled && !props.readOnly

    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      onClear?.()
      // Synthesize a change so controlled consumers update their state.
      onChange?.({
        ...e,
        target: { ...(e.currentTarget as HTMLButtonElement), value: '' },
      } as unknown as React.ChangeEvent<HTMLInputElement>)
    }

    return (
      <div className={cn('relative w-full', className)}>
        {leftIcon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-rk-ink/50">
            {leftIcon}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          className={cn(
            'flex h-12 w-full rounded-2xl bg-rk-surface px-4 py-2 text-sm font-extrabold text-rk-ink rk-border rk-shadow-sm placeholder:text-rk-ink/40 focus:outline-none focus:ring-4 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-120',
            leftIcon && 'pl-11',
            (rightIcon || showClear) && 'pr-11',
            className
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-rk-ink/50">
            {rightIcon}
          </span>
        )}
        {showClear && (
          <button
            type="button"
            aria-label="Clear input"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full rk-border-sm rk-shadow-xs bg-rk-canvas hover:bg-rk-primary focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
          >
            <X className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />
          </button>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
