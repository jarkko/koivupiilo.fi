// Usability review shots: every route × 390/1440 × light/dark. Reports horizontal overflow and broken images.
// Uses Playwright borrowed read-only from another checkout + local Chrome. Output: design/shots/ (gitignored).
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire('/Users/jarkko/code/postiz-app/node_modules/');
const { chromium } = require('playwright');

const here = dirname(fileURLToPath(import.meta.url)), out = join(here, 'out'), shots = join(here, 'shots');
mkdirSync(shots, { recursive: true });
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.json': 'application/json' };
const server = createServer((req, res) => {
  let p = join(out, decodeURIComponent(req.url.split('?')[0]));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
  if (!existsSync(p)) { res.writeHead(404); return res.end('404'); }
  res.writeHead(200, { 'content-type': types[extname(p)] || 'application/octet-stream' }); res.end(readFileSync(p));
}).listen(4787);

const only = process.argv[2] ? new RegExp(process.argv[2]) : null;
const routes = JSON.parse(readFileSync(join(out, 'routes.json'))).filter((r) => !only || only.test(r));
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const problems = [];
for (const scheme of ['light', 'dark']) for (const width of [390, 1440]) {
  const ctx = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 900 }, colorScheme: scheme, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const r of routes) {
    await page.goto(`http://localhost:4787${r}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => Promise.all([...document.images].map((i) => { i.loading = 'eager'; return i.complete ? 0 : new Promise((ok) => { i.onload = i.onerror = ok; }); })));
    const info = await page.evaluate(() => ({
      sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth,
      wide: [...document.querySelectorAll('body *')].filter((e) => e.getBoundingClientRect().right > document.documentElement.clientWidth + 1 && getComputedStyle(e).position !== 'fixed').slice(0, 4).map((e) => e.tagName + '.' + e.className),
      broken: [...document.images].filter((i) => !i.naturalWidth).map((i) => i.src),
    }));
    if (info.sw > info.cw) problems.push(`${r} ${width} ${scheme}: overflow ${info.sw}>${info.cw} ${info.wide.join(' ')}`);
    if (info.broken.length) problems.push(`${r} ${width} ${scheme}: broken img ${info.broken.join(' ')}`);
    const name = `${r.replace(/^\/|\/$/g, '').replace(/\//g, '_') || 'root'}--${width}-${scheme}.png`;
    await page.screenshot({ path: join(shots, name), fullPage: true });
  }
  await ctx.close();
}
await browser.close(); server.close();
console.log(problems.length ? problems.join('\n') : 'no overflow, no broken images');
