import { useState } from 'react'
import { 
  Sparkles, 
  Copy, 
  Check, 
  Terminal, 
  Zap, 
  Layers, 
  Layout, 
  ShieldCheck, 
  Plus,
  Heart,
  Search,
  Star,
  Flame,
  CheckCircle2,
  Bell,
  MessageSquare,
  Sliders,
  BarChart3,
  HelpCircle,
  Code,
  Eye,
  Palette,
  CheckSquare
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { RadioGroup } from '@/components/ui/radio'
import { Tabs } from '@/components/ui/tabs'
import { Tooltip } from '@/components/ui/tooltip'
import { Stepper } from '@/components/ui/stepper'
import { BarChart } from '@/components/ui/bar-chart'
import { FloatingNav } from '@/components/ui/floating-nav'
import { Dialog } from '@/components/ui/dialog'
import { Alert } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'

export default function App() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('components')
  const [activeComponentFilter, setActiveComponentFilter] = useState<'all' | 'buttons' | 'cards' | 'badges' | 'inputs' | 'controls' | 'advanced' | 'dialogs'>('all')
  const [clickCount, setClickCount] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [checkedState, setCheckedState] = useState(true)
  const [switchState, setSwitchState] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState('pro')
  const [currentStep, setCurrentStep] = useState(2)
  const [selectedThemeColor, setSelectedThemeColor] = useState<'mint' | 'peach' | 'lavender' | 'sky' | 'pink' | 'yellow'>('yellow')
  const [codeMode, setCodeMode] = useState<Record<string, boolean>>({})
  const [selectedComponents, setSelectedComponents] = useState<string[]>(['button'])

  const copyCommand = (cmd: string = 'npx shadcn add @rawkitui/button') => {
    navigator.clipboard.writeText(cmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleComponentSelection = (comp: string) => {
    setSelectedComponents(prev => 
      prev.includes(comp) ? prev.filter(c => c !== comp) : [...prev, comp]
    )
  }

  const generatedRegistryCmd = `npx shadcn add ${selectedComponents.map(c => `@rawkitui/${c}`).join(' ')}`

  const toggleCodeMode = (id: string) => {
    setCodeMode(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const themeClassMap = {
    yellow: 'bg-[#FDE047]',
    mint: 'bg-[#BBF7D0]',
    peach: 'bg-[#FED7AA]',
    lavender: 'bg-[#E9D5FF]',
    sky: 'bg-[#BAE6FD]',
    pink: 'bg-[#FBCFE8]',
  }

  return (
    <div className="min-h-screen bg-[#F4F4F0] text-[#18181B] pb-28">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#F4F4F0]/90 backdrop-blur-md border-b-3 border-black px-4 lg:px-12 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl ${themeClassMap[selectedThemeColor]} rk-border rk-shadow-sm flex items-center justify-center font-display font-extrabold text-xl transition-colors duration-200`}>
            R
          </div>
          <div>
            <span className="font-display font-black text-xl tracking-tight">RAWKIT<span className="text-[#FB923C]">UI</span></span>
            <Badge variant="yellow" shape="pill" className="ml-2.5 text-[10px] py-0.5">v1.0 Complete</Badge>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Tooltip content="GitHub Repository">
            <Button variant="outline" size="sm" shape="pill" onClick={() => window.open('https://github.com', '_blank')}>
              <Star className="w-4 h-4 mr-1.5 fill-[#FDE047]" /> Star on GitHub
            </Button>
          </Tooltip>
          <Tooltip content="Copy Registry Command">
            <Button variant="primary" size="sm" shape="pill" onClick={() => copyCommand()}>
              <Terminal className="w-4 h-4 mr-1.5" /> Registry
            </Button>
          </Tooltip>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12 space-y-16">
        
        {/* HERO SECTION */}
        <section className="space-y-8 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E9D5FF] rk-border-sm rk-shadow-sm text-xs font-mono font-bold">
            <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
            <span>NEO-BRUTALISM MEETS PLAYFUL PASTELS</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]">
            SHADCN PRIMITIVES <br />
            WITH A <span className="rk-highlight rk-highlight-mint">POP IDENTITY</span>
          </h1>

          <p className="text-lg sm:text-xl font-semibold text-[#18181B]/80 max-w-2xl mx-auto leading-relaxed">
            The opinionated component library for modern web apps. Thick black outlines, tactile press mechanics, hard offset shadows, and cheerful pastel surface tokens.
          </p>

          {/* Terminal Command Box */}
          <div className="max-w-xl mx-auto bg-[#18181B] text-white p-3 rounded-full rk-border rk-shadow-lg flex items-center justify-between pl-5 pr-2 gap-3">
            <div className="flex items-center gap-2.5 font-mono text-xs sm:text-sm text-[#FDE047] truncate">
              <span>$</span>
              <span className="text-white/90 truncate">{generatedRegistryCmd}</span>
            </div>
            <Button variant="primary" size="sm" shape="pill" onClick={() => copyCommand(generatedRegistryCmd)} className="text-xs shrink-0">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>

          {/* DYNAMIC PALETTE THEME SWITCHER BAR */}
          <div className="flex items-center justify-center gap-3 bg-white p-2.5 rounded-full rk-border rk-shadow-sm max-w-md mx-auto">
            <span className="text-xs font-mono font-bold text-black/70 flex items-center gap-1.5 ml-2">
              <Palette className="w-4 h-4 text-purple-600" /> Theme Accent:
            </span>
            {(['yellow', 'mint', 'peach', 'lavender', 'sky', 'pink'] as const).map((color) => (
              <button
                key={color}
                onClick={() => setSelectedThemeColor(color)}
                className={`w-7 h-7 rounded-full rk-border-sm transition-transform ${themeClassMap[color]} ${
                  selectedThemeColor === color ? 'scale-125 shadow-[2px_2px_0_0_#18181b]' : 'hover:scale-110'
                }`}
              />
            ))}
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
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

          {/* Card 2: Interactive Tactile Sandbox / Theme Dynamic */}
          <Card variant={selectedThemeColor} className="space-y-4">
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
              <Button variant="peach" size="sm" shape="pill" onClick={() => setIsDialogOpen(true)}>
                <MessageSquare className="w-4 h-4 mr-1 text-black" /> Open Modal
              </Button>
              <Button variant="black" shape="fab">
                <Plus className="w-5 h-5 text-white" />
              </Button>
            </div>
          </Card>
        </section>

        {/* MULTI-COMPONENT REGISTRY BUILDER CARD */}
        <section className="bg-white p-6 sm:p-8 rounded-[32px] rk-border rk-shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-bold text-[#FB923C] uppercase tracking-wider">Custom Installer</div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold">Registry Component Builder</h2>
              <p className="text-sm font-semibold text-black/70">
                Select components to generate custom bundle installation commands.
              </p>
            </div>
            <Badge variant="yellow" shape="pill">{selectedComponents.length} Selected</Badge>
          </div>

          {/* Component Selection Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              'button', 'card', 'badge', 'floating-nav', 'input', 
              'textarea', 'select', 'switch', 'radio', 'tabs', 
              'tooltip', 'stepper', 'bar-chart', 'dialog', 'alert', 'checkbox'
            ].map((comp) => {
              const isSel = selectedComponents.includes(comp)
              return (
                <button
                  key={comp}
                  onClick={() => toggleComponentSelection(comp)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all duration-150 flex items-center gap-1.5 ${
                    isSel 
                      ? 'bg-[#18181B] text-[#FDE047] rk-border-sm rk-shadow-sm' 
                      : 'bg-[#F4F4F0] text-[#18181B] rk-border-sm hover:bg-black/10'
                  }`}
                >
                  <Check className={`w-3.5 h-3.5 ${isSel ? 'opacity-100' : 'opacity-0'}`} />
                  @{comp}
                </button>
              )
            })}
          </div>

          {/* Command Code Box */}
          <div className="bg-[#18181B] text-white p-4 rounded-2xl rk-border flex items-center justify-between gap-4 font-mono text-xs sm:text-sm">
            <span className="text-[#FDE047] truncate">{generatedRegistryCmd}</span>
            <Button variant="primary" size="sm" shape="pill" onClick={() => copyCommand(generatedRegistryCmd)} className="shrink-0">
              {copied ? 'Copied!' : 'Copy Command'}
            </Button>
          </div>
        </section>

        {/* ALERTS & NOTIFICATIONS SHOWCASE */}
        <section className="space-y-4">
          <div className="text-xs font-mono font-bold text-[#FB923C] uppercase tracking-wider">Alerts & Notifications</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Alert 
              variant="warning" 
              title="Pop Notification Alert" 
              description="High-contrast pop alert box with zero-blur black shadow and solid borders."
            />
            <Alert 
              variant="success" 
              title="Phase 5 Shipped & Verified!" 
              description="Full 5-phase Pop-Brutalist library, registry pipeline, & code inspector completed."
            />
          </div>
        </section>

        {/* INTERACTIVE COMPONENT PLAYGROUND & CODE INSPECTOR */}
        <section className="space-y-8 pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono font-bold text-[#FB923C] uppercase tracking-wider">Live Library & Inspection</div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold">Component Playground</h2>
            </div>
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {(['all', 'buttons', 'cards', 'badges', 'inputs', 'controls', 'advanced'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveComponentFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase transition-all duration-150 ${
                    activeComponentFilter === filter
                      ? 'bg-[#18181B] text-[#FDE047] rk-border-sm rk-shadow-sm'
                      : 'bg-white text-[#18181B] rk-border-sm hover:bg-black/5'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* BUTTON VARIANTS SHOWCASE WITH CODE INSPECTOR */}
            {(activeComponentFilter === 'all' || activeComponentFilter === 'buttons') && (
              <Card variant="white" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-bold flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#FB923C]" /> Button Component
                  </h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    shape="pill" 
                    onClick={() => toggleCodeMode('button')}
                    className="text-xs"
                  >
                    {codeMode['button'] ? <Eye className="w-3.5 h-3.5 mr-1" /> : <Code className="w-3.5 h-3.5 mr-1" />}
                    {codeMode['button'] ? 'Preview' : 'Code'}
                  </Button>
                </div>

                {codeMode['button'] ? (
                  <pre className="bg-[#18181B] text-[#FDE047] p-4 rounded-2xl rk-border font-mono text-xs overflow-x-auto">
{`import { Button } from "@/components/ui/button"

<Button variant="primary" shape="pill">Primary CTA</Button>
<Button variant="peach" shape="square">Square</Button>
<Button variant="yellow" shape="fab"><Plus /></Button>`}
                  </pre>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-black/70">
                      Multiple tactile shapes, pastels, and physical press animations.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <Button variant="primary" size="md">Primary CTA</Button>
                      <Button variant="secondary" size="md">Secondary</Button>
                      <Button variant="accent" size="md">Accent</Button>
                      <Button variant="mint" size="md">Mint Pastel</Button>
                      <Button variant="peach" size="md">Peach Pastel</Button>
                      <Button variant="pink" size="md">Pink Pill</Button>
                      <Button variant="black" size="md">Ink Solid</Button>
                      <Button variant="outline" size="md">Outline</Button>
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t-2 border-black/10">
                      <span className="text-xs font-mono font-bold text-black/60">Shapes:</span>
                      <Button variant="primary" shape="pill" size="sm">Capsule Pill</Button>
                      <Button variant="peach" shape="square" size="sm">Square-ish</Button>
                      <Button variant="yellow" shape="fab">
                        <Plus className="w-5 h-5 text-black" />
                      </Button>
                    </div>
                  </>
                )}
              </Card>
            )}

            {/* BADGES & STARBURSTS SHOWCASE */}
            {(activeComponentFilter === 'all' || activeComponentFilter === 'badges') && (
              <Card variant="peach" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-bold flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-600" /> Badges & Scalloped Starbursts
                  </h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    shape="pill" 
                    onClick={() => toggleCodeMode('badge')}
                    className="text-xs"
                  >
                    {codeMode['badge'] ? <Eye className="w-3.5 h-3.5 mr-1" /> : <Code className="w-3.5 h-3.5 mr-1" />}
                    {codeMode['badge'] ? 'Preview' : 'Code'}
                  </Button>
                </div>

                {codeMode['badge'] ? (
                  <pre className="bg-[#18181B] text-[#BBF7D0] p-4 rounded-2xl rk-border font-mono text-xs overflow-x-auto">
{`import { Badge } from "@/components/ui/badge"

<Badge variant="yellow" shape="pill">Pill Tag</Badge>
<Badge variant="mint" shape="scalloped">56%</Badge>`}
                  </pre>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-black/70">
                      Niche wave starburst badges (`.rk-scalloped`) and capsule tags for discount callouts.
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <Badge variant="yellow" shape="pill">Pill Tag</Badge>
                      <Badge variant="mint" shape="pill">Mint Tag</Badge>
                      <Badge variant="violet" shape="pill">Violet Tag</Badge>
                      <Badge variant="black" shape="pill">Black Tag</Badge>
                    </div>

                    <div className="pt-2 flex items-center gap-6">
                      <div className="space-y-1 text-center">
                        <div className="rk-scalloped bg-[#FDE047] w-14 h-14 border-2 border-black flex items-center justify-center text-xs font-black rk-shadow-sm mx-auto">
                          56%
                        </div>
                        <span className="text-[11px] font-mono font-bold">56% Scalloped</span>
                      </div>

                      <div className="space-y-1 text-center">
                        <div className="rk-scalloped bg-[#BBF7D0] w-14 h-14 border-2 border-black flex items-center justify-center text-xs font-black rk-shadow-sm mx-auto">
                          NEW!
                        </div>
                        <span className="text-[11px] font-mono font-bold">NEW! Scalloped</span>
                      </div>

                      <div className="space-y-1 text-center">
                        <div className="rk-scalloped bg-[#FBCFE8] w-14 h-14 border-2 border-black flex items-center justify-center text-xs font-black rk-shadow-sm mx-auto">
                          ★ 10
                        </div>
                        <span className="text-[11px] font-mono font-bold">Star Scalloped</span>
                      </div>
                    </div>
                  </>
                )}
              </Card>
            )}
          </div>
        </section>

        {/* FLOATING NAVBAR DEMO SECTION */}
        <section className="bg-white p-8 rounded-[32px] rk-border rk-shadow-lg text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-2">
            <Badge variant="violet" shape="pill">Signature Component</Badge>
            <h2 className="font-display text-3xl font-bold">Floating Capsule Navbar</h2>
            <p className="text-sm font-semibold text-black/70">
              Interactive floating capsule bar pinned to layout bottom with active tab states.
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            <FloatingNav 
              activeTab={activeTab} 
              onTabChange={setActiveTab}
            />
          </div>
        </section>

      </main>

      {/* POP DIALOG MODAL */}
      <Dialog 
        open={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)}
        title="RawkitUI Pop Dialog"
        description="This modal primitive uses Radix/Base UI accessible overlay mechanics paired with Pop-Brutalist design tokens."
        variant="lavender"
      >
        <div className="space-y-4 pt-2">
          <div className="bg-white/80 p-4 rounded-2xl rk-border-sm font-semibold text-sm">
            <p className="text-black/80">
              ✨ Includes auto focus-trap, ESC keyboard navigation, backdrop blur overlay, and custom pastel surface themes.
            </p>
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="primary" size="md" className="flex-1" onClick={() => setIsDialogOpen(false)}>
              Got it!
            </Button>
            <Button variant="outline" size="md" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Dialog>

      {/* FIXED BOTTOM FLOATING NAVIGATION BAR */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <FloatingNav 
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
      </div>

      {/* FOOTER */}
      <footer className="mt-20 border-t-3 border-black bg-[#18181B] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
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
