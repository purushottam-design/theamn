import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { parseHTML } from 'linkedom';
import { applyMetadata } from './page-meta.mjs';
import { injectMotion } from './motion-markup.mjs';

export const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export const pages=['index','work','tech','companies','invest','collaborate','art','music','achievements'];
const source=fs.readFileSync(path.join(root,'assets/js/site.js'),'utf8');

// DOM-only checks and static rendering; this is not a visual browser substitute.
export function render(page,{interactive=false,reduced=false,html=null,width=1440,setup=null}={}){
 const {document,window}=parseHTML(html??fs.readFileSync(path.join(root,page+'.html'),'utf8'));
 applyMetadata(document,page);
 injectMotion(document,page);
 if(!interactive)document.documentElement.dataset.render='static';
 const media=()=>({matches:reduced,addEventListener(){}});
 const el=window.HTMLElement.prototype;
 el.getBoundingClientRect=()=>({top:300,left:0,right:900,bottom:870,width:900,height:570});
 el.focus=function(){document.activeElement=this};
 el.animate=()=>({finished:Promise.resolve()});
 el.showModal=function(){this.open=true;this.setAttribute('open','')};
 el.close=function(){this.open=false;this.removeAttribute('open');this.dispatchEvent(new window.Event('close'))};
 document.documentElement.scrollHeight=5000;
 window.innerHeight=900;window.innerWidth=width;window.scrollY=0;
 window.location={href:'http://localhost:8000/'+page+'.html'};
 const context=vm.createContext({document,window,console,Date,Math,matchMedia:media,
  innerHeight:900,innerWidth:width,devicePixelRatio:1,
  requestAnimationFrame:()=>1,cancelAnimationFrame(){},
  Image:class{set src(value){this._src=value;this.onload?.()}},
  FormData:class{constructor(form){this.form=form}get(name){return this.form.querySelector('[name="'+name+'"]')?.value??null}}
 });
 setup?.({document,window,context});
 vm.runInContext(source,context,{filename:'site.js',timeout:5000});
 delete document.documentElement.dataset.render;
 return {document,window,context,html:document.toString()};
}
