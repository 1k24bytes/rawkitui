import * as React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface FloatingNavProps extends React.HTMLAttributes<HTMLDivElement> {
  activeTab?: string
  onTabChange?: (tab: string) => void
  tabs?: { id: string; label: string; icon?: React.ReactNode }[]
}

export function FloatingNav({
  className,
  activeTab = 'home',
  onTabChange,
  tabs = [
    { id: 'home', label: 'Home' },
    { id: 'components', label: 'Components' },
    { id: 'tokens', label: 'Tokens' },
    { id: 'docs', label: 'Docs' },
  ],
  ...props
}: FloatingNavProps) {
  return (
    <div
      role="tablist"
      aria-label="Floating navigation"
      className={cn(
        'inline-flex items-center gap-1.5 p-2 rounded-full bg-[#18181B] text-white rk-border rk-shadow-lg z-50 transition-all duration-200 relative',
        className
      )}
      {...props}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={tab.label}
            onClick={() => onTabChange?.(tab.id)}
            className={cn(
              'relative flex items-center gap-2 px-5 py-2 rounded-full font-extrabold text-xs tracking-wide transition-colors cursor-pointer select-none z-10',
              'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FDE047] focus-visible:ring-offset-2 focus-visible:ring-offset-[#18181B]',
              isActive ? 'text-[#18181B]' : 'text-white/80 hover:text-white'
            )}
          >
            {isActive && (
              <motion.div
                layoutId="floatingNavActive"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute inset-0 bg-[#FDE047] rounded-full rk-border-sm rk-shadow-sm -z-10"
              />
            )}
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
