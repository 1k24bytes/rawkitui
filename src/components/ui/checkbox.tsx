import * as React from 'react'
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
          <div
            className={cn(
              'w-6 h-6 rounded-lg rk-border-sm transition-all duration-120 flex items-center justify-center rk-shadow-sm group-hover:-translate-x-0.5 group-hover:-translate-y-0.5',
              isChecked
                ? 'bg-[#FDE047] text-[#18181B]'
                : 'bg-white text-transparent group-hover:bg-[#F4F4F0]'
            )}
          >
            <Check className={cn('w-4 h-4 stroke-[3]', isChecked ? 'opacity-100' : 'opacity-0')} />
          </div>
        </div>
        {label && <span className="font-semibold text-sm text-[#18181B]">{label}</span>}
      </label>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
