import * as React from 'react'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CopyButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  value: string
  /** Milliseconds before reverting to the copy state. 0 disables auto-revert. */
  resetDelay?: number
  label?: React.ReactNode
  copiedLabel?: React.ReactNode
  ariaLabel?: string
}

export function CopyButton({
  value,
  resetDelay = 2000,
  label = 'Copy',
  copiedLabel = 'Copied!',
  ariaLabel = 'Copy to clipboard',
  className,
  onClick,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(value)
      setCopied(true)
      if (resetDelay > 0) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setCopied(false), resetDelay)
      }
    }
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={handleClick}
      className={cn(
        'inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-rk-surface px-3.5 font-sans text-xs font-extrabold text-rk-ink rk-border-sm rk-shadow-sm transition-all cursor-pointer select-none',
        'hover:bg-rk-primary/70 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-2',
        className
      )}
      {...props}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />
      ) : (
        <Copy className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
      )}
      <span>{copied ? copiedLabel : label}</span>
    </button>
  )
}
