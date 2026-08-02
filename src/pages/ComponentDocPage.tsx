import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { COMPONENTS_DATA } from '@/data/componentsData'
import { 
  Terminal, 
  Copy, 
  Check, 
  Code, 
  Eye, 
  Sparkles, 
  Flame, 
  Plus, 
  Star,
  CheckCircle2,
  Mail,
  ArrowRight,
  Layers,
  User,
  Settings,
  Bot,
  Zap,
  Shield
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
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
import { Accordion } from '@/components/ui/accordion'
import { Avatar, AvatarGroup } from '@/components/ui/avatar'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Calendar } from '@/components/ui/calendar'
import { Command } from '@/components/ui/command'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { Pagination } from '@/components/ui/pagination'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { ToastProvider, useToast } from '@/components/ui/sonner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Slider } from '@/components/ui/slider'
import { ToggleGroup } from '@/components/ui/toggle-group'
import { Marquee } from '@/components/ui/marquee'
import { Kbd } from '@/components/ui/kbd'
import { Sheet } from '@/components/ui/sheet'
import { Popover } from '@/components/ui/popover'
import { CopyButton } from '@/components/ui/copy-button'
import { NumberInput } from '@/components/ui/number-input'
import { OTPInput } from '@/components/ui/otp-input'
import { Rating } from '@/components/ui/rating'
import { Collapsible } from '@/components/ui/collapsible'

function ExampleBlock({
  title,
  description,
  codeSnippet,
  isTallPreview = false,
  children,
}: {
  title: string
  description?: string
  codeSnippet: string
  isTallPreview?: boolean
  children: React.ReactNode
}) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-3 pt-4 border-t-2 border-black/10 first:border-t-0 first:pt-0 font-sans">
      <div className="space-y-1">
        <h3 className="font-display text-xl font-black text-[#18181B]">{title}</h3>
        {description && (
          <p className="text-xs font-bold text-[#18181B]/70">{description}</p>
        )}
      </div>

      <div className="space-y-3">
        {/* Toggle Bar */}
        <div className="flex items-center justify-between border-b-2 border-black/10 pb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3.5 py-1.5 rounded-full font-display font-extrabold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'preview'
                  ? 'bg-[#18181B] text-[#FDE047] rk-border-sm rk-shadow-sm'
                  : 'text-[#18181B] hover:bg-black/5'
              }`}
            >
              <Eye className="w-3.5 h-3.5 stroke-[2.5]" /> Preview
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3.5 py-1.5 rounded-full font-display font-extrabold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'code'
                  ? 'bg-[#18181B] text-[#FDE047] rk-border-sm rk-shadow-sm'
                  : 'text-[#18181B] hover:bg-black/5'
              }`}
            >
              <Code className="w-3.5 h-3.5 stroke-[2.5]" /> Code
            </button>
          </div>

          <Button variant="outline" size="sm" shape="pill" onClick={handleCopy} className="text-xs">
            {copied ? <Check className="w-3.5 h-3.5 mr-1 stroke-[3]" /> : <Copy className="w-3.5 h-3.5 mr-1 stroke-[2.5]" />}
            {copied ? 'Copied' : 'Copy Code'}
          </Button>
        </div>

        {/* Content Preview / Code */}
        {activeTab === 'preview' ? (
          <div className={`bg-white p-8 sm:p-10 rounded-[28px] rk-border rk-shadow-md flex items-center justify-center overflow-x-auto relative ${
            isTallPreview ? 'min-h-[260px] sm:min-h-[300px]' : 'min-h-[140px]'
          }`}>
            {children}
          </div>
        ) : (
          <pre className="bg-[#18181B] text-[#FDE047] p-5 rounded-[24px] rk-border font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed">
            <code>{codeSnippet}</code>
          </pre>
        )}
      </div>
    </div>
  )
}

function ToastPreview() {
  const { toast } = useToast()

  return (
    <Button variant="primary" onClick={() => toast({ title: 'Theme saved', description: 'Your RawkitUI theme is ready to use.', variant: 'success' })}>
      Show success toast
    </Button>
  )
}

export function ComponentDocPage() {
  const { id } = useParams<{ id: string }>()
  const [copiedCli, setCopiedCli] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [switchVal, setSwitchVal] = useState(true)
  const [checkboxVal, setCheckboxVal] = useState(true)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [shadowMode, setShadowMode] = useState('ink')

  const component = (id && COMPONENTS_DATA[id]) || COMPONENTS_DATA['button']

  useEffect(() => {
    window.scrollTo(0, 0)
    const currentMode = document.documentElement.getAttribute('data-shadow') || 'ink'
    setShadowMode(currentMode)
  }, [id])

  const handleShadowChange = (mode: string) => {
    setShadowMode(mode)
    document.documentElement.setAttribute('data-shadow', mode)
  }

  const copyCli = () => {
    navigator.clipboard.writeText(component.cliCommand)
    setCopiedCli(true)
    setTimeout(() => setCopiedCli(false), 2000)
  }

  // Render specific live preview for structured example items
  const renderExamplePreview = (exampleId: string) => {
    switch (exampleId) {
      case 'primary':
        return <Button variant="primary">Primary CTA</Button>

      case 'secondary':
        return (
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Button variant="secondary">Secondary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="mint">Pastel Mint</Button>
            <Button variant="peach">Pastel Peach</Button>
            <Button variant="sky">Pastel Sky</Button>
            <Button variant="pink">Pastel Pink</Button>
            <Button variant="black">Ink Solid</Button>
            <Button variant="outline">Outline</Button>
          </div>
        )

      case 'icon':
        return (
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary">
              <Mail className="w-4 h-4 mr-2 stroke-[2.5]" /> Login with Email
            </Button>
            <Button variant="black">
              Next Step <ArrowRight className="w-4 h-4 ml-2 stroke-[2.5]" />
            </Button>
          </div>
        )

      case 'fab':
        return (
          <div className="flex items-center justify-center gap-4">
            <Button variant="yellow" shape="fab">
              <Plus className="w-5 h-5 text-black stroke-[2.5]" />
            </Button>
            <Button variant="peach" shape="square" size="icon">
              <Sparkles className="w-5 h-5 text-black stroke-[2.5]" />
            </Button>
            <Button variant="black" shape="pill" size="icon">
              <Star className="w-4 h-4 text-[#FDE047] stroke-[2.5]" />
            </Button>
          </div>
        )

      case 'loading':
        return (
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" isLoading>Please wait</Button>
            <Button variant="black" isLoading>Deploying</Button>
          </div>
        )

      case 'shapes':
        return (
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" shape="pill">Capsule Pill</Button>
            <Button variant="mint" shape="default">Superellipse</Button>
            <Button variant="peach" shape="square">Square</Button>
          </div>
        )

      case 'sizes':
        return (
          <div className="flex items-center justify-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large CTA</Button>
          </div>
        )

      case 'disabled':
        return <Button variant="primary" disabled>Disabled Action</Button>

      case 'shadows':
        return (
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="outline" shadowColor="orange">Orange Shadow</Button>
            <Button variant="outline" shadowColor="violet">Violet Shadow</Button>
            <Button variant="outline" shadowColor="mint">Mint Shadow</Button>
            <Button variant="outline" shadowColor="pink">Pink Shadow</Button>
            <Button variant="primary" shadowStyle="soft">Soft Elevated</Button>
            <Button variant="secondary" shadowStyle="none">Flat Outline</Button>
          </div>
        )

      case 'avatar-user':
        return (
          <Avatar
            name="Ada Lovelace"
            description="Lead Architect"
            variant="purple"
            status="online"
            icon={<User />}
          />
        )

      case 'avatar-bot':
        return (
          <Avatar
            name="Rawkit Bot"
            description="AI Assistant"
            variant="yellow"
            status="busy"
            badge="AI"
            icon={<Bot />}
          />
        )

      case 'avatar-system':
        return (
          <Avatar
            name="Zap⚡ Admin"
            description="System Operator"
            variant="pink"
            status="away"
            icon={<Zap />}
          />
        )

      case 'avatar-shapes':
        return (
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Avatar variant="cyan" shape="square" size="lg" icon={<Shield />} status="online" />
            <Avatar variant="lime" shape="circle" size="lg" fallback="AL" badge={3} />
            <Avatar variant="orange" shape="square" size="lg" fallback="GH" status="busy" />
          </div>
        )

      case 'avatar-group':
        return (
          <AvatarGroup max={3}>
            <Avatar variant="purple" fallback="AB" />
            <Avatar variant="yellow" fallback="CD" />
            <Avatar variant="pink" fallback="EF" />
            <Avatar variant="cyan" fallback="GH" />
            <Avatar variant="lime" fallback="IJ" />
          </AvatarGroup>
        )

      case 'progress-pin':
        return (
          <div className="w-full max-w-xl">
            <Progress
              value={78}
              label="System Deployment"
              description="Processing assets and compiling registry"
              variant="yellow"
              striped
              animated
              showPin
              size="lg"
            />
          </div>
        )

      case 'progress-arcade':
        return (
          <div className="w-full max-w-xl">
            <Progress
              value={60}
              label="Arcade HP Gauge"
              description="Segmented notch dividers"
              variant="mint"
              segments={5}
              showValue
              size="md"
            />
          </div>
        )

      case 'progress-gradient':
        return (
          <div className="w-full max-w-xl">
            <Progress
              value={90}
              label="Level 42 EXP"
              description="Fiery red pop gradient fill"
              variant="gradient"
              showValue
              size="xl"
            />
          </div>
        )

      case 'progress-indeterminate':
        return (
          <div className="w-full max-w-xl">
            <Progress
              indeterminate
              label="Syncing Workspace"
              description="Connecting to remote repository..."
              variant="sky"
              size="md"
            />
          </div>
        )

      case 'slider-basic':
        return (
          <div className="w-full max-w-xl">
            <Slider
              label="Motion Intensity"
              description="Adjust transition speed"
              defaultValue={72}
              variant="orange"
              showPin
              showValue
            />
          </div>
        )

      case 'slider-variants':
        return (
          <div className="w-full max-w-xl space-y-6">
            <Slider label="Audio Volume" defaultValue={85} variant="gradient" showValue />
            <Slider label="Brightness" defaultValue={40} variant="yellow" showValue />
            <Slider label="Eco Speed" defaultValue={60} variant="mint" showValue />
          </div>
        )

      case 'slider-ticks':
        return (
          <div className="w-full max-w-xl">
            <Slider
              label="Grid Columns"
              description="Select between 1 to 10 columns"
              min={1}
              max={10}
              step={1}
              defaultValue={4}
              variant="sky"
              showTicks
              showValue
            />
          </div>
        )

      case 'slider-shapes':
        return (
          <div className="w-full max-w-xl">
            <Slider
              label="Shadow Offset"
              defaultValue={65}
              variant="pink"
              thumbShape="square"
              showPin
            />
          </div>
        )

      case 'card-feature':
        return (
          <Card variant="mint" badge="NEW" isInteractive className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Mint Pastel Surface</CardTitle>
              <CardDescription>Hyper-rounded 28px superellipse container</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-semibold text-black/80 leading-relaxed">
                Structured 3px black ink borders paired with cheerful pastel surface tokens and snappy hover lift physics.
              </p>
            </CardContent>
            <CardFooter>
              <span className="text-xs font-mono font-bold text-black/70">v2.4 Ready</span>
              <Button variant="black" size="sm">Get Started</Button>
            </CardFooter>
          </Card>
        )

      case 'card-dark':
        return (
          <Card variant="dark" badge="PRO" isInteractive className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-[#FDE047]">Dark Ink Brutalist</CardTitle>
              <CardDescription className="text-white/70">Solid ink background with high-contrast neon accents</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium text-white/90 leading-relaxed">
                Built for high-impact dashboards, featured announcement blocks, and dark UI sections.
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#4ADE80] animate-pulse" />
                <span className="font-mono text-xs font-bold text-[#4ADE80]">99.9% Uptime</span>
              </div>
              <Button variant="primary" size="sm" shadowColor="mint">Launch App</Button>
            </CardFooter>
          </Card>
        )

      case 'card-pastels':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
            <Card variant="peach">
              <CardHeader>
                <CardTitle>Peach Surface</CardTitle>
                <CardDescription>Warm orange pastel token</CardDescription>
              </CardHeader>
            </Card>
            <Card variant="lavender">
              <CardHeader>
                <CardTitle>Lavender Surface</CardTitle>
                <CardDescription>Soft violet container fill</CardDescription>
              </CardHeader>
            </Card>
            <Card variant="sky">
              <CardHeader>
                <CardTitle>Soft Sky Surface</CardTitle>
                <CardDescription>Sky blue metrics card</CardDescription>
              </CardHeader>
            </Card>
            <Card variant="pink">
              <CardHeader>
                <CardTitle>Pop Pink Surface</CardTitle>
                <CardDescription>Special offer container</CardDescription>
              </CardHeader>
            </Card>
          </div>
        )

      case 'card-pricing':
        return (
          <Card variant="yellow" badge="POPULAR" isInteractive className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-3xl font-black">$29 / mo</CardTitle>
              <CardDescription className="text-black/80 font-extrabold">Pro Developer License</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-xs font-bold text-black/90">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-black stroke-[3]" /> Unlimited Component Downloads</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-black stroke-[3]" /> Figma UI Kit & Token Files</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-black stroke-[3]" /> Priority Discord Support</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="black" className="w-full">Upgrade Now</Button>
            </CardFooter>
          </Card>
        )

      case 'accordion-default':
        return (
          <div className="w-full max-w-xl">
            <Accordion
              defaultValue="1"
              items={[
                { id: "1", title: "Why the thick borders?", content: "RawkitUI uses strong ink outlines to keep structure visible across every surface." },
                { id: "2", title: "How does press physics work?", content: "Controls lift on hover and depress on press with a short mechanical transition." }
              ]}
            />
          </div>
        )

      case 'accordion-numbered':
        return (
          <div className="w-full max-w-xl">
            <Accordion
              variant="numbered"
              defaultValue="1"
              items={[
                { id: "1", title: "How do I install RawkitUI?", content: "Run npx shadcn add @rawkitui/accordion in your Terminal." },
                { id: "2", title: "Is it free and open-source?", content: "Yes, RawkitUI is completely MIT-licensed and free forever." },
                { id: "3", title: "Does it support Server Components?", content: "Yes, fully compatible with Next.js App Router and RSC." }
              ]}
            />
          </div>
        )

      case 'popover-default':
        return (
          <div className="flex justify-center w-full py-4">
            <Popover
              trigger={
                <Button variant="primary" className="gap-2">
                  <User className="w-4 h-4 stroke-[2.5]" /> User Profile
                </Button>
              }
              align="center"
            >
              <div className="space-y-3 font-sans">
                <div className="flex items-center gap-3 border-b-2 border-[#18181B]/15 pb-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#18181B] bg-[#FDE047] font-mono text-xs font-black">
                    RK
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-sm font-black text-[#18181B] truncate">Alex Rivers</p>
                    <p className="font-mono text-[10px] font-bold text-[#18181B]/60 truncate">alex@rawkitui.dev</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#18181B]/70">Plan:</span>
                  <span className="rounded-full border border-[#18181B] bg-[#BBF7D0] px-2 py-0.5 font-mono text-[10px] font-black uppercase text-[#18181B]">Pro Member</span>
                </div>
                <Button variant="black" size="sm" className="w-full">Manage Account</Button>
              </div>
            </Popover>
          </div>
        )

      case 'popover-form':
        return (
          <div className="flex justify-center w-full py-4">
            <Popover
              trigger={
                <Button variant="accent" className="gap-2">
                  <Settings className="w-4 h-4 stroke-[2.5]" /> Card Tokens
                </Button>
              }
            >
              <div className="space-y-3 font-sans w-60">
                <div className="border-b-2 border-[#18181B]/15 pb-2">
                  <p className="font-display text-sm font-black text-[#18181B]">Token Preferences</p>
                  <p className="font-mono text-[10px] font-bold text-[#18181B]/60">Customize shadow & border tokens</p>
                </div>
                <div className="space-y-2.5 font-mono text-xs text-[#18181B]">
                  <div>
                    <label className="font-black text-[10px] uppercase block mb-1">Border Width</label>
                    <div className="flex gap-2">
                      <button type="button" className="flex-1 rounded-lg border-2 border-[#18181B] bg-[#FDE047] py-1 font-black text-center text-xs">3px</button>
                      <button type="button" className="flex-1 rounded-lg border-2 border-[#18181B] bg-white py-1 font-bold text-center text-xs">2px</button>
                    </div>
                  </div>
                  <div>
                    <label className="font-black text-[10px] uppercase block mb-1">Shadow Tint</label>
                    <div className="flex gap-1.5">
                      <span className="h-6 w-6 rounded-full border-2 border-[#18181B] bg-[#18181B] cursor-pointer" />
                      <span className="h-6 w-6 rounded-full border-2 border-[#18181B] bg-[#FDE047] cursor-pointer" />
                      <span className="h-6 w-6 rounded-full border-2 border-[#18181B] bg-[#BBF7D0] cursor-pointer" />
                      <span className="h-6 w-6 rounded-full border-2 border-[#18181B] bg-[#EC4899] cursor-pointer" />
                    </div>
                  </div>
                </div>
                <Button variant="black" size="sm" className="w-full mt-1">Apply Tokens</Button>
              </div>
            </Popover>
          </div>
        )

      case 'popover-positions':
        return (
          <div className="flex flex-wrap items-center justify-center gap-3 w-full py-6">
            <Popover side="top" trigger={<Button variant="yellow" size="sm">Top Popover</Button>}>
              <div className="p-1 text-center">
                <p className="font-mono text-xs font-black text-[#18181B]">⬆ Anchored to Top</p>
                <p className="mt-0.5 text-[10px] font-bold text-[#18181B]/70">Floats above trigger</p>
              </div>
            </Popover>
            <Popover side="bottom" trigger={<Button variant="mint" size="sm">Bottom Popover</Button>}>
              <div className="p-1 text-center">
                <p className="font-mono text-xs font-black text-[#18181B]">⬇ Anchored to Bottom</p>
                <p className="mt-0.5 text-[10px] font-bold text-[#18181B]/70">Floats below trigger</p>
              </div>
            </Popover>
            <Popover side="left" trigger={<Button variant="peach" size="sm">Left Popover</Button>}>
              <div className="p-1 text-center">
                <p className="font-mono text-xs font-black text-[#18181B]">⬅ Anchored to Left</p>
                <p className="mt-0.5 text-[10px] font-bold text-[#18181B]/70">Floats on the left</p>
              </div>
            </Popover>
            <Popover side="right" trigger={<Button variant="sky" size="sm">Right Popover</Button>}>
              <div className="p-1 text-center">
                <p className="font-mono text-xs font-black text-[#18181B]">➡ Anchored to Right</p>
                <p className="mt-0.5 text-[10px] font-bold text-[#18181B]/70">Floats on the right</p>
              </div>
            </Popover>
          </div>
        )

      default:
        return renderFallbackLivePreview()
    }
  }

  // Fallback live preview per component when examples array isn't populated
  const renderFallbackLivePreview = () => {
    switch (component.id) {
      case 'marquee':
        return (
          <div className="w-full max-w-xl mx-auto py-4">
            <Marquee />
          </div>
        )
      case 'card':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mx-auto">
            <Card variant="mint">
              <CardHeader>
                <CardTitle>Mint Pastel Surface</CardTitle>
                <CardDescription>28px Superellipse Card</CardDescription>
              </CardHeader>
              <p className="text-xs font-bold">Structured 3px black borders with pastel fills.</p>
            </Card>
            <Card variant="peach">
              <CardHeader>
                <CardTitle>Peach Surface</CardTitle>
                <CardDescription>Soft Pop Aesthetic</CardDescription>
              </CardHeader>
              <p className="text-xs font-bold">Tactile hard offset shadows.</p>
            </Card>
          </div>
        )
      case 'badge':
        return (
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Badge variant="yellow" shape="pill">Yellow Pill</Badge>
            <Badge variant="mint" shape="pill">Mint Pill</Badge>
            <Badge variant="violet" shape="pill">Violet Pill</Badge>
            <Badge variant="orange" shape="square">Orange Square</Badge>
            <Badge variant="black" shape="square">Black Square</Badge>
            <Badge variant="pink" shape="square">Pink Square</Badge>
          </div>
        )
      case 'input':
        return (
          <div className="max-w-md mx-auto w-full space-y-3">
            <Input placeholder="Enter your email address..." />
            <Input placeholder="Disabled input..." disabled />
          </div>
        )
      case 'textarea':
        return (
          <div className="max-w-md mx-auto w-full">
            <Textarea placeholder="Type multi-line content..." rows={4} />
          </div>
        )
      case 'select':
        return (
          <div className="max-w-xs mx-auto w-full">
            <Select
              defaultValue="mint"
              options={[
                { value: 'mint', label: 'Theme: Pastel Mint' },
                { value: 'peach', label: 'Theme: Soft Peach' },
                { value: 'sky', label: 'Theme: Sky Blue' },
              ]}
            />
          </div>
        )
      case 'switch':
        return (
          <div className="bg-white p-5 px-6 rounded-2xl rk-border rk-shadow-sm flex items-center justify-between gap-6 max-w-md mx-auto w-full">
            <span className="font-extrabold text-sm text-[#18181B] truncate">Automated CLI Sync</span>
            <Switch checked={switchVal} onCheckedChange={setSwitchVal} className="shrink-0" />
          </div>
        )
      case 'radio':
        return (
          <div className="max-w-md mx-auto w-full">
            <RadioGroup
              defaultValue="pro"
              options={[
                { value: 'free', label: 'Free Plan', description: 'All open source components', badge: 'FREE' },
                { value: 'pro', label: 'Pro License', description: 'Access to pro store & templates', badge: '$49/mo' },
              ]}
            />
          </div>
        )
      case 'tabs':
        return (
          <div className="flex justify-center w-full py-2">
            <Tabs
              tabs={[
                { id: 'overview', label: 'Overview', badge: 'NEW' },
                { id: 'tokens', label: 'Tokens' },
                { id: 'registry', label: 'Registry' },
              ]}
            />
          </div>
        )
      case 'tooltip':
        return (
          <div className="flex justify-center w-full py-2">
            <Tooltip content="Pop-Brutalist Tooltip (#FDE047)">
              <Button variant="primary">Hover For Tooltip</Button>
            </Tooltip>
          </div>
        )
      case 'stepper':
        return (
          <div className="max-w-md mx-auto w-full">
            <Stepper
              currentStep={2}
              onStepClick={(stepId) => console.log('Step clicked:', stepId)}
              steps={[
                { id: 1, label: 'Install' },
                { id: 2, label: 'Configure' },
                { id: 3, label: 'Deploy' },
              ]}
            />
          </div>
        )
      case 'bar-chart':
        return (
          <div className="max-w-md mx-auto w-full">
            <BarChart
              height={140}
              data={[
                { label: 'Mon', value: 45, color: '#FB923C' },
                { label: 'Tue', value: 80, color: '#FDE047' },
                { label: 'Wed', value: 65, color: '#BBF7D0' },
                { label: 'Thu', value: 95, color: '#A78BFA' },
              ]}
            />
          </div>
        )
      case 'dialog':
        return (
          <div className="text-center w-full">
            <Button variant="primary" onClick={() => setIsDialogOpen(true)}>
              Launch Pop Dialog Modal
            </Button>
            <Dialog
              open={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              title="Pop Dialog Modal"
              description="Modal overlay primitive with pastel surface themes."
              variant="lavender"
            >
              <p className="text-sm font-bold">Modal overlay rendered cleanly!</p>
            </Dialog>
          </div>
        )
      case 'alert':
        return (
          <div className="max-w-md mx-auto w-full space-y-3">
            <Alert
              variant="warning"
              title="Pop Notification Alert"
              description="High-contrast alert box with zero-blur shadow."
            />
            <Alert
              variant="success"
              title="Component Added Successfully"
              description="Installed via shadcn registry CLI."
            />
          </div>
        )
      case 'checkbox':
        return (
          <div className="bg-white p-5 px-6 rounded-2xl rk-border rk-shadow-sm flex items-center justify-center max-w-md mx-auto w-full">
            <Checkbox
              label="Enable automated updates"
              checked={checkboxVal}
              onCheckedChange={setCheckboxVal}
            />
          </div>
        )
      case 'floating-nav':
        return (
          <div className="flex justify-center">
            <FloatingNav
              activeTab="home"
              tabs={[
                { id: 'home', label: 'Home' },
                { id: 'components', label: 'Components' },
                { id: 'docs', label: 'Docs' },
              ]}
            />
          </div>
          )
      case 'accordion':
        return (
          <div className="w-full max-w-xl">
            <Accordion items={[
              { id: 'tokens', title: 'Why the thick borders?', content: 'RawkitUI uses strong ink outlines to keep structure visible across every surface.' },
              { id: 'motion', title: 'How does press physics work?', content: 'Controls lift on hover and depress on press with a short mechanical transition.' },
            ]} />
          </div>
        )
      case 'avatar':
        return (
          <div className="flex flex-col gap-6 items-center">
            {/* Avatars with Lucide Icons + Text Labels */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Avatar
                name="Ada Lovelace"
                description="Lead Architect"
                variant="purple"
                status="online"
                icon={<User />}
              />
              <Avatar
                name="Rawkit Bot"
                description="AI Assistant"
                variant="yellow"
                status="busy"
                badge="AI"
                icon={<Bot />}
              />
              <Avatar
                name="Zap⚡ Admin"
                description="System Operator"
                variant="pink"
                status="away"
                icon={<Zap />}
              />
            </div>

            {/* Shapes, Sizes & Avatar Group */}
            <div className="flex flex-wrap items-center justify-center gap-5 pt-2">
              <Avatar variant="cyan" shape="square" size="lg" icon={<Shield />} status="online" />
              <Avatar variant="lime" shape="circle" size="lg" fallback="AL" badge={3} />
              <Avatar variant="orange" shape="square" size="lg" fallback="GH" status="busy" />
              <AvatarGroup max={3}>
                <Avatar variant="purple" fallback="AB" />
                <Avatar variant="yellow" fallback="CD" />
                <Avatar variant="pink" fallback="EF" />
                <Avatar variant="cyan" fallback="GH" />
                <Avatar variant="lime" fallback="IJ" />
              </AvatarGroup>
            </div>
          </div>
        )
      case 'breadcrumb':
        return <Breadcrumb items={[{ label: 'Docs', href: '#' }, { label: 'Navigation', href: '#' }, { label: 'Breadcrumb', current: true }]} />
      case 'calendar':
        return <Calendar defaultValue={new Date()} />
      case 'command':
        return (
          <Command items={[
            { value: 'button', label: 'Add Button', group: 'Components', icon: <Layers className="h-4 w-4" /> },
            { value: 'card', label: 'Add Card', group: 'Components', icon: <Layers className="h-4 w-4" /> },
            { value: 'quickstart', label: 'Open Quickstart', group: 'Navigation', icon: <Terminal className="h-4 w-4" /> },
          ]} />
        )
      case 'dropdown-menu':
        return <DropdownMenu items={[{ label: 'Edit component', shortcut: 'E', onSelect: () => {} }, { separator: true, label: '' }, { label: 'Duplicate', onSelect: () => {} }, { label: 'Delete', onSelect: () => {} }]} />
      case 'pagination':
        return <Pagination currentPage={3} totalPages={8} onPageChange={() => {}} />
      case 'progress':
        return (
          <div className="w-full max-w-xl flex flex-col gap-6">
            <Progress
              value={78}
              label="System Deployment"
              description="Processing assets and compiling registry"
              variant="yellow"
              striped
              animated
              showPin
              size="lg"
            />
            <Progress
              value={60}
              label="Arcade HP Gauge"
              description="Segmented notch dividers"
              variant="mint"
              segments={5}
              showValue
              size="md"
            />
            <Progress
              value={90}
              label="Level 42 EXP"
              description="Pop-Brutalist rainbow gradient fill"
              variant="gradient"
              showValue
              size="xl"
            />
            <Progress
              indeterminate
              label="Syncing Workspace"
              description="Connecting to remote repository..."
              variant="sky"
              size="sm"
            />
          </div>
        )
      case 'skeleton':
        return (
          <div className="flex w-full max-w-md flex-col items-center gap-4">
            <div className="flex w-full items-center gap-3">
              <Skeleton variant="circle" className="h-12 w-12" />
              <div className="flex-1 space-y-2">
                <Skeleton variant="text" className="w-2/3" />
                <Skeleton variant="text" className="w-full" />
              </div>
            </div>
            <div className="grid w-full grid-cols-2 gap-3">
              <Skeleton loader="stripe" className="h-10" />
              <Skeleton loader="shimmer" className="h-10" />
            </div>
          </div>
        )
      case 'sonner':
        return (
          <ToastProvider duration={0}>
            <ToastPreview />
          </ToastProvider>
        )
      case 'table':
        return (
          <Table>
            <TableHeader><TableRow><TableHead>Component</TableHead><TableHead>Status</TableHead><TableHead>Added</TableHead></TableRow></TableHeader>
            <TableBody><TableRow><TableCell className="font-black">Button</TableCell><TableCell>Stable</TableCell><TableCell>Today</TableCell></TableRow><TableRow><TableCell className="font-black">Calendar</TableCell><TableCell>New</TableCell><TableCell>Today</TableCell></TableRow></TableBody>
          </Table>
        )
      case 'slider':
        return <div className="w-full max-w-md"><Slider label="Motion intensity" defaultValue={64} showValue /></div>
      case 'toggle-group':
        return <ToggleGroup variant="outline" defaultValue="grid" items={[{ value: 'grid', label: 'Grid' }, { value: 'list', label: 'List' }, { value: 'compact', label: 'Compact' }]} />
      case 'kbd':
        return (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Kbd>⌘</Kbd><Kbd>K</Kbd>
            <span className="mx-1 text-xs font-bold text-black/50">+</span>
            <Kbd size="lg">Ctrl</Kbd><Kbd size="lg">C</Kbd>
            <span className="mx-1 text-xs font-bold text-black/50">+</span>
            <Kbd size="sm">Esc</Kbd>
          </div>
        )
      case 'sheet':
        return (
          <div className="text-center w-full">
            <Button variant="primary" onClick={() => setIsSheetOpen(true)}>
              Open Filters Sheet
            </Button>
            <Sheet
              open={isSheetOpen}
              onClose={() => setIsSheetOpen(false)}
              title="Filters"
              description="Narrow down the results"
            >
              <div className="space-y-3">
                <p className="text-sm font-semibold">Sheet content goes here!</p>
                <Button variant="black" size="sm" className="w-full" onClick={() => setIsSheetOpen(false)}>Apply Filters</Button>
              </div>
            </Sheet>
          </div>
        )
      case 'popover':
        return renderExamplePreview('popover-default')
      case 'copy-button':
        return (
          <div className="flex flex-col items-center gap-3">
            <CopyButton value="npx shadcn add @rawkitui/copy-button" />
            <p className="font-mono text-[11px] font-bold text-black/50">Click to copy the CLI command</p>
          </div>
        )
      case 'number-input':
        return (
          <div className="flex justify-center w-full">
            <NumberInput defaultValue={3} min={1} max={10} label="Quantity" />
          </div>
        )
      case 'otp-input':
        return (
          <div className="flex flex-col items-center gap-3 w-full">
            <OTPInput length={6} onComplete={(code) => console.log('OTP complete:', code)} />
            <p className="font-mono text-[11px] font-bold text-black/50">Paste or type a 6-digit code</p>
          </div>
        )
      case 'rating':
        return (
          <div className="flex flex-col items-center gap-2 w-full">
            <Rating defaultValue={3} count={5} onChange={(v) => console.log('Rated:', v)} />
            <p className="font-mono text-[11px] font-bold text-black/50">Hover & click to rate</p>
          </div>
        )
      case 'collapsible':
        return (
          <div className="w-full max-w-md mx-auto">
            <Collapsible trigger="Show advanced options">
              <p className="text-sm font-semibold">Hidden content revealed!</p>
            </Collapsible>
          </div>
        )
      default:
        return <Button>Default Preview</Button>
    }
  }

  return (
    <div className="max-w-4xl space-y-10 font-sans pb-16">
      {/* Component Title Header with Custom Select Shadow Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-3 border-black pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Badge variant="yellow" shape="pill">{component.category}</Badge>
            <span className="text-xs font-mono font-bold text-black/50">@{component.id}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold">{component.name}</h1>
          <p className="text-base font-extrabold text-black/70 max-w-2xl">{component.description}</p>
        </div>

        {/* Custom Pop-Brutalist Select Shadow Switcher Control */}
        <div className="w-full sm:w-60 shrink-0">
          <label className="text-[11px] font-mono font-black text-[#FB923C] uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 stroke-[2.5]" /> Page Shadow Theme
          </label>
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

      {/* CLI Installation Box */}
      <div className="space-y-2">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FB923C]">
          CLI Installation
        </div>
        <div className="bg-[#18181B] text-white p-3.5 rounded-2xl rk-border rk-shadow-md flex items-center justify-between gap-4 font-mono text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 text-[#FDE047] truncate">
            <span>$</span>
            <span className="text-white truncate">{component.cliCommand}</span>
          </div>
          <Button variant="primary" size="sm" shape="pill" onClick={copyCli} className="shrink-0 text-xs font-bold">
            {copiedCli ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4 stroke-[2.5]" />}
            {copiedCli ? 'Copied!' : 'Copy Command'}
          </Button>
        </div>
      </div>

      {/* Structured Examples Section */}
      {component.examples && component.examples.length > 0 ? (
        <div className="space-y-8">
          <div className="border-b-2 border-black/10 pb-2">
            <h2 className="font-display text-2xl font-black uppercase text-[#18181B]">
              Component Variants & Examples
            </h2>
            <p className="text-xs font-extrabold text-black/60">
              Interactive live previews and copyable code snippets for every component style.
            </p>
          </div>

          <div className="space-y-10">
            {component.examples.map((example) => (
              <ExampleBlock
                key={`${component.id}-${example.id}`}
                title={example.title}
                description={example.description}
                codeSnippet={example.codeSnippet}
                isTallPreview={component.id === 'select'}
              >
                {renderExamplePreview(example.id)}
              </ExampleBlock>
            ))}
          </div>
        </div>
      ) : (
        /* Fallback single preview for components without examples array */
        <ExampleBlock
          key={`fallback-${component.id}`}
          title="Component Preview"
          description={component.description}
          codeSnippet={component.codeSnippet}
          isTallPreview={component.id === 'select'}
        >
          {renderFallbackLivePreview()}
        </ExampleBlock>
      )}

      {/* Component Props Table */}
      <div className="space-y-4 pt-6">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#FB923C]">
          Component API & Props
        </div>
        <div className="bg-white rounded-2xl rk-border rk-shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left font-sans border-collapse">
            <thead>
              <tr className="bg-[#18181B] text-white font-mono text-xs border-b-2 border-black">
                <th className="p-3.5 pl-5 font-bold">Prop</th>
                <th className="p-3.5 font-bold">Type</th>
                <th className="p-3.5 font-bold">Default</th>
                <th className="p-3.5 pr-5 font-bold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black/10 text-xs font-bold text-[#18181B]">
              {component.props.map((prop, i) => (
                <tr key={i} className="hover:bg-[#F4F4F0] transition-colors">
                  <td className="p-3.5 pl-5 font-mono font-bold text-purple-700">{prop.name}</td>
                  <td className="p-3.5 font-mono text-pink-700">{prop.type}</td>
                  <td className="p-3.5 font-mono text-black/60">{prop.default}</td>
                  <td className="p-3.5 pr-5 text-black/80">{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
