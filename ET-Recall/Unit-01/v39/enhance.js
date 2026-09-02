(()=>{
const C=window.CARDS||[];
const DRIVE=[
"https://drive.google.com/thumbnail?id=16otOI6UVIdvHJHU6FVsz17gHlejOqwEb&sz=w1600",
"https://drive.google.com/thumbnail?id=1LqdGeHK7gd6vBYVzS2LkaAjlcg3qsRKn&sz=w1600",
"https://drive.google.com/thumbnail?id=1GnrCQsUgK3ujJMU9SpYqJFGXG6waxi4H&sz=w1600",
"https://drive.google.com/thumbnail?id=1i_qNHZI7KYxvePzDTzelYhp7BMX3_z3O&sz=w1600",
"https://drive.google.com/thumbnail?id=1icyN6W87zeX7Rwoa-8YFjnTEciFhpqps&sz=w1600",
"https://drive.google.com/thumbnail?id=1WGd_rbRhHJPJFCLY_ptPJ6d2139BecfH&sz=w1600",
"https://drive.google.com/thumbnail?id=1fcYXdoWHJXqONG0S6Ta5eogE0QwuJgrX&sz=w1600",
"https://drive.google.com/thumbnail?id=10YnTbBAeGXXZLGRoxJeeyKYmkzFY00ky&sz=w1600",
"https://drive.google.com/thumbnail?id=1ffcQ0Axcieig086zczFudHD_MfOj2eZb&sz=w1600",
"https://drive.google.com/thumbnail?id=1uyDZzI-bvZh4_foLio0N26YorxBu9OGA&sz=w1600",
"https://drive.google.com/thumbnail?id=1G08MV4CpT0oN79EJIloXvnVeYZEPc-ic&sz=w1600",
"https://drive.google.com/thumbnail?id=1NKTIztxyPfNwJ9dP3uBRn73dqH-tpHCZ&sz=w1600",
"https://drive.google.com/thumbnail?id=1Ge3Pt0LjxBlBbyX0I1BIgMLD9touk0Kv&sz=w1600",
"https://drive.google.com/thumbnail?id=1C0onQ8VuaDKQsDsjjW22uaE-SPnUquyD&sz=w1600",
"https://drive.google.com/thumbnail?id=1JjDAm9VX72hd5LzPKMaxu_rOC6HcPemL&sz=w1600",
"https://drive.google.com/thumbnail?id=16hUCEf9drvIzvVSxhtNKQ1w6YpJ0b1qw&sz=w1600",
"https://drive.google.com/thumbnail?id=1rNRt6obyxXrowX674tI6gE0uHY9h8ver&sz=w1600",
"https://drive.google.com/thumbnail?id=13HZopkjW24sw48jG0CT4o4NZcnjRoohS&sz=w1600",
"https://drive.google.com/thumbnail?id=1dVkocb4TOb5U-ZtqrAxpXstyq-IIYUmy&sz=w1600",
"https://drive.google.com/thumbnail?id=12Fnj4OUZtkhK04rLGag2n5lRhiDmTV0b&sz=w1600",
"https://drive.google.com/thumbnail?id=1I8LzRjSVehHaBy1Acuubx9NGq3t1qpes&sz=w1600",
"https://drive.google.com/thumbnail?id=19tuNwZePJysu49EG3XIdaLxU5UPcAHIn&sz=w1600",
"https://drive.google.com/thumbnail?id=1pQE_VHo8YexZMP6STOkZ7BTpkAAqoxHp&sz=w1600",
"https://drive.google.com/thumbnail?id=143seBWhz05QPtXMLDPlJegMrANvcR754&sz=w1600",
"https://drive.google.com/thumbnail?id=14NLKUvGOWvdqbYSD-8QhojNWeNMGFamu&sz=w1600",
"https://drive.google.com/thumbnail?id=1cS1qSjUrJ75CUHMCAvXsAibsn6xiFbk-&sz=w1600",
"https://drive.google.com/thumbnail?id=18k7nyWhILaWRCgC1BaXhrt3_qtgGqNpO&sz=w1600",
"https://drive.google.com/thumbnail?id=1qzyP_GU8hBvocHQma_H2HjFwyzqDMnEL&sz=w1600",
"https://drive.google.com/thumbnail?id=1ZBIAkceT4eVs_z78eLzrIewMnXOggPz2&sz=w1600",
"https://drive.google.com/thumbnail?id=18VVXmIiHr5_-QSV2dEyvPcBIpfEElB21&sz=w1600"
];

document.title='ET Unit 01';
const h1=document.querySelector('#practice h1');if(h1)h1.textContent='ET Unit 01';
const sub=document.querySelector('#practice .sub');if(sub)sub.textContent='A/L Engineering Technology • Unit 01 • Q001–Q300';

const atlasCard=C.find(c=>c&&c.image&&Number.isFinite(Number(c.imageIndex)));
const atlasURI=atlasCard?atlasCard.image:null;
const altIndex=new Map();
C.forEach(c=>{const i=Number(c.imageIndex);if(c.image&&Number.isInteger(i)&&c.imageAlt&&!altIndex.has(c.imageAlt))altIndex.set(c.imageAlt,i)});
const resolved=[];
const inflight=[];
const applied=new WeakMap();
let atlasImagePromise=null;

function loadImg(src,timeout=3500){return new Promise((resolve,reject)=>{const im=new Image();let done=false;const t=setTimeout(()=>{if(!done){done=true;im.src='';reject(new Error('timeout'))}},timeout);im.referrerPolicy='no-referrer';im.onload=()=>{if(done)return;done=true;clearTimeout(t);resolve(im)};im.onerror=()=>{if(done)return;done=true;clearTimeout(t);reject(new Error('load'))};im.src=src})}
function atlasImage(){if(!atlasImagePromise){atlasImagePromise=loadImg(atlasURI,8000)}return atlasImagePromise}

async function cropFallback(i){
 const im=await atlasImage();
 const cols=5,rows=6,sw=im.naturalWidth/cols,sh=im.naturalHeight/rows;
 const sx=(i%cols)*sw,sy=Math.floor(i/cols)*sh;
 const W=600,H=450,cv=document.createElement('canvas');cv.width=W;cv.height=H;
 const ctx=cv.getContext('2d',{alpha:false});ctx.fillStyle='#fff';ctx.fillRect(0,0,W,H);ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
 if('filter'in ctx)ctx.filter='contrast(1.08) saturate(1.04)';
 ctx.drawImage(im,sx,sy,sw,sh,0,0,W,H);
 try{return cv.toDataURL('image/webp',.94)}catch{return cv.toDataURL('image/jpeg',.94)}
}
async function tryDrive(i){
 const u=DRIVE[i];if(!u)return null;
 try{const im=await loadImg(u,2800);if((im.naturalWidth||0)>=320&&(im.naturalHeight||0)>=200)return u}catch{}
 return null;
}
function indexFromPic(p){
 const d=Number(p.dataset.v39Index);if(Number.isInteger(d)&&d>=0&&d<30)return d;
 const alt=p.getAttribute('aria-label');if(alt&&altIndex.has(alt))return altIndex.get(alt);
 const pos=(p.style.backgroundPosition||getComputedStyle(p).backgroundPosition||'').match(/(-?\d+(?:\.\d+)?)%\s+(-?\d+(?:\.\d+)?)%/);
 if(pos){const col=Math.round(Number(pos[1])/25),row=Math.round(Number(pos[2])/20),i=row*5+col;if(i>=0&&i<30)return i}
 return null;
}
function applyPic(p,i){
 const src=resolved[i];if(!src||applied.get(p)===src)return;
 p.dataset.v39Index=String(i);p.classList.add('v39single');
 p.style.backgroundImage=`url("${src}")`;p.style.backgroundSize='contain';p.style.backgroundPosition='center';p.style.backgroundRepeat='no-repeat';p.style.filter='contrast(1.03) saturate(1.02)';
 applied.set(p,src);
}
function refreshIndex(i){document.querySelectorAll('.pic').forEach(p=>{const j=indexFromPic(p);if(j===i)applyPic(p,i)})}
async function resolveIndex(i){
 if(resolved[i])return resolved[i];if(inflight[i])return inflight[i];
 inflight[i]=(async()=>{let fb=null;try{fb=await cropFallback(i)}catch{};if(fb){resolved[i]=fb;refreshIndex(i)}
 const hd=await tryDrive(i);if(hd){resolved[i]=hd;refreshIndex(i)}
 return resolved[i]||fb})();
 return inflight[i];
}
function scan(root=document){root.querySelectorAll?.('.pic').forEach(p=>{const i=indexFromPic(p);if(i!==null){if(resolved[i])applyPic(p,i);else resolveIndex(i)}})}
const mo=new MutationObserver(ms=>{for(const m of ms){if(m.type==='childList')m.addedNodes.forEach(n=>{if(n.nodeType===1){if(n.matches?.('.pic'))scan(n.parentElement||n);else scan(n)}});else if(m.type==='attributes'&&m.target.classList?.contains('pic')){const p=m.target,i=indexFromPic(p);if(i!==null&&resolved[i]&&p.style.backgroundSize!=='contain')queueMicrotask(()=>applyPic(p,i))}}});
mo.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['style','aria-label']});scan();

const hero=document.querySelector('#practice .hero');if(hero&&!document.getElementById('v39bar')){const bar=document.createElement('div');bar.id='v39bar';bar.className='v39bar';bar.innerHTML='<button id="installApp" class="btn o">📲 Install ET Unit 01</button><button id="fullScreen" class="btn">⛶ Full Screen</button>';const hint=document.createElement('div');hint.id='v39hint';hint.className='v39hint';hint.textContent='Image එක touch කළාම අදාල single image එක විතරක් clear view එකෙන් පෙන්වයි.';const status=document.getElementById('status');(status||hero.firstChild).after(bar,hint)}
let deferred=null,ib=document.getElementById('installApp'),hint=document.getElementById('v39hint');if(ib){if(matchMedia('(display-mode: standalone)').matches||navigator.standalone){ib.textContent='✅ ET Unit 01 Installed';ib.disabled=true}window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferred=e;ib.disabled=false});window.addEventListener('appinstalled',()=>{deferred=null;ib.textContent='✅ ET Unit 01 Installed';ib.disabled=true});ib.onclick=async()=>{if(deferred){deferred.prompt();await deferred.userChoice;deferred=null}else if(!(matchMedia('(display-mode: standalone)').matches||navigator.standalone)){hint.textContent='Chrome ⋮ → Install app / Add to Home screen තෝරන්න.'}}}
const fs=document.getElementById('fullScreen');if(fs){fs.onclick=async()=>{try{if(!document.fullscreenElement)await document.documentElement.requestFullscreen();else await document.exitFullscreen()}catch{if(hint)hint.textContent='Full Screen block වුණොත් installed app එකෙන් open කරන්න.'}};document.addEventListener('fullscreenchange',()=>{fs.textContent=document.fullscreenElement?'⤢ Exit Full Screen':'⛶ Full Screen'})}

const z=document.createElement('div');z.id='v39zoom';z.className='v39zoom';z.innerHTML='<div class="v39zoomtop"><b id="v39zoomTitle">🖼️ Clear Image</b><button id="v39zoomClose" class="btn close">✕</button></div><div class="v39zoomstage"><div id="v39zoomImg" class="v39zoomimg"></div></div>';document.body.appendChild(z);
const zi=document.getElementById('v39zoomImg'),zt=document.getElementById('v39zoomTitle');
document.addEventListener('click',async e=>{const p=e.target.closest?.('.pic');if(!p||e.target.closest('#v39zoom'))return;e.preventDefault();const i=indexFromPic(p);if(i===null)return;z.classList.add('open');document.body.style.overflow='hidden';zi.style.backgroundImage='none';zt.textContent='🖼️ Clear Image • Loading…';const src=await resolveIndex(i);if(src){zi.style.backgroundImage=`url("${src}")`;zi.style.backgroundSize='contain';zi.style.backgroundPosition='center';zi.style.backgroundRepeat='no-repeat';zt.textContent='🖼️ Clear Image • Single crop'}else{zt.textContent='Image load failed'}});
document.getElementById('v39zoomClose').onclick=()=>{z.classList.remove('open');document.body.style.overflow=''};

const used=[...new Set(C.filter(c=>c.image&&Number.isInteger(Number(c.imageIndex))).map(c=>Number(c.imageIndex)))];
(async()=>{for(const i of used){resolveIndex(i);await new Promise(r=>(window.requestIdleCallback?requestIdleCallback(()=>r(),{timeout:250}):setTimeout(r,25)))}})();
})();
