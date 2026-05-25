import { useNavigate, useLocation } from 'react-router-dom';
import Icon from './Icon';

export default function TopHeader({ title, showBack = false, tabs = null }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="bg-surface-dark text-on-primary sticky top-0 z-50 shadow-md">
      <div className="max-w-[1200px] mx-auto h-16 flex items-center justify-between px-container-margin">
        {/* צד ימין - חזרה + כותרת */}
        <div className="flex items-center gap-4">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="hover:bg-white/10 p-2 rounded-full transition-colors active:scale-95"
            >
              <Icon name="arrow_forward" size={24} />
            </button>
          )}
          <h1 className="font-medium text-headline-md leading-8">{title}</h1>
        </div>

        {/* צד שמאל - ניווט + לוגו */}
        <div className="flex items-center gap-3">
          {/* Desktop nav tabs */}
          {tabs && (
            <div className="hidden md:flex gap-6 mr-6">
              {tabs.map(tab => (
                <span
                  key={tab.label}
                  onClick={tab.onClick}
                  className={`text-label-lg leading-5 tracking-[0.01em] font-medium cursor-pointer transition-colors ${
                    tab.active
                      ? 'text-white border-b-2 border-action-blue pb-1'
                      : 'text-on-primary-fixed-variant hover:text-white'
                  }`}
                >
                  {tab.label}
                </span>
              ))}
            </div>
          )}

          {/* Icons */}
          <div className="hidden md:flex items-center gap-3">
            <span className="material-symbols-outlined text-on-primary cursor-pointer hover:bg-white/10 p-2 rounded-full">settings</span>
            <span className="material-symbols-outlined text-on-primary cursor-pointer hover:bg-white/10 p-2 rounded-full">notifications</span>
            <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold overflow-hidden border border-white/20">
              <Icon name="account_circle" size={24} className="text-white" />
            </div>
          </div>

          {/* לוגו TOS */}
          <div className="flex items-center gap-2">
            <span className="text-headline-lg leading-10 font-bold text-white">TOS</span>
            <div className="w-8 h-8 bg-action-blue rounded flex items-center justify-center">
              <Icon name="shield" fill size={20} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
