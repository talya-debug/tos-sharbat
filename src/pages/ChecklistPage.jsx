import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Camera, Save } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import Header from '../components/Header';
import Accordion from '../components/Accordion';
import { useLang } from '../context/LanguageContext';
import { trades } from '../data/trades';
import { tradeData } from '../data/tradeData';

const STATUS = { unchecked: 'unchecked', pass: 'pass', fail: 'fail' };

export default function ChecklistPage() {
  const { tradeId } = useParams();
  const { isHe } = useLang();
  const trade = trades.find(t => t.id === tradeId);
  const data = tradeData[tradeId];
  const [openSection, setOpenSection] = useState(0);
  const [items, setItems] = useState(() => {
    if (!data) return {};
    const map = {};
    data.sections.forEach((s, si) => {
      s.items.forEach((_, ii) => {
        map[`${si}-${ii}`] = { status: STATUS.unchecked, note: '' };
      });
    });
    return map;
  });

  if (!trade || !data) {
    return <div className="page"><Header title="..." /><p style={{padding:24}}>{isHe ? 'מלאכה לא נמצאה' : 'Trade not found'}</p></div>;
  }

  const totalItems = Object.keys(items).length;
  const checkedItems = Object.values(items).filter(i => i.status !== STATUS.unchecked).length;
  const passItems = Object.values(items).filter(i => i.status === STATUS.pass).length;

  const cycleStatus = (key) => {
    setItems(prev => {
      const current = prev[key].status;
      const next = current === STATUS.unchecked ? STATUS.pass : current === STATUS.pass ? STATUS.fail : STATUS.unchecked;
      return { ...prev, [key]: { ...prev[key], status: next } };
    });
  };

  const setNote = (key, note) => {
    setItems(prev => ({ ...prev, [key]: { ...prev[key], note } }));
  };

  return (
    <div className="page checklist-page">
      <Header title={isHe ? trade.name : (trade.nameEn || trade.name)} />

      <div className="checklist-badge">
        <span>{isHe ? 'בקרת איכות' : 'Quality Control'}</span>
      </div>

      <div className="sections">
        {data.sections.map((section, si) => {
          const Icon = LucideIcons[section.icon] || LucideIcons.FileText;
          return (
            <Accordion
              key={si}
              icon={Icon}
              title={isHe ? section.title : (section.titleEn || section.title)}
              color={trade.color}
              isOpen={openSection === si}
              onToggle={() => setOpenSection(prev => prev === si ? -1 : si)}
            >
              <div style={{ borderTop: '1px solid var(--border-light)' }}>
                {section.items.map((item, ii) => {
                  const key = `${si}-${ii}`;
                  const { status, note } = items[key];
                  return (
                    <div key={ii} className="checklist-item">
                      <div className="checklist-item-top">
                        <button
                          className={`status-btn ${status}`}
                          onClick={() => cycleStatus(key)}
                        >
                          {status === STATUS.pass ? (isHe ? 'תקין' : 'Pass') :
                           status === STATUS.fail ? (isHe ? 'לא תקין' : 'Fail') :
                           (isHe ? 'לא נבדק' : 'N/A')}
                        </button>
                        <span className="checklist-item-text">{isHe ? item.text : (item.textEn || item.text)}</span>
                        <button className="camera-btn" onClick={() => {}}>
                          <Camera size={15} />
                        </button>
                      </div>
                      <input
                        className="checklist-note"
                        placeholder={isHe ? 'הערות...' : 'Notes...'}
                        value={note}
                        onChange={e => setNote(key, e.target.value)}
                      />
                    </div>
                  );
                })}
              </div>
            </Accordion>
          );
        })}
      </div>

      <div className="checklist-summary">
        <div className="summary-stats">
          <span className="summary-checked">{checkedItems}/{totalItems} {isHe ? 'נבדקו' : 'checked'}</span>
          <span className="summary-pass">{passItems} {isHe ? 'תקין' : 'pass'}</span>
          <span className="summary-fail">{checkedItems - passItems} {isHe ? 'לא תקין' : 'fail'}</span>
        </div>
        <button className="save-report-btn" onClick={() => alert(isHe ? 'הדו"ח נשמר (דמו)' : 'Report saved (demo)')}>
          <Save size={16} />
          <span>{isHe ? 'שמירת דו"ח' : 'Save Report'}</span>
        </button>
      </div>
    </div>
  );
}
