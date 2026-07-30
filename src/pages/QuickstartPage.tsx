import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Terminal, Copy, Check, Sparkles, CheckCircle2, ArrowRight, Layers, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export function QuickstartPage() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null)

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCmd(id)
    setTimeout(() => setCopiedCmd(null), 2000)
  }

  return (
    <div className="max-w-4xl space-y-10 font-sans pb-16">
      {/* Page Title Header */}
      <div className="space-y-3 border-b-3 border-black pb-6">
        <div className="flex items-center gap-3">
          <Badge variant="yellow" shape="pill">Getting Started</Badge>
          <span className="text-xs font-mono font-bold text-black/50">v1.0.0</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold">Quickstart & Installation</h1>
        <p className="text-base font-extrabold text-black/70 max-w-2xl">
          RawkitUI ships as an open-source custom shadcn registry. Follow the 4 quick steps below to set up essential dependencies and start building Pop-Brutalist interfaces in seconds.
        </p>
      </div>

      {/* Essential Dependencies Banner */}
      <Card variant="mint" className="rk-shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-black stroke-[2.5]" />
            <CardTitle>Essential Stack Prerequisite Checklist</CardTitle>
          </div>
          <CardDescription className="text-black/80 font-bold">
            RawkitUI components rely on standard React, Tailwind CSS, Motion spring physics, and Lucide icons.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="bg-white p-3 rounded-xl rk-border-sm flex items-center gap-2.5 font-mono text-xs font-black">
              <CheckCircle2 className="w-4 h-4 text-black shrink-0 stroke-[3]" />
              <span>Tailwind CSS v3/v4</span>
            </div>
            <div className="bg-white p-3 rounded-xl rk-border-sm flex items-center gap-2.5 font-mono text-xs font-black">
              <CheckCircle2 className="w-4 h-4 text-black shrink-0 stroke-[3]" />
              <span>motion (Framer Motion)</span>
            </div>
            <div className="bg-white p-3 rounded-xl rk-border-sm flex items-center gap-2.5 font-mono text-xs font-black">
              <CheckCircle2 className="w-4 h-4 text-black shrink-0 stroke-[3]" />
              <span>lucide-react</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Install Core Dependencies */}
      <div className="space-y-3.5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#18181B] text-[#FDE047] font-mono font-black text-sm flex items-center justify-center rk-shadow-xs shrink-0">
            1
          </div>
          <div>
            <h3 className="font-display text-xl font-black text-[#18181B]">Initialize Shadcn & Install Dependencies</h3>
            <p className="text-xs font-bold text-black/60">Initialize shadcn/ui and install motion, lucide-react, and utility libraries.</p>
          </div>
        </div>

        <div className="bg-[#18181B] text-white p-4.5 rounded-2xl rk-border rk-shadow-sm font-mono text-xs sm:text-sm space-y-3 relative">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs text-[#FDE047] font-bold">Terminal / Shell</span>
            <Button
              variant="primary"
              size="sm"
              shape="pill"
              onClick={() => copyText('npx shadcn@latest init && npm install motion lucide-react clsx tailwind-merge', 'step1')}
              className="text-xs font-bold"
            >
              {copiedCmd === 'step1' ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5 stroke-[2.5]" />}
              {copiedCmd === 'step1' ? 'Copied!' : 'Copy Commands'}
            </Button>
          </div>
          <pre className="text-[#BBF7D0] leading-relaxed overflow-x-auto">
{`# 1. Initialize shadcn CLI in your React / Next / Vite project
$ npx shadcn@latest init

# 2. Install essential animation, icon, and utility packages
$ npm install motion lucide-react clsx tailwind-merge`}
          </pre>
        </div>
      </div>

      {/* Step 2: Register RawkitUI in components.json */}
      <div className="space-y-3.5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#18181B] text-[#FDE047] font-mono font-black text-sm flex items-center justify-center rk-shadow-xs shrink-0">
            2
          </div>
          <div>
            <h3 className="font-display text-xl font-black text-[#18181B]">Add Registry to components.json</h3>
            <p className="text-xs font-bold text-black/60">Open your project's components.json and register RawkitUI as a custom registry.</p>
          </div>
        </div>

        <div className="bg-[#18181B] text-white p-4.5 rounded-2xl rk-border rk-shadow-sm font-mono text-xs sm:text-sm relative space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs text-[#FDE047] font-bold">components.json</span>
            <Button
              variant="primary"
              size="sm"
              shape="pill"
              onClick={() => copyText(`{\n  "registries": {\n    "@rawkitui": "https://rawkitui.com/r/{name}.json"\n  }\n}`, 'step2')}
              className="text-xs font-bold"
            >
              {copiedCmd === 'step2' ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5 stroke-[2.5]" />}
              {copiedCmd === 'step2' ? 'Copied!' : 'Copy JSON'}
            </Button>
          </div>
          <pre className="text-[#FBCFE8] leading-relaxed overflow-x-auto">
{`{
  "registries": {
    "@rawkitui": "https://rawkitui.com/r/{name}.json"
  }
}`}
          </pre>
        </div>
      </div>

      {/* Step 3: Add Components via Shadcn CLI */}
      <div className="space-y-3.5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#18181B] text-[#FDE047] font-mono font-black text-sm flex items-center justify-center rk-shadow-xs shrink-0">
            3
          </div>
          <div>
            <h3 className="font-display text-xl font-black text-[#18181B]">Add Components via Shadcn CLI</h3>
            <p className="text-xs font-bold text-black/60">Run standard shadcn commands to add any RawkitUI primitive directly to your codebase.</p>
          </div>
        </div>

        <div className="bg-[#18181B] text-white p-4.5 rounded-2xl rk-border rk-shadow-sm font-mono text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-[#FDE047] font-bold truncate">$ npx shadcn add @rawkitui/button @rawkitui/card @rawkitui/slider</span>
          <Button
            variant="primary"
            size="sm"
            shape="pill"
            onClick={() => copyText('npx shadcn add @rawkitui/button @rawkitui/card @rawkitui/slider', 'step3')}
            className="shrink-0 text-xs font-bold"
          >
            {copiedCmd === 'step3' ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5 stroke-[2.5]" />}
            {copiedCmd === 'step3' ? 'Copied!' : 'Copy Command'}
          </Button>
        </div>
      </div>

      {/* Step 4: Import & Start Building */}
      <div className="space-y-3.5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#18181B] text-[#FDE047] font-mono font-black text-sm flex items-center justify-center rk-shadow-xs shrink-0">
            4
          </div>
          <div>
            <h3 className="font-display text-xl font-black text-[#18181B]">Import & Start Building</h3>
            <p className="text-xs font-bold text-black/60">Import installed components with full TypeScript support and Pop-Brutalist design tokens.</p>
          </div>
        </div>

        <div className="bg-[#18181B] text-white p-4.5 rounded-2xl rk-border rk-shadow-sm font-mono text-xs sm:text-sm relative space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs text-[#FDE047] font-bold">src/App.tsx</span>
            <Button
              variant="primary"
              size="sm"
              shape="pill"
              onClick={() => copyText(`import { Button } from "@/components/ui/button"\nimport { Card, CardHeader, CardTitle } from "@/components/ui/card"\nimport { User } from "lucide-react"\n\nexport default function App() {\n  return (\n    <Card variant="mint" badge="NEW" isInteractive>\n      <CardHeader>\n        <CardTitle>Hello RawkitUI!</CardTitle>\n      </CardHeader>\n      <Button variant="primary" shape="pill">\n        <User className="w-4 h-4 mr-2" /> Launch App\n      </Button>\n    </Card>\n  )\n}`, 'step4')}
              className="text-xs font-bold"
            >
              {copiedCmd === 'step4' ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5 stroke-[2.5]" />}
              {copiedCmd === 'step4' ? 'Copied!' : 'Copy Code'}
            </Button>
          </div>
          <pre className="text-[#BAE6FD] leading-relaxed overflow-x-auto">
{`import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"

export default function App() {
  return (
    <Card variant="mint" badge="NEW" isInteractive>
      <CardHeader>
        <CardTitle>Hello RawkitUI!</CardTitle>
      </CardHeader>
      <Button variant="primary" shape="pill">
        <User className="w-4 h-4 mr-2" /> Launch App
      </Button>
    </Card>
  )
}`}
          </pre>
        </div>
      </div>

      {/* Bottom CTA Navigation Button */}
      <div className="pt-6 flex items-center justify-between border-t-2 border-black/10">
        <Link to="/components/button">
          <Button variant="primary" size="lg" shape="pill">
            Explore All 30 Components <ArrowRight className="w-5 h-5 ml-2 stroke-[2.5]" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
