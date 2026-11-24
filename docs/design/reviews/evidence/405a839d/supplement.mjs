import {createRequire} from 'node:module';import {writeFileSync,mkdirSync,readFileSync} from 'node:fs';
const {chromium}=createRequire('/Users/jarkko/code/postiz-app/node_modules/')('playwright');const d='docs/design/reviews/evidence/405a839d';mkdirSync(`${d}/extra`,{recursive:true});
const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});const results=[];
for(const scheme of ['light','dark'])for(const url of ['/','/en/','/tuotteet/','/en/products/']){
 const c=await b.newContext({viewport:{width:1440,height:900},colorScheme:scheme,reducedMotion:'reduce'});const p=await c.newPage();await p.goto('http://127.0.0.1:4188'+url);await p.evaluate(()=>document.fonts.ready);
 await p.evaluate(()=>{const es=[...document.querySelectorAll('body,body *')],sizes=es.map(e=>getComputedStyle(e).fontSize);es.forEach((e,i)=>e.style.fontSize=2*parseFloat(sizes[i])+'px')});
 const over=await p.evaluate(()=>[...document.querySelectorAll('main *')].filter(e=>e.getBoundingClientRect().right>document.documentElement.clientWidth+1).map(e=>({tag:e.tagName,class:e.className,text:e.textContent.trim(),right:e.getBoundingClientRect().right,display:getComputedStyle(e).display,whiteSpace:getComputedStyle(e).whiteSpace})));
 const name=(url==='/'?'root':url.replaceAll('/','-'))+'-'+scheme;await p.screenshot({path:`${d}/extra/text200${name}.png`,fullPage:true});results.push({url,scheme,over});await c.close();
}
// The bilingual error page has two explicit recovery destinations; check both rather than assuming a locale switch.
const c=await b.newContext({viewport:{width:390,height:844}});const p=await c.newPage();for(const path of ['/','/en/']){await p.goto('http://127.0.0.1:4188/404.html');const link=p.locator(`main a[href="${path}"]`);const label=await link.innerText();await link.click();results.push({errorRecovery:label,expected:path,actual:new URL(p.url()).pathname});}
await c.close();
// Normal and reduced cold arrival frames: no content reveal is hidden behind the bark animation.
for(const reduce of ['no-preference','reduce']){const c=await b.newContext({viewport:{width:390,height:844},reducedMotion:reduce});const p=await c.newPage();await p.goto('http://127.0.0.1:4188/en/',{waitUntil:'domcontentloaded'});for(const ms of [0,300,1200]){if(ms)await p.waitForTimeout(ms===300?300:900);await p.screenshot({path:`${d}/extra/arrival-${reduce}-${ms}.jpg`});}results.push({reduce,animations:await p.evaluate(()=>document.getAnimations().map(a=>({state:a.playState,name:a.animationName}))),mainVisible:await p.locator('main').isVisible()});await c.close();}
await b.close();writeFileSync(`${d}/supplement.json`,JSON.stringify(results,null,2)+'\n');console.log(JSON.stringify(results.map(x=>({url:x.url,scheme:x.scheme,over:x.over?.map(y=>({tag:y.tag,class:y.class,right:y.right})),...('errorRecovery'in x?x:{}),...('reduce'in x?x:{})}))));
