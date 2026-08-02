import * as React from 'react'
import { ChevronDown, Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AccordionItem {
  id: string
  title: React.ReactNode
  content: React.ReactNode
  disabled?: boolean
}

export interface AccordionProps {
  items: AccordionItem[]
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

  const isNumbered = showNumbers || variant === 'numbered'
  const isPlusMinus = variant === 'plus-minus' || variant === 'numbered'

  return (
    <div className={cn('w-full space-y-3 font-sans', className)}>
      {items.map((item, index) => {
        const isOpen = openItems.includes(item.id)
        const contentId = `accordion-content-${item.id}`
        const numStr = String(index + 1).padStart(2, '0')

        return (
          <div
            key={item.id}
            className={cn(
              'overflow-hidden rounded-[20px] border-3 border-[#18181B] transition-all',
              isOpen
                ? 'bg-[#FDE047] rk-shadow-md'
                : 'bg-white rk-shadow-sm hover:rk-shadow-md'
            )}
          >
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={contentId}
                disabled={item.disabled}
                onClick={() => toggleItem(item.id)}
                className={cn(
                  'flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-base font-black text-[#18181B] transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer'
                )}
              >
                <span className="flex items-center gap-3">
                  {isNumbered && (
                    <span className="font-mono text-xs font-black opacity-60">
                      {numStr}
                    </span>
                  )}
                  <span>{item.title}</span>
                </span>

                {isPlusMinus ? (
                  isOpen ? (
                    <Minus className="h-5 w-5 shrink-0 stroke-[3] text-[#18181B]" aria-hidden="true" />
                  ) : (
                    <Plus className="h-5 w-5 shrink-0 stroke-[3] text-[#18181B]" aria-hidden="true" />
                  )
                ) : (
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 shrink-0 stroke-[3] text-[#18181B] transition-transform duration-200',
                      isOpen && 'rotate-180'
                    )}
                    aria-hidden="true"
                  />
                )}
              </button>
            </h3>
            <div
              id={contentId}
              role="region"
              hidden={!isOpen}
              className="border-t-2 border-[#18181B]/15 px-5 py-4 text-sm font-extrabold leading-relaxed text-[#18181B]/80"
            >
              {item.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
