import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ToggleItem {
  value: string
  label: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

export interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ToggleItem[]
  type?: 'single' | 'multiple'
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
  variant?: 'default' | 'outline'
}

export function ToggleGroup({ items, type = 'single', value: controlledValue, defaultValue, onValueChange, variant = 'default', className, ...props }: ToggleGroupProps) {
  const [internalValue, setInternalValue] = React.useState<string | string[]>(defaultValue ?? (type === 'multiple' ? [] : ''))
  const currentValue = controlledValue ?? internalValue
  const selectedValues = Array.isArray(currentValue) ? currentValue : currentValue ? [currentValue] : []

  const toggle = (item: ToggleItem) => {
    if (item.disabled) return
    const selected = selectedValues.includes(item.value)
    const nextValue = type === 'multiple'
      ? (selected ? selectedValues.filter((value) => value !== item.value) : [...selectedValues, item.value])
      : (selected ? '' : item.value)
    setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  return (
    <div role="group" className={cn('inline-flex flex-wrap items-center gap-2 font-sans', className)} {...props}>
      {items.map((item) => {
        const selected = selectedValues.includes(item.value)
        return <button key={item.value} type="button" aria-pressed={selected} disabled={item.disabled} onClick={() => toggle(item)} className={cn('flex min-h-10 items-center gap-2 rounded-full px-4 text-xs font-black transition-colors focus:outline-none focus:ring-4 focus:ring-black focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-40', selected ? 'bg-[#FDE047] text-[#18181B] rk-border-sm rk-shadow-sm' : variant === 'outline' ? 'bg-white text-[#18181B] rk-border-sm hover:bg-[#BBF7D0]' : 'bg-[#F4F4F0] text-[#18181B] hover:bg-white')}>{item.icon}<span>{item.label}</span></button>
      })}
    </div>
  )
}
