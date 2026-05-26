import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jlbdamuvpflnkzsyxqme.supabase.co'
const supabaseAnonKey = 'sb_publishable_dz8BVVZAJDewYYaGzLQD5A_-83Pf7f4'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// נתוני המלאכות
const tradesData = [
  { name: 'איטום חדרים רטובים', name_en: 'Wet Room Waterproofing', desc_text: 'מעטפת רצפה, ביטון, מריחת איטום', desc_en: 'Floor envelope, concrete, waterproofing application', icon: 'water_drop', color: '#3B82F6', order: 0 },
  { name: 'טיח פנים + בגר', name_en: 'Interior Plastering', desc_text: 'פריימר, יישום טיח, החלקה, גימור', desc_en: 'Primer, plaster application, smoothing, finishing', icon: 'format_paint', color: '#FFA600', order: 1 },
  { name: 'ריצוף וחיפוי', name_en: 'Tiling', desc_text: 'הכנת משטח, דבק, ריצוף, פיוגים', desc_en: 'Surface prep, adhesive, tiling, grouting', icon: 'grid_view', color: '#00C875', order: 2 },
  { name: 'איטום גגות ומרפסות', name_en: 'Roof & Balcony Waterproofing', desc_text: 'יריעות ביטומניות, ניקוז, שכבת הגנה', desc_en: 'Bituminous membranes, drainage, protective layer', icon: 'umbrella', color: '#6c5ce7', order: 3 },
]

// נתוני הפרקים והפריטים — מיובאים מהקובץ הסטטי
const sectionsData = {
  'איטום חדרים רטובים': [
    { title: 'לפני ביצוע', title_en: 'Before Execution', icon: 'ClipboardCheck', order: 0, items: [
      { text: 'ביצוע פתיחת מלאכה אל מול ספק /יועץ איטום ואישור חומר לביצוע והגדרת שיטת עבודה', text_en: 'Open work order with supplier/waterproofing consultant, approve materials and define work method', order: 0 },
      { text: 'הגדרת איזורי ביצוע - חדרים רטובים (לא שירותי אורחים)', text_en: 'Define execution areas - wet rooms (not guest toilets)', order: 1 },
      { text: 'ביצוע טסט דלוחין ע"י האינסטלטור בפיקוח נציג האתר', text_en: 'Perform drain test by plumber under site representative supervision', order: 2 },
    ]},
    { title: 'הכנות לאיטום', title_en: 'Waterproofing Preparation', icon: 'Wrench', order: 1, items: [
      { text: 'סגירת מעטפת רצפת החדר (בבטון משופר בלבד)', text_en: 'Close room floor envelope (with improved concrete only)', order: 0 },
      { text: 'הסרת בליטות בטון (בטון חלק)', text_en: 'Remove concrete protrusions (smooth concrete)', order: 1 },
      { text: 'נקיון יסודי (ברזלים בולטים, לכלוך)', text_en: 'Thorough cleaning (protruding rebar, dirt)', order: 2 },
      { text: 'הנחת פלציב סביב ורטיקלי (לכל עומק הצינור)', text_en: 'Place flexible sleeve around vertical pipe (full pipe depth)', order: 3 },
      { text: 'יציקת קובית בטון סביב ורטיקלי (5 ס"מ מעל גובה הריצוף)', text_en: 'Pour concrete cube around vertical pipe (5 cm above floor level)', order: 4 },
      { text: 'ביטון מלא של הצנרת ברצפת החדר', text_en: 'Full concrete encasement of piping in room floor', order: 5 },
      { text: 'יציקת חגורת בטון בכניסה לחדר (4 ס"מ תחת פני ריצוף)', text_en: 'Pour concrete belt at room entrance (4 cm below floor surface)', order: 6 },
      { text: 'ביצוע רולקות (5X5 ס"מ)', text_en: 'Create cove joints (5x5 cm)', order: 7 },
      { text: 'הנחת וביטון "פישר" (בחדרים סמוכי מרפסת שירות) באם אושר לביצוע', text_en: 'Place and concrete "fisher" drain (in rooms adjacent to service balcony) if approved', order: 8 },
    ]},
    { title: 'ביצוע האיטום', title_en: 'Waterproofing Execution', icon: 'Hammer', order: 2, items: [
      { text: 'ביצוע הרבצה על בלוק שחור שורה ראשונה וקיר איטונג', text_en: 'Apply scratch coat on first row black block and Ytong wall', order: 0 },
      { text: 'מריחת איטום פוליאוריטני (קבוצה 1) - חומר מאושר', text_en: 'Apply polyurethane waterproofing (Group 1) - approved material', order: 1 },
      { text: 'גובה מריחה - 5 ס"מ מעל פני ריצוף (מקסימום 10 ס"מ)', text_en: 'Application height - 5 cm above floor level (maximum 10 cm)', order: 2 },
      { text: 'גובה מריחה באזור אמבטיה - 45 ס"מ מעל פני בטון', text_en: 'Application height in bathtub area - 45 cm above concrete surface', order: 3 },
      { text: 'ניקוז "פישר" - יישום רשת (בתוך האיטום) בפתח הצינור', text_en: 'Fisher drain - apply mesh (within waterproofing) at pipe opening', order: 4 },
    ]},
    { title: 'דגשים', title_en: 'Key Points', icon: 'AlertTriangle', order: 3, items: [
      { text: 'ביצוע מושלם של ההכנות לאיטום', text_en: 'Perfect execution of waterproofing preparations', order: 0 },
      { text: 'מריחה אחידה וללא בועות', text_en: 'Uniform application without bubbles', order: 1 },
    ]},
    { title: 'כשלים', title_en: 'Common Failures', icon: 'XCircle', order: 4, items: [
      { text: 'חורים באיטום', text_en: 'Holes in waterproofing membrane', order: 0 },
    ]},
    { title: 'בקרות', title_en: 'Inspections', icon: 'Search', order: 5, items: [
      { text: 'מנהל עבודה - בקרה שוטפת', text_en: 'Site manager - ongoing inspection', order: 0 },
      { text: 'מהנדס ביצוע - פעם בקומה', text_en: 'Execution engineer - once per floor', order: 1 },
      { text: 'מנהל פרוייקט - פעם בשלוש קומות', text_en: 'Project manager - once every three floors', order: 2 },
      { text: 'בקר איכות גמר - ע"פ מטריצה', text_en: 'Finishing QC inspector - per matrix', order: 3 },
      { text: 'פיקוח עליון ספק/ יועץ איטום - עפ"י מטריצה', text_en: 'Supplier/waterproofing consultant supervision - per matrix', order: 4 },
    ]},
    { title: 'בטיחות', title_en: 'Safety', icon: 'Shield', order: 6, items: [
      { text: 'דגשים כללים לעבודה', text_en: 'General work safety guidelines', order: 0 },
    ]},
  ],
  'טיח פנים + בגר': [
    { title: 'לפני ביצוע', title_en: 'Before Execution', icon: 'ClipboardCheck', order: 0, items: [
      { text: 'פתיחת מלאכה אל מול ספק. אישור חומרים לשימוש והגדרת אופו שימוש ושלביות', text_en: 'Open work order with supplier. Approve materials and define usage method and stages', order: 0 },
      { text: 'התאמה לדרישות המפרט הטכני', text_en: 'Compliance with technical specification requirements', order: 1 },
      { text: 'שיקוע צנרת בתוך התעלות (עובי כיסוי 1 ס"מ לפחות)', text_en: 'Embed piping within channels (minimum 1 cm cover thickness)', order: 2 },
      { text: 'מילוי תעלות וחורים במלט (חול-צמנט ביחס 1:2.5 + תוסף פולימרי משפר הידבקות)', text_en: 'Fill channels and holes with mortar (sand-cement ratio 1:2.5 + polymer adhesion additive)', order: 3 },
      { text: 'יישום רשת אינטרגלס במקרים של ריבוי תעלות קרובות', text_en: 'Apply fiberglass mesh where multiple channels are close together', order: 4 },
      { text: 'יישום רשת אינטרגלס בחיבור בין קירות שונים ובין קיר לתקרה', text_en: 'Apply fiberglass mesh at junctions between different walls and wall-to-ceiling connections', order: 5 },
      { text: 'החלקת הקיר (חלקים רופפים ועצמים בולטים)', text_en: 'Smooth the wall (remove loose parts and protruding objects)', order: 6 },
      { text: 'נקיון הקיר מכל חומר זר ושטיפת הקיר בלחץ מים', text_en: 'Clean the wall of all foreign material and pressure wash', order: 7 },
      { text: 'בדיקת סטיה של הקיר והגדרת ביצוע תיקון באמצעות עובי טיח (פירוט בהמשך)', text_en: 'Check wall deviation and define correction via plaster thickness (details below)', order: 8 },
    ]},
    { title: 'שלבי ביצוע', title_en: 'Execution Steps', icon: 'Hammer', order: 1, items: [
      { text: 'מריחת פריימר (רגיל/ממ"ד) ע"י מברשת או רולר', text_en: 'Apply primer (standard/safe room) using brush or roller', order: 0 },
      { text: 'הצבת מיקים (ע"פ הצורך) במקביל לצירי גמר (קיבוע באמצעות טיח גבס)', text_en: 'Place guides (as needed) parallel to finish axes (fixed with gypsum plaster)', order: 1 },
      { text: 'יישום הטיח באופן ידני או ע"י מכונה', text_en: 'Apply plaster manually or by machine', order: 2 },
      { text: 'אפשרות ראשונה לישור והחלקת הטיח:', text_en: 'First option for leveling and smoothing plaster:', order: 3 },
      { text: 'יישור הטיח ע"י סרגל אלומניום', text_en: 'Level plaster using aluminum straightedge', order: 4 },
      { text: 'לאחר התקשות וייבוש ראשוני של כ-4 שעות יש לגרד את שכבת המילוי באמצעות סרגל טייחים', text_en: 'After initial hardening and drying of approx. 4 hours, scrape the fill layer with plasterer straightedge', order: 5 },
      { text: 'ישום שכבת החלקה של טיח גבס באמצעות מאלג\' בעובי שלא יקטן מ-3 מ"מ עד גמר חלק ואחיד', text_en: 'Apply gypsum plaster smoothing layer with trowel, minimum 3 mm thickness until smooth uniform finish', order: 6 },
      { text: 'לאחר ייבוש מירבי של שכבת ההחלקה יש להרטיב במים ולבצע שפשוף סיבובי באמצעות ספוג גומי מתאים', text_en: 'After maximum drying of smoothing layer, wet with water and perform circular rubbing with suitable rubber sponge', order: 7 },
      { text: 'ביצוע החלקה סופית ע"י מאלג\' מתכת', text_en: 'Final smoothing with metal trowel', order: 8 },
      { text: 'אפשרות שניה - כאשר השכבה העיקרית התגבשה אך עדיין מכילה רטיבות:', text_en: 'Second option - when main layer has set but still contains moisture:', order: 9 },
      { text: 'שימוש בשכבת הטיח העליונה (2 מ"מ) ליישור סופי של הטיח (ע"י מאלג\')', text_en: 'Use upper plaster layer (2 mm) for final leveling (with trowel)', order: 10 },
      { text: 'המתנה 10-15 דק\' וביצוע שפשוף עם ספוג בתנועות סיבוביות', text_en: 'Wait 10-15 min and rub with sponge in circular motions', order: 11 },
      { text: 'לאחר הסיום החלקה באמצעות מאלג\'', text_en: 'After completion, smooth with trowel', order: 12 },
      { text: 'טיח חוץ (מרפסת שמש + שירות)', text_en: 'Exterior plaster (sun balcony + service balcony)', order: 13 },
      { text: 'מריחת פריימר (במידה ונדרש) ע"י מברשת או רולר', text_en: 'Apply primer (if required) using brush or roller', order: 14 },
      { text: 'יישום בגר ע"י מאלג\' חלק', text_en: 'Apply render coat with smooth trowel', order: 15 },
      { text: 'יישום בגר במרפסת שירות על ציפוי אדקס הרבצה+רשת חיזוק+בגר', text_en: 'Apply render on service balcony over Adex coating: scratch coat + reinforcement mesh + render', order: 16 },
      { text: 'חדר רטוב - הרבצה עד התקרה', text_en: 'Wet room - scratch coat up to ceiling', order: 17 },
      { text: 'מטבח - להשאיר בין 88-152 ס"מ ללא טיח (בשביל חיפוי עתידי)', text_en: 'Kitchen - leave 88-152 cm without plaster (for future cladding)', order: 18 },
      { text: 'ח. מדרגות - טיח עד 10 ס"מ מהמדרגה, 10 ס"מ תחתונים בהרבצה וצבע של המדרגה', text_en: 'Stairwell - plaster up to 10 cm from stair, bottom 10 cm scratch coat and stair color', order: 19 },
    ]},
    { title: 'מגבלות', title_en: 'Limitations', icon: 'Ruler', order: 2, items: [
      { text: 'יישום טיח - עד 12 שעות ממריחת פריימר', text_en: 'Plaster application - within 12 hours of primer application', order: 0 },
      { text: 'טיח בחדר רגיל:', text_en: 'Plaster in standard room:', order: 1 },
      { text: 'עובי טיח מירבי בקירות - 70 מ"מ (מעל זה יש לקבל הנחיות מיוחדות)', text_en: 'Maximum wall plaster thickness - 70 mm (above this requires special instructions)', order: 2 },
      { text: 'עובי טיח מירבי בתקרה - 15 מ"מ', text_en: 'Maximum ceiling plaster thickness - 15 mm', order: 3 },
      { text: 'טיח בממ"ד:', text_en: 'Plaster in safe room (MAMAD):', order: 4 },
      { text: 'עובי טיח מירבי בקירות - 20 מ"מ', text_en: 'Maximum wall plaster thickness - 20 mm', order: 5 },
      { text: 'עובי טיח מירבי בתקרה - 7 מ"מ', text_en: 'Maximum ceiling plaster thickness - 7 mm', order: 6 },
      { text: 'בקירות - בעובי מעל 7 מ"מ - יש ליישם רשת שיריון (עובי כיסוי מירבי - 2 מ"מ)', text_en: 'Walls - above 7 mm thickness - apply reinforcement mesh (maximum cover thickness - 2 mm)', order: 7 },
      { text: 'מאפייני רשת שריון - סיבי זכוכית. גודל עינית 2.8 מ"מ. משקל 70 גר\'/מ"ר', text_en: 'Reinforcement mesh specs - fiberglass, 2.8 mm mesh size, 70 g/sqm weight', order: 8 },
    ]},
    { title: 'דגשים', title_en: 'Key Points', icon: 'AlertTriangle', order: 3, items: [
      { text: 'אין לעבוד בתנאי קיצון (תחת 5 מעלות, בתנאי יובש, מעל 35 מעלות)', text_en: 'Do not work in extreme conditions (below 5C, dry conditions, above 35C)', order: 0 },
      { text: 'מילוי תעלות בטיט צמנטי', text_en: 'Fill channels with cement paste', order: 1 },
      { text: 'יישום רשת אינרגלס במקרים של ריכוז צנרות חשמל', text_en: 'Apply fiberglass mesh where electrical conduits are concentrated', order: 2 },
      { text: 'יש לבצע שכבת גימור לפני התייבשות מלאה של השכבה העיקרית', text_en: 'Apply finishing layer before full drying of main layer', order: 3 },
      { text: 'אין לרדת עם הטיח עד לגובה הריצוף או משטח סופי (השלמת הרווח עם טיח צמנטי)', text_en: 'Do not extend plaster down to floor level (fill gap with cement plaster)', order: 4 },
      { text: 'רצוי להרטיב את הקיר לפני ביצוע שכבת החלקה', text_en: 'Recommended to wet the wall before applying smoothing layer', order: 5 },
      { text: 'אשפרת הקיר - יום אחרי ביצוע', text_en: 'Wall curing - one day after execution', order: 6 },
    ]},
    { title: 'כשלים', title_en: 'Common Failures', icon: 'XCircle', order: 4, items: [
      { text: 'הכנת חומרים שלא ע"פ הוראות יצרן', text_en: 'Material preparation not per manufacturer instructions', order: 0 },
      { text: 'שימוש בטיח לאחר תום זמן עבידות', text_en: 'Using plaster after workability time has expired', order: 1 },
      { text: 'יישום טיח על פריימר יבש (לאחר כ 12 שעות)', text_en: 'Applying plaster on dry primer (after approx. 12 hours)', order: 2 },
      { text: 'יישום טיח גבס בחדרים רטובים ובקירות שחשופים לגשם', text_en: 'Applying gypsum plaster in wet rooms and rain-exposed walls', order: 3 },
      { text: 'יישום שכבת גימור לאחר התייבשות סופית של השכבה העיקרית', text_en: 'Applying finishing layer after final drying of main layer', order: 4 },
      { text: 'קיר סופי עקום (חריגה מהמגבלות המותרות)', text_en: 'Crooked final wall (exceeding allowed tolerances)', order: 5 },
    ]},
    { title: 'בקרות', title_en: 'Inspections', icon: 'Search', order: 5, items: [
      { text: 'מנהל עבודה - שוטף', text_en: 'Site manager - ongoing', order: 0 },
      { text: 'מהנדס ביצוע - פעם בקומה', text_en: 'Execution engineer - once per floor', order: 1 },
      { text: 'מנהל פרויקט - פעם בשלוש קומות', text_en: 'Project manager - once every three floors', order: 2 },
      { text: 'מנהל עבודה - ע"פ תכנית איכות', text_en: 'Site manager - per quality plan', order: 3 },
      { text: 'פיקוח עליון אל מול ספק כל שלוש קומות', text_en: 'Senior supervision with supplier every three floors', order: 4 },
    ]},
    { title: 'בטיחות', title_en: 'Safety', icon: 'Shield', order: 6, items: [
      { text: 'בטיחות כללית לעבודה', text_en: 'General work safety guidelines', order: 0 },
    ]},
    { title: 'אופן מדידת סטיות', title_en: 'Deviation Measurement Method', icon: 'Ruler', order: 7, items: [
      { text: 'מותחים קו ציר גמר סמוך לרקע (לא יותר מ1 מטר)', text_en: 'Stretch a finish axis line near the base (no more than 1 meter)', order: 0 },
      { text: 'מודדים את המרחק הגדול ביותר a2 ואת הקצר a1', text_en: 'Measure the greatest distance a2 and shortest a1', order: 1 },
      { text: 'עובי הטיח במקום העבה ביותר יהיה (בס"מ): (a2-a1)+1', text_en: 'Plaster thickness at thickest point (in cm): (a2-a1)+1', order: 2 },
    ]},
  ],
  'ריצוף וחיפוי': [
    { title: 'לפני ביצוע', title_en: 'Before Execution', icon: 'ClipboardCheck', order: 0, items: [
      { text: 'פתיחת מלאכה אל מול ספק ריצוף ואישור חומרי הדבקה ורובה', text_en: 'Open work order with tiling supplier and approve adhesive and grout materials', order: 0 },
      { text: 'בדיקת התאמת האריחים למפרט הטכני (גודל, סוג, גוון)', text_en: 'Verify tile compliance with technical specifications (size, type, shade)', order: 1 },
      { text: 'בדיקת מישוריות הרצפה/הקיר לפני התחלת עבודה', text_en: 'Check floor/wall flatness before starting work', order: 2 },
      { text: 'וידוא סיום מלא של עבודות איטום בחדרים רטובים (כולל אישור בכתב)', text_en: 'Ensure full completion of waterproofing in wet rooms (including written approval)', order: 3 },
      { text: 'וידוא סיום עבודות טיח והרבצה בקירות המיועדים לחיפוי', text_en: 'Ensure plaster and scratch coat completion on walls designated for cladding', order: 4 },
      { text: 'בדיקת מפלסי רצפה וקביעת נקודות גובה (שיפועים לניקוז בחדרים רטובים)', text_en: 'Check floor levels and set height points (drainage slopes in wet rooms)', order: 5 },
      { text: 'תכנון פריסת אריחים מראש - סימון צירי התחלה ובדיקת חיתוכים', text_en: 'Plan tile layout in advance - mark starting axes and check cuts', order: 6 },
      { text: 'נקיון יסודי של משטח העבודה מאבק, לכלוך ושאריות חומרים', text_en: 'Thorough cleaning of work surface from dust, dirt and material residue', order: 7 },
    ]},
    { title: 'שלבי ביצוע', title_en: 'Execution Steps', icon: 'Hammer', order: 1, items: [
      { text: 'הרטבת משטח העבודה (רצפה/קיר) לפני מריחת דבק', text_en: 'Wet work surface (floor/wall) before applying adhesive', order: 0 },
      { text: 'ערבוב דבק אריחים ע"פ הוראות היצרן (כמות מים מדויקת)', text_en: 'Mix tile adhesive per manufacturer instructions (exact water quantity)', order: 1 },
      { text: 'מריחת דבק על המשטח באמצעות מלגז משונן בגודל מתאים לאריח', text_en: 'Apply adhesive on surface using notched trowel appropriate for tile size', order: 2 },
      { text: 'מריחת דבק כפולה (על המשטח ועל האריח) באריחים מעל 60X60 ס"מ', text_en: 'Double adhesive application (on surface and tile) for tiles above 60x60 cm', order: 3 },
      { text: 'הנחת האריחים בהתאם לצירים שסומנו - שמירה על קו ישר', text_en: 'Lay tiles according to marked axes - maintain straight line', order: 4 },
      { text: 'שימוש בצלבים/פסיעים לשמירה על רוחב רובה אחיד', text_en: 'Use spacers/clips to maintain uniform grout width', order: 5 },
      { text: 'בדיקת מישוריות שוטפת עם פלס ומילוי מלא של הדבק מתחת לאריח', text_en: 'Ongoing flatness check with level and full adhesive coverage under tile', order: 6 },
      { text: 'ביצוע חיתוכים נקיים ומדויקים (מסור יהלום רטוב)', text_en: 'Perform clean and precise cuts (wet diamond saw)', order: 7 },
      { text: 'הנחת פרופיל אלומניום בפינות חיצוניות ובמעברים בין חומרים', text_en: 'Place aluminum profile at external corners and material transitions', order: 8 },
      { text: 'המתנה של 24 שעות לפחות לפני רביגה', text_en: 'Wait at least 24 hours before grouting', order: 9 },
      { text: 'ביצוע רובה - מילוי מלא של המרווחים בין האריחים', text_en: 'Grouting - full filling of gaps between tiles', order: 10 },
      { text: 'ניקוי עודפי רובה מפני האריחים לפני התקשות', text_en: 'Clean excess grout from tile surface before hardening', order: 11 },
      { text: 'יישום סיליקון גמיש בפינות ובמפגשים בין קיר לרצפה', text_en: 'Apply flexible silicone at corners and wall-to-floor junctions', order: 12 },
    ]},
    { title: 'מגבלות', title_en: 'Limitations', icon: 'Ruler', order: 2, items: [
      { text: 'אין לרצף על משטח שלא יבש לחלוטין (איטום/בטון)', text_en: 'Do not tile on surface that is not fully dry (waterproofing/concrete)', order: 0 },
      { text: 'סטיית מישוריות מותרת - עד 2 מ"מ ל-2 מטר', text_en: 'Allowed flatness deviation - up to 2 mm per 2 meters', order: 1 },
      { text: 'עובי שכבת דבק מינימלי - 3 מ"מ', text_en: 'Minimum adhesive layer thickness - 3 mm', order: 2 },
      { text: 'עובי שכבת דבק מקסימלי - 15 מ"מ (מעבר לזה יש ליישר עם מלט)', text_en: 'Maximum adhesive layer thickness - 15 mm (beyond that level with mortar)', order: 3 },
      { text: 'רוחב רובה מינימלי - 1.5 מ"מ (בריצוף) ו-2 מ"מ (בחיפוי)', text_en: 'Minimum grout width - 1.5 mm (floor) and 2 mm (wall cladding)', order: 4 },
      { text: 'שיפוע ריצוף בחדרים רטובים - 1.5%-2% לכיוון הניקוז', text_en: 'Floor slope in wet rooms - 1.5%-2% toward drain', order: 5 },
      { text: 'אין לעבוד בטמפרטורות מתחת ל-5 מעלות או מעל 35 מעלות', text_en: 'Do not work at temperatures below 5C or above 35C', order: 6 },
      { text: 'זמן עבידות של דבק אריחים - ע"פ הוראות יצרן (בד"כ 2-3 שעות)', text_en: 'Tile adhesive workability time - per manufacturer instructions (usually 2-3 hours)', order: 7 },
    ]},
    { title: 'דגשים', title_en: 'Key Points', icon: 'AlertTriangle', order: 3, items: [
      { text: 'כיסוי דבק מלא מתחת לאריח - מינימום 80% (בחדרים רטובים 95%)', text_en: 'Full adhesive coverage under tile - minimum 80% (wet rooms 95%)', order: 0 },
      { text: 'חיתוכי אריח לא יקטנו מ-1/3 רוחב אריח שלם', text_en: 'Tile cuts no smaller than 1/3 of full tile width', order: 1 },
      { text: 'בדיקת גוון אריחים לפני הנחה - ערבוב אריחים מכמה קרטונים', text_en: 'Check tile shade before laying - mix tiles from several boxes', order: 2 },
      { text: 'שמירה על שיפוע נכון בחדרים רטובים (מים זורמים לניקוז)', text_en: 'Maintain correct slope in wet rooms (water flows to drain)', order: 3 },
      { text: 'יישור מושלם בין אריחי רצפה לאריחי קיר (התאמת צירים)', text_en: 'Perfect alignment between floor tiles and wall tiles (axis matching)', order: 4 },
      { text: 'הגנה על ריצוף מוגמר - כיסוי בניילון וקרטון עד מסירה', text_en: 'Protect finished tiling - cover with plastic and cardboard until handover', order: 5 },
    ]},
    { title: 'כשלים', title_en: 'Common Failures', icon: 'XCircle', order: 4, items: [
      { text: 'חללים מתחת לאריח (דבק לא מלא) - גורם לסדיקה ושבירה', text_en: 'Voids under tile (incomplete adhesive) - causes cracking and breaking', order: 0 },
      { text: 'אריחים לא במפלס - מדרגות בין אריחים סמוכים', text_en: 'Tiles not level - steps between adjacent tiles', order: 1 },
      { text: 'רובה לא מלאה - חדירת מים ולכלוך בין האריחים', text_en: 'Incomplete grout - water and dirt penetration between tiles', order: 2 },
      { text: 'שיפוע לא נכון בחדרים רטובים - הצטברות מים על הרצפה', text_en: 'Incorrect slope in wet rooms - water accumulation on floor', order: 3 },
      { text: 'חיתוכים לא מדויקים - פערים גדולים וגמר לא אסתטי', text_en: 'Inaccurate cuts - large gaps and unaesthetic finish', order: 4 },
      { text: 'ריצוף על פריימר יבש או על משטח מאובק', text_en: 'Tiling on dry primer or dusty surface', order: 5 },
      { text: 'שימוש בדבק לאחר תום זמן עבידות', text_en: 'Using adhesive after workability time has expired', order: 6 },
    ]},
    { title: 'בקרות', title_en: 'Inspections', icon: 'Search', order: 5, items: [
      { text: 'מנהל עבודה - בקרה שוטפת (בדיקת מישוריות, שיפועים, כיסוי דבק)', text_en: 'Site manager - ongoing inspection (flatness, slopes, adhesive coverage)', order: 0 },
      { text: 'מהנדס ביצוע - פעם בקומה', text_en: 'Execution engineer - once per floor', order: 1 },
      { text: 'מנהל פרויקט - פעם בשלוש קומות', text_en: 'Project manager - once every three floors', order: 2 },
      { text: 'בקר איכות גמר - ע"פ מטריצה (בדיקת דירה מוגמרת)', text_en: 'Finishing QC inspector - per matrix (finished apartment inspection)', order: 3 },
      { text: 'בדיקת נקישות (טפיחה) לאיתור חללים מתחת לאריחים', text_en: 'Tap test to detect voids under tiles', order: 4 },
    ]},
    { title: 'בטיחות', title_en: 'Safety', icon: 'Shield', order: 6, items: [
      { text: 'שימוש בכפפות ומשקפי מגן בעת חיתוך אריחים', text_en: 'Use gloves and safety glasses when cutting tiles', order: 0 },
      { text: 'שימוש באטמי אוזניים בעת שימוש במסור יהלום', text_en: 'Use ear plugs when using diamond saw', order: 1 },
      { text: 'שמירה על ניקיון ואוורור באזור העבודה', text_en: 'Maintain cleanliness and ventilation in work area', order: 2 },
      { text: 'חיבור מסור יהלום לחשמל עם פחת תקין', text_en: 'Connect diamond saw to power with proper RCD', order: 3 },
    ]},
  ],
  'איטום גגות ומרפסות': [
    { title: 'לפני ביצוע', title_en: 'Before Execution', icon: 'ClipboardCheck', order: 0, items: [
      { text: 'פתיחת מלאכה אל מול ספק/יועץ איטום ואישור חומרים ושיטת עבודה', text_en: 'Open work order with supplier/waterproofing consultant and approve materials and work method', order: 0 },
      { text: 'בדיקת תוכניות ניקוז והתאמת מיקום ניקוזים בשטח', text_en: 'Review drainage plans and verify drain locations on site', order: 1 },
      { text: 'הגדרת אזורי ביצוע - גגות, מרפסות חשופות, עליות גג', text_en: 'Define execution areas - roofs, exposed balconies, roof access areas', order: 2 },
      { text: 'בדיקת מזג אוויר - אין לבצע איטום בגשם או בצפי גשם תוך 24 שעות', text_en: 'Check weather - do not waterproof in rain or if rain expected within 24 hours', order: 3 },
      { text: 'וידוא סיום כל עבודות הבטון והמסגרות (מעקות, ברזלים, עוגנים)', text_en: 'Ensure completion of all concrete and metalwork (railings, rebar, anchors)', order: 4 },
      { text: 'אישור מפרט שכבות האיטום - סוג יריעות, חפיפות, שכבות הגנה', text_en: 'Approve waterproofing layer specification - membrane type, overlaps, protective layers', order: 5 },
    ]},
    { title: 'הכנות לאיטום', title_en: 'Waterproofing Preparation', icon: 'Wrench', order: 1, items: [
      { text: 'ביצוע שיפועי ניקוז בבטון (מינימום 1.5% לכיוון הניקוז)', text_en: 'Create drainage slopes in concrete (minimum 1.5% toward drains)', order: 0 },
      { text: 'נקיון יסודי של המשטח - הסרת לכלוך, אבק, ברזלים בולטים ושאריות בטון', text_en: 'Thorough surface cleaning - remove dirt, dust, protruding rebar and concrete residue', order: 1 },
      { text: 'ביצוע רולקות (5X5 ס"מ) בכל מפגש בין קיר לרצפה', text_en: 'Create cove joints (5x5 cm) at every wall-to-floor junction', order: 2 },
      { text: 'תיקון סדקים ושקעים ברצפת הבטון (מילוי במלט)', text_en: 'Repair cracks and depressions in concrete floor (fill with mortar)', order: 3 },
      { text: 'הכנת פתחי ניקוז - ניקוי, הורדת מפלס סביב הניקוז, התקנת חבק', text_en: 'Prepare drain openings - clean, lower level around drain, install clamp', order: 4 },
      { text: 'הגבהת קירות מעקה - וידוא גובה מינימלי של 15 ס"מ מעל פני גמר', text_en: 'Raise parapet walls - ensure minimum height of 15 cm above finish level', order: 5 },
      { text: 'מריחת פריימר (ביטומני/אפוקסי) על כל המשטח ועל הקירות עד גובה העליה', text_en: 'Apply primer (bituminous/epoxy) on entire surface and walls up to rise height', order: 6 },
    ]},
    { title: 'ביצוע האיטום', title_en: 'Waterproofing Execution', icon: 'Hammer', order: 2, items: [
      { text: 'הנחת יריעת איטום ביטומנית ראשונה (שכבת בסיס) - הלחמה מלאה למשטח', text_en: 'Lay first bituminous membrane (base layer) - full welding to surface', order: 0 },
      { text: 'חפיפה בין יריעות - מינימום 10 ס"מ לאורך ו-15 ס"מ ברוחב', text_en: 'Membrane overlap - minimum 10 cm lengthwise and 15 cm widthwise', order: 1 },
      { text: 'עליה על קירות - מינימום 15 ס"מ מעל פני גמר (רצפה סופית)', text_en: 'Rise on walls - minimum 15 cm above finish level (final floor)', order: 2 },
      { text: 'חיזוק פינות ומפגשים - הנחת רצועות חיזוק (30 ס"מ) לפני היריעה הראשית', text_en: 'Reinforce corners and junctions - lay reinforcement strips (30 cm) before main membrane', order: 3 },
      { text: 'טיפול בפתחי ניקוז - עטיפה מלאה של הניקוז ביריעת איטום + חבק הידוק', text_en: 'Treat drain openings - full wrapping of drain with membrane + tightening clamp', order: 4 },
      { text: 'הנחת יריעת איטום שנייה (שכבת גמר) - בניצב ליריעה הראשונה', text_en: 'Lay second membrane (finish layer) - perpendicular to first membrane', order: 5 },
      { text: 'ביצוע מבחן הצפה - מילוי מים ל-5 ס"מ למשך 48 שעות', text_en: 'Perform flood test - fill 5 cm water for 48 hours', order: 6 },
      { text: 'תיעוד תוצאות מבחן ההצפה וקבלת אישור מיועץ/מפקח', text_en: 'Document flood test results and obtain approval from consultant/supervisor', order: 7 },
      { text: 'הנחת שכבת הגנה (לוחות פוליסטירן/יריעת ג\'אודרין) על האיטום', text_en: 'Lay protective layer (polystyrene boards/geotextile) over waterproofing', order: 8 },
      { text: 'יציקת בטון הגנה (משקולת) בעובי 5-7 ס"מ עם רשת ברזל', text_en: 'Pour protective concrete (ballast) 5-7 cm thick with steel mesh', order: 9 },
    ]},
    { title: 'מגבלות', title_en: 'Limitations', icon: 'Ruler', order: 2, items: [
      { text: 'אין לבצע איטום על משטח רטוב או בזמן גשם', text_en: 'Do not waterproof on wet surface or during rain', order: 0 },
      { text: 'טמפרטורת עבודה - לא מתחת ל-5 מעלות ולא מעל 40 מעלות', text_en: 'Work temperature - not below 5C and not above 40C', order: 1 },
      { text: 'חפיפה מינימלית בין יריעות - 10 ס"מ (אורך) ו-15 ס"מ (רוחב)', text_en: 'Minimum membrane overlap - 10 cm (length) and 15 cm (width)', order: 2 },
      { text: 'עליה מינימלית על קירות - 15 ס"מ מעל פני גמר', text_en: 'Minimum wall rise - 15 cm above finish level', order: 3 },
      { text: 'משך מבחן הצפה - לא פחות מ-48 שעות', text_en: 'Flood test duration - no less than 48 hours', order: 4 },
      { text: 'אין לדרוך על איטום חשוף ללא שכבת הגנה', text_en: 'Do not walk on exposed waterproofing without protective layer', order: 5 },
      { text: 'שיפוע מינימלי לניקוז - 1.5%', text_en: 'Minimum drainage slope - 1.5%', order: 6 },
    ]},
    { title: 'דגשים', title_en: 'Key Points', icon: 'AlertTriangle', order: 3, items: [
      { text: 'הלחמה מלאה של יריעות - אין להשאיר כיסים או בועות', text_en: 'Full welding of membranes - no pockets or bubbles', order: 0 },
      { text: 'טיפול קפדני בפרטים - ניקוזים, פינות, חדירות צנרת', text_en: 'Meticulous attention to details - drains, corners, pipe penetrations', order: 1 },
      { text: 'שכבת האיטום השנייה חייבת להיות בניצב לראשונה', text_en: 'Second waterproofing layer must be perpendicular to first', order: 2 },
      { text: 'לא להתחיל שכבת הגנה לפני קבלת אישור מבחן הצפה', text_en: 'Do not start protective layer before flood test approval', order: 3 },
      { text: 'תיעוד צילומי של כל שלבי האיטום (לפני כיסוי)', text_en: 'Photo documentation of all waterproofing stages (before covering)', order: 4 },
      { text: 'בדיקת שלמות היריעה לפני כיסוי - אין קרעים, חורים או הרמות', text_en: 'Check membrane integrity before covering - no tears, holes or lifts', order: 5 },
    ]},
    { title: 'כשלים', title_en: 'Common Failures', icon: 'XCircle', order: 4, items: [
      { text: 'הלחמה לא מלאה של יריעות - נקודות חלשות שמאפשרות חדירת מים', text_en: 'Incomplete membrane welding - weak points allowing water penetration', order: 0 },
      { text: 'חפיפה לא מספקת בין יריעות', text_en: 'Insufficient overlap between membranes', order: 1 },
      { text: 'עליה לא מספקת על קירות - מים עוקפים את האיטום', text_en: 'Insufficient wall rise - water bypasses waterproofing', order: 2 },
      { text: 'טיפול לקוי בניקוזים - נקודת כשל עיקרית', text_en: 'Poor drain treatment - primary failure point', order: 3 },
      { text: 'ביצוע איטום על משטח מלוכלך או רטוב', text_en: 'Waterproofing on dirty or wet surface', order: 4 },
      { text: 'נזק ליריעה מעבודות עוקבות (ברזלים, כלי עבודה, דריכה)', text_en: 'Membrane damage from subsequent works (rebar, tools, foot traffic)', order: 5 },
      { text: 'ויתור על מבחן הצפה או ביצועו באופן חלקי', text_en: 'Skipping flood test or performing it partially', order: 6 },
      { text: 'שיפועים לא נכונים - הצטברות מים על הגג', text_en: 'Incorrect slopes - water accumulation on roof', order: 7 },
    ]},
    { title: 'בקרות', title_en: 'Inspections', icon: 'Search', order: 5, items: [
      { text: 'מנהל עבודה - בקרה שוטפת בכל שלבי האיטום', text_en: 'Site manager - ongoing inspection at all waterproofing stages', order: 0 },
      { text: 'מהנדס ביצוע - בדיקה לפני כיסוי האיטום', text_en: 'Execution engineer - inspection before covering waterproofing', order: 1 },
      { text: 'מנהל פרויקט - נוכחות במבחן הצפה ואישור', text_en: 'Project manager - presence at flood test and approval', order: 2 },
      { text: 'יועץ/ספק איטום - פיקוח עליון בזמן ביצוע ואישור מבחן הצפה', text_en: 'Waterproofing consultant/supplier - senior supervision during execution and flood test approval', order: 3 },
      { text: 'בקר איכות - בדיקת חפיפות, עליות, ניקוזים ותיעוד', text_en: 'QC inspector - check overlaps, rises, drains and documentation', order: 4 },
    ]},
    { title: 'בטיחות', title_en: 'Safety', icon: 'Shield', order: 6, items: [
      { text: 'שימוש בציוד מגן אישי - כפפות עמידות לחום, משקפי מגן, נעלי בטיחות', text_en: 'Use personal protective equipment - heat-resistant gloves, safety glasses, safety shoes', order: 0 },
      { text: 'זהירות בעבודה עם להבה (מבער גז) - שמירה על מרחק מחומרים דליקים', text_en: 'Caution when working with flame (gas torch) - keep distance from flammable materials', order: 1 },
      { text: 'הבטחת מעקות ושוליים בעבודה על גג - מניעת נפילה מגובה', text_en: 'Ensure railings and edges when working on roof - prevent falls from height', order: 2 },
      { text: 'אוורור נאות בעבודה עם חומרים ביטומניים (אדים מזיקים)', text_en: 'Proper ventilation when working with bituminous materials (harmful fumes)', order: 3 },
      { text: 'מטף כיבוי אש זמין באזור העבודה', text_en: 'Fire extinguisher available in work area', order: 4 },
    ]},
  ],
}

async function seed() {
  console.log('מתחיל seed...')

  // מחיקת נתונים קיימים
  console.log('מוחק נתונים קיימים...')
  await supabase.from('items').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('sections').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('trades').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  for (const tradeInfo of tradesData) {
    console.log(`מוסיף מלאכה: ${tradeInfo.name}`)
    const { data: trade, error: tradeErr } = await supabase
      .from('trades')
      .insert(tradeInfo)
      .select()
      .single()

    if (tradeErr) {
      console.error('שגיאה בהוספת מלאכה:', tradeErr)
      continue
    }

    const sections = sectionsData[tradeInfo.name]
    if (!sections) continue

    for (const sectionInfo of sections) {
      const { items, ...sectionData } = sectionInfo
      const { data: section, error: secErr } = await supabase
        .from('sections')
        .insert({ ...sectionData, trade_id: trade.id })
        .select()
        .single()

      if (secErr) {
        console.error('שגיאה בהוספת פרק:', secErr)
        continue
      }

      if (items && items.length > 0) {
        const itemsToInsert = items.map(item => ({
          ...item,
          section_id: section.id,
        }))
        const { error: itemErr } = await supabase
          .from('items')
          .insert(itemsToInsert)

        if (itemErr) {
          console.error('שגיאה בהוספת פריטים:', itemErr)
        }
      }
    }
  }

  console.log('Seed הושלם בהצלחה!')
}

seed().catch(console.error)
