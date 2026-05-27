import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'

export const config = {
  maxDuration: 60,
  memory: 3008,
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { html } = req.body
  if (!html) {
    return res.status(400).json({ error: 'Missing html' })
  }

  let browser = null
  try {
    browser = await puppeteer.launch({
      args: [...chromium.args, '--disable-dev-shm-usage'],
      defaultViewport: { width: 794, height: 1123 },
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    })

    const page = await browser.newPage()

    // networkidle2 — מחכה לפונטים ותמונות, סלחני יותר
    await page.setContent(html, { waitUntil: 'networkidle2', timeout: 45000 })
    await page.evaluateHandle('document.fonts.ready')
    // המתנה נוספת לתמונות
    await new Promise(r => setTimeout(r, 2000))

    // לפי skill_pdf_stable: smart placement — פוטר בתחתית העמוד האחרון
    await page.evaluate(() => {
      const PAGE_H = 1123 // A4 at 96dpi
      const footer = document.getElementById('doc-footer')
      if (!footer) return
      const bodyBottom = document.body.getBoundingClientRect().bottom
      const currentPage = Math.ceil(bodyBottom / PAGE_H)
      const pageBottom = currentPage * PAGE_H
      const gap = pageBottom - bodyBottom - 30 // 30px margin from edge
      if (gap > 20) {
        footer.style.marginTop = gap + 'px'
      }
    })

    const pdf = await page.pdf({
      format: 'A4',
      margin: { top: '8mm', bottom: '10mm', left: '12mm', right: '14mm' },
      printBackground: true,
    })

    await browser.close()
    browser = null

    const pdfBuffer = Buffer.from(pdf)
    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-Length': pdfBuffer.length,
      'Content-Disposition': 'attachment; filename=trade-guide.pdf',
    })
    res.end(pdfBuffer)
  } catch (err) {
    console.error('PDF generation error:', err)
    if (browser) { try { await browser.close() } catch {} }
    res.status(500).json({ error: err.message })
  }
}
