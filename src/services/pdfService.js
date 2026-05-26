// ייצוא PDF — חלון הדפסה עם HTML מעוצב
// לפי skill_pdf_stable: Chrome עושה הכל, RTL, page breaks, פונטים

const SECTION_COLOR_MAP = {
  'לפני ביצוע': '#405c9c',
  'הכנות': '#F59E0B',
  'הכנות לאיטום': '#F59E0B',
  'שלבי ביצוע': '#10B981',
  'ביצוע האיטום': '#10B981',
  'מגבלות': '#F97316',
  'דגשים': '#8B5CF6',
  'כשלים': '#EF4444',
  'כשלים נפוצים': '#EF4444',
  'בקרות': '#06B6D4',
  'בטיחות': '#334155',
  'אופן מדידת סטיות': '#6366f1',
}

const FALLBACK_COLORS = [
  '#405c9c', '#F59E0B', '#10B981', '#F97316', '#8B5CF6', '#EF4444', '#06B6D4', '#334155', '#6366f1',
]

const ICON_MAP = {
  ClipboardCheck: 'assignment_turned_in', Wrench: 'construction', Layers: 'layers',
  AlertTriangle: 'warning', CheckCircle: 'check_circle', Shield: 'health_and_safety',
  BookOpen: 'menu_book', Hammer: 'construction', Ruler: 'straighten',
  XCircle: 'cancel', Search: 'fact_check', Info: 'info',
}

function getSectionColor(title, idx) {
  return SECTION_COLOR_MAP[title] || FALLBACK_COLORS[idx % FALLBACK_COLORS.length]
}

function getMaterialIcon(icon) {
  return ICON_MAP[icon] || icon || 'folder'
}

function buildSectionsHTML(sections) {
  return sections.map((section, idx) => {
    const color = getSectionColor(section.title, idx)
    const icon = getMaterialIcon(section.icon)

    const itemsHTML = (section.items || []).map((item, iIdx) => {
      const imgCount = item.images?.length || 0
      const imagesHTML = (imgCount > 0)
        ? `<div style="display:grid;grid-template-columns:${imgCount === 1 ? '1fr' : 'repeat(2, 1fr)'};gap:10px;margin:10px 0 4px 0;padding-right:52px;">
            ${item.images.map((src, imgI) => `
              <div style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;background:#f8fafc;">
                <img src="${src}" style="width:100%;height:auto;max-height:220px;object-fit:contain;display:block;" />
                <div style="padding:3px 8px;font-size:10px;color:#94a3b8;text-align:center;">תמונה ${imgI + 1}</div>
              </div>
            `).join('')}
           </div>`
        : ''

      const isLast = iIdx === section.items.length - 1

      return `
        <div style="display:flex;align-items:flex-start;gap:12px;position:relative;${!isLast ? 'padding-bottom:10px;' : ''}">
          ${!isLast ? `<div style="position:absolute;right:19px;top:42px;bottom:0;width:2px;background:${color}20;"></div>` : ''}
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
      <div style="break-inside:avoid;margin-bottom:24px;">
        <div style="background:${color};border-radius:8px;padding:10px 18px;display:flex;align-items:center;gap:10px;margin-bottom:14px;-webkit-print-color-adjust:exact;print-color-adjust:exact;">
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
  const sectionsHTML = buildSectionsHTML(sections)

  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8">
<title>${tradeName} - מדריך ביצוע</title>
<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html { direction:rtl; }
  body {
    font-family:'Heebo',sans-serif;
    direction:rtl;
    background:#fff;
    color:#1e293b;
    -webkit-print-color-adjust:exact;
    print-color-adjust:exact;
    padding:0;
  }
  @page { size:A4; margin:10mm 14mm; }
  @media print {
    html, body { margin:0 !important; padding:0 !important; }
  }
  .material-symbols-outlined {
    font-family:'Material Symbols Outlined';
    font-weight:normal;font-style:normal;font-size:24px;
    line-height:1;letter-spacing:normal;text-transform:none;
    display:inline-block;white-space:nowrap;word-wrap:normal;
    direction:ltr;-webkit-font-smoothing:antialiased;
  }

  /* כותרת */
  .header {
    text-align:center;
    border-bottom:2px solid #1e3a5f;
    padding-bottom:14px;
    margin-bottom:24px;
  }
  .header-trade {
    font-size:28px;
    font-weight:800;
    color:#1e3a5f;
    margin-bottom:4px;
  }
  .header-row {
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  .header-logo {
    font-size:13px;
    font-weight:700;
    color:#1e3a5f;
    letter-spacing:1px;
  }
  .header-sub {
    font-size:11px;
    color:#94a3b8;
  }

  /* פוטר */
  .footer {
    text-align:center;
    font-size:9px;
    color:#94a3b8;
    padding:20px 0 0;
    margin-top:30px;
    border-top:1px solid #e5e7eb;
  }
</style>
</head>
<body>

<!-- כותרת -->
<div class="header">
  <div class="header-trade">${tradeName}</div>
  <div class="header-row">
    <div class="header-logo">TOS</div>
    <div class="header-sub">מדריך ביצוע ובקרת איכות</div>
  </div>
</div>

<!-- תוכן -->
${sectionsHTML}

<!-- פוטר -->
<div class="footer">מסמך זה הופק באמצעות מערכת TOS — לשימוש פנימי בלבד</div>

</body>
</html>`
}

/**
 * ייצוא מדריך מלאכה ל-PDF
 * פותח tab חדש עם HTML מבודד ומדפיס
 */
export function exportTradePDF(tradeName, tradeNameEn, sections) {
  const html = buildHTML(tradeName, tradeNameEn || '', sections || [])

  // blob URL — מבודד לגמרי מ-CSS של האפליקציה
  const blob = new Blob([html], { type: 'text/html; charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const printWindow = window.open(url, '_blank')

  if (!printWindow) {
    alert('חלון ההדפסה נחסם — אנא אפשר חלונות קופצים ונסה שנית')
    URL.revokeObjectURL(url)
    return
  }

  printWindow.addEventListener('afterprint', () => {
    printWindow.close()
    URL.revokeObjectURL(url)
  })

  // המתנה לטעינה מלאה לפני הדפסה
  printWindow.addEventListener('load', () => {
    const images = printWindow.document.querySelectorAll('img')
    const imagePromises = Array.from(images).map(img =>
      new Promise(resolve => {
        if (img.complete) return resolve()
        img.onload = resolve
        img.onerror = resolve
      })
    )

    Promise.all([
      printWindow.document.fonts?.ready || Promise.resolve(),
      ...imagePromises,
    ]).then(() => {
      setTimeout(() => printWindow.print(), 400)
    })
  })
}
