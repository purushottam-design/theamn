/* GSAP + ScrollTrigger enhancement for the existing static site. */
(() => {
 'use strict';
 const boot=window.AmanIntro;
 const gsap=window.gsap;
 const ScrollTrigger=window.ScrollTrigger;
 if(!gsap||!ScrollTrigger){boot?.finish('engine-unavailable');return}
 gsap.registerPlugin(ScrollTrigger);
 const app=document.getElementById('app');
 if(!app){boot?.finish('engine-unavailable');return}
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const fine=matchMedia('(hover: hover) and (pointer: fine)');
 const splitRecords=[];
 let media=null;
 let running=false;

 function splitHeading(heading){
  if(heading.dataset.motionSplit)return heading.querySelectorAll('.motion-word');
  const original=heading.innerHTML;
  const oldLabel=heading.getAttribute('aria-label');
  // Block lines and <br> need spaces in the accessible heading name.
  const copy=heading.cloneNode(true);
  copy.querySelectorAll('br').forEach(br=>br.replaceWith(document.createTextNode(' ')));
  copy.querySelectorAll('.hero-title-line').forEach(line=>line.append(document.createTextNode(' ')));
  heading.setAttribute('aria-label',copy.textContent.replace(/\s+/g,' ').trim());
  const walker=document.createTreeWalker(heading,NodeFilter.SHOW_TEXT);
  const nodes=[];
  while(walker.nextNode())nodes.push(walker.currentNode);
  for(const node of nodes){
   const fragment=document.createDocumentFragment();
   for(const token of node.textContent.split(/(\s+)/)){
    if(!token)continue;
    if(/^\s+$/.test(token)){fragment.append(document.createTextNode(token));continue}
    const mask=document.createElement('span');mask.className='motion-word-clip';mask.setAttribute('aria-hidden','true');
    const word=document.createElement('span');word.className='motion-word';word.textContent=token;
    const gold=node.parentElement.closest('em,.serif-highlight');
    if(gold&&heading.matches('h1')){
     word.textContent='';
     for(const [index,char]of [...token].entries()){
      const glyph=document.createElement('span');glyph.className='motion-glyph motion-gold';glyph.style.setProperty('--glyph-index',index);glyph.textContent=char;word.append(glyph);
     }
    }else if(gold)word.classList.add('motion-gold');
    mask.append(word);fragment.append(mask);
   }
   node.replaceWith(fragment);
  }
  heading.dataset.motionSplit='true';
  splitRecords.push({heading,original,oldLabel});
  return heading.querySelectorAll('.motion-word');
 }

 function restoreText(){
  for(const {heading,original,oldLabel}of splitRecords.splice(0)){
   heading.innerHTML=original;delete heading.dataset.motionSplit;
   if(oldLabel===null)heading.removeAttribute('aria-label');else heading.setAttribute('aria-label',oldLabel);
  }
 }

 function run({restored=false}={}){
  if(running)return;
  running=true;
  document.documentElement.classList.add('cinematic-ready');
  media=gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)',context=>{
   const disposers=[];
   const timers=new Set();
   const later=(fn,ms)=>{const id=setTimeout(()=>{timers.delete(id);fn()},ms);timers.add(id);return id};
   const listen=(target,type,fn,options)=>{target.addEventListener(type,fn,options);disposers.push(()=>target.removeEventListener(type,fn,options))};
   let disposed=false;
   let heroPlayed=false;
   let loaderTimeline=null;
   let exitTimeline=null;
   let navigating=false;
   let navigationTimer=null;
   const hero=document.querySelector('.hero-copy,.inner-hero-content');
   const heroVisual=document.querySelector('.hero-visual');
   const headings=[...document.querySelectorAll('main h1,main h2,main h3')].filter(h=>!h.closest('.company-card,.creative-card,.small-card,.journal-card,.venture-card'));
   headings.forEach(splitHeading);
   document.querySelectorAll('.creative-card h3,.company-card h3,.small-card h3,.journal-card h3').forEach(splitHeading);

   const playHero=context.add('playHero',()=>{
    if(heroPlayed||disposed)return;
    heroPlayed=true;
    const heading=hero?.querySelector('h1');
    const words=heading?.querySelectorAll('.motion-word');
    const tl=gsap.timeline({defaults:{ease:'power3.out'}});
    if(hero){
     gsap.set(hero,{opacity:1});
     tl.fromTo(words,{yPercent:110,opacity:0,rotationX:16,filter:'blur(7px)'},{yPercent:0,opacity:1,rotationX:0,filter:'blur(0px)',duration:.85,stagger:.075,clearProps:'transform,opacity,filter'},.06);
     const glyphs=heading?.querySelectorAll('.motion-glyph');
     if(glyphs?.length)tl.fromTo(glyphs,{yPercent:35,rotationX:25,opacity:0},{yPercent:0,rotationX:0,opacity:1,duration:.7,stagger:.025,clearProps:'transform,opacity'},.32);
     const label=hero.querySelector('.hero-edition,.eyebrow');
     if(label)tl.fromTo(label,{opacity:0,y:12},{opacity:1,y:0,duration:.55,clearProps:'transform,opacity'},0);
     const text=hero.querySelectorAll('.hero-description,.hero-roles,:scope > p');
     if(text.length)tl.fromTo(text,{opacity:0,y:18,filter:'blur(3px)'},{opacity:1,y:0,filter:'blur(0px)',duration:.7,stagger:.1,clearProps:'transform,opacity,filter'},.5);
     const buttons=hero.querySelectorAll('.hero-actions .btn-aman,.hero-scroll');
     if(buttons.length)tl.fromTo(buttons,{opacity:0,y:12,scale:.97},{opacity:1,y:0,scale:1,duration:.6,stagger:.11,clearProps:'transform,opacity'},.8);
    }
    if(heroVisual)tl.fromTo(heroVisual,{opacity:0,scale:1.045,y:15},{opacity:1,scale:1,y:0,duration:1.15,clearProps:'transform,opacity'},.2);
    document.documentElement.classList.remove('cinematic-boot');
   });

   const reveal=context.add('reveal',()=>{
    for(const heading of headings){
     if(hero?.contains(heading))continue;
     gsap.fromTo(heading.querySelectorAll('.motion-word'),{yPercent:110,opacity:0,filter:'blur(4px)'},{yPercent:0,opacity:1,filter:'blur(0px)',duration:.7,stagger:.035,ease:'power3.out',clearProps:'transform,opacity,filter',scrollTrigger:{trigger:heading,start:'top 94%',once:true}});
    }
    for(const text of document.querySelectorAll('main p,main .eyebrow,main .chapter-top')){
     if(hero?.contains(text)||text.closest('.company-card,.creative-card,.small-card,.journal-card,.venture-card,.gallery-dialog')||text.matches('.form-status,.form-note,.category-meta'))continue;
     gsap.fromTo(text,{opacity:0,y:15},{opacity:1,y:0,duration:.7,ease:'power3.out',clearProps:'transform,opacity',scrollTrigger:{trigger:text,start:'top 95%',once:true}});
    }
    for(const grid of document.querySelectorAll('.creative-grid,.work-area-grid,.company-grid,.journal-grid,.featured-brands,.pipeline-grid')){
     const columns=Math.max(1,(window.getComputedStyle?.(grid)?.gridTemplateColumns??'').split(' ').filter(Boolean).length);
     [...grid.children].forEach((card,index)=>gsap.fromTo(card,{opacity:0,y:27},{opacity:1,y:0,duration:.75,delay:(index%columns)*.075,ease:'power3.out',clearProps:'transform,opacity',scrollTrigger:{trigger:card,start:'top 95%',once:true}}));
    }
    for(const accent of document.querySelectorAll('h2 em,h2 .serif-highlight')){
     gsap.fromTo(accent,{'--accent-line':0},{'--accent-line':1,duration:.95,ease:'power3.out',scrollTrigger:{trigger:accent,start:'top 91%',once:true}});
    }
    const stats=document.querySelector('.stats-grid');
    if(stats){
     gsap.fromTo(stats.querySelectorAll('strong'),{opacity:0,y:20},{opacity:1,y:0,duration:.8,stagger:.09,clearProps:'transform,opacity',ease:'power3.out',scrollTrigger:{trigger:stats,start:'top 92%',once:true}});
    }
    for(const image of document.querySelectorAll('.about-portrait>img,.work-feature-photo,.feature-photo-panel img,.contact-card>img')){
     gsap.fromTo(image,{opacity:.4,scale:1.025,clipPath:'inset(9% 0% 5% 0%)'},{opacity:1,scale:1,clipPath:'inset(0% 0% 0% 0%)',duration:1.1,ease:'power3.out',clearProps:'transform,opacity,clipPath',scrollTrigger:{trigger:image,start:'top 94%',once:true}});
    }
   });

   const stopIntro=context.add('stopIntro',event=>{
    if(event?.detail==='complete')return;
    loaderTimeline?.kill();exitTimeline?.kill();
    gsap.set(app,{clearProps:'opacity,clipPath'});
    playHero();
   });
   listen(window,'aman:intro-ended',stopIntro);

   const exitIntro=context.add('exitIntro',()=>{
    if(disposed||!boot?.active)return;
    exitTimeline=gsap.timeline({onComplete:()=>{boot.finish('complete');ScrollTrigger.refresh()}});
    exitTimeline.to('#brand-intro',{clipPath:'inset(0% 0% 100% 0%)',duration:.7,ease:'power3.inOut'},0)
     .fromTo(app,{opacity:1,clipPath:'inset(100% 0% 0% 0%)'},{opacity:1,clipPath:'inset(0% 0% 0% 0%)',duration:.8,ease:'power3.inOut'},0)
     .call(playHero,[],.15);
   });

   reveal();
   if(boot?.active){
    const letters=document.querySelectorAll('.intro-letter');
    let assetsReady=false;
    let titleReady=false;
    const maybeExit=()=>{if(assetsReady&&titleReady)exitIntro()};
    const heroImage=document.getElementById('hero-portrait');
    const readiness=[document.fonts?.ready??Promise.resolve()];
    if(heroImage?.decode)readiness.push(heroImage.decode().catch(()=>{}));
    Promise.race([Promise.allSettled(readiness),new Promise(resolve=>later(resolve,1500))]).then(()=>{assetsReady=true;maybeExit()});
    loaderTimeline=gsap.timeline({onComplete:()=>{titleReady=true;maybeExit()}});
    loaderTimeline.fromTo('.intro-beam',{opacity:0,xPercent:-100,scaleX:.15},{opacity:1,xPercent:0,scaleX:1,duration:.65,ease:'power2.inOut'},.1)
     .to('.intro-beam',{opacity:0,scaleX:.25,duration:.5},.62)
     .fromTo(letters,{opacity:0,yPercent:75,rotationX:-45,filter:'blur(12px)'},{opacity:1,yPercent:0,rotationX:0,filter:'blur(0px)',duration:.7,stagger:.045,ease:'power3.out'},.35)
     .to('.intro-aura,.intro-particles',{opacity:1,duration:.8},.4)
     .fromTo('.intro-shimmer',{opacity:0,xPercent:-100},{opacity:1,xPercent:100,duration:.9,ease:'power2.inOut'},1.05)
     .to('.intro-shimmer',{opacity:0,duration:.2},1.75)
     .to('.intro-progress',{opacity:1,duration:.35},1)
     .fromTo('.intro-tagline',{opacity:0,y:8},{opacity:1,y:0,duration:.55,ease:'power2.out'},1.2);
    // The progress line is a decorative sweep, never a fabricated percentage.
    // The title finishes at 1.95s; the separate sweep cannot delay the exit.
    gsap.fromTo('.intro-progress span',{xPercent:-100},{xPercent:100,duration:.9,delay:1,ease:'power2.inOut',repeat:1});
    listen(document,'keydown',event=>{if(boot.active&&['Tab','Escape'].includes(event.key))boot.finish('user-skip')});
    listen(document,'pointerdown',()=>{if(boot.active)boot.finish('user-skip')},{once:true});
   }else{
    if(restored||boot?.expired){gsap.set([hero,heroVisual].filter(Boolean),{opacity:1});document.documentElement.classList.remove('cinematic-boot')}
    else playHero();
    boot?.finish('complete');
   }

   // Events are delegated so newly filtered cards and reset buttons still work.
   const magnetic=context.add('magnetic',event=>{
    if(!fine.matches||event.pointerType!=='mouse'||boot?.active)return;
    const button=event.target.closest?.('.btn-aman');
    const card=event.target.closest?.('.creative-card,.company-card,.small-card,.journal-card');
    if(card){const r=card.getBoundingClientRect();card.style.setProperty('--card-x',((event.clientX-r.left)/r.width*100).toFixed(1)+'%');card.style.setProperty('--card-y',((event.clientY-r.top)/r.height*100).toFixed(1)+'%')}
    if(button){const r=button.getBoundingClientRect();gsap.to(button,{'--magnet-x':Math.max(-4,Math.min(4,(event.clientX-r.left-r.width/2)*.055))+'px','--magnet-y':Math.max(-3,Math.min(3,(event.clientY-r.top-r.height/2)*.055))+'px',duration:.35,overwrite:'auto',ease:'power2.out'})}
    const portrait=event.target.closest?.('.hero-visual:not(.hero-orbit)');
    if(portrait){const r=portrait.getBoundingClientRect();gsap.to(portrait.querySelector('.portrait-image-wrap'),{'--portrait-x':((event.clientX-r.left)/r.width-.5)*5+'px','--portrait-y':((event.clientY-r.top)/r.height-.5)*5+'px',duration:.6,overwrite:'auto',ease:'power2.out'})}
   });
   const unmagnet=context.add('unmagnet',event=>{
    const card=event.target.closest?.('.creative-card,.company-card,.small-card,.journal-card');
    if(card&&!card.contains(event.relatedTarget)){card.style.removeProperty('--card-x');card.style.removeProperty('--card-y')}
    const button=event.target.closest?.('.btn-aman');
    if(button&&!button.contains(event.relatedTarget))gsap.to(button,{'--magnet-x':'0px','--magnet-y':'0px',duration:.4,overwrite:'auto'});
    const portrait=event.target.closest?.('.hero-visual:not(.hero-orbit)');
    if(portrait&&!portrait.contains(event.relatedTarget))gsap.to(portrait.querySelector('.portrait-image-wrap'),{'--portrait-x':'0px','--portrait-y':'0px',duration:.5,overwrite:'auto'});
   });
   listen(document,'pointermove',magnetic,{passive:true});listen(document,'pointerout',unmagnet,{passive:true});
   const cardText=context.add('cardText',event=>{
    if(!fine.matches||event.pointerType!=='mouse'||boot?.active)return;
    const card=event.target.closest?.('.creative-card,.company-card,.small-card,.journal-card');
    if(!card||card.contains(event.relatedTarget))return;
    const words=card.querySelectorAll('h3 .motion-word');
    if(words.length)gsap.fromTo(words,{y:6,opacity:.65},{y:0,opacity:1,duration:.4,stagger:.025,ease:'power2.out',overwrite:'auto',clearProps:'transform,opacity'});
   });
   listen(document,'pointerover',cardText,{passive:true});

   const directory=document.getElementById('companies-container');
   if(directory){
    const refreshCards=context.add('refreshCards',()=>{
     if(disposed)return;
     // Detach the initial grid trigger so it cannot replay on replacement cards.
     ScrollTrigger.getAll().filter(t=>t.trigger===directory||(!t.trigger?.isConnected&&t.trigger?.classList.contains('company-card'))).forEach(t=>t.kill(true));
     // Filtered-out headings are no longer part of this document.
     for(let i=splitRecords.length-1;i>=0;i--)if(!splitRecords[i].heading.isConnected)splitRecords.splice(i,1);
     directory.querySelectorAll('h3').forEach(splitHeading);
     gsap.fromTo(directory.children,{opacity:0,y:12},{opacity:1,y:0,duration:.4,stagger:.035,clearProps:'transform,opacity',ease:'power2.out'});
     ScrollTrigger.refresh();
    });
    const observer=new MutationObserver(refreshCards);observer.observe(directory,{childList:true});disposers.push(()=>observer.disconnect());
   }

   const transition=context.add('transition',event=>{
    if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||reduce.matches||boot?.active)return;
    const link=event.target.closest?.('a[href]');
    if(!link||link.hasAttribute('download')||(link.target&&link.target!=='_self'))return;
    const href=link.getAttribute('href');
    if(!href||href.startsWith('#'))return;
    let next;try{next=new URL(link.href,location.href)}catch{return}
    const current=new URL(location.href);
    const route=next.pathname.split('/').filter(Boolean).pop()??'index';
    if(!/^(index|work|tech|companies|invest|collaborate|art|music|achievements)(\.html)?$/.test(route)||next.origin!==current.origin||next.protocol!==current.protocol)return;
    if(next.pathname===current.pathname&&next.search===current.search)return;
    // Local-file previews may navigate only inside this website's directory.
    if(next.protocol==='file:'&&next.pathname.slice(0,next.pathname.lastIndexOf('/'))!==current.pathname.slice(0,current.pathname.lastIndexOf('/')))return;
    event.preventDefault();if(navigating)return;navigating=true;
    const navigate=()=>{if(disposed)return;clearTimeout(navigationTimer);navigationTimer=null;location.assign(next.href)};
    navigationTimer=setTimeout(navigate,400);
    gsap.to(app,{opacity:0,duration:.18,ease:'power1.in',onComplete:navigate});
   });
   listen(document,'click',transition);
   document.fonts?.ready.then(()=>{if(!disposed)ScrollTrigger.refresh()});
   const skipMotion=()=>{if(reduce.matches)boot?.finish('reduced-motion')};
   listen(reduce,'change',skipMotion);
   return ()=>{
    disposed=true;
    timers.forEach(clearTimeout);timers.clear();clearTimeout(navigationTimer);
    disposers.forEach(dispose=>dispose());
    loaderTimeline?.kill();exitTimeline?.kill();
    restoreText();
    document.querySelectorAll('[style]').forEach(element=>{element.style.removeProperty('--card-x');element.style.removeProperty('--card-y')});
    document.documentElement.classList.remove('cinematic-boot');
    boot?.finish('cleanup');
   };
  });
  if(reduce.matches)boot?.finish('reduced-motion');
 }

 function stop(){
  media?.revert();media=null;running=false;restoreText();
  document.documentElement.classList.remove('cinematic-ready','cinematic-boot');
  boot?.finish('history-restore');
 }
 window.addEventListener('pagehide',stop);
 window.addEventListener('pageshow',event=>{if(event.persisted)run({restored:true})});
 try{run()}catch(error){stop();boot?.finish('engine-unavailable');console.warn('Cinematic enhancement unavailable; the website remains usable.',error)}
})();
