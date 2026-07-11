import { useState } from 'react'
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
  ArrowRight
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

function ExampleBlock({
  title,
  description,
  codeSnippet,
  children,
}: {
  title: string
  description?: string
  codeSnippet: string
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
    <div className="space-y-3 pt-4 border-t-2 border-black/10 first:border-t-0 first:pt-0">
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
          <div className="bg-white p-8 sm:p-10 rounded-[28px] rk-border rk-shadow-md min-h-[140px] flex items-center justify-center overflow-x-auto">
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

export function ComponentDocPage() {
  const { id } = useParams<{ id: string }>()
  const [copiedCli, setCopiedCli] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [switchVal, setSwitchVal] = useState(true)
  const [checkboxVal, setCheckboxVal] = useState(true)

  const component = (id && COMPONENTS_DATA[id]) || COMPONENTS_DATA['button']

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

      default:
        return <Button>Preview</Button>
    }
  }

  // Fallback live preview per component when examples array isn't populated
  const renderFallbackLivePreview = () => {
    switch (component.id) {
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
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Badge variant="yellow" shape="pill">Yellow Tag</Badge>
            <Badge variant="mint" shape="pill">Mint Tag</Badge>
            <Badge variant="violet" shape="pill">Violet Tag</Badge>
            <Badge variant="yellow" shape="scalloped">56%</Badge>
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
          <div className="bg-white p-4 rounded-2xl rk-border flex items-center justify-between max-w-sm mx-auto">
            <span className="font-bold text-sm">Automated CLI Sync</span>
            <Switch checked={switchVal} onCheckedChange={setSwitchVal} />
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
          <div className="flex justify-center">
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
          <div className="flex justify-center">
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
          <div className="text-center">
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
          <div className="flex justify-center">
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
      default:
        return <Button>Default Preview</Button>
    }
  }

  return (
    <div className="max-w-4xl space-y-10 font-sans pb-16">
      {/* Component Title Header */}
      <div className="space-y-3 border-b-3 border-black pb-6">
        <div className="flex items-center gap-3">
          <Badge variant="yellow" shape="pill">{component.category}</Badge>
          <span className="text-xs font-mono font-bold text-black/50">@{component.id}</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold">{component.name}</h1>
        <p className="text-base font-extrabold text-black/70 max-w-2xl">{component.description}</p>
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

      {/* Structured Examples Section (Shadcn Style with Pop-Brutalist design) */}
      {component.examples && component.examples.length > 0 ? (
        <div className="space-y-8">
          <div className="border-b-2 border-black/10 pb-2">
            <h2 className="font-display text-2xl font-black uppercase text-[#18181B]">
              Component Variants & Examples
            </h2>
            <p className="text-xs font-extrabold text-black/60">
              Interactive live previews and copyable code snippets for every button style.
            </p>
          </div>

          <div className="space-y-10">
            {component.examples.map((example) => (
              <ExampleBlock
                key={example.id}
                title={example.title}
                description={example.description}
                codeSnippet={example.codeSnippet}
              >
                {renderExamplePreview(example.id)}
              </ExampleBlock>
            ))}
          </div>
        </div>
      ) : (
        /* Fallback single preview for components without examples array */
        <ExampleBlock
          title="Component Preview"
          description={component.description}
          codeSnippet={component.codeSnippet}
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
