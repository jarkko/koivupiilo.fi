import { createRequire } from "node:module";
const require = createRequire("/Users/jarkko/code/metamorphosis/kit/");
const { chromium } = require("playwright");
const b = await chromium.launch(); const out = [];
for (const r of ["/fi/", "/", "/fi/yhteystiedot/", "/contact/"]) for (const vp of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
  const bufs = [];
  for (const port of [4719, 4720]) { const p = await b.newPage({ viewport: vp }); const reqs = []; p.on("request", (q) => q.resourceType() === "font" && reqs.push(q.url().split("/").pop())); await p.goto(`http://127.0.0.1:${port}${r}`, { waitUntil: "networkidle" }); await p.evaluate(() => document.fonts.ready); bufs.push({ img: await p.screenshot({ fullPage: true }), reqs }); await p.close(); }
  out.push({ route: r, width: vp.width, identical: Buffer.compare(bufs[0].img, bufs[1].img) === 0, current_fonts: bufs[0].reqs.length, fixed_fonts: bufs[1].reqs.length, fixed_files: bufs[1].reqs });
}
await b.close(); console.log(JSON.stringify(out, null, 1));
