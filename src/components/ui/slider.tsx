import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'type' | 'size'> {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  label?: React.ReactNode
  description?: React.ReactNode
  showValue?: boolean
  showPin?: boolean
  showTicks?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'yellow' | 'orange' | 'mint' | 'violet' | 'pink' | 'sky' | 'lime' | 'gradient' | 'sunset' | 'neon'
  thumbShape?: 'circle' | 'square'
}

const variantFills = {
  yellow: 'bg-[#FDE047] text-[#18181B]',
  orange: 'bg-[#FB923C] text-[#18181B]',
  mint: 'bg-[#4ADE80] text-[#18181B]',
  violet: 'bg-[#A78BFA] text-[#18181B]',
  pink: 'bg-[#F472B6] text-[#18181B]',
  sky: 'bg-[#38BDF8] text-[#18181B]',
  lime: 'bg-[#A3E635] text-[#18181B]',
  gradient: 'bg-gradient-to-r from-[#FB923C] via-[#F87171] to-[#DC2626] text-white',
  sunset: 'bg-gradient-to-r from-[#FDE047] via-[#FB923C] to-[#F87171] text-[#18181B]',
  neon: 'bg-gradient-to-r from-[#A3E635] via-[#34D399] to-[#38BDF8] text-[#18181B]',
}

const trackSizeClasses = {
  sm: 'h-5',
  md: 'h-7',
  lg: 'h-9',
}

const thumbSizeClasses = {
  sm: 'h-6 w-6 text-[10px]',
  md: 'h-8 w-8 text-xs',
  lg: 'h-10 w-10 text-sm',
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      value: controlledValue,
      defaultValue = 50,
      onValueChange,
      label,
      description,
      showValue = false,
      showPin = false,
      showTicks = false,
      size = 'md',
      variant = 'orange',
      thumbShape = 'circle',
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const [isFocused, setIsFocused] = React.useState(false)

    const currentValue = controlledValue ?? internalValue
    const numMin = Number(min)
    const numMax = Number(max)
    const numStep = Number(step)
    const safeMax = numMax > numMin ? numMax : 100
    const percentage = Math.min(100, Math.max(0, ((currentValue - numMin) / (safeMax - numMin)) * 100))

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value)
      if (controlledValue === undefined) {
        setInternalValue(val)
      }
      onValueChange?.(val)
    }

    const ticksCount = showTicks ? Math.min(11, Math.floor((safeMax - numMin) / numStep) + 1) : 0
    const ticks = showTicks ? Array.from({ length: ticksCount }) : []

    return (
      <div className={cn('w-full space-y-2.5 font-sans', disabled && 'opacity-60 cursor-not-allowed', className)}>
        {/* Header with Label, Description & Value Tag */}
        {(label || description || showValue) && (
          <div className="flex items-center justify-between gap-3">
            <div>
              {label && (
                <span className="font-display text-sm font-extrabold text-[#18181B] tracking-tight">
                  {label}
                </span>
              )}
              {description && (
                <p className="text-xs font-semibold text-[#52525B] leading-none mt-0.5">
                  {description}
                </p>
              )}
            </div>
            {showValue && (
              <span className="inline-flex items-center justify-center rounded-full border-2 border-[#18181B] bg-[#FDE047] px-2.5 py-0.5 font-mono text-xs font-black text-[#18181B] rk-shadow-xs">
                {currentValue}
              </span>
            )}
          </div>
        )}

        {/* Interactive Track Area */}
        <div className="relative w-full py-4 select-none">
          {/* Invisible Native Input on Top */}
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            disabled={disabled}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-pointer disabled:cursor-not-allowed"
            {...props}
          />

          {/* Custom Visual Track Container */}
          <div className="relative w-full flex items-center">
            {/* Background Track */}
            <div
              className={cn(
                'relative w-full overflow-hidden bg-white p-1 rk-border rk-shadow-sm rounded-full',
                trackSizeClasses[size]
              )}
            >
              {/* Active Filled Progress Track (Instant update with zero drag lag) */}
              <div
                className={cn('h-full rounded-full', variantFills[variant])}
                style={{ width: `${percentage}%` }}
              />

              {/* Optional Step Ticks */}
              {showTicks && ticks.length > 0 && (
                <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none z-10">
                  {ticks.map((_, i) => (
                    <div key={i} className="h-1.5 w-1.5 rounded-full bg-[#18181B]/40" />
                  ))}
                </div>
              )}
            </div>

            {/* Custom Thumb Handle (Vertically centered over track) */}
            <div
              className={cn(
                'absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center font-mono font-black border-3 border-[#18181B] rk-shadow-sm pointer-events-none z-20',
                isFocused && 'ring-4 ring-[#18181B]/25',
                thumbShape === 'circle' ? 'rounded-full' : 'rounded-xl',
                thumbSizeClasses[size],
                variantFills[variant]
              )}
              style={{ left: `${percentage}%` }}
            >
              {/* Floating Tooltip Pin */}
              {showPin && (
                <div className="absolute -top-9 left-1/2 -translate-x-1/2 rounded-md border-2 border-[#18181B] bg-[#18181B] px-2 py-0.5 font-mono text-[11px] font-black text-[#FDE047] rk-shadow-xs whitespace-nowrap">
                  {currentValue}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 border-b-2 border-r-2 border-[#18181B] bg-[#18181B]" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
)
Slider.displayName = 'Slider'

