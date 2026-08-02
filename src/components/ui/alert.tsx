import * as React from 'react'
import { motion } from 'motion/react'
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
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
    info: 'bg-rk-sky text-rk-ink',
    success: 'bg-rk-mint text-rk-ink',
    warning: 'bg-rk-primary text-rk-ink',
    error: 'bg-rk-error text-rk-ink',
  }

  const icons = {
    info: <Info className="w-5 h-5 stroke-[2.5]" />,
    success: <CheckCircle2 className="w-5 h-5 text-green-900 stroke-[2.5]" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-950 stroke-[2.5]" />,
    error: <XCircle className="w-5 h-5 text-red-950 stroke-[2.5]" />,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      className={cn(
        'flex items-start gap-3.5 p-4 rounded-2xl rk-border rk-shadow-sm font-sans',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <div className="mt-0.5 shrink-0">{icons[variant]}</div>
      <div className="flex-1 space-y-0.5">
        {title && <h5 className="font-display font-extrabold text-sm leading-tight">{title}</h5>}
        {description && <p className="text-xs font-bold opacity-90">{description}</p>}
        {children}
      </div>
    </motion.div>
  )
}
