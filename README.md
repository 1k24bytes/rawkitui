<div align="center">

# RAWKITUI

Pop-Brutalist UI Primitives and Custom Shadcn Registry for React

[![](https://img.shields.io/badge/License-MIT-FDE047?style=for-the-badge&logoColor=18181B&labelColor=18181B)](LICENSE)
[![](https://img.shields.io/badge/Registry-Shadcn-BBF7D0?style=for-the-badge&logoColor=18181B&labelColor=18181B)](https://rawkitui.zerodegree.tech/r/index.json)
[![](https://img.shields.io/badge/Tailwind-v4-BAE6FD?style=for-the-badge&logoColor=18181B&labelColor=18181B)](https://tailwindcss.com)
[![](https://img.shields.io/badge/React-19-FBCFE8?style=for-the-badge&logoColor=18181B&labelColor=18181B)](https://react.dev)

<br />

```bash
npx shadcn add @rawkitui
```

</div>

<br />

## About

RawkitUI is an open-source, high-contrast Pop-Brutalist component library built with React 19, Tailwind CSS, Motion spring physics, and Lucide icons. It operates natively as a custom shadcn CLI registry, allowing developers to add tactile primitives directly into their projects without external runtime bloat.

<br />

## Features

- **30 Pop-Brutalist Primitives**: Buttons, Cards, Sliders, Avatars, Modals, Tables, Toast notifications, Navigation, and Form Controls.
- **Shadcn CLI Compatible**: Install components directly using standard `npx shadcn add` commands.
- **Command Palette Search**: Global search modal accessible via `Cmd + K` or `Ctrl + K`.
- **Zero Lock-In**: Complete source code added straight into your project folder.
- **Tactile Micro-Interactions**: Hard drop shadows, high-contrast borders, and spring physics.

<br />

## Tech Stack

**Core** — React 19 · TypeScript · Vite · Tailwind CSS v4

**Animation & Icons** — Motion (Framer Motion) · Lucide Icons

**Architecture** — Shadcn CLI Registry · Node.js Registry Compiler

**Deployment** — Cloudflare Pages · CORS Headers · SPA Fallback Routing

<br />

## Quickstart & Installation

### Step 1: Initialize Shadcn & Install Dependencies

```bash
npx shadcn@latest init
npm install motion lucide-react clsx tailwind-merge
```

### Step 2: Register RawkitUI in components.json

Open your project's `components.json` and register RawkitUI:

```json
{
  "registries": {
    "@rawkitui": "https://rawkitui.zerodegree.tech/r/{name}.json"
  }
}
```

### Step 3: Add Components via Shadcn CLI

```bash
npx shadcn add @rawkitui/button @rawkitui/card @rawkitui/slider @rawkitui/avatar
```

### Step 4: Import & Start Building

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"

export default function App() {
  return (
    <Card variant="mint" badge="NEW" isInteractive>
      <CardHeader>
        <CardTitle>Hello RawkitUI</CardTitle>
      </CardHeader>
      <Button variant="primary" shape="pill">
        <User className="w-4 h-4 mr-2" /> Launch App
      </Button>
    </Card>
  )
}
```

<br />

## Component Catalog

| Category | Components |
| :--- | :--- |
| **Actions** | Button, ToggleGroup |
| **Containers** | Card, Accordion, Dialog |
| **Data Display** | Avatar, Badge, Table, Skeleton, Progress, BarChart |
| **Navigation** | FloatingNav, Breadcrumb, Pagination, Stepper |
| **Overlay & Feedback** | CommandPalette, DropdownMenu, Tooltip, Sonner Toast, Alert, EmptyState |
| **Form Controls** | Input, Textarea, Select, Switch, RadioGroup, Calendar, Slider, Checkbox |

<br />

## Maintainer & Connect

<div align="center">

### Built by Tawqeer (`1k24bytes`)

Building on the web, working with AI

[![](https://img.shields.io/badge/GitHub-1k24bytes-18181B?style=for-the-badge&logo=github&logoColor=FDE047)](https://github.com/1k24bytes)
[![](https://img.shields.io/badge/Email-tawqeerdar21@gmail.com-FED7AA?style=for-the-badge&logo=gmail&logoColor=18181B)](mailto:tawqeerdar21@gmail.com)
[![](https://img.shields.io/badge/Instagram-@tawqee___er-E9D5FF?style=for-the-badge&logo=instagram&logoColor=18181B)](https://instagram.com/tawqee___er)
[![](https://img.shields.io/badge/Discord-Join_Server-BAE6FD?style=for-the-badge&logo=discord&logoColor=18181B)](https://discord.gg/liizwiiz)

</div>

<br />

## License

Distributed under the MIT License. See `LICENSE` for details.
