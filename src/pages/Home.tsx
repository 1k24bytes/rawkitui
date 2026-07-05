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
  BarChart3
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function Home() {
  const [copied, setCopied] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  const copyCommand = () => {
    navigator.clipboard.writeText('npx shadcn add @rawkitui/button')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-20 pb-20">
      {/* HERO SECTION */}
      <section className="space-y-8 text-center max-w-4xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E9D5FF] rk-border-sm rk-shadow-sm text-xs font-mono font-bold">
          <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
          <span>UNAPOLOGETIC POP-BRUTALISM FOR REACT & TAILWIND V4</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.06]">
          SHADCN PRIMITIVES <br />
          WITH A <span className="rk-highlight rk-highlight-mint">FLASHY POP IDENTITY</span>
        </h1>

        <p className="text-lg sm:text-xl font-semibold text-[#18181B]/80 max-w-2xl mx-auto leading-relaxed">
          The opinionated component library. Thick black outlines, tactile physical press mechanics, zero-blur hard offset shadows, and cheerful pastel surface tokens.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link to="/docs/button">
            <Button variant="primary" size="lg" shape="pill">
              <BookOpen className="w-5 h-5 mr-2" /> Explore Components
            </Button>
          </Link>
          <Link to="/docs/quickstart">
            <Button variant="black" size="lg" shape="pill">
              <Terminal className="w-5 h-5 mr-2" /> Installation Guide
            </Button>
          </Link>
        </div>

        {/* Terminal Command Box */}
        <div className="max-w-md mx-auto bg-[#18181B] text-white p-3 rounded-full rk-border rk-shadow-lg flex items-center justify-between pl-5 pr-2 gap-3">
          <div className="flex items-center gap-2.5 font-mono text-xs sm:text-sm text-[#FDE047] truncate">
            <span>$</span>
            <span className="text-white/90 truncate">npx shadcn add @rawkitui/button</span>
          </div>
          <Button variant="primary" size="sm" shape="pill" onClick={copyCommand} className="text-xs shrink-0">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>

        {/* Quick Stats Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Badge variant="mint" shape="pill" className="py-1.5 px-4 text-xs">
            <CheckCircle2 className="w-4 h-4 mr-1.5 text-green-700" /> React 19 Ready
          </Badge>
          <Badge variant="peach" shape="pill" className="py-1.5 px-4 text-xs">
            <Zap className="w-4 h-4 mr-1.5 text-orange-700" /> Tailwind v4
          </Badge>
          <Badge variant="lavender" shape="pill" className="py-1.5 px-4 text-xs">
            <ShieldCheck className="w-4 h-4 mr-1.5 text-purple-700" /> 16 Components Shipped
          </Badge>
        </div>
      </section>

      {/* HERO SHOWCASE CARDS GRID */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Card 1: Analytics / Mint */}
        <Card variant="mint" className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="white" shape="pill">Analytics</Badge>
            <div className="rk-scalloped bg-[#FDE047] w-11 h-11 border-2 border-black flex items-center justify-center text-xs font-black rk-shadow-sm">
              +56%
            </div>
          </div>
          <CardHeader className="p-0">
            <CardTitle className="text-2xl">Weekly Savings</CardTitle>
            <CardDescription>Automated smart deposits</CardDescription>
          </CardHeader>
          <div className="font-mono text-3xl font-bold tracking-tight text-[#18181B]">
            $90,744 <span className="text-xs font-sans text-black/60 font-semibold">USD</span>
          </div>
          
          {/* Pill Bar Chart Demo */}
          <div className="flex items-end justify-between gap-2 h-24 pt-2">
            {[40, 75, 50, 95, 60, 85].map((h, i) => (
              <div key={i} className="flex-1 bg-white/60 rounded-full h-full p-1 flex items-end rk-border-sm">
                <div 
                  className="w-full bg-[#18181B] rounded-full transition-all duration-300" 
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Card 2: Interactive Tactile Sandbox / Yellow */}
        <Card variant="yellow" className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="black" shape="pill">Tactile Physics</Badge>
            <Sparkles className="w-5 h-5 text-black" />
          </div>
          <CardHeader className="p-0">
            <CardTitle className="text-2xl">Feel The Press</CardTitle>
            <CardDescription>Click to trigger hard drop-shadow animation</CardDescription>
          </CardHeader>
          <div className="bg-white/80 p-4 rounded-2xl rk-border-sm space-y-3 text-center">
            <div className="font-mono font-bold text-2xl">
              Clicks: <span className="text-[#FB923C]">{clickCount}</span>
            </div>
            <Button 
              variant="primary" 
              size="lg" 
              className="w-full"
              onClick={() => setClickCount(c => c + 1)}
            >
              Press Me <Flame className="w-5 h-5 ml-2 fill-orange-500" />
            </Button>
          </div>
        </Card>

        {/* Card 3: Profile / Lavender */}
        <Card variant="lavender" className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="pink" shape="pill">User Profile</Badge>
            <div className="w-8 h-8 rounded-full bg-white border-2 border-black flex items-center justify-center font-bold text-xs">
              ★
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-[#FDE047] rk-border flex items-center justify-center font-display font-extrabold text-2xl rk-shadow-sm">
              CM
            </div>
            <div>
              <h4 className="font-display font-bold text-lg">Creative Director</h4>
              <p className="text-xs font-semibold text-black/70">RawkitUI Component System</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <Link to="/docs/dialog">
              <Button variant="peach" size="sm" shape="pill">
                Try Modal <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Button variant="black" shape="fab">
              <Plus className="w-5 h-5 text-white" />
            </Button>
          </div>
        </Card>
      </section>

      {/* COMPONENT CATEGORY GRID */}
      <section className="space-y-8 max-w-6xl mx-auto">
        <div className="text-center space-y-2">
          <Badge variant="violet" shape="pill">Component Catalog</Badge>
          <h2 className="font-display text-3xl sm:text-4xl font-bold">Explore Component Pages</h2>
          <p className="text-sm font-semibold text-black/70 max-w-xl mx-auto">
            Every component lives in its own dedicated page with CLI installation commands, interactive live previews, and API prop tables.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/docs/button" className="group">
            <Card variant="white" className="h-full space-y-3 group-hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-2xl bg-[#FDE047] rk-border-sm flex items-center justify-center font-bold">
                <Layers className="w-5 h-5 text-black" />
              </div>
              <h3 className="font-display text-xl font-bold">Primitives</h3>
              <p className="text-xs font-semibold text-black/70">Button, Card, Badge, and Scalloped Starburst tags.</p>
              <div className="text-xs font-mono font-bold text-[#FB923C] flex items-center gap-1 pt-2">
                Browse Primitives <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>

          <Link to="/docs/input" className="group">
            <Card variant="peach" className="h-full space-y-3 group-hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-2xl bg-white rk-border-sm flex items-center justify-center font-bold">
                <Sliders className="w-5 h-5 text-black" />
              </div>
              <h3 className="font-display text-xl font-bold">Form Controls</h3>
              <p className="text-xs font-semibold text-black/70">Input, Textarea, Select, Switch, Radio Group, Checkbox.</p>
              <div className="text-xs font-mono font-bold text-black flex items-center gap-1 pt-2">
                Browse Forms <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>

          <Link to="/docs/dialog" className="group">
            <Card variant="lavender" className="h-full space-y-3 group-hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-2xl bg-white rk-border-sm flex items-center justify-center font-bold">
                <BarChart3 className="w-5 h-5 text-purple-700" />
              </div>
              <h3 className="font-display text-xl font-bold">Feedback & Data</h3>
              <p className="text-xs font-semibold text-black/70">Dialog Modal, Alert Banners, Tooltip, Stepper, Bar Chart.</p>
              <div className="text-xs font-mono font-bold text-purple-900 flex items-center gap-1 pt-2">
                Browse Data <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>

          <Link to="/docs/floating-nav" className="group">
            <Card variant="mint" className="h-full space-y-3 group-hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-2xl bg-white rk-border-sm flex items-center justify-center font-bold">
                <Layout className="w-5 h-5 text-green-800" />
              </div>
              <h3 className="font-display text-xl font-bold">Navigation</h3>
              <p className="text-xs font-semibold text-black/70">Floating Capsule Navbar and Capsule Pill Tabs.</p>
              <div className="text-xs font-mono font-bold text-green-900 flex items-center gap-1 pt-2">
                Browse Nav <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-20 border-t-3 border-black bg-[#18181B] text-white py-12 px-6 rounded-[32px] rk-border rk-shadow-lg max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FDE047] text-black font-display font-extrabold text-lg flex items-center justify-center">
              R
            </div>
            <span className="font-display font-extrabold text-xl">RAWKIT<span className="text-[#FB923C]">UI</span></span>
          </div>

          <p className="text-xs font-mono text-white/70 text-center">
            Built with React 19, Tailwind v4, & Base UI primitives. Open Source MIT.
          </p>
        </div>
      </footer>
    </div>
  )
}
