import * as React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DialogProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children?: React.ReactNode
  variant?: 'white' | 'mint' | 'peach' | 'lavender' | 'sky' | 'pink' | 'yellow'
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  variant = 'lavender',
}: DialogProps) {
  const bgMap = {
    white: 'bg-white',
    mint: 'bg-[#BBF7D0]',
    peach: 'bg-[#FED7AA]',
    lavender: 'bg-[#E9D5FF]',
    sky: 'bg-[#BAE6FD]',
    pink: 'bg-[#FBCFE8]',
    yellow: 'bg-[#FDE047]',
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: 'spring', stiffness: 450, damping: 25 }}
            className={cn(
              'relative w-full max-w-lg rounded-[32px] rk-border rk-shadow-xl p-6 lg:p-8 z-10 font-sans',
              bgMap[variant]
            )}
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white rk-border-sm flex items-center justify-center font-bold rk-shadow-sm hover:bg-[#FDE047] transition-colors cursor-pointer shrink-0 p-0 aspect-square"
            >
              <X className="w-5 h-5 text-black stroke-[2.5]" />
            </motion.button>

            {title && (
              <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-[#18181B] pr-8 mb-1">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm font-bold text-black/70 mb-5">{description}</p>
            )}

            <div className="pt-2">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
