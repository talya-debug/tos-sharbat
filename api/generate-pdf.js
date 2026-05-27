import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'

export const config = {
  maxDuration: 30,
  memory: 1024,
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
      args: chromium.args,
      defaultViewport: { width: 794, height: 1123 }, // A4 at 96dpi
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    })

    const page = await browser.newPage()

    // לפי skill_pdf_stable: waitUntil networkidle0
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 20000 })

    // המתנה נוספת לפונטים
    await page.evaluateHandle('document.fonts.ready')

    const pdf = await page.pdf({
      format: 'A4',
      margin: { top: '8mm', bottom: '8mm', left: '12mm', right: '12mm' },
      printBackground: true,
      preferCSSPageSize: false,
    })

    const pdfBuffer = Buffer.from(pdf)
    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-Length': pdfBuffer.length,
      'Content-Disposition': 'attachment; filename=trade-guide.pdf',
    })
    res.end(pdfBuffer)
  } catch (err) {
    console.error('PDF generation error:', err)
    res.status(500).json({ error: err.message })
  } finally {
    if (browser) await browser.close()
  }
}
