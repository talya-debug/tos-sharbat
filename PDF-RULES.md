# TOS PDF — חוקיות מלאה

## מבנה המסמך

```
┌─────────────────────────────┐
│  הדר (עמוד 1 בלבד)          │
│  שם מלאכה ←→ לוגו פסגת הנדסה │
├─────────────────────────────┤
│  קטגוריה 1 (כותרת צבעונית)   │
│    ① סעיף + תמונות           │
│    ② סעיף + תמונות           │
├─────────────────────────────┤
│  קטגוריה 2 ...               │
├─────────────────────────────┤
│  בלוק סיכום (טקסט בלבד)      │
│    דגשים + כשלים + בקרות +   │
│    בטיחות — הכל ביחד         │
├─────────────────────────────┤
│  פוטר: "הופק ע"י מערכת TOS"  │
│  (בתחתית כל עמוד)            │
└─────────────────────────────┘
```

---

## חוקי פריסה (Layout Rules)

### 1. הדר (Header)
- **עמוד ראשון בלבד**
- שם מלאכה בעברית (24px, bold) — **ימין**
- לוגו פסגת הנדסה (130px height, base64) — **שמאל**
- קו מפריד כחול כהה (2px) מתחת

### 2. פוטר (Footer)
- **בתחתית כל עמוד** — לא צמוד לתוכן
- "הופק ע״י מערכת TOS" — 9px, אפור, קו עליון
- מנוהל ע"י Puppeteer `displayHeaderFooter` (לא בתוך ה-HTML)
- **direction: rtl** — חובה בטמפלייט

### 3. Page-Break חכם
**הבעיה**: `page-break-before:always` על כל קטגוריה עם תמונות → עמודים חצי ריקים.

**הפתרון**: הערכת גובה + החלטה דינמית:
```
אם (העמוד הנוכחי מלא >= 35%) ו (לקטגוריה הבאה יש תמונות):
    → שבור לעמוד חדש
אחרת:
    → המשך באותו עמוד
```

**איך מעריכים גובה סקשן:**
```
כותרת קטגוריה:    35px
שורת טקסט:        42px
זוג תמונות:       235px
תמונה בודדת:      200px
A4 שטח שימושי:    1047px  (297mm - 8mm top - 12mm bottom) × 96/25.4
הדר מסמך:         180px
```

### 4. כותרת לא לבד
כותרת קטגוריה (הפס הצבעוני) **תמיד** נשארת עם הפריט הראשון.
```css
page-break-after: avoid;  /* על הכותרת */
```

### 5. בלוק טקסט אחרון (Anti-Orphan)
**הבעיה**: קטגוריה אחרונה עם שורה אחת ("בטיחות") נשארת לבד בעמוד.

**הפתרון**: כל הקטגוריות **ללא תמונות** שבסוף המסמך עטופות ב-div אחד:
```html
<div style="page-break-inside:avoid;">
  <!-- דגשים -->
  <!-- כשלים -->
  <!-- בקרות -->
  <!-- בטיחות -->
</div>
```
Chrome ינסה להשאיר את כולם ביחד. אם לא נכנסים — הוא יעביר את כל הבלוק לעמוד חדש.

### 6. סעיף + תמונות = יחידה
```css
page-break-inside: avoid;  /* על כל סעיף */
```
סעיף (טקסט + תמונות) לא נחתך באמצע. אם לא נכנס — קופץ לעמוד הבא.

---

## חוקי תמונות (Image Rules)

### 7. זוג תמונות — 50/50
```
┌──────────┐  ┌──────────┐
│          │  │          │
│ תמונה 1  │  │ תמונה 2  │
│          │  │          │
└──────────┘  └──────────┘
    50%            50%
```
- **height: 220px** — אותו גובה לשתיהן
- **object-fit: contain** — רואים את כל התמונה, בלי חיתוך
- padding: 4px בין תמונות
- border-radius: 6px, גבול אפור

### 8. תמונה בודדת — ממורכזת
```
        ┌──────────┐
        │          │
        │ תמונה 3  │
        │          │
        └──────────┘
           50%
       (ממורכזת)
```
- **רוחב 50%** — אותו רוחב כמו תמונה בזוג
- **max-height: 280px** — גובה טבעי עד מקסימום
- `colspan="2"` + `display:inline-block` + `text-align:center`

### 9. מספור תמונות — גלובלי
- תמונה 1, תמונה 2, ... תמונה N
- **לא מתאפס בכל סעיף** — רציף לאורך כל המסמך
- מונה גלובלי עובר דרך `buildItemHTML(item, iIdx, color, totalItems, globalImgNum)`

---

## Puppeteer / Vercel (Server-Side)

### 10. הגדרות Chrome
```javascript
{
  args: [...chromium.args, '--disable-dev-shm-usage'],
  defaultViewport: { width: 794, height: 1123 },  // A4 at 96 DPI
}
```

### 11. טעינת תמונות
```javascript
await page.setContent(html, { waitUntil: 'networkidle2', timeout: 45000 })
await page.evaluateHandle('document.fonts.ready')
await new Promise(r => setTimeout(r, 2000))  // המתנה נוספת
```
**כלל ברזל**: כל שינוי — לבדוק שהתמונות עדיין יורדות!

### 12. הגדרות PDF
```javascript
{
  format: 'A4',
  margin: { top: '8mm', bottom: '12mm', left: '12mm', right: '14mm' },
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: '<span></span>',
  footerTemplate: '<div style="...direction:rtl;">הופק ע״י מערכת TOS</div>',
}
```
- **right: 14mm** — מונע חיתוך עיגולים ממוספרים
- **bottom: 12mm** — מקום לפוטר

### 13. Vercel Serverless
```json
{ "maxDuration": 60, "memory": 3008 }
```

---

## בעיות ידועות ופתרונות

| בעיה | סיבה | פתרון |
|-------|-------|--------|
| תמונות לא נטענות | Chrome על Vercel איטי | networkidle2 + sleep 2s |
| PAYLOAD_TOO_LARGE | תמונות base64 ב-body | URLs במקום base64, Chrome מוריד |
| Target closed | Chrome קורס מזיכרון | memory: 3008, disable-dev-shm-usage |
| עיגולים חתוכים | margin ימני קטן | right: 14mm |
| שם קובץ בעברית | Supabase Storage דוחה | שם = timestamp.ext בלבד |
| פוטר לא בתחתית | inline footer צמוד לתוכן | displayHeaderFooter |
| שורה יתומה בסוף | קטגוריה קטנה לבד בעמוד | בלוק טקסט אחרון (wrap) |
| עמוד חצי ריק | page-break אגרסיבי | page-break חכם (>35% fill) |
| תמונות לא אחידות | height:auto | contain 220px לזוגות |
| RTL בפוטר | template לא יורש dir | direction:rtl בטמפלייט |

---

## גרסה יציבה
```bash
git tag: pdf-good-v1  # גרסה ישנה
# הגרסה הנוכחית — master HEAD
```

---

## קבצים רלוונטיים

| קובץ | תפקיד |
|-------|--------|
| `src/services/pdfService.js` | בניית HTML + חוקי פריסה + מספור |
| `api/generate-pdf.js` | Puppeteer serverless — HTML → PDF |
| `src/services/logo-base64.js` | לוגו פסגת הנדסה כ-base64 |
| `test-pdf-local.mjs` | בדיקה מקומית (Puppeteer מלא) |
| `test-pdf-variants.mjs` | 4 גרסאות להשוואה |
| `test-pdf-all-trades.mjs` | בדיקה על כל המלאכות |
