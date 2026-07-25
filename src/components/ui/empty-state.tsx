import * as React from 'react'
import { Inbox } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  variant?: 'white' | 'mint' | 'peach' | 'lavender' | 'sky'
}

const variants = {
  white: 'bg-white',
  mint: 'bg-[#BBF7D0]',
  peach: 'bg-[#FED7AA]',
  lavender: 'bg-[#E9D5FF]',
  sky: 'bg-[#BAE6FD]',
}

export function EmptyState({ icon, title, description, action, variant = 'white', className, ...props }: EmptyStateProps) {
  return (
    <div className={cn('flex min-h-56 flex-col items-center justify-center rounded-2xl p-8 text-center font-sans rk-border rk-shadow-sm', variants[variant], className)} {...props}>
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white rk-border-sm rk-shadow-sm">
        {icon ?? <Inbox className="h-7 w-7 stroke-[2.5]" aria-hidden="true" />}
      </div>
      <h2 className="font-display text-xl font-black">{title}</h2>
      {description && <p className="mt-2 max-w-sm text-sm font-semibold leading-relaxed text-black/65">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
