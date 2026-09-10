/**
 * 회사 사이트나 앱스토어 화면을 갈무리한다.
 *
 *   node scripts/shot.mjs <url> <저장이름> [full|fold] [폭] [높이]
 *
 *   node scripts/shot.mjs https://example.com doctronic_home fold
 *   node scripts/shot.mjs https://apps.apple.com/us/app/x/id123 doctronic_ios full 430 900
 *
 * 저장 위치: assets/companies/<저장이름>.png
 * 사용자의 크롬을 건드리지 않도록 playwright 번들 크로미움만 쓴다.
 */
import { chromium } from '/Users/gravitylabs/dev/tracer/node_modules/playwright/index.mjs'
import { mkdirSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const OUTDIR = resolve(HERE, '..', 'assets', 'companies')

const [url, name, mode = 'fold', w = '1280', h = '900'] = process.argv.slice(2)
if (!url || !name) {
  console.error('사용법: node scripts/shot.mjs <url> <저장이름> [full|fold] [폭] [높이]')
  process.exit(1)
}
if (!existsSync(OUTDIR)) mkdirSync(OUTDIR, { recursive: true })

const out = resolve(OUTDIR, `${name}.png`)
const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: +w, height: +h },
  deviceScaleFactor: 2,
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
  locale: 'en-US',
})
const page = await ctx.newPage()
try {
  const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 })
  await page.waitForTimeout(2500)
  // 쿠키 안내와 팝업이 화면을 가리는 일이 잦아 흔한 버튼을 눌러 둔다.
  for (const label of ['Accept all', 'Accept All', 'Accept', 'I agree', 'Got it', 'Close', 'Allow all']) {
    const b = page.getByRole('button', { name: label }).first()
    if (await b.count().catch(() => 0)) {
      await b.click({ timeout: 2000 }).catch(() => {})
      await page.waitForTimeout(500)
      break
    }
  }
  await page.screenshot({ path: out, fullPage: mode === 'full' })
  const title = await page.title().catch(() => '')
  console.log(JSON.stringify({ ok: true, status: res ? res.status() : null, title, file: out }))
} catch (e) {
  console.log(JSON.stringify({ ok: false, error: String(e).slice(0, 200), url }))
  process.exitCode = 2
} finally {
  await browser.close()
}
