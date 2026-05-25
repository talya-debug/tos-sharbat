import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { trades } from '../data/trades';
import { tradeData } from '../data/tradeData';
import { useLang } from '../context/LanguageContext';
import Icon from '../components/Icon';
import TopHeader from '../components/TopHeader';

/* מיפוי צבעים לאייקון של כל סקשן */
const sectionStyles = {
  before: { bg: 'bg-blue-100', text: 'text-blue-600', icon: 'assignment' },
  preparation: { bg: 'bg-amber-100', text: 'text-amber-600', icon: 'build' },
  execution: { bg: 'bg-green-100', text: 'text-green-600', icon: 'format_list_numbered_rtl' },
  limitations: { bg: 'bg-orange-100', text: 'text-orange-600', icon: 'block' },
  highlights: { bg: 'bg-purple-100', text: 'text-purple-600', icon: 'lightbulb' },
  failures: { bg: 'bg-red-100', text: 'text-red-600', icon: 'warning' },
  inspections: { bg: 'bg-teal-100', text: 'text-teal-600', icon: 'fact_check' },
  safety: { bg: 'bg-slate-100', text: 'text-slate-600', icon: 'health_and_safety' },
  measurement: { bg: 'bg-indigo-100', text: 'text-indigo-600', icon: 'straighten' },
};

export default function TradePage() {
  const { tradeId } = useParams();
  const navigate = useNavigate();
  const { isHe } = useLang();
  const trade = trades.find(t => t.id === tradeId);
  const data = tradeData[tradeId];
  const [openSections, setOpenSections] = useState({ 0: true });

  if (!trade || !data) return <div className="p-8 text-center">מלאכה לא נמצאה</div>;

  const toggleSection = (idx) => {
    setOpenSections(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="min-h-screen bg-background-alt text-on-surface">
      {/* Header - matches stitch-methodology.html */}
      <TopHeader
        title={isHe ? trade.name : trade.nameEn}
        showBack
        tabs={[
          {
            label: isHe ? 'מדריך ביצוע' : 'Execution Guide',
            active: true,
            onClick: () => {},
          },
          {
            label: isHe ? 'בקרת איכות' : 'Quality Control',
            active: false,
            onClick: () => navigate(`/trade/${tradeId}/checklist`),
          },
        ]}
      />

      <main className="max-w-[1200px] mx-auto py-base px-container-margin">
        {/* Accordion Sections */}
        <div className="flex flex-col gap-base mt-4">
          {data.sections.map((section, idx) => {
            const style = sectionStyles[section.id] || { bg: 'bg-gray-100', text: 'text-gray-600', icon: 'info' };
            const isOpen = !!openSections[idx];

            return (
              <div
                key={section.id}
                className="bg-white border border-outline rounded-lg shadow-sm overflow-hidden"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleSection(idx)}
                  className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full ${style.bg} flex items-center justify-center`}>
                      <Icon name={style.icon} size={18} className={style.text} />
                    </div>
                    <span className="font-bold text-text-primary text-title-lg leading-7">
                      {isHe ? section.title : section.titleEn}
                    </span>
                  </div>
                  <Icon
                    name="expand_more"
                    size={24}
                    className={`text-text-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Accordion Content */}
                <div
                  className={`accordion-content border-t border-outline-variant ${isOpen ? 'open' : ''}`}
                  style={isOpen ? { maxHeight: '5000px' } : { maxHeight: '0' }}
                >
                  <div className="p-4 flex flex-col gap-4">
                    {section.items.map((item, itemIdx) => (
                      <div key={item.id}>
                        <div className="flex items-start gap-4">
                          <span className="w-[22px] h-[22px] min-w-[22px] rounded-full bg-surface-variant flex items-center justify-center text-text-secondary font-medium text-[12px]">
                            {item.id}
                          </span>
                          <p className="text-body-md leading-6 text-text-primary">
                            {isHe ? item.text : item.textEn}
                          </p>
                        </div>
                        {itemIdx < section.items.length - 1 && (
                          <div className="h-px bg-outline-variant w-full mt-4"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contextual Info Cards - matches stitch-methodology.html */}
        <div className="mt-section-gap grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <div className="bg-white p-6 rounded-lg border border-outline shadow-md flex items-center gap-6">
            <div className="flex-1">
              <h3 className="text-title-lg leading-7 font-medium text-primary mb-2">
                {isHe ? 'תקני איכות בביצוע' : 'Quality Standards'}
              </h3>
              <p className="text-body-md leading-6 text-text-secondary">
                {isHe
                  ? 'המדריך נכתב בהתאם לתקן הישראלי 1920 ודרישות הפיקוח באתר. הקפדה על השלבים מבטיחה עמידות לאורך שנים.'
                  : 'Guide written per Israeli standard 1920 and site supervision requirements.'}
              </p>
            </div>
            <div className="w-32 h-32 rounded-xl bg-surface-container overflow-hidden shrink-0 flex items-center justify-center border border-outline-variant bg-slate-50 relative">
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                <line stroke="#041534" strokeWidth="0.5" x1="10" x2="90" y1="10" y2="10" />
                <line stroke="#041534" strokeWidth="0.5" x1="10" x2="90" y1="30" y2="30" />
                <line stroke="#041534" strokeWidth="0.5" x1="10" x2="90" y1="50" y2="50" />
                <line stroke="#041534" strokeWidth="0.5" x1="10" x2="10" y1="10" y2="90" />
                <line stroke="#041534" strokeWidth="0.5" x1="30" x2="30" y1="10" y2="90" />
                <line stroke="#041534" strokeWidth="0.5" x1="50" x2="50" y1="10" y2="90" />
                <path d="M10 10 L40 40 M30 10 L60 40" fill="none" stroke="#3B82F6" strokeWidth="1" />
              </svg>
              <Icon name="architecture" size={36} className="text-outline" />
            </div>
          </div>

          <div className="bg-surface-dark p-6 rounded-lg border border-outline shadow-md flex items-center gap-6">
            <div className="flex-1">
              <h3 className="text-title-lg leading-7 font-medium text-on-primary mb-2">
                {isHe ? 'בדיקת שליפה ומעבדה' : 'Pull Test & Lab'}
              </h3>
              <p className="text-body-md leading-6 text-on-primary-container">
                {isHe
                  ? 'מומלץ לבצע בדיקות מעבדה מדגמיות לאחר ייבוש מלא של השכבות לווידוא חוזק ההידבקות לתשתית.'
                  : 'Recommended to perform sample lab tests after full drying to verify adhesion strength.'}
              </p>
            </div>
            <div className="w-32 h-32 rounded-xl bg-primary-container overflow-hidden shrink-0 technical-viz flex flex-col items-center justify-center p-4">
              <div className="bar-chart-sim">
                <div className="bar-sim h-[20px]"></div>
                <div className="bar-sim h-[35px] opacity-80"></div>
                <div className="bar-sim h-[15px]"></div>
                <div className="bar-sim h-[30px] !bg-action-blue opacity-100"></div>
                <div className="bar-sim h-[25px]"></div>
              </div>
              <div className="w-16 h-px bg-white/20 mt-1"></div>
              <span className="text-[10px] text-white/40 mt-2 font-mono">STRENGTH_T_01</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
