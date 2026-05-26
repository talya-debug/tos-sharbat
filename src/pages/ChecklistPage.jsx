import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { trades as staticTrades } from '../data/trades'
import { tradeData } from '../data/tradeData'
import { getTrade } from '../services/tradeService'
import { getSections } from '../services/sectionService'
import { getItems } from '../services/itemService'

/* מיפוי אייקונים */
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
  XCircle: 'cancel',
  Search: 'search',
}

const sectionColors = [
  '#2170e4', '#F59E0B', '#10B981', '#F97316', '#8B5CF6', '#EF4444', '#334155', '#06B6D4',
]

export default function ChecklistPage() {
  const { tradeId } = useParams()
  const navigate = useNavigate()
  const [openSections, setOpenSections] = useState([0])
  const [results, setResults] = useState({})
  const [notes, setNotes] = useState({})
  const [loading, setLoading] = useState(true)

  const [tradeName, setTradeName] = useState('')
  const [displaySections, setDisplaySections] = useState([])

  useEffect(() => {
    loadData()
  }, [tradeId])

  async function loadData() {
    setLoading(true)
    try {
      const sbTrade = await getTrade(tradeId)
      if (sbTrade) {
        setTradeName(sbTrade.name)
        const sbSections = await getSections(tradeId)
        // טעינת פריטים
        const sectionsWithItems = await Promise.all(sbSections.map(async (sec) => {
          const items = await getItems(sec.id)
          return {
            ...sec,
            items: items.map((item, idx) => ({ ...item, displayId: idx + 1 })),
          }
        }))
        // סינון פרק "לפני ביצוע" ע"פ שם
        setDisplaySections(sectionsWithItems.filter(s =>
          s.title !== 'לפני ביצוע' && s.title_en !== 'Before Execution'
        ))
        setLoading(false)
        return
      }
    } catch {}

    // fallback
    const st = staticTrades.find(t => t.id === tradeId)
    const sd = tradeData[tradeId]
    if (st && sd) {
      setTradeName(st.name)
      setDisplaySections(
        sd.sections
          .filter(s => s.id !== 'before')
          .map(s => ({
            ...s,
            items: s.items.map(item => ({ ...item, displayId: item.id })),
          }))
      )
    }
    setLoading(false)
  }

  // ספירת סה"כ פריטים ותוצאות
  const totalItems = displaySections.reduce((sum, s) => sum + s.items.length, 0)
  const checkedItems = Object.keys(results).length
  const passCount = Object.values(results).filter(v => v === 'pass').length
  const failCount = Object.values(results).filter(v => v === 'fail').length
  const progress = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0

  const toggleSection = (idx) => {
    setOpenSections(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    )
  }

  const setResult = (sectionId, itemId, value) => {
    const key = `${sectionId}-${itemId}`
    setResults(prev => ({ ...prev, [key]: prev[key] === value ? undefined : value }))
  }

  const setNote = (sectionId, itemId, value) => {
    setNotes(prev => ({ ...prev, [`${sectionId}-${itemId}`]: value }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!tradeName) {
    return <p className="text-text-secondary">מלאכה לא נמצאה</p>
  }

  return (
    <div className="pb-24">
      {/* ברדקראמב + טוגל */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-4 mb-6 lg:mb-8">
        <div className="flex flex-col gap-1">
          <nav className="flex text-[12px] text-text-secondary gap-2 items-center mb-1 tracking-wider flex-wrap">
            <Link to="/dashboard" className="hover:text-primary transition-colors">דאשבורד</Link>
            <span className="material-symbols-outlined text-[12px]">chevron_left</span>
            <Link to="/dashboard" className="hover:text-primary transition-colors">ניהול מלאכות</Link>
            <span className="material-symbols-outlined text-[12px]">chevron_left</span>
            <span className="text-primary font-medium">{tradeName}</span>
          </nav>
          <h2 className="text-[24px] lg:text-[32px] leading-[32px] lg:leading-[40px] font-bold text-text-primary">{tradeName}</h2>
        </div>

        <div className="bg-bg p-1 rounded-full flex gap-1 shadow-sm border border-border self-start">
          <button
            onClick={() => navigate(`/trade/${tradeId}`)}
            className="px-4 lg:px-6 py-2 rounded-full text-text-secondary hover:text-primary font-medium text-[13px] lg:text-[14px] transition-all duration-200"
          >
            מדריך ביצוע
          </button>
          <button className="px-4 lg:px-6 py-2 rounded-full bg-primary text-white font-medium text-[13px] lg:text-[14px] transition-all duration-200">
            בקרת איכות
          </button>
        </div>
      </div>

      {/* פס התקדמות */}
      <div className="bg-white border border-border rounded-xl shadow-sm p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[14px] font-bold text-text-primary">התקדמות בדיקה</span>
          <span className="text-[14px] text-text-secondary">{checkedItems} / {totalItems} פריטים</span>
        </div>
        <div className="w-full bg-bg rounded-full h-3 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              backgroundColor: progress === 100 ? '#10B981' : '#3B82F6',
            }}
          />
        </div>
      </div>

      {/* אקורדיון בקרת איכות */}
      <div className="max-w-4xl space-y-4">
        {displaySections.map((section, idx) => {
          const isOpen = openSections.includes(idx)
          const materialIcon = iconMap[section.icon] || 'folder'
          const color = sectionColors[(idx + 1) % sectionColors.length]

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
                <span className="material-symbols-outlined chevron-icon transition-transform duration-300 text-text-secondary">
                  expand_more
                </span>
              </button>
              <div className="accordion-content border-t border-border">
                <div className="p-6 space-y-5">
                  {section.items.map((item, itemIdx) => {
                    const key = `${section.id}-${item.id}`
                    const result = results[key]
                    return (
                      <div key={item.id}>
                        {itemIdx > 0 && <div className="h-px bg-border w-full mb-5"></div>}
                        <div className="flex items-start gap-4">
                          <span
                            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold text-white mt-0.5"
                            style={{ backgroundColor: color }}
                          >
                            {item.displayId}
                          </span>
                          <div className="flex-1">
                            <p className="text-[16px] text-text-primary mb-3">{item.text}</p>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setResult(section.id, item.id, 'pass')}
                                  className={`px-3 lg:px-4 py-1.5 rounded-lg text-[12px] lg:text-[13px] font-medium border transition-all cursor-pointer ${
                                    result === 'pass'
                                      ? 'bg-success/10 border-success text-success'
                                      : 'bg-white border-border text-text-secondary hover:border-success hover:text-success'
                                  }`}
                                >
                                  <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                    תקין
                                  </span>
                                </button>
                                <button
                                  onClick={() => setResult(section.id, item.id, 'fail')}
                                  className={`px-3 lg:px-4 py-1.5 rounded-lg text-[12px] lg:text-[13px] font-medium border transition-all cursor-pointer ${
                                    result === 'fail'
                                      ? 'bg-error/10 border-error text-error'
                                      : 'bg-white border-border text-text-secondary hover:border-error hover:text-error'
                                  }`}
                                >
                                  <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[16px]">cancel</span>
                                    לא תקין
                                  </span>
                                </button>
                              </div>
                              <input
                                type="text"
                                placeholder="הערות..."
                                value={notes[key] || ''}
                                onChange={(e) => setNote(section.id, item.id, e.target.value)}
                                className="w-full sm:flex-1 border border-border rounded-lg px-3 py-1.5 text-[13px] bg-bg outline-none focus:ring-2 focus:ring-action-blue/30 focus:border-action-blue"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* בר תחתון קבוע */}
      <div className="fixed bottom-0 left-0 right-0 lg:right-[240px] bg-white border-t border-border px-4 lg:px-8 py-3 lg:py-4 flex items-center justify-between z-30">
        <div className="flex items-center gap-3 lg:gap-6 text-[12px] lg:text-[14px]">
          <span className="text-success">
            תקין: <strong>{passCount}</strong>
          </span>
          <span className="text-error">
            לא תקין: <strong>{failCount}</strong>
          </span>
          <span className="text-text-secondary hidden sm:inline">
            נותרו: <strong>{totalItems - checkedItems}</strong>
          </span>
        </div>
        <button className="bg-action-blue hover:bg-action-blue/90 text-white px-5 lg:px-8 py-2 lg:py-2.5 rounded-lg text-[13px] lg:text-[14px] font-medium transition-all shadow-sm cursor-pointer">
          שמור ביקורת
        </button>
      </div>
    </div>
  )
}
