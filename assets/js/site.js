/* The Aman Life — independently authored static website inspired by the public reference.
   No React, build tooling or server dependencies. Bootstrap 5.3.6 ships locally.
   Original reference portraits are served locally from assets/images. */
(() => {
'use strict';
const ROOT = document.getElementById('app');
const page = document.documentElement.dataset.page || 'index';
const R = './assets/images/';
const imgs = {
 moon:R+'aman-moon-1.webp',bike:R+'aman-bike.webp',london:R+'aman-london.webp',
 red:R+'aman-red.webp',sunset:R+'aman-sunset.webp',space:R+'aman-moon-2.webp'
};
const portraits = [
 {name:'The AI world',file:R+'hero-1.jpg',alt:'Aman with a creative AI interface'},
 {name:'City lights',file:R+'hero-2.jpg',alt:'Aman in a night-time waterfront portrait'},
 {name:'The open road',file:R+'hero-3.jpg',alt:'Aman with a motorcycle in a mountain landscape'},
 {name:'Building ideas',file:R+'hero-4.jpg',alt:'Aman seated at a desk with a laptop'},
 {name:'Between the pages',file:R+'hero-5.jpg',alt:'Aman holding a book in a library setting'},
 {name:'New horizons',file:R+'hero-6.jpg',alt:'Aman with a motorcycle on a mountain road'},
 {name:'A quiet moment',file:R+'hero-7.jpg',alt:'Aman seated at an outdoor cafe'},
 {name:'Another perspective',file:R+'hero-8.jpg',alt:'A second reference portrait of Aman at an outdoor cafe'},
 {name:'Golden hour',file:R+'hero-9.jpg',alt:'Aman in a golden-hour waterfront portrait'}
];
const paths = [
 ['index','Home'],['work','Creative Work'],['tech','Tech Launch'],['companies','Companies'],['invest','Invest'],['collaborate','Collaborate']
];
const button=(label,url,outlined=false,extra='')=>`<a class="btn-aman${outlined?' btn-aman-outline':''} ${extra}" href="${url}">${label}<span aria-hidden="true">↗</span></a>`;
const textLink=(label,url)=>`<a class="link-arrow" href="${url}">${label}<span class="arrow-circle" aria-hidden="true">↗</span></a>`;
const eyebrow=(txt)=>`<span class="eyebrow">${txt}</span>`;
const chapter=(n,txt)=>`<div class="chapter-top"><span class="part-index">${n}</span><span class="part-label">${txt}</span></div>`;
const img=(key,alt='',cls='',lazy=true)=>`<img src="${imgs[key]}" alt="${alt||key+' portrait'}" class="${cls} img-fallback" ${lazy?'loading="lazy"':'fetchpriority="high"'}/>`;
const header=()=>`<header id="site-header" class="site-header"><div class="container-aman header-inner">
<a href="./index.html" class="brand-logo" aria-label="The Aman Life home"><img class="brand-mark" src="./assets/images/aman-logo-DhxlfapT.png" alt="" width="43" height="43"/><span class="brand-label">THE AMAN LIFE<small>AI &amp; CREATIVE WORLD</small></span></a>
<nav class="header-navigation" aria-label="Main navigation">${paths.map(([path,label])=>`<a href="./${path}.html" ${page===path?'class="active" aria-current="page"':''}>${label}</a>`).join('')}</nav>
<a class="btn-aman btn-aman-outline header-cta" href="./collaborate.html">LET'S CONNECT <span>↗</span></a>
<button type="button" id="mobile-menu-btn" class="mobile-menu-btn" aria-label="Toggle navigation" aria-expanded="false" aria-controls="mobile-drawer"><span></span><span></span></button></div></header>
<div class="mobile-backdrop" id="mobile-backdrop"></div><nav id="mobile-drawer" class="mobile-drawer" aria-label="Mobile navigation" inert>
${[...paths,['art','Art & AI'],['music','Music & Stories'],['achievements','Achievements']].map(([path,label])=>`<a href="./${path}.html">${label} <span style="float:right;font-size:16px;color:var(--gold)">↗</span></a>`).join('')}<small>THOUGHTS. STORIES. WORLD BUILDING.</small></nav>`;
const footer=()=>`<footer class="site-footer"><div class="container-aman"><div class="footer-top">
<div class="footer-brand"><a href="./index.html" class="brand-logo"><img class="brand-mark" src="./assets/images/aman-logo-DhxlfapT.png" alt="" width="43" height="43"/><span class="brand-label">THE AMAN LIFE<small>AI &amp; CREATIVE WORLD</small></span></a><p>Technology, imagination, music, cinema and ventures. A creative world where ideas travel beyond boundaries.</p></div>
<div class="footer-col"><h4>Create & Build</h4><a href="./work.html">Creative Work</a><a href="./tech.html">Tech Launch</a><a href="./companies.html">Companies & Platforms</a><a href="./invest.html">Invest with Aman</a></div>
<div class="footer-col"><h4>Discover</h4><a href="./art.html">Art & AI</a><a href="./music.html">Music & Stories</a><a href="./achievements.html">Achievements & Journey</a><a href="./collaborate.html">Collaborate</a></div>
<div class="footer-col"><h4>Say Hello</h4><a href="mailto:contact@pinnacleelitecorp.com">contact@pinnacleelitecorp.com</a><a href="https://www.peakdivine.com/" target="_blank" rel="noopener noreferrer">Peak Divine ↗</a><a href="./collaborate.html">Start a Project ↗</a></div>
</div><div class="footer-bottom"><span>© <span data-year></span> THE AMAN LIFE. MADE FOR A WORLD OF IDEAS.</span><span>IMAGINE ✦ BUILD ✦ CREATE</span><a href="#top" class="back-top">BACK TO TOP ↑</a></div></div>
<div class="studio-footer"><div class="container-aman studio-grid"><div><div class="studio-title">DESIGNED &amp; DEVELOPED BY</div><a class="studio-link" target="_blank" rel="noopener noreferrer" href="https://aa100xtech.com/">Absolute Advancement 100X Tech <span>↗</span></a></div><div><div class="studio-title">OUR CREATIVE PARTNERS</div><div class="studio-urls"><a class="studio-link" target="_blank" rel="noopener noreferrer" href="https://creatormoves365.ai/">CreatorMoves365.ai <span>↗</span></a><a class="studio-link" target="_blank" rel="noopener noreferrer" href="https://creatormoves365.com/">CreatorMoves365.com <span>↗</span></a><a class="studio-link" target="_blank" rel="noopener noreferrer" href="http://peakdivineproductions.com/">Peak Divine Productions <span>↗</span></a></div></div></div></div></footer>`;
const marquee=()=>`<div class="marquee-band" aria-hidden="true"><div class="marquee-inner">${Array(2).fill('<span>AI World <b>✦</b> Prompt World <b>✦</b> Image <b>✦</b> Video <b>✦</b> Art <b>✦</b> Music <b>✦</b> Film <b>✦</b> Technology <b>✦</b> Companies <b>✦</b></span>').join('')}</div></div>`;
const orbitVisual=()=>`<div class="hero-visual hero-orbit" id="hero-visual" role="region" aria-roledescription="carousel" aria-label="Aman's creative universe">
<div class="orbit-heading"><span>THE CREATIVE UNIVERSE</span><span aria-hidden="true">✦</span></div><div class="orbit-aura" aria-hidden="true"></div>
<div class="orbit-scene" tabindex="0" aria-label="Scroll to rotate the portrait gallery. Left and right arrows select a portrait; Home returns to the beginning.">
<div class="orbit-ring" aria-hidden="true"></div><div class="orbit-ring orbit-ring--outer" aria-hidden="true"></div><div class="orbit-core" aria-hidden="true">✦</div>
<div class="orbit-stage">${portraits.map((p,i)=>`<button type="button" class="orbit-photo${i===0?' is-front':''}" data-portrait="${i}" tabindex="-1" aria-label="${p.name}" aria-pressed="${i===0}"><img ${i===0?'id="hero-portrait" fetchpriority="high"':''} src="${p.file}" alt="${p.alt}" width="1117" height="1408" decoding="async" draggable="false"/></button>`).join('')}</div></div>
<div class="orbit-particles" aria-hidden="true">${Array.from({length:18},(_,i)=>`<i style="--x:${(i*37+7)%98}%;--y:${(i*23+11)%94}%;--delay:${-i*.43}s"></i>`).join('')}</div>
<div class="orbit-caption"><span class="micro-label">A DIFFERENT PERSPECTIVE</span><strong id="portrait-name">${portraits[0].name}</strong></div>
<div class="orbit-controls"><button type="button" data-orbit-step="-1" aria-label="Previous portrait">←</button><span class="orbit-count" id="portrait-index">01 / 09</span><button type="button" data-orbit-step="1" aria-label="Next portrait">→</button><button type="button" class="orbit-restart" aria-label="Return to the first portrait"><span aria-hidden="true">&#8634;</span></button></div>
<p class="orbit-hint">SCROLL TO EXPLORE · NINE PERSPECTIVES</p></div>`;
const journey=(compact=false)=>`<section class="journey section-pad" id="journey"><div class="container-aman">${chapter('03','VISUAL JOURNEY')}
<div class="journey-header reveal">${eyebrow('VISUAL JOURNEY')}<h2 class="section-heading">Ideas move<br/><em>between worlds.</em></h2><p class="section-text">Nine creative portraits. Nine different perspectives. Scroll through the orbit, or open a frame to take a closer look.</p></div>
<div class="journey-stage" id="journey-stage" aria-label="Nine orbiting portraits"><div class="journey-ellipse"></div><div class="journey-center"></div>${portraits.map((p,i)=>`<button type="button" class="journey-card" data-gallery="${i}" aria-label="Open ${p.name} portrait" style="--i:${i}"><img src="${p.file}" alt="${p.alt}" loading="lazy" width="1122" height="1402"/><span>${p.name} ↗</span></button>`).join('')}</div>
<div class="journey-note"><span>SCROLL TO EXPLORE THE VISUAL ORBIT</span><span>01 — 09 <span aria-hidden="true">✧</span></span></div></div></section>`;
const creativeData=[
 ['01','AI World','Using AI to develop visual ideas, tools and new experiences.','✶','./work.html'],
 ['02','Prompt World','The craft of turning ideas into expressive prompts and outcomes.','⌘','./work.html'],
 ['03','Art & Design','Digital art, compositions, canvases and thoughtful visual storytelling.','✳','./art.html'],
 ['04','Music & Songs','Songwriting, music production and emotions translated into sound.','♫','./music.html'],
 ['05','Films & Stories','Cinematic visuals, short films, books and imagined worlds.','◈','./work.html'],
 ['06','Collaboration','Building creative partnerships and connecting talent worldwide.','✦','./collaborate.html']
];
const workData=[
 ['01','AI World & Prompt World','Exploring generative AI, prompt engineering and new creative workflows.','✶','./tech.html'],
 ['02','AI Image Generation','Original imagery, creative portraits, concept visuals and visual experiments.','◈','./art.html'],
 ['03','AI Video Generation','Moving images, cinematic sequences and experimental motion.','▷','./collaborate.html'],
 ['04','Image & Video Prompts','Purposeful prompts for creative tools and the CreatorMoves365.ai library.','⌘','https://creatormoves365.ai/'],
 ['05','Art & Visual Storytelling','Paintings, artwork and visual narratives that carry a story across frames.','✳','./art.html'],
 ['06','Music, Songs & Albums','Original lyrics, melodies and connected album concepts in development.','♫','./music.html'],
 ['07','Books & Original Stories','Novels, long-form narratives and original fictional worlds.','≋','./music.html'],
 ['08','Movies & Short Films','Film concepts, AI movies and cinematic storytelling.','◉','https://www.peakdivine.com/'],
 ['09','Advertisements & Music Videos','Commercial film concepts, creative campaigns and artist visuals.','↗','./collaborate.html'],
 ['10','Fantasy Worlds & Characters','Imagined worlds, characters and the fantasy films built around them.','✧','./art.html'],
 ['11','Global Creator Collaborations','Connecting creators, influencers, artists and brands across campaigns.','✦','./collaborate.html']
];
const creativeSection=()=>`<section class="creative-panel section-pad" id="creative"><div class="container-aman">${chapter('02','CREATIVE WORK')}
<div class="section-intro"><div class="reveal">${eyebrow('CREATIVE WORK')}<h2 class="section-heading">A practice across<br/><em>many surfaces.</em></h2></div><p class="section-text reveal delay-1">Where artificial intelligence, creative direction, sound, visuals and written stories meet.</p></div>
<div class="creative-grid">${creativeData.map(([n,t,d,ic,href],i)=>`<a href="${href}" class="creative-card reveal delay-${i%3}"><div class="creative-card-top"><span>${n} / CREATIVE</span><span>↗</span></div><div><div class="creative-icon" aria-hidden="true">${ic}</div><h3>${t}</h3><p>${d}</p></div><div class="creative-card-footer"><span class="micro-label">DISCOVER MORE</span><span class="round-icon" aria-hidden="true">↗</span></div></a>`).join('')}</div>
<div style="margin-top:39px">${textLink('Explore all creative work','./work.html')}</div></div></section>`;
const businessSection=()=>`<section class="business-section section-pad" id="business"><div class="container-aman">${chapter('04','COMPANIES, BRANDS & PLATFORMS')}
<div class="business-split"><div class="reveal">${eyebrow('THE BUSINESS ECOSYSTEM')}<h2 class="section-heading">Ideas built<br/>into <em>ventures.</em></h2><p class="section-text" style="margin:23px 0">Explore a growing ecosystem that connects AI, technology, creative production, influencer marketing, real estate, commerce and more.</p><div class="business-tags"><span>TECHNOLOGY</span><span>CREATIVE</span><span>INVESTMENT</span><span>GLOBAL BRANDS</span></div>${textLink('Explore companies & platforms','./companies.html')}</div>
<div class="featured-brands reveal delay-1">${companiesData.slice(0,8).map((c,i)=>`<a href="./companies.html" class="featured-brand"><span class="brand-number">${String(i+1).padStart(2,'0')}</span><span><strong>${c.name}</strong><small>${c.category}</small></span><span aria-hidden="true">↗</span></a>`).join('')}</div></div></div></section>`;
const statSection=()=>`<section class="stat-strip"><div class="container-aman stats-grid">
<div class="stat-item"><strong>AI</strong><p>CREATIVE TECH &amp; PROMPT-BASED EXPLORATION</p></div>
<div class="stat-item"><strong>Film</strong><p>STORIES, CINEMATIC EXPERIENCES &amp; MUSIC</p></div>
<div class="stat-item"><strong>Build</strong><p>COMPANIES, TECHNOLOGY AND GLOBAL PLATFORMS</p></div>
<div class="stat-item"><strong>2025</strong><p>ESTABLISHED YEAR DISPLAYED FOR THE VENTURES</p></div></div></section>`;
const ctaSection=(head='Bring an idea to <em>life.</em>',desc='From creative campaigns and AI concepts to stories, films and new ventures — conversations start here.')=>`<section class="cta-section"><div class="container-aman reveal">${eyebrow('LET’S COLLABORATE')}<h2 class="section-heading">${head}</h2><p class="section-text">${desc}</p>${button('COLLABORATE WITH AMAN','./collaborate.html')}<div class="cta-secondary">${textLink('Achievements & journey','./achievements.html')}</div></div></section>`;
const home=()=>`<main id="main"><section class="hero-home" id="home"><canvas id="star-canvas" class="star-canvas" aria-hidden="true"></canvas><div class="container-aman hero-shell"><div class="hero-copy">
<div class="hero-edition"><span class="live-dot"></span> THE MIND BEHIND THE MANY WORLDS</div>
<h1 class="hero-title"><span class="hero-title-line">Let's Explore</span><span class="hero-title-line">The <em class="serif-highlight">Wonders</em></span><span class="hero-title-line">Of AI<span style="color:var(--gold)">.</span></span></h1>
<p class="hero-description">Creating global companies and extraordinary stories, music, movies and entire new worlds.</p>
<div class="hero-roles"><span>AI ENTHUSIAST</span><span>CREATIVE TECHNOLOGIST</span><span>WRITER & PRODUCER</span><span>GLOBAL COLLABORATIONS</span></div>
<div class="hero-actions">${button('EXPLORE COMPANIES','./companies.html')}${button('COLLABORATE','./collaborate.html',true)}${button('INVEST WITH AMAN','./invest.html',true)}</div>
<a class="hero-scroll" href="#about"><span class="scroll-track"></span> SCROLL TO EXPLORE</a>
</div>${orbitVisual()}</div><div class="hero-bottomline"><div class="container-aman hero-bottomline-inner"><span>AI · CREATIVITY · TECHNOLOGY</span><span>THE ART OF POSSIBILITIES ✦</span><span>SCROLL DOWN FOR MORE ↓</span></div></div></section>
${marquee()}
<section class="surface section-pad" id="about"><div class="container-aman">${chapter('01','ABOUT · CREATOR · BUILDER · EXPLORER')}<div class="about-layout">
<div class="about-portrait reveal">${img('moon','Aman in a moon landscape')}<div class="img-badge">CREATE<br/>BEYOND<br/>LIMITS ✦</div></div>
<div class="about-info reveal delay-1">${eyebrow('MEET AMAN')}<h2 class="section-heading">An AI enthusiast,<br/><em>creative mind</em><br/>&amp; builder.</h2><p class="section-text">Aman explores AI and prompt-driven possibilities, creating striking images, videos, songs, films, stories and imaginative spaces. His work connects technology with art, people and brands.</p><ul class="skill-list"><li>AI image &amp; video generation</li><li>Art &amp; visual storytelling</li><li>Music, songs &amp; albums</li><li>Films, books &amp; stories</li><li>Advertisements &amp; campaigns</li><li>Global creator collaborations</li></ul>${textLink('Explore Creative Work','./work.html')}</div></div></div></section>
${creativeSection()}${journey()}${businessSection()}${statSection()}${ctaSection('Let’s make <em>something remarkable.</em>','Brand partnerships, AI projects, music, films, creative campaigns, apps and business inquiries are welcome.')}</main>`;
const innerHero=(label,head,desc,imageKey=null)=>`<section class="inner-hero bordered"><div class="container-aman inner-hero-content reveal">${eyebrow(label)}<h1>${head}</h1><p>${desc}</p></div>${imageKey?img(imageKey,'Aman cinematic portrait','hero-aside-img'):''}</section>`;
const work=()=>`<main id="main">${innerHero('CREATIVE WORK','Turning imagination<br/>into <em>cinema.</em>','AI, music, stories, art and collaborations — a creative practice that is never limited to one medium.','london')}
<section class="inner-page-section"><div class="container-aman work-intro"><div class="reveal">${eyebrow('AI · ART · FILM · MUSIC')}<h2 class="subhead">Many mediums.<br/>One imagination.</h2><p class="section-text" style="margin-top:24px">Experimenting with AI-generated visuals, prompt craft, painting, songwriting, albums, books, original stories, short films and creative campaigns.</p><div class="area-pills"><span>AI WORLD</span><span>PROMPT WORLD</span><span>ART</span><span>MUSIC</span><span>WRITING</span><span>CINEMA</span></div>${textLink('Explore Art & AI','./art.html')}</div>
<div class="reveal delay-1">${img('london','Aman cinematic London portrait','work-feature-photo')}</div></div></section>
<section class="inner-page-section"><div class="container-aman">${chapter('02','CREATIVE AREAS')}${eyebrow('WHAT THE WORK INCLUDES')}<h2 class="subhead" style="margin:19px 0 39px">Creative work in<br/><em class="serif-highlight">many forms.</em></h2><div class="work-area-grid">${workData.map(([num,title,description,ic,href],i)=>`<a href="${href}" ${href.startsWith('https')?'target="_blank" rel="noopener noreferrer"':''} class="small-card reveal delay-${i%3}"><span class="card-num">${num} — ${ic}</span><h3>${title}</h3><p>${description}</p><div class="card-foot">EXPLORE ↗</div></a>`).join('')}</div></div></section>
${journey(true)}
<section class="inner-page-section"><div class="container-aman"><div class="section-intro"><div>${eyebrow('MORE CREATIVE PAGES')}<h2 class="subhead">The art behind<br/>every world.</h2></div></div><div class="row g-4"><div class="col-md-6"><a href="./art.html" class="creative-card" style="min-height:315px"><span class="micro-label">ART &amp; AI</span><h3>Digital art &amp; visual worlds.</h3><p>Paintings, cover art, images and ideas.</p><span>EXPLORE ↗</span></a></div><div class="col-md-6"><a href="./music.html" class="creative-card" style="min-height:315px"><span class="micro-label">MUSIC &amp; STORIES</span><h3>Songs for the romantics.</h3><p>Original music, stories and cinematic videos.</p><span>EXPLORE ↗</span></a></div></div></div></section>${ctaSection()}</main>`;
const practices=[
 ['01','Digital AI Artist','Prompt-crafted visuals, curated dreamscapes and expressive compositions.'],
 ['02','Music','Warm acoustic ideas paired with modern production and cinematic sound.'],
 ['03','Songs','Original romantic writing that combines melody, memories and emotion.'],
 ['04','Albums','Collections of songs developed as cohesive stories rather than disconnected singles.'],
 ['05','Collaborations','Working across music, cinema, art, fashion, brands and performance.'],
 ['06','Paintings & Artwork','Visual identity, cover art, digital editions and textured physical pieces.']
];
const art=()=>`<main id="main">${innerHero('DIGITAL AI ARTIST · MUSICIAN · PAINTER','Art made with machines.<br/><em>Feeling made by hand.</em>','From digital art to traditional canvas, songwriting and sound: ideas find their way across many artistic forms.','red')}
<section class="inner-page-section"><div class="container-aman">${chapter('01','THE PRACTICE')}<div class="section-intro">${eyebrow('WHERE THE WORK LIVES')}<h2 class="subhead">A creative practice<br/>without boundaries.</h2></div><div class="work-area-grid">${practices.map(([n,t,d],i)=>`<div class="small-card reveal delay-${i%3}"><span class="card-num">${n}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}</div></div></section>
<section class="inner-page-section" style="background:#11151f"><div class="container-aman feature-photo-panel"><div class="reveal">${img('red','Aman cinematic red portrait')}</div><div class="reveal delay-1">${eyebrow('CANVAS & PIGMENT')}<h2 class="subhead">Digital pieces meet<br/><em class="serif-highlight">physical surfaces.</em></h2><p class="section-text" style="margin:24px 0">A visual direction that moves between created imagery and textured canvases, with expressive surfaces, layered materials and selected works envisaged as limited editions.</p>${textLink('Discuss a creative project','./collaborate.html')}</div></div></section>
<section class="inner-page-section"><div class="container-aman">${chapter('03','JOURNAL')}<div class="section-intro"><div>${eyebrow('WRITING & STUDIO NOTES')}<h2 class="subhead">Stories &amp;<br/>song writing.</h2></div><p class="section-text">Small glimpses into the process — personal stories, lyric writing and art experiments.</p></div><div class="journal-grid">
<div class="journal-card reveal"><small>STORY · JULY 2026</small><h3>The First Meeting</h3><p>The stillness before two people learn each other's names — and the memory that stays.</p></div>
<div class="journal-card reveal delay-1"><small>SONG WRITING · JUNE 2026</small><h3>Writing a Love Song Backwards</h3><p>Beginning with the final lyric and following the melody toward its starting point.</p></div>
<div class="journal-card reveal delay-2"><small>STORY · APRIL 2026</small><h3>Gold and Charcoal</h3><p>Colours that keep returning in a creator's visual language and lyric notes.</p></div>
</div></div></section>${ctaSection('Make art <em>together.</em>','Artists, labels, producers, filmmakers, galleries and brands are invited to connect.')}</main>`;
const music=()=>`<main id="main">${innerHero('MUSIC & STORIES','Songs for<br/><em>the romantics.</em>','Original music and storytelling shaped by emotion, memories and cinematic imagery. Albums and music videos are in development.','sunset')}
<section class="inner-page-section"><div class="container-aman feature-photo-panel"><div class="reveal">${img('sunset','Aman by the waterfront at golden hour')}</div><div class="reveal delay-1">${eyebrow('MUSIC · STORIES · IN PRODUCTION')}<h2 class="subhead">Every story<br/>has a <em class="serif-highlight">sound.</em></h2><p class="section-text" style="margin-top:23px">Romantic songs, reflective stories and music videos are being created for future release. The creative focus is on simple feelings brought to life through words and sound.</p></div></div></section>
<section class="inner-page-section" style="background:#10141d"><div class="container-aman">${chapter('02','ON THE WAY')}${eyebrow('COMING RELEASES')}<h2 class="subhead" style="margin:20px 0 40px">Works in progress.</h2><div class="work-area-grid">
<div class="small-card reveal"><span class="card-num">IN PRODUCTION</span><h3>Debut Album</h3><p>A planned collection of original romantic songs and compositions.</p></div>
<div class="small-card reveal delay-1"><span class="card-num">IN PRODUCTION</span><h3>Music Videos</h3><p>Cinematic videos to accompany the songs and share across social platforms.</p></div>
<div class="small-card reveal delay-2"><span class="card-num">IN PRODUCTION</span><h3>Spoken Stories</h3><p>Short, personal stories and reflections told as a series.</p></div></div></div></section>
<section class="inner-page-section"><div class="container-aman" style="max-width:720px;text-align:center">${eyebrow('STAY CLOSE')}<h2 class="subhead" style="margin:22px 0">Albums & videos<br/><em class="serif-highlight">coming soon.</em></h2><p class="section-text" style="margin:0 auto">Enter your email to compose a release notification request. Updates are requested through your email app.</p><form id="music-form" class="waitlist-form" style="margin-inline:auto"><label class="visually-hidden" for="notify-email">Your email</label><input class="form-field" type="email" id="notify-email" required placeholder="you@example.com" autocomplete="email"/><button class="btn-aman" type="submit" style="white-space:nowrap">NOTIFY ME ↗</button></form><p class="form-status" id="music-status" role="status"></p></div></section></main>`;
const categories=['All','Investment','AI & Technology','Creative Production','Influencer Marketing','Social Impact','Real Estate','Gaming','E-commerce'];
const companiesData=[
 {name:'Pinnacle Elite Corp',initials:'PE',category:'Investment',url:'https://www.pinnacleelitecorp.com/',description:'Backing technology, commerce, creators, entertainment and emerging ventures.',mission:'Support founders, creative businesses and modern ventures while building enduring companies.',upcoming:'Extend activity in AI, commerce, entertainment and creator-led businesses.'},
 {name:'Absolute Advancement 100x Tech',initials:'AA',category:'AI & Technology',url:'https://aa100xtech.com/',description:'AI applications, Android and iOS software, technology products and digital platforms.',mission:'Develop AI applications, mobile software and scalable digital platforms.',upcoming:'More AI products, platform features and mobile application launches.'},
 {name:'Peak Divine',initials:'PD',category:'Creative Production',url:'https://www.peakdivine.com/',description:'Films, AI movies, advertisements, songs, music videos and digital entertainment.',mission:'Create original films, music and stories for international audiences.',upcoming:'AI short films, advertisements, music videos and original productions.'},
 {name:'CreatorMoves365',initials:'CM',category:'Influencer Marketing',url:'https://creatormoves365.com/',description:'Connecting creators, influencers and brands for meaningful partnerships and campaigns.',mission:'Details will be shared when confirmed.',upcoming:'Details will be shared when confirmed.'},
 {name:'CreatorMoves365.ai',initials:'AI',category:'AI & Technology',url:'https://creatormoves365.ai/',description:'Image, video and audio prompt resources, creative inspiration and an Art Library.',mission:'Help creators with practical prompts, creative tools and inspiration.',upcoming:'Expand prompt categories, generation capabilities and Art Library features.',platform:true},
 {name:'Peace Care Foundation',initials:'PC',category:'Social Impact',url:'https://peacecarefoundation.com/',description:'An NGO initiative focused on meaningful social impact and community development.',mission:'Deliver meaningful community and social-development initiatives.',upcoming:'Expand community programs and partnerships.'},
 {name:'Worldwide Prominent Properties',initials:'WP',category:'Real Estate',url:'https://worldwideprominentproperties.com/',description:'Property platforms, applications, marketing systems and real estate visual content.',mission:'Support real-estate experiences using modern technology, content and market connections.',upcoming:'Build property apps, visual systems and broader marketing capabilities.'},
 {name:'Apex Edge Gaming',initials:'AE',category:'Gaming',url:'https://apexedgegaming.com/',description:'Game design, game development and Android and iOS application creation.',mission:'Develop engaging gaming and mobile experiences.',upcoming:'Advance game concepts and Android/iOS launches.'},
 {name:'Tasty Foods Delights',initials:'TF',category:'E-commerce',url:'https://tastyfoodsdelights.com/',description:'An online shopping destination focused on food-related offerings.',mission:'Provide an accessible digital shopping experience for food-related products.',upcoming:'Expand product offerings and improve the shopping experience.'},
 {name:'Shakti Sphere Lifestyle',initials:'SS',category:'E-commerce',url:'https://shaktispherelifestyle.com/',description:'An online retail venture across multiple lifestyle shopping categories.',mission:'Offer a well-organized online shopping experience across lifestyle categories.',upcoming:'Grow its catalogue, product discovery and lifestyle categories.'},
 {name:'Eco Blossom Creations',initials:'EB',category:'E-commerce',url:'https://ecoblossomcreations.com/',description:'An online store focused on natural and Ayurvedic products.',mission:'Improve access to natural and Ayurvedic products online.',upcoming:'Expand product range, sourcing and digital distribution.'}
];
const companyCard=(c,i,live=false)=>`<article class="company-card"><div class="company-card-top"><span class="company-initials" aria-hidden="true">${c.initials}</span><span class="company-serial">${String(i+1).padStart(2,'0')}</span></div><div class="company-badges"><span class="company-category">${c.category}</span>${live?'<span class="status-live">Live</span>':c.platform?'<span class="badge-soon">Platform</span>':''}</div><h3>${c.name}</h3><p>${c.description}</p><div class="company-card-bottom"><span class="year">EST. 2025</span><a class="company-link" href="${c.url}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${c.name} website">VISIT WEBSITE ↗</a></div></article>`;
const tech=()=>`<main id="main">${innerHero('TECH LAUNCH','Built for what<br/><em>comes next.</em>','AI applications, creative platforms, mobile experiences and gaming. Discover the live platforms and the ideas taking shape.','space')}<section class="inner-page-section"><div class="container-aman">${chapter('01','LIVE PRODUCTS')}<div class="section-intro"><h2 class="subhead">Ideas, out<br/><em class="serif-highlight">in the world.</em></h2><span class="status-live">LIVE PLATFORMS</span></div><div class="company-grid tech-grid">${[1,4,3,7].map((n,i)=>companyCard(companiesData[n],i,true)).join('')}</div></div></section><section class="inner-page-section pipeline"><div class="container-aman">${chapter('02','IN THE PIPELINE')}<div class="section-intro"><h2 class="subhead">The next<br/><em class="serif-highlight">possibilities.</em></h2><p class="section-text">New ideas in development. Launch details will be shared when confirmed.</p></div><div class="pipeline-grid">${[['New AI Application','A planned consumer-facing AI application. More details to be announced closer to launch.'],['Expanded Prompt Library','New prompt categories, creative tools and Art Library functionality planned for CreatorMoves365.ai.']].map(([t,d])=>`<article class="small-card reveal"><span class="badge-soon">Coming soon</span><h3>${t}</h3><p>${d}</p></article>`).join('')}</div><div class="pipeline-links">${textLink('All companies & platforms','./companies.html')}${textLink('Explore a collaboration','./collaborate.html')}</div></div></section>${ctaSection()}</main>`;
const companies=()=>`<main id="main">${innerHero('COMPANIES & PLATFORMS','Explore my companies,<br/><em>brands &amp; platforms.</em>','Technology, entertainment, investment, creator marketing, social initiatives, real estate, gaming and e-commerce — a connected business ecosystem.','bike')}
<section class="inner-page-section"><div class="container-aman">${chapter('01','THE ECOSYSTEM')}<div class="filter-bar"><div class="search-control"><label class="visually-hidden" for="company-search">Search companies</label><input id="company-search" type="search" placeholder="Search by name, category or what they do..." autocomplete="off"/></div><p class="category-meta" id="count-result" aria-live="polite">11 companies &amp; platforms</p></div><div class="category-filters" id="category-filters" role="group" aria-label="Company categories">${categories.map((c,i)=>`<button type="button" data-category="${c}" class="${i===0?'active':''}" aria-pressed="${i===0}">${c}</button>`).join('')}</div>
<div id="companies-container" class="company-grid">${companiesData.map((c,i)=>companyCard(c,i)).join('')}</div></div></section>
<section class="inner-page-section" style="background:#121722"><div class="container-aman feature-photo-panel"><div>${img('sunset','Aman at sunset')}</div><div>${eyebrow('FUTURE OPPORTUNITIES')}<h2 class="subhead">Businesses built for<br/><em class="serif-highlight">the long view.</em></h2><p class="section-text" style="margin:25px 0">New projects and partnerships span different industries. Explore investment opportunities or start a conversation about building together.</p>${textLink('Invest with Aman','./invest.html')}</div></div></section></main>`;
const invest=()=>`<main id="main">${innerHero('INVEST WITH AMAN','Build, back &amp; grow<br/><em>ventures together.</em>','Collaborate around ideas in AI, technology, film, e-commerce, real estate and emerging markets.','london')}
<section class="inner-page-section"><div class="container-aman">${chapter('01','PORTFOLIO')}<div class="section-intro"><div>${eyebrow('COMPANIES & VENTURES')}<h2 class="subhead">Businesses with<br/>long-term intent.</h2></div><p class="section-text">The public reference lists investment themes but does not publish verified investment, profit or financial-total figures.</p></div>
<div class="venture-list">${companiesData.map((c,i)=>`<details class="venture-card reveal" ${i===0?'open':''}><summary><span class="brand-number">${String(i+1).padStart(2,'0')}</span><span><small class="micro-label">${c.category}</small><h3>${c.name}</h3></span><span class="venture-toggle" aria-hidden="true">+</span></summary><div class="venture-content"><div><span class="micro-label">01 / MISSION</span><p>${c.mission}</p></div><div><span class="micro-label">02 / UPCOMING</span><p>${c.upcoming}</p></div><div><span class="micro-label">03 / TOTAL INVESTMENT</span><p>Coming soon</p></div><div><span class="micro-label">04 / TOTAL PROFIT</span><p>Coming soon</p></div><a class="link-arrow" href="${c.url}" target="_blank" rel="noopener noreferrer">VISIT WEBSITE ↗</a></div></details>`).join('')}</div><div class="investment-contact">${eyebrow('START A CONVERSATION')}<a href="mailto:invest@pinnacleelitecorp.com">invest@pinnacleelitecorp.com ↗</a></div></div></section>${ctaSection('Let’s discuss a <em>venture.</em>','Start a conversation about businesses, technology, entertainment and long-term partnerships.')}</main>`;
const collaborate=()=>`<main id="main">${innerHero('COLLABORATE','Let’s build something<br/><em>together.</em>','Brand partnerships, AI art, prompt projects, music, cinema, campaigns, digital products and business collaborations.','sunset')}
<section class="inner-page-section"><div class="container-aman contact-grid"><div class="contact-form reveal"><div style="margin-bottom:30px">${eyebrow('CONNECT & COLLABORATE')}<h2 class="subhead" style="margin-top:19px;font-size:clamp(37px,4.2vw,60px)">Tell us about<br/>your project.</h2></div>
<form id="contact-form"><div class="row"><div class="col-md-6"><label class="input-label" for="contact-name">Name *</label><input class="form-field" id="contact-name" name="name" type="text" autocomplete="name" maxlength="100" required placeholder="Your full name"/></div>
<div class="col-md-6"><label class="input-label" for="contact-email">Email *</label><input class="form-field" id="contact-email" name="email" type="email" autocomplete="email" required placeholder="you@company.com"/></div>
<div class="col-12"><label class="input-label" for="contact-organization">Organization or social profile</label><input class="form-field" id="contact-organization" name="organization" type="text" maxlength="160" placeholder="Company / Instagram / website"/></div>
<div class="col-12"><label class="input-label" for="contact-type">Collaboration type *</label><select class="form-field" id="contact-type" name="type" required><option value="">Select collaboration type</option><option>Brand & influencer partnership</option><option>AI / prompt / video project</option><option>Song, album or music video</option><option>Film / advertisement / campaign</option><option>App / technology development</option><option>Business or investment discussion</option><option>Other creative enquiry</option></select></div>
<div class="col-12"><label class="input-label" for="contact-message">Message *</label><textarea class="form-field" id="contact-message" name="message" minlength="10" maxlength="3000" required placeholder="Share your goals, timing, location and a brief idea..."></textarea></div>
<div class="col-12"><button class="btn-aman" type="submit">COMPOSE EMAIL ↗</button><p id="contact-status" class="form-status" role="status"></p><p class="form-note">Opens a draft in your email app. Review and send your inquiry there.</p></div></div></form></div>
<aside class="contact-card reveal delay-1">${img('sunset','Aman at sunset')}<div class="contact-card-info"><h3>Connect &amp;<br/>Collaborate</h3><div class="info-line"><strong>Email</strong><a href="mailto:contact@pinnacleelitecorp.com">contact@pinnacleelitecorp.com</a></div><div class="info-line"><strong>Office</strong>Pinnacle Elite Corp Pvt. Ltd.<br/>101 City Plaza, Kidwaipuri,<br/>Patna – 800001, Bihar, India</div><div class="info-line"><strong>Creative</strong><a target="_blank" rel="noopener noreferrer" href="https://www.peakdivine.com/">Peak Divine ↗</a></div></div></aside></div></section></main>`;
const achievements=()=>`<main id="main">${innerHero('ACHIEVEMENTS & JOURNEY','Milestones along<br/><em>the way.</em>','A space for meaningful milestones, future launches, collaborations and verified accomplishments.','bike')}
<section class="inner-page-section"><div class="container-aman"><div class="placeholder-panel reveal"><div class="shape-star">✧</div>${eyebrow('JOURNEY · UPDATES COMING LATER')}<h3>More to the story.</h3><p>Confirmed awards, qualifications, launches and performance results have not been published on the reference site. This section will be updated when official details are available.</p>${button('EXPLORE CREATIVE WORK','./work.html')} ${button('EXPLORE COMPANIES','./companies.html',true)}</div></div></section></main>`;
const templates={index:home,work,tech,art,music,companies,invest,collaborate,achievements};
if(!ROOT.hasChildNodes())ROOT.innerHTML = `${header()}${(templates[page]||home)()}${footer()}<dialog class="gallery-dialog" id="gallery-dialog" aria-labelledby="gallery-caption"><form method="dialog"><button class="gallery-close" aria-label="Close portrait viewer">×</button></form><img id="gallery-image" alt=""/><div class="gallery-toolbar"><button type="button" id="gallery-prev" aria-label="Previous portrait">←</button><p id="gallery-caption" role="status"></p><button type="button" id="gallery-next" aria-label="Next portrait">→</button></div></dialog>`;
if(document.querySelector('[data-year]'))document.querySelector('[data-year]').textContent=String(new Date().getFullYear());
if(document.documentElement.dataset.render==='static')return;
initGlobal();
if(page==='index') initStars();
if(page==='index') initPortraits();
if(document.getElementById('journey-stage')){initJourney();initGallery();}
if(page==='companies')initCompanies();
if(page==='collaborate')initContact();
if(page==='music')initMusic();
function initGlobal(){
 const menu=document.getElementById('mobile-menu-btn');const drawer=document.getElementById('mobile-drawer');const backdrop=document.getElementById('mobile-backdrop');
 const close=(restore=false)=>{menu.classList.remove('active');drawer.classList.remove('open');backdrop.classList.remove('active');menu.setAttribute('aria-expanded','false');drawer.inert=true;document.body.classList.remove('menu-open');if(restore)menu.focus()};
 menu.addEventListener('click',()=>{if(drawer.classList.contains('open')){close(true);return;}drawer.inert=false;menu.classList.add('active');drawer.classList.add('open');backdrop.classList.add('active');menu.setAttribute('aria-expanded','true');document.body.classList.add('menu-open');drawer.querySelector('a').focus()});
 backdrop.addEventListener('click',()=>close(true));drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>close()));document.addEventListener('keydown',e=>{if(!drawer.classList.contains('open'))return;if(e.key==='Escape'){close(true);return}if(e.key==='Tab'){const focusable=[menu,...drawer.querySelectorAll('a')];const first=focusable[0],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
 const desktop=matchMedia('(min-width: 1081px)');desktop.addEventListener('change',e=>{if(e.matches)close()});
 const head=document.getElementById('site-header');const progress=document.getElementById('scroll-progress');let ticking=false;
 const updateScroll=()=>{ticking=false;const y=window.scrollY;head.classList.toggle('scrolled',y>24);const full=Math.max(1,document.documentElement.scrollHeight-innerHeight);progress.style.width=Math.min(100,100*y/full)+'%'};
 window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(updateScroll)}},{passive:true});updateScroll();
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.addEventListener('pointermove',(e)=>{if(e.pointerType==='mouse'){document.documentElement.style.setProperty('--cursor-x',e.clientX+'px');document.documentElement.style.setProperty('--cursor-y',e.clientY+'px')}},{passive:true})}
 if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.06,rootMargin:'0px 0px -25px 0px'});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));document.documentElement.classList.add('motion-ready')}
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const href=a.getAttribute('href');const behavior=matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth';if(href==='#top'){e.preventDefault();window.scrollTo({top:0,behavior})}else if(href.length>1&&document.querySelector(href)){e.preventDefault();document.querySelector(href).scrollIntoView({behavior})}}));
 document.querySelectorAll('.img-fallback').forEach(image=>{image.addEventListener('error',()=>{image.classList.add('image-unavailable');image.alt='Creative portrait unavailable';},{once:true})});
}
function initPortraits(){
 const gallery=document.getElementById('hero-visual');if(!gallery)return;
 const hero=gallery.closest('.hero-home'),scene=gallery.querySelector('.orbit-scene');
 const cards=[...gallery.querySelectorAll('[data-portrait]')],name=document.getElementById('portrait-name'),index=document.getElementById('portrait-index');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),tau=Math.PI*2;
 const state={progress:0};let width=0,selected=-1,trigger=null,context=null,observer=null,suspended=false;
 function paint(){
  const phase=-state.progress*tau;
  cards.forEach((card,i)=>{
   const angle=phase+i*tau/cards.length,depth=Math.cos(angle);
   const x=Math.sin(angle)*width*.34,y=depth*width*.19,z=depth*width*.34;
   card.style.transform='translate(-50%,-50%) translate3d('+x.toFixed(3)+'px,'+y.toFixed(3)+'px,'+z.toFixed(3)+'px) rotateY('+(-Math.sin(angle)*10).toFixed(2)+'deg)';
   card.style.opacity=String(.58+(depth+1)*.21);
   card.style.setProperty('--shade',String(.12+(1-depth)*.3));
  });
  const active=Math.round(state.progress*cards.length)%cards.length;
  if(active===selected)return;selected=active;
  name.textContent=portraits[active].name;index.textContent=String(active+1).padStart(2,'0')+' / '+String(cards.length).padStart(2,'0');
  cards.forEach((card,i)=>{card.classList.toggle('is-front',active===i);card.setAttribute('aria-pressed',String(active===i))});
 }
 function resize(){width=scene.getBoundingClientRect().width;scene.style.perspective=width*1.85+'px';paint()}
 function stop(){
  trigger?.kill(true);trigger=null;context?.revert();context=null;
  hero.classList.remove('has-scroll-orbit');
 }
 function start(){
  if(suspended||trigger||reduced.matches||typeof window.gsap?.context!=='function'||typeof window.ScrollTrigger?.create!=='function')return;
  const gsap=window.gsap,ScrollTrigger=window.ScrollTrigger;
  try{
   gsap.registerPlugin(ScrollTrigger);
   context=gsap.context(()=>{},hero);
   context.add(()=>{
    const animation=gsap.fromTo(state,{progress:0},{progress:1,duration:1,ease:'none',paused:true,onUpdate:paint});
    trigger=ScrollTrigger.create({
     id:'hero-orbit-scroll',trigger:hero,animation,pin:true,pinSpacing:true,scrub:true,
     // Consume the first scroll in the carousel, even when the hero is tall.
     start:'top top',
     end:()=>'+='+Math.round(Math.max(1800,Math.min(3000,window.innerHeight*3))),
     anticipatePin:1,invalidateOnRefresh:true,refreshPriority:1,
     onRefresh:self=>{state.progress=self.progress;resize()}
    });
   });
   hero.classList.add('has-scroll-orbit');
   ScrollTrigger.refresh();
  }catch(error){stop();console.warn('Hero scroll animation unavailable; normal scrolling remains enabled.',error)}
 }
 function refresh(){if(!suspended&&trigger)window.ScrollTrigger.refresh()}
 function choose(i){
  const active=(i%cards.length+cards.length)%cards.length;
  let progress=active/cards.length;
  if(i===cards.length)progress=1;
  if(trigger){
   // Controls seek the real page position, keeping scroll and orbit in sync.
   window.scrollTo({top:trigger.start+progress*(trigger.end-trigger.start),behavior:'instant'});
   window.ScrollTrigger.update();
  }else{state.progress=progress;paint()}
 }
 cards.forEach((card,i)=>card.addEventListener('click',()=>choose(i)));
 gallery.querySelectorAll('[data-orbit-step]').forEach(button=>button.addEventListener('click',()=>choose(selected+Number(button.dataset.orbitStep))));
 gallery.querySelector('.orbit-restart').addEventListener('click',()=>choose(0));
 gallery.addEventListener('keydown',event=>{
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();choose(selected+(event.key==='ArrowRight'?1:-1))}
  if(event.key==='Home'){event.preventDefault();choose(0)}
 });
 function observe(){
  if('ResizeObserver' in window){observer=new window.ResizeObserver(resize);observer.observe(scene)}
 }
 reduced.addEventListener('change',()=>{stop();if(!reduced.matches)start();resize()});
 window.addEventListener('resize',resize,{passive:true});
 window.addEventListener('aman:intro-ended',refresh);
 window.addEventListener('load',refresh,{once:true});
 window.addEventListener('pagehide',()=>{suspended=true;stop();observer?.disconnect();observer=null});
 window.addEventListener('pageshow',event=>{if(event.persisted){suspended=false;observe();start();refresh()}});
 resize();observe();
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
 document.fonts?.ready.then(refresh);
}
function initStars(){
 const c=document.getElementById('star-canvas');if(!c)return;const cx=c.getContext?.('2d');if(!cx)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;let stars=[];let width=0,height=0,dpr=1,raf=0;
 function resize(){const r=c.getBoundingClientRect();width=r.width;height=r.height;dpr=Math.min(devicePixelRatio||1,2);c.width=Math.round(width*dpr);c.height=Math.round(height*dpr);cx.setTransform(dpr,0,0,dpr,0,0);const number=Math.max(70,Math.min(190,Math.floor(width*height/7000)));stars=Array.from({length:number},()=>({x:Math.random()*width,y:Math.random()*height,r:Math.random()*1.25+.25,a:Math.random()*.55+.18,p:Math.random()*Math.PI*2,s:Math.random()*.6+.2}))}
 function draw(time){cx.clearRect(0,0,width,height);let sec=time*.001;for(const s of stars){const pulse=reduced?1:(.78+.22*Math.sin(sec*s.s+s.p));cx.beginPath();cx.fillStyle=`rgba(215,222,255,${s.a*pulse})`;cx.arc(s.x,s.y,s.r,0,Math.PI*2);cx.fill()}if(!reduced&&!document.hidden)raf=requestAnimationFrame(draw)}
 resize();draw(0);window.addEventListener('resize',resize,{passive:true});document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(raf);if(!document.hidden&&!reduced)raf=requestAnimationFrame(draw)})
}
function initJourney(){
 const stage=document.getElementById('journey-stage');if(!stage)return;const cards=[...stage.querySelectorAll('.journey-card')];let scrollVal=0,framePending=false;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 function position(){framePending=false;const rect=stage.getBoundingClientRect();const vh=window.innerHeight;const t=Math.max(0,Math.min(1,(vh-rect.top)/(vh+rect.height)));const phase=(reduced?.18:t*1.85)*Math.PI;let mobile=window.innerWidth<520;let small=window.innerWidth<768;const rx=mobile?140:small?240:Math.min(420,window.innerWidth*.32);const ry=mobile?57:small?92:141;
 cards.forEach((el,i)=>{let angle=phase+i*(Math.PI*2/cards.length)-Math.PI/2;let x=Math.cos(angle)*rx;let y=Math.sin(angle)*ry;let depth=Math.sin(angle);let scale=.8+(depth+1)*.18;let rotate=Math.cos(angle)*-12;el.style.transform=`translate(-50%,-50%) translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,${Math.round(depth*110)}px) scale(${scale.toFixed(2)}) rotateY(${rotate.toFixed(1)}deg)`;el.style.zIndex=String(Math.round((depth+1)*10)+4);el.style.opacity=(.65+(depth+1)*.175).toFixed(3)})
 }
 const request=()=>{if(!framePending){framePending=true;requestAnimationFrame(position)}};position();window.addEventListener('scroll',request,{passive:true});window.addEventListener('resize',request,{passive:true});
}
function initGallery(){
 const dialog=document.getElementById('gallery-dialog');const image=document.getElementById('gallery-image');const caption=document.getElementById('gallery-caption');let selected=0;let opener=null;
 const show=i=>{selected=(i+portraits.length)%portraits.length;image.src=portraits[selected].file;image.alt=portraits[selected].alt;caption.textContent=String(selected+1).padStart(2,'0')+' / '+String(portraits.length).padStart(2,'0')+' — '+portraits[selected].name;};
 document.querySelectorAll('[data-gallery]').forEach(button=>button.addEventListener('click',()=>{opener=button;show(Number(button.dataset.gallery));dialog.showModal();document.body.classList.add('viewer-open')}));
 document.getElementById('gallery-prev').addEventListener('click',()=>show(selected-1));document.getElementById('gallery-next').addEventListener('click',()=>show(selected+1));
 dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();show(selected-1)}if(e.key==='ArrowRight'){e.preventDefault();show(selected+1)}});dialog.addEventListener('close',()=>{document.body.classList.remove('viewer-open');opener?.focus()});dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
}
function initCompanies(){
 const container=document.getElementById('companies-container');const search=document.getElementById('company-search');const filters=document.getElementById('category-filters');const count=document.getElementById('count-result');let category='All';
 function render(){let q=search.value.toLowerCase().trim();let results=companiesData.filter(c=>(category==='All'||c.category===category)&&(!q||(c.name+' '+c.category+' '+c.description+' '+c.mission+' '+c.upcoming).toLowerCase().includes(q)));count.textContent=results.length+' of 11 companies & platforms';if(!results.length){container.innerHTML='<div class="empty-state" style="grid-column:1/-1"><strong>No matching company found.</strong><p>Try another keyword or explore all categories.</p><button type="button" class="btn-aman" id="reset-companies">RESET FILTERS ↗</button></div>';document.getElementById('reset-companies').addEventListener('click',()=>{search.value='';category='All';filters.querySelectorAll('button').forEach(b=>{const on=b.dataset.category==='All';b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on))});render();search.focus()});return}container.innerHTML=results.map((c)=>companyCard(c,companiesData.indexOf(c))).join('')}
 filters.addEventListener('click',e=>{let b=e.target.closest('button[data-category]');if(!b)return;category=b.dataset.category;filters.querySelectorAll('button').forEach(item=>{const on=item===b;item.classList.toggle('active',on);item.setAttribute('aria-pressed',on)});render()});search.addEventListener('input',render);render();
}
function initContact(){
 const form=document.getElementById('contact-form');const status=document.getElementById('contact-status');form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;let d=new FormData(form);const subject='The Aman Life — '+String(d.get('type')||'Collaboration');const body=[`Name: ${d.get('name')}`,`Email: ${d.get('email')}`,`Organization: ${d.get('organization')||'Not provided'}`,`Collaboration: ${d.get('type')}`,'',String(d.get('message'))].join('\n');status.textContent='Your email app will open with the request. Nothing has been sent automatically.';window.location.href=`mailto:contact@pinnacleelitecorp.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`})
}
function initMusic(){
 const form=document.getElementById('music-form');const status=document.getElementById('music-status');form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const email=document.getElementById('notify-email').value.trim();status.textContent='Your email app will open to request updates. This is not an automatic subscription.';window.location.href='mailto:contact@pinnacleelitecorp.com?subject='+encodeURIComponent('Music updates request')+'&body='+encodeURIComponent('Please notify me about music releases.\nMy email: '+email)})
}
})();
