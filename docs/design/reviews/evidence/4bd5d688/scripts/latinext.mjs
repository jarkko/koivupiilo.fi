// On-demand subset probe: latin-ext and cyrillic faces load only when their characters appear.
import { createRequire } from "node:module";
const require = createRequire("/Users/jarkko/code/metamorphosis/kit/");
const { chromium } = require("playwright");
const BASE = process.env.BASE;
const b = await chromium.launch(); const out = [];
for (const [label, text] of [["none", null], ["latin-ext", "Šakki, Łódź, Ő, Ž"], ["cyrillic", "Привет"]]) {
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  const reqs = []; p.on("request", (q) => q.resourceType() === "font" && reqs.push(q.url().split("/").pop().replace(/-[A-Z0-9]+\.woff2$/, "")));
  await p.goto(BASE + "/fi/", { waitUntil: "networkidle" });
  const before = [...reqs];
  let fonts = null;
  if (text) {
    await p.evaluate((t) => { const el = document.createElement("p"); el.id = "probe"; el.textContent = t; document.querySelector("main").prepend(el); }, text);
    await p.waitForLoadState("networkidle"); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
    const cdp = await p.context().newCDPSession(p); await cdp.send("DOM.enable"); await cdp.send("CSS.enable");
    const { root } = await cdp.send("DOM.getDocument", { depth: -1 }); const { nodeId } = await cdp.send("DOM.querySelector", { nodeId: root.nodeId, selector: "#probe" });
    fonts = (await cdp.send("CSS.getPlatformFontsForNode", { nodeId })).fonts;
  }
  out.push({ probe: label, text, initial_requests: before, added_requests: reqs.slice(before.length), platform_fonts: fonts });
  await p.close();
}
await b.close(); console.log(JSON.stringify(out, null, 1));
