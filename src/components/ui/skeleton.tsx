import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circle' | 'rect'
  loader?: 'pulse' | 'stripe' | 'shimmer'
  /** Render as a one-line loading skeleton with icon block + text lines */
  withHeader?: boolean
  className?: string
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'rect', loader = 'pulse', withHeader = false, children, ...props }, ref) => {
    if (withHeader) {
      return (
        <div
          ref={ref}
          aria-hidden="true"
          className={cn('flex w-full items-center gap-3 font-sans', className)}
          {...props}
        >
          <div className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-[#E5E7EB] rk-border-sm" />
          <div className="flex-1 space-y-2">
            <div className="h-3.5 w-2/3 rounded-full bg-[#E5E7EB] rk-border-sm" />
            <div className="h-3.5 w-full rounded-full bg-[#E5E7EB] rk-border-sm" />
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          'relative overflow-hidden rk-border-sm',
          loader === 'pulse' && 'animate-pulse bg-[#E5E7EB]',
          loader === 'stripe' && 'rk-skeleton-stripe bg-[#FDE047]',
          loader === 'shimmer' && 'rk-skeleton-shimmer bg-[#BBF7D0]',
          variant === 'text' && 'h-4 rounded-full',
          variant === 'circle' && 'aspect-square rounded-full',
          variant === 'rect' && 'rounded-2xl',
          className
        )}
        {...props}
      />
    )
  }
)
Skeleton.displayName = 'Skeleton'
