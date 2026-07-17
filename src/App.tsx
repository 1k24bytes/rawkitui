import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { DocsLayout } from '@/components/layout/DocsLayout'
import { Home } from '@/pages/Home'
import { ComponentDocPage } from '@/pages/ComponentDocPage'
import { QuickstartPage } from '@/pages/QuickstartPage'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F4F4F0] text-[#18181B] font-sans antialiased">
        <Header />
        <Routes>
          {/* Flashy Homepage */}
          <Route path="/" element={<Home />} />

          {/* Component Documentation Pages (Sidebar + Main View) */}
          <Route path="/components" element={<DocsLayout />}>
            <Route index element={<Navigate to="/components/button" replace />} />
            <Route path="quickstart" element={<QuickstartPage />} />
            <Route path=":id" element={<ComponentDocPage />} />
          </Route>

          {/* Legacy Redirects from /docs to /components */}
          <Route path="/docs" element={<Navigate to="/components/button" replace />} />
          <Route path="/docs/quickstart" element={<Navigate to="/components/quickstart" replace />} />
          <Route path="/docs/:id" element={<Navigate to="/components/button" replace />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}
