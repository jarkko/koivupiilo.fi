// Direction A, "Hakemisto" (Index). Restrained: cool neutral ground, one ultramarine accent,
// one grotesk (Familjen Grotesk, from Familjen STHLM). The site reads like a well-set index of work:
// a ruled table of products whose rows preview the real screen (S-1).
import { doc, esc, href, langSwitch, fontFaces, t, products, product, status, mailto, EMAIL, elsewhere, draftBody } from '../lib.mjs';
import { offers, moreWork } from '../content.mjs';
import { caseStudy } from '../case.mjs';

export const meta = {
  id: 'a', name: 'Hakemisto', nameEn: 'Index',
  pitch: {
    fi: 'Hillitty ja tarkka. Työt ovat hakemisto, jonka rivit näyttävät oikean tuotteen. Yksi groteski, yksi sininen.',
    en: 'Restrained and exact. The work is an index whose rows show the real product. One grotesk, one blue.',
  },
  colors: {
    light: { bg: '#f3f4f6', surface: '#ffffff', ink: '#111318', muted: '#545a66', rule: '#d5d8de', accent: '#2a37c9', onAccent: '#ffffff' },
    dark: { bg: '#0d0e11', surface: '#16181d', ink: '#ebecef', muted: '#a0a5b1', rule: '#2c2f37', accent: '#93a0ff', onAccent: '#0d0e11' },
  },
};

const vars = (c) => Object.entries(c).map(([k, v]) => `--${k}:${v}`).join(';');

const css = `
${fontFaces([['Familjen Grotesk', 'familjen-grotesk-latin-wght-normal.woff2', '400 700']])}
:root{${vars(meta.colors.light)};color-scheme:light}
@media (prefers-color-scheme:dark){:root{${vars(meta.colors.dark)};color-scheme:dark}}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font:400 1.0625rem/1.55 'Familjen Grotesk',system-ui,sans-serif;font-feature-settings:'ss01';-webkit-font-smoothing:antialiased}
::selection{background:var(--accent);color:var(--onAccent)}
a{color:inherit;text-underline-offset:.2em;text-decoration-thickness:1px}
a:hover{color:var(--accent)}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:2px}
.skip{position:absolute;left:-999px;top:0;background:var(--ink);color:var(--bg);padding:.6rem 1rem}
.skip:focus{left:1rem;top:1rem;z-index:9}
.wrap{max-width:84rem;margin:0 auto;padding:0 clamp(1rem,4vw,3rem)}
.grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:clamp(1rem,2vw,2rem)}
header.site{border-bottom:1px solid var(--rule)}
header.site .wrap{display:flex;align-items:center;gap:1.5rem;min-height:4rem;flex-wrap:wrap}
.brand{font-weight:700;text-decoration:none;letter-spacing:-.01em;margin-right:auto;display:flex;align-items:center;gap:.6rem}
.brand svg{width:22px;height:22px}
nav.main{display:flex;gap:1.25rem}
nav.main a,.lang{text-decoration:none;font-size:.95rem;padding:.6rem 0}
nav.main a[aria-current]{text-decoration:underline;text-decoration-color:var(--accent);text-decoration-thickness:2px;text-underline-offset:.45em}
.lang{color:var(--muted)}
h1,h2,h3{font-weight:600;letter-spacing:-.025em;line-height:1.05;text-wrap:balance;margin:0}
h1{font-size:clamp(2.4rem,7.2vw,6rem);letter-spacing:-.035em}
h2{font-size:clamp(1.5rem,2.6vw,2.1rem)}
h3{font-size:1.25rem;letter-spacing:-.015em}
p{margin:0 0 1em;max-width:65ch}
.lede{font-size:clamp(1.15rem,1.6vw,1.35rem);line-height:1.45;color:var(--ink)}
.muted{color:var(--muted)}
section{padding:clamp(3rem,8vw,6.5rem) 0}
section+section{border-top:1px solid var(--rule)}
.hero{padding-top:clamp(2.5rem,7vw,6rem)}
.hero h1{grid-column:1/-1;max-width:14ch}
.hero .lede{grid-column:6/13;margin-top:clamp(1.5rem,3vw,2.5rem)}
.sh{display:flex;align-items:baseline;justify-content:space-between;gap:1rem;margin-bottom:1.5rem}
.sh a{font-size:.95rem;white-space:nowrap}
/* Signature S-1: the index with a live preview */
.index{grid-column:1/-1;display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:clamp(1rem,3vw,3rem);align-items:start}
.index ol{list-style:none;margin:0;padding:0;border-top:1px solid var(--ink)}
.index li{border-bottom:1px solid var(--rule)}
.row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:.25rem 1rem;padding:1.1rem 0;text-decoration:none;position:relative}
.row .nm{font-size:clamp(1.4rem,2.4vw,2rem);font-weight:600;letter-spacing:-.02em;line-height:1.1}
.row .st{font-size:.85rem;align-self:center;display:inline-flex;align-items:center;gap:.4rem;color:var(--muted);white-space:nowrap}
.row .st::before{content:'';width:.5rem;height:.5rem;border-radius:50%;background:var(--accent)}
.row .st[data-s=hold]::before{background:transparent;border:1px solid var(--muted)}
.row .ds{grid-column:1/-1;color:var(--muted);max-width:52ch}
.row .pf{grid-column:1/-1;font-size:.85rem;color:var(--muted);font-variant-numeric:tabular-nums}
.row:hover .nm,.row:focus-visible .nm{color:var(--accent)}
.row .th{display:none}
.preview{position:sticky;top:1.5rem;aspect-ratio:4/3;background:var(--surface);border:1px solid var(--rule);overflow:hidden}
.preview img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top left;opacity:0;transition:opacity .35s cubic-bezier(.16,1,.3,1)}
.preview img.on{opacity:1}
.preview figcaption{position:absolute;left:0;bottom:0;background:var(--bg);font-size:.8rem;padding:.35rem .6rem;color:var(--muted)}
.more{list-style:none;margin:2rem 0 0;padding:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1rem;grid-column:1/-1}
.more li{border-top:1px solid var(--rule);padding-top:.75rem;font-size:.95rem}
.more span{display:block;color:var(--muted);font-size:.85rem}
.offers3{grid-column:1/-1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(1rem,3vw,3rem)}
.offers3 div{border-top:2px solid var(--ink);padding-top:1rem}
.offers3 h3{margin-bottom:.6rem}
.offers3 p{color:var(--muted);font-size:1rem}
.big-mail{font-size:clamp(1.6rem,5.4vw,4.4rem);font-weight:600;letter-spacing:-.03em;line-height:1.05;text-decoration:none;border-bottom:3px solid var(--accent);overflow-wrap:anywhere}
.big-mail:hover{color:var(--accent)}
.end{grid-column:1/-1}
.end p{color:var(--muted)}
footer.site{border-top:1px solid var(--rule);padding:2rem 0 3rem;font-size:.9rem;color:var(--muted)}
footer.site .wrap{display:flex;flex-wrap:wrap;gap:.5rem 2rem;align-items:baseline}
footer.site a{color:var(--ink)}
/* services */
.offer{grid-column:1/-1;display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:clamp(1rem,3vw,3rem);padding:clamp(2rem,5vw,3.5rem) 0;border-top:1px solid var(--rule)}
.offer:first-of-type{border-top:2px solid var(--ink)}
.offer dl{margin:0;display:grid;grid-template-columns:9rem minmax(0,1fr);gap:.9rem 1.5rem}
.offer dt{color:var(--muted);font-size:.9rem;padding-top:.15rem}
.offer dd{margin:0}
.offer .lede{margin-top:.75rem}
.chips{display:flex;flex-wrap:wrap;gap:.5rem}
.chips a{border:1px solid var(--rule);padding:.35rem .7rem;text-decoration:none;font-size:.9rem;border-radius:99px}
.chips a:hover{border-color:var(--accent)}
.one{grid-column:1/-1;display:grid;grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:clamp(1rem,3vw,3rem)}
.one ul{margin:0;padding:0;list-style:none;display:grid;gap:1rem}
.one li{padding-left:1.4rem;position:relative}
.one li::before{content:'';position:absolute;left:0;top:.7em;width:.7rem;height:1px;background:var(--accent)}
.btn{display:inline-block;background:var(--accent);color:var(--onAccent);text-decoration:none;padding:.85rem 1.3rem;font-weight:600;margin-top:1.5rem}
.btn:hover{color:var(--onAccent);filter:brightness(1.08)}
/* case */
.strip{grid-column:1/-1;display:grid;grid-template-columns:repeat(6,minmax(0,1fr));border-top:2px solid var(--ink);margin-top:clamp(2rem,4vw,3rem)}
.strip div{padding:.8rem 1rem .8rem 0;border-bottom:1px solid var(--rule)}
.strip dt{font-size:.8rem;color:var(--muted)}
.strip dd{margin:.2rem 0 0;font-size:.95rem}
.shot{grid-column:1/-1;margin:clamp(2rem,5vw,4rem) 0 0}
.shot img{width:100%;height:auto;display:block;border:1px solid var(--rule);background:var(--surface)}
.shot figcaption,.fig figcaption{font-size:.85rem;color:var(--muted);margin-top:.6rem}
.body{grid-column:3/11}
.body h2{margin:3rem 0 1rem}
.body p{font-size:1.125rem}
.fig{margin:2.5rem 0}
.fig img{width:100%;height:auto;display:block;border:1px solid var(--rule)}
.notdone{border-left:0;background:var(--surface);padding:1.25rem 1.5rem;margin:2.5rem 0;border-top:2px solid var(--accent)}
.notdone h2{margin:0 0 .5rem;font-size:1.15rem}
.back{display:inline-block;margin-bottom:1.5rem;font-size:.95rem;color:var(--muted)}
/* contact */
.three{grid-column:1/-1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(1rem,3vw,3rem);margin:0;padding:0;list-style:none;counter-reset:n}
.three li{border-top:2px solid var(--ink);padding-top:1rem;counter-increment:n}
.three li::before{content:counter(n);display:block;font-size:2.5rem;font-weight:600;color:var(--accent);line-height:1;margin-bottom:.75rem;font-variant-numeric:tabular-nums}
.three b{display:block;font-size:1.2rem;margin-bottom:.3rem}
.three span{color:var(--muted)}
.side{grid-column:1/-1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(1rem,3vw,3rem)}
.side h2{font-size:1rem;letter-spacing:0;margin-bottom:.6rem}
.side ul{list-style:none;margin:0;padding:0;display:grid;gap:.4rem}
@media (max-width:860px){
  .hero .lede{grid-column:1/-1}
  .index{grid-template-columns:1fr}
  .preview{display:none}
  .row .th{display:block;grid-column:1/-1;margin:.6rem 0 .2rem;aspect-ratio:16/10;overflow:hidden;border:1px solid var(--rule);background:var(--surface)}
  .row .th img{width:100%;height:100%;object-fit:cover;object-position:top left;display:block}
  .more{grid-template-columns:repeat(2,minmax(0,1fr))}
  .offers3,.three,.side{grid-template-columns:1fr}
  .offer,.one{grid-template-columns:1fr}
  .offer dl{grid-template-columns:1fr;gap:.2rem}
  .offer dd{margin-bottom:.8rem}
  .strip{grid-template-columns:repeat(2,minmax(0,1fr))}
  .body{grid-column:1/-1}
  nav.main{gap:1rem;width:100%;order:3}
  header.site .wrap{padding-top:.5rem;row-gap:0}
}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
img[src$="magistician-phone.png"]{max-width:min(100%,22rem);margin-inline:auto;display:block}
`;

const logo = `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="1" width="6" height="22" fill="currentColor"/><rect x="9" y="6" width="6" height="1.6" fill="var(--bg)"/><rect x="9" y="12" width="6" height="1.6" fill="var(--bg)"/><rect x="9" y="17.5" width="6" height="1.6" fill="var(--bg)"/></svg>`;

function header(base, lang, key) {
  const L = t[lang];
  const cur = (k) => (k === key || (k === 'work' && key === 'case') ? ' aria-current="page"' : '');
  return `<header class="site"><div class="wrap">
<a class="brand" href="${href(base, lang, 'front')}">${logo}Koivupiilo</a>
<nav class="main" aria-label="${lang === 'fi' ? 'Päävalikko' : 'Main'}">
<a href="${href(base, lang, 'front', '#tyot')}"${cur('work')}>${L.nav.work}</a>
<a href="${href(base, lang, 'services')}"${cur('services')}>${L.nav.services}</a>
<a href="${href(base, lang, 'contact')}"${cur('contact')}>${L.nav.contact}</a>
</nav>
${langSwitch(base, lang, key)}
</div></header>`;
}

function footer(base, lang, key) {
  const F = t[lang].footer;
  return `<footer class="site"><div class="wrap">
<span>${F.company} · ${F.bid} · ${F.place}</span>
<a href="mailto:${EMAIL}">${EMAIL}</a>
${langSwitch(base, lang, key)}
</div></footer>`;
}

function front(base, lang) {
  const L = t[lang], F = L.front;
  const rows = products.map((p, i) => `<li><a class="row" href="${p.slug === 'magistician' ? href(base, lang, 'case') : href(base, lang, 'front', '#tyot')}" data-i="${i}">
<span class="nm">${p.name}</span><span class="st" data-s="${p.status}">${status(lang, p.status)}</span>
<span class="th"><img src="/assets/img/${p.img}" alt="" loading="lazy"></span>
<span class="ds">${esc(p[lang])}</span><span class="pf">${esc(p.platform[lang])}</span></a></li>`).join('\n');
  const imgs = products.map((p, i) => `<img src="/assets/img/${p.img}" alt="${esc(p.name)}" class="${i === 0 ? 'on' : ''}" data-i="${i}">`).join('');
  return `<section class="hero"><div class="wrap grid">
<h1>${esc(F.h1)}</h1>
<p class="lede">${esc(F.lede)}</p>
</div></section>
<section id="tyot" aria-labelledby="h-products"><div class="wrap grid">
<div class="sh" style="grid-column:1/-1"><h2 id="h-products">${esc(F.productsH)}</h2></div>
<div class="index"><ol>${rows}</ol><figure class="preview" aria-hidden="true">${imgs}</figure></div>
<ul class="more" aria-label="${esc(F.moreH)}">${moreWork.map((m) => `<li>${esc(m.name[lang])}<span>${esc(m.platform[lang])} · ${status(lang, m.status)}</span></li>`).join('')}</ul>
</div></section>
<section aria-labelledby="h-offers"><div class="wrap grid">
<div class="sh" style="grid-column:1/-1"><h2 id="h-offers">${esc(F.offersH)}</h2><a href="${href(base, lang, 'services')}">${esc(F.offersLink)} →</a></div>
<div class="offers3">${offers[lang].map((o) => `<div><h3><a href="${href(base, lang, 'services', '#' + o.id)}">${esc(o.name)}</a></h3><p>${esc(o.lead)}</p></div>`).join('')}</div>
</div></section>
<section><div class="wrap grid"><div class="end">
<p class="lede">${esc(F.contactLine)}</p>
<a class="big-mail" href="${href(base, lang, 'contact')}">${EMAIL}</a>
</div></div></section>
<script>
(()=>{const imgs=[...document.querySelectorAll('.preview img')];
document.querySelectorAll('.row').forEach(r=>{const on=()=>imgs.forEach(i=>i.classList.toggle('on',i.dataset.i===r.dataset.i));r.addEventListener('mouseenter',on);r.addEventListener('focus',on)})})();
</script>`;
}

function services(base, lang) {
  const S = t[lang].services;
  const block = (o) => `<article class="offer" id="${o.id}">
<div><h2>${esc(o.name)}</h2></div>
<div><p class="lede">${esc(o.lead)}</p>
<dl><dt>${S.who}</dt><dd>${esc(o.who)}</dd><dt>${S.starts}</dt><dd>${esc(o.starts)}</dd><dt>${S.format}</dt><dd>${esc(o.format)}</dd>
${o.proof.length ? `<dt>${S.proof}</dt><dd class="chips">${o.proof.map((s) => `<a href="${s === 'magistician' ? href(base, lang, 'case') : href(base, lang, 'front', '#tyot')}">${product(s).name}</a>`).join('')}</dd>` : ''}</dl></div>
</article>`;
  return `<section class="hero"><div class="wrap grid"><h1>${esc(S.h1)}</h1><p class="lede">${esc(S.lede)}</p></div></section>
<section style="padding-top:0;border-top:0"><div class="wrap grid">${offers[lang].map(block).join('')}</div></section>
<section><div class="wrap grid"><div class="one"><h2>${esc(S.oneH)}</h2><div><ul>${S.one.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
<a class="btn" href="${href(base, lang, 'contact')}">${esc(S.cta)}</a></div></div></div></section>`;
}

function caseP(base, lang) {
  const C = caseStudy[lang], L = t[lang].case;
  const strip = Object.entries(L.strip).map(([k, label]) => `<div><dt>${label}</dt><dd>${esc(C.strip[k])}</dd></div>`).join('');
  const sections = C.sections.map((s) => `<h2>${esc(s.h)}</h2>${s.p.map((p) => `<p>${esc(p)}</p>`).join('')}${s.img ? `<figure class="fig"><img src="/assets/img/${s.img.src}" alt="${esc(s.img.alt)}" loading="lazy"><figcaption>${esc(s.img.caption)}</figcaption></figure>` : ''}`).join('');
  return `<section class="hero"><div class="wrap grid">
<div style="grid-column:1/-1"><a class="back" href="${href(base, lang, 'front', '#tyot')}">← ${L.backToWork}</a></div>
<h1>${esc(C.h1)}</h1><p class="lede">${esc(C.problem)}</p>
<dl class="strip">${strip}</dl>
<figure class="shot"><img src="/assets/img/${C.hero.src}" alt="${esc(C.hero.alt)}"><figcaption>${esc(C.hero.caption)}</figcaption></figure>
</div></section>
<section style="padding-top:0;border-top:0"><div class="wrap grid"><div class="body">
${sections}
<aside class="notdone"><h2>${esc(C.notDone.h)}</h2><p>${esc(C.notDone.p)}</p></aside>
<h2>${esc(L.nextH)}</h2><p>${esc(L.next)}</p>
<a class="btn" href="${href(base, lang, 'contact')}">${esc(t[lang].nav.contact)}</a>
</div></div></section>`;
}

function contact(base, lang) {
  const C = t[lang].contact;
  return `<section class="hero"><div class="wrap grid"><div style="grid-column:1/-1">
<h1 style="margin-bottom:1.5rem">${esc(C.h1)}</h1>
<a class="big-mail" href="${mailto('Koivupiilo', draftBody(lang))}">${EMAIL}</a>
<p class="lede" style="margin-top:1.5rem">${esc(C.lede)}</p></div></div></section>
<section aria-labelledby="h-incl"><div class="wrap grid">
<h2 id="h-incl" style="grid-column:1/-1;margin-bottom:2rem">${esc(C.includeH)}</h2>
<ol class="three">${C.include.map(([b, s]) => `<li><b>${esc(b)}</b><span>${esc(s)}</span></li>`).join('')}</ol>
</div></section>
<section><div class="wrap grid"><div class="side">
<div><h2>${esc(C.byOfferH)}</h2><ul>${offers[lang].map((o) => `<li><a href="${mailto(C.subject(o.name), draftBody(lang))}">${esc(C.subject(o.name))}</a></li>`).join('')}</ul></div>
<div><h2>${esc(C.nowH)}</h2><p>${esc(C.now)}</p><p class="muted">${esc(C.langs)}</p></div>
<div><h2>${esc(C.elsewhereH)}</h2><ul>${elsewhere.map(([n, u]) => `<li><a href="${u}" rel="me">${n}</a></li>`).join('')}</ul></div>
</div></div></section>`;
}

export function render(base, lang, key) {
  const L = t[lang];
  const map = { front, services, case: caseP, contact };
  const titles = { front: L.front.title, services: L.services.title, case: L.case.title, contact: L.contact.title };
  const desc = key === 'case' ? caseStudy[lang].problem : L.front.lede;
  return doc({ base, lang, key, title: titles[key], description: desc, css, header: header(base, lang, key), main: map[key](base, lang), footer: footer(base, lang, key) });
}
