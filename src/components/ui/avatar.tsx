import * as React from 'react'
import { User } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: React.ReactNode
  icon?: React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  variant?: 'purple' | 'yellow' | 'pink' | 'orange' | 'cyan' | 'lime' | 'mint' | 'zinc'
  shape?: 'circle' | 'square'
  status?: 'online' | 'busy' | 'offline' | 'away'
  badge?: string | number
  name?: React.ReactNode
  description?: React.ReactNode
}

const sizeClasses = {
  xs: 'h-7 w-7 text-[10px]',
  sm: 'h-9 w-9 text-xs',
  md: 'h-11 w-11 text-sm',
  lg: 'h-14 w-14 text-base',
  xl: 'h-18 w-18 text-xl',
  '2xl': 'h-24 w-24 text-3xl',
}

const iconSizeClasses = {
  xs: 'h-3.5 w-3.5',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-7 w-7',
  xl: 'h-9 w-9',
  '2xl': 'h-12 w-12',
}

const variantClasses = {
  purple: 'bg-[#E9D5FF] text-[#18181B]',
  yellow: 'bg-[#FDE047] text-[#18181B]',
  pink: 'bg-[#F472B6] text-[#18181B]',
  orange: 'bg-[#FB923C] text-[#18181B]',
  cyan: 'bg-[#38BDF8] text-[#18181B]',
  lime: 'bg-[#A3E635] text-[#18181B]',
  mint: 'bg-[#34D399] text-[#18181B]',
  zinc: 'bg-[#F4F4F5] text-[#18181B]',
}

const statusClasses = {
  online: 'bg-[#4ADE80]',
  busy: 'bg-[#F87171]',
  offline: 'bg-[#9CA3AF]',
  away: 'bg-[#FACC15]',
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = '',
      fallback,
      icon,
      size = 'md',
      variant = 'purple',
      shape = 'circle',
      status,
      badge,
      name,
      description,
      className,
      ...props
    },
    ref
  ) => {
    const [hasError, setHasError] = React.useState(false)

    const renderContent = () => {
      if (src && !hasError) {
        return (
          <img
            src={src}
            alt={alt}
            onError={() => setHasError(true)}
            className="h-full w-full object-cover"
          />
        )
      }

      if (icon) {
        return React.isValidElement(icon)
          ? React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
              className: cn(iconSizeClasses[size], (icon.props as { className?: string })?.className),
            })
          : icon
      }

      if (fallback) {
        return <span aria-hidden={Boolean(alt)}>{fallback}</span>
      }

      if (alt) {
        return <span aria-hidden={Boolean(alt)}>{alt.slice(0, 2).toUpperCase()}</span>
      }

      return <User className={iconSizeClasses[size]} />
    }

    const avatarBox = (
      <div className="relative inline-flex shrink-0">
        <div
          className={cn(
            'flex items-center justify-center overflow-hidden font-display font-black rk-border rk-shadow-sm transition-transform hover:-translate-y-0.5',
            shape === 'circle' ? 'rounded-full' : 'rounded-2xl',
            sizeClasses[size],
            variantClasses[variant]
          )}
        >
          {renderContent()}
        </div>

        {status && (
          <span
            aria-label={status}
            className={cn(
              'absolute bottom-0 right-0 rounded-full border-2 border-[#18181B] rk-shadow-xs',
              size === 'xs' || size === 'sm' ? 'h-2.5 w-2.5' : 'h-3.5 w-3.5',
              statusClasses[status]
            )}
          />
        )}

        {badge !== undefined && (
          <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full border-2 border-[#18181B] bg-[#F472B6] px-1 font-mono text-[10px] font-black text-[#18181B] rk-shadow-xs">
            {badge}
          </span>
        )}
      </div>
    )

    if (name || description) {
      return (
        <div ref={ref} className={cn('inline-flex items-center gap-3', className)} {...props}>
          {avatarBox}
          <div className="flex flex-col text-left">
            {name && <span className="font-display text-sm font-extrabold text-[#18181B] leading-snug">{name}</span>}
            {description && <span className="font-sans text-xs font-semibold text-[#52525B]">{description}</span>}
          </div>
        </div>
      )
    }

    return (
      <div ref={ref} className={cn('inline-flex shrink-0', className)} {...props}>
        {avatarBox}
      </div>
    )
  }
)
Avatar.displayName = 'Avatar'

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  max?: number
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({ children, max, className, ...props }) => {
  const childrenArray = React.Children.toArray(children)
  const displayChildren = max ? childrenArray.slice(0, max) : childrenArray
  const overflowCount = max ? childrenArray.length - max : 0

  return (
    <div className={cn('flex items-center -space-x-3.5', className)} {...props}>
      {displayChildren.map((child, index) => (
        <div key={index} className="relative z-10 transition-transform hover:z-20 hover:-translate-y-1">
          {child}
        </div>
      ))}
      {overflowCount > 0 && (
        <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#FDE047] font-mono text-xs font-black text-[#18181B] rk-border rk-shadow-sm">
          +{overflowCount}
        </div>
      )}
    </div>
  )
}

