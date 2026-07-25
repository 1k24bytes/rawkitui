import * as React from 'react'
import { CheckCircle2, Info, X, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ToastVariant = 'default' | 'success' | 'error' | 'info'

export interface ToastData {
  id: string
  title: React.ReactNode
  description?: React.ReactNode
  variant?: ToastVariant
}

export interface ToastOptions {
  title: React.ReactNode
  description?: React.ReactNode
  variant?: ToastVariant
}

interface ToastContextValue {
  toast: (options: ToastOptions) => string
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

const variantClasses: Record<ToastVariant, string> = {
  default: 'bg-white',
  success: 'bg-[#BBF7D0]',
  error: 'bg-[#F87171]',
  info: 'bg-[#BAE6FD]',
}

export function ToastProvider({ children, duration = 4000 }: { children: React.ReactNode; duration?: number }) {
  const [toasts, setToasts] = React.useState<ToastData[]>([])

  const dismiss = React.useCallback((id: string) => setToasts((current) => current.filter((toast) => toast.id !== id)), [])
  const toast = React.useCallback((options: ToastOptions) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`
    setToasts((current) => [...current, { ...options, id }])
    if (duration > 0) window.setTimeout(() => dismiss(id), duration)
    return id
  }, [dismiss, duration])

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div aria-live="polite" aria-atomic="false" className="fixed inset-x-4 bottom-4 z-[60] flex flex-col items-end gap-3 sm:left-auto sm:w-96">
        {toasts.map((item) => (
          <div key={item.id} role={item.variant === 'error' ? 'alert' : 'status'} className={cn('flex w-full items-start gap-3 rounded-2xl p-4 font-sans rk-border rk-shadow-lg', variantClasses[item.variant ?? 'default'])}>
            <ToastIcon variant={item.variant} />
            <div className="min-w-0 flex-1"><div className="font-display text-sm font-black">{item.title}</div>{item.description && <div className="mt-0.5 text-xs font-bold text-black/65">{item.description}</div>}</div>
            <button type="button" aria-label="Dismiss notification" onClick={() => dismiss(item.id)} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white rk-border-sm hover:bg-[#FDE047] focus:outline-none focus:ring-2 focus:ring-black"><X className="h-4 w-4 stroke-[3]" aria-hidden="true" /></button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function ToastIcon({ variant }: { variant?: ToastVariant }) {
  if (variant === 'success') return <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 stroke-[2.5]" aria-hidden="true" />
  if (variant === 'error') return <XCircle className="mt-0.5 h-5 w-5 shrink-0 stroke-[2.5]" aria-hidden="true" />
  if (variant === 'info') return <Info className="mt-0.5 h-5 w-5 shrink-0 stroke-[2.5]" aria-hidden="true" />
  return null
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within a ToastProvider')
  return context
}
