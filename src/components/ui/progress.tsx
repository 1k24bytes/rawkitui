import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  label?: string
  showValue?: boolean
  variant?: 'yellow' | 'orange' | 'mint' | 'violet' | 'pink' | 'sky'
}

const fills = {
  yellow: 'bg-[#FDE047]',
  orange: 'bg-[#FB923C]',
  mint: 'bg-[#4ADE80]',
  violet: 'bg-[#A78BFA]',
  pink: 'bg-[#F472B6]',
  sky: 'bg-[#38BDF8]',
}

export function Progress({ value = 0, max = 100, label, showValue = false, variant = 'yellow', className, ...props }: ProgressProps) {
  const safeMax = max > 0 ? max : 100
  const percentage = Math.min(100, Math.max(0, (value / safeMax) * 100))
  return (
    <div className={cn('w-full space-y-2 font-sans', className)} {...props}>
      {(label || showValue) && <div className="flex items-center justify-between gap-3 text-xs font-black"><span>{label}</span>{showValue && <span className="font-mono">{Math.round(percentage)}%</span>}</div>}
      <div className="h-5 w-full overflow-hidden rounded-full bg-white p-0.5 rk-border-sm" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={safeMax} aria-valuenow={value}>
        <div className={cn('h-full rounded-full transition-[width] duration-200', fills[variant])} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
