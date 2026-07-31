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
  ExternalLink,
  Github,
  Package,
  Paintbrush
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
    navigator.clipboard.writeText('npx shadcn add @rawkitui')
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
    <div className="space-y-10 pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 font-sans">
      
      {/* MARQUEE TAPE BANNER */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#18181B] text-[#FDE047] py-2 rounded-full border-3 border-black shadow-[4px_4px_0_0_#18181b] overflow-hidden font-mono text-[11px] font-black tracking-widest uppercase"
      >
        <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-8 shrink-0 px-4">
              <span>✦ POP-BRUTALISM UI</span>
              <span>✦ 16 PRIMITIVES</span>
              <span>✦ TAILWIND V4</span>
              <span>✦ RECHARTS</span>
              <span>✦ FRAMER MOTION</span>
              <span>✦ ZERO-BLUR SHADOWS</span>
              <span>✦ SPRING PHYSICS</span>
              <span>✦ LUCIDE ICONS</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════ */}
      {/* HERO SECTION                                   */}
      {/* ═══════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.1 }}
        className="relative bg-white border-4 border-black rounded-[32px] shadow-[10px_10px_0_0_#18181b] overflow-hidden"
      >
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 rk-bg-dots opacity-[0.25] pointer-events-none" />

        {/* Hero Inner Content */}
        <div className="relative z-10 px-6 sm:px-10 lg:px-14 py-10 sm:py-14 lg:py-16">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            
            {/* Top Badge — compact and centered */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              transition={{ delay: 0.25, type: 'spring', stiffness: 400 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E9D5FF] border-2 border-black shadow-[3px_3px_0_0_#18181b] text-[11px] font-mono font-black rotate-[-2deg] hover:rotate-0 transition-transform cursor-default"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6] stroke-[2.5]" />
              <span>NEO-BRUTALIST COMPONENT LIBRARY</span>
            </motion.div>

            {/* Main Headline — 2 lines max, no highlight bar */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-black tracking-tight leading-[1.1] uppercase"
            >
              Build Bold
              <br />
              UI's With
              <br />
              <span className="text-[#EC4899]">Raw Energy</span>
            </motion.h1>

            {/* Subtitle — concise, benefit-driven */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="text-base sm:text-lg font-bold text-[#18181B] max-w-lg mx-auto leading-relaxed"
            >
              Drop-in animated components that feel tactile, look bold, and ship fast. Powered by Framer Motion, Recharts, and your Tailwind V4 stack.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-3 pt-1"
            >
              <Link to="/components/button">
                <Button 
                  variant="primary" 
                  size="lg" 
                  shape="pill"
                  className="text-sm px-7 py-5"
                >
                  <BookOpen className="w-4 h-4 mr-2 stroke-[2.5]" /> Browse Components
                </Button>
              </Link>
              <Link to="/components/quickstart">
                <Button 
                  variant="black" 
                  size="lg" 
                  shape="pill"
                  className="text-sm px-7 py-5"
                >
                  <Terminal className="w-4 h-4 mr-2 text-[#FDE047] stroke-[2.5]" /> Get Started
                </Button>
              </Link>
            </motion.div>

            {/* CLI Command */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="max-w-md mx-auto bg-[#18181B] text-white py-2.5 px-5 rounded-full border-3 border-black shadow-[5px_5px_0_0_#18181b] flex items-center justify-between gap-3 font-mono"
            >
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#FDE047] truncate font-bold">
                <span>$</span>
                <span className="text-white truncate">npx shadcn add @rawkitui</span>
              </div>
              <Button variant="primary" size="sm" shape="pill" onClick={copyCommand} className="text-[11px] shrink-0 font-extrabold px-3 py-1.5">
                {copied ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5 stroke-[2.5]" />}
                {copied ? 'Done' : 'Copy'}
              </Button>
            </motion.div>
          </div>

          {/* Feature Pills — bottom row */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-2.5 pt-6 max-w-lg mx-auto"
          >
            <Badge variant="mint" shape="pill" className="py-1.5 px-4 text-[11px] border-2 border-black font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-green-800 stroke-[2.5]" /> Motion Animated
            </Badge>
            <Badge variant="peach" shape="pill" className="py-1.5 px-4 text-[11px] border-2 border-black font-bold">
              <Zap className="w-3.5 h-3.5 mr-1 text-orange-800 stroke-[2.5]" /> Recharts
            </Badge>
            <Badge variant="lavender" shape="pill" className="py-1.5 px-4 text-[11px] border-2 border-black font-bold">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-purple-800 stroke-[2.5]" /> Lucide Icons
            </Badge>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════ */}
      {/* LIVE INTERACTIVE SHOWCASE                      */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="space-y-5">
        <div className="flex items-end justify-between">
          <div className="space-y-0.5">
            <div className="text-[11px] font-mono font-black text-[#FB923C] uppercase tracking-wider">Live Physics</div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase leading-tight">Tactile Showcase</h2>
          </div>
          <Badge variant="yellow" shape="pill" className="rotate-[2deg] text-[11px]">Pure Neo-Brutalism</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Recharts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: 0 }}
          >
            <Card variant="mint" isInteractive className="space-y-3 h-full">
              <div className="flex items-center justify-between">
                <Badge variant="white" shape="pill" className="border-2 border-black font-bold text-[11px]">Recharts Card</Badge>
                <Badge variant="yellow" shape="pill" className="text-[11px] font-black border-2 border-black">
                  <ArrowRight className="w-3 h-3 mr-1 -rotate-45 stroke-[3]" /> +56%
                </Badge>
              </div>
              <div className="space-y-0.5">
                <h3 className="font-display text-xl font-black">Weekly Balance</h3>
                <p className="text-[11px] font-bold text-black/60">Interactive data visualization</p>
              </div>
              <div className="font-mono text-2xl font-black tracking-tight text-[#18181B]">
                $90,744 <span className="text-[11px] font-sans font-bold text-black/50">USD</span>
              </div>
              
              <BarChart
                height={100}
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
          </motion.div>

          {/* Card 2: Theme & Shadow Picker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: 0.1 }}
          >
            <Card variant={activeTheme} isInteractive className="space-y-3 h-full">
              <div className="flex items-center justify-between">
                <Badge variant="black" shape="pill" className="text-[11px]">Theme & Shadow</Badge>
                <Sparkles className="w-4 h-4 text-black stroke-[2.5]" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-display text-xl font-black">Swap Surface & Shadow</h3>
                <p className="text-[11px] font-bold text-black/60">Pick palette swatches & shadow mode</p>
              </div>

              <div className="bg-white/90 p-3.5 rounded-xl border-2 border-black space-y-2.5">
                <div className="flex items-center justify-center gap-2">
                  {(['yellow', 'mint', 'peach', 'lavender', 'sky', 'pink'] as const).map((color) => (
                    <button
                      key={color}
                      onClick={() => setActiveTheme(color)}
                      className={`w-6 h-6 rounded-full border-2 border-black transition-transform cursor-pointer ${themeBgMap[color]} ${
                        activeTheme === color ? 'scale-125 shadow-[2px_2px_0_0_#18181b]' : 'hover:scale-110'
                      }`}
                    />
                  ))}
                </div>

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
            </Card>
          </motion.div>

          {/* Card 3: Press Physics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="peach" isInteractive className="space-y-3 h-full">
              <div className="flex items-center justify-between">
                <Badge variant="pink" shape="pill" className="border-2 border-black text-[11px]">Press Physics</Badge>
                <div className="w-7 h-7 rounded-full bg-white border-2 border-black flex items-center justify-center">
                  <Star className="w-3.5 h-3.5 text-black fill-yellow-400 stroke-[2.5]" />
                </div>
              </div>
              <div className="space-y-0.5">
                <h3 className="font-display text-xl font-black">Mechanical Click</h3>
                <p className="text-[11px] font-bold text-black/60">Physical button depression feel</p>
              </div>
              <div className="bg-white/90 p-3.5 rounded-xl border-2 border-black space-y-2.5 text-center">
                <div className="font-mono font-bold text-lg">
                  Clicks: <span className="text-[#FB923C] text-xl">{clickCount}</span>
                </div>
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full font-bold text-sm"
                  onClick={() => setClickCount(c => c + 1)}
                >
                  Press Me <Flame className="w-4 h-4 ml-2 fill-orange-500 stroke-[2.5]" />
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* COMPONENT CATALOG                              */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="space-y-6">
        <div className="text-center space-y-1.5 max-w-md mx-auto">
          <Badge variant="violet" shape="pill" className="rotate-[-1deg] text-[11px]">Catalog</Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-black uppercase leading-tight">Browse By Category</h2>
          <p className="text-sm font-bold text-black/60">
            Dedicated pages with CLI commands, live previews, and full API tables.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/components/button" className="group">
            <Card isInteractive className="bg-white space-y-3 h-full flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#FDE047] border-2 border-black flex items-center justify-center shadow-[3px_3px_0_0_#18181b]">
                  <Layers className="w-5 h-5 text-black stroke-[2.5]" />
                </div>
                <h3 className="font-display text-xl font-extrabold">Primitives</h3>
                <p className="text-[11px] font-bold text-black/60 leading-relaxed">
                  Button, Card, Badge & Scalloped Starburst Tags.
                </p>
              </div>
              <div className="text-[11px] font-mono font-black text-[#FB923C] flex items-center gap-1 pt-1">
                Open Primitives <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </div>
            </Card>
          </Link>

          <Link to="/components/input" className="group">
            <Card isInteractive variant="peach" className="space-y-3 h-full flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-[3px_3px_0_0_#18181b]">
                  <Sliders className="w-5 h-5 text-black stroke-[2.5]" />
                </div>
                <h3 className="font-display text-xl font-extrabold">Form Controls</h3>
                <p className="text-[11px] font-bold text-black/60 leading-relaxed">
                  Input, Textarea, Select, Switch, Radio Group, Checkbox.
                </p>
              </div>
              <div className="text-[11px] font-mono font-black text-black flex items-center gap-1 pt-1">
                Open Forms <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </div>
            </Card>
          </Link>

          <Link to="/components/dialog" className="group">
            <Card isInteractive variant="lavender" className="space-y-3 h-full flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-[3px_3px_0_0_#18181b]">
                  <BarChart3 className="w-5 h-5 text-purple-800 stroke-[2.5]" />
                </div>
                <h3 className="font-display text-xl font-extrabold">Feedback & Data</h3>
                <p className="text-[11px] font-bold text-black/60 leading-relaxed">
                  Dialog, Alert, Tooltip, Stepper, Recharts Bar Chart.
                </p>
              </div>
              <div className="text-[11px] font-mono font-black text-purple-900 flex items-center gap-1 pt-1">
                Open Feedback <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </div>
            </Card>
          </Link>

          <Link to="/components/floating-nav" className="group">
            <Card isInteractive variant="mint" className="space-y-3 h-full flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center shadow-[3px_3px_0_0_#18181b]">
                  <Layout className="w-5 h-5 text-green-900 stroke-[2.5]" />
                </div>
                <h3 className="font-display text-xl font-extrabold">Navigation</h3>
                <p className="text-[11px] font-bold text-black/60 leading-relaxed">
                  Floating Capsule Navbar and Capsule Pill Tabs.
                </p>
              </div>
              <div className="text-[11px] font-mono font-black text-green-950 flex items-center gap-1 pt-1">
                Open Navigation <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* DESIGN PRINCIPLES — dark section               */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="bg-[#18181B] text-white border-4 border-black rounded-[32px] p-7 sm:p-10 shadow-[10px_10px_0_0_#18181b] space-y-6">
        <div className="text-center space-y-1.5 max-w-md mx-auto">
          <Badge variant="yellow" shape="pill" className="text-[11px]">Why RawkitUI?</Badge>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold">Design Principles</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              num: 1,
              bg: '#FDE047',
              title: 'Shadows That Respond',
              titleColor: '#FDE047',
              desc: 'Every shadow is a signal. Press a button and watch it sink. Hover a card and see it lift. No blur, no glow — just raw, physical depth.',
            },
            {
              num: 2,
              bg: '#BBF7D0',
              title: 'Soft Edges, Sharp Identity',
              titleColor: '#BBF7D0',
              desc: 'Generous rounded corners and capsule-shaped controls give your interface a friendly, toy-like confidence that users want to touch.',
            },
            {
              num: 3,
              bg: '#E9D5FF',
              title: 'Alive Out of the Box',
              titleColor: '#E9D5FF',
              desc: 'Spring-loaded animations and interactive charts come built in. Every component feels responsive from the first render — no config needed.',
            },
          ].map((p) => (
            <div key={p.num} className="bg-white/10 p-5 rounded-2xl border-2 border-white/15 space-y-2">
              <div className="w-9 h-9 rounded-full text-black flex items-center justify-center font-black text-base" style={{ backgroundColor: p.bg }}>
                {p.num}
              </div>
              <h4 className="font-display text-lg font-bold" style={{ color: p.titleColor }}>{p.title}</h4>
              <p className="text-[12px] font-semibold text-white/70 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* FOOTER                                         */}
      {/* ═══════════════════════════════════════════════ */}
      <footer className="border-4 border-black bg-white rounded-[28px] p-6 shadow-[6px_6px_0_0_#18181b]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg overflow-hidden border-2 border-black shadow-[2px_2px_0_0_#18181b]">
              <img src="/logo.png" alt="RawkitUI" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-display font-black text-lg tracking-tight">RAWKIT<span className="text-[#FB923C]">UI</span></span>
              <p className="text-[10px] font-mono font-bold text-black/50">Pop & Playful Neo-Brutalist Library</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/components/quickstart">
              <Button variant="outline" size="sm" shape="pill" className="text-[11px]">Quickstart</Button>
            </Link>
            <Link to="/components/button">
              <Button variant="primary" size="sm" shape="pill" className="text-[11px]">Components</Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
