import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { trades } from '../data/trades'
import { tradeData } from '../data/tradeData'

/* מיפוי אייקונים מ-Lucide לשמות Material Symbols */
const iconMap = {
  ClipboardCheck: 'assignment_late',
  Wrench: 'construction',
  Layers: 'layers',
  AlertTriangle: 'warning',
  CheckCircle: 'check_circle',
  Shield: 'health_and_safety',
  BookOpen: 'menu_book',
  Settings: 'settings',
  Eye: 'visibility',
  Hammer: 'construction',
  Ruler: 'straighten',
  Droplets: 'water_drop',
  Thermometer: 'thermostat',
  FileText: 'description',
  Camera: 'photo_camera',
  Clock: 'schedule',
  Target: 'gps_fixed',
  Zap: 'bolt',
  Info: 'info',
}

/* צבעים לכל סקשן */
const sectionColors = [
  '#2170e4',   /* כחול - לפני ביצוע */
  '#F59E0B',   /* צהוב - הכנות */
  '#10B981',   /* ירוק - שלבי ביצוע */
  '#F97316',   /* כתום - מגבלות */
  '#8B5CF6',   /* סגול - דגשים */
  '#EF4444',   /* אדום - כשלים */
  '#334155',   /* אפור כהה - בטיחות */
  '#06B6D4',   /* תכלת - נוסף */
]

export default function TradePage() {
  const { tradeId } = useParams()
  const navigate = useNavigate()
  const [openSections, setOpenSections] = useState([0])

  const trade = trades.find(t => t.id === tradeId)
  const data = tradeData[tradeId]

  if (!trade || !data) {
    return <p className="text-text-secondary">מלאכה לא נמצאה</p>
  }

  const toggleSection = (idx) => {
    setOpenSections(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    )
  }

  return (
    <div>
      {/* ברדקראמב + טוגל */}
      <div className="flex justify-between items-end mb-8">
        <div className="flex flex-col gap-1">
          <nav className="flex text-[12px] text-text-secondary gap-2 items-center mb-1 tracking-wider">
            <Link to="/dashboard" className="hover:text-primary transition-colors">דאשבורד</Link>
            <span className="material-symbols-outlined text-[12px]">chevron_left</span>
            <Link to="/dashboard" className="hover:text-primary transition-colors">ניהול מלאכות</Link>
            <span className="material-symbols-outlined text-[12px]">chevron_left</span>
            <span className="text-primary font-medium">{trade.name}</span>
          </nav>
          <h2 className="text-[32px] leading-[40px] font-bold text-text-primary">{trade.name}</h2>
        </div>

        {/* טוגל טאבים */}
        <div className="bg-bg p-1 rounded-full flex gap-1 shadow-sm border border-border">
          <button className="px-6 py-2 rounded-full bg-primary text-white font-medium text-[14px] transition-all duration-200">
            מדריך ביצוע
          </button>
          <button
            onClick={() => navigate(`/trade/${tradeId}/checklist`)}
            className="px-6 py-2 rounded-full text-text-secondary hover:text-primary font-medium text-[14px] transition-all duration-200"
          >
            בקרת איכות
          </button>
        </div>
      </div>

      {/* אקורדיון */}
      <div className="max-w-4xl space-y-4">
        {data.sections.map((section, idx) => {
          const isOpen = openSections.includes(idx)
          const materialIcon = iconMap[section.icon] || 'folder'
          const color = sectionColors[idx % sectionColors.length]

          return (
            <div
              key={section.id}
              className={`bg-white border border-border rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${isOpen ? 'accordion-active' : ''}`}
            >
              <button
                onClick={() => toggleSection(idx)}
                className="w-full flex items-center justify-between p-4 hover:bg-bg/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: color }}
                  >
                    <span className="material-symbols-outlined text-[20px]">{materialIcon}</span>
                  </div>
                  <span className="text-[20px] text-text-primary font-bold">{section.title}</span>
                </div>
                <span className={`material-symbols-outlined chevron-icon transition-transform duration-300 text-text-secondary`}>
                  expand_more
                </span>
              </button>
              <div className="accordion-content border-t border-border">
                <div className="p-6 space-y-4 text-[16px] leading-[24px] text-text-secondary">
                  {section.items.map((item, itemIdx) => (
                    <div key={item.id}>
                      {itemIdx > 0 && <div className="h-px bg-border w-full mb-4"></div>}
                      <div className="flex gap-4">
                        <span
                          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold text-white"
                          style={{ backgroundColor: color }}
                        >
                          {item.id}
                        </span>
                        <p>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
