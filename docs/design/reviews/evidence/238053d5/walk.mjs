import {createRequire} from 'node:module';
import {createServer} from 'node:http';
import {readFileSync,writeFileSync,mkdirSync,existsSync,statSync,mkdtempSync,rmSync} from 'node:fs';
import {join,extname} from 'node:path';
import {tmpdir} from 'node:os';
const {chromium}=createRequire('/Users/jarkko/code/postiz-app/node_modules/')('playwright');
const root=process.cwd(),dir=join(root,'docs/design/reviews/evidence/238053d5');
mkdirSync(join(dir,'shots'),{recursive:true});
const chrome='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const formjs=readFileSync('/Users/jarkko/code/launchpad/kit/form.js','utf8');
writeFileSync(join(dir,'form-script-tested.js'),formjs);
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.woff2':'font/woff2','.webp':'image/webp','.svg':'image/svg+xml'};
const server=createServer((q,r)=>{let p=join(root,'output',decodeURIComponent(q.url.split(/[?#]/)[0]));if(existsSync(p)&&statSync(p).isDirectory())p=join(p,'index.html');if(!existsSync(p)){r.writeHead(404);return r.end();}r.setHeader('content-type',types[extname(p)]||'application/octet-stream');r.end(readFileSync(p));}).listen(0);
await new Promise(ok=>server.once('listening',ok));
const origin=`http://localhost:${server.address().port}`;
const browser=await chromium.launch({executablePath:chrome});
const report={head:'94e0cd3d30b8dffba6fa056e39d98a2700563e5d',origin,cells:[],issues:[],keyboard:[],zoom:[],network:[]};
const shot=async(p,name,fullPage=false)=>{await p.screenshot({path:join(dir,'shots',name+'.jpg'),type:'jpeg',quality:66,fullPage});};
const metrics=async p=>p.evaluate(()=>{
 const pos=s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect(),c=getComputedStyle(e);return {x:r.x,y:r.y+scrollY,w:r.width,h:r.height,bottom:r.bottom+scrollY,font:c.fontSize,text:e.textContent?.trim().slice(0,180),display:c.display};};
 const overflow=[...document.querySelectorAll('body *')].filter(e=>{const c=getComputedStyle(e),r=e.getBoundingClientRect();return r.width&&r.height&&c.position!=='absolute'&&r.right>innerWidth+1;}).map(e=>({tag:e.tagName,cls:e.className?.baseVal??e.className,text:e.textContent?.trim().slice(0,70),right:e.getBoundingClientRect().right}));
 return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,lang:document.documentElement.lang,headline:pos('.headline'),email:pos('#email'),button:pos('button'),consent:pos('.consent'),beta:pos('.beta'),features:pos('.rail'),status:pos('[data-launchpad-status]'),bodyFont:getComputedStyle(document.body).fontSize,overflow,active:document.activeElement?.id,invalid:document.querySelector('#email')?.getAttribute('aria-invalid'),value:document.querySelector('#email')?.value,checked:document.querySelector('#consent')?.checked,visibleMessages:[...document.querySelectorAll('.msg')].filter(e=>getComputedStyle(e).display!=='none').map(e=>({id:e.id,text:e.textContent}))};
});
const path=lc=>lc==='fi'?'/ratametsuri/':'/en/ratametsuri/';
const privacy=lc=>lc==='fi'?'/tietosuoja/':'/en/privacy/';
async function setup(ctx,control){
 await ctx.route('https://join.koivupiilo.fi/**',async route=>{
  const req=route.request(),u=new URL(req.url());
  if(u.pathname==='/kit/form.js')return control.noform?route.abort():route.fulfill({contentType:'text/javascript',body:formjs});
  if(u.pathname.endsWith('/token'))return route.fulfill({contentType:'application/json',headers:{'access-control-allow-origin':origin},body:JSON.stringify({t:'review-token',min_ms:0})});
  if(req.method()==='POST'){
   const data=Object.fromEntries(new URLSearchParams(req.postData()));
   if(data.email!=='a@b'&&!data.website)throw Error('Unsafe POST');
   control.posts.push(data);
   if(control.answer==='offline')return route.abort('internetdisconnected');
   if(control.answer==='native')return route.fulfill({status:303,headers:{location:origin+path(data.locale)+'#signup-check-email'}});
   if(control.delay)await new Promise(ok=>setTimeout(ok,control.delay));
   return route.fulfill({status:control.answer||202,contentType:'application/json',headers:{'access-control-allow-origin':origin},body:JSON.stringify(control.answer===422?{error:'invalid_email'}:{status:'check_email'})});
  }
  return route.fulfill({status:404,body:''});
 });
}
const defaults=[16,24];
for(const size of defaults){
 const profile=mkdtempSync(join(tmpdir(),'rm-review-'));
 mkdirSync(join(profile,'Default'));
 writeFileSync(join(profile,'Default','Preferences'),JSON.stringify({webkit:{webprefs:{default_font_size:size}}}));
 const ctx=await chromium.launchPersistentContext(profile,{executablePath:chrome,viewport:{width:390,height:844},reducedMotion:'reduce'});
 const ctl={answer:202,posts:[]};await setup(ctx,ctl);
 const p=ctx.pages()[0];p.on('pageerror',e=>report.issues.push({kind:'pageerror',message:e.message}));
 for(const lc of ['fi','en'])for(const w of [390,1440])for(const theme of ['light','dark']){
  await p.setViewportSize({width:w,height:w===390?844:900});await p.emulateMedia({colorScheme:theme});
  const name=`${lc}-${w}-${theme}-font${size}`;
  await p.goto(origin+path(lc));await p.evaluate(()=>document.fonts.ready);
  await shot(p,name+'-full',true);await shot(p,name+'-first');
  report.cells.push({name,state:'idle',...await metrics(p)});
  await p.locator('#email').focus();await p.waitForFunction(()=>document.querySelector('form').launchpad===true);
  await p.locator('#email').fill('a@b');await p.locator('button').click();
  report.cells.push({name,state:'consent-required',posts:ctl.posts.length,focused:await p.evaluate(()=>document.activeElement.id)});
  await shot(p,name+'-consent-required');
  await p.locator('#consent').check();
  for(const [label,answer]of [['invalid',422],['rate-limited',429],['server-error',500],['offline','offline'],['accepted',202]]){
   ctl.answer=answer;ctl.delay=450;
   await p.locator('button').scrollIntoViewIfNeeded();
   await shot(p,name+'-'+label+'-before');
   await p.locator('button').click();
   await p.waitForTimeout(300);await shot(p,name+'-'+label+'-300ms');
   await p.waitForFunction(()=>!['sending','idle'].includes(document.querySelector('form').dataset.state));
   await p.waitForTimeout(500);await shot(p,name+'-'+label+'-after');
   report.cells.push({name,state:label,...await metrics(p)});
  }
  ctl.answer=500;ctl.delay=2200;
  await p.locator('button').scrollIntoViewIfNeeded();await shot(p,name+'-sending-before');await p.locator('button').click();
  await p.waitForTimeout(300);await shot(p,name+'-sending-300ms');await p.waitForTimeout(1000);await shot(p,name+'-sending-after');
  report.cells.push({name,state:'sending',...await metrics(p)});
  await p.waitForTimeout(1200);
  // Correct the server-side error and re-submit from the keyboard.
  ctl.answer=202;ctl.delay=0;await p.locator('#email').focus();await p.keyboard.press('Enter');await p.waitForTimeout(150);
  report.cells.push({name,state:'retry-enter',...await metrics(p)});
  // Same-page language switch and privacy navigation, including Back preserving field.
  await p.locator('.lang').click();await p.waitForLoadState();
  report.cells.push({name,state:'language-switch',url:p.url(),lang:await p.locator('html').getAttribute('lang')});
  await p.goto(origin+path(lc));await p.locator('#email').fill('a@b');await p.locator('.consent a').click();await p.waitForLoadState();
  await shot(p,name+'-privacy-full',true);report.cells.push({name,state:'privacy',url:p.url(),...await metrics(p)});
  await p.goBack();report.cells.push({name,state:'privacy-back',...await metrics(p)});
  writeFileSync(join(dir,'walk-report.json'),JSON.stringify(report,null,2));
 }
 await ctx.close();rmSync(profile,{recursive:true,force:true});
}
// No JavaScript: every documented return state in every cell, regular and large text.
for(const size of defaults){
 const profile=mkdtempSync(join(tmpdir(),'rm-review-nojs-'));mkdirSync(join(profile,'Default'));writeFileSync(join(profile,'Default','Preferences'),JSON.stringify({webkit:{webprefs:{default_font_size:size}}}));
 const ctx=await chromium.launchPersistentContext(profile,{executablePath:chrome,javaScriptEnabled:false});
 const ctl={answer:'native',posts:[]};await setup(ctx,ctl);const p=ctx.pages()[0];
 for(const lc of ['fi','en'])for(const w of [390,1440])for(const theme of ['light','dark']){
  await p.setViewportSize({width:w,height:w===390?844:900});await p.emulateMedia({colorScheme:theme});
  for(const state of ['signup-check-email','signup-error','signup-try-later']){
   const name=`${lc}-${w}-${theme}-font${size}-nojs-${state}`;
   await p.goto(origin+path(lc));await shot(p,name+'-before');
   await p.goto(origin+path(lc)+'#'+state);await shot(p,name+'-300ms');await p.waitForTimeout(300);await shot(p,name+'-after');
   report.cells.push({name,state,...await metrics(p)});
  }
 }
 await p.goto(origin+path('en'));await p.locator('#email').fill('a@b');await p.locator('#consent').check();await p.locator('button').click();await p.waitForURL(/signup-check-email/);
 report.cells.push({name:`native-post-font${size}`,state:'native-post',url:p.url(),posts:ctl.posts,...await metrics(p)});
 await ctx.close();rmSync(profile,{recursive:true,force:true});
}
// Keyboard sequence and native constraint validation.
const ctx=await browser.newContext({viewport:{width:1440,height:900},colorScheme:'light'}),ctl={answer:422,posts:[]};await setup(ctx,ctl);const p=await ctx.newPage();await p.goto(origin+path('en'));
for(let i=0;i<8;i++){await p.keyboard.press('Tab');report.keyboard.push(await p.evaluate(()=>({tag:document.activeElement.tagName,id:document.activeElement.id,text:document.activeElement.textContent.trim().slice(0,80),outline:getComputedStyle(document.activeElement).outline})));await shot(p,'keyboard-'+i);}
await p.locator('#email').fill('not-an-email');await p.locator('button').click();report.cells.push({name:'native-invalid-email',state:'invalid',posts:ctl.posts,...await metrics(p)});await shot(p,'native-invalid-email');
// Arrival animation strips, and scrolling through the rail, both motion settings.
for(const lc of ['fi','en'])for(const w of [390,1440])for(const theme of ['light','dark'])for(const motion of ['reduce','no-preference']){
 await p.setViewportSize({width:w,height:w===390?844:900});await p.emulateMedia({colorScheme:theme,reducedMotion:motion});
 const name=`motion-${lc}-${w}-${theme}-${motion}`;await p.goto(origin+path(lc),{waitUntil:'domcontentloaded'});await shot(p,name+'-before');await p.waitForTimeout(300);await shot(p,name+'-300ms');await p.waitForTimeout(1200);await shot(p,name+'-after');
 await p.locator('.rail').scrollIntoViewIfNeeded();await shot(p,name+'-scroll-before');await p.waitForTimeout(300);await shot(p,name+'-scroll-300ms');await p.waitForTimeout(1600);await shot(p,name+'-scroll-after');
 report.cells.push({name,state:'motion',hidden:await p.locator('.sym.pre').count(),...await metrics(p)});
}
await ctx.close();await browser.close();server.close();writeFileSync(join(dir,'walk-report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({cells:report.cells.length,pageErrors:report.issues}));
