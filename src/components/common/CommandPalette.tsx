import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { COMPONENTS_DATA } from '@/data/componentsData'
import { Search, Terminal, BookOpen, Layers, X, CornerDownLeft, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

interface PaletteItem {
  id: string
  name: string
  category: string
  description: string
  path: string
  cliCommand?: string
  icon: React.ReactNode
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0

  // Filter components matching search query
  const componentsList = Object.values(COMPONENTS_DATA)
  const filteredComponents = componentsList.filter((comp) => {
    const q = query.toLowerCase().trim()
    if (!q) return true
    return (
      comp.name.toLowerCase().includes(q) ||
      comp.category.toLowerCase().includes(q) ||
      comp.description.toLowerCase().includes(q) ||
      comp.cliCommand.toLowerCase().includes(q) ||
      comp.id.toLowerCase().includes(q)
    )
  })

  // Quick navigation items
  const quickActions: PaletteItem[] = [
    {
      id: 'quickstart',
      name: 'Quickstart Installation Guide',
      category: 'Documentation',
      description: 'Learn how to set up RawkitUI and shadcn/ui CLI registry in your app.',
      path: '/components/quickstart',
      icon: <BookOpen className="w-4 h-4 stroke-[2.5]" />,
    },
    {
      id: 'homepage',
      name: 'RawkitUI Homepage',
      category: 'Navigation',
      description: 'Go to main Pop-Brutalist landing page and interactive showcase.',
      path: '/',
      icon: <Sparkles className="w-4 h-4 stroke-[2.5]" />,
    },
  ]

  const allItems: PaletteItem[] = [
    ...quickActions.filter(
      (action) =>
        !query ||
        action.name.toLowerCase().includes(query.toLowerCase()) ||
        action.category.toLowerCase().includes(query.toLowerCase())
    ),
    ...filteredComponents.map((comp) => ({
      id: comp.id,
      name: comp.name,
      category: comp.category,
      description: comp.description,
      path: `/components/${comp.id}`,
      cliCommand: comp.cliCommand,
      icon: <Layers className="w-4 h-4 stroke-[2.5]" />,
    })),
  ]

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setSelectedIndex(0)
    } else {
      setQuery('')
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const handleSelect = (item: (typeof allItems)[0]) => {
    if (item.path) {
      navigate(item.path)
      onClose()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, allItems.length))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + allItems.length) % Math.max(1, allItems.length))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (allItems[selectedIndex]) {
        handleSelect(allItems[selectedIndex])
      }
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 font-sans animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white rk-border rk-shadow-lg rounded-[28px] overflow-hidden flex flex-col max-h-[80vh] shadow-[6px_6px_0_0_#18181b]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Header Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b-3 border-black bg-[#F4F4F0]">
          <Search className="w-5 h-5 text-[#18181B] stroke-[2.5] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search components, props, or guides... (e.g. Button, Card, Slider)"
            className="w-full font-sans font-extrabold text-sm sm:text-base text-[#18181B] placeholder:text-[#18181B]/40 bg-transparent focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full hover:bg-black/10 text-black shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex font-mono text-[10px] font-black bg-[#18181B] text-[#FDE047] px-2 py-0.5 rounded border border-black shrink-0">
              ESC
            </kbd>
          )}
        </div>

        {/* Search Results List */}
        <div className="overflow-y-auto p-2 space-y-1 divide-y divide-black/5 max-h-[60vh]">
          {allItems.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="font-display font-black text-lg text-[#18181B]">No matching components</p>
              <p className="text-xs font-bold text-[#18181B]/60">
                Try searching for <code className="bg-[#FDE047] px-1.5 py-0.5 rounded border border-black font-mono text-black font-black">Button</code>, <code className="bg-[#FDE047] px-1.5 py-0.5 rounded border border-black font-mono text-black font-black">Slider</code>, or <code className="bg-[#FDE047] px-1.5 py-0.5 rounded border border-black font-mono text-black font-black">Card</code>.
              </p>
            </div>
          ) : (
            allItems.map((item, index) => {
              const isSelected = index === selectedIndex
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between gap-3 p-3.5 rounded-2xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#FDE047] text-[#18181B] rk-border-sm rk-shadow-xs font-extrabold'
                      : 'hover:bg-[#F4F4F0] text-[#18181B]'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl border-2 border-black flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? 'bg-[#18181B] text-white' : 'bg-white text-black'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-black text-sm sm:text-base tracking-tight truncate">
                          {item.name}
                        </span>
                        <Badge
                          variant={isSelected ? 'black' : 'yellow'}
                          shape="pill"
                          className="text-[10px] py-0 px-2 shrink-0"
                        >
                          {item.category}
                        </Badge>
                      </div>
                      <p
                        className={`text-xs font-semibold truncate mt-0.5 ${
                          isSelected ? 'text-[#18181B]/80' : 'text-[#18181B]/60'
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {'cliCommand' in item && item.cliCommand && (
                      <span
                        className={`hidden md:inline-flex items-center gap-1 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border border-black/20 ${
                          isSelected ? 'bg-black/10 text-black' : 'bg-black/5 text-black/70'
                        }`}
                      >
                        <Terminal className="w-3 h-3 stroke-[2.5]" /> CLI
                      </span>
                    )}
                    {isSelected && (
                      <div className="flex items-center gap-1 font-mono text-xs font-black bg-[#18181B] text-[#FDE047] px-2 py-1 rounded-lg border border-black shadow-xs">
                        <span>Jump</span>
                        <CornerDownLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer Shortcut Legend */}
        <div className="flex items-center justify-between px-5 py-2.5 bg-[#F4F4F0] border-t-2 border-black text-xs font-extrabold text-[#18181B]/70">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="font-mono text-[10px] font-black bg-white px-1.5 py-0.5 rounded border border-black">↑↓</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="font-mono text-[10px] font-black bg-white px-1.5 py-0.5 rounded border border-black">↵</kbd> Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="font-mono text-[10px] font-black bg-white px-1.5 py-0.5 rounded border border-black">ESC</kbd> Close
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#FB923C] font-black hidden sm:inline">
            RawkitUI {allComponentsCount()} items
          </span>
        </div>
      </div>
    </div>
  )
}

function allComponentsCount() {
  return Object.keys(COMPONENTS_DATA).length
}
