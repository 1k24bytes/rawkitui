import { useState } from 'react'
import { useLocation, Link as RouterLink } from 'react-router-dom'
import { Star, Terminal, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function Header() {
  const location = useLocation()
  const [copied, setCopied] = useState(false)

  const copyCommand = () => {
    navigator.clipboard.writeText('npx shadcn add @rawkitui/button')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isDocs = location.pathname.startsWith('/docs')

  return (
    <header className="sticky top-0 z-40 bg-[#F4F4F0]/90 backdrop-blur-md border-b-3 border-black px-4 lg:px-12 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <RouterLink to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-[#FDE047] rk-border rk-shadow-sm flex items-center justify-center font-display font-extrabold text-xl group-hover:scale-105 transition-transform">
            R
          </div>
          <div>
            <span className="font-display font-black text-xl tracking-tight">
              RAWKIT<span className="text-[#FB923C]">UI</span>
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
            to="/docs/button"
            className={`px-4 py-1.5 rounded-full font-display font-bold text-xs tracking-wide transition-all flex items-center gap-1.5 ${
              isDocs
                ? 'bg-[#18181B] text-[#FDE047] rk-border-sm rk-shadow-sm'
                : 'text-[#18181B] hover:bg-black/5'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Components Docs
          </RouterLink>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          shape="pill"
          onClick={() => window.open('https://github.com', '_blank')}
        >
          <Star className="w-4 h-4 mr-1.5 fill-[#FDE047]" /> Star on GitHub
        </Button>

        <Button variant="primary" size="sm" shape="pill" onClick={copyCommand}>
          <Terminal className="w-4 h-4 mr-1.5" /> {copied ? 'Copied!' : 'Registry CLI'}
        </Button>
      </div>
    </header>
  )
}
