'use client'

import * as React from 'react'
import { ChevronDown, Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ */
/* Compound API                                                        */
/* ------------------------------------------------------------------ */

export interface AccordionItemProps {
  id: string
  title: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
  open?: boolean
  onToggle?: (id: string) => void
  variant?: 'default' | 'yellow' | 'numbered' | 'plus-minus'
  showNumbers?: boolean
  number?: string
}

export function AccordionItem({
  id,
  title,
  content,
  disabled,
  open = false,
  onToggle,
  variant = 'default',
  showNumbers = false,
  number,
}: AccordionItemProps) {
  const isNumbered = showNumbers || variant === 'numbered'
  const isPlusMinus = variant === 'plus-minus' || variant === 'numbered'
  const contentId = `accordion-content-${id}`
  const titleId = `accordion-title-${id}`
  const heightRef = React.useRef<HTMLDivElement>(null)

  return (
    <div
      className={cn(
        'overflow-hidden rounded-[20px] border-3 border-rk-ink transition-all',
        open ? 'bg-rk-primary rk-shadow-md' : 'bg-rk-surface rk-shadow-sm hover:rk-shadow-md'
      )}
    >
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={contentId}
          id={titleId}
          disabled={disabled}
          onClick={() => onToggle?.(id)}
          className={cn(
            'flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-base font-black text-rk-ink transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer'
          )}
        >
          <span className="flex items-center gap-3">
            {isNumbered && (
              <span className="font-mono text-xs font-black opacity-60">
                {number}
              </span>
            )}
            <span>{title}</span>
          </span>

          {isPlusMinus ? (
            open ? (
              <Minus className="h-5 w-5 shrink-0 stroke-[3] text-rk-ink" aria-hidden="true" />
            ) : (
              <Plus className="h-5 w-5 shrink-0 stroke-[3] text-rk-ink" aria-hidden="true" />
            )
          ) : (
            <ChevronDown
              className={cn(
                'h-5 w-5 shrink-0 stroke-[3] text-rk-ink transition-transform duration-200',
                open && 'rotate-180'
              )}
              aria-hidden="true"
            />
          )}
        </button>
      </h3>
      <div
        id={contentId}
        role="region"
        aria-labelledby={titleId}
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div ref={heightRef} className="overflow-hidden">
          <div className="border-t-2 border-rk-ink/15 px-5 py-4 text-sm font-extrabold leading-relaxed text-rk-ink/80">
            {content}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Legacy API                                                          */
/* ------------------------------------------------------------------ */

export interface AccordionItemConfig {
  id: string
  title: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
}

export interface AccordionProps {
  items: AccordionItemConfig[]
  type?: 'single' | 'multiple'
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
  collapsible?: boolean
  showNumbers?: boolean
  variant?: 'default' | 'yellow' | 'numbered' | 'plus-minus'
  className?: string
}

export function Accordion({
  items,
  type = 'single',
  value: controlledValue,
  defaultValue,
  onValueChange,
  collapsible = true,
  showNumbers = false,
  variant = 'default',
  className,
}: AccordionProps) {
  const initialValue = defaultValue ?? (type === 'multiple' ? [] : '')
  const [internalValue, setInternalValue] = React.useState<string | string[]>(initialValue)
  const currentValue = controlledValue ?? internalValue
  const openItems = Array.isArray(currentValue) ? currentValue : currentValue ? [currentValue] : []

  const toggleItem = (id: string) => {
    const isOpen = openItems.includes(id)
    let nextValue: string | string[]

    if (type === 'multiple') {
      nextValue = isOpen ? openItems.filter((item) => item !== id) : [...openItems, id]
    } else {
      nextValue = isOpen && collapsible ? '' : id
    }

    setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  return (
    <div className={cn('w-full space-y-3 font-sans', className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          content={item.content}
          disabled={item.disabled}
          open={openItems.includes(item.id)}
          onToggle={toggleItem}
          variant={variant}
          showNumbers={showNumbers}
          number={String(index + 1).padStart(2, '0')}
        />
      ))}
    </div>
  )
}
