// סקריפט העתקת דאטה מ-TOS מקור ל-TOS שרבט
const { createClient } = require('@supabase/supabase-js')

// מקור
const sourceUrl = 'https://jlbdamuvpflnkzsyxqme.supabase.co'
const sourceKey = 'sb_publishable_dz8BVVZAJDewYYaGzLQD5A_-83Pf7f4'
const source = createClient(sourceUrl, sourceKey)

// יעד — שרבט
const targetUrl = 'https://fhkxvbscudfflbewbbwo.supabase.co'
const targetServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoa3h2YnNjdWRmZmxiZXdiYndvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDQ3OTk0MiwiZXhwIjoyMDk2MDU1OTQyfQ.8fnrVrXPR3MtFM800s5dz_6D75whNvleZZtAWGYepn0'
const target = createClient(targetUrl, targetServiceKey)

async function migrate() {
  console.log('שואב מלאכות מהמקור...')
  const { data: trades, error: tradesErr } = await source
    .from('trades')
    .select('*')
    .order('order')

  if (tradesErr) { console.error('שגיאה בטעינת מלאכות:', tradesErr); return }
  console.log(`נמצאו ${trades.length} מלאכות`)

  for (const trade of trades) {
    console.log(`\nמעתיקה מלאכה: ${trade.name}`)

    // הכנסת מלאכה
    const { error: insertTradeErr } = await target
      .from('trades')
      .insert(trade)

    if (insertTradeErr) { console.error('שגיאה בהכנסת מלאכה:', insertTradeErr); continue }

    // שאיבת פרקים
    const { data: sections, error: sectionsErr } = await source
      .from('sections')
      .select('*')
      .eq('trade_id', trade.id)
      .order('order')

    if (sectionsErr) { console.error('שגיאה בטעינת פרקים:', sectionsErr); continue }
    console.log(`  ${sections.length} פרקים`)

    for (const section of sections) {
      // הכנסת פרק
      const { error: insertSectionErr } = await target
        .from('sections')
        .insert(section)

      if (insertSectionErr) { console.error('שגיאה בהכנסת פרק:', insertSectionErr); continue }

      // שאיבת שורות
      const { data: items, error: itemsErr } = await source
        .from('items')
        .select('*')
        .eq('section_id', section.id)
        .order('order')

      if (itemsErr) { console.error('שגיאה בטעינת שורות:', itemsErr); continue }
      console.log(`    ${items.length} שורות`)

      if (items.length > 0) {
        // העתקת תמונות אם יש
        for (const item of items) {
          if (item.images && item.images.length > 0) {
            const newImages = []
            for (const imageUrl of item.images) {
              try {
                // שליפת נתיב הקובץ מה-URL
                const path = imageUrl.split('/trade-images/')[1]
                if (!path) { newImages.push(imageUrl); continue }

                // הורדת התמונה מהמקור
                const { data: fileData, error: downloadErr } = await source.storage
                  .from('trade-images')
                  .download(path)

                if (downloadErr) { console.log('      שגיאה בהורדת תמונה:', downloadErr); newImages.push(imageUrl); continue }

                // העלאה ליעד
                const { error: uploadErr } = await target.storage
                  .from('trade-images')
                  .upload(path, fileData, { upsert: true })

                if (uploadErr) { console.log('      שגיאה בהעלאת תמונה:', uploadErr); newImages.push(imageUrl); continue }

                // URL חדש
                const { data: publicUrl } = target.storage
                  .from('trade-images')
                  .getPublicUrl(path)

                newImages.push(publicUrl.publicUrl)
                console.log(`      תמונה הועתקה: ${path}`)
              } catch (e) {
                console.log('      שגיאה בתמונה:', e.message)
                newImages.push(imageUrl)
              }
            }
            item.images = newImages
          }
        }

        // הכנסת שורות
        const { error: insertItemsErr } = await target
          .from('items')
          .insert(items)

        if (insertItemsErr) console.error('שגיאה בהכנסת שורות:', insertItemsErr)
      }
    }
  }

  console.log('\n--- העתקה הושלמה! ---')
}

migrate()
