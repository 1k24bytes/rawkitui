'use client'

import * as React from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export const SheetRoot = SheetPrimitive.Root
export const SheetTrigger = SheetPrimitive.Trigger
export const SheetClose = SheetPrimitive.Close

const sideClasses = {
  top: 'inset-x-0 top-0 border-b-3 border-r-0 border-l-0 border-t-0 rounded-b-[28px]',
  bottom: 'inset-x-0 bottom-0 border-t-3 border-r-0 border-l-0 border-b-0 rounded-t-[28px]',
  left: 'inset-y-0 left-0 w-full max-w-sm border-r-3 border-t-0 border-b-0 border-l-0 rounded-r-[28px]',
  right: 'inset-y-0 right-0 w-full max-w-sm border-l-3 border-t-0 border-b-0 border-r-0 rounded-l-[28px]',
} as const

const translateClasses = {
  top: 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-full data-[state=open]:slide-in-from-top-full',
  bottom: 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-bottom-full',
  left: 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left-full data-[state=open]:slide-in-from-left-full',
  right: 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full',
} as const

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> {
  side?: 'top' | 'bottom' | 'left' | 'right'
  closeLabel?: string
}

export const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-[70] bg-rk-ink/40 backdrop-blur-xs data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ className, side = 'right', closeLabel = 'Close panel', children, ...props }, ref) => (
  <SheetPrimitive.Portal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(
        'fixed z-[80] flex flex-col bg-rk-surface font-sans rk-border rk-shadow-xl transition-all duration-200',
        sideClasses[side],
        translateClasses[side],
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-4 p-5 border-b-3 border-rk-ink/20">
        {children}
      </div>
      <SheetPrimitive.Close
        type="button"
        aria-label={closeLabel}
        className="absolute top-5 right-5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white rk-border-sm rk-shadow-sm transition-all hover:bg-rk-primary active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus:outline-none focus:ring-4 focus:ring-black cursor-pointer"
      >
        <X className="h-4 w-4 stroke-[3]" aria-hidden="true" />
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPrimitive.Portal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

export const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1 text-left', className)} {...props} />
)
SheetHeader.displayName = 'SheetHeader'

export const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-auto flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
)
SheetFooter.displayName = 'SheetFooter'

export const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn('font-display text-xl font-black pr-8', className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

export const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn('mt-1 text-xs font-bold opacity-60', className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

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
  return (
    <SheetRoot open={open} onOpenChange={(next) => !next && onClose()}>
      <SheetContent side={side} closeLabel={closeLabel} className={className}>
        <SheetHeader>
          {title && <SheetTitle>{title}</SheetTitle>}
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </SheetContent>
    </SheetRoot>
  )
}
