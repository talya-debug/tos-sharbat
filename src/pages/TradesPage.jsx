import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import Header from '../components/Header';
import { useLang } from '../context/LanguageContext';
import { trades } from '../data/trades';

export default function TradesPage() {
  const navigate = useNavigate();
  const { isHe } = useLang();

  return (
    <div className="page">
      <Header title={isHe ? 'בחירת מלאכה' : 'Select Trade'} showBack={false} />
      <div className="trades-grid">
        {trades.map(trade => {
          const Icon = LucideIcons[trade.icon] || LucideIcons.Wrench;
          return (
            <div
              key={trade.id}
              className="trade-card"
              style={{ borderTopColor: trade.color }}
              onClick={() => navigate(`/trade/${trade.id}`)}
            >
              <div className="trade-card-icon" style={{ backgroundColor: trade.color + '18', color: trade.color }}>
                <Icon size={28} />
              </div>
              <span className="trade-card-name">{isHe ? trade.name : (trade.nameEn || trade.name)}</span>
              <ChevronLeft size={18} className="trade-card-arrow" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
