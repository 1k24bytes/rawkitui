import { useState } from 'react'
import { useLocation, Link as RouterLink } from 'react-router-dom'
import { Star, Terminal, BookOpen, Search, Menu, X, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export interface HeaderProps {
  onOpenSearch?: () => void
}

export function Header({ onOpenSearch }: HeaderProps) {
  const location = useLocation()
  const [copied, setCopied] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0

  const copyCommand = () => {
    navigator.clipboard.writeText('npx shadcn add @rawkitui')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isDocs = location.pathname.startsWith('/components')

  return (
    <header className="sticky top-0 z-40 bg-[#F4F4F0]/95 backdrop-blur-md border-b-3 border-black px-3 sm:px-6 lg:px-12 py-3 font-sans">
      <div className="flex items-center justify-between gap-2 max-w-7xl mx-auto">
        {/* Brand Logo & Desktop Nav */}
        <div className="flex items-center gap-4 lg:gap-6 shrink-0">
          <RouterLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border-2 border-black shadow-[2px_2px_0_0_#18181b] group-hover:scale-105 transition-transform shrink-0">
              <img src="/logo.png" alt="RawkitUI" className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-lg sm:text-xl tracking-tight">
                RAWKIT<span className="text-[#EC4899]">UI</span>
              </span>
              <Badge variant="yellow" shape="pill" className="hidden sm:inline-flex text-[10px] py-0.5 px-2">
                v1.0
              </Badge>
            </div>
          </RouterLink>

          {/* Primary Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-2">
            <RouterLink
              to="/"
              className={`px-3.5 py-1.5 rounded-full font-display font-bold text-xs tracking-wide transition-all ${
                !isDocs
                  ? 'bg-[#18181B] text-[#FDE047] rk-border-sm rk-shadow-sm'
                  : 'text-[#18181B] hover:bg-black/5'
              }`}
            >
              Home
            </RouterLink>
            <RouterLink
              to="/components/button"
              className={`px-3.5 py-1.5 rounded-full font-display font-bold text-xs tracking-wide transition-all flex items-center gap-1.5 ${
                isDocs
                  ? 'bg-[#18181B] text-[#FDE047] rk-border-sm rk-shadow-sm'
                  : 'text-[#18181B] hover:bg-black/5'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 stroke-[2.5]" /> Components Docs
            </RouterLink>
          </nav>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Search Trigger Button */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full border-2 border-[#18181B] bg-white hover:bg-[#FDE047]/30 rk-shadow-xs text-xs font-bold text-[#18181B] transition-all cursor-pointer"
              aria-label="Search components"
            >
              <Search className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-block font-mono text-[10px] font-black bg-[#18181B] text-[#FDE047] px-1.5 py-0.5 rounded border border-[#18181B]">
                {isMac ? '⌘K' : 'Ctrl+K'}
              </kbd>
            </button>
          )}

          <Button
            variant="outline"
            size="sm"
            shape="pill"
            onClick={() => window.open('https://github.com/1k24bytes/rawkitui', '_blank')}
            className="hidden md:inline-flex"
          >
            <Star className="w-4 h-4 mr-1.5 fill-[#FDE047] stroke-[2.5]" /> Star
          </Button>

          <Button variant="primary" size="sm" shape="pill" onClick={copyCommand} className="hidden sm:inline-flex">
            <Terminal className="w-4 h-4 mr-1.5 stroke-[2.5]" /> {copied ? 'Copied!' : 'Registry CLI'}
          </Button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-xl border-2 border-black bg-white active:translate-y-0.5 rk-shadow-sm text-black hover:bg-yellow-200 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 bg-white rounded-2xl border-3 border-black rk-shadow-lg flex flex-col gap-3 font-sans animate-in slide-in-from-top-2 duration-150">
          <RouterLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl font-display font-bold text-sm flex items-center justify-between border-2 border-black transition-all ${
              !isDocs ? 'bg-[#18181B] text-[#FDE047] rk-shadow-sm' : 'bg-[#F4F4F0] text-black hover:bg-yellow-100'
            }`}
          >
            Home
          </RouterLink>

          <RouterLink
            to="/components/button"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl font-display font-bold text-sm flex items-center gap-2 border-2 border-black transition-all ${
              isDocs ? 'bg-[#18181B] text-[#FDE047] rk-shadow-sm' : 'bg-[#F4F4F0] text-black hover:bg-yellow-100'
            }`}
          >
            <BookOpen className="w-4 h-4 stroke-[2.5]" /> Components Docs
          </RouterLink>

          <div className="pt-2 border-t-2 border-dashed border-black/20 flex flex-col gap-2">
            <Button variant="primary" size="md" shape="default" onClick={() => { copyCommand(); setMobileMenuOpen(false); }} className="w-full justify-center">
              <Terminal className="w-4 h-4 mr-2 stroke-[2.5]" /> {copied ? 'Copied npx command!' : 'Copy Registry CLI Command'}
            </Button>

            <Button
              variant="outline"
              size="md"
              shape="default"
              onClick={() => { window.open('https://github.com/1k24bytes/rawkitui', '_blank'); setMobileMenuOpen(false); }}
              className="w-full justify-center"
            >
              <Github className="w-4 h-4 mr-2 stroke-[2.5]" /> GitHub Repository
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
