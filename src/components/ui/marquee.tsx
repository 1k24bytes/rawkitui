import * as React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Items to repeat in the marquee loop. */
  items?: string[]
  /** Duration in seconds per full cycle (default 20). */
  duration?: number
  /** Reverse scroll direction. */
  reverse?: boolean
  /** Custom children element instead of string items. */
  children?: React.ReactNode
}

/**
 * Pop-Brutalist Marquee component.
 * Infinite horizontal scrolling strip with edge gradient fades and pause-on-hover.
 */
export function Marquee({
  items = [
    'POP-BRUTALISM',
    'ZERO DEPENDENCIES',
    'COPY & PASTE',
    'FULLY CUSTOMIZABLE',
    'OPEN SOURCE',
    'TYPESCRIPT READY',
  ],
  duration = 20,
  reverse = false,
  className,
  children,
  ...props
}: MarqueeProps) {
  const doubledItems = [...items, ...items]

  return (
    <div className={cn('group relative overflow-hidden rounded-2xl rk-border bg-[#18181B] py-4 text-white rk-shadow-md', className)} {...props}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#18181B] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#18181B] to-transparent" />
      <motion.div
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration }}
        className="flex w-max items-center gap-8 group-hover:[animation-play-state:paused]"
      >
        {children
          ? [children, children]
          : doubledItems.map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-8 whitespace-nowrap font-mono text-xs font-black uppercase tracking-widest text-[#FDE047]"
              >
                <span>{item}</span>
                <span className="text-white/40">✦</span>
              </span>
            ))}
      </motion.div>
    </div>
  )
}
