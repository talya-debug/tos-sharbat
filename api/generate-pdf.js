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

    const pdf = await page.pdf({
      format: 'A4',
      margin: { top: '8mm', bottom: '12mm', left: '12mm', right: '14mm' },
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate: '<div style="font-size:9px;color:#94a3b8;width:100%;text-align:center;padding-top:2px;direction:rtl;"><span style="border-top:1px solid #1e3a5f;padding-top:3px;display:inline-block;">הופק על ידי מערכת TOS</span></div>',
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
