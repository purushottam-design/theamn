const critical=`html{background:#090909}.brand-intro{display:none}html.intro-pending,html.intro-pending body{overflow:hidden}html.intro-pending::before{content:'';position:fixed;inset:0;background:#050505;z-index:198}html.intro-pending .brand-intro:not([hidden]){position:fixed;inset:0;z-index:200;display:grid;place-items:center;overflow:hidden;background:#050505;color:#d4b875}html.intro-pending #app{opacity:0}html.cinematic-boot .hero-copy,html.cinematic-boot .hero-visual,html.cinematic-boot .inner-hero-content{opacity:0}.intro-title{margin:0;font-family:Georgia,serif;font-weight:400;font-size:clamp(27px,6.7vw,88px);letter-spacing:.15em;white-space:nowrap}.intro-letter{display:inline-block;opacity:0}.intro-space{display:inline-block;width:.36em}.intro-center{position:relative;text-align:center;padding:20px}.intro-tagline{opacity:0;font:9px system-ui,sans-serif;letter-spacing:.27em;margin-top:28px}.intro-beam{position:absolute;top:50%;left:0;width:100%;height:1px;opacity:0;background:linear-gradient(90deg,transparent,#d4b875,transparent)}@media(prefers-reduced-motion:reduce){html.cinematic-boot .hero-copy,html.cinematic-boot .hero-visual,html.cinematic-boot .inner-hero-content,html.intro-pending #app{opacity:1}html.intro-pending::before,html.intro-pending .brand-intro:not([hidden]){display:none}html.intro-pending,html.intro-pending body{overflow:visible}}`;

export function injectMotion(document,page){
 if(!document.querySelector('link[href="./assets/css/polish.css"]')){
  const polish=document.createElement('link');polish.rel='stylesheet';polish.href='./assets/css/polish.css';
  const base=document.querySelector('link[href="./assets/css/style.css"]');
  if(base)base.after(polish);else document.head.append(polish);
 }
 const earlyCSS=critical+'html{scrollbar-gutter:stable}';
 const existing=document.getElementById('motion-critical');
 if(existing)existing.textContent=earlyCSS;
 if(!document.getElementById('motion-critical')){
  const style=document.createElement('style');style.id='motion-critical';style.textContent=earlyCSS;
  const boot=document.createElement('script');boot.src='./assets/js/intro-boot.js';
  const charset=document.querySelector('meta[charset]');
  if(charset)charset.after(style,boot);else document.head.prepend(style,boot);
 }
 if(!document.querySelector('link[href="./assets/css/motion.css"]')){
  const link=document.createElement('link');link.rel='stylesheet';link.href='./assets/css/motion.css';document.head.append(link);
  for(const src of ['./assets/vendor/gsap.min.js','./assets/vendor/ScrollTrigger.min.js','./assets/js/motion.js']){
   const script=document.createElement('script');script.setAttribute('defer','');script.src=src;document.head.append(script);
  }
 }
 if(page==='index'&&!document.getElementById('brand-intro')){
  const loader=document.createElement('div');loader.id='brand-intro';loader.className='brand-intro';loader.setAttribute('aria-hidden','true');
  loader.innerHTML=`<div class="intro-aura"></div><div class="intro-particles">${Array.from({length:14},(_,i)=>`<i style="--particle:${i}"></i>`).join('')}</div><div class="intro-beam"></div><div class="intro-center"><div class="intro-title">${[...'THE AMAN LIFE'].map(char=>char===' '?'<span class="intro-space"> </span>':`<span class="intro-letter">${char}</span>`).join('')}<span class="intro-shimmer"></span></div><div class="intro-progress"><span></span></div><p class="intro-tagline">CREATIVITY • TECHNOLOGY • INNOVATION</p></div>`;
  document.body.prepend(loader);
 }
}
