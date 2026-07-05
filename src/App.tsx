import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
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
          <Route path="/docs" element={<DocsLayout />}>
            <Route index element={<Navigate to="/docs/button" replace />} />
            <Route path="quickstart" element={<QuickstartPage />} />
            <Route path=":id" element={<ComponentDocPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}
