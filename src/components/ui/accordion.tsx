import * as React from 'react'
import { ChevronDown } from 'lucide-react'
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
  className?: string
}

export function Accordion({
  items,
  type = 'single',
  value: controlledValue,
  defaultValue,
  onValueChange,
  collapsible = true,
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
    <div className={cn('w-full space-y-2 font-sans', className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id)
        const contentId = `accordion-content-${item.id}`

        return (
          <div key={item.id} className="overflow-hidden rounded-2xl bg-white rk-border rk-shadow-sm">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={contentId}
                disabled={item.disabled}
                onClick={() => toggleItem(item.id)}
                className={cn(
                  'flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-sm font-black transition-colors focus:outline-none focus:ring-4 focus:ring-black focus:ring-inset disabled:cursor-not-allowed disabled:opacity-50',
                  isOpen ? 'bg-[#FDE047]' : 'bg-white hover:bg-[#F4F4F0]'
                )}
              >
                <span>{item.title}</span>
                <ChevronDown className={cn('h-5 w-5 shrink-0 stroke-[3] transition-transform', isOpen && 'rotate-180')} aria-hidden="true" />
              </button>
            </h3>
            <div
              id={contentId}
              role="region"
              hidden={!isOpen}
              className="border-t-2 border-black/10 px-5 py-4 text-sm font-semibold leading-relaxed text-black/75"
            >
              {item.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
