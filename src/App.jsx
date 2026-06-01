import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import TradePage from './pages/TradePage'
import ChecklistPage from './pages/ChecklistPage'
import TradeViewPage from './pages/TradeViewPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
      <Route path="/trade/:tradeId" element={<Layout><TradePage /></Layout>} />
      <Route path="/trade/:tradeId/checklist" element={<Layout><ChecklistPage /></Layout>} />
      <Route path="/view/:tradeId" element={<TradeViewPage />} />
    </Routes>
  )
}

export default App
