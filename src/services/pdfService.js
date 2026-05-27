// ייצוא PDF — לפי skill_pdf_stable
// Puppeteer + Chrome headless בצד שרת
// כללים: הדר בעמוד 1 בלבד, פוטר עם לוגו בעמוד 1 ואחרון,
// קטגוריה חדשה = עמוד חדש, סעיף+תמונות ביחד, 2 תמונות בעמוד
// לא flexbox מורכב, table layout, Heebo, RTL

import { LOGO_PISGAT } from './logo-base64'

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
const FALLBACK_COLORS = ['#405c9c','#F59E0B','#10B981','#F97316','#8B5CF6','#EF4444','#06B6D4','#334155','#6366f1']

function getSectionColor(title, idx) {
  return SECTION_COLOR_MAP[title] || FALLBACK_COLORS[idx % FALLBACK_COLORS.length]
}

function toAbsoluteUrl(src) {
  if (!src) return ''
  if (src.startsWith('http') || src.startsWith('data:')) return src
  return 'https://tos-app-six.vercel.app' + src
}

// המרת תמונה ל-base64 בדפדפן
async function imageToBase64(url) {
  try {
    const res = await fetch(url)
    const blob = await res.blob()
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = () => resolve(url)
      reader.readAsDataURL(blob)
    })
  } catch {
    return url
  }
}

// המרת כל תמונות הסקשנים ל-base64
async function convertAllImages(sections) {
  const result = []
  for (const section of sections) {
    const newItems = []
    for (const item of (section.items || [])) {
      if (item.images && item.images.length > 0) {
        const b64 = await Promise.all(
          item.images.map(src => imageToBase64(toAbsoluteUrl(src)))
        )
        newItems.push({ ...item, images: b64 })
      } else {
        newItems.push(item)
      }
    }
    result.push({ ...section, items: newItems })
  }
  return result
}

function buildItemHTML(item, iIdx, color, totalItems) {
  // תמונות — 2 בשורה בטבלה, לא ברוחב מלא
  const images = item.images || []
  let imagesHTML = ''
  if (images.length > 0) {
    const rows = []
    for (let r = 0; r < images.length; r += 2) {
      const pair = images.slice(r, r + 2)
      const cells = pair.map((src, ci) =>
        '<td style="width:50%;vertical-align:top;padding:4px;">' +
          '<div style="border:1px solid #d1d5db;border-radius:4px;overflow:hidden;background:#f9fafb;">' +
            '<img src="' + src + '" style="width:100%;height:auto;display:block;" />' +
            '<div style="padding:2px 6px;font-size:8px;color:#9ca3af;text-align:center;">תמונה ' + (r + ci + 1) + '</div>' +
          '</div>' +
        '</td>'
      ).join('')
      // אם תמונה בודדת בשורה — נרחיב ל-60%
      if (pair.length === 1) {
        rows.push('<tr><td style="width:60%;vertical-align:top;padding:4px;">' +
          '<div style="border:1px solid #d1d5db;border-radius:4px;overflow:hidden;background:#f9fafb;">' +
            '<img src="' + pair[0] + '" style="width:100%;height:auto;display:block;" />' +
            '<div style="padding:2px 6px;font-size:8px;color:#9ca3af;text-align:center;">תמונה ' + (r + 1) + '</div>' +
          '</div>' +
        '</td><td></td></tr>')
      } else {
        rows.push('<tr>' + cells + '</tr>')
      }
    }
    imagesHTML = '<table style="width:100%;margin:8px 0 4px 0;border-spacing:2px;">' + rows.join('') + '</table>'
  }

  const divider = iIdx < totalItems - 1
    ? '<div style="border-bottom:1px solid #eef2f5;margin:6px 0;"></div>'
    : ''

  // סעיף + תמונות = יחידה אחת שלא נפרדת
  return (
    '<div style="page-break-inside:avoid;margin-bottom:2px;">' +
      '<table style="width:100%;border-collapse:collapse;">' +
        '<tr>' +
          '<td style="width:32px;vertical-align:top;padding-top:2px;">' +
            '<div style="width:26px;height:26px;border-radius:50%;background:' + color + ';color:#fff;text-align:center;line-height:26px;font-weight:700;font-size:12px;">' +
              (item.displayId || iIdx + 1) +
            '</div>' +
          '</td>' +
          '<td style="vertical-align:top;padding:2px 0;">' +
            '<div style="font-size:12px;line-height:1.7;color:#1e293b;">' + (item.text || '') + '</div>' +
            imagesHTML +
          '</td>' +
        '</tr>' +
      '</table>' +
      divider +
    '</div>'
  )
}

function buildSectionsHTML(sections) {
  return sections.map((section, idx) => {
    const color = getSectionColor(section.title, idx)
    const itemsHTML = (section.items || []).map((item, iIdx) =>
      buildItemHTML(item, iIdx, color, section.items.length)
    ).join('')

    // קטגוריה חדשה = עמוד חדש (חוץ מהראשונה)
    const pageBreak = idx > 0 ? 'page-break-before:always;' : ''

    return (
      '<div style="' + pageBreak + 'margin-bottom:14px;">' +
        '<div style="background:' + color + ';border-radius:4px;padding:6px 12px;margin-bottom:8px;">' +
          '<span style="color:#fff;font-weight:700;font-size:14px;">' + section.title + '</span>' +
        '</div>' +
        itemsHTML +
      '</div>'
    )
  }).join('')
}

function buildHTML(tradeName, sections) {
  const sectionsHTML = buildSectionsHTML(sections)

  return '<!DOCTYPE html>' +
'<html lang="he" dir="rtl">' +
'<head>' +
'<meta charset="UTF-8">' +
'<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700;800&display=swap" rel="stylesheet">' +
'<style>' +
'*{margin:0;padding:0;box-sizing:border-box;}' +
'html,body{font-family:"Heebo",sans-serif;direction:rtl;background:#fff;color:#1e293b;font-size:12px;line-height:1.4;}' +
'</style>' +
'</head>' +
'<body>' +

// === הדר — עמוד ראשון בלבד ===
'<div style="text-align:center;border-bottom:2px solid #1e3a5f;padding-bottom:10px;margin-bottom:14px;">' +
  '<div style="font-size:24px;font-weight:800;color:#1e3a5f;margin-bottom:2px;">' + tradeName + '</div>' +
  '<div style="font-size:10px;color:#94a3b8;"><span style="margin:0 4px;">TOS</span>|<span style="margin:0 4px;">מדריך ביצוע ובקרת איכות</span></div>' +
'</div>' +

// === פוטר עמוד ראשון ===
// (יופיע בסוף העמוד הראשון דרך position, אבל כרגע נשים אותו בתחילת התוכן כלוגו)

// === תוכן ===
sectionsHTML +

// === פוטר סיום מסמך עם לוגו ===
'<div style="margin-top:20px;border-top:2px solid #1e3a5f;padding-top:10px;">' +
  '<table style="width:100%;">' +
    '<tr>' +
      '<td style="vertical-align:middle;">' +
        '<img src="' + LOGO_PISGAT + '" style="height:40px;" />' +
      '</td>' +
      '<td style="text-align:left;vertical-align:middle;font-size:8px;color:#94a3b8;">' +
        'מסמך זה הופק באמצעות מערכת TOS — לשימוש פנימי בלבד' +
      '</td>' +
    '</tr>' +
  '</table>' +
'</div>' +

'</body>' +
'</html>'
}

/**
 * ייצוא מדריך מלאכה ל-PDF
 */
export async function exportTradePDF(tradeName, tradeNameEn, sections) {
  // המרת כל התמונות ל-base64 בדפדפן — מונע crash של Chrome בשרת
  const sectionsB64 = await convertAllImages(sections || [])
  const html = buildHTML(tradeName, sectionsB64)

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
