import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: { value: string; label: string }[]
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options = [], children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          className={cn(
            'flex h-12 w-full appearance-none rounded-2xl bg-white px-4 py-2 pr-10 text-sm font-extrabold text-[#18181B] rk-border rk-shadow-sm focus:outline-none focus:ring-4 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-120 cursor-pointer select-none',
            className
          )}
          ref={ref}
          {...props}
        >
          {options.length > 0
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#18181B]">
          <ChevronDown className="w-5 h-5 stroke-[3]" />
        </div>
      </div>
    )
  }
)
Select.displayName = 'Select'

export { Select }
