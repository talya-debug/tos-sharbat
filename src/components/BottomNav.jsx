import { useLocation, useNavigate } from 'react-router-dom';
import Icon from './Icon';

const navItems = [
  { label: 'בית', labelEn: 'Home', icon: 'home', path: '/' },
  { label: 'מקצועות', labelEn: 'Trades', icon: 'construction', path: '/trades' },
  { label: 'בדיקות', labelEn: 'Checks', icon: 'fact_check', path: '/trades' },
  { label: 'הגדרות', labelEn: 'Settings', icon: 'settings', path: '/trades' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path, idx) => {
    if (idx === 1) return location.pathname.startsWith('/trade') || location.pathname === '/trades';
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface-container-lowest border-t border-outline-variant z-50">
      <div className="flex justify-around items-center h-16 max-w-4xl mx-auto">
        {navItems.map((item, idx) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
              isActive(item.path, idx)
                ? 'text-secondary-container'
                : 'text-on-surface-variant'
            }`}
          >
            <Icon name={item.icon} fill={isActive(item.path, idx)} size={24} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
