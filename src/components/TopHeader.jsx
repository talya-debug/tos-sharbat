import Icon from './Icon';
import { useNavigate } from 'react-router-dom';

export default function TopHeader() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-surface-container-lowest border-b border-outline-variant">
      <div className="flex items-center justify-between h-14 px-4 max-w-4xl mx-auto">
        <button className="p-2 rounded-full hover:bg-surface-container-high transition-colors">
          <Icon name="menu" size={24} className="text-on-surface" />
        </button>
        <button onClick={() => navigate('/trades')} className="flex items-center gap-1">
          <span className="text-lg font-bold tracking-wide text-on-surface">TOS</span>
          <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
        </button>
        <button className="p-2 rounded-full hover:bg-surface-container-high transition-colors">
          <Icon name="account_circle" size={24} className="text-on-surface" />
        </button>
      </div>
    </header>
  );
}
