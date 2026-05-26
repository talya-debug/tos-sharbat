import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { trades as staticTrades } from '../data/trades'
import { tradeData } from '../data/tradeData'
import { getTrade } from '../services/tradeService'
import { getSections, createSection, deleteSection } from '../services/sectionService'
import { getItems, createItem, updateItem, deleteItem } from '../services/itemService'
import { uploadImage, deleteImage } from '../services/storageService'
import { exportTradePDF } from '../services/pdfService'

/*
 * תמונות מהאקסלים — ממופות לסעיף + פריט (fallback בלבד)
 */
const defaultImages = {
  'interior-plaster/execution-2': ['/images/plaster/image1.png'],
  'interior-plaster/execution-3': ['/images/plaster/image2.jpeg'],
  'interior-plaster/execution-5': ['/images/plaster/image3.jpeg'],
  'interior-plaster/execution-6': ['/images/plaster/image4.jpeg'],
  'interior-plaster/execution-7': ['/images/plaster/image5.png'],
  'interior-plaster/execution-8': ['/images/plaster/image6.png'],
  'interior-plaster/limitations-5': ['/images/plaster/image8.png'],
  'interior-plaster/measurement-1': ['/images/plaster/image7.jpeg'],
  'waterproofing-wet-rooms/preparation-1': ['/images/waterproofing/image1.png'],
  'waterproofing-wet-rooms/execution-1': ['/images/waterproofing/image2.png'],
  'waterproofing-wet-rooms/execution-2': ['/images/waterproofing/image3.png'],
  'waterproofing-wet-rooms/before-1': ['/images/waterproofing/image4.png', '/images/waterproofing/image5.png'],
}

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
  XCircle: 'cancel',
  Search: 'search',
}

/* צבעים לכל סקשן */
const sectionColors = [
  '#2170e4', '#F59E0B', '#10B981', '#F97316', '#8B5CF6', '#EF4444', '#334155', '#06B6D4',
]

export default function TradePage() {
  const { tradeId } = useParams()
  const navigate = useNavigate()
  const [openSections, setOpenSections] = useState([0])
  const [lightboxImg, setLightboxImg] = useState(null)
  const fileInputRef = useRef(null)
  const [activeUploadKey, setActiveUploadKey] = useState(null)
  const [loading, setLoading] = useState(true)
  const [useSupabase, setUseSupabase] = useState(false)

  // נתונים מ-Supabase
  const [trade, setTrade] = useState(null)
  const [sections, setSections] = useState([])
  const [sectionItems, setSectionItems] = useState({}) // { sectionId: [items] }

  // נתוני fallback סטטיים
  const [staticTrade, setStaticTrade] = useState(null)
  const [staticData, setStaticData] = useState(null)

  // עריכת פריטים
  const [editingItem, setEditingItem] = useState(null) // item id
  const [editText, setEditText] = useState('')
  const editInputRef = useRef(null)

  // הוספת פרק
  const [showAddSection, setShowAddSection] = useState(false)
  const [newSectionTitle, setNewSectionTitle] = useState('')

  // תמונות — לפריטי Supabase מגיע מ-DB, לפריטים סטטיים מ-defaultImages
  const [localImages, setLocalImages] = useState({})

  useEffect(() => {
    loadData()
  }, [tradeId])

  async function loadData() {
    setLoading(true)
    try {
      // ניסיון לטעון מ-Supabase
      const sbTrade = await getTrade(tradeId)
      if (sbTrade) {
        setTrade(sbTrade)
        setUseSupabase(true)
        const sbSections = await getSections(tradeId)
        setSections(sbSections)
        // טעינת פריטים לכל פרק
        const itemsMap = {}
        await Promise.all(sbSections.map(async (sec) => {
          const items = await getItems(sec.id)
          itemsMap[sec.id] = items
        }))
        setSectionItems(itemsMap)
        setLoading(false)
        return
      }
    } catch {
      // fallback
    }

    // fallback לנתונים סטטיים
    const st = staticTrades.find(t => t.id === tradeId)
    const sd = tradeData[tradeId]
    setStaticTrade(st)
    setStaticData(sd)
    setUseSupabase(false)

    // טעינת תמונות ברירת מחדל
    if (tradeId) {
      const defaults = {}
      Object.entries(defaultImages).forEach(([key, urls]) => {
        if (key.startsWith(tradeId + '/')) {
          const itemKey = key.replace(tradeId + '/', '')
          defaults[itemKey] = [...urls]
        }
      })
      setLocalImages(defaults)
    }
    setLoading(false)
  }

  // --- רינדור ---
  const displayTrade = useSupabase ? trade : staticTrade
  const displaySections = useSupabase
    ? sections.map(s => ({
        ...s,
        title: s.title,
        titleEn: s.title_en,
        items: (sectionItems[s.id] || []).map((item, idx) => ({
          ...item,
          displayId: idx + 1,
        })),
      }))
    : (staticData?.sections || []).map(s => ({
        ...s,
        items: s.items.map(item => ({ ...item, displayId: item.id })),
      }))

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!displayTrade) {
    return <p className="text-text-secondary">מלאכה לא נמצאה</p>
  }

  const tradeName = displayTrade.name
  const tradeColor = useSupabase ? displayTrade.color : displayTrade.color

  const toggleSection = (idx) => {
    setOpenSections(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    )
  }

  // --- עריכת פריט ---
  function startEdit(item) {
    if (!useSupabase) return
    setEditingItem(item.id)
    setEditText(item.text)
    setTimeout(() => editInputRef.current?.focus(), 50)
  }

  async function saveEdit(itemId) {
    if (!editText.trim()) return
    try {
      await updateItem(itemId, { text: editText.trim() })
      // עדכון מקומי
      setSectionItems(prev => {
        const updated = { ...prev }
        for (const secId of Object.keys(updated)) {
          updated[secId] = updated[secId].map(item =>
            item.id === itemId ? { ...item, text: editText.trim() } : item
          )
        }
        return updated
      })
    } catch (err) {
      console.error('שגיאה בעדכון:', err)
    }
    setEditingItem(null)
  }

  // --- הוספת פריט ---
  async function handleAddItem(sectionId) {
    if (!useSupabase) return
    try {
      const newItem = await createItem(sectionId, { text: 'פריט חדש' })
      setSectionItems(prev => ({
        ...prev,
        [sectionId]: [...(prev[sectionId] || []), newItem],
      }))
      // התחלת עריכה מיידית
      setEditingItem(newItem.id)
      setEditText('פריט חדש')
      setTimeout(() => editInputRef.current?.focus(), 50)
    } catch (err) {
      console.error('שגיאה בהוספת פריט:', err)
    }
  }

  // --- מחיקת פריט ---
  async function handleDeleteItem(itemId, sectionId) {
    if (!useSupabase) return
    if (!confirm('למחוק את הפריט?')) return
    try {
      await deleteItem(itemId)
      setSectionItems(prev => ({
        ...prev,
        [sectionId]: (prev[sectionId] || []).filter(i => i.id !== itemId),
      }))
    } catch (err) {
      console.error('שגיאה במחיקת פריט:', err)
    }
  }

  // --- הוספת פרק ---
  async function handleAddSection() {
    if (!useSupabase || !newSectionTitle.trim()) return
    try {
      const sec = await createSection(tradeId, { title: newSectionTitle.trim() })
      setSections(prev => [...prev, sec])
      setSectionItems(prev => ({ ...prev, [sec.id]: [] }))
      setShowAddSection(false)
      setNewSectionTitle('')
      // פתיחת הפרק החדש
      setOpenSections(prev => [...prev, sections.length])
    } catch (err) {
      console.error('שגיאה בהוספת פרק:', err)
    }
  }

  // --- מחיקת פרק ---
  async function handleDeleteSection(sectionId, idx) {
    if (!useSupabase) return
    if (!confirm('למחוק את הפרק וכל הפריטים שבו?')) return
    try {
      await deleteSection(sectionId)
      setSections(prev => prev.filter(s => s.id !== sectionId))
      setSectionItems(prev => {
        const updated = { ...prev }
        delete updated[sectionId]
        return updated
      })
    } catch (err) {
      console.error('שגיאה במחיקת פרק:', err)
    }
  }

  // --- תמונות ---
  function getItemImages(sectionId, item) {
    if (useSupabase) {
      return item.images || []
    }
    const imgKey = `${sectionId}-${item.id}`
    return localImages[imgKey] || []
  }

  const handleAddImage = (key) => {
    setActiveUploadKey(key)
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file || !activeUploadKey) return
    e.target.value = ''

    if (useSupabase) {
      // העלאה ל-Supabase Storage
      const [sectionId, itemId] = activeUploadKey.split('|')
      try {
        const path = `${tradeId}/${sectionId}/${Date.now()}_${file.name}`
        const publicUrl = await uploadImage(file, path)
        // עדכון ה-images array ב-DB
        const currentItem = (sectionItems[sectionId] || []).find(i => i.id === itemId)
        const newImages = [...(currentItem?.images || []), publicUrl]
        await updateItem(itemId, { images: newImages })
        setSectionItems(prev => ({
          ...prev,
          [sectionId]: (prev[sectionId] || []).map(i =>
            i.id === itemId ? { ...i, images: newImages } : i
          ),
        }))
      } catch (err) {
        console.error('שגיאה בהעלאת תמונה:', err)
        alert('שגיאה בהעלאת תמונה: ' + (err?.message || err))
      }
    } else {
      const url = URL.createObjectURL(file)
      setLocalImages(prev => ({
        ...prev,
        [activeUploadKey]: [...(prev[activeUploadKey] || []), url],
      }))
    }
  }

  const removeImage = async (sectionId, itemId, imgIdx) => {
    if (useSupabase) {
      try {
        const currentItem = (sectionItems[sectionId] || []).find(i => i.id === itemId)
        const currentImages = currentItem?.images || []
        const removedUrl = currentImages[imgIdx]
        const newImages = currentImages.filter((_, i) => i !== imgIdx)
        await updateItem(itemId, { images: newImages })
        // נסיון למחוק מ-Storage
        if (removedUrl && removedUrl.includes('trade-images')) {
          const pathMatch = removedUrl.split('/trade-images/')[1]
          if (pathMatch) {
            try { await deleteImage(pathMatch) } catch {}
          }
        }
        setSectionItems(prev => ({
          ...prev,
          [sectionId]: (prev[sectionId] || []).map(i =>
            i.id === itemId ? { ...i, images: newImages } : i
          ),
        }))
      } catch (err) {
        console.error('שגיאה במחיקת תמונה:', err)
        alert('שגיאה במחיקת תמונה: ' + (err?.message || err))
      }
    } else {
      const key = `${sectionId}-${itemId}`
      setLocalImages(prev => ({
        ...prev,
        [key]: (prev[key] || []).filter((_, i) => i !== imgIdx),
      }))
    }
  }

  return (
    <div>
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

        <div className="flex items-center gap-3">
          {/* כפתור ייצוא PDF */}
          <button
            onClick={() => exportTradePDF(tradeName, displayTrade.name_en || '', displaySections)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-text-secondary hover:text-primary hover:border-primary/30 text-[13px] font-medium transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
            ייצוא PDF
          </button>

          {/* טוגל טאבים */}
          <div className="bg-bg p-1 rounded-full flex gap-1 shadow-sm border border-border self-start">
            <button className="px-4 lg:px-6 py-2 rounded-full bg-primary text-white font-medium text-[13px] lg:text-[14px] transition-all duration-200">
              מדריך ביצוע
            </button>
            <button
              onClick={() => navigate(`/trade/${tradeId}/checklist`)}
              className="px-4 lg:px-6 py-2 rounded-full text-text-secondary hover:text-primary font-medium text-[13px] lg:text-[14px] transition-all duration-200"
            >
              בקרת איכות
            </button>
          </div>
        </div>
      </div>

      {/* אקורדיון */}
      <div className="max-w-4xl space-y-4">
        {displaySections.map((section, idx) => {
          const isOpen = openSections.includes(idx)
          const materialIcon = iconMap[section.icon] || 'folder'
          const color = sectionColors[idx % sectionColors.length]
          const sectionId = section.id

          return (
            <div
              key={sectionId}
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
                <div className="flex items-center gap-2">
                  {useSupabase && (
                    <span
                      onClick={(e) => { e.stopPropagation(); handleDeleteSection(sectionId, idx) }}
                      className="material-symbols-outlined text-[18px] text-text-secondary hover:text-error transition-colors opacity-0 group-hover:opacity-100"
                      title="מחק פרק"
                    >
                      delete
                    </span>
                  )}
                  <span className={`material-symbols-outlined chevron-icon transition-transform duration-300 text-text-secondary`}>
                    expand_more
                  </span>
                </div>
              </button>
              <div className="accordion-content border-t border-border">
                <div className="p-6 space-y-4 text-[16px] leading-[24px] text-text-secondary">
                  {section.items.map((item, itemIdx) => {
                    const itemImages = useSupabase
                      ? (item.images || [])
                      : getItemImages(sectionId, item)
                    const imgKey = useSupabase ? `${sectionId}|${item.id}` : `${sectionId}-${item.id}`
                    const isEditing = editingItem === item.id

                    return (
                      <div key={item.id}>
                        {itemIdx > 0 && <div className="h-px bg-border w-full mb-4"></div>}
                        <div className="flex gap-4 items-start group">
                          <span
                            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold text-white mt-0.5"
                            style={{ backgroundColor: color }}
                          >
                            {item.displayId}
                          </span>
                          <div className="flex-1 min-w-0">
                            {isEditing ? (
                              <input
                                ref={editInputRef}
                                type="text"
                                value={editText}
                                onChange={e => setEditText(e.target.value)}
                                onBlur={() => saveEdit(item.id)}
                                onKeyDown={e => { if (e.key === 'Enter') saveEdit(item.id); if (e.key === 'Escape') setEditingItem(null) }}
                                className="w-full border border-primary rounded-lg px-3 py-1.5 text-[16px] outline-none focus:ring-2 focus:ring-primary/30"
                              />
                            ) : (
                              <p
                                onClick={() => startEdit(item)}
                                className={useSupabase ? 'cursor-pointer hover:bg-bg/50 rounded px-1 -mx-1 transition-colors' : ''}
                              >
                                {item.text}
                              </p>
                            )}
                            {/* תמונות + כפתור הוספה */}
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                              {itemImages.map((url, imgIdx) => (
                                <div key={imgIdx} className="relative group/img">
                                  <img
                                    src={url}
                                    alt={`תמונה ${imgIdx + 1}`}
                                    className="w-12 h-12 object-cover rounded-lg border border-border cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={() => setLightboxImg(url)}
                                  />
                                  <button
                                    onClick={(e) => { e.stopPropagation(); removeImage(sectionId, item.id, imgIdx) }}
                                    className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-error text-white rounded-full text-[10px] flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity shadow"
                                  >
                                    X
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
                          {/* כפתור מחיקת פריט */}
                          {useSupabase && (
                            <button
                              onClick={() => handleDeleteItem(item.id, sectionId)}
                              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-text-secondary hover:text-error hover:bg-error/10 transition-all opacity-0 group-hover:opacity-100"
                              title="מחק פריט"
                            >
                              <span className="material-symbols-outlined text-[16px]">close</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                  {/* כפתור הוספת פריט */}
                  {useSupabase && (
                    <button
                      onClick={() => handleAddItem(sectionId)}
                      className="flex items-center gap-2 text-text-secondary hover:text-primary text-[14px] mt-2 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">add_circle</span>
                      הוסף פריט
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {/* כפתור הוספת פרק */}
        {useSupabase && (
          <div className="mt-4">
            {showAddSection ? (
              <div className="bg-white border border-border rounded-xl shadow-sm p-4 flex items-center gap-3">
                <input
                  type="text"
                  value={newSectionTitle}
                  onChange={e => setNewSectionTitle(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleAddSection(); if (e.key === 'Escape') setShowAddSection(false) }}
                  placeholder="שם הפרק החדש"
                  className="flex-1 border border-border rounded-lg px-3 py-2 text-[14px] outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  autoFocus
                />
                <button
                  onClick={handleAddSection}
                  disabled={!newSectionTitle.trim()}
                  className="bg-primary text-white px-4 py-2 rounded-lg text-[14px] font-medium disabled:opacity-50 transition-all"
                >
                  הוסף
                </button>
                <button
                  onClick={() => { setShowAddSection(false); setNewSectionTitle('') }}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAddSection(true)}
                className="w-full border-2 border-dashed border-border rounded-xl p-4 flex items-center justify-center gap-2 text-text-secondary hover:text-primary hover:border-primary/30 transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">add</span>
                <span className="text-[14px] font-medium">הוסף פרק חדש</span>
              </button>
            )}
          </div>
        )}
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
