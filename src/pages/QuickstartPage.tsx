import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Terminal, Copy, Check, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

export function QuickstartPage() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null)

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCmd(id)
    setTimeout(() => setCopiedCmd(null), 2000)
  }

  return (
    <div className="max-w-4xl space-y-10">
      <div className="space-y-3 border-b-3 border-black pb-6">
        <Badge variant="yellow" shape="pill">Getting Started</Badge>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold">Quickstart & Installation</h1>
        <p className="text-base font-semibold text-black/70 max-w-2xl">
          RawkitUI ships as a custom shadcn registry. Add the registry to your project and use standard shadcn CLI commands to add components instantly.
        </p>
      </div>

      {/* Step 1 */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#18181B] text-[#FDE047] font-mono font-bold text-sm flex items-center justify-center">
            1
          </div>
          <h3 className="font-display text-xl font-bold">Add Registry to components.json</h3>
        </div>
        <p className="text-sm font-semibold text-black/70">
          Open your project's <code className="font-mono bg-white px-2 py-0.5 rounded rk-border-sm">components.json</code> and register RawkitUI:
        </p>
        <div className="bg-[#18181B] text-white p-4 rounded-2xl rk-border font-mono text-xs sm:text-sm relative">
          <pre className="text-[#BBF7D0]">
{`{
  "registries": {
    "@rawkitui": "https://rawkitui.com/r/{name}.json"
  }
}`}
          </pre>
          <Button
            variant="primary"
            size="sm"
            shape="pill"
            onClick={() => copyText(`"registries": { "@rawkitui": "https://rawkitui.com/r/{name}.json" }`, 'step1')}
            className="absolute top-3 right-3 text-xs"
          >
            {copiedCmd === 'step1' ? 'Copied!' : 'Copy'}
          </Button>
        </div>
      </div>

      {/* Step 2 */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#18181B] text-[#FDE047] font-mono font-bold text-sm flex items-center justify-center">
            2
          </div>
          <h3 className="font-display text-xl font-bold">Add Components via Shadcn CLI</h3>
        </div>
        <p className="text-sm font-semibold text-black/70">
          Run standard shadcn commands to add any RawkitUI primitive directly to your project:
        </p>
        <div className="bg-[#18181B] text-white p-4 rounded-2xl rk-border font-mono text-xs sm:text-sm flex items-center justify-between gap-4">
          <span className="text-[#FDE047]">$ npx shadcn add @rawkitui/button @rawkitui/card</span>
          <Button
            variant="primary"
            size="sm"
            shape="pill"
            onClick={() => copyText('npx shadcn add @rawkitui/button @rawkitui/card', 'step2')}
            className="shrink-0 text-xs"
          >
            {copiedCmd === 'step2' ? 'Copied!' : 'Copy'}
          </Button>
        </div>
      </div>

      {/* Step 3 */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#18181B] text-[#FDE047] font-mono font-bold text-sm flex items-center justify-center">
            3
          </div>
          <h3 className="font-display text-xl font-bold">Import & Start Building</h3>
        </div>
        <p className="text-sm font-semibold text-black/70">
          Import installed components with full TypeScript support and Tailwind v4 Pop-Brutalist design tokens.
        </p>
        <div className="bg-[#18181B] text-white p-4 rounded-2xl rk-border font-mono text-xs sm:text-sm">
          <pre className="text-[#FBCFE8]">
{`import { Button } from "@/components/ui/button"

export default function App() {
  return <Button variant="primary" shape="pill">Hello RawkitUI!</Button>
}`}
          </pre>
        </div>
      </div>

      <div className="pt-4 flex items-center justify-between">
        <Link to="/docs/button">
          <Button variant="primary" size="lg">
            Explore All Components <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
