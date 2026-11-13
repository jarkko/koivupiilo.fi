// Site shots and layout checks on the production build in output/.
// Usage: BRIDGETOWN_ENV=production bundle exec rake deploy && node design/shoot-site.mjs [--quick]
// Writes design/shots/site/<page>-<lang>-<width>-<scheme>.png (full page) and prints findings:
// horizontal overflow, failed requests, third-party requests, small tap targets (phone), console errors.
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const { chromium } = createRequire('/Users/jarkko/code/postiz-app/node_modules/')('playwright');
const here = dirname(fileURLToPath(import.meta.url)), out = join(here, '..', 'output'), shots = join(here, 'shots', 'site');
mkdirSync(shots, { recursive: true });
const PORT = 4791, origin = `http://localhost:${PORT}`;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };
const srv = createServer((q, r) => {
  let p = join(out, decodeURIComponent(q.url.split('?')[0]));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
  if (!existsSync(p)) { r.writeHead(404, { 'content-type': types['.html'] }); return r.end(readFileSync(join(out, '404.html'))); }
  r.writeHead(200, { 'content-type': types[extname(p)] || 'application/octet-stream' }); r.end(readFileSync(p));
}).listen(PORT);
export const pages = [
  ['front', '/', '/en/'], ['work', '/tyot/', '/en/work/'], ['studio', '/studio/', '/en/studio/'],
  ['coaching', '/valmennus/', '/en/coaching/'], ['company', '/yritys/', '/en/company/'], ['privacy', '/tietosuoja/', '/en/privacy/'],
  ['404', '/ei-ole/sivua/', null],
];
const sizes = [[390, 844], [1440, 900]];
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
let findings = 0;
const say = (m) => { findings++; console.log(m); };
const check = async (name, url, w, h, scheme, opts = {}) => {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, deviceScaleFactor: opts.dpr ?? 1, reducedMotion: 'reduce' });
  const p = await ctx.newPage();
  p.on('response', (r) => { if (r.status() >= 400 && !(name.startsWith('404') && r.url() === origin + url)) say(`failed ${name}: ${r.status()} ${r.url()}`); });
  p.on('request', (r) => { if (!r.url().startsWith(origin) && !r.url().startsWith('data:')) say(`third party ${name}: ${r.url()}`); });
  p.on('console', (m) => { if (m.type() === 'error' && !(name.startsWith('404') && /404/.test(m.text()))) say(`console ${name}: ${m.text()}`); });
  await p.goto(origin + url, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const r = await p.evaluate(() => {
    const d = document.documentElement, over = d.scrollWidth - d.clientWidth, small = [], clipped = [];
    for (const a of document.querySelectorAll('a, button')) {
      const cs = getComputedStyle(a), inline = cs.display === 'inline' && [...a.parentNode.childNodes].some((n) => n.nodeType === 3 && n.data.trim() !== '');
      if (inline) continue;
      const box = a.getBoundingClientRect(), before = getComputedStyle(a, '::before');
      let bw = box.width, bh = box.height;
      if (before.content !== 'none' && before.position === 'absolute') { const host = a.closest('div'); const hb = host.getBoundingClientRect(); bw = Math.max(bw, hb.width); bh = Math.max(bh, hb.height); }
      if (bw < 44 || bh < 44) small.push(`${a.textContent.trim().slice(0, 30)} ${Math.round(bw)}x${Math.round(bh)}`);
    }
    for (const e of document.querySelectorAll('h1, h2, h3, p, li, dd, dt, a')) {
      const box = e.getBoundingClientRect();
      if (box.right > d.clientWidth + 0.5 || box.left < -0.5) clipped.push(`${e.tagName} ${e.textContent.trim().slice(0, 30)}`);
      if (e.scrollWidth > e.clientWidth + 1 && getComputedStyle(e).display !== 'inline') clipped.push(`${e.tagName} scrolls ${e.textContent.trim().slice(0, 30)}`);
    }
    return { over, small, clipped };
  });
  if (r.over > 0) say(`overflow ${name}: ${r.over}px`);
  if (w < 700 && r.small.length) say(`tap targets ${name}: ${r.small.join(' | ')}`);
  if (r.clipped.length) say(`clipped ${name}: ${r.clipped.join(' | ')}`);
  await p.screenshot({ path: join(shots, `${name}.png`), fullPage: !opts.viewportOnly });
  await ctx.close();
};
const quick = process.argv.includes('--quick');
for (const [id, fi, en] of pages) for (const [lang, url] of [['fi', fi], ['en', en]]) {
  if (!url) continue;
  for (const [w, h] of sizes) for (const scheme of ['light', 'dark']) {
    if (quick && (scheme === 'dark') !== (w === 390)) continue;
    await check(`${id}-${lang}-${w}-${scheme}`, url, w, h, scheme);
  }
  // 320 px wide, and 200 % zoom on a 1280 px desktop (a 640 px layout viewport).
  await check(`${id}-${lang}-320-light`, url, 320, 640, 'light');
  await check(`${id}-${lang}-zoom200-light`, url, 640, 450, 'light', { dpr: 2 });
}
await b.close(); srv.close();
console.log(findings === 0 ? 'no findings' : `${findings} findings`);
