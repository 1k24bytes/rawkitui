import * as React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void
  label?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, label, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(!!checked)

    React.useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked)
      }
    }, [checked])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsChecked(e.target.checked)
      onCheckedChange?.(e.target.checked)
    }

    return (
      <label className="inline-flex items-center gap-3 cursor-pointer select-none group">
        <div className="relative">
          <input
            type="checkbox"
            ref={ref}
            checked={isChecked}
            onChange={handleChange}
            className="sr-only"
            {...props}
          />
          <motion.div
            whileHover={{ scale: 1.05, x: -1, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'w-6 h-6 rounded-lg rk-border-sm transition-colors duration-150 flex items-center justify-center rk-shadow-sm',
              isChecked
                ? 'bg-[#FDE047] text-[#18181B]'
                : 'bg-white text-transparent group-hover:bg-[#F4F4F0]',
              className
            )}
          >
            <AnimatePresence>
              {isChecked && (
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 45 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                >
                  <Check className="w-4 h-4 stroke-[3.5] text-[#18181B]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        {label && <span className="font-extrabold text-sm text-[#18181B]">{label}</span>}
      </label>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
