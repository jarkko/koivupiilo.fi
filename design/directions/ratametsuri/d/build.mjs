// Direction D, "Ratapainatus": builds index.html (fi) and en.html from copy2.json.
// Usage: node design/directions/ratametsuri/d/build.mjs
// If ../screens/kauppi-light.webp and kauppi-dark.webp exist, they replace the placeholder (copied into assets/).
import { readFileSync, writeFileSync, existsSync, copyFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const copy = JSON.parse(readFileSync(join(here, '..', 'copy2.json'), 'utf8'));
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const EMAIL = 'jarkko@koivupiilo.fi';
const mailto = `<a href="mailto:${EMAIL}?subject=Ratametsuri%20beta">${EMAIL}</a>`;
// Soft hyphens at compound boundaries only (never hyphens:auto, which splits Finnish wrongly).
const shy = (s) => s.replace(/ulospalveluohjelmistoon/g, 'ulospalvelu&shy;ohjelmistoon').replace(/astimääritteineen/g, 'asti&shy;määritteineen').replace(/astimääritteet/g, 'asti&shy;määritteet');
const nb = (s) => s.replace(/IOF 2024 -/g, 'IOF&nbsp;2024&nbsp;-&#8288;').replace(/IOF 2024 symbol/g, 'IOF&nbsp;2024&nbsp;symbol').replace(/IOF XML 3\.0 -/g, 'IOF&nbsp;XML&nbsp;3.0&nbsp;-&#8288;').replace(/IOF XML 3\.0 file/g, 'IOF&nbsp;XML&nbsp;3.0&nbsp;file');
const withEmail = (s) => esc(s).replace('%{email}', mailto);

// Real screenshots, when they exist. Per language and scheme: screens/kauppi-{fi,en}-{light,dark}.webp,
// falling back to screens/kauppi-{light,dark}.webp. Phone art direction: a 16:10 crop of the map area around
// the course, cut from the PNG master (or the webp when there is no PNG) with magick into assets/.
// PHONE_CROP is in fractions of the source and must be re-checked by eye whenever the screenshots are reshot.
const screens = join(here, '..', 'screens');
const PHONE_CROP = { x: 0.30, y: 0.572, w: 0.40, h: 0.375 };
const dim = (f) => {
  const o = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', f]).toString();
  return [+/pixelWidth: (\d+)/.exec(o)[1], +/pixelHeight: (\d+)/.exec(o)[1]];
};
const pick = (lang, scheme, ext) => [`kauppi-${lang}-${scheme}.${ext}`, `kauppi-${scheme}.${ext}`].map((n) => join(screens, n)).find(existsSync);
const shots = {};
for (const lang of ['fi', 'en']) {
  const s = {};
  for (const scheme of ['light', 'dark']) {
    const web = pick(lang, scheme, 'webp');
    if (!web) continue;
    const master = pick(lang, scheme, 'png') || web;
    const [mw, mh] = dim(master);
    const desk = `screen-${lang}-${scheme}.webp`, phone = `phone-${lang}-${scheme}.webp`;
    copyFileSync(web, join(here, 'assets', desk));
    const cw = Math.round(mw * PHONE_CROP.w), ch = Math.round(mh * PHONE_CROP.h);
    execFileSync('magick', [master, '-crop', `${cw}x${ch}+${Math.round(mw * PHONE_CROP.x)}+${Math.round(mh * PHONE_CROP.y)}`, '+repage', '-resize', '1200x', '-strip', '-quality', '82', join(here, 'assets', phone)]);
    s[scheme] = { desk, phone, deskDim: dim(join(here, 'assets', desk)), phoneDim: dim(join(here, 'assets', phone)) };
  }
  if (s.light && s.dark) shots[lang] = s;
}

const errIcon = '<svg class="ei" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8"/><path d="M10 5.5v5.5M10 14.2v.1"/></svg>';
const placeholder = { fi: 'Kuvakaappaus tulossa', en: 'Screenshot to come' };
const privacyHref = { fi: '/tietosuoja/', en: '/en/privacy/' };

const fx = [0.62, 0.38, 0.62, 0.38];

const css = readFileSync(join(here, 'style.css'), 'utf8');
const js = readFileSync(join(here, 'page.js'), 'utf8');

const page = (lang) => {
  const t = copy[lang], other = lang === 'fi' ? 'en' : 'fi';
  const cw = t.course_words;
  const creditText = t.map_credit.replace('%{credit}', 'Kauppi, Tampereen Pyrintö');
  const features = t.features.map((f, i) => `
          <li class="feature">
            <h3><svg class="sym control" style="--fx:${fx[i]}" viewBox="0 0 32 32" role="img" aria-label="${esc(cw.control)} ${i + 1}"><circle cx="16" cy="16" r="14"/><text x="16" y="21.2" text-anchor="middle">${i + 1}</text></svg>${esc(f.title)}</h3>
            <p>${nb(shy(esc(f.text)))}</p>
          </li>`).join('');
  const sh = shots[lang];
  const screen = sh
    ? `<picture>
            <source media="(max-width: 61.99rem) and (prefers-color-scheme: dark)" srcset="assets/${sh.dark.phone}" width="${sh.dark.phoneDim[0]}" height="${sh.dark.phoneDim[1]}">
            <source media="(max-width: 61.99rem)" srcset="assets/${sh.light.phone}" width="${sh.light.phoneDim[0]}" height="${sh.light.phoneDim[1]}">
            <source media="(prefers-color-scheme: dark)" srcset="assets/${sh.dark.desk}" width="${sh.dark.deskDim[0]}" height="${sh.dark.deskDim[1]}">
            <img src="assets/${sh.light.desk}" width="${sh.light.deskDim[0]}" height="${sh.light.deskDim[1]}" alt="${esc(t.screenshot_alt)}" fetchpriority="high">
          </picture>`
    : `<div class="ph" role="img" aria-label="${esc(t.screenshot_alt)}"><span class="ph-tag">${placeholder[lang]}</span></div>`;
  const b = t.beta;
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.page_title)}</title>
<meta name="description" content="${esc(t.meta_description)}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27%3E%3Cpolygon points=%2716,4 29.5,27.5 2.5,27.5%27 fill=%27none%27 stroke=%27%23a626a4%27 stroke-width=%273.4%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#f4f1ea" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#131018" media="(prefers-color-scheme: dark)">
<link rel="preload" href="assets/barlow-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/barlow-sc-600.woff2" as="font" type="font/woff2" crossorigin>
<style>
${css}
</style>
<script>document.documentElement.classList.add('js')</script>
</head>
<body>
<a class="skip" href="#main">${esc(t.skip_link)}</a>
<div class="course" id="course">
  <header class="top">
    <h1 class="mark"><svg class="sym start" style="--fx:.5" viewBox="0 0 32 32" aria-hidden="true"><polygon points="16,4 29.5,27.5 2.5,27.5"/></svg>Ratametsuri</h1>
    <a class="lang" href="${other === 'fi' ? 'index.html' : 'en.html'}" lang="${other}" hreflang="${other}">${esc(t.lang_link)}</a>
  </header>
  <main id="main" class="main">
    <section class="intro">
      <p class="headline">${esc(t.headline)}</p>
      <p class="status"><svg class="dot" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6"/></svg><span>${esc(t.status.text)}</span></p>
    </section>
    <figure class="shot">
      <div class="frame"><div class="win">
          ${screen}
      </div></div>
      <figcaption class="credit">${esc(creditText)}</figcaption>
    </figure>
    <section class="rail" aria-labelledby="feat-h">
      <h2 class="eyebrow" id="feat-h">${esc(t.features_heading)}</h2>
      <ol class="features">${features}
      </ol>
    </section>
    <section class="beta" id="beta" data-state="default" data-endpoint="" aria-labelledby="beta-h">
      <div class="beta-copy">
        <h2 id="beta-h"><svg class="sym finish" style="--fx:.5" viewBox="0 0 40 40" role="img" aria-label="${esc(cw.finish)}"><circle cx="20" cy="20" r="17.5"/><circle class="inner" cx="20" cy="20" r="10.5"/></svg>${esc(b.heading)}</h2>
        <p class="lead">${esc(b.lead)}</p>
        <section class="req" aria-labelledby="req-h">
          <h3 class="eyebrow" id="req-h">${esc(t.requirements.heading)}</h3>
          <ul>
            <li>${esc(t.requirements.mac)}</li>
            <li>${esc(t.requirements.languages)}</li>
          </ul>
        </section>
      </div>
      <form novalidate>
        <label for="email">${esc(b.field_label)}</label>
        <div class="row">
          <input id="email" type="email" name="email" autocomplete="email" inputmode="email" autocapitalize="off" spellcheck="false" required aria-describedby="m-default">
          <button type="submit"><span class="l l-default">${esc(b.button)}</span><span class="l l-sending">${esc(b.sending)}</span></button>
        </div>
        <div class="hp" aria-hidden="true"><input name="website" tabindex="-1" autocomplete="off"></div>
        <div class="msgs" aria-live="polite">
          <p class="msg" id="m-default" data-for="default sending">${esc(b.privacy_line)} <a href="${privacyHref[lang]}">${esc(b.privacy_link_text)}</a></p>
          <p class="msg" id="m-validation" data-for="error-validation"><span class="err">${errIcon}${esc(b.error_validation)}</span></p>
          <p class="msg" id="m-server" data-for="error-server"><span class="err">${errIcon}${withEmail(b.error_server)}</span></p>
          <p class="msg" id="m-notlive" data-for="not-live">${withEmail(b.not_live)}</p>
          <p class="msg" id="m-success" data-for="success"><svg class="tick" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10.5l4 4 8-9"/></svg><span class="s-plain">${esc(b.success_plain)}</span><span class="s-confirm">${esc(b.success_confirm)}</span></p>
        </div>
      </form>
    </section>
  </main>
</div>
<footer class="maker">
  <p>${esc(t.maker_line.text)} <span aria-hidden="true">·</span> <span class="num">${esc(t.maker_line.business_id)}</span> <span aria-hidden="true">·</span> <a href="${privacyHref[lang]}">${esc(t.maker_line.privacy_link_text)}</a></p>
</footer>
<script>
${js}
</script>
</body>
</html>
`;
};

writeFileSync(join(here, 'index.html'), page('fi'));
writeFileSync(join(here, 'en.html'), page('en'));
console.log('built index.html and en.html', Object.keys(shots).length ? 'with real screenshot' : 'with placeholder');
