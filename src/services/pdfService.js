// ייצוא PDF — חוקים חכמים
// כללים:
// - הדר עמוד 1 בלבד + לוגו פסגת הנדסה משמאל
// - פוטר: displayHeaderFooter ב-Puppeteer (תחתית כל עמוד)
// - page-break חכם: רק אם העמוד הקודם מלא מספיק (>35%)
// - כותרת קטגוריה + פריט ראשון = יחידה (לא נפרדים)
// - קטגוריות טקסט = break-inside:avoid, זורמות ברצף
// - סעיף+תמונות = יחידה אחת
// - 2 תמונות בשורה, בודדת ממורכזת

import { LOGO_SHARBAT } from './logo-sharbat-base64'

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

// בדיקה: האם לקטגוריה יש תמונות
function sectionHasImages(section) {
  return (section.items || []).some(item => item.images && item.images.length > 0)
}

function buildItemHTML(item, iIdx, color, totalItems, globalImgNum) {
  const images = (item.images || []).map(toAbsoluteUrl)
  let imagesHTML = ''
  if (images.length > 0) {
    const rows = []
    for (let r = 0; r < images.length; r += 2) {
      const pair = images.slice(r, r + 2)
      if (pair.length === 1) {
        // תמונה בודדת — ממורכזת, אותו רוחב כמו תמונה בזוג
        rows.push(
          '<tr><td colspan="2" style="padding:4px;text-align:center;">' +
            '<div style="width:50%;display:inline-block;text-align:right;">' +
              '<div style="border:1px solid #d1d5db;border-radius:6px;overflow:hidden;background:#f9fafb;">' +
                '<img src="' + pair[0] + '" style="width:100%;max-height:280px;display:block;" />' +
                '<div style="padding:2px 6px;font-size:8px;color:#9ca3af;text-align:center;">תמונה ' + (globalImgNum + r) + '</div>' +
              '</div>' +
            '</div>' +
          '</td></tr>')
      } else {
        // זוג תמונות — 50/50, אותו גובה, contain שומר על כל התמונה
        const cells = pair.map((src, ci) =>
          '<td style="width:50%;vertical-align:top;padding:4px;">' +
            '<div style="border:1px solid #d1d5db;border-radius:6px;overflow:hidden;background:#f9fafb;">' +
              '<img src="' + src + '" style="width:100%;height:220px;object-fit:contain;display:block;" />' +
              '<div style="padding:2px 6px;font-size:8px;color:#9ca3af;text-align:center;">תמונה ' + (globalImgNum + r + ci) + '</div>' +
            '</div>' +
          '</td>'
        ).join('')
        rows.push('<tr>' + cells + '</tr>')
      }
    }
    imagesHTML = '<table style="width:100%;margin:6px 0 2px 0;border-spacing:2px;">' + rows.join('') + '</table>'
  }

  const divider = iIdx < totalItems - 1
    ? '<div style="border-bottom:1px solid #eef2f5;margin:4px 0;"></div>'
    : ''

  return (
    '<div style="page-break-inside:avoid;margin-bottom:2px;">' +
      '<table style="width:100%;border-collapse:collapse;">' +
        '<tr>' +
          '<td style="width:30px;vertical-align:top;padding-top:2px;">' +
            '<div style="width:24px;height:24px;border-radius:50%;background:' + color + ';color:#fff;text-align:center;line-height:24px;font-weight:700;font-size:11px;">' +
              (item.displayId || iIdx + 1) +
            '</div>' +
          '</td>' +
          '<td style="vertical-align:top;padding:1px 0;">' +
            '<div style="font-size:16px;line-height:1.6;color:#1e293b;">' + (item.text || '') + '</div>' +
            imagesHTML +
          '</td>' +
        '</tr>' +
      '</table>' +
      divider +
    '</div>'
  )
}

// הערכת גובה סקשן בפיקסלים (לחישוב page-break חכם)
function estimateSectionHeight(section) {
  const HEADER_H = 35
  const TEXT_ITEM_H = 42
  const PAIR_ROW_H = 235
  const SINGLE_IMG_H = 200

  let h = HEADER_H
  for (const item of (section.items || [])) {
    h += TEXT_ITEM_H
    const imgCount = (item.images || []).length
    if (imgCount > 0) {
      h += Math.floor(imgCount / 2) * PAIR_ROW_H
      if (imgCount % 2 === 1) h += SINGLE_IMG_H
    }
  }
  return h
}

function buildSectionsHTML(sections) {
  // --- שלב 0: מיון — סקשנים עם תמונות קודם, טקסט בלבד בסוף ---
  const withImages = sections.filter(s => sectionHasImages(s))
  const textOnly = sections.filter(s => !sectionHasImages(s))
  const sorted = [...withImages, ...textOnly]

  // --- שלב 1: הערכת גבהים והחלטה על page-breaks ---
  const PAGE_H = 1047       // A4 usable height: (297-8-12) * 96/25.4
  const DOC_HEADER_H = 180  // הדר עם לוגו
  const MIN_FILL = 0.35     // מינימום 35% מילוי עמוד כדי להצדיק שבירה

  const heights = sorted.map(estimateSectionHeight)
  const shouldBreak = new Array(sorted.length).fill(false)
  let pageFill = DOC_HEADER_H

  for (let i = 0; i < sorted.length; i++) {
    const hasImages = sectionHasImages(sorted[i])
    const sH = heights[i]

    if (i === 0) {
      pageFill += sH
      while (pageFill > PAGE_H) pageFill -= PAGE_H
      continue
    }

    if (hasImages && (pageFill / PAGE_H) >= MIN_FILL) {
      shouldBreak[i] = true
      pageFill = sH
      while (pageFill > PAGE_H) pageFill -= PAGE_H
    } else {
      pageFill += sH
      while (pageFill > PAGE_H) pageFill -= PAGE_H
    }
  }

  // --- שלב 2: בניית HTML ---
  let globalImgNum = 1
  const imageDivs = []
  const textDivs = []

  sorted.forEach((section, idx) => {
    const origIdx = sections.indexOf(section)
    const color = getSectionColor(section.title, origIdx)
    const hasImages = sectionHasImages(section)
    const itemsHTML = (section.items || []).map((item, iIdx) => {
      const html = buildItemHTML(item, iIdx, color, section.items.length, globalImgNum)
      globalImgNum += (item.images || []).length
      return html
    }).join('')

    let style = 'margin-bottom:8px;'
    if (shouldBreak[idx]) {
      style += 'page-break-before:always;'
    }

    const div =
      '<div style="' + style + '">' +
        '<div style="background:' + color + ';border-radius:4px;padding:5px 12px;margin-bottom:6px;page-break-after:avoid;">' +
          '<span style="color:#fff;font-weight:700;font-size:13px;">' + section.title + '</span>' +
        '</div>' +
        itemsHTML +
      '</div>'

    if (hasImages) {
      imageDivs.push(div)
    } else {
      textDivs.push(div)
    }
  })

  // סקשנים עם תמונות + בלוק טקסט אחרון עטוף ביחד
  if (textDivs.length > 0) {
    return imageDivs.join('') +
      '<div style="page-break-inside:avoid;">' + textDivs.join('') + '</div>'
  }
  return imageDivs.join('')
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
'html,body{font-family:"Heebo",sans-serif;direction:rtl;background:#fff;color:#1e293b;font-size:16px;line-height:1.55;}' +
'</style>' +
'</head>' +
'<body>' +

// === הדר — עמוד ראשון בלבד, לוגו פסגת הנדסה משמאל ===
'<div style="border-bottom:2px solid #1e3a5f;padding-bottom:10px;margin-bottom:14px;">' +
  '<table style="width:100%;">' +
    '<tr>' +
      '<td style="vertical-align:middle;">' +
        '<div style="font-size:24px;font-weight:800;color:#1e3a5f;">' + tradeName + '</div>' +
        '<div style="font-size:10px;color:#94a3b8;margin-top:2px;"><span style="margin-left:6px;">TOS</span>|<span style="margin-right:6px;">מדריך ביצוע ובקרת איכות</span></div>' +
      '</td>' +
      '<td style="text-align:left;vertical-align:middle;width:140px;">' +
        '<img src="' + LOGO_SHARBAT + '" style="height:130px;" />' +
      '</td>' +
    '</tr>' +
  '</table>' +
'</div>' +

// === תוכן ===
sectionsHTML +

// === פוטר מנוהל ע"י Puppeteer displayHeaderFooter ===

'</body>' +
'</html>'
}

/**
 * ייצוא מדריך מלאכה ל-PDF
 */
export async function exportTradePDF(tradeName, tradeNameEn, sections) {
  const html = buildHTML(tradeName, sections || [])

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
