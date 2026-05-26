import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useRef } from 'react'
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
  const [images, setImages] = useState({}) // { "sectionId-itemId": [url1, url2, ...] }
  const [lightboxImg, setLightboxImg] = useState(null)
  const fileInputRef = useRef(null)
  const [activeUploadKey, setActiveUploadKey] = useState(null)

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

  const handleAddImage = (key) => {
    setActiveUploadKey(key)
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file || !activeUploadKey) return
    const url = URL.createObjectURL(file)
    setImages(prev => ({
      ...prev,
      [activeUploadKey]: [...(prev[activeUploadKey] || []), url],
    }))
    e.target.value = ''
  }

  const removeImage = (key, idx) => {
    setImages(prev => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== idx),
    }))
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
                  {section.items.map((item, itemIdx) => {
                    const imgKey = `${section.id}-${item.id}`
                    const itemImages = images[imgKey] || []
                    return (
                      <div key={item.id}>
                        {itemIdx > 0 && <div className="h-px bg-border w-full mb-4"></div>}
                        <div className="flex gap-4 items-start">
                          <span
                            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold text-white mt-0.5"
                            style={{ backgroundColor: color }}
                          >
                            {item.id}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p>{item.text}</p>
                            {/* תמונות + כפתור הוספה */}
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                              {itemImages.map((url, imgIdx) => (
                                <div key={imgIdx} className="relative group">
                                  <img
                                    src={url}
                                    alt={`תמונה ${imgIdx + 1}`}
                                    className="w-12 h-12 object-cover rounded-lg border border-border cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={() => setLightboxImg(url)}
                                  />
                                  <button
                                    onClick={(e) => { e.stopPropagation(); removeImage(imgKey, imgIdx) }}
                                    className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-error text-white rounded-full text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                              <button
                                onClick={() => handleAddImage(imgKey)}
                                className="w-12 h-12 border-2 border-dashed border-border rounded-lg flex items-center justify-center text-text-secondary hover:border-action-blue hover:text-action-blue transition-colors"
                                title="הוספת תמונה"
                              >
                                <span className="material-symbols-outlined text-[20px]">add_a_photo</span>
                              </button>
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

      {/* קלט קובץ מוסתר */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* לייטבוקס — תמונה מוגדלת */}
      {lightboxImg && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-8 cursor-pointer"
          onClick={() => setLightboxImg(null)}
        >
          <div className="relative max-w-3xl max-h-[80vh]">
            <img
              src={lightboxImg}
              alt="תמונה מוגדלת"
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-3 left-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
