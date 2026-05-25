import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Camera, Save, ChevronDown } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import Header from '../components/Header';
import { useLang } from '../context/LanguageContext';
import { trades } from '../data/trades';
import { tradeData } from '../data/tradeData';

const STATUS = { unchecked: 'unchecked', pass: 'pass', fail: 'fail' };

export default function ChecklistPage() {
  const { tradeId } = useParams();
  const navigate = useNavigate();
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
          const isOpen = openSection === si;
          return (
            <div key={si} className={`accordion ${isOpen ? 'open' : ''}`}>
              <button
                className="accordion-header"
                style={{ borderRightColor: trade.color }}
                onClick={() => setOpenSection(prev => prev === si ? -1 : si)}
              >
                <div className="accordion-header-right">
                  <Icon size={18} style={{ color: trade.color }} />
                  <span>{isHe ? section.title : (section.titleEn || section.title)}</span>
                </div>
                <ChevronDown size={18} className={`accordion-chevron ${isOpen ? 'rotate' : ''}`} />
              </button>
              <div className="accordion-body">
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
                        <span className="checklist-item-text">{item}</span>
                        <button className="camera-btn" onClick={() => {}}>
                          <Camera size={18} />
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
            </div>
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
          <Save size={18} />
          <span>{isHe ? 'שמירת דו"ח' : 'Save Report'}</span>
        </button>
      </div>
    </div>
  );
}
