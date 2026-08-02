import * as React from 'react'
import { motion } from 'motion/react'
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
      <motion.div
        whileTap={{ scale: 0.95 }}
        className={cn(
          'w-14 h-8 rounded-full rk-border-sm rk-shadow-sm p-1 transition-colors duration-200 relative flex items-center shrink-0',
          isChecked ? 'bg-rk-primary' : 'bg-rk-canvas'
        )}
      >
        <motion.div
          layout
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
          className={cn(
            'w-5 h-5 rounded-full bg-rk-ink rk-shadow-sm shrink-0 aspect-square p-0',
            isChecked ? 'ml-auto' : 'ml-0'
          )}
        />
      </motion.div>
      {label && <span className="font-extrabold text-sm text-rk-ink">{label}</span>}
    </label>
  )
}
