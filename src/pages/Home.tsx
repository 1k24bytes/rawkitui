import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Sparkles, 
  Copy, 
  Check, 
  Terminal, 
  Zap, 
  Layers, 
  ShieldCheck, 
  ArrowRight,
  Plus,
  Heart,
  Star,
  Flame,
  CheckCircle2,
  BookOpen,
  Layout,
  Sliders,
  BarChart3,
  Code,
  Palette,
  Eye,
  ChevronRight,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function Home() {
  const [copied, setCopied] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [activeTheme, setActiveTheme] = useState<'yellow' | 'mint' | 'peach' | 'lavender' | 'sky' | 'pink'>('yellow')

  const copyCommand = () => {
    navigator.clipboard.writeText('npx shadcn add @rawkitui/button')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const themeBgMap = {
    yellow: 'bg-[#FDE047]',
    mint: 'bg-[#BBF7D0]',
    peach: 'bg-[#FED7AA]',
    lavender: 'bg-[#E9D5FF]',
    sky: 'bg-[#BAE6FD]',
    pink: 'bg-[#FBCFE8]',
  }

  return (
    <div className="space-y-16 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      
      {/* MARQUEE TAPE BANNER */}
      <div className="bg-[#18181B] text-[#FDE047] py-2.5 px-4 rounded-full border-3 border-black shadow-[4px_4px_0_0_#18181b] overflow-hidden whitespace-nowrap font-mono text-xs font-black tracking-widest uppercase flex items-center justify-between">
        <div className="flex items-center gap-6 animate-pulse">
          <span>✦ POP-BRUTALISM UI</span>
          <span>✦ 16 PRIMITIVES SHIPPED</span>
          <span>✦ TAILWIND V4 READY</span>
          <span>✦ SHADCN REGISTRY SUPPORT</span>
          <span>✦ ZERO BLUR HARD SHADOWS</span>
        </div>
        <Badge variant="yellow" shape="pill" className="hidden md:inline-flex text-[10px]">
          v1.0 RELEASED
        </Badge>
      </div>

      {/* HERO SECTION CONTAINER BOX */}
      <section className="relative bg-white border-4 border-black rounded-[36px] p-6 sm:p-12 lg:p-16 shadow-[12px_12px_0_0_#18181b] space-y-10 overflow-hidden">
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 rk-bg-dots opacity-40 pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
          {/* Top Tilted Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#E9D5FF] border-3 border-black shadow-[4px_4px_0_0_#18181b] text-xs font-mono font-black rotate-[-2deg] hover:rotate-0 transition-transform">
            <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
            <span>THE OPINIONATED NEO-BRUTALIST COMPONENT LIBRARY</span>
          </div>

          {/* Main Giant Headline */}
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.02] uppercase">
            RAW UI PRIMITIVES <br />
            WITH <span className="rk-highlight rk-highlight-mint">POP ENERGY</span>
          </h1>

          <p className="text-lg sm:text-2xl font-bold text-[#18181B]/90 max-w-2xl mx-auto leading-relaxed">
            Thick 3px black outlines, tactile physical press mechanics, hard offset drop-shadows, and bright pastel color surface tokens.
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-5 pt-2">
            <Link to="/docs/button">
              <Button 
                variant="primary" 
                size="lg" 
                shape="pill"
                className="text-base px-9 py-6 shadow-[6px_6px_0_0_#18181b] hover:shadow-[8px_8px_0_0_#18181b]"
              >
                <BookOpen className="w-5 h-5 mr-2" /> Component Library
              </Button>
            </Link>
            <Link to="/docs/quickstart">
              <Button 
                variant="black" 
                size="lg" 
                shape="pill"
                className="text-base px-9 py-6 shadow-[6px_6px_0_0_#FDE047]"
              >
                <Terminal className="w-5 h-5 mr-2 text-[#FDE047]" /> Installation CLI
              </Button>
            </Link>
          </div>

          {/* CLI Terminal Installation Command Box */}
          <div className="max-w-xl mx-auto bg-[#18181B] text-white p-3.5 rounded-full border-3 border-black shadow-[6px_6px_0_0_#18181b] flex items-center justify-between pl-6 pr-2 gap-4">
            <div className="flex items-center gap-3 font-mono text-xs sm:text-base text-[#FDE047] truncate font-bold">
              <span>$</span>
              <span className="text-white truncate">npx shadcn add @rawkitui/button</span>
            </div>
            <Button variant="primary" size="sm" shape="pill" onClick={copyCommand} className="text-xs shrink-0 font-bold">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Badge variant="mint" shape="pill" className="py-2 px-5 text-xs border-2 border-black font-bold">
              <CheckCircle2 className="w-4 h-4 mr-1.5 text-green-800" /> React 19 Tested
            </Badge>
            <Badge variant="peach" shape="pill" className="py-2 px-5 text-xs border-2 border-black font-bold">
              <Zap className="w-4 h-4 mr-1.5 text-orange-800" /> Tailwind CSS v4
            </Badge>
            <Badge variant="lavender" shape="pill" className="py-2 px-5 text-xs border-2 border-black font-bold">
              <ShieldCheck className="w-4 h-4 mr-1.5 text-purple-800" /> Base UI Primitives
            </Badge>
          </div>
        </div>
      </section>

      {/* FLASHY LIVE INTERACTIVE TEASER CARDS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono font-black text-[#FB923C] uppercase tracking-wider">Live Physics</div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase">Tactile Showcase</h2>
          </div>
          <Badge variant="yellow" shape="pill" className="rotate-[2deg]">Pure Neo-Brutalism</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Mint Savings Card */}
          <div className="bg-[#BBF7D0] border-4 border-black rounded-[32px] p-6 shadow-[8px_8px_0_0_#18181b] hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#18181b] transition-all space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="white" shape="pill" className="border-2 border-black font-bold">Finance Card</Badge>
              <div className="rk-scalloped bg-[#FDE047] w-12 h-12 border-2 border-black flex items-center justify-center text-xs font-black rk-shadow-sm rotate-[5deg]">
                +56%
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="font-display text-2xl font-black">Weekly Balance</h3>
              <p className="text-xs font-bold text-black/70">Automated Smart Pill Deposit</p>
            </div>
            <div className="font-mono text-3xl font-black tracking-tight text-[#18181B]">
              $90,744 <span className="text-xs font-sans font-bold text-black/60">USD</span>
            </div>
            
            {/* Pill Bar Chart Columns */}
            <div className="flex items-end justify-between gap-2 h-24 pt-2">
              {[45, 80, 55, 95, 65, 85].map((h, i) => (
                <div key={i} className="flex-1 bg-white/70 rounded-full h-full p-1 flex items-end border-2 border-black">
                  <div 
                    className="w-full bg-[#18181B] rounded-full transition-all duration-300" 
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Dynamic Theme Accent Picker Card */}
          <div className={`${themeBgMap[activeTheme]} border-4 border-black rounded-[32px] p-6 shadow-[8px_8px_0_0_#18181b] hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#18181b] transition-all space-y-4`}>
            <div className="flex items-center justify-between">
              <Badge variant="black" shape="pill">Theme Matrix</Badge>
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display text-2xl font-black">Swap Palette Accent</h3>
              <p className="text-xs font-bold text-black/70">Click swatches to swap color live</p>
            </div>

            <div className="bg-white/90 p-4 rounded-2xl border-2 border-black space-y-3">
              <div className="flex items-center justify-center gap-2">
                {(['yellow', 'mint', 'peach', 'lavender', 'sky', 'pink'] as const).map((color) => (
                  <button
                    key={color}
                    onClick={() => setActiveTheme(color)}
                    className={`w-7 h-7 rounded-full border-2 border-black transition-transform ${themeBgMap[color]} ${
                      activeTheme === color ? 'scale-125 shadow-[2px_2px_0_0_#18181b]' : 'hover:scale-110'
                    }`}
                  />
                ))}
              </div>
              <div className="text-center font-mono font-bold text-xs">
                Active: <span className="uppercase text-purple-700">{activeTheme}</span>
              </div>
            </div>
          </div>

          {/* Card 3: Tactile Button Press Physics Sandbox */}
          <div className="bg-[#FED7AA] border-4 border-black rounded-[32px] p-6 shadow-[8px_8px_0_0_#18181b] hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#18181b] transition-all space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="pink" shape="pill" className="border-2 border-black">Press Physics</Badge>
              <div className="w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center font-bold text-xs">
                ★
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="font-display text-2xl font-black">Mechanical Click</h3>
              <p className="text-xs font-bold text-black/70">Physical button depression feel</p>
            </div>
            <div className="bg-white/90 p-4 rounded-2xl border-2 border-black space-y-3 text-center">
              <div className="font-mono font-bold text-xl">
                Clicks: <span className="text-[#FB923C] text-2xl">{clickCount}</span>
              </div>
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full font-bold shadow-[4px_4px_0_0_#18181b]"
                onClick={() => setClickCount(c => c + 1)}
              >
                Press Me <Flame className="w-5 h-5 ml-2 fill-orange-500" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* COMPONENT CATALOG CATEGORIES (Neobrutalism.dev Style) */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <Badge variant="violet" shape="pill" className="rotate-[-1deg]">Catalog</Badge>
          <h2 className="font-display text-4xl font-black uppercase">Browse By Category</h2>
          <p className="text-base font-bold text-black/70">
            Dedicated component pages with CLI copy commands, live previews, and API tables.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/docs/button" className="group">
            <div className="bg-white border-4 border-black rounded-[28px] p-6 shadow-[6px_6px_0_0_#18181b] group-hover:-translate-y-1.5 group-hover:shadow-[10px_10px_0_0_#18181b] transition-all space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FDE047] border-2 border-black flex items-center justify-center font-bold shadow-[3px_3px_0_0_#18181b]">
                  <Layers className="w-6 h-6 text-black" />
                </div>
                <h3 className="font-display text-2xl font-extrabold">Primitives</h3>
                <p className="text-xs font-bold text-black/70 leading-relaxed">
                  Button, Card, Badge & Scalloped Starburst Tags.
                </p>
              </div>
              <div className="text-xs font-mono font-black text-[#FB923C] flex items-center gap-1.5 pt-2">
                Open Primitives <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link to="/docs/input" className="group">
            <div className="bg-[#FED7AA] border-4 border-black rounded-[28px] p-6 shadow-[6px_6px_0_0_#18181b] group-hover:-translate-y-1.5 group-hover:shadow-[10px_10px_0_0_#18181b] transition-all space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-black flex items-center justify-center font-bold shadow-[3px_3px_0_0_#18181b]">
                  <Sliders className="w-6 h-6 text-black" />
                </div>
                <h3 className="font-display text-2xl font-extrabold">Form Controls</h3>
                <p className="text-xs font-bold text-black/70 leading-relaxed">
                  Input, Textarea, Select, Switch, Radio Group, Checkbox.
                </p>
              </div>
              <div className="text-xs font-mono font-black text-black flex items-center gap-1.5 pt-2">
                Open Form Controls <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link to="/docs/dialog" className="group">
            <div className="bg-[#E9D5FF] border-4 border-black rounded-[28px] p-6 shadow-[6px_6px_0_0_#18181b] group-hover:-translate-y-1.5 group-hover:shadow-[10px_10px_0_0_#18181b] transition-all space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-black flex items-center justify-center font-bold shadow-[3px_3px_0_0_#18181b]">
                  <BarChart3 className="w-6 h-6 text-purple-800" />
                </div>
                <h3 className="font-display text-2xl font-extrabold">Feedback & Data</h3>
                <p className="text-xs font-bold text-black/70 leading-relaxed">
                  Dialog Modal, Alert Banners, Tooltip, Stepper, Bar Chart.
                </p>
              </div>
              <div className="text-xs font-mono font-black text-purple-900 flex items-center gap-1.5 pt-2">
                Open Feedback <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link to="/docs/floating-nav" className="group">
            <div className="bg-[#BBF7D0] border-4 border-black rounded-[28px] p-6 shadow-[6px_6px_0_0_#18181b] group-hover:-translate-y-1.5 group-hover:shadow-[10px_10px_0_0_#18181b] transition-all space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-black flex items-center justify-center font-bold shadow-[3px_3px_0_0_#18181b]">
                  <Layout className="w-6 h-6 text-green-900" />
                </div>
                <h3 className="font-display text-2xl font-extrabold">Navigation</h3>
                <p className="text-xs font-bold text-black/70 leading-relaxed">
                  Floating Capsule Navbar and Capsule Pill Tabs.
                </p>
              </div>
              <div className="text-xs font-mono font-black text-green-950 flex items-center gap-1.5 pt-2">
                Open Navigation <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* DESIGN PILLARS GRID */}
      <section className="bg-[#18181B] text-white border-4 border-black rounded-[36px] p-8 sm:p-12 shadow-[12px_12px_0_0_#18181b] space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <Badge variant="yellow" shape="pill">Why RawkitUI?</Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold">Design Principles</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 p-6 rounded-2xl border-2 border-white/20 space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#FDE047] text-black flex items-center justify-center font-black text-lg">
              1
            </div>
            <h4 className="font-display text-xl font-bold text-[#FDE047]">Zero-Blur Shadows</h4>
            <p className="text-xs font-semibold text-white/80 leading-relaxed">
              Solid black 4px–6px drop shadows serving as physical interactive feedback rather than decoration.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl border-2 border-white/20 space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#BBF7D0] text-black flex items-center justify-center font-black text-lg">
              2
            </div>
            <h4 className="font-display text-xl font-bold text-[#BBF7D0]">Hyper-Rounded Shapes</h4>
            <p className="text-xs font-semibold text-white/80 leading-relaxed">
              28px superellipse card corners, capsule pill controls, and scalloped starburst badges.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl border-2 border-white/20 space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#E9D5FF] text-black flex items-center justify-center font-black text-lg">
              3
            </div>
            <h4 className="font-display text-xl font-bold text-[#E9D5FF]">Shadcn Infrastructure</h4>
            <p className="text-xs font-semibold text-white/80 leading-relaxed">
              Distributed as a custom shadcn registry. Add components directly via standard CLI commands.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-4 border-black bg-white rounded-[32px] p-8 shadow-[8px_8px_0_0_#18181b]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FDE047] text-black border-2 border-black font-display font-extrabold text-xl flex items-center justify-center shadow-[3px_3px_0_0_#18181b]">
              R
            </div>
            <div>
              <span className="font-display font-black text-xl tracking-tight">RAWKIT<span className="text-[#FB923C]">UI</span></span>
              <p className="text-[11px] font-mono font-bold text-black/60">Pop & Playful Neo-Brutalist Library</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/docs/quickstart">
              <Button variant="outline" size="sm" shape="pill" className="text-xs">Quickstart</Button>
            </Link>
            <Link to="/docs/button">
              <Button variant="primary" size="sm" shape="pill" className="text-xs">Components</Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
