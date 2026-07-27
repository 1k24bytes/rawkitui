export interface ComponentPropSpec {
  name: string
  type: string
  default: string
  description: string
}

export interface ComponentExample {
  id: string
  title: string
  description?: string
  codeSnippet: string
}

export interface ComponentData {
  id: string
  name: string
  category: 'Primitives' | 'Form Controls' | 'Feedback & Data' | 'Navigation'
  description: string
  cliCommand: string
  codeSnippet: string
  examples?: ComponentExample[]
  props: ComponentPropSpec[]
}

export const COMPONENTS_DATA: Record<string, ComponentData> = {
  accordion: {
    id: 'accordion', name: 'Accordion', category: 'Navigation',
    description: 'Accessible collapsible content sections with tactile pastel headers and single or multiple open modes.',
    cliCommand: 'npx shadcn add @rawkitui/accordion',
    codeSnippet: `import { Accordion } from "@/components/ui/accordion"

<Accordion items={[{ id: "faq", title: "What is RawkitUI?", content: "A playful component library." }]} />`,
    props: [
      { name: 'items', type: 'Array<AccordionItem>', default: '[]', description: 'Sections with id, title, content, and optional disabled state' },
      { name: 'type', type: "'single' | 'multiple'", default: "'single'", description: 'Allows one or several sections to remain open' },
      { name: 'collapsible', type: 'boolean', default: 'true', description: 'Allows the active single section to close' },
    ],
  },
  avatar: {
    id: 'avatar', name: 'Avatar', category: 'Primitives',
    description: 'Pop-Brutalist profile avatar with Lucide icon fallbacks, text labels, status badges, shapes, and group stacking.',
    cliCommand: 'npx shadcn add @rawkitui/avatar',
    codeSnippet: `import { Avatar, AvatarGroup } from "@/components/ui/avatar"
import { User, Bot, Shield } from "lucide-react"

<Avatar
  name="Ada Lovelace"
  description="Lead Architect"
  variant="purple"
  status="online"
  icon={<User />}
/>`,
    examples: [
      {
        id: 'avatar-user',
        title: 'User Profile Avatar with Text',
        description: 'Avatar paired with user name and role description typography.',
        codeSnippet: `<Avatar
  name="Ada Lovelace"
  description="Lead Architect"
  variant="purple"
  status="online"
  icon={<User />}
/>`,
      },
      {
        id: 'avatar-bot',
        title: 'AI Assistant & Bot Avatar',
        description: 'Vibrant pop yellow avatar with Lucide Bot icon and custom status badge.',
        codeSnippet: `<Avatar
  name="Rawkit Bot"
  description="AI Assistant"
  variant="yellow"
  status="busy"
  badge="AI"
  icon={<Bot />}
/>`,
      },
      {
        id: 'avatar-system',
        title: 'System Operator Avatar',
        description: 'Pop pink avatar with Zap icon and away presence status.',
        codeSnippet: `<Avatar
  name="Zap⚡ Admin"
  description="System Operator"
  variant="pink"
  status="away"
  icon={<Zap />}
/>`,
      },
      {
        id: 'avatar-shapes',
        title: 'Brutalist Shapes & Badges',
        description: 'Circular and superellipse square avatars with status badges.',
        codeSnippet: `<div className="flex flex-wrap items-center gap-6">
  <Avatar variant="cyan" shape="square" size="lg" icon={<Shield />} status="online" />
  <Avatar variant="lime" shape="circle" size="lg" fallback="AL" badge={3} />
  <Avatar variant="orange" shape="square" size="lg" fallback="GH" status="busy" />
</div>`,
      },
      {
        id: 'avatar-group',
        title: 'Stacked Avatar Group',
        description: 'Overlapping avatar collection with hover physics and +N overflow counter.',
        codeSnippet: `<AvatarGroup max={3}>
  <Avatar variant="purple" fallback="AB" />
  <Avatar variant="yellow" fallback="CD" />
  <Avatar variant="pink" fallback="EF" />
  <Avatar variant="cyan" fallback="GH" />
  <Avatar variant="lime" fallback="IJ" />
</AvatarGroup>`,
      },
    ],
    props: [
      { name: 'src', type: 'string', default: 'undefined', description: 'Image source URL' },
      { name: 'icon', type: 'ReactNode', default: '<User />', description: 'Lucide icon element displayed as graphic fallback' },
      { name: 'fallback', type: 'ReactNode', default: 'alt initials', description: 'Text initials or custom fallback node' },
      { name: 'name', type: 'ReactNode', default: 'undefined', description: 'Primary label text beside avatar' },
      { name: 'description', type: 'ReactNode', default: 'undefined', description: 'Secondary description or role text beside avatar' },
      { name: 'variant', type: "'purple' | 'yellow' | 'pink' | 'orange' | 'cyan' | 'lime' | 'mint' | 'zinc'", default: "'purple'", description: 'Pop-Brutalist color theme' },
      { name: 'shape', type: "'circle' | 'square'", default: "'circle'", description: 'Circular or rounded brutalist square container' },
      { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'", default: "'md'", description: 'Avatar diameter and icon size' },
      { name: 'status', type: "'online' | 'busy' | 'offline' | 'away'", default: 'undefined', description: 'Presence indicator badge' },
      { name: 'badge', type: 'string | number', default: 'undefined', description: 'Notification badge content on top-right' },
    ],
  },
  breadcrumb: {
    id: 'breadcrumb', name: 'Breadcrumb', category: 'Navigation',
    description: 'Responsive semantic breadcrumb trail with optional collapsed items for deep navigation.',
    cliCommand: 'npx shadcn add @rawkitui/breadcrumb',
    codeSnippet: `import { Breadcrumb } from "@/components/ui/breadcrumb"

<Breadcrumb items={[{ label: "Docs", href: "/docs" }, { label: "Button", current: true }]} />`,
    props: [
      { name: 'items', type: 'Array<BreadcrumbItem>', default: '[]', description: 'Labels, optional links, and current page state' },
      { name: 'maxItems', type: 'number', default: 'undefined', description: 'Collapses the middle of long trails' },
    ],
  },
  calendar: {
    id: 'calendar', name: 'Calendar', category: 'Form Controls',
    description: 'Keyboard-friendly month calendar with selection, navigation, and date constraints.',
    cliCommand: 'npx shadcn add @rawkitui/calendar',
    codeSnippet: `import { Calendar } from "@/components/ui/calendar"

<Calendar onValueChange={(date) => console.log(date)} />`,
    props: [
      { name: 'value', type: 'Date', default: 'undefined', description: 'Controlled selected date' },
      { name: 'onValueChange', type: '(date?: Date) => void', default: 'undefined', description: 'Called when a day is selected or cleared' },
      { name: 'minDate / maxDate', type: 'Date', default: 'undefined', description: 'Optional date boundaries' },
      { name: 'disabled', type: '(date: Date) => boolean', default: 'undefined', description: 'Predicate for unavailable days' },
    ],
  },
  command: {
    id: 'command', name: 'Command', category: 'Navigation',
    description: 'Searchable command list with grouped results, keyboard navigation, and selection state.',
    cliCommand: 'npx shadcn add @rawkitui/command',
    codeSnippet: `import { Command } from "@/components/ui/command"

<Command items={[{ value: "button", label: "Add Button", group: "Components" }]} />`,
    props: [
      { name: 'items', type: 'Array<CommandItem>', default: '[]', description: 'Searchable commands with labels, groups, icons, and keywords' },
      { name: 'onSelect', type: '(item: CommandItem) => void', default: 'undefined', description: 'Called after a command is selected' },
      { name: 'placeholder', type: 'string', default: "'Search commands...'", description: 'Search input placeholder' },
    ],
  },
  'dropdown-menu': {
    id: 'dropdown-menu', name: 'Dropdown Menu', category: 'Navigation',
    description: 'Compact action menu with separators, shortcuts, and keyboard controls.',
    cliCommand: 'npx shadcn add @rawkitui/dropdown-menu',
    codeSnippet: `import { DropdownMenu } from "@/components/ui/dropdown-menu"

<DropdownMenu items={[{ label: "Edit", onSelect: () => {} }]} />`,
    props: [
      { name: 'items', type: 'Array<DropdownMenuItem>', default: '[]', description: 'Menu actions, separators, icons, shortcuts, and disabled states' },
      { name: 'trigger', type: 'ReactNode', default: 'Menu', description: 'Custom trigger content' },
      { name: 'align', type: "'start' | 'end'", default: "'start'", description: 'Menu edge alignment' },
    ],
  },
  'empty-state': {
    id: 'empty-state', name: 'Empty State', category: 'Feedback & Data',
    description: 'Friendly, action-ready placeholder for empty lists and first-run screens.',
    cliCommand: 'npx shadcn add @rawkitui/empty-state',
    codeSnippet: `import { EmptyState } from "@/components/ui/empty-state"

<EmptyState title="No projects yet" description="Create your first project to get started." />`,
    props: [
      { name: 'title', type: 'ReactNode', default: 'required', description: 'Primary empty state message' },
      { name: 'description', type: 'ReactNode', default: 'undefined', description: 'Supporting context' },
      { name: 'action', type: 'ReactNode', default: 'undefined', description: 'Optional call to action' },
      { name: 'variant', type: "'white' | 'mint' | 'peach' | 'lavender' | 'sky'", default: "'white'", description: 'Pastel surface variant' },
    ],
  },
  pagination: {
    id: 'pagination', name: 'Pagination', category: 'Navigation',
    description: 'Responsive page navigation with ellipsis compression and disabled edge controls.',
    cliCommand: 'npx shadcn add @rawkitui/pagination',
    codeSnippet: `import { Pagination } from "@/components/ui/pagination"

<Pagination currentPage={2} totalPages={8} onPageChange={setPage} />`,
    props: [
      { name: 'currentPage', type: 'number', default: 'required', description: 'One-indexed current page' },
      { name: 'totalPages', type: 'number', default: 'required', description: 'Total number of pages' },
      { name: 'onPageChange', type: '(page: number) => void', default: 'required', description: 'Page selection callback' },
      { name: 'siblingCount', type: 'number', default: '1', description: 'Number of pages shown around the current page' },
    ],
  },
  progress: {
    id: 'progress', name: 'Progress', category: 'Feedback & Data',
    description: 'Pop-Brutalist progress bar featuring barber-pole stripes, floating percentage pins, arcade segment notches, and fiery red pop gradients.',
    cliCommand: 'npx shadcn add @rawkitui/progress',
    codeSnippet: `import { Progress } from "@/components/ui/progress"

<Progress
  value={78}
  label="System Deployment"
  description="Processing assets and compiling registry"
  variant="yellow"
  striped
  animated
  showPin
  size="lg"
/>`,
    examples: [
      {
        id: 'progress-pin',
        title: 'Barber Stripes & Floating Pin',
        description: 'Animated Pop-Brutalist barber-pole stripes with a floating percentage pin tag.',
        codeSnippet: `<Progress
  value={78}
  label="System Deployment"
  description="Processing assets and compiling registry"
  variant="yellow"
  striped
  animated
  showPin
  size="lg"
/>`,
      },
      {
        id: 'progress-arcade',
        title: 'Arcade HP Gauge',
        description: 'Segmented notch dividers giving an arcade HP/mana bar appearance.',
        codeSnippet: `<Progress
  value={60}
  label="Arcade HP Gauge"
  description="Segmented notch dividers"
  variant="mint"
  segments={5}
  showValue
  size="md"
/>`,
      },
      {
        id: 'progress-gradient',
        title: 'Red Pop Gradient Fill',
        description: 'Fiery red pop gradient fill with extra-large track height.',
        codeSnippet: `<Progress
  value={90}
  label="Level 42 EXP"
  description="Fiery red pop gradient fill"
  variant="gradient"
  showValue
  size="xl"
/>`,
      },
      {
        id: 'progress-indeterminate',
        title: 'Indeterminate Loading State',
        description: 'Pulsing marquee animation for unknown loading duration.',
        codeSnippet: `<Progress
  indeterminate
  label="Syncing Workspace"
  description="Connecting to remote repository..."
  variant="sky"
  size="sm"
/>`,
      },
    ],
    props: [
      { name: 'value', type: 'number', default: '0', description: 'Current progress amount' },
      { name: 'max', type: 'number', default: '100', description: 'Maximum progress amount' },
      { name: 'label', type: 'ReactNode', default: 'undefined', description: 'Primary header title' },
      { name: 'description', type: 'ReactNode', default: 'undefined', description: 'Secondary header subtitle' },
      { name: 'showValue', type: 'boolean', default: 'false', description: 'Displays percentage badge in header or inside bar' },
      { name: 'showPin', type: 'boolean', default: 'false', description: 'Renders a floating percentage pin tag over leading edge' },
      { name: 'striped', type: 'boolean', default: 'false', description: 'Adds diagonal Pop-Brutalist barber-pole stripes' },
      { name: 'animated', type: 'boolean', default: 'false', description: 'Animates stripe background movement' },
      { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Displays pulsing marquee loader for unknown progress' },
      { name: 'segments', type: 'number', default: 'undefined', description: 'Renders arcade notch dividers across track' },
      { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Track thickness scale' },
      { name: 'shape', type: "'pill' | 'rounded'", default: "'pill'", description: 'Capsule or rounded rectangular track outline' },
      { name: 'variant', type: "'yellow' | 'orange' | 'mint' | 'violet' | 'pink' | 'sky' | 'lime' | 'gradient' | 'sunset' | 'neon'", default: "'yellow'", description: 'Candy pop color fill theme' },
    ],
  },
  skeleton: {
    id: 'skeleton', name: 'Skeleton', category: 'Feedback & Data',
    description: 'Motion-aware loading placeholder for text, avatars, and content blocks.',
    cliCommand: 'npx shadcn add @rawkitui/skeleton',
    codeSnippet: `import { Skeleton } from "@/components/ui/skeleton"

<Skeleton variant="text" className="w-48" />`,
    props: [
      { name: 'variant', type: "'text' | 'circle' | 'rect'", default: "'rect'", description: 'Shape preset for common loading layouts' },
      { name: 'className', type: 'string', default: 'undefined', description: 'Tailwind sizing and layout overrides' },
    ],
  },
  sonner: {
    id: 'sonner', name: 'Toast', category: 'Feedback & Data',
    description: 'Provider-based tactile notifications with status semantics, auto-dismiss, and manual dismissal.',
    cliCommand: 'npx shadcn add @rawkitui/sonner',
    codeSnippet: `import { ToastProvider, useToast } from "@/components/ui/sonner"

const { toast } = useToast()
toast({ title: "Saved", variant: "success" })`,
    props: [
      { name: 'ToastProvider', type: 'component', default: 'required', description: 'Provides the toast API and live region' },
      { name: 'duration', type: 'number', default: '4000', description: 'Auto-dismiss delay in milliseconds; 0 disables it' },
      { name: 'toast', type: '(options: ToastOptions) => string', default: 'provided by hook', description: 'Creates a notification and returns its id' },
    ],
  },
  table: {
    id: 'table', name: 'Table', category: 'Feedback & Data',
    description: 'Composable responsive data table primitives with readable row states and horizontal overflow.',
    cliCommand: 'npx shadcn add @rawkitui/table',
    codeSnippet: `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

<Table><TableHeader><TableRow><TableHead>Name</TableHead></TableRow></TableHeader></Table>`,
    props: [
      { name: 'Table', type: 'HTMLTableElement props', default: 'undefined', description: 'Responsive table wrapper and table element' },
      { name: 'TableHeader / TableBody / TableFooter', type: 'HTML section props', default: 'undefined', description: 'Semantic table sections' },
      { name: 'TableRow / TableHead / TableCell', type: 'HTML row and cell props', default: 'undefined', description: 'Composable row and cell primitives' },
    ],
  },
  slider: {
    id: 'slider', name: 'Slider', category: 'Form Controls',
    description: 'Pop-Brutalist range slider featuring custom track fills, tactile brutalist thumbs, floating tooltip pins, and step tick marks.',
    cliCommand: 'npx shadcn add @rawkitui/slider',
    codeSnippet: `import { Slider } from "@/components/ui/slider"

// Slider with Floating Tooltip Pin
<Slider
  label="Motion Intensity"
  description="Adjust transition speed"
  defaultValue={72}
  variant="orange"
  showPin
  showValue
/>`,
    examples: [
      {
        id: 'slider-basic',
        title: 'Floating Tooltip Pin',
        description: 'Tactile Pop Orange slider with a floating value pin that tracks the thumb during drag.',
        codeSnippet: `<Slider
  label="Motion Intensity"
  description="Adjust transition speed"
  defaultValue={72}
  variant="orange"
  showPin
  showValue
/>`,
      },
      {
        id: 'slider-variants',
        title: 'Pop Color & Red Gradient Fills',
        description: 'Curated Pop-Brutalist color variants including Red Pop Gradient, Mint Green, and Pop Yellow.',
        codeSnippet: `<div className="space-y-6">
  <Slider label="Audio Volume" defaultValue={85} variant="gradient" showValue />
  <Slider label="Brightness" defaultValue={40} variant="yellow" showValue />
  <Slider label="Eco Speed" defaultValue={60} variant="mint" showValue />
</div>`,
      },
      {
        id: 'slider-ticks',
        title: 'Step Ticks & Discrete Marks',
        description: 'Slider with discrete step tick marks along the track container.',
        codeSnippet: `<Slider
  label="Grid Columns"
  description="Select between 1 to 10 columns"
  min={1}
  max={10}
  step={1}
  defaultValue={4}
  variant="sky"
  showTicks
  showValue
/>`,
      },
      {
        id: 'slider-shapes',
        title: 'Brutalist Square Superellipse Thumb',
        description: 'Slider with a rounded square brutalist thumb handle.',
        codeSnippet: `<Slider
  label="Shadow Offset"
  defaultValue={65}
  variant="pink"
  thumbShape="square"
  showPin
/>`,
      },
    ],
    props: [
      { name: 'value / defaultValue', type: 'number', default: '50', description: 'Controlled or initial slider value' },
      { name: 'onValueChange', type: '(value: number) => void', default: 'undefined', description: 'Called when range changes' },
      { name: 'label', type: 'ReactNode', default: 'undefined', description: 'Primary header title' },
      { name: 'description', type: 'ReactNode', default: 'undefined', description: 'Secondary header subtitle' },
      { name: 'showValue', type: 'boolean', default: 'false', description: 'Displays right-aligned value badge tag in header' },
      { name: 'showPin', type: 'boolean', default: 'false', description: 'Renders a floating tooltip pin badge over the thumb' },
      { name: 'showTicks', type: 'boolean', default: 'false', description: 'Renders discrete step tick dots along the track' },
      { name: 'thumbShape', type: "'circle' | 'square'", default: "'circle'", description: 'Circular or superellipse square thumb handle' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Track thickness and thumb size' },
      { name: 'variant', type: "'yellow' | 'orange' | 'mint' | 'violet' | 'pink' | 'sky' | 'lime' | 'gradient' | 'sunset' | 'neon'", default: "'orange'", description: 'Pop-Brutalist color theme' },
    ],
  },
  'toggle-group': {
    id: 'toggle-group', name: 'Toggle Group', category: 'Form Controls',
    description: 'Single or multi-select toggle controls for compact modes, filters, and view switches.',
    cliCommand: 'npx shadcn add @rawkitui/toggle-group',
    codeSnippet: `import { ToggleGroup } from "@/components/ui/toggle-group"

<ToggleGroup items={[{ value: "grid", label: "Grid" }, { value: "list", label: "List" }]} />`,
    props: [
      { name: 'items', type: 'Array<ToggleItem>', default: '[]', description: 'Toggle labels, icons, values, and disabled states' },
      { name: 'type', type: "'single' | 'multiple'", default: "'single'", description: 'Selection mode' },
      { name: 'variant', type: "'default' | 'outline'", default: "'default'", description: 'Unselected control styling' },
    ],
  },
  button: {
    id: 'button',
    name: 'Button',
    category: 'Primitives',
    description: 'Tactile Pop-Brutalist action button with hard zero-blur offset shadow and physical press physics.',
    cliCommand: 'npx shadcn add @rawkitui/button',
    codeSnippet: `import { Button } from "@/components/ui/button"

export default function ButtonDemo() {
  return <Button variant="primary">Primary CTA</Button>
}`,
    examples: [
      {
        id: 'primary',
        title: 'Primary',
        description: 'The standard primary call-to-action button with signature yellow fill (#FDE047) and 4px zero-blur black shadow.',
        codeSnippet: `<Button variant="primary">Primary CTA</Button>`,
      },
      {
        id: 'secondary',
        title: 'Secondary & Pop Accents',
        description: 'Curated Pop-Brutalist color variants including secondary orange, accent violet, ink black, outline, and soft pastel fills.',
        codeSnippet: `<div className="flex flex-wrap gap-4">
  <Button variant="secondary">Secondary</Button>
  <Button variant="accent">Accent</Button>
  <Button variant="mint">Pastel Mint</Button>
  <Button variant="peach">Pastel Peach</Button>
  <Button variant="sky">Pastel Sky</Button>
  <Button variant="pink">Pastel Pink</Button>
  <Button variant="black">Ink Solid</Button>
  <Button variant="outline">Outline</Button>
</div>`,
      },
      {
        id: 'icon',
        title: 'With Icon',
        description: 'Buttons paired with leading or trailing Lucide React vector icons.',
        codeSnippet: `<div className="flex flex-wrap gap-4">
  <Button variant="primary">
    <Mail className="w-4 h-4 mr-2 stroke-[2.5]" /> Login with Email
  </Button>
  <Button variant="black">
    Next Step <ArrowRight className="w-4 h-4 ml-2 stroke-[2.5]" />
  </Button>
</div>`,
      },
      {
        id: 'fab',
        title: 'Icon Only & FAB',
        description: 'Circular floating action buttons and compact square icon triggers.',
        codeSnippet: `<div className="flex items-center gap-4">
  <Button variant="yellow" shape="fab">
    <Plus className="w-5 h-5 text-black stroke-[2.5]" />
  </Button>
  <Button variant="peach" shape="square" size="icon">
    <Sparkles className="w-5 h-5 text-black stroke-[2.5]" />
  </Button>
  <Button variant="black" shape="pill" size="icon">
    <Star className="w-4 h-4 text-[#FDE047] stroke-[2.5]" />
  </Button>
</div>`,
      },
      {
        id: 'loading',
        title: 'Loading State',
        description: 'Displays an animated Lucide spinner and disables pointer interactions.',
        codeSnippet: `<div className="flex flex-wrap gap-4">
  <Button variant="primary" isLoading>Please wait</Button>
  <Button variant="black" isLoading>Deploying</Button>
</div>`,
      },
      {
        id: 'shapes',
        title: 'Shapes & Stances',
        description: 'Supports capsule pill (rounded-full), standard superellipse (rounded-2xl), and square corners.',
        codeSnippet: `<div className="flex flex-wrap gap-4">
  <Button variant="primary" shape="pill">Capsule Pill</Button>
  <Button variant="mint" shape="default">Superellipse</Button>
  <Button variant="peach" shape="square">Square</Button>
</div>`,
      },
      {
        id: 'sizes',
        title: 'Sizes',
        description: 'Small (sm), Medium (md), and Large (lg) button scaling options.',
        codeSnippet: `<div className="flex items-center gap-4">
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large CTA</Button>
</div>`,
      },
      {
        id: 'disabled',
        title: 'Disabled State',
        description: 'Disabled button styling with reduced opacity and muted interaction physics.',
        codeSnippet: `<Button variant="primary" disabled>Disabled Action</Button>`,
      },
      {
        id: 'shadows',
        title: 'Shadow Options & Pop Colors',
        description: 'Customize shadows with pop color offset shadows (orange, violet, mint, pink, sky), soft elevated shadows, or flat outline mode.',
        codeSnippet: `<div className="flex flex-wrap gap-4">
  <Button variant="outline" shadowColor="orange">Orange Shadow</Button>
  <Button variant="outline" shadowColor="violet">Violet Shadow</Button>
  <Button variant="outline" shadowColor="mint">Mint Shadow</Button>
  <Button variant="outline" shadowColor="pink">Pink Shadow</Button>
  <Button variant="primary" shadowStyle="soft">Soft Elevated</Button>
  <Button variant="secondary" shadowStyle="none">Flat Outline</Button>
</div>`,
      },
    ],
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'accent' | 'mint' | 'peach' | 'sky' | 'pink' | 'black' | 'outline'", default: "'primary'", description: 'Sets the fill background color token' },
      { name: 'shape', type: "'default' | 'pill' | 'fab' | 'square'", default: "'pill'", description: 'Controls corner radius stance (28px superellipse or rounded-full capsule)' },
      { name: 'size', type: "'sm' | 'md' | 'lg' | 'icon'", default: "'md'", description: 'Button dimensions and font sizing' },
      { name: 'shadowColor', type: "'ink' | 'yellow' | 'orange' | 'violet' | 'mint' | 'pink' | 'sky'", default: "'ink'", description: 'Custom offset shadow color' },
      { name: 'shadowStyle', type: "'hard' | 'soft' | 'none'", default: "'hard'", description: 'Shadow style (classic zero-blur offset, soft elevated, or flat)' },
      { name: 'isLoading', type: 'boolean', default: 'false', description: 'Shows loading spinner and disables button' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables button interactions' },
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
    name: 'Badge',
    category: 'Primitives',
    description: 'Capsule pill tags and square tags for labels, statuses, and highlights.',
    cliCommand: 'npx shadcn add @rawkitui/badge',
    codeSnippet: `import { Badge } from "@/components/ui/badge"

export default function BadgeDemo() {
  return (
    <div className="flex items-center gap-4">
      <Badge variant="yellow" shape="pill">Pill Tag</Badge>
      <Badge variant="violet" shape="pill">Violet Tag</Badge>
      <Badge variant="black" shape="square">Square</Badge>
    </div>
  )
}`,
    props: [
      { name: 'variant', type: "'yellow' | 'orange' | 'violet' | 'mint' | 'peach' | 'sky' | 'pink' | 'lavender' | 'black' | 'white'", default: "'yellow'", description: 'Fill color token' },
      { name: 'shape', type: "'pill' | 'square'", default: "'pill'", description: 'Shape geometry — pill capsule or rounded square' },
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
