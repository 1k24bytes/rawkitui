import * as React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface FloatingNavProps extends React.HTMLAttributes<HTMLDivElement> {
  activeTab?: string
  defaultTab?: string
  onTabChange?: (tab: string) => void
  tabs?: { id: string; label: string; icon?: React.ReactNode }[]
  variant?: 'yellow' | 'orange' | 'mint' | 'violet' | 'pink' | 'sky' | 'black'
  position?: 'bottom' | 'top' | 'static'
}

const variantFills = {
  yellow: 'bg-rk-primary text-rk-ink focus-visible:ring-rk-primary',
  orange: 'bg-rk-secondary text-rk-ink focus-visible:ring-rk-secondary',
  mint: 'bg-rk-success text-rk-ink focus-visible:ring-rk-success',
  violet: 'bg-rk-accent text-rk-ink focus-visible:ring-rk-accent',
  pink: 'bg-rk-pink text-rk-ink focus-visible:ring-rk-pink',
  sky: 'bg-rk-sky text-rk-ink focus-visible:ring-rk-sky',
  black: 'bg-white text-rk-ink focus-visible:ring-white',
}

const positionClasses = {
  bottom: 'fixed bottom-6 left-1/2 -translate-x-1/2 z-50',
  top: 'fixed top-6 left-1/2 -translate-x-1/2 z-50',
  static: 'relative z-10',
}

export function FloatingNav({
  className,
  activeTab: controlledActiveTab,
  defaultTab = 'home',
  onTabChange,
  variant = 'yellow',
  position = 'static',
  tabs = [
    { id: 'home', label: 'Home' },
    { id: 'components', label: 'Components' },
    { id: 'tokens', label: 'Tokens' },
    { id: 'docs', label: 'Docs' },
  ],
  ...props
}: FloatingNavProps) {
  const [internalTab, setInternalTab] = React.useState(defaultTab)
  const currentTab = controlledActiveTab ?? internalTab
  const instanceId = React.useId()

  const handleTabClick = (id: string) => {
    if (controlledActiveTab === undefined) {
      setInternalTab(id)
    }
    onTabChange?.(id)
  }

  return (
    <div
      role="tablist"
      aria-label="Floating navigation"
      className={cn(
        'inline-flex items-center gap-1.5 p-2 rounded-full bg-rk-ink text-rk-canvas rk-border rk-shadow-lg transition-all duration-200 select-none',
        positionClasses[position],
        className
      )}
      {...props}
    >
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={tab.label}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              'relative flex items-center gap-2 px-5 py-2 rounded-full font-extrabold text-xs tracking-wide transition-colors cursor-pointer select-none z-10',
              'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-offset-rk-ink',
              isActive ? 'text-rk-ink font-black' : 'text-white/80 hover:text-white'
            )}
          >
            {isActive && (
              <motion.div
                layoutId={`floatingNavActive-${instanceId}`}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={cn(
                  'absolute inset-0 rounded-full rk-border-sm rk-shadow-sm -z-10',
                  variantFills[variant]
                )}
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
