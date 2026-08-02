'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ */
/* Form Item Context & Helpers                                        */
/* ------------------------------------------------------------------ */

interface FormItemContextValue {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue)

export const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId()

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn('space-y-2 font-sans', className)} {...props} />
      </FormItemContext.Provider>
    )
  }
)
FormItem.displayName = 'FormItem'

export const useFormField = () => {
  const itemContext = React.useContext(FormItemContext)
  const id = itemContext.id ?? React.useId()

  return {
    id,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
  }
}

/* ------------------------------------------------------------------ */
/* Form Label                                                         */
/* ------------------------------------------------------------------ */

export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, required, children, ...props }, ref) => {
    const { formItemId } = useFormField()

    return (
      <label
        ref={ref}
        htmlFor={formItemId}
        className={cn(
          'block font-display text-sm font-black text-rk-ink tracking-wide select-none',
          className
        )}
        {...props}
      >
        {children}
        {required && <span className="ml-1 text-red-500 font-extrabold">*</span>}
      </label>
    )
  }
)
FormLabel.displayName = 'FormLabel'

/* ------------------------------------------------------------------ */
/* Form Control                                                       */
/* ------------------------------------------------------------------ */

export const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot> & { hasError?: boolean }
>(({ hasError, ...props }, ref) => {
  const { formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={formDescriptionId}
      aria-invalid={hasError ? true : undefined}
      aria-errormessage={hasError ? formMessageId : undefined}
      {...props}
    />
  )
})
FormControl.displayName = 'FormControl'

/* ------------------------------------------------------------------ */
/* Form Description                                                   */
/* ------------------------------------------------------------------ */

export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-xs font-semibold text-rk-ink/60 leading-normal', className)}
      {...props}
    />
  )
})
FormDescription.displayName = 'FormDescription'

/* ------------------------------------------------------------------ */
/* Form Message (Error Badge)                                         */
/* ------------------------------------------------------------------ */

export interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  error?: string
}

export const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, error, children, ...props }, ref) => {
    const { formMessageId } = useFormField()
    const message = error || children

    if (!message) return null

    return (
      <div
        ref={ref}
        id={formMessageId}
        role="alert"
        className={cn(
          'inline-flex items-center gap-1.5 rounded-lg border-2 border-rk-ink bg-red-100 px-2.5 py-1 text-xs font-extrabold text-red-900 rk-shadow-xs animate-in fade-in-50 slide-in-from-top-1',
          className
        )}
        {...props}
      >
        <span>⚠️</span>
        <span>{message}</span>
      </div>
    )
  }
)
FormMessage.displayName = 'FormMessage'
