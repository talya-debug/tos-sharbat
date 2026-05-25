import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { trades } from '../data/trades';
import { tradeData } from '../data/tradeData';
import { useLang } from '../context/LanguageContext';
import Icon from '../components/Icon';
import TopHeader from '../components/TopHeader';
import BottomNav from '../components/BottomNav';
import CameraFab from '../components/CameraFab';

const sectionIconMap = {
  ClipboardCheck: 'assignment_turned_in',
  Wrench: 'build',
  Hammer: 'construction',
  AlertTriangle: 'lightbulb',
  XCircle: 'warning',
  Search: 'fact_check',
  Shield: 'safety_check',
  Ruler: 'straighten',
};

const sectionColorMap = {
  before: 'bg-blue-100 text-blue-700',
  preparation: 'bg-amber-100 text-amber-700',
  execution: 'bg-green-100 text-green-700',
  highlights: 'bg-yellow-100 text-yellow-700',
  limitations: 'bg-purple-100 text-purple-700',
  failures: 'bg-red-100 text-red-700',
  inspections: 'bg-cyan-100 text-cyan-700',
  safety: 'bg-slate-700 text-slate-100',
  measurement: 'bg-indigo-100 text-indigo-700',
};

export default function TradePage() {
  const { tradeId } = useParams();
  const navigate = useNavigate();
  const { isHe } = useLang();
  const trade = trades.find(t => t.id === tradeId);
  const data = tradeData[tradeId];
  const [activeTab, setActiveTab] = useState('methodology');
  const [openSections, setOpenSections] = useState({ 0: true });

  if (!trade || !data) return <div className="p-8 text-center">מלאכה לא נמצאה</div>;

  const toggleSection = (idx) => {
    setOpenSections(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const renderSectionContent = (section, idx) => {
    const isOpen = openSections[idx];

    // בטיחות - עיצוב מיוחד
    if (section.id === 'safety') {
      return (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection(idx)}
            className="w-full flex items-center gap-3 p-4 md:p-6 text-right"
          >
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${sectionColorMap[section.id] || 'bg-gray-100 text-gray-700'} flex items-center justify-center shrink-0`}>
              <Icon name={sectionIconMap[section.icon] || 'info'} size={22} />
            </div>
            <h3 className="flex-1 text-base md:text-lg font-semibold text-on-surface">
              {isHe ? section.title : section.titleEn}
            </h3>
            <Icon
              name="expand_more"
              size={24}
              className={`text-on-surface-variant transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ maxHeight: isOpen ? '2000px' : '0' }}
          >
            <div className="px-4 pb-4 md:px-6 md:pb-6">
              <div className="bg-inverse-surface rounded-xl p-4 md:p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {section.items.map(item => (
                    <div key={item.id} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/5">
                      <Icon name="safety_check" size={28} className="text-secondary-container" />
                      <span className="text-xs text-center text-inverse-on-surface">
                        {isHe ? item.text : item.textEn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // כשלים - עיצוב עם גבול אדום
    if (section.id === 'failures') {
      return (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection(idx)}
            className="w-full flex items-center gap-3 p-4 md:p-6 text-right"
          >
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${sectionColorMap[section.id]} flex items-center justify-center shrink-0`}>
              <Icon name={sectionIconMap[section.icon] || 'info'} size={22} />
            </div>
            <h3 className="flex-1 text-base md:text-lg font-semibold text-on-surface">
              {isHe ? section.title : section.titleEn}
            </h3>
            <Icon
              name="expand_more"
              size={24}
              className={`text-on-surface-variant transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ maxHeight: isOpen ? '2000px' : '0' }}
          >
            <div className="px-4 pb-4 md:px-6 md:pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {section.items.map(item => (
                  <div key={item.id} className="border-r-4 border-error bg-error-container/30 rounded-lg p-3 md:p-4">
                    <div className="flex items-start gap-2">
                      <Icon name="error" size={18} className="text-error shrink-0 mt-0.5" />
                      <span className="text-sm text-on-surface">
                        {isHe ? item.text : item.textEn}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // בקרות - עיצוב עם גבול כחול
    if (section.id === 'inspections') {
      return (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection(idx)}
            className="w-full flex items-center gap-3 p-4 md:p-6 text-right"
          >
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${sectionColorMap[section.id]} flex items-center justify-center shrink-0`}>
              <Icon name={sectionIconMap[section.icon] || 'info'} size={22} />
            </div>
            <h3 className="flex-1 text-base md:text-lg font-semibold text-on-surface">
              {isHe ? section.title : section.titleEn}
            </h3>
            <Icon
              name="expand_more"
              size={24}
              className={`text-on-surface-variant transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ maxHeight: isOpen ? '2000px' : '0' }}
          >
            <div className="px-4 pb-4 md:px-6 md:pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {section.items.map(item => (
                  <div key={item.id} className="border-r-4 border-blue-400 bg-surface-container-low rounded-lg p-3 md:p-4">
                    <div className="flex items-start gap-2">
                      <Icon name="fact_check" size={18} className="text-blue-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-on-surface">
                        {isHe ? item.text : item.textEn}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // דגשים + מגבלות - גריד צד-בצד
    if (section.id === 'highlights' || section.id === 'limitations') {
      return (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
          <button
            onClick={() => toggleSection(idx)}
            className="w-full flex items-center gap-3 p-4 md:p-6 text-right"
          >
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${sectionColorMap[section.id]} flex items-center justify-center shrink-0`}>
              <Icon name={sectionIconMap[section.icon] || 'info'} size={22} />
            </div>
            <h3 className="flex-1 text-base md:text-lg font-semibold text-on-surface">
              {isHe ? section.title : section.titleEn}
            </h3>
            <Icon
              name="expand_more"
              size={24}
              className={`text-on-surface-variant transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ maxHeight: isOpen ? '2000px' : '0' }}
          >
            <div className="px-4 pb-4 md:px-6 md:pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {section.items.map(item => (
                  <div key={item.id} className="flex items-start gap-3 bg-surface-container-low rounded-lg p-3 md:p-4">
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-on-primary">{item.id}</span>
                    </div>
                    <span className="text-sm text-on-surface leading-relaxed">
                      {isHe ? item.text : item.textEn}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // ברירת מחדל - סעיפים ממוספרים
    return (
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
        <button
          onClick={() => toggleSection(idx)}
          className="w-full flex items-center gap-3 p-4 md:p-6 text-right"
        >
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${sectionColorMap[section.id] || 'bg-gray-100 text-gray-700'} flex items-center justify-center shrink-0`}>
            <Icon name={sectionIconMap[section.icon] || 'info'} size={22} />
          </div>
          <h3 className="flex-1 text-base md:text-lg font-semibold text-on-surface">
            {isHe ? section.title : section.titleEn}
          </h3>
          <Icon
            name="expand_more"
            size={24}
            className={`text-on-surface-variant transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
        <div
          className="overflow-hidden transition-all duration-300"
          style={{ maxHeight: isOpen ? '5000px' : '0' }}
        >
          <div className="px-4 pb-4 md:px-6 md:pb-6 space-y-2">
            {section.items.map(item => (
              <div key={item.id} className="flex items-start gap-3 p-2 md:p-3">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-on-primary">{item.id}</span>
                </div>
                <span className="text-sm text-on-surface leading-relaxed pt-1">
                  {isHe ? item.text : item.textEn}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopHeader />

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-4">
        {/* ברדקראמב */}
        <div className="flex items-center gap-1 text-xs text-on-surface-variant mb-4">
          <button onClick={() => navigate('/trades')} className="hover:text-secondary-container transition-colors">
            {isHe ? 'פרויקטים' : 'Projects'}
          </button>
          <Icon name="chevron_left" size={16} />
          <span>{isHe ? 'מדריכי ביצוע' : 'Execution Guides'}</span>
        </div>

        {/* כותרת */}
        <h1 className="text-xl md:text-2xl font-bold text-on-surface mb-4">
          {isHe ? `מתודולוגיה: ${trade.name}` : `Methodology: ${trade.nameEn}`}
        </h1>

        {/* טוגל מתודולוגיה / בקרת איכות */}
        <div className="flex bg-surface-container rounded-full p-1 mb-6 max-w-sm">
          <button
            onClick={() => setActiveTab('methodology')}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
              activeTab === 'methodology'
                ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                : 'text-on-surface-variant'
            }`}
          >
            {isHe ? 'מתודולוגיה' : 'Methodology'}
          </button>
          <button
            onClick={() => {
              setActiveTab('checklist');
              navigate(`/trade/${tradeId}/checklist`);
            }}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
              activeTab === 'checklist'
                ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                : 'text-on-surface-variant'
            }`}
          >
            {isHe ? 'בקרת איכות' : 'Quality Control'}
          </button>
        </div>

        {/* תיאור המלאכה */}
        <div className="bg-surface-container-low border border-outline-variant rounded-xl p-4 md:p-5 mb-6">
          <p className="text-sm text-on-surface">
            {isHe ? trade.desc : trade.descEn}
          </p>
        </div>

        {/* אקורדיונים */}
        <div className="space-y-3">
          {data.sections.map((section, idx) => (
            <div key={section.id} style={{ animation: `slideUp 0.3s ease-out ${idx * 0.05}s both` }}>
              {renderSectionContent(section, idx)}
            </div>
          ))}
        </div>
      </div>

      <CameraFab />
      <BottomNav />
    </div>
  );
}
