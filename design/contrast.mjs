// WCAG contrast for each direction's text/background token pairs, light and dark.
import * as A from './directions/a.mjs'; import * as B from './directions/b.mjs'; import * as C from './directions/c.mjs';
const lum = (h) => { const c = h.replace('#', '').match(/../g).map((x) => parseInt(x, 16) / 255).map((v) => v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const fgs = ['ink', 'muted', 'link', 'accent', 'onField', 'onCourt', 'courtMuted', 'onBall', 'onAccent', 'mark'];
const bgs = { ink: ['bg', 'surface'], muted: ['bg', 'surface'], link: ['bg', 'surface'], accent: ['bg', 'surface'], onField: ['field'], onCourt: ['court'], courtMuted: ['court'], onBall: ['ball'], onAccent: ['accent'] };
let bad = 0;
for (const [id, m] of [['a', A.meta], ['b', B.meta], ['c', C.meta]]) for (const s of ['light', 'dark']) {
  const t = m.colors[s];
  for (const f of fgs) for (const b of (bgs[f] || [])) if (t[f] && t[b]) {
    const r = ratio(t[f], t[b]); const line = `${id} ${s} ${f} on ${b}: ${r.toFixed(2)}`;
    if (r < 4.5) { bad++; console.log('FAIL ' + line); } else if (process.argv[2]) console.log('ok   ' + line);
  }
}
console.log(bad ? `${bad} pairs under 4.5:1` : 'all text pairs ≥ 4.5:1');
