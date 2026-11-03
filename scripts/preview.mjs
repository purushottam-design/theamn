import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const project=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const root=fs.existsSync(path.join(project,'dist/index.html'))?path.join(project,'dist'):project;
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
const server=http.createServer((req,res)=>{
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});res.end();return}
 let pathname;
 try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400);res.end();return}
 if(pathname.includes('\\')||pathname.includes('\0')){res.writeHead(400);res.end();return}
 let relative=pathname==='/'?'index.html':pathname.slice(1);
 if(!path.extname(relative))relative+='.html';
 const file=path.resolve(root,relative);
 const within=path.relative(root,file);
 if(within.startsWith('..')||path.isAbsolute(within)||relative.split('/').some(s=>s.startsWith('.'))){res.writeHead(403);res.end();return}
 fs.stat(file,(error,stat)=>{
  if(error||!stat.isFile()){res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(req.method==='HEAD'?'':fs.readFileSync(path.join(project,'404.html')));return}
  res.writeHead(200,{'Content-Type':types[path.extname(file)]??'application/octet-stream','Cache-Control':'no-cache'});
  if(req.method==='HEAD')res.end();else fs.createReadStream(file).pipe(res);
 });
});
server.listen(8000,'127.0.0.1',()=>console.log('Local: http://localhost:8000 — serving '+(root.endsWith('dist')?'dist/':'source/')));
