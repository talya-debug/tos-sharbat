import { useNavigate } from 'react-router-dom';
import { trades } from '../data/trades';
import { useLang } from '../context/LanguageContext';
import Icon from '../components/Icon';
import TopHeader from '../components/TopHeader';
import CameraFab from '../components/CameraFab';

/* מיפוי אייקונים למלאכות */
const tradeIconMap = {
  'waterproofing-wet-rooms': { icon: 'water_drop', bgColor: 'bg-blue-50', borderColor: 'border-blue-100', iconColor: 'text-action-blue', patternColor: 'text-blue-200/50' },
  'interior-plaster': { icon: 'format_paint', bgColor: 'bg-orange-50', borderColor: 'border-orange-100', iconColor: 'text-status-warning', patternColor: 'text-orange-200/50' },
  'tiling': { icon: 'grid_view', bgColor: 'bg-green-50', borderColor: 'border-green-100', iconColor: 'text-status-success', patternColor: 'text-green-200/50' },
  'roof-waterproofing': { icon: 'umbrella', bgColor: 'bg-purple-50', borderColor: 'border-purple-100', iconColor: 'text-purple-600', patternColor: 'text-purple-200/50' },
};

export default function TradesPage() {
  const navigate = useNavigate();
  const { isHe } = useLang();

  return (
    <div className="min-h-screen bg-background-alt text-on-background">
      {/* Top Navigation Bar */}
      <TopHeader title={isHe ? 'בחירת מלאכה' : 'Trade Selection'} />

      <div className="flex max-w-[1440px] mx-auto">
        {/* Side Navigation Bar - Desktop only */}
        <aside className="hidden lg:flex flex-col h-[calc(100vh-64px)] w-64 bg-surface-dark border-l border-outline-variant py-base px-4 sticky top-16">
          <div className="mb-8 px-4">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded bg-secondary-container flex items-center justify-center">
                <Icon name="architecture" size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-white text-title-lg font-bold leading-7">Project Alpha</h2>
                <p className="text-on-primary-container text-body-sm leading-5">Site ID: 4829</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 flex flex-col gap-2">
            <a className="text-on-primary-fixed-variant hover:bg-white/10 flex items-center gap-3 px-4 py-3 rounded-lg transition-all" href="#">
              <Icon name="dashboard" size={24} />
              <span className="text-label-lg font-medium tracking-[0.01em]">Home</span>
            </a>
            <a className="bg-secondary-container text-on-secondary-container flex items-center gap-3 px-4 py-3 rounded-lg transition-all" href="#">
              <Icon name="event_note" size={24} />
              <span className="text-label-lg font-medium tracking-[0.01em]">Site Diary</span>
            </a>
            <a className="text-on-primary-fixed-variant hover:bg-white/10 flex items-center gap-3 px-4 py-3 rounded-lg transition-all" href="#">
              <Icon name="description" size={24} />
              <span className="text-label-lg font-medium tracking-[0.01em]">Documents</span>
            </a>
            <a className="text-on-primary-fixed-variant hover:bg-white/10 flex items-center gap-3 px-4 py-3 rounded-lg transition-all" href="#">
              <Icon name="group" size={24} />
              <span className="text-label-lg font-medium tracking-[0.01em]">Team</span>
            </a>
            <a className="text-on-primary-fixed-variant hover:bg-white/10 flex items-center gap-3 px-4 py-3 rounded-lg transition-all" href="#">
              <Icon name="inventory_2" size={24} />
              <span className="text-label-lg font-medium tracking-[0.01em]">Archive</span>
            </a>
          </nav>
          <button className="mt-4 mb-8 bg-action-blue text-white text-label-lg font-medium tracking-[0.01em] py-3 rounded-lg hover:brightness-110 active:scale-[0.98] transition-all">
            New Inspection
          </button>
          <div className="mt-auto flex flex-col gap-2 border-t border-white/10 pt-4">
            <a className="text-on-primary-fixed-variant hover:text-white flex items-center gap-3 px-4 py-2 transition-all" href="#">
              <Icon name="help" size={24} />
              <span className="text-label-lg font-medium tracking-[0.01em]">Support</span>
            </a>
            <a className="text-on-primary-fixed-variant hover:text-white flex items-center gap-3 px-4 py-2 transition-all" href="#">
              <Icon name="logout" size={24} />
              <span className="text-label-lg font-medium tracking-[0.01em]">Logout</span>
            </a>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-gutter md:p-section-gap">
          <div className="max-w-[1000px] mx-auto">
            {/* Header Section */}
            <div className="mb-8 flex justify-between items-end">
              <div>
                <h2 className="text-text-primary text-headline-lg leading-10 font-semibold mb-2">
                  {isHe ? 'ניהול מלאכות באתר' : 'Site Trade Management'}
                </h2>
                <p className="text-text-secondary text-body-md leading-6">
                  {isHe ? 'בחר את המלאכה לביצוע בקרת איכות או עדכון סטטוס' : 'Select trade for quality control or status update'}
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-outline-variant">
                <Icon name="search" size={20} className="text-action-blue" />
                <input
                  className="border-none focus:ring-0 text-body-sm leading-5 w-48 bg-transparent outline-none"
                  placeholder={isHe ? 'חיפוש מלאכה...' : 'Search trade...'}
                  type="text"
                />
              </div>
            </div>

            {/* Trade Cards List */}
            <div className="flex flex-col gap-3">
              {trades.map((trade) => {
                const visual = tradeIconMap[trade.id] || tradeIconMap['waterproofing-wet-rooms'];
                return (
                  <div
                    key={trade.id}
                    onClick={() => navigate(`/trade/${trade.id}`)}
                    className="group bg-white rounded-card border border-outline-variant p-4 flex items-center gap-6 card-shadow cursor-pointer hover:border-action-blue transition-all active:scale-[0.99]"
                    style={{ transition: 'transform 0.15s, border-color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    {/* Trade Icon */}
                    <div className={`w-24 h-24 rounded-lg ${visual.bgColor} shrink-0 border ${visual.borderColor} flex items-center justify-center relative overflow-hidden`}>
                      <div className={`absolute inset-0 trade-pattern ${visual.patternColor}`}></div>
                      <Icon name={visual.icon} fill size={48} className={`${visual.iconColor} relative z-10`} />
                    </div>

                    {/* Trade Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-title-lg leading-7 text-text-primary font-bold">
                          {isHe ? trade.name : trade.nameEn}
                        </h3>
                      </div>
                      <p className="text-text-secondary text-body-sm leading-5">
                        {isHe ? trade.nameEn : trade.name}
                      </p>
                      <div className="mt-2 flex gap-4">
                        <span className="px-2 py-0.5 rounded-full bg-surface-container text-text-secondary text-[12px] font-medium">
                          {isHe ? 'נקודות בדיקה' : 'Check points'}
                        </span>
                      </div>
                    </div>

                    {/* Chevron */}
                    <div className="flex items-center text-outline group-hover:text-action-blue transition-colors">
                      <Icon name="chevron_left" size={32} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary Stats */}
            <div className="mt-section-gap grid grid-cols-1 md:grid-cols-3 gap-gutter">
              <div className="bg-white p-6 rounded-card border border-outline-variant card-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="material-symbols-outlined text-action-blue bg-action-blue/10 p-2 rounded-lg">analytics</span>
                  <span className="text-status-success font-bold text-label-sm">+12% {isHe ? 'השבוע' : 'this week'}</span>
                </div>
                <h4 className="text-text-secondary text-label-lg font-medium tracking-[0.01em]">{isHe ? 'סה"כ בדיקות שבוצעו' : 'Total inspections'}</h4>
                <div className="text-display-lg leading-[56px] font-bold text-text-primary">142</div>
              </div>
              <div className="bg-white p-6 rounded-card border border-outline-variant card-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="material-symbols-outlined text-status-error bg-status-error/10 p-2 rounded-lg">priority_high</span>
                  <span className="text-status-error font-bold text-label-sm">{isHe ? 'דחוף' : 'Urgent'}</span>
                </div>
                <h4 className="text-text-secondary text-label-lg font-medium tracking-[0.01em]">{isHe ? 'ליקויים פתוחים' : 'Open defects'}</h4>
                <div className="text-display-lg leading-[56px] font-bold text-text-primary">8</div>
              </div>
              <div className="bg-white p-6 rounded-card border border-outline-variant card-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="material-symbols-outlined text-status-warning bg-status-warning/10 p-2 rounded-lg">pending_actions</span>
                </div>
                <h4 className="text-text-secondary text-label-lg font-medium tracking-[0.01em]">{isHe ? 'ממתין לאישור מנהל' : 'Pending approval'}</h4>
                <div className="text-display-lg leading-[56px] font-bold text-text-primary">15</div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <CameraFab />
    </div>
  );
}
