import * as React from 'react'
import { cn } from '@/lib/utils'

export interface RadioOption {
  value: string
  label: string
  description?: string
  badge?: string
}

export interface RadioGroupProps {
  options: RadioOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (val: string) => void
  name?: string
  className?: string
}

export function RadioGroup({
  options,
  value: controlledValue,
  defaultValue,
  onValueChange,
  name = 'radio-group',
  className,
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || options[0]?.value)
  const selectedValue = controlledValue !== undefined ? controlledValue : internalValue

  const handleSelect = (val: string) => {
    setInternalValue(val)
    onValueChange?.(val)
  }

  return (
    <div className={cn('space-y-3', className)}>
      {options.map((opt) => {
        const isSelected = selectedValue === opt.value
        return (
          <div
            key={opt.value}
            onClick={() => handleSelect(opt.value)}
            className={cn(
              'p-4 rounded-2xl rk-border rk-shadow-sm cursor-pointer select-none transition-all duration-150 flex items-center justify-between',
              isSelected
                ? 'bg-[#FED7AA] shadow-[5px_5px_0_0_#18181b] -translate-x-0.5 -translate-y-0.5'
                : 'bg-white hover:bg-[#F4F4F0]'
            )}
          >
            <div className="flex items-center gap-3.5">
              <div
                className={cn(
                  'w-5 h-5 rounded-full rk-border-sm flex items-center justify-center transition-all',
                  isSelected ? 'bg-[#18181B]' : 'bg-white'
                )}
              >
                {isSelected && <div className="w-2 h-2 rounded-full bg-[#FDE047]" />}
              </div>
              <div>
                <div className="font-bold text-sm text-[#18181B]">{opt.label}</div>
                {opt.description && (
                  <div className="text-xs font-semibold text-black/60">{opt.description}</div>
                )}
              </div>
            </div>
            {opt.badge && (
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FDE047] rk-border-sm">
                {opt.badge}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
