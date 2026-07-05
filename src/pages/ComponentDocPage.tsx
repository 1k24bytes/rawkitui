import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
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
  CheckCircle2
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

export function ComponentDocPage() {
  const { id } = useParams<{ id: string }>()
  const [copiedCli, setCopiedCli] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview')
  const [interactiveCount, setInteractiveCount] = useState(0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [switchVal, setSwitchVal] = useState(true)
  const [checkboxVal, setCheckboxVal] = useState(true)

  const component = (id && COMPONENTS_DATA[id]) || COMPONENTS_DATA['button']

  const copyCli = () => {
    navigator.clipboard.writeText(component.cliCommand)
    setCopiedCli(true)
    setTimeout(() => setCopiedCli(false), 2000)
  }

  const copyCode = () => {
    navigator.clipboard.writeText(component.codeSnippet)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  // Render dynamic live interactive preview per component
  const renderLivePreview = () => {
    switch (component.id) {
      case 'button':
        return (
          <div className="space-y-6 text-center">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="primary" size="md">Primary CTA</Button>
              <Button variant="secondary" size="md">Secondary</Button>
              <Button variant="accent" size="md">Accent</Button>
              <Button variant="mint" size="md">Mint Pastel</Button>
              <Button variant="peach" size="md">Peach Pastel</Button>
              <Button variant="black" size="md">Ink Solid</Button>
            </div>
            <div className="flex items-center justify-center gap-4 pt-2">
              <Button variant="primary" shape="pill" size="sm">Capsule Pill</Button>
              <Button variant="peach" shape="square" size="sm">Square</Button>
              <Button variant="yellow" shape="fab">
                <Plus className="w-5 h-5 text-black" />
              </Button>
            </div>
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
              <p className="text-xs font-semibold">Structured 3px black borders with pastel fills.</p>
            </Card>
            <Card variant="peach">
              <CardHeader>
                <CardTitle>Peach Surface</CardTitle>
                <CardDescription>Soft Pop Aesthetic</CardDescription>
              </CardHeader>
              <p className="text-xs font-semibold">Tactile hard offset shadows.</p>
            </Card>
          </div>
        )
      case 'badge':
        return (
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Badge variant="yellow" shape="pill">Yellow Tag</Badge>
            <Badge variant="mint" shape="pill">Mint Tag</Badge>
            <Badge variant="violet" shape="pill">Violet Tag</Badge>
            
            <div className="space-y-1 text-center">
              <div className="rk-scalloped bg-[#FDE047] w-14 h-14 border-2 border-black flex items-center justify-center text-xs font-black rk-shadow-sm mx-auto">
                56%
              </div>
              <span className="text-[10px] font-mono font-bold">Scalloped Starburst</span>
            </div>
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
              <p className="text-sm font-semibold">Modal overlay rendered cleanly!</p>
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
    <div className="max-w-4xl space-y-10">
      {/* Component Title Header */}
      <div className="space-y-3 border-b-3 border-black pb-6">
        <div className="flex items-center gap-3">
          <Badge variant="yellow" shape="pill">{component.category}</Badge>
          <span className="text-xs font-mono font-bold text-black/50">@{component.id}</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold">{component.name}</h1>
        <p className="text-base font-semibold text-black/70 max-w-2xl">{component.description}</p>
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
          <Button variant="primary" size="sm" shape="pill" onClick={copyCli} className="shrink-0 text-xs">
            {copiedCli ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copiedCli ? 'Copied!' : 'Copy Command'}
          </Button>
        </div>
      </div>

      {/* Interactive Preview & Code Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-black/10 pb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-1.5 rounded-full font-display font-bold text-xs transition-all flex items-center gap-1.5 ${
                activeTab === 'preview'
                  ? 'bg-[#18181B] text-[#FDE047] rk-border-sm rk-shadow-sm'
                  : 'text-[#18181B] hover:bg-black/5'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> Live Preview
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-1.5 rounded-full font-display font-bold text-xs transition-all flex items-center gap-1.5 ${
                activeTab === 'code'
                  ? 'bg-[#18181B] text-[#FDE047] rk-border-sm rk-shadow-sm'
                  : 'text-[#18181B] hover:bg-black/5'
              }`}
            >
              <Code className="w-3.5 h-3.5" /> Component Code
            </button>
          </div>

          {activeTab === 'code' && (
            <Button variant="outline" size="sm" shape="pill" onClick={copyCode} className="text-xs">
              {copiedCode ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
              {copiedCode ? 'Copied Code' : 'Copy Snippet'}
            </Button>
          )}
        </div>

        {/* Tab Content */}
        {activeTab === 'preview' ? (
          <div className="bg-white p-8 sm:p-12 rounded-[28px] rk-border rk-shadow-md min-h-[220px] flex items-center justify-center">
            {renderLivePreview()}
          </div>
        ) : (
          <div className="relative">
            <pre className="bg-[#18181B] text-[#FDE047] p-6 rounded-[24px] rk-border font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed">
              <code>{component.codeSnippet}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Component Props Table */}
      <div className="space-y-4 pt-4">
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
            <tbody className="divide-y-2 divide-black/10 text-xs font-semibold text-[#18181B]">
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
