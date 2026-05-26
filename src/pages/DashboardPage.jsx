import { useNavigate } from 'react-router-dom'
import { trades } from '../data/trades'

const stats = [
  { label: 'ביקורות שבוצעו', value: '142', icon: 'fact_check', color: '#3B82F6' },
  { label: 'ליקויים פתוחים', value: '8', icon: 'report_problem', color: '#EF4444' },
  { label: 'ממתינים לאישור', value: '15', icon: 'pending_actions', color: '#F59E0B' },
  { label: 'אחוז עמידה', value: '94%', icon: 'trending_up', color: '#10B981' },
]

export default function DashboardPage() {
  const navigate = useNavigate()

  return (
    <div>
      {/* ברדקראמב */}
      <nav className="flex text-[12px] text-text-secondary gap-2 items-center mb-1 tracking-wider">
        <span className="text-primary font-medium">דאשבורד</span>
      </nav>
      <h2 className="text-[24px] lg:text-[32px] leading-[32px] lg:leading-[40px] font-bold text-text-primary mb-1">ניהול מלאכות באתר</h2>
      <p className="text-text-secondary text-[14px] mb-8">בחר מלאכה לצפייה במדריך הביצוע ובקרת האיכות</p>

      {/* כרטיסי סטטיסטיקה */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-8 lg:mb-10">
        {stats.map((s, i) => (
          <div key={i} className="bg-white border border-border rounded-xl shadow-sm p-5 flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: s.color + '15' }}
            >
              <span className="material-symbols-outlined text-[24px]" style={{ color: s.color }}>{s.icon}</span>
            </div>
            <div>
              <p className="text-[22px] lg:text-[28px] font-bold text-text-primary leading-tight">{s.value}</p>
              <p className="text-text-secondary text-[11px] lg:text-[12px]">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* כרטיסי מלאכות */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        {trades.map((trade) => (
          <div
            key={trade.id}
            onClick={() => navigate(`/trade/${trade.id}`)}
            className="bg-white border border-border rounded-xl shadow-sm p-6 flex flex-col items-center gap-4 cursor-pointer hover:shadow-md hover:border-primary/30 transition-all duration-200 group"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
              style={{ backgroundColor: trade.color + '15' }}
            >
              <span className="material-symbols-outlined text-[32px]" style={{ color: trade.color }}>{trade.icon}</span>
            </div>
            <div className="text-center">
              <p className="text-text-primary font-bold text-[16px]">{trade.name}</p>
              <p className="text-text-secondary text-[12px] mt-1">{trade.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
