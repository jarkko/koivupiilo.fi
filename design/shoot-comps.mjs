// Comp shots: first viewport + full page, 1440 and 390, light and dark.
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const { chromium } = createRequire('/Users/jarkko/code/postiz-app/node_modules/')('playwright');
const here = dirname(fileURLToPath(import.meta.url)), out = join(here, 'out'), shots = join(here, 'shots', 'comps');
mkdirSync(shots, { recursive: true });
const types = { '.html': 'text/html', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };
const srv = createServer((q, r) => { let p = join(out, decodeURIComponent(q.url.split('?')[0])); if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html'); if (!existsSync(p)) { r.writeHead(404); return r.end(); } r.writeHead(200, { 'content-type': types[extname(p)] || 'application/octet-stream' }); r.end(readFileSync(p)); }).listen(4789);
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
for (const c of (process.argv[2]||'a,b,c,d').split(',')) for (const s of ['light', 'dark']) for (const [w, h] of [[1440, 900], [390, 844]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: s, deviceScaleFactor: 2 }); const p = await ctx.newPage();
  await p.goto(`http://localhost:4789/comps/${c}.html`, { waitUntil: 'networkidle' }); await p.waitForTimeout(3000);
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (ov > 0) console.log(`overflow ${c} ${w} ${s}: ${ov}px`);
  await p.screenshot({ path: join(shots, `${c}-${w}-${s}.png`) });
  await p.screenshot({ path: join(shots, `${c}-${w}-${s}-full.png`), fullPage: true });
  await ctx.close();
}
await b.close(); srv.close(); console.log('done');
