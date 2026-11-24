// Shots and checks for the Ratametsuri landing directions.
// Each direction folder holds a self-contained index.html (fi) and en.html with a <main> and a .beta section.
// Usage: node design/shoot-ratametsuri.mjs d e f   (default: d e f, the round 2 directions)
//
// Matrix per direction: fi/en x 390/1440 x light/dark x normal/largest text (Chrome's "Very large", 24 px),
// every form state at 390 and 1440 (?state=), the real request flow with the prototype's mock endpoint
// (?mock=ok|fail&delay=ms: invalid address, slow send, success, failure), and frame strips of the arrival
// motion and the send transition. Output: design/shots/ratametsuri/ (gitignored).
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const { chromium } = createRequire('/Users/jarkko/code/postiz-app/node_modules/')('playwright');
const here = dirname(fileURLToPath(import.meta.url)), base = join(here, 'directions', 'ratametsuri'), shots = join(here, 'shots', 'ratametsuri');
mkdirSync(shots, { recursive: true });
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif' };
const srv = createServer((q, r) => {
  const p = join(base, decodeURIComponent(q.url.split('?')[0]));
  if (!existsSync(p) || statSync(p).isDirectory()) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { 'content-type': types[extname(p)] || 'application/octet-stream' }); r.end(readFileSync(p));
}).listen(0); // a free port, so several directions can be shot at once
await new Promise((ok) => srv.once('listening', ok));
const origin = `http://localhost:${srv.address().port}`;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const b = await chromium.launch({ executablePath: CHROME });
const states = ['default', 'sending', 'success', 'error-validation', 'error-server', 'not-live'];
const LONG = 'marja-liisa.korhonen-virtanen@suunnistusseura-esimerkki.example.fi';
const failures = [];
let n = 0;

// A browser whose default font size is Chrome's largest preset, like a visitor who set "Very large" text.
const xlDir = mkdtempSync(join(tmpdir(), 'rm-xl-'));
mkdirSync(join(xlDir, 'Default'));
writeFileSync(join(xlDir, 'Default', 'Preferences'), JSON.stringify({ webkit: { webprefs: { default_font_size: 24 } } }));

const url = (d, lang, q = '') => `${origin}/${d}/${lang === 'fi' ? 'index' : 'en'}.html${q}`;
const watch = (p, bad) => {
  p.on('console', (m) => m.type() === 'error' && bad.push('console: ' + m.text()));
  p.on('pageerror', (e) => bad.push('pageerror: ' + e.message));
  p.on('requestfailed', (r) => bad.push('failed: ' + r.url()));
  p.on('response', (r) => r.status() >= 400 && bad.push(r.status() + ' ' + r.url()));
  p.on('request', (r) => { if (!r.url().startsWith(origin) && !r.url().startsWith('data:')) bad.push('third-party: ' + r.url()); });
};
const measure = (p) => p.evaluate(() => {
  const de = document.documentElement, small = [];
  for (const e of document.querySelectorAll('main a, main button, main input[type=email], footer a')) {
    const r = e.getBoundingClientRect();
    if (r.width && r.height && (r.height < 23.5 || r.width < 23.5) && !e.closest('.hp')) small.push(`${e.tagName}.${e.className}:${Math.round(r.width)}x${Math.round(r.height)}`);
  }
  const beta = document.querySelector('.beta'), field = document.querySelector('.beta input[type=email]');
  const br = beta.getBoundingClientRect(), fr = field ? field.getBoundingClientRect() : null;
  return { over: de.scrollWidth - de.clientWidth, small, betaH: Math.round(br.height), fieldY: fr ? Math.round(fr.bottom + scrollY) : null, fold: innerHeight };
});
const record = (name, info, bad) => {
  n++;
  if (info.over > 0) failures.push(`${name}: horizontal overflow ${info.over}px`);
  if (bad.length) failures.push(`${name}: ${bad.join(' | ')}`);
  console.log(name, JSON.stringify(info), bad.length ? bad.join(' | ') : '');
};

const run = async (d, lang, w, h, scheme, { state = null, xl = false } = {}) => {
  const opts = { viewport: { width: w, height: h }, colorScheme: scheme, reducedMotion: 'reduce' };
  const ctx = xl ? await chromium.launchPersistentContext(xlDir, { ...opts, executablePath: CHROME }) : await b.newContext(opts);
  const p = ctx.pages()[0] || await ctx.newPage();
  const bad = [];
  watch(p, bad);
  const q = state ? `?state=${state}${state === 'error-validation' || state === 'error-server' ? '&email=' + LONG : ''}` : '';
  await p.goto(url(d, lang, q), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const info = await measure(p);
  const name = `${d}-${lang}-${w}-${scheme}${xl ? '-xl' : ''}${state ? '-' + state : ''}`;
  await p.screenshot({ path: join(shots, name + '.png'), fullPage: true });
  record(name, info, bad);
  await ctx.close();
  return info;
};

// Lay frames side by side in one image.
const strip = async (name, frames, w) => {
  const pg = await b.newPage({ viewport: { width: 1600, height: 400 } });
  const cell = Math.floor(1560 / frames.length);
  await pg.setContent(`<body style="margin:0;padding:20px;background:#888;display:flex;gap:4px;font:12px system-ui">${frames.map((f) => `<figure style="margin:0;width:${cell - 4}px"><img style="width:100%;display:block" src="data:image/png;base64,${f.png.toString('base64')}"><figcaption style="color:#fff">${f.t} ms</figcaption></figure>`).join('')}</body>`);
  await pg.screenshot({ path: join(shots, name + '.png'), fullPage: true });
  await pg.close();
  n++;
  console.log(name, `${frames.length} frames at ${w}px`);
};

// The arrival motion, with motion allowed.
const arrival = async (d, w, h) => {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: 'light', reducedMotion: 'no-preference' });
  const p = await ctx.newPage();
  const t0 = Date.now(), frames = [];
  await p.goto(url(d, 'fi'), { waitUntil: 'commit' });
  for (const t of [0, 150, 300, 450, 600, 900, 1300, 2000]) {
    const wait = t - (Date.now() - t0);
    if (wait > 0) await p.waitForTimeout(wait);
    frames.push({ t, png: await p.screenshot() });
  }
  await strip(`${d}-motion-arrival-${w}`, frames, w);
  await ctx.close();
};

// The real request flow against the prototype's mock endpoint.
const flow = async (d, w, h, scheme, motion) => {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, reducedMotion: motion ? 'no-preference' : 'reduce' });
  const p = await ctx.newPage();
  const bad = [];
  watch(p, bad);
  const tag = `${d}-fi-${w}-${scheme}-flow${motion ? '-motion' : ''}`;
  const field = '.beta input[type=email]', submit = '.beta button[type=submit]';
  const stateOf = () => p.evaluate(() => document.querySelector('.beta').dataset.state);
  // 1. invalid address: the error appears, the text stays in the field
  await p.goto(url(d, 'fi', '?mock=ok&delay=2500'), { waitUntil: 'networkidle' });
  await p.fill(field, 'liisa@');
  await p.click(submit);
  await p.waitForTimeout(400);
  const s1 = await stateOf(), kept = await p.inputValue(field);
  await p.locator('.beta').screenshot({ path: join(shots, `${tag}-1-invalid.png`) });
  if (s1 !== 'error-validation' || kept !== 'liisa@') failures.push(`${tag}: invalid address gave state ${s1}, field "${kept}"`);
  // 2. a long valid address on a slow network: sending, then success
  const h0 = (await measure(p)).betaH;
  await p.fill(field, LONG);
  const frames = [];
  const t0 = Date.now();
  await p.click(submit);
  for (const t of [0, 100, 250, 1000, 2600, 2800, 3200]) {
    const wait = t - (Date.now() - t0);
    if (wait > 0) await p.waitForTimeout(wait);
    frames.push({ t, png: await p.locator('.beta').screenshot() });
  }
  const s2 = await stateOf(), h2 = (await measure(p)).betaH;
  if (s2 !== 'success') failures.push(`${tag}: slow send ended in state ${s2}`);
  if (h2 !== h0) failures.push(`${tag}: request block height ${h0} -> ${h2} (layout shift)`);
  await p.locator('.beta').screenshot({ path: join(shots, `${tag}-2-success.png`) });
  if (motion) await strip(`${tag}-send-strip`, frames, w);
  // 3. the server fails
  await p.goto(url(d, 'fi', '?mock=fail&delay=800'), { waitUntil: 'networkidle' });
  await p.fill(field, LONG);
  await p.click(submit);
  await p.waitForTimeout(1300);
  const s3 = await stateOf();
  if (s3 !== 'error-server') failures.push(`${tag}: failed send ended in state ${s3}`);
  await p.locator('.beta').screenshot({ path: join(shots, `${tag}-3-server-error.png`) });
  // 4. no endpoint (the shipped state until the sign-up service exists): not live, never a fake success
  await p.goto(url(d, 'fi'), { waitUntil: 'networkidle' });
  await p.fill(field, LONG);
  await p.click(submit);
  await p.waitForTimeout(500);
  const s4 = await stateOf();
  if (s4 !== 'not-live') failures.push(`${tag}: no endpoint ended in state ${s4}`);
  await p.locator('.beta').screenshot({ path: join(shots, `${tag}-4-not-live.png`) });
  n += 4;
  console.log(tag, s1, s2, s3, s4, bad.length ? bad.join(' | ') : '');
  if (bad.length) failures.push(`${tag}: ${bad.join(' | ')}`);
  await ctx.close();
};

const dirs = process.argv.slice(2).length ? process.argv.slice(2) : ['d', 'e', 'f'];
for (const d of dirs) {
  for (const lang of ['fi', 'en']) for (const [w, h] of [[390, 844], [1440, 900]]) for (const s of ['light', 'dark']) {
    const i = await run(d, lang, w, h, s);
    if (w === 1440 && i.fieldY > i.fold) failures.push(`${d}-${lang}-1440-${s}: the email field ends at ${i.fieldY}px, below the 900px fold`);
    await run(d, lang, w, h, s, { xl: true });
  }
  for (const [w, h] of [[390, 844], [1440, 900]]) {
    const hs = new Set();
    for (const st of states) hs.add((await run(d, 'fi', w, h, 'light', { state: st })).betaH);
    if (hs.size > 1) failures.push(`${d}: request block height changes across states at ${w}px: ${[...hs].join(', ')}`);
    console.log(d, `beta heights across states (${w}):`, [...hs].join(', '), hs.size === 1 ? 'NO SHIFT' : 'SHIFT');
  }
  await flow(d, 390, 844, 'light', true);
  await flow(d, 390, 844, 'dark', false);
  await flow(d, 1440, 900, 'light', false);
  await arrival(d, 1440, 900);
  await arrival(d, 390, 844);
}
await b.close(); srv.close(); rmSync(xlDir, { recursive: true, force: true });
console.log(n, 'shots');
if (failures.length) { console.log(`\n${failures.length} FAILURES:\n- ` + failures.join('\n- ')); process.exit(1); }
console.log('all checks passed');
