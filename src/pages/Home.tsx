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
import { BarChart } from '@/components/ui/bar-chart'
import { Select } from '@/components/ui/select'
import { motion } from 'motion/react'

export function Home() {
  const [copied, setCopied] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [activeTheme, setActiveTheme] = useState<'yellow' | 'mint' | 'peach' | 'lavender' | 'sky' | 'pink'>('yellow')
  const [shadowMode, setShadowMode] = useState('ink')

  const copyCommand = () => {
    navigator.clipboard.writeText('npx shadcn add @rawkitui/button')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShadowChange = (mode: string) => {
    setShadowMode(mode)
    document.documentElement.setAttribute('data-shadow', mode)
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
    <div className="space-y-16 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 font-sans">
      
      {/* MARQUEE TAPE BANNER */}
      <div className="bg-[#18181B] text-[#FDE047] py-2.5 px-4 rounded-full border-3 border-black shadow-[4px_4px_0_0_#18181b] overflow-hidden whitespace-nowrap font-mono text-xs font-black tracking-widest uppercase flex items-center justify-between">
        <div className="flex items-center gap-6 animate-pulse">
          <span>✦ POP-BRUTALISM UI</span>
          <span>✦ 16 PRIMITIVES SHIPPED</span>
          <span>✦ TAILWIND V4 READY</span>
          <span>✦ RECHARTS INTEGRATION</span>
          <span>✦ FRAMER MOTION ANIMATED</span>
        </div>
        <Badge variant="yellow" shape="pill" className="hidden md:inline-flex text-[10px]">
          v1.0 RELEASED
        </Badge>
      </div>

      {/* HERO SECTION CONTAINER BOX */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative bg-white border-4 border-black rounded-[36px] p-6 sm:p-12 lg:p-16 shadow-[12px_12px_0_0_#18181b] space-y-10 overflow-hidden"
      >
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 rk-bg-dots opacity-40 pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
          {/* Top Tilted Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#E9D5FF] border-3 border-black shadow-[4px_4px_0_0_#18181b] text-xs font-mono font-black rotate-[-2deg] hover:rotate-0 transition-transform">
            <Sparkles className="w-4 h-4 text-[#8B5CF6] stroke-[2.5]" />
            <span>THE OPINIONATED NEO-BRUTALIST COMPONENT LIBRARY</span>
          </div>

          {/* Main Giant Headline */}
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.02] uppercase">
            RAW UI PRIMITIVES <br />
            WITH <span className="rk-highlight rk-highlight-mint">POP ENERGY</span>
          </h1>

          <p className="text-lg sm:text-2xl font-extrabold text-[#18181B]/90 max-w-2xl mx-auto leading-relaxed">
            Thick 3px black outlines, Framer Motion spring physics, zero-blur hard shadows, and interactive Recharts components.
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-5 pt-2">
            <Link to="/components/button">
              <Button 
                variant="primary" 
                size="lg" 
                shape="pill"
                className="text-base px-9 py-6"
              >
                <BookOpen className="w-5 h-5 mr-2 stroke-[2.5]" /> Component Library
              </Button>
            </Link>
            <Link to="/components/quickstart">
              <Button 
                variant="black" 
                size="lg" 
                shape="pill"
                className="text-base px-9 py-6"
              >
                <Terminal className="w-5 h-5 mr-2 text-[#FDE047] stroke-[2.5]" /> Installation CLI
              </Button>
            </Link>
          </div>

          {/* CLI Terminal Installation Command Box */}
          <div className="max-w-xl mx-auto bg-[#18181B] text-white p-3.5 rounded-full border-3 border-black shadow-[6px_6px_0_0_#18181b] flex items-center justify-between pl-6 pr-2 gap-4 font-mono">
            <div className="flex items-center gap-3 text-xs sm:text-base text-[#FDE047] truncate font-bold">
              <span>$</span>
              <span className="text-white truncate">npx shadcn add @rawkitui/button</span>
            </div>
            <Button variant="primary" size="sm" shape="pill" onClick={copyCommand} className="text-xs shrink-0 font-extrabold">
              {copied ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4 stroke-[2.5]" />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Badge variant="mint" shape="pill" className="py-2 px-5 text-xs border-2 border-black font-bold">
              <CheckCircle2 className="w-4 h-4 mr-1.5 text-green-800 stroke-[2.5]" /> Motion Animated
            </Badge>
            <Badge variant="peach" shape="pill" className="py-2 px-5 text-xs border-2 border-black font-bold">
              <Zap className="w-4 h-4 mr-1.5 text-orange-800 stroke-[2.5]" /> Recharts Powered
            </Badge>
            <Badge variant="lavender" shape="pill" className="py-2 px-5 text-xs border-2 border-black font-bold">
              <ShieldCheck className="w-4 h-4 mr-1.5 text-purple-800 stroke-[2.5]" /> Lucide Vector Icons
            </Badge>
          </div>
        </div>
      </motion.section>

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
          {/* Card 1: Mint Savings Card with Recharts */}
          <Card variant="mint" isInteractive className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="white" shape="pill" className="border-2 border-black font-bold">Recharts Card</Badge>
              <Badge variant="yellow" shape="scalloped">
                +56%
              </Badge>
            </div>
            <div className="space-y-1">
              <h3 className="font-display text-2xl font-black">Weekly Balance</h3>
              <p className="text-xs font-extrabold text-black/70">Interactive Recharts Visualization</p>
            </div>
            <div className="font-mono text-3xl font-black tracking-tight text-[#18181B]">
              $90,744 <span className="text-xs font-sans font-bold text-black/60">USD</span>
            </div>
            
            {/* Recharts Bar Chart */}
            <BarChart
              height={120}
              showGrid={false}
              data={[
                { label: 'M', value: 45, color: '#18181b' },
                { label: 'T', value: 80, color: '#18181b' },
                { label: 'W', value: 55, color: '#18181b' },
                { label: 'T', value: 95, color: '#18181b' },
                { label: 'F', value: 65, color: '#18181b' },
                { label: 'S', value: 85, color: '#18181b' },
              ]}
            />
          </Card>

          {/* Card 2: Dynamic Theme Accent & Shadow Picker Card */}
          <Card variant={activeTheme} isInteractive className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="black" shape="pill">Theme & Shadow</Badge>
              <Sparkles className="w-5 h-5 text-black stroke-[2.5]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display text-2xl font-black">Swap Surface & Shadow</h3>
              <p className="text-xs font-extrabold text-black/70">Pick palette swatches & page shadow theme</p>
            </div>

            <div className="bg-white/90 p-4 rounded-2xl border-2 border-black space-y-3">
              <div className="flex items-center justify-center gap-2">
                {(['yellow', 'mint', 'peach', 'lavender', 'sky', 'pink'] as const).map((color) => (
                  <button
                    key={color}
                    onClick={() => setActiveTheme(color)}
                    className={`w-7 h-7 rounded-full border-2 border-black transition-transform cursor-pointer ${themeBgMap[color]} ${
                      activeTheme === color ? 'scale-125 shadow-[2px_2px_0_0_#18181b]' : 'hover:scale-110'
                    }`}
                  />
                ))}
              </div>

              <div className="pt-1">
                <Select
                  value={shadowMode}
                  onValueChange={handleShadowChange}
                  options={[
                    { value: 'ink', label: 'Ink Black Shadow' },
                    { value: 'yellow', label: 'Pop Yellow Shadow' },
                    { value: 'orange', label: 'Pop Orange Shadow' },
                    { value: 'violet', label: 'Pop Violet Shadow' },
                    { value: 'mint', label: 'Pop Mint Shadow' },
                    { value: 'pink', label: 'Pop Pink Shadow' },
                    { value: 'sky', label: 'Pop Sky Shadow' },
                    { value: 'soft', label: 'Soft Elevated' },
                    { value: 'none', label: 'Flat (No Shadow)' },
                  ]}
                />
              </div>
            </div>
          </Card>

          {/* Card 3: Tactile Button Press Physics Sandbox */}
          <Card variant="peach" isInteractive className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="pink" shape="pill" className="border-2 border-black">Press Physics</Badge>
              <div className="w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center font-bold text-xs">
                <Star className="w-4 h-4 text-black fill-yellow-400 stroke-[2.5]" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="font-display text-2xl font-black">Mechanical Click</h3>
              <p className="text-xs font-extrabold text-black/70">Physical button depression feel</p>
            </div>
            <div className="bg-white/90 p-4 rounded-2xl border-2 border-black space-y-3 text-center">
              <div className="font-mono font-bold text-xl">
                Clicks: <span className="text-[#FB923C] text-2xl">{clickCount}</span>
              </div>
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full font-bold"
                onClick={() => setClickCount(c => c + 1)}
              >
                Press Me <Flame className="w-5 h-5 ml-2 fill-orange-500 stroke-[2.5]" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* COMPONENT CATALOG CATEGORIES */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <Badge variant="violet" shape="pill" className="rotate-[-1deg]">Catalog</Badge>
          <h2 className="font-display text-4xl font-black uppercase">Browse By Category</h2>
          <p className="text-base font-extrabold text-black/70">
            Dedicated component pages with CLI copy commands, live previews, and API tables.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/components/button" className="group">
            <Card isInteractive className="bg-white space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FDE047] border-2 border-black flex items-center justify-center font-bold shadow-[3px_3px_0_0_#18181b]">
                  <Layers className="w-6 h-6 text-black stroke-[2.5]" />
                </div>
                <h3 className="font-display text-2xl font-extrabold">Primitives</h3>
                <p className="text-xs font-bold text-black/70 leading-relaxed">
                  Button, Card, Badge & Scalloped Starburst Tags.
                </p>
              </div>
              <div className="text-xs font-mono font-black text-[#FB923C] flex items-center gap-1.5 pt-2">
                Open Primitives <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </div>
            </Card>
          </Link>

          <Link to="/components/input" className="group">
            <Card isInteractive variant="peach" className="space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-black flex items-center justify-center font-bold shadow-[3px_3px_0_0_#18181b]">
                  <Sliders className="w-6 h-6 text-black stroke-[2.5]" />
                </div>
                <h3 className="font-display text-2xl font-extrabold">Form Controls</h3>
                <p className="text-xs font-bold text-black/70 leading-relaxed">
                  Input, Textarea, Select, Switch, Radio Group, Checkbox.
                </p>
              </div>
              <div className="text-xs font-mono font-black text-black flex items-center gap-1.5 pt-2">
                Open Form Controls <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </div>
            </Card>
          </Link>

          <Link to="/components/dialog" className="group">
            <Card isInteractive variant="lavender" className="space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-black flex items-center justify-center font-bold shadow-[3px_3px_0_0_#18181b]">
                  <BarChart3 className="w-6 h-6 text-purple-800 stroke-[2.5]" />
                </div>
                <h3 className="font-display text-2xl font-extrabold">Feedback & Data</h3>
                <p className="text-xs font-bold text-black/70 leading-relaxed">
                  Dialog Modal, Alert Banners, Tooltip, Stepper, Recharts Bar Chart.
                </p>
              </div>
              <div className="text-xs font-mono font-black text-purple-900 flex items-center gap-1.5 pt-2">
                Open Feedback <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </div>
            </Card>
          </Link>

          <Link to="/components/floating-nav" className="group">
            <Card isInteractive variant="mint" className="space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-black flex items-center justify-center font-bold shadow-[3px_3px_0_0_#18181b]">
                  <Layout className="w-6 h-6 text-green-900 stroke-[2.5]" />
                </div>
                <h3 className="font-display text-2xl font-extrabold">Navigation</h3>
                <p className="text-xs font-bold text-black/70 leading-relaxed">
                  Floating Capsule Navbar and Capsule Pill Tabs.
                </p>
              </div>
              <div className="text-xs font-mono font-black text-green-950 flex items-center gap-1.5 pt-2">
                Open Navigation <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </div>
            </Card>
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
            <h4 className="font-display text-xl font-bold text-[#E9D5FF]">Motion & Recharts</h4>
            <p className="text-xs font-semibold text-white/80 leading-relaxed">
              Framer Motion spring physics and interactive Recharts data charts out of the box.
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
            <Link to="/components/quickstart">
              <Button variant="outline" size="sm" shape="pill" className="text-xs">Quickstart</Button>
            </Link>
            <Link to="/components/button">
              <Button variant="primary" size="sm" shape="pill" className="text-xs">Components</Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
