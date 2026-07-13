import * as React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SelectOption {
  value: string
  label: string
  icon?: React.ReactNode
}

export interface SelectProps {
  options?: SelectOption[]
  value?: string
  defaultValue?: string
  onChange?: (e: { target: { value: string } }) => void
  onValueChange?: (val: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function Select({
  options = [],
  value: controlledValue,
  defaultValue,
  onChange,
  onValueChange,
  placeholder = 'Select an option...',
  className,
  disabled = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState(
    defaultValue || (options.length > 0 ? options[0].value : '')
  )
  const containerRef = React.useRef<HTMLDivElement>(null)

  const selectedValue = controlledValue !== undefined ? controlledValue : internalValue
  const selectedOption = options.find((opt) => opt.value === selectedValue)

  const handleSelect = (val: string) => {
    if (disabled) return
    setInternalValue(val)
    onValueChange?.(val)
    onChange?.({ target: { value: val } })
    setIsOpen(false)
  }

  // Click outside listener
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className={cn('relative w-full font-sans select-none', className)}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex h-12 w-full items-center justify-between rounded-2xl bg-white px-4 py-2 text-sm font-extrabold text-[#18181B] rk-border rk-shadow-sm focus:outline-none focus:ring-4 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-120 cursor-pointer',
          isOpen && 'shadow-[5px_5px_0_0_#18181b] -translate-x-0.5 -translate-y-0.5'
        )}
      >
        <span className="truncate flex items-center gap-2">
          {selectedOption ? (
            <>
              {selectedOption.icon}
              <span>{selectedOption.label}</span>
            </>
          ) : (
            <span className="text-[#18181B]/40 font-semibold">{placeholder}</span>
          )}
        </span>
        <ChevronDown
          className={cn(
            'w-5 h-5 stroke-[3] text-[#18181B] transition-transform duration-200 shrink-0 ml-2',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Pop-Brutalist Floating Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-60 overflow-y-auto rounded-2xl bg-white rk-border rk-shadow-xl p-2 space-y-1"
          >
            {options.map((opt) => {
              const isSelected = opt.value === selectedValue
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={cn(
                    'w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-mono text-xs font-extrabold transition-all cursor-pointer text-left',
                    isSelected
                      ? 'bg-[#FDE047] text-[#18181B] rk-border-sm rk-shadow-sm font-black'
                      : 'text-[#18181B] hover:bg-[#F4F4F0] hover:translate-x-0.5'
                  )}
                >
                  <span className="flex items-center gap-2 truncate">
                    {opt.icon}
                    <span>{opt.label}</span>
                  </span>
                  {isSelected && <Check className="w-4 h-4 stroke-[3.5] text-[#18181B] shrink-0 ml-2" />}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
