import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: string
  className?: string
  disabled?: boolean
}

export function Switch({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  label,
  className,
  disabled = false,
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked)
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked

  const handleToggle = () => {
    if (disabled) return
    const next = !isChecked
    setInternalChecked(next)
    onCheckedChange?.(next)
  }

  return (
    <label
      onClick={handleToggle}
      className={cn(
        'inline-flex items-center gap-3 cursor-pointer select-none group',
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
    >
      <div
        className={cn(
          'w-14 h-8 rounded-full rk-border-sm rk-shadow-sm p-1 transition-all duration-200 relative flex items-center',
          isChecked ? 'bg-[#FDE047]' : 'bg-[#E5E7EB]'
        )}
      >
        <div
          className={cn(
            'w-5 h-5 rounded-full bg-[#18181B] rk-shadow-sm transition-transform duration-200',
            isChecked ? 'translate-x-6' : 'translate-x-0'
          )}
        />
      </div>
      {label && <span className="font-semibold text-sm text-[#18181B]">{label}</span>}
    </label>
  )
}
