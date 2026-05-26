import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getTrades, createTrade } from '../services/tradeService'
import { trades as staticTrades } from '../data/trades'

const stats = [
  { label: 'ביקורות שבוצעו', value: '142', icon: 'fact_check', color: '#3B82F6' },
  { label: 'ליקויים פתוחים', value: '8', icon: 'report_problem', color: '#EF4444' },
  { label: 'ממתינים לאישור', value: '15', icon: 'pending_actions', color: '#F59E0B' },
  { label: 'אחוז עמידה', value: '94%', icon: 'trending_up', color: '#10B981' },
]

// אייקונים זמינים לבחירה
const availableIcons = [
  { value: 'water_drop', label: 'טיפת מים' },
  { value: 'format_paint', label: 'צבע' },
  { value: 'grid_view', label: 'רשת' },
  { value: 'umbrella', label: 'מטריה' },
  { value: 'build', label: 'בנייה' },
  { value: 'construction', label: 'כלי עבודה' },
  { value: 'engineering', label: 'הנדסה' },
  { value: 'electrical_services', label: 'חשמל' },
  { value: 'plumbing', label: 'אינסטלציה' },
  { value: 'roofing', label: 'גג' },
]

const availableColors = [
  '#3B82F6', '#FFA600', '#00C875', '#6c5ce7', '#EF4444', '#F59E0B', '#06B6D4', '#8B5CF6', '#EC4899', '#14B8A6',
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const [trades, setTrades] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [newTrade, setNewTrade] = useState({ name: '', name_en: '', desc_text: '', desc_en: '', icon: 'build', color: '#3B82F6' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadTrades()
  }, [])

  async function loadTrades() {
    try {
      const data = await getTrades()
      if (data && data.length > 0) {
        setTrades(data.map(t => ({
          id: t.id,
          name: t.name,
          nameEn: t.name_en,
          desc: t.desc_text,
          descEn: t.desc_en,
          icon: t.icon,
          color: t.color,
        })))
      } else {
        // fallback לנתונים סטטיים
        setTrades(staticTrades)
      }
    } catch {
      setTrades(staticTrades)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateTrade() {
    if (!newTrade.name.trim()) return
    setSaving(true)
    try {
      await createTrade(newTrade)
      setShowModal(false)
      setNewTrade({ name: '', name_en: '', desc_text: '', desc_en: '', icon: 'build', color: '#3B82F6' })
      await loadTrades()
    } catch (err) {
      console.error('שגיאה ביצירת מלאכה:', err)
    } finally {
      setSaving(false)
    }
  }

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
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
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

          {/* כפתור הוסף מלאכה */}
          <div
            onClick={() => setShowModal(true)}
            className="bg-white border-2 border-dashed border-border rounded-xl shadow-sm p-6 flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-md hover:border-primary/40 transition-all duration-200 group"
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-bg group-hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined text-[32px] text-text-secondary group-hover:text-primary transition-colors">add</span>
            </div>
            <p className="text-text-secondary font-medium text-[14px] group-hover:text-primary transition-colors">הוסף מלאכה</p>
          </div>
        </div>
      )}

      {/* מודל הוספת מלאכה */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[20px] font-bold text-text-primary">הוספת מלאכה חדשה</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-full bg-bg flex items-center justify-center hover:bg-border transition-colors">
                <span className="material-symbols-outlined text-[18px] text-text-secondary">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[13px] font-medium text-text-primary mb-1 block">שם המלאכה *</label>
                <input
                  type="text"
                  value={newTrade.name}
                  onChange={e => setNewTrade(p => ({ ...p, name: e.target.value }))}
                  placeholder="לדוגמה: עבודות גבס"
                  className="w-full border border-border rounded-lg px-3 py-2 text-[14px] outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  autoFocus
                />
              </div>

              <div>
                <label className="text-[13px] font-medium text-text-primary mb-1 block">תיאור</label>
                <input
                  type="text"
                  value={newTrade.desc_text}
                  onChange={e => setNewTrade(p => ({ ...p, desc_text: e.target.value }))}
                  placeholder="תיאור קצר של המלאכה"
                  className="w-full border border-border rounded-lg px-3 py-2 text-[14px] outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>

              <div>
                <label className="text-[13px] font-medium text-text-primary mb-2 block">אייקון</label>
                <div className="flex flex-wrap gap-2">
                  {availableIcons.map(icon => (
                    <button
                      key={icon.value}
                      onClick={() => setNewTrade(p => ({ ...p, icon: icon.value }))}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all ${
                        newTrade.icon === icon.value ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/30'
                      }`}
                      title={icon.label}
                    >
                      <span className="material-symbols-outlined text-[20px]" style={{ color: newTrade.icon === icon.value ? newTrade.color : '#64748b' }}>{icon.value}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[13px] font-medium text-text-primary mb-2 block">צבע</label>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map(color => (
                    <button
                      key={color}
                      onClick={() => setNewTrade(p => ({ ...p, color }))}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        newTrade.color === color ? 'border-text-primary scale-110' : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCreateTrade}
                disabled={saving || !newTrade.name.trim()}
                className="flex-1 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg text-[14px] font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'שומר...' : 'הוסף מלאכה'}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 rounded-lg text-[14px] font-medium border border-border text-text-secondary hover:bg-bg transition-all"
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
