import * as React from 'react'
import { cn } from '@/lib/utils'

export interface OTPInputProps {
  length?: number
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  disabled?: boolean
  className?: string
  ariaLabel?: string
}

export function OTPInput({
  length = 4,
  value,
  defaultValue = '',
  onChange,
  onComplete,
  disabled = false,
  className,
  ariaLabel = 'One-time code',
}: OTPInputProps) {
  const isControlled = value !== undefined
  const [internal, setInternal] = React.useState(defaultValue)
  const current = (isControlled ? value : internal) ?? ''
  const inputRefs = React.useRef<Array<HTMLInputElement | null>>([])
  const completedRef = React.useRef(false)

  const setValue = (next: string) => {
    const trimmed = next.slice(0, length)
    if (!isControlled) setInternal(trimmed)
    onChange?.(trimmed)
    if (trimmed.length === length) {
      if (!completedRef.current) {
        completedRef.current = true
        onComplete?.(trimmed)
      }
    } else {
      completedRef.current = false
    }
  }

  const focusIndex = (index: number) => {
    inputRefs.current[Math.min(Math.max(index, 0), length - 1)]?.focus()
  }

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const char = event.target.value.replace(/\D/g, '').slice(-1)
    const chars = current.split('')
    chars[index] = char
    setValue(chars.join(''))
    if (char) focusIndex(index + 1)
  }

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      event.preventDefault()
      if (current[index]) {
        const chars = current.split('')
        chars[index] = ''
        setValue(chars.join(''))
      } else {
        focusIndex(index - 1)
      }
    } else if (event.key === 'ArrowLeft') {
      focusIndex(index - 1)
    } else if (event.key === 'ArrowRight') {
      focusIndex(index + 1)
    }
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (pasted) {
      setValue(pasted)
      focusIndex(Math.min(pasted.length, length - 1))
    }
  }

  return (
    <div className={cn('flex items-center gap-2 font-sans', className)} role="group" aria-label={ariaLabel}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          aria-label={`${ariaLabel} digit ${index + 1}`}
          value={current[index] ?? ''}
          disabled={disabled}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          className={cn(
            'h-12 w-11 rounded-xl bg-white text-center font-mono text-lg font-black text-[#18181B] rk-border-sm rk-shadow-sm transition-all outline-none',
            'focus:bg-[#FDE047]/40 focus:ring-4 focus:ring-black/15',
            'disabled:opacity-50',
            current[index] && 'bg-[#FDE047]/25'
          )}
        />
      ))}
    </div>
  )
}
