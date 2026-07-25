import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { COMPONENTS_DATA } from '@/data/componentsData'
import { Search, Layers, Sparkles, BookOpen, Terminal, Menu, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

export function DocsLayout() {
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  const categories = ['Primitives', 'Form Controls', 'Feedback & Data', 'Navigation'] as const

  const allComponents = Object.values(COMPONENTS_DATA)

  const filteredComponents = allComponents.filter((comp) =>
    `${comp.name} ${comp.id} ${comp.category}`.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const navigation = (
    <>
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black/50" aria-hidden="true" />
        <input
          type="search"
          aria-label="Search components"
          placeholder="Search components..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-xs font-semibold rounded-xl bg-[#F4F4F0] rk-border-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        />
      </div>

      <div className="space-y-1">
        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FB923C] px-2">Overview</div>
        <NavLink
          to="/components/quickstart"
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${isActive ? 'bg-[#FB923C] text-[#18181B] rk-border-sm rk-shadow-sm font-black -translate-x-0.5' : 'text-[#18181B]/80 hover:bg-[#F4F4F0]'}`}
        >
          <Terminal className="w-4 h-4 stroke-[2.5]" /> Quickstart & CLI
        </NavLink>
      </div>

      {categories.map((category) => {
        const comps = filteredComponents.filter((c) => c.category === category)
        if (comps.length === 0) return null
        return (
          <div key={category} className="space-y-1.5">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-black/50 px-2 flex items-center justify-between">
              <span>{category}</span><span className="text-[10px] font-bold opacity-60">({comps.length})</span>
            </div>
            <div className="space-y-1">
              {comps.map((comp) => (
                <NavLink
                  key={comp.id}
                  to={`/components/${comp.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) => `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${isActive ? 'bg-[#FDE047] text-[#18181B] rk-border-sm rk-shadow-sm font-black -translate-x-0.5' : 'text-[#18181B]/80 hover:bg-[#F4F4F0] hover:text-[#18181B]'}`}
                >
                  {({ isActive }) => <><span className="font-extrabold">{comp.name}</span><span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md ${isActive ? 'bg-[#18181B] text-[#FDE047]' : 'text-black/50 bg-black/5'}`}>@{comp.id}</span></>}
                </NavLink>
              ))}
            </div>
          </div>
        )
      })}
    </>
  )

  return (
    <div className="min-h-screen bg-[#F4F4F0] flex flex-col">
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        <aside className="w-64 lg:w-72 shrink-0 border-r-3 border-black bg-white p-6 space-y-6 hidden md:block min-h-[calc(100vh-65px)] sticky top-[65px] self-start overflow-y-auto max-h-[calc(100vh-65px)]">{navigation}</aside>
        <button type="button" aria-label="Open documentation navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen(true)} className="md:hidden fixed bottom-5 right-5 z-30 w-14 h-14 rounded-full bg-[#FDE047] rk-border rk-shadow-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
          <Menu className="w-6 h-6 stroke-[2.5]" />
        </button>
        {mobileOpen && <div className="md:hidden fixed inset-0 z-50 bg-black/30" onClick={() => setMobileOpen(false)} aria-hidden="true" />}
        <aside className={`md:hidden fixed inset-y-0 left-0 z-50 w-[min(88vw,22rem)] bg-white border-r-3 border-black p-5 space-y-6 overflow-y-auto transition-transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`} aria-label="Documentation navigation">
          <div className="flex items-center justify-between"><span className="font-display font-black text-lg">COMPONENTS</span><button type="button" aria-label="Close documentation navigation" onClick={() => setMobileOpen(false)} className="w-9 h-9 rounded-full rk-border-sm flex items-center justify-center"><X className="w-4 h-4" /></button></div>
          {navigation}
        </aside>

        {/* MAIN COMPONENT DOCUMENTATION CONTENT AREA */}
        <main className="flex-1 p-4 sm:p-8 lg:p-12 overflow-x-hidden min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
