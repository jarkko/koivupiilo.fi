import {createRequire} from 'node:module';
import {createServer} from 'node:http';
import {readFileSync,writeFileSync,existsSync,statSync,mkdtempSync,rmSync} from 'node:fs';
import {join,extname} from 'node:path';import {tmpdir} from 'node:os';
const {chromium}=createRequire('/Users/jarkko/code/postiz-app/node_modules/')('playwright');
const dir=join(process.cwd(),'docs/design/reviews/evidence/238053d5');
const server=createServer((q,r)=>{let p=join(process.cwd(),'output',q.url.split(/[?#]/)[0]);if(existsSync(p)&&statSync(p).isDirectory())p=join(p,'index.html');if(!existsSync(p)){r.writeHead(404);return r.end();}r.setHeader('content-type',({'.html':'text/html','.css':'text/css','.js':'text/javascript','.woff2':'font/woff2','.webp':'image/webp'})[extname(p)]||'application/octet-stream');r.end(readFileSync(p));}).listen(0);
await new Promise(ok=>server.once('listening',ok));const origin=`http://localhost:${server.address().port}`;
const profile=mkdtempSync(join(tmpdir(),'rmzoom-'));
const ctx=await chromium.launchPersistentContext(profile,{executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',viewport:{width:1440,height:900},reducedMotion:'reduce'});
await ctx.route('https://join.koivupiilo.fi/**',r=>r.abort());
const settings=ctx.pages()[0],p=await ctx.newPage(),report={mechanism:'Real Chrome page zoom, set through chrome://settings/appearance #zoomLevel; no CSS zoom or device scale emulation.',zoom:[],stress:[]};
await settings.goto('chrome://settings/appearance');await settings.locator('#zoomLevel').waitFor();
const levels=await settings.locator('#zoomLevel').evaluate(e=>[...e.options].map(x=>({value:x.value,label:x.text})).filter(x=>+x.value>=1&&+x.value<=2));report.levels=levels;
const measure=()=>p.evaluate(()=>({innerWidth,innerHeight,dpr:devicePixelRatio,scrollWidth:document.documentElement.scrollWidth,bodyFont:getComputedStyle(document.body).fontSize,offscreen:[...document.querySelectorAll('h1,h2,h3,p,a,button,input,label,li')].filter(e=>{const r=e.getBoundingClientRect(),c=getComputedStyle(e);return r.width&&r.height&&c.position!=='absolute'&&r.right>innerWidth+1;}).map(e=>({tag:e.tagName,cls:e.className,text:e.textContent.slice(0,70),r:e.getBoundingClientRect().toJSON()})),clipped:[...document.querySelectorAll('p,h1,h2,h3,label,button')].filter(e=>{const c=getComputedStyle(e);return e.clientHeight&&e.scrollHeight>e.clientHeight+2&&['hidden','clip'].includes(c.overflowY);}).map(e=>e.textContent)}));
for(const level of levels){
 await settings.locator('#zoomLevel').selectOption(level.value);
 for(const theme of ['light','dark'])for(const [lc,route]of [['fi','/ratametsuri/'],['en','/en/ratametsuri/'],['privacy-fi','/tietosuoja/'],['privacy-en','/en/privacy/']]){
  await p.emulateMedia({colorScheme:theme});await p.goto(origin+route);await p.evaluate(()=>document.fonts.ready);
  const m=await measure(),name=`zoom${Math.round(+level.value*100)}-${lc}-${theme}`;
  report.zoom.push({name,level,...m});
  if(+level.value===2||m.offscreen.length||m.clipped.length){
   await p.screenshot({path:join(dir,'shots',name+'.jpg'),type:'jpeg',quality:66});
   if(route.includes('ratametsuri')){await p.locator('.signup').scrollIntoViewIfNeeded();await p.screenshot({path:join(dir,'shots',name+'-form.jpg'),type:'jpeg',quality:66});}
  }
  if(route.includes('ratametsuri')){await p.locator('#email').fill('not-an-email');await p.locator('#consent').check();await p.locator('button').click();report.zoom.at(-1).validationFocus=await p.evaluate(()=>document.activeElement.id);}
 }
}
await settings.locator('#zoomLevel').selectOption('1');
for(const w of [320,390,1440])for(const lc of ['fi','en'])for(const theme of ['light','dark']){
 await p.setViewportSize({width:w,height:w===1440?900:844});await p.emulateMedia({colorScheme:theme});await p.goto(origin+(lc==='fi'?'/ratametsuri/':'/en/ratametsuri/'));await p.evaluate(()=>document.fonts.ready);
 const long='marja-liisa.korhonen-virtanen@suunnistusseura-esimerkki.example.fi';await p.locator('#email').fill(long);
 const longField=await p.locator('#email').evaluate(e=>({value:e.value,clientWidth:e.clientWidth,scrollWidth:e.scrollWidth,scrollLeft:e.scrollLeft}));
 // Text spacing per WCAG 1.4.12. This does not change the source.
 await p.addStyleTag({content:'*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}'});
 const name=`spacing-${lc}-${w}-${theme}`,m=await measure();report.stress.push({name,longField,...m});await p.screenshot({path:join(dir,'shots',name+'.jpg'),fullPage:true,type:'jpeg',quality:66});
}
writeFileSync(join(dir,'zoom-report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({levels,cells:report.zoom.length,failures:report.zoom.filter(x=>x.offscreen.length||x.clipped.length).map(x=>x.name),stressFailures:report.stress.filter(x=>x.offscreen.length||x.clipped.length).map(x=>x.name)}));await ctx.close();rmSync(profile,{recursive:true,force:true});server.close();
