import * as React from 'react'
import { ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DropdownMenuItem {
  label: React.ReactNode
  onSelect?: () => void
  shortcut?: string
  icon?: React.ReactNode
  disabled?: boolean
  separator?: boolean
}

export interface DropdownMenuProps {
  trigger?: React.ReactNode
  items: DropdownMenuItem[]
  align?: 'start' | 'end'
  className?: string
}

export function DropdownMenu({ trigger, items, align = 'start', className }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false)
  const [activeIndex, setActiveIndex] = React.useState(-1)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const menuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const selectableItems = items.filter((item) => !item.separator && !item.disabled)

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setOpen(true)
      setActiveIndex(0)
      requestAnimationFrame(() => menuRef.current?.focus())
    }
  }

  const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) => (index + 1) % selectableItems.length)
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => (index - 1 + selectableItems.length) % selectableItems.length)
    }
    if (event.key === 'Enter' && selectableItems[activeIndex]) {
      event.preventDefault()
      selectableItems[activeIndex].onSelect?.()
      setOpen(false)
    }
  }

  return (
    <div ref={rootRef} className={cn('relative inline-block font-sans', className)}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={handleTriggerKeyDown}
        className="flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-extrabold rk-border-sm rk-shadow-sm hover:bg-[#FDE047] focus:outline-none focus:ring-4 focus:ring-black focus:ring-offset-2"
      >
        {trigger ?? <><MoreHorizontal className="h-4 w-4" aria-hidden="true" /> Menu</>}
      </button>
      {open && (
        <div
          ref={menuRef}
          role="menu"
          tabIndex={-1}
          onKeyDown={handleMenuKeyDown}
          className={cn('absolute top-full z-50 mt-2 min-w-52 rounded-2xl bg-white p-2 rk-border rk-shadow-lg focus:outline-none', align === 'end' ? 'right-0' : 'left-0')}
        >
          {items.map((item, index) => item.separator ? (
            <div key={`separator-${index}`} role="separator" className="my-1 border-t-2 border-black/10" />
          ) : (
            <button
              key={`${index}-${String(item.label)}`}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onClick={() => { item.onSelect?.(); setOpen(false) }}
              onMouseEnter={() => setActiveIndex(selectableItems.indexOf(item))}
              className={cn('flex min-h-10 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-extrabold transition-colors focus:outline-none focus:ring-2 focus:ring-black disabled:pointer-events-none disabled:opacity-40', activeIndex === selectableItems.indexOf(item) ? 'bg-[#FDE047]' : 'hover:bg-[#F4F4F0]')}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">{item.icon}</span>
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
              {item.shortcut && <kbd className="font-mono text-[10px] text-black/50">{item.shortcut}</kbd>}
              {item.icon === undefined && item.shortcut === undefined && <ChevronRight className="h-4 w-4 text-black/30" aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
