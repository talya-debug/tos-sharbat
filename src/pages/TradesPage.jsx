import { useNavigate } from 'react-router-dom';
import { trades } from '../data/trades';
import { useLang } from '../context/LanguageContext';
import Icon from '../components/Icon';
import TopHeader from '../components/TopHeader';
import BottomNav from '../components/BottomNav';
import CameraFab from '../components/CameraFab';

const iconMap = {
  Droplets: 'water_drop',
  PaintBucket: 'format_paint',
  Grid3X3: 'grid_view',
  Home: 'house',
};

export default function TradesPage() {
  const navigate = useNavigate();
  const { isHe } = useLang();

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopHeader />

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-6">
        {/* כותרת */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-on-surface">
            {isHe ? 'בחירת מלאכה' : 'Select Trade'}
          </h1>
          <div className="w-12 h-1 bg-secondary-container mt-2 rounded-full" />
        </div>

        {/* גריד כרטיסים */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trades.map((trade) => (
            <button
              key={trade.id}
              onClick={() => navigate(`/trade/${trade.id}`)}
              className="group relative bg-surface-container-lowest border border-outline-variant rounded-xl p-6 text-right flex items-center gap-4 transition-all hover:shadow-md hover:border-secondary-container/50 active:scale-[0.98]"
            >
              {/* פס כתום בהובר */}
              <div className="absolute top-0 right-0 bottom-0 w-1 bg-secondary-container rounded-r-xl opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* אייקון */}
              <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0">
                <Icon name={iconMap[trade.icon] || 'build'} size={28} className="text-on-surface" />
              </div>

              {/* טקסט */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-on-surface">
                  {isHe ? trade.name : trade.nameEn}
                </h3>
                <p className="text-xs uppercase tracking-wider text-on-surface-variant mt-0.5">
                  {isHe ? trade.nameEn : trade.name}
                </p>
              </div>

              {/* חץ */}
              <Icon name="chevron_left" size={24} className="text-on-surface-variant shrink-0" />
            </button>
          ))}
        </div>

        {/* באנר תחתון */}
        <div className="mt-8 bg-surface-container-low border border-outline-variant rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary-container/15 flex items-center justify-center shrink-0">
              <Icon name="verified" size={28} className="text-secondary" />
            </div>
            <div>
              <p className="text-sm font-medium text-on-surface">
                {isHe ? 'מערכת בקרת איכות מקצועית לפרויקטי בנייה' : 'Professional QC system for construction projects'}
              </p>
              <p className="text-xs text-on-surface-variant mt-0.5">
                {isHe ? 'תקנים ישראליים • מתודולוגיה מובנית • מעקב שוטף' : 'Israeli standards • Structured methodology • Ongoing monitoring'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <CameraFab />
      <BottomNav />
    </div>
  );
}
