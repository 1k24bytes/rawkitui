import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TabItem {
  id: string
  label: string
  icon?: React.ReactNode
  badge?: string
}

export interface TabsProps {
  tabs: TabItem[]
  activeTab?: string
  defaultTab?: string
  onTabChange?: (id: string) => void
  variant?: 'pill' | 'underline' | 'boxed'
  className?: string
}

export function Tabs({
  tabs,
  activeTab: controlledActive,
  defaultTab,
  onTabChange,
  variant = 'pill',
  className,
}: TabsProps) {
  const [internalActive, setInternalActive] = React.useState(defaultTab || tabs[0]?.id)
  const currentTab = controlledActive !== undefined ? controlledActive : internalActive

  const handleSelect = (id: string) => {
    setInternalActive(id)
    onTabChange?.(id)
  }

  if (variant === 'pill') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-1.5 p-1.5 rounded-full bg-[#18181B] text-white rk-border rk-shadow-md',
          className
        )}
      >
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => handleSelect(tab.id)}
              className={cn(
                'flex items-center gap-2 px-5 py-2 rounded-full font-bold text-xs tracking-wide transition-all duration-150',
                isActive
                  ? 'bg-[#FDE047] text-[#18181B] rk-border-sm font-extrabold shadow-[2px_2px_0_0_#18181b] -translate-y-0.5'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={cn(
                    'text-[10px] font-mono px-1.5 py-0.2 rounded-full font-black',
                    isActive ? 'bg-black text-white' : 'bg-white/20 text-white'
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div className={cn('flex items-center gap-2 border-b-3 border-black pb-1', className)}>
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => handleSelect(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 font-display font-bold text-sm transition-all rounded-t-xl rk-border-sm border-b-0',
              isActive
                ? 'bg-[#FDE047] text-[#18181B] rk-shadow-sm -translate-y-1'
                : 'bg-white text-[#18181B]/70 hover:bg-[#F4F4F0]'
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
