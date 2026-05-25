import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronDown, ClipboardCheck, BookOpen } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import Header from '../components/Header';
import { useLang } from '../context/LanguageContext';
import { trades } from '../data/trades';
import { tradeData } from '../data/tradeData';

export default function TradePage() {
  const { tradeId } = useParams();
  const navigate = useNavigate();
  const { isHe } = useLang();
  const trade = trades.find(t => t.id === tradeId);
  const data = tradeData[tradeId];
  const [openSection, setOpenSection] = useState(0);

  if (!trade || !data) {
    return <div className="page"><Header title="..." /><p style={{padding:24}}>{isHe ? 'מלאכה לא נמצאה' : 'Trade not found'}</p></div>;
  }

  const toggleSection = (i) => setOpenSection(prev => prev === i ? -1 : i);

  return (
    <div className="page">
      <Header title={isHe ? trade.name : (trade.nameEn || trade.name)} />

      <div className="tab-bar">
        <button className="tab active">
          <BookOpen size={16} />
          <span>{isHe ? 'מדריך ביצוע' : 'Methodology'}</span>
        </button>
        <button className="tab" onClick={() => navigate(`/trade/${tradeId}/checklist`)}>
          <ClipboardCheck size={16} />
          <span>{isHe ? 'בקרת איכות' : 'QC Checklist'}</span>
        </button>
      </div>

      <div className="sections">
        {data.sections.map((section, i) => {
          const Icon = LucideIcons[section.icon] || LucideIcons.FileText;
          const isOpen = openSection === i;
          return (
            <div key={i} className={`accordion ${isOpen ? 'open' : ''}`}>
              <button
                className="accordion-header"
                style={{ borderRightColor: trade.color }}
                onClick={() => toggleSection(i)}
              >
                <div className="accordion-header-right">
                  <Icon size={18} style={{ color: trade.color }} />
                  <span>{isHe ? section.title : (section.titleEn || section.title)}</span>
                </div>
                <ChevronDown size={18} className={`accordion-chevron ${isOpen ? 'rotate' : ''}`} />
              </button>
              <div className="accordion-body">
                <ol className="accordion-list">
                  {section.items.map((item, j) => (
                    <li key={j}>{isHe ? item : (item)}</li>
                  ))}
                </ol>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
