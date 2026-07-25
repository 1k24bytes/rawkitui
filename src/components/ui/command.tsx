import * as React from 'react'
import { Check, Command as CommandIcon, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CommandItem {
  value: string
  label: React.ReactNode
  keywords?: string
  group?: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface CommandProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  items: CommandItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  onSelect?: (item: CommandItem) => void
  placeholder?: string
  emptyMessage?: React.ReactNode
}

export function Command({
  items,
  value: controlledValue,
  defaultValue,
  onValueChange,
  onSelect,
  placeholder = 'Search commands... ',
  emptyMessage = 'No results found.',
  className,
  ...props
}: CommandProps) {
  const [query, setQuery] = React.useState('')
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '')
  const currentValue = controlledValue ?? internalValue
  const normalizedQuery = query.trim().toLowerCase()
  const filteredItems = items.filter((item) => `${item.value} ${item.label} ${item.keywords ?? ''}`.toLowerCase().includes(normalizedQuery))
  const groups = filteredItems.reduce<Record<string, CommandItem[]>>((result, item) => {
    const group = item.group ?? 'Suggestions'
    result[group] ??= []
    result[group].push(item)
    return result
  }, {})

  React.useEffect(() => setActiveIndex(0), [query])

  const selectItem = (item: CommandItem) => {
    if (item.disabled) return
    setInternalValue(item.value)
    onValueChange?.(item.value)
    onSelect?.(item)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) => Math.min(index + 1, filteredItems.length - 1))
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => Math.max(index - 1, 0))
    }
    if (event.key === 'Enter' && filteredItems[activeIndex]) {
      event.preventDefault()
      selectItem(filteredItems[activeIndex])
    }
  }

  return (
    <div className={cn('w-full max-w-lg overflow-hidden rounded-2xl bg-white font-sans rk-border rk-shadow-md', className)} {...props}>
      <div className="flex items-center gap-3 border-b-2 border-black/15 px-4">
        <Search className="h-4 w-4 shrink-0 text-black/50" aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          role="combobox"
          aria-expanded="true"
          aria-controls="command-list"
          aria-autocomplete="list"
          className="h-12 min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-black/40"
        />
        <CommandIcon className="h-4 w-4 shrink-0 text-black/35" aria-hidden="true" />
      </div>
      <div id="command-list" role="listbox" className="max-h-72 overflow-y-auto p-2">
        {filteredItems.length === 0 ? (
          <div role="status" className="px-3 py-8 text-center text-sm font-bold text-black/55">{emptyMessage}</div>
        ) : (
          Object.entries(groups).map(([group, groupItems]) => (
            <div key={group} className="mb-2 last:mb-0">
              <div className="px-3 py-2 font-mono text-[10px] font-black uppercase tracking-wider text-[#FB923C]">{group}</div>
              {groupItems.map((item) => {
                const index = filteredItems.indexOf(item)
                const isActive = index === activeIndex
                return (
                  <button
                    key={item.value}
                    type="button"
                    role="option"
                    aria-selected={currentValue === item.value}
                    disabled={item.disabled}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => selectItem(item)}
                    className={cn('flex min-h-10 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-extrabold transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-40', isActive ? 'bg-[#FDE047]' : 'hover:bg-[#F4F4F0]')}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center">{item.icon}</span>
                    <span className="min-w-0 flex-1 truncate">{item.label}</span>
                    {currentValue === item.value && <Check className="h-4 w-4 shrink-0 stroke-[3]" aria-hidden="true" />}
                  </button>
                )
              })}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
