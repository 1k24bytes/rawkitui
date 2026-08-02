'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export const DialogTrigger = DialogPrimitive.Trigger
export const DialogPortal = DialogPrimitive.Portal
export const DialogClose = DialogPrimitive.Close

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/60 backdrop-blur-xs data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

export const dialogContentVariants = {
  white: 'bg-white text-rk-ink',
  mint: 'bg-rk-mint text-rk-ink',
  peach: 'bg-rk-peach text-rk-ink',
  lavender: 'bg-rk-lavender text-rk-ink',
  sky: 'bg-rk-sky text-rk-ink',
  pink: 'bg-rk-pink text-rk-ink',
  yellow: 'bg-rk-primary text-rk-ink',
} as const

export type DialogVariant = keyof typeof dialogContentVariants

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  variant?: DialogVariant
  showCloseButton?: boolean
}

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, variant = 'lavender', showCloseButton = true, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[32px] rk-border rk-shadow-xl p-6 lg:p-8 font-sans transition-all duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        dialogContentVariants[variant],
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white rk-border-sm flex items-center justify-center font-bold rk-shadow-sm hover:bg-rk-primary transition-colors focus:outline-none focus:ring-4 focus:ring-black cursor-pointer shrink-0 p-0 aspect-square">
          <X className="w-5 h-5 stroke-[2.5]" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-left', className)} {...props} />
)
DialogHeader.displayName = 'DialogHeader'

export const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
)
DialogFooter.displayName = 'DialogFooter'

export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('font-display text-2xl sm:text-3xl font-black tracking-tight pr-8', className)}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm font-bold opacity-70', className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

/* ------------------------------------------------------------------ */
/* Compound API root + legacy compatibility wrapper                    */
/* ------------------------------------------------------------------ */

export const DialogRoot = DialogPrimitive.Root

export interface DialogProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children?: React.ReactNode
  variant?: DialogVariant
}

export function Dialog({ open, onClose, title, description, children, variant = 'lavender' }: DialogProps) {
  return (
    <DialogRoot open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent variant={variant}>
        {title && <DialogTitle>{title}</DialogTitle>}
        {description && <DialogDescription>{description}</DialogDescription>}
        <div className="pt-2">{children}</div>
      </DialogContent>
    </DialogRoot>
  )
}

