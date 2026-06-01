// סקריפט תרגום מלאכות לרוסית וערבית
// לא להריץ עד אישור! רק תשתית.
//
// שלבים:
// 1. להריץ את add-language-columns.sql ב-Supabase Dashboard
// 2. להגדיר OPENAI_API_KEY (או כל API תרגום אחר)
// 3. להריץ: node src/scripts/translate-trades.js
//
// הסקריפט:
// - שולף את כל ה-trades, sections, items מ-Supabase
// - מתרגם את text_en לרוסית ולערבית דרך API
// - מעדכן את העמודות החדשות ב-DB
//
// הערה: אפשר גם לתרגם ידנית — פשוט למלא את העמודות ב-Supabase Dashboard

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://jlbdamuvpflnkzsyxqme.supabase.co',
  'sb_publishable_dz8BVVZAJDewYYaGzLQD5A_-83Pf7f4'
)

// --- פונקציית תרגום (להחליף ב-API אמיתי) ---
async function translate(text, targetLang) {
  // דוגמה עם OpenAI:
  // const response = await fetch('https://api.openai.com/v1/chat/completions', {
  //   method: 'POST',
  //   headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     model: 'gpt-4o-mini',
  //     messages: [
  //       { role: 'system', content: `Translate the following construction/engineering term to ${targetLang}. Return only the translation, nothing else.` },
  //       { role: 'user', content: text }
  //     ],
  //     temperature: 0.1
  //   })
  // })
  // const data = await response.json()
  // return data.choices[0].message.content.trim()

  throw new Error('API תרגום לא מוגדר — יש להגדיר לפני הרצה')
}

async function main() {
  console.log('שולף נתונים...')

  // trades
  const { data: trades } = await supabase.from('trades').select('id, name, name_en')
  console.log(`${trades.length} מלאכות`)

  for (const trade of trades) {
    if (!trade.name_en) continue
    const ru = await translate(trade.name_en, 'Russian')
    const ar = await translate(trade.name_en, 'Arabic')
    await supabase.from('trades').update({ name_ru: ru, name_ar: ar }).eq('id', trade.id)
    console.log(`  מלאכה: ${trade.name} → RU: ${ru} | AR: ${ar}`)
  }

  // sections
  const { data: sections } = await supabase.from('sections').select('id, title, title_en')
  console.log(`${sections.length} סקשנים`)

  for (const sec of sections) {
    if (!sec.title_en) continue
    const ru = await translate(sec.title_en, 'Russian')
    const ar = await translate(sec.title_en, 'Arabic')
    await supabase.from('sections').update({ title_ru: ru, title_ar: ar }).eq('id', sec.id)
    console.log(`  סקשן: ${sec.title} → RU: ${ru} | AR: ${ar}`)
  }

  // items (בבאצ'ים של 50)
  const { data: items } = await supabase.from('items').select('id, text, text_en')
  console.log(`${items.length} פריטים`)

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (!item.text_en) continue
    const ru = await translate(item.text_en, 'Russian')
    const ar = await translate(item.text_en, 'Arabic')
    await supabase.from('items').update({ text_ru: ru, text_ar: ar }).eq('id', item.id)
    if ((i + 1) % 50 === 0) console.log(`  ${i + 1}/${items.length}...`)
  }

  console.log('הושלם!')
}

main().catch(console.error)
