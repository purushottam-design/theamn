import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';
import {root,pages,render} from './render.mjs';

let assertions=0;
const check=(condition,message)=>{assert.ok(condition,message);assertions++};
const titles=new Set();
for(const page of pages){
 const {document}=render(page,{interactive:true});
 check(document.querySelectorAll('main').length===1,page+': exactly one main');
 check(document.querySelectorAll('h1').length===1,page+': one h1');
 check(document.querySelector('.header-navigation a[aria-current="page"]')!==null||['art','music','achievements'].includes(page),page+': active navigation');
 check(!titles.has(document.title),page+': unique title');titles.add(document.title);
 const ids=[...document.querySelectorAll('[id]')].map(el=>el.id);
 check(ids.length===new Set(ids).size,page+': unique IDs');
 for(const link of document.querySelectorAll('a[href],img[src],link[href],script[src]')){
  const href=link.getAttribute('href')??link.getAttribute('src');
  if(href.startsWith('./'))check(fs.existsSync(path.join(root,href)),page+': local resource '+href);
  if(href.startsWith('#')&&href!=='#top')check(document.getElementById(href.slice(1)),page+': anchor '+href);
  if(link.tagName==='IMG')check(link.hasAttribute('alt'),page+': image alt');
  if(link.getAttribute('target')==='_blank')check(link.getAttribute('rel')?.includes('noopener'),page+': safe external link');
 }
 for(const field of document.querySelectorAll('input,textarea,select'))check(document.querySelector('label[for="'+field.id+'"]'),page+': labeled field');
 const menu=document.getElementById('mobile-menu-btn');const drawer=document.getElementById('mobile-drawer');
 menu.click();check(menu.getAttribute('aria-expanded')==='true'&&!drawer.inert,page+': menu opens');
 const escape=new document.defaultView.Event('keydown');escape.key='Escape';document.dispatchEvent(escape);
 check(menu.getAttribute('aria-expanded')==='false'&&drawer.inert,page+': Escape closes menu');
}
const {document:d,window:w}=render('companies',{interactive:true});
const cards=()=>d.querySelectorAll('#companies-container .company-card');
const search=d.getElementById('company-search');
const category=name=>[...d.querySelectorAll('[data-category]')].find(b=>b.dataset.category===name);
check(cards().length===11,'all eleven companies and platforms');
category('E-commerce').click();check(cards().length===3,'e-commerce filter');
search.value='natural';search.dispatchEvent(new w.Event('input'));check(cards().length===1&&cards()[0].textContent.includes('Eco Blossom'),'search combines with category');
search.value='no-match-123';search.dispatchEvent(new w.Event('input'));check(cards().length===0&&d.getElementById('reset-companies'),'empty results show reset');
d.getElementById('reset-companies').click();check(cards().length===11&&search.value===''&&category('All').getAttribute('aria-pressed')==='true','reset restores search and category');
category('AI & Technology').click();check(cards().length===2,'AI directory classification');
const home=render('index',{interactive:true});
home.document.querySelector('[data-portrait="2"]').click();
check(home.document.querySelectorAll('[data-portrait]').length===9,'all nine original reference portraits');
check(home.document.getElementById('portrait-name').textContent==='The open road','portrait selector updates caption');
check(home.document.querySelector('[data-portrait="2"] img').src.endsWith('hero-3.jpg'),'orbit retains the original portrait image');
check(home.document.querySelectorAll('.orbit-photo[aria-pressed="true"]').length===1,'one orbit portrait selected');
check(!home.document.querySelector('.portrait-selector,.portrait-frame'),'rectangular portrait and thumbnail strip removed');
home.document.querySelector('[data-gallery="0"]').click();
check(home.document.getElementById('gallery-dialog').open,'gallery opens');
home.document.getElementById('gallery-prev').click();
check(home.document.getElementById('gallery-caption').textContent.includes('09 / 09'),'gallery previous wraps');
home.document.getElementById('gallery-next').click();
check(home.document.getElementById('gallery-caption').textContent.includes('01 / 09'),'gallery next wraps');
home.document.getElementById('gallery-dialog').close();check(!home.document.body.classList.contains('viewer-open'),'gallery releases page scroll');
const reduced=render('index',{interactive:true,reduced:true,width:375});
reduced.document.querySelector('[data-portrait="1"]').click();check(reduced.document.getElementById('portrait-name').textContent==='City lights','reduced motion retains interaction');
check(render('work').document.querySelectorAll('.work-area-grid .small-card').length===11,'eleven creative disciplines');
check(render('invest').document.querySelectorAll('.venture-card').length===11,'eleven venture accordions');
check(render('tech').document.querySelectorAll('.company-card .status-live').length===4,'four live technology products');
check(render('tech').document.querySelectorAll('.pipeline .badge-soon').length===2,'two planned launches');
for(const page of ['collaborate','music']){
 const {document,window}=render(page,{interactive:true});const contact=page==='collaborate';
 const form=document.getElementById(contact?'contact-form':'music-form');
 form.reportValidity=()=>false;const initial=window.location.href;
 form.dispatchEvent(new window.Event('submit',{cancelable:true}));check(window.location.href===initial,'invalid '+page+' form does not compose email');
 form.reportValidity=()=>true;
 if(contact){document.getElementById('contact-name').value='Aman & Team';document.getElementById('contact-email').value='aman@example.com';document.getElementById('contact-message').value='A creative project & campaign.'}
 else document.getElementById('notify-email').value='aman@example.com';
 form.dispatchEvent(new window.Event('submit',{cancelable:true}));
 check(window.location.href.startsWith('mailto:contact@pinnacleelitecorp.com?subject='),page+' form composes email');
 check(decodeURIComponent(window.location.href).includes('aman@example.com'),page+' form includes email');
}
const css=postcss.parse(fs.readFileSync(path.join(root,'assets/css/style.css'),'utf8'));
check(css.nodes.length>0,'stylesheet parses');
let reducedRule=false;css.walkAtRules('media',r=>{if(r.params.includes('prefers-reduced-motion'))reducedRule=true});check(reducedRule,'reduced motion stylesheet');
console.log('PASS: '+assertions+' DOM, content, link, interaction and stylesheet checks across 9 pages.');
console.log('Visual browser QA is separate; DOM checks do not verify rendering or native browser validation.');
