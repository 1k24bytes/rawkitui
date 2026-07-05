export interface ComponentPropSpec {
  name: string
  type: string
  default: string
  description: string
}

export interface ComponentData {
  id: string
  name: string
  category: 'Primitives' | 'Form Controls' | 'Feedback & Data' | 'Navigation'
  description: string
  cliCommand: string
  codeSnippet: string
  props: ComponentPropSpec[]
}

export const COMPONENTS_DATA: Record<string, ComponentData> = {
  button: {
    id: 'button',
    name: 'Button',
    category: 'Primitives',
    description: 'Tactile Pop-Brutalist action button with hard zero-blur offset shadow and physical press physics.',
    cliCommand: 'npx shadcn add @rawkitui/button',
    codeSnippet: `import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary" size="md">Primary CTA</Button>
      <Button variant="secondary" size="md">Secondary</Button>
      <Button variant="mint" size="md">Pastel Mint</Button>
      <Button variant="peach" shape="pill" size="md">Peach Capsule</Button>
      <Button variant="yellow" shape="fab">
        <Plus className="w-5 h-5 text-black" />
      </Button>
    </div>
  )
}`,
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'accent' | 'mint' | 'peach' | 'sky' | 'pink' | 'black' | 'outline'", default: "'primary'", description: 'Sets the fill background color token' },
      { name: 'shape', type: "'default' | 'pill' | 'fab' | 'square'", default: "'pill'", description: 'Controls corner radius stance (28px superellipse or rounded-full capsule)' },
      { name: 'size', type: "'sm' | 'md' | 'lg' | 'icon'", default: "'md'", description: 'Button dimensions and font sizing' },
    ],
  },
  card: {
    id: 'card',
    name: 'Card',
    category: 'Primitives',
    description: 'Hyper-rounded 28px superellipse container with pastel surface fills and thick black border.',
    cliCommand: 'npx shadcn add @rawkitui/card',
    codeSnippet: `import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function CardDemo() {
  return (
    <Card variant="mint" className="max-w-sm">
      <CardHeader>
        <CardTitle>Pastel Mint Surface</CardTitle>
        <CardDescription>Hyper-rounded 28px superellipse card</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-semibold text-black/80">
          Clean structural black outlines paired with warm pastel surface tokens.
        </p>
      </CardContent>
    </Card>
  )
}`,
    props: [
      { name: 'variant', type: "'white' | 'mint' | 'peach' | 'lavender' | 'sky' | 'pink' | 'yellow'", default: "'white'", description: 'Pastel surface background color' },
      { name: 'hasShadow', type: 'boolean', default: 'true', description: 'Toggles 4px 4px solid black offset shadow' },
    ],
  },
  badge: {
    id: 'badge',
    name: 'Badge & Starburst',
    category: 'Primitives',
    description: 'Capsule tags, hexagon tags, and signature wave scalloped starburst badges for highlights.',
    cliCommand: 'npx shadcn add @rawkitui/badge',
    codeSnippet: `import { Badge } from "@/components/ui/badge"

export default function BadgeDemo() {
  return (
    <div className="flex items-center gap-4">
      <Badge variant="yellow" shape="pill">Pill Tag</Badge>
      <Badge variant="violet" shape="pill">Violet Tag</Badge>
      
      {/* Scalloped Starburst Badge */}
      <div className="rk-scalloped bg-[#FDE047] w-14 h-14 border-2 border-black flex items-center justify-center text-xs font-black rk-shadow-sm">
        56%
      </div>
    </div>
  )
}`,
    props: [
      { name: 'variant', type: "'yellow' | 'orange' | 'violet' | 'mint' | 'peach' | 'sky' | 'pink' | 'lavender' | 'black' | 'white'", default: "'yellow'", description: 'Fill color token' },
      { name: 'shape', type: "'pill' | 'square' | 'scalloped'", default: "'pill'", description: 'Shape geometry including scalloped starburst clip-path' },
    ],
  },
  input: {
    id: 'input',
    name: 'Input',
    category: 'Form Controls',
    description: 'High-contrast single-line text input with 3px solid black border and 3px offset focus ring.',
    cliCommand: 'npx shadcn add @rawkitui/input',
    codeSnippet: `import { Input } from "@/components/ui/input"

export default function InputDemo() {
  return (
    <Input placeholder="Enter your email address..." className="max-w-md" />
  )
}`,
    props: [
      { name: 'placeholder', type: 'string', default: 'undefined', description: 'Placeholder string text' },
      { name: 'type', type: 'string', default: "'text'", description: 'Native HTML input type' },
    ],
  },
  textarea: {
    id: 'textarea',
    name: 'Textarea',
    category: 'Form Controls',
    description: 'Multiline text field with Pop-Brutalist borders and shadow-sm.',
    cliCommand: 'npx shadcn add @rawkitui/textarea',
    codeSnippet: `import { Textarea } from "@/components/ui/textarea"

export default function TextareaDemo() {
  return (
    <Textarea placeholder="Type project requirements or notes..." rows={4} className="max-w-md" />
  )
}`,
    props: [
      { name: 'rows', type: 'number', default: '3', description: 'Initial visible rows' },
    ],
  },
  select: {
    id: 'select',
    name: 'Select',
    category: 'Form Controls',
    description: 'Custom dropdown select with chevron icon and thick black outline.',
    cliCommand: 'npx shadcn add @rawkitui/select',
    codeSnippet: `import { Select } from "@/components/ui/select"

export default function SelectDemo() {
  return (
    <Select
      className="max-w-xs"
      options={[
        { value: 'mint', label: 'Theme: Pastel Mint' },
        { value: 'peach', label: 'Theme: Soft Peach' },
        { value: 'sky', label: 'Theme: Sky Blue' },
      ]}
    />
  )
}`,
    props: [
      { name: 'options', type: 'Array<{value: string, label: string}>', default: '[]', description: 'Dropdown items list' },
    ],
  },
  switch: {
    id: 'switch',
    name: 'Switch',
    category: 'Form Controls',
    description: 'Tactile capsule toggle switch with sliding black pill knob.',
    cliCommand: 'npx shadcn add @rawkitui/switch',
    codeSnippet: `import { Switch } from "@/components/ui/switch"
import { useState } from "react"

export default function SwitchDemo() {
  const [enabled, setEnabled] = useState(true)
  return (
    <Switch 
      label="Enable Dark Borders" 
      checked={enabled} 
      onCheckedChange={setEnabled} 
    />
  )
}`,
    props: [
      { name: 'checked', type: 'boolean', default: 'false', description: 'Toggle checked state' },
      { name: 'label', type: 'string', default: 'undefined', description: 'Label text next to toggle' },
    ],
  },
  radio: {
    id: 'radio',
    name: 'Radio Group',
    category: 'Form Controls',
    description: 'Tactile radio option card system with pastel selection fills.',
    cliCommand: 'npx shadcn add @rawkitui/radio',
    codeSnippet: `import { RadioGroup } from "@/components/ui/radio"

export default function RadioDemo() {
  return (
    <RadioGroup
      defaultValue="pro"
      options={[
        { value: 'free', label: 'Free Plan', description: 'All open source components', badge: 'FREE' },
        { value: 'pro', label: 'Pro License', description: 'Access to pro store & templates', badge: '$49/mo' },
      ]}
    />
  )
}`,
    props: [
      { name: 'options', type: 'Array<RadioOption>', default: '[]', description: 'Radio option cards configuration' },
      { name: 'value', type: 'string', default: 'undefined', description: 'Selected option value' },
    ],
  },
  tabs: {
    id: 'tabs',
    name: 'Tabs',
    category: 'Navigation',
    description: 'Capsule pill tabs with pastel active tab highlights and tactile shadow lift.',
    cliCommand: 'npx shadcn add @rawkitui/tabs',
    codeSnippet: `import { Tabs } from "@/components/ui/tabs"

export default function TabsDemo() {
  return (
    <Tabs
      tabs={[
        { id: 'overview', label: 'Overview', badge: 'NEW' },
        { id: 'tokens', label: 'Tokens' },
        { id: 'registry', label: 'Registry' },
      ]}
    />
  )
}`,
    props: [
      { name: 'tabs', type: 'Array<TabItem>', default: '[]', description: 'Tab triggers list' },
      { name: 'variant', type: "'pill' | 'underline' | 'boxed'", default: "'pill'", description: 'Tabs layout style' },
    ],
  },
  tooltip: {
    id: 'tooltip',
    name: 'Tooltip',
    category: 'Feedback & Data',
    description: 'Pop-Brutalist high-contrast tooltip box with solid black fill and zero-blur shadow.',
    cliCommand: 'npx shadcn add @rawkitui/tooltip',
    codeSnippet: `import { Tooltip } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

export default function TooltipDemo() {
  return (
    <Tooltip content="Neon Yellow Brand Color (#FDE047)">
      <Button variant="primary" shape="pill">Hover Me</Button>
    </Tooltip>
  )
}`,
    props: [
      { name: 'content', type: 'ReactNode', default: 'undefined', description: 'Tooltip popup content' },
      { name: 'position', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Popup direction placement' },
    ],
  },
  stepper: {
    id: 'stepper',
    name: 'Stepper',
    category: 'Feedback & Data',
    description: 'Capsule progress tracker with numbered step pills.',
    cliCommand: 'npx shadcn add @rawkitui/stepper',
    codeSnippet: `import { Stepper } from "@/components/ui/stepper"

export default function StepperDemo() {
  return (
    <Stepper
      currentStep={2}
      steps={[
        { id: 1, label: 'Install' },
        { id: 2, label: 'Configure' },
        { id: 3, label: 'Deploy' },
      ]}
    />
  )
}`,
    props: [
      { name: 'currentStep', type: 'number', default: '1', description: 'Active step number (1-indexed)' },
      { name: 'steps', type: 'Array<Step>', default: '[]', description: 'Steps array with labels' },
    ],
  },
  'bar-chart': {
    id: 'bar-chart',
    name: 'Bar Chart',
    category: 'Feedback & Data',
    description: 'Vertical capsule progress bar chart visualization.',
    cliCommand: 'npx shadcn add @rawkitui/bar-chart',
    codeSnippet: `import { BarChart } from "@/components/ui/bar-chart"

export default function BarChartDemo() {
  return (
    <BarChart
      height={140}
      data={[
        { label: 'Mon', value: 45, color: '#FB923C' },
        { label: 'Tue', value: 80, color: '#FDE047' },
        { label: 'Wed', value: 65, color: '#BBF7D0' },
        { label: 'Thu', value: 95, color: '#A78BFA' },
      ]}
    />
  )
}`,
    props: [
      { name: 'data', type: 'Array<BarData>', default: '[]', description: 'Chart columns data points' },
      { name: 'height', type: 'number', default: '160', description: 'Height in pixels' },
    ],
  },
  dialog: {
    id: 'dialog',
    name: 'Dialog / Modal',
    category: 'Feedback & Data',
    description: 'Pop-Brutalist modal popover with pastel surface variants and backdrop blur.',
    cliCommand: 'npx shadcn add @rawkitui/dialog',
    codeSnippet: `import { Dialog } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function DialogDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="RawkitUI Pop Dialog"
        description="Modal overlay primitive with pastel themes."
        variant="lavender"
      >
        <p className="text-sm font-semibold">Modal content goes here!</p>
      </Dialog>
    </>
  )
}`,
    props: [
      { name: 'open', type: 'boolean', default: 'false', description: 'Modal open visibility state' },
      { name: 'onClose', type: '() => void', default: 'undefined', description: 'Close handler callback' },
      { name: 'title', type: 'string', default: 'undefined', description: 'Modal header title' },
      { name: 'variant', type: "'white' | 'mint' | 'peach' | 'lavender' | 'sky' | 'pink' | 'yellow'", default: "'lavender'", description: 'Pastel backdrop fill' },
    ],
  },
  alert: {
    id: 'alert',
    name: 'Alert Banner',
    category: 'Feedback & Data',
    description: 'High-contrast pop notification banner with linework icons.',
    cliCommand: 'npx shadcn add @rawkitui/alert',
    codeSnippet: `import { Alert } from "@/components/ui/alert"

export default function AlertDemo() {
  return (
    <Alert
      variant="warning"
      title="Pop Notification Alert"
      description="Zero-blur black drop shadow with solid borders."
    />
  )
}`,
    props: [
      { name: 'variant', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", description: 'Alert tone & pastel fill' },
      { name: 'title', type: 'string', default: 'undefined', description: 'Alert headline text' },
    ],
  },
  checkbox: {
    id: 'checkbox',
    name: 'Checkbox',
    category: 'Form Controls',
    description: 'Tactile checkbox toggle with yellow check fill and black border.',
    cliCommand: 'npx shadcn add @rawkitui/checkbox',
    codeSnippet: `import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

export default function CheckboxDemo() {
  const [checked, setChecked] = useState(true)
  return (
    <Checkbox
      label="Enable automated updates"
      checked={checked}
      onCheckedChange={setChecked}
    />
  )
}`,
    props: [
      { name: 'checked', type: 'boolean', default: 'false', description: 'Checked state' },
      { name: 'label', type: 'string', default: 'undefined', description: 'Label next to checkbox' },
    ],
  },
  'floating-nav': {
    id: 'floating-nav',
    name: 'Floating Nav',
    category: 'Navigation',
    description: 'Pinned bottom/top capsule navigation bar.',
    cliCommand: 'npx shadcn add @rawkitui/floating-nav',
    codeSnippet: `import { FloatingNav } from "@/components/ui/floating-nav"

export default function FloatingNavDemo() {
  return (
    <FloatingNav
      activeTab="home"
      tabs={[
        { id: 'home', label: 'Home' },
        { id: 'components', label: 'Components' },
        { id: 'docs', label: 'Docs' },
      ]}
    />
  )
}`,
    props: [
      { name: 'activeTab', type: 'string', default: "'home'", description: 'Active tab ID' },
      { name: 'tabs', type: 'Array<{id: string, label: string}>', default: '[]', description: 'Navigation items' },
    ],
  },
}
