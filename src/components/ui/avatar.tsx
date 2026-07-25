import * as React from 'react'
import { cn } from '@/lib/utils'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  status?: 'online' | 'busy' | 'offline'
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
  xl: 'h-20 w-20 text-2xl',
}

const statusClasses = {
  online: 'bg-[#4ADE80]',
  busy: 'bg-[#F87171]',
  offline: 'bg-[#9CA3AF]',
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt = '', fallback, size = 'md', status, className, ...props }, ref) => {
    const [hasError, setHasError] = React.useState(false)

    return (
      <div ref={ref} className={cn('relative inline-flex shrink-0', className)} {...props}>
        <div className={cn('flex items-center justify-center overflow-hidden rounded-full bg-[#E9D5FF] font-display font-black text-[#18181B] rk-border rk-shadow-sm', sizeClasses[size])}>
          {src && !hasError ? (
            <img src={src} alt={alt} onError={() => setHasError(true)} className="h-full w-full object-cover" />
          ) : (
            <span aria-hidden={Boolean(alt)}>{fallback ?? alt.slice(0, 2).toUpperCase()}</span>
          )}
        </div>
        {status && (
          <span
            aria-label={status}
            className={cn('absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#18181B]', statusClasses[status])}
          />
        )}
      </div>
    )
  }
)
Avatar.displayName = 'Avatar'
