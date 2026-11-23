// Shots and checks for the built Ratametsuri product page (/ratametsuri/, /en/ratametsuri/).
// Usage: BRIDGETOWN_ENV=production bundle exec rake deploy && node design/shoot-ratametsuri-site.mjs
//
// Serves output/ locally and stands in for join.koivupiilo.fi (launchpad, C1/C5) by routing it in
// the browser: /kit/form.js is launchpad's real script (LAUNCHPAD, default ~/code/launchpad), the
// token and the sign-up answer are faked per case. Nothing leaves the machine.
//
// Matrix: fi/en x 390/1440 x light/dark (plus largest text at 390), every kit/form.js answer
// (accepted, invalid email, rate limited, failed, offline, sending), the no-JS states
// (#signup-check-email, #signup-error, #signup-try-later) and the plain POST when form.js does not
// load. Fails on horizontal overflow, console errors, requests to any origin but join.koivupiilo.fi,
// a consent label that differs from launchpad's string, the field or the Mac line below the 1440
// fold, and the field below the first phone screen.
// Output: design/shots/ratametsuri-site/ (gitignored).
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, mkdirSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { tmpdir, homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const { chromium } = createRequire('/Users/jarkko/code/postiz-app/node_modules/')('playwright');

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, '..', 'output');
const shots = join(here, 'shots', 'ratametsuri-site');
const launchpad = process.env.LAUNCHPAD || join(homedir(), 'code', 'launchpad');
const formJs = readFileSync(join(launchpad, 'kit', 'form.js'), 'utf8');
mkdirSync(shots, { recursive: true });

// The consent version the page sends (src/_data/ratametsuri/fi.yml consent.version; en must match)
// and the strings launchpad hashes for it (projects/ratametsuri/locales/<lc>.yml).
const versionOf = (lc) => /^consent:\n\s+version:\s*"([^"]+)"/m.exec(readFileSync(join(here, '..', 'src', '_data', 'ratametsuri', `${lc}.yml`), 'utf8'))[1];
const VERSION = versionOf('fi');
if (versionOf('en') !== VERSION) throw new Error(`consent.version differs: fi ${VERSION}, en ${versionOf('en')}`);
const consentOf = (lc) => {
  const y = readFileSync(join(launchpad, 'projects', 'ratametsuri', 'locales', `${lc}.yml`), 'utf8');
  const m = new RegExp(`^\\s+${VERSION.replace(/[-.]/g, '\\$&')}:\\s*"(.*)"\\s*$`, 'm').exec(y);
  return m && JSON.parse(`"${m[1]}"`);
};
const CONSENT = { fi: consentOf('fi'), en: consentOf('en') };

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
const LONG = 'marja-liisa.korhonen-virtanen@suunnistusseura-esimerkki.example.fi';
const failures = [];
let n = 0;

const xlDir = mkdtempSync(join(tmpdir(), 'rm-xl-'));
mkdirSync(join(xlDir, 'Default'));
writeFileSync(join(xlDir, 'Default', 'Preferences'), JSON.stringify({ webkit: { webprefs: { default_font_size: 24 } } }));

const path = (lang) => (lang === 'fi' ? '/ratametsuri/' : '/en/ratametsuri/');

// Stand-in for launchpad. `answer` is the sign-up POST's reply: a status (202, 422, 429, 500),
// 'hang' (never answers), or 'no-js' (the 303 a plain form post gets).
const fakeJoin = async (ctx, { answer = 202, formjs = true, posts = [], delay = 0 } = {}) => {
  await ctx.route(`${JOIN}/**`, async (route) => {
    const req = route.request(), u = new URL(req.url());
    const cors = { 'access-control-allow-origin': origin, 'cache-control': 'no-store' };
    if (u.pathname === '/kit/form.js') return formjs ? route.fulfill({ status: 200, contentType: 'text/javascript', body: formJs }) : route.abort('namenotresolved');
    if (u.pathname === '/ratametsuri/signup/token') return route.fulfill({ status: 200, contentType: 'application/json', headers: cors, body: JSON.stringify({ t: 'tok-' + Date.now(), min_ms: 300 }) });
    if (u.pathname === '/ratametsuri/signup' && req.method() === 'POST') {
      posts.push({ body: Object.fromEntries([...new URLSearchParams(req.postData() || '')].map(([k], i, a) => [k, a.filter(([kk]) => kk === k).map(([, v]) => v).join(',')])), accept: req.headers().accept || '' });
      if (delay) await new Promise((r) => setTimeout(r, delay));
      if (answer === "hang") return; // never settles; form.js times out
      if (answer === "offline") return route.abort("internetdisconnected");
      if (answer === 'no-js') {
        const lang = new URLSearchParams(req.postData()).get('locale');
        return route.fulfill({ status: 303, headers: { location: `${origin}${path(lang)}#signup-check-email` } });
      }
      const body = { 202: { status: 'check_email' }, 422: { error: 'invalid_email' }, 429: { error: 'rate_limited' }, 500: { error: 'oops' } }[answer];
      return route.fulfill({ status: answer, contentType: 'application/json', headers: cors, body: JSON.stringify(body) });
    }
    return route.fulfill({ status: 404 });
  });
};

const watch = (p, bad, { allowFormJsFail = false, allowStatus = null } = {}) => {
  const expected = (t) => allowStatus && t.includes(`status of ${allowStatus}`);
  p.on('console', (m) => {
    if (m.type() !== 'error') return;
    if (allowFormJsFail && /ERR_NAME_NOT_RESOLVED|Failed to load resource/.test(m.text())) return;
    if (expected(m.text())) return;
    bad.push('console: ' + m.text());
  });
  p.on('pageerror', (e) => bad.push('pageerror: ' + e.message));
  p.on("response", (r) => r.status() >= 400 && r.status() !== allowStatus && bad.push(r.status() + ' ' + r.url()));
  p.on('request', (r) => {
    const u = r.url();
    if (!u.startsWith(origin) && !u.startsWith('data:') && !u.startsWith(JOIN + '/')) bad.push('third-party: ' + u);
  });
};

const measure = (p) => p.evaluate(() => {
  const de = document.documentElement, small = [];
  for (const e of document.querySelectorAll('a, button, input:not([type=hidden]):not(#website)')) {
    const r = e.getBoundingClientRect();
    if (!r.width || e.classList.contains("skip")) continue;
    if (e.matches(".consent a")) continue; // a link inside a sentence: exempt (WCAG 2.5.8)
    let w = r.width, h = r.height;
    if (h < 23.5 || w < 23.5) small.push(`${e.tagName}#${e.id || e.className}:${Math.round(w)}x${Math.round(h)}`);
  }
  const y = (s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { top: Math.round(r.top + scrollY), bottom: Math.round(r.bottom + scrollY) }; };
  const label = document.querySelector('label[for=consent]');
  return {
    over: de.scrollWidth - de.clientWidth,
    small,
    field: y('#email'), mac: y('.req li'), button: y('.signup button'), beta: y('.beta'), msgs: y('.msgs'),
    consent: label ? label.textContent : null,
    consentHref: label?.querySelector('a')?.getAttribute('href'),
    fold: innerHeight,
    H: de.scrollHeight,
  };
});

const record = (name, info, bad) => {
  n++;
  if (info.over > 0) failures.push(`${name}: horizontal overflow ${info.over}px`);
  if (info.small.length) failures.push(`${name}: small targets ${info.small.join(', ')}`);
  if (bad.length) failures.push(`${name}: ${bad.join(' | ')}`);
  console.log(name, JSON.stringify({ ...info, consent: undefined, small: info.small.length || undefined }), bad.length ? bad.join(' | ') : '');
};

// 1. The page itself, idle, across the matrix.
for (const lang of ['fi', 'en']) for (const [w, h] of [[390, 844], [1440, 900]]) for (const scheme of ['light', 'dark']) for (const xl of w === 390 ? [false, true] : [false]) {
  const opts = { viewport: { width: w, height: h }, colorScheme: scheme, reducedMotion: 'reduce' };
  const ctx = xl ? await chromium.launchPersistentContext(xlDir, { ...opts, executablePath: CHROME }) : await browser.newContext(opts);
  await fakeJoin(ctx);
  const p = ctx.pages()[0] || await ctx.newPage();
  const bad = []; watch(p, bad);
  await p.goto(origin + path(lang), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const info = await measure(p);
  const name = `${lang}-${w}-${scheme}${xl ? '-xl' : ''}`;
  await p.screenshot({ path: join(shots, name + '.png'), fullPage: true });
  if (!xl) await p.screenshot({ path: join(shots, name + '-first-screen.png') });
  record(name, info, bad);
  if (info.consent !== CONSENT[lang]) failures.push(`${name}: consent label differs from launchpad's string:\n  page: ${info.consent}\n  lpad: ${CONSENT[lang]}`);
  if (info.consentHref !== (lang === 'fi' ? '/tietosuoja/' : '/en/privacy/')) failures.push(`${name}: privacy link goes to ${info.consentHref}`);
  if (!xl && w === 1440 && info.field.bottom > h) failures.push(`${name}: the field ends at ${info.field.bottom}, below the ${h}px fold`);
  if (!xl && w === 1440 && info.mac.bottom > h) failures.push(`${name}: the Mac line ends at ${info.mac.bottom}, below the ${h}px fold`);
  if (!xl && w === 390 && info.field.bottom > h) failures.push(`${name}: the field ends at ${info.field.bottom}, below the first ${h}px screen`);
  await ctx.close();
}

// 2. Every kit/form.js answer, sent for real through the form.
const answers = [
  ['accepted', 202, 'accepted'], ['invalid-email', 422, 'error'], ['rate-limited', 429, 'error'],
  ['failed', 500, 'error'], ['offline', 'offline', 'error'], ['sending', 'hang', 'sending'],
];
for (const lang of ['fi', 'en']) for (const [w, h] of [[390, 844], [1440, 900]]) for (const scheme of lang === 'fi' ? ['light', 'dark'] : ['light']) {
  const heights = new Set();
  for (const [label, answer, want] of answers) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, reducedMotion: 'reduce' });
    const posts = [];
    await fakeJoin(ctx, { answer, posts });
    const p = await ctx.newPage();
    const bad = []; watch(p, bad, { allowStatus: typeof answer === "number" && answer >= 400 ? answer : null, allowFormJsFail: answer === "offline" });
    await p.goto(origin + path(lang), { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.focus("#email"); // form.js loads when the form is first touched
    await p.waitForFunction(() => document.querySelector(".signup").launchpad === true);
    // Unticked consent: the browser stops the press and nothing is sent.
    await p.fill('#email', LONG);
    await p.click('.signup button');
    await p.waitForTimeout(150);
    if (posts.length) failures.push(`${lang}-${w}: sent without the consent box ticked`);
    await p.check('#consent');
    if (answer === 'offline') await ctx.setOffline(true);
    await p.click('.signup button');
    if (answer === 'hang') await p.waitForTimeout(1600); // the status says "sending" after 1 s
    else await p.waitForFunction(() => document.querySelector('.signup').dataset.state !== 'sending' && document.querySelector('.signup').dataset.state !== 'idle', null, { timeout: 15000 });
    await p.waitForTimeout(100);
    const state = await p.evaluate(() => document.querySelector('.signup').dataset.state);
    const info = await measure(p);
    const name = `${lang}-${w}-${scheme}-js-${label}`;
    if (state !== want) failures.push(`${name}: state ${state}, expected ${want}`);
    if (answer !== 'offline' && posts.length !== 1) failures.push(`${name}: ${posts.length} posts`);
    if (posts[0]) {
      const b = posts[0].body;
      const ok = b.email === LONG && b.locale === lang && b.consent === VERSION && b['purposes[]'] === 'beta_invite' && b.source === path(lang) && b.website === '' && /^tok-/.test(b.t) && /application\/json/.test(posts[0].accept);
      if (!ok) failures.push(`${name}: unexpected post ${JSON.stringify(posts[0])}`);
    }
    heights.add(info.beta.bottom - info.beta.top);
    const box = await p.locator('.beta').boundingBox();
    await p.screenshot({ path: join(shots, name + '.png'), fullPage: true, clip: { x: 0, y: Math.max(0, box.y - 20), width: w, height: box.height + 40 } }); // fullPage: the block can reach below the fold
    record(name, info, bad);
    await ctx.close();
  }
  console.log(`${lang}-${w}-${scheme}: request block heights after each answer:`, [...heights].join(', '));
  if (heights.size > 1) failures.push(`${lang}-${w}-${scheme}: request block height differs between answers: ${[...heights].join(', ')}`);
}

// 3. Without JavaScript: launchpad's 303 lands on a fragment and :target shows the state.
for (const lang of ['fi', 'en']) for (const [w, h] of [[390, 844], [1440, 900]]) for (const scheme of ['light', 'dark']) for (const frag of ['signup-check-email', 'signup-error', 'signup-try-later']) {
  if (scheme === 'dark' && lang === 'en') continue;
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, javaScriptEnabled: false });
  const p = await ctx.newPage();
  const bad = []; watch(p, bad);
  await p.goto(origin + path(lang) + '#' + frag, { waitUntil: 'networkidle' });
  const vis = await p.evaluate((f) => [...document.querySelectorAll('.msg')].filter((m) => getComputedStyle(m).display !== 'none').map((m) => m.id), frag);
  const info = await measure(p);
  const name = `${lang}-${w}-${scheme}-nojs-${frag.replace('signup-', '')}`;
  if (vis.join() !== frag) failures.push(`${name}: visible messages ${vis.join() || 'none'}`);
  await p.screenshot({ path: join(shots, name + '.png') }); // the viewport the visitor lands on
  record(name, info, bad);
  await ctx.close();
}

// 4. The plain POST, as it works until join.koivupiilo.fi is deployed (form.js does not load) and
//    without JavaScript: the browser posts the form, launchpad 303s back with #signup-check-email.
for (const js of [true, false]) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: 'light', javaScriptEnabled: js, reducedMotion: 'reduce' });
  const posts = [];
  await fakeJoin(ctx, { answer: 'no-js', formjs: false, posts });
  const p = await ctx.newPage();
  const bad = []; watch(p, bad, { allowFormJsFail: true });
  await p.goto(origin + path('fi'), { waitUntil: 'networkidle' });
  await p.fill('#email', 'liisa@example.fi');
  await p.check('#consent');
  await Promise.all([p.waitForURL(/#signup-check-email$/), p.click('.signup button')]);
  await p.waitForLoadState('networkidle');
  const shown = await p.evaluate(() => getComputedStyle(document.getElementById('signup-check-email')).display);
  const name = `fi-390-light-plain-post-${js ? 'js-no-formjs' : 'nojs'}`;
  const b = posts[0]?.body || {};
  if (shown === 'none') failures.push(`${name}: the check-email state did not show`);
  if (b.email !== 'liisa@example.fi' || b.t !== '' || b.consent !== VERSION || b.website !== '') failures.push(`${name}: unexpected post ${JSON.stringify(posts[0])}`);
  await p.screenshot({ path: join(shots, name + '.png') });
  record(name, await measure(p), bad);
  await ctx.close();
}

// 5. The arrival motion, at both widths.
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: 'light', reducedMotion: 'no-preference' });
  await fakeJoin(ctx);
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

await browser.close(); srv.close(); rmSync(xlDir, { recursive: true, force: true });
console.log(n, 'shots in', shots);
if (failures.length) { console.log(`\n${failures.length} FAILURES:\n- ` + failures.join('\n- ')); process.exit(1); }
console.log('all checks passed');
