import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CalendarProps {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
  month?: Date
  defaultMonth?: Date
  onMonthChange?: (month: Date) => void
  minDate?: Date
  maxDate?: Date
  disabled?: (date: Date) => boolean
  showOutsideDays?: boolean
  className?: string
}

const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())
const isSameDay = (left?: Date, right?: Date) => Boolean(left && right && startOfDay(left).getTime() === startOfDay(right).getTime())
const isBefore = (date: Date, boundary?: Date) => Boolean(boundary && startOfDay(date) < startOfDay(boundary))
const isAfter = (date: Date, boundary?: Date) => Boolean(boundary && startOfDay(date) > startOfDay(boundary))

export function Calendar({
  value: controlledValue,
  defaultValue,
  onValueChange,
  month: controlledMonth,
  defaultMonth,
  onMonthChange,
  minDate,
  maxDate,
  disabled,
  showOutsideDays = true,
  className,
}: CalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(defaultValue)
  const [visibleMonth, setVisibleMonth] = React.useState<Date>(new Date((defaultMonth ?? defaultValue ?? new Date()).getFullYear(), (defaultMonth ?? defaultValue ?? new Date()).getMonth(), 1))
  const value = controlledValue ?? selectedDate
  const month = controlledMonth ?? visibleMonth
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1)
  const firstGridDay = new Date(month.getFullYear(), month.getMonth(), 1 - firstDay.getDay())
  const days = Array.from({ length: 42 }, (_, index) => new Date(firstGridDay.getFullYear(), firstGridDay.getMonth(), firstGridDay.getDate() + index))

  const changeMonth = (offset: number) => {
    const nextMonth = new Date(month.getFullYear(), month.getMonth() + offset, 1)
    setVisibleMonth(nextMonth)
    onMonthChange?.(nextMonth)
  }

  const selectDate = (date: Date) => {
    const nextValue = isSameDay(date, value) ? undefined : date
    setSelectedDate(nextValue)
    onValueChange?.(nextValue)
  }

  return (
    <div className={cn('w-full max-w-sm rounded-2xl bg-white p-4 font-sans rk-border rk-shadow-md', className)}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-display text-lg font-black" aria-live="polite">
          {month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex gap-2">
          <button type="button" aria-label="Previous month" onClick={() => changeMonth(-1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F4F0] rk-border-sm rk-shadow-sm hover:bg-[#FDE047] focus:outline-none focus:ring-4 focus:ring-black focus:ring-offset-2">
            <ChevronLeft className="h-4 w-4 stroke-[3]" aria-hidden="true" />
          </button>
          <button type="button" aria-label="Next month" onClick={() => changeMonth(1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F4F0] rk-border-sm rk-shadow-sm hover:bg-[#FDE047] focus:outline-none focus:ring-4 focus:ring-black focus:ring-offset-2">
            <ChevronRight className="h-4 w-4 stroke-[3]" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div role="grid" aria-label={month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })} className="grid grid-cols-7 gap-1">
        {weekdays.map((day) => <div key={day} role="columnheader" className="py-1 text-center font-mono text-[10px] font-black uppercase text-black/50">{day}</div>)}
        {days.map((date) => {
          const outside = date.getMonth() !== month.getMonth()
          const unavailable = isBefore(date, minDate) || isAfter(date, maxDate) || disabled?.(date)
          const isDisabled = unavailable || (outside && !showOutsideDays)
          return (
            <button
              key={date.toISOString()}
              type="button"
              role="gridcell"
              aria-label={date.toLocaleDateString(undefined, { dateStyle: 'full' })}
              aria-selected={isSameDay(date, value)}
              disabled={isDisabled}
              onClick={() => selectDate(date)}
              className={cn(
                'aspect-square rounded-xl p-1 text-sm font-extrabold transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:pointer-events-none disabled:opacity-25',
                outside ? 'text-black/30' : 'text-[#18181B] hover:bg-[#BBF7D0]',
                isSameDay(date, value) && 'bg-[#FDE047] rk-border-sm rk-shadow-sm text-[#18181B]'
              )}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
