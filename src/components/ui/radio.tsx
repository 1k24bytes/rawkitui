import * as React from 'react'
import { motion } from 'motion/react'
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
    <div className={cn('space-y-3 font-sans', className)}>
      {options.map((opt) => {
        const isSelected = selectedValue === opt.value
        return (
          <motion.div
            key={opt.value}
            whileHover={{ y: -2, boxShadow: '5px 5px 0 0 #18181b' }}
            whileTap={{ y: 1, boxShadow: '2px 2px 0 0 #18181b' }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            onClick={() => handleSelect(opt.value)}
            className={cn(
              'p-4 rounded-2xl rk-border rk-shadow-sm cursor-pointer select-none transition-colors duration-150 flex items-center justify-between',
              isSelected ? 'bg-[#FED7AA]' : 'bg-white hover:bg-[#F4F4F0]'
            )}
          >
            <div className="flex items-center gap-3.5">
              <div
                className={cn(
                  'w-5 h-5 rounded-full rk-border-sm flex items-center justify-center transition-colors',
                  isSelected ? 'bg-[#18181B]' : 'bg-white'
                )}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="w-2 h-2 rounded-full bg-[#FDE047]"
                  />
                )}
              </div>
              <div>
                <div className="font-extrabold text-sm text-[#18181B]">{opt.label}</div>
                {opt.description && (
                  <div className="text-xs font-bold text-black/60">{opt.description}</div>
                )}
              </div>
            </div>
            {opt.badge && (
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FDE047] rk-border-sm">
                {opt.badge}
              </span>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
