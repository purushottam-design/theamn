/* Runs before body paint. Every lock has a bounded, engine-independent escape. */
(() => {
 'use strict';
 const html=document.documentElement;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const key='aman-cinematic-intro-v1';
 let seen=false;
 try{seen=sessionStorage.getItem(key)==='seen'}catch{}
 // A blocked storage API must not replay the full intro during internal navigation.
 try{if(document.referrer&&new URL(document.referrer).origin===location.origin)seen=true}catch{}
 const returning=performance.getEntriesByType?.('navigation')[0]?.type==='back_forward';
 const active=html.dataset.page==='index'&&!reduced.matches&&!seen&&!returning;
 const state=window.AmanIntro={active,expired:false,started:performance.now(),finish};
 let timer;
 function finish(reason='complete'){
  const wasActive=state.active;
  state.active=false;
  if(reason==='timeout'||reason==='engine-unavailable')state.expired=true;
  clearTimeout(timer);
  html.classList.remove('intro-pending','cinematic-boot');
  const loader=document.getElementById('brand-intro');
  if(loader){loader.hidden=true;loader.style.removeProperty('clip-path')}
  const app=document.getElementById('app');
  if(app){app.style.removeProperty('clip-path');app.style.removeProperty('opacity')}
  if(wasActive)window.dispatchEvent(new CustomEvent('aman:intro-ended',{detail:reason}));
 }
 if(!reduced.matches&&!returning)html.classList.add('cinematic-boot');
 if(active){
  html.classList.add('intro-pending');
  try{sessionStorage.setItem(key,'seen')}catch{}
 }
 timer=setTimeout(()=>finish('timeout'),active?4200:1400);
 reduced.addEventListener('change',event=>{if(event.matches)finish('reduced-motion')});
 window.addEventListener('pageshow',event=>{if(event.persisted)finish('history-restore')});
})();
