import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { COMPONENTS_DATA } from '@/data/componentsData'
import { Search, Layers, Sparkles, BookOpen, Terminal } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

export function DocsLayout() {
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['Primitives', 'Form Controls', 'Feedback & Data', 'Navigation'] as const

  const allComponents = Object.values(COMPONENTS_DATA)

  const filteredComponents = allComponents.filter((comp) =>
    comp.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#F4F4F0] flex flex-col">
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* LEFT SIDEBAR NAVIGATION (Neobrutalism.dev Style) */}
        <aside className="w-64 lg:w-72 shrink-0 border-r-3 border-black bg-white p-6 space-y-6 hidden md:block min-h-[calc(100vh-65px)] sticky top-[65px] self-start overflow-y-auto max-h-[calc(100vh-65px)]">
          {/* Quick Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black/50" />
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs font-semibold rounded-xl bg-[#F4F4F0] rk-border-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Quickstart Link */}
          <div className="space-y-1">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FB923C] px-2">
              Overview
            </div>
            <NavLink
              to="/docs/quickstart"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#FDE047] text-[#18181B] rk-border-sm rk-shadow-sm font-extrabold'
                    : 'text-[#18181B]/80 hover:bg-[#F4F4F0]'
                }`
              }
            >
              <Terminal className="w-4 h-4" /> Quickstart & CLI
            </NavLink>
          </div>

          {/* Categories */}
          {categories.map((category) => {
            const comps = filteredComponents.filter((c) => c.category === category)
            if (comps.length === 0) return null

            return (
              <div key={category} className="space-y-1.5">
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-black/50 px-2 flex items-center justify-between">
                  <span>{category}</span>
                  <span className="text-[10px] font-bold opacity-60">({comps.length})</span>
                </div>
                <div className="space-y-1">
                  {comps.map((comp) => (
                    <NavLink
                      key={comp.id}
                      to={`/docs/${comp.id}`}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-[#18181B] text-[#FDE047] rk-border-sm rk-shadow-sm font-extrabold -translate-x-0.5'
                            : 'text-[#18181B]/80 hover:bg-[#F4F4F0] hover:text-[#18181B]'
                        }`
                      }
                    >
                      <span>{comp.name}</span>
                      <span className="text-[10px] font-mono opacity-50">@{comp.id}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            )
          })}
        </aside>

        {/* MAIN COMPONENT DOCUMENTATION CONTENT AREA */}
        <main className="flex-1 p-4 sm:p-8 lg:p-12 overflow-x-hidden min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
