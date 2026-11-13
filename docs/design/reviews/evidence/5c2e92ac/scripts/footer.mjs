import { createRequire } from "node:module";
const require = createRequire("/Users/jarkko/code/metamorphosis/kit/");
const { chromium } = require("playwright");
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.goto("http://127.0.0.1:4719/fi/", { waitUntil: "networkidle" });
const r = await p.evaluate(() => {
  const f = document.querySelector("footer"); const out = { footerBg: getComputedStyle(f).backgroundImage, footerBgColor: getComputedStyle(f).backgroundColor, items: [] };
  for (const el of f.querySelectorAll("p, a")) { const s = getComputedStyle(el); out.items.push({ tag: el.tagName, text: el.textContent.trim().slice(0, 40), color: s.color, size: s.fontSize, weight: s.fontWeight }); }
  return out;
});
// sample the rendered pixels behind the footer text: screenshot the footer and find the darkest/lightest background
const fb = await p.locator("footer").boundingBox();
await p.locator("footer").screenshot({ path: process.argv[2] });
console.log(JSON.stringify(r, null, 1));
await b.close();
