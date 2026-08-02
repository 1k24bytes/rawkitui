import * as React from 'react'
import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface NumberInputProps {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
  label?: React.ReactNode
  className?: string
  disabled?: boolean
  ariaLabel?: string
}

export function NumberInput({
  value,
  defaultValue = 1,
  min = -Infinity,
  max = Infinity,
  step = 1,
  onChange,
  label,
  className,
  disabled = false,
  ariaLabel = 'Quantity',
}: NumberInputProps) {
  const isControlled = value !== undefined
  const [internal, setInternal] = React.useState(defaultValue)
  const current = isControlled ? (value as number) : internal

  const clamp = (next: number) => {
    if (Number.isNaN(next)) return current
    return Math.min(max, Math.max(min, next))
  }

  const commit = (next: number) => {
    const clamped = clamp(next)
    if (!isControlled) setInternal(clamped)
    onChange?.(clamped)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = Number(event.target.value)
    if (event.target.value === '') {
      if (!isControlled) setInternal(0)
      onChange?.(0)
      return
    }
    if (Number.isNaN(parsed)) return
    const clamped = clamp(parsed)
    if (!isControlled) setInternal(clamped)
    onChange?.(clamped)
  }

  const stepButtonClass = (side: 'left' | 'right') =>
    cn(
      'flex h-9 w-9 shrink-0 items-center justify-center bg-white font-black text-[#18181B] rk-border-sm transition-all cursor-pointer select-none',
      'hover:bg-[#FDE047] active:translate-y-[2px] active:shadow-none',
      'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-2',
      side === 'left' ? 'rounded-l-full' : 'rounded-r-full',
      (disabled || (side === 'left' && current <= min) || (side === 'right' && current >= max)) &&
        'pointer-events-none opacity-40'
    )

  return (
    <div className={cn('inline-flex flex-col gap-1.5 font-sans', className)}>
      {label && (
        <label className="text-xs font-extrabold text-[#18181B]/80">{label}</label>
      )}
      <div className="inline-flex items-stretch">
        <button
          type="button"
          aria-label="Decrease value"
          onClick={() => commit(current - step)}
          disabled={disabled || current <= min}
          className={stepButtonClass('left')}
        >
          <Minus className="h-4 w-4 stroke-[3]" aria-hidden="true" />
        </button>
        <input
          type="text"
          inputMode="numeric"
          aria-label={ariaLabel}
          value={current}
          disabled={disabled}
          onChange={handleChange}
          className="h-9 w-16 border-x-0 border-y-0 bg-white text-center font-mono text-sm font-black text-[#18181B] outline-none focus-visible:bg-[#FDE047]/40 disabled:opacity-50"
        />
        <button
          type="button"
          aria-label="Increase value"
          onClick={() => commit(current + step)}
          disabled={disabled || current >= max}
          className={stepButtonClass('right')}
        >
          <Plus className="h-4 w-4 stroke-[3]" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
