# ⚡ RawkitUI — Pop-Brutalist Component Library & Shadcn Registry

> High-contrast, tactile Pop-Brutalist UI primitives built with React 19, Tailwind CSS, Motion spring physics, and Lucide icons. Operates as an open-source custom `shadcn` CLI registry.

---

## ✨ Features

- 🎨 **30 Pop-Brutalist Components**: Buttons, Cards, Sliders, Avatars, Modals, Tables, Toast notifications, Navigation, Form Controls, and more.
- 📦 **Shadcn CLI Registry Compatible**: Add components directly to any React project using `npx shadcn add @rawkitui/component-name`.
- ⚡ **Zero Setup Friction**: Operates with standard React 19, Tailwind CSS v3/v4, `motion`, and `lucide-react`.
- 🔍 **Global Command Palette (`Cmd + K` / `Ctrl + K`)**: Built-in instant component search and command navigation.
- ♿ **Fully Accessible**: Accessible keyboard controls, screen-reader semantics, and focus ring treatments.
- 📄 **MIT Licensed**: 100% free and open-source for personal and commercial projects.

---

## 🚀 Quickstart & Installation

### Step 1: Initialize Shadcn & Install Prerequisites

```bash
# 1. Initialize shadcn CLI in your React / Next / Vite project
npx shadcn@latest init

# 2. Install essential animation, icon, and utility packages
npm install motion lucide-react clsx tailwind-merge
```

### Step 2: Register RawkitUI in `components.json`

Open your project's `components.json` and register RawkitUI as a custom registry:

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
        <CardTitle>Hello RawkitUI!</CardTitle>
      </CardHeader>
      <Button variant="primary" shape="pill">
        <User className="w-4 h-4 mr-2" /> Launch App
      </Button>
    </Card>
  )
}
```

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run Vite dev server locally
npm run dev

# Generate JSON registry files & build production bundle
npm run build
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
