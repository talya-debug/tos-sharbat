import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { trades } from '../data/trades';
import { tradeData } from '../data/tradeData';
import { useLang } from '../context/LanguageContext';
import Icon from '../components/Icon';
import TopHeader from '../components/TopHeader';

/* אייקונים לסקשנים */
const sectionIcons = {
  preparation: 'architecture',
  execution: 'square_foot',
  limitations: 'straighten',
  highlights: 'lightbulb',
  failures: 'warning',
  inspections: 'fact_check',
  safety: 'health_and_safety',
  measurement: 'straighten',
};

export default function ChecklistPage() {
  const { tradeId } = useParams();
  const navigate = useNavigate();
  const { isHe } = useLang();
  const trade = trades.find(t => t.id === tradeId);
  const data = tradeData[tradeId];

  // סקשנים רלוונטיים לבקר — ללא "before"
  const qcSections = data
    ? data.sections.filter(s => s.id !== 'before')
    : [];

  const [openSections, setOpenSections] = useState({ 0: true });
  const [results, setResults] = useState(() => {
    const saved = localStorage.getItem(`tos-checklist-${tradeId}`);
    return saved ? JSON.parse(saved) : {};
  });
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem(`tos-defects-${tradeId}`);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(`tos-checklist-${tradeId}`, JSON.stringify(results));
  }, [results, tradeId]);

  useEffect(() => {
    localStorage.setItem(`tos-defects-${tradeId}`, JSON.stringify(notes));
  }, [notes, tradeId]);

  if (!trade || !data) return <div className="p-8 text-center">מלאכה לא נמצאה</div>;

  // סטטיסטיקות
  const allItems = qcSections.flatMap(s => s.items.map(item => `${s.id}-${item.id}`));
  const totalItems = allItems.length;
  const checkedCount = allItems.filter(k => results[k]).length;
  const passCount = allItems.filter(k => results[k] === 'pass').length;
  const failCount = allItems.filter(k => results[k] === 'fail').length;

  const toggleSection = (idx) => {
    setOpenSections(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const setResult = (key, value) => {
    setResults(prev => {
      if (prev[key] === value) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: value };
    });
  };

  const getStatusClasses = (key, status) => {
    const current = results[key];
    if (current === status) {
      if (status === 'pass') return 'bg-status-success text-white border border-status-success';
      if (status === 'fail') return 'bg-status-error text-white border border-status-error';
    }
    if (status === 'pass') return 'bg-status-success/10 text-status-success border border-status-success/20 hover:bg-status-success/20';
    if (status === 'fail') return 'bg-status-error/10 text-status-error border border-status-error/20 hover:bg-status-error/20';
    return '';
  };

  const handleSave = () => {
    alert(isHe ? 'הדו"ח נשמר בהצלחה!' : 'Report saved successfully!');
  };

  return (
    <div className="min-h-screen text-on-surface" style={{ backgroundColor: '#F0F2F5', backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      {/* Header */}
      <TopHeader
        title={isHe ? trade.name : trade.nameEn}
        showBack
        tabs={[
          {
            label: isHe ? 'מדריך ביצוע' : 'Execution Guide',
            active: false,
            onClick: () => navigate(`/trade/${tradeId}`),
          },
          {
            label: isHe ? 'בקרת איכות' : 'Quality Control',
            active: true,
            onClick: () => {},
          },
        ]}
      />

      {/* Sub-header badge */}
      <div className="bg-surface-dark border-t border-on-primary/5 pb-4 px-container-margin">
        <div className="max-w-[1200px] mx-auto pt-2">
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-secondary border border-secondary/20 px-3 py-1 rounded-full text-label-lg font-medium tracking-[0.01em]">
            <Icon name="verified_user" size={18} />
            {isHe ? 'בקרת איכות' : 'Quality Control'}
          </span>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto py-8 px-container-margin mb-32">
        {/* Checklist sections */}
        <div className="space-y-4">
          {qcSections.map((section, sIdx) => {
            const isOpen = !!openSections[sIdx];
            const sectionIcon = sectionIcons[section.id] || 'checklist';

            return (
              <div key={section.id} className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm">
                {/* Section header */}
                <button
                  onClick={() => toggleSection(sIdx)}
                  className="w-full flex items-center justify-between p-4 bg-surface-container-low hover:bg-surface-container transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon name={sectionIcon} size={24} className="text-primary" />
                    <h2 className="text-title-lg leading-7 font-medium">
                      {isHe ? section.title : section.titleEn}
                    </h2>
                  </div>
                  <Icon
                    name="expand_more"
                    size={24}
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Section content */}
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={isOpen ? { maxHeight: '10000px' } : { maxHeight: '0' }}
                >
                  <div className="p-4 space-y-4 divide-y divide-outline-variant/30 balance-motif">
                    {section.items.map(item => {
                      const key = `${section.id}-${item.id}`;
                      const current = results[key];
                      const isFail = current === 'fail';

                      return (
                        <div key={item.id} className="pt-4 first:pt-0">
                          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary/40">
                                <Icon name="checklist" size={20} />
                              </div>
                              <p className="text-body-md leading-6 text-text-primary">
                                {isHe ? item.text : item.textEn}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              {!current && (
                                <>
                                  <button className="status-chip bg-surface-container text-text-secondary px-3 py-1.5 rounded-lg text-label-sm font-semibold border border-outline-variant">
                                    {isHe ? 'לא נבדק' : 'Not checked'}
                                  </button>
                                  <button
                                    onClick={() => setResult(key, 'pass')}
                                    className={`status-chip px-3 py-1.5 rounded-lg text-label-sm font-semibold ${getStatusClasses(key, 'pass')}`}
                                  >
                                    {isHe ? 'תקין' : 'Pass'}
                                  </button>
                                  <button
                                    onClick={() => setResult(key, 'fail')}
                                    className={`status-chip px-3 py-1.5 rounded-lg text-label-sm font-semibold ${getStatusClasses(key, 'fail')}`}
                                  >
                                    {isHe ? 'לא תקין' : 'Fail'}
                                  </button>
                                </>
                              )}
                              {current === 'pass' && (
                                <button
                                  onClick={() => setResult(key, 'pass')}
                                  className="status-chip bg-status-success text-white border border-status-success px-3 py-1.5 rounded-lg text-label-sm font-semibold"
                                >
                                  {isHe ? 'תקין' : 'Pass'}
                                </button>
                              )}
                              {current === 'fail' && (
                                <button
                                  onClick={() => setResult(key, 'fail')}
                                  className="status-chip bg-status-error text-white border border-status-error px-3 py-1.5 rounded-lg text-label-sm font-semibold"
                                >
                                  {isHe ? 'לא תקין' : 'Fail'}
                                </button>
                              )}
                            </div>
                          </div>
                          <input
                            className={`w-full bg-surface-container-lowest border rounded-lg px-4 py-2 text-body-sm leading-5 input-focus-effect ${
                              isFail ? 'border-status-error/30 text-status-error' : 'border-outline-variant'
                            }`}
                            placeholder={isHe ? 'הערות...' : 'Notes...'}
                            type="text"
                            value={notes[key] || ''}
                            onChange={e => setNotes(prev => ({ ...prev, [key]: e.target.value }))}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Summary Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-outline-variant shadow-sm flex flex-col">
            <h3 className="text-title-lg leading-7 font-medium mb-4 text-primary">
              {isHe ? 'בקרת איכות ויזואלית' : 'Visual QC'}
            </h3>
            <div className="grid grid-cols-3 gap-3 flex-1">
              <div className="aspect-square bg-surface-container-low rounded-lg border border-outline-variant flex items-center justify-center relative overflow-hidden group">
                <Icon name="check_circle" size={36} className="text-status-success/30 group-hover:scale-110 transition-transform" />
              </div>
              <div className="aspect-square bg-surface-container-low rounded-lg border border-outline-variant flex items-center justify-center relative overflow-hidden group">
                <Icon name="error" size={36} className="text-status-error/30 group-hover:scale-110 transition-transform" />
              </div>
              <button className="aspect-square border-2 border-dashed border-outline-variant rounded-lg flex flex-col items-center justify-center text-text-secondary hover:bg-surface-container-low transition-colors">
                <Icon name="add" size={30} />
                <span className="text-label-sm font-semibold mt-1">{isHe ? 'תיעוד' : 'Document'}</span>
              </button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-outline-variant shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-action-blue/10 flex items-center justify-center text-action-blue">
                <Icon name="monitoring" size={30} />
              </div>
              <div>
                <h3 className="text-title-lg leading-7 font-medium text-primary">{isHe ? 'מגמות איכות' : 'Quality Trends'}</h3>
                <p className="text-body-sm leading-5 text-text-secondary">
                  {isHe ? 'שיפור של 12% מהבדיקה הקודמת' : '12% improvement from last inspection'}
                </p>
              </div>
            </div>
            <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden">
              <div className="bg-action-blue h-full rounded-full" style={{ width: '75%' }}></div>
            </div>
            <div className="flex justify-between mt-2 text-label-sm font-semibold text-text-secondary">
              <span>{isHe ? 'ציון נוכחי: 75' : 'Current: 75'}</span>
              <span>{isHe ? 'יעד: 95' : 'Target: 95'}</span>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-surface-container-lowest border-t border-outline-variant shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-[1200px] mx-auto px-container-margin h-20 flex items-center justify-between">
          {/* Statistics */}
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-label-sm font-semibold text-text-secondary uppercase tracking-wider">
                {isHe ? 'סטטוס התקדמות' : 'Progress Status'}
              </span>
              <span className="text-title-lg leading-7 font-medium text-primary">
                {checkedCount}/{totalItems} {isHe ? 'נבדקו' : 'checked'}
              </span>
            </div>
            <div className="h-10 w-px bg-outline-variant"></div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-status-success"></span>
                <span className="text-body-md leading-6">{passCount} {isHe ? 'תקין' : 'pass'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-status-error"></span>
                <span className="text-body-md leading-6">{failCount} {isHe ? 'לא תקין' : 'fail'}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/trade/${tradeId}`)}
              className="bg-surface-container-lowest border border-surface-dark text-surface-dark px-6 py-2.5 rounded-lg text-label-lg font-medium tracking-[0.01em] hover:bg-surface-container-low transition-all active:scale-95"
            >
              {isHe ? 'ביטול' : 'Cancel'}
            </button>
            <button
              onClick={handleSave}
              className="bg-action-blue text-white px-8 py-2.5 rounded-lg text-label-lg font-medium tracking-[0.01em] flex items-center gap-2 shadow-lg shadow-action-blue/20 hover:bg-blue-600 transition-all active:scale-95"
            >
              <Icon name="save" size={20} />
              {isHe ? 'שמירת דו"ח' : 'Save Report'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
