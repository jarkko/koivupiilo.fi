// Direction B, "Koivu" (Birch). Committed: the name's own material. Cool bark-white ground,
// black lenticel marks drawn as an authored SVG texture, and whole regions in new-leaf green.
// Young Serif display, Figtree text. Signature S-3: the contact page is an email you write in place.
import { doc, esc, href, langSwitch, fontFaces, t, products, product, status, mailto, EMAIL, elsewhere, draftBody } from '../lib.mjs';
import { offers, moreWork } from '../content.mjs';
import { caseStudy } from '../case.mjs';

export const meta = {
  id: 'b', name: 'Koivu', nameEn: 'Birch',
  pitch: {
    fi: 'Nimen oma materiaali: tuohen valkoinen, mustat korot ja hiirenkorvien vihreä. Lämmin, persoonallinen, kirjoitettu ihmiseltä ihmiselle.',
    en: 'The name’s own material: bark white, black lenticels and new-leaf green. Warm, personal, written person to person.',
  },
  colors: {
    light: { bg: '#edf0ea', surface: '#f9fbf6', ink: '#151812', muted: '#4c5446', rule: '#cdd4c5', field: '#c8dc3a', onField: '#151812', link: '#2b5716', mark: '#151812' },
    dark: { bg: '#0f120d', surface: '#181c14', ink: '#e8ecdf', muted: '#a4ac99', rule: '#2a3125', field: '#22351a', onField: '#e6f28a', link: '#cfe24a', mark: '#e8ecdf' },
  },
};
const vars = (c) => Object.entries(c).map(([k, v]) => `--${k}:${v}`).join(';');

// Lenticel texture: deterministic horizontal dashes, like the marks on birch bark.
function bark(w, h, n, seed = 7) {
  let s = seed; const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  let d = '';
  for (let i = 0; i < n; i++) {
    const x = r() * w, y = r() * h, len = 4 + r() ** 2 * (w * 0.35), th = 1 + r() * 2.6;
    d += `M${x.toFixed(1)} ${y.toFixed(1)}h${len.toFixed(1)}v${th.toFixed(1)}h-${len.toFixed(1)}z`;
  }
  return d;
}
const barkSvg = (w, h, n, seed) => `<svg class="bark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><path d="${bark(w, h, n, seed)}" fill="currentColor"/></svg>`;

const css = `
${fontFaces([['Young Serif', 'young-serif-latin-400-normal.woff2', '400'], ['Figtree', 'figtree-latin-wght-normal.woff2', '300 900']])}
:root{${vars(meta.colors.light)};color-scheme:light}
@media (prefers-color-scheme:dark){:root{${vars(meta.colors.dark)};color-scheme:dark}}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font:400 1.0625rem/1.6 Figtree,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
::selection{background:var(--field);color:var(--onField)}
a{color:var(--link);text-underline-offset:.22em;text-decoration-thickness:1.5px}
:focus-visible{outline:3px solid var(--link);outline-offset:3px;border-radius:4px}
.skip{position:absolute;left:-999px;top:0;background:var(--ink);color:var(--bg);padding:.6rem 1rem}
.skip:focus{left:1rem;top:1rem;z-index:9}
.wrap{max-width:76rem;margin:0 auto;padding:0 clamp(1rem,4vw,2.5rem)}
h1,h2,h3{font-family:'Young Serif',Georgia,serif;font-weight:400;line-height:1.08;letter-spacing:-.01em;text-wrap:balance;margin:0}
h1{font-size:clamp(2.3rem,6.4vw,5.2rem)}
h2{font-size:clamp(1.6rem,3vw,2.4rem)}
h3{font-size:1.45rem}
p{margin:0 0 1em;max-width:62ch}
.lede{font-size:clamp(1.15rem,1.7vw,1.4rem);line-height:1.5}
.bark{display:block;width:100%;height:100%;color:var(--mark)}
header.site{background:var(--field);color:var(--onField)}
header.site .wrap{display:flex;align-items:center;gap:1.25rem;min-height:4.25rem;flex-wrap:wrap}
header.site a{color:var(--onField);text-decoration:none}
.brand{font-family:'Young Serif',serif;font-size:1.35rem;margin-right:auto}
nav.main{display:flex;gap:1.25rem}
nav.main a{padding:.6rem 0;font-weight:500}
nav.main a[aria-current]{text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:.4em}
.lang{font-size:.95rem;opacity:.85}
.hero{background:var(--field);color:var(--onField);position:relative;overflow:hidden;padding:clamp(2.5rem,7vw,6rem) 0 clamp(3rem,8vw,7rem)}
.hero .wrap{display:grid;grid-template-columns:minmax(0,1fr) clamp(12rem,32vw,28rem);gap:clamp(1.5rem,4vw,4rem);align-items:stretch}
.hero h1{max-width:15ch}
.hero .lede{margin-top:1.75rem;max-width:44ch}
.trunk{border-radius:14px;min-height:20rem;overflow:hidden;box-shadow:0 1px 2px rgb(0 0 0/.12),0 12px 32px -12px rgb(0 0 0/.35)}.trunk img{width:100%;height:100%;object-fit:cover;display:block}
.hero a{color:var(--onField)}
section{padding:clamp(3rem,8vw,6rem) 0}
.divider{height:22px;color:var(--mark);opacity:.9}
.feature{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:clamp(1.25rem,4vw,4rem);align-items:center;margin:0 0 clamp(3rem,7vw,5.5rem)}
.feature:nth-child(even){grid-template-columns:minmax(0,5fr) minmax(0,7fr)}
.feature:nth-child(even) .pic{order:2}
.pic{border-radius:14px;overflow:hidden;background:var(--surface);box-shadow:0 18px 40px -22px rgb(20 30 10 / .45),0 2px 6px rgb(20 30 10 / .08);aspect-ratio:16/10}
.pic img{width:100%;height:100%;object-fit:cover;object-position:top left;display:block}
.feature h3{font-size:clamp(1.6rem,2.6vw,2.2rem);margin-bottom:.5rem}
.feature h3 a{color:var(--ink);text-decoration:none}
.feature h3 a:hover{text-decoration:underline}
.tag{display:inline-flex;gap:.5rem;align-items:center;font-size:.9rem;color:var(--muted);margin-bottom:.8rem}
.tag b{font-weight:600;color:var(--ink);background:var(--surface);border:1px solid var(--rule);border-radius:99px;padding:.15rem .6rem}
.more{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1.5rem}
.more li{font-family:'Young Serif',serif;font-size:1.15rem;line-height:1.2}
.more span{display:block;font-family:Figtree,sans-serif;font-size:.88rem;color:var(--muted);margin-top:.3rem}
.offerband{background:var(--surface);border-top:1px solid var(--rule);border-bottom:1px solid var(--rule)}
.offers3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(1.25rem,3vw,3rem);margin-top:2rem}
.offers3 h3 a{color:var(--ink);text-decoration:none}
.offers3 h3{margin-bottom:.6rem}
.offers3 p{color:var(--muted)}
.letterlink{font-family:'Young Serif',serif;font-size:clamp(1.5rem,4.4vw,3.2rem);line-height:1.15;color:var(--ink);text-decoration-color:var(--field);text-decoration-thickness:.18em;text-underline-offset:.12em;overflow-wrap:anywhere}
.btn{display:inline-flex;align-items:center;gap:.5rem;background:var(--ink);color:var(--bg);text-decoration:none;padding:.9rem 1.4rem;border-radius:99px;font-weight:600;border:0;font:inherit;font-weight:600;cursor:pointer;min-height:44px}
.btn:hover{background:var(--link);color:var(--bg)}
.btn.ghost{background:transparent;color:var(--ink);border:1.5px solid var(--ink)}
footer.site{padding:2.5rem 0 3rem;font-size:.92rem;color:var(--muted);border-top:1px solid var(--rule)}
footer.site .wrap{display:flex;flex-wrap:wrap;gap:.5rem 2rem}
/* services */
.offer{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(1.25rem,4vw,4rem);padding:clamp(2.5rem,6vw,4.5rem) 0;border-top:1px solid var(--rule)}
.offer h2{font-size:clamp(1.7rem,2.5vw,2.35rem);overflow-wrap:break-word}
.offer dl{margin:1.5rem 0 0;display:grid;gap:1.1rem}
.offer dt{font-weight:600;font-size:.95rem}
.offer dd{margin:.15rem 0 0;color:var(--muted)}
.chips{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.4rem}
.chips a{background:var(--field);color:var(--onField);padding:.3rem .8rem;border-radius:99px;text-decoration:none;font-weight:500;font-size:.92rem}
.one{background:var(--field);color:var(--onField);border-radius:20px;padding:clamp(1.75rem,5vw,4rem);display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(1.25rem,4vw,4rem)}
.one ul{margin:0;padding:0 0 0 1.1rem;display:grid;gap:.9rem}
.one .btn{background:var(--onField);color:var(--field);margin-top:1.5rem}
/* case */
.case-h{padding:clamp(2.5rem,6vw,5rem) 0 2rem}
.case-h .back{color:var(--muted);font-size:.95rem;display:inline-block;margin-bottom:1.5rem}
.strip{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem 2rem;margin:2.5rem 0 0;padding:1.5rem 0;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule)}
.strip dt{font-size:.85rem;color:var(--muted)}
.strip dd{margin:.15rem 0 0;font-weight:500}
.hero-shot{margin:0 0 clamp(2.5rem,6vw,4rem)}
.hero-shot .pic{aspect-ratio:auto}
.hero-shot img{height:auto}
figcaption{font-size:.88rem;color:var(--muted);margin-top:.7rem}
.body{max-width:42rem;margin:0 auto}
.body h2{margin:3rem 0 1rem}
.body p{font-size:1.125rem}
.fig{margin:2.5rem 0}
.fig .pic{aspect-ratio:auto}
.fig img{height:auto}
.notdone{background:var(--surface);border:1px solid var(--rule);border-radius:16px;padding:1.5rem 1.75rem;margin:3rem 0}
.notdone h2{font-size:1.3rem;margin:0 0 .5rem}
/* contact: S-3, the letter */
.letter{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:clamp(1.5rem,4vw,4rem);align-items:start}
.paper{background:var(--surface);border-radius:16px;box-shadow:0 24px 50px -28px rgb(20 30 10 / .5),0 2px 8px rgb(20 30 10 / .08);overflow:hidden}
.paper .to{display:grid;grid-template-columns:5rem minmax(0,1fr);gap:.4rem 1rem;padding:1.1rem 1.5rem;border-bottom:1px solid var(--rule);font-size:.95rem}
.paper .to span:nth-child(odd){color:var(--muted)}
.paper label{display:block;padding:1.1rem 1.5rem .2rem;font-size:.88rem;color:var(--muted)}
.paper textarea{display:block;width:100%;min-height:19rem;border:0;background:transparent;color:var(--ink);font:400 1.08rem/1.65 Figtree,sans-serif;padding:.4rem 1.5rem 1.5rem;resize:vertical}
.paper textarea:focus{outline:none}
.paper:focus-within{box-shadow:0 0 0 3px var(--link),0 24px 50px -28px rgb(20 30 10 / .5)}
.paper .acts{display:flex;gap:.75rem;flex-wrap:wrap;padding:1rem 1.5rem 1.5rem;border-top:1px solid var(--rule)}
.hints{list-style:none;margin:0;padding:0;display:grid;gap:1.4rem}
.hints b{display:block;font-family:'Young Serif',serif;font-weight:400;font-size:1.3rem;margin-bottom:.2rem}
.hints span{color:var(--muted)}
.cside{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(1.25rem,3vw,3rem)}
.cside h2{font-size:1.3rem;margin-bottom:.6rem}
.cside ul{list-style:none;margin:0;padding:0;display:grid;gap:.45rem}
@media (max-width:860px){
  .hero .wrap{grid-template-columns:1fr}
  .trunk{min-height:0;height:15rem}
  .feature,.feature:nth-child(even){grid-template-columns:1fr}
  .feature:nth-child(even) .pic{order:0}
  .more{grid-template-columns:repeat(2,minmax(0,1fr))}
  .offers3,.offer,.one,.letter,.cside{grid-template-columns:1fr}
  .strip{grid-template-columns:repeat(2,minmax(0,1fr))}
  nav.main{order:3;width:100%;gap:1rem}
  header.site .wrap{padding-top:.4rem;row-gap:0}
}
.photo{margin:0;height:clamp(16rem,48vw,34rem);overflow:hidden}.photo img{width:100%;height:100%;object-fit:cover;object-position:center 60%;display:block}
img[src$="magistician-phone.png"]{max-width:min(100%,22rem);margin-inline:auto;display:block}
`;

function header(base, lang, key) {
  const L = t[lang];
  const cur = (k) => (k === key || (k === 'work' && key === 'case') ? ' aria-current="page"' : '');
  return `<header class="site"><div class="wrap">
<a class="brand" href="${href(base, lang, 'front')}">Koivupiilo</a>
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
<span>${F.company} · ${F.bid} · ${F.place}</span><a href="mailto:${EMAIL}">${EMAIL}</a>${langSwitch(base, lang, key)}
</div></footer>`;
}
const workHref = (base, lang, slug) => (slug === 'magistician' ? href(base, lang, 'case') : href(base, lang, 'front', '#tyot'));

function front(base, lang) {
  const F = t[lang].front;
  const feats = products.map((p) => `<article class="feature">
<a class="pic" href="${workHref(base, lang, p.slug)}" tabindex="-1" aria-hidden="true"><img src="/assets/img/${p.img}" alt="" loading="lazy"></a>
<div><div class="tag"><b>${status(lang, p.status)}</b>${esc(p.platform[lang])}</div>
<h3><a href="${workHref(base, lang, p.slug)}">${p.name}</a></h3><p>${esc(p[lang])}</p></div></article>`).join('');
  return `<section class="hero"><div class="wrap">
<div><h1>${esc(F.h1)}</h1><p class="lede">${esc(F.lede)}</p></div>
<div class="trunk"><img src="/assets/photos/pines-evening-1000.jpg" srcset="/assets/photos/pines-evening-1000.jpg 1000w, /assets/photos/pines-evening-2000.jpg 2000w" sizes="(max-width: 760px) 100vw, 30vw" alt="${lang==='fi'?'Männikkö ilta-auringossa':'Pine stand in evening sun'}"></div>
</div></section>
<section id="tyot" aria-labelledby="h-p"><div class="wrap">
<h2 id="h-p" style="margin-bottom:clamp(2rem,5vw,3.5rem)">${esc(F.productsH)}</h2>
${feats}
<h2 style="font-size:1.4rem;margin:0 0 1.25rem">${esc(F.moreH)}</h2>
<ul class="more">${moreWork.map((m) => `<li>${esc(m.name[lang])}<span>${esc(m.platform[lang])} · ${status(lang, m.status)}</span></li>`).join('')}</ul>
</div></section>
<section class="offerband" aria-labelledby="h-o"><div class="wrap">
<h2 id="h-o">${esc(F.offersH)}</h2>
<div class="offers3">${offers[lang].map((o) => `<div><h3><a href="${href(base, lang, 'services', '#' + o.id)}">${esc(o.name)}</a></h3><p>${esc(o.lead)}</p></div>`).join('')}</div>
<p style="margin-top:1.5rem"><a href="${href(base, lang, 'services')}">${esc(F.offersLink)} →</a></p>
</div></section>
<section><div class="wrap">
<p class="lede">${esc(F.contactLine)}</p>
<a class="letterlink" href="${href(base, lang, 'contact')}">${EMAIL}</a>
</div></section>`;
}

function services(base, lang) {
  const S = t[lang].services;
  return `<section class="hero"><div class="wrap"><div><h1>${esc(S.h1)}</h1><p class="lede">${esc(S.lede)}</p></div><div class="trunk"><img src="/assets/photos/pines-lake-1000.jpg" srcset="/assets/photos/pines-lake-1000.jpg 1000w, /assets/photos/pines-lake-2000.jpg 2000w" sizes="(max-width: 760px) 100vw, 30vw" alt="${lang==='fi'?'Mäntyjä järven rannalla':'Pines on a lakeshore'}"></div></div></section>
<section style="padding-top:0"><div class="wrap">
${offers[lang].map((o) => `<article class="offer" id="${o.id}"><div><h2>${esc(o.name)}</h2></div><div><p class="lede">${esc(o.lead)}</p>
<dl><div><dt>${S.who}</dt><dd>${esc(o.who)}</dd></div><div><dt>${S.starts}</dt><dd>${esc(o.starts)}</dd></div><div><dt>${S.format}</dt><dd>${esc(o.format)}</dd></div>
${o.proof.length ? `<div><dt>${S.proof}</dt><dd class="chips">${o.proof.map((s) => `<a href="${workHref(base, lang, s)}">${product(s).name}</a>`).join('')}</dd></div>` : ''}</dl></div></article>`).join('')}
<div class="one"><h2>${esc(S.oneH)}</h2><div><ul>${S.one.map((x) => `<li>${esc(x)}</li>`).join('')}</ul><a class="btn" href="${href(base, lang, 'contact')}">${esc(S.cta)}</a></div></div>
</div></section>`;
}

function caseP(base, lang) {
  const C = caseStudy[lang], L = t[lang].case;
  return `<div class="wrap case-h"><a class="back" href="${href(base, lang, 'front', '#tyot')}">← ${L.backToWork}</a>
<h1>${esc(C.h1)}</h1><p class="lede" style="margin-top:1.25rem">${esc(C.problem)}</p>
<dl class="strip">${Object.entries(L.strip).map(([k, l]) => `<div><dt>${l}</dt><dd>${esc(C.strip[k])}</dd></div>`).join('')}</dl></div>
<div class="wrap"><figure class="hero-shot"><div class="pic"><img src="/assets/img/${C.hero.src}" alt="${esc(C.hero.alt)}"></div><figcaption>${esc(C.hero.caption)}</figcaption></figure>
<div class="body">
${C.sections.map((s) => `<h2>${esc(s.h)}</h2>${s.p.map((p) => `<p>${esc(p)}</p>`).join('')}${s.img ? `<figure class="fig"><div class="pic"><img src="/assets/img/${s.img.src}" alt="${esc(s.img.alt)}" loading="lazy"></div><figcaption>${esc(s.img.caption)}</figcaption></figure>` : ''}`).join('')}
<aside class="notdone"><h2>${esc(C.notDone.h)}</h2><p>${esc(C.notDone.p)}</p></aside>
<h2>${esc(L.nextH)}</h2><p>${esc(L.next)}</p><a class="btn" href="${href(base, lang, 'contact')}">${esc(t[lang].nav.contact)}</a>
</div></div><div style="height:4rem"></div>`;
}

function contact(base, lang) {
  const C = t[lang].contact;
  const fi = lang === 'fi';
  return `<section class="hero"><div class="wrap"><div><h1>${esc(C.h1)}</h1><p class="lede">${esc(C.lede)}</p></div><div class="trunk"><img src="/assets/photos/pines-lake-1000.jpg" srcset="/assets/photos/pines-lake-1000.jpg 1000w, /assets/photos/pines-lake-2000.jpg 2000w" sizes="(max-width: 760px) 100vw, 30vw" alt="${lang==='fi'?'Mäntyjä järven rannalla':'Pines on a lakeshore'}"></div></div></section>
<section><div class="wrap letter">
<form class="paper" id="draft" action="${mailto('Koivupiilo')}" method="get">
<div class="to"><span>${fi ? 'Vastaanottaja' : 'To'}</span><span>${EMAIL}</span><span>${fi ? 'Aihe' : 'Subject'}</span><span>Koivupiilo</span></div>
<label for="msg">${fi ? 'Kirjoita tähän, avaa sitten sähköpostissa' : 'Write here, then open it in your email'}</label>
<textarea id="msg" name="body" spellcheck="true">${esc(draftBody(lang))}</textarea>
<div class="acts"><a class="btn" id="send" href="${mailto('Koivupiilo', draftBody(lang))}">${fi ? 'Avaa sähköpostissa' : 'Open in email'}</a>
<button type="button" class="btn ghost" id="copy">${fi ? 'Kopioi teksti' : 'Copy text'}</button></div>
</form>
<div><h2 style="font-size:1.5rem;margin-bottom:1.25rem">${esc(C.includeH)}</h2>
<ol class="hints">${C.include.map(([b, s]) => `<li><b>${esc(b)}</b><span>${esc(s)}</span></li>`).join('')}</ol></div>
</div></section>
<section style="padding-top:0"><div class="wrap cside">
<div><h2>${esc(C.byOfferH)}</h2><ul>${offers[lang].map((o) => `<li><a href="${mailto(C.subject(o.name), draftBody(lang))}">${esc(C.subject(o.name))}</a></li>`).join('')}</ul></div>
<div><h2>${esc(C.nowH)}</h2><p>${esc(C.now)}</p><p style="color:var(--muted)">${esc(C.langs)}</p></div>
<div><h2>${esc(C.elsewhereH)}</h2><ul>${elsewhere.map(([n, u]) => `<li><a href="${u}" rel="me">${n}</a></li>`).join('')}</ul></div>
</div></section>
<script>
(()=>{const ta=document.getElementById('msg'),send=document.getElementById('send'),copy=document.getElementById('copy');
const upd=()=>{send.href='mailto:${EMAIL}?subject=Koivupiilo&body='+encodeURIComponent(ta.value)};ta.addEventListener('input',upd);
copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(ta.value);copy.textContent=${JSON.stringify(fi ? 'Kopioitu' : 'Copied')}}catch(e){ta.select()}})})();
</script>`;
}

export function render(base, lang, key) {
  const L = t[lang];
  const map = { front, services, case: caseP, contact };
  const titles = { front: L.front.title, services: L.services.title, case: L.case.title, contact: L.contact.title };
  return doc({ base, lang, key, title: titles[key], description: key === 'case' ? caseStudy[lang].problem : L.front.lede, css, header: header(base, lang, key), main: map[key](base, lang), footer: footer(base, lang, key) });
}
