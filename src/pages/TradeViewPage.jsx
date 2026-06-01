import { useParams, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getTrade } from '../services/tradeService'
import { getSections } from '../services/sectionService'
import { getItems } from '../services/itemService'

// הגדרות שפה
const LANGS = {
  he: { label: 'עב', name: 'עברית', dir: 'rtl', font: 'inherit' },
  en: { label: 'EN', name: 'English', dir: 'ltr', font: 'inherit' },
  ru: { label: 'РУ', name: 'Русский', dir: 'ltr', font: 'inherit' },
  ar: { label: 'عر', name: 'العربية', dir: 'rtl', font: 'inherit' },
}

// אייקונים
const iconMap = {
  ClipboardCheck: 'assignment_late',
  Wrench: 'construction',
  Hammer: 'construction',
  AlertTriangle: 'warning',
  XCircle: 'cancel',
  Search: 'search',
  Shield: 'health_and_safety',
  Ruler: 'straighten',
  CheckCircle: 'check_circle',
  Package: 'inventory_2',
}

const sectionColors = [
  '#2170e4', '#F59E0B', '#10B981', '#F97316', '#8B5CF6', '#EF4444', '#334155', '#06B6D4',
]

// שליפת טקסט בשפה הנכונה עם fallback
function t(item, field, lang) {
  if (lang === 'he') return item[field] || ''
  const langField = `${field}_${lang}`
  return item[langField] || item[`${field}_en`] || item[field] || ''
}

export default function TradeViewPage() {
  const { tradeId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [lang, setLang] = useState(searchParams.get('lang') || 'he')
  const [trade, setTrade] = useState(null)
  const [sections, setSections] = useState([])
  const [sectionItems, setSectionItems] = useState({})
  const [loading, setLoading] = useState(true)
  const [openSections, setOpenSections] = useState([0])
  const [error, setError] = useState(null)

  const langConfig = LANGS[lang] || LANGS.he
  const isRtl = langConfig.dir === 'rtl'

  useEffect(() => {
    loadData()
  }, [tradeId])

  useEffect(() => {
    setSearchParams(lang === 'he' ? {} : { lang })
  }, [lang])

  async function loadData() {
    setLoading(true)
    try {
      const sbTrade = await getTrade(tradeId)
      if (!sbTrade) { setError('not_found'); setLoading(false); return }
      setTrade(sbTrade)
      const sbSections = await getSections(tradeId)
      setSections(sbSections)
      const itemsMap = {}
      await Promise.all(sbSections.map(async (sec) => {
        const items = await getItems(sec.id)
        itemsMap[sec.id] = items
      }))
      setSectionItems(itemsMap)
    } catch (err) {
      setError('error')
      console.error(err)
    }
    setLoading(false)
  }

  function changeLang(newLang) {
    setLang(newLang)
  }

  function toggleSection(idx) {
    setOpenSections(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error || !trade) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center">
        <p className="text-gray-500 text-lg">מלאכה לא נמצאה</p>
      </div>
    )
  }

  const tradeName = t(trade, 'name', lang)
  const displaySections = sections.map(s => ({
    ...s,
    items: (sectionItems[s.id] || []).map((item, idx) => ({
      ...item,
      displayId: idx + 1,
    })),
  }))

  return (
    <div className="min-h-screen bg-[#f8f9fb]" dir={langConfig.dir}>
      {/* Google Fonts for Material Symbols */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />

      {/* הדר */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-3">
          {/* שורה ראשונה: כותרת + בורר שפה */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                style={{ backgroundColor: trade.color || '#3B82F6' }}
              >
                <span className="material-symbols-outlined text-[20px] sm:text-[22px]">{trade.icon || 'build'}</span>
              </div>
              <h1 className="text-[17px] sm:text-[22px] font-bold text-gray-900 leading-tight">{tradeName}</h1>
            </div>

            {/* בורר שפה */}
            <div className="flex bg-gray-100 rounded-full p-0.5 gap-0.5 flex-shrink-0">
              {Object.entries(LANGS).map(([code, cfg]) => (
                <button
                  key={code}
                  onClick={() => changeLang(code)}
                  className={`px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-[12px] font-semibold transition-all ${
                    lang === code
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {cfg.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </header>

      {/* תוכן */}
      <main className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        {displaySections.map((section, idx) => {
          const isOpen = openSections.includes(idx)
          const materialIcon = iconMap[section.icon] || 'folder'
          const color = sectionColors[idx % sectionColors.length]
          const sectionTitle = t(section, 'title', lang)

          return (
            <div
              key={section.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
            >
              {/* כותרת סקשן */}
              <button
                onClick={() => toggleSection(idx)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer active:bg-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: color }}
                  >
                    <span className="material-symbols-outlined text-[20px]">{materialIcon}</span>
                  </div>
                  <span className="text-[17px] sm:text-[19px] font-bold text-gray-900">{sectionTitle}</span>
                  <span className="text-[13px] text-gray-400 font-medium">({section.items.length})</span>
                </div>
                <span
                  className={`material-symbols-outlined text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                >
                  expand_more
                </span>
              </button>

              {/* תוכן סקשן */}
              {isOpen && (
                <div className="border-t border-gray-100 px-4 py-4 space-y-0">
                  {section.items.map((item, itemIdx) => {
                    const itemText = t(item, 'text', lang)
                    const itemImages = item.images || []

                    return (
                      <div key={item.id}>
                        {itemIdx > 0 && <div className="h-px bg-gray-100 my-3"></div>}
                        <div className="flex gap-3 items-start">
                          <span
                            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold text-white mt-0.5"
                            style={{ backgroundColor: color }}
                          >
                            {item.displayId}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-[15px] sm:text-[16px] leading-[24px] text-gray-700">{itemText}</p>
                            {/* תמונות */}
                            {itemImages.length > 0 && (
                              <div className="flex gap-2 mt-2 flex-wrap">
                                {itemImages.map((url, imgIdx) => (
                                  <img
                                    key={imgIdx}
                                    src={url}
                                    alt=""
                                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-gray-200 cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={() => window.open(url, '_blank')}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}

        {/* פוטר */}
        <div className="text-center py-6 text-[13px] text-gray-400">
          TOS — Quality Control System
        </div>
      </main>
    </div>
  )
}
