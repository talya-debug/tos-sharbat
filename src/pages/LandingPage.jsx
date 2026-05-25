import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import Icon from '../components/Icon';

export default function LandingPage() {
  const navigate = useNavigate();
  const { isHe, toggleLang } = useLang();

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden architectural-bg">
      {/* Abstract Lines Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[200%] h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2), transparent)',
            transform: 'rotate(-35deg)',
            top: '20%',
            left: '-50%',
          }}
        />
        <div
          className="absolute w-[200%] h-px opacity-50"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2), transparent)',
            transform: 'rotate(-35deg) translateY(100px)',
            top: '60%',
            left: '-50%',
          }}
        />
        <div
          className="absolute w-px h-full"
          style={{
            background: 'linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.05), transparent)',
            left: '30%',
          }}
        />
        <div
          className="absolute w-px h-full"
          style={{
            background: 'linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.05), transparent)',
            right: '25%',
          }}
        />
      </div>

      {/* Top Controls - Language Toggle */}
      <div className="absolute top-0 left-0 w-full p-gutter flex justify-between items-center z-20">
        <div className="flex items-center">
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 px-4 py-2 glass-effect rounded-full text-white text-label-lg font-medium tracking-[0.01em] hover:bg-white/10 transition-all duration-300"
          >
            <Icon name="language" size={18} />
            <span>{isHe ? 'EN' : 'HE'}</span>
          </button>
        </div>
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-gutter max-w-2xl animate-fade-up">
        {/* Shield Icon */}
        <div className="mb-base relative">
          <div className="w-24 h-24 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 glass-effect mb-6 group hover:scale-105 transition-transform duration-500">
            <Icon name="shield" fill size={56} className="text-white opacity-90" />
            <span
              className="material-symbols-outlined absolute text-action-blue text-[24px] top-3 right-3"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              construction
            </span>
          </div>
        </div>

        {/* Massive Bold Branding */}
        <h1 className="text-display-lg leading-[56px] font-[800] text-white mb-2 tracking-[0.2em] uppercase">
          TOS
        </h1>

        {/* Hebrew Subtitle */}
        <h2 className="text-headline-md leading-8 font-semibold text-white mb-2">
          {isHe ? 'מערכת ניהול איכות בבנייה' : 'Construction Quality Management'}
        </h2>

        {/* English Subtext */}
        <p className="text-body-md leading-6 text-white/50 mb-section-gap max-w-md mx-auto tracking-wide">
          {isHe ? 'Quality Control Management System' : 'מערכת ניהול בקרת איכות'}
        </p>

        {/* Main CTA Button */}
        <button
          onClick={() => navigate('/trades')}
          className="bg-action-blue hover:bg-secondary text-white text-label-lg font-medium tracking-[0.01em] px-14 py-4 rounded-full shadow-2xl shadow-action-blue/20 hover:shadow-action-blue/40 transition-all duration-300 active:scale-95 flex items-center gap-3"
        >
          <span>{isHe ? 'כניסה למערכת' : 'Enter System'}</span>
          <Icon name="arrow_forward" size={24} />
        </button>
      </div>

      {/* Enterprise Accents - Desktop Only */}
      <div className="absolute bottom-16 left-gutter right-gutter hidden md:grid grid-cols-3 gap-gutter max-w-[1100px] mx-auto z-10">
        <div className="glass-effect p-5 rounded-xl flex items-center gap-4 bg-white/[0.02]">
          <Icon name="assignment_turned_in" size={32} className="text-action-blue" />
          <div className="text-right">
            <div className="text-white text-label-lg font-medium tracking-[0.01em]">
              {isHe ? 'בדיקות אתר' : 'Site Inspections'}
            </div>
            <div className="text-white/40 text-label-sm font-semibold">
              {isHe ? 'ניהול שטח בזמן אמת' : 'Real-time field management'}
            </div>
          </div>
        </div>
        <div className="glass-effect p-5 rounded-xl flex items-center gap-4 border-t-2 border-action-blue/40 bg-white/[0.03]">
          <Icon name="architecture" size={32} className="text-status-success" />
          <div className="text-right">
            <div className="text-white text-label-lg font-medium tracking-[0.01em]">
              {isHe ? 'דיוק מקסימלי' : 'Maximum Precision'}
            </div>
            <div className="text-white/40 text-label-sm font-semibold">
              {isHe ? 'עמידה בתקני ISO' : 'ISO standards compliance'}
            </div>
          </div>
        </div>
        <div className="glass-effect p-5 rounded-xl flex items-center gap-4 bg-white/[0.02]">
          <Icon name="analytics" size={32} className="text-status-warning" />
          <div className="text-right">
            <div className="text-white text-label-lg font-medium tracking-[0.01em]">
              {isHe ? 'דוחות אוטומטיים' : 'Automated Reports'}
            </div>
            <div className="text-white/40 text-label-sm font-semibold">
              {isHe ? 'בינה עסקית מתקדמת' : 'Advanced business intelligence'}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Label */}
      <div className="absolute bottom-8 w-full text-center z-10">
        <p className="text-label-sm font-semibold text-white/30 tracking-[0.3em] uppercase">
          ESTABLISHED BY OSHER ASULIN
        </p>
      </div>
    </section>
  );
}
