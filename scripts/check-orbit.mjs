import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';
import {root,render} from './render.mjs';

// Deterministic GSAP adapter: native pin positioning needs a visual browser.
let count=0;
const check=(value,message)=>{assert.ok(value,message);count++};
function harness({reduced=false,height=900,heroHeight=880,fail=false,loading=false}={}){
 const triggers=[],contexts=[],tweens=[];let media,refreshes=0,warnings=0,frames=0;
 const result=render('index',{interactive:true,reduced,setup({window,document,context}){
  Object.defineProperty(document,'readyState',{value:loading?'loading':'complete',configurable:true});
  Object.defineProperty(window.HTMLElement.prototype,'offsetHeight',{get:()=>heroHeight,configurable:true});
  window.innerHeight=height;
  media=new window.EventTarget();media.matches=reduced;
  context.matchMedia=query=>query.includes('prefers-reduced-motion')?media:{matches:false,addEventListener(){}};
  context.requestAnimationFrame=()=>{frames++;return 1};
  context.console={...console,warn(){warnings++}};
  window.gsap={
   registerPlugin(){},
   context(){const owned=[];const ctx={add(fn){const n=tweens.length;fn();owned.push(...tweens.slice(n))},revert(){ctx.reverted=true;owned.forEach(t=>t.killed=true)}};contexts.push(ctx);return ctx},
   fromTo(state,from,to){
    state.progress=from.progress;
    const tween={state,from,to,seek(progress){state.progress=from.progress+(to.progress-from.progress)*progress;to.onUpdate()}};
    tweens.push(tween);return tween;
   }
  };
  window.ScrollTrigger={
   create(config){
    if(fail)throw Error('Engine failed');
    const trigger={config,progress:0,start:0,end:Number(config.end().slice(2)),kill(revert){trigger.killed=true;trigger.reverted=revert},seek(progress){trigger.progress=progress;config.animation.seek(progress)}};
    triggers.push(trigger);config.onRefresh(trigger);return trigger;
   },
   refresh(){refreshes++;triggers.filter(t=>!t.killed).forEach(t=>t.config.onRefresh(t))},
   update(){triggers.filter(t=>!t.killed).forEach(t=>t.seek(Math.max(0,Math.min(1,(window.scrollY-t.start)/(t.end-t.start))))) }
  };
  window.scrollTo=({top})=>{window.scrollY=top};
 }});
 const emit=(target,type,props={})=>{const e=new result.window.Event(type,{bubbles:true,cancelable:true});Object.assign(e,props);target.dispatchEvent(e)};
 return {...result,triggers,contexts,tweens,emit,media,stats:()=>({refreshes,warnings,frames})};
}
const h=harness(),d=h.document,t=h.triggers[0];
const photos=[...d.querySelectorAll('.orbit-photo')],scene=d.querySelector('.orbit-scene');
const transforms=()=>photos.map(p=>p.style.transform);
const xyz=photo=>photo.style.transform.match(/translate3d\(([-.\d]+)px,([-.\d]+)px,([-.\d]+)px\)/).slice(1).map(Number);
check(h.triggers.length===1&&t.config.pin===true&&t.config.pinSpacing===true,'hero has one pin with reserved space before the next section');
check(t.config.scrub===true&&t.config.invalidateOnRefresh===true,'scroll scrubbing and refresh invalidation enabled');
check(t.config.start==='top top'&&t.end===2700,'desktop pins from the first scroll with a responsive scroll distance');
check(h.tweens[0].from.progress===0&&h.tweens[0].to.progress===1&&h.tweens[0].to.paused===true&&h.tweens[0].to.ease==='none','scroll owns the entire linear turn with no timed autoplay');
check(h.stats().frames===0,'no independent rotation animation frames are scheduled');
check(photos.length===9&&new Set(photos.map(p=>p.querySelector('img').src)).size===9,'all nine existing photos retained');
check(new Set(transforms()).size===9&&xyz(photos[0])[2]>0&&xyz(photos[4])[2]<0,'actual photos span nine unique positions with front and back depth');
const initial=photos.map(xyz),titles=new Set();
for(let i=0;i<9;i++){t.seek(i/9);titles.add(d.getElementById('portrait-name').textContent)}
check(titles.size===9,'every photo appears at the front during a turn');
t.seek(.25);const quarter=transforms();
check(photos.every((p,i)=>Math.abs(xyz(p)[0]-initial[i][0])>1),'scroll moves every actual photo around the orbit');
t.seek(.75);t.seek(.25);
check(JSON.stringify(transforms())===JSON.stringify(quarter),'reverse scrolling restores exactly the same geometry');
t.seek(1);
check(photos.every((p,i)=>xyz(p).every((n,j)=>Math.abs(n-initial[i][j])<.002)),'end of pin is exactly one seamless 360-degree rotation');
t.seek(.43);const mid=transforms();h.emit(h.window,'resize');h.window.ScrollTrigger.refresh();
check(JSON.stringify(transforms())===JSON.stringify(mid),'refresh preserves scroll progress without resetting the orbit');
h.emit(d.getElementById('hero-visual'),'pointerenter',{pointerType:'mouse'});t.seek(.5);
check(JSON.stringify(transforms())!==JSON.stringify(mid),'hover cannot block scroll-controlled rotation');
check(Number(photos[0].style.opacity)<Number(photos[4].style.opacity),'back portraits dim smoothly relative to the front');
t.seek(0);d.querySelector('[data-orbit-step="1"]').click();
check(d.getElementById('portrait-name').textContent==='City lights'&&Math.abs(h.window.scrollY-t.end/9)<.001,'next control seeks the actual page scroll position');
h.emit(scene,'keydown',{key:'ArrowRight'});
check(d.getElementById('portrait-name').textContent==='The open road','keyboard controls remain synchronized with scrolling');
d.querySelector('.orbit-restart').click();check(h.window.scrollY===0,'restart returns to the beginning of the scroll story');
scene.getBoundingClientRect=()=>({width:300});h.emit(h.window,'resize');
check(scene.style.perspective==='555px','resize updates perspective');
h.media.matches=true;h.emit(h.media,'change');
check(t.killed&&t.reverted&&h.contexts[0].reverted&&!d.querySelector('.has-scroll-orbit'),'enabling reduced motion removes the pin and cleans the GSAP context');
d.querySelector('[data-portrait="8"]').click();check(d.getElementById('portrait-name').textContent==='Golden hour','reduced motion retains manual photo selection');
h.media.matches=false;h.emit(h.media,'change');check(h.triggers.length===2,'disabling reduced motion restores scroll animation');
h.emit(h.window,'pagehide');check(h.triggers[1].killed,'pagehide removes the scroll instance');
h.emit(h.window,'pageshow',{persisted:true});check(h.triggers.length===3&&!h.triggers[2].killed,'history return recreates the pin');
const mobile=harness({height:700,heroHeight:1250});
check(mobile.triggers[0].config.start==='top top','tall heroes also pin immediately instead of scrolling the page first');
check(mobile.triggers[0].end===2100,'mobile scroll distance follows viewport height');
const reduced=harness({reduced:true});check(reduced.triggers.length===0,'reduced motion never pins the page');
const failed=harness({fail:true});check(!failed.document.querySelector('.has-scroll-orbit')&&failed.contexts[0].reverted&&failed.stats().warnings===1,'engine failure cleans up and preserves normal scrolling');
const deferred=harness({loading:true});check(deferred.triggers.length===0,'initialization waits for deferred GSAP scripts');
deferred.emit(deferred.document,'DOMContentLoaded');check(deferred.triggers.length===1,'scroll sequence initializes after all deferred scripts load');
const fallback=render('index',{interactive:true});fallback.document.querySelector('[data-portrait="3"]').click();
check(fallback.document.getElementById('portrait-name').textContent==='Building ideas','missing GSAP leaves a working gallery and normal page scrolling');
const css=postcss.parse(fs.readFileSync(path.join(root,'assets/css/hero-orbit.css'),'utf8'));
check(css.nodes.length>0,'orbit stylesheet parses');
console.log('PASS: '+count+' scroll pinning, full rotation, reverse, controls, lifecycle, responsive geometry, reduced-motion and failure checks.');
