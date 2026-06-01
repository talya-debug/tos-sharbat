import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://jlbdamuvpflnkzsyxqme.supabase.co',
  'sb_publishable_dz8BVVZAJDewYYaGzLQD5A_-83Pf7f4'
)

const trade = {
  name: 'בלוק איטונג',
  name_en: 'Ytong Block',
  desc_text: 'בניית קירות איטונג, לינטלים, בידוד, פתחים',
  desc_en: 'Ytong wall construction, lintels, insulation, openings',
  icon: 'view_in_ar',
  color: '#A3A3A3',
  sections: [
    {
      title: 'לפני ביצוע', title_en: 'Before Execution', icon: 'ClipboardCheck',
      items: [
        { text: 'פתיחת מלאכה אל מול ספק/אדריכל/יועץ תרמי. אישור בלוק איזולציה אל מול יועץ תרמי', text_en: 'Open work order with supplier/architect/thermal consultant. Approve insulation block with thermal consultant' },
        { text: 'תכנית קירות לבניה בבלוק איטונג + תכנית פריסה לגובה כולל הכנות לפתחי דלתות', text_en: 'Ytong wall construction plan + height layout plan including door opening preparations' },
        { text: 'תכנית פתחים בקירות איטונג - רוחב + גובה (בתיאום עם ספק דלתות פנים)', text_en: 'Ytong wall opening plan - width + height (coordinated with interior door supplier)' },
        { text: 'הכנסת משטחי בלוקים ומיקומם עפ"י תוכנית', text_en: 'Bring in block pallets and position per plan' },
        { text: 'מסירת קומה ממנ"ע שלד עפ"י פורמט', text_en: 'Floor handover from site manager per format' },
        { text: 'תכנית פתחים בחדרים רטובים למע\' מזו"א (בנייה בחסר לכל אורך הקיר + פתחי גרילים של מזו"א לחדרים) + פתחים למייבש ולספרינקלרים', text_en: 'Wet room openings plan for HVAC (build short along wall + HVAC grille openings) + dryer and sprinkler openings' },
        { text: 'חידוש צירים ראשיים', text_en: 'Refresh main axes' },
      ],
    },
    {
      title: 'שלבי ביצוע', title_en: 'Execution Steps', icon: 'Hammer',
      items: [
        { text: 'סימון תואי קירות לפי ציר גמר', text_en: 'Mark wall alignments per finish axis' },
        { text: 'הנחת פס פוליאתירן (פלציב) 6 מ"מ תחת בלוק שורה ראשונה', text_en: 'Place 6 mm polyethylene strip under first row block' },
        { text: 'פילוס שורה ראשונה של בלוקים על גבי טיט פילוס (כ-2 ס"מ)', text_en: 'Level first row of blocks on leveling mortar (approx. 2 cm)' },
        { text: 'הנחת בלוקים לסרוגין (חפיפה)', text_en: 'Lay blocks in alternating pattern (overlap)' },
        { text: 'במפגש קירות ניצבים - בניה ב"שתי וערב" - קירות מעל 3 מ\' יש להפריד ולא לשלב', text_en: 'At perpendicular wall junctions - build in header and stretcher - walls above 3 m must be separated' },
        { text: 'בין הבלוקים - הדבקה ע"י דבק איטונג (יישום דבק על כל פני השטח)', text_en: 'Between blocks - bond with Ytong adhesive (apply on entire surface)' },
        { text: 'השארת מרווח של 1-2 ס"מ בין קיר איטונג לקיר בטון. השלמה עם פוליאוריתן מוקצף/דבק איטונג (בהתאם לתכנית)', text_en: 'Leave 1-2 cm gap between Ytong and concrete wall. Fill with foam polyurethane/Ytong adhesive per plan' },
        { text: 'יישום רשת פיברגלאס ע"ג המרווח', text_en: 'Apply fiberglass mesh over the gap' },
        { text: 'בקיר איזולציה בחדרים רטובים (איטונג 5) - הדבקת הבלוק ישירות לקיר חיצוני באמצעות דבק איטונג - מריחה שטוחה בגב האריח ומריחה עם מאלג\' משונן בסירוק ע"ג הקיר, 100% הדבקה. מסביב למשקוף עיוור יש לבצע הדבקה נדיבה', text_en: 'Insulation wall in wet rooms (Ytong 5) - bond block directly to exterior wall with Ytong adhesive - flat on back + notched trowel on wall, 100% bonding. Generous bonding around blind frame' },
        { text: 'מרווח בין קיר לתקרה - 2 ס"מ - מילוי בפוליאוריתן מוקצף', text_en: 'Wall-to-ceiling gap - 2 cm - fill with foam polyurethane' },
        { text: 'מעל פתחים - הצבת קורת לינטל - השענה בצדדים - 15 ס"מ לפחות', text_en: 'Above openings - place lintel beam - side bearing minimum 15 cm' },
        { text: 'בהשענת לינטל מתחת ל-15 ס"מ - חיזוק לקיר בטון ע"י ברזל מגולוון', text_en: 'When lintel bearing less than 15 cm - reinforce to concrete wall with galvanized steel' },
        { text: 'חיבור צידי קורת לינטל - בצד אחד ע"י דבק איטונג ובצד השני השארת רווח 2 ס"מ עד התקרה ומילוי בפוליאוריתן מוקצף, במקומות שמשאירים פתח מעל לינטל בשביל מז"א יש להדביק משני צדדים', text_en: 'Lintel side connections - one side Ytong adhesive, other side 2 cm gap to ceiling with foam; where HVAC opening above lintel - bond both sides' },
        { text: 'יישום רשת פיברגלאס (רוחב 30 ס"מ לפחות) משני צידי הלינטל עד למפגש עם תקרה', text_en: 'Apply fiberglass mesh (min 30 cm wide) on both lintel sides up to ceiling junction' },
        { text: 'במפגש עם קיר גבס - יש לבלוק עם הבלוק בעובי בניצב (4 ס"מ) לצורך השלמת טיח למישור הגבס לאחר מכן', text_en: 'At drywall junction - block with perpendicular thickness (4 cm) for plaster completion to drywall plane' },
        { text: 'בפירי ש"ע אין להשתמש בפוליאוריטן רגיל', text_en: 'In fire escape shafts do not use regular polyurethane' },
        { text: 'מידות פתח לדלתות פנים - גובה 208 ס"מ, רוחב 81 או 71 ס"מ (1 ס"מ רחב מהמידה בתכנית - הנחיה של ספק דלתות פנים ג.א.ש)', text_en: 'Interior door opening - height 208 cm, width 81 or 71 cm (1 cm wider than plan - per door supplier G.A.S)' },
      ],
    },
    {
      title: 'דגשים', title_en: 'Key Points', icon: 'AlertTriangle',
      items: [
        { text: 'בניה ע"פ צירי גמר', text_en: 'Build per finish axes' },
        { text: 'בניה עפ"י תכנית לצמצום פחת', text_en: 'Build per plan to minimize waste' },
        { text: 'הקפדה על חפיפה בין בלוקים', text_en: 'Ensure overlap between blocks' },
        { text: 'ניקוי אבק מצדי הבלוק לפני מריחת דבק איטונג', text_en: 'Clean dust from block sides before applying Ytong adhesive' },
        { text: 'יישום רשת פיברגלאס במקומות הנדרשים', text_en: 'Apply fiberglass mesh where required' },
        { text: 'השארת פתחים לתעלות מיזוג (37 ס"מ מהתקרה - עפ"י תוכנית מ"א + הנמכת גבס)', text_en: 'Leave openings for HVAC ducts (37 cm from ceiling - per HVAC plan + suspended ceiling)' },
      ],
    },
    {
      title: 'כשלים', title_en: 'Common Failures', icon: 'XCircle',
      items: [
        { text: 'קירות לא ישרים > חדרים עקומים (קלינים)', text_en: 'Crooked walls > crooked rooms (wedges)' },
        { text: 'אי עמידה במינימום גודל לחדרים רטובים ומזדרון', text_en: 'Not meeting minimum size for wet rooms and corridor' },
        { text: 'מילוי רווחים בחומר שלא עפ"י הנדרש', text_en: 'Filling gaps with non-specified material' },
        { text: 'אי יישום פיברגלאס במקומות הנדרשים', text_en: 'Not applying fiberglass where required' },
      ],
    },
    {
      title: 'בקרות', title_en: 'Inspections', icon: 'Search',
      items: [
        { text: 'מהנדס ביצוע - דירה הנדסית + כל 3 קומות', text_en: 'Execution engineer - engineering apartment + every 3 floors' },
        { text: 'מנהל עבודה - שוטף', text_en: 'Site manager - ongoing' },
        { text: 'מחלקת איכות - שוטף', text_en: 'Quality department - ongoing' },
        { text: 'ספק בקומה הנדסית', text_en: 'Supplier at engineering floor' },
        { text: 'פיקוח עליון של ספק/יועץ תרמי/אדריכל עפ"י מטריצה', text_en: 'Senior supervision of supplier/thermal consultant/architect per matrix' },
      ],
    },
    {
      title: 'בטיחות', title_en: 'Safety', icon: 'Shield',
      items: [
        { text: 'בטיחות כללית לעבודה', text_en: 'General work safety guidelines' },
      ],
    },
  ],
}

async function seed() {
  const { data: existing } = await supabase.from('trades').select('order').order('order', { ascending: false }).limit(1)
  const nextOrder = existing && existing.length > 0 ? existing[0].order + 1 : 0

  const { data: tradeRow, error: tradeErr } = await supabase.from('trades').insert({
    name: trade.name, name_en: trade.name_en, desc_text: trade.desc_text, desc_en: trade.desc_en,
    icon: trade.icon, color: trade.color, order: nextOrder,
  }).select().single()
  if (tradeErr) { console.error(tradeErr); return }
  console.log('מלאכה נוצרה:', tradeRow.id)

  for (let si = 0; si < trade.sections.length; si++) {
    const s = trade.sections[si]
    const { data: sec, error: secErr } = await supabase.from('sections').insert({
      trade_id: tradeRow.id, title: s.title, title_en: s.title_en, icon: s.icon, order: si,
    }).select().single()
    if (secErr) { console.error(secErr); continue }
    console.log('  סקשן:', s.title, '(' + s.items.length + ' פריטים)')
    const rows = s.items.map((item, ii) => ({ section_id: sec.id, text: item.text, text_en: item.text_en, order: ii }))
    const { error: itemErr } = await supabase.from('items').insert(rows)
    if (itemErr) console.error(itemErr)
  }
  console.log('הושלם!')
}

seed().catch(console.error)
