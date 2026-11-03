import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import postcss from 'postcss';
import {root,pages,render} from './render.mjs';

const bootSource=fs.readFileSync(path.join(root,'assets/js/intro-boot.js'),'utf8');
const motionSource=fs.readFileSync(path.join(root,'assets/js/motion.js'),'utf8');
let checks=0;
const check=(condition,message)=>{assert.ok(condition,message);checks++};

// Deterministic control-flow tests, not a rendering engine. The GSAP adapter
// follows timeline/context semantics and records the requested animations.
function harness({page='index',reduced=false,seen=false,blockedStorage=false,referrer='',history=false,width=1440,assetsHang=false,engine=true}={}){
 const result=render(page,{interactive:true,reduced,width});
 const {document,window,context}=result;
 const originalText=document.querySelector('main').textContent;
 const originalHero=document.querySelector('h1').innerHTML;
 let now=0,sequence=0,currentContext=null;
 const tasks=new Map(),records=[],mediaQueries=new Map(),contexts=[],observers=[],navigations=[],warnings=[];
 const schedule=(fn,ms=0)=>{const id=++sequence;tasks.set(id,{fn,at:now+ms});return id};
 const cancel=id=>tasks.delete(id);
 async function advance(ms){
  const end=now+ms;
  for(let guard=0;guard<2000;guard++){
   await Promise.resolve();await Promise.resolve();
   const next=[...tasks].filter(([,task])=>task.at<=end).sort((a,b)=>a[1].at-b[1].at)[0];
   if(!next){now=end;await Promise.resolve();return}
   tasks.delete(next[0]);now=next[1].at;next[1].fn();
  }
  throw Error('Animation timers did not settle');
 }
 const query=text=>{
  if(!mediaQueries.has(text)){
   const m=new window.EventTarget();m.media=text;
   m.matches=text.includes('no-preference')?!reduced:text.includes('reduced-motion')?reduced:width>=768;
   mediaQueries.set(text,m);
  }
  return mediaQueries.get(text);
 };
 const changeReduced=value=>{
  reduced=value;
  for(const [text,mql]of mediaQueries){
   if(!text.includes('prefers-reduced-motion'))continue;
   mql.matches=text.includes('no-preference')?!value:value;
   const event=new window.Event('change');event.matches=mql.matches;mql.dispatchEvent(event);
  }
 };
 const storage=new Map(seen?[['aman-cinematic-intro-v1','seen']]:[]);
 const location={href:'http://localhost:8000/'+page+'.html',origin:'http://localhost:8000',assign(url){navigations.push(url)}};
 document.referrer=referrer;
 document.fonts={ready:assetsHang?new Promise(()=>{}):Promise.resolve()};
 const heroImage=document.getElementById('hero-portrait');if(heroImage)heroImage.decode=()=>assetsHang?new Promise(()=>{}):Promise.resolve();
 const resolveTargets=targets=>typeof targets==='string'?[...document.querySelectorAll(targets)]:targets?.nodeType?[targets]:Array.from(targets??[]);
 const apply=(targets,vars)=>{
  for(const el of resolveTargets(targets)){
   if(!el.style)continue;
   if(currentContext&&!currentContext.styles.has(el))currentContext.styles.set(el,el.getAttribute('style'));
   for(const prop of ['opacity','clipPath'])if(prop in vars)el.style[prop]=String(vars[prop]);
   if(vars.clearProps)for(const key of vars.clearProps.split(','))el.style.removeProperty(key==='clipPath'?'clip-path':key);
  }
 };
 const controlled=(fn,ctx)=>()=>{const previous=currentContext;currentContext=ctx;try{fn()}finally{currentContext=previous}};
 const tween=(targets,from,to,owner=currentContext)=>{
  const record={targets:resolveTargets(targets),from,to,owner,killed:false,ids:[]};records.push(record);owner?.animations.push(record);
  record.kill=()=>{record.killed=true;record.ids.forEach(cancel)};
  const play=()=>{
   if(record.killed)return;
   const size=record.targets.length;
   const stagger=typeof to.stagger==='number'?to.stagger*Math.max(0,size-1):to.stagger?.amount??(to.stagger?.each??0)*Math.max(0,size-1);
   const duration=((to.duration??0)*(1+(to.repeat??0))+(to.delay??0)+stagger)*1000;
   if(from)controlled(()=>apply(targets,from),owner)();
   record.ids.push(schedule(controlled(()=>{apply(targets,to);to.onComplete?.()},owner),duration));
   return duration;
  };
  record.play=play;
  if(!to.scrollTrigger)play();
  return record;
 };
 const ScrollTrigger={refresh(){},getAll:()=>records.filter(r=>r.to.scrollTrigger&&!r.killed).map(r=>({trigger:r.to.scrollTrigger.trigger,kill(){r.kill()}}))};
 const gsap={
  registerPlugin(plugin){check(plugin===ScrollTrigger,'ScrollTrigger registered')},
  set(targets,vars){apply(targets,vars)},
  fromTo:(targets,from,to)=>tween(targets,from,to),
  to:(targets,to)=>tween(targets,null,to),
  timeline(options={}){
   const owner=currentContext;const start=now;let end=0,completion=null;
   const timeline={killed:false,ids:[]};owner?.animations.push(timeline);
   const extend=(position,vars={},targets=[])=>{
    const size=resolveTargets(targets).length;
    const stagger=typeof vars.stagger==='number'?vars.stagger*Math.max(0,size-1):0;
    const pos=typeof position==='number'?position:end/1000;
    end=Math.max(end,(pos+(vars.duration??0)+stagger)*1000);
    cancel(completion);completion=schedule(controlled(()=>{if(!timeline.killed)options.onComplete?.()},owner),Math.max(0,start+end-now));
    return pos;
   };
   timeline.to=(targets,vars,position)=>{const pos=extend(position,vars,targets);timeline.ids.push(schedule(controlled(()=>{if(!timeline.killed)apply(targets,vars)},owner),Math.max(0,start+(pos+(vars.duration??0))*1000-now)));return timeline};
   timeline.fromTo=(targets,from,to,position)=>{const pos=extend(position,to,targets);if(!pos)apply(targets,from);timeline.ids.push(schedule(controlled(()=>{if(!timeline.killed)apply(targets,to)},owner),Math.max(0,start+(pos+(to.duration??0))*1000-now)));return timeline};
   timeline.call=(fn,args,position)=>{const pos=extend(position);timeline.ids.push(schedule(()=>{if(!timeline.killed)fn(...(args??[]))},Math.max(0,start+pos*1000-now)));return timeline};
   timeline.kill=()=>{timeline.killed=true;cancel(completion);timeline.ids.forEach(cancel)};
   return timeline;
  },
  matchMedia(){
   const owned=[];
   const create=callback=>{
    const ctx={styles:new Map(),animations:[],cleanup:null};contexts.push(ctx);
    ctx.add=(name,fn)=>ctx[name]=(...args)=>{const previous=currentContext;currentContext=ctx;try{return fn(...args)}finally{currentContext=previous}};
    ctx.revert=()=>{ctx.animations.forEach(a=>a.kill());for(const [el,style]of ctx.styles){if(style===null)el.removeAttribute('style');else el.setAttribute('style',style)}ctx.cleanup?.()};
    const previous=currentContext;currentContext=ctx;try{ctx.cleanup=callback(ctx)}finally{currentContext=previous}
    return ctx;
   };
   return {add(text,callback){const mql=query(text);const entry={ctx:mql.matches?create(callback):null,mql};entry.changed=()=>{entry.ctx?.revert();entry.ctx=mql.matches?create(callback):null};mql.addEventListener('change',entry.changed);owned.push(entry)},revert(){owned.forEach(entry=>{entry.ctx?.revert();entry.mql.removeEventListener('change',entry.changed)})}};
  }
 };
 Object.assign(context,{matchMedia:query,sessionStorage:{getItem:key=>{if(blockedStorage)throw Error('Storage blocked');return storage.get(key)},setItem:(key,value)=>{if(blockedStorage)throw Error('Storage blocked');storage.set(key,value)}},performance:{now:()=>now,getEntriesByType:()=>[{type:history?'back_forward':'navigate'}]},location,URL,CustomEvent:window.CustomEvent,NodeFilter:{SHOW_TEXT:4},setTimeout:schedule,clearTimeout:cancel,console:{warn:(...args)=>warnings.push(args)},MutationObserver:class{constructor(callback){this.callback=callback;observers.push(this)}observe(){this.active=true}disconnect(){this.active=false}}});
 window.location=location;
 vm.runInContext(bootSource,context,{filename:'intro-boot.js'});
 const boot=window.AmanIntro;
 const start=()=>{if(engine){window.gsap=gsap;window.ScrollTrigger=ScrollTrigger}else{delete window.gsap;delete window.ScrollTrigger}vm.runInContext(motionSource,context,{filename:'motion.js'})};
 const event=(type,props={})=>{const e=new window.Event(type,{bubbles:true,cancelable:true});Object.assign(e,props);return e};
 return {...result,boot,advance,start,storage,warnings,records,contexts,observers,navigations,event,changeReduced,originalText,originalHero,scroll(){records.filter(r=>r.to.scrollTrigger).forEach(r=>r.play())}};
}

const first=harness();
check(first.boot.active&&first.document.documentElement.classList.contains('intro-pending'),'first homepage starts covered');
check(first.storage.get('aman-cinematic-intro-v1')==='seen','visit remembered before navigation');
first.start();
check(first.warnings.length===0,'animation controller initializes');
check(first.document.querySelector('main').textContent===first.originalText,'word splitting preserves every visible text character');
check(first.document.querySelector('h1').getAttribute('aria-label')==="Let's Explore The Wonders Of AI.",'split hero keeps one readable accessible heading');
check([...first.document.querySelectorAll('h1 em .motion-glyph')].map(g=>g.textContent).join('')==='Wonders','emphasized letters preserve the highlighted word');
const creativeCard=first.document.querySelector('.creative-card');
check(first.records.some(r=>r.to.scrollTrigger?.trigger===creativeCard),'cards have individual viewport entrances');
check(creativeCard.querySelector('h3').getAttribute('aria-label')==='AI World','animated card title retains its accessible name');
await first.advance(1900);check(first.boot.active,'intro title finishes before curtain exit');
await first.advance(900);check(!first.boot.active&&first.document.getElementById('brand-intro').hidden,'normal intro exits within 2.8 seconds');
check(!first.document.documentElement.classList.contains('intro-pending'),'scroll lock released after normal intro');
check(!first.document.documentElement.classList.contains('cinematic-boot'),'hero revealed after intro');
first.scroll();await first.advance(1600);
const beforeHover=first.records.length;
creativeCard.dispatchEvent(first.event('pointerover',{pointerType:'mouse',relatedTarget:null}));
check(first.records.length===beforeHover+1,'mouse entry animates a card title');
creativeCard.querySelector('h3').dispatchEvent(first.event('pointerover',{pointerType:'mouse',relatedTarget:creativeCard}));
check(first.records.length===beforeHover+1,'moving within a card does not restart its title');
first.document.querySelector('[data-portrait="8"]').click();check(first.document.getElementById('portrait-name').textContent==='Golden hour','portrait controls still work after loader');
const hide=first.event('pagehide');first.window.dispatchEvent(hide);
check(first.document.querySelector('h1').innerHTML===first.originalHero,'pagehide restores original heading markup');
check(first.contexts.every(ctx=>ctx.animations.every(a=>a.killed)),'pagehide kills tracked timelines and tweens');
first.window.dispatchEvent(first.event('pageshow',{persisted:true}));check(!first.boot.active,'history restore does not replay full loader');
check(first.warnings.length===0,'history restore reinitializes without errors');

for(const options of [{seen:true},{reduced:true},{history:true},{blockedStorage:true,referrer:'http://localhost:8000/work.html'}]){
 const h=harness(options);check(!h.boot.active,'full intro skipped: '+JSON.stringify(options));h.start();await h.advance(3000);check(!h.document.documentElement.classList.contains('intro-pending'),'skipped intro never leaves a lock');
 if(options.reduced)check(!h.document.querySelector('.motion-word'),'reduced-motion users retain unsplit text');
}
const hung=harness({assetsHang:true});hung.start();await hung.advance(2900);check(!hung.boot.active,'hanging images and fonts cannot hold the loader');
const missing=harness({engine:false});missing.start();check(!missing.boot.active&&missing.boot.expired,'missing GSAP immediately exposes the website');
const stalled=harness();await stalled.advance(4300);check(!stalled.boot.active&&stalled.boot.expired,'boot watchdog releases site if deferred code never executes');
const skip=harness();skip.start();skip.document.dispatchEvent(skip.event('keydown',{key:'Tab'}));check(!skip.boot.active,'Tab skips loader before focusing the page');
const changed=harness();changed.start();changed.changeReduced(true);check(!changed.boot.active&&!changed.document.querySelector('.motion-word'),'live reduced-motion preference cancels intro and restores headings');
check(changed.contexts.every(ctx=>ctx.animations.every(a=>a.killed)),'preference change cleans up animations');

for(const page of pages){
 const h=harness({page,seen:true,width:375});h.start();await h.advance(1800);
 check(h.warnings.length===0,page+': controller initializes at mobile width');
 check(h.document.querySelector('main').textContent===h.originalText,page+': content preserved');
 if(page!=='index')check(!h.boot.active&&!h.document.getElementById('brand-intro'),page+': no branded loader');
 h.window.dispatchEvent(h.event('pagehide'));check(h.observers.every(o=>!o.active),page+': observers disconnected');
}
const nav=harness({page:'work',seen:true});nav.start();await nav.advance(1800);
const link=nav.document.querySelector('a[href="./companies.html"]');
link.dispatchEvent(nav.event('click',{button:0,ctrlKey:true}));await nav.advance(500);check(nav.navigations.length===0,'modified clicks keep native navigation');
link.dispatchEvent(nav.event('click',{button:0}));await nav.advance(200);check(nav.navigations.length===1&&nav.navigations[0].endsWith('/companies.html'),'normal internal link navigates after short fade');
const external=nav.document.querySelector('a[target="_blank"]');external.dispatchEvent(nav.event('click',{button:0}));await nav.advance(500);check(nav.navigations.length===1,'external links retain their native target');
nav.window.dispatchEvent(nav.event('pagehide'));nav.window.dispatchEvent(nav.event('pageshow',{persisted:true}));check(!nav.document.getElementById('app').style.opacity,'Back/Forward restores page opacity');

const filtered=harness({page:'companies',seen:true});filtered.start();await filtered.advance(1800);
const oldCards=[...filtered.document.querySelectorAll('.company-card')];
filtered.document.querySelector('[data-category="Gaming"]').click();
filtered.observers.filter(o=>o.active).forEach(o=>o.callback());
check(filtered.document.querySelectorAll('.company-card').length===1,'directory remains functional with animated titles');
check(filtered.document.querySelector('.company-card h3').getAttribute('aria-label')==='Apex Edge Gaming','new filter results receive accessible title animation');
check(filtered.records.filter(r=>oldCards.includes(r.to.scrollTrigger?.trigger)).every(r=>r.killed),'filter replacement removes obsolete card triggers');
filtered.window.dispatchEvent(filtered.event('pagehide'));

postcss.parse(fs.readFileSync(path.join(root,'assets/css/motion.css'),'utf8'));
postcss.parse(fs.readFileSync(path.join(root,'assets/css/polish.css'),'utf8'));
for(const page of pages){
 const {document}=render(page);
 const scripts=[...document.querySelectorAll('script[src]')].map(s=>s.getAttribute('src'));
 const styles=[...document.querySelectorAll('link[rel="stylesheet"]')].map(s=>s.getAttribute('href'));
 check(styles.indexOf('./assets/css/style.css')<styles.indexOf('./assets/css/polish.css')&&styles.indexOf('./assets/css/polish.css')<styles.indexOf('./assets/css/motion.css'),page+': visual refinement and motion styles load in order');
 check(scripts.indexOf('./assets/js/intro-boot.js')<scripts.indexOf('./assets/js/site.js'),page+': boot runs before site');
 check(scripts.indexOf('./assets/js/site.js')<scripts.indexOf('./assets/js/motion.js')&&scripts.indexOf('./assets/vendor/ScrollTrigger.min.js')<scripts.indexOf('./assets/js/motion.js'),page+': animation dependencies ordered');
 check(document.toString().indexOf('<meta charset=')<1024,page+': encoding declaration stays early');
 check(!document.querySelector('.brand-intro[role="progressbar"]'),'decorative sweep does not claim measured progress');
}
console.log('PASS: '+checks+' cinematic loader, timing, fallback, motion preference, content preservation, lifecycle and navigation checks.');
console.log('These checks verify orchestration with a deterministic GSAP adapter, not visual browser rendering.');
