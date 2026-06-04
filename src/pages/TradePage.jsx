import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { trades as staticTrades } from '../data/trades'
import { tradeData } from '../data/tradeData'
import { getTrade } from '../services/tradeService'
import { getSections, createSection, deleteSection, reorderSections } from '../services/sectionService'
import { getItems, createItem, updateItem, deleteItem, reorderItems } from '../services/itemService'
import { getSubsections, createSubsection, updateSubsection, deleteSubsection, reorderSubsections } from '../services/subsectionService'
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

  // תת-קטגוריות
  const [subsections, setSubsections] = useState({}) // { sectionId: [subsections] }
  const [showAddSubsection, setShowAddSubsection] = useState(null) // sectionId
  const [newSubsectionTitle, setNewSubsectionTitle] = useState('')
  const [editingSubsection, setEditingSubsection] = useState(null)
  const [editSubsectionText, setEditSubsectionText] = useState('')

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
        // טעינת פריטים + תת-קטגוריות לכל פרק
        const itemsMap = {}
        const subsMap = {}
        await Promise.all(sbSections.map(async (sec) => {
          const [items, subs] = await Promise.all([
            getItems(sec.id),
            getSubsections(sec.id)
          ])
          itemsMap[sec.id] = items
          subsMap[sec.id] = subs
        }))
        setSectionItems(itemsMap)
        setSubsections(subsMap)
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
  // קיבוץ פריטים לפי תת-קטגוריות
  function groupItemsBySubsection(sectionId) {
    const items = sectionItems[sectionId] || []
    const subs = subsections[sectionId] || []
    const groups = []
    let globalIdx = 1

    // תת-קטגוריות עם הפריטים שלהן
    subs.forEach((sub, subIdx) => {
      const subItems = items
        .filter(i => i.subsection_id === sub.id)
        .map((item, idx) => ({ ...item, displayId: `${subIdx + 1}.${idx + 1}` }))
      if (subItems.length > 0 || true) { // מציג גם ריקות כדי שאפשר להוסיף
        groups.push({ type: 'subsection', subsection: sub, items: subItems, subIdx: subIdx + 1 })
      }
      globalIdx += subItems.length
    })

    // פריטים כלליים (בלי תת-קטגוריה)
    const generalItems = items
      .filter(i => !i.subsection_id)
      .map((item, idx) => ({ ...item, displayId: subs.length > 0 ? `${subs.length + 1}.${idx + 1}` : idx + 1 }))
    if (generalItems.length > 0 || subs.length > 0) {
      groups.push({ type: 'general', items: generalItems })
    }

    return groups
  }

  const displaySections = useSupabase
    ? sections.map(s => ({
        ...s,
        title: s.title,
        titleEn: s.title_en,
        items: (sectionItems[s.id] || []).map((item, idx) => ({
          ...item,
          displayId: idx + 1,
        })),
        groups: groupItemsBySubsection(s.id),
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
    setTimeout(() => { editInputRef.current?.focus(); editInputRef.current?.select() }, 50)
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
  async function handleAddItem(sectionId, subsectionId = null) {
    if (!useSupabase) return
    try {
      const newItem = await createItem(sectionId, { text: 'פריט חדש', subsection_id: subsectionId })
      setSectionItems(prev => ({
        ...prev,
        [sectionId]: [...(prev[sectionId] || []), newItem],
      }))
      setEditingItem(newItem.id)
      setEditText('פריט חדש')
      setTimeout(() => { editInputRef.current?.focus(); editInputRef.current?.select() }, 50)
    } catch (err) {
      console.error('שגיאה בהוספת פריט:', err)
    }
  }

  // --- תת-קטגוריות ---
  async function handleAddSubsection(sectionId) {
    if (!useSupabase || !newSubsectionTitle.trim()) return
    try {
      const sub = await createSubsection(sectionId, { title: newSubsectionTitle.trim() })
      setSubsections(prev => ({
        ...prev,
        [sectionId]: [...(prev[sectionId] || []), sub],
      }))
      setShowAddSubsection(null)
      setNewSubsectionTitle('')
    } catch (err) {
      console.error('שגיאה בהוספת תת-קטגוריה:', err)
    }
  }

  async function handleDeleteSubsection(sectionId, subsectionId) {
    if (!useSupabase) return
    if (!confirm('למחוק את תת-הקטגוריה? הפריטים שבה יעברו לכללי.')) return
    try {
      await deleteSubsection(subsectionId)
      setSubsections(prev => ({
        ...prev,
        [sectionId]: (prev[sectionId] || []).filter(s => s.id !== subsectionId),
      }))
      // פריטים שהיו בתת-קטגוריה עוברים ל-null (כללי) — DB עושה SET NULL
      setSectionItems(prev => ({
        ...prev,
        [sectionId]: (prev[sectionId] || []).map(i =>
          i.subsection_id === subsectionId ? { ...i, subsection_id: null } : i
        ),
      }))
    } catch (err) {
      console.error('שגיאה במחיקת תת-קטגוריה:', err)
    }
  }

  function startEditSubsection(sub) {
    setEditingSubsection(sub.id)
    setEditSubsectionText(sub.title)
  }

  async function saveEditSubsection(sectionId, subId) {
    if (!editSubsectionText.trim()) return
    try {
      await updateSubsection(subId, { title: editSubsectionText.trim() })
      setSubsections(prev => ({
        ...prev,
        [sectionId]: (prev[sectionId] || []).map(s =>
          s.id === subId ? { ...s, title: editSubsectionText.trim() } : s
        ),
      }))
    } catch (err) {
      console.error('שגיאה בעדכון תת-קטגוריה:', err)
    }
    setEditingSubsection(null)
  }

  // --- הזזת קטגוריה ---
  async function handleMoveSection(idx, direction) {
    if (!useSupabase) return
    const newIdx = idx + direction
    if (newIdx < 0 || newIdx >= sections.length) return

    const newSections = [...sections]
    const [moved] = newSections.splice(idx, 1)
    newSections.splice(newIdx, 0, moved)

    setSections(newSections)
    try {
      await reorderSections(tradeId, newSections.map(s => s.id))
    } catch (err) {
      console.error('שגיאה בסידור קטגוריות:', err)
      setSections(sections)
    }
  }

  // --- הזזת תת-קטגוריה ---
  async function handleMoveSubsection(sectionId, idx, direction) {
    if (!useSupabase) return
    const subs = subsections[sectionId] || []
    const newIdx = idx + direction
    if (newIdx < 0 || newIdx >= subs.length) return

    const newSubs = [...subs]
    const [moved] = newSubs.splice(idx, 1)
    newSubs.splice(newIdx, 0, moved)

    setSubsections(prev => ({ ...prev, [sectionId]: newSubs }))
    try {
      await reorderSubsections(sectionId, newSubs.map(s => s.id))
    } catch (err) {
      console.error('שגיאה בסידור תת-קטגוריות:', err)
      setSubsections(prev => ({ ...prev, [sectionId]: subs }))
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

  // --- הזזת פריט למעלה/למטה ---
  async function handleMoveItem(sectionId, itemIdx, direction) {
    if (!useSupabase) return
    const items = sectionItems[sectionId] || []
    const newIdx = itemIdx + direction
    if (newIdx < 0 || newIdx >= items.length) return

    const newItems = [...items]
    const [moved] = newItems.splice(itemIdx, 1)
    newItems.splice(newIdx, 0, moved)

    // עדכון מקומי מיידי
    setSectionItems(prev => ({ ...prev, [sectionId]: newItems }))

    // עדכון DB
    try {
      await reorderItems(sectionId, newItems.map(i => i.id))
    } catch (err) {
      console.error('שגיאה בסידור:', err)
      setSectionItems(prev => ({ ...prev, [sectionId]: items }))
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
        const ext = file.name.split('.').pop() || 'jpg'
        const path = `${tradeId}/${sectionId}/${Date.now()}.${ext}`
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
          {/* כפתורי שיתוף לינק ציבורי */}
          <button
            onClick={() => {
              const url = `${window.location.origin}/view/${tradeId}`
              navigator.clipboard.writeText(url)
              const el = document.getElementById('share-copied')
              if (el) { el.classList.remove('hidden'); setTimeout(() => el.classList.add('hidden'), 1500) }
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-text-secondary hover:text-primary hover:border-primary/30 text-[13px] font-medium transition-all relative"
            title="העתק לינק ציבורי"
          >
            <span className="material-symbols-outlined text-[18px]">link</span>
            לינק
            <span id="share-copied" className="hidden absolute -top-8 left-1/2 -translate-x-1/2 bg-green-600 text-white text-[11px] px-2 py-0.5 rounded-full whitespace-nowrap">הועתק!</span>
          </button>
          <button
            onClick={() => {
              const url = `${window.location.origin}/view/${tradeId}`
              const text = `${tradeName}\n${url}`
              window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-border text-text-secondary hover:text-green-600 hover:border-green-300 text-[13px] font-medium transition-all"
            title="שלח בוואטסאפ"
          >
            <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </button>

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
                    <>
                      <span
                        onClick={(e) => { e.stopPropagation(); handleMoveSection(idx, -1) }}
                        className={`material-symbols-outlined text-[18px] text-text-secondary hover:text-primary transition-colors ${idx === 0 ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}`}
                        title="הזז למעלה"
                      >
                        keyboard_arrow_up
                      </span>
                      <span
                        onClick={(e) => { e.stopPropagation(); handleMoveSection(idx, 1) }}
                        className={`material-symbols-outlined text-[18px] text-text-secondary hover:text-primary transition-colors ${idx === displaySections.length - 1 ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'}`}
                        title="הזז למטה"
                      >
                        keyboard_arrow_down
                      </span>
                    </>
                  )}
                  {useSupabase && (
                    <span
                      onClick={(e) => { e.stopPropagation(); handleDeleteSection(sectionId, idx) }}
                      className="material-symbols-outlined text-[18px] text-text-secondary hover:text-error transition-colors cursor-pointer"
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
                  {useSupabase && section.groups ? (
                    <>
                      {section.groups.map((group, gIdx) => {
                        const renderItem = (item, itemIdx, allItems) => {
                          const itemImages = item.images || []
                          const imgKey = `${sectionId}|${item.id}`
                          const isEditing = editingItem === item.id

                          return (
                            <div key={item.id}>
                              {itemIdx > 0 && <div className="h-px bg-border/50 w-full mb-3"></div>}
                              <div className="flex gap-4 items-start group">
                                <span
                                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white mt-0.5"
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
                                      className="cursor-pointer hover:bg-bg/50 rounded px-1 -mx-1 transition-colors"
                                    >
                                      {item.text}
                                    </p>
                                  )}
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
                                <div className="flex flex-col items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0">
                                  <button
                                    onClick={() => {
                                      const fullItems = sectionItems[sectionId] || []
                                      const fullIdx = fullItems.findIndex(i => i.id === item.id)
                                      if (fullIdx > 0) handleMoveItem(sectionId, fullIdx, -1)
                                    }}
                                    disabled={itemIdx === 0}
                                    className="w-6 h-6 rounded flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                                    title="הזז למעלה"
                                  >
                                    <span className="material-symbols-outlined text-[16px]">keyboard_arrow_up</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      const fullItems = sectionItems[sectionId] || []
                                      const fullIdx = fullItems.findIndex(i => i.id === item.id)
                                      if (fullIdx < fullItems.length - 1) handleMoveItem(sectionId, fullIdx, 1)
                                    }}
                                    disabled={itemIdx === allItems.length - 1}
                                    className="w-6 h-6 rounded flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                                    title="הזז למטה"
                                  >
                                    <span className="material-symbols-outlined text-[16px]">keyboard_arrow_down</span>
                                  </button>
                                  <button
                                    onClick={() => handleDeleteItem(item.id, sectionId)}
                                    className="w-6 h-6 rounded flex items-center justify-center text-text-secondary hover:text-error hover:bg-error/10 transition-all"
                                    title="מחק פריט"
                                  >
                                    <span className="material-symbols-outlined text-[16px]">close</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          )
                        }

                        if (group.type === 'subsection') {
                          const subs = subsections[sectionId] || []
                          const subIdx = subs.findIndex(s => s.id === group.subsection.id)
                          return (
                            <div key={group.subsection.id} className="mb-4">
                              {gIdx > 0 && <div className="h-px bg-border w-full mb-4"></div>}
                              {/* כותרת תת-קטגוריה */}
                              <div className="flex items-center gap-2 mb-3 group/sub">
                                <div
                                  className="w-1 h-6 rounded-full"
                                  style={{ backgroundColor: color, opacity: 0.5 }}
                                ></div>
                                {editingSubsection === group.subsection.id ? (
                                  <input
                                    type="text"
                                    value={editSubsectionText}
                                    onChange={e => setEditSubsectionText(e.target.value)}
                                    onBlur={() => saveEditSubsection(sectionId, group.subsection.id)}
                                    onKeyDown={e => { if (e.key === 'Enter') saveEditSubsection(sectionId, group.subsection.id); if (e.key === 'Escape') setEditingSubsection(null) }}
                                    className="border border-primary rounded px-2 py-1 text-[15px] font-semibold outline-none focus:ring-2 focus:ring-primary/30"
                                    autoFocus
                                  />
                                ) : (
                                  <span
                                    className="text-[15px] font-semibold cursor-pointer hover:bg-bg/50 rounded px-1 transition-colors"
                                    style={{ color }}
                                    onClick={() => startEditSubsection(group.subsection)}
                                  >
                                    {group.subsection.title}
                                  </span>
                                )}
                                <span
                                  onClick={() => handleMoveSubsection(sectionId, subIdx, -1)}
                                  className={`material-symbols-outlined text-[14px] transition-colors opacity-0 group-hover/sub:opacity-100 ${subIdx === 0 ? 'text-text-secondary/30 cursor-not-allowed' : 'text-text-secondary hover:text-primary cursor-pointer'}`}
                                  title="הזז למעלה"
                                >
                                  keyboard_arrow_up
                                </span>
                                <span
                                  onClick={() => handleMoveSubsection(sectionId, subIdx, 1)}
                                  className={`material-symbols-outlined text-[14px] transition-colors opacity-0 group-hover/sub:opacity-100 ${subIdx === subs.length - 1 ? 'text-text-secondary/30 cursor-not-allowed' : 'text-text-secondary hover:text-primary cursor-pointer'}`}
                                  title="הזז למטה"
                                >
                                  keyboard_arrow_down
                                </span>
                                <button
                                  onClick={() => handleDeleteSubsection(sectionId, group.subsection.id)}
                                  className="w-5 h-5 rounded flex items-center justify-center text-text-secondary hover:text-error transition-all opacity-0 group-hover/sub:opacity-100"
                                  title="מחק תת-קטגוריה"
                                >
                                  <span className="material-symbols-outlined text-[14px]">close</span>
                                </button>
                              </div>
                              {/* פריטים בתת-קטגוריה */}
                              <div className="pr-4 border-r-2 border-border/30 space-y-3">
                                {group.items.map((item, iIdx) => renderItem(item, iIdx, group.items))}
                                <button
                                  onClick={() => handleAddItem(sectionId, group.subsection.id)}
                                  className="flex items-center gap-2 text-text-secondary hover:text-primary text-[13px] transition-colors"
                                >
                                  <span className="material-symbols-outlined text-[16px]">add_circle</span>
                                  הוסף פריט
                                </button>
                              </div>
                            </div>
                          )
                        }

                        // כללי
                        return (
                          <div key="general" className="mb-4">
                            {gIdx > 0 && <div className="h-px bg-border w-full mb-4"></div>}
                            {(subsections[sectionId] || []).length > 0 && (
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-1 h-6 rounded-full bg-text-secondary/30"></div>
                                <span className="text-[15px] font-semibold text-text-secondary">כללי</span>
                              </div>
                            )}
                            <div className={`${(subsections[sectionId] || []).length > 0 ? 'pr-4 border-r-2 border-border/30' : ''} space-y-3`}>
                              {group.items.map((item, iIdx) => renderItem(item, iIdx, group.items))}
                              <button
                                onClick={() => handleAddItem(sectionId)}
                                className="flex items-center gap-2 text-text-secondary hover:text-primary text-[13px] transition-colors"
                              >
                                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                                הוסף פריט
                              </button>
                            </div>
                          </div>
                        )
                      })}
                      {/* כפתור הוספת תת-קטגוריה */}
                      {showAddSubsection === sectionId ? (
                        <div className="flex items-center gap-2 mt-2">
                          <input
                            type="text"
                            value={newSubsectionTitle}
                            onChange={e => setNewSubsectionTitle(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') handleAddSubsection(sectionId); if (e.key === 'Escape') setShowAddSubsection(null) }}
                            placeholder="שם תת-קטגוריה"
                            className="flex-1 border border-border rounded-lg px-3 py-1.5 text-[13px] outline-none focus:ring-2 focus:ring-primary/30"
                            autoFocus
                          />
                          <button onClick={() => handleAddSubsection(sectionId)} disabled={!newSubsectionTitle.trim()} className="bg-primary text-white px-3 py-1.5 rounded-lg text-[13px] font-medium disabled:opacity-50">הוסף</button>
                          <button onClick={() => { setShowAddSubsection(null); setNewSubsectionTitle('') }} className="text-text-secondary hover:text-text-primary"><span className="material-symbols-outlined text-[18px]">close</span></button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowAddSubsection(sectionId)}
                          className="flex items-center gap-2 text-text-secondary hover:text-primary text-[13px] mt-2 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">create_new_folder</span>
                          הוסף תת-קטגוריה
                        </button>
                      )}
                    </>
                  ) : (
                    <>
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
                            </div>
                          </div>
                        )
                      })}
                      {useSupabase && (
                        <button
                          onClick={() => handleAddItem(sectionId)}
                          className="flex items-center gap-2 text-text-secondary hover:text-primary text-[14px] mt-2 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">add_circle</span>
                          הוסף פריט
                        </button>
                      )}
                    </>
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
