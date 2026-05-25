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
              style={{ borderRightColor: trade.color }}
              onClick={() => navigate(`/trade/${trade.id}`)}
            >
              <img
                className="trade-card-image"
                src={trade.image}
                alt={trade.name}
                loading="lazy"
              />
              <div className="trade-card-body">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div
                    className="trade-card-icon"
                    style={{ backgroundColor: trade.color + '18', color: trade.color }}
                  >
                    <Icon size={20} />
                  </div>
                  <span className="trade-card-name">
                    {isHe ? trade.name : (trade.nameEn || trade.name)}
                  </span>
                </div>
                <span className="trade-card-desc">
                  {isHe ? trade.desc : (trade.descEn || trade.desc)}
                </span>
              </div>
              <ChevronLeft size={20} className="trade-card-arrow" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
