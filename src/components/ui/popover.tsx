'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'

export interface PopoverProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'bottom' | 'left' | 'right'
  sideOffset?: number
  className?: string
  closeOnClickOutside?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Popover({
  trigger,
  children,
  align = 'center',
  side = 'bottom',
  sideOffset = 10,
  className,
  closeOnClickOutside = true,
  open: controlledOpen,
  onOpenChange,
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange]
  )

  const triggerRef = React.useRef<HTMLDivElement>(null)
  const panelRef = React.useRef<HTMLDivElement>(null)
  const [coords, setCoords] = React.useState<{ top?: number; left?: number; bottom?: number; right?: number; transform?: string }>({})

  const updatePosition = React.useCallback(() => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const newCoords: typeof coords = {}

    if (side === 'bottom') {
      newCoords.top = rect.bottom + sideOffset
      newCoords.left =
        align === 'start'
          ? rect.left
          : align === 'end'
          ? rect.right
          : rect.left + rect.width / 2
      newCoords.transform =
        align === 'end' ? 'translateX(-100%)' : align === 'center' ? 'translateX(-50%)' : 'none'
    } else if (side === 'top') {
      newCoords.bottom = window.innerHeight - rect.top + sideOffset
      newCoords.left =
        align === 'start'
          ? rect.left
          : align === 'end'
          ? rect.right
          : rect.left + rect.width / 2
      newCoords.transform =
        align === 'end' ? 'translateX(-100%)' : align === 'center' ? 'translateX(-50%)' : 'none'
    } else if (side === 'left') {
      newCoords.right = window.innerWidth - rect.left + sideOffset
      newCoords.top = rect.top + rect.height / 2
      newCoords.transform = 'translateY(-50%)'
    } else if (side === 'right') {
      newCoords.left = rect.right + sideOffset
      newCoords.top = rect.top + rect.height / 2
      newCoords.transform = 'translateY(-50%)'
    }

    setCoords(newCoords)
  }, [align, side, sideOffset])

  React.useLayoutEffect(() => {
    if (!isOpen) return
    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [isOpen, updatePosition])

  React.useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onClickOutside = (event: MouseEvent) => {
      if (!closeOnClickOutside) return
      const target = event.target as Node
      if (!triggerRef.current?.contains(target) && !panelRef.current?.contains(target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onClickOutside)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, closeOnClickOutside, setOpen])

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative inline-flex">
      <div
        ref={triggerRef}
        className="inline-flex cursor-pointer"
        onClick={() => setOpen(!isOpen)}
      >
        {trigger}
      </div>
      {mounted &&
        isOpen &&
        createPortal(
          <AnimatePresence>
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-label="Popover"
              initial={{ opacity: 0, scale: 0.92, y: side === 'bottom' ? -6 : side === 'top' ? 6 : 0 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 450, damping: 28 }}
              style={{
                position: 'fixed',
                zIndex: 9999,
                ...coords,
              }}
              className={cn(
                'w-72 rounded-[20px] border-3 border-[#18181B] bg-white p-4 font-sans rk-shadow-lg text-[#18181B]',
                className
              )}
            >
              {children}
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </div>
  )
}
