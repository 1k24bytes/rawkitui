import * as React from 'react'
import { motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CollapsibleProps {
  trigger: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  contentClassName?: string
}

export function Collapsible({
  trigger,
  children,
  defaultOpen = false,
  open,
  onOpenChange,
  className,
  contentClassName,
}: CollapsibleProps) {
  const isControlled = open !== undefined
  const [internal, setInternal] = React.useState(defaultOpen)
  const isOpen = isControlled ? (open as boolean) : internal
  const panelId = React.useId()

  const toggle = () => {
    const next = !isOpen
    if (!isControlled) setInternal(next)
    onOpenChange?.(next)
  }

  return (
    <div className={cn('w-full font-sans', className)}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={toggle}
        className={cn(
          'flex w-full items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 text-left rk-border rk-shadow-sm transition-all cursor-pointer select-none',
          'hover:bg-[#FDE047]/40 active:translate-y-[2px] active:shadow-none',
          'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-2',
          isOpen && 'rounded-b-none'
        )}
      >
        <span className="text-sm font-extrabold text-[#18181B]">{trigger}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white rk-border-sm"
        >
          <ChevronDown className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />
        </motion.span>
      </button>
      <motion.div
        id={panelId}
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="overflow-hidden"
      >
        <div
          className={cn(
            'rounded-b-2xl border-t-0 bg-white px-4 pb-4 pt-3 rk-border',
            contentClassName
          )}
        >
          {children}
        </div>
      </motion.div>
    </div>
  )
}
