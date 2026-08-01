import { useState } from 'react'
import { useLocation, Link as RouterLink } from 'react-router-dom'
import { Star, Terminal, BookOpen, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export interface HeaderProps {
  onOpenSearch?: () => void
}

export function Header({ onOpenSearch }: HeaderProps) {
  const location = useLocation()
  const [copied, setCopied] = useState(false)

  const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0

  const copyCommand = () => {
    navigator.clipboard.writeText('npx shadcn add @rawkitui')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isDocs = location.pathname.startsWith('/components')

  return (
    <header className="sticky top-0 z-40 bg-[#F4F4F0]/90 backdrop-blur-md border-b-3 border-black px-4 lg:px-12 py-3.5 flex items-center justify-between font-sans">
      <div className="flex items-center gap-6">
        <RouterLink to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-black shadow-[2px_2px_0_0_#18181b] group-hover:scale-105 transition-transform">
            <img src="/logo.png" alt="RawkitUI" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-display font-black text-xl tracking-tight">
              RAWKIT<span className="text-[#EC4899]">UI</span>
            </span>
            <Badge variant="yellow" shape="pill" className="ml-2.5 text-[10px] py-0.5">
              v1.0
            </Badge>
          </div>
        </RouterLink>

        {/* Primary Nav Links */}
        <nav className="hidden md:flex items-center gap-2">
          <RouterLink
            to="/"
            className={`px-4 py-1.5 rounded-full font-display font-bold text-xs tracking-wide transition-all ${
              !isDocs
                ? 'bg-[#18181B] text-[#FDE047] rk-border-sm rk-shadow-sm'
                : 'text-[#18181B] hover:bg-black/5'
            }`}
          >
            Home
          </RouterLink>
          <RouterLink
            to="/components/button"
            className={`px-4 py-1.5 rounded-full font-display font-bold text-xs tracking-wide transition-all flex items-center gap-1.5 ${
              isDocs
                ? 'bg-[#18181B] text-[#FDE047] rk-border-sm rk-shadow-sm'
                : 'text-[#18181B] hover:bg-black/5'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 stroke-[2.5]" /> Components Docs
          </RouterLink>
        </nav>
      </div>

      <div className="flex items-center gap-2.5">
        {/* Global Cmd + K / Ctrl + K Search Trigger Button */}
        {onOpenSearch && (
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-[#18181B] bg-white hover:bg-[#FDE047]/30 rk-shadow-xs text-xs font-bold text-[#18181B] transition-all cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">Search components...</span>
            <kbd className="font-mono text-[10px] font-black bg-[#18181B] text-[#FDE047] px-1.5 py-0.5 rounded border border-[#18181B]">
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

        <Button variant="primary" size="sm" shape="pill" onClick={copyCommand}>
          <Terminal className="w-4 h-4 mr-1.5 stroke-[2.5]" /> {copied ? 'Copied!' : 'Registry CLI'}
        </Button>
      </div>
    </header>
  )
}
