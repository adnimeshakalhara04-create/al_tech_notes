const fs=require('fs');
const AdmZip=require('adm-zip');

(async()=>{
  const sourceId='14WuLWDR2jx6dXadsEOkM-ICWEnKFLfWY';
  const url=`https://drive.google.com/uc?export=download&id=${sourceId}`;
  const response=await fetch(url,{redirect:'follow',cache:'no-store'});
  if(!response.ok) throw new Error(`Unit 05 Drive source download failed: ${response.status}`);
  const buffer=Buffer.from(await response.arrayBuffer());
  if(buffer.length<1000000) throw new Error(`Unit 05 Drive source unexpectedly small: ${buffer.length}`);
  const root='/tmp/et-unit-05-v4';
  fs.rmSync(root,{recursive:true,force:true});fs.mkdirSync(root,{recursive:true});
  new AdmZip(buffer).extractAllTo(root,true);
  const src=`${root}/et-unit-05`;
  const required=['index.html','global-admin.js','manifest.webmanifest','sw.js','icon.svg'];
  for(const f of required) if(!fs.existsSync(`${src}/${f}`)) throw new Error(`Missing production file: ${f}`);
  fs.rmSync('dist',{recursive:true,force:true});fs.mkdirSync('dist',{recursive:true});
  for(const f of [...required,'live-images.json']) if(fs.existsSync(`${src}/${f}`)) fs.copyFileSync(`${src}/${f}`,`dist/${f}`);
  console.log(`ET Unit 05 v4 production bundle ready (${buffer.length} bytes) — semantic Complete Lesson + GitHub global Admin`);
})().catch(e=>{console.error(e);process.exit(1)});
