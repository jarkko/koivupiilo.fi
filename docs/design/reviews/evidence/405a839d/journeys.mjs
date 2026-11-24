import {createRequire} from 'node:module';import {writeFileSync} from 'node:fs';
const {chromium}=createRequire('/Users/jarkko/code/postiz-app/node_modules/')('playwright');const d='docs/design/reviews/evidence/405a839d';const root='http://127.0.0.1:4188';
const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});const report=[];
const pairs=[['/','/en/'],['/tuotteet/','/en/products/'],['/studio/','/en/studio/'],['/valmennus/','/en/coaching/'],['/yritys/','/en/company/'],['/tietosuoja/','/en/privacy/']];
for(const locale of ['fi-FI','en-GB']){const c=await b.newContext({locale,viewport:{width:390,height:844},reducedMotion:'reduce'});const p=await c.newPage();let n=0;
 const click=async(link,expected,walk)=>{const label=(await link.innerText()).trim(),stem=`journey-${locale}-${++n}`;await p.screenshot({path:`${d}/strips/${stem}-before.jpg`});await link.click();await p.waitForURL(root+expected);await p.waitForTimeout(300);await p.screenshot({path:`${d}/strips/${stem}-300.jpg`});await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:`${d}/strips/${stem}-after.jpg`});report.push({locale,walk,label,expected,actual:new URL(p.url()).pathname,mainVisible:await p.locator('main').isVisible(),stem});};
 for(const pair of pairs){await p.goto(root+pair[0]);await click(p.locator('header a[hreflang]'),pair[1],'W3');await click(p.locator('header a[hreflang]'),pair[0],'W3');}
 for(let i=0;i<2;i++){await p.goto(root+pairs[3][i]);await click(p.locator(`main a[href="${pairs[1][i]}"]`),pairs[1][i],'W2');await click(p.locator(`header a[href="${pairs[3][i]}"]`),pairs[3][i],'W2');}
 await c.close();}
await b.close();writeFileSync(`${d}/journeys.json`,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({transitions:report.length,hiddenMain:report.filter(x=>!x.mainVisible)}));
