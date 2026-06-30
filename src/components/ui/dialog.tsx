import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'

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
  if (!open) return null

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={cn(
          'relative w-full max-w-lg rounded-[32px] rk-border rk-shadow-xl p-6 lg:p-8 z-10 animate-in fade-in zoom-in-95 duration-150',
          bgMap[variant]
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white rk-border-sm flex items-center justify-center font-bold rk-shadow-sm hover:bg-[#FDE047] transition-colors"
        >
          <X className="w-5 h-5 text-black" />
        </button>

        {title && (
          <h2 className="font-display text-2xl font-bold tracking-tight text-[#18181B] pr-8 mb-1">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-sm font-semibold text-black/70 mb-5">{description}</p>
        )}

        <div className="pt-2">{children}</div>
      </div>
    </div>
  )
}
