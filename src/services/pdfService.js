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

      // תמונות: כל תמונה ברוחב מלא, אחת מתחת לשנייה — חוברת הדרכה, הקריאות חשובה
      let imagesHTML = ''
      if (images.length > 0) {
        const imgItems = images.map((src, imgI) =>
          '<div style="margin:8px 0;page-break-inside:avoid;">' +
            '<div style="border:1px solid #d1d5db;border-radius:6px;overflow:hidden;background:#f9fafb;">' +
              '<img src="' + src + '" style="width:100%;height:auto;display:block;" />' +
              '<div style="padding:3px 8px;font-size:9px;color:#9ca3af;text-align:center;">תמונה ' + (imgI + 1) + '</div>' +
            '</div>' +
          '</div>'
        ).join('')
        imagesHTML = '<div style="margin:10px 0 6px 42px;">' + imgItems + '</div>'
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
'.header{border-bottom:2px solid #1e3a5f;padding-bottom:14px;margin-bottom:22px;}' +
'.header-trade{font-size:26px;font-weight:800;color:#1e3a5f;margin-bottom:4px;text-align:center;}' +
'.header-meta{font-size:11px;color:#94a3b8;display:table;width:100%;}' +
'.header-meta-right{display:table-cell;text-align:right;font-weight:600;color:#1e3a5f;font-size:12px;}' +
'.header-meta-left{display:table-cell;text-align:left;color:#94a3b8;}' +
'.footer{margin-top:24px;border-top:2px solid #1e3a5f;padding-top:12px;}' +
'.footer-inner{display:table;width:100%;}' +
'.footer-logos{display:table-cell;text-align:right;vertical-align:middle;}' +
'.footer-logos img{height:32px;margin-left:12px;vertical-align:middle;}' +
'.footer-text{display:table-cell;text-align:left;vertical-align:middle;font-size:8px;color:#94a3b8;}' +
'</style>' +
'</head>' +
'<body>' +
'<div class="header">' +
  '<div class="header-trade">' + tradeName + '</div>' +
  '<div class="header-meta">' +
    '<div class="header-meta-right">TOS — מדריך ביצוע ובקרת איכות</div>' +
    '<div class="header-meta-left">מערכת ניהול איכות בבנייה</div>' +
  '</div>' +
'</div>' +
sectionsHTML +
'<div class="footer">' +
  '<div class="footer-inner">' +
    '<div class="footer-logos">' +
      '<img src="https://tos-app-six.vercel.app/images/logo1.jpeg" />' +
      '<img src="https://tos-app-six.vercel.app/images/logo2.png" />' +
    '</div>' +
    '<div class="footer-text">מסמך זה הופק באמצעות מערכת TOS — לשימוש פנימי בלבד</div>' +
  '</div>' +
'</div>' +
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
