import * as React from 'react'
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Cell,
  CartesianGrid,
} from 'recharts'
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
  showGrid?: boolean
  showValues?: boolean
}

// Pop-Brutalist ink color for chart strokes/ticks (matches --color-rk-ink)
const INK = 'var(--color-rk-ink, #18181b)'

// Custom Pop-Brutalist Tooltip for Recharts
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const data = payload[0]
    return (
      <div className="bg-rk-surface rk-border-sm rounded-xl p-3 rk-shadow-sm font-mono">
        <p className="text-xs font-black uppercase text-rk-ink">{label}</p>
        <p className="text-sm font-black text-rk-secondary mt-0.5">
          {data.value.toLocaleString()}
        </p>
      </div>
    )
  }
  return null
}

export function BarChart({
  data,
  height = 200,
  className,
  showGrid = true,
}: BarChartProps) {
  const defaultColors = [
    '#FB923C',
    '#FDE047',
    '#BBF7D0',
    '#A78BFA',
    '#BAE6FD',
    '#FBCFE8',
  ]

  return (
    <div
      role="img"
      aria-label="Bar chart"
      className={cn(
        'w-full bg-rk-surface rounded-2xl rk-border p-4 rk-shadow-sm font-sans',
        className
      )}
    >
      <div style={{ width: '100%', height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={INK}
                strokeOpacity={0.15}
                vertical={false}
              />
            )}
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={{ stroke: INK, strokeWidth: 2 }}
              tick={{ fill: INK, fontSize: 11, fontWeight: 700, fontFamily: 'monospace' }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ stroke: INK, strokeWidth: 2 }}
              tick={{ fill: INK, fontSize: 10, fontWeight: 700, fontFamily: 'monospace' }}
            />
            <RechartsTooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} stroke={INK} strokeWidth={2}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color || defaultColors[index % defaultColors.length]}
                />
              ))}
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
