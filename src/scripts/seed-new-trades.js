// סקריפט להזנת 7 מלאכות חדשות ל-Supabase
// הרצה: node src/scripts/seed-new-trades.js

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://jlbdamuvpflnkzsyxqme.supabase.co',
  'sb_publishable_dz8BVVZAJDewYYaGzLQD5A_-83Pf7f4'
)

const newTrades = [
  {
    name: 'איטום מרפסות',
    name_en: 'Balcony Waterproofing',
    desc_text: 'איטום מרפסות שמש ושירות, הכנות, מריחה',
    desc_en: 'Sun & service balcony waterproofing, preparation, application',
    icon: 'balcony',
    color: '#0891B2',
    sections: [
      {
        title: 'לפני ביצוע', title_en: 'Before Execution', icon: 'ClipboardCheck',
        items: [
          { text: 'פתיחת מלאכה אל מול ספק/יועץ איטום - אישור חומר לביצוע ושיטת יישום', text_en: 'Open work order with supplier/waterproofing consultant - approve materials and application method' },
          { text: 'מסירת קומה - נקיון מרפסת', text_en: 'Floor handover - balcony cleaning' },
          { text: 'שיפוע מינימאלי של היציקה - 1%', text_en: 'Minimum casting slope - 1%' },
          { text: 'יציקת חגורת בטון בויטרינה (המשכיות החגורה בתוך הדירה)', text_en: 'Pour concrete belt at storefront (belt continuity into apartment)' },
          { text: 'צנרת גז - חדירה למרפסת מעל גובה הריצוף', text_en: 'Gas piping - penetration to balcony above floor level' },
          { text: 'ביצוע איטום במריחה רק במרפסות מעל מרחב לא שימושי', text_en: 'Apply waterproofing coating only on balconies above non-usable space' },
        ],
      },
      {
        title: 'הכנות לאיטום', title_en: 'Waterproofing Preparation', icon: 'Wrench',
        items: [
          { text: 'כללי:', text_en: 'General:' },
          { text: 'החלקת השטח (גראדים, ברזלים בולטים, קלקר, ספייסרים)', text_en: 'Surface smoothing (ridges, protruding rebar, Styrofoam, spacers)' },
          { text: 'נקיון יסודי של האבק', text_en: 'Thorough dust cleaning' },
          { text: 'ביצוע רולקות (5X5 ס"מ)', text_en: 'Create cove joints (5x5 cm)' },
          { text: 'סיתות סביב פתח הניקוז ומילוי ב"כל אוטם"', text_en: 'Chiseling around drain opening and filling with sealant' },
          { text: 'מרפסת שמש:', text_en: 'Sun balcony:' },
          { text: 'נקיון משקוף משאריות בטון', text_en: 'Clean lintel from concrete residue' },
          { text: 'ביטון מלא של צנרת חודרת', text_en: 'Full concrete encasement of penetrating pipes' },
        ],
      },
      {
        title: 'ביצוע האיטום', title_en: 'Waterproofing Execution', icon: 'Hammer',
        items: [
          { text: 'מרפסת שמש:', text_en: 'Sun balcony:' },
          { text: 'מריחת איטום פוליאוריטני (קבוצה 1) - מריחה חלקה וללא בועות', text_en: 'Apply polyurethane waterproofing (Group 1) - smooth application without bubbles' },
          { text: 'גובה מריחה - 3-5 ס"מ מעל פני ריצוף', text_en: 'Application height - 3-5 cm above floor level' },
          { text: 'הנחת רשת אינטרגלס בפתח הניקוז (יישום בתוך חומר האיטום)', text_en: 'Place fiberglass mesh at drain opening (applied within waterproofing material)' },
          { text: 'מרפסת שירות:', text_en: 'Service balcony:' },
          { text: 'איטום צמנטי - ביצוע שתי שכבות (אלסטוסיל)', text_en: 'Cement waterproofing - two layers (Elastoseal)' },
          { text: 'גובה האיטום בקיר - 15 ס"מ', text_en: 'Waterproofing height on wall - 15 cm' },
        ],
      },
      {
        title: 'דגשים', title_en: 'Key Points', icon: 'AlertTriangle',
        items: [
          { text: 'ביצוע מושלם של ההכנות לאיטום', text_en: 'Perfect execution of waterproofing preparations' },
          { text: 'מריחה אחידה וללא בועות', text_en: 'Uniform application without bubbles' },
        ],
      },
      {
        title: 'כשלים', title_en: 'Common Failures', icon: 'XCircle',
        items: [
          { text: 'חורים באיטום, איטום לא אחיד, "בועות" בשל יישום במז"א חם', text_en: 'Holes in waterproofing, uneven coating, bubbles due to hot weather application' },
          { text: 'גובה איטום נמוך מהנדרש', text_en: 'Waterproofing height lower than required' },
          { text: 'מריחת איטום על החלק העליון של המשקוף', text_en: 'Applying waterproofing on top of lintel' },
          { text: 'מריחת איטום על "מיץ" בטון (שנשאר על המשקוף)', text_en: 'Applying waterproofing on concrete residue (remaining on lintel)' },
        ],
      },
      {
        title: 'בקרות', title_en: 'Inspections', icon: 'Search',
        items: [
          { text: 'מנהל עבודה - בקרת ביצוע שוטפת + בדיקות הצפה מדגמיות', text_en: 'Site manager - ongoing execution inspection + sample flood tests' },
          { text: 'בקר איכות גמר - ע"פ מטריצה', text_en: 'Finishing QC inspector - per matrix' },
          { text: 'פיקוח עליון של ספק/יועץ איטום - עפ"י מטריצה', text_en: 'Supplier/waterproofing consultant supervision - per matrix' },
        ],
      },
      {
        title: 'בטיחות', title_en: 'Safety', icon: 'Shield',
        items: [
          { text: 'דגשים כללים לעבודה + עבודה בגובה בקרבת מעקות', text_en: 'General work safety guidelines + working at height near railings' },
        ],
      },
    ],
  },

  {
    name: 'אינסטלציה',
    name_en: 'Plumbing',
    desc_text: 'מים, דלוחין, שופכין, ורטיקלי, ניקוז',
    desc_en: 'Water, drainage, sewage, verticals, drains',
    icon: 'plumbing',
    color: '#06B6D4',
    sections: [
      {
        title: 'לפני ביצוע', title_en: 'Before Execution', icon: 'ClipboardCheck',
        items: [
          { text: 'פתיחת מלאכה אל מול ספק/יועץ אינסטלציה. אישור חומרי ספק לביצוע והגדרת שיטת עבודה', text_en: 'Open work order with supplier/plumbing consultant. Approve supplier materials and define work method' },
          { text: 'התאמה לדרישות המפרט הטכני של הדייר - בסטנדרט אסלה רגילה', text_en: 'Compliance with tenant technical specifications - standard toilet as default' },
          { text: 'תכנון נקודת ביקורת לפני ורטיקלי', text_en: 'Plan inspection point before vertical pipe' },
          { text: 'כל סוגי הצנרת והמחברים - חותמת של מכון התקנים', text_en: 'All pipe types and connectors - Standards Institute certification' },
          { text: 'מניעת הצטלבות בתכנון עם מערכות אחרות (ספרינקלרים, חשמל, מיזו"א)', text_en: 'Prevent planning conflicts with other systems (sprinklers, electrical, HVAC)' },
          { text: 'בדיקת דרישות עירייה לניקוזים שונים (מי גשמים, מי מזגנים)', text_en: 'Check municipal requirements for various drains (rainwater, AC water)' },
          { text: 'סימון קו שטיכמוס מלא בכל החדרים הרטובים', text_en: 'Mark full benchmark line in all wet rooms' },
          { text: 'התקנת מאייד', text_en: 'Install evaporator' },
        ],
      },
      {
        title: 'שלבי ביצוע', title_en: 'Execution Steps', icon: 'Hammer',
        items: [
          { text: 'מים (פקסגול - לדוגמה)', text_en: 'Water (Pexgol - example)' },
          { text: 'הנחה לפני דלוחין', text_en: 'Lay before drainage pipes' },
          { text: 'ללא מעבר תחת קבועות', text_en: 'No passage under fixtures' },
          { text: 'במעבר צנרת מרצפה לקיר - לא ב-90 מעלות - למניעת כיפוף בצנרות (איור 1)', text_en: 'Floor-to-wall pipe transition - not at 90 degrees - to prevent pipe bending (Figure 1)' },
          { text: 'ללא מחברים לאורך הצינור', text_en: 'No connectors along pipe length' },
          { text: 'חיבור לרצפה ע"י אביזר ייעודי', text_en: 'Floor connection using dedicated fitting' },
          { text: 'הנחת פלציב מתחת (15 ס"מ מכל צד). ללא ביטון מעל', text_en: 'Place flexible sleeve underneath (15 cm each side). No concrete above' },
          { text: 'בקיר בין דירות - התקנה חיצונית ע"ג הקיר (אקוסטיקה)', text_en: 'Between apartments wall - external installation on wall surface (acoustics)' },
          { text: 'ביצוע טסט לחץ ע"י הקבלן', text_en: 'Pressure test by contractor' },
          { text: 'נק\' מים חם + קר למכונת כביסה', text_en: 'Hot + cold water point for washing machine' },
          { text: 'חנוכיה:', text_en: 'Manifold:' },
          { text: 'הצבה - 30 ס"מ (מינימום) מעל רצפה, קיבוע איכותי, צבעים נפרדים, חם מעל קר (צילום 5)', text_en: 'Placement - 30 cm (minimum) above floor, quality fixing, separate colors, hot above cold (Photo 5)' },
          { text: 'חיבור לקיר ע"י מיתדים - בהתאם לסוג הקיר', text_en: 'Wall connection using anchors - according to wall type' },
          { text: 'ביטון נקודת היציאה + מריחת איטום ביטומני ע"ג הבטון', text_en: 'Concrete outlet point + apply bituminous waterproofing on concrete' },
          { text: 'דלוחין:', text_en: 'Drainage:' },
          { text: 'שיפוע מינימאלי - 2%', text_en: 'Minimum slope - 2%' },
          { text: 'ללא מעבר תחת קבועות, חוץ מאסלה צפה (איור 3)', text_en: 'No passage under fixtures, except wall-hung toilet (Figure 3)' },
          { text: 'ללא שני מחסומי ריח ברצף', text_en: 'No two odor traps in sequence' },
          { text: 'הכנסה מספקת של הצינורות לתוך המחברים', text_en: 'Sufficient pipe insertion into connectors' },
          { text: 'התקנת מאריך מעל גובה ריצוף + 2 גומיות', text_en: 'Install extension above floor level + 2 rubber seals' },
          { text: 'סגירה תקינה וחזקה של המחברים', text_en: 'Proper and tight connector closure' },
          { text: 'אטם גומי במחברים - נראות בכל היקף המחבר (צילום 2)', text_en: 'Rubber seal in connectors - visible around entire connector perimeter (Photo 2)' },
          { text: 'ביטון מלא מיד לאחר חיבור הצנרת', text_en: 'Full concrete encasement immediately after pipe connection' },
          { text: 'בפנטהאוז - פלציב מתחת צנרת דלוחין', text_en: 'In penthouse - flexible sleeve under drainage pipes' },
          { text: 'טסט בלון לבדיקת אטימות ע"י הקבלן (צילום 8)', text_en: 'Balloon test for leak check by contractor (Photo 8)' },
          { text: 'בקרת אפליקציה לפני שומשום', text_en: 'Application inspection before sealing' },
          { text: 'שופכין:', text_en: 'Sewage:' },
          { text: 'זווית מינימאלית: 2% (בפנטהאוז - זווית מקסימאלית - 2%)', text_en: 'Minimum angle: 2% (in penthouse - maximum angle - 2%)' },
          { text: 'ורטיקלי:', text_en: 'Vertical pipes:' },
          { text: 'מעטפת פלציב לכל עומק הבטון (אקוסטיקה)', text_en: 'Flexible sleeve wrapping for full concrete depth (acoustics)' },
          { text: 'חבקים - 107-111 מ"מ (תקניים ועם גומי)', text_en: 'Clamps - 107-111 mm (standard with rubber)' },
          { text: 'חיבור בשליש - מהודק עד 5 מ"מ. ובשני שליש - לא מהודק - פתוח כ-1 ס"מ (איור 9)', text_en: 'Connection at one-third - tightened to 5 mm. Two-thirds - not tightened - open approx. 1 cm (Figure 9)' },
          { text: 'אנכיות - ללא שינויי זווית (אקוסטיקה)', text_en: 'Vertical alignment - no angle changes (acoustics)' },
          { text: 'עין ביקורת כל שתי קומות + גישה (ללא סגירה ע"י קרמיקה)', text_en: 'Inspection eye every two floors + access (no ceramic covering)' },
          { text: 'ללא חיבור קומה ראשונה לורטיקלי', text_en: 'No first floor connection to vertical' },
          { text: 'ניקוז מקלחון:', text_en: 'Shower drain:' },
          { text: 'שימוש ב"קומקום" בלבד (צילום 7)', text_en: 'Use "kumkum" drain only (Photo 7)' },
          { text: 'מיקום - ממורכז (40 ס"מ מקיר סופי) ומפולס (צילום 4)', text_en: 'Position - centered (40 cm from finished wall) and leveled (Photo 4)' },
          { text: 'גובה "קומקום" - 104 משטיכמוס', text_en: 'Kumkum height - 104 from benchmark' },
          { text: 'מתאם נקז ריבועי:', text_en: 'Square drain adapter:' },
          { text: 'גובה - 102.5 ס"מ משטיכמוס', text_en: 'Height - 102.5 cm from benchmark' },
          { text: 'שתי גומיות', text_en: 'Two rubber seals' },
          { text: 'אסלה תלויה:', text_en: 'Wall-hung toilet:' },
          { text: 'ברגים 32-33 ס"מ מריצוף + ברגים מפולסים (ראה קו שטיכמוס ע"ג הגשטל) (איור 10)', text_en: 'Bolts 32-33 cm from floor + leveled bolts (see benchmark line on frame) (Figure 10)' },
          { text: 'ביטון עד תחתית הברגים (0.5 ס"מ מתחת)', text_en: 'Concrete up to bottom of bolts (0.5 cm below)' },
          { text: 'גובה פני אסלה רגילה - 39 ס"מ (+/- 1 ס"מ)', text_en: 'Standard toilet seat height - 39 cm (+/- 1 cm)' },
          { text: 'גובה פני אסלה עבור נכים - 45-50 ס"מ', text_en: 'Disabled toilet seat height - 45-50 cm' },
          { text: 'אמבטיה:', text_en: 'Bathtub:' },
          { text: 'תזמון חיבור וביטון צינור ג\'קוזי ("אביק")', text_en: 'Timing of jacuzzi pipe connection and concreting ("Avik")' },
          { text: 'ביצוע טסט בלון ע"י קבלן האינסטלציה', text_en: 'Balloon test by plumbing contractor' },
          { text: 'ניקוז מזגן:', text_en: 'AC drain:' },
          { text: 'מיקום ניקוז ע"פ תכנית', text_en: 'Drain location per plan' },
          { text: 'קוטר צנרת - 32 מקס\'', text_en: 'Pipe diameter - 32 max' },
          { text: 'מרחק קצה צנרת ניקוז קשיחה ממאייד - מקסימום 20 ס"מ (חיזוק ע"י שלה בקצה)', text_en: 'Rigid drain pipe end distance from evaporator - maximum 20 cm (reinforced with bracket at end)' },
          { text: 'שיפוע מינימאלי - 1%', text_en: 'Minimum slope - 1%' },
          { text: 'גובה ברך - 45 ס"מ מתקרה', text_en: 'Elbow height - 45 cm from ceiling' },
          { text: 'ניקוז מכונת כביסה:', text_en: 'Washing machine drain:' },
          { text: 'יציאה מהקיר, מחובר למחסום ריח', text_en: 'Wall outlet, connected to odor trap' },
        ],
      },
      {
        title: 'כשלים', title_en: 'Common Failures', icon: 'XCircle',
        items: [
          { text: 'נזילות במחברים עקב חיבור לא תקין', text_en: 'Leaks at connectors due to improper connection' },
          { text: 'נזילות בשל סדקים בצנרת', text_en: 'Leaks due to pipe cracks' },
          { text: 'שיפועים נמוכים מהנדרש/שיפועים הפוכים', text_en: 'Slopes lower than required / reverse slopes' },
          { text: 'ביצוע לקוי/אי ביצוע של ביטון סביב קולטן וורטיקלי, קולטן ללא פלציב (כשל אקוסטי)', text_en: 'Poor/missing concrete around collector and vertical, collector without flexible sleeve (acoustic failure)' },
          { text: 'חירוץ מעל חצי עובי הבלוק של הקירות', text_en: 'Chasing beyond half the block thickness of walls' },
          { text: 'שימוש בסבון להכנסת צנרת (גורם לייבוש הגומיות)', text_en: 'Using soap for pipe insertion (causes rubber seal drying)' },
          { text: 'חוסר ב-2 גומיות במאריך הריבועי של המקלחון והמאריכים העגולים של קופסאות הביקורות', text_en: 'Missing 2 rubber seals in shower square extension and round inspection box extensions' },
          { text: 'גובה אסלות שלא ע"פ התקן', text_en: 'Toilet heights not per standard' },
        ],
      },
      {
        title: 'בקרות', title_en: 'Inspections', icon: 'Search',
        items: [
          { text: 'קבלן - טסט מים לכל דירה', text_en: 'Contractor - water test per apartment' },
          { text: 'קבלן - טסט בלון לדלוחין לכל דירה', text_en: 'Contractor - balloon test for drainage per apartment' },
          { text: 'קבלן - חתימה אצל מנ"ע על ביצוע טסט בלון בעת חיבור צינור ג\'קוזי (אפליקציה)', text_en: 'Contractor - sign off with site manager on balloon test during jacuzzi pipe connection (application)' },
          { text: 'מנ"ע - בקרה שוטפת על ביצוע עבודה ועל ביצוע טסטים ע"י הקבלן', text_en: 'Site manager - ongoing inspection of work and contractor tests' },
          { text: 'מנ"ע - בקרת אפליקציה - אינס\' לפני סומסום + טסט בלון לפני מסירה', text_en: 'Site manager - application inspection - plumbing before sealing + balloon test before handover' },
          { text: 'מהנדס ביצוע - בקרה מדגמית', text_en: 'Execution engineer - sample inspection' },
          { text: 'ספק פקסגול - קומה הנדסית', text_en: 'Pexgol supplier - engineering floor' },
          { text: 'ספק חוליות - קומה הנדסית', text_en: 'Pipe sections supplier - engineering floor' },
          { text: 'בקר איכות - ע"פ בקרת מטריצה', text_en: 'QC inspector - per matrix inspection' },
          { text: 'פיקוח עליון יועץ אינסטלציה במהלך עבודות שחור ודירה לדוגמה', text_en: 'Senior plumbing consultant supervision during rough-in and sample apartment' },
        ],
      },
      {
        title: 'בטיחות', title_en: 'Safety', icon: 'Shield',
        items: [
          { text: 'בטיחות כללית לעבודה', text_en: 'General work safety guidelines' },
        ],
      },
    ],
  },

  {
    name: 'אלומיניום',
    name_en: 'Aluminum',
    desc_text: 'חלונות, תריסים, משקופים, זכוכית',
    desc_en: 'Windows, shutters, frames, glass',
    icon: 'window',
    color: '#64748B',
    sections: [
      {
        title: 'לפני ביצוע', title_en: 'Before Execution', icon: 'ClipboardCheck',
        items: [
          { text: 'הכנת רשימת האלומיניום לפרויקט', text_en: 'Prepare aluminum list for project' },
          { text: 'הכרת מפרט האלומיניום של היועץ (סוג פרופיל, סוג זכוכית, בידוד, תריסים, דרישות מיוחדות)', text_en: 'Familiarize with consultant aluminum spec (profile type, glass type, insulation, shutters, special requirements)' },
          { text: 'אישור קבלן האלומיניום מול היועץ', text_en: 'Approve aluminum contractor with consultant' },
          { text: 'העברת SD על ידי הקבלן לאישור יועץ האלומיניום', text_en: 'Contractor submits shop drawings for aluminum consultant approval' },
          { text: 'קבלת גוונים לדירות וללוביים מהאדריכל', text_en: 'Receive color schemes for apartments and lobbies from architect' },
          { text: 'ביצוע פתיחת מלאכה', text_en: 'Execute work order opening' },
        ],
      },
      {
        title: 'שלבי ביצוע', title_en: 'Execution Steps', icon: 'Hammer',
        items: [
          { text: 'התקנת משקופים עיוורים - בקרה על ההתקנה עם החומרים הנדרשים ולפי הפרטים', text_en: 'Install blind frames - inspect installation with required materials and per details' },
          { text: 'ביצוע דירה טכנית/לדוגמה - הרכבת כל האלומיניום בדירה', text_en: 'Execute technical/sample apartment - install all aluminum in apartment' },
          { text: 'זימון יועץ האלומיניום והאדריכל לבקרה והערות לפני המשך עבודה בשאר הדירות', text_en: 'Invite aluminum consultant and architect for inspection and comments before continuing to other apartments' },
        ],
      },
      {
        title: 'דגשים', title_en: 'Key Points', icon: 'AlertTriangle',
        items: [
          { text: 'יש להבריג עד הסוף את הברגים המרתקים את מסגרות המשקופים אל המשקוף העיוור', text_en: 'Fully screw in bolts connecting frame assemblies to blind frame' },
          { text: 'איטום בחוץ לחלונות יעשה בגוון האבן/צבע', text_en: 'Exterior window sealing in stone/paint color tone' },
          { text: 'זכוכית במסתורי כביסה לא תהיה שקופה', text_en: 'Laundry enclosure glass must not be transparent' },
          { text: 'ביצוע חלונות חילוץ בהתאם לדרישות הבטיחות', text_en: 'Install rescue windows per safety requirements' },
          { text: 'סוג הזכוכית תואמת למפרט והתקן', text_en: 'Glass type matches specification and standard' },
        ],
      },
      {
        title: 'בקרות', title_en: 'Inspections', icon: 'Search',
        items: [
          { text: 'מנהל עבודה - שוטף', text_en: 'Site manager - ongoing' },
          { text: 'מהנדס ביצוע - פעם בקומה', text_en: 'Execution engineer - once per floor' },
          { text: 'מנהל פרויקט - פעם ב-3 קומות', text_en: 'Project manager - once every 3 floors' },
          { text: 'יועץ אלומיניום - בדירה טכנית ובהתאם לאופי העבודה בפרויקט', text_en: 'Aluminum consultant - in technical apartment and per project work nature' },
          { text: 'פיקוח - שוטף', text_en: 'Supervision - ongoing' },
        ],
      },
      {
        title: 'בסיום ביצוע', title_en: 'Post Completion', icon: 'CheckCircle',
        items: [
          { text: 'אישור מהקבלן על עמידה של הזכוכית בתקן', text_en: 'Contractor confirmation of glass standard compliance' },
          { text: 'אישור מהקבלן על עמידה של ארגז התריס והזכוכית בדרישות האקוסטיות', text_en: 'Contractor confirmation of shutter box and glass acoustic compliance' },
        ],
      },
    ],
  },

  {
    name: 'עבודות גבס',
    name_en: 'Drywall',
    desc_text: 'ציפוי, הנמכות, מחיצות, בידוד',
    desc_en: 'Cladding, suspended ceilings, partitions, insulation',
    icon: 'dashboard',
    color: '#F59E0B',
    sections: [
      {
        title: 'לפני ביצוע', title_en: 'Before Execution', icon: 'ClipboardCheck',
        items: [
          { text: 'פתיחת מלאכה אל ספק. הגדרת שיטת עבודה וסוגי גבס באזורים שונים אל מול תוכניות אדריכלות/בטיחות/יועץ אקוסטיקה וכו\'', text_en: 'Open work order with supplier. Define work method and drywall types per area against architecture/safety/acoustics plans' },
          { text: 'דירה מרוצפת + רובה', text_en: 'Apartment tiled + grouted' },
          { text: 'אישור מנהל עבודה להתחיל בביצוע עבודות גבס', text_en: 'Site manager approval to start drywall work' },
          { text: 'ביצוע לפי תכנית שינויי דיירים חתומה', text_en: 'Execute per signed tenant modification plan' },
          { text: 'בדיקת הזמנת ציוד בהתאם לתכנון. מיתדים (דיבלים) על פי התקן, ברגים, ניצבים, סנדלים. במידת הצורך מסלולים, פלציב, לוחות', text_en: 'Verify equipment order per plan. Anchors (dowels) per standard, screws, studs, tracks. If needed: channels, flexible sleeves, boards' },
          { text: 'תכנון פריסה של מתלים לתקרה', text_en: 'Plan ceiling hanger layout' },
          { text: 'גובה תחתית הסינר לפי תכנית אדריכלית בתיק הדייר', text_en: 'Soffit bottom height per architectural plan in tenant file' },
          { text: 'הגדרת מיקום פתחי מיזוג אוויר ואוורור על פי תכנית מיזוג אוויר בתיק הדייר', text_en: 'Define HVAC opening locations per HVAC plan in tenant file' },
          { text: 'במידה ויבוצע פתח במחיצות הגבס (לא מתוכנן כעת) יש לקבל דגשים מיוחדים לפני הביצוע', text_en: 'If opening is made in drywall partitions (not currently planned) - obtain special guidelines before execution' },
          { text: 'בדיקה חוזרת של חורי דיוידגים סגורים והשמה של סיקה ורובה במישק שבין הריצוף לקיר (לבדיקת לחץ בממ"ד)', text_en: 'Re-check sealed Davidag holes and apply Sika and grout at floor-wall joint (for safe room pressure test)' },
        ],
      },
      {
        title: 'שלבי ביצוע', title_en: 'Execution Steps', icon: 'Hammer',
        items: [
          { text: 'עבודה על פי התכניות ועל פי פתיחת מלאכה', text_en: 'Work per plans and work order' },
          { text: 'סימון קווי בניית קירות אל מול קווי הפוגה של הריצוף (לסגור קלינים)', text_en: 'Mark wall construction lines against tile grout lines (close wedges)' },
          { text: 'חיבור ניצבים לקיר על פי פרט - לסירוגין', text_en: 'Connect studs to wall per detail - alternating' },
          { text: 'יישום צמר זכוכית ועליו יריעת ניילון (לבידוד תרמי)', text_en: 'Apply glass wool with nylon sheet overlay (thermal insulation)' },
          { text: 'בניית קונסטרוקציית ההנמכה על פי שטיכמוס', text_en: 'Build suspended ceiling frame per benchmark' },
          { text: 'סיום העברות וקיבוע למערכות צנרת ניקוז מזגנים, חשמל, ספרינקלרים', text_en: 'Complete routing and fixing of AC drain pipes, electrical, sprinklers' },
          { text: 'ביצוע בקרת אפליקציה ע"י מנהל העבודה', text_en: 'Application inspection by site manager' },
          { text: 'אישור לסגירת ההנמכה ע"י מנ"ע', text_en: 'Approval to close suspended ceiling by site manager' },
          { text: 'סגירת התקרות', text_en: 'Close ceilings' },
          { text: 'שפכטל קירות ותקרות', text_en: 'Spackle walls and ceilings' },
          { text: 'איטום מרווח של 1 ס"מ בין לוח הגבס ובין הריצוף באמצעות מסטיק אקרילי (לפני הנחת הפאנלים)', text_en: 'Seal 1 cm gap between drywall board and floor with acrylic mastic (before panel installation)' },
        ],
      },
      {
        title: 'רשימת מערכות', title_en: 'Systems & Materials', icon: 'Package',
        items: [
          { text: 'כלל האלמנטים בביצוע המלאכה יהיו על פי התקן הישראלי ומהספק המורשה לאתר', text_en: 'All elements per Israeli standard and from site-authorized supplier' },
          { text: 'פרט חיבור מחיצת גבס ובלוק איטונג - שימוש במסטיק אקרילי כדוג\' טמבור מסטיק אקרילי, אקריראב ACRYRUB SOUDAL (דבטק)', text_en: 'Drywall-Ytong partition connection detail - use acrylic mastic e.g. Tambour, ACRYRUB SOUDAL (Devtek)' },
          { text: 'פרטי בידוד טרמי - זוויתן עם פס איטום מניעת גשר קור, יישום צמר זכוכית 2" 24 ק"ג למ"ר', text_en: 'Thermal insulation details - angle bracket with sealing strip, apply 2" glass wool 24 kg/sqm' },
          { text: 'פרטי הנמכת תקרות - מתלה T, שדרת מסילות, סינר', text_en: 'Suspended ceiling details - T hanger, rail backbone, soffit' },
          { text: 'בידוד אקוסטי - על פי הנחיות יועץ אקוסטיקה בקיר הגובל פיר מעלית', text_en: 'Acoustic insulation - per acoustics consultant guidelines on elevator shaft wall' },
          { text: 'פרט פשפ"ש (פתח גישה מזגנים 60*60 תוך כדי שמירה על 25 ס"מ מקו מאייד)', text_en: 'Access panel detail (60x60 HVAC access, 25 cm from evaporator line)' },
          { text: 'פתח אוויר חוזר זהה לפרט פשפש', text_en: 'Return air opening identical to access panel detail' },
        ],
      },
      {
        title: 'דגשים', title_en: 'Key Points', icon: 'AlertTriangle',
        items: [
          { text: 'ציפוי רגיל - ניצבים כל 60 ס"מ וחיזוק כל 1 מ\' לסירוגין (חיזוק ראשון בגובה 90 ס"מ מקו הריצוף)', text_en: 'Standard cladding - studs every 60 cm, bracing every 1 m alternating (first at 90 cm from floor)' },
          { text: 'ציפוי ממ"ד - ניצבים כל 40 ס"מ וחיזוק כל 80 ס"מ לסירוגין (חיזוק ראשון בגובה 70 ס"מ מקו ריצוף)', text_en: 'Safe room cladding - studs every 40 cm, bracing every 80 cm alternating (first at 70 cm from floor)' },
          { text: 'ציפוי סביב החלון - יש לחזק פרופיל למשקוף עיוור', text_en: 'Window area cladding - reinforce profile to blind frame' },
          { text: 'ציפוי גבס מעל כל פתח/חלון - חפיפה של הלוח לפחות 15 ס"מ מעל הפתח (בצורת רייש-דקל)', text_en: 'Drywall above every opening/window - board overlap min 15 cm above opening (L-shape)' },
          { text: 'דופן מינימאלי לפרופיל (במ"מ) - תקרה: 0.6, קיר: 0.5', text_en: 'Min profile thickness (mm) - ceiling: 0.6, wall: 0.5' },
          { text: 'תקרה בחדר רטוב תהיה מלוח רגיל ולא מלוח ירוק', text_en: 'Wet room ceiling uses standard board, not green board' },
          { text: 'ניצבים בתקרה ובקירות יהיו הפוכים זה לזה', text_en: 'Ceiling and wall studs oriented opposite to each other' },
          { text: 'פרט סינר יהיה על פי הוראת המלאכה - בורג בגזירה ולא במתיחה (פרט ג\')', text_en: 'Soffit detail per work instruction - screw in shear not tension (Detail C)' },
          { text: 'סינר לא יהיה במישור אחיד עם מישור קיר הבטון (פרט ד\') - יותקן STR בשאר הדירות 2 ס"מ הפרש', text_en: 'Soffit not flush with concrete wall plane (Detail D) - install STR with 2 cm offset' },
          { text: 'חיזוק תקרה - שדרת מסילות כל 120 ס"מ, חיזוק לתקרה באמצעות מתלה תקני כמובא באיור 1', text_en: 'Ceiling reinforcement - rail backbone every 120 cm, standard hanger as shown in Figure 1' },
          { text: 'במידה של שינוי דיירים - בכל מקום בו תיתכן פגיעה מכנית יש לבצע פינה קשיחה באמצעות פרופיל באורך 3 מ\' (בידקס)', text_en: 'For tenant modifications - install rigid corner with 3 m profile (Bidex) where mechanical damage possible' },
          { text: 'מפגש של מקסימום 3 לוחות, מפגש של הפאזה בלבד (לא חתוך)', text_en: 'Max 3 boards meeting at junction, factory edge only (not cut edge)' },
          { text: 'במידה ויבוצע פתח במחיצה - יש לקבל הנחיות ייחודיות לפרט זה', text_en: 'If opening made in partition - obtain unique guidelines' },
          { text: 'אין לקדוח את הבורג עמוק מדי בלוח הגבס, יש לעבוד עם כלים מתאימים (סטופר ועבודה עם מקדחה ולא פטישון)', text_en: 'Do not over-drive screws, use appropriate tools (stopper and drill not hammer drill)' },
          { text: 'בממ"ד - באזור החלון המרחק בין פני לוח הגבס לבטון לא יהיה יותר מ-55 מ"מ בביצוע עם פרופיל 50', text_en: 'Safe room window area - drywall-to-concrete distance max 55 mm with profile 50' },
        ],
      },
      {
        title: 'כשלים', title_en: 'Common Failures', icon: 'XCircle',
        items: [
          { text: 'בניית תקרה לא ע"פ תקן - קריסת תקרה', text_en: 'Ceiling not per standard - ceiling collapse' },
          { text: 'הרכבת לוחות לא על פי הפרט - סדיקה בחיבורים', text_en: 'Board installation not per detail - cracking at joints' },
          { text: 'ביצוע סינר לא על פי הפרט - היווצרות כפיפה בשוליים', text_en: 'Soffit not per detail - edge bowing' },
          { text: 'חיתוך ניצבים בשביל מעבר חשמל - התמוטטות הקיר', text_en: 'Cutting studs for electrical passage - wall collapse' },
          { text: 'אי הדבקת פס משי בפינות', text_en: 'Not applying mesh tape at corners' },
        ],
      },
      {
        title: 'בקרות', title_en: 'Inspections', icon: 'Search',
        items: [
          { text: 'מנהל עבודה - בקרה על הבניה בכל הדירות ווידוא בניה על פי התכניות', text_en: 'Site manager - inspect construction in all apartments, verify per plans' },
          { text: 'מהנדס הביצוע - בקרה אחת לכל קומה על איכות הבניה', text_en: 'Execution engineer - one inspection per floor on construction quality' },
          { text: 'מנהל פרויקט - בקרה מדגמית אחת ל-3 קומות', text_en: 'Project manager - sample inspection every 3 floors' },
          { text: 'יועץ גבס - זאב לברן - בסיום הקומה ההנדסית וב-2/3 של הפרויקט', text_en: 'Drywall consultant - Ze\'ev Lavran - at engineering floor and 2/3 project' },
          { text: 'מנהל עבודה - בקרה ע"פ מטריצה ייחודית לבקרת מלאכת הגבס', text_en: 'Site manager - per dedicated drywall inspection matrix' },
          { text: 'מנהל עבודה - לפני סגירת התקרות כתנאי לסגירת הנמכות', text_en: 'Site manager - before ceiling closure as condition for closing suspended ceilings' },
          { text: 'פיקוח עליון דירה הנדסית אל מול ספק/אדריכל/יועצים', text_en: 'Senior supervision of engineering apartment with supplier/architect/consultants' },
        ],
      },
      {
        title: 'בטיחות', title_en: 'Safety', icon: 'Shield',
        items: [
          { text: 'קדיחה בצנרת לאחר הרכבת הלוחות', text_en: 'Drilling into pipes after board installation' },
          { text: 'יש לעבוד אך ורק עם מוצרי חשמל תקינים (שקע אמריקאי)', text_en: 'Work only with proper electrical products (American outlet)' },
        ],
      },
    ],
  },

  {
    name: 'חשמל',
    name_en: 'Electrical',
    desc_text: 'חירוץ, צנרת, נקודות חשמל, קופסאות',
    desc_en: 'Chasing, conduits, power points, boxes',
    icon: 'bolt',
    color: '#EF4444',
    sections: [
      {
        title: 'לפני ביצוע', title_en: 'Before Execution', icon: 'ClipboardCheck',
        items: [
          { text: 'פתיחת מלאכה מול ספק/יועץ חשמל. אישור חומר שחור, אביזרים, גופי תאורה ומעבר על דירה לדוגמה', text_en: 'Open work order with supplier/electrical consultant. Approve rough materials, accessories, lighting fixtures and review sample apartment' },
          { text: 'סיום בניית קירות', text_en: 'Wall construction completed' },
          { text: 'התאמת תכנית חשמל לדרישות המפרט הטכני של הדייר', text_en: 'Adapt electrical plan to tenant technical specification requirements' },
          { text: 'התאמת תכנית חשמל להנחיות אקוסטיקה - המנעות משקעים "גב אל גב" משני צידי אותו קיר, איסור מיקום לוח חשמל בקיר מפריד בין דירות', text_en: 'Adapt electrical plan to acoustic guidelines - avoid back-to-back outlets on same wall, no electrical panel on inter-apartment walls' },
          { text: 'סימון קו שטיכמוס בכל הדירה (חתום ע"י מנהל עבודה)', text_en: 'Mark benchmark line throughout apartment (signed by site manager)' },
          { text: 'התאמת תכנית נקודות חשמל בסמוך למיקום פאקט מזגן', text_en: 'Adapt electrical points plan near AC unit location' },
        ],
      },
      {
        title: 'שלבי ביצוע', title_en: 'Execution Steps', icon: 'Hammer',
        items: [
          { text: 'חירוץ תעלות בקירות (עד חצי עובי בלוק)', text_en: 'Chase channels in walls (up to half block thickness)' },
          { text: 'פריסת חשמל בדירה ע"פ תכנית', text_en: 'Electrical layout in apartment per plan' },
          { text: 'קיבוע צנרת ואביזרי חשמל (קיבוע נקודתי - השלמת מילוי התעלות תיעשה בשלב הטיח)', text_en: 'Fix conduits and electrical accessories (spot fixing - channel filling completed at plastering stage)' },
          { text: 'נקודות חשמל בקיר איזולציה - פתיחת נקודות לפני שפכטל', text_en: 'Electrical points in insulation wall - open points before spackling' },
        ],
      },
      {
        title: 'דגשים', title_en: 'Key Points', icon: 'AlertTriangle',
        items: [
          { text: 'חירוץ תעלות בקירות - עד חצי עובי הקיר (5 ס"מ בבלוק 10)', text_en: 'Wall channel chasing - up to half wall thickness (5 cm in block 10)' },
          { text: 'חירוץ על ידי מחרצת בלבד', text_en: 'Chasing with chaser tool only' },
          { text: 'חירוץ תעלות בקירות - הקפדה על אנכיות (בין 30 ל-200 ס"מ מהריצפה)', text_en: 'Wall channel chasing - ensure vertical alignment (between 30-200 cm from floor)' },
          { text: 'חירוץ תעלה עבור כל צינור בנפרד', text_en: 'Separate channel for each conduit' },
          { text: 'איסור חציבת תעלות תחת 15 ס"מ ממשקוף', text_en: 'No chasing within 15 cm below lintel' },
          { text: 'במפגשים בין קיר/תקרה/רצפה - יש להכניס את הצנרת היטב לקיר כדי למנוע פגיעה במישוריות הטיח', text_en: 'At wall/ceiling/floor junctions - insert conduit well into wall to prevent plaster flatness damage' },
          { text: 'במרפסת - השקעת צנרת בקירות בכדי לא לפגוע באיטום ובחיפוי אבן', text_en: 'On balcony - embed conduits in walls to not damage waterproofing and stone cladding' },
          { text: 'השקעת חשמל בתעלה - השארת רווח של 1 ס"מ לסגירה בדבק גבס/בטון', text_en: 'Electrical embedding in channel - leave 1 cm gap for closure' },
          { text: 'מניעת כיפופים ומעיכות של הצנרת', text_en: 'Prevent conduit bending and crushing' },
          { text: 'סגירת תעלות תבוצע בשלב הטיח והשפכטל בלבד ("גבס על גבס", "בטון על בטון")', text_en: 'Channel closing only at plastering/spackling stage' },
          { text: 'הצבת קופסאות בקיר אשבונד - "אפס" עם הקיר', text_en: 'Placing boxes in Ashbond wall - flush with wall' },
          { text: 'מיקום נקודות חשמל - שמירת מרחק של 15 ס"מ לפחות מהרכבות/הלבשות', text_en: 'Electrical point placement - min 15 cm from fittings/fixtures' },
          { text: 'פילוס אביזרי חשמל (בדגש על אזור המטבח)', text_en: 'Level electrical accessories (emphasis on kitchen area)' },
          { text: 'אסור לבצע גישורי חשמל בין דירות', text_en: 'No electrical bridging between apartments' },
          { text: 'צמצום פגיעה בבלוק שחור כתוצאה מהעברת צנרת מצד לצד של הקיר', text_en: 'Minimize black block damage from side-to-side conduit routing' },
          { text: 'המנעות מפגיעה בבידוד תרמי (לוחות אדקס)', text_en: 'Avoid damaging thermal insulation (Adex boards)' },
          { text: 'צנרת חשמל בחדר דודים - סימון דירות ותיאום עם האינסטלטור', text_en: 'Boiler room electrical conduits - mark apartments and coordinate with plumber' },
          { text: 'בנקודות החשמל יש להסיר את החוט השזור שהחזיק את הקלקר', text_en: 'Remove braided wire that held Styrofoam at electrical points' },
          { text: 'במקרה של חשמל ברצפת מרפסת יש לוודא ביטון מלא של הצנרת (לטובת האיטום)', text_en: 'Balcony floor electrical - ensure full conduit concrete encasement (for waterproofing)' },
          { text: 'בהכנות לנקודת חשמל במרפסת יש לוודא שלא פוגעים בצמ"ג', text_en: 'Balcony electrical point prep - ensure no damage to riser pipes' },
          { text: 'איטום סביב צנרת חשמל בארגז תריס (מונע כניסה של רוח לשקעים בדירה) - יבוצע ע"י קבלן האלומיניום', text_en: 'Seal around conduit in shutter box (prevents wind entering outlets) - by aluminum contractor' },
        ],
      },
      {
        title: 'בקרות', title_en: 'Inspections', icon: 'Search',
        items: [
          { text: 'מנ"ע - כל דירה (התאמת נקודות חשמל לתכניות הדייר)', text_en: 'Site manager - every apartment (match electrical points to tenant plans)' },
          { text: 'מהנדס ביצוע - בקרה מדגמית בכל קומה', text_en: 'Execution engineer - sample inspection per floor' },
          { text: 'מנ"פ - בקרה מדגמית כל 3 קומות', text_en: 'Project manager - sample inspection every 3 floors' },
          { text: 'פיקוח עליון אל מול ספק ויועץ חשמל - קומה הנדסית', text_en: 'Senior supervision with supplier and electrical consultant - engineering floor' },
          { text: 'מנהל עבודה - ע"פ בקרת מטריצה', text_en: 'Site manager - per inspection matrix' },
        ],
      },
      {
        title: 'בטיחות', title_en: 'Safety', icon: 'Shield',
        items: [
          { text: 'בטיחות כללית לעבודה', text_en: 'General work safety guidelines' },
        ],
      },
    ],
  },

  {
    name: 'מיזוג אוויר ואיוורור',
    name_en: 'HVAC',
    desc_text: 'מאייד, שרשורי, מעבה, ונטה, גז',
    desc_en: 'Evaporator, ducts, condenser, ventilation, gas',
    icon: 'ac_unit',
    color: '#10B981',
    sections: [
      {
        title: 'לפני ביצוע', title_en: 'Before Execution', icon: 'ClipboardCheck',
        items: [
          { text: 'פתיחת מלאכה אל מול ספק/יועץ מיזוג אוויר. אישור חומר שחור והגדרת שיטת עבודה', text_en: 'Open work order with supplier/HVAC consultant. Approve rough materials and define work method' },
          { text: 'סיום מלאכות - בניה וחשמל', text_en: 'Completion of trades - construction and electrical' },
          { text: 'תכנית מיזוג דירתית ע"פ דרישות יועץ מ"א', text_en: 'Apartment HVAC plan per consultant requirements' },
          { text: 'בדיקת מרחק פתחי מיזוג מספרינקלרים (מינימום 30 ס"מ)', text_en: 'Check HVAC opening distance from sprinklers (min 30 cm)' },
          { text: 'תכנון מיקום מאייד וקופסת חשמל עפ"י מגבלות חדר רטוב (לא מעל אמבטיה)', text_en: 'Plan evaporator and electrical box location per wet room constraints (not above bathtub)' },
          { text: 'תכנון פתח גישה 60X60 (לא מעל אמבטיה)', text_en: 'Plan 60x60 access panel (not above bathtub)' },
          { text: 'תכנון נקודת אינסטלציה לניקוז מזגן בהתאם למיקום יציאת הניקוז מהמאייד', text_en: 'Plan plumbing point for AC drain per evaporator drain outlet location' },
          { text: 'אישור יועץ מ"א למסתור כביסה (תכנון רפפה - מרחק בין למלות)', text_en: 'HVAC consultant approval for laundry enclosure (louver planning)' },
          { text: 'אישור יועץ אקוסטיקה למעבים', text_en: 'Acoustics consultant approval for condensers' },
          { text: 'ביצוע פתחים בקירות למעבר צנרת שרשורי וצנרת למעבה', text_en: 'Create wall openings for flex duct and condenser piping' },
          { text: 'בקיר האמבטיה הגובל עם המסדרון - פתיחת פתח רחב ליציאת מרכזיה וצינורות שרשורי (120 ס"מ רוחב, 40 ס"מ גובה)', text_en: 'Bathroom wall adjacent to corridor - wide opening for unit and flex ducts (120x40 cm)' },
          { text: 'ביצוע פתחים לגריל בקירות חדרים', text_en: 'Create grille openings in room walls' },
        ],
      },
      {
        title: 'שלבי ביצוע', title_en: 'Execution Steps', icon: 'Hammer',
        items: [
          { text: 'מאייד:', text_en: 'Evaporator:' },
          { text: 'התקנת המאייד במיקום עפ"י תכנית (מינימום 25 ס"מ מקיר) - תרשים 1', text_en: 'Install evaporator per plan (min 25 cm from wall) - Diagram 1' },
          { text: 'הצבת בולמי גומי בחיבור לתקרה (אקוסטיקה) - תרשים 3', text_en: 'Place rubber dampeners at ceiling connection (acoustics) - Diagram 3' },
          { text: 'התקנת קופסת חשמל (מרחק מינימאלי מהאמבטיה 60 ס"מ) - תרשים 2 (ע"י קבלן חשמל)', text_en: 'Install electrical box (min 60 cm from bathtub) - Diagram 2 (by electrical contractor)' },
          { text: 'התקנת מפס חשמל (ע"י קבלן חשמל)', text_en: 'Install electrical disconnect (by electrical contractor)' },
          { text: 'חיבור פתח ניקוז מאייד לצינור הקשיח ע"י צינור שרשורי - תרשים 4', text_en: 'Connect evaporator drain to rigid pipe via flex duct - Diagram 4' },
          { text: 'צנרת מ"א שרשורי (לפי קונסטרוקציית גבס):', text_en: 'HVAC flex duct (per drywall frame):' },
          { text: 'חיבור השרשורי לזאגות ע"י שני אזיקונים (פנימי וחיצוני)', text_en: 'Connect flex duct to elbows with two clamps (inner and outer)' },
          { text: 'הצבת פרט שינוי זווית למניעת כיפופים (אם נדרש)', text_en: 'Place angle change detail to prevent bending (if required)' },
          { text: 'תליית השרשורי לתקרה ע"י פס פח 5 ס"מ מצופה בקומפריבנד (לא עם אזיקון)', text_en: 'Hang flex duct with 5 cm metal strip covered with Compriband (not clamp)' },
          { text: 'פתחי מ"א (גריל):', text_en: 'HVAC openings (grille):' },
          { text: 'הנחת מסגרות עץ (שיסופקו מאת קבלן מ"א) ע"י עובדי מנ"ע', text_en: 'Place wood frames (from HVAC contractor) by site workers' },
          { text: 'הנחת מחיצה פנימית בתוך הגריל להפרדה בין אוויר יוצא לאוויר חוזר (אם נדרש)', text_en: 'Place internal partition in grille for supply/return air separation (if required)' },
          { text: 'פתח אוויר נכנס - בצד של מרכז החדר (אוויר חוזר בצד שקרוב לקיר)', text_en: 'Supply air opening - on room center side (return air on wall side)' },
          { text: 'מרחק אוויר נכנס מספרינקלרים - מינימום 30 ס"מ', text_en: 'Supply air distance from sprinklers - min 30 cm' },
          { text: 'מערכת גז (מעבר בתקרה בלבד):', text_en: 'Gas system (ceiling passage only):' },
          { text: 'בידוד לכל אורך הצנרת', text_en: 'Insulation along entire pipe length' },
          { text: 'ללא הידוק מוגזם של הצנרת (גורם לעיבוי מים)', text_en: 'No excessive pipe tightening (causes condensation)' },
          { text: 'מעבה:', text_en: 'Condenser:' },
          { text: 'הצבת המעבה ע"ג בולמי רעש ובמרחק 5-10 ס"מ מהרפפה', text_en: 'Place condenser on noise dampeners, 5-10 cm from louver' },
          { text: 'התקנת מפסק חשמל בסמוך למעבה (ע"י קבלן החשמל)', text_en: 'Install electrical disconnect near condenser (by electrical contractor)' },
          { text: 'יחידת מיזוג עילית:', text_en: 'Wall-mounted AC unit:' },
          { text: 'התקנת נקודת חשמל בצד ימין של המזגן (25-30 ס"מ מהמזגן) - באחריות קבלן חשמל', text_en: 'Install electrical point on right side (25-30 cm from unit) - electrical contractor' },
          { text: 'נקודת ניקוז מאחורי המזגן בצד שמאל (5 ס"מ מהקצה השמאלי ו-35 ס"מ מלמעלה)', text_en: 'Drain point behind AC on left side (5 cm from left edge, 35 cm from top)' },
          { text: 'גובה מזגן מתקרה - 10 ס"מ', text_en: 'AC height from ceiling - 10 cm' },
          { text: 'ונטה:', text_en: 'Ventilation:' },
          { text: 'התקנת "ברך" לחיבור לפיר אוורור', text_en: 'Install elbow for ventilation shaft connection' },
          { text: 'איטום סביב הברך למניעת כניסת ריח', text_en: 'Seal around elbow to prevent odor entry' },
          { text: 'התקנת צינור שרשורי (לפני קונסטרוקציה)', text_en: 'Install flex duct (before framing)' },
          { text: 'התקנת הונטה (מיקום ע"פ מגבלות מרחק מנקודת מים)', text_en: 'Install vent (per distance constraints from water point)' },
        ],
      },
      {
        title: 'דגשים', title_en: 'Key Points', icon: 'AlertTriangle',
        items: [
          { text: 'מיקום המאייד והמרכזיה - איפשור יציאת כל הצינורות השרשוריים + מקום לאוויר חוזר', text_en: 'Evaporator/unit location - enable all flex duct exits + return air space' },
          { text: 'איפשור אוויר חוזר - לכל אורך מערכת המיזוג', text_en: 'Enable return air along entire HVAC system' },
          { text: 'מיקום המעבה - קרבה לרפפה', text_en: 'Condenser location - proximity to louver' },
          { text: 'מניעת כיפופים של הצנרת השרשורית ע"י תכנון נכון ושימוש בפרט שינוי זווית', text_en: 'Prevent flex duct bending through proper planning and angle change detail' },
          { text: 'מערכת גז - ללא חיבור בהלחמות, כיפוף באמצעות מכונה בלבד', text_en: 'Gas system - no soldered connections, bending by machine only' },
          { text: 'מרחק קופסת חשמל מאמבטיה - מינימום 60 ס"מ', text_en: 'Electrical box distance from bathtub - min 60 cm' },
          { text: 'התקנת כל המסגרות בשלב הבניה (מניעת חציבות/סדקים/לכלוך)', text_en: 'Install all frames during construction (prevent chasing/cracks/dirt)' },
        ],
      },
      {
        title: 'כשלים', title_en: 'Common Failures', icon: 'XCircle',
        items: [
          { text: 'נזילות עקב אי ביצוע שיפוע לניקוז מאייד ועקב צינור שרשורי ארוך (מותר עד 20 ס"מ)', text_en: 'Leaks due to missing evaporator drain slope and too-long flex duct (max 20 cm)' },
          { text: 'חציבות מיותרות עקב חוסר הכנה בשלב הבניה', text_en: 'Unnecessary chasing due to lack of preparation during construction' },
          { text: 'אי הצבת בולם גומי בחיבור מאייד לתקרה ותחת רגלי המעבה (כשל אקוסטי)', text_en: 'Missing rubber dampener at evaporator-ceiling and under condenser feet (acoustic failure)' },
          { text: 'הידוק וכיפוף צנרת שרשורית (מניעת זרימת אוויר תקינה) - תרשים 4', text_en: 'Tightening/bending flex duct (prevents proper airflow) - Diagram 4' },
          { text: 'הידוק מופרז של צנרת הגז (היווצרות רטיבות בנקודת ההידוק)', text_en: 'Excessive gas pipe tightening (condensation at tightening point)' },
          { text: 'נזילות מהמעבה עקב הזזת המעבה לאחר ההתקנה', text_en: 'Condenser leaks due to moving after installation' },
          { text: 'אי איפשור אוויר חוזר - תרשים 7', text_en: 'Not enabling return air - Diagram 7' },
        ],
      },
      {
        title: 'בקרות', title_en: 'Inspections', icon: 'Search',
        items: [
          { text: 'מנ"ע - שוטף', text_en: 'Site manager - ongoing' },
          { text: 'מנב"צ - פעם בקומה', text_en: 'Execution engineer - once per floor' },
          { text: 'יועץ מיזוג - בסיום קומה הנדסית', text_en: 'HVAC consultant - at engineering floor completion' },
          { text: 'יועץ אקוסטיקה - בסיום קומה הנדסית', text_en: 'Acoustics consultant - at engineering floor completion' },
          { text: 'יועץ מערכות - בסיום קומה הנדסית', text_en: 'Systems consultant - at engineering floor completion' },
          { text: 'בקר איכות - ע"פ מטריצה', text_en: 'QC inspector - per matrix' },
          { text: 'לפני מסירה - בדיקת שמישות ע"פ נוהל חברה', text_en: 'Before handover - usability check per company procedure' },
          { text: 'פיקוח עליון אל מול יועץ מ"א וספק לאחר סיום כל שלב', text_en: 'Senior supervision with HVAC consultant and supplier after each stage' },
        ],
      },
      {
        title: 'בטיחות', title_en: 'Safety', icon: 'Shield',
        items: [
          { text: 'בטיחות כללית לעבודה', text_en: 'General work safety guidelines' },
        ],
      },
    ],
  },

  {
    name: 'חיפוי אבן חוץ',
    name_en: 'Exterior Stone Cladding',
    desc_text: 'אבן, עוגנים, תבניות, יציקה',
    desc_en: 'Stone, anchors, formwork, casting',
    icon: 'wall',
    color: '#92400E',
    sections: [
      {
        title: 'לפני ביצוע', title_en: 'Before Execution', icon: 'ClipboardCheck',
        items: [
          { text: 'פתיחות מלאכה אל מול ספק/יועץ אבן/אדריכל. אישור אריחי אבן לשימוש, הגדרת שיטת עבודה', text_en: 'Open work order with supplier/stone consultant/architect. Approve stone tiles, define work method' },
          { text: 'קביעת חלוקת האבן', text_en: 'Determine stone layout division' },
          { text: 'בחירת ואישור סוג האבן', text_en: 'Select and approve stone type' },
          { text: 'קבלת הנחיות מהקונסטרוקטור לגבי סכמות האבנים בהתאם לבדיקות האבן', text_en: 'Receive structural engineer guidelines on stone schemes based on stone tests' },
          { text: 'הכנת תיק אבן - פרטי עיגון, אישור קונסטרוקטור למיקום עוגנים', text_en: 'Prepare stone file - anchor details, structural engineer approval for anchor locations' },
          { text: 'אישור תיק אבן ע"י קונסטרוקטור', text_en: 'Stone file approval by structural engineer' },
          { text: 'ביצוע בדיקות של האבן (לפי פרק 4 בתיק אבן)', text_en: 'Perform stone tests (per chapter 4 in stone file)' },
          { text: 'הזמנת וקבלת האבן', text_en: 'Order and receive stone' },
          { text: 'הדפסת תכניות וטפסי בקרה', text_en: 'Print plans and inspection forms' },
        ],
      },
      {
        title: 'שלבי ביצוע', title_en: 'Execution Steps', icon: 'Hammer',
        items: [
          { text: 'לפני הנפת התבנית:', text_en: 'Before formwork lifting:' },
          { text: 'בדיקה ומיון האבנים בתחנת אבן (גוון + איכות)', text_en: 'Inspect and sort stones at stone station (shade + quality)' },
          { text: 'חירוץ וקדיחת חורים - ע"פ תכנית (אבן גרנית מגיעה לאתר עם חורים)', text_en: 'Chasing and drilling holes per plan (granite arrives pre-drilled)' },
          { text: 'נקיון הפוגות בתבנית ע"י חלב תבניות', text_en: 'Clean formwork joints with form release agent' },
          { text: 'חיבור עוגנים ע"י סיליקון ניטראלי (SOUDAL)', text_en: 'Connect anchors with neutral silicone (SOUDAL)' },
          { text: 'הצבת האבנים בתבנית (+ שימוש בפוגות פלסטיק)', text_en: 'Place stones in formwork (+ plastic spacers)' },
          { text: 'מריחת מרק בפוגה שבין שורות האבנים (למניעת נזילת בטון)', text_en: 'Apply paste in joints between stone rows (prevent concrete leakage)' },
          { text: 'הצמדת וקשירת ברזל והצבת ספייסרים', text_en: 'Attach and tie rebar and place spacers' },
          { text: 'שטיפת גב אבנים לפני הנפת התבנית ליציקה', text_en: 'Wash stone backs before lifting formwork for casting' },
          { text: 'לאחר הנפת התבנית:', text_en: 'After formwork lifting:' },
          { text: 'חיתוך ברזל לטובת חורי דיוידג', text_en: 'Cut rebar for Davidag holes' },
          { text: 'הצבת מרירון + קונוס (קונוס רק כלפי פנים ולא כלפי האבן)', text_en: 'Place Meriron + cone (cone inward only, not toward stone)' },
          { text: 'בדיקה חוזרת של עוגנים, ספייסרים ואיכות האבן', text_en: 'Re-inspect anchors, spacers and stone quality' },
          { text: 'תיק אבן - ניהול שוטף. מעקב חתום על בדיקת תבניות', text_en: 'Stone file - ongoing management. Signed formwork inspection tracking' },
          { text: 'תיק אבן - ניהול מעקב החלפות אבן וסימון ע"ג תכנית קומה טיפוסית', text_en: 'Stone file - track stone replacements and mark on typical floor plan' },
        ],
      },
      {
        title: 'רשימת מערכות וחומרים', title_en: 'Systems & Materials', icon: 'Package',
        items: [
          { text: 'תבניות', text_en: 'Formwork' },
          { text: 'מכונת חיתוך וקדיחת אבן', text_en: 'Stone cutting and drilling machine' },
          { text: 'עוגנים (ווי נירוסטה)', text_en: 'Anchors (stainless steel hooks)' },
          { text: 'סיליקון ניטראלי (SOUDAL)', text_en: 'Neutral silicone (SOUDAL)' },
          { text: 'מרירון + קונוסים', text_en: 'Meriron + cones' },
          { text: 'ספייסרים', text_en: 'Spacers' },
          { text: 'רשת ברזל וחוטי קשירה (נירוסטה)', text_en: 'Steel mesh and tie wire (stainless steel)' },
        ],
      },
      {
        title: 'דגשים', title_en: 'Key Points', icon: 'AlertTriangle',
        items: [
          { text: 'איכות וגוון האבן', text_en: 'Stone quality and shade' },
          { text: 'חירוץ - מינימום 6 ס"מ מקצה + עומק קידוח + 8 מ"מ מינימום עובי אבן בין החור לצד הבטון', text_en: 'Chasing - min 6 cm from edge + drilling depth + 8 mm min stone thickness between hole and concrete side' },
          { text: 'חירוץ - צד החירוץ (צדדים/עליון/תחתון) בהתאם למיקום האבן בתבנית', text_en: 'Chasing side (sides/top/bottom) per stone position in formwork' },
          { text: 'עד 60 ס"מ אורך אבן (מעל 60 ס"מ - תוספת עוגנים ע"פ קונסטרוקטור)', text_en: 'Up to 60 cm stone length (above 60 cm - additional anchors per structural engineer)' },
          { text: 'חיבור עוגנים - כיסוי מלא של ווי הנירוסטה', text_en: 'Anchor connection - full coverage of stainless steel hooks' },
          { text: 'ארבעה עוגנים לכל אבן (לפחות)', text_en: 'Four anchors per stone (minimum)' },
          { text: 'עוגנים בשורה עליונה - דגש על 45 מעלות', text_en: 'Top row anchors - emphasis on 45 degree angle' },
          { text: 'ללא מגע בין ברזל לאבן (בדגש על אבן בגליפ)', text_en: 'No rebar-to-stone contact (emphasis on recessed stone)' },
          { text: 'ספייסרים - לפחות 3 בדירוג (אם 2 - חובה באלכסון) + בקרה לאחר הצבת תבנית', text_en: 'Spacers - min 3 staggered (if 2 - must be diagonal) + inspect after formwork' },
          { text: 'ללא קונוסים במרירון בצד הפונה לאבן', text_en: 'No cones in Meriron on stone-facing side' },
          { text: 'ניקוי ברזלים מרצפת התבנית', text_en: 'Clean rebar from formwork floor' },
        ],
      },
      {
        title: 'כשלים', title_en: 'Common Failures', icon: 'XCircle',
        items: [
          { text: 'איכות האבן - שכבות חרסית ונימים לאורך האבן', text_en: 'Stone quality - clay layers and veins along stone' },
          { text: 'נקיון תבנית לפני הנחת אבן (חלודה)', text_en: 'Formwork cleaning before stone placement (rust)' },
          { text: 'חירוץ קרוב לקצה (מינימום 6 ס"מ מקצה)', text_en: 'Chasing too close to edge (min 6 cm)' },
          { text: 'שבירת אבן בנקודת העוגן', text_en: 'Stone breaking at anchor point' },
          { text: 'מיקום עוגנים שגוי (צדדים/למעלה/למטה)', text_en: 'Incorrect anchor placement' },
          { text: 'איכות הדבקת עוגנים - יישום לא נכון של הסיליקון', text_en: 'Anchor bonding quality - incorrect silicone application' },
          { text: 'ספייסרים - מיקום לא נכון, כמות קטנה, נפילה לאחר הצבת תבנית', text_en: 'Spacers - wrong position, insufficient quantity, falling after formwork' },
          { text: 'אי שטיפת התבנית לפני הנפה', text_en: 'Not washing formwork before lifting' },
          { text: 'מגע בין ברזל לאבן', text_en: 'Contact between rebar and stone' },
          { text: 'השארת ברזלים על רצפת הבטון (חיתוך לדיוידג)', text_en: 'Leaving rebar on concrete floor' },
          { text: 'הנחת קונוס מרירון לכיוון האבן', text_en: 'Placing Meriron cone toward stone' },
        ],
      },
      {
        title: 'בקרות', title_en: 'Inspections', icon: 'Search',
        items: [
          { text: 'בדיקות מעבדה - החלטה על אבן, בדיקת תכונות האבן', text_en: 'Lab tests - stone selection, stone property testing' },
          { text: 'בדיקות מעבדה - בדיקת שליפה לחיפוי חיצוני', text_en: 'Lab tests - pull-out test for exterior cladding' },
          { text: 'בדיקות מעבדה - חוזק עוגנים', text_en: 'Lab tests - anchor strength' },
          { text: 'בדיקות מעבדה - בדיקת שליפה של אבנים בעיגון מכאני', text_en: 'Lab tests - pull-out test of mechanically anchored stones' },
          { text: 'בקרת קונסטרוקטור - לפני סגירת תבנית ראשונה', text_en: 'Structural engineer - before closing first formwork' },
          { text: 'בקרת מנהל עבודה - כל תבנית. תיעוד בתיק אבן ודיווח שבועי', text_en: 'Site manager - every formwork. Documentation in stone file and weekly report' },
          { text: 'בקרת מהנדס הביצוע - פעם בקומה', text_en: 'Execution engineer - once per floor' },
          { text: 'פיקוח עליון - מול אדריכל/ספק/יועץ אבן עפ"י מטריצות', text_en: 'Senior supervision with architect/supplier/stone consultant per matrices' },
        ],
      },
      {
        title: 'בטיחות', title_en: 'Safety', icon: 'Shield',
        items: [
          { text: 'דגשי בטיחות כלליים', text_en: 'General safety guidelines' },
        ],
      },
    ],
  },
]

async function seed() {
  console.log('מתחיל הזנת 7 מלאכות חדשות...')

  // שליפת order הבא
  const { data: existing } = await supabase
    .from('trades')
    .select('order')
    .order('order', { ascending: false })
    .limit(1)
  let nextOrder = existing && existing.length > 0 ? existing[0].order + 1 : 0

  for (const trade of newTrades) {
    console.log(`\n--- מוסיף מלאכה: ${trade.name} ---`)

    // יצירת המלאכה
    const { data: tradeRow, error: tradeErr } = await supabase
      .from('trades')
      .insert({
        name: trade.name,
        name_en: trade.name_en,
        desc_text: trade.desc_text,
        desc_en: trade.desc_en,
        icon: trade.icon,
        color: trade.color,
        order: nextOrder++,
      })
      .select()
      .single()

    if (tradeErr) {
      console.error(`שגיאה ביצירת מלאכה ${trade.name}:`, tradeErr)
      continue
    }
    console.log(`  מלאכה נוצרה: ${tradeRow.id}`)

    // יצירת סקשנים + פריטים
    for (let si = 0; si < trade.sections.length; si++) {
      const section = trade.sections[si]

      const { data: sectionRow, error: secErr } = await supabase
        .from('sections')
        .insert({
          trade_id: tradeRow.id,
          title: section.title,
          title_en: section.title_en,
          icon: section.icon,
          order: si,
        })
        .select()
        .single()

      if (secErr) {
        console.error(`  שגיאה בסקשן ${section.title}:`, secErr)
        continue
      }
      console.log(`  סקשן: ${section.title} (${section.items.length} פריטים)`)

      // יצירת פריטים בבאצ'ים
      const itemRows = section.items.map((item, ii) => ({
        section_id: sectionRow.id,
        text: item.text,
        text_en: item.text_en,
        order: ii,
      }))

      const { error: itemErr } = await supabase
        .from('items')
        .insert(itemRows)

      if (itemErr) {
        console.error(`  שגיאה בפריטים של ${section.title}:`, itemErr)
      }
    }
  }

  console.log('\n=== הזנה הושלמה! ===')
}

seed().catch(console.error)
