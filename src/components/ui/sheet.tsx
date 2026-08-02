import * as React from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'motion/react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SheetProps {
  open: boolean
  onClose: () => void
  side?: 'left' | 'right'
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  className?: string
  closeLabel?: string
}

export function Sheet({
  open,
  onClose,
  side = 'right',
  title,
  description,
  children,
  className,
  closeLabel = 'Close panel',
}: SheetProps) {
  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (typeof document === 'undefined' || !open) return null

  return createPortal(
    <div className="fixed inset-0 z-[70] font-sans">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#18181B]/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : 'Panel'}
        initial={{ x: side === 'right' ? '100%' : '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: side === 'right' ? '100%' : '-100%' }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        className={cn(
          'absolute top-0 bottom-0 w-full max-w-sm bg-white rk-border flex flex-col',
          side === 'right' ? 'right-0 rounded-l-[28px] border-r-0' : 'left-0 rounded-r-[28px] border-l-0',
          className
        )}
      >
        <div className="flex items-start justify-between gap-4 p-5 border-b-3 border-black">
          <div className="min-w-0">
            {title && <h2 className="font-display text-xl font-black text-[#18181B]">{title}</h2>}
            {description && <p className="mt-1 text-xs font-bold text-[#18181B]/60">{description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white rk-border-sm rk-shadow-sm transition-all hover:bg-[#FDE047] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer"
          >
            <X className="h-4 w-4 stroke-[3]" aria-hidden="true" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </motion.div>
    </div>,
    document.body
  )
}
