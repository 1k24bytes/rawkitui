import * as React from 'react'
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  description?: string
}

export function Alert({
  variant = 'info',
  title,
  description,
  children,
  className,
  ...props
}: AlertProps) {
  const variantStyles = {
    info: 'bg-[#BAE6FD] text-[#18181B]',
    success: 'bg-[#BBF7D0] text-[#18181B]',
    warning: 'bg-[#FDE047] text-[#18181B]',
    error: 'bg-[#F87171] text-[#18181B]',
  }

  const icons = {
    info: <Info className="w-5 h-5" />,
    success: <CheckCircle2 className="w-5 h-5 text-green-800" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-900" />,
    error: <XCircle className="w-5 h-5 text-red-900" />,
  }

  return (
    <div
      className={cn(
        'flex items-start gap-3.5 p-4 rounded-2xl rk-border rk-shadow-sm font-sans',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <div className="mt-0.5 shrink-0">{icons[variant]}</div>
      <div className="flex-1 space-y-0.5">
        {title && <h5 className="font-display font-bold text-sm leading-tight">{title}</h5>}
        {description && <p className="text-xs font-semibold opacity-90">{description}</p>}
        {children}
      </div>
    </div>
  )
}
