'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cn } from '@/lib/utils'

export const PopoverRoot = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger
export const PopoverAnchor = PopoverPrimitive.Anchor
export const PopoverClose = PopoverPrimitive.Close

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 10, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-[9999] w-72 rounded-[20px] border-3 border-rk-ink bg-white p-4 font-sans text-rk-ink rk-shadow-lg outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

/* ------------------------------------------------------------------ */
/* Legacy compatibility wrapper (compound root is `PopoverRoot`)       */
/* ------------------------------------------------------------------ */

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
  return (
    <PopoverRoot
      open={controlledOpen}
      onOpenChange={(next) => {
        if (closeOnClickOutside || next) {
          onOpenChange?.(next)
        }
      }}
    >
      <PopoverTrigger asChild>
        <span className="inline-flex cursor-pointer">{trigger}</span>
      </PopoverTrigger>
      <PopoverContent align={align} side={side} sideOffset={sideOffset} className={className}>
        {children}
      </PopoverContent>
    </PopoverRoot>
  )
}
