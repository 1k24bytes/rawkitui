import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circle' | 'rect'
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(({ className, variant = 'rect', ...props }, ref) => (
  <div ref={ref} aria-hidden="true" className={cn('animate-pulse bg-[#E5E7EB] rk-border-sm', variant === 'text' && 'h-4 rounded-full', variant === 'circle' && 'aspect-square rounded-full', variant === 'rect' && 'rounded-2xl', className)} {...props} />
))
Skeleton.displayName = 'Skeleton'
