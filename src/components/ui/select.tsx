'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export const SelectRoot = SelectPrimitive.Root
export const SelectGroup = SelectPrimitive.Group
export const SelectValue = SelectPrimitive.Value

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-12 w-full items-center justify-between rounded-2xl bg-white px-4 py-2 text-sm font-extrabold text-rk-ink rk-border rk-shadow-sm focus:outline-none focus:ring-4 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-120 cursor-pointer data-[state=open]:shadow-[5px_5px_0_0_var(--rk-shadow-color)] data-[state=open]:-translate-x-0.5 data-[state=open]:-translate-y-0.5 [&>span]:line-clamp-1',
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="w-5 h-5 stroke-[3] text-rk-ink transition-transform duration-200 shrink-0 ml-2 data-[state=open]:rotate-180" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

export const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4 stroke-[3]" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

export const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4 stroke-[3]" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      className={cn(
        'relative z-50 max-h-60 min-w-[8rem] overflow-y-auto rounded-2xl bg-white rk-border rk-shadow-xl p-2 font-sans text-rk-ink data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1.5 data-[side=left]:-translate-x-1.5 data-[side=right]:translate-x-1.5 data-[side=top]:-translate-y-1.5',
        className
      )}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-0 space-y-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-pointer select-none items-center justify-between rounded-xl px-3.5 py-2.5 font-mono text-xs font-extrabold transition-all outline-none focus:bg-rk-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[state=checked]:bg-rk-primary data-[state=checked]:rk-border-sm data-[state=checked]:rk-shadow-sm data-[state=checked]:font-black data-[state=checked]:-translate-y-px [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
      className
    )}
    {...props}
  >
    <span className="flex items-center gap-2 truncate">
      <SelectPrimitive.ItemIndicator>
        <Check className="w-4 h-4 stroke-[3.5] shrink-0 mr-2" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </span>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

export const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('px-3 py-2 font-mono text-[10px] font-black uppercase tracking-wider text-rk-secondary', className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

export const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 border-t-2 border-rk-ink/10', className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

/* ------------------------------------------------------------------ */
/* Legacy compatibility wrapper                                        */
/* ------------------------------------------------------------------ */

export interface SelectOption {
  value: string
  label: string
  icon?: React.ReactNode
}

export interface SelectProps {
  options?: SelectOption[]
  value?: string
  defaultValue?: string
  onChange?: (e: { target: { value: string } }) => void
  onValueChange?: (val: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function Select({
  options = [],
  value: controlledValue,
  defaultValue,
  onChange,
  onValueChange,
  placeholder = 'Select an option...',
  className,
  disabled = false,
}: SelectProps) {
  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? (options.length > 0 ? options[0].value : '')
  )
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue

  return (
    <SelectRoot
      value={currentValue}
      defaultValue={defaultValue}
      disabled={disabled}
      onValueChange={(val) => {
        setInternalValue(val)
        onValueChange?.(val)
        onChange?.({ target: { value: val } })
      }}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.icon}
            <span>{opt.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  )
}
