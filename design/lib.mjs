import { routes, t, EMAIL, elsewhere, products, statusLabel } from './content.mjs';

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const pages = ['front', 'services', 'case', 'contact'];
export const langs = ['fi', 'en'];
export const product = (slug) => products.find((p) => p.slug === slug);
export const status = (lang, key) => statusLabel[lang][key];
export const mailto = (subject, body) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;
export { routes, t, EMAIL, elsewhere, products };

// Each direction is served under /<dir>/ in the sandbox; in the real site base is ''.
export const href = (base, lang, key, hash = '') => `${base}${routes[lang][key]}${hash}`;

export function fontFaces(faces) {
  return faces.map(([family, file, weight = '100 900']) =>
    `@font-face{font-family:'${family}';src:url('/assets/fonts/${file}') format('woff2');font-weight:${weight};font-style:normal;font-display:swap}`).join('\n');
}

// Shared shell: lang, hreflang pairs (S-2), OG basics, skip link, no theme toggle.
export function doc({ base, lang, key, title, description, css, header, main, footer, bodyClass = '' }) {
  const other = t[lang].other;
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="alternate" hreflang="fi" href="https://koivupiilo.fi${routes.fi[key]}">
<link rel="alternate" hreflang="en" href="https://koivupiilo.fi${routes.en[key]}">
<link rel="alternate" hreflang="x-default" href="https://koivupiilo.fi${routes.fi[key]}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:locale" content="${lang === 'fi' ? 'fi_FI' : 'en_GB'}">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<style>${css}</style>
</head>
<body class="${bodyClass}">
<a class="skip" href="#main">${esc(t[lang].skip)}</a>
${header}
<main id="main">
${main}
</main>
${footer}
</body>
</html>
`;
}

// Same-page language switch (S-2): label in the target language.
export const langSwitch = (base, lang, key, cls = 'lang') => {
  const o = t[lang].other;
  return `<a class="${cls}" href="${href(base, o, key)}" hreflang="${o}" lang="${o}">${esc(t[lang].switchLabel)}</a>`;
};

// Contact body template used by the S-3 "what to write" moment.
export function draftBody(lang) {
  return lang === 'fi'
    ? 'Hei Jarkko,\n\nOlen tekemässä: \n\nJumissa on: \n\nAikataulu ja raamit: \n\n'
    : 'Hi Jarkko,\n\nI’m working on: \n\nWhere I’m stuck: \n\nTimeline and budget: \n\n';
}
