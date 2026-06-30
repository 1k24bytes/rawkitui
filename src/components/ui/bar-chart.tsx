import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BarData {
  label: string
  value: number
  color?: string
}

export interface BarChartProps {
  data: BarData[]
  height?: number
  className?: string
}

export function BarChart({ data, height = 160, className }: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 100)

  return (
    <div className={cn('w-full space-y-3', className)}>
      <div
        className="flex items-end justify-between gap-3 p-4 rounded-2xl bg-white rk-border rk-shadow-sm"
        style={{ height: `${height}px` }}
      >
        {data.map((item, i) => {
          const heightPercent = Math.round((item.value / maxValue) * 100)
          const barColor = item.color || '#18181B'

          return (
            <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
              <div className="text-[10px] font-mono font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.value}
              </div>
              <div className="w-full bg-[#F4F4F0] rounded-full h-full p-1 flex items-end rk-border-sm">
                <div
                  className="w-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    height: `${heightPercent}%`,
                    backgroundColor: barColor,
                  }}
                />
              </div>
              <span className="text-[11px] font-mono font-bold mt-2 text-[#18181B]">
                {item.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
