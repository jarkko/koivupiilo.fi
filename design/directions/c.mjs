// Direction C, "Kenttä" (Court). Drenched: the hall's own colours. Court blue owns whole regions,
// ball yellow marks what matters, court lines are the only ornament. Big Shoulders Display
// (condensed, made for signage) over Archivo. Signature S-1: products as scoreboard tiles whose
// status reads like a live score; the case header is a match sheet.
import { doc, esc, href, langSwitch, fontFaces, t, products, product, status, mailto, EMAIL, elsewhere, draftBody } from '../lib.mjs';
import { offers, moreWork } from '../content.mjs';
import { caseStudy } from '../case.mjs';

export const meta = {
  id: 'c', name: 'Kenttä', nameEn: 'Court',
  pitch: {
    fi: 'Hallin omat värit: kentän sininen, pallon keltainen ja rajaviivat. Energinen ja suora, urheilun kieli myös ohjelmistoille.',
    en: 'The hall’s own colours: court blue, ball yellow and lines. Energetic and direct; the language of sport, for software too.',
  },
  colors: {
    light: { bg: '#f3f5fa', surface: '#ffffff', ink: '#0a1430', muted: '#46526f', rule: '#d2d8e6', court: '#1a3cb8', onCourt: '#ffffff', courtMuted: '#c9d4ff', ball: '#ffd23f', onBall: '#0a1430', link: '#1a3cb8' },
    dark: { bg: '#060b1e', surface: '#0e1636', ink: '#eef1fa', muted: '#9ba7c8', rule: '#1e2a52', court: '#16308f', onCourt: '#ffffff', courtMuted: '#bccaff', ball: '#ffd23f', onBall: '#0a1430', link: '#ffd23f' },
  },
};
const vars = (c) => Object.entries(c).map(([k, v]) => `--${k}:${v}`).join(';');

// Half a volleyball court in plan, in court-line white: end line, side lines, attack line, centre line.
const courtSvg = `<svg class="lines" viewBox="0 0 900 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="5">
<rect x="60" y="60" width="780" height="480"/><line x1="450" y1="30" x2="450" y2="570"/><line x1="320" y1="60" x2="320" y2="540"/><line x1="580" y1="60" x2="580" y2="540"/>
<line x1="450" y1="30" x2="450" y2="570" stroke-width="12" stroke-dasharray="2 22" opacity=".0"/></svg>`;

const css = `
${fontFaces([['Big Shoulders Display', 'big-shoulders-display-latin-wght-normal.woff2', '100 900'], ['Archivo', 'archivo-latin-wght-normal.woff2', '100 900']])}
:root{${vars(meta.colors.light)};color-scheme:light}
@media (prefers-color-scheme:dark){:root{${vars(meta.colors.dark)};color-scheme:dark}}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font:400 1.0625rem/1.55 Archivo,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
::selection{background:var(--ball);color:var(--onBall)}
a{color:var(--link);text-underline-offset:.2em;text-decoration-thickness:2px}
:focus-visible{outline:3px solid var(--ball);outline-offset:2px}
.skip{position:absolute;left:-999px;top:0;background:var(--ball);color:var(--onBall);padding:.6rem 1rem}
.skip:focus{left:1rem;top:1rem;z-index:9}
.wrap{max-width:82rem;margin:0 auto;padding:0 clamp(1rem,4vw,2.5rem)}
h1,h2,h3{font-family:'Big Shoulders Display',Impact,sans-serif;font-weight:800;text-transform:uppercase;line-height:.92;letter-spacing:.005em;margin:0;text-wrap:balance;hyphens:manual}
h1{font-size:clamp(3rem,10vw,8.5rem)}
h2{font-size:clamp(2rem,4.6vw,3.6rem)}
h3{font-size:clamp(1.6rem,2.6vw,2.2rem)}
p{margin:0 0 1em;max-width:64ch}
.lede{font-size:clamp(1.12rem,1.6vw,1.35rem);line-height:1.5}
header.site{background:var(--court);color:var(--onCourt);border-bottom:1px solid color-mix(in srgb,var(--onCourt) 18%,transparent)}
header.site .wrap{display:flex;align-items:center;gap:1.25rem;min-height:4rem;flex-wrap:wrap}
header.site a{color:var(--onCourt);text-decoration:none}
.brand{font-family:'Big Shoulders Display',sans-serif;font-weight:800;font-size:1.6rem;text-transform:uppercase;letter-spacing:.02em;margin-right:auto;display:flex;align-items:center;gap:.55rem}
.brand i{width:14px;height:14px;border-radius:50%;background:var(--ball);display:inline-block}
nav.main{display:flex;gap:1.4rem}
nav.main a{padding:.6rem 0;font-weight:600;font-size:.95rem;letter-spacing:.02em;text-transform:uppercase}
nav.main a[aria-current]{box-shadow:inset 0 -3px 0 var(--ball)}
.lang{font-size:.9rem;opacity:.85}
.court{background:var(--court);color:var(--onCourt);position:relative;overflow:hidden;isolation:isolate}
.court .lines{position:absolute;inset:0;width:100%;height:100%;color:color-mix(in srgb,var(--onCourt) 16%,transparent);z-index:-1}
.court a{color:var(--onCourt)}
.hero{padding:clamp(3rem,9vw,7.5rem) 0 clamp(3rem,8vw,6.5rem)}
.hero h1 em{font-style:normal;color:var(--ball)}
.hero .lede{max-width:46ch;margin-top:1.75rem;color:var(--onCourt)}
.hero .lede{color:color-mix(in srgb,var(--onCourt) 92%,var(--court))}
section{padding:clamp(3rem,8vw,6rem) 0}
.sh{display:flex;justify-content:space-between;align-items:end;gap:1rem;flex-wrap:wrap;margin-bottom:2rem}
/* Signature: scoreboard tiles */
.board{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(1rem,2vw,1.5rem)}
.tile{background:var(--surface);border:1px solid var(--rule);display:flex;flex-direction:column;text-decoration:none;color:var(--ink);transition:transform .25s cubic-bezier(.16,1,.3,1),box-shadow .25s}
.tile:hover{transform:translateY(-3px);box-shadow:0 16px 32px -18px rgb(10 20 48 / .45)}
.tile .bar{background:var(--court);color:var(--onCourt);display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.7rem 1rem}
.tile .bar b{font-family:'Big Shoulders Display',sans-serif;font-weight:800;font-size:1.7rem;text-transform:uppercase;line-height:1}
.score{background:var(--ball);color:var(--onBall);font-weight:700;font-size:.78rem;text-transform:uppercase;letter-spacing:.06em;padding:.3rem .55rem;white-space:nowrap}
.score[data-s=hold]{background:transparent;color:var(--onCourt);box-shadow:inset 0 0 0 1.5px var(--courtMuted)}
.tile .img{aspect-ratio:16/9;overflow:hidden;border-bottom:1px solid var(--rule);background:var(--bg)}
.tile .img img{width:100%;height:100%;object-fit:cover;object-position:top left;display:block}
.tile .tx{padding:1rem 1rem 1.2rem}
.tile .tx p{margin:0 0 .5rem}
.tile .pf{font-size:.85rem;color:var(--muted);text-transform:uppercase;letter-spacing:.05em;font-weight:600}
.results{list-style:none;margin:2rem 0 0;padding:0;border-top:3px solid var(--ink)}
.results li{display:grid;grid-template-columns:minmax(0,1fr) auto auto;gap:1rem;align-items:center;padding:.8rem 0;border-bottom:1px solid var(--rule)}
.results b{font-weight:600}
.results span{font-size:.85rem;color:var(--muted);text-transform:uppercase;letter-spacing:.05em}
.offers3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:2px;background:color-mix(in srgb,var(--onCourt) 25%,transparent);border:2px solid color-mix(in srgb,var(--onCourt) 25%,transparent)}
.offers3 a{background:var(--court);padding:1.5rem 1.4rem 1.75rem;text-decoration:none;display:block;min-height:100%}
.offers3 a:hover{background:color-mix(in srgb,var(--court) 85%,#000)}
.offers3 h3{margin-bottom:.6rem}
.offers3 p{margin:0;color:var(--courtMuted)}
.cta{display:inline-flex;align-items:center;gap:.5rem;background:var(--ball);color:var(--onBall);font-weight:700;text-transform:uppercase;letter-spacing:.04em;text-decoration:none;padding:1rem 1.4rem;min-height:44px;font-size:.95rem}
.cta:hover{filter:brightness(1.06)}
.mail{font-family:'Big Shoulders Display',sans-serif;font-weight:800;font-size:clamp(1.9rem,6.6vw,5.4rem);line-height:1;text-transform:uppercase;text-decoration:none;color:var(--ink);box-shadow:inset 0 -.14em 0 var(--ball);overflow-wrap:anywhere}
footer.site{background:var(--ink);color:var(--bg);padding:2.5rem 0 3rem;font-size:.92rem}
footer.site a{color:var(--bg)}
footer.site .wrap{display:flex;flex-wrap:wrap;gap:.5rem 2rem}
/* services */
.offer{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(1.25rem,4vw,4rem);padding:clamp(2.5rem,6vw,4rem) 0;border-bottom:1px solid var(--rule)}
.offer:first-child{border-top:3px solid var(--ink)}
.offer table{width:100%;border-collapse:collapse;margin-top:1.25rem}
.offer th{text-align:left;vertical-align:top;width:10rem;font-size:.82rem;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);padding:.75rem 1rem .75rem 0;border-top:1px solid var(--rule)}
.offer td{padding:.75rem 0;border-top:1px solid var(--rule)}
.chips{display:flex;gap:.5rem;flex-wrap:wrap}
.chips a{background:var(--court);color:var(--onCourt);text-decoration:none;font-weight:600;padding:.3rem .7rem;font-size:.9rem}
.one{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(1.25rem,4vw,4rem)}
.one ol{margin:0;padding:0;list-style:none;display:grid;gap:1.1rem;counter-reset:n}
.one li{display:grid;grid-template-columns:2.5rem minmax(0,1fr);counter-increment:n}
.one li::before{content:counter(n);font-family:'Big Shoulders Display',sans-serif;font-weight:800;font-size:2rem;line-height:1;color:var(--ball)}
/* case: match sheet */
.sheet{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));border:2px solid color-mix(in srgb,var(--onCourt) 35%,transparent);margin-top:2.5rem}
.sheet div{padding:.75rem 1rem;border-right:1px solid color-mix(in srgb,var(--onCourt) 22%,transparent)}
.sheet div:last-child{border-right:0}
.sheet dt{font-size:.75rem;text-transform:uppercase;letter-spacing:.08em;color:var(--courtMuted)}
.sheet dd{margin:.25rem 0 0;font-weight:600}
.back{color:var(--courtMuted);text-decoration:none;font-size:.9rem;text-transform:uppercase;letter-spacing:.05em;display:inline-block;margin-bottom:1.5rem}
.shot{margin:0;transform:translateY(clamp(-4rem,-6vw,-2rem));margin-bottom:clamp(-2rem,-3vw,-1rem)}
.shot img{width:100%;height:auto;display:block;border:1px solid var(--rule);box-shadow:0 24px 48px -24px rgb(10 20 48 / .5)}
figcaption{font-size:.85rem;color:var(--muted);margin-top:.6rem}
.body{max-width:44rem}
.case-grid{display:grid;grid-template-columns:minmax(0,1fr) 16rem;gap:clamp(1.5rem,5vw,5rem)}
.body h2{font-size:clamp(1.8rem,3.2vw,2.6rem);margin:2.75rem 0 1rem}
.body p{font-size:1.125rem}
.fig{margin:2.5rem 0}
.fig img{width:100%;height:auto;display:block;border:1px solid var(--rule)}
.notdone{background:var(--ball);color:var(--onBall);padding:1.25rem 1.5rem;margin:2.75rem 0}
.notdone h2{margin:0 0 .5rem;font-size:1.7rem}
.notdone p{margin:0}
.aside-cta{position:sticky;top:1.5rem;align-self:start;border-top:3px solid var(--ink);padding-top:1rem}
.aside-cta h2{font-size:1.8rem;margin-bottom:.6rem}
/* contact */
.three{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(1rem,2vw,1.5rem);list-style:none;margin:0;padding:0;counter-reset:n}
.three li{background:var(--surface);border:1px solid var(--rule);border-top:6px solid var(--court);padding:1.25rem 1.25rem 1.5rem;counter-increment:n}
.three li::before{content:counter(n);display:block;font-family:'Big Shoulders Display',sans-serif;font-weight:800;font-size:3rem;line-height:1;color:var(--court);margin-bottom:.5rem}
@media (prefers-color-scheme:dark){.three li::before{color:var(--ball)}}
.three b{display:block;font-size:1.15rem;margin-bottom:.25rem}
.three span{color:var(--muted)}
.picks{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(1rem,2vw,1.5rem)}
.pick{display:flex;flex-direction:column;justify-content:space-between;gap:1rem;min-height:9rem;background:var(--court);color:var(--onCourt);padding:1.25rem;text-decoration:none}
.pick b{font-family:'Big Shoulders Display',sans-serif;font-weight:800;font-size:1.9rem;text-transform:uppercase;line-height:1}
.pick span{font-size:.85rem;color:var(--courtMuted)}
.pick:hover{background:var(--ball);color:var(--onBall)}
.pick:hover span{color:var(--onBall)}
.cside{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(1.25rem,3vw,3rem)}
.cside h2{font-size:1.8rem;margin-bottom:.6rem}
.cside ul{list-style:none;margin:0;padding:0;display:grid;gap:.45rem}
@media (max-width:860px){
  .board,.offers3,.offer,.one,.three,.picks,.cside,.case-grid{grid-template-columns:1fr}
  .sheet{grid-template-columns:repeat(2,minmax(0,1fr))}
  .sheet div{border-bottom:1px solid color-mix(in srgb,var(--onCourt) 22%,transparent)}
  .offer th{width:7.5rem}
  nav.main{order:3;width:100%;gap:1.1rem}
  header.site .wrap{padding-top:.4rem;row-gap:0}
  .aside-cta{position:static}
}
@media (prefers-reduced-motion:reduce){*{transition:none!important}}
.photo{margin:0;height:clamp(14rem,42vw,30rem);overflow:hidden;border-block:6px solid var(--ball,#ffd23f)}.photo img{width:100%;height:100%;object-fit:cover;object-position:center 70%;display:block}
@media (max-width:560px){.results li{grid-template-columns:1fr auto;row-gap:.2rem}.results li b{grid-column:1/-1}}
img[src$="magistician-phone.png"]{max-width:min(100%,22rem);margin-inline:auto;display:block}
`;

function header(base, lang, key) {
  const L = t[lang];
  const cur = (k) => (k === key || (k === 'work' && key === 'case') ? ' aria-current="page"' : '');
  return `<header class="site"><div class="wrap">
<a class="brand" href="${href(base, lang, 'front')}"><i aria-hidden="true"></i>Koivupiilo</a>
<nav class="main" aria-label="${lang === 'fi' ? 'Päävalikko' : 'Main'}">
<a href="${href(base, lang, 'front', '#tyot')}"${cur('work')}>${L.nav.work}</a>
<a href="${href(base, lang, 'services')}"${cur('services')}>${L.nav.services}</a>
<a href="${href(base, lang, 'contact')}"${cur('contact')}>${L.nav.contact}</a>
</nav>${langSwitch(base, lang, key)}</div></header>`;
}
function footer(base, lang, key) {
  const F = t[lang].footer;
  return `<footer class="site"><div class="wrap"><span>${F.company} · ${F.bid} · ${F.place}</span><a href="mailto:${EMAIL}">${EMAIL}</a>${langSwitch(base, lang, key)}</div></footer>`;
}
const workHref = (base, lang, slug) => (slug === 'magistician' ? href(base, lang, 'case') : href(base, lang, 'front', '#tyot'));

function front(base, lang) {
  const F = t[lang].front;
  // Emphasise the domain words of the H1 in ball yellow.
  const h1 = esc(F.h1).replace(lang === 'fi' ? 'urheiluun ja arkeen' : 'sport and everyday life', (m) => `<em>${m}</em>`);
  return `<section class="court hero">${courtSvg}<div class="wrap"><h1>${h1}</h1><p class="lede">${esc(F.lede)}</p></div></section>
<section id="tyot" aria-labelledby="h-p"><div class="wrap">
<div class="sh"><h2 id="h-p">${esc(F.productsH)}</h2></div>
<div class="board">${products.map((p) => `<a class="tile" href="${workHref(base, lang, p.slug)}">
<span class="bar"><b>${p.name}</b><span class="score" data-s="${p.status}">${status(lang, p.status)}</span></span>
<span class="img"><img src="/assets/img/${p.img}" alt="" loading="lazy"></span>
<span class="tx"><p>${esc(p[lang])}</p><span class="pf">${esc(p.platform[lang])}</span></span></a>`).join('')}</div>
<h3 style="margin-top:3rem;font-size:1.6rem">${esc(F.moreH)}</h3>
<ul class="results">${moreWork.map((m) => `<li><b>${esc(m.name[lang])}</b><span>${esc(m.platform[lang])}</span><span>${status(lang, m.status)}</span></li>`).join('')}</ul>
</div></section>
<figure class="photo"><img src="/assets/photos/beach-court-rainbow-2000.jpg" srcset="/assets/photos/beach-court-rainbow-1000.jpg 1000w, /assets/photos/beach-court-rainbow-2000.jpg 2000w" sizes="100vw" alt="${lang==='fi'?'Beachkenttä ja sateenkaari kesäillassa':'A beach volleyball court under a rainbow on a summer evening'}" loading="lazy"></figure>
<section class="court" aria-labelledby="h-o">${courtSvg}<div class="wrap">
<div class="sh"><h2 id="h-o">${esc(F.offersH)}</h2><a href="${href(base, lang, 'services')}">${esc(F.offersLink)} →</a></div>
<div class="offers3">${offers[lang].map((o) => `<a href="${href(base, lang, 'services', '#' + o.id)}"><h3>${esc(o.name)}</h3><p>${esc(o.lead)}</p></a>`).join('')}</div>
</div></section>
<section><div class="wrap"><p class="lede">${esc(F.contactLine)}</p><a class="mail" href="${href(base, lang, 'contact')}">${EMAIL}</a></div></section>`;
}

function services(base, lang) {
  const S = t[lang].services;
  return `<section class="court hero">${courtSvg}<div class="wrap"><h1>${esc(S.h1)}</h1><p class="lede">${esc(S.lede)}</p></div></section>
<section><div class="wrap">
${offers[lang].map((o) => `<article class="offer" id="${o.id}"><h2>${esc(o.name)}</h2><div><p class="lede">${esc(o.lead)}</p>
<table><tr><th scope="row">${S.who}</th><td>${esc(o.who)}</td></tr><tr><th scope="row">${S.starts}</th><td>${esc(o.starts)}</td></tr><tr><th scope="row">${S.format}</th><td>${esc(o.format)}</td></tr>
${o.proof.length ? `<tr><th scope="row">${S.proof}</th><td class="chips">${o.proof.map((s) => `<a href="${workHref(base, lang, s)}">${product(s).name}</a>`).join('')}</td></tr>` : ''}</table></div></article>`).join('')}
</div></section>
<section style="padding-top:0"><div class="wrap one"><h2>${esc(S.oneH)}</h2><div><ol>${S.one.map((x) => `<li><span>${esc(x)}</span></li>`).join('')}</ol>
<p style="margin-top:1.75rem"><a class="cta" href="${href(base, lang, 'contact')}">${esc(S.cta)} →</a></p></div></div></section>`;
}

function caseP(base, lang) {
  const C = caseStudy[lang], L = t[lang].case;
  return `<section class="court hero" style="padding-bottom:clamp(5rem,10vw,8rem)">${courtSvg}<div class="wrap">
<a class="back" href="${href(base, lang, 'front', '#tyot')}">← ${L.backToWork}</a>
<h1 style="font-size:clamp(2.8rem,8vw,6.5rem)">${esc(C.h1)}</h1><p class="lede">${esc(C.problem)}</p>
<dl class="sheet">${Object.entries(L.strip).map(([k, l]) => `<div><dt>${l}</dt><dd>${esc(C.strip[k])}</dd></div>`).join('')}</dl></div></section>
<div class="wrap"><figure class="shot"><img src="/assets/img/${C.hero.src}" alt="${esc(C.hero.alt)}"><figcaption>${esc(C.hero.caption)}</figcaption></figure>
<div class="case-grid"><div class="body">
${C.sections.map((s) => `<h2>${esc(s.h)}</h2>${s.p.map((p) => `<p>${esc(p)}</p>`).join('')}${s.img ? `<figure class="fig"><img src="/assets/img/${s.img.src}" alt="${esc(s.img.alt)}" loading="lazy"><figcaption>${esc(s.img.caption)}</figcaption></figure>` : ''}`).join('')}
<aside class="notdone"><h2>${esc(C.notDone.h)}</h2><p>${esc(C.notDone.p)}</p></aside></div>
<aside class="aside-cta"><h2>${esc(L.nextH)}</h2><p>${esc(L.next)}</p><a class="cta" href="${href(base, lang, 'contact')}">${esc(t[lang].nav.contact)} →</a></aside>
</div></div><div style="height:5rem"></div>`;
}

function contact(base, lang) {
  const C = t[lang].contact;
  return `<section class="court hero">${courtSvg}<div class="wrap"><h1>${esc(C.h1)}</h1><p class="lede">${esc(C.lede)}</p></div></section>
<section><div class="wrap"><a class="mail" href="${mailto('Koivupiilo', draftBody(lang))}">${EMAIL}</a></div></section>
<section style="padding-top:0" aria-labelledby="h-i"><div class="wrap"><h2 id="h-i" style="margin-bottom:1.75rem">${esc(C.includeH)}</h2>
<ol class="three">${C.include.map(([b, s]) => `<li><b>${esc(b)}</b><span>${esc(s)}</span></li>`).join('')}</ol></div></section>
<section style="padding-top:0" aria-labelledby="h-b"><div class="wrap"><h2 id="h-b" style="margin-bottom:1.75rem">${esc(C.byOfferH)}</h2>
<div class="picks">${offers[lang].map((o) => `<a class="pick" href="${mailto(C.subject(o.name), draftBody(lang))}"><b>${esc(o.name)}</b><span>${esc(C.subject(o.name))}</span></a>`).join('')}</div></div></section>
<section style="padding-top:0"><div class="wrap cside">
<div><h2>${esc(C.nowH)}</h2><p>${esc(C.now)}</p><p style="color:var(--muted)">${esc(C.langs)}</p></div>
<div><h2>${esc(C.elsewhereH)}</h2><ul>${elsewhere.map(([n, u]) => `<li><a href="${u}" rel="me">${n}</a></li>`).join('')}</ul></div>
</div></section>`;
}

export function render(base, lang, key) {
  const L = t[lang];
  const map = { front, services, case: caseP, contact };
  const titles = { front: L.front.title, services: L.services.title, case: L.case.title, contact: L.contact.title };
  return doc({ base, lang, key, title: titles[key], description: key === 'case' ? caseStudy[lang].problem : L.front.lede, css, header: header(base, lang, key), main: map[key](base, lang), footer: footer(base, lang, key) });
}
