import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import LandingPage from './pages/LandingPage';
import TradesPage from './pages/TradesPage';
import TradePage from './pages/TradePage';
import ChecklistPage from './pages/ChecklistPage';
import './App.css';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/trades" element={<TradesPage />} />
          <Route path="/trade/:tradeId" element={<TradePage />} />
          <Route path="/trade/:tradeId/checklist" element={<ChecklistPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
