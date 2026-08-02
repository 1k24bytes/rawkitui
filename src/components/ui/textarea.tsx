'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className={cn('relative w-full', className)}>
        {leftIcon && (
          <span className="pointer-events-none absolute left-4 top-4 text-rk-ink/50">
            {leftIcon}
          </span>
        )}
        <textarea
          className={cn(
            'flex min-h-[100px] w-full rounded-2xl bg-rk-surface px-4 py-3 text-sm font-extrabold text-rk-ink rk-border rk-shadow-sm placeholder:text-rk-ink/40 focus:outline-none focus:ring-4 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-120 resize-y',
            leftIcon && 'pl-11',
            rightIcon && 'pr-11',
            className
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <span className="pointer-events-none absolute right-4 top-4 text-rk-ink/50">
            {rightIcon}
          </span>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
