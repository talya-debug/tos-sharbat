import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ClipboardCheck, BookOpen } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import Header from '../components/Header';
import Accordion from '../components/Accordion';
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

  return (
    <div className="page">
      <Header title={isHe ? trade.name : (trade.nameEn || trade.name)} />

      <div className="tab-bar">
        <button className="tab active">
          <BookOpen size={15} />
          <span>{isHe ? 'מדריך ביצוע' : 'Methodology'}</span>
        </button>
        <button className="tab" onClick={() => navigate(`/trade/${tradeId}/checklist`)}>
          <ClipboardCheck size={15} />
          <span>{isHe ? 'בקרת איכות' : 'QC Checklist'}</span>
        </button>
      </div>

      <div className="sections">
        {data.sections.map((section, i) => {
          const Icon = LucideIcons[section.icon] || LucideIcons.FileText;
          return (
            <Accordion
              key={i}
              icon={Icon}
              title={isHe ? section.title : (section.titleEn || section.title)}
              color={trade.color}
              isOpen={openSection === i}
              onToggle={() => setOpenSection(prev => prev === i ? -1 : i)}
            >
              <ol className="accordion-list">
                {section.items.map((item, j) => (
                  <li key={j}>{isHe ? item.text : (item.textEn || item.text)}</li>
                ))}
              </ol>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
}
