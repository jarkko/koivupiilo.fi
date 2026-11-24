// Shots and checks for the built Ratametsuri product page (/ratametsuri/, /en/ratametsuri/).
// Usage: BRIDGETOWN_ENV=production bundle exec rake deploy && node design/shoot-ratametsuri-site.mjs
//
// Serves output/ locally. The beta is a link to launchpad's survey (join.koivupiilo.fi), so nothing
// is posted and nothing leaves the machine; the visitor counter (PR 4), if present, is blocked.
//
// Matrix: fi/en x 390/768/1440/1920 x light/dark (plus large text at 390), and the arrival motion.
// Fails on horizontal overflow, console errors, requests to any other origin, small tap targets,
// a beta link that doesn't go to the survey in the page's language, a tagline wider than its column,
// the beta link or the Mac line below the 1440 fold, and the beta link below the first phone screen.
// Output: design/shots/ratametsuri-site/ (gitignored).
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const { chromium } = createRequire('/Users/jarkko/code/postiz-app/node_modules/')('playwright');

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, '..', 'output');
const shots = join(here, 'shots', 'ratametsuri-site');
mkdirSync(shots, { recursive: true });


const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.js': 'text/javascript', '.png': 'image/png', '.webp': 'image/webp', '.ico': 'image/x-icon' };
const srv = createServer((q, r) => {
  let p = join(out, decodeURIComponent(q.url.split(/[?#]/)[0]));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
  if (!existsSync(p)) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { 'content-type': types[extname(p)] || 'application/octet-stream' }); r.end(readFileSync(p));
}).listen(0);
await new Promise((ok) => srv.once('listening', ok));
const origin = `http://localhost:${srv.address().port}`;
const JOIN = 'https://join.koivupiilo.fi';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await chromium.launch({ executablePath: CHROME });
const failures = [];
let n = 0;

// Browser profiles with a larger default text size (the reader's setting, not zoom).
const fontDirs = {};
const fontDir = (px) => {
  if (fontDirs[px]) return fontDirs[px];
  const d = mkdtempSync(join(tmpdir(), `rm-font${px}-`));
  mkdirSync(join(d, 'Default'));
  writeFileSync(join(d, 'Default', 'Preferences'), JSON.stringify({ webkit: { webprefs: { default_font_size: px } } }));
  return (fontDirs[px] = d);
};
const xlDir = fontDir(24);

const path = (lang) => (lang === 'fi' ? '/ratametsuri/' : '/en/ratametsuri/');

// The visitor counter is the one script from another origin; it stays out of the shots.
const COUNTER = 'https://umami.monitoring.koivupiilo.fi/';
const block = (ctx) => ctx.route((u) => u.href.startsWith(COUNTER), (r) => r.abort());

const watch = (p, bad) => {
  p.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource|ERR_FAILED/.test(m.text())) bad.push('console: ' + m.text()); });
  p.on('pageerror', (e) => bad.push('pageerror: ' + e.message));
  p.on('response', (r) => r.status() >= 400 && bad.push(r.status() + ' ' + r.url()));
  p.on('request', (r) => {
    const u = r.url();
    if (!u.startsWith(origin) && !u.startsWith('data:') && !u.startsWith(COUNTER)) bad.push('third-party: ' + u);
  });
};

const measure = (p) => p.evaluate(() => {
  const de = document.documentElement, small = [];
  for (const e of document.querySelectorAll('a, button, input')) {
    const r = e.getBoundingClientRect();
    if (!r.width || e.classList.contains('skip')) continue;
    if (r.height < 23.5 || r.width < 23.5) small.push(`${e.tagName}#${e.id || e.className}:${Math.round(r.width)}x${Math.round(r.height)}`);
  }
  const y = (s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { top: Math.round(r.top + scrollY), bottom: Math.round(r.bottom + scrollY) }; };
  return { over: de.scrollWidth - de.clientWidth, small, apply: y('.apply'), href: document.querySelector('.apply')?.getAttribute('href'), mac: y('.req li'), beatOver: Math.round(Math.max(...[...document.querySelectorAll('.tagline .beat')].map((b) => { const g = document.createRange(); g.selectNodeContents(b); return Math.max(...[...g.getClientRects()].map((x) => x.right)); })) - document.querySelector('.intro').getBoundingClientRect().right), fold: innerHeight, H: de.scrollHeight };
});

const record = (name, info, bad) => {
  n++;
  if (info.over > 0) failures.push(`${name}: horizontal overflow ${info.over}px`);
  if (info.small.length) failures.push(`${name}: small targets ${info.small.join(', ')}`);
  if (bad.length) failures.push(`${name}: ${bad.join(' | ')}`);
  console.log(name, JSON.stringify({ ...info, small: info.small.length || undefined }), bad.length ? bad.join(' | ') : '');
};

const SURVEY = { fi: 'https://join.koivupiilo.fi/ratametsuri/q/course-setters', en: 'https://join.koivupiilo.fi/ratametsuri/q/course-setters?lang=en' };

// 1. The page across the matrix.
for (const lang of ['fi', 'en']) for (const [w, h] of [[390, 844], [768, 1024], [1440, 900], [1920, 1080]]) for (const scheme of ['light', 'dark']) for (const xl of w === 390 ? [false, true] : [false]) {
  const opts = { viewport: { width: w, height: h }, colorScheme: scheme, reducedMotion: 'reduce' };
  const ctx = xl ? await chromium.launchPersistentContext(xlDir, { ...opts, executablePath: CHROME }) : await browser.newContext(opts);
  await block(ctx);
  const p = ctx.pages()[0] || await ctx.newPage();
  const bad = []; watch(p, bad);
  await p.goto(origin + path(lang), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const info = await measure(p);
  const name = `${lang}-${w}-${scheme}${xl ? '-xl' : ''}`;
  await p.screenshot({ path: join(shots, name + '.png'), fullPage: true });
  if (!xl) await p.screenshot({ path: join(shots, name + '-first-screen.png') });
  record(name, info, bad);
  if (info.href !== SURVEY[lang]) failures.push(`${name}: the beta link goes to ${info.href}`);
  if (!xl && [390, 1440].includes(w) && info.apply.bottom > h) failures.push(`${name}: the beta link ends at ${info.apply.bottom}, below the ${h}px ${w === 390 ? 'first screen' : 'fold'}`);
  if (info.beatOver > 0) failures.push(`${name}: the tagline runs ${info.beatOver}px past its column`);
  if (!xl && w === 1440 && info.mac.bottom > h) failures.push(`${name}: the Mac line ends at ${info.mac.bottom}, below the ${h}px fold`);
  await ctx.close();
}

// 2. The arrival motion, at both widths.
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: 'light', reducedMotion: 'no-preference' });
  await block(ctx);
  const p = await ctx.newPage();
  const bad = []; watch(p, bad);
  await p.goto(origin + path('fi'), { waitUntil: 'networkidle' });
  await p.waitForTimeout(400);
  await p.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await p.waitForTimeout(3500);
  const pre = await p.evaluate(() => document.querySelectorAll('.sym.pre').length);
  const legs = await p.evaluate(() => [...document.querySelectorAll('.legs line')].filter((l) => l.style.display !== 'none').map((l) => l.classList.contains('on')));
  // One leg between each pair of shown symbols: start, one control per feature, finish.
  const want = await p.evaluate(() => [...document.querySelectorAll('.sym[data-order]')].filter((s) => s.getClientRects().length).length - 1);
  if (pre) failures.push(`motion-${w}: ${pre} symbols still hidden after arrival`);
  if (legs.length !== want || legs.some((on) => !on)) failures.push(`motion-${w}: legs ${JSON.stringify(legs)}, expected ${want}`);
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.screenshot({ path: join(shots, `fi-${w}-light-motion-done.png`), fullPage: true });
  record(`motion-${w}`, await measure(p), bad);
  await ctx.close();
}

await browser.close(); srv.close(); for (const d of Object.values(fontDirs)) rmSync(d, { recursive: true, force: true });
console.log(n, 'shots in', shots);
if (failures.length) { console.log(`\n${failures.length} FAILURES:\n- ` + failures.join('\n- ')); process.exit(1); }
console.log('all checks passed');
