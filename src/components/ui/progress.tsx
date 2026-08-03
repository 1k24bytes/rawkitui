import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  label?: React.ReactNode
  description?: React.ReactNode
  showValue?: boolean
  showPin?: boolean
  striped?: boolean
  animated?: boolean
  indeterminate?: boolean
  segments?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'yellow' | 'orange' | 'mint' | 'violet' | 'pink' | 'sky' | 'lime' | 'gradient' | 'sunset' | 'neon'
  shape?: 'pill' | 'rounded'
}

const fills = {
  yellow: 'bg-rk-primary text-rk-ink',
  orange: 'bg-rk-secondary text-rk-ink',
  mint: 'bg-rk-success text-rk-ink',
  violet: 'bg-rk-accent text-rk-ink',
  pink: 'bg-rk-pink text-rk-ink',
  sky: 'bg-rk-sky text-rk-ink',
  lime: 'bg-[#A3E635] text-rk-ink',
  gradient: 'bg-gradient-to-r from-[#FB923C] via-[#F87171] to-[#DC2626] text-white',
  sunset: 'bg-gradient-to-r from-rk-primary via-rk-secondary to-[#F87171] text-rk-ink',
  neon: 'bg-gradient-to-r from-[#A3E635] via-[#34D399] to-[#38BDF8] text-rk-ink',
}

const sizeTrackClasses = {
  sm: 'h-5',
  md: 'h-7',
  lg: 'h-9',
  xl: 'h-11',
}

export function Progress({
  value = 0,
  max = 100,
  label,
  description,
  showValue = false,
  showPin = false,
  striped = false,
  animated = false,
  indeterminate = false,
  segments,
  size = 'md',
  variant = 'yellow',
  shape = 'pill',
  className,
  ...props
}: ProgressProps) {
  const safeMax = max > 0 ? max : 100
  const percentage = indeterminate ? 100 : Math.min(100, Math.max(0, (value / safeMax) * 100))
  const isStriped = striped || indeterminate
  const isAnimated = animated || indeterminate

  return (
    <div className={cn('w-full space-y-2.5 font-sans', className)} {...props}>
      {/* Header with Label, Subtitle & Percentage Badge */}
      {(label || description || showValue) && (
        <div className="flex items-center justify-between gap-3">
          <div>
            {label && (
              <span className="font-display text-sm font-extrabold text-rk-ink tracking-tight">
                {label}
              </span>
            )}
            {description && (
              <p className="text-xs font-semibold text-rk-ink/60 leading-none mt-0.5">
                {description}
              </p>
            )}
          </div>
          {showValue && !indeterminate && (
            <span className="inline-flex items-center justify-center rounded-full border-2 border-rk-ink bg-rk-primary px-2.5 py-0.5 font-mono text-xs font-black text-rk-ink rk-shadow-xs">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      {/* Progress Track Container */}
      <div className="relative pt-6">
        {/* Floating Percentage Pin Tag */}
        {showPin && !indeterminate && (
          <div
            className="absolute top-0 -translate-y-1.5 transition-all duration-500 ease-out pointer-events-none z-10"
            style={{ left: `calc(${percentage}% - 18px)` }}
          >
            <div className="relative rounded-md border-2 border-rk-ink bg-rk-ink px-2 py-0.5 font-mono text-[11px] font-black text-rk-primary rk-shadow-xs">
              {Math.round(percentage)}%
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 border-b-2 border-r-2 border-rk-ink bg-rk-ink" />
            </div>
          </div>
        )}

        <div
          aria-label={typeof label === 'string' ? label : 'Progress'}
          aria-valuemax={safeMax}
          aria-valuemin={0}
          aria-valuenow={indeterminate ? undefined : value}
          aria-valuetext={indeterminate ? 'indeterminate' : `${Math.round(percentage)}%`}
          role="progressbar"
          className={cn(
            'relative w-full overflow-hidden bg-white p-1 rk-border rk-shadow-sm',
            shape === 'pill' ? 'rounded-full' : 'rounded-xl',
            sizeTrackClasses[size]
          )}
        >
          {/* Track Fill */}
          {indeterminate ? (
            <div
              className={cn(
                'absolute top-1 bottom-1 transition-all duration-300',
                shape === 'pill' ? 'rounded-full' : 'rounded-lg',
                fills[variant],
                'bg-[linear-gradient(45deg,rgba(0,0,0,0.18)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.18)_50%,rgba(0,0,0,0.18)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]',
                'animate-[progress-indeterminate_1.8s_ease-in-out_infinite]'
              )}
            />
          ) : (
            <div
              className={cn(
                'relative h-full transition-all duration-500 ease-out',
                shape === 'pill' ? 'rounded-full' : 'rounded-lg',
                fills[variant],
                striped &&
                  'bg-[linear-gradient(45deg,rgba(0,0,0,0.18)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.18)_50%,rgba(0,0,0,0.18)_75%,transparent_75%,transparent)] bg-[length:1.25rem_1.25rem]',
                striped && animated && 'animate-[progress-stripes_0.8s_linear_infinite]'
              )}
              style={{ width: `${percentage}%` }}
            >
              {/* Inner Text for Large Size */}
              {size === 'xl' && !showPin && showValue && (
                <span className="absolute inset-0 flex items-center justify-end pr-3 font-mono text-xs font-black text-rk-ink">
                  {Math.round(percentage)}%
                </span>
              )}
            </div>
          )}

          {/* Optional Segment Dividers */}
          {segments && segments > 1 && (
            <div className="absolute inset-0 flex w-full pointer-events-none px-1">
              {Array.from({ length: segments - 1 }).map((_, i) => (
                <div
                  key={i}
                  className="h-full border-r-2 border-rk-ink/40"
                  style={{ width: `${100 / segments}%` }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

