// The favicon: the three lenticels of the wordmark on an ink square.
// Usage: node design/mark/favicon.mjs  -> src/favicon.svg, src/favicon.ico, src/apple-touch-icon.png
// The colours are the paper and ink tokens of frontend/styles/tokens.css.
import { writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const { chromium } = createRequire('/Users/jarkko/code/postiz-app/node_modules/')('playwright');
const src = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'src');
const INK = '#151513', PAPER = '#f5f3ee';
const r = (v) => String(Math.round(v * 100) / 100);
const lens = (x0, x1, y, t, taper = 0.2, skew = 0) => {
  const L = x1 - x0, h = t / 1.5, a = L * (taper + skew), b = L * (taper - skew);
  return `M${r(x0)} ${r(y)}C${r(x0 + a)} ${r(y - h)} ${r(x1 - b)} ${r(y - h)} ${r(x1)} ${r(y)}C${r(x1 - b)} ${r(y + h)} ${r(x0 + a)} ${r(y + h)} ${r(x0)} ${r(y)}Z`;
};
const marks = lens(5, 22.5, 9.4, 4.8, 0.2, 0.04) + lens(12.5, 27, 16, 4.8, 0.2, -0.03) + lens(7.5, 23.5, 22.6, 4.8, 0.2, 0.03);
const svg = (radius, scheme) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${scheme ? `<style>rect{fill:${INK}}path{fill:${PAPER}}@media (prefers-color-scheme:dark){rect{fill:${PAPER}}path{fill:${INK}}}</style>` : ''}<rect width="32" height="32" rx="${radius}"${scheme ? '' : ` fill="${INK}"`}/><path d="${marks}"${scheme ? '' : ` fill="${PAPER}"`}/></svg>\n`;
writeFileSync(join(src, 'favicon.svg'), svg(7, true));

const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const shot = async (size, radius) => {
  const p = await (await b.newContext({ viewport: { width: size, height: size }, deviceScaleFactor: 1 })).newPage();
  await p.setContent(`<body style="margin:0;background:transparent">${svg(radius, false).replace('<svg ', `<svg width="${size}" height="${size}" style="display:block" `)}</body>`);
  const png = await p.screenshot({ omitBackground: true });
  await p.context().close();
  return png;
};
const [p16, p32, p180] = [await shot(16, 7), await shot(32, 7), await shot(180, 0)];
await b.close();
writeFileSync(join(src, 'apple-touch-icon.png'), p180);
// ICO container holding the 16 and 32 px PNGs.
const images = [[16, p16], [32, p32]];
const head = Buffer.alloc(6 + 16 * images.length);
head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(images.length, 4);
let offset = head.length;
images.forEach(([size, png], i) => {
  const at = 6 + 16 * i;
  head.writeUInt8(size, at); head.writeUInt8(size, at + 1); head.writeUInt8(0, at + 2); head.writeUInt8(0, at + 3);
  head.writeUInt16LE(1, at + 4); head.writeUInt16LE(32, at + 6); head.writeUInt32LE(png.length, at + 8); head.writeUInt32LE(offset, at + 12);
  offset += png.length;
});
writeFileSync(join(src, 'favicon.ico'), Buffer.concat([head, ...images.map(([, png]) => png)]));
console.log('favicon.svg, favicon.ico, apple-touch-icon.png written');
