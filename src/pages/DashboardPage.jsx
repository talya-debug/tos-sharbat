import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getTrades, createTrade, updateTrade } from '../services/tradeService'
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
  const [editTrade, setEditTrade] = useState(null) // { id, name, desc }

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

  async function handleEditTrade() {
    if (!editTrade || !editTrade.name.trim()) return
    setSaving(true)
    try {
      await updateTrade(editTrade.id, { name: editTrade.name.trim(), desc_text: editTrade.desc.trim() })
      setEditTrade(null)
      await loadTrades()
    } catch (err) {
      console.error('שגיאה בעדכון מלאכה:', err)
    } finally {
      setSaving(false)
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
      <div className="flex items-center justify-between flex-wrap gap-3 mb-1">
        <h2 className="text-[24px] lg:text-[32px] leading-[32px] lg:leading-[40px] font-bold text-text-primary">ניהול מלאכות באתר</h2>
        <button
          onClick={() => {
            const baseUrl = window.location.origin
            const links = trades.map(t => `${t.name}: ${baseUrl}/view/${t.id}`).join('\n')
            const text = `מלאכות - מדריכי ביצוע\n\n${links}`
            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-text-secondary hover:text-green-600 hover:border-green-300 text-[13px] font-medium transition-all"
          title="שלח את כל הלינקים בוואטסאפ"
        >
          <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          שלח הכל בוואטסאפ
        </button>
      </div>
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
              className="bg-white border border-border rounded-xl shadow-sm p-6 flex flex-col items-center gap-4 cursor-pointer hover:shadow-md hover:border-primary/30 transition-all duration-200 group relative"
            >
              {/* כפתור עריכה */}
              <button
                onClick={(e) => { e.stopPropagation(); setEditTrade({ id: trade.id, name: trade.name, desc: trade.desc || '' }) }}
                className="absolute top-2 left-2 w-7 h-7 rounded-full bg-bg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-border"
                title="ערוך מלאכה"
              >
                <span className="material-symbols-outlined text-[14px] text-text-secondary">edit</span>
              </button>
              <div
                onClick={() => navigate(`/trade/${trade.id}`)}
                className="w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ backgroundColor: trade.color + '15' }}
              >
                <span className="material-symbols-outlined text-[32px]" style={{ color: trade.color }}>{trade.icon}</span>
              </div>
              <div className="text-center" onClick={() => navigate(`/trade/${trade.id}`)}>
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

      {/* מודל עריכת מלאכה */}
      {editTrade && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditTrade(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[20px] font-bold text-text-primary">עריכת מלאכה</h3>
              <button onClick={() => setEditTrade(null)} className="w-8 h-8 rounded-full bg-bg flex items-center justify-center hover:bg-border transition-colors">
                <span className="material-symbols-outlined text-[18px] text-text-secondary">close</span>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[13px] font-medium text-text-primary mb-1 block">שם המלאכה</label>
                <input
                  type="text"
                  value={editTrade.name}
                  onChange={e => setEditTrade(p => ({ ...p, name: e.target.value }))}
                  className="w-full border border-border rounded-lg px-3 py-2 text-[14px] outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-[13px] font-medium text-text-primary mb-1 block">תיאור</label>
                <input
                  type="text"
                  value={editTrade.desc}
                  onChange={e => setEditTrade(p => ({ ...p, desc: e.target.value }))}
                  className="w-full border border-border rounded-lg px-3 py-2 text-[14px] outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleEditTrade}
                disabled={saving || !editTrade.name.trim()}
                className="flex-1 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg text-[14px] font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'שומר...' : 'שמור שינויים'}
              </button>
              <button
                onClick={() => setEditTrade(null)}
                className="px-6 py-2.5 rounded-lg text-[14px] font-medium border border-border text-text-secondary hover:bg-bg transition-all"
              >
                ביטול
              </button>
            </div>
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
