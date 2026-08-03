'use client'

import * as React from 'react'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type CalendarRangeValue = { from: Date; to?: Date }

export interface CalendarProps {
  value?: Date | CalendarRangeValue
  defaultValue?: Date | CalendarRangeValue
  onValueChange?: (date: Date | CalendarRangeValue | undefined) => void
  mode?: 'single' | 'range'
  month?: Date
  defaultMonth?: Date
  onMonthChange?: (month: Date) => void
  minDate?: Date
  maxDate?: Date
  disabled?: (date: Date) => boolean
  showOutsideDays?: boolean
  showMonthYearPicker?: boolean
  className?: string
}

const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())
const isSameDay = (left?: Date, right?: Date) => Boolean(left && right && startOfDay(left).getTime() === startOfDay(right).getTime())
const isBefore = (date: Date, boundary?: Date) => Boolean(boundary && startOfDay(date) < startOfDay(boundary))
const isAfter = (date: Date, boundary?: Date) => Boolean(boundary && startOfDay(date) > startOfDay(boundary))

const isRangeValue = (value: unknown): value is CalendarRangeValue =>
  Boolean(value && typeof value === 'object' && 'from' in value)

export function Calendar({
  value: controlledValue,
  defaultValue,
  onValueChange,
  mode = 'single',
  month: controlledMonth,
  defaultMonth,
  onMonthChange,
  minDate,
  maxDate,
  disabled,
  showOutsideDays = true,
  showMonthYearPicker = true,
  className,
}: CalendarProps) {
  const [internalValue, setInternalValue] = React.useState<Date | CalendarRangeValue | undefined>(defaultValue)
  const [visibleMonth, setVisibleMonth] = React.useState<Date>(() => {
    const base = defaultMonth ?? (defaultValue && !isRangeValue(defaultValue) ? defaultValue : new Date())
    return new Date(base.getFullYear(), base.getMonth(), 1)
  })
  const [rangeSelecting, setRangeSelecting] = React.useState(false)
  const [showPicker, setShowPicker] = React.useState(false)

  const value = controlledValue ?? internalValue
  const month = controlledMonth ?? visibleMonth
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1)
  const firstGridDay = new Date(month.getFullYear(), month.getMonth(), 1 - firstDay.getDay())
  const days = Array.from({ length: 42 }, (_, index) => new Date(firstGridDay.getFullYear(), firstGridDay.getMonth(), firstGridDay.getDate() + index))

  const emit = (next: Date | CalendarRangeValue | undefined) => {
    setInternalValue(next)
    onValueChange?.(next)
  }

  const changeMonth = (offset: number) => {
    const nextMonth = new Date(month.getFullYear(), month.getMonth() + offset, 1)
    setVisibleMonth(nextMonth)
    onMonthChange?.(nextMonth)
  }

  const selectDate = (date: Date) => {
    if (mode === 'range') {
      const current = isRangeValue(value) ? value : undefined
      if (!current || (current.from && current.to) || rangeSelecting) {
        // Start a new range
        emit({ from: date })
        setRangeSelecting(true)
      } else {
        if (isBefore(date, current.from)) {
          emit({ from: date, to: current.from })
        } else {
          emit({ from: current.from, to: date })
        }
        setRangeSelecting(false)
      }
      return
    }

    const nextValue = isSameDay(date, value as Date) ? undefined : date
    emit(nextValue)
  }

  const isInRange = (date: Date): boolean => {
    if (mode !== 'range') return false
    const range = isRangeValue(value) ? value : undefined
    if (!range?.from || !range.to) return false
    return !isBefore(date, range.from) && !isAfter(date, range.to)
  }

  const pickMonth = (index: number) => {
    const next = new Date(month.getFullYear(), index, 1)
    setVisibleMonth(next)
    onMonthChange?.(next)
    setShowPicker(false)
  }

  const pickYear = (year: number) => {
    const next = new Date(year, month.getMonth(), 1)
    setVisibleMonth(next)
    onMonthChange?.(next)
  }

  const pickerYear = month.getFullYear()

  return (
    <div className={cn('w-full max-w-sm rounded-2xl bg-rk-surface p-4 font-sans rk-border rk-shadow-md', className)}>
      <div className="mb-4 flex items-center justify-between gap-3">
        {showMonthYearPicker ? (
          <div className="relative flex items-center gap-1">
            <button
              type="button"
              aria-label="Select month and year"
              aria-haspopup="listbox"
              aria-expanded={showPicker}
              onClick={() => setShowPicker((s) => !s)}
              className="flex items-center gap-1.5 rounded-full bg-rk-canvas px-3 py-1.5 font-display text-lg font-black rk-border-sm rk-shadow-sm hover:bg-rk-primary focus:outline-none focus:ring-4 focus:ring-black focus:ring-offset-2 cursor-pointer"
            >
              <span aria-live="polite">
                {month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
              </span>
              <ChevronDown className={cn('h-4 w-4 stroke-[3] transition-transform', showPicker && 'rotate-180')} aria-hidden="true" />
            </button>

            {showPicker && (
              <div className="absolute left-0 top-full z-20 mt-2 rounded-2xl bg-rk-surface rk-border rk-shadow-lg p-3 font-sans" role="listbox" aria-label="Month and year picker">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <button type="button" aria-label="Previous year" onClick={() => pickYear(pickerYear - 1)} className="flex h-7 w-7 items-center justify-center rounded-full rk-border-sm rk-shadow-xs hover:bg-rk-primary focus:outline-none focus:ring-2 focus:ring-black cursor-pointer">
                    <ChevronLeft className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />
                  </button>
                  <span className="font-display text-sm font-black">{pickerYear}</span>
                  <button type="button" aria-label="Next year" onClick={() => pickYear(pickerYear + 1)} className="flex h-7 w-7 items-center justify-center rounded-full rk-border-sm rk-shadow-xs hover:bg-rk-primary focus:outline-none focus:ring-2 focus:ring-black cursor-pointer">
                    <ChevronRight className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {monthNames.map((name, index) => (
                    <button
                      key={name}
                      type="button"
                      role="option"
                      aria-selected={month.getMonth() === index}
                      onClick={() => pickMonth(index)}
                      className={cn(
                        'rounded-xl px-2 py-1.5 text-xs font-extrabold transition-colors focus:outline-none focus:ring-2 focus:ring-black cursor-pointer',
                        month.getMonth() === index ? 'bg-rk-primary rk-border-sm rk-shadow-xs' : 'hover:bg-rk-canvas'
                      )}
                    >
                      {name.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <h2 className="font-display text-lg font-black" aria-live="polite">
            {month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
          </h2>
        )}
        <div className="flex gap-2">
          <button type="button" aria-label="Previous month" onClick={() => changeMonth(-1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-rk-canvas rk-border-sm rk-shadow-sm hover:bg-rk-primary focus:outline-none focus:ring-4 focus:ring-black focus:ring-offset-2 cursor-pointer">
            <ChevronLeft className="h-4 w-4 stroke-[3]" aria-hidden="true" />
          </button>
          <button type="button" aria-label="Next month" onClick={() => changeMonth(1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-rk-canvas rk-border-sm rk-shadow-sm hover:bg-rk-primary focus:outline-none focus:ring-4 focus:ring-black focus:ring-offset-2 cursor-pointer">
            <ChevronRight className="h-4 w-4 stroke-[3]" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div role="grid" aria-label={month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })} className="grid grid-cols-7 gap-1">
        {weekdays.map((day) => <div key={day} role="columnheader" className="py-1 text-center font-mono text-[10px] font-black uppercase text-rk-ink/50">{day}</div>)}
        {days.map((date) => {
          const outside = date.getMonth() !== month.getMonth()
          const unavailable = isBefore(date, minDate) || isAfter(date, maxDate) || disabled?.(date)
          const isDisabled = unavailable || (outside && !showOutsideDays)
          const range = isRangeValue(value) ? value : undefined
          const isRangeStart = range?.from ? isSameDay(date, range.from) : false
          const isRangeEnd = range?.to ? isSameDay(date, range.to) : false
          const inRange = isInRange(date)
          return (
            <button
              key={date.toISOString()}
              type="button"
              role="gridcell"
              aria-label={date.toLocaleDateString(undefined, { dateStyle: 'full' })}
              aria-selected={mode === 'single' ? isSameDay(date, value as Date) : isRangeStart}
              aria-current={isSameDay(date, new Date()) ? 'date' : undefined}
              disabled={isDisabled}
              onClick={() => selectDate(date)}
              className={cn(
                'aspect-square rounded-xl p-1 text-sm font-extrabold transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:pointer-events-none disabled:opacity-25',
                outside ? 'text-rk-ink/30' : 'text-rk-ink hover:bg-rk-mint',
                inRange && 'bg-rk-mint rounded-none',
                isRangeStart && 'bg-rk-primary rk-border-sm rk-shadow-sm rounded-l-xl',
                isRangeEnd && 'bg-rk-primary rk-border-sm rk-shadow-sm rounded-r-xl',
                mode === 'single' && isSameDay(date, value as Date) && 'bg-rk-primary rk-border-sm rk-shadow-sm text-rk-ink'
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
