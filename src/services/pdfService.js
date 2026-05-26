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

function toAbsoluteUrl(src) {
  if (src.startsWith('http')) return src
  return 'https://tos-app-six.vercel.app' + src
}

function buildSectionsHTML(sections) {
  return sections.map((section, idx) => {
    const color = getSectionColor(section.title, idx)

    const itemsHTML = (section.items || []).map((item, iIdx) => {
      const images = (item.images || []).map(toAbsoluteUrl)

      // תמונות: תמונה בודדת = רוחב 280px (חצי עמוד), מרובות = 2 בשורה 200px כ"א
      let imagesHTML = ''
      if (images.length > 0) {
        const imgWidth = images.length === 1 ? 280 : 200
        const imgMaxHeight = images.length === 1 ? 350 : 250
        const imgRows = []
        for (let r = 0; r < images.length; r += 2) {
          const rowImgs = images.slice(r, r + 2)
          const cells = rowImgs.map((src, ci) =>
            '<td style="vertical-align:top;padding:4px;">' +
              '<div style="border:1px solid #d1d5db;border-radius:6px;overflow:hidden;background:#f9fafb;width:' + imgWidth + 'px;">' +
                '<img src="' + src + '" style="width:100%;max-height:' + imgMaxHeight + 'px;object-fit:contain;display:block;" />' +
                '<div style="padding:2px 6px;font-size:9px;color:#9ca3af;text-align:center;">תמונה ' + (r + ci + 1) + '</div>' +
              '</div>' +
            '</td>'
          ).join('')
          imgRows.push('<tr>' + cells + '</tr>')
        }
        imagesHTML = '<table style="margin:10px 0 6px 42px;border-spacing:0;">' + imgRows.join('') + '</table>'
      }

      const divider = iIdx < section.items.length - 1
        ? '<div style="border-bottom:1px solid #f3f4f6;margin:6px 0 6px 42px;"></div>'
        : ''

      return (
        '<div style="page-break-inside:avoid;margin-bottom:4px;">' +
          '<table style="width:100%;border-collapse:collapse;">' +
            '<tr>' +
              '<td style="width:42px;vertical-align:top;padding-top:2px;">' +
                '<div style="width:30px;height:30px;border-radius:50%;background:' + color + ';color:#fff;text-align:center;line-height:30px;font-weight:700;font-size:13px;">' +
                  (item.displayId || iIdx + 1) +
                '</div>' +
              '</td>' +
              '<td style="vertical-align:top;padding:3px 0;">' +
                '<div style="font-size:13px;line-height:1.7;color:#1e293b;">' + (item.text || '') + '</div>' +
              '</td>' +
            '</tr>' +
          '</table>' +
          imagesHTML +
          divider +
        '</div>'
      )
    }).join('')

    return (
      '<div style="margin-bottom:18px;">' +
        '<div style="background:' + color + ';border-radius:4px;padding:7px 14px;margin-bottom:10px;">' +
          '<span style="color:#fff;font-weight:700;font-size:15px;">' + section.title + '</span>' +
        '</div>' +
        itemsHTML +
      '</div>'
    )
  }).join('')
}

function buildHTML(tradeName, tradeNameEn, sections) {
  const sectionsHTML = buildSectionsHTML(sections)

  return '<!DOCTYPE html>' +
'<html lang="he" dir="rtl">' +
'<head>' +
'<meta charset="UTF-8">' +
'<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700;800&display=swap" rel="stylesheet">' +
'<style>' +
'*{margin:0;padding:0;box-sizing:border-box;}' +
'html,body{font-family:"Heebo",sans-serif;direction:rtl;background:#fff;color:#1e293b;font-size:13px;line-height:1.5;}' +
'.header{text-align:center;border-bottom:2px solid #1e3a5f;padding-bottom:12px;margin-bottom:20px;}' +
'.header-trade{font-size:26px;font-weight:800;color:#1e3a5f;margin-bottom:2px;}' +
'.header-meta{font-size:11px;color:#94a3b8;}' +
'.header-meta span{margin:0 6px;}' +
'.footer{text-align:center;font-size:8px;color:#94a3b8;padding-top:14px;margin-top:20px;border-top:1px solid #e5e7eb;}' +
'</style>' +
'</head>' +
'<body>' +
'<div class="header">' +
  '<div class="header-trade">' + tradeName + '</div>' +
  '<div class="header-meta"><span>TOS</span>|<span>מדריך ביצוע ובקרת איכות</span></div>' +
'</div>' +
sectionsHTML +
'<div class="footer">מסמך זה הופק באמצעות מערכת TOS — לשימוש פנימי בלבד</div>' +
'</body>' +
'</html>'
}

/**
 * ייצוא PDF — שולח HTML ל-API שמריץ Puppeteer
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
      const errText = await res.text()
      throw new Error(errText)
    }

    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = tradeName + ' - מדריך ביצוע.pdf'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('שגיאה בייצוא PDF:', err)
    alert('שגיאה בייצוא PDF: ' + err.message)
  }
}
