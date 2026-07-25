import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'type'> {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  label?: string
  showValue?: boolean
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(({ value: controlledValue, defaultValue = 0, onValueChange, label, showValue = false, min = 0, max = 100, step = 1, className, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const currentValue = controlledValue ?? internalValue
  return (
    <label className="block w-full space-y-2 font-sans">
      {(label || showValue) && <span className="flex items-center justify-between gap-3 text-xs font-black"><span>{label}</span>{showValue && <span className="font-mono">{currentValue}</span>}</span>}
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={(event) => { const nextValue = Number(event.target.value); setInternalValue(nextValue); onValueChange?.(nextValue) }}
        className={cn('h-6 w-full cursor-pointer accent-[#FB923C] focus:outline-none focus:ring-4 focus:ring-black focus:ring-offset-2', className)}
        {...props}
      />
    </label>
  )
})
Slider.displayName = 'Slider'
