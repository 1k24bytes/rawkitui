import * as React from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface RatingProps {
  value?: number
  defaultValue?: number
  count?: number
  onChange?: (value: number) => void
  readOnly?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
  ariaLabel?: string
}

export function Rating({
  value,
  defaultValue = 0,
  count = 5,
  onChange,
  readOnly = false,
  size = 'md',
  className,
  ariaLabel = 'Rating',
}: RatingProps) {
  const isControlled = value !== undefined
  const [internal, setInternal] = React.useState(defaultValue)
  const [hovered, setHovered] = React.useState(0)
  const current = isControlled ? (value as number) : internal

  const displayed = hovered || current

  const handleSelect = (index: number) => {
    if (readOnly) return
    const next = index + 1
    if (!isControlled) setInternal(next)
    onChange?.(next)
  }

  const sizeClass = {
    sm: 'h-5 w-5',
    md: 'h-7 w-7',
    lg: 'h-9 w-9',
  }[size]

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      aria-readonly={readOnly || undefined}
      className={cn('inline-flex items-center gap-1', className)}
    >
      {Array.from({ length: count }).map((_, index) => {
        const filled = index < displayed
        return (
          <button
            key={index}
            type="button"
            role="radio"
            aria-checked={index < current}
            aria-label={`${index + 1} star${index === 0 ? '' : 's'}${readOnly ? '' : ` out of ${count}`}`}
            disabled={readOnly}
            onClick={() => handleSelect(index)}
            onMouseEnter={() => !readOnly && setHovered(index + 1)}
            onMouseLeave={() => setHovered(0)}
            className={cn(
              'transition-transform cursor-pointer disabled:cursor-default',
              !readOnly && 'hover:scale-125 active:scale-95',
              'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-2'
            )}
          >
            <Star
              className={cn(
                sizeClass,
                'transition-colors',
                filled ? 'fill-rk-primary stroke-rk-ink stroke-2' : 'fill-rk-surface stroke-rk-ink stroke-2'
              )}
              aria-hidden="true"
            />
          </button>
        )
      })}
    </div>
  )
}
