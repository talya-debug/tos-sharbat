// ייצוא PDF — לפי skill_pdf_stable
// Puppeteer + Chrome headless בצד שרת
// CSS: לא flexbox מורכב, page-break-inside: avoid, Heebo מוטמע, A4

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
      // תמונות: לא flexbox — table layout פשוט
      const imagesHTML = (imgCount > 0)
        ? `<table style="margin:8px 0 4px 52px;border-spacing:8px;">
            <tr>
            ${item.images.map((src, imgI) => `
              <td style="vertical-align:top;">
                <div style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;background:#f8fafc;width:${imgCount === 1 ? '300px' : '200px'};">
                  <img src="${src}" style="width:100%;height:auto;display:block;" />
                  <div style="padding:2px 6px;font-size:9px;color:#94a3b8;text-align:center;">תמונה ${imgI + 1}</div>
                </div>
              </td>
            `).join('')}
            </tr>
           </table>`
        : ''

      return `
        <div style="page-break-inside:avoid;margin-bottom:8px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="width:40px;vertical-align:top;padding-top:2px;">
                <div style="width:32px;height:32px;border-radius:50%;background:${color};color:#fff;text-align:center;line-height:32px;font-weight:700;font-size:14px;">
                  ${item.displayId || iIdx + 1}
                </div>
              </td>
              <td style="vertical-align:top;padding:4px 0;">
                <div style="font-size:13px;line-height:1.7;color:#1e293b;">${item.text || ''}</div>
                ${imagesHTML}
              </td>
            </tr>
          </table>
          ${iIdx < section.items.length - 1 ? '<div style="border-bottom:1px solid #f1f5f9;margin:4px 0 4px 40px;"></div>' : ''}
        </div>
      `
    }).join('')

    return `
      <div style="page-break-inside:avoid;margin-bottom:20px;">
        <div style="background:${color};border-radius:6px;padding:8px 14px;margin-bottom:10px;">
          <span style="color:#fff;font-weight:700;font-size:15px;">${section.title}</span>
        </div>
        ${itemsHTML}
      </div>
    `
  }).join('')
}

function buildHTML(tradeName, tradeNameEn, sections) {
  const sectionsHTML = buildSectionsHTML(sections)

  // לפי הסקיל: Heebo מ-CDN עם networkidle0, dir=rtl, לא flexbox מורכב
  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html, body {
    font-family:'Heebo', sans-serif;
    direction:rtl;
    background:#fff;
    color:#1e293b;
    font-size:13px;
    line-height:1.5;
  }

  .header {
    text-align:center;
    border-bottom:2px solid #1e3a5f;
    padding-bottom:12px;
    margin-bottom:20px;
  }
  .header-trade {
    font-size:26px;
    font-weight:800;
    color:#1e3a5f;
    margin-bottom:2px;
  }
  .header-meta {
    font-size:11px;
    color:#94a3b8;
  }
  .header-meta span {
    margin:0 8px;
  }

  .footer {
    text-align:center;
    font-size:8px;
    color:#94a3b8;
    padding-top:16px;
    margin-top:24px;
    border-top:1px solid #e5e7eb;
  }
</style>
</head>
<body>

<div class="header">
  <div class="header-trade">${tradeName}</div>
  <div class="header-meta">
    <span>TOS</span>|<span>מדריך ביצוע ובקרת איכות</span>
  </div>
</div>

${sectionsHTML}

<div class="footer">מסמך זה הופק באמצעות מערכת TOS — לשימוש פנימי בלבד</div>

</body>
</html>`
}

/**
 * ייצוא מדריך מלאכה ל-PDF
 * שולח HTML ל-API route שמריץ Puppeteer
 */
export async function exportTradePDF(tradeName, tradeNameEn, sections) {
  const html = buildHTML(tradeName, tradeNameEn || '', sections || [])

  try {
    const res = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html }),
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(err)
    }

    // הורדת הקובץ
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${tradeName} - מדריך ביצוע.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('שגיאה בייצוא PDF:', err)
    alert('שגיאה בייצוא PDF: ' + err.message)
  }
}
