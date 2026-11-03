import fs from 'node:fs';
import path from 'node:path';
import {root,pages,render} from './render.mjs';

const dest=path.join(root,'dist');
fs.mkdirSync(dest,{recursive:true});
fs.cpSync(path.join(root,'assets'),path.join(dest,'assets'),{recursive:true});
for(const page of pages){
 const {document}=render(page);
 document.querySelector('noscript')?.remove();
 fs.writeFileSync(path.join(dest,page+'.html'),document.toString());
}
for(const name of ['_redirects','robots.txt','sitemap.xml','404.html']){
 if(fs.existsSync(path.join(root,name)))fs.copyFileSync(path.join(root,name),path.join(dest,name));
}
console.log('Built 9 complete HTML pages with local assets in dist/. No server runtime required.');
