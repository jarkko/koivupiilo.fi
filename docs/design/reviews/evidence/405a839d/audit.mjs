import {createRequire} from 'node:module';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const {chromium}=createRequire('/Users/jarkko/code/postiz-app/node_modules/')('playwright');
const dir='docs/design/reviews/evidence/405a839d'; mkdirSync(`${dir}/strips`,{recursive:true});
const origin='http://127.0.0.1:4188';
const pairs=[['/','/en/'],['/tuotteet/','/en/products/'],['/studio/','/en/studio/'],['/valmennus/','/en/coaching/'],['/yritys/','/en/company/'],['/tietosuoja/','/en/privacy/']];
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const report={routes:[],redirects:[],walks:[],zoom:[],errors:[],sitemap:[]};
for(const locale of ['fi-FI','en-GB']){
 const context=await browser.newContext({locale,viewport:{width:390,height:844},reducedMotion:'reduce'});const p=await context.newPage();
 for(const pair of pairs)for(let i=0;i<2;i++){
  const path=pair[i];await p.goto(origin+path);await p.evaluate(()=>document.fonts.ready);
  const info=await p.evaluate(()=>({lang:document.documentElement.lang,title:document.title,canonical:document.querySelector('link[rel=canonical]')?.href,alternates:[...document.querySelectorAll('link[hreflang]')].map(x=>[x.hreflang,x.href]),nav:[...document.querySelectorAll('header nav a')].map(x=>[x.textContent.trim(),x.getAttribute('href'),x.getAttribute('aria-current')]),empty:[...document.querySelectorAll('main section,main p,main ul,main blockquote')].filter(x=>!x.textContent.trim()).map(x=>x.outerHTML),statuses:[...document.querySelectorAll('.status')].map(x=>x.textContent.trim()),links:[...document.querySelectorAll('a[href]')].map(x=>x.getAttribute('href'))}));
  const lang=p.locator('header a[hreflang]');const target=await lang.getAttribute('href');await lang.click();await p.waitForURL(origin+pair[1-i]);
  const back=p.locator('header a[hreflang]');await back.click();await p.waitForURL(origin+path);
  report.routes.push({locale,path,...info,switchTo:target,switchBack:new URL(p.url()).pathname});
  if(info.empty.length)report.errors.push({path,empty:info.empty});
  if(path.includes('studio')&&await p.locator('#capacity').count())report.errors.push({path,capacity:'still present'});
  if(path.includes('company')||path==='/yritys/')if(await p.locator('blockquote.voice').count())report.errors.push({path,quote:'still present'});
  for(const href of info.links.filter(h=>h.startsWith('/')&&!h.startsWith('//'))){const resp=await context.request.get(origin+href.split('#')[0]);if(resp.status()!==200)report.errors.push({path,href,status:resp.status()});}
  await p.keyboard.press('Tab'); await p.goto(origin+path); await p.keyboard.press('Tab');await p.keyboard.press('Enter');
  report.walks.push({locale,path,skip:await p.evaluate(()=>document.activeElement?.id)});
 }
 for(const [old,to] of [['/tyot/','/tuotteet/'],['/en/work/','/en/products/']]){
  const html=await (await context.request.get(origin+old)).text();await p.goto(origin+old);await p.waitForURL(origin+to);
  report.redirects.push({locale,old,to,actual:p.url(),refresh:html.match(/http-equiv="refresh"[^>]+/)?.[0],canonical:html.match(/rel="canonical"[^>]+/)?.[0],noindex:html.includes('content="noindex"'),fallback:html.match(/<a href="([^"]+)"/)?.[1]});
 }
 // Drive the changed paths via their real controls and preserve all three transition frames.
 for(const [lang,start] of [['fi','/'],['en','/en/']]){
  await p.goto(origin+start);let n=0;
  for(const target of [pairs[1][lang==='en'?1:0],pairs[2][lang==='en'?1:0],pairs[3][lang==='en'?1:0],pairs[4][lang==='en'?1:0],pairs[5][lang==='en'?1:0],pairs[0][lang==='en'?1:0]]){
   const link=p.locator(`a[href="${target}"]`).first();const label=(await link.innerText()).trim();const stem=`${locale}-${lang}-${++n}`;
   await p.screenshot({path:`${dir}/strips/${stem}-before.jpg`});await link.click();await p.waitForTimeout(300);await p.screenshot({path:`${dir}/strips/${stem}-300.jpg`});await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:`${dir}/strips/${stem}-after.jpg`});
   report.walks.push({locale,lang,label,target,actual:new URL(p.url()).pathname,stem});
  }
  for(const path of [pairs[2][lang==='en'?1:0],pairs[3][lang==='en'?1:0]]){await p.goto(origin+path);report.walks.push({locale,path,mail:[...await p.locator('a[href^="mailto:"]').evaluateAll(es=>es.map(e=>[e.textContent.trim(),e.getAttribute('href')]))]});}
 }
 // Reflow and text-only stress, explicitly not a claim of browser-menu zoom conformance.
 for(const path of [...pairs.flat(),'/404.html']){
  await p.setViewportSize({width:1440,height:900});await p.goto(origin+path);
  await p.evaluate(()=>{const nodes=[...document.querySelectorAll('body,body *')];const sizes=nodes.map(e=>parseFloat(getComputedStyle(e).fontSize));nodes.forEach((e,i)=>e.style.fontSize=`${sizes[i]*2}px`);});
  report.zoom.push({locale,path,kind:'computed-font-200%-stress',overflow:await p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth)});
 }
 await context.close();
}
const sitemap=readFileSync('output/sitemap.xml','utf8');report.sitemap=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(x=>x[1]);
report.sitemapHasOldPaths=/https:\/\/koivupiilo.fi\/(tyot|en\/work)\//.test(sitemap);
await browser.close();writeFileSync(`${dir}/audit.json`,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({routes:report.routes.length,redirects:report.redirects.length,walks:report.walks.length,errors:report.errors,zoomOverflow:report.zoom.filter(x=>x.overflow),sitemap:report.sitemap.length,sitemapHasOldPaths:report.sitemapHasOldPaths}));
