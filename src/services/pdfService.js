// ייצוא PDF — חלון הדפסה עם HTML מעוצב בסגנון Stitch
// תומך RTL, עברית, תמונות

const SECTION_COLOR_MAP = {
  'לפני ביצוע': '#405c9c',
  'הכנות': '#F59E0B',
  'שלבי ביצוע': '#10B981',
  'מגבלות': '#F97316',
  'דגשים': '#8B5CF6',
  'כשלים': '#EF4444',
  'בקרות': '#06B6D4',
  'בטיחות': '#334155',
  'אופן מדידת סטיות': '#6366f1',
}

const FALLBACK_COLORS = [
  '#405c9c', '#F59E0B', '#10B981', '#F97316', '#8B5CF6', '#EF4444', '#06B6D4', '#334155', '#6366f1',
]

/* מיפוי אייקונים */
const ICON_MAP = {
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

function getSectionColor(title, idx) {
  return SECTION_COLOR_MAP[title] || FALLBACK_COLORS[idx % FALLBACK_COLORS.length]
}

function getMaterialIcon(icon) {
  return ICON_MAP[icon] || icon || 'folder'
}

function formatDate() {
  const d = new Date()
  return d.toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' })
}

function buildSectionsHTML(sections) {
  return sections.map((section, idx) => {
    const color = getSectionColor(section.title, idx)
    const icon = getMaterialIcon(section.icon)
    const itemsHTML = (section.items || []).map((item, iIdx) => {
      const imagesHTML = (item.images && item.images.length > 0)
        ? `<div style="display:flex;gap:8px;flex-wrap:wrap;margin:6px 0 6px 48px;">
            ${item.images.map(src => `<img src="${src}" style="width:80px;height:80px;object-fit:cover;border-radius:6px;border:1px solid #e5e7eb;" />`).join('')}
           </div>`
        : ''
      const isLast = iIdx === section.items.length - 1
      return `
        <div style="display:flex;align-items:flex-start;gap:12px;position:relative;${!isLast ? 'padding-bottom:8px;' : ''}">
          ${!isLast ? `<div style="position:absolute;right:19px;top:40px;bottom:0;width:2px;background:${color}20;"></div>` : ''}
          <div style="min-width:40px;width:40px;height:40px;border-radius:50%;background:${color};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px;flex-shrink:0;position:relative;z-index:1;">
            ${item.displayId || iIdx + 1}
          </div>
          <div style="flex:1;padding-top:8px;">
            <div style="font-size:14px;line-height:1.8;color:#1e293b;">${item.text || ''}</div>
            ${imagesHTML}
          </div>
        </div>
      `
    }).join('')

    return `
      <div class="no-break" style="margin-bottom:20px;">
        <div style="background:${color};border-radius:10px;padding:10px 18px;display:flex;align-items:center;gap:10px;margin-bottom:14px;">
          <span class="material-symbols-outlined" style="color:#fff;font-size:22px;">${icon}</span>
          <span style="color:#fff;font-weight:700;font-size:17px;">${section.title}</span>
        </div>
        <div style="padding:0 8px;">
          ${itemsHTML}
        </div>
      </div>
    `
  }).join('')
}

function buildHTML(tradeName, tradeNameEn, sections) {
  const date = formatDate()
  const sectionsHTML = buildSectionsHTML(sections)

  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8">
<title>${tradeName} - מדריך ביצוע ובקרת איכות</title>
<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Heebo',sans-serif; direction:rtl; background:#fff; color:#1e293b; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  @page { size:A4; margin:20mm 18mm; }
  @media print {
    body { margin:0; }
    .page-break { page-break-after:always; }
    .no-break { break-inside:avoid; }
    .no-print { display:none; }
  }
  .material-symbols-outlined { font-family:'Material Symbols Outlined'; font-weight:normal; font-style:normal; font-size:24px; line-height:1; letter-spacing:normal; text-transform:none; display:inline-block; white-space:nowrap; word-wrap:normal; direction:ltr; -webkit-font-smoothing:antialiased; }

  /* עמוד שער */
  .cover {
    width:100%; min-height:calc(100vh - 40mm); display:flex; flex-direction:column; justify-content:space-between;
    border:2px solid #1e3a5f; padding:30px; position:relative;
  }
  .cover-top { display:flex; justify-content:flex-end; align-items:center; gap:8px; }
  .cover-logo { display:flex; align-items:center; gap:8px; }
  .cover-logo .shield { width:36px; height:36px; background:#1e3a5f; border-radius:6px; display:flex; align-items:center; justify-content:center; }
  .cover-logo .shield .material-symbols-outlined { color:#fff; font-size:22px; }
  .cover-logo-text { font-size:20px; font-weight:800; color:#1e3a5f; letter-spacing:2px; }
  .cover-sub { font-size:11px; color:#64748b; letter-spacing:1px; }
  .cover-center { text-align:center; flex:1; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:12px; }
  .cover-title { font-size:44px; font-weight:800; color:#1e3a5f; }
  .cover-title-en { font-size:18px; font-weight:400; color:#64748b; letter-spacing:2px; direction:ltr; }
  .cover-line { width:80px; height:3px; background:#1e3a5f; border-radius:2px; }
  .cover-subtitle { font-size:16px; color:#475569; font-weight:500; }
  .cover-bottom { display:flex; justify-content:space-between; align-items:flex-end; font-size:11px; color:#64748b; }

  /* כותרת עליונה */
  .header { display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid #e2e8f0; padding-bottom:8px; margin-bottom:20px; font-size:11px; color:#94a3b8; }

  /* פוטר */
  .footer { position:fixed; bottom:0; left:0; right:0; text-align:center; font-size:9px; color:#94a3b8; padding:8px 0; }

  /* עמוד חתימות */
  .notes-line { border-bottom:1.5px solid #cbd5e1; height:32px; margin-bottom:4px; }
  .info-box { background:#f1f5f9; border-radius:8px; padding:14px 18px; font-size:12px; color:#475569; line-height:1.8; margin:20px 0; }
  .sig-grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; }
  .sig-box { border:1.5px solid #cbd5e1; border-radius:10px; padding:18px; }
  .sig-label { font-size:13px; font-weight:600; color:#334155; margin-bottom:12px; }
  .sig-line { border-bottom:1px dashed #94a3b8; height:40px; margin-bottom:8px; }
  .sig-date { font-size:11px; color:#64748b; }
</style>
</head>
<body>

<!-- תוכן -->
<div>
  <div class="header">
    <div>TOS | בקרת איכות בנייה</div>
    <div style="font-weight:600;color:#334155;">${tradeName}</div>
    <div></div>
  </div>
  ${sectionsHTML}
</div>


<!-- פוטר -->
<div class="footer">מסמך זה הופק באמצעות מערכת TOS — לשימוש פנימי בלבד</div>

</body>
</html>`
}

/**
 * ייצוא מדריך מלאכה ל-PDF באמצעות חלון הדפסה
 * @param {string} tradeName — שם המלאכה בעברית
 * @param {string} tradeNameEn — שם המלאכה באנגלית
 * @param {Array} sections — מערך סקשנים עם items
 */
export function exportTradePDF(tradeName, tradeNameEn, sections) {
  const html = buildHTML(tradeName, tradeNameEn || '', sections || [])

  const printWindow = window.open('', '_blank', 'width=900,height=700')
  if (!printWindow) {
    alert('חלון ההדפסה נחסם — אנא אפשר חלונות קופצים (popups) ונסה שנית')
    return
  }

  printWindow.document.write(html)
  printWindow.document.close()

  // מחכים שפונטים ותמונות ייטענו לפני הדפסה
  const images = printWindow.document.querySelectorAll('img')
  const imagePromises = Array.from(images).map(img =>
    new Promise(resolve => {
      if (img.complete) return resolve()
      img.onload = resolve
      img.onerror = resolve
    })
  )

  // מחכים לפונטים + תמונות
  Promise.all([
    printWindow.document.fonts?.ready || Promise.resolve(),
    ...imagePromises,
  ]).then(() => {
    setTimeout(() => {
      printWindow.print()
      // סגירת חלון אחרי הדפסה (או ביטול)
      setTimeout(() => {
        printWindow.close()
      }, 1000)
    }, 600)
  })
}
